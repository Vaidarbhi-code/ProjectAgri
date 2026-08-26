// ============================================================
// server.js
// Smart Agriculture Market Intelligence API
// ============================================================

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Node.js 18+ includes fetch natively.

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// ENVIRONMENT VARIABLES
// ============================================================

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ============================================================
// CONSTANTS
// ============================================================

const DATA_GOV_RESOURCE =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const OPEN_METEO_URL =
    "https://api.open-meteo.com/v1/forecast";

const PLANT_ID_URL =
    "https://plant.id/api/v3/identification";

const OPENAI_URL =
    "https://api.openai.com/v1/responses";

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Smart Agriculture Market Intelligence API",
        timestamp: new Date().toISOString(),

        services: {
            weather: true,
            market: Boolean(DATA_GOV_API_KEY),
            cropHealth: Boolean(PLANT_ID_API_KEY),
            ai: Boolean(OPENAI_API_KEY)
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
// WEATHER - OPEN-METEO
// ============================================================

app.get("/api/weather", async (req, res) => {
    try {
        const { lat, lon } = req.query;

        // --------------------------------------------------------
        // VALIDATE COORDINATES
        // --------------------------------------------------------

        if (lat === undefined || lon === undefined) {
            return res.status(400).json({
                success: false,
                error: "Latitude and longitude are required"
            });
        }

        const latitude = Number(lat);
        const longitude = Number(lon);

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

        // --------------------------------------------------------
        // OPEN-METEO PARAMETERS
        // --------------------------------------------------------

        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),

            daily: [
                "weather_code",
                "wind_speed_10m_max",
                "precipitation_sum",
                "rain_sum"
            ].join(","),

            hourly: [
                "temperature_2m",
                "wind_speed_10m",
                "precipitation",
                "rain",
                "relative_humidity_2m",
                "is_day",
                "temperature_1000hPa",
                "relative_humidity_1000hPa"
            ].join(","),

            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "rain",
                "precipitation",
                "wind_speed_10m"
            ].join(","),

            minutely_15: [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "rain",
                "wind_speed_10m"
            ].join(","),

            timezone: "auto"
        });

        const url =
            `${OPEN_METEO_URL}?${params.toString()}`;

        console.log(
            `[WEATHER] Fetching ${latitude}, ${longitude}`
        );

        // --------------------------------------------------------
        // FETCH WEATHER
        // --------------------------------------------------------

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "[WEATHER] Open-Meteo error:",
                response.status,
                errorText
            );

            return res.status(502).json({
                success: false,
                error: "Weather provider unavailable",
                provider_status: response.status
            });
        }

        const data = await response.json();

        // --------------------------------------------------------
        // VALIDATE RESPONSE
        // --------------------------------------------------------

        if (!data.current) {
            return res.status(502).json({
                success: false,
                error: "Invalid weather response"
            });
        }

        // --------------------------------------------------------
        // CURRENT WEATHER
        // --------------------------------------------------------

        const current = {
            time: data.current.time ?? null,

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
        };

        // --------------------------------------------------------
        // DAILY WEATHER
        // --------------------------------------------------------

        const daily = [];

        if (data.daily?.time) {
            for (
                let i = 0;
                i < data.daily.time.length;
                i++
            ) {
                daily.push({
                    date:
                        data.daily.time[i],

                    weather_code:
                        data.daily.weather_code?.[i] ?? null,

                    wind_speed_max_kmh:
                        data.daily.wind_speed_10m_max?.[i] ?? null,

                    precipitation_mm:
                        data.daily.precipitation_sum?.[i] ?? null,

                    rain_mm:
                        data.daily.rain_sum?.[i] ?? null
                });
            }
        }

        // --------------------------------------------------------
        // HOURLY WEATHER
        // --------------------------------------------------------

        const hourly = [];

        if (data.hourly?.time) {
            for (
                let i = 0;
                i < data.hourly.time.length;
                i++
            ) {
                hourly.push({
                    time:
                        data.hourly.time[i],

                    temperature_c:
                        data.hourly.temperature_2m?.[i] ?? null,

                    wind_speed_kmh:
                        data.hourly.wind_speed_10m?.[i] ?? null,

                    precipitation_mm:
                        data.hourly.precipitation?.[i] ?? null,

                    rain_mm:
                        data.hourly.rain?.[i] ?? null,

                    humidity_pct:
                        data.hourly.relative_humidity_2m?.[i] ?? null,

                    is_day:
                        data.hourly.is_day?.[i] ?? null,

                    temperature_1000hPa_c:
                        data.hourly.temperature_1000hPa?.[i] ?? null,

                    humidity_1000hPa_pct:
                        data.hourly.relative_humidity_1000hPa?.[i] ?? null
                });
            }
        }

        // --------------------------------------------------------
        // 15-MINUTE WEATHER
        // --------------------------------------------------------

        const minutely15 = [];

        if (data.minutely_15?.time) {
            for (
                let i = 0;
                i < data.minutely_15.time.length;
                i++
            ) {
                minutely15.push({
                    time:
                        data.minutely_15.time[i],

                    temperature_c:
                        data.minutely_15.temperature_2m?.[i] ?? null,

                    humidity_pct:
                        data.minutely_15.relative_humidity_2m?.[i] ?? null,

                    precipitation_mm:
                        data.minutely_15.precipitation?.[i] ?? null,

                    rain_mm:
                        data.minutely_15.rain?.[i] ?? null,

                    wind_speed_kmh:
                        data.minutely_15.wind_speed_10m?.[i] ?? null
                });
            }
        }

        // --------------------------------------------------------
        // RETURN WEATHER
        // --------------------------------------------------------

        return res.json({
            success: true,

            source: "Open-Meteo",

            location: {
                latitude:
                    data.latitude,

                longitude:
                    data.longitude,

                timezone:
                    data.timezone,

                timezone_abbreviation:
                    data.timezone_abbreviation
            },

            current,

            daily,

            hourly,

            minutely_15: minutely15
        });

    } catch (error) {
        console.error(
            "[WEATHER] Server error:",
            error
        );

        return res.status(500).json({
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

        const safeLimit = Math.min(
            Math.max(Number(limit) || 50, 1),
            100
        );

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(safeLimit)
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
            `${DATA_GOV_RESOURCE}?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "[MARKET] data.gov.in error:",
                response.status,
                errorText
            );

            return res.status(502).json({
                success: false,
                error: "Market data provider unavailable"
            });
        }

        const data = await response.json();

        return res.json({
            success: true,
            source: "data.gov.in",
            total: data.total ?? null,
            records: data.records ?? []
        });

    } catch (error) {
        console.error(
            "[MARKET] Error:",
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

        const {
            crop,
            state,
            district,
            limit = 100
        } = req.query;

        const safeLimit = Math.min(
            Math.max(Number(limit) || 100, 1),
            100
        );

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(safeLimit)
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
            `${DATA_GOV_RESOURCE}?${params.toString()}`
        );

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Market history provider unavailable"
            });
        }

        const data = await response.json();

        return res.json({
            success: true,
            source: "data.gov.in",
            records: data.records ?? []
        });

    } catch (error) {
        console.error(
            "[MARKET HISTORY] Error:",
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

        const response = await fetch(
            `${DATA_GOV_RESOURCE}?${params.toString()}`
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

                if (
                    value === undefined ||
                    value === null
                ) {
                    return null;
                }

                const number = Number(
                    String(value)
                        .replace(/,/g, "")
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

        const min =
            Math.min(...prices);

        const max =
            Math.max(...prices);

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
            average:
                Number(average.toFixed(2))
        });

    } catch (error) {
        console.error(
            "[MARKET STATS] Error:",
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
            limit: "100",

            "filters[Commodity]":
                crop
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

        const response = await fetch(
            `${DATA_GOV_RESOURCE}?${params.toString()}`
        );

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Unable to fetch price data"
            });
        }

        const data = await response.json();

        const records =
            data.records || [];

        const prices = records
            .map(record => {
                const value =
                    record.Modal_Price ??
                    record.modal_price ??
                    record.ModalPrice;

                const number =
                    Number(
                        String(value ?? "")
                            .replace(/,/g, "")
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

        const predictedPrice =
            Number(average.toFixed(2));

        return res.json({
            success: true,
            crop,
            prediction: predictedPrice,
            current_average:
                Number(average.toFixed(2)),
            samples: prices.length,
            method:
                "historical-average-baseline"
        });

    } catch (error) {
        console.error(
            "[PRICE PREDICTION] Error:",
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

        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                error: "Image is required"
            });
        }

        let base64Image = String(image);

        // Remove data URL prefix if frontend sends one.
        //
        // Example:
        // data:image/jpeg;base64,/9j/4AAQ...
        //
        // becomes:
        // /9j/4AAQ...

        if (base64Image.includes(",")) {
            base64Image =
                base64Image.split(",")[1];
        }

        const response = await fetch(
            PLANT_ID_URL,
            {
                method: "POST",

                headers: {
                    "Api-Key":
                        PLANT_ID_API_KEY,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    images: [
                        base64Image
                    ],

                    health: "all",

                    similar_images: true,

                    language: "en"
                })
            }
        );

        const data =
            await response.json();

        if (!response.ok) {
            console.error(
                "[PLANT.ID] Error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                error:
                    "Plant health service unavailable",
                details: data
            });
        }

        return res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error(
            "[PLANT.ID] Error:",
            error
        );

        return res.status(500).json({
            success: false,
            error:
                "Failed to analyze crop health"
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

        if (
            !userQuestion ||
            !String(userQuestion).trim()
        ) {
            return res.status(400).json({
                success: false,
                error: "Question is required"
            });
        }

        // --------------------------------------------------------
        // OPENAI KEY NOT CONFIGURED
        // --------------------------------------------------------

        if (!OPENAI_API_KEY) {
            return res.status(503).json({
                success: false,
                available: false,
                error:
                    "OPENAI_API_KEY is not configured"
            });
        }

        // --------------------------------------------------------
        // OPENAI REQUEST
        // --------------------------------------------------------

        const response = await fetch(
            OPENAI_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5-mini",

                    instructions:
                        "You are SmartAgri AI, an agricultural " +
                        "market intelligence assistant. " +
                        "Provide concise, practical and safe " +
                        "agricultural guidance. " +
                        "Do not invent market prices, weather " +
                        "data, crop disease results, or other " +
                        "real-world data.",

                    input:
                        String(userQuestion)
                })
            }
        );

        const data =
            await response.json();

        // --------------------------------------------------------
        // OPENAI ERROR
        // --------------------------------------------------------

        if (!response.ok) {
            console.error(
                "[OPENAI] Error:",
                response.status,
                data
            );

            return res.status(502).json({
                success: false,
                available: false,
                error:
                    "OpenAI service unavailable",
                details: data
            });
        }

        // --------------------------------------------------------
        // EXTRACT RESPONSE
        // --------------------------------------------------------

        let answer =
            data.output_text;

        if (
            !answer &&
            Array.isArray(data.output)
        ) {
            answer =
                data.output
                    .flatMap(
                        item =>
                            item.content || []
                    )
                    .map(
                        item =>
                            item.text || ""
                    )
                    .join("")
                    .trim();
        }

        if (!answer) {
            return res.status(502).json({
                success: false,
                available: true,
                error:
                    "OpenAI returned no text response"
            });
        }

        return res.json({
            success: true,
            available: true,
            answer
        });

    } catch (error) {
        console.error(
            "[OPENAI] Request error:",
            error
        );

        return res.status(500).json({
            success: false,
            available: false,
            error:
                "Failed to communicate with OpenAI"
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

app.get("*", (req, res) => {
    res.sendFile(
        path.join(
            publicPath,
            "index.html"
        )
    );
});

// ============================================================
// START SERVER
// ============================================================

app.listen(
    PORT,
    () => {
        console.log("");
        console.log(
            "=============================================="
        );
        console.log(
            " Smart Agriculture Market Intelligence"
        );
        console.log(
            "=============================================="
        );

        console.log(
            ` Server running on port ${PORT}`
        );

        console.log("");

        console.log(
            ` Weather:     Open-Meteo`
        );

        console.log(
            ` Market:      ${
                DATA_GOV_API_KEY
                    ? "configured"
                    : "NOT configured"
            }`
        );

        console.log(
            ` Crop Health: ${
                PLANT_ID_API_KEY
                    ? "configured"
                    : "NOT configured"
            }`
        );

        console.log(
            ` OpenAI:      ${
                OPENAI_API_KEY
                    ? "configured"
                    : "NOT configured"
            }`
        );

        console.log("");

        console.log(
            "=============================================="
        );
    }
);
