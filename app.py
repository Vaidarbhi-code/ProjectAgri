# ============================================================
# SMARTAGRI
# COMPLETE FLASK BACKEND
#
# Services:
#   AI          -> OpenAI
#   Weather     -> Open-Meteo
#   Mandi       -> data.gov.in / AGMARKNET
#   Crop Health -> Plant.id
#   Database    -> SQLite
#
# Existing frontend endpoints:
#
# GET  /
# GET  /health
# GET  /api/status
#
# GET  /api/weather
# GET  /api/weather/history
#
# GET  /api/market
# GET  /api/market-prices
# GET  /api/market/history
#
# POST /api/ai
#
# POST /api/crop-health
#
# Database endpoints:
#
# GET  /api/database
# GET  /api/database/<table>
#
# ============================================================


import os
import re
import json
import sqlite3
import logging
from datetime import datetime, timezone

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


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


# ============================================================
# LOGGING
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logger = logging.getLogger("smartagri")


# ============================================================
# CONFIGURATION
# ============================================================

PORT = int(
    os.getenv(
        "PORT",
        "5000"
    )
)

DATABASE = os.getenv(
    "DATABASE_PATH",
    "smartagri.db"
)


# ============================================================
# OPENAI CONFIGURATION
# ============================================================

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY",
    ""
).strip()

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-4o-mini"
).strip()

OPENAI_URL = (
    "https://api.openai.com/v1/chat/completions"
)


# ============================================================
# OPEN-METEO CONFIGURATION
# ============================================================

OPEN_METEO_URL = (
    "https://api.open-meteo.com/v1/forecast"
)

KOPARGAON_LAT = float(
    os.getenv(
        "KOPARGAON_LAT",
        "19.8833"
    )
)

KOPARGAON_LON = float(
    os.getenv(
        "KOPARGAON_LON",
        "74.4833"
    )
)

WEATHER_LOCATION = os.getenv(
    "WEATHER_LOCATION",
    "Kopargaon"
)

WEATHER_DAYS = int(
    os.getenv(
        "WEATHER_DAYS",
        "7"
    )
)


# ============================================================
# DATA.GOV.IN CONFIGURATION
# ============================================================

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
).strip()

DATA_GOV_RESOURCE_ID = os.getenv(
    "DATA_GOV_RESOURCE_ID",
    "9ef84268-d588-465a-a308-a864a43d0070"
).strip()

DATA_GOV_URL = (
    "https://api.data.gov.in/resource/"
    + DATA_GOV_RESOURCE_ID
)


# ============================================================
# PLANT.ID CONFIGURATION
# ============================================================

PLANT_ID_API_KEY = os.getenv(
    "PLANT_ID_API_KEY",
    ""
).strip()

PLANT_ID_URL = (
    "https://plant.id/api/v3/identification"
)


# ============================================================
# REQUEST CONFIGURATION
# ============================================================

