/* =========================================================
   SMARTAGRI
   COMPLETE FRONTEND JAVASCRIPT
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
   FIREBASE INITIALIZATION
========================================================= */

let auth = null;
let db = null;

try {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentUser = null;
let currentFarmerData = null;
let selectedLanguage = "en";

const API_BASE_URL = "";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        appName: "SmartAgri",
        appTagline: "Smart Agriculture Market Intelligence System",

        chooseLanguage: "Choose Your Language",
        languageDescription: "Select your preferred language to continue.",
        continue: "Continue",

        loginTitle: "Farmer Login",
        loginSubtitle: "Login to access SmartAgri",

        email: "Email",
        password: "Password",
        mobile: "Mobile Number",
        rememberMe: "Remember Me",
        forgotPassword: "Forgot Password?",
        login: "Login",
        or: "OR",
        demoDashboard: "Enter Demo Dashboard",
        noAccount: "Don't have an account?",
        register: "Register",
        changeLanguage: "Change Language",

        registrationTitle: "Farmer Registration",
        registrationSubtitle: "Create your SmartAgri farmer account",

        fullName: "Full Name",
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
        myProfile: "My Profile",

        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",
        connectionStatus: "Connection Status",
        offline: "Offline",
        online: "Online",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription: "Connected data is displayed from the SmartAgri backend.",

        weatherSubtitle: "Local weather conditions for farming decisions.",
        currentWeather: "Current Weather",
        refresh: "Refresh",
        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription: "Weather service could not provide data.",

        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        marketSubtitle: "Current crop prices from connected sources.",
        marketPriceTable: "Market Price Table",

        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",

        onion: "Onion",
        wheat: "Wheat",

        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription: "Market service could not provide data.",

        comparisonSubtitle: "Compare market information before selling.",
        dataUnavailable: "Verified data unavailable",

        cropSubtitle: "Cultivation and crop management guidance.",
        onionInfo: "Onion cultivation information.",
        wheatInfo: "Wheat cultivation information.",
        cultivationGuidance: "Cultivation Guidance",
        cropManagement: "Crop Management",
        farmingPractices: "Farming Practices",

        cropHealthSubtitle: "Upload a crop image for AI-assisted analysis.",
        uploadCropImage: "Upload Crop / Leaf Image",
        uploadCropDescription: "Select an image for crop health analysis.",
        chooseImage: "Choose Image",
        analyzeCrop: "Analyze Crop",
        analysisNotConnected: "AI crop analysis is not connected",
        analysisNotConnectedDescription: "Connect the crop-health backend to analyze the image.",

        schemesSubtitle: "Farmer support and government agricultural programs.",
        pmKisanDescription: "Official PM-KISAN farmer support information.",
        pmksyDescription: "Official irrigation and water-management information.",
        cropInsurance: "Crop Insurance",
        cropInsuranceDescription: "Official Pradhan Mantri Fasal Bima Yojana information.",
        learnMore: "Learn More",

        aiSubtitle: "Ask farming-related questions.",
        smartAssistant: "Smart Farmer Assistant",
        assistant: "Assistant",
        aiUnavailable: "AI service is not connected yet.",
        aiNotConnected: "AI Not Connected",
        aiConnected: "AI Connected",
        aiConnectionNote: "AI responses are provided through the SmartAgri backend.",
        askQuestion: "Ask a farming question...",

        voiceSubtitle: "Speak and listen in your preferred language.",
        voiceAssistantTitle: "Smart Voice Assistance",
        voiceDescription: "Speak using your device microphone.",
        startVoice: "Start Voice Assistance",
        stopVoice: "Stop Listening",
        voiceInput: "Voice Input",
        voiceResponse: "Voice Response",
        voiceReady: "Voice assistance is ready.",
        voiceNotSupported: "Voice recognition is not supported in this browser.",

        profileSubtitle: "View and edit your farmer information.",
        saveChanges: "Save Changes",
        cancel: "Cancel",

        settingsSubtitle: "Manage your SmartAgri preferences.",
        changeLanguageDescription: "Select your preferred application language.",
        voiceSettingDescription: "Enable or disable voice assistance.",
        notifications: "Notifications",
        notificationDescription: "Enable or disable application notifications.",

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        marketIntelligence: "Market Intelligence",
        multilingualSupport: "Multilingual Support"

    },


    hi: {

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार इंटेलिजेंस सिस्टम",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri में लॉगिन करें",

        email: "ईमेल",
        password: "पासवर्ड",
        mobile: "मोबाइल नंबर",
        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        login: "लॉगिन",
        or: "या",
        demoDashboard: "डेमो डैशबोर्ड खोलें",
        noAccount: "खाता नहीं है?",
        register: "रजिस्टर करें",
        changeLanguage: "भाषा बदलें",

        registrationTitle: "किसान पंजीकरण",
        registrationSubtitle: "अपना SmartAgri किसान खाता बनाएं",

        fullName: "पूरा नाम",
        village: "गांव",
        state: "राज्य",
        landArea: "भूमि क्षेत्र",
        preferredMarket: "पसंदीदा बाजार",
        selectMarket: "बाजार चुनें",
        kopargaonMarket: "कोपरगांव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिरडी बाजार",
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
        voiceAssistance: "वॉयस सहायता",
        farmerProfile: "किसान प्रोफाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",
        logout: "लॉगआउट",
        myProfile: "मेरी प्रोफाइल",

        welcome: "स्वागत है",
        dashboardSubtitle: "आपकी कृषि जानकारी एक ही जगह।",
        connectionStatus: "कनेक्शन स्थिति",
        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "SmartAgri बैकएंड से कनेक्टेड डेटा दिखाया जाता है।",

        weatherSubtitle: "कृषि निर्णयों के लिए स्थानीय मौसम जानकारी।",
        currentWeather: "वर्तमान मौसम",
        refresh: "रीफ्रेश",
        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं",
        weatherUnavailableDescription: "मौसम सेवा डेटा प्रदान नहीं कर सकी।",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle: "कनेक्टेड स्रोतों से वर्तमान फसल भाव।",
        marketPriceTable: "बाजार भाव तालिका",

        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "तारीख",

        onion: "प्याज",
        wheat: "गेहूं",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं",
        marketDataUnavailableDescription: "बाजार सेवा डेटा प्रदान नहीं कर सकी।",

        comparisonSubtitle: "बेचने से पहले बाजार भाव की तुलना करें।",
        dataUnavailable: "डेटा उपलब्ध नहीं",

        cropSubtitle: "फसल उत्पादन और प्रबंधन मार्गदर्शन।",
        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",
        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि अभ्यास",

        cropHealthSubtitle: "AI सहायता के लिए फसल की तस्वीर अपलोड करें।",
        uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
        uploadCropDescription: "फसल स्वास्थ्य जांच के लिए तस्वीर चुनें।",
        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

        aiSubtitle: "कृषि से जुड़े सवाल पूछें।",
        smartAssistant: "स्मार्ट किसान सहायक",
        assistant: "सहायक",
        aiUnavailable: "AI सेवा अभी कनेक्ट नहीं है.",
        aiNotConnected: "AI कनेक्ट नहीं है",
        aiConnected: "AI कनेक्टेड है",
        askQuestion: "कृषि से जुड़ा सवाल पूछें...",

        voiceSubtitle: "अपनी पसंदीदा भाषा में बोलें और सुनें।",
        voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
        voiceDescription: "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",
        startVoice: "वॉयस सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",
        voiceInput: "वॉयस इनपुट",
        voiceResponse: "वॉयस उत्तर",
        voiceReady: "वॉयस सहायता तैयार है।",

        profileSubtitle: "किसान जानकारी देखें और संपादित करें।",
        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle: "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
        changeLanguageDescription: "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
        voiceSettingDescription: "वॉयस सहायता चालू या बंद करें।",
        notifications: "सूचनाएं",
        notificationDescription: "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        marketIntelligence: "बाजार इंटेलिजेंस",
        multilingualSupport: "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार इंटेलिजेंस, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "आपली भाषा निवडा",
        languageDescription: "पुढे जाण्यासाठी आपली पसंतीची भाषा निवडा.",
        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle: "SmartAgri मध्ये लॉगिन करा",

        email: "ईमेल",
        password: "पासवर्ड",
        mobile: "मोबाईल नंबर",
        rememberMe: "मला लक्षात ठेवा",
        forgotPassword: "पासवर्ड विसरलात?",
        login: "लॉगिन",
        or: "किंवा",
        demoDashboard: "डेमो डॅशबोर्ड उघडा",
        noAccount: "खाते नाही?",
        register: "नोंदणी करा",
        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle: "आपले SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
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
        alreadyAccount: "आधीच खाते आहे?",

        dashboard: "डॅशबोर्ड",
        weather: "हवामान",
        marketPrices: "बाजारभाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पीक माहिती",
        cropHealth: "पीक आरोग्य",
        governmentSchemes: "सरकारी योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "व्हॉइस सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",
        myProfile: "माझी प्रोफाइल",

        welcome: "स्वागत",
        dashboardSubtitle: "आपली शेतीची माहिती एका ठिकाणी.",
        connectionStatus: "कनेक्शन स्थिती",
        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        profileSummary: "आपली नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची कृषी साधने त्वरीत उघडा.",

        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription: "SmartAgri बॅकएंडमधून जोडलेला डेटा दाखवला जातो.",

        weatherSubtitle: "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",
        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",
        weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
        weatherUnavailableDescription: "हवामान सेवा डेटा देऊ शकली नाही.",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle: "जोडलेल्या स्रोतांमधून सध्याचे पीक बाजारभाव.",
        marketPriceTable: "बाजारभाव तक्ता",

        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",

        onion: "कांदा",
        wheat: "गहू",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
        marketDataUnavailableDescription: "बाजार सेवा डेटा देऊ शकली नाही.",

        comparisonSubtitle: "विक्रीपूर्वी बाजारभावाची तुलना करा.",
        dataUnavailable: "डेटा उपलब्ध नाही",

        cropSubtitle: "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
        onionInfo: "कांदा लागवडीची माहिती.",
        wheatInfo: "गहू लागवडीची माहिती.",
        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle: "AI सहाय्यासाठी पिकाचा फोटो अपलोड करा.",
        uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
        uploadCropDescription: "पीक आरोग्य तपासणीसाठी फोटो निवडा.",
        chooseImage: "फोटो निवडा",
        analyzeCrop: "पीक तपासा",

        aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
        assistant: "सहाय्यक",
        aiUnavailable: "AI सेवा अद्याप जोडलेली नाही.",
        aiNotConnected: "AI जोडलेले नाही",
        aiConnected: "AI जोडलेले आहे",
        askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",

        voiceSubtitle: "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",
        voiceAssistantTitle: "स्मार्ट व्हॉइस सहाय्य",
        voiceDescription: "आपल्या डिव्हाइसचा मायक्रोफोन वापरा.",
        startVoice: "व्हॉइस सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",
        voiceInput: "व्हॉइस इनपुट",
        voiceResponse: "व्हॉइस उत्तर",
        voiceReady: "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle: "आपली शेतकरी माहिती पहा आणि संपादित करा.",
        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle: "SmartAgri प्राधान्ये व्यवस्थापित करा.",
        changeLanguageDescription: "आपली पसंतीची अ‍ॅप भाषा निवडा.",
        voiceSettingDescription: "व्हॉइस सहाय्य सुरू किंवा बंद करा.",
        notifications: "सूचना",
        notificationDescription: "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence: "बाजार माहिती",
        multilingualSupport: "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."

    }

};


