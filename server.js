// ============================================================
// SMARTAGRI SERVER
// server.js
// ============================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");

// SQLite
const Database = require("better-sqlite3");

// ============================================================
// APP CONFIGURATION
// ============================================================

const app = express();

const PORT = process.env.PORT || 3000;

const DATA_GOV_API_KEY =
    process.env.DATA_GOV_API_KEY ||
    "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

const DATA_GOV_RESOURCE_ID =
    process.env.DATA_GOV_RESOURCE_ID ||
    "9ef84268-d588-465a-a308-a864a43d0070";

const DATA_GOV_URL =
    `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}`;

const OPEN_METEO_URL =
    "https://api.open-meteo.com/v1/forecast";


// ============================================================
// SMARTAGRI LOCATIONS
// ============================================================

const LOCATIONS = {

    kopargaon: {
        name: "Kopargaon",
        latitude: 19.8824,
        longitude: 74.4761
    },

    yeola: {
        name: "Yeola",
        latitude: 20.0420,
        longitude: 74.4890
    },

    shirdi: {
        name: "Shirdi",
        latitude: 19.7667,
        longitude: 74.4778
    }

};


// ============================================================
// EXPRESS MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));


// ============================================================
// STATIC FILES
// ============================================================

app.use(express.static(__dirname));


// ============================================================
// UPLOAD DIRECTORY
// ============================================================

const uploadDirectory =
    path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}


// ============================================================
// MULTER CONFIGURATION
// ============================================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadDirectory);

    },

    filename: function (req, file, cb) {

        const extension =
            path.extname(file.originalname);

        const filename =
            `crop-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}${extension}`;

        cb(null, filename);

    }

});


const upload = multer({

    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(
                new Error(
                    "Only JPG, JPEG, PNG and WEBP images are allowed."
                )
            );

        }

    }

});


app.use(
    "/uploads",
    express.static(uploadDirectory)
);


// ============================================================
// SQLITE DATABASE
// ============================================================

const databasePath =
    process.env.DATABASE_PATH ||
    path.join(__dirname, "smartagri.db");

const db =
    new Database(databasePath);


// Enable WAL mode
db.pragma("journal_mode = WAL");


// ============================================================
// DATABASE TABLES
// ============================================================

db.exec(`

    CREATE TABLE IF NOT EXISTS weather_cache (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        location TEXT NOT NULL,

        latitude REAL,

        longitude REAL,

        data TEXT NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );


    CREATE TABLE IF NOT EXISTS market_prices (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        market TEXT NOT NULL,

        crop TEXT,

        variety TEXT,

        min_price REAL,

        max_price REAL,

        modal_price REAL,

        unit TEXT,

        arrival_date TEXT,

        raw_data TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );


    CREATE TABLE IF NOT EXISTS ai_requests (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        question TEXT,

        response TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );


    CREATE TABLE IF NOT EXISTS crop_health_requests (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        filename TEXT,

        result TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );

`);


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function sendSuccess(res, data) {

    return res.json({

        success: true,

        ...data

    });

}


function sendError(res, status, message, error = null) {

    console.error(message);

    if (error) {
        console.error(error.message || error);
    }

    return res.status(status).json({

        success: false,

        error: message

    });

}


// ============================================================
// ROOT
// ============================================================

