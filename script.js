// ============================================================
// SMARTAGRI - COMPLETE FRONTEND JAVASCRIPT
// ============================================================

// ============================================================
// FIREBASE IMPORTS
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};


// ============================================================
// FIREBASE INITIALIZATION
// ============================================================

let firebaseReady = false;

let firebaseApp = null;
let auth = null;
let db = null;

try {

    firebaseApp =
        initializeApp(firebaseConfig);

    auth =
        getAuth(firebaseApp);

    db =
        getFirestore(firebaseApp);

    firebaseReady = true;

    console.log(
        "Firebase initialized successfully."
    );

} catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

    firebaseReady = false;
}


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let currentUser = null;

let currentFarmerData = null;

let selectedLanguage =
    localStorage.getItem(
        "smartagri_language"
    ) || "en";

let speechRecognition = null;

let isListening = false;


// ============================================================
// API CONFIGURATION
// ============================================================

const API_BASE_URL = "";


// ============================================================
// DOM HELPER
// ============================================================

function $(id) {

    return document.getElementById(id);
}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


// ============================================================
// SAFE NUMBER
// ============================================================

function safeNumber(
    value,
    fallback = null
) {

    const number =
        Number(value);

    if (
        Number.isFinite(number)
    ) {
        return number;
    }

    return fallback;
}


// ============================================================
// FORMAT NUMBER
// ============================================================

function formatNumber(
    value,
    decimals = 1
) {

    const number =
        safeNumber(value);

    if (number === null) {
        return "—";
    }

    return number.toFixed(
        decimals
    );
}


// ============================================================
// API REQUEST HELPER
// ============================================================

async function apiRequest(
    endpoint,
    options = {}
) {

    const response =
        await fetch(
            API_BASE_URL +
            endpoint,
            options
        );

    let data = null;

    try {

        data =
            await response.json();

    } catch {

        throw new Error(
            "Invalid response from server."
        );
    }

    if (!response.ok) {

        throw new Error(
            data.error ||
            `Server error ${response.status}`
        );
    }

    return data;
}


// ============================================================
// LANGUAGE DATA
// ============================================================

const translations = {

    en: {

        dashboard:
            "Dashboard",

        weather:
            "Weather",

        market:
            "Market Intelligence",

        cropHealth:
            "Crop Health",

        aiAssistant:
            "AI Assistant",

        governmentSchemes:
            "Government Schemes",

        profile:
            "Profile",

        logout:
            "Logout",

        login:
            "Login",

        register:
            "Register",

        farmer:
            "Farmer",

        refresh:
            "Refresh",

        loading:
            "Loading...",

        unavailable:
            "Data unavailable"
    },

    hi: {

        dashboard:
            "डैशबोर्ड",

        weather:
            "मौसम",

        market:
            "बाज़ार जानकारी",

        cropHealth:
            "फसल स्वास्थ्य",

        aiAssistant:
            "AI सहायक",

        governmentSchemes:
            "सरकारी योजनाएं",

        profile:
            "प्रोफ़ाइल",

        logout:
            "लॉगआउट",

        login:
            "लॉगिन",

        register:
            "पंजीकरण",

        farmer:
            "किसान",

        refresh:
            "रिफ्रेश",

        loading:
            "लोड हो रहा है...",

        unavailable:
            "डेटा उपलब्ध नहीं है"
    },

    mr: {

        dashboard:
            "डॅशबोर्ड",

        weather:
            "हवामान",

        market:
            "बाजार माहिती",

        cropHealth:
            "पीक आरोग्य",

        aiAssistant:
            "AI सहाय्यक",

        governmentSchemes:
            "सरकारी योजना",

        profile:
            "प्रोफाइल",

        logout:
            "लॉगआउट",

        login:
            "लॉगिन",

        register:
            "नोंदणी",

        farmer:
            "शेतकरी",

        refresh:
            "रिफ्रेश",

        loading:
            "लोड होत आहे...",

        unavailable:
            "डेटा उपलब्ध नाही"
    }
};


// ============================================================
// TRANSLATION FUNCTION
// ============================================================

