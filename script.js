/* =========================================================
   SMARTAGRI - MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyAuIbj5ajXbSu1_txFSJSLViAGcc1DBgHY",
    authDomain: "kopargaonproject.firebaseapp.com",
    projectId: "kopargaonproject",
    storageBucket: "kopargaonproject.firebasestorage.app",
    messagingSenderId: "274707924421",
    appId: "1:274707924421:web:6808cf0bede74c29e437ac",
    measurementId: "G-DJ93MTY319"
};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

let firebaseReady = false;
let auth = null;
let db = null;

try {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    firebaseReady = true;

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization error:", error);

    firebaseReady = false;
}


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage =
    localStorage.getItem("smartagriLanguage") || "en";

let currentUser = null;

let selectedCrop = "onion";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        appName: "SmartAgri",
        appTagline: "Smart Agriculture Market Intelligence System",

        chooseLanguage: "Choose Your Language",
        languageDescription:
            "Select your preferred language to continue.",

        continue: "Continue",

        loginTitle: "Farmer Login",
        loginSubtitle: "Login to access SmartAgri",

        email: "Email",
        password: "Password",

        rememberMe: "Remember Me",
        forgotPassword: "Forgot Password?",
        login: "Login",

        or: "OR",
        demoDashboard: "Enter Demo Dashboard",

        noAccount: "Don't have an account?",
        register: "Register",

        changeLanguage: "Change Language",

        registrationTitle: "Farmer Registration",
        registrationSubtitle:
            "Create your SmartAgri farmer account",

        fullName: "Full Name",
        mobile: "Mobile Number",
        village: "Village",
        state: "State",
        landArea: "Land Area",

        preferredMarket: "Preferred Market",
        selectMarket: "Select Market",

        kopargaonMarket: "Kopargaon APMC",
        yeolaMarket: "Yeola Market",
        shirdiMarket: "Shirdi Market",

        preferredLanguage: "Preferred Language",
        createAccount: "Create Account",
        alreadyAccount: "Already have an account?",

        dashboard: "Dashboard",
        weather: "Weather",
        marketPrices: "Market Prices",
        marketComparison: "Market Comparison",
        cropInformation: "Crop Information",
        cropHealth: "Crop Health",
        governmentSchemes: "Government Schemes",
        aiAssistant: "AI Assistant",
        voiceAssistance: "Voice Assistance",
        farmerProfile: "Farmer Profile",
        settings: "Settings",
        about: "About SmartAgri",
        logout: "Logout",

        online: "Online",
        offline: "Offline",
        connecting: "Connecting...",
        connectionStatus: "Connection Status",

        welcome: "Welcome",
        dashboardSubtitle:
            "Your farming information in one place.",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle:
            "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription:
            "Connected agricultural information is displayed here.",

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

        currentWeather: "Current Weather",
        refresh: "Refresh",

        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription:
            "Weather service is currently unavailable.",

        marketSubtitle:
            "Current crop prices from connected sources.",

        marketPriceTable: "Market Price Table",

        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",

        onion: "Onion",
        wheat: "Wheat",

        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription:
            "No market information is currently available.",

        dataUnavailable: "Data unavailable",

        comparisonSubtitle:
            "Compare market information before selling.",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onionInfo:
            "Information and guidance for onion cultivation.",

        wheatInfo:
            "Information and guidance for wheat cultivation.",

        cultivationGuidance: "Cultivation Guidance",
        cropManagement: "Crop Management",
        farmingPractices: "Farming Practices",

        cropHealthSubtitle:
            "Upload a crop image for AI-assisted analysis.",

        uploadCropImage: "Upload Crop / Leaf Image",
        uploadCropDescription:
            "Select an image for crop health analysis.",

        chooseImage: "Choose Image",
        analyzeCrop: "Analyze Crop",

        governmentSchemes: "Government Schemes",

        schemesSubtitle:
            "Farmer support and government agricultural programs.",

        learnMore: "Learn More",

        aiSubtitle:
            "Ask farming-related questions.",

        smartAssistant: "Smart Farmer Assistant",
        assistant: "Assistant",

        aiNotConnected: "AI Not Connected",

        aiUnavailable:
            "AI service is not connected yet.",

        askQuestion:
            "Ask a farming question...",

        aiConnectionNote:
            "AI responses require a connected AI service/backend.",

        voiceSubtitle:
            "Speak and listen in your preferred language.",

        voiceAssistance: "Voice Assistance",

        startVoice: "Start Voice Assistance",
        stopVoice: "Stop Listening",

        voiceInput: "Voice Input",
        voiceResponse: "Voice Response",

        voiceReady:
            "Voice assistance is ready.",

        profileSubtitle:
            "View and edit your farmer information.",

        saveChanges: "Save Changes",
        cancel: "Cancel",

        settingsSubtitle:
            "Manage your SmartAgri preferences.",

        notifications: "Notifications",

        aboutDescription:
            "SmartAgri provides agricultural information, market intelligence, crop guidance and digital farming assistance.",

        marketIntelligence: "Market Intelligence",
        multilingualSupport: "Multilingual Support"

    },


    hi: {

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri में प्रवेश करें",

        email: "ईमेल",
        password: "पासवर्ड",

        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        login: "लॉगिन",

        or: "या",
        demoDashboard: "डेमो डैशबोर्ड खोलें",

        noAccount: "खाता नहीं है?",
        register: "रजिस्टर करें",

        changeLanguage: "भाषा बदलें",

        registrationTitle: "किसान पंजीकरण",
        registrationSubtitle:
            "अपना SmartAgri किसान खाता बनाएं",

        fullName: "पूरा नाम",
        mobile: "मोबाइल नंबर",
        village: "गांव",
        state: "राज्य",
        landArea: "भूमि क्षेत्र",

        preferredMarket: "पसंदीदा बाजार",
        selectMarket: "बाजार चुनें",

        kopargaonMarket: "कोपरगांव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंदीदा भाषा",
        createAccount: "खाता बनाएं",
        alreadyAccount: "पहले से खाता है?",

        dashboard: "डैशबोर्ड",
        weather: "मौसम",
        marketPrices: "बाजार भाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "फसल जानकारी",
        cropHealth: "फसल स्वास्थ्य",
        governmentSchemes: "सरकारी योजनाएं",
        aiAssistant: "AI सहायक",
        voiceAssistance: "आवाज सहायता",
        farmerProfile: "किसान प्रोफाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",
        logout: "लॉगआउट",

        online: "ऑनलाइन",
        offline: "ऑफलाइन",
        connecting: "कनेक्ट हो रहा है...",
        connectionStatus: "कनेक्शन स्थिति",

        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी खेती की जानकारी एक ही स्थान पर।",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी इस्तेमाल करें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription:
            "कनेक्टेड कृषि जानकारी यहां दिखाई जाएगी।",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम जानकारी।",

        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription:
            "मौसम सेवा अभी उपलब्ध नहीं है।",

        marketSubtitle:
            "कनेक्टेड स्रोतों से वर्तमान फसल के भाव।",

        marketPriceTable: "बाजार भाव तालिका",

        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "दिनांक",

        onion: "प्याज",
        wheat: "गेहूं",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "बाजार की जानकारी अभी उपलब्ध नहीं है।",

        dataUnavailable: "डेटा उपलब्ध नहीं है",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onionInfo:
            "प्याज की खेती के लिए जानकारी और मार्गदर्शन।",

        wheatInfo:
            "गेहूं की खेती के लिए जानकारी और मार्गदर्शन।",

        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि पद्धतियां",

        cropHealthSubtitle:
            "AI सहायता के लिए फसल की तस्वीर अपलोड करें।",

        uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
        uploadCropDescription:
            "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",

        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

        learnMore: "और जानें",

        aiSubtitle:
            "कृषि से संबंधित प्रश्न पूछें।",

        smartAssistant: "स्मार्ट किसान सहायक",
        assistant: "सहायक",

        aiNotConnected: "AI कनेक्ट नहीं है",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्शन आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        startVoice: "आवाज सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज प्रतिक्रिया",

        voiceReady:
            "आवाज सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",

        notifications: "सूचनाएं",

        marketIntelligence: "बाजार जानकारी",
        multilingualSupport: "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करता है।"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",
        languageDescription:
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",

        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle: "SmartAgri मध्ये प्रवेश करा",

        email: "ईमेल",
        password: "पासवर्ड",

        rememberMe: "मला लक्षात ठेवा",
        forgotPassword: "पासवर्ड विसरलात?",
        login: "लॉगिन",

        or: "किंवा",
        demoDashboard: "डेमो डॅशबोर्ड उघडा",

        noAccount: "खाते नाही?",
        register: "नोंदणी करा",

        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle:
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
        mobile: "मोबाईल क्रमांक",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्र",

        preferredMarket: "पसंतीची बाजारपेठ",
        selectMarket: "बाजारपेठ निवडा",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंतीची भाषा",
        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीपासून खाते आहे?",

        dashboard: "डॅशबोर्ड",
        weather: "हवामान",
        marketPrices: "बाजारभाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पीक माहिती",
        cropHealth: "पीक आरोग्य",
        governmentSchemes: "सरकारी योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "आवाज सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",

        online: "ऑनलाइन",
        offline: "ऑफलाइन",
        connecting: "कनेक्ट होत आहे...",
        connectionStatus: "कनेक्शन स्थिती",

        welcome: "स्वागत आहे",
        dashboardSubtitle:
            "तुमची शेतीची माहिती एका ठिकाणी.",

        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle:
            "महत्त्वाची कृषी साधने त्वरीत वापरा.",

        liveDataTitle: "थेट माहिती",
        liveDataDescription:
            "कनेक्ट केलेली कृषी माहिती येथे दिसेल.",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        weatherUnavailable: "हवामान माहिती उपलब्ध नाही",
        weatherUnavailableDescription:
            "हवामान सेवा सध्या उपलब्ध नाही.",

        marketSubtitle:
            "कनेक्ट केलेल्या स्रोतांमधून सध्याचे पीक बाजारभाव.",

        marketPriceTable: "बाजारभाव तक्ता",

        market: "बाजारपेठ",
        crop: "पीक",
        price: "भाव",
        date: "दिनांक",

        onion: "कांदा",
        wheat: "गहू",

        marketDataUnavailable: "बाजार माहिती उपलब्ध नाही",
        marketDataUnavailableDescription:
            "बाजाराची माहिती सध्या उपलब्ध नाही.",

        dataUnavailable: "माहिती उपलब्ध नाही",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onionInfo:
            "कांदा लागवडीसाठी माहिती आणि मार्गदर्शन.",

        wheatInfo:
            "गहू लागवडीसाठी माहिती आणि मार्गदर्शन.",

        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle:
            "AI सहाय्यासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage: "फोटो निवडा",
        analyzeCrop: "पिकाचे विश्लेषण करा",

        schemesSubtitle:
            "शेतकऱ्यांसाठी सरकारी मदत आणि कृषी योजना.",

        learnMore: "अधिक माहिती",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
        assistant: "सहाय्यक",

        aiNotConnected: "AI कनेक्ट केलेले नाही",

        aiUnavailable:
            "AI सेवा अद्याप कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

        voiceSubtitle:
            "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",

        startVoice: "आवाज सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज प्रतिसाद",

        voiceReady:
            "आवाज सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle:
            "SmartAgri च्या पसंती व्यवस्थापित करा.",

        notifications: "सूचना",

        marketIntelligence: "बाजार माहिती",
        multilingualSupport: "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देते."

    }

};


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(key) {

    if (
        translations[currentLanguage] &&
        translations[currentLanguage][key]
    ) {
        return translations[currentLanguage][key];
    }

    if (translations.en[key]) {
        return translations.en[key];
    }

    return key;
}


/* =========================================================
   APPLY TRANSLATIONS
========================================================= */