app.get("/", function (req, res) {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ============================================================
// SERVER HEALTH
// ============================================================

app.get("/api/health", function (req, res) {

    sendSuccess(res, {

        message: "SmartAgri server is running",

        server: true,

        database: true,

        services: {

            weather: true,

            market: Boolean(DATA_GOV_API_KEY),

            ai: Boolean(process.env.AI_API_URL),

            cropHealth: Boolean(
                process.env.CROP_HEALTH_API_URL
            )

        }

    });

});


// ============================================================
// WEATHER API
// ============================================================
//
// GET:
// /api/weather?location=kopargaon
//
// or:
//
// /api/weather?lat=19.8824&lon=74.4761
//
// ============================================================

app.get("/api/weather", async function (req, res) {

    try {

        let locationName =
            String(
                req.query.location || "kopargaon"
            ).toLowerCase();

        let location =
            LOCATIONS[locationName];


        // Custom coordinates
        if (!location && req.query.lat && req.query.lon) {

            location = {

                name: "Custom",

                latitude:
                    Number(req.query.lat),

                longitude:
                    Number(req.query.lon)

            };

        }


        if (!location) {

            return sendError(
                res,
                400,
                "Unknown location. Use kopargaon, yeola or shirdi."
            );

        }


        const cacheKey =
            location.name.toLowerCase();


        // ----------------------------------------------------
        // CHECK CACHE
        // ----------------------------------------------------

        const cached =
            db.prepare(`

                SELECT *

                FROM weather_cache

                WHERE location = ?

                ORDER BY created_at DESC

                LIMIT 1

            `).get(cacheKey);


        if (cached) {

            const age =
                Date.now() -
                new Date(cached.created_at).getTime();

            // Cache for 30 minutes
            if (age < 30 * 60 * 1000) {

                return sendSuccess(res, {

                    source: "sqlite-cache",

                    location: location.name,

                    data: JSON.parse(
                        cached.data
                    )

                });

            }

        }


        // ----------------------------------------------------
        // OPEN-METEO
        // ----------------------------------------------------

        const response =
            await axios.get(
                OPEN_METEO_URL,
                {

                    params: {

                        latitude:
                            location.latitude,

                        longitude:
                            location.longitude,

                        current:
                            [
                                "temperature_2m",
                                "relative_humidity_2m",
                                "rain",
                                "wind_speed_10m"
                            ].join(","),

                        daily:
                            [
                                "temperature_2m_max",
                                "temperature_2m_min",
                                "precipitation_sum",
                                "precipitation_probability_max"
                            ].join(","),

                        timezone:
                            "auto",

                        forecast_days:
                            7

                    },

                    timeout: 15000

                }
            );


        const weatherData =
            response.data;


        // ----------------------------------------------------
        // SAVE CACHE
        // ----------------------------------------------------

        db.prepare(`

            INSERT INTO weather_cache (

                location,
                latitude,
                longitude,
                data

            )

            VALUES (?, ?, ?, ?)

        `).run(

            cacheKey,

            location.latitude,

            location.longitude,

            JSON.stringify(
                weatherData
            )

        );


        return sendSuccess(res, {

            source: "open-meteo",

            location: location.name,

            coordinates: {

                latitude:
                    location.latitude,

                longitude:
                    location.longitude

            },

            current:
                weatherData.current || null,

            daily:
                weatherData.daily || null,

            data:
                weatherData

        });

    } catch (error) {

        // ----------------------------------------------------
        // FALL BACK TO CACHE IF OPEN-METEO FAILS
        // ----------------------------------------------------

        const locationName =
            String(
                req.query.location || "kopargaon"
            ).toLowerCase();

        const cached =
            db.prepare(`

                SELECT *

                FROM weather_cache

                WHERE location = ?

                ORDER BY created_at DESC

                LIMIT 1

            `).get(locationName);


        if (cached) {

            return sendSuccess(res, {

                source: "sqlite-cache-fallback",

                location: locationName,

                stale: true,

                data: JSON.parse(
                    cached.data
                )

            });

        }


        return sendError(
            res,
            500,
            "Weather service is currently unavailable.",
            error
        );

    }

});


// ============================================================
// MARKET DATA API
// ============================================================
//
// GET:
// /api/market-prices
//
// Optional:
// /api/market-prices?crop=onion
//
// ============================================================

app.get("/api/market-prices", async function (req, res) {

    try {

        const crop =
            req.query.crop || "onion";


        // ----------------------------------------------------
        // FETCH DATA.GOV.IN
        // ----------------------------------------------------

        const response =
            await axios.get(
                DATA_GOV_URL,
                {

                    params: {

                        "api-key":
                            DATA_GOV_API_KEY,

                        format:
                            "json",

                        limit:
                            1000

                    },

                    timeout: 20000

                }
            );


        const records =
            response.data.records || [];


        // ----------------------------------------------------
        // TARGET MARKETS
        // ----------------------------------------------------

        const targetMarkets = [

            "kopargaon",
            "yeola",
            "shirdi"

        ];


        // ----------------------------------------------------
        // NORMALIZE DATA
        // ----------------------------------------------------

        const normalized =
            records.map(function (record) {

                const market =
                    String(
                        record.market ||
                        record.Market ||
                        record.market_name ||
                        record.Market_Name ||
                        record.apmc ||
                        ""
                    ).trim();


                const commodity =
                    String(
                        record.commodity ||
                        record.Commodity ||
                        record.crop ||
                        record.Crop ||
                        ""
                    ).trim();


                const variety =
                    String(
                        record.variety ||
                        record.Variety ||
                        ""
                    ).trim();


                const minPrice =
                    parseNumber(
                        record.min_price ||
                        record.Min_Price ||
                        record.min_price_per_quintal ||
                        record.Min_Price_Per_Quintal
                    );


                const maxPrice =
                    parseNumber(
                        record.max_price ||
                        record.Max_Price ||
                        record.max_price_per_quintal ||
                        record.Max_Price_Per_Quintal
                    );


                const modalPrice =
                    parseNumber(
                        record.modal_price ||
                        record.Modal_Price ||
                        record.modal_price_per_quintal ||
                        record.Modal_Price_Per_Quintal
                    );


                const date =
                    record.arrival_date ||
                    record.Arrival_Date ||
                    record.date ||
                    record.Date ||
                    record.trade_date ||
                    "";


                return {

                    market,

                    crop: commodity,

                    variety,

                    min_price:
                        minPrice,

                    max_price:
                        maxPrice,

                    modal_price:
                        modalPrice,

                    unit:
                        "₹/quintal",

                    arrival_date:
                        date,

                    raw:
                        record

                };

            });


        // ----------------------------------------------------
        // FILTER MARKETS
        // ----------------------------------------------------

        const marketRecords =
            normalized.filter(function (item) {

                const marketName =
                    item.market.toLowerCase();

                return targetMarkets.some(
                    function (target) {

                        return marketName.includes(
                            target
                        );

                    }
                );

            });


        // ----------------------------------------------------
        // FILTER CROP
        // ----------------------------------------------------

        let filteredRecords =
            marketRecords;


        if (crop) {

            filteredRecords =
                marketRecords.filter(
                    function (item) {

                        return item.crop
                            .toLowerCase()
                            .includes(
                                String(crop)
                                    .toLowerCase()
                            );

                    }
                );

        }


        // ----------------------------------------------------
        // SAVE TO SQLITE
        // ----------------------------------------------------

        const insert =
            db.prepare(`

                INSERT INTO market_prices (

                    market,
                    crop,
                    variety,
                    min_price,
                    max_price,
                    modal_price,
                    unit,
                    arrival_date,
                    raw_data

                )

                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

            `);


        const transaction =
            db.transaction(function (items) {

                for (const item of items) {

                    insert.run(

                        item.market,

                        item.crop,

                        item.variety,

                        item.min_price,

                        item.max_price,

                        item.modal_price,

                        item.unit,

                        item.arrival_date,

                        JSON.stringify(
                            item.raw
                        )

                    );

                }

            });


        if (filteredRecords.length > 0) {

            transaction(
                filteredRecords
            );

        }


        return sendSuccess(res, {

            source: "data.gov.in",

            crop,

            markets: [

                "Kopargaon",

                "Yeola",

                "Shirdi"

            ],

            count:
                filteredRecords.length,

            data:
                filteredRecords

        });

    } catch (error) {

        console.error(
            "DATA.GOV.IN ERROR:",
            error.response?.data ||
            error.message
        );


        // ----------------------------------------------------
        // SQLITE FALLBACK
        // ----------------------------------------------------

        const crop =
            req.query.crop || "onion";


        const cached =
            db.prepare(`

                SELECT *

                FROM market_prices

                WHERE lower(crop)
                LIKE ?

                ORDER BY created_at DESC

            `).all(
                `%${String(crop).toLowerCase()}%`
            );


        if (cached.length > 0) {

            return sendSuccess(res, {

                source:
                    "sqlite-cache-fallback",

                stale:
                    true,

                crop,

                markets: [

                    "Kopargaon",

                    "Yeola",

                    "Shirdi"

                ],

                count:
                    cached.length,

                data:
                    cached

            });

        }


        return sendError(
            res,
            500,
            "Market data service is unavailable and no cached market data exists.",
            error
        );

    }

});


// ============================================================
// MARKET CACHE ENDPOINT
// ============================================================

app.get("/api/market-cache", function (req, res) {

    try {

        const crop =
            req.query.crop || "onion";


        const records =
            db.prepare(`

                SELECT *

                FROM market_prices

                WHERE lower(crop)
                LIKE ?

                ORDER BY created_at DESC

                LIMIT 100

            `).all(
                `%${String(crop).toLowerCase()}%`
            );


        sendSuccess(res, {

            source:
                "sqlite",

            crop,

            count:
                records.length,

            data:
                records

        });

    } catch (error) {

        sendError(
            res,
            500,
            "Unable to read market cache.",
            error
        );

    }

});


// ============================================================
// AI ASSISTANT
// ============================================================
//
// POST /api/ai
//
// body:
// {
//     "question": "When should I irrigate onion?"
// }
//
// ============================================================

app.post("/api/ai", async function (req, res) {

    try {

        const question =
            String(
                req.body.question || ""
            ).trim();


        if (!question) {

            return sendError(
                res,
                400,
                "Question is required."
            );

        }


        // ----------------------------------------------------
        // IF NO AI SERVICE IS CONFIGURED
        // ----------------------------------------------------

        if (!process.env.AI_API_URL) {

            const response =
                getLocalFarmerResponse(
                    question
                );


            db.prepare(`

                INSERT INTO ai_requests (

                    question,
                    response

                )

                VALUES (?, ?)

            `).run(

                question,

                response

            );


            return sendSuccess(res, {

                connected:
                    false,

                source:
                    "local-prototype",

                response

            });

        }


        // ----------------------------------------------------
        // EXTERNAL AI SERVICE
        // ----------------------------------------------------

        const headers = {

            "Content-Type":
                "application/json"

        };


        if (process.env.AI_API_KEY) {

            headers.Authorization =
                `Bearer ${process.env.AI_API_KEY}`;

        }


        const aiResponse =
            await axios.post(

                process.env.AI_API_URL,

                {

                    question,

                    system:
                        "You are SmartAgri, an agricultural assistant for Indian farmers. Give concise, practical farming guidance. Do not invent government schemes or market prices."

                },

                {

                    headers,

                    timeout: 30000

                }

            );


        const answer =
            aiResponse.data.response ||
            aiResponse.data.answer ||
            aiResponse.data.message ||
            aiResponse.data.output ||
            JSON.stringify(
                aiResponse.data
            );


        db.prepare(`

            INSERT INTO ai_requests (

                question,
                response

            )

            VALUES (?, ?)

        `).run(

            question,

            String(answer)

        );


        return sendSuccess(res, {

            connected:
                true,

            source:
                "ai-service",

            response:
                answer

        });

    } catch (error) {

        return sendError(
            res,
            500,
            "AI service is currently unavailable.",
            error
        );

    }

});


// ============================================================
// CROP HEALTH AI
// ============================================================
//
// POST /api/crop-health
//
// multipart/form-data
// field name: image
//
// ============================================================

app.post(
    "/api/crop-health",
    upload.single("image"),
    async function (req, res) {

        try {

            if (!req.file) {

                return sendError(
                    res,
                    400,
                    "Please upload a crop or leaf image."
                );

            }


            const imagePath =
                req.file.path;


            // ------------------------------------------------
            // NO MODEL CONFIGURED
            // ------------------------------------------------

            if (!process.env.CROP_HEALTH_API_URL) {

                const result = {

                    connected:
                        false,

                    status:
                        "model_not_connected",

                    message:
                        "Crop-health AI model is not connected yet.",

                    filename:
                        req.file.filename

                };


                db.prepare(`

                    INSERT INTO crop_health_requests (

                        filename,
                        result

                    )

                    VALUES (?, ?)

                `).run(

                    req.file.filename,

                    JSON.stringify(
                        result
                    )

                );


                return sendSuccess(res, {

                    ...result,

                    imageUrl:
                        `/uploads/${req.file.filename}`

                });

            }


            // ------------------------------------------------
            // SEND IMAGE TO MODEL
            // ------------------------------------------------

            const formData =
                new (require("form-data"))();


            formData.append(

                "image",

                fs.createReadStream(
                    imagePath
                )

            );


            const headers =
                formData.getHeaders();


            if (process.env.CROP_HEALTH_API_KEY) {

                headers.Authorization =
                    `Bearer ${process.env.CROP_HEALTH_API_KEY}`;

            }


            const modelResponse =
                await axios.post(

                    process.env.CROP_HEALTH_API_URL,

                    formData,

                    {

                        headers,

                        timeout: 60000,

                        maxContentLength:
                            20 * 1024 * 1024,

                        maxBodyLength:
                            20 * 1024 * 1024

                    }

                );


            const result =
                modelResponse.data;


            db.prepare(`

                INSERT INTO crop_health_requests (

                    filename,
                    result

                )

                VALUES (?, ?)

            `).run(

                req.file.filename,

                JSON.stringify(
                    result
                )

            );


            return sendSuccess(res, {

                connected:
                    true,

                imageUrl:
                    `/uploads/${req.file.filename}`,

                result

            });

        } catch (error) {

            console.error(
                "CROP HEALTH ERROR:",
                error.response?.data ||
                error.message
            );


            return sendError(
                res,
                500,
                "Crop health analysis failed.",
                error
            );

        }

    }
);


// ============================================================
// GOVERNMENT SCHEMES
// ============================================================

app.get(
    "/api/government-schemes",
    function (req, res) {

        sendSuccess(res, {

            schemes: [

                {

                    name:
                        "PM-KISAN",

                    description:
                        "Pradhan Mantri Kisan Samman Nidhi",

                    url:
                        "https://pmkisan.gov.in/"

                },

                {

                    name:
                        "PMKSY",

                    description:
                        "Pradhan Mantri Krishi Sinchayee Yojana",

                    url:
                        "https://pmksy.gov.in/"

                },

                {

                    name:
                        "PMFBY",

                    description:
                        "Pradhan Mantri Fasal Bima Yojana",

                    url:
                        "https://pmfby.gov.in/"

                }

            ]

        });

    }
);


// ============================================================
// CROP INFORMATION
// ============================================================

app.get(
    "/api/crops",
    function (req, res) {

        sendSuccess(res, {

            crops: [

                {

                    id:
                        "onion",

                    name:
                        "Onion",

                    icon:
                        "🧅",

                    information: {

                        season:
                            "Rabi and Kharif seasons depending on region",

                        soil:
                            "Well-drained loamy soil with good organic matter",

                        irrigation:
                            "Regular irrigation is important, but avoid waterlogging",

                        fertilizer:
                            "Use soil-test-based fertilizer application",

                        pests:
                            "Thrips and onion maggot can affect crops",

                        diseases:
                            "Purple blotch, downy mildew and basal rot"

                    }

                },

                {

                    id:
                        "wheat",

                    name:
                        "Wheat",

                    icon:
                        "🌾",

                    information: {

                        season:
                            "Primarily a Rabi crop",

                        soil:
                            "Well-drained loam to clay-loam soil",

                        irrigation:
                            "Critical irrigation stages should be maintained",

                        fertilizer:
                            "Apply nutrients according to soil requirements",

                        pests:
                            "Aphids and termites can cause damage",

                        diseases:
                            "Rusts and powdery mildew may occur"

                    }

                }

            ]

        });

    }
);


// ============================================================
// DATABASE STATUS
// ============================================================

app.get(
    "/api/database-status",
    function (req, res) {

        try {

            const marketCount =
                db.prepare(`

                    SELECT COUNT(*) AS count

                    FROM market_prices

                `).get();


            const weatherCount =
                db.prepare(`

                    SELECT COUNT(*) AS count

                    FROM weather_cache

                `).get();


            const aiCount =
                db.prepare(`

                    SELECT COUNT(*) AS count

                    FROM ai_requests

                `).get();


            const cropHealthCount =
                db.prepare(`

                    SELECT COUNT(*) AS count

                    FROM crop_health_requests

                `).get();


            sendSuccess(res, {

                database:
                    databasePath,

                tables: {

                    marketPrices:
                        marketCount.count,

                    weather:
                        weatherCount.count,

                    aiRequests:
                        aiCount.count,

                    cropHealth:
                        cropHealthCount.count

                }

            });

        } catch (error) {

            sendError(
                res,
                500,
                "Database status unavailable.",
                error
            );

        }

    }
);


// ============================================================
// NUMBER PARSER
// ============================================================

function parseNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const cleaned =
        String(value)
            .replace(/,/g, "")
            .replace(/[^\d.-]/g, "");


    const number =
        Number(cleaned);


    return Number.isFinite(number)
        ? number
        : null;

}


// ============================================================
// LOCAL FARMER ASSISTANT
// ============================================================
//
// This is only a prototype fallback.
// It does NOT pretend to be a real AI model.
// ============================================================

function getLocalFarmerResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("onion") &&
        (
            q.includes("water") ||
            q.includes("irrigation")
        )
    ) {

        return (
            "For onion, maintain regular irrigation " +
            "according to soil moisture and crop stage. " +
            "Avoid waterlogging, especially near bulb maturity."
        );

    }


    if (
        q.includes("wheat") &&
        (
            q.includes("water") ||
            q.includes("irrigation")
        )
    ) {

        return (
            "For wheat, irrigation is particularly " +
            "important at critical growth stages. " +
            "Use soil moisture and local weather conditions " +
            "to avoid unnecessary irrigation."
        );

    }


    if (
        q.includes("rain") ||
        q.includes("weather")
    ) {

        return (
            "Check the SmartAgri Weather section for the " +
            "latest Open-Meteo forecast for Kopargaon, " +
            "Yeola or Shirdi."
        );

    }


    if (
        q.includes("market") ||
        q.includes("price") ||
        q.includes("mandi")
    ) {

        return (
            "Check Market Prices or Market Comparison to " +
            "compare available verified data for Kopargaon, " +
            "Yeola and Shirdi."
        );

    }


    return (
        "I can help with farming topics such as crop " +
        "management, irrigation, weather, market information " +
        "and government agricultural schemes. " +
        "For AI-generated answers, configure AI_API_URL " +
        "in your .env file."
    );

}