function translatePage(
    language = selectedLanguage
) {

    selectedLanguage =
        language;

    localStorage.setItem(
        "smartagri_language",
        language
    );

    const dictionary =
        translations[
            language
        ] ||
        translations.en;

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;

                if (
                    dictionary[key]
                ) {

                    element.textContent =
                        dictionary[key];
                }
            }
        );
}


// ============================================================
// LANGUAGE SELECTOR
// ============================================================

function setupLanguageSelector() {

    const selector =
        $("languageSelect");

    if (!selector) {
        return;
    }

    selector.value =
        selectedLanguage;

    selector.addEventListener(
        "change",
        function () {

            selectedLanguage =
                this.value;

            translatePage(
                selectedLanguage
            );

            updateVoiceLanguage();
        }
    );
}


// ============================================================
// AI LANGUAGE
// ============================================================

function getAILanguage() {

    if (
        selectedLanguage === "hi"
    ) {
        return "Hindi";
    }

    if (
        selectedLanguage === "mr"
    ) {
        return "Marathi";
    }

    return "English";
}


// ============================================================
// VOICE LANGUAGE
// ============================================================

function getSpeechLanguage() {

    if (
        selectedLanguage === "hi"
    ) {
        return "hi-IN";
    }

    if (
        selectedLanguage === "mr"
    ) {
        return "mr-IN";
    }

    return "en-IN";
}


function updateVoiceLanguage() {

    if (
        speechRecognition
    ) {

        speechRecognition.lang =
            getSpeechLanguage();
    }
}


// ============================================================
// CONNECTION STATUS
// ============================================================

function updateConnectionStatus() {

    const indicator =
        $("connectionStatus");

    if (!indicator) {
        return;
    }

    if (
        navigator.onLine
    ) {

        indicator.textContent =
            "Online";

        indicator.classList.remove(
            "offline"
        );

        indicator.classList.add(
            "online"
        );

    } else {

        indicator.textContent =
            "Offline";

        indicator.classList.remove(
            "online"
        );

        indicator.classList.add(
            "offline"
        );
    }
}


window.addEventListener(
    "online",
    updateConnectionStatus
);

window.addEventListener(
    "offline",
    updateConnectionStatus
);


// ============================================================
// PAGE NAVIGATION
// ============================================================

function showPage(
    pageId
) {

    document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            page => {

                page.style.display =
                    "none";
            }
        );

    const page =
        $(pageId);

    if (page) {

        page.style.display =
            "block";
    }

    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page ===
                    pageId
                );
            }
        );

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );
}


// ============================================================
// NAVIGATION SETUP
// ============================================================

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const page =
                            this.dataset.page;

                        if (page) {

                            showPage(
                                page
                            );
                        }
                    }
                );
            }
        );
}


// ============================================================
// LOGIN PAGE
// ============================================================

function showLoginPage() {

    const loginPage =
        $("loginPage");

    const registerPage =
        $("registerPage");

    const dashboardPage =
        $("dashboardPage");

    if (loginPage) {

        loginPage.style.display =
            "block";
    }

    if (registerPage) {

        registerPage.style.display =
            "none";
    }

    if (dashboardPage) {

        dashboardPage.style.display =
            "none";
    }
}


// ============================================================
// REGISTER PAGE
// ============================================================

function showRegisterPage() {

    const loginPage =
        $("loginPage");

    const registerPage =
        $("registerPage");

    if (loginPage) {

        loginPage.style.display =
            "none";
    }

    if (registerPage) {

        registerPage.style.display =
            "block";
    }
}


// ============================================================
// DASHBOARD
// ============================================================

function showDashboard() {

    const loginPage =
        $("loginPage");

    const registerPage =
        $("registerPage");

    const dashboardPage =
        $("dashboardPage");

    if (loginPage) {

        loginPage.style.display =
            "none";
    }

    if (registerPage) {

        registerPage.style.display =
            "none";
    }

    if (dashboardPage) {

        dashboardPage.style.display =
            "block";
    }

    showPage(
        "dashboardPage"
    );

    refreshWeather();

    refreshMarketData();
}


// ============================================================
// FIREBASE AUTH LISTENER
// ============================================================

