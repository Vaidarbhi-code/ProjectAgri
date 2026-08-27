/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND JAVASCRIPT
   =========================================================

   Flask endpoints used:
   GET  /api/status
   GET  /health
   GET  /api/weather
   GET  /api/weather/history
   GET  /api/market-prices
   GET  /api/market/history
   POST /api/ai
   POST /api/crop-health

   Firebase:
   Authentication + Firestore
========================================================= */


/* =========================================================
   FIREBASE CONFIG
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

}


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {

    language:
        localStorage.getItem("smartagri_language") || "en",

    currentUser: null,

    farmerProfile: null,

    selectedCrop: "onion",

    selectedImage: null,

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
        languageDescription: "Select your preferred language to continue.",
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
        registrationSubtitle: "Create your SmartAgri farmer account",
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
        myProfile: "My Profile",

        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",
        profileSummary: "Your registered information",
        editProfile: "Edit Profile",
        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",
        liveDataTitle: "Live Data",
        liveDataDescription: "Only verified connected data is displayed.",

        offline: "Offline",
        online: "Online",
        connectionStatus: "Connection Status",

        weatherSubtitle: "Local weather conditions for farming decisions.",
        currentWeather: "Current Weather",
        refresh: "Refresh",
        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription: "No verified weather data has been received.",
        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        marketSubtitle: "Current crop prices from connected verified sources.",
        marketPriceTable: "Market Price Table",
        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",
        onion: "Onion",
        wheat: "Wheat",
        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription:
            "No verified market data has been received.",
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
        analysisNotConnectedDescription:
            "Connect a verified crop-health AI service before displaying analysis.",

        schemesSubtitle: "Farmer support and government agricultural programs.",
        pmKisanDescription: "Official PM-KISAN farmer support information.",
        pmksyDescription: "Official irrigation and water-management information.",
        cropInsurance: "Crop Insurance",
        cropInsuranceDescription:
            "Official Pradhan Mantri Fasal Bima Yojana information.",
        learnMore: "Learn More",

        aiSubtitle: "Ask farming-related questions.",
        smartAssistant: "Smart Farmer Assistant",
        aiNotConnected: "AI Not Connected",
        assistant: "Assistant",
        aiUnavailable: "AI service is not connected yet.",
        askQuestion: "Ask a farming question...",
        aiConnectionNote:
            "AI responses require a connected AI service/backend.",

        voiceSubtitle: "Speak and listen in your preferred language.",
        voiceAssistantTitle: "Smart Voice Assistance",
        voiceDescription: "Speak using your device microphone.",
        startVoice: "Start Voice Assistance",
        stopVoice: "Stop Listening",
        voiceInput: "Voice Input",
        voiceInputPlaceholder: "Voice input will appear here...",
        voiceResponse: "Voice Response",
        voiceReady: "Voice assistance is ready.",

        profileSubtitle: "View and edit your farmer information.",
        saveChanges: "Save Changes",
        cancel: "Cancel",

        settingsSubtitle: "Manage your SmartAgri preferences.",
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
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."

    },


    hi: {

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",
        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri तक पहुंचने के लिए लॉगिन करें",
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
        registrationSubtitle: "अपना SmartAgri किसान खाता बनाएं",
        fullName: "पूरा नाम",
        mobile: "मोबाइल नंबर",
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
        dashboardSubtitle: "आपकी खेती की जानकारी एक ही जगह।",
        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",
        quickActions: "त्वरित कार्य",
        quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",
        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिति",

        weatherSubtitle: "खेती के निर्णयों के लिए स्थानीय मौसम की जानकारी।",
        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",
        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",
        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल कीमतें।",
        marketPriceTable: "बाजार भाव तालिका",
        market: "बाजार",
        crop: "फसल",
        price: "कीमत",
        date: "तारीख",
        onion: "प्याज",
        wheat: "गेहूं",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle: "फसल उत्पादन और प्रबंधन मार्गदर्शन।",
        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",
        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि पद्धतियां",

        cropHealthSubtitle:
            "AI सहायता से फसल की जांच के लिए फोटो अपलोड करें।",
        uploadCropImage: "फसल / पत्ती की फोटो अपलोड करें",
        uploadCropDescription:
            "फसल स्वास्थ्य जांच के लिए फोटो चुनें।",
        chooseImage: "फोटो चुनें",
        analyzeCrop: "फसल की जांच करें",
        analysisNotConnected: "AI फसल विश्लेषण कनेक्ट नहीं है",
        analysisNotConnectedDescription:
            "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य सेवा कनेक्ट करें।",

        schemesSubtitle: "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",
        pmKisanDescription: "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
        pmksyDescription: "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
        cropInsurance: "फसल बीमा",
        cropInsuranceDescription:
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",
        learnMore: "अधिक जानकारी",

        aiSubtitle: "खेती से जुड़े सवाल पूछें।",
        smartAssistant: "स्मार्ट किसान सहायक",
        aiNotConnected: "AI कनेक्ट नहीं है",
        assistant: "सहायक",
        aiUnavailable: "AI सेवा अभी कनेक्ट नहीं है।",
        askQuestion: "खेती से जुड़ा सवाल पूछें...",
        aiConnectionNote:
            "AI उत्तर के लिए AI सेवा/बैकएंड कनेक्शन आवश्यक है।",

        voiceSubtitle: "अपनी पसंदीदा भाषा में बोलें और सुनें।",
        voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
        voiceDescription: "अपने डिवाइस के माइक्रोफोन से बोलें।",
        startVoice: "वॉयस सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",
        voiceInput: "वॉयस इनपुट",
        voiceInputPlaceholder: "वॉयस इनपुट यहां दिखाई देगा...",
        voiceResponse: "वॉयस प्रतिक्रिया",
        voiceReady: "वॉयस सहायता तैयार है।",

        profileSubtitle: "अपनी किसान जानकारी देखें और संपादित करें।",
        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle: "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
        voiceSettingDescription:
            "वॉयस सहायता चालू या बंद करें।",
        notifications: "सूचनाएं",
        notificationDescription:
            "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        marketIntelligence: "बाजार सूचना",
        multilingualSupport: "बहुभाषी सहायता",
        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",
        chooseLanguage: "आपली भाषा निवडा",
        languageDescription: "पुढे जाण्यासाठी आपली आवडती भाषा निवडा.",
        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle: "SmartAgri वापरण्यासाठी लॉगिन करा",
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
        registrationSubtitle: "आपले SmartAgri शेतकरी खाते तयार करा",
        fullName: "पूर्ण नाव",
        mobile: "मोबाईल नंबर",
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
        voiceAssistance: "आवाज सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",
        myProfile: "माझी प्रोफाइल",

        welcome: "स्वागत",
        dashboardSubtitle: "आपली शेतीची माहिती एका ठिकाणी.",
        profileSummary: "आपली नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",
        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची कृषी साधने त्वरीत वापरा.",
        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिती",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",
        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",
        weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक भाव.",
        marketPriceTable: "बाजारभाव तक्ता",
        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",
        onion: "कांदा",
        wheat: "गहू",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle: "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
        onionInfo: "कांदा लागवड माहिती.",
        wheatInfo: "गहू लागवड माहिती.",
        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle:
            "AI सहाय्याने पिकाच्या तपासणीसाठी फोटो अपलोड करा.",
        uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
        uploadCropDescription:
            "पीक आरोग्य तपासणीसाठी फोटो निवडा.",
        chooseImage: "फोटो निवडा",
        analyzeCrop: "पीक तपासा",
        analysisNotConnected: "AI पीक विश्लेषण कनेक्ट केलेले नाही",
        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",
        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",
        cropInsurance: "पीक विमा",
        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री फसल बीमा योजना माहिती.",
        learnMore: "अधिक माहिती",

        aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
        aiNotConnected: "AI कनेक्ट केलेले नाही",
        assistant: "सहाय्यक",
        aiUnavailable: "AI सेवा अद्याप कनेक्ट केलेली नाही.",
        askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",
        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",
        voiceAssistantTitle: "स्मार्ट आवाज सहाय्य",
        voiceDescription:
            "आपल्या डिव्हाइसच्या मायक्रोफोनचा वापर करून बोला.",
        startVoice: "आवाज सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",
        voiceInput: "आवाज इनपुट",
        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",
        voiceResponse: "आवाज प्रतिसाद",
        voiceReady: "आवाज सहाय्य तयार आहे.",

        profileSubtitle:
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",
        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle:
            "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",
        changeLanguageDescription:
            "आपली पसंतीची अ‍ॅप भाषा निवडा.",
        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",
        notifications: "सूचना",
        notificationDescription:
            "अ‍ॅप सूचना सुरू किंवा बंद करा.",

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
   TRANSLATION FUNCTION
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

    const dictionary = translations[language];

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

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


    /* Select language dropdowns */

    const dashboardLanguage =
        $("dashboardLanguage");

    const settingsLanguage =
        $("settingsLanguage");

    const profileLanguage =
        $("profileLanguage");

    const registerLanguage =
        $("registerLanguage");


    if (dashboardLanguage)
        dashboardLanguage.value = language;

    if (settingsLanguage)
        settingsLanguage.value = language;

    if (profileLanguage)
        profileLanguage.value = language;

    if (registerLanguage)
        registerLanguage.value = language;


    /* Speech language */

    updateSpeechLanguage();

}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        $("continueLanguageBtn");


    let selectedLanguage =
        localStorage.getItem(
            "smartagri_language"
        );


    /*
       Important:
       The Continue button must work even on
       the first visit.
    */

    if (!selectedLanguage) {

        selectedLanguage = "en";

    }


    /* Select saved language visually */

    languageButtons.forEach(button => {

        const buttonLanguage =
            button.getAttribute(
                "data-language"
            );

        button.classList.toggle(
            "selected",
            buttonLanguage === selectedLanguage
        );

    });


    if (continueButton) {

        continueButton.disabled = false;

    }


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                selectedLanguage =
                    this.getAttribute(
                        "data-language"
                    );


                languageButtons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                this.classList.add(
                    "selected"
                );


                if (continueButton) {

                    continueButton.disabled =
                        false;

                }


                applyLanguage(
                    selectedLanguage
                );

            }
        );

    });


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                if (!selectedLanguage) {
                    selectedLanguage = "en";
                }


                applyLanguage(
                    selectedLanguage
                );


                showScreen("loginPage");

            }
        );

    }

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(
            ".screen"
        )
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


    /* Dashboard is separate from normal screens */

    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        if (screenId === "dashboardPage") {

            dashboard.classList.add(
                "active-screen"
            );

        } else {

            dashboard.classList.remove(
                "active-screen"
            );

        }

    }

}


