# ============================================================
# SMARTAGRI
# Complete Flask Backend
#
# FEATURES
# ------------------------------------------------------------
# - OpenAI AI Farmer Assistant
# - Open-Meteo live weather
# - Open-Meteo 7-day forecast
# - data.gov.in / AGMARKNET mandi prices
# - Kopargaon market support
# - Plant.id crop health
# - SQLite database
# - Automatic database/table creation
# - Weather history
# - Market history
# - AI conversation history
# - Crop health history
# - CORS enabled for frontend
#
# EXISTING FRONTEND ENDPOINTS
# ------------------------------------------------------------
# GET  /
# GET  /health
# GET  /api/status
#
# GET  /api/weather
# GET  /api/weather/history
#
# GET  /api/market-prices
# GET  /api/market
# GET  /api/market/history
#
# POST /api/ai
# POST /api/crop-health
#
# ============================================================

import os
import json
import sqlite3
import logging
import base64
from datetime import datetime, timezone
from typing import Optional

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from openai import OpenAI


# ============================================================
# LOAD ENVIRONMENT
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
# OPENAI
# ============================================================

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY",
    ""
).strip()

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-4o-mini"
).strip()

openai_client = None

if OPENAI_API_KEY:

    try:

        openai_client = OpenAI(
            api_key=OPENAI_API_KEY
        )

        logger.info(
            "OpenAI configured successfully."
        )

    except Exception as exc:

        logger.exception(
            "OpenAI client initialization failed: %s",
            exc
        )

else:

    logger.warning(
        "OPENAI_API_KEY is not configured."
    )


# ============================================================
# WEATHER
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

DEFAULT_LOCATION = os.getenv(
    "WEATHER_LOCATION",
    "Kopargaon"
)

WEATHER_TIMEZONE = os.getenv(
    "WEATHER_TIMEZONE",
    "Asia/Kolkata"
)


# ============================================================
# DATA.GOV.IN
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
# PLANT.ID
# ============================================================

PLANT_ID_API_KEY = os.getenv(
    "PLANT_ID_API_KEY",
    ""
).strip()

PLANT_ID_URL = (
    "https://plant.id/api/v3/identification"
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

OPENAI_TIMEOUT = int(
    os.getenv(
        "OPENAI_TIMEOUT",
        "60"
    )
)

PLANT_ID_TIMEOUT = int(
    os.getenv(
        "PLANT_ID_TIMEOUT",
        "30"
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
    # TABLE 1: WEATHER HISTORY
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS weather_history (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            location TEXT NOT NULL,

            latitude REAL,

            longitude REAL,

            temperature_c REAL,

            humidity_pct REAL,

            wind_speed_kmh REAL,

            precipitation_mm REAL,

            weather_code INTEGER,

            weather_condition TEXT,

            forecast_json TEXT,

            recorded_at TEXT NOT NULL,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # TABLE 2: MARKET PRICES
    # ========================================================

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

            raw_json TEXT,

            created_at TEXT NOT NULL
        )
        """
    )

    # ========================================================
    # TABLE 3: AI CONVERSATIONS
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS ai_conversations (

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
    # TABLE 4: CROP HEALTH
    # ========================================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS crop_health_results (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            filename TEXT,

            plant_name TEXT,

            scientific_name TEXT,

            health_status TEXT,

            health_probability REAL,

            disease_name TEXT,

            disease_probability REAL,

            result_json TEXT,

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
        ON weather_history(created_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_market_commodity
        ON market_prices(commodity)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_market_date
        ON market_prices(arrival_date)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_ai_created
        ON ai_conversations(created_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_crop_health_created
        ON crop_health_results(created_at)
        """
    )

    connection.commit()

    connection.close()

    logger.info(
        "SQLite database initialized: %s",
        os.path.abspath(DATABASE)
    )


# Create database automatically.
initialize_database()


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def now_iso():

    return datetime.now(
        timezone.utc
    ).isoformat()


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

    try:

        return float(text)

    except ValueError:

        return None


def clean_text(value):

    if value is None:
        return ""

    return str(value).strip()


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


def safe_json_string(data):

    try:

        return json.dumps(
            data,
            ensure_ascii=False
        )

    except Exception:

        return "{}"


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
            "precipitation_probability_max"
        ]),

        "timezone":
            WEATHER_TIMEZONE,

        "forecast_days":
            days
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

            "date":
                date,

            "temp_max_c":
                daily.get(
                    "temperature_2m_max",
                    []
                )[i]
                if i < len(
                    daily.get(
                        "temperature_2m_max",
                        []
                    )
                )
                else None,

            "temp_min_c":
                daily.get(
                    "temperature_2m_min",
                    []
                )[i]
                if i < len(
                    daily.get(
                        "temperature_2m_min",
                        []
                    )
                )
                else None,

            "rainfall_mm":
                daily.get(
                    "precipitation_sum",
                    []
                )[i]
                if i < len(
                    daily.get(
                        "precipitation_sum",
                        []
                    )
                )
                else None,

            "rain_probability_pct":
                daily.get(
                    "precipitation_probability_max",
                    []
                )[i]
                if i < len(
                    daily.get(
                        "precipitation_probability_max",
                        []
                    )
                )
                else None
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

            "weather_condition":
                weather_code_description(
                    current.get(
                        "weather_code"
                    )
                ),

            "time":
                current.get(
                    "time"
                )
        },

        "forecast":
            forecast
    }