function applyTranslations() {

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            const value = t(key);

            if (value) {
                element.textContent = value;
            }

        });


    document.querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder = t(key);

        });


    /*
     * Translate select options.
     */

    document.querySelectorAll("option[data-i18n]")
        .forEach(option => {

            const key = option.dataset.i18n;

            option.textContent = t(key);

        });


    /*
     * Keep all language selectors synchronized.
     */

    [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = currentLanguage;
        }

    });


    /*
     * Re-render dynamic market information.
     */

    if (window.lastMarketData) {
        renderMarketTable(window.lastMarketData);
    }

    if (window.lastComparisonData) {
        renderMarketComparison(window.lastComparisonData);
    }


    localStorage.setItem(
        "smartagriLanguage",
        currentLanguage
    );

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );

    applyTranslations();

    console.log(
        "Language changed to:",
        language
    );

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

document.addEventListener(
    "change",
    function (event) {

        const id = event.target.id;

        if (
            id === "dashboardLanguage" ||
            id === "settingsLanguage" ||
            id === "registerLanguage" ||
            id === "profileLanguage"
        ) {

            changeLanguage(
                event.target.value
            );

        }

    }
);


/* =========================================================
   INTERNET CONNECTION STATUS
========================================================= */

/*
 * IMPORTANT:
 *
 * navigator.onLine tells us whether the browser has
 * network connectivity.
 *
 * Firebase login is NOT the same thing as internet status.
 */