/* =========================================================
   DOM HELPER
========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   SAFE TEXT
========================================================= */

function safeText(value, fallback = "—") {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return fallback;
    }

    return String(value);

}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartagri_language",
        language
    );

    document.documentElement.lang = language;

    const dictionary = translations[language];

    document.querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (dictionary[key]) {
                element.textContent =
                    dictionary[key];
            }

        });


    document.querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (dictionary[key]) {
                element.placeholder =
                    dictionary[key];
            }

        });


    syncLanguageSelectors(language);
}


function syncLanguageSelectors(language) {

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("registerLanguage"),
        $("profileLanguage")

    ];

    selectors.forEach(select => {

        if (select) {
            select.value = language;
        }

    });

}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });

    const target =
        $(screenId);

    if (target) {

        target.classList.add(
            "active-screen"
        );

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function showDashboard() {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });

    $("dashboardPage")
        ?.classList.add("active-screen");

    document.body.classList.add(
        "dashboard-active"
    );

    showSection("dashboardSection");

    loadFarmerIntoDashboard();

}


function hideDashboard() {

    $("dashboardPage")
        ?.classList.remove("active-screen");

    document.body.classList.remove(
        "dashboard-active"
    );

}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });

    const section =
        $(sectionId);

    if (!section) {
        return;
    }

    section.classList.add(
        "active-section"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "weatherSection") {
        loadWeather();
    }

    if (sectionId === "marketSection") {
        loadMarketPrices();
    }

    if (sectionId === "comparisonSection") {
        loadMarketComparison();
    }

    if (sectionId === "aiSection") {
        checkAIConnection();
    }

}


