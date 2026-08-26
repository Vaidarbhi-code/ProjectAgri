// ============================================================
// SMART AGRICULTURE MARKET INTELLIGENCE
// Production Backend
// Plant.id + Data.gov.in + OpenAI
// ============================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const OpenAI = require("openai");

const app = express();

// ------------------------------------------------------------
// Configuration
// ------------------------------------------------------------

const PORT = process.env.PORT || 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;

const DATA_GOV_RESOURCE_ID =
    process.env.DATA_GOV_RESOURCE_ID ||
    "9ef84268-d588-465a-a308-a864a43d0070";

// ------------------------------------------------------------
// Validate environment
// ------------------------------------------------------------

const missingKeys = [];

if (!OPENAI_API_KEY) missingKeys.push("OPENAI_API_KEY");
if (!PLANT_ID_API_KEY) missingKeys.push("PLANT_ID_API_KEY");
if (!DATA_GOV_API_KEY) missingKeys.push("DATA_GOV_API_KEY");

if (missingKeys.length > 0) {
    console.warn(
        `WARNING: Missing environment variables: ${missingKeys.join(", ")}`
    );
}

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------
// Multer - memory storage
// Image is never permanently stored on the server.
// ------------------------------------------------------------

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype && file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }
    },
});

// ------------------------------------------------------------
// OpenAI
// ------------------------------------------------------------

const openai = OPENAI_API_KEY
    ? new OpenAI({
          apiKey: OPENAI_API_KEY,
      })
    : null;

// ------------------------------------------------------------
// Health check
// ------------------------------------------------------------

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        service: "Smart Agriculture Market Intelligence API",
        status: "running",
        services: {
            openai: Boolean(OPENAI_API_KEY),
            plantId: Boolean(PLANT_ID_API_KEY),
            dataGov: Boolean(DATA_GOV_API_KEY),
        },
    });
});

// ============================================================
// PLANT.ID
// ============================================================

app.post("/api/crop-health", upload.single("image"), async (req, res) => {
    try {
        if (!PLANT_ID_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "Plant.id API key is not configured.",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No crop image was uploaded.",
            });
        }

        const imageBase64 = req.file.buffer.toString("base64");

        const response = await fetch(
            "https://plant.id/api/v3/identification",
            {
                method: "POST",
                headers: {
                    "Api-Key": PLANT_ID_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    images: [imageBase64],
                    health: "all",
                    similar_images: true,
                    language: "en",
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Plant.id error:", data);

            return res.status(response.status).json({
                success: false,
                error: "Plant.id request failed.",
                details: data,
            });
        }

        // Extract useful information while preserving
        // the original API response for frontend flexibility.

        const result = data.result || {};

        const identification = result.classification || {};

        const suggestions = identification.suggestions || [];

        const topPlant = suggestions.length > 0
            ? suggestions[0]
            : null;

        const healthAssessment = result.is_plant;

        return res.json({
            success: true,

            crop: topPlant
                ? {
                      name: topPlant.name || null,
                      probability: topPlant.probability || null,
                      details: topPlant.details || null,
                  }
                : null,

            plantDetected: healthAssessment ?? null,

            health: result.disease
                ? result.disease
                : null,

            raw: data,
        });
    } catch (error) {
        console.error("Crop health error:", error);

        return res.status(500).json({
            success: false,
            error: "Unable to analyze the crop image.",
            message: error.message,
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
                error: "Data.gov.in API key is not configured.",
            });
        }

        const {
            limit = "20",
            offset = "0",
            state,
            district,
            market,
            commodity,
        } = req.query;

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            format: "json",
            limit: String(limit),
            offset: String(offset),
        });

        // These filters are passed to Data.gov.in only when supplied.
        // Different resources can expose different field names,
        // so the backend does not force them by default.

        if (state) {
            params.append("filters[state]", state);
        }

        if (district) {
            params.append("filters[district]", district);
        }

        if (market) {
            params.append("filters[market]", market);
        }

        if (commodity) {
            params.append("filters[commodity]", commodity);
        }

        const url =
            `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}?` +
            params.toString();

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            console.error("Data.gov.in error:", data);

            return res.status(response.status).json({
                success: false,
                error: "Data.gov.in request failed.",
                details: data,
            });
        }

        return res.json({
            success: true,
            total: data.total ?? null,
            count: data.count ?? null,
            records: data.records ?? [],
            raw: data,
        });
    } catch (error) {
        console.error("Market data error:", error);

        return res.status(500).json({
            success: false,
            error: "Unable to retrieve market data.",
            message: error.message,
        });
    }
});

// ============================================================
// OPENAI MARKET INTELLIGENCE
// ============================================================