function setupAuthListener() {

    if (!auth) {
        return;
    }

    onAuthStateChanged(
        auth,
        async user => {

            currentUser =
                user;

            if (user) {

                console.log(
                    "Logged in:",
                    user.email
                );

                await loadFarmerProfile();

                showDashboard();

            } else {

                currentFarmerData =
                    null;

                showLoginPage();
            }
        }
    );
}


// ============================================================
// LOAD FARMER PROFILE
// ============================================================

async function loadFarmerProfile() {

    if (
        !db ||
        !currentUser
    ) {
        return;
    }

    try {

        const reference =
            doc(
                db,
                "farmers",
                currentUser.uid
            );

        const snapshot =
            await getDoc(
                reference
            );

        if (
            snapshot.exists()
        ) {

            currentFarmerData =
                snapshot.data();

            updateProfileUI();

        } else {

            currentFarmerData = {

                name:
                    currentUser.displayName ||
                    "Farmer",

                email:
                    currentUser.email,

                location:
                    "Kopargaon, Maharashtra"
            };

            await setDoc(
                reference,
                currentFarmerData
            );
        }

    } catch (error) {

        console.error(
            "Profile load error:",
            error
        );
    }
}


// ============================================================
// UPDATE PROFILE UI
// ============================================================

function updateProfileUI() {

    if (
        !currentFarmerData
    ) {
        return;
    }

    const name =
        currentFarmerData.name ||
        "Farmer";

    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(
            element => {

                element.textContent =
                    name;
            }
        );

    const email =
        currentFarmerData.email ||
        currentUser?.email ||
        "";

    document
        .querySelectorAll(
            "[data-user-email]"
        )
        .forEach(
            element => {

                element.textContent =
                    email;
            }
        );

    const location =
        currentFarmerData.location ||
        "Kopargaon, Maharashtra";

    document
        .querySelectorAll(
            "[data-user-location]"
        )
        .forEach(
            element => {

                element.textContent =
                    location;
            }
        );
}


// ============================================================
// REGISTER
// ============================================================

async function registerUser(
    name,
    email,
    password
) {

    if (!auth) {

        throw new Error(
            "Firebase is not configured."
        );
    }

    const credential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    const user =
        credential.user;

    const profile = {

        name:
            name,

        email:
            email,

        location:
            "Kopargaon, Maharashtra",

        createdAt:
            new Date().toISOString()
    };

    await setDoc(
        doc(
            db,
            "farmers",
            user.uid
        ),
        profile
    );

    currentFarmerData =
        profile;

    return user;
}


// ============================================================
// LOGIN
// ============================================================

async function loginUser(
    email,
    password
) {

    if (!auth) {

        throw new Error(
            "Firebase is not configured."
        );
    }

    const credential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return credential.user;
}


// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {

    if (!auth) {
        return;
    }

    try {

        await signOut(
            auth
        );

        currentUser =
            null;

        currentFarmerData =
            null;

        showLoginPage();

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
}


// ============================================================
// LOGIN / REGISTER EVENTS
// ============================================================

function setupAuthForms() {

    const loginForm =
        $("loginForm");

    const registerForm =
        $("registerForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const email =
                    $("loginEmail")?.value
                        ?.trim();

                const password =
                    $("loginPassword")?.value;

                if (
                    !email ||
                    !password
                ) {

                    alert(
                        "Please enter email and password."
                    );

                    return;
                }

                try {

                    await loginUser(
                        email,
                        password
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                    alert(
                        error.message
                    );
                }
            }
        );
    }

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const name =
                    $("registerName")?.value
                        ?.trim();

                const email =
                    $("registerEmail")?.value
                        ?.trim();

                const password =
                    $("registerPassword")?.value;

                if (
                    !name ||
                    !email ||
                    !password
                ) {

                    alert(
                        "Please fill all fields."
                    );

                    return;
                }

                try {

                    await registerUser(
                        name,
                        email,
                        password
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                    alert(
                        error.message
                    );
                }
            }
        );
    }

    const loginLink =
        $("showLogin");

    const registerLink =
        $("showRegister");

    if (loginLink) {

        loginLink.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showLoginPage();
            }
        );
    }

    if (registerLink) {

        registerLink.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showRegisterPage();
            }
        );
    }

    document
        .querySelectorAll(
            "[data-action='logout']"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    logoutUser
                );
            }
        );
}
// ============================================================
// LIVE WEATHER
// ============================================================

