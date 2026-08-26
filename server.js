/* =========================================================
   SMARTAGRI BACKEND SERVER
   Node.js + Express
========================================================= */

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const PORT = 5000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/* =========================================================
   IMAGE UPLOAD
========================================================= */

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {

    res.json({
        status: "online",
        message: "SmartAgri backend is running",
        version: "1.0.0"
    });

});


/* =========================================================
   WEATHER API
========================================================= */

app.get("/api/weather", async (req, res) => {

    try {

        /*
         * TEMPORARY DEMO DATA
         *
         * We will connect this to a real
         * weather API later.
         */

        res.json({

            temperature: 28,

            humidity: 70,

            wind_speed: 12,

            rain_chance: 30

        });

    } catch (error) {

        console.error(
            "Weather error:",
            error
        );

        res.status(500).json({

            error: "Weather data unavailable"

        });

    }

});


/* =========================================================
   MARKET PRICES API
========================================================= */

app.get("/api/market-prices", async (req, res) => {

    try {

        const commodity =
            req.query.commodity || "Onion";


        /*
         * TEMPORARY DEMO DATA
         *
         * This will later be replaced with
         * real government market data.
         */

        const records = [

            {
                market: "Kopargaon",
                commodity: commodity,
                modal_price: 2400,
                date: "2026-08-26"
            },

            {
                market: "Yeola",
                commodity: commodity,
                modal_price: 2600,
                date: "2026-08-26"
            },

            {
                market: "Shirdi",
                commodity: commodity,
                modal_price: 2500,
                date: "2026-08-26"
            }

        ];


        res.json({

            records: records

        });

    } catch (error) {

        console.error(
            "Market API error:",
            error
        );

        res.status(500).json({

            error: "Market data unavailable"

        });

    }

});


/* =========================================================
   CROP HEALTH API
========================================================= */

app.post(
    "/api/crop-health",
    upload.single("image"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    error: "No image uploaded"

                });

            }


            console.log(
                "Crop image received:",
                req.file.originalname
            );


            /*
             * TEMPORARY DEMO RESPONSE
             *
             * Later we will connect an actual
             * crop disease detection model/API.
             */

            res.json({

                diagnosis:
                    "Demo analysis: crop image received successfully",

                confidence: 0.85

            });

        } catch (error) {

            console.error(
                "Crop health error:",
                error
            );

            res.status(500).json({

                error:
                    "Crop health analysis unavailable"

            });

        }

    }
);


/* =========================================================
   AI ASSISTANT API
========================================================= */

app.post("/api/ai", async (req, res) => {

    try {

        const {
            question,
            language,
            farmer
        } = req.body;


        if (!question) {

            return res.status(400).json({

                error: "Question is required"

            });

        }


        console.log(
            "AI Question:",
            question
        );

        console.log(
            "Language:",
            language
        );


        /*
         * TEMPORARY RESPONSE
         *
         * Later we will connect an actual
         * AI API here.
         */

        res.json({

            answer:
                `SmartAgri AI received your question: ${question}`

        });

    } catch (error) {

        console.error(
            "AI error:",
            error
        );

        res.status(500).json({

            error:
                "AI service unavailable"

        });

    }

});


/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {

    res.status(404).json({

        error: "API endpoint not found",

        path: req.originalUrl

    });

});


/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((error, req, res, next) => {

    console.error(
        "Server error:",
        error
    );


    res.status(500).json({

        error: "Internal server error"

    });

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, "127.0.0.1", () => {

    console.log("");
    console.log("========================================");
    console.log("       SMARTAGRI BACKEND SERVER");
    console.log("========================================");
    console.log("");
    console.log(
        `Server running at http://127.0.0.1:${PORT}`
    );
    console.log("");
    console.log("Available APIs:");
    console.log("");
    console.log("GET  /");
    console.log("GET  /api/weather");
    console.log("GET  /api/market-prices");
    console.log("POST /api/crop-health");
    console.log("POST /api/ai");
    console.log("");
    console.log("========================================");
    console.log("");

});
