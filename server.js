/* =========================================================
   SMARTAGRI BACKEND
   Production-ready Express server
========================================================= */

"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const multer = require("multer");


/* =========================================================
   CONFIGURATION
========================================================= */

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const NODE_ENV =
    process.env.NODE_ENV || "development";

const FRONTEND_URL =
    process.env.FRONTEND_URL || "*";


/* =========================================================
   SECURITY
========================================================= */

app.disable("x-powered-by");

app.use(
    helmet()
);


/* =========================================================
   CORS
========================================================= */

const allowedOrigins =
    FRONTEND_URL === "*"
        ? true
        : FRONTEND_URL
            .split(",")
            .map(origin => origin.trim())
            .filter(Boolean);


app.use(
    cors({
        origin: allowedOrigins,
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ],
        credentials: true
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
   RATE LIMITING
========================================================= */

const generalLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        max:
            300,

        standardHeaders:
            true,

        legacyHeaders:
            false,

        message: {
            error:
                "Too many requests. Please try again later."
        }

    });


app.use(
    "/api",
    generalLimiter
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
                10 * 1024 * 1024,

            files:
                1

        },

        fileFilter:
            (req, file, callback) => {

                if (
                    file.mimetype &&
                    file.mimetype.startsWith("image/")
                ) {

                    callback(
                        null,
                        true
                    );

                } else {

                    callback(
                        new Error(
                            "Only image files are allowed."
                        )
                    );

                }

            }

    });


/* =========================================================
   REQUEST LOGGING
========================================================= */

app.use(
    (req, res, next) => {

        const startedAt =
            Date.now();


        res.on(
            "finish",
            () => {

                const duration =
                    Date.now() -
                    startedAt;


                console.log(
                    `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
                );

            }
        );


        next();

    }
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success:
                true,

            service:
                "SmartAgri Backend",

            status:
                "online",

            environment:
                NODE_ENV,

            timestamp:
                new Date().toISOString()

        });

    }
);


app.get(
    "/health",
    (req, res) => {

        res.status(200).json({

            success:
                true,

            status:
                "healthy",

            timestamp:
                new Date().toISOString()

        });

    }
);


/* =========================================================
   API STATUS
========================================================= */

app.get(
    "/api",
    (req, res) => {

        res.status(200).json({

            success:
                true,

            service:
                "SmartAgri API",

            version:
                "1.0.0",

            endpoints: {

                weather:
                    "/api/weather",

                marketPrices:
                    "/api/market-prices",

                cropHealth:
                    "/api/crop-health",

                ai:
                    "/api/ai"

            }

        });

    }
);


/* =========================================================
   WEATHER
========================================================= */

app.get(
    "/api/weather",
    async (req, res, next) => {

        try {

            /*
             * Weather service will be connected here.
             *
             * IMPORTANT:
             * Do not return fabricated weather data.
             */

            return res.status(503).json({

                success:
                    false,

                error:
                    "Weather service is not configured."

            });

        } catch (error) {

            next(error);

        }

    }
);


/* =========================================================
   MARKET PRICES
========================================================= */

app.get(
    "/api/market-prices",
    async (req, res, next) => {

        try {

            const commodity =
                typeof req.query.commodity === "string"
                    ? req.query.commodity.trim()
                    : "";


            const market =
                typeof req.query.market === "string"
                    ? req.query.market.trim()
                    : "";


            const state =
                typeof req.query.state === "string"
                    ? req.query.state.trim()
                    : "Maharashtra";


            /*
             * We deliberately do NOT return fake
             * market prices.
             *
             * The market service will be connected
             * after the government data source is
             * configured.
             */

            return res.status(503).json({

                success:
                    false,

                error:
                    "Market data service is not configured.",

                filters: {

                    commodity:
                        commodity || null,

                    market:
                        market || null,

                    state

                }

            });

        } catch (error) {

            next(error);

        }

    }
);


/* =========================================================
   CROP HEALTH
========================================================= */

app.post(
    "/api/crop-health",
    upload.single("image"),
    async (req, res, next) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success:
                        false,

                    error:
                        "Crop image is required."

                });

            }


            /*
             * The actual crop-health AI service
             * will be connected here.
             *
             * The uploaded file currently exists
             * only in server memory.
             */


            return res.status(503).json({

                success:
                    false,

                error:
                    "Crop health AI service is not configured."

            });

        } catch (error) {

            next(error);

        }

    }
);


/* =========================================================
   AI ASSISTANT
========================================================= */

app.post(
    "/api/ai",
    async (req, res, next) => {

        try {

            const {
                question,
                language,
                farmer
            } = req.body;


            if (
                typeof question !== "string" ||
                !question.trim()
            ) {

                return res.status(400).json({

                    success:
                        false,

                    error:
                        "Question is required."

                });

            }


            const cleanQuestion =
                question.trim();


            /*
             * The actual AI provider will be
             * connected here.
             *
             * No fabricated AI response is returned.
             */


            return res.status(503).json({

                success:
                    false,

                error:
                    "AI service is not configured."

            });

        } catch (error) {

            next(error);

        }

    }
);


/* =========================================================
   404 HANDLER
========================================================= */

app.use(
    (req, res) => {

        res.status(404).json({

            success:
                false,

            error:
                "Endpoint not found.",

            path:
                req.originalUrl

        });

    }
);


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(
    (error, req, res, next) => {

        console.error(
            "Server error:",
            error
        );


        /*
         * Multer errors
         */

        if (
            error instanceof multer.MulterError
        ) {

            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {

                return res.status(400).json({

                    success:
                        false,

                    error:
                        "Image size must not exceed 10 MB."

                });

            }


            return res.status(400).json({

                success:
                    false,

                error:
                    error.message

            });

        }


        /*
         * File validation errors
         */

        if (
            error.message ===
            "Only image files are allowed."
        ) {

            return res.status(400).json({

                success:
                    false,

                error:
                    error.message

            });

        }


        /*
         * General server error
         */

        const statusCode =
            Number(error.statusCode) ||
            500;


        const response = {

            success:
                false,

            error:
                statusCode === 500
                    ? "Internal server error."
                    : error.message

        };


        /*
         * Include details only in development.
         */

        if (
            NODE_ENV ===
            "development"
        ) {

            response.details =
                error.message;

        }


        res.status(
            statusCode
        ).json(response);

    }
);


/* =========================================================
   SERVER STARTUP
========================================================= */

const server =
    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            console.log("");
            console.log(
                "=========================================="
            );
            console.log(
                "        SMARTAGRI BACKEND SERVER"
            );
            console.log(
                "=========================================="
            );
            console.log(
                `Environment : ${NODE_ENV}`
            );
            console.log(
                `Port        : ${PORT}`
            );
            console.log(
                `Frontend    : ${FRONTEND_URL}`
            );
            console.log(
                `Health      : http://localhost:${PORT}/health`
            );
            console.log(
                "=========================================="
            );
            console.log("");

        }
    );


/* =========================================================
   GRACEFUL SHUTDOWN
========================================================= */

function shutdown(signal) {

    console.log(
        `${signal} received. Shutting down...`
    );


    server.close(
        () => {

            console.log(
                "HTTP server closed."
            );

            process.exit(0);

        }
    );

}


process.on(
    "SIGTERM",
    () => shutdown("SIGTERM")
);


process.on(
    "SIGINT",
    () => shutdown("SIGINT")
);
