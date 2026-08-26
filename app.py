import os
import requests

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# FLASK APPLICATION
# ============================================================

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# ============================================================
# CONFIGURATION
# ============================================================

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
)

DATA_GOV_RESOURCE_ID = (
    "9ef84268-d588-465a-a308-a864a43d0070"
)

DATA_GOV_URL = (
    "https://api.data.gov.in/resource/"
    + DATA_GOV_RESOURCE_ID
)


# ============================================================
# BASIC HEALTH CHECK
# ============================================================

@app.route("/")
def home():

    return jsonify({
        "success": True,
        "application": "SmartAgri Backend",
        "status": "running"
    })


@app.route("/api/health")
def health():

    return jsonify({
        "success": True,
        "backend": "online",
        "data_gov_configured": bool(DATA_GOV_API_KEY)
    })


# ============================================================
# WEATHER
# ============================================================

@app.route("/api/weather", methods=["GET"])
def weather():

    """
    Weather endpoint.

    This is deliberately structured so you can connect
    a real weather provider later.

    For the prototype we return verified-style weather
    data for Kopargaon.

    Replace this section with Open-Meteo/API integration
    when you want completely live weather.
    """

    return jsonify({

        "success": True,

        "location": {
            "village": "Kopargaon",
            "district": "Ahilyanagar",
            "state": "Maharashtra"
        },

        "temperature": 28,

        "humidity": 68,

        "wind_speed": 11,

        "rain_chance": 25

    })


# ============================================================
# DATA.GOV.IN MARKET API
# ============================================================

def get_market_data(
    commodity=None,
    market=None,
    district=None,
    state="Maharashtra",
    limit=100
):

    if not DATA_GOV_API_KEY:

        raise RuntimeError(
            "DATA_GOV_API_KEY is not configured."
        )


    params = {

        "api-key": DATA_GOV_API_KEY,

        "format": "json",

        "limit": limit

    }


    # --------------------------------------------------------
    # DATA.GOV.IN FILTER
    # --------------------------------------------------------

    filters = {}


    if commodity:
        filters["commodity"] = commodity


    if state:
        filters["state"] = state


    if district:
        filters["district"] = district


    if market:
        filters["market"] = market


    if filters:

        import json

        params["filters"] = json.dumps(
            filters,
            separators=(",", ":")
        )


    print(
        "Requesting data.gov.in:",
        DATA_GOV_URL,
        params
    )


    response = requests.get(
        DATA_GOV_URL,
        params=params,
        timeout=30
    )


    print(
        "data.gov.in status:",
        response.status_code
    )


    if response.status_code != 200:

        print(
            "data.gov.in response:",
            response.text[:1000]
        )

        raise RuntimeError(
            f"data.gov.in returned "
            f"{response.status_code}"
        )


    data = response.json()


    return data


# ============================================================
# NORMALIZE MARKET RECORD
# ============================================================

def normalize_market_record(record):

    return {

        "state": record.get(
            "state",
            record.get("State", "")
        ),

        "district": record.get(
            "district",
            record.get("District", "")
        ),

        "market": record.get(
            "market",
            record.get("Market", "")
        ),

        "commodity": record.get(
            "commodity",
            record.get("Commodity", "")
        ),

        "variety": record.get(
            "variety",
            record.get("Variety", "")
        ),

        "arrival_date": record.get(
            "arrival_date",
            record.get(
                "Arrival_Date",
                ""
            )
        ),

        "min_price": record.get(
            "min_price",
            record.get(
                "Min_Price",
                ""
            )
        ),

        "max_price": record.get(
            "max_price",
            record.get(
                "Max_Price",
                ""
            )
        ),

        "modal_price": record.get(
            "modal_price",
            record.get(
                "Modal_Price",
                ""
            )
        ),

        "unit": record.get(
            "unit",
            record.get(
                "Unit",
                "Quintal"
            )
        )

    }


# ============================================================
# MARKET PRICES
# ============================================================

@app.route(
    "/api/market-prices",
    methods=["GET"]
)
def market_prices():

    commodity = request.args.get(
        "commodity",
        "Onion"
    )


    market = request.args.get(
        "market"
    )


    district = request.args.get(
        "district",
        "Ahilyanagar"
    )


    # --------------------------------------------------------
    # Fetch from data.gov.in
    # --------------------------------------------------------

    try:

        raw_data = get_market_data(

            commodity=commodity,

            market=market,

            district=district,

            state="Maharashtra",

            limit=100

        )


        records = raw_data.get(
            "records",
            []
        )


        normalized_records = [

            normalize_market_record(
                record
            )

            for record in records

        ]


        # ----------------------------------------------------
        # Kopargaon / Yeola / Shirdi filtering
        # ----------------------------------------------------

        wanted_markets = [

            "kopargaon",
            "yeola",
            "shirdi"

        ]


        filtered_records = []


        for record in normalized_records:

            market_name = str(
                record.get(
                    "market",
                    ""
                )
            ).lower()


            if any(
                market_name.find(name) >= 0
                for name in wanted_markets
            ):

                filtered_records.append(
                    record
                )


        # ----------------------------------------------------
        # If specific markets were not found,
        # return all Maharashtra records.
        # ----------------------------------------------------

        if filtered_records:

            normalized_records = (
                filtered_records
            )


        return jsonify({

            "success": True,

            "source": (
                "Government of India "
                "data.gov.in / AGMARKNET"
            ),

            "commodity": commodity,

            "records": normalized_records

        })


    except Exception as error:

        print(
            "Market API error:",
            repr(error)
        )


        return jsonify({

            "success": False,

            "error": str(error),

            "records": []

        }), 502


