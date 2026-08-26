/*
=========================================================
SMARTAGRI
Production Backend Server
=========================================================

Endpoints:

GET  /api/health
GET  /api/weather
GET  /api/market-prices?commodity=Onion
POST /api/crop-health
POST /api/ai

Environment variables:

PORT
NODE_ENV
FRONTEND_URL
DATA_GOV_API_KEY
PLANT_ID_API_KEY
OPENAI_API_KEY
=========================================================
*/

"use strict";


/* =========================================================
   IMPORTS
========================================================= */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const OpenAI = require("openai");


/* =========================================================
   APPLICATION
========================================================= */

const app = express();

const PORT =
    Number(process.env.PORT) || 5000;

const NODE_ENV =
    process.env.NODE_ENV || "development";


/* =========================================================
   ENVIRONMENT VALIDATION
========================================================= */

const requiredEnvironmentVariables = [
    "DATA_GOV_API_KEY",
    "PLANT_ID_API_KEY",
    "OPENAI_API_KEY"
];

const missingEnvironmentVariables =
    requiredEnvironmentVariables.filter(
        name => !process.env[name]
    );


if (missingEnvironmentVariables.length > 0) {

    console.warn(
        "WARNING: Missing environment variables:",
        missingEnvironmentVariables.join(", ")
    );

}


/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [

    process.env.FRONTEND_URL,

    "http://localhost:5500",
    "http://127.0.0.1:5500",

    "http://localhost:3000",
    "http://127.0.0.1:3000"

].filter(Boolean);


app.use(
    cors({

        origin: function (origin, callback) {

            /*
                Allow requests without Origin.

                Useful for:
                - Postman
                - server-to-server requests
                - local testing
            */

            if (!origin) {
                return callback(null, true);
            }


            if (
                NODE_ENV !== "production" &&
                (
                    origin.startsWith("http://localhost:") ||
                    origin.startsWith("http://127.0.0.1:")
                )
            ) {

                return callback(null, true);

            }


            if (
                allowedOrigins.includes(origin)
            ) {

                return callback(null, true);

            }


            return callback(
                new Error("CORS: Origin not allowed.")
            );

        },

        methods: [
            "GET",
            "POST",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Accept"
        ]

    })
);


/* =========================================================
   BODY PARSING
========================================================= */

app.use(
    express.json({
        limit: "1mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb"
    })
);


/* =========================================================
   SECURITY / RESPONSE HEADERS
========================================================= */

app.disable("x-powered-by");


app.use(
    (req, res, next) => {

        res.setHeader(
            "X-Content-Type-Options",
            "nosniff"
        );

        res.setHeader(
            "X-Frame-Options",
            "SAMEORIGIN"
        );

        res.setHeader(
            "Referrer-Policy",
            "strict-origin-when-cross-origin"
        );

        next();

    }
);


/* =========================================================
   FILE UPLOAD CONFIGURATION
========================================================= */

const upload =
    multer({

        storage:
            multer.memoryStorage(),

        limits: {

            fileSize:
                5 * 1024 * 1024,

            files: 1

        },

        fileFilter:
            function (
                req,
                file,
                callback
            ) {

                const allowedMimeTypes = [

                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp"

                ];


                if (
                    allowedMimeTypes.includes(
                        file.mimetype
                    )
                ) {

                    callback(
                        null,
                        true
                    );

                } else {

                    callback(
                        new Error(
                            "Only JPG, PNG and WEBP images are allowed."
                        )
                    );

                }

            }

    });


/* =========================================================
   OPENAI
========================================================= */

let openai = null;


if (process.env.OPENAI_API_KEY) {

    openai =
        new OpenAI({

            apiKey:
                process.env.OPENAI_API_KEY

        });

}


/* =========================================================
   CONSTANTS
========================================================= */

const DATA_GOV_RESOURCE_ID =
    "9ef84268-d588-465a-a308-a864a43d0070";


const DATA_GOV_URL =
    `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}`;


const OPEN_METEO_FORECAST_URL =
    "https://api.open-meteo.com/v1/forecast";


const OPEN_METEO_GEOCODING_URL =
    "https://geocoding-api.open-meteo.com/v1/search";


const PLANT_ID_URL =
    "https://plant.id/api/v3/identification";


/*
    Kopargaon fallback coordinates.

    The weather endpoint can dynamically geocode
    the farmer's village if one is supplied.

    These are only the fallback values.
*/

const DEFAULT_LOCATION = {

    name: "Kopargaon",

    latitude: 19.88,

    longitude: 74.48

};