function updateConnectionStatus() {

    const online = navigator.onLine;

    const statusElements =
        document.querySelectorAll(
            "#connectionStatus"
        );

    statusElements.forEach(element => {

        const text =
            element.querySelector(
                "#connectionText"
            );

        element.classList.toggle(
            "online",
            online
        );

        element.classList.toggle(
            "offline",
            !online
        );

        if (text) {
            text.textContent =
                online
                    ? t("online")
                    : t("offline");
        }

    });


    const dashboardText =
        document.getElementById(
            "dashboardConnectionText"
        );

    if (dashboardText) {

        dashboardText.textContent =
            online
                ? t("online")
                : t("offline");

    }

}


/*
 * Browser network events
 */

window.addEventListener(
    "online",
    updateConnectionStatus
);

window.addEventListener(
    "offline",
    updateConnectionStatus
);


/*
 * Check immediately
 */

updateConnectionStatus();


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (firebaseReady && auth) {

    auth.onAuthStateChanged(
        function (user) {

            currentUser = user;

            if (user) {

                console.log(
                    "Firebase user:",
                    user.email
                );

                loadUserProfile(user);

            } else {

                console.log(
                    "No Firebase user logged in."
                );

            }

        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    const sideMenu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");

    if (sideMenu) {
        sideMenu.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}


/* =========================================================
   SECTION BUTTONS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-section]"
            );

        if (!button) {
            return;
        }

        const section =
            button.dataset.section;

        if (section) {
            showSection(section);
        }

    }
);


/* =========================================================
   SIDE MENU
========================================================= */

const hamburgerBtn =
    document.getElementById(
        "hamburgerBtn"
    );

const closeMenuBtn =
    document.getElementById(
        "closeMenuBtn"
    );

const sideMenu =
    document.getElementById(
        "sideMenu"
    );

const menuOverlay =
    document.getElementById(
        "menuOverlay"
    );


function openSideMenu() {

    if (sideMenu) {
        sideMenu.classList.add("open");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

}


function closeSideMenu() {

    if (sideMenu) {
        sideMenu.classList.remove("open");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

}


if (hamburgerBtn) {

    hamburgerBtn.addEventListener(
        "click",
        openSideMenu
    );

}


if (closeMenuBtn) {

    closeMenuBtn.addEventListener(
        "click",
        closeSideMenu
    );

}


if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeSideMenu
    );

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

const demoBtn =
    document.getElementById(
        "demoBtn"
    );

if (demoBtn) {

    demoBtn.addEventListener(
        "click",
        function () {

            document
                .getElementById("loginPage")
                ?.classList.remove(
                    "active-screen"
                );

            document
                .getElementById("dashboardPage")
                ?.classList.add(
                    "active"
                );

            showSection(
                "dashboardSection"
            );

            updateConnectionStatus();

        }
    );

}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

let selectedLanguage = null;

document.querySelectorAll(
    ".language-option"
).forEach(button => {

    button.addEventListener(
        "click",
        function () {

            document.querySelectorAll(
                ".language-option"
            ).forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });

            button.classList.add(
                "selected"
            );

            selectedLanguage =
                button.dataset.language;

            const continueButton =
                document.getElementById(
                    "continueLanguageBtn"
                );

            if (continueButton) {
                continueButton.disabled = false;
            }

        }
    );

});


const continueLanguageBtn =
    document.getElementById(
        "continueLanguageBtn"
    );

if (continueLanguageBtn) {

    continueLanguageBtn.addEventListener(
        "click",
        function () {

            if (!selectedLanguage) {
                return;
            }

            changeLanguage(
                selectedLanguage
            );

            document
                .getElementById(
                    "languagePage"
                )
                ?.classList.remove(
                    "active-screen"
                );

            document
                .getElementById(
                    "loginPage"
                )
                ?.classList.add(
                    "active-screen"
                );

        }
    );

}


/* =========================================================
   LOGIN / REGISTER PAGE NAVIGATION
========================================================= */

const showRegisterBtn =
    document.getElementById(
        "showRegisterBtn"
    );

const showLoginBtn =
    document.getElementById(
        "showLoginBtn"
    );


if (showRegisterBtn) {

    showRegisterBtn.addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "loginPage"
                )
                ?.classList.remove(
                    "active-screen"
                );

            document
                .getElementById(
                    "registerPage"
                )
                ?.classList.add(
                    "active-screen"
                );

        }
    );

}


if (showLoginBtn) {

    showLoginBtn.addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "registerPage"
                )
                ?.classList.remove(
                    "active-screen"
                );

            document
                .getElementById(
                    "loginPage"
                )
                ?.classList.add(
                    "active-screen"
                );

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (!firebaseReady || !auth) {

                message.textContent =
                    "Firebase is not available.";

                message.className =
                    "message error-message";

                return;

            }


            try {

                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );

                message.textContent =
                    "Login successful.";

                message.className =
                    "message success-message";

                openDashboard();

            } catch (error) {

                console.error(error);

                message.textContent =
                    getFirebaseErrorMessage(
                        error
                    );

                message.className =
                    "message error-message";

            }

        }
    );

}


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function getFirebaseErrorMessage(error) {

    const code =
        error?.code || "";

    const messages = {

        "auth/invalid-email":
            "Invalid email address.",

        "auth/user-not-found":
            "No account found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password must be at least 6 characters.",

        "auth/network-request-failed":
            "Network connection failed."

    };

    return messages[code] ||
        error?.message ||
        "An error occurred.";

}


/* =========================================================
   OPEN DASHBOARD
========================================================= */

function openDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboard) {

        dashboard.classList.add(
            "active"
        );

    }


    showSection(
        "dashboardSection"
    );

    updateConnectionStatus();

}


/* =========================================================
   REGISTRATION
========================================================= */

