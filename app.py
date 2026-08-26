# ============================================================
# SMARTAGRI
# Complete Flask Backend
#
# AI        -> OpenAI Responses API
# Weather   -> Open-Meteo
# Market    -> data.gov.in / AGMARKNET
# Database  -> SQLite
#
# Existing frontend endpoints:
#
# GET  /api/weather
# GET  /api/weather/history
# GET  /api/market-prices
# GET  /api/market
# GET  /api/market/history
# POST /api/ai
# POST /api/crop-health
# GET  /api/status
# GET  /health
# GET  /
#
# ============================================================

import os
import re
import sqlite3
import logging
from datetime import datetime, timezone

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

# OpenAI
try:
    from openai import OpenAI
except ImportError:
    OpenAI = None


# ============================================================
# APPLICATION
# ============================================================

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {"origins": "*"},
        r"/health": {"origins": "*"}
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

REQUEST_TIMEOUT = int(
    os.getenv("REQUEST_TIMEOUT", "20")
)

MARKET_TIMEOUT = int(
    os.getenv("MARKET_TIMEOUT", "15")
)


# ============================================================
# OPENAI CONFIGURATION
# ============================================================

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY",
    ""
).strip()

# You can change this through an environment variable.
# Example:
# OPENAI_MODEL=gpt-5.5
#
# The current OpenAI Python SDK supports the Responses API.
OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.5"
).strip()

openai_client = None

if OPENAI_API_KEY and OpenAI is not None:
    try:
        openai_client = OpenAI(
            api_key=OPENAI_API_KEY
        )

        logger.info(
            "OpenAI client configured."
        )

    except Exception as exc:

        logger.exception(
            "Could not initialize OpenAI client: %s",
            exc
        )

else:

    if not OPENAI_API_KEY:
        logger.warning(
            "OPENAI_API_KEY is not configured."
        )

    if OpenAI is None:
        logger.warning(
            "OpenAI Python package is not installed."
        )


# ============================================================
# WEATHER CONFIGURATION
# ============================================================

OPEN_METEO_URL = (
    "https://api.open-meteo.com/v1/forecast"
)

# Kopargaon coordinates
#
# You can change these later through environment variables
# without editing this file.
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


# ============================================================
# DATA.GOV.IN CONFIGURATION
# ============================================================

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
).strip()

DATA_GOV_API_URL = (
    "https://api.data.gov.in/resource/"
    "9ef84268-d588-465a-a308-a864a43d0070"
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
            rain_chance REAL,

            weather_code INTEGER,
            weather_condition TEXT,

            recorded_at TEXT NOT NULL,
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


initialize_database()


# ============================================================
# GENERAL UTILITIES
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

    """
    Get live weather forecast from Open-Meteo.

    No fake weather values are generated.
    """

    days = max(
        1,
        min(int(days), 16)
    )

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

    daily_codes = daily.get(
        "weather_code",
        []
    )

    forecast = []

    for i, date in enumerate(dates):

        forecast.append({

            "date": date,

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
                daily_codes[i]
                if i < len(daily_codes)
                else None,

            "condition":
                weather_code_description(
                    daily_codes[i]
                    if i < len(daily_codes)
                    else None
                )
        })

    weather_code = current.get(
        "weather_code"
    )

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
                weather_code,

            "condition":
                weather_code_description(
                    weather_code
                ),

            "time":
                current.get(
                    "time"
                )
        },

        "forecast":
            forecast
    }


