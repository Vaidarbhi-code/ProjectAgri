# ============================================================
# SMARTAGRI
# Complete Flask Backend
#
# Endpoints required by current frontend:
#
# GET  /api/weather
# GET  /api/market-prices
# POST /api/ai
# POST /api/crop-health
#
# Additional:
# GET  /
# GET  /health
# GET  /api/status
# GET  /api/weather/history
# GET  /api/market/history
#
# Database:
# SQLite
#
# External services:
# Weather   -> Open-Meteo
# Market    -> data.gov.in / optional MandiPulse fallback
# AI        -> Hugging Face Inference Providers
# Crop AI   -> optional Hugging Face vision model
# ============================================================

import os
import re
import json
import sqlite3
import logging
from datetime import datetime, timezone
from typing import Any, Optional

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS


# ============================================================
# APPLICATION
# ============================================================

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        },
        r"/health": {
            "origins": "*"
        }
    }
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logger = logging.getLogger("smartagri")


# ============================================================
# CONFIGURATION
# ============================================================

PORT = int(
    os.getenv("PORT", "5000")
)

DATABASE = os.getenv(
    "DATABASE_PATH",
    "smartagri.db"
)

# ------------------------------------------------------------
# Hugging Face
# ------------------------------------------------------------

HF_TOKEN = os.getenv(
    "HF_TOKEN",
    ""
).strip()

HF_MODEL = os.getenv(
    "HF_MODEL",
    "openai/gpt-oss-120b"
).strip()

HF_BASE_URL = (
    "https://router.huggingface.co/v1"
)

# ------------------------------------------------------------
# Weather
# ------------------------------------------------------------

WEATHER_API_URL = (
    "https://api.open-meteo.com/v1/forecast"
)

# Kopargaon coordinates
KOPARGAON_LAT = float(
    os.getenv(
        "KOPARGAON_LAT",
        "19.8826"
    )
)

KOPARGAON_LON = float(
    os.getenv(
        "KOPARGAON_LON",
        "74.4761"
    )
)

DEFAULT_LOCATION = os.getenv(
    "WEATHER_LOCATION",
    "Kopargaon"
)

# ------------------------------------------------------------
# Government market API
# ------------------------------------------------------------

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
).strip()

DATA_GOV_API_URL = (
    "https://api.data.gov.in/resource/"
    "9ef84268-d588-465a-a308-a864a43d0070"
)

# ------------------------------------------------------------
# Optional market website fallback
# ------------------------------------------------------------

MANDIPULSE_BASE_URL = (
    "https://mandipulse.com/"
    "mandi/maharashtra-ahilyanagar-kopargaon-apmc"
)

# ------------------------------------------------------------
# Request settings
# ------------------------------------------------------------

REQUEST_TIMEOUT = int(
    os.getenv(
        "REQUEST_TIMEOUT",
        "12"
    )
)

MARKET_TIMEOUT = int(
    os.getenv(
        "MARKET_TIMEOUT",
        "10"
    )
)


# ============================================================
# DATABASE
# ============================================================

def get_db():
    connection = sqlite3.connect(
        DATABASE,
        timeout=30
    )

    connection.row_factory = sqlite3.Row

    return connection


def initialize_database():

    connection = get_db()

    cursor = connection.cursor()

    # --------------------------------------------------------
    # WEATHER
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT NOT NULL,
            latitude REAL,
            longitude REAL,
            temperature REAL,
            humidity REAL,
            wind_speed REAL,
            rain_chance REAL,
            precipitation REAL,
            weather_code INTEGER,
            weather_condition TEXT,
            recorded_at TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    # --------------------------------------------------------
    # MARKET PRICES
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS market_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            market TEXT NOT NULL,
            commodity TEXT NOT NULL,
            min_price REAL,
            max_price REAL,
            modal_price REAL,
            arrival_date TEXT,
            source TEXT,
            created_at TEXT NOT NULL
        )
        """
    )

    # --------------------------------------------------------
    # INDEXES
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_weather_location_time
        ON weather(location, recorded_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_market_commodity_market_date
        ON market_prices(
            commodity,
            market,
            arrival_date
        )
        """
    )

    connection.commit()

    connection.close()

    logger.info(
        "Database initialized: %s",
        DATABASE
    )


