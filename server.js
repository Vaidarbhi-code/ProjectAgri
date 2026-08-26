// server.js
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Node 18+ has built-in fetch.
// No node-fetch package is required.

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// ENVIRONMENT
// ============================================================

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Smart Agriculture Market Intelligence API",
        timestamp: new Date().toISOString(),
        services: {
            market: Boolean(DATA_GOV_API_KEY),
            cropHealth: Boolean(PLANT_ID_API_KEY),
            weather: true,
            ai: Boolean(OPENAI_API_KEY)
        }
    });
});

// ============================================================
// STATUS
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
                status: DATA_GOV_API_KEY ? "configured" : "not_configured"
            },

            cropHealth: {
                provider: "Plant.id",
                status: PLANT_ID_API_KEY ? "configured" : "not_configured"
            },

            ai: {
                provider: "OpenAI",
                status: OPENAI_API_KEY ? "configured" : "inactive"
            }
        }
    });
});

// ============================================================
// WEATHER - OPEN METEO
// ============================================================

app.get("/api/weather", async (req, res) => {
    try {
        const { lat, lon, days = 7 } = req.query;

        if (lat === undefined || lon === undefined) {
            return res.status(400).json({
                success: false,
                error: "Latitude and longitude are required"
            });
        }

        const latitude = Number(lat);
        const longitude = Number(lon);
        const forecastDays = Math.min(Math.max(Number(days) || 7, 1), 7);

        if (
            !Number.isFinite(latitude) ||
            latitude < -90 ||
            latitude > 90
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid latitude"
            });
        }

        if (
            !Number.isFinite(longitude) ||
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                success: false,
                error: "Invalid longitude"
            });
        }

        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
            daily: [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "precipitation_probability_max"
            ].join(","),
            timezone: "auto",
            forecast_days: String(forecastDays)
        });

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?${params.toString()}`
        );

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Open-Meteo error:",
                response.status,
                errorText
            );

            return res.status(502).json({
                success: false,
                error: "Weather provider unavailable"
            });
        }

        const data = await response.json();

        if (!data.daily || !data.daily.time) {
            return res.status(502).json({
                success: false,
                error: "Invalid weather response"
            });
        }

        const forecast = data.daily.time.map((date, index) => ({
            date,

            temp_max_c:
                data.daily.temperature_2m_max?.[index] ?? null,

            temp_min_c:
                data.daily.temperature_2m_min?.[index] ?? null,

            rainfall_mm:
                data.daily.precipitation_sum?.[index] ?? null,

            rain_probability_pct:
                data.daily.precipitation_probability_max?.[index] ?? null
        }));

        res.json({
            success: true,

            location: {
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone
            },

            forecast
        });

    } catch (error) {
        console.error("Weather error:", error);

        res.status(500).json({
            success: false,
            error: "Failed to fetch weather"
        });
    }
});

// ============================================================
// MARKET DATA - DATA.GOV.IN
// ============================================================

app.get("/api/market", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "DATA_GOV_API_KEY is not configured"
            });
        }

        const {
            crop,
            state,
            district,
            limit = 50
        } = req.query;

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(Math.min(Number(limit) || 50, 100))
        });

        // Add filters only when supplied.
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
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString();

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Data.gov.in error:",
                response.status,
                errorText
            );

            return res.status(502).json({
                success: false,
                error: "Market data provider unavailable"
            });
        }

        const data = await response.json();

        res.json({
            success: true,
            source: "data.gov.in",
            total: data.total ?? null,
            records: data.records ?? []
        });

    } catch (error) {
        console.error("Market API error:", error);

        res.status(500).json({
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

        const {
            crop,
            state,
            district,
            limit = 100
        } = req.query;

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(Math.min(Number(limit) || 100, 100))
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

        const response = await fetch(
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString()
        );

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Market history provider unavailable"
            });
        }

        const data = await response.json();

        res.json({
            success: true,
            records: data.records ?? []
        });

    } catch (error) {
        console.error("Market history error:", error);

        res.status(500).json({
            success: false,
            error: "Failed to fetch market history"
        });
    }
});

// ============================================================
// MARKET STATS
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

        const response = await fetch(
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString()
        );

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Market statistics provider unavailable"
            });
        }

        const data = await response.json();
        const records = data.records || [];

        const prices = records
            .map(record => {
                const value =
                    record.Modal_Price ??
                    record.modal_price ??
                    record.ModalPrice;

                if (value === undefined) {
                    return null;
                }

                const number = Number(
                    String(value).replace(/,/g, "")
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
            prices.reduce((sum, value) => sum + value, 0) /
            prices.length;

        res.json({
            success: true,
            count: prices.length,
            min,
            max,
            average: Number(average.toFixed(2))
        });

    } catch (error) {
        console.error("Market stats error:", error);

        res.status(500).json({
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
        const {
            crop,
            state,
            district
        } = req.query;

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
            limit: "100"
        });

        params.append(
            "filters[Commodity]",
            crop
        );

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

        const response = await fetch(
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?" +
            params.toString()
        );

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Unable to fetch price data"
            });
        }

        const data = await response.json();
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
            prices.reduce((sum, value) => sum + value, 0) /
            prices.length;

        // Simple baseline prediction.
        // Replace with an ML model later.
        const predictedPrice = Number(
            average.toFixed(2)
        );

        res.json({
            success: true,
            crop,
            prediction: predictedPrice,
            current_average: Number(average.toFixed(2)),
            samples: prices.length,
            method: "historical-average-baseline"
        });

    } catch (error) {
        console.error("Price prediction error:", error);

        res.status(500).json({
            success: false,
            error: "Failed to predict price"
        });
    }
});

// ============================================================
// PLANT.ID CROP HEALTH
// ============================================================

app.post("/api/crop-health", async (req, res) => {
    try {
        if (!PLANT_ID_API_KEY) {
            return res.status(503).json({
                success: false,
                error: "PLANT_ID_API_KEY is not configured"
            });
        }

        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                error: "Image is required"
            });
        }

        let base64Image = image;

        // Accept data URLs such as:
        // data:image/jpeg;base64,/9j/...
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
                error: "Plant health service unavailable",
                details: data
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error("Plant.id error:", error);

        res.status(500).json({
            success: false,
            error: "Failed to analyze crop health"
        });
    }
});

// ============================================================
// OPENAI AI
// ============================================================

app.post("/api/ai", async (req, res) => {
    try {
        const {
            question,
            message,
            prompt
        } = req.body;

        const userQuestion =
            question ||
            message ||
            prompt;

        if (!userQuestion || !String(userQuestion).trim()) {
            return res.status(400).json({
                success: false,
                error: "Question is required"
            });
        }

        // OpenAI is currently inactive.
        // Keep the endpoint alive so the frontend doesn't break.
        if (!OPENAI_API_KEY) {
            return res.json({
                success: true,
                available: false,
                answer:
                    "The SmartAgri AI service is currently unavailable. " +
                    "Market, weather and crop-health services remain available."
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
                        "You are SmartAgri AI, an agricultural market " +
                        "intelligence assistant. Provide concise, practical " +
                        "and safe agricultural guidance. Do not invent " +
                        "market prices or weather information.",

                    input: String(userQuestion)
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

            return res.json({
                success: true,
                available: false,
                answer:
                    "The AI service is currently unavailable. " +
                    "Please use the market, weather and crop-health features."
            });
        }

        const answer =
            data.output_text ||
            data.output
                ?.flatMap(item => item.content || [])
                ?.map(item => item.text || "")
                ?.join("")
                ?.trim() ||
            "No AI response was generated.";

        res.json({
            success: true,
            available: true,
            answer
        });

    } catch (error) {
        console.error("OpenAI request error:", error);

        res.json({
            success: true,
            available: false,
            answer:
                "The AI service is temporarily unavailable."
        });
    }
});

// ============================================================
// STATIC FRONTEND
// ============================================================

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// SPA fallback
app.get("*", (req, res) => {
    res.sendFile(
        path.join(publicPath, "index.html")
    );
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
    console.log("");
    console.log("==============================================");
    console.log(" Smart Agriculture API");
    console.log("==============================================");
    console.log(` Server running on port ${PORT}`);
    console.log("");
    console.log(" Services:");
    console.log(
        `  Weather:     Open-Meteo (no API key)`
    );
    console.log(
        `  Market:      ${DATA_GOV_API_KEY ? "configured" : "NOT configured"}`
    );
    console.log(
        `  Crop Health: ${PLANT_ID_API_KEY ? "configured" : "NOT configured"}`
    );
    console.log(
        `  OpenAI:      ${OPENAI_API_KEY ? "configured" : "inactive"}`
    );
    console.log("");
    console.log("==============================================");
});
