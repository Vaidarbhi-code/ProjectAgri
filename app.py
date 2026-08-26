# ============================================================
# SMARTAGRI - COMPLETE FLASK BACKEND
#
# Services:
#   AI             -> OpenAI
#   Weather        -> Open-Meteo
#   Market Prices  -> data.gov.in / AGMARKNET
#   Database       -> SQLite
#
# Frontend endpoints:
#
#   GET  /
#   GET  /health
#   GET  /api/status
#
#   GET  /api/weather
#   GET  /api/weather/history
#
#   GET  /api/market-prices
#   GET  /api/market
#   GET  /api/market/history
#
#   POST /api/ai
#   POST /api/crop-health
#
# ============================================================

import os
import re
import json
import sqlite3
import logging
import base64

from datetime import datetime, timezone

import requests

from flask import (
    Flask,
    jsonify,
    request
)

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

OPENAI_API_URL = (
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

DATA_GOV_API_URL = (
    "https://api.data.gov.in/resource/"
    + DATA_GOV_RESOURCE_ID
)


# ============================================================
# MARKET CONFIGURATION
# ============================================================

MARKET_STATE = os.getenv(
    "MARKET_STATE",
    "Maharashtra"
)

MARKET_DISTRICT = os.getenv(
    "MARKET_DISTRICT",
    "Ahmednagar"
)

MARKET_NAME = os.getenv(
    "MARKET_NAME",
    "Kopargaon"
)


# ============================================================
# REQUEST SETTINGS
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

    # --------------------------------------------------------
    # WEATHER TABLE
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

            precipitation REAL,

            recorded_at TEXT NOT NULL,

            created_at TEXT NOT NULL
        )
        """
    )

    # --------------------------------------------------------
    # WEATHER FORECAST TABLE
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS weather_forecast (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            location TEXT NOT NULL,

            forecast_date TEXT NOT NULL,

            temperature_max REAL,

            temperature_min REAL,

            rainfall REAL,

            rain_probability REAL,

            created_at TEXT NOT NULL
        )
        """
    )

    # --------------------------------------------------------
    # MARKET TABLE
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS market_prices (

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

    # --------------------------------------------------------
    # INDEXES
    # --------------------------------------------------------

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_weather_time
        ON weather(recorded_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_market_search
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
        "SQLite database initialized: %s",
        DATABASE
    )


initialize_database()


# ============================================================
# GENERAL HELPERS
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

    text = str(
        value
    ).strip()

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

    response = {
        "success": False,
        "error": message
    }

    if details:
        response["details"] = str(
            details
        )

    return jsonify(
        response
    ), status


# ============================================================
# WEATHER
# ============================================================

def get_weather_forecast(
    lat,
    lon,
    days=7
):
    """
    Fetch live weather from Open-Meteo.

    No fake weather values are generated.
    """

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
            "precipitation_probability_max"
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

    for i, date in enumerate(dates):

        forecast.append({

            "date": date,

            "temp_max_c":
                daily.get(
                    "temperature_2m_max",
                    [None] * len(dates)
                )[i],

            "temp_min_c":
                daily.get(
                    "temperature_2m_min",
                    [None] * len(dates)
                )[i],

            "rainfall_mm":
                daily.get(
                    "precipitation_sum",
                    [None] * len(dates)
                )[i],

            "rain_probability_pct":
                daily.get(
                    "precipitation_probability_max",
                    [None] * len(dates)
                )[i]
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
                )
        },

        "forecast": forecast
    }


def weather_description(code):

    descriptions = {

        0: "Clear sky",

        1: "Mainly clear",

        2: "Partly cloudy",

        3: "Overcast",

        45: "Fog",

        48: "Rime fog",

        51: "Light drizzle",

        53: "Moderate drizzle",

        55: "Dense drizzle",

        61: "Slight rain",

        63: "Moderate rain",

        65: "Heavy rain",

        71: "Slight snow",

        73: "Moderate snow",

        75: "Heavy snow",

        80: "Slight rain showers",

        81: "Moderate rain showers",

        82: "Heavy rain showers",

        95: "Thunderstorm",

        96: "Thunderstorm with hail",

        99: "Heavy thunderstorm with hail"
    }

    return descriptions.get(
        code,
        "Unknown"
    )