# Initialize as soon as module loads.
initialize_database()


# ============================================================
# UTILITY
# ============================================================

def now_iso():
    return datetime.now(
        timezone.utc
    ).isoformat()


def safe_float(value):
    if value is None:
        return None

    if isinstance(value, (int, float)):
        return float(value)

    text = str(value).strip()

    if not text:
        return None

    text = (
        text
        .replace(",", "")
        .replace("₹", "")
        .strip()
    )

    match = re.search(
        r"-?\d+(?:\.\d+)?",
        text
    )

    if not match:
        return None

    try:
        return float(
            match.group(0)
        )
    except ValueError:
        return None


def clean_text(value):
    if value is None:
        return ""

    return str(value).strip()


def weather_code_description(code):

    mapping = {

        0: "Clear sky",

        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Depositing rime fog",

        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",

        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",

        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",

        66: "Light freezing rain",
        67: "Heavy freezing rain",

        71: "Slight snowfall",
        73: "Moderate snowfall",
        75: "Heavy snowfall",

        77: "Snow grains",

        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",

        85: "Slight snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",

        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"

    }

    return mapping.get(
        code,
        "Unknown"
    )


def json_error(
    message,
    status=500,
    details=None
):

    payload = {
        "success": False,
        "error": message
    }

    if details:
        payload["details"] = str(
            details
        )

    return jsonify(payload), status


# ============================================================
# WEATHER
# ============================================================

def fetch_weather():

    params = {

        "latitude":
            KOPARGAON_LAT,

        "longitude":
            KOPARGAON_LON,

        "current":
            ",".join([
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "weather_code",
                "wind_speed_10m"
            ]),

        "hourly":
            ",".join([
                "precipitation_probability"
            ]),

        "timezone":
            "Asia/Kolkata",

        "forecast_days":
            1
    }

    response = requests.get(
        WEATHER_API_URL,
        params=params,
        timeout=REQUEST_TIMEOUT
    )

    response.raise_for_status()

    return response.json()


def calculate_rain_chance(data):

    hourly = data.get(
        "hourly",
        {}
    )

    probabilities = hourly.get(
        "precipitation_probability",
        []
    )

    if not probabilities:
        return None

    current = data.get(
        "current",
        {}
    )

    current_time = current.get(
        "time"
    )

    times = hourly.get(
        "time",
        []
    )

    # Find nearest current hour.
    if current_time and times:

        try:

            index = times.index(
                current_time
            )

            return safe_float(
                probabilities[index]
            )

        except ValueError:
            pass

    # Fallback to first value.
    return safe_float(
        probabilities[0]
    )


