/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
========================================================= */

const API_BASE = ""; 
// Leave empty when frontend and Flask are served from same server.
// Example if Flask runs on http://127.0.0.1:5000:
// const API_BASE = "http://127.0.0.1:5000";


/* =========================================================
   FIREBASE CONFIGURATION
   ---------------------------------------------------------
   REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT CONFIG.
========================================================= */

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};


/* =========================================================
   FIREBASE INITIALIZATION
========================================================= */

let firebaseReady = false;
let auth = null;
let db = null;

try {

    if (
        typeof firebase !== "undefined" &&
        firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY"
    ) {

        firebase.initializeApp(firebaseConfig);

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseReady = true;

        console.log("Firebase initialized successfully.");

    } else {

        console.warn(
            "Firebase config has not been replaced. Demo mode will still work."
        );

    }

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL APPLICATION STATE
========================================================= */

const state = {

    language: localStorage.getItem("smartagri_language") || "en",

    farmer: null,

    currentSection: "dashboardSection",

    selectedCrop: "onion",

    selectedImage: null,

    isDemo: false,

    isProfileEditing: false,

    weather: null,

    marketData: [],

    comparisonData: [],

    voiceRecognition: null,

    isListening: false

};


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
        registrationSubtitle:
            "Create your SmartAgri farmer account",

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
        welcome: "Welcome",
        dashboardSubtitle:
            "Your farming information in one place.",

        connectionStatus: "Connection Status",

        farmerProfile: "Farmer Profile",
        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle:
            "Access important farming tools quickly.",

        weather: "Weather",
        marketPrices: "Market Prices",
        marketComparison: "Market Comparison",
        cropInformation: "Crop Information",
        cropHealth: "Crop Health",
        governmentSchemes: "Government Schemes",
        aiAssistant: "AI Assistant",
        voiceAssistance: "Voice Assistance",
        settings: "Settings",
        about: "About SmartAgri",

        liveDataTitle: "Live Data",
        liveDataDescription:
            "Connected agricultural information is displayed here.",

        currentWeather: "Current Weather",
        refresh: "Refresh",

        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription:
            "Unable to receive weather information from the server.",

        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        marketSubtitle:
            "Current crop prices from connected sources.",

        marketPriceTable: "Market Price Table",

        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",

        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription:
            "Unable to receive market information from the server.",

        comparisonSubtitle:
            "Compare market prices before selling your crop.",

        dataUnavailable: "Data unavailable",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onion: "Onion",
        wheat: "Wheat",

        onionInfo: "Onion cultivation information.",
        wheatInfo: "Wheat cultivation information.",

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

        analysisNotConnected:
            "AI crop analysis is not connected",

        analysisNotConnectedDescription:
            "Upload an image and connect the crop-health service to analyze it.",

        schemesSubtitle:
            "Farmer support and government agricultural programs.",

        pmKisanDescription:
            "Official PM-KISAN farmer support information.",

        pmksyDescription:
            "Official irrigation and water-management information.",

        cropInsurance: "Crop Insurance",

        cropInsuranceDescription:
            "Official Pradhan Mantri Fasal Bima Yojana information.",

        learnMore: "Learn More",

        aiSubtitle:
            "Ask farming-related questions.",

        smartAssistant: "Smart Farmer Assistant",

        aiNotConnected: "AI Connected",

        assistant: "Assistant",

        aiUnavailable:
            "Ask me anything about farming, crops, weather or markets.",

        askQuestion: "Ask a farming question...",

        aiConnectionNote:
            "AI responses are provided through the SmartAgri backend.",

        voiceSubtitle:
            "Speak and listen in your preferred language.",

        voiceAssistantTitle:
            "Smart Voice Assistance",

        voiceDescription:
            "Speak using your device microphone.",

        startVoice: "Start Voice Assistance",
        stopVoice: "Stop Listening",

        voiceInput: "Voice Input",
        voiceResponse: "Voice Response",

        voiceInputPlaceholder:
            "Voice input will appear here...",

        voiceReady:
            "Voice assistance is ready.",

        profileSubtitle:
            "View and edit your farmer information.",

        saveChanges: "Save Changes",
        cancel: "Cancel",

        settingsSubtitle:
            "Manage your SmartAgri preferences.",

        changeLanguageDescription:
            "Select your preferred application language.",

        voiceSettingDescription:
            "Enable or disable voice assistance.",

        notifications: "Notifications",

        notificationDescription:
            "Enable or disable application notifications.",

        marketIntelligence: "Market Intelligence",
        multilingualSupport: "Multilingual Support",
        aboutDescription:
            "SmartAgri provides farmers with agricultural information, market intelligence, crop guidance and digital farming assistance.",

        logout: "Logout",
        myProfile: "My Profile",

        offline: "Offline",
        online: "Connected"

    },


    hi: {

        appName: "स्मार्ट एग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri में प्रवेश करें",

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
        registrationSubtitle:
            "अपना SmartAgri किसान खाता बनाएं",

        fullName: "पूरा नाम",
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
        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        connectionStatus: "कनेक्शन स्थिति",

        farmerProfile: "किसान प्रोफाइल",
        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        weather: "मौसम",
        marketPrices: "बाजार भाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "फसल जानकारी",
        cropHealth: "फसल स्वास्थ्य",
        governmentSchemes: "सरकारी योजनाएं",
        aiAssistant: "AI सहायक",
        voiceAssistance: "आवाज सहायता",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription:
            "कनेक्टेड कृषि जानकारी यहां दिखाई जाती है।",

        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",

        weatherUnavailable: "मौसम जानकारी उपलब्ध नहीं",
        weatherUnavailableDescription:
            "सर्वर से मौसम की जानकारी प्राप्त नहीं हो सकी।",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड स्रोतों से वर्तमान फसल कीमतें।",

        marketPriceTable: "बाजार भाव तालिका",

        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "तारीख",

        marketDataUnavailable: "बाजार जानकारी उपलब्ध नहीं",
        marketDataUnavailableDescription:
            "सर्वर से बाजार जानकारी प्राप्त नहीं हो सकी।",

        comparisonSubtitle:
            "फसल बेचने से पहले बाजार भाव की तुलना करें।",

        dataUnavailable: "जानकारी उपलब्ध नहीं",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onion: "प्याज",
        wheat: "गेहूं",

        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",

        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि पद्धतियां",

        cropHealthSubtitle:
            "AI विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

        uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
        uploadCropDescription:
            "फसल स्वास्थ्य जांच के लिए तस्वीर चुनें।",

        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

        analysisNotConnected:
            "AI फसल विश्लेषण उपलब्ध नहीं है",

        analysisNotConnectedDescription:
            "तस्वीर अपलोड करके फसल स्वास्थ्य विश्लेषण करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और योजनाएं।",

        pmKisanDescription:
            "PM-KISAN किसान सहायता की आधिकारिक जानकारी।",

        pmksyDescription:
            "सिंचाई और जल प्रबंधन की आधिकारिक जानकारी।",

        cropInsurance: "फसल बीमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        learnMore: "अधिक जानकारी",

        aiSubtitle:
            "कृषि से संबंधित प्रश्न पूछें।",

        smartAssistant: "स्मार्ट किसान सहायक",

        aiNotConnected: "AI कनेक्टेड",

        assistant: "सहायक",

        aiUnavailable:
            "खेती, फसल, मौसम या बाजार के बारे में प्रश्न पूछें।",

        askQuestion: "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तर SmartAgri सर्वर द्वारा दिए जाते हैं।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice: "आवाज सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज उत्तर",

        voiceInputPlaceholder:
            "आवाज इनपुट यहां दिखाई देगा...",

        voiceReady:
            "आवाज सहायता तैयार है।",

        profileSubtitle:
            "किसान जानकारी देखें और संपादित करें।",

        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "आवाज सहायता चालू या बंद करें।",

        notifications: "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        marketIntelligence: "बाजार जानकारी",
        multilingualSupport: "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करता है।",

        logout: "लॉगआउट",
        myProfile: "मेरी प्रोफाइल",

        offline: "ऑफलाइन",
        online: "कनेक्टेड"

    },


    mr: {

        appName: "स्मार्ट अॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",
        languageDescription:
            "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",

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
        registrationSubtitle:
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्र",
        preferredMarket: "आवडता बाजार",

        selectMarket: "बाजार निवडा",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "आवडती भाषा",

        createAccount: "खाते तयार करा",

        alreadyAccount: "आधीपासून खाते आहे?",

        dashboard: "डॅशबोर्ड",
        welcome: "स्वागत आहे",
        dashboardSubtitle:
            "तुमची शेतीविषयक माहिती एकाच ठिकाणी.",

        connectionStatus: "कनेक्शन स्थिती",

        farmerProfile: "शेतकरी प्रोफाइल",
        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle:
            "महत्त्वाची शेती साधने पटकन वापरा.",

        weather: "हवामान",
        marketPrices: "बाजार भाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पिकांची माहिती",
        cropHealth: "पिकांचे आरोग्य",
        governmentSchemes: "सरकारी योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "आवाज सहाय्य",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",

        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription:
            "कनेक्ट केलेली शेतीविषयक माहिती येथे दिसेल.",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",

        weatherUnavailable: "हवामान माहिती उपलब्ध नाही",
        weatherUnavailableDescription:
            "सर्व्हरकडून हवामान माहिती मिळाली नाही.",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्ट केलेल्या स्रोतांमधून सध्याचे बाजार भाव.",

        marketPriceTable: "बाजार भाव तक्ता",

        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",

        marketDataUnavailable: "बाजार माहिती उपलब्ध नाही",
        marketDataUnavailableDescription:
            "सर्व्हरकडून बाजार माहिती मिळाली नाही.",

        comparisonSubtitle:
            "पीक विकण्यापूर्वी बाजार भावांची तुलना करा.",

        dataUnavailable: "माहिती उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onion: "कांदा",
        wheat: "गहू",

        onionInfo: "कांदा लागवडीची माहिती.",
        wheatInfo: "गहू लागवडीची माहिती.",

        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle:
            "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
        uploadCropDescription:
            "पीक आरोग्य तपासणीसाठी फोटो निवडा.",

        chooseImage: "फोटो निवडा",
        analyzeCrop: "पीक विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण उपलब्ध नाही",

        analysisNotConnectedDescription:
            "फोटो अपलोड करून पीक आरोग्याचे विश्लेषण करा.",

        schemesSubtitle:
            "शेतकऱ्यांसाठी सरकारी मदत आणि योजना.",

        pmKisanDescription:
            "PM-KISAN शेतकरी मदतीची अधिकृत माहिती.",

        pmksyDescription:
            "सिंचन आणि जल व्यवस्थापनाची अधिकृत माहिती.",

        cropInsurance: "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री पीक विमा योजनेची अधिकृत माहिती.",

        learnMore: "अधिक माहिती",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",

        aiNotConnected: "AI कनेक्टेड",

        assistant: "सहाय्यक",

        aiUnavailable:
            "शेती, पीक, हवामान किंवा बाजाराबद्दल प्रश्न विचारा.",

        askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरे SmartAgri सर्व्हरद्वारे दिली जातात.",

        voiceSubtitle:
            "तुमच्या आवडत्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

        startVoice: "आवाज सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज उत्तर",

        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",

        voiceReady:
            "आवाज सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle:
            "SmartAgri च्या पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची आवडती अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications: "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence: "बाजार माहिती",
        multilingualSupport: "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य प्रदान करते.",

        logout: "लॉगआउट",
        myProfile: "माझी प्रोफाइल",

        offline: "ऑफलाइन",
        online: "कनेक्टेड"

    }

};