def store_weather(
    weather_data
):

    current = weather_data.get(
        "current",
        {}
    )

    recorded_at = (
        weather_data.get(
            "current_time"
        )
        or now_iso()
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
            recorded_at,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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

            recorded_at,

            now_iso()
        )
    )

    # --------------------------------------------------------
    # Store forecast
    # --------------------------------------------------------

    for day in weather_data.get(
        "forecast",
        []
    ):

        connection.execute(
            """
            INSERT INTO weather_forecast (
                location,
                forecast_date,
                temperature_max,
                temperature_min,
                rainfall,
                rain_probability,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                WEATHER_LOCATION,

                day.get(
                    "date"
                ),

                safe_float(
                    day.get(
                        "temp_max_c"
                    )
                ),

                safe_float(
                    day.get(
                        "temp_min_c"
                    )
                ),

                safe_float(
                    day.get(
                        "rainfall_mm"
                    )
                ),

                safe_float(
                    day.get(
                        "rain_probability_pct"
                    )
                ),

                now_iso()
            )
        )

    connection.commit()

    connection.close()


@app.route(
    "/api/weather",
    methods=["GET"]
)
def weather():

    try:

        result = get_weather_forecast(
            lat=KOPARGAON_LAT,
            lon=KOPARGAON_LON,
            days=7
        )

        result["current"]["condition"] = (
            weather_description(
                result["current"].get(
                    "weather_code"
                )
            )
        )

        result["location"] = (
            WEATHER_LOCATION
        )

        result["latitude"] = (
            KOPARGAON_LAT
        )

        result["longitude"] = (
            KOPARGAON_LON
        )

        result["source"] = (
            "Open-Meteo"
        )

        # Save to SQLite.
        store_weather(
            result
        )

        # Compatibility fields
        result["temperature"] = (
            result["current"].get(
                "temperature_c"
            )
        )

        result["temperature_c"] = (
            result["current"].get(
                "temperature_c"
            )
        )

        result["humidity"] = (
            result["current"].get(
                "humidity_pct"
            )
        )

        result["wind_speed"] = (
            result["current"].get(
                "wind_speed_kmh"
            )
        )

        result["rain_chance"] = (
            result["forecast"][0].get(
                "rain_probability_pct"
            )
            if result.get("forecast")
            else None
        )

        result["rain_probability_pct"] = (
            result["rain_chance"]
        )

        result["precipitation"] = (
            result["current"].get(
                "precipitation_mm"
            )
        )

        result["success"] = True

        return jsonify(
            result
        )

    except Exception as exc:

        logger.exception(
            "Weather request failed"
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
        (
            limit,
        )
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

    "onion": "Onion",

    "onions": "Onion",

    "wheat": "Wheat",

    "गेहूं": "Wheat",

    "गहू": "Wheat",

    "प्याज": "Onion",

    "कांदा": "Onion"
}


def normalize_commodity(
    value
):

    value = clean_text(
        value
    )

    if not value:

        return "Onion"

    lowered = value.lower()

    return COMMODITY_ALIASES.get(
        lowered,
        value.title()
    )


def get_mandi_prices(
    api_key,
    state=None,
    commodity=None,
    district=None,
    market=None,
    limit=50
):
    """
    Fetch verified mandi prices from data.gov.in.

    No fake market values are generated.
    """

    if not api_key:

        raise RuntimeError(
            "DATA_GOV_API_KEY is missing."
        )

    params = {

        "api-key": api_key,

        "format": "json",

        "limit": limit
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

        DATA_GOV_API_URL,

        params=params,

        timeout=REQUEST_TIMEOUT
    )

    response.raise_for_status()

    data = response.json()

    prices = []

    for record in data.get(
        "records",
        []
    ):

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
                )
        })

    return prices


def store_market_prices(
    prices
):

    if not prices:

        return

    connection = get_db()

    for price in prices:

        connection.execute(
            """
            INSERT INTO market_prices (

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
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            """,
            (

                price.get(
                    "state"
                ),

                price.get(
                    "district"
                ),

                price.get(
                    "market"
                ),

                price.get(
                    "commodity"
                ),

                price.get(
                    "variety"
                ),

                price.get(
                    "min_price"
                ),

                price.get(
                    "max_price"
                ),

                price.get(
                    "modal_price"
                ),

                price.get(
                    "date"
                ),

                "data.gov.in / AGMARKNET",

                now_iso()
            )
        )

    connection.commit()

    connection.close()


def market_frontend_record(
    price
):

    market = price.get(
        "market"
    )

    commodity = price.get(
        "commodity"
    )

    min_price = price.get(
        "min_price"
    )

    max_price = price.get(
        "max_price"
    )

    modal_price = price.get(
        "modal_price"
    )

    date = price.get(
        "date"
    )

    return {

        "state":
            price.get(
                "state"
            ),

        "State":
            price.get(
                "state"
            ),

        "district":
            price.get(
                "district"
            ),

        "District":
            price.get(
                "district"
            ),

        "market":
            market,

        "Market":
            market,

        "commodity":
            commodity,

        "Commodity":
            commodity,

        "crop":
            commodity,

        "variety":
            price.get(
                "variety"
            ),

        "min_price":
            min_price,

        "minPrice":
            min_price,

        "max_price":
            max_price,

        "maxPrice":
            max_price,

        "modal_price":
            modal_price,

        "modalPrice":
            modal_price,

        "price":
            modal_price,

        "arrival_date":
            date,

        "Arrival_Date":
            date,

        "date":
            date,

        "source":
            "data.gov.in / AGMARKNET"
    }


def get_cached_market_prices(
    commodity
):

    connection = get_db()

    rows = connection.execute(
        """
        SELECT
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

        FROM market_prices

        WHERE LOWER(commodity)
            = LOWER(?)

        ORDER BY id DESC

        LIMIT 100
        """,
        (
            commodity,
        )
    ).fetchall()

    connection.close()

    result = []

    for row in rows:

        result.append({

            "state":
                row["state"],

            "district":
                row["district"],

            "market":
                row["market"],

            "commodity":
                row["commodity"],

            "variety":
                row["variety"],

            "min_price":
                row["min_price"],

            "max_price":
                row["max_price"],

            "modal_price":
                row["modal_price"],

            "date":
                row["arrival_date"]
        })

    return result


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

            api_key=DATA_GOV_API_KEY,

            state=MARKET_STATE,

            commodity=commodity,

            district=MARKET_DISTRICT,

            market=MARKET_NAME,

            limit=50
        )

        if prices:

            store_market_prices(
                prices
            )

            records = [
                market_frontend_record(
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
                    "data.gov.in / AGMARKNET",

                "cached":
                    False
            })

        # ----------------------------------------------------
        # No records returned
        # ----------------------------------------------------

        return jsonify({

            "success": False,

            "commodity":
                commodity,

            "count": 0,

            "records": [],

            "data": [],

            "prices": [],

            "error":
                "No verified market records were returned."
        })

    except Exception as exc:

        logger.exception(
            "Market request failed"
        )

        # ----------------------------------------------------
        # SQLite cache
        # ----------------------------------------------------

        cached = get_cached_market_prices(
            commodity
        )

        if cached:

            records = [
                market_frontend_record(
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
                    "SQLite cached data",

                "warning":
                    "Live market data is temporarily unavailable."
            })

        return json_error(
            "Market data is currently unavailable.",
            503,
            exc
        )


# ============================================================
# LEGACY MARKET ENDPOINT
# ============================================================

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
                "Onion"
            )
        )
    )

    try:

        prices = get_mandi_prices(

            api_key=DATA_GOV_API_KEY,

            state=MARKET_STATE,

            commodity=commodity,

            district=MARKET_DISTRICT,

            market=MARKET_NAME,

            limit=50
        )

        if prices:

            store_market_prices(
                prices
            )

            records = [
                market_frontend_record(
                    x
                )
                for x in prices
            ]

            return jsonify({

                "success": True,

                "crop":
                    commodity.lower(),

                "commodity":
                    commodity,

                "record":
                    records[0],

                "records":
                    records,

                "data":
                    records
            })

    except Exception as exc:

        logger.exception(
            "Legacy market request failed"
        )

    cached = get_cached_market_prices(
        commodity
    )

    if cached:

        records = [
            market_frontend_record(
                x
            )
            for x in cached
        ]

        return jsonify({

            "success": True,

            "crop":
                commodity.lower(),

            "commodity":
                commodity,

            "record":
                records[0],

            "records":
                records,

            "data":
                records,

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
# MARKET HISTORY
# ============================================================

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

        WHERE LOWER(commodity)
            = LOWER(?)

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
            "OPENAI_API_KEY is not configured."
        )

    farmer = farmer or {}

    language_names = {

        "en": "English",

        "hi": "Hindi",

        "mr": "Marathi",

        "marathi": "Marathi",

        "hindi": "Hindi",

        "english": "English"
    }

    language_name = language_names.get(
        language.lower(),
        "English"
    )

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
- onion cultivation
- wheat cultivation
- irrigation
- weather-related farming decisions
- fertilizer concepts
- soil management
- pest prevention
- crop disease prevention
- harvesting
- storage
- mandi/market information
- agricultural planning
- government agriculture schemes

The user's requested language is {language_name}.

Answer in {language_name}.

IMPORTANT:

1. Use simple practical language.
2. Give actionable farming advice.
3. Do not invent live weather data.
4. Do not invent market prices.
5. Do not invent government scheme rules.
6. If current information is required, tell the user to verify it from an official source.
7. Do not claim certainty when diagnosing plant diseases.
8. Do not pretend that you have access to live sensors unless the application explicitly provides sensor data.
9. If the user asks about market prices, explain that the application obtains verified prices from data.gov.in when available.
10. Keep answers reasonably concise.

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
            "Bearer "
            + OPENAI_API_KEY,

        "Content-Type":
            "application/json"
    }

    response = requests.post(

        OPENAI_API_URL,

        headers=headers,

        json=payload,

        timeout=60
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
            "OpenAI returned no answer."
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

            question=question,

            language=language,

            farmer=farmer
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
                OPENAI_MODEL
        })

    except Exception as exc:

        logger.exception(
            "OpenAI request failed"
        )

        return json_error(
            "AI service is currently unavailable.",
            503,
            exc
        )


# ============================================================
# CROP HEALTH
# ============================================================

def analyze_crop_image(
    image_file,
    language="en"
):

    if not OPENAI_API_KEY:

        raise RuntimeError(
            "OPENAI_API_KEY is not configured."
        )

    image_bytes = image_file.read()

    if not image_bytes:

        raise RuntimeError(
            "The uploaded image is empty."
        )

    filename = (
        image_file.filename
        or "crop.jpg"
    )

    extension = (
        os.path.splitext(
            filename
        )[1].lower()
    )

    mime_types = {

        ".jpg":
            "image/jpeg",

        ".jpeg":
            "image/jpeg",

        ".png":
            "image/png",

        ".webp":
            "image/webp"
    }

    mime_type = mime_types.get(
        extension,
        "image/jpeg"
    )

    encoded = base64.b64encode(
        image_bytes
    ).decode(
        "utf-8"
    )

    language_names = {

        "en": "English",

        "hi": "Hindi",

        "mr": "Marathi"
    }

    language_name = language_names.get(
        language.lower(),
        "English"
    )

    prompt = f"""
You are a crop-health assistant for Indian farmers.

Analyze the uploaded crop image.

Respond in {language_name}.

IMPORTANT:

- Do not claim a diagnosis with absolute certainty.
- Explain visible symptoms.
- Give the most likely possible causes.
- Give practical next steps.
- Mention when the farmer should consult a local agriculture officer or plant pathologist.
- Do not invent pesticide dosage.
- If a specific chemical treatment is suggested, tell the farmer to follow the product label and local agricultural guidance.

Return the answer in a clear structure:

Observation:
Possible issue:
Confidence:
What to do now:
When to seek expert help:
"""

    payload = {

        "model":
            OPENAI_MODEL,

        "messages": [

            {

                "role":
                    "system",

                "content":
                    "You are a careful agricultural crop-health assistant."
            },

            {

                "role":
                    "user",

                "content": [

                    {

                        "type":
                            "text",

                        "text":
                            prompt
                    },

                    {

                        "type":
                            "image_url",

                        "image_url": {

                            "url":
                                "data:"
                                + mime_type
                                + ";base64,"
                                + encoded
                        }
                    }
                ]
            }
        ],

        "temperature":
            0.2,

        "max_tokens":
            700
    }

    headers = {

        "Authorization":
            "Bearer "
            + OPENAI_API_KEY,

        "Content-Type":
            "application/json"
    }

    response = requests.post(

        OPENAI_API_URL,

        headers=headers,

        json=payload,

        timeout=90
    )

    if response.status_code >= 400:

        logger.error(
            "OpenAI vision error %s: %s",
            response.status_code,
            response.text[:1000]
        )

        raise RuntimeError(
            "Crop image analysis failed: "
            f"HTTP {response.status_code}"
        )

    result = response.json()

    choices = result.get(
        "choices",
        []
    )

    if not choices:

        raise RuntimeError(
            "OpenAI returned no crop analysis."
        )

    answer = choices[0].get(
        "message",
        {}
    ).get(
        "content"
    )

    if not answer:

        raise RuntimeError(
            "OpenAI returned an empty crop analysis."
        )

    return answer.strip()


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
            "Please upload JPG, JPEG, PNG or WEBP image.",
            400
        )

    language = clean_text(
        request.form.get(
            "language",
            "en"
        )
    ).lower()

    try:

        diagnosis = analyze_crop_image(

            image_file=uploaded_file,

            language=language
        )

        return jsonify({

            "success": True,

            "diagnosis":
                diagnosis,

            "result":
                diagnosis,

            "prediction":
                diagnosis,

            "message":
                diagnosis,

            "model":
                OPENAI_MODEL
        })

    except Exception as exc:

        logger.exception(
            "Crop health analysis failed"
        )

        return json_error(
            "Crop-health AI is currently unavailable.",
            503,
            exc
        )


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

    forecast_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM weather_forecast
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
            bool(
                OPENAI_API_KEY
            ),

        "ai_provider":
            "OpenAI",

        "ai_model":
            OPENAI_MODEL
            if OPENAI_API_KEY
            else None,

        "weather_provider":
            "Open-Meteo",

        "market_provider":
            "data.gov.in / AGMARKNET",

        "weather_records":
            weather_count,

        "forecast_records":
            forecast_count,

        "market_records":
            market_count,

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

        "endpoints": [

            "/health",

            "/api/status",

            "/api/weather",

            "/api/weather/history",

            "/api/market-prices?commodity=Onion",

            "/api/market-prices?commodity=Wheat",

            "/api/market",

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
        "======================================"
    )

    logger.info(
        "SmartAgri Flask Backend"
    )

    logger.info(
        "======================================"
    )

    logger.info(
        "Database: %s",
        DATABASE
    )

    logger.info(
        "OpenAI configured: %s",
        bool(OPENAI_API_KEY)
    )

    logger.info(
        "OpenAI model: %s",
        OPENAI_MODEL
    )

    logger.info(
        "Weather: %s",
        WEATHER_LOCATION
    )

    logger.info(
        "Weather coordinates: %s, %s",
        KOPARGAON_LAT,
        KOPARGAON_LON
    )

    logger.info(
        "Market: %s / %s / %s",
        MARKET_STATE,
        MARKET_DISTRICT,
        MARKET_NAME
    )

    logger.info(
        "======================================"
    )

    app.run(

        host="0.0.0.0",

        port=PORT,

        debug=False
    )