def store_weather(data):

    current = data.get(
        "current",
        {}
    )

    temperature = safe_float(
        current.get(
            "temperature_2m"
        )
    )

    humidity = safe_float(
        current.get(
            "relative_humidity_2m"
        )
    )

    precipitation = safe_float(
        current.get(
            "precipitation"
        )
    )

    wind_speed = safe_float(
        current.get(
            "wind_speed_10m"
        )
    )

    weather_code = current.get(
        "weather_code"
    )

    rain_chance = calculate_rain_chance(
        data
    )

    recorded_at = (
        current.get("time")
        or now_iso()
    )

    condition = weather_code_description(
        weather_code
    )

    connection = get_db()

    connection.execute(
        """
        INSERT INTO weather (
            location,
            latitude,
            longitude,
            temperature,
            humidity,
            wind_speed,
            rain_chance,
            precipitation,
            weather_code,
            weather_condition,
            recorded_at,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            DEFAULT_LOCATION,
            KOPARGAON_LAT,
            KOPARGAON_LON,
            temperature,
            humidity,
            wind_speed,
            rain_chance,
            precipitation,
            weather_code,
            condition,
            recorded_at,
            now_iso()
        )
    )

    connection.commit()
    connection.close()


def get_latest_weather():

    connection = get_db()

    row = connection.execute(
        """
        SELECT *
        FROM weather
        ORDER BY id DESC
        LIMIT 1
        """
    ).fetchone()

    connection.close()

    if not row:
        return None

    return dict(row)


def weather_response_from_db(row):

    if not row:
        return None

    return {

        "success": True,

        "location":
            row.get(
                "location"
            ),

        "latitude":
            row.get(
                "latitude"
            ),

        "longitude":
            row.get(
                "longitude"
            ),

        "temperature":
            row.get(
                "temperature"
            ),

        "temperature_c":
            row.get(
                "temperature"
            ),

        "humidity":
            row.get(
                "humidity"
            ),

        "wind_speed":
            row.get(
                "wind_speed"
            ),

        "wind_speed_kmh":
            row.get(
                "wind_speed"
            ),

        "rain_chance":
            row.get(
                "rain_chance"
            ),

        "rain_probability_pct":
            row.get(
                "rain_chance"
            ),

        "precipitation":
            row.get(
                "precipitation"
            ),

        "weather_code":
            row.get(
                "weather_code"
            ),

        "weather_condition":
            row.get(
                "weather_condition"
            ),

        "condition":
            row.get(
                "weather_condition"
            ),

        "recorded_at":
            row.get(
                "recorded_at"
            ),

        "source":
            "Open-Meteo"
    }


@app.route(
    "/api/weather",
    methods=["GET"]
)
def weather():

    try:

        live_data = fetch_weather()

        store_weather(
            live_data
        )

        latest = get_latest_weather()

        result = weather_response_from_db(
            latest
        )

        return jsonify(
            result
        )

    except Exception as exc:

        logger.exception(
            "Weather request failed"
        )

        # If live service fails, return
        # the most recent verified record.
        cached = get_latest_weather()

        if cached:

            result = weather_response_from_db(
                cached
            )

            result["cached"] = True
            result["warning"] = (
                "Live weather temporarily "
                "unavailable. Showing latest "
                "stored weather."
            )

            return jsonify(
                result
            )

        return json_error(
            "Weather service unavailable",
            503,
            exc
        )


@app.route(
    "/api/weather/history",
    methods=["GET"]
)
def weather_history():

    try:

        limit = int(
            request.args.get(
                "limit",
                "24"
            )
        )

    except ValueError:

        limit = 24

    limit = max(
        1,
        min(limit, 500)
    )

    connection = get_db()

    rows = connection.execute(
        """
        SELECT *
        FROM weather
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "count": len(rows),
        "data": [
            dict(row)
            for row in rows
        ]
    })


# ============================================================
# MARKET DATA
# ============================================================

COMMODITY_ALIASES = {

    "onion":
        "Onion",

    "wheat":
        "Wheat",

    "onions":
        "Onion"
}


def normalize_commodity(value):

    value = clean_text(
        value
    ).lower()

    return COMMODITY_ALIASES.get(
        value,
        value.title()
    )


def data_gov_market_data(
    commodity
):

    if not DATA_GOV_API_KEY:

        logger.warning(
            "DATA_GOV_API_KEY not configured"
        )

        return []

    params = {

        "api-key":
            DATA_GOV_API_KEY,

        "format":
            "json",

        "limit":
            100,

        "filters[State]":
            "Maharashtra",

        "filters[District]":
            "Ahilyanagar",

        "filters[Commodity]":
            commodity

    }

    response = requests.get(
        DATA_GOV_API_URL,
        params=params,
        timeout=MARKET_TIMEOUT
    )

    response.raise_for_status()

    payload = response.json()

    records = payload.get(
        "records",
        []
    )

    return records