const KOPARGAON = {

    name:
        "Kopargaon",

    state:
        "Maharashtra",

    latitude:
        19.8833,

    longitude:
        74.4833
};


// ============================================================
// REFRESH WEATHER
// ============================================================

async function refreshWeather() {

    const emptyState =
        $("weatherEmptyState");

    const weatherData =
        $("weatherData");

    if (weatherData) {

        weatherData.classList.add(
            "hidden"
        );
    }

    try {

        const query =
            `/api/weather` +
            `?lat=${KOPARGAON.latitude}` +
            `&lon=${KOPARGAON.longitude}` +
            `&days=7`;

        const result =
            await apiRequest(
                query
            );

        if (
            !result.success
        ) {

            throw new Error(
                result.error ||
                "Weather unavailable."
            );
        }

        const current =
            result.data.current;

        const forecast =
            result.data.forecast || [];

        const temperature =
            $("weatherTemperature");

        const humidity =
            $("weatherHumidity");

        const wind =
            $("weatherWind");

        const rain =
            $("weatherRain");

        if (temperature) {

            temperature.textContent =
                `${formatNumber(
                    current.temperature_c,
                    1
                )} °C`;
        }

        if (humidity) {

            humidity.textContent =
                `${formatNumber(
                    current.humidity_pct,
                    0
                )}%`;
        }

        if (wind) {

            wind.textContent =
                `${formatNumber(
                    current.wind_speed_kmh,
                    1
                )} km/h`;
        }

        if (
            rain &&
            forecast.length > 0
        ) {

            rain.textContent =
                `${formatNumber(
                    forecast[0]
                        .rain_probability_pct,
                    0
                )}%`;
        }

        renderWeatherForecast(
            forecast
        );

        if (weatherData) {

            weatherData.classList.remove(
                "hidden"
            );
        }

        if (emptyState) {

            emptyState.classList.add(
                "hidden"
            );
        }

        console.log(
            "Live weather loaded:",
            result
        );

    } catch (error) {

        console.error(
            "Weather error:",
            error
        );

        if (weatherData) {

            weatherData.classList.add(
                "hidden"
            );
        }

        if (emptyState) {

            emptyState.classList.remove(
                "hidden"
            );
        }
    }
}


// ============================================================
// WEATHER FORECAST
// ============================================================

function renderWeatherForecast(
    forecast
) {

    const container =
        $("weatherForecast");

    if (!container) {
        return;
    }

    if (
        !Array.isArray(
            forecast
        ) ||
        forecast.length === 0
    ) {

        container.innerHTML = `
            <p>
                No verified forecast data available.
            </p>
        `;

        return;
    }

    container.innerHTML =
        forecast.map(
            day => {

                const date =
                    new Date(
                        day.date +
                        "T00:00:00"
                    );

                const label =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            weekday:
                                "short",
                            day:
                                "numeric",
                            month:
                                "short"
                        }
                    );

                return `

                    <div class="weather-day">

                        <strong>
                            ${escapeHtml(
                                label
                            )}
                        </strong>

                        <div>
                            ${formatNumber(
                                day.temp_min_c,
                                1
                            )}
                            –
                            ${formatNumber(
                                day.temp_max_c,
                                1
                            )} °C
                        </div>

                        <div>
                            🌧️
                            ${formatNumber(
                                day.rainfall_mm,
                                1
                            )} mm
                        </div>

                        <div>
                            ${formatNumber(
                                day.rain_probability_pct,
                                0
                            )}% rain
                        </div>

                    </div>
                `;
            }
        )
        .join("");
}


// ============================================================
// WEATHER REFRESH BUTTON
// ============================================================

function setupWeatherControls() {

    const button =
        $("refreshWeatherBtn");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        refreshWeather
    );
}
// ============================================================
// LIVE MANDI / MARKET DATA
// ============================================================