def store_weather(
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
            rain_chance,

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

            (
                safe_float(
                    weather_data[
                        "forecast"
                    ][0].get(
                        "rain_probability_pct"
                    )
                )
                if weather_data.get(
                    "forecast"
                )
                else None
            ),

            current.get(
                "weather_code"
            ),

            current.get(
                "condition"
            ),

            current.get(
                "time"
            ) or now_iso(),

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


def weather_response_from_live(
    weather_data
):

    current = weather_data.get(
        "current",
        {}
    )

    forecast = weather_data.get(
        "forecast",
        []
    )

    first_day = (
        forecast[0]
        if forecast
        else {}
    )

    return {

        "success": True,

        "location":
            DEFAULT_LOCATION,

        "latitude":
            KOPARGAON_LAT,

        "longitude":
            KOPARGAON_LON,

        # Current weather
        "temperature":
            current.get(
                "temperature_c"
            ),

        "temperature_c":
            current.get(
                "temperature_c"
            ),

        "humidity":
            current.get(
                "humidity_pct"
            ),

        "humidity_pct":
            current.get(
                "humidity_pct"
            ),

        "wind_speed":
            current.get(
                "wind_speed_kmh"
            ),

        "wind_speed_kmh":
            current.get(
                "wind_speed_kmh"
            ),

        "precipitation":
            current.get(
                "precipitation_mm"
            ),

        "precipitation_mm":
            current.get(
                "precipitation_mm"
            ),

        "rain_chance":
            first_day.get(
                "rain_probability_pct"
            ),

        "rain_probability_pct":
            first_day.get(
                "rain_probability_pct"
            ),

        "weather_code":
            current.get(
                "weather_code"
            ),

        "weather_condition":
            current.get(
                "condition"
            ),

        "condition":
            current.get(
                "condition"
            ),

        "recorded_at":
            current.get(
                "time"
            ),

        # 7-day forecast
        "forecast":
            forecast,

        "daily":
            forecast,

        "source":
            "Open-Meteo",

        "cached":
            False
    }


def weather_response_from_db(
    row
):

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

        "rain_chance":
            row.get(
                "rain_chance"
            ),

        "rain_probability_pct":
            row.get(
                "rain_chance"
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

        "forecast": [],

        "daily": [],

        "source":
            "SQLite cached weather",

        "cached":
            True,

        "warning":
            "Live weather temporarily unavailable. "
            "Showing the latest stored weather."
    }


# ============================================================
# WEATHER ENDPOINT
# ============================================================

@app.route(
    "/api/weather",
    methods=["GET"]
)
def weather():

    try:

        days = int(
            request.args.get(
                "days",
                "7"
            )
        )

        days = max(
            1,
            min(days, 16)
        )

    except ValueError:

        days = 7

    try:

        live_weather = get_weather_forecast(
            lat=KOPARGAON_LAT,
            lon=KOPARGAON_LON,
            days=days
        )

        store_weather(
            live_weather
        )

        return jsonify(
            weather_response_from_live(
                live_weather
            )
        )

    except Exception as exc:

        logger.exception(
            "Weather request failed."
        )

        cached = get_latest_weather()

        if cached:

            return jsonify(
                weather_response_from_db(
                    cached
                )
            )

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

        "success":
            True,

        "count":
            len(rows),

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

    "onions":
        "Onion",

    "कांदा":
        "Onion",

    "प्याज":
        "Onion",

    "wheat":
        "Wheat",

    "गेहूं":
        "Wheat",

    "गहू":
        "Wheat",

    "tomato":
        "Tomato",

    "tomatoes":
        "Tomato",

    "टोमॅटो":
        "Tomato",

    "टमाटर":
        "Tomato"
}


def normalize_commodity(
    value
):

    value = clean_text(
        value
    ).lower()

    if value in COMMODITY_ALIASES:

        return COMMODITY_ALIASES[
            value
        ]

    return value.title()