/* =========================================================
   MENU
========================================================= */

function openSideMenu() {

    $("sideMenu")
        ?.classList.add("open");

    $("menuOverlay")
        ?.classList.add("active");

}


function closeSideMenu() {

    $("sideMenu")
        ?.classList.remove("open");

    $("menuOverlay")
        ?.classList.remove("active");

}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    $("profileMenu")
        ?.classList.toggle("active");

}


function closeProfileMenu() {

    $("profileMenu")
        ?.classList.remove("active");

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus(isOnline) {

    const status =
        $("connectionStatus");

    const text =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


    if (status) {

        status.classList.toggle(
            "online",
            isOnline
        );

        status.classList.toggle(
            "offline",
            !isOnline
        );

    }


    if (text) {

        text.textContent =
            isOnline
                ? translations[selectedLanguage].online
                : translations[selectedLanguage].offline;

    }


    if (dashboardText) {

        dashboardText.textContent =
            isOnline
                ? translations[selectedLanguage].online
                : translations[selectedLanguage].offline;

    }

}


window.addEventListener(
    "online",
    () => updateConnectionStatus(true)
);

window.addEventListener(
    "offline",
    () => updateConnectionStatus(false)
);


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (auth) {

    auth.onAuthStateChanged(
        async function (user) {

            currentUser = user;

            if (user) {

                console.log(
                    "Logged in user:",
                    user.email
                );

                await loadFarmerProfile();

                showDashboard();

            }

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

async function loginUser(
    email,
    password
) {

    if (!auth) {
        throw new Error(
            "Firebase authentication is not initialized."
        );
    }

    return await auth.signInWithEmailAndPassword(
        email,
        password
    );

}


/* =========================================================
   LOGIN FORM
========================================================= */

$("loginForm")
    ?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                $("loginEmail")
                    ?.value
                    .trim();

            const password =
                $("loginPassword")
                    ?.value;

            const message =
                $("loginMessage");


            if (!email || !password) {
                showMessage(
                    message,
                    "Please enter email and password.",
                    "error"
                );
                return;
            }


            showMessage(
                message,
                "Logging in...",
                "info"
            );


            try {

                await loginUser(
                    email,
                    password
                );

                showMessage(
                    message,
                    "Login successful.",
                    "success"
                );

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                showMessage(
                    message,
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

        }
    );


/* =========================================================
   REGISTRATION
========================================================= */

$("registrationForm")
    ?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                $("registerName")
                    ?.value
                    .trim();

            const email =
                $("registerEmail")
                    ?.value
                    .trim();

            const mobile =
                $("registerMobile")
                    ?.value
                    .trim();

            const village =
                $("registerVillage")
                    ?.value
                    .trim();

            const state =
                $("registerState")
                    ?.value
                    .trim();

            const landArea =
                $("registerLandArea")
                    ?.value
                    .trim();

            const market =
                $("registerMarket")
                    ?.value;

            const language =
                $("registerLanguage")
                    ?.value || "en";

            const password =
                $("registerPassword")
                    ?.value;

            const message =
                $("registerMessage");


            if (
                !name ||
                !email ||
                !mobile ||
                !village ||
                !state ||
                !landArea ||
                !market ||
                !password
            ) {

                showMessage(
                    message,
                    "Please complete all fields.",
                    "error"
                );

                return;
            }


            showMessage(
                message,
                "Creating account...",
                "info"
            );


            try {

                if (!auth) {
                    throw new Error(
                        "Firebase authentication is not initialized."
                    );
                }


                const credential =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    credential.user;


                await db
                    .collection("farmers")
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
                            firebase.firestore.FieldValue.serverTimestamp(),

                        updatedAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    });


                selectedLanguage =
                    language;

                applyLanguage(
                    language
                );


                showMessage(
                    message,
                    "Account created successfully.",
                    "success"
                );


                setTimeout(
                    () => {

                        showDashboard();

                    },
                    700
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                showMessage(
                    message,
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

        }
    );


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {
        return "Something went wrong.";
    }

    switch (error.code) {

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/weak-password":
            return "Password must contain at least 6 characters.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return error.message ||
                "Authentication error.";

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

$("forgotPasswordBtn")
    ?.addEventListener(
        "click",
        async function () {

            const email =
                $("loginEmail")
                    ?.value
                    .trim();

            const message =
                $("loginMessage");


            if (!email) {

                showMessage(
                    message,
                    "Enter your email address first.",
                    "error"
                );

                return;
            }


            try {

                await auth
                    .sendPasswordResetEmail(
                        email
                    );

                showMessage(
                    message,
                    "Password reset email sent.",
                    "success"
                );

            } catch (error) {

                showMessage(
                    message,
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

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

        currentUser = null;
        currentFarmerData = null;

        closeSideMenu();
        closeProfileMenu();

        hideDashboard();

        showScreen(
            "loginPage"
        );

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


$("sideLogoutBtn")
    ?.addEventListener(
        "click",
        logoutUser
    );


$("profileLogoutBtn")
    ?.addEventListener(
        "click",
        logoutUser
    );


/* =========================================================
   DEMO DASHBOARD
========================================================= */

$("demoBtn")
    ?.addEventListener(
        "click",
        function () {

            currentUser = null;

            currentFarmerData = {

                name: "Demo Farmer",

                email: "demo@smartagri.local",

                mobile: "9999999999",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 Acres",

                preferredMarket: "Kopargaon APMC",

                language: selectedLanguage

            };


            showDashboard();

        }
    );


/* =========================================================
   LOAD FARMER PROFILE
========================================================= */

async function loadFarmerProfile() {

    if (!currentUser || !db) {
        return;
    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .get();


        if (snapshot.exists) {

            currentFarmerData =
                snapshot.data();

        } else {

            currentFarmerData = {

                uid: currentUser.uid,

                name:
                    currentUser.displayName ||
                    "Farmer",

                email:
                    currentUser.email || ""

            };

        }


        if (
            currentFarmerData.language &&
            translations[currentFarmerData.language]
        ) {

            selectedLanguage =
                currentFarmerData.language;

            applyLanguage(
                selectedLanguage
            );

        }


        loadFarmerIntoDashboard();


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


/* =========================================================
   LOAD FARMER DATA INTO UI
========================================================= */

function loadFarmerIntoDashboard() {

    if (!currentFarmerData) {
        return;
    }


    const name =
        safeText(
            currentFarmerData.name,
            "Farmer"
        );


    setText(
        "headerFarmerName",
        name
    );

    setText(
        "dashboardFarmerName",
        name
    );

    setText(
        "summaryName",
        name
    );

    setText(
        "summaryVillage",
        safeText(
            currentFarmerData.village
        )
    );

    setText(
        "summaryLand",
        safeText(
            currentFarmerData.landArea
        )
    );

    setText(
        "summaryMarket",
        safeText(
            currentFarmerData.preferredMarket
        )
    );


    setValue(
        "profileName",
        name
    );

    setValue(
        "profileEmail",
        safeText(
            currentFarmerData.email
        )
    );

    setValue(
        "profileMobile",
        safeText(
            currentFarmerData.mobile
        )
    );

    setValue(
        "profileVillage",
        safeText(
            currentFarmerData.village
        )
    );

    setValue(
        "profileState",
        safeText(
            currentFarmerData.state
        )
    );

    setValue(
        "profileLandArea",
        safeText(
            currentFarmerData.landArea
        )
    );

    setValue(
        "profileMarket",
        currentFarmerData.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        currentFarmerData.language || selectedLanguage
    );


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        safeText(
            currentFarmerData.email
        )
    );

}


/* =========================================================
   HELPER SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        $(id);

    if (element) {
        element.textContent =
            safeText(value);
    }

}


/* =========================================================
   HELPER SET VALUE
========================================================= */

function setValue(id, value) {

    const element =
        $(id);

    if (element) {
        element.value =
            value ?? "";
    }

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function enableProfileEditing() {

    const ids = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    ids.forEach(id => {

        const element =
            $(id);

        if (element) {
            element.disabled = false;
        }

    });


    $("profileEmail")
        ?.setAttribute(
            "disabled",
            "disabled"
        );


    $("profileEditActions")
        ?.classList.remove(
            "hidden"
        );

}


function disableProfileEditing() {

    const ids = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    ids.forEach(id => {

        const element =
            $(id);

        if (element) {
            element.disabled = true;
        }

    });


    $("profileEditActions")
        ?.classList.add(
            "hidden"
        );

}


$("editProfileBtn")
    ?.addEventListener(
        "click",
        enableProfileEditing
    );


$("cancelProfileEditBtn")
    ?.addEventListener(
        "click",
        function () {

            loadFarmerIntoDashboard();

            disableProfileEditing();

        }
    );


/* =========================================================
   SAVE PROFILE
========================================================= */

$("profileForm")
    ?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message =
                $("profileMessage");


            const updatedData = {

                name:
                    $("profileName")
                        ?.value
                        .trim(),

                mobile:
                    $("profileMobile")
                        ?.value
                        .trim(),

                village:
                    $("profileVillage")
                        ?.value
                        .trim(),

                state:
                    $("profileState")
                        ?.value
                        .trim(),

                landArea:
                    $("profileLandArea")
                        ?.value
                        .trim(),

                preferredMarket:
                    $("profileMarket")
                        ?.value,

                language:
                    $("profileLanguage")
                        ?.value || "en",

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            };


            try {

                if (
                    currentUser &&
                    db
                ) {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update(
                            updatedData
                        );

                }


                currentFarmerData = {

                    ...currentFarmerData,

                    ...updatedData

                };


                applyLanguage(
                    updatedData.language
                );


                loadFarmerIntoDashboard();

                disableProfileEditing();


                showMessage(
                    message,
                    "Profile updated successfully.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Profile update error:",
                    error
                );

                showMessage(
                    message,
                    error.message ||
                    "Unable to update profile.",
                    "error"
                );

            }

        }
    );


/* =========================================================
   LANGUAGE PAGE
========================================================= */

document.querySelectorAll(
    ".language-option"
)
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            document.querySelectorAll(
                ".language-option"
            )
            .forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            button.classList.add(
                "selected"
            );


            selectedLanguage =
                button.dataset.language;


            if ($("continueLanguageBtn")) {

                $("continueLanguageBtn")
                    .disabled = false;

            }

        }
    );

});


$("continueLanguageBtn")
    ?.addEventListener(
        "click",
        function () {

            applyLanguage(
                selectedLanguage
            );

            showScreen(
                "loginPage"
            );

        }
    );


$("changeLanguageFromLogin")
    ?.addEventListener(
        "click",
        function () {

            showScreen(
                "languagePage"
            );

        }
    );


$("showRegisterBtn")
    ?.addEventListener(
        "click",
        function () {

            showScreen(
                "registerPage"
            );

        }
    );


$("showLoginBtn")
    ?.addEventListener(
        "click",
        function () {

            showScreen(
                "loginPage"
            );

        }
    );


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

document.querySelectorAll(
    "[data-section]"
)
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const section =
                button.dataset.section;

            if (!section) {
                return;
            }


            showSection(
                section
            );


            closeSideMenu();
            closeProfileMenu();

        }
    );

});