REQUEST_TIMEOUT = int(
    os.getenv(
        "REQUEST_TIMEOUT",
        "20"
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

    # ========================================================
    # WEATHER TABLE
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            location TEXT,

            latitude REAL,

            longitude REAL,

            temperature REAL,

            humidity REAL,

            wind_speed REAL,

            precipitation REAL,

            weather_code INTEGER,

            weather_condition TEXT,

            forecast_json TEXT,

            recorded_at TEXT,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # MANDI PRICES TABLE
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS mandi_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            state TEXT,

            district TEXT,

            market TEXT,

            commodity TEXT,

            variety TEXT,

            min_price REAL,

            max_price REAL,

            modal_price REAL,

            arrival_date TEXT,

            source TEXT,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # AI HISTORY TABLE
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS ai_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            question TEXT NOT NULL,

            answer TEXT,

            language TEXT,

            model TEXT,

            farmer_json TEXT,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # PLANT HEALTH TABLE
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS plant_health (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            filename TEXT,

            plant_name TEXT,

            disease_name TEXT,

            probability REAL,

            diagnosis_json TEXT,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # INDEXES
    # ========================================================

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_weather_created
        ON weather(created_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_mandi_commodity
        ON mandi_prices(commodity)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_mandi_market
        ON mandi_prices(market)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_ai_created
        ON ai_history(created_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_plant_created
        ON plant_health(created_at)
        """
    )

    connection.commit()

    connection.close()

    logger.info(
        "SQLite database initialized: %s",
        DATABASE
    )


initialize_database()


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def now_iso():

    return datetime.now(
        timezone.utc
    ).isoformat()


def clean_text(value):

    if value is None:
        return ""

    return str(value).strip()


def safe_float(value):

    if value is None:
        return None

    if isinstance(
        value,
        (int, float)
    ):
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

    return jsonify(
        payload
    ), status


# ============================================================
# WEATHER
# ============================================================

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


def get_weather_forecast(
    lat,
    lon,
    days=7
):

    params = {

        "latitude": lat,

        "longitude": lon,

        "current": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
            "weather_code"
        ]),

        "daily": ",".join([
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "precipitation_probability_max",
            "weather_code"
        ]),

        "timezone": "Asia/Kolkata",

        "forecast_days": days
    }

    response = requests.get(
        OPEN_METEO_URL,
        params=params,
        timeout=REQUEST_TIMEOUT
    )

    response.raise_for_status()

    data = response.json()

    current = data.get(
        "current",
        {}
    )

    daily = data.get(
        "daily",
        {}
    )

    dates = daily.get(
        "time",
        []
    )

    forecast = []

    max_temps = daily.get(
        "temperature_2m_max",
        []
    )

    min_temps = daily.get(
        "temperature_2m_min",
        []
    )

    rainfall = daily.get(
        "precipitation_sum",
        []
    )

    rain_probability = daily.get(
        "precipitation_probability_max",
        []
    )

    weather_codes = daily.get(
        "weather_code",
        []
    )

    for i, date in enumerate(dates):

        forecast.append({

            "date":
                date,

            "temp_max_c":
                max_temps[i]
                if i < len(max_temps)
                else None,

            "temp_min_c":
                min_temps[i]
                if i < len(min_temps)
                else None,

            "rainfall_mm":
                rainfall[i]
                if i < len(rainfall)
                else None,

            "rain_probability_pct":
                rain_probability[i]
                if i < len(rain_probability)
                else None,

            "weather_code":
                weather_codes[i]
                if i < len(weather_codes)
                else None,

            "condition":
                weather_code_description(
                    weather_codes[i]
                    if i < len(weather_codes)
                    else None
                )
        })

    return {

        "current": {

            "temperature_c":
                current.get(
                    "temperature_2m"
                ),

            "humidity_pct":
                current.get(
                    "relative_humidity_2m"
                ),

            "wind_speed_kmh":
                current.get(
                    "wind_speed_10m"
                ),

            "precipitation_mm":
                current.get(
                    "precipitation"
                ),

            "weather_code":
                current.get(
                    "weather_code"
                ),

            "condition":
                weather_code_description(
                    current.get(
                        "weather_code"
                    )
                )
        },

        "forecast":
            forecast
    }


def save_weather(
    weather_data
):

    current = weather_data.get(
        "current",
        {}
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
            precipitation,
            weather_code,
            weather_condition,
            forecast_json,
            recorded_at,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            WEATHER_LOCATION,

            KOPARGAON_LAT,

            KOPARGAON_LON,

            safe_float(
                current.get(
                    "temperature_c"
                )
            ),

            safe_float(
                current.get(
                    "humidity_pct"
                )
            ),

            safe_float(
                current.get(
                    "wind_speed_kmh"
                )
            ),

            safe_float(
                current.get(
                    "precipitation_mm"
                )
            ),

            current.get(
                "weather_code"
            ),

            current.get(
                "condition"
            ),

            json.dumps(
                weather_data.get(
                    "forecast",
                    []
                ),
                ensure_ascii=False
            ),

            now_iso(),

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


def format_weather_response(
    row
):

    if not row:
        return None

    try:

        forecast = json.loads(
            row.get(
                "forecast_json"
            ) or "[]"
        )

    except Exception:

        forecast = []

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

        "humidity_pct":
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

        "precipitation":
            row.get(
                "precipitation"
            ),

        "precipitation_mm":
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

        "forecast":
            forecast,

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

        weather_data = get_weather_forecast(
            KOPARGAON_LAT,
            KOPARGAON_LON,
            WEATHER_DAYS
        )

        save_weather(
            weather_data
        )

        latest = get_latest_weather()

        return jsonify(
            format_weather_response(
                latest
            )
        )

    except Exception as exc:

        logger.exception(
            "Weather request failed"
        )

        cached = get_latest_weather()

        if cached:

            result = format_weather_response(
                cached
            )

            result["cached"] = True

            result["warning"] = (
                "Live weather is temporarily "
                "unavailable. Showing the latest "
                "stored weather."
            )

            return jsonify(
                result
            )

        return json_error(
            "Weather service unavailable.",
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
                "50"
            )
        )

    except ValueError:

        limit = 50

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

        "count":
            len(rows),

        "data": [
            dict(row)
            for row in rows
        ]
    })


# ============================================================
# MANDI / MARKET PRICES
# ============================================================

COMMODITY_ALIASES = {

    "onion":
        "Onion",

    "onions":
        "Onion",

    "wheat":
        "Wheat",

    "tomato":
        "Tomato",

    "tomatoes":
        "Tomato",

    "potato":
        "Potato",

    "potatoes":
        "Potato"
}


def normalize_commodity(
    value
):

    value = clean_text(
        value
    ).lower()

    return COMMODITY_ALIASES.get(
        value,
        value.title()
    )


def get_mandi_prices(
    commodity="Onion",
    state="Maharashtra",
    district=None,
    market=None,
    limit=50
):

    if not DATA_GOV_API_KEY:

        raise RuntimeError(
            "DATA_GOV_API_KEY is missing."
        )

    params = {

        "api-key":
            DATA_GOV_API_KEY,

        "format":
            "json",

        "limit":
            limit
    }

    if state:

        params[
            "filters[state]"
        ] = state

    if commodity:

        params[
            "filters[commodity]"
        ] = commodity

    if district:

        params[
            "filters[district]"
        ] = district

    if market:

        params[
            "filters[market]"
        ] = market

    response = requests.get(
        DATA_GOV_URL,
        params=params,
        timeout=REQUEST_TIMEOUT
    )

    response.raise_for_status()

    payload = response.json()

    records = payload.get(
        "records",
        []
    )

    prices = []

    for record in records:

        prices.append({

            "state":
                record.get(
                    "state"
                ),

            "district":
                record.get(
                    "district"
                ),

            "market":
                record.get(
                    "market"
                ),

            "commodity":
                record.get(
                    "commodity"
                ),

            "variety":
                record.get(
                    "variety"
                ),

            "min_price":
                safe_float(
                    record.get(
                        "min_price"
                    )
                ),

            "max_price":
                safe_float(
                    record.get(
                        "max_price"
                    )
                ),

            "modal_price":
                safe_float(
                    record.get(
                        "modal_price"
                    )
                ),

            "date":
                record.get(
                    "arrival_date"
                ),

            "source":
                "data.gov.in / AGMARKNET"
        })

    return prices


def save_mandi_prices(
    prices
):

    if not prices:
        return

    connection = get_db()

    for price in prices:

        connection.execute(
            """
            INSERT INTO mandi_prices (
                state,
                district,
                market,
                commodity,
                variety,
                min_price,
                max_price,
                modal_price,
                arrival_date,
                source,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                price.get("state"),

                price.get("district"),

                price.get("market"),

                price.get("commodity"),

                price.get("variety"),

                price.get("min_price"),

                price.get("max_price"),

                price.get("modal_price"),

                price.get("date"),

                price.get("source"),

                now_iso()
            )
        )

    connection.commit()

    connection.close()


def frontend_market_record(
    record
):

    return {

        "state":
            record.get(
                "state"
            ),

        "State":
            record.get(
                "state"
            ),

        "district":
            record.get(
                "district"
            ),

        "District":
            record.get(
                "district"
            ),

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

        "variety":
            record.get(
                "variety"
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
                "date"
            ),

        "Arrival_Date":
            record.get(
                "date"
            ),

        "date":
            record.get(
                "date"
            ),

        "source":
            record.get(
                "source"
            )
    }


def get_cached_market_prices(
    commodity
):

    connection = get_db()

    rows = connection.execute(
        """
        SELECT *
        FROM mandi_prices
        WHERE LOWER(commodity) = LOWER(?)
        ORDER BY id DESC
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


@app.route(
    "/api/market-prices",
    methods=["GET"]
)
def market_prices():

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

        prices = get_mandi_prices(

            commodity=commodity,

            state=request.args.get(
                "state",
                "Maharashtra"
            ),

            district=request.args.get(
                "district"
            ),

            market=request.args.get(
                "market"
            ),

            limit=min(
                int(
                    request.args.get(
                        "limit",
                        "50"
                    )
                ),
                100
            )
        )

        if prices:

            save_mandi_prices(
                prices
            )

            records = [
                frontend_market_record(
                    price
                )
                for price in prices
            ]

            return jsonify({

                "success": True,

                "commodity":
                    commodity,

                "count":
                    len(records),

                "records":
                    records,

                "data":
                    records,

                "prices":
                    records,

                "source":
                    "data.gov.in / AGMARKNET"
            })

    except Exception as exc:

        logger.exception(
            "Mandi request failed"
        )

    cached = get_cached_market_prices(
        commodity
    )

    if cached:

        records = [
            frontend_market_record(
                price
            )
            for price in cached
        ]

        return jsonify({

            "success": True,

            "commodity":
                commodity,

            "count":
                len(records),

            "records":
                records,

            "data":
                records,

            "prices":
                records,

            "cached":
                True,

            "source":
                "SQLite cached mandi data"
        })

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
    "/api/market",
    methods=["GET"]
)
def legacy_market():

    response = market_prices()

    return response


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
        FROM mandi_prices
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
        ],

        "data": [
            dict(row)
            for row in rows
        ]
    })


# ============================================================
# OPENAI AI ASSISTANT
# ============================================================

def ask_openai(
    question,
    language="en",
    farmer=None
):

    if not OPENAI_API_KEY:

        raise RuntimeError(
            "OPENAI_API_KEY is missing."
        )

    language_names = {

        "en":
            "English",

        "hi":
            "Hindi",

        "mr":
            "Marathi"
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

Name:
{farmer.get("name", "Unknown")}

Village:
{farmer.get("village", "Unknown")}

State:
{farmer.get("state", "Maharashtra")}

Land area:
{farmer.get("landArea", "Unknown")}

Preferred market:
{farmer.get("preferredMarket", "Unknown")}
"""

    system_prompt = f"""
You are SmartAgri Farmer Assistant.

You help Indian farmers with:

- crop cultivation
- irrigation
- weather-related farming decisions
- onion cultivation
- wheat cultivation
- market-price interpretation
- fertilizer concepts
- soil management
- pest prevention
- disease prevention
- harvesting
- storage
- agriculture schemes

The user's preferred language is {language_name}.

Answer in {language_name} unless the user explicitly asks
for another language.

Keep answers practical and easy for farmers to understand.

Do not invent live market prices.

Do not invent weather measurements.

Do not invent government scheme rules.

If current information is required, tell the farmer to
verify it with the relevant official source.

Do not claim a crop disease diagnosis with certainty
without an actual diagnostic model.

{farmer_context}
"""

    payload = {

        "model":
            OPENAI_MODEL,

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
            "Bearer " + OPENAI_API_KEY,

        "Content-Type":
            "application/json"
    }

    response = requests.post(

        OPENAI_URL,

        headers=headers,

        json=payload,

        timeout=45
    )

    if response.status_code >= 400:

        logger.error(
            "OpenAI error %s: %s",
            response.status_code,
            response.text[:1000]
        )

        raise RuntimeError(
            "OpenAI request failed: "
            f"HTTP {response.status_code}"
        )

    result = response.json()

    choices = result.get(
        "choices",
        []
    )

    if not choices:

        raise RuntimeError(
            "OpenAI returned no response."
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
            "OpenAI returned an empty answer."
        )

    return str(
        answer
    ).strip()


def save_ai_history(
    question,
    answer,
    language,
    farmer
):

    connection = get_db()

    connection.execute(
        """
        INSERT INTO ai_history (
            question,
            answer,
            language,
            model,
            farmer_json,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (

            question,

            answer,

            language,

            OPENAI_MODEL,

            json.dumps(
                farmer or {},
                ensure_ascii=False
            ),

            now_iso()
        )
    )

    connection.commit()

    connection.close()


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

        answer = ask_openai(

            question,

            language,

            farmer
        )

        save_ai_history(

            question,

            answer,

            language,

            farmer
        )

        return jsonify({

            "success":
                True,

            "answer":
                answer,

            "response":
                answer,

            "message":
                answer,

            "model":
                OPENAI_MODEL
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
# PLANT.ID CROP HEALTH
# ============================================================

def plant_id_identification(
    image_bytes,
    filename
):

    if not PLANT_ID_API_KEY:

        raise RuntimeError(
            "PLANT_ID_API_KEY is missing."
        )

    import base64

    encoded_image = base64.b64encode(
        image_bytes
    ).decode(
        "utf-8"
    )

    headers = {

        "Api-Key":
            PLANT_ID_API_KEY,

        "Content-Type":
            "application/json"
    }

    payload = {

        "images": [
            encoded_image
        ],

        "health":
            "all",

        "similar_images":
            True,

        "language":
            "en"
    }

    response = requests.post(

        PLANT_ID_URL,

        headers=headers,

        json=payload,

        timeout=60
    )

    if response.status_code >= 400:

        logger.error(
            "Plant.id error %s: %s",
            response.status_code,
            response.text[:1000]
        )

        raise RuntimeError(
            "Plant.id request failed: "
            f"HTTP {response.status_code}"
        )

    return response.json()


def extract_plant_health(
    result
):

    plant_name = None

    disease_name = None

    probability = None

    # --------------------------------------------------------
    # Plant identification
    # --------------------------------------------------------

    suggestions = (
        result.get(
            "result",
            {}
        )
        .get(
            "classification",
            {}
        )
        .get(
            "suggestions",
            []
        )
    )

    if suggestions:

        best = suggestions[0]

        plant_name = (
            best.get(
                "name"
            )
        )

        probability = safe_float(
            best.get(
                "probability"
            )
        )

    # --------------------------------------------------------
    # Health assessment
    # --------------------------------------------------------

    health = (
        result.get(
            "result",
            {}
        )
        .get(
            "disease",
            {}
        )
    )

    disease_suggestions = (
        health.get(
            "suggestions",
            []
        )
    )

    if disease_suggestions:

        best_disease = (
            disease_suggestions[0]
        )

        disease_name = (
            best_disease.get(
                "name"
            )
        )

        disease_probability = (
            safe_float(
                best_disease.get(
                    "probability"
                )
            )
        )

        if disease_probability is not None:

            probability = (
                disease_probability
            )

    return {

        "plant_name":
            plant_name,

        "disease_name":
            disease_name,

        "probability":
            probability
    }


def save_plant_health(
    filename,
    extracted,
    raw_result
):

    connection = get_db()

    connection.execute(
        """
        INSERT INTO plant_health (
            filename,
            plant_name,
            disease_name,
            probability,
            diagnosis_json,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (

            filename,

            extracted.get(
                "plant_name"
            ),

            extracted.get(
                "disease_name"
            ),

            extracted.get(
                "probability"
            ),

            json.dumps(
                raw_result,
                ensure_ascii=False
            ),

            now_iso()
        )
    )

    connection.commit()

    connection.close()


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
        or "crop-image"
    )

    extension = os.path.splitext(
        filename
    )[1].lower()

    allowed_extensions = {

        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    }

    if extension not in allowed_extensions:

        return json_error(
            "Please upload JPG, JPEG, PNG or WEBP.",
            400
        )

    try:

        image_bytes = (
            uploaded_file.read()
        )

        if not image_bytes:

            return json_error(
                "Uploaded image is empty.",
                400
            )

        result = plant_id_identification(

            image_bytes,

            filename
        )

        extracted = extract_plant_health(
            result
        )

        save_plant_health(

            filename,

            extracted,

            result
        )

        plant_name = (
            extracted.get(
                "plant_name"
            )
            or "Unknown"
        )

        disease_name = (
            extracted.get(
                "disease_name"
            )
            or "No disease detected"
        )

        probability = (
            extracted.get(
                "probability"
            )
        )

        return jsonify({

            "success":
                True,

            "plant":
                plant_name,

            "plant_name":
                plant_name,

            "disease":
                disease_name,

            "disease_name":
                disease_name,

            "probability":
                probability,

            "diagnosis":
                disease_name,

            "prediction":
                disease_name,

            "result":
                disease_name,

            "message":
                "Crop image analyzed successfully.",

            "raw":
                result
        })

    except Exception as exc:

        logger.exception(
            "Crop-health request failed"
        )

        return json_error(
            "Crop health analysis is currently unavailable.",
            503,
            exc
        )


# ============================================================
# DATABASE API
# ============================================================

ALLOWED_TABLES = {

    "weather",

    "mandi_prices",

    "ai_history",

    "plant_health"
}


@app.route(
    "/api/database",
    methods=["GET"]
)
def database_info():

    connection = get_db()

    tables = {}

    for table in ALLOWED_TABLES:

        row = connection.execute(
            f"""
            SELECT COUNT(*) AS count
            FROM {table}
            """
        ).fetchone()

        tables[table] = row["count"]

    connection.close()

    return jsonify({

        "success":
            True,

        "database":
            DATABASE,

        "database_type":
            "SQLite",

        "tables":
            tables,

        "message":
            "SmartAgri database is available."
    })


@app.route(
    "/api/database/<table>",
    methods=["GET"]
)
def database_table(
    table
):

    table = table.lower().strip()

    if table not in ALLOWED_TABLES:

        return json_error(
            "Invalid table name.",
            400
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
        f"""
        SELECT *
        FROM {table}
        ORDER BY id DESC
        LIMIT ?
        """,
        (
            limit,
        )
    ).fetchall()

    columns = []

    if rows:

        columns = list(
            rows[0].keys()
        )

    else:

        table_info = connection.execute(
            f"""
            PRAGMA table_info({table})
            """
        ).fetchall()

        columns = [
            row["name"]
            for row in table_info
        ]

    count_row = connection.execute(
        f"""
        SELECT COUNT(*) AS count
        FROM {table}
        """
    ).fetchone()

    connection.close()

    return jsonify({

        "success":
            True,

        "database":
            DATABASE,

        "table":
            table,

        "total_records":
            count_row["count"],

        "returned_records":
            len(rows),

        "columns":
            columns,

        "data": [
            dict(row)
            for row in rows
        ]
    })


# ============================================================
# STATUS
# ============================================================

@app.route(
    "/api/status",
    methods=["GET"]
)
def status():

    connection = get_db()

    counts = {}

    for table in ALLOWED_TABLES:

        row = connection.execute(
            f"""
            SELECT COUNT(*) AS count
            FROM {table}
            """
        ).fetchone()

        counts[table] = row["count"]

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

        "services": {

            "openai":
                bool(
                    OPENAI_API_KEY
                ),

            "open_meteo":
                True,

            "data_gov":
                bool(
                    DATA_GOV_API_KEY
                ),

            "plant_id":
                bool(
                    PLANT_ID_API_KEY
                )
        },

        "ai_model":
            OPENAI_MODEL
            if OPENAI_API_KEY
            else None,

        "weather_location":
            WEATHER_LOCATION,

        "weather_records":
            counts["weather"],

        "market_records":
            counts["mandi_prices"],

        "ai_records":
            counts["ai_history"],

        "plant_health_records":
            counts["plant_health"],

        "latest_weather":
            dict(
                latest_weather
            )
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

        "database":
            DATABASE,

        "endpoints": [

            "/health",

            "/api/status",

            "/api/database",

            "/api/database/weather",

            "/api/database/mandi_prices",

            "/api/database/ai_history",

            "/api/database/plant_health",

            "/api/weather",

            "/api/weather/history",

            "/api/market-prices?commodity=Onion",

            "/api/market?commodity=Onion",

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
# START SERVER
# ============================================================

if __name__ == "__main__":

    logger.info(
        "=========================================="
    )

    logger.info(
        "        SMARTAGRI BACKEND"
    )

    logger.info(
        "=========================================="
    )

    logger.info(
        "Database: %s",
        DATABASE
    )

    logger.info(
        "OpenAI configured: %s",
        bool(
            OPENAI_API_KEY
        )
    )

    logger.info(
        "OpenAI model: %s",
        OPENAI_MODEL
    )

    logger.info(
        "Data.gov configured: %s",
        bool(
            DATA_GOV_API_KEY
        )
    )

    logger.info(
        "Plant.id configured: %s",
        bool(
            PLANT_ID_API_KEY
        )
    )

    logger.info(
        "Weather location: %s",
        WEATHER_LOCATION
    )

    logger.info(
        "=========================================="
    )

    app.run(

        host="0.0.0.0",

        port=PORT,

        debug=False
    )