const registrationForm =
    document.getElementById(
        "registrationForm"
    );

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();

            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();

            const mobile =
                document.getElementById(
                    "registerMobile"
                ).value.trim();

            const village =
                document.getElementById(
                    "registerVillage"
                ).value.trim();

            const state =
                document.getElementById(
                    "registerState"
                ).value.trim();

            const landArea =
                document.getElementById(
                    "registerLandArea"
                ).value.trim();

            const market =
                document.getElementById(
                    "registerMarket"
                ).value;

            const language =
                document.getElementById(
                    "registerLanguage"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (!firebaseReady || !auth || !db) {

                message.textContent =
                    "Firebase is not available.";

                message.className =
                    "message error-message";

                return;

            }


            try {

                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );

                const user =
                    result.user;


                await db.collection("farmers")
                    .doc(user.uid)
                    .set({

                        uid: user.uid,

                        name: name,
                        email: email,
                        mobile: mobile,

                        village: village,
                        state: state,

                        landArea: landArea,

                        preferredMarket: market,

                        language: language,

                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    });


                message.textContent =
                    "Registration successful.";

                message.className =
                    "message success-message";


                setTimeout(
                    openDashboard,
                    500
                );


            } catch (error) {

                console.error(error);

                message.textContent =
                    getFirebaseErrorMessage(
                        error
                    );

                message.className =
                    "message error-message";

            }

        }
    );

}


/* =========================================================
   LOAD USER PROFILE
========================================================= */

async function loadUserProfile(user) {

    if (!user) {
        return;
    }

    let data = {

        name:
            user.displayName || "",

        email:
            user.email || "",

        mobile: "",
        village: "",
        state: "",
        landArea: "",
        preferredMarket: "",
        language: currentLanguage

    };


    if (db) {

        try {

            const snapshot =
                await db.collection("farmers")
                    .doc(user.uid)
                    .get();

            if (snapshot.exists) {

                data = {
                    ...data,
                    ...snapshot.data()
                };

            }

        } catch (error) {

            console.error(
                "Profile loading error:",
                error
            );

        }

    }


    fillProfile(data);

}


/* =========================================================
   FILL PROFILE
========================================================= */

function fillProfile(data) {

    const values = {

        headerFarmerName:
            data.name || "Farmer",

        dashboardFarmerName:
            data.name || "Farmer",

        summaryName:
            data.name || "—",

        summaryVillage:
            data.village || "—",

        summaryLand:
            data.landArea || "—",

        summaryMarket:
            data.preferredMarket || "—",

        profilePageName:
            data.name || "—",

        profilePageEmail:
            data.email || "—",

        profileName:
            data.name || "",

        profileEmail:
            data.email || "",

        profileMobile:
            data.mobile || "",

        profileVillage:
            data.village || "",

        profileState:
            data.state || "",

        profileLandArea:
            data.landArea || ""

    };


    Object.keys(values).forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value !== undefined
                ? element.value = values[id]
                : element.textContent = values[id];
        }

    });


    const market =
        document.getElementById(
            "profileMarket"
        );

    if (market) {
        market.value =
            data.preferredMarket || "";
    }


    const language =
        data.language || currentLanguage;

    changeLanguage(language);

}


/* =========================================================
   MARKET DATA
========================================================= */

window.lastMarketData = null;


/*
 * Translate crop names received from backend.
 */

function translateCropName(crop) {

    if (!crop) {
        return "—";
    }

    const value =
        String(crop).toLowerCase().trim();

    if (
        value.includes("onion") ||
        value.includes("कांदा") ||
        value.includes("प्याज")
    ) {
        return t("onion");
    }

    if (
        value.includes("wheat") ||
        value.includes("गहू") ||
        value.includes("गेहूं")
    ) {
        return t("wheat");
    }

    return crop;
}


/*
 * Translate market names received from backend.
 */

function translateMarketName(market) {

    if (!market) {
        return "—";
    }

    const value =
        String(market).toLowerCase().trim();


    if (
        value.includes("kopargaon") ||
        value.includes("कोपरगाव") ||
        value.includes("कोपरगांव")
    ) {
        return t("kopargaonMarket");
    }


    if (
        value.includes("yeola") ||
        value.includes("येवला")
    ) {
        return t("yeolaMarket");
    }


    if (
        value.includes("shirdi") ||
        value.includes("शिर्डी")
    ) {
        return t("shirdiMarket");
    }


    return market;
}


/* =========================================================
   RENDER MARKET TABLE
========================================================= */

