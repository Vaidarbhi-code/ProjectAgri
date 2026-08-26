require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

const PORT = process.env.PORT || 3000;

// ============================================================
// ENVIRONMENT VARIABLES
// ============================================================

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;

// ============================================================
// CONFIGURATION
// ============================================================

const DATA_GOV_RESOURCE =
    "9ef84268-d588-465a-a308-a864a43d0070";

const PLANT_ID_URL =
    "https://plant.id/api/v3/identification";

const DATA_GOV_URL =
    `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE}`;

// ============================================================
// OPENAI CLIENT
// ============================================================

const openai = OPENAI_API_KEY
    ? new OpenAI({
        apiKey: OPENAI_API_KEY
    })
    : null;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// JSON requests
app.use(
    express.json({
        limit: "15mb"
    })
);

// URL encoded requests
app.use(
    express.urlencoded({
        extended: true,
        limit: "15mb"
    })
);

// ============================================================
// BASIC ROUTE
// ============================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "Smart Agriculture Market Intelligence API",
        version: "1.0.0",
        status: "running"
    });
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        service: "smart-agriculture-api",
        timestamp: new Date().toISOString(),

        services: {
            openai: Boolean(OPENAI_API_KEY),
            plant_id: Boolean(PLANT_ID_API_KEY),
            data_gov: Boolean(DATA_GOV_API_KEY)
        }
    });
});

// ============================================================
// OPENAI AGRICULTURE ANALYSIS
// ============================================================

app.post("/api/ai/analyze", async (req, res) => {
    try {
        if (!openai) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is not configured."
            });
        }

        const {
            crop,
            location,
            marketData,
            weatherData,
            cropHealth
        } = req.body;

        if (!crop && !location && !marketData && !cropHealth) {
            return res.status(400).json({
                success: false,
                error: "Agricultural information is required."
            });
        }

        const prompt = `
You are an agricultural market intelligence assistant.

Analyze the agricultural information provided below.

IMPORTANT:
- Do not invent data.
- Do not create fake prices.
- Do not assume unavailable weather information.
- If information is missing, clearly say that it is unavailable.
- Keep recommendations practical for farmers.
- Distinguish between observed data and your interpretation.

AGRICULTURAL INFORMATION
========================

Crop:
${crop || "Not provided"}

Location:
${location || "Not provided"}

MARKET DATA:
${JSON.stringify(marketData || {}, null, 2)}

WEATHER DATA:
${JSON.stringify(weatherData || {}, null, 2)}

CROP HEALTH DATA:
${JSON.stringify(cropHealth || {}, null, 2)}

Return the analysis using these sections:

1. Market Summary
2. Price Interpretation
3. Demand and Supply Observations
4. Crop Health Assessment
5. Weather Risk
6. Recommended Farmer Action
7. Key Risks
8. Data Availability

Keep the answer clear and useful.
`;

        const response = await openai.responses.create({
            model: "gpt-5",
            input: prompt
        });

        return res.json({
            success: true,
            analysis: response.output_text
        });

    } catch (error) {
        console.error("OpenAI error:", error);

        return res.status(500).json({
            success: false,
            error: "OpenAI analysis failed."
        });
    }
});

// ============================================================
// OPENAI SIMPLE CHAT/QUESTION ENDPOINT
// ============================================================

app.post("/api/ai/chat", async (req, res) => {
    try {
        if (!openai) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is not configured."
            });
        }

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required."
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5",
            input: `
You are an agricultural assistant.

Answer the farmer's question clearly and practically.

Question:
${message}
`
        });

        return res.json({
            success: true,
            response: response.output_text
        });

    } catch (error) {
        console.error("OpenAI chat error:", error);

        return res.status(500).json({
            success: false,
            error: "Unable to process AI request."
        });
    }
});

// ============================================================
// DATA.GOV.IN MARKET DATA
// ============================================================