/* =========================================================
   SIDE MENU
========================================================= */

$("hamburgerBtn")
    ?.addEventListener(
        "click",
        openSideMenu
    );


$("closeMenuBtn")
    ?.addEventListener(
        "click",
        closeSideMenu
    );


$("menuOverlay")
    ?.addEventListener(
        "click",
        closeSideMenu
    );


/* =========================================================
   PROFILE MENU
========================================================= */

$("profileButton")
    ?.addEventListener(
        "click",
        toggleProfileMenu
    );


document.querySelectorAll(
    "[data-profile-section]"
)
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            showSection(
                button.dataset.profileSection
            );

            closeProfileMenu();

        }
    );

});


document.addEventListener(
    "click",
    function (event) {

        const profileMenu =
            $("profileMenu");

        const profileButton =
            $("profileButton");


        if (
            profileMenu &&
            profileButton &&
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            closeProfileMenu();

        }

    }
);


/* =========================================================
   WEATHER
========================================================= */

async function loadWeather() {

    const loading =
        $("weatherLoading");

    const errorBox =
        $("weatherError");

    const empty =
        $("weatherEmptyState");

    const data =
        $("weatherData");


    loading?.classList.remove(
        "hidden"
    );

    errorBox?.classList.add(
        "hidden"
    );

    empty?.classList.add(
        "hidden"
    );

    data?.classList.add(
        "hidden"
    );


    try {

        const village =
            currentFarmerData?.village ||
            "Kopargaon";

        const state =
            currentFarmerData?.state ||
            "Maharashtra";


        const response =
            await fetch(
                `${API_BASE_URL}/api/weather?village=${encodeURIComponent(village)}&state=${encodeURIComponent(state)}`
            );


        if (!response.ok) {
            throw new Error(
                `Weather server returned ${response.status}`
            );
        }


        const result =
            await response.json();


        console.log(
            "Weather response:",
            result
        );


        const weather =
            result.data ||
            result.weather ||
            result;


        const temperature =
            weather.temperature ??
            weather.temp ??
            weather.temperature_c;


        const humidity =
            weather.humidity;


        const wind =
            weather.wind_speed ??
            weather.windSpeed ??
            weather.wind;


        const rain =
            weather.rain_chance ??
            weather.rainChance ??
            weather.rain_probability;


        if (
            temperature === undefined &&
            humidity === undefined
        ) {

            throw new Error(
                "Weather response did not contain usable data."
            );

        }


        setText(
            "weatherTemperature",
            temperature !== undefined
                ? `${temperature} °C`
                : "—"
        );

        setText(
            "weatherHumidity",
            humidity !== undefined
                ? `${humidity}%`
                : "—"
        );

        setText(
            "weatherWind",
            wind !== undefined
                ? `${wind} km/h`
                : "—"
        );

        setText(
            "weatherRain",
            rain !== undefined
                ? `${rain}%`
                : "—"
        );


        data?.classList.remove(
            "hidden"
        );


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        empty?.classList.remove(
            "hidden"
        );


        showMessage(
            errorBox,
            `Weather unavailable: ${error.message}`,
            "error"
        );

        updateConnectionStatus(
            false
        );


    } finally {

        loading?.classList.add(
            "hidden"
        );

    }

}