async function refreshMarketData() {

    const tbody =
        $("marketTableBody");

    const selector =
        $("cropPriceSelector");

    if (!tbody) {
        return;
    }

    const cropValue =
        selector?.value ||
        "onion";

    const commodity =
        normalizeCommodity(
            cropValue
        );

    tbody.innerHTML = `
        <tr>
            <td colspan="4">
                Loading verified government
                market data...
            </td>
        </tr>
    `;

    try {

        const endpoint =
            `/api/market` +
            `?commodity=${encodeURIComponent(
                commodity
            )}` +
            `&state=Maharashtra` +
            `&market=Kopargaon`;

        const result =
            await apiRequest(
                endpoint
            );

        if (
            !result.success
        ) {

            throw new Error(
                result.error ||
                "Market data unavailable."
            );
        }

        const records =
            Array.isArray(
                result.records
            )
                ? result.records
                : [];

        if (
            records.length === 0
        ) {

            renderEmptyMarket(
                tbody,
                commodity
            );

            return;
        }

        renderMarketRows(
            tbody,
            records
        );

        updateMarketSummary(
            records
        );

    } catch (error) {

        console.error(
            "Market API error:",
            error
        );

        tbody.innerHTML = `
            <tr>
                <td colspan="4">

                    <div class="table-empty">

                        <strong>
                            Market data unavailable
                        </strong>

                        <p>
                            No verified government
                            market data could be loaded.
                        </p>

                    </div>

                </td>
            </tr>
        `;
    }
}


// ============================================================
// COMMODITY NORMALIZATION
// ============================================================

function normalizeCommodity(
    value
) {

    const map = {

        onion:
            "Onion",

        wheat:
            "Wheat",

        cotton:
            "Cotton",

        soybean:
            "Soybean",

        tomato:
            "Tomato",

        potato:
            "Potato",

        maize:
            "Maize",

        sugarcane:
            "Sugarcane"
    };

    return (
        map[value] ||
        value ||
        "Onion"
    );
}


// ============================================================
// MARKET TABLE
// ============================================================

function renderMarketRows(
    tbody,
    records
) {

    tbody.innerHTML =
        records.map(
            record => {

                return `

                    <tr>

                        <td>
                            ${escapeHtml(
                                record.market ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                record.commodity ||
                                "—"
                            )}
                        </td>

                        <td>
                            ₹${escapeHtml(
                                record.modal_price ??
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                record.date ||
                                "—"
                            )}
                        </td>

                    </tr>
                `;
            }
        )
        .join("");
}


// ============================================================
// EMPTY MARKET
// ============================================================

function renderEmptyMarket(
    tbody,
    commodity
) {

    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <div>
                        📊
                    </div>

                    <strong>
                        No verified
                        ${escapeHtml(
                            commodity
                        )}
                        record returned
                    </strong>

                    <p>
                        The government API did not
                        return a matching Kopargaon
                        market record.
                    </p>

                </div>

            </td>

        </tr>
    `;
}


// ============================================================
// MARKET SUMMARY
// ============================================================

function updateMarketSummary(
    records
) {

    if (
        !records ||
        records.length === 0
    ) {
        return;
    }

    const modalPrices =
        records
            .map(
                record =>
                    safeNumber(
                        record.modal_price
                    )
            )
            .filter(
                value =>
                    value !== null
            );

    if (
        modalPrices.length === 0
    ) {
        return;
    }

    const average =
        modalPrices.reduce(
            (
                sum,
                value
            ) =>
                sum + value,
            0
        ) /
        modalPrices.length;

    document
        .querySelectorAll(
            "[data-market-average]"
        )
        .forEach(
            element => {

                element.textContent =
                    `₹${average.toFixed(
                        0
                    )}`;
            }
        );
}


// ============================================================
// MARKET CONTROLS
// ============================================================

function setupMarketControls() {

    const selector =
        $("cropPriceSelector");

    if (selector) {

        selector.addEventListener(
            "change",
            refreshMarketData
        );
    }
}
// ============================================================
// AI ASSISTANT
// ============================================================

function setupAI() {

    const form =
        $("aiForm");

    const input =
        $("aiInput");

    if (
        !form ||
        !input
    ) {
        return;
    }

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const question =
                input.value.trim();

            if (!question) {
                return;
            }

            addChatMessage(
                question,
                "user"
            );

            input.value = "";

            const loadingId =
                addChatMessage(
                    "Thinking...",
                    "assistant"
                );

            try {

                const result =
                    await apiRequest(
                        "/api/ai",
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    question:
                                        question,

                                    language:
                                        getAILanguage(),

                                    context: {

                                        location:
                                            "Kopargaon, Maharashtra",

                                        crop:
                                            $("cropPriceSelector")
                                                ?.value ||
                                            "onion",

                                        farmer:
                                            currentFarmerData
                                                ?.name ||
                                            "Farmer"
                                    }
                                })
                        }
                    );

                removeChatMessage(
                    loadingId
                );

                if (
                    !result.success
                ) {

                    throw new Error(
                        result.error ||
                        "AI unavailable."
                    );
                }

                addChatMessage(
                    result.answer,
                    "assistant"
                );

                speakText(
                    result.answer,
                    getAILanguage()
                );

            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );

                removeChatMessage(
                    loadingId
                );

                addChatMessage(
                    "The AI service could not be reached. Please check the backend and API configuration.",
                    "assistant"
                );
            }
        }
    );
}


// ============================================================
// CHAT MESSAGE
// ============================================================

function addChatMessage(
    message,
    type
) {

    const container =
        $("chatMessages");

    if (!container) {
        return null;
    }

    const id =
        "chat-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2);

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.id =
        id;

    wrapper.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";

    const name =
        type === "user"
            ? (
                currentFarmerData?.name ||
                "Farmer"
            )
            : "SmartAgri AI";

    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";

    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div class="chat-content">

            <strong>
                ${escapeHtml(
                    name
                )}
            </strong>

            <p>
                ${escapeHtml(
                    message
                )}
            </p>

        </div>
    `;

    container.appendChild(
        wrapper
    );

    container.scrollTop =
        container.scrollHeight;

    return id;
}