/* =========================================================
   HELPER: SAFE FETCH WITH TIMEOUT
========================================================= */

async function fetchWithTimeout(
    url,
    options = {},
    timeoutMs = 15000
) {

    const controller =
        new AbortController();


    const timeout =
        setTimeout(
            () => controller.abort(),
            timeoutMs
        );


    try {

        return await fetch(
            url,
            {
                ...options,
                signal:
                    controller.signal
            }
        );

    } finally {

        clearTimeout(timeout);

    }

}


/* =========================================================
   HELPER: JSON RESPONSE
========================================================= */

function sendError(
    res,
    status,
    message,
    details = undefined
) {

    const response = {

        success: false,

        error: message

    };


    if (
        NODE_ENV !== "production" &&
        details
    ) {

        response.details =
            String(details);

    }


    return res
        .status(status)
        .json(response);

}


/* =========================================================
   HELPER: NUMBER
========================================================= */

function toNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const number =
        Number(
            String(value)
                .replace(/,/g, "")
                .trim()
        );


    return Number.isFinite(number)
        ? number
        : null;

}


/* =========================================================
   HELPER: NORMALIZE STRING
========================================================= */

function normalizeString(value) {

    return String(
        value ?? ""
    )
        .trim()
        .toLowerCase();

}


/* =========================================================
   HELPER: GET FIRST FIELD
========================================================= */

function getField(
    object,
    keys
) {

    for (const key of keys) {

        if (
            object &&
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {

            return object[key];

        }

    }


    return null;

}


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            service:
                "SmartAgri Backend",

            status:
                "running",

            environment:
                NODE_ENV,

            timestamp:
                new Date().toISOString()

        });

    }
);


/* =========================================================
   WEATHER
========================================================= */

/*
    Frontend calls:

        GET /api/weather

    Optional query:

        /api/weather?lat=19.88&lon=74.48

    Optional village:

        /api/weather?village=Kopargaon
*/