def normalize_market_record(
    record,
    requested_commodity
):

    market = (
        record.get("Market")
        or record.get("market")
        or record.get("Market Name")
        or record.get("market_name")
        or record.get("Mandi")
        or ""
    )

    commodity = (
        record.get("Commodity")
        or record.get("commodity")
        or record.get("Crop")
        or requested_commodity
    )

    min_price = (
        record.get("Min Price")
        or record.get("min_price")
        or record.get("Min_Price")
    )

    max_price = (
        record.get("Max Price")
        or record.get("max_price")
        or record.get("Max_Price")
    )

    modal_price = (
        record.get("Modal Price")
        or record.get("modal_price")
        or record.get("Modal_Price")
    )

    arrival_date = (
        record.get("Arrival Date")
        or record.get("arrival_date")
        or record.get("Arrival_Date")
        or record.get("Date")
        or record.get("date")
    )

    # Some government responses use
    # lowercase/special field names.
    if min_price is None:
        min_price = record.get(
            "min"
        )

    if max_price is None:
        max_price = record.get(
            "max"
        )

    if modal_price is None:
        modal_price = record.get(
            "modal"
        )

    return {

        "market":
            clean_text(market)
            or "Unknown Market",

        "commodity":
            normalize_commodity(
                commodity
            ),

        "min_price":
            safe_float(min_price),

        "max_price":
            safe_float(max_price),

        "modal_price":
            safe_float(modal_price),

        "arrival_date":
            clean_text(
                arrival_date
            ),

        "source":
            "data.gov.in / AGMARKNET"

    }