// ============================================================
// REMOVE CHAT MESSAGE
// ============================================================

function removeChatMessage(
    id
) {

    if (!id) {
        return;
    }

    const element =
        document.getElementById(
            id
        );

    if (element) {

        element.remove();
    }
}


// ============================================================
// VOICE RECOGNITION
// ============================================================

function setupVoiceRecognition() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");

    const voiceInput =
        $("voiceInput");

    const voiceResponse =
        $("voiceResponse");

    if (!startButton) {
        return;
    }

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {

        startButton.disabled =
            true;

        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition is not supported by this browser.";
        }

        return;
    }

    speechRecognition =
        new Recognition();

    speechRecognition.continuous =
        false;

    speechRecognition.interimResults =
        false;

    speechRecognition.maxAlternatives =
        1;

    speechRecognition.lang =
        getSpeechLanguage();


    startButton.addEventListener(
        "click",
        startVoiceRecognition
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            stopVoiceRecognition
        );
    }


    speechRecognition.onstart =
        function () {

            isListening =
                true;

            startButton.disabled =
                true;

            if (stopButton) {

                stopButton.disabled =
                    false;
            }

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Listening...";
            }
        };


    speechRecognition.onresult =
        async function (
            event
        ) {

            const transcript =
                event
                    .results[0][0]
                    .transcript
                    .trim();

            if (voiceInput) {

                voiceInput.value =
                    transcript;
            }

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Processing...";
            }

            await askVoiceAI(
                transcript
            );
        };


    speechRecognition.onerror =
        function (
            event
        ) {

            console.error(
                "Speech recognition error:",
                event.error
            );

            isListening =
                false;

            startButton.disabled =
                false;

            if (stopButton) {

                stopButton.disabled =
                    true;
            }

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Voice recognition error: " +
                    event.error;
            }
        };


    speechRecognition.onend =
        function () {

            isListening =
                false;

            startButton.disabled =
                false;

            if (stopButton) {

                stopButton.disabled =
                    true;
            }
        };
}


// ============================================================
// START VOICE
// ============================================================

function startVoiceRecognition() {

    if (
        !speechRecognition ||
        isListening
    ) {
        return;
    }

    speechRecognition.lang =
        getSpeechLanguage();

    try {

        speechRecognition.start();

    } catch (error) {

        console.error(
            "Could not start voice:",
            error
        );
    }
}


// ============================================================
// STOP VOICE
// ============================================================

function stopVoiceRecognition() {

    if (
        speechRecognition &&
        isListening
    ) {

        speechRecognition.stop();
    }
}