$("refreshWeatherBtn")
    ?.addEventListener(
        "click",
        loadWeather
    );


/* =========================================================
   MARKET PRICES
========================================================= */

async function loadMarketPrices() {

    const loading =
        $("marketLoading");

    const errorBox =
        $("marketError");

    const tableBody =
        $("marketTableBody");


    const crop =
        $("cropPriceSelector")
            ?.value || "onion";


    loading?.classList.remove(
        "hidden"
    );

    errorBox?.classList.add(
        "hidden"
    );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/market?crop=${encodeURIComponent(crop)}`
            );


        if (!response.ok) {
            throw new Error(
                `Market server returned ${response.status}`
            );
        }


        const result =
            await response.json();


        console.log(
            "Market response:",
            result
        );


        const records =
            Array.isArray(result)
                ? result
                : (
                    result.data ||
                    result.records ||
                    result.market ||
                    []
                );


        if (!Array.isArray(records) ||
            records.length === 0) {

            renderMarketEmpty();

            return;

        }


        tableBody.innerHTML = "";


        records.forEach(record => {

            const row =
                document.createElement("tr");


            const market =
                record.market ||
                record.market_name ||
                record.marketName ||
                record.mandi ||
                "—";


            const cropName =
                record.crop ||
                record.commodity ||
                crop;


            const price =
                record.price ||
                record.modal_price ||
                record.modalPrice ||
                record.min_price ||
                record.max_price ||
                "—";


            const date =
                record.date ||
                record.arrival_date ||
                record.arrivalDate ||
                "—";


            row.innerHTML = `

                <td>${escapeHTML(market)}</td>

                <td>${escapeHTML(cropName)}</td>

                <td>
                    ${formatPrice(price)}
                </td>

                <td>
                    ${escapeHTML(date)}
                </td>

            `;


            tableBody.appendChild(
                row
            );

        });


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Market error:",
            error
        );


        showMessage(
            errorBox,
            `Market data unavailable: ${error.message}`,
            "error"
        );


        renderMarketEmpty();


    } finally {

        loading?.classList.add(
            "hidden"
        );

    }

}


$("cropPriceSelector")
    ?.addEventListener(
        "change",
        loadMarketPrices
    );


function renderMarketEmpty() {

    const tableBody =
        $("marketTableBody");

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        Market data unavailable
                    </strong>

                    <p>
                        No market information was returned by the backend.
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

async function loadMarketComparison() {

    try {

        const crop =
            $("cropPriceSelector")
                ?.value || "onion";


        const response =
            await fetch(
                `${API_BASE_URL}/api/market?crop=${encodeURIComponent(crop)}`
            );


        if (!response.ok) {
            throw new Error(
                `Market server returned ${response.status}`
            );
        }


        const result =
            await response.json();


        const records =
            Array.isArray(result)
                ? result
                : (
                    result.data ||
                    result.records ||
                    []
                );


        document.querySelectorAll(
            "[data-market-card]"
        )
        .forEach(card => {

            const marketName =
                card.dataset.marketCard;


            const priceElement =
                card.querySelector(
                    ".comparison-price"
                );

            const statusElement =
                card.querySelector(
                    ".comparison-status"
                );


            const matching =
                records.find(
                    record => {

                        const name =
                            record.market ||
                            record.market_name ||
                            record.marketName ||
                            record.mandi ||
                            "";

                        return normalizeText(name)
                            .includes(
                                normalizeText(marketName)
                            ) ||
                            normalizeText(marketName)
                                .includes(
                                    normalizeText(name)
                                );

                    }
                );


            if (matching) {

                const price =
                    matching.price ||
                    matching.modal_price ||
                    matching.modalPrice ||
                    matching.min_price ||
                    "—";


                if (priceElement) {

                    priceElement.textContent =
                        formatPrice(price);

                }


                if (statusElement) {

                    statusElement.textContent =
                        "Live market data";

                    statusElement.classList.add(
                        "available"
                    );

                }

            } else {

                if (priceElement) {
                    priceElement.textContent =
                        "—";
                }

                if (statusElement) {

                    statusElement.textContent =
                        "Data unavailable";

                    statusElement.classList.remove(
                        "available"
                    );

                }

            }

        });


    } catch (error) {

        console.error(
            "Comparison error:",
            error
        );

    }

}


/* =========================================================
   AI CONNECTION
========================================================= */

async function checkAIConnection() {

    const badge =
        $("aiConnectionBadge");

    const text =
        $("aiConnectionText");


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/ai/health`
            );


        if (!response.ok) {
            throw new Error(
                "AI backend unavailable"
            );
        }


        if (badge) {

            badge.classList.remove(
                "not-connected-badge"
            );

            badge.classList.add(
                "connected-badge"
            );

        }


        if (text) {

            text.textContent =
                translations[selectedLanguage]
                    .aiConnected;

        }


    } catch (error) {

        if (badge) {

            badge.classList.remove(
                "connected-badge"
            );

            badge.classList.add(
                "not-connected-badge"
            );

        }


        if (text) {

            text.textContent =
                translations[selectedLanguage]
                    .aiNotConnected;

        }

    }

}