/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }


    closeSideMenu();

    closeProfileMenu();

    loadDashboardData();

}


/* =========================================================
   FIREBASE REGISTRATION
========================================================= */

async function registerFarmer(event) {

    event.preventDefault();


    const message =
        $("registerMessage");


    if (!firebaseReady) {

        showMessage(
            message,
            "Firebase is not available.",
            "error"
        );

        return;

    }


    const name =
        $("registerName").value.trim();

    const email =
        $("registerEmail").value.trim();

    const mobile =
        $("registerMobile").value.trim();

    const village =
        $("registerVillage").value.trim();

    const farmerState =
        $("registerState").value.trim();

    const landArea =
        $("registerLandArea").value.trim();

    const market =
        $("registerMarket").value;

    const language =
        $("registerLanguage").value;

    const password =
        $("registerPassword").value;


    try {

        showMessage(
            message,
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


        const profile = {

            uid: user.uid,

            name: name,

            email: email,

            mobile: mobile,

            village: village,

            state: farmerState,

            landArea: landArea,

            preferredMarket: market,

            language: language,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp(),

            updatedAt:
                firebase.firestore.FieldValue.serverTimestamp()

        };


        await db
            .collection("farmers")
            .doc(user.uid)
            .set(profile);


        state.currentUser = user;

        state.farmerProfile = profile;


        applyLanguage(language);


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
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FIREBASE LOGIN
========================================================= */

async function loginFarmer(event) {

    event.preventDefault();


    const message =
        $("loginMessage");


    if (!firebaseReady) {

        showMessage(
            message,
            "Firebase is not available.",
            "error"
        );

        return;

    }


    const email =
        $("loginEmail").value.trim();

    const password =
        $("loginPassword").value;


    try {

        showMessage(
            message,
            "Logging in...",
            "info"
        );


        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        state.currentUser =
            result.user;


        await loadFarmerProfile(
            result.user
        );


        showMessage(
            message,
            "Login successful.",
            "success"
        );


        setTimeout(
            () => {

                showDashboard();

            },
            400
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        showMessage(
            message,
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function firebaseErrorMessage(error) {

    const code =
        error && error.code
            ? error.code
            : "";


    const messages = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password should be at least 6 characters.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[code] ||
        error.message ||
        "An error occurred."
    );

}


/* =========================================================
   LOAD FARMER PROFILE
========================================================= */

async function loadFarmerProfile(user) {

    if (!user) return;


    state.currentUser = user;


    if (!db) {

        state.farmerProfile = {

            uid: user.uid,

            name:
                user.displayName ||
                "Farmer",

            email:
                user.email || ""

        };

        updateProfileUI();

        return;

    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            state.farmerProfile =
                snapshot.data();

        } else {

            state.farmerProfile = {

                uid: user.uid,

                name:
                    user.displayName ||
                    "Farmer",

                email:
                    user.email || ""

            };

        }


        const language =
            state.farmerProfile.language;


        if (
            language &&
            translations[language]
        ) {

            applyLanguage(language);

        }


        updateProfileUI();


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


/* =========================================================
   UPDATE PROFILE UI
========================================================= */

function updateProfileUI() {

    const profile =
        state.farmerProfile || {};

    const name =
        profile.name ||
        state.currentUser?.displayName ||
        "Farmer";

    const email =
        profile.email ||
        state.currentUser?.email ||
        "";


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
        profile.village || "—"
    );

    setText(
        "summaryLand",
        profile.landArea || "—"
    );

    setText(
        "summaryMarket",
        profile.preferredMarket || "—"
    );


    setValue(
        "profileName",
        name
    );

    setValue(
        "profileEmail",
        email
    );

    setValue(
        "profileMobile",
        profile.mobile || ""
    );

    setValue(
        "profileVillage",
        profile.village || ""
    );

    setValue(
        "profileState",
        profile.state || ""
    );

    setValue(
        "profileLandArea",
        profile.landArea || ""
    );

    setValue(
        "profileMarket",
        profile.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        profile.language || state.language
    );


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        email
    );

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function enableProfileEditing() {

    [
        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"
    ].forEach(id => {

        const element = $(id);

        if (element) {

            element.disabled = false;

        }

    });


    const actions =
        $("profileEditActions");

    if (actions) {

        actions.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

function cancelProfileEditing() {

    updateProfileUI();


    [
        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"
    ].forEach(id => {

        const element = $(id);

        if (element) {

            element.disabled = true;

        }

    });


    const actions =
        $("profileEditActions");

    if (actions) {

        actions.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    const message =
        $("profileMessage");


    if (!state.currentUser) {

        showMessage(
            message,
            "Please login first.",
            "error"
        );

        return;

    }


    const profile = {

        uid:
            state.currentUser.uid,

        name:
            $("profileName").value.trim(),

        email:
            $("profileEmail").value.trim(),

        mobile:
            $("profileMobile").value.trim(),

        village:
            $("profileVillage").value.trim(),

        state:
            $("profileState").value.trim(),

        landArea:
            $("profileLandArea").value.trim(),

        preferredMarket:
            $("profileMarket").value,

        language:
            $("profileLanguage").value,

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    try {

        await db
            .collection("farmers")
            .doc(state.currentUser.uid)
            .set(
                profile,
                { merge: true }
            );


        state.farmerProfile =
            {
                ...state.farmerProfile,
                ...profile
            };


        applyLanguage(
            profile.language
        );


        updateProfileUI();

        cancelProfileEditing();


        showMessage(
            message,
            "Profile saved successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile save error:",
            error
        );


        showMessage(
            message,
            error.message ||
            "Unable to save profile.",
            "error"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (firebaseReady && auth) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    state.currentUser = null;

    state.farmerProfile = null;


    closeSideMenu();

    closeProfileMenu();


    showScreen("loginPage");

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    state.currentUser = {

        uid: "demo-user",

        email: "demo@smartagri.local"

    };


    state.farmerProfile = {

        uid: "demo-user",

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "—",

        preferredMarket: "Kopargaon APMC",

        language: state.language

    };


    updateProfileUI();

    showDashboard();

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    const email =
        $("loginEmail").value.trim();

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

        await auth.sendPasswordResetEmail(
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
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   BACKEND STATUS
========================================================= */

async function checkBackendStatus() {

    let online = false;


    try {

        const response =
            await fetch(
                "/api/status",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        online =
            response.ok;


    } catch (error) {

        console.warn(
            "API status unavailable:",
            error
        );

    }


    updateConnectionStatus(
        online
    );


    return online;

}


/* =========================================================
   CONNECTION UI
========================================================= */

function updateConnectionStatus(online) {

    const connectionStatus =
        $("connectionStatus");

    const connectionText =
        $("connectionText");

    const dashboardConnectionText =
        $("dashboardConnectionText");


    if (connectionStatus) {

        connectionStatus.classList.toggle(
            "offline",
            !online
        );

        connectionStatus.classList.toggle(
            "online",
            online
        );

    }


    if (connectionText) {

        connectionText.textContent =
            translations[state.language][
                online
                    ? "online"
                    : "offline"
            ];

    }


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            translations[state.language][
                online
                    ? "online"
                    : "offline"
            ];

    }

}


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

    const weatherData =
        $("weatherData");


    setHidden(
        loading,
        false
    );

    setHidden(
        errorBox,
        true
    );

    setHidden(
        empty,
        true
    );


    try {

        const response =
            await fetch(
                "/api/weather",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Unable to load weather."
            );

        }


        const current =
            data.current ||
            {};


        setText(
            "weatherTemperature",
            formatValue(
                current.temperature_c,
                " °C"
            )
        );

        setText(
            "weatherHumidity",
            formatValue(
                current.humidity_pct,
                " %"
            )
        );

        setText(
            "weatherWind",
            formatValue(
                current.wind_speed_kmh,
                " km/h"
            )
        );


        /*
           Current weather API may return precipitation
           rather than probability.

           We display rainfall here when probability
           is not supplied.
        */

        if (
            current.rain_probability_pct !==
            undefined
        ) {

            setText(
                "weatherRain",
                formatValue(
                    current.rain_probability_pct,
                    " %"
                )
            );

        } else if (
            current.precipitation_mm !==
            undefined
        ) {

            setText(
                "weatherRain",
                formatValue(
                    current.precipitation_mm,
                    " mm"
                )
            );

        } else {

            setText(
                "weatherRain",
                "—"
            );

        }


        setHidden(
            weatherData,
            false
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        setText(
            "weatherError",
            error.message ||
            "Weather data unavailable."
        );


        setHidden(
            errorBox,
            false
        );


        setHidden(
            empty,
            false
        );


    } finally {

        setHidden(
            loading,
            true
        );

    }

}


/* =========================================================
   MANDI PRICES
========================================================= */

async function loadMarketPrices() {

    const loading =
        $("marketLoading");

    const errorBox =
        $("marketError");

    const tbody =
        $("marketTableBody");


    setHidden(
        loading,
        false
    );

    setHidden(
        errorBox,
        true
    );


    const cropSelector =
        $("cropPriceSelector");


    const crop =
        cropSelector
            ? cropSelector.value
            : "onion";


    let commodity =
        crop;


    if (crop === "onion") {

        commodity = "Onion";

    } else if (crop === "wheat") {

        commodity = "Wheat";

    }


    try {

        const url =
            "/api/market-prices" +
            "?state=" +
            encodeURIComponent(
                "Maharashtra"
            ) +
            "&commodity=" +
            encodeURIComponent(
                commodity
            ) +
            "&district=" +
            encodeURIComponent(
                "Ahmednagar"
            ) +
            "&market=" +
            encodeURIComponent(
                "Kopargaon"
            );


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Unable to load market prices."
            );

        }


        const records =
            Array.isArray(data)
                ? data
                : (
                    data.prices ||
                    data.records ||
                    []
                );


        renderMarketTable(
            records
        );

        updateMarketComparison(
            records
        );


    } catch (error) {

        console.error(
            "Market price error:",
            error
        );


        if (errorBox) {

            errorBox.textContent =
                error.message ||
                "Market data unavailable.";

            errorBox.classList.remove(
                "hidden"
            );

        }


        renderMarketTable([]);

    } finally {

        setHidden(
            loading,
            true
        );

    }

}


/* =========================================================
   RENDER MARKET TABLE
========================================================= */

function renderMarketTable(records) {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    tbody.innerHTML = "";


    if (
        !Array.isArray(records) ||
        records.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            ${escapeHtml(
                                translations[state.language]
                                    .marketDataUnavailable
                            )}
                        </strong>

                        <p>
                            ${escapeHtml(
                                translations[state.language]
                                    .marketDataUnavailableDescription
                            )}
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    records.forEach(record => {

        const row =
            document.createElement("tr");


        const market =
            record.market ||
            record.Market ||
            "—";


        const commodity =
            record.commodity ||
            record.Commodity ||
            "—";


        const modalPrice =
            record.modal_price ??
            record.modalPrice ??
            record.max_price ??
            "—";


        const date =
            record.date ||
            record.arrival_date ||
            "—";


        row.innerHTML = `

            <td>${escapeHtml(market)}</td>

            <td>${escapeHtml(commodity)}</td>

            <td>
                ₹${escapeHtml(String(modalPrice))}
            </td>

            <td>${escapeHtml(date)}</td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

function updateMarketComparison(records) {

    const cards =
        document.querySelectorAll(
            "[data-market-card]"
        );


    cards.forEach(card => {

        const marketName =
            card.getAttribute(
                "data-market-card"
            );


        const priceElement =
            card.querySelector(
                ".comparison-price"
            );

        const statusElement =
            card.querySelector(
                ".comparison-status"
            );


        /*
           Kopargaon data is the verified data
           returned by the backend.

           If another market is not returned,
           leave it unavailable instead of
           inventing a value.
        */

        const matching =
            records.find(record => {

                const market =
                    String(
                        record.market ||
                        ""
                    ).toLowerCase();


                const target =
                    marketName
                        .replace(
                            " APMC",
                            ""
                        )
                        .replace(
                            " Market",
                            ""
                        )
                        .toLowerCase();


                return market.includes(
                    target
                );

            });


        if (matching) {

            const price =
                matching.modal_price ??
                matching.max_price ??
                matching.min_price;


            if (priceElement) {

                priceElement.textContent =
                    price !== undefined
                        ? `₹${price}`
                        : "—";

            }


            if (statusElement) {

                statusElement.textContent =
                    "Verified data available";

            }

        } else {

            if (priceElement) {

                priceElement.textContent =
                    "—";

            }


            if (statusElement) {

                statusElement.textContent =
                    translations[
                        state.language
                    ].dataUnavailable;

            }

        }

    });

}


/* =========================================================
   PLANT.ID CROP HEALTH
========================================================= */

function setupCropHealth() {

    const input =
        $("cropImageInput");

    const previewContainer =
        $("imagePreviewContainer");

    const preview =
        $("cropImagePreview");

    const analyzeButton =
        $("analyzeCropBtn");


    if (!input) return;


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files &&
                this.files[0];


            if (!file) {

                state.selectedImage =
                    null;

                if (analyzeButton)
                    analyzeButton.disabled =
                        true;

                if (previewContainer)
                    previewContainer.classList.add(
                        "hidden"
                    );

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }


            state.selectedImage =
                file;


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

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


            reader.readAsDataURL(file);


            if (analyzeButton) {

                analyzeButton.disabled =
                    false;

            }

        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeCrop
        );

    }

}


/* =========================================================
   ANALYZE CROP
========================================================= */

async function analyzeCrop() {

    const resultBox =
        $("cropAnalysisResult");

    const button =
        $("analyzeCropBtn");


    if (!state.selectedImage) {

        return;

    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Analyzing...";

    }


    if (resultBox) {

        resultBox.innerHTML = `

            <strong>
                Analyzing crop image...
            </strong>

            <p>
                Please wait while Plant.id analyzes
                the uploaded image.
            </p>

        `;

    }


    try {

        const formData =
            new FormData();


        /*
           IMPORTANT:
           Flask expects the uploaded file
           under the field name "image".
        */

        formData.append(
            "image",
            state.selectedImage
        );


        const response =
            await fetch(
                "/api/crop-health",
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
            "Plant.id error:",
            error
        );


        if (resultBox) {

            resultBox.innerHTML = `

                <strong>
                    Crop analysis failed
                </strong>

                <p>
                    ${escapeHtml(
                        error.message ||
                        "Unable to analyze the image."
                    )}
                </p>

            `;

        }

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                translations[
                    state.language
                ].analyzeCrop;

        }

    }

}


/* =========================================================
   RENDER PLANT.ID RESULT
========================================================= */

function renderCropAnalysis(data) {

    const resultBox =
        $("cropAnalysisResult");


    if (!resultBox) return;


    /*
       Plant.id v3 normally returns:
       result.classification.suggestions
       result.is_plant
       result.is_healthy
    */

    const result =
        data.result ||
        data;


    const classification =
        result.classification ||
        {};


    const suggestions =
        classification.suggestions ||
        [];


    const isHealthy =
        result.is_healthy;


    let html = "";


    html += `

        <div class="analysis-result-content">

            <h3>
                🌱 Crop Health Analysis
            </h3>

    `;


    if (
        isHealthy !== undefined &&
        isHealthy !== null
    ) {

        html += `

            <p>
                <strong>Health Status:</strong>
                ${isHealthy
                    ? "Healthy"
                    : "Possible health issue detected"}
            </p>

        `;

    }


    if (suggestions.length > 0) {

        const top =
            suggestions[0];


        html += `

            <p>
                <strong>Detected Plant:</strong>
                ${escapeHtml(
                    top.name ||
                    "Unknown"
                )}
            </p>

        `;


        if (
            top.probability !==
            undefined
        ) {

            html += `

                <p>
                    <strong>Confidence:</strong>
                    ${(
                        Number(
                            top.probability
                        ) * 100
                    ).toFixed(1)}%
                </p>

            `;

        }


        if (suggestions.length > 1) {

            html += `

                <h4>
                    Other possibilities
                </h4>

                <ul>

            `;


            suggestions
                .slice(1, 5)
                .forEach(item => {

                    const probability =
                        item.probability !==
                        undefined
                            ? ` (${(
                                Number(
                                    item.probability
                                ) * 100
                            ).toFixed(1)}%)`
                            : "";


                    html += `

                        <li>
                            ${escapeHtml(
                                item.name ||
                                "Unknown"
                            )}
                            ${probability}
                        </li>

                    `;

                });


            html += `
                </ul>
            `;

        }

    } else {

        html += `

            <p>
                Plant.id did not return a confident
                plant identification.
            </p>

        `;

    }


    html += `
        </div>
    `;


    resultBox.innerHTML =
        html;

}


/* =========================================================
   OPENAI AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        $("aiForm");


    if (!form) return;


    form.addEventListener(
        "submit",
        sendAIMessage
    );

}


/* =========================================================
   SEND AI MESSAGE
========================================================= */

async function sendAIMessage(event) {

    event.preventDefault();


    const input =
        $("aiInput");

    const messages =
        $("chatMessages");

    const button =
        $("aiSendButton");


    if (!input || !messages)
        return;


    const question =
        input.value.trim();


    if (!question)
        return;


    addChatMessage(
        "user",
        question
    );


    input.value = "";


    if (button) {

        button.disabled =
            true;

    }


    const thinking =
        addChatMessage(
            "assistant",
            "Thinking..."
        );


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

                    body: JSON.stringify({

                        message:
                            question,

                        language:
                            state.language,

                        farmer:
                            state.farmerProfile || {}

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "AI request failed."
            );

        }


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            "No response received.";


        if (thinking) {

            thinking.remove();

        }


        addChatMessage(
            "assistant",
            answer
        );


    } catch (error) {

        console.error(
            "AI error:",
            error
        );


        if (thinking) {

            thinking.remove();

        }


        addChatMessage(
            "assistant",
            "AI service error: " +
            (
                error.message ||
                "Unable to get a response."
            )
        );

    } finally {

        if (button) {

            button.disabled =
                false;

        }

    }

}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(
    sender,
    text
) {

    const messages =
        $("chatMessages");


    if (!messages)
        return null;


    const wrapper =
        document.createElement("div");


    wrapper.className =
        sender === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        sender === "user"
            ? "👨‍🌾"
            : "🤖";


    const name =
        sender === "user"
            ? (
                state.farmerProfile?.name ||
                "Farmer"
            )
            : translations[
                state.language
            ].assistant;


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHtml(name)}
            </strong>

            <p>
                ${escapeHtml(text)}
            </p>

        </div>

    `;


    messages.appendChild(
        wrapper
    );


    messages.scrollTop =
        messages.scrollHeight;


    return wrapper;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function setupVoice() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");

    const voiceInput =
        $("voiceInput");


    if (!startButton)
        return;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.disabled =
            true;


        setText(
            "voiceResponse",
            "Voice recognition is not supported by this browser."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    state.voiceRecognition =
        recognition;


    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    updateSpeechLanguage();


    recognition.onstart =
        function () {

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


            setText(
                "voiceResponse",
                getVoiceText(
                    "Listening..."
                )
            );

        };


    recognition.onresult =
        async function (event) {

            const transcript =
                event.results[0][0].transcript;


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            setText(
                "voiceResponse",
                getVoiceText(
                    "Processing your question..."
                )
            );


            /*
               Send voice transcript to the
               same OpenAI backend endpoint.
            */

            await sendVoiceQuestion(
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
                "Voice error: " +
                event.error
            );


            resetVoiceButtons();

        };


    recognition.onend =
        function () {

            resetVoiceButtons();

        };


    startButton.addEventListener(
        "click",
        function () {

            try {

                updateSpeechLanguage();

                recognition.start();

            } catch (error) {

                console.error(
                    error
                );

            }

        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function () {

                recognition.stop();

            }
        );

    }

}


/* =========================================================
   UPDATE SPEECH LANGUAGE
========================================================= */

function updateSpeechLanguage() {

    if (!state.voiceRecognition)
        return;


    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    state.voiceRecognition.lang =
        languages[state.language] ||
        "en-IN";

}


/* =========================================================
   VOICE QUESTION -> OPENAI
========================================================= */

async function sendVoiceQuestion(
    question
) {

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

                    body: JSON.stringify({

                        message:
                            question,

                        language:
                            state.language,

                        farmer:
                            state.farmerProfile || {}

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "AI request failed."
            );

        }


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            "No response received.";


        setText(
            "voiceResponse",
            answer
        );


        speakText(
            answer
        );


    } catch (error) {

        console.error(
            "Voice AI error:",
            error
        );


        setText(
            "voiceResponse",
            error.message ||
            "Unable to get AI response."
        );

    }

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    utterance.lang =
        languages[state.language] ||
        "en-IN";


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   VOICE BUTTON RESET
========================================================= */

function resetVoiceButtons() {

    state.isListening =
        false;


    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");


    if (startButton) {

        startButton.classList.remove(
            "hidden"
        );

    }


    if (stopButton) {

        stopButton.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   DASHBOARD DATA
========================================================= */

async function loadDashboardData() {

    updateProfileUI();


    await checkBackendStatus();


    /*
       Weather and market requests are independent.
       One failing does not prevent the other.
    */

    loadWeather();

    loadMarketPrices();

}


/* =========================================================
   NAVIGATION MENU
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const sectionId =
                        this.getAttribute(
                            "data-section"
                        );


                    if (!sectionId)
                        return;


                    showAppSection(
                        sectionId
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const sectionId =
                        this.getAttribute(
                            "data-profile-section"
                        );


                    showAppSection(
                        sectionId
                    );

                }
            );

        });

}


/* =========================================================
   SHOW APP SECTION
========================================================= */

function showAppSection(
    sectionId
) {

    document
        .querySelectorAll(
            ".app-section"
        )
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        $(sectionId);


    if (!section)
        return;


    section.classList.add(
        "active-section"
    );


    closeSideMenu();

    closeProfileMenu();


    /*
       Load data when opening relevant sections.
    */

    if (
        sectionId ===
        "weatherSection"
    ) {

        loadWeather();

    }


    if (
        sectionId ===
        "marketSection"
    ) {

        loadMarketPrices();

    }


    if (
        sectionId ===
        "comparisonSection"
    ) {

        loadMarketPrices();

    }

}


/* =========================================================
   SIDE MENU
========================================================= */

function setupSideMenu() {

    const hamburger =
        $("hamburgerBtn");

    const close =
        $("closeMenuBtn");

    const overlay =
        $("menuOverlay");


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            openSideMenu
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            closeSideMenu
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSideMenu
        );

    }

}


function openSideMenu() {

    const menu =
        $("sideMenu");

    const overlay =
        $("menuOverlay");


    if (menu) {

        menu.classList.add(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


function closeSideMenu() {

    const menu =
        $("sideMenu");

    const overlay =
        $("menuOverlay");


    if (menu) {

        menu.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   PROFILE MENU
========================================================= */

function setupProfileMenu() {

    const button =
        $("profileButton");

    const menu =
        $("profileMenu");


    if (!button || !menu)
        return;


    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            menu.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !menu.contains(event.target) &&
                event.target !== button
            ) {

                closeProfileMenu();

            }

        }
    );

}


function closeProfileMenu() {

    const menu =
        $("profileMenu");


    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function setupLanguageSelectors() {

    const selectors = [

        $("dashboardLanguage"),

        $("settingsLanguage"),

        $("profileLanguage"),

        $("registerLanguage")

    ];


    selectors.forEach(
        selector => {

            if (!selector)
                return;


            selector.addEventListener(
                "change",
                async function () {

                    const language =
                        this.value;


                    applyLanguage(
                        language
                    );


                    /*
                       If logged in, save preference
                       to Firestore.
                    */

                    if (
                        state.currentUser &&
                        db &&
                        state.currentUser.uid !==
                        "demo-user"
                    ) {

                        try {

                            await db
                                .collection(
                                    "farmers"
                                )
                                .doc(
                                    state.currentUser.uid
                                )
                                .set(
                                    {
                                        language:
                                            language,

                                        updatedAt:
                                            firebase.firestore
                                                .FieldValue
                                                .serverTimestamp()
                                    },
                                    {
                                        merge: true
                                    }
                                );


                            state.farmerProfile =
                                {
                                    ...state.farmerProfile,
                                    language:
                                        language
                                };

                        } catch (error) {

                            console.error(
                                "Language save error:",
                                error
                            );

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
   LOGIN LANGUAGE BUTTON
========================================================= */

function setupChangeLanguage() {

    const button =
        $("changeLanguageFromLogin");


    if (button) {

        button.addEventListener(
            "click",
            function () {

                showScreen(
                    "languagePage"
                );

            }
        );

    }

}


/* =========================================================
   REGISTRATION / LOGIN NAVIGATION
========================================================= */

function setupAuthNavigation() {

    const registerButton =
        $("showRegisterBtn");

    const loginButton =
        $("showLoginBtn");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function () {

                showScreen(
                    "loginPage"
                );

            }
        );

    }

}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

    const voiceSetting =
        $("voiceSetting");

    const notificationSetting =
        $("notificationSetting");


    if (voiceSetting) {

        const saved =
            localStorage.getItem(
                "smartagri_voice"
            );


        if (saved !== null) {

            voiceSetting.checked =
                saved === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartagri_voice",
                    String(
                        this.checked
                    )
                );

            }
        );

    }


    if (notificationSetting) {

        const saved =
            localStorage.getItem(
                "smartagri_notifications"
            );


        if (saved !== null) {

            notificationSetting.checked =
                saved === "true";

        }


        notificationSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartagri_notifications",
                    String(
                        this.checked
                    )
                );

            }
        );

    }

}


/* =========================================================
   MARKET SELECTOR
========================================================= */

function setupMarketSelector() {

    const selector =
        $("cropPriceSelector");


    if (selector) {

        selector.addEventListener(
            "change",
            loadMarketPrices
        );

    }

}


/* =========================================================
   REFRESH WEATHER
========================================================= */

function setupWeatherRefresh() {

    const button =
        $("refreshWeatherBtn");


    if (button) {

        button.addEventListener(
            "click",
            loadWeather
        );

    }

}


/* =========================================================
   PROFILE BUTTONS
========================================================= */

function setupProfile() {

    const editButton =
        $("editProfileBtn");

    const cancelButton =
        $("cancelProfileEditBtn");

    const form =
        $("profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            enableProfileEditing
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            cancelProfileEditing
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            saveProfile
        );

    }

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function setupLogout() {

    const sideLogout =
        $("sideLogoutBtn");

    const profileLogout =
        $("profileLogoutBtn");


    if (sideLogout) {

        sideLogout.addEventListener(
            "click",
            logout
        );

    }


    if (profileLogout) {

        profileLogout.addEventListener(
            "click",
            logout
        );

    }

}


/* =========================================================
   DEMO BUTTON
========================================================= */

function setupDemo() {

    const button =
        $("demoBtn");


    if (button) {

        button.addEventListener(
            "click",
            enterDemoDashboard
        );

    }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupAuthListener() {

    if (
        !firebaseReady ||
        !auth
    ) {

        return;

    }


    auth.onAuthStateChanged(
        async function (user) {

            if (!user) {

                state.currentUser =
                    null;

                /*
                   Do not automatically force the user
                   away from the language page if they
                   have not selected a language yet.
                */

                if (
                    !$("languagePage")
                        ?.classList
                        .contains(
                            "active-screen"
                        )
                ) {

                    showScreen(
                        "loginPage"
                    );

                }

                return;

            }


            state.currentUser =
                user;


            await loadFarmerProfile(
                user
            );

        }
    );

}


/* =========================================================
   UTILITY: TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        $(id);


    if (element) {

        element.textContent =
            value ??
            "—";

    }

}


/* =========================================================
   UTILITY: VALUE
========================================================= */

function setValue(
    id,
    value
) {

    const element =
        $(id);


    if (element) {

        element.value =
            value ?? "";

    }

}


/* =========================================================
   UTILITY: HIDDEN
========================================================= */

function setHidden(
    element,
    hidden
) {

    if (!element)
        return;


    element.classList.toggle(
        "hidden",
        hidden
    );

}


/* =========================================================
   UTILITY: MESSAGE
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element)
        return;


    element.textContent =
        text;


    element.classList.remove(
        "success",
        "error",
        "info"
    );


    if (type) {

        element.classList.add(
            type
        );

    }

}


/* =========================================================
   UTILITY: VALUE FORMAT
========================================================= */

function formatValue(
    value,
    suffix = ""
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "—";

    }


    return String(
        value
    ) + suffix;

}


/* =========================================================
   UTILITY: ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   VOICE TEXT
========================================================= */

function getVoiceText(
    englishText
) {

    const map = {

        "Listening...": {

            en: "Listening...",

            hi: "सुन रहा हूँ...",

            mr: "ऐकत आहे..."

        },

        "Processing your question...": {

            en: "Processing your question...",

            hi: "आपके सवाल को समझ रहा हूँ...",

            mr: "तुमचा प्रश्न समजून घेत आहे..."

        }

    };


    if (
        map[englishText] &&
        map[englishText][
            state.language
        ]
    ) {

        return map[
            englishText
        ][
            state.language
        ];

    }


    return englishText;

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri frontend starting..."
        );


        /*
           Apply saved language immediately.
        */

        applyLanguage(
            state.language
        );


        /*
           Setup every frontend feature.
        */

        setupLanguagePage();

        setupAuthNavigation();

        setupChangeLanguage();

        setupDemo();

        setupLogout();

        setupProfile();

        setupSettings();

        setupLanguageSelectors();

        setupNavigation();

        setupSideMenu();

        setupProfileMenu();

        setupWeatherRefresh();

        setupMarketSelector();

        setupCropHealth();

        setupAI();

        setupVoice();


        /*
           Login and registration forms.
        */

        const loginForm =
            $("loginForm");

        const registrationForm =
            $("registrationForm");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                loginFarmer
            );

        }


        if (registrationForm) {

            registrationForm.addEventListener(
                "submit",
                registerFarmer
            );

        }


        const forgotButton =
            $("forgotPasswordBtn");


        if (forgotButton) {

            forgotButton.addEventListener(
                "click",
                forgotPassword
            );

        }


        /*
           Firebase authentication listener.
        */

        setupAuthListener();


        /*
           Check backend once when application
           loads.
        */

        checkBackendStatus();


        /*
           If a language was already selected,
           make sure the Continue button is enabled.
        */

        const continueButton =
            $("continueLanguageBtn");


        if (continueButton) {

            continueButton.disabled =
                false;

        }


        console.log(
            "SmartAgri frontend ready."
        );

    }
);
