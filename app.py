import os
import base64

from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory
)

from flask_cors import CORS

from dotenv import load_dotenv

from weather import (
    get_weather_forecast
)

from mandi import (
    get_mandi_prices
)


load_dotenv()


# ============================================================
# APPLICATION
# ============================================================

app = Flask(
    __name__,
    static_folder="."
)

CORS(app)


# ============================================================
# ENVIRONMENT
# ============================================================

DATA_GOV_API_KEY = os.getenv(
    "DATA_GOV_API_KEY",
    ""
)

DATA_GOV_RESOURCE_ID = os.getenv(
    "DATA_GOV_RESOURCE_ID",
    "9ef84268-d588-465a-a308-a864a43d0070"
)

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY",
    ""
)

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.6-luna"
)

PORT = int(
    os.getenv(
        "PORT",
        "5000"
    )
)


# ============================================================
# KOPARGAON
# ============================================================

KOPARGAON_LAT = 19.8833
KOPARGAON_LON = 74.4833


# ============================================================
# FRONTEND
# ============================================================

@app.route("/")
def home():

    return send_from_directory(
        ".",
        "index.html"
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route("/api/health")
def api_health():

    return jsonify({
        "success": True,
        "service": "SmartAgri API",
        "weather": True,
        "market":
            bool(DATA_GOV_API_KEY),
        "ai":
            bool(OPENAI_API_KEY)
    })


# ============================================================
# WEATHER
# ============================================================

@app.route("/api/weather")
def weather_api():

    try:

        lat = float(
            request.args.get(
                "lat",
                KOPARGAON_LAT
            )
        )

        lon = float(
            request.args.get(
                "lon",
                KOPARGAON_LON
            )
        )

        days = int(
            request.args.get(
                "days",
                7
            )
        )

        days = max(
            1,
            min(days, 16)
        )

        weather = get_weather_forecast(
            lat=lat,
            lon=lon,
            days=days
        )

        return jsonify({
            "success": True,
            "location": {
                "name":
                    "Kopargaon",
                "state":
                    "Maharashtra",
                "latitude":
                    lat,
                "longitude":
                    lon
            },
            "data": weather
        })

    except Exception as error:

        print(
            "WEATHER ERROR:",
            error
        )

        return jsonify({
            "success": False,
            "error": str(error)
        }), 500


# ============================================================
# MARKET
# ============================================================

@app.route("/api/market")
def market_api():

    try:

        commodity = request.args.get(
            "commodity",
            "Onion"
        )

        state = request.args.get(
            "state",
            "Maharashtra"
        )

        district = request.args.get(
            "district"
        )

        market = request.args.get(
            "market",
            "Kopargaon"
        )

        prices = get_mandi_prices(

            api_key=DATA_GOV_API_KEY,

            state=state,

            commodity=commodity,

            district=district,

            market=market,

            limit=50
        )

        return jsonify({

            "success": True,

            "commodity":
                commodity,

            "state":
                state,

            "market":
                market,

            "records":
                prices,

            "count":
                len(prices)
        })

    except Exception as error:

        print(
            "MARKET ERROR:",
            error
        )

        return jsonify({
            "success": False,
            "error": str(error),
            "records": []
        }), 500


# ============================================================
# MARKET COMPARISON
# ============================================================

@app.route("/api/market-comparison")
def market_comparison():

    try:

        commodity = request.args.get(
            "commodity",
            "Onion"
        )

        market_names = [
            "Kopargaon",
            "Yeola",
            "Shirdi"
        ]

        result = []

        for market in market_names:

            try:

                prices = get_mandi_prices(

                    api_key=DATA_GOV_API_KEY,

                    state="Maharashtra",

                    commodity=commodity,

                    market=market,

                    limit=20
                )

                result.append({

                    "market":
                        market,

                    "commodity":
                        commodity,

                    "records":
                        prices,

                    "available":
                        len(prices) > 0
                })

            except Exception as market_error:

                result.append({

                    "market":
                        market,

                    "commodity":
                        commodity,

                    "records":
                        [],

                    "available":
                        False,

                    "error":
                        str(market_error)
                })

        return jsonify({

            "success": True,

            "commodity":
                commodity,

            "markets":
                result
        })

    except Exception as error:

        return jsonify({

            "success": False,

            "error":
                str(error)
        }), 500


# ============================================================
# AI
# ============================================================

@app.route(
    "/api/ai",
    methods=["POST"]
)
def ai_api():

    try:

        if not OPENAI_API_KEY:

            return jsonify({

                "success": False,

                "error":
                    "AI API key is not configured."
            }), 500

        body = request.get_json(
            silent=True
        ) or {}

        question = str(
            body.get(
                "question",
                ""
            )
        ).strip()

        language = body.get(
            "language",
            "English"
        )

        context = body.get(
            "context",
            {}
        )

        if not question:

            return jsonify({

                "success": False,

                "error":
                    "Question is required."
            }), 400

        from openai import OpenAI

        client = OpenAI(
            api_key=OPENAI_API_KEY
        )

        system_prompt = f"""
You are SmartAgri AI,
an agriculture assistant for
Indian farmers.

Respond in {language}.

Help with:

- crop cultivation
- irrigation
- weather
- agricultural practices
- mandi prices
- market decisions
- crop health
- government agriculture schemes

Rules:

1. Never invent live weather.
2. Never invent live mandi prices.
3. If data is unavailable,
   say that clearly.
4. Give practical and simple
   explanations.
5. Do not claim a definite
   crop disease diagnosis
   from an image.
6. For dangerous chemical,
   pesticide or serious
   disease decisions,
   recommend consulting
   an agricultural expert.

Farmer context:

{context}
"""

        response = client.responses.create(

            model=OPENAI_MODEL,

            instructions=
                system_prompt,

            input=question
        )

        answer = (
            response.output_text
        )

        return jsonify({

            "success": True,

            "answer":
                answer
        })

    except Exception as error:

        print(
            "AI ERROR:",
            error
        )

        return jsonify({

            "success": False,

            "error":
                str(error)
        }), 500


# ============================================================
# CROP IMAGE AI
# ============================================================

@app.route(
    "/api/crop-analysis",
    methods=["POST"]
)
def crop_analysis():

    try:

        if not OPENAI_API_KEY:

            return jsonify({

                "success": False,

                "error":
                    "AI API key is not configured."
            }), 500

        image = request.files.get(
            "image"
        )

        if image is None:

            return jsonify({

                "success": False,

                "error":
                    "No crop image uploaded."
            }), 400

        image_bytes = image.read()

        if not image_bytes:

            return jsonify({

                "success": False,

                "error":
                    "Image is empty."
            }), 400

        mime_type = (
            image.mimetype
            or "image/jpeg"
        )

        encoded = (
            base64.b64encode(
                image_bytes
            ).decode("utf-8")
        )

        from openai import OpenAI

        client = OpenAI(
            api_key=OPENAI_API_KEY
        )

        response = client.responses.create(

            model=OPENAI_MODEL,

            instructions="""
You are SmartAgri Crop Health AI.

Analyze the crop image.

Return:

1. Visible observations
2. Possible crop-health issue
3. Confidence
4. Recommended next steps
5. Prevention advice

Do not claim certainty.
An image alone cannot guarantee
a professional diagnosis.

If the image is unclear,
say that clearly.
""",

            input=[

                {
                    "role":
                        "user",

                    "content": [

                        {
                            "type":
                                "input_text",

                            "text":
                                "Analyze this crop image."
                        },

                        {
                            "type":
                                "input_image",

                            "image_url":
                                "data:"
                                f"{mime_type};base64,"
                                f"{encoded}"
                        }
                    ]
                }
            ]
        )

        return jsonify({

            "success": True,

            "analysis":
                response.output_text
        })

    except Exception as error:

        print(
            "CROP AI ERROR:",
            error
        )

        return jsonify({

            "success": False,

            "error":
                str(error)
        }), 500


# ============================================================
# START
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print("SMARTAGRI")
    print("=" * 60)

    print(
        "Weather: CONNECTED"
    )

    print(
        "Mandi API:",
        "CONNECTED"
        if DATA_GOV_API_KEY
        else "NOT CONFIGURED"
    )

    print(
        "AI:",
        "CONNECTED"
        if OPENAI_API_KEY
        else "NOT CONFIGURED"
    )

    print(
        "URL:",
        f"http://127.0.0.1:{PORT}"
    )

    print("=" * 60)
    print()

    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=True
    )