/* =========================================================
   AI CHAT
========================================================= */

$("aiForm")
    ?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const input =
                $("aiInput");

            const message =
                input?.value.trim();


            if (!message) {
                return;
            }


            addChatMessage(
                message,
                "user"
            );


            input.value = "";


            const loadingMessage =
                addChatMessage(
                    "Thinking...",
                    "assistant",
                    true
                );


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/api/ai`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                message: message,

                                question: message,

                                language:
                                    selectedLanguage,

                                farmer:
                                    currentFarmerData || {}

                            })

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `AI server returned ${response.status}`
                    );

                }


                const result =
                    await response.json();


                console.log(
                    "AI response:",
                    result
                );


                removeChatMessage(
                    loadingMessage
                );


                const answer =
                    result.answer ||
                    result.response ||
                    result.message ||
                    result.reply;


                if (!answer) {

                    throw new Error(
                        "AI returned an empty response."
                    );

                }


                addChatMessage(
                    answer,
                    "assistant"
                );


                updateAIStatus(
                    true
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                removeChatMessage(
                    loadingMessage
                );


                addChatMessage(
                    "AI service is currently unavailable. Please check that the Flask backend and AI API are running.",
                    "assistant"
                );


                updateAIStatus(
                    false
                );

            }

        }
    );


function addChatMessage(
    text,
    type,
    temporary = false
) {

    const container =
        $("chatMessages");


    if (!container) {
        return null;
    }


    const wrapper =
        document.createElement("div");


    wrapper.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    if (temporary) {

        wrapper.dataset.temporary =
            "true";

    }


    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    const name =
        type === "user"
            ? (
                currentFarmerData?.name ||
                "Farmer"
            )
            : "Assistant";


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHTML(name)}
            </strong>

            <p>
                ${formatAIText(text)}
            </p>

        </div>

    `;


    container.appendChild(
        wrapper
    );


    container.scrollTop =
        container.scrollHeight;


    return wrapper;

}


function removeChatMessage(
    element
) {

    if (
        element &&
        element.parentNode
    ) {

        element.parentNode.removeChild(
            element
        );

    }

}


function updateAIStatus(
    connected
) {

    const badge =
        $("aiConnectionBadge");

    const text =
        $("aiConnectionText");


    if (badge) {

        badge.classList.toggle(
            "connected-badge",
            connected
        );

        badge.classList.toggle(
            "not-connected-badge",
            !connected
        );

    }


    if (text) {

        text.textContent =
            connected
                ? translations[selectedLanguage].aiConnected
                : translations[selectedLanguage].aiNotConnected;

    }

}


/* =========================================================
   CROP INFORMATION
========================================================= */