app.post("/api/market-analysis", async (req, res) => {
    try {
        if (!openai) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is not configured.",
            });
        }

        const {
            crop,
            marketData,
            location,
            question,
        } = req.body;

        if (!crop && !marketData && !question) {
            return res.status(400).json({
                success: false,
                error:
                    "Provide at least crop, marketData, or question for analysis.",
            });
        }

        const prompt = `
You are an agricultural market intelligence assistant.

Analyze the supplied agricultural information and provide
practical, data-driven insights for a farmer.

Crop:
${JSON.stringify(crop || null, null, 2)}

Location:
${JSON.stringify(location || null, null, 2)}

Market data:
${JSON.stringify(marketData || null, null, 2)}

User question:
${question || "Provide a market intelligence summary."}

Return the response in this structure:

1. Market Summary
2. Current Price/Market Observation
3. Demand & Supply Interpretation
4. Risk Factors
5. Recommended Action
6. Short-Term Outlook

Important:
- Do not invent prices or market records.
- Clearly distinguish supplied data from inference.
- If the supplied market data is insufficient, say so.
- Keep recommendations practical for an Indian farmer.
`;

        const response = await openai.responses.create({
            model: process.env.OPENAI_MODEL || "gpt-5-mini",
            input: prompt,
        });

        return res.json({
            success: true,
            analysis: response.output_text,
        });
    } catch (error) {
        console.error("OpenAI analysis error:", error);

        return res.status(500).json({
            success: false,
            error: "Unable to generate market analysis.",
            message: error.message,
        });
    }
});

// ============================================================
// COMBINED INTELLIGENCE ENDPOINT
// ============================================================

app.post("/api/intelligence", upload.single("image"), async (req, res) => {
    try {
        if (!openai) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is not configured.",
            });
        }

        let cropHealth = null;
        let marketData = null;

        // --------------------------------------------------------
        // 1. Crop health analysis
        // --------------------------------------------------------

        if (req.file && PLANT_ID_API_KEY) {
            const imageBase64 = req.file.buffer.toString("base64");

            const plantResponse = await fetch(
                "https://plant.id/api/v3/identification",
                {
                    method: "POST",
                    headers: {
                        "Api-Key": PLANT_ID_API_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        images: [imageBase64],
                        health: "all",
                        similar_images: true,
                        language: "en",
                    }),
                }
            );

            const plantData = await plantResponse.json();

            if (plantResponse.ok) {
                cropHealth = plantData;
            }
        }

        // --------------------------------------------------------
        // 2. Market data
        // --------------------------------------------------------

        if (DATA_GOV_API_KEY) {
            const limit = req.body.limit || 20;
            const offset = req.body.offset || 0;

            const params = new URLSearchParams({
                "api-key": DATA_GOV_API_KEY,
                format: "json",
                limit: String(limit),
                offset: String(offset),
            });

            if (req.body.state) {
                params.append(
                    "filters[state]",
                    String(req.body.state)
                );
            }

            if (req.body.district) {
                params.append(
                    "filters[district]",
                    String(req.body.district)
                );
            }

            if (req.body.market) {
                params.append(
                    "filters[market]",
                    String(req.body.market)
                );
            }

            if (req.body.commodity) {
                params.append(
                    "filters[commodity]",
                    String(req.body.commodity)
                );
            }

            const marketResponse = await fetch(
                `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}?${params}`
            );

            const marketJson = await marketResponse.json();

            if (marketResponse.ok) {
                marketData = marketJson;
            }
        }

        // --------------------------------------------------------
        // 3. AI analysis
        // --------------------------------------------------------

        const prompt = `
You are the AI engine of a Smart Agriculture Market Intelligence
platform.

Analyze the following information.

CROP HEALTH DATA:
${JSON.stringify(cropHealth, null, 2)}

MARKET DATA:
${JSON.stringify(marketData, null, 2)}

USER LOCATION:
${req.body.location || "Not provided"}

USER QUESTION:
${req.body.question || "Give an overall agricultural market intelligence report."}

Provide:

MARKET SUMMARY
- concise summary

CROP STATUS
- identify the crop if possible
- summarize health information if available

MARKET INSIGHT
- explain relevant market observations
- do not invent missing prices

FARMER RECOMMENDATION
- practical action based only on available evidence

RISKS
- list important uncertainties

OUTLOOK
- short-term outlook

Rules:
- Never fabricate data.
- If data is unavailable, explicitly state "Data unavailable".
- Separate factual data from AI inference.
- Do not claim certainty about future prices.
`;

        const aiResponse = await openai.responses.create({
            model: process.env.OPENAI_MODEL || "gpt-5-mini",
            input: prompt,
        });

        return res.json({
            success: true,

            cropHealth,

            marketData,

            analysis: aiResponse.output_text,
        });
    } catch (error) {
        console.error("Intelligence error:", error);

        return res.status(500).json({
            success: false,
            error: "Unable to generate agricultural intelligence.",
            message: error.message,
        });
    }
});

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "API endpoint not found.",
        path: req.originalUrl,
    });
});

// ============================================================
// Global error handler
// ============================================================

app.use((err, req, res, next) => {
    console.error("Server error:", err);

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        error: err.message || "Internal server error.",
    });
});

// ============================================================
// Start server
// ============================================================

app.listen(PORT, () => {
    console.log("==============================================");
    console.log(" Smart Agriculture Market Intelligence API");
    console.log("==============================================");
    console.log(`Server running on port ${PORT}`);
    console.log(`OpenAI:    ${OPENAI_API_KEY ? "configured" : "MISSING"}`);
    console.log(`Plant.id:  ${PLANT_ID_API_KEY ? "configured" : "MISSING"}`);
    console.log(`Data.gov:  ${DATA_GOV_API_KEY ? "configured" : "MISSING"}`);
    console.log("==============================================");
});
