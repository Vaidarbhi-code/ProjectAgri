import os
import re
import json
import sqlite3
import base64
import logging
from datetime import datetime, timezone

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
        r"/api/*": {"origins": "*"},
        r"/health": {"origins": "*"},
    },
)


# ============================================================
# LOGGING
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
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
    os.getenv("MARKET_TIMEOUT", "20")
)

PLANT_TIMEOUT = int(
    os.getenv("PLANT_TIMEOUT", "60")
)


# ============================================================
# API KEYS
# ============================================================

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY",
    ""
).strip()

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
).strip()

PLANT_ID_API_KEY = os.getenv(
    "PLANT_ID_API_KEY",
    ""
).strip()


# ============================================================
# OPENAI
# ============================================================

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.6-mini"
).strip()

openai_client = None

if OPENAI_API_KEY:
    openai_client = OpenAI(
        api_key=OPENAI_API_KEY
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


# ============================================================
# DATA.GOV.IN
# ============================================================

DATA_GOV_RESOURCE_ID = os.getenv(
    "DATA_GOV_RESOURCE_ID",
    "9ef84268-d588-465a-a308-a864a43d0070"
)

DATA_GOV_URL = (
    "https://api.data.gov.in/resource/"
    + DATA_GOV_RESOURCE_ID
)


# ============================================================
# PLANT.ID
# ============================================================

PLANT_ID_URL = (
    "https://plant.id/api/v3/identification"
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

            temp_max_c REAL,
            temp_min_c REAL,

            rainfall_mm REAL,
            rain_probability_pct REAL,

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
            market TEXT NOT NULL,

            commodity TEXT NOT NULL,
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
        idx_weather_location
        ON weather(location, recorded_at)
        """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_market_commodity
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

    result = {
        "success": False,
        "error": message
    }

    if details:
        result["details"] = str(
            details
        )

    return jsonify(result), status


# ============================================================
# WEATHER
# ============================================================

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
            "precipitation"
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
                )
        },

        "forecast": forecast,

        "source":
            "Open-Meteo"
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
            recorded_at,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

            safe_float(
                weather_data
                .get("forecast", [{}])[0]
                .get(
                    "rain_probability_pct"
                )
            )
            if weather_data.get(
                "forecast"
            )
            else None,

            now_iso(),

            now_iso()
        )
    )

    # --------------------------------------------------------
    # Save forecast history
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
                temp_max_c,
                temp_min_c,
                rainfall_mm,
                rain_probability_pct,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                DEFAULT_LOCATION,

                day.get("date"),

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

        data = get_weather_forecast(
            KOPARGAON_LAT,
            KOPARGAON_LON,
            7
        )

        store_weather(data)

        current = data["current"]

        return jsonify({

            "success": True,

            "location":
                DEFAULT_LOCATION,

            "latitude":
                KOPARGAON_LAT,

            "longitude":
                KOPARGAON_LON,

            "temperature":
                current["temperature_c"],

            "temperature_c":
                current["temperature_c"],

            "humidity":
                current["humidity_pct"],

            "humidity_pct":
                current["humidity_pct"],

            "wind_speed":
                current["wind_speed_kmh"],

            "wind_speed_kmh":
                current["wind_speed_kmh"],

            "precipitation":
                current["precipitation_mm"],

            "precipitation_mm":
                current["precipitation_mm"],

            "rain_chance":
                (
                    data["forecast"][0]
                    .get(
                        "rain_probability_pct"
                    )
                    if data["forecast"]
                    else None
                ),

            "rain_probability_pct":
                (
                    data["forecast"][0]
                    .get(
                        "rain_probability_pct"
                    )
                    if data["forecast"]
                    else None
                ),

            "forecast":
                data["forecast"],

            "source":
                "Open-Meteo"
        })

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

    weather_rows = connection.execute(
        """
        SELECT *
        FROM weather
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    forecast_rows = connection.execute(
        """
        SELECT *
        FROM weather_forecast
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    ).fetchall()

    connection.close()

    return jsonify({

        "success": True,

        "weather": [
            dict(row)
            for row in weather_rows
        ],

        "forecast": [
            dict(row)
            for row in forecast_rows
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

    "wheat":
        "Wheat"
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
    api_key,
    state=None,
    commodity=None,
    district=None,
    market=None,
    limit=50
):

    if not api_key:

        raise RuntimeError(
            "DATA_GOV_API_KEY is missing."
        )

    params = {

        "api-key":
            api_key,

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
        timeout=MARKET_TIMEOUT
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                )
                or "Unknown Market",

                price.get(
                    "commodity"
                )
                or "Unknown",

                price.get(
                    "variety"
                ),

                safe_float(
                    price.get(
                        "min_price"
                    )
                ),

                safe_float(
                    price.get(
                        "max_price"
                    )
                ),

                safe_float(
                    price.get(
                        "modal_price"
                    )
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

    return [
        dict(row)
        for row in rows
    ]


def market_frontend_record(
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

    date = record.get(
        "date",
        record.get(
            "arrival_date"
        )
    )

    return {

        "state":
            record.get(
                "state"
            ),

        "district":
            record.get(
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
            record.get(
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
            record.get(
                "source",
                "data.gov.in / AGMARKNET"
            )
    }


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

        # ----------------------------------------------------
        # First attempt:
        # exact Kopargaon market
        # ----------------------------------------------------

        prices = get_mandi_prices(

            api_key=
                DATA_GOV_API_KEY,

            state=
                "Maharashtra",

            commodity=
                commodity,

            district=
                "Ahilyanagar",

            market=
                "Kopargaon",

            limit=50
        )

        # ----------------------------------------------------
        # Some datasets may still use Ahmednagar.
        # Try it if Ahilyanagar returned nothing.
        # ----------------------------------------------------

        if not prices:

            prices = get_mandi_prices(

                api_key=
                    DATA_GOV_API_KEY,

                state=
                    "Maharashtra",

                commodity=
                    commodity,

                district=
                    "Ahmednagar",

                market=
                    "Kopargaon",

                limit=50
            )

        # ----------------------------------------------------
        # If exact market filtering failed, fetch district
        # data and identify Kopargaon locally.
        # ----------------------------------------------------

        if not prices:

            district_prices = get_mandi_prices(

                api_key=
                    DATA_GOV_API_KEY,

                state=
                    "Maharashtra",

                commodity=
                    commodity,

                district=
                    "Ahilyanagar",

                limit=100
            )

            prices = [
                item
                for item in district_prices

                if "kopargaon"
                in str(
                    item.get(
                        "market",
                        ""
                    )
                ).lower()
            ]

        # ----------------------------------------------------
        # Store verified records.
        # ----------------------------------------------------

        if prices:

            store_market_prices(
                prices
            )

            records = [
                market_frontend_record(
                    item
                )
                for item in prices
            ]

            return jsonify({

                "success":
                    True,

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

    except Exception as exc:

        logger.exception(
            "Mandi API failed"
        )

    # --------------------------------------------------------
    # CACHE
    # --------------------------------------------------------

    cached = get_cached_market_prices(
        commodity
    )

    if cached:

        records = [
            market_frontend_record(
                item
            )
            for item in cached
        ]

        return jsonify({

            "success":
                True,

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

        "records":
            [],

        "data":
            [],

        "prices":
            [],

        "error":
            "Verified market data is currently unavailable."
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
                "Onion"
            )
        )
    )

    # Reuse the same data source.

    try:

        prices = get_mandi_prices(

            api_key=
                DATA_GOV_API_KEY,

            state=
                "Maharashtra",

            commodity=
                commodity,

            district=
                "Ahilyanagar",

            market=
                "Kopargaon",

            limit=50
        )

        if not prices:

            prices = get_mandi_prices(

                api_key=
                    DATA_GOV_API_KEY,

                state=
                    "Maharashtra",

                commodity=
                    commodity,

                district=
                    "Ahmednagar",

                market=
                    "Kopargaon",

                limit=50
            )

        if prices:

            store_market_prices(
                prices
            )

            records = [
                market_frontend_record(
                    item
                )
                for item in prices
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
                    records
            })

    except Exception as exc:

        logger.exception(
            "Legacy market endpoint failed"
        )

    cached = get_cached_market_prices(
        commodity
    )

    if cached:

        records = [
            market_frontend_record(
                item
            )
            for item in cached
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
                True
        })

    return jsonify({

        "success":
            False,

        "crop":
            commodity.lower(),

        "commodity":
            commodity,

        "records":
            [],

        "data":
            [],

        "error":
            "Verified market data unavailable."
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

    instructions = f"""
You are SmartAgri Farmer Assistant.

You help farmers in India with:

- crop cultivation
- onion cultivation
- wheat cultivation
- irrigation
- weather-related farming decisions
- market-price interpretation
- fertilizer concepts
- soil management
- pest prevention
- disease prevention
- harvesting
- crop storage
- agriculture planning
- government agriculture schemes

The requested language is {language_name}.

Answer in {language_name}.

Use simple, practical language suitable for farmers.

Give concise actionable steps.

Do not invent current weather values.

Do not invent current mandi prices.

Do not invent government scheme amounts,
eligibility rules, or official requirements.

If a question requires current official information,
tell the user to verify it with the relevant official source.

Do not claim that a plant disease is definitively diagnosed
from text alone.

For crop disease questions, recommend professional/agricultural
verification when appropriate.

{farmer_context}
"""

    # --------------------------------------------------------
    # OpenAI Responses API
    # --------------------------------------------------------

    response = openai_client.responses.create(

        model=OPENAI_MODEL,

        instructions=instructions,

        input=question,

        max_output_tokens=800
    )

    answer = response.output_text

    if not answer:

        raise RuntimeError(
            "OpenAI returned an empty response."
        )

    return answer.strip()


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

            question=
                question,

            language=
                language,

            farmer=
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
            "OpenAI request failed"
        )

        return json_error(
            "AI service is currently unavailable.",
            503,
            exc
        )


# ============================================================
# PLANT.ID CROP HEALTH
# ============================================================

def identify_crop_with_plant_id(
    image_bytes,
    language="en"
):

    if not PLANT_ID_API_KEY:

        raise RuntimeError(
            "PLANT_ID_API_KEY is not configured."
        )

    image_base64 = base64.b64encode(
        image_bytes
    ).decode("utf-8")

    headers = {

        "Api-Key":
            PLANT_ID_API_KEY,

        "Content-Type":
            "application/json"
    }

    payload = {

        "images": [
            image_base64
        ],

        "health":
            "all",

        "similar_images":
            True,

        "language":
            language
    }

    response = requests.post(

        PLANT_ID_URL,

        headers=headers,

        json=payload,

        timeout=PLANT_TIMEOUT
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


def simplify_plant_id_result(
    result
):

    result_section = result.get(
        "result",
        {}
    )

    # --------------------------------------------------------
    # Plant identification
    # --------------------------------------------------------

    classification = result_section.get(
        "classification",
        {}
    )

    suggestions = classification.get(
        "suggestions",
        []
    )

    plants = []

    for suggestion in suggestions[:5]:

        plants.append({

            "name":
                suggestion.get(
                    "name"
                ),

            "probability":
                suggestion.get(
                    "probability"
                ),

            "details":
                suggestion.get(
                    "details",
                    {}
                )
        })

    # --------------------------------------------------------
    # Plant health
    # --------------------------------------------------------

    health_assessment = result_section.get(
        "health_assessment",
        {}
    )

    health_is_healthy = health_assessment.get(
        "is_healthy"
    )

    disease_suggestions = health_assessment.get(
        "disease",
        {}
    ).get(
        "suggestions",
        []
    )

    diseases = []

    for disease in disease_suggestions[:10]:

        diseases.append({

            "name":
                disease.get(
                    "name"
                ),

            "probability":
                disease.get(
                    "probability"
                ),

            "details":
                disease.get(
                    "details",
                    {}
                )
        })

    return {

        "plants":
            plants,

        "is_healthy":
            health_is_healthy,

        "diseases":
            diseases
    }


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

    image_bytes = uploaded_file.read()

    if not image_bytes:

        return json_error(
            "Uploaded image is empty.",
            400
        )

    # Prevent unnecessarily huge uploads.
    # Adjust if your Plant.id plan allows larger images.
    max_size = 10 * 1024 * 1024

    if len(image_bytes) > max_size:

        return json_error(
            "Image is too large. Maximum size is 10 MB.",
            400
        )

    language = clean_text(
        request.form.get(
            "language",
            "en"
        )
    ).lower()

    if language not in {
        "en",
        "hi",
        "mr"
    }:

        language = "en"

    try:

        raw_result = identify_crop_with_plant_id(

            image_bytes=
                image_bytes,

            language=
                language
        )

        simplified = simplify_plant_id_result(
            raw_result
        )

        # ----------------------------------------------------
        # Determine a useful top result.
        # ----------------------------------------------------

        top_plant = (
            simplified["plants"][0]
            if simplified["plants"]
            else None
        )

        top_disease = (
            simplified["diseases"][0]
            if simplified["diseases"]
            else None
        )

        diagnosis = {

            "plant":
                top_plant,

            "health":
                simplified["is_healthy"],

            "disease":
                top_disease
        }

        return jsonify({

            "success":
                True,

            "diagnosis":
                diagnosis,

            "result":
                simplified,

            "prediction":
                top_plant,

            "plants":
                simplified["plants"],

            "diseases":
                simplified["diseases"],

            "is_healthy":
                simplified["is_healthy"],

            "raw":
                raw_result,

            "source":
                "Plant.id"
        })

    except Exception as exc:

        logger.exception(
            "Plant.id crop health request failed"
        )

        return json_error(
            "Crop-health service is currently unavailable.",
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

        "openai_configured":
            bool(
                OPENAI_API_KEY
            ),

        "openai_model":
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

        "forecast_records":
            forecast_count,

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

        "location":
            DEFAULT_LOCATION,

        "endpoints": [

            "/health",

            "/api/status",

            "/api/weather",

            "/api/weather/history",

            "/api/market-prices?commodity=Onion",

            "/api/market-prices?commodity=Wheat",

            "/api/market?crop=onion",

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
        "SmartAgri Flask Backend"
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
        bool(OPENAI_API_KEY)
    )

    logger.info(
        "OpenAI model: %s",
        OPENAI_MODEL
    )

    logger.info(
        "Data.gov.in configured: %s",
        bool(DATA_GOV_API_KEY)
    )

    logger.info(
        "Plant.id configured: %s",
        bool(PLANT_ID_API_KEY)
    )

    logger.info(
        "Weather location: %s",
        DEFAULT_LOCATION
    )

    logger.info(
        "Kopargaon coordinates: %s, %s",
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