def store_market_records(
    records
):

    if not records:
        return

    connection = get_db()

    for record in records:

        connection.execute(
            """
            INSERT INTO market_prices (
                market,
                commodity,
                min_price,
                max_price,
                modal_price,
                arrival_date,
                source,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                record["market"],
                record["commodity"],
                record["min_price"],
                record["max_price"],
                record["modal_price"],
                record["arrival_date"],
                record["source"],
                now_iso()
            )
        )

    connection.commit()

    connection.close()


def get_cached_market_records(
    commodity
):

    connection = get_db()

    rows = connection.execute(
        """
        SELECT
            market,
            commodity,
            min_price,
            max_price,
            modal_price,
            arrival_date,
            source,
            created_at
        FROM market_prices
        WHERE LOWER(commodity) = LOWER(?)
        ORDER BY
            arrival_date DESC,
            id DESC
        LIMIT 100
        """,
        (
            commodity,
        )
    ).fetchall()

    connection.close()

    return [
        dict(row)
        for row in rows
    ]


def market_record_to_frontend(
    record
):

    return {

        "market":
            record.get(
                "market"
            ),

        "Market":
            record.get(
                "market"
            ),

        "commodity":
            record.get(
                "commodity"
            ),

        "Commodity":
            record.get(
                "commodity"
            ),

        "crop":
            record.get(
                "commodity"
            ),

        "min_price":
            record.get(
                "min_price"
            ),

        "minPrice":
            record.get(
                "min_price"
            ),

        "max_price":
            record.get(
                "max_price"
            ),

        "maxPrice":
            record.get(
                "max_price"
            ),

        "modal_price":
            record.get(
                "modal_price"
            ),

        "modalPrice":
            record.get(
                "modal_price"
            ),

        "price":
            record.get(
                "modal_price"
            ),

        "arrival_date":
            record.get(
                "arrival_date"
            ),

        "Arrival_Date":
            record.get(
                "arrival_date"
            ),

        "date":
            record.get(
                "arrival_date"
            ),

        "source":
            record.get(
                "source"
            ),

        "created_at":
            record.get(
                "created_at"
            )
    }


def filter_kopargaon_records(
    records
):

    result = []

    for record in records:

        market = str(
            record.get(
                "market",
                ""
            )
        ).lower()

        # Keep Kopargaon, Yeola,
        # Shirdi and other relevant
        # Ahilyanagar markets.
        if any(
            word in market
            for word in [
                "kopargaon",
                "yeola",
                "shirdi"
            ]
        ):

            result.append(
                record
            )

    # If filtering removes everything,
    # return original records rather than
    # displaying nothing.
    return (
        result
        if result
        else records
    )


@app.route(
    "/api/market-prices",
    methods=["GET"]
)
def market_prices():

    commodity = normalize_commodity(
        request.args.get(
            "commodity",
            "Onion"
        )
    )

    try:

        records = data_gov_market_data(
            commodity
        )

        normalized = []

        for record in records:

            parsed = normalize_market_record(
                record,
                commodity
            )

            if parsed["market"]:
                normalized.append(
                    parsed
                )

        normalized = filter_kopargaon_records(
            normalized
        )

        if normalized:

            store_market_records(
                normalized
            )

            frontend_records = [
                market_record_to_frontend(
                    record
                )
                for record in normalized
            ]

            return jsonify({
                "success": True,
                "commodity": commodity,
                "count": len(
                    frontend_records
                ),
                "records":
                    frontend_records,
                "data":
                    frontend_records,
                "prices":
                    frontend_records,
                "source":
                    "data.gov.in / AGMARKNET"
            })

    except Exception as exc:

        logger.exception(
            "Government market request failed"
        )

    # --------------------------------------------------------
    # CACHE FALLBACK
    # --------------------------------------------------------

    cached = get_cached_market_records(
        commodity
    )

    if cached:

        frontend_records = [
            market_record_to_frontend(
                record
            )
            for record in cached
        ]

        return jsonify({

            "success": True,

            "commodity":
                commodity,

            "count":
                len(frontend_records),

            "records":
                frontend_records,

            "data":
                frontend_records,

            "prices":
                frontend_records,

            "cached":
                True,

            "source":
                "SQLite cached market data"

        })

    # --------------------------------------------------------
    # No data
    # --------------------------------------------------------

    return jsonify({

        "success": False,

        "commodity":
            commodity,

        "count":
            0,

        "records": [],

        "data": [],

        "prices": [],

        "error":
            "Market data is currently unavailable."

    })


@app.route(
    "/api/market/history",
    methods=["GET"]
)
def market_history():

    commodity = normalize_commodity(
        request.args.get(
            "commodity",
            request.args.get(
                "crop",
                "Onion"
            )
        )
    )

    try:

        limit = int(
            request.args.get(
                "limit",
                "100"
            )
        )

    except ValueError:

        limit = 100

    limit = max(
        1,
        min(limit, 1000)
    )

    connection = get_db()

    rows = connection.execute(
        """
        SELECT *
        FROM market_prices
        WHERE LOWER(commodity) = LOWER(?)
        ORDER BY id DESC
        LIMIT ?
        """,
        (
            commodity,
            limit
        )
    ).fetchall()

    connection.close()

    return jsonify({

        "success": True,

        "commodity":
            commodity,

        "count":
            len(rows),

        "history": [
            dict(row)
            for row in rows
        ]

    })


# Compatibility endpoint for your
# older market frontend/API.
@app.route(
    "/api/market",
    methods=["GET"]
)
def legacy_market():

    commodity = normalize_commodity(
        request.args.get(
            "commodity",
            request.args.get(
                "crop",
                "onion"
            )
        )
    )

    # Reuse current endpoint logic.
    try:

        records = data_gov_market_data(
            commodity
        )

        normalized = []

        for record in records:

            parsed = normalize_market_record(
                record,
                commodity
            )

            if parsed["market"]:
                normalized.append(
                    parsed
                )

        if normalized:

            store_market_records(
                normalized
            )

            return jsonify({

                "success": True,

                "crop":
                    commodity.lower(),

                "commodity":
                    commodity,

                "record":
                    market_record_to_frontend(
                        normalized[0]
                    ),

                "records": [
                    market_record_to_frontend(
                        x
                    )
                    for x in normalized
                ],

                "data": [
                    market_record_to_frontend(
                        x
                    )
                    for x in normalized
                ]

            })

    except Exception as exc:

        logger.exception(
            "Legacy market request failed"
        )

    cached = get_cached_market_records(
        commodity
    )

    if cached:

        return jsonify({

            "success": True,

            "crop":
                commodity.lower(),

            "commodity":
                commodity,

            "record":
                market_record_to_frontend(
                    cached[0]
                ),

            "records": [
                market_record_to_frontend(
                    x
                )
                for x in cached
            ],

            "data": [
                market_record_to_frontend(
                    x
                )
                for x in cached
            ],

            "cached":
                True

        })

    return jsonify({

        "success": False,

        "crop":
            commodity.lower(),

        "commodity":
            commodity,

        "records": [],

        "data": [],

        "error":
            "Market data unavailable"

    })


# ============================================================
# HUGGING FACE AI
# ============================================================

def ask_huggingface(
    question,
    language="en",
    farmer=None
):

    if not HF_TOKEN:

        raise RuntimeError(
            "HF_TOKEN is not configured."
        )

    language_names = {

        "en": "English",

        "hi": "Hindi",

        "mr": "Marathi"

    }

    language_name = language_names.get(
        language,
        "English"
    )

    farmer = farmer or {}

    farmer_context = ""

    if farmer:

        farmer_context = f"""
Farmer information:
Name: {farmer.get("name", "Unknown")}
Village: {farmer.get("village", "Unknown")}
State: {farmer.get("state", "Maharashtra")}
Land area: {farmer.get("landArea", "Unknown")}
Preferred market: {farmer.get("preferredMarket", "Unknown")}
"""

    system_prompt = f"""
You are SmartAgri Farmer Assistant.

You help Indian farmers with:
- crop cultivation
- irrigation
- weather-related farming decisions
- onion and wheat cultivation
- market prices
- fertilizer and soil-management concepts
- pest and disease prevention
- harvesting
- storage
- government agriculture schemes

The user prefers {language_name}.

Answer in {language_name} unless the user explicitly asks
for another language.

Keep answers practical and easy for a farmer to understand.

Do not invent live market prices, weather measurements,
government benefits, or official rules.

If exact current data is needed, clearly say that the user
should verify it from the official source.

Do not claim to diagnose a crop disease with certainty
without an actual diagnostic model.

{farmer_context}
"""

    payload = {

        "model":
            HF_MODEL,

        "messages": [

            {
                "role":
                    "system",

                "content":
                    system_prompt
            },

            {
                "role":
                    "user",

                "content":
                    question
            }

        ],

        "temperature":
            0.4,

        "max_tokens":
            700
    }

    headers = {

        "Authorization":
            f"Bearer {HF_TOKEN}",

        "Content-Type":
            "application/json",

        "Accept":
            "application/json"

    }

    response = requests.post(

        f"{HF_BASE_URL}/chat/completions",

        headers=headers,

        json=payload,

        timeout=45

    )

    if response.status_code >= 400:

        logger.error(
            "Hugging Face error %s: %s",
            response.status_code,
            response.text[:1000]
        )

        raise RuntimeError(
            "Hugging Face AI request failed: "
            f"HTTP {response.status_code}"
        )

    result = response.json()

    choices = result.get(
        "choices",
        []
    )

    if not choices:

        raise RuntimeError(
            "Hugging Face returned no AI response."
        )

    message = choices[0].get(
        "message",
        {}
    )

    answer = message.get(
        "content"
    )

    if not answer:

        raise RuntimeError(
            "Hugging Face returned an empty answer."
        )

    return str(
        answer
    ).strip()


@app.route(
    "/api/ai",
    methods=["POST"]
)
def ai():

    data = request.get_json(
        silent=True
    ) or {}

    question = clean_text(
        data.get(
            "question"
        )
    )

    language = clean_text(
        data.get(
            "language",
            "en"
        )
    ).lower()

    farmer = data.get(
        "farmer"
    ) or {}

    if not question:

        return json_error(
            "Question is required.",
            400
        )

    if len(question) > 5000:

        return json_error(
            "Question is too long.",
            400
        )

    try:

        answer = ask_huggingface(
            question,
            language,
            farmer
        )

        return jsonify({

            "success": True,

            "answer":
                answer,

            "response":
                answer,

            "message":
                answer,

            "model":
                HF_MODEL

        })

    except Exception as exc:

        logger.exception(
            "AI request failed"
        )

        return json_error(
            "AI service is currently unavailable.",
            503,
            exc
        )


# ============================================================
# CROP HEALTH
# ============================================================

@app.route(
    "/api/crop-health",
    methods=["POST"]
)
def crop_health():

    uploaded_file = request.files.get(
        "image"
    )

    if not uploaded_file:

        return json_error(
            "No image was uploaded.",
            400
        )

    filename = (
        uploaded_file.filename
        or ""
    )

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    }

    extension = os.path.splitext(
        filename
    )[1].lower()

    if extension not in allowed_extensions:

        return json_error(
            "Please upload JPG, JPEG, PNG or WEBP image.",
            400
        )

    # --------------------------------------------------------
    # Current safe implementation
    #
    # The endpoint is intentionally available so the frontend
    # does not break.
    #
    # To perform actual plant-disease classification, set:
    #
    # HF_CROP_MODEL
    #
    # to a compatible Hugging Face vision model and implement
    # the provider/model supported for that task.
    # --------------------------------------------------------

    return jsonify({

        "success": False,

        "diagnosis":
            "Crop-health AI model is not configured yet.",

        "result":
            "Crop-health AI model is not configured yet.",

        "prediction":
            "Crop-health AI model is not configured yet.",

        "message":
            "The image was received successfully. "
            "Configure HF_CROP_MODEL with a compatible "
            "plant-disease vision model to enable diagnosis."

    }), 501


# ============================================================
# STATUS
# ============================================================

@app.route(
    "/api/status",
    methods=["GET"]
)
def status():

    connection = get_db()

    weather_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM weather
        """
    ).fetchone()[0]

    market_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM market_prices
        """
    ).fetchone()[0]

    latest_weather = connection.execute(
        """
        SELECT *
        FROM weather
        ORDER BY id DESC
        LIMIT 1
        """
    ).fetchone()

    connection.close()

    return jsonify({

        "success":
            True,

        "service":
            "SmartAgri Flask Backend",

        "status":
            "online",

        "database":
            DATABASE,

        "database_type":
            "SQLite",

        "ai_configured":
            bool(HF_TOKEN),

        "ai_model":
            HF_MODEL
            if HF_TOKEN
            else None,

        "weather_records":
            weather_count,

        "market_records":
            market_count,

        "latest_weather":
            dict(latest_weather)
            if latest_weather
            else None

    })


# ============================================================
# HEALTH
# ============================================================

@app.route(
    "/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "status":
            "healthy",

        "service":
            "SmartAgri",

        "timestamp":
            now_iso()

    })


# ============================================================
# HOME
# ============================================================

@app.route(
    "/",
    methods=["GET"]
)
def home():

    return jsonify({

        "name":
            "SmartAgri",

        "status":
            "running",

        "message":
            "SmartAgri Flask backend is running.",

        "endpoints": [

            "/health",

            "/api/status",

            "/api/weather",

            "/api/weather/history",

            "/api/market-prices?commodity=Onion",

            "/api/market-prices?commodity=Wheat",

            "/api/market/history?commodity=Onion",

            "/api/ai",

            "/api/crop-health"

        ]

    })


# ============================================================
# ERROR HANDLERS
# ============================================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({

        "success":
            False,

        "error":
            "Endpoint not found."

    }), 404


@app.errorhandler(500)
def internal_error(error):

    logger.exception(
        "Internal server error"
    )

    return jsonify({

        "success":
            False,

        "error":
            "Internal server error."

    }), 500


# ============================================================
# START
# ============================================================

if __name__ == "__main__":

    logger.info(
        "======================================"
    )

    logger.info(
        "SmartAgri Flask Backend"
    )

    logger.info(
        "Database: %s",
        DATABASE
    )

    logger.info(
        "AI configured: %s",
        bool(HF_TOKEN)
    )

    logger.info(
        "AI model: %s",
        HF_MODEL
    )

    logger.info(
        "Weather location: %s",
        DEFAULT_LOCATION
    )

    logger.info(
        "======================================"
    )

    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=False
    )