// ============================================================
// VOICE → AI
// ============================================================

async function askVoiceAI(
    question
) {

    const voiceResponse =
        $("voiceResponse");

    if (!question) {
        return;
    }

    try {

        const result =
            await apiRequest(
                "/api/ai",
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            question:
                                question,

                            language:
                                getAILanguage(),

                            context: {

                                location:
                                    "Kopargaon, Maharashtra",

                                interface:
                                    "voice assistant"
                            }
                        })
                }
            );

        if (
            !result.success
        ) {

            throw new Error(
                result.error
            );
        }

        if (voiceResponse) {

            voiceResponse.textContent =
                result.answer;
        }

        speakText(
            result.answer,
            getAILanguage()
        );

    } catch (error) {

        console.error(
            "Voice AI error:",
            error
        );

        if (voiceResponse) {

            voiceResponse.textContent =
                "AI service is currently unavailable.";
        }
    }
}


// ============================================================
// TEXT TO SPEECH
// ============================================================

function speakText(
    text,
    language
) {

    if (
        !window.speechSynthesis
    ) {
        return;
    }

    if (!text) {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(
            text
        );

    if (
        language === "Hindi"
    ) {

        utterance.lang =
            "hi-IN";

    } else if (
        language === "Marathi"
    ) {

        utterance.lang =
            "mr-IN";

    } else {

        utterance.lang =
            "en-IN";
    }

    utterance.rate =
        0.95;

    utterance.pitch =
        1;

    window.speechSynthesis.speak(
        utterance
    );
}
// ============================================================
// CROP HEALTH IMAGE
// ============================================================

function setupCropImage() {

    const input =
        $("cropImageInput");

    const preview =
        $("cropImagePreview");

    const previewContainer =
        $("imagePreviewContainer");

    const analyzeButton =
        $("analyzeCropBtn");

    if (!input) {
        return;
    }

    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];

            if (!file) {

                if (
                    previewContainer
                ) {

                    previewContainer
                        .classList
                        .add("hidden");
                }

                if (
                    analyzeButton
                ) {

                    analyzeButton.disabled =
                        true;
                }

                return;
            }

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select a valid crop image."
                );

                this.value = "";

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                event => {

                    if (preview) {

                        preview.src =
                            event.target.result;
                    }

                    if (
                        previewContainer
                    ) {

                        previewContainer
                            .classList
                            .remove(
                                "hidden"
                            );
                    }

                    if (
                        analyzeButton
                    ) {

                        analyzeButton.disabled =
                            false;
                    }
                };

            reader.readAsDataURL(
                file
            );
        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeCropImage
        );
    }
}


// ============================================================
// CROP AI ANALYSIS
// ============================================================

async function analyzeCropImage() {

    const input =
        $("cropImageInput");

    const result =
        $("cropAnalysisResult");

    const button =
        $("analyzeCropBtn");

    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        return;
    }

    const file =
        input.files[0];

    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Analyzing...";
    }

    if (result) {

        result.innerHTML = `

            <strong>
                🤖 SmartAgri AI is analyzing the image...
            </strong>

            <p>
                Please wait.
            </p>
        `;
    }

    try {

        const formData =
            new FormData();

        formData.append(
            "image",
            file
        );

        const response =
            await fetch(
                "/api/crop-analysis",
                {

                    method:
                        "POST",

                    body:
                        formData
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.error ||
                "Crop analysis failed."
            );
        }

        if (result) {

            result.innerHTML = `

                <strong>
                    🤖 AI Crop Health Analysis
                </strong>

                <p style="
                    white-space: pre-line;
                    margin-top: 10px;
                ">
                    ${escapeHtml(
                        data.analysis
                    )}
                </p>
            `;
        }

    } catch (error) {

        console.error(
            "Crop analysis error:",
            error
        );

        if (result) {

            result.innerHTML = `

                <strong>
                    Crop analysis unavailable
                </strong>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>
            `;
        }

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Analyze Crop";
        }
    }
}
// ============================================================
// PROFILE FORM
// ============================================================