// ============================================================
// MULTER ERROR HANDLER
// ============================================================

app.use(
    function (error, req, res, next) {

        if (
            error instanceof multer.MulterError
        ) {

            return sendError(
                res,
                400,
                `Upload error: ${error.message}`
            );

        }


        if (
            error &&
            error.message &&
            error.message.includes(
                "Only JPG"
            )
        ) {

            return sendError(
                res,
                400,
                error.message
            );

        }


        next(error);

    }
);


// ============================================================
// GENERAL ERROR HANDLER
// ============================================================

app.use(
    function (error, req, res, next) {

        console.error(
            "SERVER ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            error:
                "Internal server error."

        });

    }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
    PORT,
    function () {

        console.log("");
        console.log(
            "=========================================="
        );

        console.log(
            "       SMARTAGRI SERVER STARTED"
        );

        console.log(
            "=========================================="
        );

        console.log(
            `Server: http://localhost:${PORT}`
        );

        console.log(
            `Database: ${databasePath}`
        );

        console.log(
            "Weather: Open-Meteo"
        );

        console.log(
            "Markets: data.gov.in"
        );

        console.log(
            "Markets: Kopargaon | Yeola | Shirdi"
        );

        console.log(
            `AI: ${
                process.env.AI_API_URL
                    ? "Connected"
                    : "Prototype fallback"
            }`
        );

        console.log(
            `Crop Health: ${
                process.env.CROP_HEALTH_API_URL
                    ? "Connected"
                    : "Model not configured"
            }`
        );

        console.log(
            "=========================================="
        );

        console.log("");

    }
);


// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================

function shutdown() {

    console.log(
        "\nShutting down SmartAgri..."
    );


    try {

        db.close();

    } catch (error) {

        console.error(
            error.message
        );

    }


    process.exit(0);

}


process.on(
    "SIGINT",
    shutdown
);

process.on(
    "SIGTERM",
    shutdown
);