def save_weather_to_database(
    weather_data
):

    current = weather_data.get(
        "current",
        {}
    )

    connection = get_db()

    connection.execute(
        """
        INSERT INTO weather_history (

            location,

            latitude,

            longitude,

            temperature_c,

            humidity_pct,

            wind_speed_kmh,

            precipitation_mm,

            weather_code,

            weather_condition,

            forecast_json,

            recorded_at,

            created_at

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,

        (

            DEFAULT_LOCATION,

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
                "weather_condition"
            ),

            safe_json_string(
                weather_data.get(
                    "forecast",
                    []
                )
            ),

            current.get(
                "time"
            )
            or now_iso(),

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
        FROM weather_history
        ORDER BY id DESC
        LIMIT 1
        """
    ).fetchone()

    connection.close()

    return (
        dict(row)
        if row
        else None
    )


# ============================================================
# WEATHER ENDPOINT
# ============================================================

@app.route(
    "/api/weather",
    methods=["GET"]
)
def weather():

    try:

        weather_data = get_weather_forecast(
            KOPARGAON_LAT,
            KOPARGAON_LON,
            days=7
        )

        save_weather_to_database(
            weather_data
        )

        current = weather_data[
            "current"
        ]

        return jsonify({

            "success":
                True,

            "location":
                DEFAULT_LOCATION,

            "latitude":
                KOPARGAON_LAT,

            "longitude":
                KOPARGAON_LON,

            "temperature":
                current[
                    "temperature_c"
                ],

            "temperature_c":
                current[
                    "temperature_c"
                ],

            "humidity":
                current[
                    "humidity_pct"
                ],

            "humidity_pct":
                current[
                    "humidity_pct"
                ],

            "wind_speed":
                current[
                    "wind_speed_kmh"
                ],

            "wind_speed_kmh":
                current[
                    "wind_speed_kmh"
                ],

            "precipitation":
                current[
                    "precipitation_mm"
                ],

            "precipitation_mm":
                current[
                    "precipitation_mm"
                ],

            "weather_code":
                current[
                    "weather_code"
                ],

            "weather_condition":
                current[
                    "weather_condition"
                ],

            "condition":
                current[
                    "weather_condition"
                ],

            "current":
                current,

            "forecast":
                weather_data[
                    "forecast"
                ],

            "days":
                weather_data[
                    "forecast"
                ],

            "source":
                "Open-Meteo",

            "cached":
                False

        })

    except Exception as exc:

        logger.exception(
            "Weather request failed."
        )

        cached = get_latest_weather()

        if cached:

            try:

                forecast = json.loads(
                    cached.get(
                        "forecast_json",
                        "[]"
                    )
                )

            except Exception:

                forecast = []

            return jsonify({

                "success":
                    True,

                "location":
                    cached.get(
                        "location"
                    ),

                "latitude":
                    cached.get(
                        "latitude"
                    ),

                "longitude":
                    cached.get(
                        "longitude"
                    ),

                "temperature":
                    cached.get(
                        "temperature_c"
                    ),

                "temperature_c":
                    cached.get(
                        "temperature_c"
                    ),

                "humidity":
                    cached.get(
                        "humidity_pct"
                    ),

                "humidity_pct":
                    cached.get(
                        "humidity_pct"
                    ),

                "wind_speed":
                    cached.get(
                        "wind_speed_kmh"
                    ),

                "wind_speed_kmh":
                    cached.get(
                        "wind_speed_kmh"
                    ),

                "precipitation":
                    cached.get(
                        "precipitation_mm"
                    ),

                "precipitation_mm":
                    cached.get(
                        "precipitation_mm"
                    ),

                "weather_code":
                    cached.get(
                        "weather_code"
                    ),

                "weather_condition":
                    cached.get(
                        "weather_condition"
                    ),

                "condition":
                    cached.get(
                        "weather_condition"
                    ),

                "forecast":
                    forecast,

                "source":
                    "SQLite cached Open-Meteo data",

                "cached":
                    True,

                "warning":
                    "Live weather temporarily unavailable."
            })

        return json_error(
            "Weather service unavailable.",
            503,
            exc
        )