function setupProfileForm() {

    const form =
        $("profileForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            if (
                !currentUser ||
                !db
            ) {

                return;
            }

            const name =
                $("profileName")
                    ?.value
                    ?.trim();

            const phone =
                $("profilePhone")
                    ?.value
                    ?.trim();

            const location =
                $("profileLocation")
                    ?.value
                    ?.trim();

            const updates = {

                name:
                    name ||
                    currentFarmerData?.name ||
                    "Farmer",

                phone:
                    phone || "",

                location:
                    location ||
                    "Kopargaon, Maharashtra",

                updatedAt:
                    new Date()
                        .toISOString()
            };

            try {

                await updateDoc(
                    doc(
                        db,
                        "farmers",
                        currentUser.uid
                    ),
                    updates
                );

                currentFarmerData = {

                    ...currentFarmerData,

                    ...updates
                };

                updateProfileUI();

                alert(
                    "Profile updated successfully."
                );

            } catch (error) {

                console.error(
                    "Profile update error:",
                    error
                );

                alert(
                    "Could not update profile."
                );
            }
        }
    );
}


// ============================================================
// PROFILE PAGE
// ============================================================

function populateProfileForm() {

    if (
        !currentFarmerData
    ) {
        return;
    }

    const name =
        $("profileName");

    const phone =
        $("profilePhone");

    const location =
        $("profileLocation");

    if (name) {

        name.value =
            currentFarmerData.name ||
            "";
    }

    if (phone) {

        phone.value =
            currentFarmerData.phone ||
            "";
    }

    if (location) {

        location.value =
            currentFarmerData.location ||
            "Kopargaon, Maharashtra";
    }
}


// ============================================================
// GOVERNMENT SCHEMES
// ============================================================

function setupSchemeLinks() {

    document
        .querySelectorAll(
            "[data-external-link]"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "click",
                    event => {

                        const url =
                            element.dataset
                                .externalLink;

                        if (!url) {
                            return;
                        }

                        event.preventDefault();

                        window.open(
                            url,
                            "_blank",
                            "noopener,noreferrer"
                        );
                    }
                );
            }
        );
}


// ============================================================
// BUTTONS
// ============================================================

function setupGeneralButtons() {

    document
        .querySelectorAll(
            "[data-refresh]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const target =
                            this.dataset.refresh;

                        if (
                            target ===
                            "weather"
                        ) {

                            refreshWeather();
                        }

                        if (
                            target ===
                            "market"
                        ) {

                            refreshMarketData();
                        }
                    }
                );
            }
        );
}


// ============================================================
// NAVIGATION
// ============================================================

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const page =
                            this.dataset.page;

                        if (!page) {
                            return;
                        }

                        showPage(
                            page
                        );

                        if (
                            page ===
                            "weatherPage"
                        ) {

                            refreshWeather();
                        }

                        if (
                            page ===
                            "marketPage"
                        ) {

                            refreshMarketData();
                        }

                        if (
                            page ===
                            "profilePage"
                        ) {

                            populateProfileForm();
                        }
                    }
                );
            }
        );
}


// ============================================================
// EVENT SETUP
// ============================================================

function setupEventListeners() {

    setupLanguageSelector();

    setupNavigation();

    setupAuthForms();

    setupWeatherControls();

    setupMarketControls();

    setupAI();

    setupVoiceRecognition();

    setupCropImage();

    setupProfileForm();

    setupSchemeLinks();

    setupGeneralButtons();

    updateConnectionStatus();
}


// ============================================================
// BACKEND HEALTH CHECK
// ============================================================

async function checkBackendHealth() {

    try {

        const result =
            await apiRequest(
                "/api/health"
            );

        console.log(
            "SmartAgri backend:",
            result
        );

        return result;

    } catch (error) {

        console.error(
            "Backend unavailable:",
            error
        );

        return null;
    }
}


// ============================================================
// INITIAL DATA LOAD
// ============================================================

async function initializeLiveData() {

    await checkBackendHealth();

    await refreshWeather();

    await refreshMarketData();
}


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "SmartAgri loading..."
        );

        translatePage(
            selectedLanguage
        );

        setupEventListeners();

        if (firebaseReady) {

            setupAuthListener();

        } else {

            console.warn(
                "Firebase is not configured."
            );
        }

        /*
         * Load live data immediately.
         * No fake fallback values.
         */
        initializeLiveData();
    }
);