const cropInformation = {

    onion: {

        name: "Onion",
        icon: "🧅",

        cultivation: {

            title: "Onion Cultivation Guidance",

            subtitle:
                "Important steps for growing onion successfully.",

            content: `

                <h3>🌱 Land Preparation</h3>

                <p>
                    Prepare a fine, well-drained soil bed.
                    Onion performs best in loose soil with good drainage.
                </p>

                <h3>🌱 Planting</h3>

                <p>
                    Use healthy seedlings or suitable onion planting material.
                    Maintain proper spacing between plants and rows.
                </p>

                <h3>💧 Irrigation</h3>

                <p>
                    Provide regular irrigation according to soil moisture
                    and weather conditions. Avoid waterlogging.
                </p>

                <h3>☀️ Field Conditions</h3>

                <p>
                    Onion requires adequate sunlight and good air movement
                    around the crop.
                </p>

            `

        },


        management: {

            title: "Onion Crop Management",

            subtitle:
                "Manage the crop throughout its growing period.",

            content: `

                <h3>💧 Water Management</h3>

                <p>
                    Maintain consistent soil moisture during bulb development.
                    Avoid excessive irrigation.
                </p>

                <h3>🌿 Weed Management</h3>

                <p>
                    Keep the field free from weeds because weeds compete
                    with onion plants for water, nutrients and sunlight.
                </p>

                <h3>🧪 Nutrient Management</h3>

                <p>
                    Apply nutrients according to soil condition and
                    recommended agricultural practices.
                </p>

                <h3>🔍 Crop Monitoring</h3>

                <p>
                    Regularly inspect plants for pests, diseases,
                    yellowing leaves and poor growth.
                </p>

            `

        },


        practices: {

            title: "Onion Farming Practices",

            subtitle:
                "Practical recommendations for better crop production.",

            content: `

                <h3>🚜 Field Hygiene</h3>

                <p>
                    Remove diseased plant material and maintain clean
                    cultivation areas.
                </p>

                <h3>🌱 Healthy Planting Material</h3>

                <p>
                    Start with healthy and disease-free planting material.
                </p>

                <h3>🔄 Crop Rotation</h3>

                <p>
                    Avoid repeatedly growing the same crop in the same
                    field when possible.
                </p>

                <h3>📦 Harvest Management</h3>

                <p>
                    Harvest bulbs at appropriate maturity and allow
                    suitable curing before storage.
                </p>

            `

        }

    },


    wheat: {

        name: "Wheat",
        icon: "🌾",

        cultivation: {

            title: "Wheat Cultivation Guidance",

            subtitle:
                "Important steps for successful wheat production.",

            content: `

                <h3>🌱 Soil Preparation</h3>

                <p>
                    Prepare a well-levelled seedbed with suitable soil
                    moisture for uniform germination.
                </p>

                <h3>🌾 Seed Selection</h3>

                <p>
                    Use healthy wheat seed varieties recommended for
                    your growing region.
                </p>

                <h3>💧 Irrigation</h3>

                <p>
                    Irrigate according to crop stage, soil moisture
                    and weather conditions.
                </p>

                <h3>☀️ Crop Conditions</h3>

                <p>
                    Wheat generally performs best under suitable cool
                    growing conditions with adequate sunlight.
                </p>

            `

        },


        management: {

            title: "Wheat Crop Management",

            subtitle:
                "Manage wheat from germination to harvest.",

            content: `

                <h3>💧 Irrigation Management</h3>

                <p>
                    Pay particular attention to irrigation during
                    important crop growth stages.
                </p>

                <h3>🌿 Weed Control</h3>

                <p>
                    Monitor the field for weeds and use appropriate
                    integrated weed-management practices.
                </p>

                <h3>🔍 Pest Monitoring</h3>

                <p>
                    Regularly inspect the crop for insects, disease
                    symptoms and abnormal plant growth.
                </p>

                <h3>🧪 Nutrient Management</h3>

                <p>
                    Apply fertilizers based on soil testing and
                    recommended crop requirements.
                </p>

            `

        },


        practices: {

            title: "Wheat Farming Practices",

            subtitle:
                "Practical methods for maintaining a healthy wheat crop.",

            content: `

                <h3>🌱 Timely Sowing</h3>

                <p>
                    Follow the locally recommended sowing window for
                    the wheat variety and growing region.
                </p>

                <h3>🚜 Field Preparation</h3>

                <p>
                    Maintain a level and properly prepared seedbed
                    for uniform crop establishment.
                </p>

                <h3>🔄 Crop Rotation</h3>

                <p>
                    Crop rotation can help improve soil management
                    and reduce recurring crop-related problems.
                </p>

                <h3>🌾 Harvesting</h3>

                <p>
                    Harvest when the crop reaches appropriate maturity
                    and grain moisture is suitable for harvesting.
                </p>

            `

        }

    }

};


document.querySelectorAll(
    ".crop-info-button"
)
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const crop =
                button.dataset.crop;

            const topic =
                button.dataset.topic;


            const cropData =
                cropInformation[crop];

            const information =
                cropData?.[topic];


            if (!information) {
                return;
            }


            setText(
                "cropInfoModalIcon",
                cropData.icon
            );

            setText(
                "cropInfoModalTitle",
                information.title
            );

            setText(
                "cropInfoModalSubtitle",
                information.subtitle
            );


            const body =
                $("cropInfoModalBody");


            if (body) {

                body.innerHTML =
                    information.content;

            }


            $("cropInfoModal")
                ?.classList.remove(
                    "hidden"
                );


            document.body.classList.add(
                "modal-open"
            );

        }
    );

});


function closeCropModal() {

    $("cropInfoModal")
        ?.classList.add(
            "hidden"
        );

    document.body.classList.remove(
        "modal-open"
    );

}


$("closeCropInfoBtn")
    ?.addEventListener(
        "click",
        closeCropModal
    );


$("cropInfoModalOverlay")
    ?.addEventListener(
        "click",
        closeCropModal
    );


/* =========================================================
   CROP HEALTH
========================================================= */

$("cropImageInput")
    ?.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            const preview =
                $("cropImagePreview");

            const container =
                $("imagePreviewContainer");


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    if (preview) {

                        preview.src =
                            event.target.result;

                    }


                    container
                        ?.classList.remove(
                            "hidden"
                        );


                    if ($("analyzeCropBtn")) {

                        $("analyzeCropBtn")
                            .disabled = false;

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );


$("analyzeCropBtn")
    ?.addEventListener(
        "click",
        analyzeCrop
    );