async function geocodeLocation(
    locationName
) {

    if (!locationName) {

        return DEFAULT_LOCATION;

    }


    try {

        const params =
            new URLSearchParams({

                name:
                    locationName,

                count:
                    "1",

                language:
                    "en",

                format:
                    "json"

            });


        const response =
            await fetchWithTimeout(
                `${OPEN_METEO_GEOCODING_URL}?${params}`,
                {
                    headers: {
                        "Accept":
                            "application/json"
                    }
                },
                10000
            );


        if (!response.ok) {

            throw new Error(
                `Geocoding returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const result =
            data.results?.[0];


        if (
            !result ||
            result.latitude === undefined ||
            result.longitude === undefined
        ) {

            return DEFAULT_LOCATION;

        }


        return {

            name:
                result.name ||
                locationName,

            latitude:
                Number(result.latitude),

            longitude:
                Number(result.longitude)

        };


    } catch (error) {

        console.warn(
            "Weather geocoding failed:",
            error.message
        );


        return DEFAULT_LOCATION;

    }

}


app.get(
    "/api/weather",
    async (req, res) => {

        try {

            let latitude =
                toNumber(req.query.lat);

            let longitude =
                toNumber(req.query.lon);


            let locationName =
                req.query.village ||
                "Kopargaon";


            /*
                If coordinates weren't supplied,
                geocode the village.
            */

            if (
                latitude === null ||
                longitude === null
            ) {

                const location =
                    await geocodeLocation(
                        locationName
                    );


                latitude =
                    location.latitude;

                longitude =
                    location.longitude;

                locationName =
                    location.name;

            }


            /*
                Open-Meteo provides:

                - current temperature
                - humidity
                - wind speed
                - precipitation
                - precipitation probability

                and a 7-day forecast.
            */

            const params =
                new URLSearchParams({

                    latitude:
                        String(latitude),

                    longitude:
                        String(longitude),

                    current:
                        [
                            "temperature_2m",
                            "relative_humidity_2m",
                            "wind_speed_10m",
                            "precipitation"
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
                        "7"

                });


            const response =
                await fetchWithTimeout(
                    `${OPEN_METEO_FORECAST_URL}?${params}`,
                    {
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    },
                    15000
                );


            if (!response.ok) {

                throw new Error(
                    `Open-Meteo returned ${response.status}`
                );

            }


            const data =
                await response.json();


            const current =
                data.current || {};

            const daily =
                data.daily || {};


            const forecast = [];


            const dates =
                daily.time || [];


            for (
                let i = 0;
                i < dates.length;
                i++
            ) {

                forecast.push({

                    date:
                        dates[i],

                    temp_max_c:
                        daily
                            .temperature_2m_max?.[i]
                        ?? null,

                    temp_min_c:
                        daily
                            .temperature_2m_min?.[i]
                        ?? null,

                    rainfall_mm:
                        daily
                            .precipitation_sum?.[i]
                        ?? null,

                    rain_probability_pct:
                        daily
                            .precipitation_probability_max?.[i]
                        ?? null

                });

            }


            /*
                IMPORTANT:

                These names match the frontend's
                existing updateWeatherUI() function.
            */

            res.json({

                success:
                    true,

                location:
                    locationName,

                latitude,

                longitude,

                temperature:
                    current.temperature_2m
                    ?? null,

                humidity:
                    current.relative_humidity_2m
                    ?? null,

                wind_speed:
                    current.wind_speed_10m
                    ?? null,

                rain_chance:
                    daily
                        .precipitation_probability_max?.[0]
                    ?? null,

                precipitation:
                    current.precipitation
                    ?? null,

                forecast

            });


        } catch (error) {

            console.error(
                "Weather API error:",
                error
            );


            return sendError(
                res,
                502,
                "Weather service is currently unavailable.",
                error.message
            );

        }

    }
);


/* =========================================================
   MARKET PRICES
========================================================= */

/*
    Frontend:

        GET /api/market-prices?commodity=Onion

    Data source:

        data.gov.in

    Resource:

        9ef84268-d588-465a-a308-a864a43d0070
*/


function findRecordValue(
    record,
    possibleNames
) {

    const keys =
        Object.keys(record || {});


    for (const requestedName of possibleNames) {

        const normalizedRequested =
            normalizeString(
                requestedName
            );


        const actualKey =
            keys.find(
                key =>
                    normalizeString(key) ===
                    normalizedRequested
            );


        if (
            actualKey &&
            record[actualKey] !== undefined &&
            record[actualKey] !== null
        ) {

            return record[actualKey];

        }

    }


    return null;

}


function normalizeMarketRecord(
    record
) {

    const market =
        findRecordValue(
            record,
            [
                "market",
                "market_name",
                "Market Name",
                "Mandi",
                "mandi"
            ]
        );


    const commodity =
        findRecordValue(
            record,
            [
                "commodity",
                "commodity_name",
                "Commodity"
            ]
        );


    const variety =
        findRecordValue(
            record,
            [
                "variety",
                "Variety"
            ]
        );


    const arrivalDate =
        findRecordValue(
            record,
            [
                "arrival_date",
                "Arrival_Date",
                "arrival date",
                "date",
                "Date"
            ]
        );


    const minPrice =
        findRecordValue(
            record,
            [
                "min_price",
                "Min Price",
                "min price"
            ]
        );


    const maxPrice =
        findRecordValue(
            record,
            [
                "max_price",
                "Max Price",
                "max price"
            ]
        );


    const modalPrice =
        findRecordValue(
            record,
            [
                "modal_price",
                "Modal Price",
                "modal price"
            ]
        );


    return {

        ...record,

        market:
            market ?? "—",

        commodity:
            commodity ?? "—",

        variety:
            variety ?? null,

        date:
            arrivalDate ?? "—",

        min_price:
            toNumber(minPrice),

        max_price:
            toNumber(maxPrice),

        modal_price:
            toNumber(modalPrice)

    };

}


app.get(
    "/api/market-prices",
    async (req, res) => {

        try {

            if (
                !process.env.DATA_GOV_API_KEY
            ) {

                return sendError(
                    res,
                    500,
                    "Data.gov.in API key is not configured."
                );

            }


            const requestedCommodity =
                req.query.commodity ||
                "Onion";


            /*
                Request a reasonably large set so
                we can find Kopargaon, Yeola and Shirdi
                rather than blindly returning the first
                few records.
            */

            const params =
                new URLSearchParams({

                    "api-key":
                        process.env.DATA_GOV_API_KEY,

                    format:
                        "json",

                    limit:
                        "1000"

                });


            const response =
                await fetchWithTimeout(
                    `${DATA_GOV_URL}?${params}`,
                    {
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    },
                    20000
                );


            if (!response.ok) {

                throw new Error(
                    `Data.gov.in returned ${response.status}`
                );

            }


            const data =
                await response.json();


            const records =
                Array.isArray(data.records)
                    ? data.records
                    : [];


            /*
                Normalize every record.
            */

            let normalizedRecords =
                records.map(
                    normalizeMarketRecord
                );


            /*
                Filter by commodity.

                We only filter if the API records
                actually contain commodity information.
            */

            const commodityQuery =
                normalizeString(
                    requestedCommodity
                );


            const recordsWithCommodity =
                normalizedRecords.filter(
                    record =>
                        record.commodity !== "—"
                );


            if (
                recordsWithCommodity.length > 0 &&
                commodityQuery
            ) {

                normalizedRecords =
                    recordsWithCommodity.filter(
                        record =>
                            normalizeString(
                                record.commodity
                            ).includes(
                                commodityQuery
                            )
                    );

            }


            /*
                Prioritize the three markets used
                by your SmartAgri comparison screen.

                We don't fabricate missing records.
            */

            const priorityMarkets = [
                "kopargaon",
                "yeola",
                "shirdi"
            ];


            normalizedRecords.sort(
                (a, b) => {

                    const aMarket =
                        normalizeString(
                            a.market
                        );

                    const bMarket =
                        normalizeString(
                            b.market
                        );


                    const aIndex =
                        priorityMarkets.findIndex(
                            market =>
                                aMarket.includes(
                                    market
                                )
                        );


                    const bIndex =
                        priorityMarkets.findIndex(
                            market =>
                                bMarket.includes(
                                    market
                                )
                        );


                    const aPriority =
                        aIndex === -1
                            ? 999
                            : aIndex;


                    const bPriority =
                        bIndex === -1
                            ? 999
                            : bIndex;


                    return (
                        aPriority -
                        bPriority
                    );

                }
            );


            /*
                Return the actual records.

                No artificial market prices are created.
            */

            res.json({

                success:
                    true,

                source:
                    "data.gov.in",

                resource_id:
                    DATA_GOV_RESOURCE_ID,

                commodity:
                    requestedCommodity,

                count:
                    normalizedRecords.length,

                records:
                    normalizedRecords

            });


        } catch (error) {

            console.error(
                "Market API error:",
                error
            );


            return sendError(
                res,
                502,
                "Market data service is currently unavailable.",
                error.message
            );

        }

    }
);


/* =========================================================
   CROP HEALTH - PLANT.ID
========================================================= */

/*
    Frontend sends:

        multipart/form-data

        field name:
            image

    Plant.id expects a base64 image.

    We therefore:

        browser
            ↓
        Express / multer
            ↓
        Buffer
            ↓
        base64
            ↓
        Plant.id
*/


app.post(
    "/api/crop-health",
    upload.single("image"),
    async (req, res) => {

        try {

            if (
                !process.env.PLANT_ID_API_KEY
            ) {

                return sendError(
                    res,
                    500,
                    "Plant.id API key is not configured."
                );

            }


            if (!req.file) {

                return sendError(
                    res,
                    400,
                    "Please upload a crop or leaf image."
                );

            }


            const imageBase64 =
                req.file.buffer.toString(
                    "base64"
                );


            const response =
                await fetchWithTimeout(
                    PLANT_ID_URL,
                    {

                        method:
                            "POST",

                        headers: {

                            "Api-Key":
                                process.env
                                    .PLANT_ID_API_KEY,

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                images: [
                                    imageBase64
                                ],

                                health:
                                    "all",

                                similar_images:
                                    true,

                                language:
                                    "en"

                            })

                    },
                    30000
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(
                    "Plant.id error:",
                    data
                );


                return sendError(
                    res,
                    502,
                    "Crop-health service rejected the image.",
                    data?.message ||
                    `Plant.id returned ${response.status}`
                );

            }


            /*
                Plant.id returns detailed
                identification information.

                We expose both a simple result
                for the existing frontend and
                the original response for future
                expansion.
            */

            const topSuggestion =
                data?.result
                    ?.classification
                    ?.suggestions?.[0];


            const topHealth =
                data?.result
                    ?.is_healthy;


            let diagnosis =
                "Analysis completed.";


            if (
                topHealth &&
                typeof topHealth.is_healthy ===
                    "boolean"
            ) {

                diagnosis =
                    topHealth.is_healthy
                        ? "Plant appears healthy."
                        : "Possible plant health issue detected.";

            }


            if (
                topSuggestion?.name
            ) {

                diagnosis =
                    topSuggestion.name;

            }


            const confidence =
                topSuggestion?.probability
                ?? null;


            res.json({

                success:
                    true,

                diagnosis,

                confidence,

                is_healthy:
                    topHealth?.is_healthy
                    ?? null,

                suggestions:
                    data?.result
                        ?.classification
                        ?.suggestions
                    ?? [],

                raw:
                    data

            });


        } catch (error) {

            console.error(
                "Crop-health API error:",
                error
            );


            return sendError(
                res,
                502,
                "Crop-health service is currently unavailable.",
                error.message
            );

        }

    }
);


/* =========================================================
   AI ASSISTANT - OPENAI
========================================================= */

app.post(
    "/api/ai",
    async (req, res) => {

        try {

            if (!openai) {

                return sendError(
                    res,
                    500,
                    "OpenAI API key is not configured."
                );

            }


            const question =
                String(
                    req.body?.question ||
                    ""
                ).trim();


            const language =
                String(
                    req.body?.language ||
                    "en"
                );


            const farmer =
                req.body?.farmer ||
                null;


            if (!question) {

                return sendError(
                    res,
                    400,
                    "Please enter a farming question."
                );

            }


            /*
                Limit excessively large questions.
            */

            if (
                question.length > 4000
            ) {

                return sendError(
                    res,
                    400,
                    "Question is too long."
                );

            }


            const languageNames = {

                en:
                    "English",

                hi:
                    "Hindi",

                mr:
                    "Marathi"

            };


            const responseLanguage =
                languageNames[language] ||
                "English";


            /*
                Only send useful farmer information
                to the model.

                Do not send Firebase credentials
                or other secrets.
            */

            const farmerContext =
                farmer
                    ? {

                        name:
                            farmer.name ||
                            undefined,

                        village:
                            farmer.village ||
                            undefined,

                        state:
                            farmer.state ||
                            undefined,

                        landArea:
                            farmer.landArea ||
                            undefined,

                        preferredMarket:
                            farmer.preferredMarket ||
                            undefined

                    }
                    : null;


            const systemPrompt = `

You are SmartAgri, an agricultural information assistant.

Your job is to help farmers with practical agricultural questions.

Respond in ${responseLanguage}.

Important rules:

1. Give clear and practical answers.
2. Use simple language suitable for farmers.
3. Do not invent live market prices, weather information,
   government announcements, or other real-time facts.
4. If the user asks for current market prices or current
   weather, explain that SmartAgri obtains those from its
   connected data services.
5. Do not claim to be a government official.
6. For serious crop disease or pesticide questions,
   recommend consulting a qualified agricultural expert
   when appropriate.
7. If the user asks a question unrelated to agriculture,
   politely explain that you are focused on agriculture.
8. Keep answers concise but useful.

Farmer context:

${JSON.stringify(
    farmerContext,
    null,
    2
)}

`;


            /*
                Responses API.

                The SDK handles authentication using
                OPENAI_API_KEY from the environment.
            */

            const completion =
                await openai.responses.create({

                    model:
                        process.env.OPENAI_MODEL ||
                        "gpt-5-mini",

                    instructions:
                        systemPrompt,

                    input:
                        question

                });


            const answer =
                completion.output_text ||
                "I could not generate a response right now.";


            res.json({

                success:
                    true,

                answer

            });


        } catch (error) {

            console.error(
                "OpenAI API error:",
                error
            );


            return sendError(
                res,
                502,
                "AI service is currently unavailable.",
                error.message
            );

        }

    }
);


/* =========================================================
   404 HANDLER
========================================================= */

app.use(
    (req, res) => {

        return res
            .status(404)
            .json({

                success:
                    false,

                error:
                    "Endpoint not found."

            });

    }
);


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(
    (error, req, res, next) => {

        console.error(
            "Unhandled server error:",
            error
        );


        if (
            error instanceof multer.MulterError
        ) {

            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {

                return sendError(
                    res,
                    400,
                    "Image must be smaller than 5 MB."
                );

            }

        }


        if (
            error.message?.startsWith(
                "Only JPG"
            )
        ) {

            return sendError(
                res,
                400,
                error.message
            );

        }


        if (
            error.message?.startsWith(
                "CORS:"
            )
        ) {

            return sendError(
                res,
                403,
                "Request origin is not allowed."
            );

        }


        return sendError(
            res,
            500,
            "Internal server error.",
            error.message
        );

    }
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            "=============================================="
        );

        console.log(
            "SmartAgri backend started."
        );

        console.log(
            `Environment: ${NODE_ENV}`
        );

        console.log(
            `Port: ${PORT}`
        );

        console.log(
            `Health: http://localhost:${PORT}/api/health`
        );

        console.log(
            "=============================================="
        );

    }
);