/* =========================================================
   DOM HELPER
========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   SAFE TEXT UPDATE
========================================================= */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent =
            value === null ||
            value === undefined ||
            value === ""
                ? "—"
                : value;
    }

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(elementId, message, type = "error") {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = message;

    element.className = `message ${type}`;

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    $$(".screen").forEach(screen => {

        screen.classList.remove("active-screen");

    });

    const screen = document.getElementById(screenId);

    if (screen) {

        screen.classList.add("active-screen");

    }

}


/* =========================================================
   APPLICATION SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) return;

    $$(".app-section").forEach(item => {

        item.classList.remove("active-section");

    });

    section.classList.add("active-section");

    state.currentSection = sectionId;

    closeSideMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Load section data */

    if (sectionId === "weatherSection") {

        loadWeather();

    }

    if (sectionId === "marketSection") {

        loadMarketPrices();

    }

    if (sectionId === "comparisonSection") {

        loadMarketComparison();

    }

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    const menu = $("#sideMenu");
    const overlay = $("#menuOverlay");

    if (menu) {
        menu.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

}


function closeSideMenu() {

    const menu = $("#sideMenu");
    const overlay = $("#menuOverlay");

    if (menu) {
        menu.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    const menu = $("#profileMenu");

    if (!menu) return;

    menu.classList.toggle("active");

}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguage(language) {

    if (!translations[language]) {

        language = "en";

    }

    state.language = language;

    localStorage.setItem(
        "smartagri_language",
        language
    );


    document.documentElement.lang = language;


    const dictionary =
        translations[language];


    /* Text */

    $$("[data-i18n]").forEach(element => {

        const key =
            element.getAttribute("data-i18n");

        if (
            dictionary[key] !== undefined
        ) {

            element.textContent =
                dictionary[key];

        }

    });


    /* Placeholders */

    $$("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute(
                "data-i18n-placeholder"
            );

        if (
            dictionary[key] !== undefined
        ) {

            element.placeholder =
                dictionary[key];

        }

    });


    /* Header language */

    const dashboardLanguage =
        $("#dashboardLanguage");

    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;

    }


    const settingsLanguage =
        $("#settingsLanguage");

    if (settingsLanguage) {

        settingsLanguage.value =
            language;

    }


    const registerLanguage =
        $("#registerLanguage");

    if (registerLanguage) {

        registerLanguage.value =
            language;

    }


    const profileLanguage =
        $("#profileLanguage");

    if (profileLanguage) {

        profileLanguage.value =
            language;

    }

}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        $$(".language-option");

    const continueButton =
        $("#continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                languageButtons.forEach(item => {

                    item.classList.remove("selected");

                });

                button.classList.add("selected");

                state.language =
                    button.dataset.language;

                if (continueButton) {

                    continueButton.disabled =
                        false;

                }

            }
        );

    });


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                applyLanguage(
                    state.language
                );

                showScreen("loginPage");

            }
        );

    }

}