async function analyzeCrop() {

    const file =
        $("cropImageInput")
            ?.files?.[0];


    const resultBox =
        $("cropAnalysisResult");


    if (!file) {
        return;
    }


    if (!resultBox) {
        return;
    }


    resultBox.innerHTML = `

        <strong>
            🔍 Analyzing crop...
        </strong>

        <p>
            Please wait while the AI service analyzes the image.
        </p>

    `;


    try {

        const formData =
            new FormData();


        formData.append(
            "image",
            file
        );


        formData.append(
            "language",
            selectedLanguage
        );


        if (currentFarmerData?.name) {

            formData.append(
                "farmer",
                currentFarmerData.name
            );

        }


        const response =
            await fetch(
                `${API_BASE_URL}/api/analyze-crop`,
                {

                    method: "POST",

                    body: formData

                }
            );


        if (!response.ok) {

            throw new Error(
                `Crop AI server returned ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "Crop analysis:",
            result
        );


        const analysis =
            result.analysis ||
            result.result ||
            result.message ||
            result.diagnosis;


        if (!analysis) {

            throw new Error(
                "AI returned no crop analysis."
            );

        }


        resultBox.innerHTML = `

            <strong>
                🌱 Crop Analysis Result
            </strong>

            <div class="analysis-content">
                ${formatAIText(analysis)}
            </div>

        `;


    } catch (error) {

        console.error(
            "Crop analysis error:",
            error
        );


        resultBox.innerHTML = `

            <strong>
                ⚠️ Crop analysis unavailable
            </strong>

            <p>
                ${escapeHTML(error.message)}
            </p>

            <p>
                Make sure the Flask backend and crop-AI endpoint are running.
            </p>

        `;

    }

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

document.querySelectorAll(
    ".scheme-button"
)
.forEach(button => {

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
   VOICE ASSISTANCE
========================================================= */

let speechRecognition = null;


function initializeVoiceRecognition() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        return null;

    }


    const recognition =
        new Recognition();


    recognition.continuous =
        true;

    recognition.interimResults =
        true;


    recognition.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    recognition.onstart =
        function () {

            $("startVoiceBtn")
                ?.classList.add(
                    "hidden"
                );

            $("stopVoiceBtn")
                ?.classList.remove(
                    "hidden"
                );


            setText(
                "voiceResponse",
                "Listening..."
            );

        };


    recognition.onresult =
        function (event) {

            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;

            }


            setValue(
                "voiceInput",
                transcript
            );

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );


            setText(
                "voiceResponse",
                `Voice error: ${event.error}`
            );

        };


    recognition.onend =
        function () {

            $("startVoiceBtn")
                ?.classList.remove(
                    "hidden"
                );

            $("stopVoiceBtn")
                ?.classList.add(
                    "hidden"
                );

        };


    return recognition;

}


function getSpeechLanguage(
    language
) {

    switch (language) {

        case "hi":
            return "hi-IN";

        case "mr":
            return "mr-IN";

        default:
            return "en-IN";

    }

}


$("startVoiceBtn")
    ?.addEventListener(
        "click",
        function () {

            if (!speechRecognition) {

                speechRecognition =
                    initializeVoiceRecognition();

            }


            if (!speechRecognition) {

                setText(
                    "voiceResponse",
                    translations[
                        selectedLanguage
                    ].voiceNotSupported ||
                    "Voice recognition is not supported."
                );

                return;

            }


            speechRecognition.lang =
                getSpeechLanguage(
                    selectedLanguage
                );


            try {

                speechRecognition.start();

            } catch (error) {

                console.error(
                    "Voice start error:",
                    error
                );

            }

        }
    );


$("stopVoiceBtn")
    ?.addEventListener(
        "click",
        function () {

            if (speechRecognition) {

                speechRecognition.stop();

            }

        }
    );


/* =========================================================
   SETTINGS LANGUAGE
========================================================= */

$("dashboardLanguage")
    ?.addEventListener(
        "change",
        function () {

            applyLanguage(
                this.value
            );

        }
    );


$("settingsLanguage")
    ?.addEventListener(
        "change",
        async function () {

            const language =
                this.value;


            applyLanguage(
                language
            );


            if (
                currentUser &&
                db
            ) {

                try {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update({

                            language: language,

                            updatedAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        });


                    currentFarmerData.language =
                        language;

                } catch (error) {

                    console.error(
                        "Language save error:",
                        error
                    );

                }

            }

        }
    );


$("registerLanguage")
    ?.addEventListener(
        "change",
        function () {

            applyLanguage(
                this.value
            );

        }
    );


$("profileLanguage")
    ?.addEventListener(
        "change",
        function () {

            applyLanguage(
                this.value
            );

        }
    );


/* =========================================================
   VOICE SETTING
========================================================= */

$("voiceSetting")
    ?.addEventListener(
        "change",
        function () {

            if (!this.checked) {

                if (speechRecognition) {

                    try {
                        speechRecognition.stop();
                    } catch (_) {}

                }

                $("startVoiceBtn")
                    ?.setAttribute(
                        "disabled",
                        "disabled"
                    );

            } else {

                $("startVoiceBtn")
                    ?.removeAttribute(
                        "disabled"
                    );

            }

        }
    );


/* =========================================================
   NOTIFICATION SETTING
========================================================= */

$("notificationSetting")
    ?.addEventListener(
        "change",
        async function () {

            if (
                this.checked &&
                "Notification" in window
            ) {

                try {

                    await Notification.requestPermission();

                } catch (error) {

                    console.error(
                        "Notification permission error:",
                        error
                    );

                }

            }

        }
    );


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        closeSideMenu();

        closeProfileMenu();

        closeCropModal();

    }
);


/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(
    element,
    message,
    type = "info"
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.classList.remove(
        "hidden",
        "success",
        "error",
        "info"
    );


    element.classList.add(
        `${type}-message`
    );


    if (type === "success") {
        element.classList.add(
            "success"
        );
    }


    if (type === "error") {
        element.classList.add(
            "error"
        );
    }


    if (type === "info") {
        element.classList.add(
            "info"
        );

    }

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        safeText(value, "");

    return div.innerHTML;

}


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value) {

    return safeText(
        value,
        ""
    )
    .toLowerCase()
    .replace(
        /\s+/g,
        " "
    )
    .trim();

}


/* =========================================================
   PRICE FORMATTER
========================================================= */

function formatPrice(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "—";

    }


    if (
        typeof value === "number"
    ) {

        return `₹${value.toLocaleString("en-IN")}`;

    }


    const text =
        String(value);


    if (
        text.includes("₹") ||
        text.includes("Rs") ||
        text.includes("INR")
    ) {

        return escapeHTML(
            text
        );

    }


    return `₹${escapeHTML(text)}`;

}


/* =========================================================
   AI TEXT FORMATTER
========================================================= */

function formatAIText(text) {

    let safe =
        escapeHTML(
            safeText(
                text,
                ""
            )
        );


    safe =
        safe.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    safe =
        safe.replace(
            /\n/g,
            "<br>"
        );


    return safe;

}


/* =========================================================
   LOCAL STORAGE LANGUAGE
========================================================= */

const savedLanguage =
    localStorage.getItem(
        "smartagri_language"
    );


if (
    savedLanguage &&
    translations[savedLanguage]
) {

    selectedLanguage =
        savedLanguage;

} else {

    selectedLanguage =
        "en";

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyLanguage(
            selectedLanguage
        );


        updateConnectionStatus(
            navigator.onLine
        );


        /*
         * Start with language screen unless
         * Firebase already restores a logged-in user.
         */

        if (
            auth &&
            auth.currentUser
        ) {

            currentUser =
                auth.currentUser;

        } else {

            showScreen(
                "languagePage"
            );

        }

    }
);


/* =========================================================
   GLOBAL DEBUG OBJECT
========================================================= */

window.SmartAgri = {

    firebaseConfig,

    auth,

    db,

    loadWeather,

    loadMarketPrices,

    loadMarketComparison,

    checkAIConnection,

    analyzeCrop,

    logoutUser,

    showSection,

    showDashboard,

    currentUser: () =>
        currentUser,

    farmer: () =>
        currentFarmerData

};


console.log(
    "SmartAgri JavaScript loaded successfully."
);