# ============================================================
# MARKET COMPARISON
# ============================================================

@app.route(
    "/api/market-comparison",
    methods=["GET"]
)
def market_comparison():

    commodity = request.args.get(
        "commodity",
        "Onion"
    )


    try:

        raw_data = get_market_data(

            commodity=commodity,

            state="Maharashtra",

            limit=100

        )


        records = raw_data.get(
            "records",
            []
        )


        normalized = [

            normalize_market_record(
                record
            )

            for record in records

        ]


        result = []


        markets = [

            (
                "Kopargaon",
                ["kopargaon"]
            ),

            (
                "Yeola",
                ["yeola"]
            ),

            (
                "Shirdi",
                ["shirdi"]
            )

        ]


        for market_name, keywords in markets:

            matching = None


            for record in normalized:

                name = str(
                    record.get(
                        "market",
                        ""
                    )
                ).lower()


                if any(
                    keyword in name
                    for keyword in keywords
                ):

                    matching = record

                    break


            if matching:

                result.append({

                    "market": market_name,

                    "commodity": commodity,

                    "modal_price":
                        matching.get(
                            "modal_price"
                        ),

                    "min_price":
                        matching.get(
                            "min_price"
                        ),

                    "max_price":
                        matching.get(
                            "max_price"
                        ),

                    "date":
                        matching.get(
                            "arrival_date"
                        ),

                    "unit":
                        matching.get(
                            "unit"
                        )

                })

            else:

                result.append({

                    "market": market_name,

                    "commodity": commodity,

                    "modal_price": None,

                    "min_price": None,

                    "max_price": None,

                    "date": None,

                    "unit": "Quintal"

                })


        return jsonify({

            "success": True,

            "records": result

        })


    except Exception as error:

        print(
            "Comparison error:",
            repr(error)
        )


        return jsonify({

            "success": False,

            "records": [],

            "error": str(error)

        }), 502


# ============================================================
# CROP HEALTH
# ============================================================

@app.route(
    "/api/crop-health",
    methods=["POST"]
)
def crop_health():

    if "image" not in request.files:

        return jsonify({

            "success": False,

            "error": "No image uploaded."

        }), 400


    image = request.files["image"]


    if image.filename == "":

        return jsonify({

            "success": False,

            "error": "Invalid image."

        }), 400


    # --------------------------------------------------------
    # PLACEHOLDER
    #
    # Connect TensorFlow / Roboflow / Plant.id / custom model
    # here later.
    # --------------------------------------------------------

    return jsonify({

        "success": True,

        "diagnosis": (
            "Crop image received. "
            "AI crop-health model is ready "
            "to be connected."
        ),

        "confidence": "N/A"

    })


# ============================================================
# AI ASSISTANT
# ============================================================

@app.route(
    "/api/ai",
    methods=["POST"]
)
def ai_assistant():

    data = request.get_json(
        silent=True
    ) or {}


    question = str(
        data.get(
            "question",
            ""
        )
    ).strip()


    language = data.get(
        "language",
        "en"
    )


    if not question:

        return jsonify({

            "success": False,

            "error": "Question is required."

        }), 400


    # --------------------------------------------------------
    # Prototype response
    # --------------------------------------------------------

    responses = {

        "en": (
            "SmartAgri received your question. "
            "For live AI answers, connect your "
            "preferred AI model to the /api/ai endpoint."
        ),

        "hi": (
            "SmartAgri को आपका प्रश्न प्राप्त हुआ। "
            "लाइव AI उत्तरों के लिए AI मॉडल को "
            "/api/ai endpoint से कनेक्ट करें।"
        ),

        "mr": (
            "SmartAgri ला तुमचा प्रश्न मिळाला आहे. "
            "लाइव्ह AI उत्तरांसाठी AI मॉडेल "
            "/api/ai endpoint शी कनेक्ट करा."
        )

    }


    answer = responses.get(
        language,
        responses["en"]
    )


    return jsonify({

        "success": True,

        "answer": answer

    })


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    print("")
    print("======================================")
    print("        SMARTAGRI BACKEND")
    print("======================================")
    print("")
    print(
        "Data.gov API configured:",
        bool(DATA_GOV_API_KEY)
    )
    print("")
    print(
        "Server:",
        "http://127.0.0.1:5000"
    )
    print("")

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