app.get("/api/market", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "Data.gov.in API key is not configured."
            });
        }

        const {
            state,
            district,
            market,
            commodity,
            variety,
            limit = 20
        } = req.query;

        const params = new URLSearchParams();

        params.append(
            "api-key",
            DATA_GOV_API_KEY
        );

        params.append(
            "format",
            "json"
        );

        params.append(
            "limit",
            String(Math.min(Number(limit) || 20, 100))
        );

        // ----------------------------------------------------
        // Optional filters
        // ----------------------------------------------------

        if (state) {
            params.append(
                "filters[state.keyword]",
                state
            );
        }

        if (district) {
            params.append(
                "filters[district.keyword]",
                district
            );
        }

        if (market) {
            params.append(
                "filters[market.keyword]",
                market
            );
        }

        if (commodity) {
            params.append(
                "filters[commodity.keyword]",
                commodity
            );
        }

        if (variety) {
            params.append(
                "filters[variety.keyword]",
                variety
            );
        }

        const response = await fetch(
            `${DATA_GOV_URL}?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Data.gov.in response:",
                data
            );

            return res.status(response.status).json({
                success: false,
                error: "Data.gov.in request failed.",
                details: data
            });
        }

        return res.json({
            success: true,
            source: "data.gov.in",
            data
        });

    } catch (error) {
        console.error(
            "Market data error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Unable to retrieve market data."
        });
    }
});

// ============================================================
// DATA.GOV.IN MARKET SEARCH
// ============================================================

app.get("/api/market/search", async (req, res) => {
    try {
        if (!DATA_GOV_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "Data.gov.in API key is not configured."
            });
        }

        const {
            state,
            district,
            commodity,
            limit = 20
        } = req.query;

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(
                Math.min(Number(limit) || 20, 100)
            )
        });

        if (state) {
            params.append(
                "filters[state.keyword]",
                state
            );
        }

        if (district) {
            params.append(
                "filters[district.keyword]",
                district
            );
        }

        if (commodity) {
            params.append(
                "filters[commodity.keyword]",
                commodity
            );
        }

        const response = await fetch(
            `${DATA_GOV_URL}?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                error: "Market search failed.",
                details: data
            });
        }

        return res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error(
            "Market search error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Unable to search market data."
        });
    }
});

// ============================================================
// PLANT.ID CROP HEALTH ANALYSIS
// ============================================================

app.post("/api/crop-health", async (req, res) => {
    try {
        if (!PLANT_ID_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "Plant.id API key is not configured."
            });
        }

        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                error: "Image is required."
            });
        }

        // ----------------------------------------------------
        // Remove data URL prefix if frontend sends:
        //
        // data:image/jpeg;base64,...
        // ----------------------------------------------------

        const cleanImage = image.includes(",")
            ? image.split(",")[1]
            : image;

        const response = await fetch(
            PLANT_ID_URL,
            {
                method: "POST",

                headers: {
                    "Api-Key": PLANT_ID_API_KEY,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    images: [
                        cleanImage
                    ],

                    health: "all",

                    similar_images: true,

                    language: "en"
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Plant.id response:",
                data
            );

            return res.status(response.status).json({
                success: false,
                error: "Plant.id request failed.",
                details: data
            });
        }

        return res.json({
            success: true,
            source: "plant.id",
            data
        });

    } catch (error) {
        console.error(
            "Plant.id error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Unable to analyze crop health."
        });
    }
});

// ============================================================
// COMBINED AGRICULTURE ANALYSIS
// ============================================================

app.post("/api/agriculture/analyze", async (req, res) => {
    try {
        if (!openai) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is not configured."
            });
        }

        const {
            crop,
            location,
            marketData,
            cropHealth,
            weatherData
        } = req.body;

        const prompt = `
You are an expert agricultural market intelligence assistant.

The farmer needs a concise decision-support report.

Crop:
${crop || "Unknown"}

Location:
${location || "Unknown"}

Market information:
${JSON.stringify(
    marketData || {},
    null,
    2
)}

Crop health information:
${JSON.stringify(
    cropHealth || {},
    null,
    2
)}

Weather information:
${JSON.stringify(
    weatherData || {},
    null,
    2
)}

Analyze ONLY the supplied information.

Do not fabricate:
- prices
- rainfall
- disease names
- market trends
- demand
- supply
- weather conditions

If a required piece of information is unavailable,
say "Data unavailable".

Provide:

MARKET OUTLOOK
Explain the current market situation.

CROP HEALTH
Explain detected crop health information.

RISK ASSESSMENT
Identify important risks.

FARMER RECOMMENDATION
Give practical actions based only on the available data.

CONFIDENCE
State whether the recommendation has high, medium,
or low confidence and explain why.

Keep the report concise and understandable.
`;

        const response = await openai.responses.create({
            model: "gpt-5",
            input: prompt
        });

        return res.json({
            success: true,

            crop: crop || null,

            location: location || null,

            analysis: response.output_text
        });

    } catch (error) {
        console.error(
            "Combined analysis error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Agriculture analysis failed."
        });
    }
});

// ============================================================
// 404 HANDLER
// ============================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Endpoint not found."
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
        error: "Internal server error."
    });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
    console.log("");
    console.log(
        "=============================================="
    );
    console.log(
        " Smart Agriculture Market Intelligence API"
    );
    console.log(
        "=============================================="
    );
    console.log(
        `Server: http://localhost:${PORT}`
    );
    console.log(
        `Health: http://localhost:${PORT}/api/health`
    );
    console.log("");
    console.log(
        "Configured services:"
    );
    console.log(
        `OpenAI:    ${OPENAI_API_KEY ? "YES" : "NO"}`
    );
    console.log(
        `Plant.id:  ${PLANT_ID_API_KEY ? "YES" : "NO"}`
    );
    console.log(
        `Data.gov:  ${DATA_GOV_API_KEY ? "YES" : "NO"}`
    );
    console.log("");
});