# ============================================================
# WEATHER HISTORY
# ============================================================

@app.route(
    "/api/weather/history",
    methods=["GET"]
)
def weather_history():

    try:

        limit = int(
            request.args.get(
                "limit",
                "30"
            )
        )

    except ValueError:

        limit = 30

    limit = max(
        1,
        min(limit, 500)
    )

    connection = get_db()

    rows = connection.execute(
        """
        SELECT *
        FROM weather_history
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    connection.close()

    results = []

    for row in rows:

        item = dict(row)

        try:

            item["forecast"] = json.loads(
                item.get(
                    "forecast_json",
                    "[]"
                )
            )

        except Exception:

            item["forecast"] = []

        results.append(item)

    return jsonify({

        "success":
            True,

        "count":
            len(results),

        "data":
            results,

        "history":
            results
    })


# ============================================================
# MARKET DATA
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
    commodity=None,
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
            limit,

        "filters[state]":
            "Maharashtra"
    }

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

    payload = response.json()

    return payload.get(
        "records",
        []
    )


def normalize_market_record(
    record,
    requested_commodity
):

    state = (
        record.get("state")
        or record.get("State")
        or "Maharashtra"
    )

    district = (
        record.get("district")
        or record.get("District")
        or ""
    )

    market = (
        record.get("market")
        or record.get("Market")
        or ""
    )

    commodity = (
        record.get("commodity")
        or record.get("Commodity")
        or requested_commodity
    )

    variety = (
        record.get("variety")
        or record.get("Variety")
        or ""
    )

    min_price = (
        record.get("min_price")
        or record.get("Min Price")
        or record.get("Min_Price")
    )

    max_price = (
        record.get("max_price")
        or record.get("Max Price")
        or record.get("Max_Price")
    )

    modal_price = (
        record.get("modal_price")
        or record.get("Modal Price")
        or record.get("Modal_Price")
    )

    arrival_date = (
        record.get("arrival_date")
        or record.get("Arrival Date")
        or record.get("Arrival_Date")
        or record.get("Date")
    )

    return {

        "state":
            clean_text(state),

        "district":
            clean_text(district),

        "market":
            clean_text(market),

        "commodity":
            normalize_commodity(
                commodity
            ),

        "variety":
            clean_text(variety),

        "min_price":
            safe_float(
                min_price
            ),

        "max_price":
            safe_float(
                max_price
            ),

        "modal_price":
            safe_float(
                modal_price
            ),

        "arrival_date":
            clean_text(
                arrival_date
            ),

        "source":
            "data.gov.in / AGMARKNET",

        "raw":
            record
    }


def save_market_records(
    records
):

    if not records:
        return

    connection = get_db()

    for record in records:

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

                raw_json,

                created_at

            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,

            (

                record.get(
                    "state"
                ),

                record.get(
                    "district"
                ),

                record.get(
                    "market"
                ),

                record.get(
                    "commodity"
                ),

                record.get(
                    "variety"
                ),

                record.get(
                    "min_price"
                ),

                record.get(
                    "max_price"
                ),

                record.get(
                    "modal_price"
                ),

                record.get(
                    "arrival_date"
                ),

                record.get(
                    "source"
                ),

                safe_json_string(
                    record.get(
                        "raw",
                        {}
                    )
                ),

                now_iso()
            )
        )

    connection.commit()

    connection.close()


def market_frontend_record(
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
            )
    }


def get_cached_market_records(
    commodity,
    limit=100
):

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

    return [
        dict(row)
        for row in rows
    ]


# ============================================================
# MARKET PRICES
# ============================================================

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

    district = clean_text(
        request.args.get(
            "district",
            ""
        )
    )

    market = clean_text(
        request.args.get(
            "market",
            ""
        )
    )

    try:

        raw_records = get_mandi_prices(

            commodity=commodity,

            district=district
            if district
            else None,

            market=market
            if market
            else None,

            limit=50
        )

        normalized = []

        for record in raw_records:

            parsed = normalize_market_record(
                record,
                commodity
            )

            if parsed.get(
                "market"
            ):

                normalized.append(
                    parsed
                )

        # ----------------------------------------------------
        # Prefer Kopargaon when no explicit market was given.
        # ----------------------------------------------------

        if not market:

            kopargaon_records = [

                x for x in normalized

                if "kopargaon"
                in x.get(
                    "market",
                    ""
                ).lower()
            ]

            if kopargaon_records:

                normalized = (
                    kopargaon_records
                )

        if normalized:

            save_market_records(
                normalized
            )

            frontend_records = [

                market_frontend_record(
                    x
                )

                for x in normalized
            ]

            return jsonify({

                "success":
                    True,

                "commodity":
                    commodity,

                "count":
                    len(
                        frontend_records
                    ),

                "records":
                    frontend_records,

                "data":
                    frontend_records,

                "prices":
                    frontend_records,

                "source":
                    "data.gov.in / AGMARKNET",

                "cached":
                    False
            })

    except Exception as exc:

        logger.exception(
            "Mandi API request failed."
        )

    # --------------------------------------------------------
    # CACHE FALLBACK
    # --------------------------------------------------------

    cached = get_cached_market_records(
        commodity
    )

    if cached:

        frontend_records = [

            market_frontend_record(
                x
            )

            for x in cached
        ]

        return jsonify({

            "success":
                True,

            "commodity":
                commodity,

            "count":
                len(
                    frontend_records
                ),

            "records":
                frontend_records,

            "data":
                frontend_records,

            "prices":
                frontend_records,

            "source":
                "SQLite cached market data",

            "cached":
                True
        })

    return jsonify({

        "success":
            False,

        "commodity":
            commodity,

        "count":
            0,

        "records":
            [],

        "data":
            [],

        "prices":
            [],

        "error":
            "Verified market data is currently unavailable."
    })


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

        raw_records = get_mandi_prices(
            commodity=commodity,
            district=None,
            market="Kopargaon",
            limit=20
        )

        normalized = [

            normalize_market_record(
                x,
                commodity
            )

            for x in raw_records
        ]

        normalized = [

            x for x in normalized

            if x.get("market")
        ]

        if normalized:

            save_market_records(
                normalized
            )

            records = [

                market_frontend_record(
                    x
                )

                for x in normalized
            ]

            return jsonify({

                "success":
                    True,

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

                "source":
                    "data.gov.in / AGMARKNET"
            })

    except Exception:

        logger.exception(
            "Legacy market endpoint failed."
        )

    cached = get_cached_market_records(
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

            "success":
                True,

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
                True,

            "source":
                "SQLite cached market data"
        })

    return jsonify({

        "success":
            False,

        "crop":
            commodity.lower(),

        "commodity":
            commodity,

        "record":
            None,

        "records":
            [],

        "data":
            [],

        "error":
            "Market data unavailable."
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

    results = [
        dict(row)
        for row in rows
    ]

    return jsonify({

        "success":
            True,

        "commodity":
            commodity,

        "count":
            len(results),

        "history":
            results,

        "data":
            results
    })


# ============================================================
# OPENAI AI ASSISTANT
# ============================================================

def ask_openai(
    question,
    language="en",
    farmer=None
):

    if not openai_client:

        raise RuntimeError(
            "OPENAI_API_KEY is not configured."
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
- onion cultivation
- wheat cultivation
- irrigation
- weather-related farming decisions
- mandi and market information
- fertilizer concepts
- soil management
- pest prevention
- crop disease prevention
- harvesting
- storage
- agricultural planning
- government agriculture schemes

The requested response language is:
{language_name}

IMPORTANT LANGUAGE RULE:

Answer in {language_name}.

If language is Hindi, answer in Hindi.

If language is Marathi, answer in Marathi.

If language is English, answer in English.

Do not automatically answer in English when the requested
language is Hindi or Marathi.

Keep answers practical and easy for an Indian farmer to
understand.

Do not invent live market prices.

Do not invent current weather measurements.

Do not invent government scheme rules or benefits.

If the question requires exact live information, explain
that the farmer should verify the current official data.

For crop diseases, do not claim a certain diagnosis unless
an actual crop-health image analysis result is available.

{farmer_context}
"""

    try:

        response = openai_client.chat.completions.create(

            model=OPENAI_MODEL,

            messages=[

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

            temperature=0.4,

            max_tokens=700,

            timeout=OPENAI_TIMEOUT
        )

    except TypeError:

        # Compatibility with OpenAI client versions
        # that do not accept timeout on this method.

        response = openai_client.chat.completions.create(

            model=OPENAI_MODEL,

            messages=[

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

            temperature=0.4,

            max_tokens=700
        )

    answer = (
        response
        .choices[0]
        .message
        .content
    )

    if not answer:

        raise RuntimeError(
            "OpenAI returned an empty response."
        )

    return str(
        answer
    ).strip()


def save_ai_conversation(
    question,
    answer,
    language,
    farmer
):

    connection = get_db()

    connection.execute(
        """
        INSERT INTO ai_conversations (

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

            safe_json_string(
                farmer or {}
            ),

            now_iso()
        )
    )

    connection.commit()

    connection.close()


# ============================================================
# AI ENDPOINT
# ============================================================

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
            "question",
            data.get(
                "message",
                ""
            )
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

    if language not in {
        "en",
        "hi",
        "mr"
    }:

        language = "en"

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

            question=

                question,

            language=

                language,

            farmer=

                farmer
        )

        # Save successful conversation.
        save_ai_conversation(

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
                OPENAI_MODEL,

            "language":
                language
        })

    except Exception as exc:

        logger.exception(
            "OpenAI request failed."
        )

        return json_error(
            "AI service is currently unavailable.",
            503,
            exc
        )


# ============================================================
# AI HISTORY
# ============================================================

@app.route(
    "/api/ai/history",
    methods=["GET"]
)
def ai_history():

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
        SELECT
            id,
            question,
            answer,
            language,
            model,
            created_at
        FROM ai_conversations
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    connection.close()

    return jsonify({

        "success":
            True,

        "count":
            len(rows),

        "history":
            [
                dict(row)
                for row in rows
            ]
    })


# ============================================================
# PLANT.ID CROP HEALTH
# ============================================================

def extract_plant_health_result(
    result
):

    result_data = (
        result.get(
            "result",
            {}
        )
        if isinstance(
            result,
            dict
        )
        else {}
    )

    # --------------------------------------------------------
    # Plant name
    # --------------------------------------------------------

    plant_name = ""

    scientific_name = ""

    classification = (
        result_data.get(
            "classification",
            {}
        )
    )

    suggestions = (
        classification.get(
            "suggestions",
            []
        )
    )

    if suggestions:

        first = suggestions[0]

        plant_name = (
            first.get(
                "name"
            )
            or ""
        )

        scientific_name = plant_name

    # --------------------------------------------------------
    # Health
    # --------------------------------------------------------

    health_status = ""

    health_probability = None

    is_healthy = (
        result_data.get(
            "is_healthy",
            {}
        )
    )

    if isinstance(
        is_healthy,
        dict
    ):

        health_probability = (
            safe_float(
                is_healthy.get(
                    "probability"
                )
            )
        )

        value = is_healthy.get(
            "binary"
        )

        if value is True:

            health_status = "Healthy"

        elif value is False:

            health_status = "Potential issue detected"

    # --------------------------------------------------------
    # Diseases
    # --------------------------------------------------------

    disease_name = ""

    disease_probability = None

    disease = (
        result_data.get(
            "disease",
            {}
        )
    )

    disease_suggestions = (
        disease.get(
            "suggestions",
            []
        )
    )

    if disease_suggestions:

        disease_top = (
            disease_suggestions[0]
        )

        disease_name = (
            disease_top.get(
                "name"
            )
            or ""
        )

        disease_probability = (
            safe_float(
                disease_top.get(
                    "probability"
                )
            )
        )

    # Some Plant.id responses may use
    # disease.identification instead.

    if not disease_name:

        disease_identification = (
            result_data.get(
                "disease",
                {}
            ).get(
                "identification",
                {}
            )
        )

        disease_suggestions = (
            disease_identification.get(
                "suggestions",
                []
            )
        )

        if disease_suggestions:

            disease_top = (
                disease_suggestions[0]
            )

            disease_name = (
                disease_top.get(
                    "name"
                )
                or ""
            )

            disease_probability = (
                safe_float(
                    disease_top.get(
                        "probability"
                    )
                )
            )

    return {

        "plant_name":
            plant_name,

        "scientific_name":
            scientific_name,

        "health_status":
            health_status,

        "health_probability":
            health_probability,

        "disease_name":
            disease_name,

        "disease_probability":
            disease_probability
    }


def save_crop_health_result(
    filename,
    parsed,
    raw_result
):

    connection = get_db()

    connection.execute(
        """
        INSERT INTO crop_health_results (

            filename,

            plant_name,

            scientific_name,

            health_status,

            health_probability,

            disease_name,

            disease_probability,

            result_json,

            created_at

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,

        (

            filename,

            parsed.get(
                "plant_name"
            ),

            parsed.get(
                "scientific_name"
            ),

            parsed.get(
                "health_status"
            ),

            parsed.get(
                "health_probability"
            ),

            parsed.get(
                "disease_name"
            ),

            parsed.get(
                "disease_probability"
            ),

            safe_json_string(
                raw_result
            ),

            now_iso()
        )
    )

    connection.commit()

    connection.close()


# ============================================================
# CROP HEALTH ENDPOINT
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
        or "crop_image"
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

    if not PLANT_ID_API_KEY:

        return json_error(
            "PLANT_ID_API_KEY is not configured.",
            503
        )

    try:

        image_bytes = (
            uploaded_file.read()
        )

        if not image_bytes:

            return json_error(
                "The uploaded image is empty.",
                400
            )

        image_base64 = (
            base64.b64encode(
                image_bytes
            )
            .decode("utf-8")
        )

        payload = {

            "images": [
                image_base64
            ],

            "health":
                "all",

            "similar_images":
                True,

            "language":
                "en"
        }

        headers = {

            "Api-Key":
                PLANT_ID_API_KEY,

            "Content-Type":
                "application/json",

            "Accept":
                "application/json"
        }

        response = requests.post(

            PLANT_ID_URL,

            headers=headers,

            json=payload,

            timeout=PLANT_ID_TIMEOUT
        )

        if response.status_code >= 400:

            logger.error(

                "Plant.id error %s: %s",

                response.status_code,

                response.text[:1000]
            )

            return json_error(

                "Plant.id crop-health request failed.",

                502,

                response.text[:500]
            )

        result = response.json()

        parsed = (
            extract_plant_health_result(
                result
            )
        )

        save_crop_health_result(

            filename,

            parsed,

            result
        )

        # ----------------------------------------------------
        # Return both simplified values and raw result.
        # This makes the endpoint compatible with different
        # frontend implementations.
        # ----------------------------------------------------

        return jsonify({

            "success":
                True,

            "plant_name":
                parsed[
                    "plant_name"
                ],

            "scientific_name":
                parsed[
                    "scientific_name"
                ],

            "health_status":
                parsed[
                    "health_status"
                ],

            "health_probability":
                parsed[
                    "health_probability"
                ],

            "disease_name":
                parsed[
                    "disease_name"
                ],

            "disease_probability":
                parsed[
                    "disease_probability"
                ],

            "diagnosis":
                parsed[
                    "disease_name"
                ]
                or parsed[
                    "health_status"
                ]
                or "Analysis completed.",

            "result":
                parsed[
                    "disease_name"
                ]
                or parsed[
                    "health_status"
                ]
                or "Analysis completed.",

            "prediction":
                parsed[
                    "plant_name"
                ],

            "message":
                "Crop image analyzed successfully.",

            "data":
                result,

            "raw":
                result
        })

    except Exception as exc:

        logger.exception(
            "Crop health request failed."
        )

        return json_error(
            "Crop-health service is currently unavailable.",
            503,
            exc
        )


# ============================================================
# CROP HEALTH HISTORY
# ============================================================

@app.route(
    "/api/crop-health/history",
    methods=["GET"]
)
def crop_health_history():

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
        SELECT
            id,
            filename,
            plant_name,
            scientific_name,
            health_status,
            health_probability,
            disease_name,
            disease_probability,
            created_at
        FROM crop_health_results
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    connection.close()

    return jsonify({

        "success":
            True,

        "count":
            len(rows),

        "history":
            [
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

    weather_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM weather_history
        """
    ).fetchone()[0]

    market_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM market_prices
        """
    ).fetchone()[0]

    ai_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM ai_conversations
        """
    ).fetchone()[0]

    crop_count = connection.execute(
        """
        SELECT COUNT(*)
        FROM crop_health_results
        """
    ).fetchone()[0]

    connection.close()

    return jsonify({

        "success":
            True,

        "service":
            "SmartAgri Flask Backend",

        "status":
            "online",

        "database":
            os.path.abspath(
                DATABASE
            ),

        "database_type":
            "SQLite",

        "tables": [

            "weather_history",

            "market_prices",

            "ai_conversations",

            "crop_health_results"
        ],

        "ai_configured":
            bool(
                OPENAI_API_KEY
            ),

        "ai_model":
            OPENAI_MODEL
            if OPENAI_API_KEY
            else None,

        "weather_configured":
            True,

        "market_api_configured":
            bool(
                DATA_GOV_API_KEY
            ),

        "plant_id_configured":
            bool(
                PLANT_ID_API_KEY
            ),

        "weather_records":
            weather_count,

        "market_records":
            market_count,

        "ai_conversations":
            ai_count,

        "crop_health_records":
            crop_count
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

        "database":
            "SQLite",

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
            os.path.abspath(
                DATABASE
            ),

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

            "/api/ai/history",

            "/api/crop-health",

            "/api/crop-health/history"
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
        "Internal server error."
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
        os.path.abspath(
            DATABASE
        )
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
        "Open-Meteo: enabled"
    )

    logger.info(
        "Data.gov.in configured: %s",
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
        "Location: %s",
        DEFAULT_LOCATION
    )

    logger.info(
        "Coordinates: %s, %s",
        KOPARGAON_LAT,
        KOPARGAON_LON
    )

    logger.info(
        "=========================================="
    )

    app.run(

        host="0.0.0.0",

        port=PORT,

        debug=False
    )