/* =========================================================
   API REQUEST HELPER
========================================================= */

async function apiRequest(
    endpoint,
    options = {}
) {

    const url =
        `${API_BASE}${endpoint}`;


    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () => controller.abort(),
            30000
        );


    try {

        const response =
            await fetch(
                url,
                {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        "Content-Type":
                            "application/json",
                        ...(options.headers || {})
                    }
                }
            );


        clearTimeout(timeout);


        let data = null;

        try {

            data = await response.json();

        } catch {

            data = {};

        }


        if (!response.ok) {

            throw new Error(
                data.error ||
                data.message ||
                `Server error: ${response.status}`
            );

        }


        return data;

    } catch (error) {

        clearTimeout(timeout);

        console.error(
            `API error: ${endpoint}`,
            error
        );

        throw error;

    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus(
    connected,
    customText = null
) {

    const status =
        $("#connectionStatus");

    const text =
        $("#connectionText");

    const dashboardText =
        $("#dashboardConnectionText");


    if (status) {

        status.classList.toggle(
            "online",
            connected
        );

        status.classList.toggle(
            "offline",
            !connected
        );

    }


    const label =
        customText ||
        (
            connected
                ? translations[state.language].online
                : translations[state.language].offline
        );


    if (text) {

        text.textContent = label;

    }

    if (dashboardText) {

        dashboardText.textContent =
            label;

    }

}


/* =========================================================
   TEST BACKEND CONNECTION
========================================================= */

async function testBackendConnection() {

    try {

        const response =
            await fetch(
                `${API_BASE}/api/health`,
                {
                    method: "GET"
                }
            );


        if (response.ok) {

            updateConnectionStatus(true);

            return true;

        }

    } catch (error) {

        console.warn(
            "Backend connection unavailable."
        );

    }


    updateConnectionStatus(false);

    return false;

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupFirebaseAuth() {

    if (!firebaseReady || !auth) {

        return;

    }


    auth.onAuthStateChanged(
        async user => {

            if (!user) {

                return;

            }


            try {

                const profile =
                    await loadFirebaseProfile(
                        user.uid
                    );


                state.farmer = {

                    uid: user.uid,

                    email:
                        user.email || "",

                    ...(profile || {})

                };


                state.isDemo = false;

                populateFarmerProfile();

                showScreen("dashboardPage");

                testBackendConnection();

            } catch (error) {

                console.error(
                    "Failed loading farmer profile:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   FIREBASE PROFILE
========================================================= */

async function loadFirebaseProfile(uid) {

    if (!db) return null;

    const snapshot =
        await db
            .collection("farmers")
            .doc(uid)
            .get();


    if (!snapshot.exists) {

        return null;

    }


    return snapshot.data();

}


/* =========================================================
   LOGIN
========================================================= */

async function loginUser(
    email,
    password
) {

    if (!firebaseReady || !auth) {

        showMessage(
            "loginMessage",
            "Firebase is not configured. Use Demo Dashboard.",
            "error"
        );

        return;

    }


    try {

        showMessage(
            "loginMessage",
            "Logging in...",
            "info"
        );


        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        const user =
            result.user;


        const profile =
            await loadFirebaseProfile(
                user.uid
            );


        state.farmer = {

            uid: user.uid,

            email:
                user.email || "",

            ...(profile || {})

        };


        state.isDemo = false;

        populateFarmerProfile();

        showScreen("dashboardPage");

        showMessage(
            "loginMessage",
            "",
            "success"
        );

        await testBackendConnection();

    } catch (error) {

        console.error(error);

        showMessage(
            "loginMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   REGISTER
========================================================= */

async function registerUser() {

    if (!firebaseReady || !auth || !db) {

        showMessage(
            "registerMessage",
            "Firebase is not configured.",
            "error"
        );

        return;

    }


    const name =
        $("#registerName")?.value.trim();

    const email =
        $("#registerEmail")?.value.trim();

    const mobile =
        $("#registerMobile")?.value.trim();

    const village =
        $("#registerVillage")?.value.trim();

    const stateName =
        $("#registerState")?.value.trim();

    const landArea =
        $("#registerLandArea")?.value.trim();

    const market =
        $("#registerMarket")?.value;

    const language =
        $("#registerLanguage")?.value || "en";

    const password =
        $("#registerPassword")?.value;


    try {

        showMessage(
            "registerMessage",
            "Creating account...",
            "info"
        );


        const result =
            await auth.createUserWithEmailAndPassword(
                email,
                password
            );


        const user =
            result.user;


        const farmerData = {

            uid: user.uid,

            name,

            email,

            mobile,

            village,

            state: stateName,

            landArea,

            preferredMarket: market,

            language,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        };


        await db
            .collection("farmers")
            .doc(user.uid)
            .set(farmerData);


        state.farmer = farmerData;

        state.isDemo = false;

        state.language = language;

        applyLanguage(language);

        populateFarmerProfile();

        showScreen("dashboardPage");

        await testBackendConnection();

    } catch (error) {

        console.error(error);

        showMessage(
            "registerMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function firebaseErrorMessage(error) {

    const code =
        error?.code || "";


    const messages = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/email-already-in-use":
            "An account already exists with this email.",

        "auth/weak-password":
            "Password must contain at least 6 characters.",

        "auth/invalid-credential":
            "Invalid email or password."

    };


    return (
        messages[code] ||
        error.message ||
        "Authentication failed."
    );

}


/* =========================================================
   DEMO USER
========================================================= */

function enterDemoDashboard() {

    state.isDemo = true;

    state.farmer = {

        uid: "demo-user",

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "9999999999",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "5 Acres",

        preferredMarket: "Kopargaon APMC",

        language:
            state.language

    };


    populateFarmerProfile();

    showScreen("dashboardPage");

    testBackendConnection();

}


/* =========================================================
   POPULATE FARMER PROFILE
========================================================= */

function populateFarmerProfile() {

    const farmer =
        state.farmer;


    if (!farmer) return;


    setText(
        "headerFarmerName",
        farmer.name || "Farmer"
    );


    setText(
        "dashboardFarmerName",
        farmer.name || "Farmer"
    );


    setText(
        "summaryName",
        farmer.name
    );


    setText(
        "summaryVillage",
        farmer.village
    );


    setText(
        "summaryLand",
        farmer.landArea
    );


    setText(
        "summaryMarket",
        farmer.preferredMarket
    );


    setText(
        "profilePageName",
        farmer.name
    );


    setText(
        "profilePageEmail",
        farmer.email
    );


    const fields = {

        profileName: farmer.name || "",

        profileEmail: farmer.email || "",

        profileMobile: farmer.mobile || "",

        profileVillage: farmer.village || "",

        profileState: farmer.state || "",

        profileLandArea: farmer.landArea || "",

        profileMarket: farmer.preferredMarket || "",

        profileLanguage:
            farmer.language ||
            state.language ||
            "en"

    };


    Object.entries(fields).forEach(
        ([id, value]) => {

            const element =
                document.getElementById(id);

            if (element) {

                element.value = value;

            }

        }
    );


    if (
        farmer.language &&
        translations[farmer.language]
    ) {

        applyLanguage(
            farmer.language
        );

    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile() {

    const updated = {

        name:
            $("#profileName")?.value.trim(),

        mobile:
            $("#profileMobile")?.value.trim(),

        village:
            $("#profileVillage")?.value.trim(),

        state:
            $("#profileState")?.value.trim(),

        landArea:
            $("#profileLandArea")?.value.trim(),

        preferredMarket:
            $("#profileMarket")?.value,

        language:
            $("#profileLanguage")?.value

    };


    try {

        if (
            !state.isDemo &&
            firebaseReady &&
            db &&
            state.farmer?.uid
        ) {

            await db
                .collection("farmers")
                .doc(state.farmer.uid)
                .update(updated);

        }


        state.farmer = {

            ...state.farmer,

            ...updated

        };


        populateFarmerProfile();

        disableProfileEditing();


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "profileMessage",
            "Unable to save profile.",
            "error"
        );

    }

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function enableProfileEditing() {

    state.isProfileEditing = true;


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


    const actions =
        $("#profileEditActions");

    if (actions) {

        actions.classList.remove("hidden");

    }

}


function disableProfileEditing() {

    state.isProfileEditing = false;


    [
        "profileName",
        "profileEmail",
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


    const actions =
        $("#profileEditActions");

    if (actions) {

        actions.classList.add("hidden");

    }

}


/* =========================================================
   WEATHER
========================================================= */

async function loadWeather() {

    const empty =
        $("#weatherEmptyState");

    const dataBox =
        $("#weatherData");


    if (empty) {

        empty.innerHTML = `
            <div class="empty-icon">⏳</div>
            <h3>Loading weather...</h3>
            <p>Please wait while SmartAgri retrieves weather data.</p>
        `;

    }


    try {

        const village =
            state.farmer?.village ||
            "Kopargaon";

        const stateName =
            state.farmer?.state ||
            "Maharashtra";


        const endpoint =
            `/api/weather?village=${encodeURIComponent(village)}&state=${encodeURIComponent(stateName)}`;


        const data =
            await apiRequest(endpoint);


        state.weather =
            data.weather ||
            data.data ||
            data;


        renderWeather(
            state.weather
        );


        updateConnectionStatus(true);


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        if (dataBox) {

            dataBox.classList.add("hidden");

        }


        if (empty) {

            empty.classList.remove("hidden");

            empty.innerHTML = `
                <div class="empty-icon">🌦️</div>
                <h3>Weather data unavailable</h3>
                <p>${escapeHtml(error.message)}</p>
                <button
                    type="button"
                    class="outline-button"
                    onclick="loadWeather()">
                    🔄 Try Again
                </button>
            `;

        }

    }

}


/* =========================================================
   RENDER WEATHER
========================================================= */

function renderWeather(weather) {

    if (!weather) return;


    const empty =
        $("#weatherEmptyState");

    const dataBox =
        $("#weatherData");


    if (empty) {

        empty.classList.add("hidden");

    }


    if (dataBox) {

        dataBox.classList.remove("hidden");

    }


    const temperature =
        firstValue(
            weather.temperature,
            weather.temp,
            weather.temperature_c,
            weather.current_temperature
        );


    const humidity =
        firstValue(
            weather.humidity,
            weather.humidity_percent
        );


    const wind =
        firstValue(
            weather.wind_speed,
            weather.windSpeed,
            weather.windspeed
        );


    const rain =
        firstValue(
            weather.rain_chance,
            weather.rainChance,
            weather.precipitation_probability,
            weather.rain_probability
        );


    setText(
        "weatherTemperature",
        formatUnit(
            temperature,
            "°C"
        )
    );


    setText(
        "weatherHumidity",
        formatUnit(
            humidity,
            "%"
        )
    );


    setText(
        "weatherWind",
        formatUnit(
            wind,
            " km/h"
        )
    );


    setText(
        "weatherRain",
        formatUnit(
            rain,
            "%"
        )
    );

}


/* =========================================================
   MARKET PRICES
========================================================= */

async function loadMarketPrices() {

    const crop =
        $("#cropPriceSelector")?.value ||
        state.selectedCrop ||
        "onion";


    state.selectedCrop =
        crop;


    const tbody =
        $("#marketTableBody");


    if (tbody) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="table-empty">
                        <span>⏳</span>
                        <strong>Loading market data...</strong>
                        <p>Please wait.</p>
                    </div>
                </td>
            </tr>
        `;

    }


    try {

        const endpoint =
            `/api/market?crop=${encodeURIComponent(crop)}`;


        const data =
            await apiRequest(endpoint);


        let records =
            data.data ||
            data.market ||
            data.prices ||
            data.records ||
            data;


        if (!Array.isArray(records)) {

            records = [];

        }


        state.marketData =
            records;


        renderMarketTable(records);

        updateConnectionStatus(true);

    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        renderMarketError(
            error.message
        );

    }

}


/* =========================================================
   RENDER MARKET TABLE
========================================================= */

function renderMarketTable(records) {

    const tbody =
        $("#marketTableBody");


    if (!tbody) return;


    if (
        !records ||
        records.length === 0
    ) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="table-empty">
                        <span>📊</span>
                        <strong>Market data unavailable</strong>
                        <p>No market records were returned.</p>
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        records.map(record => {

            const market =
                firstValue(
                    record.market,
                    record.market_name,
                    record.marketName,
                    record.apmc
                ) || "—";


            const crop =
                firstValue(
                    record.crop,
                    record.commodity,
                    record.crop_name
                ) || state.selectedCrop;


            const price =
                firstValue(
                    record.price,
                    record.modal_price,
                    record.modalPrice,
                    record.min_price,
                    record.max_price
                );


            const date =
                firstValue(
                    record.date,
                    record.arrival_date,
                    record.updated_at
                ) || "—";


            return `

                <tr>

                    <td>
                        ${escapeHtml(market)}
                    </td>

                    <td>
                        ${escapeHtml(crop)}
                    </td>

                    <td>
                        <strong>
                            ₹${escapeHtml(
                                formatNumber(price)
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(
                            formatDate(date)
                        )}
                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   MARKET ERROR
========================================================= */

function renderMarketError(message) {

    const tbody =
        $("#marketTableBody");


    if (!tbody) return;


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>⚠️</span>

                    <strong>
                        Market data unavailable
                    </strong>

                    <p>
                        ${escapeHtml(message)}
                    </p>

                    <button
                        type="button"
                        class="outline-button"
                        onclick="loadMarketPrices()">

                        🔄 Try Again

                    </button>

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
            $("#cropPriceSelector")?.value ||
            state.selectedCrop ||
            "onion";


        const data =
            await apiRequest(
                `/api/market/comparison?crop=${encodeURIComponent(crop)}`
            );


        const records =
            data.data ||
            data.markets ||
            data.comparison ||
            data;


        state.comparisonData =
            Array.isArray(records)
                ? records
                : [];


        renderComparison(
            state.comparisonData
        );


        updateConnectionStatus(true);


    } catch (error) {

        console.error(
            "Comparison error:",
            error
        );

        renderComparisonError(
            error.message
        );

    }

}


/* =========================================================
   RENDER COMPARISON
========================================================= */

function renderComparison(records) {

    const cards =
        $$("#comparisonSection .market-card");


    if (!cards.length) return;


    cards.forEach(card => {

        const title =
            card.querySelector("h3");

        const value =
            card.querySelector(
                ".market-value strong"
            );

        const description =
            card.querySelector("p");


        if (!title) return;


        const marketName =
            title.textContent
                .trim()
                .toLowerCase();


        const record =
            records.find(item => {

                const name =
                    String(
                        firstValue(
                            item.market,
                            item.market_name,
                            item.name
                        ) || ""
                    ).toLowerCase();


                return (
                    name.includes(
                        marketName.split(" ")[0]
                    ) ||
                    marketName.includes(
                        name.split(" ")[0]
                    )
                );

            });


        if (!record) {

            if (value) {

                value.textContent =
                    "—";

            }

            if (description) {

                description.textContent =
                    "Data unavailable";

            }

            return;

        }


        const price =
            firstValue(
                record.price,
                record.modal_price,
                record.modalPrice,
                record.min_price,
                record.max_price
            );


        if (value) {

            value.textContent =
                price !== undefined
                    ? `₹${formatNumber(price)}`
                    : "—";

        }


        if (description) {

            description.textContent =
                "Connected market data";

        }

    });

}


/* =========================================================
   COMPARISON ERROR
========================================================= */

function renderComparisonError(message) {

    $$("#comparisonSection .market-card")
        .forEach(card => {

            const value =
                card.querySelector(
                    ".market-value strong"
                );

            const description =
                card.querySelector("p");


            if (value) {

                value.textContent = "—";

            }


            if (description) {

                description.textContent =
                    "Unable to load market data";

            }

        });

}


/* =========================================================
   CROP INFORMATION
========================================================= */

const cropInformation = {

    onion: {

        title: {
            en: "Onion Cultivation Guide",
            hi: "प्याज खेती मार्गदर्शिका",
            mr: "कांदा लागवड मार्गदर्शक"
        },

        sections: {

            en: [

                {
                    title: "🌱 Cultivation Guidance",
                    text:
                        "Onion grows best in well-drained loamy soil. Prepare fine soil beds and avoid waterlogging."
                },

                {
                    title: "💧 Irrigation",
                    text:
                        "Maintain regular moisture. Avoid excessive irrigation because waterlogging can damage bulbs."
                },

                {
                    title: "🌾 Crop Management",
                    text:
                        "Keep the field weed-free, monitor pests regularly and maintain proper plant spacing."
                },

                {
                    title: "🧪 Fertilizer",
                    text:
                        "Use soil-test-based fertilizer recommendations and provide balanced nutrients during crop growth."
                },

                {
                    title: "📦 Harvest",
                    text:
                        "Harvest when the tops bend and bulbs reach maturity. Cure bulbs properly before storage."
                }

            ],

            hi: [

                {
                    title: "🌱 खेती मार्गदर्शन",
                    text:
                        "प्याज के लिए अच्छी जल निकासी वाली दोमट मिट्टी उपयुक्त होती है। खेत में पानी जमा न होने दें।"
                },

                {
                    title: "💧 सिंचाई",
                    text:
                        "नियमित नमी बनाए रखें। अधिक सिंचाई से बचें क्योंकि पानी जमा होने से प्याज खराब हो सकता है।"
                },

                {
                    title: "🌾 फसल प्रबंधन",
                    text:
                        "खेत को खरपतवार मुक्त रखें और कीटों की नियमित निगरानी करें।"
                },

                {
                    title: "🧪 उर्वरक",
                    text:
                        "मिट्टी परीक्षण के आधार पर संतुलित उर्वरक का उपयोग करें।"
                },

                {
                    title: "📦 कटाई",
                    text:
                        "प्याज के पत्ते झुकने और बल्ब परिपक्व होने पर कटाई करें। भंडारण से पहले अच्छी तरह सुखाएं।"
                }

            ],

            mr: [

                {
                    title: "🌱 लागवड मार्गदर्शन",
                    text:
                        "कांद्यासाठी चांगला निचरा होणारी पोयटाची जमीन योग्य आहे. शेतात पाणी साचू देऊ नका."
                },

                {
                    title: "💧 सिंचन",
                    text:
                        "नियमित ओलावा ठेवा. जास्त पाणी देणे टाळा."
                },

                {
                    title: "🌾 पीक व्यवस्थापन",
                    text:
                        "शेत तणमुक्त ठेवा आणि किडींची नियमित तपासणी करा."
                },

                {
                    title: "🧪 खत व्यवस्थापन",
                    text:
                        "माती परीक्षणावर आधारित संतुलित खतांचा वापर करा."
                },

                {
                    title: "📦 काढणी",
                    text:
                        "पाने वाकल्यानंतर आणि कांदा पूर्ण वाढल्यानंतर काढणी करा. साठवणुकीपूर्वी कांदा व्यवस्थित वाळवा."
                }

            ]

        }

    },


    wheat: {

        title: {

            en: "Wheat Cultivation Guide",
            hi: "गेहूं खेती मार्गदर्शिका",
            mr: "गहू लागवड मार्गदर्शक"

        },

        sections: {

            en: [

                {
                    title: "🌱 Cultivation Guidance",
                    text:
                        "Wheat performs well in fertile, well-drained soil with suitable temperature during crop establishment."
                },

                {
                    title: "💧 Irrigation",
                    text:
                        "Critical irrigation stages should be maintained according to soil moisture and local conditions."
                },

                {
                    title: "🌾 Crop Management",
                    text:
                        "Maintain suitable plant population and monitor weeds, insects and diseases."
                },

                {
                    title: "🧪 Nutrient Management",
                    text:
                        "Apply nutrients based on soil testing and recommended crop requirements."
                },

                {
                    title: "📦 Harvest",
                    text:
                        "Harvest when grains reach maturity and moisture is suitable for harvesting and storage."
                }

            ],

            hi: [

                {
                    title: "🌱 खेती मार्गदर्शन",
                    text:
                        "गेहूं उपजाऊ और अच्छी जल निकासी वाली मिट्टी में अच्छी तरह बढ़ता है।"
                },

                {
                    title: "💧 सिंचाई",
                    text:
                        "फसल की महत्वपूर्ण अवस्थाओं में मिट्टी की नमी और स्थानीय परिस्थितियों के अनुसार सिंचाई करें।"
                },

                {
                    title: "🌾 फसल प्रबंधन",
                    text:
                        "उचित पौध संख्या बनाए रखें और खरपतवार, कीट तथा रोगों की निगरानी करें।"
                },

                {
                    title: "🧪 पोषक तत्व",
                    text:
                        "मिट्टी परीक्षण और फसल की आवश्यकता के अनुसार पोषक तत्व दें।"
                },

                {
                    title: "📦 कटाई",
                    text:
                        "जब दाने परिपक्व हो जाएं और कटाई के लिए उचित नमी हो तब कटाई करें।"
                }

            ],

            mr: [

                {
                    title: "🌱 लागवड मार्गदर्शन",
                    text:
                        "गहूसाठी सुपीक आणि चांगला निचरा होणारी जमीन योग्य आहे."
                },

                {
                    title: "💧 सिंचन",
                    text:
                        "मातीतील ओलावा आणि स्थानिक परिस्थितीनुसार महत्त्वाच्या अवस्थांमध्ये सिंचन करा."
                },

                {
                    title: "🌾 पीक व्यवस्थापन",
                    text:
                        "योग्य रोपसंख्या ठेवा आणि तण, किडी व रोगांची नियमित तपासणी करा."
                },

                {
                    title: "🧪 अन्नद्रव्य व्यवस्थापन",
                    text:
                        "माती परीक्षणानुसार योग्य खतांचा वापर करा."
                },

                {
                    title: "📦 काढणी",
                    text:
                        "दाणे पूर्ण पिकल्यावर आणि योग्य ओलावा असताना काढणी करा."
                }

            ]

        }

    }

};


/* =========================================================
   CROP CARD CLICK HANDLER
========================================================= */

function setupCropInformation() {

    $$("#cropSection .crop-card")
        .forEach(card => {

            card.setAttribute(
                "role",
                "button"
            );

            card.setAttribute(
                "tabindex",
                "0"
            );


            const title =
                card.querySelector("h2");


            if (!title) return;


            const crop =
                title.textContent
                    .toLowerCase()
                    .includes("wheat") ||
                title.textContent
                    .includes("गेहूं") ||
                title.textContent
                    .includes("गहू")
                    ? "wheat"
                    : "onion";


            card.addEventListener(
                "click",
                () => {

                    openCropInformation(
                        crop
                    );

                }
            );


            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openCropInformation(
                            crop
                        );

                    }

                }
            );

        });

}


/* =========================================================
   OPEN CROP INFORMATION
========================================================= */

function openCropInformation(crop) {

    const info =
        cropInformation[crop];


    if (!info) return;


    const language =
        state.language;


    const title =
        info.title[language] ||
        info.title.en;


    const sections =
        info.sections[language] ||
        info.sections.en;


    const existing =
        document.getElementById(
            "cropInfoModal"
        );


    if (existing) {

        existing.remove();

    }


    const modal =
        document.createElement("div");


    modal.id =
        "cropInfoModal";


    modal.className =
        "crop-info-modal";


    modal.innerHTML = `

        <div
            class="crop-info-backdrop"
            data-close-crop-modal>
        </div>

        <div
            class="crop-info-dialog"
            role="dialog"
            aria-modal="true">

            <button
                type="button"
                class="crop-info-close"
                data-close-crop-modal>
                ×
            </button>

            <div class="crop-info-header">

                <div class="crop-info-large-icon">
                    ${crop === "onion" ? "🧅" : "🌾"}
                </div>

                <div>

                    <h2>
                        ${escapeHtml(title)}
                    </h2>

                    <p>
                        SmartAgri Farmer Information
                    </p>

                </div>

            </div>

            <div class="crop-info-content">

                ${sections.map(section => `

                    <div class="crop-info-item">

                        <h3>
                            ${escapeHtml(section.title)}
                        </h3>

                        <p>
                            ${escapeHtml(section.text)}
                        </p>

                    </div>

                `).join("")}

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    modal.querySelectorAll(
        "[data-close-crop-modal]"
    ).forEach(element => {

        element.addEventListener(
            "click",
            () => {

                modal.remove();

            }
        );

    });


    document.addEventListener(
        "keydown",
        function closeOnEscape(event) {

            if (
                event.key === "Escape" &&
                document.getElementById(
                    "cropInfoModal"
                )
            ) {

                modal.remove();

                document.removeEventListener(
                    "keydown",
                    closeOnEscape
                );

            }

        }
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

async function askAI(question) {

    const messages =
        $("#chatMessages");


    if (!messages) return;


    addChatMessage(
        question,
        "user"
    );


    const loadingId =
        addChatMessage(
            "Thinking...",
            "assistant",
            true
        );


    try {

        const data =
            await apiRequest(
                "/api/ai",
                {
                    method: "POST",

                    body: JSON.stringify({

                        message: question,

                        question: question,

                        language:
                            state.language,

                        farmer:
                            state.farmer || {},

                        context: {

                            village:
                                state.farmer?.village ||
                                "Kopargaon",

                            state:
                                state.farmer?.state ||
                                "Maharashtra",

                            crop:
                                state.selectedCrop

                        }

                    })

                }
            );


        removeChatMessage(
            loadingId
        );


        const answer =
            firstValue(
                data.response,
                data.answer,
                data.message,
                data.text,
                data.generated_text
            ) ||
            "I could not generate a response.";


        addChatMessage(
            answer,
            "assistant"
        );


        updateAIConnectionBadge(
            true
        );


        return answer;


    } catch (error) {

        console.error(
            "AI error:",
            error
        );


        removeChatMessage(
            loadingId
        );


        addChatMessage(
            `AI service error: ${error.message}`,
            "assistant"
        );


        updateAIConnectionBadge(
            false
        );

    }

}


/* =========================================================
   ADD CHAT MESSAGE
========================================================= */

function addChatMessage(
    text,
    type,
    temporary = false
) {

    const messages =
        $("#chatMessages");


    if (!messages) return null;


    const id =
        `chat-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`;


    const message =
        document.createElement("div");


    message.id = id;


    message.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    const label =
        type === "user"
            ? (
                state.farmer?.name ||
                "Farmer"
            )
            : (
                translations[
                    state.language
                ].assistant ||
                "Assistant"
            );


    message.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHtml(label)}
            </strong>

            <p>
                ${escapeHtml(text)}
            </p>

        </div>

    `;


    messages.appendChild(
        message
    );


    messages.scrollTop =
        messages.scrollHeight;


    return id;

}


/* =========================================================
   REMOVE CHAT MESSAGE
========================================================= */

function removeChatMessage(id) {

    if (!id) return;


    const element =
        document.getElementById(id);


    if (element) {

        element.remove();

    }

}


/* =========================================================
   AI BADGE
========================================================= */

function updateAIConnectionBadge(
    connected
) {

    const badge =
        $(".not-connected-badge");


    if (!badge) return;


    const span =
        badge.querySelector(
            "span:last-child"
        );


    if (connected) {

        badge.classList.add(
            "connected"
        );

        if (span) {

            span.textContent =
                translations[
                    state.language
                ].aiNotConnected ===
                "AI Not Connected"
                    ? "AI Connected"
                    : translations[
                        state.language
                    ].aiNotConnected;

        }

    } else {

        badge.classList.remove(
            "connected"
        );

        if (span) {

            span.textContent =
                "AI Not Connected";

        }

    }

}


/* =========================================================
   CROP HEALTH AI
========================================================= */

async function analyzeCropImage() {

    const image =
        state.selectedImage;


    if (!image) {

        return;

    }


    const result =
        $("#cropAnalysisResult");


    const button =
        $("#analyzeCropBtn");


    if (button) {

        button.disabled = true;

        button.textContent =
            "Analyzing...";

    }


    if (result) {

        result.innerHTML = `

            <div class="analysis-loading">

                <span>🤖</span>

                <strong>
                    Analyzing crop image...
                </strong>

                <p>
                    Please wait.
                </p>

            </div>

        `;

    }


    try {

        const formData =
            new FormData();


        formData.append(
            "image",
            image
        );


        formData.append(
            "language",
            state.language
        );


        if (state.farmer?.village) {

            formData.append(
                "village",
                state.farmer.village
            );

        }


        const response =
            await fetch(
                `${API_BASE}/api/crop-health`,
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Crop analysis failed."
            );

        }


        renderCropAnalysis(
            data
        );


    } catch (error) {

        console.error(
            "Crop health error:",
            error
        );


        if (result) {

            result.innerHTML = `

                <strong>
                    ⚠️ Crop analysis failed
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

            button.disabled = false;

            button.textContent =
                "Analyze Crop";

        }

    }

}


/* =========================================================
   RENDER CROP ANALYSIS
========================================================= */

function renderCropAnalysis(data) {

    const result =
        $("#cropAnalysisResult");


    if (!result) return;


    const analysis =
        firstValue(
            data.analysis,
            data.result,
            data.response,
            data.message,
            data.prediction
        );


    const disease =
        firstValue(
            data.disease,
            data.disease_name,
            data.label
        );


    const confidence =
        firstValue(
            data.confidence,
            data.score
        );


    result.innerHTML = `

        <div class="analysis-success">

            <div class="analysis-result-icon">
                🌿
            </div>

            <h3>
                Crop Health Analysis
            </h3>

            ${
                disease
                    ? `
                        <p>
                            <strong>Disease / Condition:</strong>
                            ${escapeHtml(disease)}
                        </p>
                    `
                    : ""
            }

            ${
                confidence !== undefined
                    ? `
                        <p>
                            <strong>Confidence:</strong>
                            ${escapeHtml(
                                formatConfidence(
                                    confidence
                                )
                            )}
                        </p>
                    `
                    : ""
            }

            ${
                analysis
                    ? `
                        <div class="analysis-text">
                            ${escapeHtml(
                                analysis
                            )}
                        </div>
                    `
                    : ""
            }

        </div>

    `;

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function setupImageUpload() {

    const input =
        $("#cropImageInput");


    const previewContainer =
        $("#imagePreviewContainer");


    const preview =
        $("#cropImagePreview");


    const analyzeButton =
        $("#analyzeCropBtn");


    if (!input) return;


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files?.[0];


            if (!file) {

                state.selectedImage =
                    null;

                if (analyzeButton) {

                    analyzeButton.disabled =
                        true;

                }

                return;

            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                input.value = "";

                return;

            }


            state.selectedImage =
                file;


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    if (preview) {

                        preview.src =
                            event.target.result;

                    }


                    if (previewContainer) {

                        previewContainer.classList.remove(
                            "hidden"
                        );

                    }

                };


            reader.readAsDataURL(
                file
            );


            if (analyzeButton) {

                analyzeButton.disabled =
                    false;

            }

        }
    );

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function setupVoiceAssistant() {

    const startButton =
        $("#startVoiceBtn");


    const stopButton =
        $("#stopVoiceBtn");


    const voiceInput =
        $("#voiceInput");


    const voiceResponse =
        $("#voiceResponse");


    if (!startButton) return;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.disabled = true;

        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition is not supported in this browser.";

        }

        return;

    }


    state.voiceRecognition =
        new SpeechRecognition();


    state.voiceRecognition.continuous =
        false;


    state.voiceRecognition.interimResults =
        false;


    state.voiceRecognition.lang =
        getSpeechLanguage();


    state.voiceRecognition.onstart =
        () => {

            state.isListening =
                true;


            startButton.classList.add(
                "hidden"
            );


            if (stopButton) {

                stopButton.classList.remove(
                    "hidden"
                );

            }


            if (voiceResponse) {

                voiceResponse.textContent =
                    "Listening...";

            }

        };


    state.voiceRecognition.onresult =
        async event => {

            const transcript =
                event.results[0][0]
                    .transcript;


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            if (voiceResponse) {

                voiceResponse.textContent =
                    "Processing your question...";

            }


            const answer =
                await askAI(
                    transcript
                );


            if (answer) {

                if (voiceResponse) {

                    voiceResponse.textContent =
                        answer;

                }


                speakText(
                    answer
                );

            }

        };


    state.voiceRecognition.onerror =
        event => {

            console.error(
                "Voice recognition error:",
                event.error
            );


            if (voiceResponse) {

                voiceResponse.textContent =
                    `Voice error: ${event.error}`;

            }

        };


    state.voiceRecognition.onend =
        () => {

            state.isListening =
                false;


            startButton.classList.remove(
                "hidden"
            );


            if (stopButton) {

                stopButton.classList.add(
                    "hidden"
                );

            }

        };


    startButton.addEventListener(
        "click",
        () => {

            state.voiceRecognition.lang =
                getSpeechLanguage();


            try {

                state.voiceRecognition.start();

            } catch (error) {

                console.error(error);

            }

        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                try {

                    state.voiceRecognition.stop();

                } catch (error) {

                    console.error(error);

                }

            }
        );

    }

}


/* =========================================================
   SPEECH LANGUAGE
========================================================= */

function getSpeechLanguage() {

    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    return (
        languages[state.language] ||
        "en-IN"
    );

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (
        !window.speechSynthesis ||
        !text
    ) {

        return;

    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        getSpeechLanguage();


    utterance.rate =
        0.95;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   SCHEME BUTTONS
========================================================= */

function setupSchemeButtons() {

    $$(".scheme-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

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

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (
            firebaseReady &&
            auth &&
            !state.isDemo
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    state.farmer = null;

    state.isDemo = false;

    state.weather = null;

    state.marketData = [];


    showScreen(
        "loginPage"
    );


    closeSideMenu();

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    const email =
        $("#loginEmail")?.value.trim();


    if (!email) {

        showMessage(
            "loginMessage",
            "Enter your email address first.",
            "error"
        );

        return;

    }


    if (!firebaseReady || !auth) {

        showMessage(
            "loginMessage",
            "Firebase is not configured.",
            "error"
        );

        return;

    }


    try {

        await auth.sendPasswordResetEmail(
            email
        );


        showMessage(
            "loginMessage",
            "Password reset email sent.",
            "success"
        );

    } catch (error) {

        showMessage(
            "loginMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {


    /* -----------------------------------------
       AUTH
    ----------------------------------------- */

    $("#loginForm")?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            loginUser(

                $("#loginEmail").value.trim(),

                $("#loginPassword").value

            );

        }
    );


    $("#registrationForm")?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            registerUser();

        }
    );


    $("#demoBtn")?.addEventListener(
        "click",
        enterDemoDashboard
    );


    $("#forgotPasswordBtn")?.addEventListener(
        "click",
        forgotPassword
    );


    $("#showRegisterBtn")?.addEventListener(
        "click",
        () => {

            showScreen(
                "registerPage"
            );

        }
    );


    $("#showLoginBtn")?.addEventListener(
        "click",
        () => {

            showScreen(
                "loginPage"
            );

        }
    );


    $("#changeLanguageFromLogin")
        ?.addEventListener(
            "click",
            () => {

                showScreen(
                    "languagePage"
                );

            }
        );


    /* -----------------------------------------
       SIDE MENU
    ----------------------------------------- */

    $("#hamburgerBtn")?.addEventListener(
        "click",
        openSideMenu
    );


    $("#closeMenuBtn")?.addEventListener(
        "click",
        closeSideMenu
    );


    $("#menuOverlay")?.addEventListener(
        "click",
        closeSideMenu
    );


    /* -----------------------------------------
       NAVIGATION
    ----------------------------------------- */

    $$("[data-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;


                    if (section) {

                        showSection(
                            section
                        );

                    }

                }
            );

        });


    /* -----------------------------------------
       PROFILE MENU
    ----------------------------------------- */

    $("#profileButton")?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleProfileMenu();

        }
    );


    document.addEventListener(
        "click",
        event => {

            const menu =
                $("#profileMenu");


            const button =
                $("#profileButton");


            if (
                menu &&
                !menu.contains(event.target) &&
                !button?.contains(event.target)
            ) {

                menu.classList.remove(
                    "active"
                );

            }

        }
    );


    $$("[data-profile-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.profileSection;


                    showSection(
                        section
                    );


                    $("#profileMenu")
                        ?.classList.remove(
                            "active"
                        );

                }
            );

        });


    $("#profileLogoutBtn")
        ?.addEventListener(
            "click",
            logoutUser
        );


    $("#sideLogoutBtn")
        ?.addEventListener(
            "click",
            logoutUser
        );


    /* -----------------------------------------
       WEATHER
    ----------------------------------------- */

    $("#refreshWeatherBtn")
        ?.addEventListener(
            "click",
            loadWeather
        );


    /* -----------------------------------------
       MARKET
    ----------------------------------------- */

    $("#cropPriceSelector")
        ?.addEventListener(
            "change",
            () => {

                state.selectedCrop =
                    $("#cropPriceSelector")
                        .value;


                loadMarketPrices();

                loadMarketComparison();

            }
        );


    /* -----------------------------------------
       CROP HEALTH
    ----------------------------------------- */

    $("#analyzeCropBtn")
        ?.addEventListener(
            "click",
            analyzeCropImage
        );


    /* -----------------------------------------
       PROFILE
    ----------------------------------------- */

    $("#editProfileBtn")
        ?.addEventListener(
            "click",
            enableProfileEditing
        );


    $("#cancelProfileEditBtn")
        ?.addEventListener(
            "click",
            () => {

                populateFarmerProfile();

                disableProfileEditing();

            }
        );


    $("#profileForm")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveProfile();

            }
        );


    /* -----------------------------------------
       LANGUAGE
    ----------------------------------------- */

    $("#dashboardLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    $("#settingsLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    $("#registerLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    $("#profileLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    /* -----------------------------------------
       AI
    ----------------------------------------- */

    $("#aiForm")
        ?.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    $("#aiInput");


                const question =
                    input?.value.trim();


                if (!question) return;


                input.value = "";


                askAI(question);

            }
        );


    /* -----------------------------------------
       KEYBOARD SHORTCUT FOR AI
    ----------------------------------------- */

    $("#aiInput")
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    $("#aiForm")
                        ?.requestSubmit();

                }

            }
        );

}


/* =========================================================
   ONLINE / OFFLINE BROWSER EVENTS
========================================================= */

window.addEventListener(
    "online",
    () => {

        updateConnectionStatus(
            true
        );

        testBackendConnection();

    }
);


window.addEventListener(
    "offline",
    () => {

        updateConnectionStatus(
            false
        );

    }
);


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function firstValue(...values) {

    for (const value of values) {

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {

            return value;

        }

    }


    return undefined;

}


function formatNumber(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "—";

    }


    const number =
        Number(
            String(value)
                .replace(/,/g, "")
                .replace(/[₹]/g, "")
                .trim()
        );


    if (Number.isNaN(number)) {

        return String(value);

    }


    return number.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );

}


function formatUnit(
    value,
    unit
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "—";

    }


    return `${formatNumber(value)}${unit}`;

}


function formatDate(value) {

    if (
        !value ||
        value === "—"
    ) {

        return "—";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatConfidence(value) {

    const number =
        Number(value);


    if (Number.isNaN(number)) {

        return String(value);

    }


    if (number <= 1) {

        return `${(
            number * 100
        ).toFixed(1)}%`;

    }


    return `${number.toFixed(1)}%`;

}


/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHtml(value) {

    if (
        value === undefined ||
        value === null
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


/* =========================================================
   INITIAL APPLICATION STARTUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "SmartAgri frontend starting..."
        );


        /* Apply saved language */

        applyLanguage(
            state.language
        );


        /* Set language selector */

        const languageButton =
            document.querySelector(
                `.language-option[data-language="${state.language}"]`
            );


        if (languageButton) {

            languageButton.classList.add(
                "selected"
            );


            const continueButton =
                $("#continueLanguageBtn");


            if (continueButton) {

                continueButton.disabled =
                    false;

            }

        }


        /* Setup everything */

        setupLanguagePage();

        setupEventListeners();

        setupImageUpload();

        setupVoiceAssistant();

        setupSchemeButtons();

        setupCropInformation();

        setupFirebaseAuth();


        /* Backend check */

        await testBackendConnection();


        /* Restore demo session */

        const demoSession =
            localStorage.getItem(
                "smartagri_demo"
            );


        if (demoSession === "true") {

            enterDemoDashboard();

        }


        console.log(
            "SmartAgri frontend ready."
        );

    }
);


/* =========================================================
   OPTIONAL GLOBAL FUNCTIONS
   ---------------------------------------------------------
   These make functions accessible from HTML/CSS-generated
   buttons and browser console.
========================================================= */

window.SmartAgri = {

    state,

    showSection,

    loadWeather,

    loadMarketPrices,

    loadMarketComparison,

    askAI,

    analyzeCropImage,

    openCropInformation,

    applyLanguage,

    logoutUser,

    enterDemoDashboard

};
