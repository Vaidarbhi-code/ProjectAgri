const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "smartagri.db");

const db = new Database(dbPath);

// Enable WAL for better reliability.
db.pragma("journal_mode = WAL");

// ============================================================
// TABLES
// ============================================================

db.exec(`
    CREATE TABLE IF NOT EXISTS farmers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firebase_uid TEXT UNIQUE,
        name TEXT,
        email TEXT,
        mobile TEXT,
        village TEXT,
        state TEXT,
        land_area TEXT,
        preferred_market TEXT,
        language TEXT DEFAULT 'en',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS market_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        market TEXT,
        commodity TEXT,
        variety TEXT,
        min_price REAL,
        max_price REAL,
        modal_price REAL,
        arrival_date TEXT,
        fetched_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(
            market,
            commodity,
            variety,
            arrival_date
        )
    );

    CREATE TABLE IF NOT EXISTS weather_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        weather_json TEXT,
        fetched_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS crop_health_uploads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        original_name TEXT,
        mimetype TEXT,
        size INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

// ============================================================
// FARMERS
// ============================================================

function getFarmer(firebaseUid) {
    return db.prepare(`
        SELECT *
        FROM farmers
        WHERE firebase_uid = ?
    `).get(firebaseUid);
}

function createOrUpdateFarmer(data) {
    const existing = getFarmer(data.firebase_uid);

    if (existing) {
        db.prepare(`
            UPDATE farmers
            SET
                name = ?,
                email = ?,
                mobile = ?,
                village = ?,
                state = ?,
                land_area = ?,
                preferred_market = ?,
                language = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE firebase_uid = ?
        `).run(
            data.name || "",
            data.email || "",
            data.mobile || "",
            data.village || "",
            data.state || "",
            data.land_area || "",
            data.preferred_market || "",
            data.language || "en",
            data.firebase_uid
        );
    } else {
        db.prepare(`
            INSERT INTO farmers (
                firebase_uid,
                name,
                email,
                mobile,
                village,
                state,
                land_area,
                preferred_market,
                language
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            data.firebase_uid,
            data.name || "",
            data.email || "",
            data.mobile || "",
            data.village || "",
            data.state || "",
            data.land_area || "",
            data.preferred_market || "",
            data.language || "en"
        );
    }

    return getFarmer(data.firebase_uid);
}

// ============================================================
// MARKET DATA
// ============================================================

function saveMarketPrices(records) {
    if (!Array.isArray(records)) return;

    const insert = db.prepare(`
        INSERT INTO market_prices (
            market,
            commodity,
            variety,
            min_price,
            max_price,
            modal_price,
            arrival_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(
            market,
            commodity,
            variety,
            arrival_date
        )
        DO UPDATE SET
            min_price = excluded.min_price,
            max_price = excluded.max_price,
            modal_price = excluded.modal_price,
            fetched_at = CURRENT_TIMESTAMP
    `);

    const transaction = db.transaction((items) => {
        for (const item of items) {
            insert.run(
                item.market || "",
                item.commodity || "",
                item.variety || "",
                numberOrNull(item.min_price),
                numberOrNull(item.max_price),
                numberOrNull(item.modal_price),
                item.arrival_date || ""
            );
        }
    });

    transaction(records);
}

function getCachedMarketPrices(commodity = null) {
    if (commodity) {
        return db.prepare(`
            SELECT *
            FROM market_prices
            WHERE LOWER(commodity) LIKE LOWER(?)
            ORDER BY arrival_date DESC, market ASC
        `).all(`%${commodity}%`);
    }

    return db.prepare(`
        SELECT *
        FROM market_prices
        ORDER BY arrival_date DESC, market ASC
    `).all();
}

// ============================================================
// WEATHER
// ============================================================

function saveWeather(latitude, longitude, weather) {
    db.prepare(`
        INSERT INTO weather_cache (
            latitude,
            longitude,
            weather_json
        )
        VALUES (?, ?, ?)
    `).run(
        latitude,
        longitude,
        JSON.stringify(weather)
    );
}

function getLatestWeather(latitude, longitude) {
    const row = db.prepare(`
        SELECT *
        FROM weather_cache
        WHERE latitude = ?
        AND longitude = ?
        ORDER BY id DESC
        LIMIT 1
    `).get(latitude, longitude);

    if (!row) return null;

    try {
        return JSON.parse(row.weather_json);
    } catch {
        return null;
    }
}

// ============================================================
// CROP HEALTH UPLOAD
// ============================================================

function saveCropUpload(file) {
    const result = db.prepare(`
        INSERT INTO crop_health_uploads (
            filename,
            original_name,
            mimetype,
            size
        )
        VALUES (?, ?, ?, ?)
    `).run(
        file.filename,
        file.originalname,
        file.mimetype,
        file.size
    );

    return result.lastInsertRowid;
}

// ============================================================
// HELPERS
// ============================================================

function numberOrNull(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const cleaned = String(value)
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "");

    const number = Number(cleaned);

    return Number.isFinite(number) ? number : null;
}

module.exports = {
    db,
    getFarmer,
    createOrUpdateFarmer,
    saveMarketPrices,
    getCachedMarketPrices,
    saveWeather,
    getLatestWeather,
    saveCropUpload
};