def data_gov_market_data(
    commodity
):

    if not DATA_GOV_API_KEY:

        logger.warning(
            "DATA_GOV_API_KEY is not configured."
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

    return payload.get(
        "records",
        []
    )


def normalize_market_record(
    record,
    requested_commodity
):

    market = (

        record.get(
            "Market"
        )

        or record.get(
            "market"
        )

        or record.get(
            "Market Name"
        )

        or record.get(
            "market_name"
        )

        or record.get(
            "Mandi"
        )

        or ""
    )

    commodity = (

        record.get(
            "Commodity"
        )

        or record.get(
            "commodity"
        )

        or record.get(
            "Crop"
        )

        or requested_commodity
    )

    min_price = (

        record.get(
            "Min Price"
        )

        or record.get(
            "min_price"
        )

        or record.get(
            "Min_Price"
        )

        or record.get(
            "min"
        )
    )

    max_price = (

        record.get(
            "Max Price"
        )

        or record.get(
            "max_price"
        )

        or record.get(
            "Max_Price"
        )

        or record.get(
            "max"
        )
    )

    modal_price = (

        record.get(
            "Modal Price"
        )

        or record.get(
            "modal_price"
        )

        or record.get(
            "Modal_Price"
        )

        or record.get(
            "modal"
        )
    )

    arrival_date = (

        record.get(
            "Arrival Date"
        )

        or record.get(
            "arrival_date"
        )

        or record.get(
            "Arrival_Date"
        )

        or record.get(
            "Date"
        )

        or record.get(
            "date"
        )
    )

    return {

        "market":
            clean_text(
                market
            ) or "Unknown Market",

        "commodity":
            normalize_commodity(
                commodity
            ),

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
        (commodity,)
    ).fetchall()

    connection.close()

    return [
        dict(row)
        for row in rows
    ]


def market_record_to_frontend(
    record
):

    market = record.get(
        "market"
    )

    commodity = record.get(
        "commodity"
    )

    min_price = record.get(
        "min_price"
    )

    max_price = record.get(
        "max_price"
    )

    modal_price = record.get(
        "modal_price"
    )

    arrival_date = record.get(
        "arrival_date"
    )

    return {

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
            arrival_date,

        "Arrival_Date":
            arrival_date,

        "date":
            arrival_date,

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

    if not records:
        return []

    result = []

    for record in records:

        market = str(
            record.get(
                "market",
                ""
            )
        ).lower()

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

    # If the API doesn't return those
    # market names, don't hide all data.
    return (
        result
        if result
        else records
    )


# ============================================================
# MARKET PRICES ENDPOINT
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

                "success":
                    True,

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

                "source":
                    "data.gov.in / AGMARKNET",

                "cached":
                    False
            })

    except Exception as exc:

        logger.exception(
            "Government market request failed."
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

            "success":
                True,

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
    # NO DATA
    # --------------------------------------------------------

    return jsonify({

        "success":
            False,

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

    return jsonify({

        "success":
            True,

        "commodity":
            commodity,

        "count":
            len(rows),

        "history": [

            dict(row)

            for row in rows
        ]
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
                "onion"
            )
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

                "success":
                    True,

                "crop":
                    commodity.lower(),

                "commodity":
                    commodity,

                "record":
                    frontend_records[0],

                "records":
                    frontend_records,

                "data":
                    frontend_records
            })

    except Exception as exc:

        logger.exception(
            "Legacy market request failed."
        )

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

            "success":
                True,

            "crop":
                commodity.lower(),

            "commodity":
                commodity,

            "record":
                frontend_records[0],

            "records":
                frontend_records,

            "data":
                frontend_records,

            "cached":
                True
        })

    return jsonify({

        "success":
            False,

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
# OPENAI AI ASSISTANT
# ============================================================

def get_language_name(
    language
):

    languages = {

        "en":
            "English",

        "hi":
            "Hindi",

        "mr":
            "Marathi",

        "english":
            "English",

        "hindi":
            "Hindi",

        "marathi":
            "Marathi",

        "मराठी":
            "Marathi",

        "हिंदी":
            "Hindi"
    }

    return languages.get(
        language.lower(),
        "English"
    )


def ask_openai(
    question,
    language="en",
    farmer=None
):

    if openai_client is None:

        raise RuntimeError(
            "OpenAI is not configured. "
            "Set OPENAI_API_KEY and install "
            "the openai package."
        )

    farmer = farmer or {}

    language_name = get_language_name(
        language
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

Crop:
{farmer.get("crop", farmer.get("selectedCrop", "Unknown"))}

"""


    instructions = f"""
You are SmartAgri Farmer Assistant.

You are an agricultural assistant designed for farmers
in Maharashtra, India.

Help with:

- crop cultivation
- onion cultivation
- wheat cultivation
- irrigation
- weather-related farming decisions
- soil management
- fertilizer concepts
- pest prevention
- crop disease prevention
- harvesting
- storage
- mandi/market concepts
- farm planning
- agricultural best practices
- government agriculture schemes

The user selected:
{language_name}

Answer in {language_name}.

If the user asks in another language, you may respond
in that language when appropriate.

Important rules:

1. Give practical, easy-to-understand answers.

2. Do not invent current market prices.

3. Do not invent current weather values.

4. Do not invent government scheme amounts,
   eligibility rules, deadlines, or official policies.

5. If exact live information is required, tell the user
   that it should be verified using the official source.

6. Do not claim certainty when diagnosing crop disease.

7. For potentially harmful pesticide or chemical use,
   advise following the product label and local
   agricultural guidance.

8. Prefer concise answers with clear steps.

9. Use Indian agricultural units and terminology
   where appropriate.

10. If useful, structure answers with short headings
    and bullet points.

{farmer_context}
"""

    response = openai_client.responses.create(

        model=OPENAI_MODEL,

        instructions=instructions,

        input=question,

        temperature=0.4,

        max_output_tokens=800
    )

    answer = getattr(
        response,
        "output_text",
        None
    )

    if not answer:

        raise RuntimeError(
            "OpenAI returned an empty response."
        )

    return str(
        answer
    ).strip()


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
    # Crop health model is intentionally not faked.
    #
    # The endpoint exists so your frontend does not break.
    #
    # You can connect a real vision model later.
    # --------------------------------------------------------

    return jsonify({

        "success":
            False,

        "diagnosis":
            "Crop-health AI model is not configured yet.",

        "result":
            "Crop-health AI model is not configured yet.",

        "prediction":
            "Crop-health AI model is not configured yet.",

        "message":
            "The crop image was received successfully. "
            "A plant-disease vision model must be configured "
            "before automatic diagnosis is enabled."
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

        "ai_provider":
            "OpenAI",

        "ai_configured":
            bool(openai_client),

        "ai_model":
            OPENAI_MODEL
            if openai_client
            else None,

        "weather_provider":
            "Open-Meteo",

        "market_provider":
            "data.gov.in / AGMARKNET",

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
        "        SMARTAGRI FLASK BACKEND"
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
        bool(openai_client)
    )

    logger.info(
        "OpenAI model: %s",
        OPENAI_MODEL
    )

    logger.info(
        "Weather provider: Open-Meteo"
    )

    logger.info(
        "Weather location: %s",
        DEFAULT_LOCATION
    )

    logger.info(
        "Coordinates: %s, %s",
        KOPARGAON_LAT,
        KOPARGAON_LON
    )

    logger.info(
        "Market provider: data.gov.in / AGMARKNET"
    )

    logger.info(
        "=========================================="
    )

    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=False
    )