function renderMarketTable(data) {

    window.lastMarketData = data;

    const body =
        document.getElementById(
            "marketTableBody"
        );

    if (!body) {
        return;
    }


    if (!Array.isArray(data) || data.length === 0) {

        body.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            ${t("marketDataUnavailable")}
                        </strong>

                        <p>
                            ${t("marketDataUnavailableDescription")}
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    body.innerHTML = data.map(item => {

        const market =
            item.market ||
            item.Market ||
            item.market_name ||
            "—";

        const crop =
            item.crop ||
            item.commodity ||
            item.Crop ||
            "—";

        const price =
            item.price ??
            item.modal_price ??
            item.modalPrice ??
            item.Price ??
            "—";

        const date =
            item.date ||
            item.arrival_date ||
            item.Date ||
            "—";


        return `

            <tr>

                <td>
                    ${translateMarketName(market)}
                </td>

                <td>
                    ${translateCropName(crop)}
                </td>

                <td>
                    ₹${price}
                </td>

                <td>
                    ${date}
                </td>

            </tr>

        `;

    }).join("");

}


/* =========================================================
   LOAD MARKET DATA
========================================================= */

async function loadMarketData() {

    const cropSelector =
        document.getElementById(
            "cropPriceSelector"
        );

    const crop =
        cropSelector?.value || "onion";


    const loading =
        document.getElementById(
            "marketLoading"
        );

    const error =
        document.getElementById(
            "marketError"
        );


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }

    if (error) {

        error.classList.add(
            "hidden"
        );

        error.textContent = "";

    }


    try {

        const response =
            await fetch(
                `/api/market?crop=${encodeURIComponent(crop)}`,
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {
            throw new Error(
                `Market API returned ${response.status}`
            );
        }


        const result =
            await response.json();


        const marketData =
            Array.isArray(result)
                ? result
                : (
                    result.data ||
                    result.market ||
                    result.prices ||
                    []
                );


        renderMarketTable(
            marketData
        );


        renderMarketComparison(
            marketData
        );


    } catch (err) {

        console.error(
            "Market API error:",
            err
        );


        /*
         * Do not say the user is offline.
         *
         * The user may have internet while
         * the Flask API is unavailable.
         */

        if (error) {

            error.textContent =
                "Market service is currently unavailable.";

            error.classList.remove(
                "hidden"
            );

        }


        renderMarketTable([]);

    } finally {

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }

    }

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

window.lastComparisonData = null;


function renderMarketComparison(data) {

    window.lastComparisonData = data;


    const cards =
        document.querySelectorAll(
            "[data-market-card]"
        );


    cards.forEach(card => {

        const marketName =
            card.dataset.marketCard;


        const matching =
            Array.isArray(data)
                ? data.find(item => {

                    const name =
                        item.market ||
                        item.Market ||
                        item.market_name ||
                        "";

                    return name
                        .toLowerCase()
                        .includes(
                            marketName
                                .split(" ")[0]
                                .toLowerCase()
                        );

                })
                : null;


        const price =
            card.querySelector(
                ".comparison-price"
            );

        const status =
            card.querySelector(
                ".comparison-status"
            );


        if (matching) {

            const value =
                matching.price ??
                matching.modal_price ??
                matching.modalPrice ??
                matching.Price;


            if (price) {
                price.textContent =
                    value !== undefined
                        ? `₹${value}`
                        : "—";
            }


            if (status) {
                status.textContent =
                    currentLanguage === "hi"
                        ? "उपलब्ध बाजार डेटा"
                        : currentLanguage === "mr"
                            ? "उपलब्ध बाजार माहिती"
                            : "Available market data";
            }

        } else {

            if (price) {
                price.textContent = "—";
            }

            if (status) {
                status.textContent =
                    t("dataUnavailable");
            }

        }

    });

}


/* =========================================================
   MARKET SELECTOR
========================================================= */

const cropPriceSelector =
    document.getElementById(
        "cropPriceSelector"
    );

if (cropPriceSelector) {

    cropPriceSelector.addEventListener(
        "change",
        loadMarketData
    );

}


/* =========================================================
   WEATHER
========================================================= */

async function loadWeather() {

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const error =
        document.getElementById(
            "weatherError"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const dataContainer =
        document.getElementById(
            "weatherData"
        );


    loading?.classList.remove(
        "hidden"
    );

    error?.classList.add(
        "hidden"
    );

    try {

        const response =
            await fetch(
                "/api/weather",
                {
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {
            throw new Error(
                `Weather API returned ${response.status}`
            );
        }


        const result =
            await response.json();


        const weather =
            result.data ||
            result.weather ||
            result;


        document.getElementById(
            "weatherTemperature"
        ).textContent =
            weather.temperature != null
                ? `${weather.temperature} °C`
                : "—";


        document.getElementById(
            "weatherHumidity"
        ).textContent =
            weather.humidity != null
                ? `${weather.humidity}%`
                : "—";


        document.getElementById(
            "weatherWind"
        ).textContent =
            weather.wind_speed != null
                ? `${weather.wind_speed} km/h`
                : weather.windSpeed != null
                    ? `${weather.windSpeed} km/h`
                    : "—";


        document.getElementById(
            "weatherRain"
        ).textContent =
            weather.rain_chance != null
                ? `${weather.rain_chance}%`
                : weather.rainChance != null
                    ? `${weather.rainChance}%`
                    : "—";


        empty?.classList.add(
            "hidden"
        );

        dataContainer?.classList.remove(
            "hidden"
        );


    } catch (err) {

        console.error(
            "Weather API error:",
            err
        );


        dataContainer?.classList.add(
            "hidden"
        );

        empty?.classList.remove(
            "hidden"
        );


        if (error) {

            error.textContent =
                "Weather service is currently unavailable.";

            error.classList.remove(
                "hidden"
            );

        }

    } finally {

        loading?.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   WEATHER REFRESH
========================================================= */

const refreshWeatherBtn =
    document.getElementById(
        "refreshWeatherBtn"
    );

if (refreshWeatherBtn) {

    refreshWeatherBtn.addEventListener(
        "click",
        loadWeather
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

const aiForm =
    document.getElementById(
        "aiForm"
    );


if (aiForm) {

    aiForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "aiInput"
                );

            const messages =
                document.getElementById(
                    "chatMessages"
                );


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


            try {

                const response =
                    await fetch(
                        "/api/ai",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    message:
                                        question,

                                    language:
                                        currentLanguage

                                })

                        }
                    );


                if (!response.ok) {
                    throw new Error(
                        "AI request failed"
                    );
                }


                const result =
                    await response.json();


                const answer =
                    result.response ||
                    result.answer ||
                    result.message ||
                    "No response received.";


                addChatMessage(
                    answer,
                    "assistant"
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                addChatMessage(
                    currentLanguage === "hi"
                        ? "AI सेवा अभी उपलब्ध नहीं है।"
                        : currentLanguage === "mr"
                            ? "AI सेवा सध्या उपलब्ध नाही."
                            : "AI service is currently unavailable.",
                    "assistant"
                );

            }

        }
    );

}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(
    text,
    type
) {

    const messages =
        document.getElementById(
            "chatMessages"
        );

    if (!messages) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        `chat-message ${type}-message`;


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${type === "assistant" ? "🤖" : "👨‍🌾"}
        </div>

        <div>

            <strong>
                ${
                    type === "assistant"
                        ? t("assistant")
                        : (
                            currentLanguage === "hi"
                                ? "आप"
                                : currentLanguage === "mr"
                                    ? "तुम्ही"
                                    : "You"
                        )
                }
            </strong>

            <p></p>

        </div>

    `;


    wrapper.querySelector(
        "p"
    ).textContent = text;


    messages.appendChild(
        wrapper
    );


    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================================
   CROP INFORMATION
========================================================= */

const cropInformation = {

    onion: {

        icon: "🧅",

        cultivation: {

            title: {
                en: "Onion Cultivation Guidance",
                hi: "प्याज खेती मार्गदर्शन",
                mr: "कांदा लागवड मार्गदर्शन"
            },

            subtitle: {
                en: "Important steps for growing onion successfully.",
                hi: "प्याज की सफल खेती के लिए महत्वपूर्ण जानकारी।",
                mr: "कांद्याच्या यशस्वी लागवडीसाठी महत्त्वाची माहिती."
            },

            content: {

                en: `
                    <h3>🌱 Land Preparation</h3>
                    <p>Prepare a fine, well-drained soil bed. Onion performs best in loose soil with good drainage.</p>

                    <h3>🌱 Planting</h3>
                    <p>Use healthy seedlings or suitable planting material and maintain proper spacing.</p>

                    <h3>💧 Irrigation</h3>
                    <p>Maintain suitable soil moisture and avoid waterlogging.</p>

                    <h3>☀️ Field Conditions</h3>
                    <p>Provide adequate sunlight and good air movement.</p>
                `,

                hi: `
                    <h3>🌱 भूमि की तैयारी</h3>
                    <p>भुरभुरी और अच्छी जल निकासी वाली मिट्टी तैयार करें।</p>

                    <h3>🌱 रोपाई</h3>
                    <p>स्वस्थ पौधों का उपयोग करें और उचित दूरी बनाए रखें।</p>

                    <h3>💧 सिंचाई</h3>
                    <p>मिट्टी में उचित नमी बनाए रखें और जलभराव से बचें।</p>

                    <h3>☀️ खेत की स्थिति</h3>
                    <p>पर्याप्त धूप और हवा का संचार सुनिश्चित करें।</p>
                `,

                mr: `
                    <h3>🌱 जमिनीची तयारी</h3>
                    <p>भुसभुशीत आणि चांगला निचरा होणारी जमीन तयार करा.</p>

                    <h3>🌱 लागवड</h3>
                    <p>निरोगी रोपे वापरा आणि योग्य अंतर ठेवा.</p>

                    <h3>💧 सिंचन</h3>
                    <p>जमिनीत योग्य ओलावा ठेवा आणि पाणी साचू देऊ नका.</p>

                    <h3>☀️ शेताची परिस्थिती</h3>
                    <p>पुरेसा सूर्यप्रकाश आणि हवा खेळती राहील याची काळजी घ्या.</p>
                `

            }

        },

        management: {

            title: {
                en: "Onion Crop Management",
                hi: "प्याज फसल प्रबंधन",
                mr: "कांदा पीक व्यवस्थापन"
            },

            subtitle: {
                en: "Manage the crop throughout its growing period.",
                hi: "पूरे फसल चक्र के दौरान फसल का प्रबंधन करें।",
                mr: "संपूर्ण वाढीच्या काळात पिकाचे व्यवस्थापन करा."
            },

            content: {

                en: `
                    <h3>💧 Water Management</h3>
                    <p>Maintain consistent soil moisture during bulb development.</p>

                    <h3>🌿 Weed Management</h3>
                    <p>Keep the field free from weeds to reduce competition.</p>

                    <h3>🧪 Nutrient Management</h3>
                    <p>Apply nutrients according to soil conditions and recommendations.</p>

                    <h3>🔍 Crop Monitoring</h3>
                    <p>Regularly inspect plants for pests, diseases and abnormal growth.</p>
                `,

                hi: `
                    <h3>💧 जल प्रबंधन</h3>
                    <p>कंद विकास के दौरान मिट्टी में उचित नमी बनाए रखें।</p>

                    <h3>🌿 खरपतवार प्रबंधन</h3>
                    <p>खेत को खरपतवार से मुक्त रखें।</p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>
                    <p>मिट्टी की स्थिति के अनुसार पोषक तत्वों का उपयोग करें।</p>

                    <h3>🔍 फसल निरीक्षण</h3>
                    <p>कीट, रोग और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>
                `,

                mr: `
                    <h3>💧 पाणी व्यवस्थापन</h3>
                    <p>कंद वाढीच्या काळात जमिनीत योग्य ओलावा ठेवा.</p>

                    <h3>🌿 तण व्यवस्थापन</h3>
                    <p>तणांपासून शेत स्वच्छ ठेवा.</p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                    <p>जमिनीच्या स्थितीनुसार योग्य अन्नद्रव्ये द्या.</p>

                    <h3>🔍 पीक निरीक्षण</h3>
                    <p>किडी, रोग आणि असामान्य वाढीसाठी नियमित निरीक्षण करा.</p>
                `

            }

        },

        practices: {

            title: {
                en: "Onion Farming Practices",
                hi: "प्याज की कृषि पद्धतियां",
                mr: "कांदा शेती पद्धती"
            },

            subtitle: {
                en: "Practical recommendations for better crop production.",
                hi: "बेहतर उत्पादन के लिए व्यावहारिक सुझाव।",
                mr: "चांगल्या उत्पादनासाठी व्यावहारिक सूचना."
            },

            content: {

                en: `
                    <h3>🚜 Field Hygiene</h3>
                    <p>Remove diseased plant material and maintain clean cultivation areas.</p>

                    <h3>🌱 Healthy Planting Material</h3>
                    <p>Use healthy, disease-free planting material.</p>

                    <h3>🔄 Crop Rotation</h3>
                    <p>Avoid repeatedly growing the same crop in the same field when possible.</p>

                    <h3>📦 Harvest Management</h3>
                    <p>Harvest mature bulbs and cure them properly before storage.</p>
                `,

                hi: `
                    <h3>🚜 खेत की स्वच्छता</h3>
                    <p>रोगग्रस्त पौधों को हटाएं और खेत को साफ रखें।</p>

                    <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                    <p>स्वस्थ और रोगमुक्त रोपण सामग्री का उपयोग करें।</p>

                    <h3>🔄 फसल चक्र</h3>
                    <p>संभव हो तो एक ही फसल को बार-बार एक ही खेत में न उगाएं।</p>

                    <h3>📦 कटाई प्रबंधन</h3>
                    <p>परिपक्व कंदों की कटाई करें और भंडारण से पहले उचित उपचार करें।</p>
                `,

                mr: `
                    <h3>🚜 शेत स्वच्छता</h3>
                    <p>रोगट झाडे काढून टाका आणि शेत स्वच्छ ठेवा.</p>

                    <h3>🌱 निरोगी लागवड साहित्य</h3>
                    <p>निरोगी आणि रोगमुक्त लागवड साहित्य वापरा.</p>

                    <h3>🔄 पीक फेरपालट</h3>
                    <p>शक्य असल्यास एकाच पिकाची वारंवार त्याच शेतात लागवड टाळा.</p>

                    <h3>📦 काढणी व्यवस्थापन</h3>
                    <p>परिपक्व कांद्याची काढणी करा आणि साठवणुकीपूर्वी योग्य प्रक्रिया करा.</p>
                `

            }

        }

    },


    wheat: {

        icon: "🌾",

        cultivation: {

            title: {
                en: "Wheat Cultivation Guidance",
                hi: "गेहूं खेती मार्गदर्शन",
                mr: "गहू लागवड मार्गदर्शन"
            },

            subtitle: {
                en: "Important steps for successful wheat production.",
                hi: "गेहूं की सफल खेती के लिए महत्वपूर्ण जानकारी।",
                mr: "गव्हाच्या यशस्वी लागवडीसाठी महत्त्वाची माहिती."
            },

            content: {

                en: `
                    <h3>🌱 Soil Preparation</h3>
                    <p>Prepare a well-levelled seedbed with suitable soil moisture.</p>

                    <h3>🌾 Seed Selection</h3>
                    <p>Use healthy wheat seed suitable for your growing region.</p>

                    <h3>💧 Irrigation</h3>
                    <p>Irrigate according to crop stage, soil moisture and weather.</p>

                    <h3>☀️ Crop Conditions</h3>
                    <p>Maintain suitable growing conditions with adequate sunlight.</p>
                `,

                hi: `
                    <h3>🌱 मिट्टी की तैयारी</h3>
                    <p>समतल और उचित नमी वाली बुवाई की क्यारी तैयार करें।</p>

                    <h3>🌾 बीज चयन</h3>
                    <p>अपने क्षेत्र के लिए उपयुक्त स्वस्थ गेहूं के बीज का उपयोग करें।</p>

                    <h3>💧 सिंचाई</h3>
                    <p>फसल अवस्था और मिट्टी की नमी के अनुसार सिंचाई करें।</p>

                    <h3>☀️ फसल की स्थिति</h3>
                    <p>पर्याप्त धूप और उपयुक्त बढ़वार की स्थिति रखें।</p>
                `,

                mr: `
                    <h3>🌱 जमिनीची तयारी</h3>
                    <p>समतल आणि योग्य ओलावा असलेली पेरणीची जमीन तयार करा.</p>

                    <h3>🌾 बियाणे निवड</h3>
                    <p>तुमच्या भागासाठी योग्य आणि निरोगी गव्हाचे बियाणे वापरा.</p>

                    <h3>💧 सिंचन</h3>
                    <p>पिकाची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार पाणी द्या.</p>

                    <h3>☀️ पिकाची परिस्थिती</h3>
                    <p>पुरेसा सूर्यप्रकाश आणि योग्य वाढीची परिस्थिती ठेवा.</p>
                `

            }

        },

        management: {

            title: {
                en: "Wheat Crop Management",
                hi: "गेहूं फसल प्रबंधन",
                mr: "गहू पीक व्यवस्थापन"
            },

            subtitle: {
                en: "Manage wheat from germination to harvest.",
                hi: "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",
                mr: "उगवण ते काढणीपर्यंत गव्हाचे व्यवस्थापन करा."
            },

            content: {

                en: `
                    <h3>💧 Irrigation Management</h3>
                    <p>Pay attention to irrigation during important crop growth stages.</p>

                    <h3>🌿 Weed Control</h3>
                    <p>Monitor the field and use appropriate weed-management practices.</p>

                    <h3>🔍 Pest Monitoring</h3>
                    <p>Inspect the crop for insects, diseases and abnormal growth.</p>

                    <h3>🧪 Nutrient Management</h3>
                    <p>Apply fertilizers based on soil testing and crop requirements.</p>
                `,

                hi: `
                    <h3>💧 सिंचाई प्रबंधन</h3>
                    <p>फसल की महत्वपूर्ण अवस्थाओं में सिंचाई पर विशेष ध्यान दें।</p>

                    <h3>🌿 खरपतवार नियंत्रण</h3>
                    <p>खेत में खरपतवार की निगरानी करें और उचित नियंत्रण अपनाएं।</p>

                    <h3>🔍 कीट निगरानी</h3>
                    <p>कीट, रोग और असामान्य वृद्धि के लिए फसल का निरीक्षण करें।</p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>
                    <p>मिट्टी परीक्षण और फसल की आवश्यकता के आधार पर खाद दें।</p>
                `,

                mr: `
                    <h3>💧 सिंचन व्यवस्थापन</h3>
                    <p>पिकाच्या महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे लक्ष द्या.</p>

                    <h3>🌿 तण नियंत्रण</h3>
                    <p>शेतातील तणांची पाहणी करा आणि योग्य नियंत्रण पद्धती वापरा.</p>

                    <h3>🔍 किडींचे निरीक्षण</h3>
                    <p>किडी, रोग आणि असामान्य वाढीसाठी पिकाची पाहणी करा.</p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                    <p>माती परीक्षण आणि पिकाच्या गरजेनुसार खतांचा वापर करा.</p>
                `

            }

        },

        practices: {

            title: {
                en: "Wheat Farming Practices",
                hi: "गेहूं की कृषि पद्धतियां",
                mr: "गहू शेती पद्धती"
            },

            subtitle: {
                en: "Practical methods for maintaining a healthy wheat crop.",
                hi: "स्वस्थ गेहूं फसल के लिए व्यावहारिक तरीके।",
                mr: "निरोगी गहू पिकासाठी व्यावहारिक पद्धती."
            },

            content: {

                en: `
                    <h3>🌱 Timely Sowing</h3>
                    <p>Follow the locally recommended sowing window.</p>

                    <h3>🚜 Field Preparation</h3>
                    <p>Maintain a level and properly prepared seedbed.</p>

                    <h3>🔄 Crop Rotation</h3>
                    <p>Crop rotation can improve soil management and reduce recurring problems.</p>

                    <h3>🌾 Harvesting</h3>
                    <p>Harvest when the crop reaches appropriate maturity.</p>
                `,

                hi: `
                    <h3>🌱 समय पर बुवाई</h3>
                    <p>अपने क्षेत्र में अनुशंसित बुवाई समय का पालन करें।</p>

                    <h3>🚜 खेत की तैयारी</h3>
                    <p>समतल और अच्छी तरह तैयार बुवाई की क्यारी रखें।</p>

                    <h3>🔄 फसल चक्र</h3>
                    <p>फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है।</p>

                    <h3>🌾 कटाई</h3>
                    <p>उचित परिपक्वता पर फसल की कटाई करें।</p>
                `,

                mr: `
                    <h3>🌱 वेळेवर पेरणी</h3>
                    <p>तुमच्या भागासाठी शिफारस केलेल्या पेरणीच्या कालावधीचे पालन करा.</p>

                    <h3>🚜 शेताची तयारी</h3>
                    <p>समतल आणि योग्य प्रकारे तयार केलेली पेरणीची जमीन ठेवा.</p>

                    <h3>🔄 पीक फेरपालट</h3>
                    <p>पीक फेरपालट माती व्यवस्थापन सुधारण्यास मदत करू शकते.</p>

                    <h3>🌾 काढणी</h3>
                    <p>पीक योग्य परिपक्वतेला पोहोचल्यावर काढणी करा.</p>
                `

            }

        }

    }

};


/* =========================================================
   CROP MODAL
========================================================= */

function openCropInfo(
    crop,
    topic
) {

    const modal =
        document.getElementById(
            "cropInfoModal"
        );

    const data =
        cropInformation[crop]?.[topic];


    if (!modal || !data) {
        return;
    }


    document.getElementById(
        "cropInfoModalIcon"
    ).textContent =
        cropInformation[crop].icon;


    document.getElementById(
        "cropInfoModalTitle"
    ).textContent =
        data.title[currentLanguage] ||
        data.title.en;


    document.getElementById(
        "cropInfoModalSubtitle"
    ).textContent =
        data.subtitle[currentLanguage] ||
        data.subtitle.en;


    document.getElementById(
        "cropInfoModalBody"
    ).innerHTML =
        data.content[currentLanguage] ||
        data.content.en;


    modal.classList.remove(
        "hidden"
    );

    document.body.classList.add(
        "modal-open"
    );

}


document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".crop-info-button"
            );

        if (!button) {
            return;
        }

        openCropInfo(
            button.dataset.crop,
            button.dataset.topic
        );

    }
);


/* =========================================================
   CLOSE CROP MODAL
========================================================= */

function closeCropModal() {

    const modal =
        document.getElementById(
            "cropInfoModal"
        );

    modal?.classList.add(
        "hidden"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


document.getElementById(
    "closeCropInfoBtn"
)?.addEventListener(
    "click",
    closeCropModal
);


document.getElementById(
    "cropInfoModalOverlay"
)?.addEventListener(
    "click",
    closeCropModal
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeCropModal();

        }

    }
);


/* =========================================================
   GOVERNMENT SCHEME BUTTONS
========================================================= */

document.querySelectorAll(
    ".scheme-button"
).forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const url =
                button.dataset.schemeUrl;

            if (url) {
                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
            }

        }
    );

});


/* =========================================================
   PROFILE MENU
========================================================= */

const profileButton =
    document.getElementById(
        "profileButton"
    );

const profileMenu =
    document.getElementById(
        "profileMenu"
    );


if (profileButton) {

    profileButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            profileMenu?.classList.toggle(
                "open"
            );

        }
    );

}


document.addEventListener(
    "click",
    function () {

        profileMenu?.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (auth) {
            await auth.signOut();
        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    document
        .getElementById(
            "dashboardPage"
        )
        ?.classList.remove(
            "active"
        );


    document
        .getElementById(
            "loginPage"
        )
        ?.classList.add(
            "active-screen"
        );

}


document.getElementById(
    "sideLogoutBtn"
)?.addEventListener(
    "click",
    logoutUser
);


document.getElementById(
    "profileLogoutBtn"
)?.addEventListener(
    "click",
    logoutUser
);


/* =========================================================
   PROFILE EDIT
========================================================= */

const editProfileBtn =
    document.getElementById(
        "editProfileBtn"
    );

const profileEditActions =
    document.getElementById(
        "profileEditActions"
    );


if (editProfileBtn) {

    editProfileBtn.addEventListener(
        "click",
        function () {

            [
                "profileName",
                "profileMobile",
                "profileVillage",
                "profileState",
                "profileLandArea",
                "profileMarket",
                "profileLanguage"
            ].forEach(id => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.disabled = false;
                }

            });


            profileEditActions?.classList.remove(
                "hidden"
            );

        }
    );

}


/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

document.getElementById(
    "cancelProfileEditBtn"
)?.addEventListener(
    "click",
    function () {

        [
            "profileName",
            "profileMobile",
            "profileVillage",
            "profileState",
            "profileLandArea",
            "profileMarket",
            "profileLanguage"
        ].forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.disabled = true;
            }

        });


        profileEditActions?.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   PROFILE SAVE
========================================================= */

document.getElementById(
    "profileForm"
)?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        if (!currentUser || !db) {
            return;
        }


        const data = {

            name:
                document.getElementById(
                    "profileName"
                ).value,

            mobile:
                document.getElementById(
                    "profileMobile"
                ).value,

            village:
                document.getElementById(
                    "profileVillage"
                ).value,

            state:
                document.getElementById(
                    "profileState"
                ).value,

            landArea:
                document.getElementById(
                    "profileLandArea"
                ).value,

            preferredMarket:
                document.getElementById(
                    "profileMarket"
                ).value,

            language:
                document.getElementById(
                    "profileLanguage"
                ).value

        };


        try {

            await db.collection(
                "farmers"
            )
            .doc(currentUser.uid)
            .set(
                data,
                {
                    merge: true
                }
            );


            fillProfile({
                ...data,
                email:
                    currentUser.email
            });


            profileEditActions?.classList.add(
                "hidden"
            );


            [
                "profileName",
                "profileMobile",
                "profileVillage",
                "profileState",
                "profileLandArea",
                "profileMarket",
                "profileLanguage"
            ].forEach(id => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.disabled = true;
                }

            });


            const message =
                document.getElementById(
                    "profileMessage"
                );

            if (message) {

                message.textContent =
                    currentLanguage === "hi"
                        ? "प्रोफाइल सफलतापूर्वक अपडेट हुई।"
                        : currentLanguage === "mr"
                            ? "प्रोफाइल यशस्वीरित्या अपडेट झाली."
                            : "Profile updated successfully.";

                message.className =
                    "message success-message";

            }


        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );

        }

    }
);


/* =========================================================
   IMAGE PREVIEW
========================================================= */

const cropImageInput =
    document.getElementById(
        "cropImageInput"
    );

const cropImagePreview =
    document.getElementById(
        "cropImagePreview"
    );

const imagePreviewContainer =
    document.getElementById(
        "imagePreviewContainer"
    );

const analyzeCropBtn =
    document.getElementById(
        "analyzeCropBtn"
    );


if (cropImageInput) {

    cropImageInput.addEventListener(
        "change",
        function () {

            const file =
                cropImageInput.files?.[0];

            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    cropImagePreview.src =
                        event.target.result;

                    imagePreviewContainer
                        ?.classList.remove(
                            "hidden"
                        );

                    if (analyzeCropBtn) {
                        analyzeCropBtn.disabled =
                            false;
                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Apply language immediately.
         */

        applyTranslations();


        /*
         * Update internet status.
         */

        updateConnectionStatus();


        /*
         * Load market data.
         */

        loadMarketData();


        /*
         * Load weather data.
         */

        loadWeather();


        console.log(
            "SmartAgri initialized."
        );

    }
);
