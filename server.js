// ============================================================
// SMART AGRI - PRODUCTION SERVER
// server.js
// ============================================================

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// ENVIRONMENT VARIABLES
// ============================================================

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Open-Meteo DOES NOT require an API key.

// ============================================================
// EXPRESS CONFIGURATION
// ============================================================

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// BASIC REQUEST LOGGER
// ============================================================

app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} ${req.method} ${req.originalUrl}`
    );

    next();
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "Smart Agriculture Market Intelligence API",
        timestamp: new Date().toISOString(),

        services: {
            weather: {
                provider: "Open-Meteo",
                configured: true,
                apiKeyRequired: false
            },

            market: {
                provider: "data.gov.in",
                configured: Boolean(DATA_GOV_API_KEY)
            },

            cropHealth: {
                provider: "Plant.id",
                configured: Boolean(PLANT_ID_API_KEY)
            },

            ai: {
                provider: "OpenAI",
                configured: Boolean(OPENAI_API_KEY)
            }
        }
    });
});

// ============================================================
// API STATUS
// ============================================================

app.get("/api/status", (req, res) => {
    res.json({
        success: true,

        services: {
            weather: {
                provider: "Open-Meteo",
                status: "available",
                apiKeyRequired: false
            },

            market: {
                provider: "data.gov.in",
                status: DATA_GOV_API_KEY
                    ? "configured"
                    : "not_configured"
            },

            cropHealth: {
                provider: "Plant.id",
                status: PLANT_ID_API_KEY
                    ? "configured"
                    : "not_configured"
            },

            ai: {
                provider: "OpenAI",
                status: OPENAI_API_KEY
                    ? "configured"
                    : "not_configured"
            }
        }
    });
});

// ============================================================
// WEATHER
// OPEN-METEO
// ============================================================

app.get("/api/weather", async (req, res) => {
    try {
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);

        if (!Number.isFinite(lat)) {
            return res.status(400).json({
                success: false,
                error: "Valid latitude is required"
            });
        }

        if (!Number.isFinite(lon)) {
            return res.status(400).json({
                success: false,
                error: "Valid longitude is required"
            });
        }

        if (lat < -90 || lat > 90) {
            return res.status(400).json({
                success: false,
                error: "Latitude must be between -90 and 90"
            });
        }

        if (lon < -180 || lon > 180) {
            return res.status(400).json({
                success: false,
                error: "Longitude must be between -180 and 180"
            });
        }

        // --------------------------------------------------------
        // EXACT OPEN-METEO PARAMETERS
        // --------------------------------------------------------

        const params = new URLSearchParams();

        params.set("latitude", String(lat));
        params.set("longitude", String(lon));

        params.set(
            "daily",
            [
                "weather_code",
                "wind_speed_10m_max",
                "precipitation_sum",
                "rain_sum"
            ].join(",")
        );

        params.set(
            "hourly",
            [
                "temperature_2m",
                "wind_speed_10m",
                "precipitation",
                "rain",
                "relative_humidity_2m",
                "is_day",
                "temperature_1000hPa",
                "relative_humidity_1000hPa"
            ].join(",")
        );

        params.set(
            "current",
            [
                "temperature_2m",
                "relative_humidity_2m",
                "rain",
                "precipitation",
                "wind_speed_10m"
            ].join(",")
        );

        params.set(
            "minutely_15",
            [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "rain",
                "wind_speed_10m"
            ].join(",")
        );

        params.set("timezone", "auto");

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

        console.log("Open-Meteo request:", weatherURL);

        // --------------------------------------------------------
        // CALL OPEN-METEO
        // --------------------------------------------------------

        const response = await fetch(weatherURL);

        const rawText = await response.text();

        let data;

        try {
            data = JSON.parse(rawText);
        } catch {
            console.error(
                "Open-Meteo returned invalid JSON:",
                rawText
            );

            return res.status(502).json({
                success: false,
                error: "Invalid response from Open-Meteo"
            });
        }

        if (!response.ok) {
            console.error(
                "Open-Meteo error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                error: "Open-Meteo weather service returned an error",
                provider_status: response.status,
                provider_error: data
            });
        }

        // --------------------------------------------------------
        // VERIFY CURRENT WEATHER EXISTS
        // --------------------------------------------------------

        if (!data.current) {
            console.error(
                "Open-Meteo response has no current weather:",
                data
            );

            return res.status(502).json({
                success: false,
                error: "Current weather data was not returned by Open-Meteo"
            });
        }

        // --------------------------------------------------------
        // RETURN WEATHER
        // --------------------------------------------------------

        return res.json({
            success: true,

            source: "Open-Meteo",

            location: {
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                timezone_abbreviation:
                    data.timezone_abbreviation || null
            },

            current: {
                time: data.current.time,

                temperature_c:
                    data.current.temperature_2m ?? null,

                humidity_pct:
                    data.current.relative_humidity_2m ?? null,

                rain_mm:
                    data.current.rain ?? null,

                precipitation_mm:
                    data.current.precipitation ?? null,

                wind_speed_kmh:
                    data.current.wind_speed_10m ?? null
            },

            daily: data.daily || null,

            hourly: data.hourly || null,

            minutely_15: data.minutely_15 || null
        });

    } catch (error) {
        console.error(
            "WEATHER SERVER ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to fetch real-time weather",
            message: error.message
        });
    }
});

// ============================================================
// MARKET DATA
// DATA.GOV.IN
// ============================================================

app.get("/api/market", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "DATA_GOV_API_KEY is not configured"
            });
        }

        const crop = req.query.crop;
        const state = req.query.state;
        const district = req.query.district;

        let limit = Number(req.query.limit || 50);

        if (!Number.isFinite(limit)) {
            limit = 50;
        }

        limit = Math.min(Math.max(limit, 1), 100);

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(limit)
        });

        if (crop) {
            params.append(
                "filters[Commodity]",
                crop
            );
        }

        if (state) {
            params.append(
                "filters[State]",
                state
            );
        }

        if (district) {
            params.append(
                "filters[District]",
                district
            );
        }

        const url =
            "https://api.data.gov.in/resource/" +
            "9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString();

        console.log("Data.gov.in request");

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Data.gov.in error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                error: "Market data provider unavailable",
                provider_status: response.status
            });
        }

        return res.json({
            success: true,
            source: "data.gov.in",
            total: data.total ?? null,
            records: data.records ?? []
        });

    } catch (error) {
        console.error(
            "Market API error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to fetch market data"
        });
    }
});

// ============================================================
// MARKET HISTORY
// ============================================================

app.get("/api/market/history", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "DATA_GOV_API_KEY is not configured"
            });
        }

        const crop = req.query.crop;
        const state = req.query.state;
        const district = req.query.district;

        let limit = Number(req.query.limit || 100);

        if (!Number.isFinite(limit)) {
            limit = 100;
        }

        limit = Math.min(Math.max(limit, 1), 100);

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(limit)
        });

        if (crop) {
            params.append(
                "filters[Commodity]",
                crop
            );
        }

        if (state) {
            params.append(
                "filters[State]",
                state
            );
        }

        if (district) {
            params.append(
                "filters[District]",
                district
            );
        }

        const url =
            "https://api.data.gov.in/resource/" +
            "9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString();

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Market history provider unavailable"
            });
        }

        return res.json({
            success: true,
            source: "data.gov.in",
            records: data.records || []
        });

    } catch (error) {
        console.error(
            "Market history error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to fetch market history"
        });
    }
});

// ============================================================
// MARKET STATISTICS
// ============================================================

app.get("/api/market/stats", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "DATA_GOV_API_KEY is not configured"
            });
        }

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: "100"
        });

        if (req.query.crop) {
            params.append(
                "filters[Commodity]",
                req.query.crop
            );
        }

        if (req.query.state) {
            params.append(
                "filters[State]",
                req.query.state
            );
        }

        if (req.query.district) {
            params.append(
                "filters[District]",
                req.query.district
            );
        }

        const url =
            "https://api.data.gov.in/resource/" +
            "9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString();

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Market statistics provider unavailable"
            });
        }

        const records = data.records || [];

        const prices = records
            .map(record => {
                const value =
                    record.Modal_Price ??
                    record.modal_price ??
                    record.ModalPrice;

                const number = Number(
                    String(value ?? "").replace(/,/g, "")
                );

                return Number.isFinite(number)
                    ? number
                    : null;
            })
            .filter(value => value !== null);

        if (prices.length === 0) {
            return res.json({
                success: true,
                count: 0,
                min: null,
                max: null,
                average: null
            });
        }

        const min = Math.min(...prices);
        const max = Math.max(...prices);

        const average =
            prices.reduce(
                (sum, value) => sum + value,
                0
            ) / prices.length;

        return res.json({
            success: true,
            count: prices.length,
            min,
            max,
            average: Number(
                average.toFixed(2)
            )
        });

    } catch (error) {
        console.error(
            "Market stats error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to calculate market statistics"
        });
    }
});

// ============================================================
// PRICE PREDICTION
// ============================================================

app.get("/api/predict-price", async (req, res) => {
    try {
        const crop = req.query.crop;
        const state = req.query.state;
        const district = req.query.district;

        if (!crop) {
            return res.status(400).json({
                success: false,
                error: "Crop is required"
            });
        }

        if (!DATA_GOV_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "DATA_GOV_API_KEY is not configured"
            });
        }

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: "100",

            "filters[Commodity]": crop
        });

        if (state) {
            params.append(
                "filters[State]",
                state
            );
        }

        if (district) {
            params.append(
                "filters[District]",
                district
            );
        }

        const url =
            "https://api.data.gov.in/resource/" +
            "9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString();

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Unable to fetch price data"
            });
        }

        const records = data.records || [];

        const prices = records
            .map(record => {
                const value =
                    record.Modal_Price ??
                    record.modal_price ??
                    record.ModalPrice;

                const number = Number(
                    String(value ?? "").replace(/,/g, "")
                );

                return Number.isFinite(number)
                    ? number
                    : null;
            })
            .filter(value => value !== null);

        if (prices.length === 0) {
            return res.json({
                success: true,
                crop,
                prediction: null,
                message: "No price data available"
            });
        }

        const average =
            prices.reduce(
                (sum, value) => sum + value,
                0
            ) / prices.length;

        return res.json({
            success: true,
            crop,

            prediction: Number(
                average.toFixed(2)
            ),

            current_average: Number(
                average.toFixed(2)
            ),

            samples: prices.length,

            method: "historical-average-baseline"
        });

    } catch (error) {
        console.error(
            "Price prediction error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to predict price"
        });
    }
});

// ============================================================
// PLANT.ID - CROP HEALTH
// ============================================================

app.post("/api/crop-health", async (req, res) => {
    try {
        if (!PLANT_ID_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "PLANT_ID_API_KEY is not configured"
            });
        }

        const image = req.body.image;

        if (!image) {
            return res.status(400).json({
                success: false,
                error: "Image is required"
            });
        }

        let base64Image = String(image);

        // Support:
        // data:image/jpeg;base64,...
        // data:image/png;base64,...

        if (base64Image.includes(",")) {
            base64Image =
                base64Image.split(",")[1];
        }

        const response = await fetch(
            "https://plant.id/api/v3/identification",
            {
                method: "POST",

                headers: {
                    "Api-Key": PLANT_ID_API_KEY,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    images: [base64Image],
                    health: "all",
                    similar_images: true,
                    language: "en"
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Plant.id error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                error: "Plant.id service unavailable",
                provider_status: response.status,
                provider_error: data
            });
        }

        return res.json({
            success: true,
            source: "Plant.id",
            data
        });

    } catch (error) {
        console.error(
            "Plant.id error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Failed to analyze crop health"
        });
    }
});

// ============================================================
// OPENAI
// ============================================================

app.post("/api/ai", async (req, res) => {
    try {
        const question =
            req.body.question ||
            req.body.message ||
            req.body.prompt;

        if (!question || !String(question).trim()) {
            return res.status(400).json({
                success: false,
                error: "Question is required"
            });
        }

        if (!OPENAI_API_KEY) {
            return res.status(503).json({
                success: false,
                available: false,
                error: "OPENAI_API_KEY is not configured"
            });
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5-mini",

                    instructions:
                        "You are SmartAgri AI, an agricultural " +
                        "market intelligence assistant. " +
                        "Give concise, practical and safe " +
                        "agricultural guidance. " +
                        "Do not invent weather or market data.",

                    input: String(question)
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "OpenAI error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                available: false,
                error: "OpenAI service returned an error",
                provider_status: response.status,
                provider_error: data
            });
        }

        let answer = "";

        // Preferred Responses API output
        if (typeof data.output_text === "string") {
            answer = data.output_text;
        }

        // Additional safe extraction
        if (!answer && Array.isArray(data.output)) {
            for (const item of data.output) {
                if (!Array.isArray(item.content)) {
                    continue;
                }

                for (const content of item.content) {
                    if (
                        typeof content.text === "string"
                    ) {
                        answer += content.text;
                    }
                }
            }
        }

        answer = answer.trim();

        if (!answer) {
            return res.status(502).json({
                success: false,
                available: true,
                error: "OpenAI returned no text response"
            });
        }

        return res.json({
            success: true,
            available: true,
            answer
        });

    } catch (error) {
        console.error(
            "OpenAI request error:",
            error
        );

        return res.status(500).json({
            success: false,
            available: false,
            error: "Failed to communicate with OpenAI"
        });
    }
});

// ============================================================
// STATIC FRONTEND
// ============================================================

const publicPath =
    path.join(__dirname, "public");

app.use(
    express.static(publicPath)
);

// ============================================================
// SPA FALLBACK
// ============================================================

// Important: only send index.html for browser navigation
// requests, not API requests.

app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(
        path.join(publicPath, "index.html")
    );
});

// ============================================================
// 404 API HANDLER
// ============================================================

app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        error: "API endpoint not found"
    });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((error, req, res, next) => {
    console.error(
        "Unhandled server error:",
        error
    );

    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("================================================");
    console.log(" SmartAgri Production Server");
    console.log("================================================");
    console.log(
        ` Server running on port ${PORT}`
    );
    console.log("");
    console.log(" Services:");
    console.log(
        "  Weather:     Open-Meteo"
    );
    console.log(
        `  Market:      ${
            DATA_GOV_API_KEY
                ? "CONFIGURED"
                : "NOT CONFIGURED"
        }`
    );
    console.log(
        `  Crop Health: ${
            PLANT_ID_API_KEY
                ? "CONFIGURED"
                : "NOT CONFIGURED"
        }`
    );
    console.log(
        `  OpenAI:      ${
            OPENAI_API_KEY
                ? "CONFIGURED"
                : "NOT CONFIGURED"
        }`
    );
    console.log("");
    console.log(
        " Open-Meteo API key: NOT REQUIRED"
    );
    console.log("================================================");
    console.log("");
});
