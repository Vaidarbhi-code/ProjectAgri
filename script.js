/* ============================================================
   SMARTAGRI - COMPLETE SCRIPT
   Matches the HTML supplied in this project.

   FRONTEND SERVICES
   ------------------
   Firebase       -> Authentication + farmer profile
   Open-Meteo     -> Weather
   Backend API    -> SQLite + Mandi + AI + Crop Health
   Browser API    -> Voice assistance

   EXPECTED BACKEND ENDPOINTS
   ---------------------------
   GET  /api/market-prices?crop=onion
   GET  /api/market-prices?crop=wheat

   POST /api/ai
   POST /api/crop-health

   Your backend should use SQLite for persistent storage.
============================================================ */


/* ============================================================
   FIREBASE CONFIG
============================================================ */

const firebaseConfig = {
    apiKey: "AIzaSyAuIbj5ajXbSu1_txFSJSLViAGcc1DBgHY",
    authDomain: "kopargaonproject.firebaseapp.com",
    projectId: "kopargaonproject",
    storageBucket: "kopargaonproject.firebasestorage.app",
    messagingSenderId: "274707924421",
    appId: "1:274707924421:web:6808cf0bede74c29e437ac",
    measurementId: "G-DJ93MTY319"
};


/* ============================================================
   INITIALIZE FIREBASE
============================================================ */

let firebaseReady = false;
let auth = null;
let db = null;

try {

    if (typeof firebase !== "undefined") {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseReady = true;

        console.log("Firebase initialized.");

    }

} catch (error) {

    console.error("Firebase initialization failed:", error);

}


/* ============================================================
   APPLICATION STATE
============================================================ */

const AppState = {

    language: localStorage.getItem("smartagri_language") || "en",

    currentSection: "dashboardSection",

    selectedCrop: "onion",

    farmer: null,

    weather: null,

    marketData: [],

    voiceRecognition: null,

    isListening: false,

    isDemo: false,

    profileEditing: false

};


/* ============================================================
   API CONFIGURATION
============================================================ */

/*
   If your backend runs on another computer/server, change:

   const API_BASE_URL = "http://localhost:5000";

   If frontend and backend are served from the same server:

   const API_BASE_URL = "";
*/

const API_BASE_URL = "";


/* ============================================================
   WEATHER CONFIGURATION
============================================================ */

const WEATHER_CONFIG = {

    latitude: 19.8824,

    longitude: 74.4761,

    timezone: "Asia/Kolkata"

};


/* ============================================================
   TRANSLATIONS
============================================================ */

const translations = {

    en: {

        appName: "SmartAgri",

        appTagline:
            "Smart Agriculture Market Intelligence System",

        chooseLanguage:
            "Choose Your Language",

        languageDescription:
            "Select your preferred language to continue.",

        continue: "Continue",

        loginTitle:
            "Farmer Login",

        loginSubtitle:
            "Login to access SmartAgri",

        email: "Email",

        password: "Password",

        rememberMe:
            "Remember Me",

        forgotPassword:
            "Forgot Password?",

        login: "Login",

        or: "OR",

        demoDashboard:
            "Enter Demo Dashboard",

        noAccount:
            "Don't have an account?",

        register: "Register",

        changeLanguage:
            "Change Language",

        registrationTitle:
            "Farmer Registration",

        registrationSubtitle:
            "Create your SmartAgri farmer account",

        fullName: "Full Name",

        mobile: "Mobile Number",

        village: "Village",

        state: "State",

        landArea: "Land Area",

        preferredMarket:
            "Preferred Market",

        selectMarket:
            "Select Market",

        kopargaonMarket:
            "Kopargaon APMC",

        yeolaMarket:
            "Yeola Market",

        shirdiMarket:
            "Shirdi Market",

        preferredLanguage:
            "Preferred Language",

        createAccount:
            "Create Account",

        alreadyAccount:
            "Already have an account?",

        dashboard:
            "Dashboard",

        weather:
            "Weather",

        marketPrices:
            "Market Prices",

        marketComparison:
            "Market Comparison",

        cropInformation:
            "Crop Information",

        cropHealth:
            "Crop Health",

        governmentSchemes:
            "Government Schemes",

        aiAssistant:
            "AI Assistant",

        voiceAssistance:
            "Voice Assistance",

        farmerProfile:
            "Farmer Profile",

        settings:
            "Settings",

        about:
            "About SmartAgri",

        logout:
            "Logout",

        myProfile:
            "My Profile",

        welcome:
            "Welcome",

        dashboardSubtitle:
            "Your farming information in one place.",

        connectionStatus:
            "Connection Status",

        profileSummary:
            "Your registered information",

        editProfile:
            "Edit Profile",

        quickActions:
            "Quick Actions",

        quickActionsSubtitle:
            "Access important farming tools quickly.",

        liveDataTitle:
            "Live Data",

        liveDataDescription:
            "Only verified connected data is displayed.",

        offline:
            "Offline",

        online:
            "Online",

        currentWeather:
            "Current Weather",

        refresh:
            "Refresh",

        weatherUnavailable:
            "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather data has been received.",

        temperature:
            "Temperature",

        humidity:
            "Humidity",

        windSpeed:
            "Wind Speed",

        rainChance:
            "Rain Chance",

        marketSubtitle:
            "Current crop prices from connected verified sources.",

        marketPriceTable:
            "Market Price Table",

        market:
            "Market",

        crop:
            "Crop",

        price:
            "Price",

        date:
            "Date",

        onion:
            "Onion",

        wheat:
            "Wheat",

        marketDataUnavailable:
            "Market data unavailable",

        marketDataUnavailableDescription:
            "No verified market data has been received.",

        comparisonSubtitle:
            "Compare connected market information before selling.",

        dataUnavailable:
            "Verified data unavailable",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onionInfo:
            "Onion cultivation information.",

        wheatInfo:
            "Wheat cultivation information.",

        cultivationGuidance:
            "Cultivation Guidance",

        cropManagement:
            "Crop Management",

        farmingPractices:
            "Farming Practices",

        cropHealthSubtitle:
            "Upload a crop image for AI-assisted analysis.",

        uploadCropImage:
            "Upload Crop / Leaf Image",

        uploadCropDescription:
            "Select an image for crop health analysis.",

        chooseImage:
            "Choose Image",

        analyzeCrop:
            "Analyze Crop",

        analysisNotConnected:
            "AI crop analysis is not connected",

        analysisNotConnectedDescription:
            "Connect a verified crop-health AI service before displaying analysis.",

        schemesSubtitle:
            "Farmer support and government agricultural programs.",

        pmKisanDescription:
            "Official PM-KISAN farmer support information.",

        pmksyDescription:
            "Official irrigation and water-management information.",

        cropInsurance:
            "Crop Insurance",

        cropInsuranceDescription:
            "Official Pradhan Mantri Fasal Bima Yojana information.",

        learnMore:
            "Learn More",

        aiSubtitle:
            "Ask farming-related questions.",

        smartAssistant:
            "Smart Farmer Assistant",

        aiNotConnected:
            "AI Not Connected",

        assistant:
            "Assistant",

        aiUnavailable:
            "AI service is not connected yet.",

        askQuestion:
            "Ask a farming question...",

        aiConnectionNote:
            "AI responses require a connected AI service/backend.",

        voiceSubtitle:
            "Speak and listen in your preferred language.",

        voiceAssistantTitle:
            "Smart Voice Assistance",

        voiceDescription:
            "Speak using your device microphone.",

        startVoice:
            "Start Voice Assistance",

        stopVoice:
            "Stop Listening",

        voiceInput:
            "Voice Input",

        voiceInputPlaceholder:
            "Voice input will appear here...",

        voiceResponse:
            "Voice Response",

        voiceReady:
            "Voice assistance is ready.",

        profileSubtitle:
            "View and edit your farmer information.",

        saveChanges:
            "Save Changes",

        cancel:
            "Cancel",

        settingsSubtitle:
            "Manage your SmartAgri preferences.",

        changeLanguageDescription:
            "Select your preferred application language.",

        voiceSettingDescription:
            "Enable or disable voice assistance.",

        notifications:
            "Notifications",

        notificationDescription:
            "Enable or disable application notifications.",

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support"

    },


    hi: {

        appName: "स्मार्टएग्री",

        appTagline:
            "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage:
            "अपनी भाषा चुनें",

        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle:
            "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri तक पहुँचने के लिए लॉगिन करें",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe:
            "मुझे याद रखें",

        forgotPassword:
            "पासवर्ड भूल गए?",

        login: "लॉगिन",

        or: "या",

        demoDashboard:
            "डेमो डैशबोर्ड खोलें",

        noAccount:
            "खाता नहीं है?",

        register:
            "रजिस्टर करें",

        changeLanguage:
            "भाषा बदलें",

        registrationTitle:
            "किसान पंजीकरण",

        registrationSubtitle:
            "अपना SmartAgri किसान खाता बनाएं",

        fullName:
            "पूरा नाम",

        mobile:
            "मोबाइल नंबर",

        village:
            "गाँव",

        state:
            "राज्य",

        landArea:
            "भूमि क्षेत्र",

        preferredMarket:
            "पसंदीदा बाजार",

        selectMarket:
            "बाजार चुनें",

        kopargaonMarket:
            "कोपरगांव APMC",

        yeolaMarket:
            "येवला बाजार",

        shirdiMarket:
            "शिर्डी बाजार",

        preferredLanguage:
            "पसंदीदा भाषा",

        createAccount:
            "खाता बनाएं",

        alreadyAccount:
            "पहले से खाता है?",

        dashboard:
            "डैशबोर्ड",

        weather:
            "मौसम",

        marketPrices:
            "बाजार भाव",

        marketComparison:
            "बाजार तुलना",

        cropInformation:
            "फसल जानकारी",

        cropHealth:
            "फसल स्वास्थ्य",

        governmentSchemes:
            "सरकारी योजनाएं",

        aiAssistant:
            "AI सहायक",

        voiceAssistance:
            "वॉइस सहायता",

        farmerProfile:
            "किसान प्रोफाइल",

        settings:
            "सेटिंग्स",

        about:
            "SmartAgri के बारे में",

        logout:
            "लॉगआउट",

        myProfile:
            "मेरी प्रोफाइल",

        welcome:
            "स्वागत है",

        dashboardSubtitle:
            "आपकी खेती की जानकारी एक ही स्थान पर।",

        connectionStatus:
            "कनेक्शन स्थिति",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        temperature:
            "तापमान",

        humidity:
            "नमी",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable:
            "बाजार भाव तालिका",

        market:
            "बाजार",

        crop:
            "फसल",

        price:
            "भाव",

        date:
            "तारीख",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onionInfo:
            "प्याज की खेती की जानकारी।",

        wheatInfo:
            "गेहूं की खेती की जानकारी।",

        cultivationGuidance:
            "खेती मार्गदर्शन",

        cropManagement:
            "फसल प्रबंधन",

        farmingPractices:
            "कृषि पद्धतियां",

        cropHealthSubtitle:
            "AI विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

        uploadCropImage:
            "फसल / पत्ती की तस्वीर अपलोड करें",

        uploadCropDescription:
            "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",

        chooseImage:
            "तस्वीर चुनें",

        analyzeCrop:
            "फसल का विश्लेषण करें",

        analysisNotConnected:
            "AI फसल विश्लेषण कनेक्ट नहीं है",

        analysisNotConnectedDescription:
            "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        learnMore:
            "और जानें",

        aiSubtitle:
            "खेती से संबंधित प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "खेती से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट वॉइस सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन से बोलें।",

        startVoice:
            "वॉइस सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "वॉइस इनपुट",

        voiceInputPlaceholder:
            "वॉइस इनपुट यहाँ दिखाई देगा...",

        voiceResponse:
            "वॉइस प्रतिक्रिया",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "परिवर्तन सहेजें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "वॉइस सहायता चालू या बंद करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "आपली भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी आपली आवडती भाषा निवडा.",

        continue: "पुढे जा",

        loginTitle:
            "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri वापरण्यासाठी लॉगिन करा",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe:
            "मला लक्षात ठेवा",

        forgotPassword:
            "पासवर्ड विसरलात?",

        login: "लॉगिन",

        or: "किंवा",

        demoDashboard:
            "डेमो डॅशबोर्ड उघडा",

        noAccount:
            "खाते नाही?",

        register:
            "नोंदणी करा",

        changeLanguage:
            "भाषा बदला",

        registrationTitle:
            "शेतकरी नोंदणी",

        registrationSubtitle:
            "आपले SmartAgri शेतकरी खाते तयार करा",

        fullName:
            "पूर्ण नाव",

        mobile:
            "मोबाइल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्र",

        preferredMarket:
            "पसंतीचा बाजार",

        selectMarket:
            "बाजार निवडा",

        kopargaonMarket:
            "कोपरगाव APMC",

        yeolaMarket:
            "येवला बाजार",

        shirdiMarket:
            "शिर्डी बाजार",

        preferredLanguage:
            "पसंतीची भाषा",

        createAccount:
            "खाते तयार करा",

        alreadyAccount:
            "आधीपासून खाते आहे?",

        dashboard:
            "डॅशबोर्ड",

        weather:
            "हवामान",

        marketPrices:
            "बाजार भाव",

        marketComparison:
            "बाजार तुलना",

        cropInformation:
            "पीक माहिती",

        cropHealth:
            "पीक आरोग्य",

        governmentSchemes:
            "सरकारी योजना",

        aiAssistant:
            "AI सहाय्यक",

        voiceAssistance:
            "व्हॉइस सहाय्य",

        farmerProfile:
            "शेतकरी प्रोफाइल",

        settings:
            "सेटिंग्ज",

        about:
            "SmartAgri बद्दल",

        logout:
            "लॉगआउट",

        myProfile:
            "माझे प्रोफाइल",

        welcome:
            "स्वागत",

        dashboardSubtitle:
            "आपली शेतीविषयक माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "आपली नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची कृषी साधने पटकन वापरा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        currentWeather:
            "सध्याचे हवामान",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        temperature:
            "तापमान",

        humidity:
            "आर्द्रता",

        windSpeed:
            "वाऱ्याचा वेग",

        rainChance:
            "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांमधून सध्याचे पीक भाव.",

        marketPriceTable:
            "बाजार भाव तालिका",

        market:
            "बाजार",

        crop:
            "पीक",

        price:
            "भाव",

        date:
            "तारीख",

        onion:
            "कांदा",

        wheat:
            "गहू",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजाराची माहिती तपासा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onionInfo:
            "कांदा लागवडीची माहिती.",

        wheatInfo:
            "गहू लागवडीची माहिती.",

        cultivationGuidance:
            "लागवड मार्गदर्शन",

        cropManagement:
            "पीक व्यवस्थापन",

        farmingPractices:
            "शेती पद्धती",

        cropHealthSubtitle:
            "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage:
            "फोटो निवडा",

        analyzeCrop:
            "पीक विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजनेची अधिकृत माहिती.",

        learnMore:
            "अधिक माहिती",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant:
            "स्मार्ट शेतकरी सहाय्यक",

        aiNotConnected:
            "AI कनेक्ट केलेले नाही",

        assistant:
            "सहाय्यक",

        aiUnavailable:
            "AI सेवा अद्याप कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी कनेक्टेड AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या आवडत्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "आपल्या डिव्हाइसच्या मायक्रोफोनचा वापर करा.",

        startVoice:
            "व्हॉइस सहाय्य सुरू करा",

        stopVoice:
            "ऐकणे थांबवा",

        voiceInput:
            "व्हॉइस इनपुट",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        voiceResponse:
            "व्हॉइस प्रतिसाद",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle:
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "SmartAgri प्राधान्ये व्यवस्थापित करा.",

        changeLanguageDescription:
            "आपली आवडती अ‍ॅप भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य"

    }

};


/* ============================================================
   DOM HELPERS
============================================================ */

function $(id) {

    return document.getElementById(id);

}


function qs(selector) {

    return document.querySelector(selector);

}


function qsa(selector) {

    return document.querySelectorAll(selector);

}


/* ============================================================
   SAFE TEXT TRANSLATION
============================================================ */

function t(key) {

    return (
        translations[AppState.language]?.[key] ||
        translations.en[key] ||
        key
    );

}


/* ============================================================
   APPLY LANGUAGE
============================================================ */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    AppState.language = language;

    localStorage.setItem(
        "smartagri_language",
        language
    );


    /* ------------------------------
       NORMAL TEXT
    ------------------------------ */

    qsa("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (
            translations[language] &&
            translations[language][key]
        ) {

            element.textContent =
                translations[language][key];

        }

    });


    /* ------------------------------
       PLACEHOLDERS
    ------------------------------ */

    qsa("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.dataset.i18nPlaceholder;

        if (
            translations[language] &&
            translations[language][key]
        ) {

            element.placeholder =
                translations[language][key];

        }

    });


    /* ------------------------------
       LANGUAGE SELECTS
    ------------------------------ */

    const dashboardLanguage =
        $("dashboardLanguage");

    const settingsLanguage =
        $("settingsLanguage");

    const registerLanguage =
        $("registerLanguage");

    const profileLanguage =
        $("profileLanguage");


    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;

    }


    if (settingsLanguage) {

        settingsLanguage.value =
            language;

    }


    if (registerLanguage) {

        registerLanguage.value =
            language;

    }


    if (profileLanguage) {

        profileLanguage.value =
            language;

    }


    /* ------------------------------
       HTML LANGUAGE
    ------------------------------ */

    document.documentElement.lang =
        language;


    /* ------------------------------
       REFRESH DYNAMIC DATA LABELS
    ------------------------------ */

    updateConnectionStatus();

    updateCropInformation();

}


/* ============================================================
   LANGUAGE PAGE
============================================================ */

function setupLanguagePage() {

    const languageButtons =
        qsa(".language-option");

    const continueButton =
        $("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(btn => {

                btn.classList.remove("selected");

            });

            button.classList.add("selected");

            AppState.language =
                button.dataset.language;

            continueButton.disabled =
                false;

        });

    });


    continueButton.addEventListener("click", () => {

        applyLanguage(AppState.language);

        showScreen("loginPage");

    });


    applyLanguage(AppState.language);

}


/* ============================================================
   SCREEN MANAGEMENT
============================================================ */

function showScreen(screenId) {

    qsa(".screen").forEach(screen => {

        screen.classList.remove("active-screen");

    });


    const target =
        $(screenId);

    if (target) {

        target.classList.add("active-screen");

    }


    const dashboard =
        $("dashboardPage");


    if (dashboard) {

        if (screenId === "dashboardPage") {

            dashboard.classList.add("active");

        } else {

            dashboard.classList.remove("active");

        }

    }

}


/* ============================================================
   DASHBOARD VISIBILITY
============================================================ */

function showDashboard() {

    qsa(".screen").forEach(screen => {

        screen.classList.remove("active-screen");

    });


    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.add("active");

    }


    showSection("dashboardSection");

}


/* ============================================================
   NAVIGATION
============================================================ */

function showSection(sectionId) {

    const section =
        $(sectionId);

    if (!section) return;


    qsa(".app-section").forEach(item => {

        item.classList.remove("active-section");

    });


    section.classList.add("active-section");


    AppState.currentSection =
        sectionId;


    closeSideMenu();

    closeProfileMenu();


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


    if (sectionId === "cropSection") {

        updateCropInformation();

    }

}


/* ============================================================
   ALL NAVIGATION BUTTONS
============================================================ */

function setupNavigation() {

    qsa("[data-section]").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            showSection(
                button.dataset.section
            );

        });

    });


    qsa("[data-profile-section]").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            showSection(
                button.dataset.profileSection
            );

        });

    });

}


/* ============================================================
   SIDE MENU
============================================================ */

function openSideMenu() {

    $("sideMenu")?.classList.add("open");

    $("menuOverlay")?.classList.add("active");

}


function closeSideMenu() {

    $("sideMenu")?.classList.remove("open");

    $("menuOverlay")?.classList.remove("active");

}


function setupSideMenu() {

    $("hamburgerBtn")?.addEventListener(
        "click",
        openSideMenu
    );


    $("closeMenuBtn")?.addEventListener(
        "click",
        closeSideMenu
    );


    $("menuOverlay")?.addEventListener(
        "click",
        closeSideMenu
    );


    $("sideLogoutBtn")?.addEventListener(
        "click",
        logoutUser
    );

}


/* ============================================================
   PROFILE MENU
============================================================ */

function closeProfileMenu() {

    $("profileMenu")?.classList.remove("open");

}


function setupProfileMenu() {

    $("profileButton")?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            $("profileMenu")?.classList.toggle("open");

        }
    );


    document.addEventListener(
        "click",
        event => {

            const menu =
                $("profileMenu");

            const button =
                $("profileButton");

            if (
                menu &&
                button &&
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                closeProfileMenu();

            }

        }
    );


    $("profileLogoutBtn")?.addEventListener(
        "click",
        logoutUser
    );

}


/* ============================================================
   CONNECTION STATUS
============================================================ */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const status =
        $("connectionStatus");

    const text =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


    if (status) {

        status.classList.toggle(
            "offline",
            !online
        );

        status.classList.toggle(
            "online",
            online
        );

    }


    if (text) {

        text.textContent =
            online
                ? t("online")
                : t("offline");

    }


    if (dashboardText) {

        dashboardText.textContent =
            online
                ? t("online")
                : t("offline");

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


/* ============================================================
   FIREBASE AUTH
============================================================ */

function setupFirebaseAuth() {

    if (!firebaseReady || !auth) {

        console.warn(
            "Firebase Auth unavailable."
        );

        return;

    }


    auth.onAuthStateChanged(async user => {

        if (user) {

            AppState.farmer =
                await loadFarmerProfile(
                    user.uid
                );

            if (AppState.farmer) {

                populateFarmerUI(
                    AppState.farmer
                );

            }

            showDashboard();

        }

    });

}


/* ============================================================
   REGISTRATION
============================================================ */

function setupRegistration() {

    $("registrationForm")?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const message =
                $("registerMessage");


            try {

                if (
                    !firebaseReady ||
                    !auth
                ) {

                    throw new Error(
                        "Firebase is not available."
                    );

                }


                const name =
                    $("registerName").value.trim();

                const email =
                    $("registerEmail").value.trim();

                const mobile =
                    $("registerMobile").value.trim();

                const village =
                    $("registerVillage").value.trim();

                const state =
                    $("registerState").value.trim();

                const landArea =
                    $("registerLandArea").value.trim();

                const market =
                    $("registerMarket").value;

                const language =
                    $("registerLanguage").value;

                const password =
                    $("registerPassword").value;


                message.textContent =
                    "Creating account...";


                const credential =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    credential.user;


                const farmer = {

                    uid: user.uid,

                    name,

                    email,

                    mobile,

                    village,

                    state,

                    landArea,

                    preferredMarket: market,

                    language,

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp(),

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .set(
                        farmer,
                        { merge: true }
                    );


                AppState.farmer =
                    farmer;


                applyLanguage(language);

                populateFarmerUI(
                    farmer
                );


                showDashboard();


                message.textContent = "";


            } catch (error) {

                console.error(error);

                if (message) {

                    message.textContent =
                        firebaseErrorMessage(error);

                }

            }

        }
    );

}


/* ============================================================
   FIREBASE ERROR
============================================================ */

function firebaseErrorMessage(error) {

    const code =
        error?.code || "";


    const messages = {

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Password must be at least 6 characters.",

        "auth/user-not-found":
            "Account not found.",

        "auth/wrong-password":
            "Incorrect password."

    };


    return (
        messages[code] ||
        error?.message ||
        "An error occurred."
    );

}


/* ============================================================
   LOGIN
============================================================ */

function setupLogin() {

    $("loginForm")?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const message =
                $("loginMessage");


            try {

                if (
                    !firebaseReady ||
                    !auth
                ) {

                    throw new Error(
                        "Firebase is not available."
                    );

                }


                const email =
                    $("loginEmail").value.trim();

                const password =
                    $("loginPassword").value;


                message.textContent =
                    "Logging in...";


                const credential =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    credential.user;


                const farmer =
                    await loadFarmerProfile(
                        user.uid
                    );


                if (farmer) {

                    AppState.farmer =
                        farmer;

                    applyLanguage(
                        farmer.language ||
                        AppState.language
                    );

                    populateFarmerUI(
                        farmer
                    );

                }


                message.textContent = "";

                showDashboard();


            } catch (error) {

                console.error(error);

                message.textContent =
                    firebaseErrorMessage(error);

            }

        }
    );


    $("forgotPasswordBtn")?.addEventListener(
        "click",
        async () => {

            const email =
                $("loginEmail").value.trim();


            if (!email) {

                alert(
                    "Enter your email address first."
                );

                return;

            }


            try {

                await auth.sendPasswordResetEmail(
                    email
                );

                alert(
                    "Password reset email sent."
                );

            } catch (error) {

                alert(
                    firebaseErrorMessage(error)
                );

            }

        }
    );

}


/* ============================================================
   LOAD FARMER PROFILE
============================================================ */

async function loadFarmerProfile(uid) {

    if (!db) return null;


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!snapshot.exists) {

            return null;

        }


        return snapshot.data();

    } catch (error) {

        console.error(
            "Profile loading failed:",
            error
        );

        return null;

    }

}


/* ============================================================
   POPULATE FARMER UI
============================================================ */

function populateFarmerUI(farmer) {

    if (!farmer) return;


    const name =
        farmer.name || "Farmer";


    const email =
        farmer.email || "—";


    const setValue = (
        id,
        value
    ) => {

        const element = $(id);

        if (element) {

            element.value =
                value ?? "";

        }

    };


    const setText = (
        id,
        value
    ) => {

        const element = $(id);

        if (element) {

            element.textContent =
                value || "—";

        }

    };


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
        name
    );


    setText(
        "profilePageEmail",
        email
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
        farmer.mobile
    );


    setValue(
        "profileVillage",
        farmer.village
    );


    setValue(
        "profileState",
        farmer.state
    );


    setValue(
        "profileLandArea",
        farmer.landArea
    );


    setValue(
        "profileMarket",
        farmer.preferredMarket
    );


    setValue(
        "profileLanguage",
        farmer.language || "en"
    );

}


/* ============================================================
   DEMO LOGIN
============================================================ */

function setupDemo() {

    $("demoBtn")?.addEventListener(
        "click",
        () => {

            AppState.isDemo = true;


            const demoFarmer = {

                name: "Demo Farmer",

                email: "demo@smartagri.local",

                mobile: "0000000000",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 Acres",

                preferredMarket:
                    "Kopargaon APMC",

                language:
                    AppState.language

            };


            AppState.farmer =
                demoFarmer;


            populateFarmerUI(
                demoFarmer
            );


            showDashboard();

        }
    );

}


/* ============================================================
   AUTH NAVIGATION
============================================================ */

function setupAuthNavigation() {

    $("showRegisterBtn")?.addEventListener(
        "click",
        () => {

            showScreen(
                "registerPage"
            );

        }
    );


    $("showLoginBtn")?.addEventListener(
        "click",
        () => {

            showScreen(
                "loginPage"
            );

        }
    );


    $("changeLanguageFromLogin")?.addEventListener(
        "click",
        () => {

            showScreen(
                "languagePage"
            );

        }
    );

}


/* ============================================================
   LOGOUT
============================================================ */

async function logoutUser() {

    try {

        if (
            firebaseReady &&
            auth &&
            !AppState.isDemo
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(error);

    }


    AppState.farmer = null;

    AppState.isDemo = false;


    showScreen(
        "languagePage"
    );

}


/* ============================================================
   WEATHER
============================================================ */

async function loadWeather() {

    const empty =
        $("weatherEmptyState");

    const data =
        $("weatherData");


    if (!empty || !data) return;


    empty.classList.remove(
        "hidden"
    );

    data.classList.add(
        "hidden"
    );


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" +
            encodeURIComponent(
                WEATHER_CONFIG.latitude
            ) +

            "&longitude=" +
            encodeURIComponent(
                WEATHER_CONFIG.longitude
            ) +

            "&current=" +
            encodeURIComponent(
                "temperature_2m,relative_humidity_2m,rain,wind_speed_10m"
            ) +

            "&hourly=" +
            encodeURIComponent(
                "temperature_2m,wind_speed_10m,rain,relative_humidity_1000hPa,wind_speed_1000hPa"
            ) +

            "&forecast_days=16" +

            "&timezone=" +
            encodeURIComponent(
                WEATHER_CONFIG.timezone
            );


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Weather API request failed."
            );

        }


        const weather =
            await response.json();


        AppState.weather =
            weather;


        const current =
            weather.current;


        if (!current) {

            throw new Error(
                "Current weather unavailable."
            );

        }


        $("weatherTemperature").textContent =
            `${current.temperature_2m ?? "—"} °C`;


        $("weatherHumidity").textContent =
            `${current.relative_humidity_2m ?? "—"} %`;


        $("weatherWind").textContent =
            `${current.wind_speed_10m ?? "—"} km/h`;


        /*
           Open-Meteo current rain is rainfall amount,
           not necessarily probability.

           Therefore we do NOT label it as "rain probability".
        */

        $("weatherRain").textContent =
            `${current.rain ?? 0} mm`;


        empty.classList.add(
            "hidden"
        );

        data.classList.remove(
            "hidden"
        );


        updateConnectionStatus();


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        empty.classList.remove(
            "hidden"
        );

        data.classList.add(
            "hidden"
        );

    }

}


/* ============================================================
   WEATHER REFRESH
============================================================ */

function setupWeather() {

    $("refreshWeatherBtn")?.addEventListener(
        "click",
        async event => {

            event.preventDefault();

            const button =
                $("refreshWeatherBtn");


            if (button) {

                button.disabled = true;

            }


            await loadWeather();


            if (button) {

                button.disabled = false;

            }

        }
    );

}


/* ============================================================
   MARKET PRICE API
============================================================ */

/*
   IMPORTANT:

   Browser should NOT directly contain private API keys.

   Your backend should expose:

      GET /api/market-prices?crop=onion

   Backend:
      NaPanta / data.gov.in / Agmarknet
             ↓
           SQLite
             ↓
      /api/market-prices
             ↓
         this script
*/


async function fetchMarketData(crop) {

    const url =
        `${API_BASE_URL}/api/market-prices?crop=${encodeURIComponent(crop)}`;


    const response =
        await fetch(
            url,
            {
                method: "GET",
                cache: "no-store"
            }
        );


    if (!response.ok) {

        throw new Error(
            `Market API returned ${response.status}`
        );

    }


    return response.json();

}


/* ============================================================
   NORMALIZE MARKET RESPONSE
============================================================ */

function normalizeMarketResponse(response) {

    if (Array.isArray(response)) {

        return response;

    }


    if (Array.isArray(response?.data)) {

        return response.data;

    }


    if (Array.isArray(response?.records)) {

        return response.records;

    }


    return [];

}


/* ============================================================
   LOAD MARKET PRICES
============================================================ */

async function loadMarketPrices() {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>⏳</span>

                    <strong>Loading market data...</strong>

                </div>

            </td>

        </tr>

    `;


    const selector =
        $("cropPriceSelector");


    const crop =
        selector?.value ||
        AppState.selectedCrop ||
        "onion";


    AppState.selectedCrop =
        crop;


    try {

        const response =
            await fetchMarketData(
                crop
            );


        const records =
            normalizeMarketResponse(
                response
            );


        AppState.marketData =
            records;


        renderMarketTable(
            records,
            crop
        );


        renderComparisonCards(
            records
        );


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        /*
           DO NOT manufacture prices.

           This is important for your prototype because
           fake mandi prices would be misleading.
        */

        tbody.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            ${escapeHtml(
                                t("marketDataUnavailable")
                            )}
                        </strong>

                        <p>
                            Backend market service is unavailable.
                        </p>

                    </div>

                </td>

            </tr>

        `;

    }

}


/* ============================================================
   RENDER MARKET TABLE
============================================================ */

function renderMarketTable(
    records,
    crop
) {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    if (!records.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            ${escapeHtml(
                                t("marketDataUnavailable")
                            )}
                        </strong>

                        <p>
                            No verified records returned.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    /*
       These field names support common
       data.gov.in / Agmarknet / backend responses.
    */

    tbody.innerHTML =
        records.map(record => {

            const market =
                record.market ||
                record.market_name ||
                record.mandi ||
                record.apmc ||
                "—";


            const commodity =
                record.commodity ||
                record.crop ||
                crop;


            const price =
                record.modal_price ??
                record.modalPrice ??
                record.price ??
                record.max_price ??
                record.maxPrice ??
                "—";


            const date =
                record.arrival_date ||
                record.arrivalDate ||
                record.date ||
                record.created_at ||
                "—";


            return `

                <tr>

                    <td>
                        ${escapeHtml(
                            market
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            commodity
                        )}
                    </td>

                    <td>
                        ${
                            formatPrice(
                                price
                            )
                        }
                    </td>

                    <td>
                        ${escapeHtml(
                            formatDate(
                                date
                            )
                        )}
                    </td>

                </tr>

            `;

        }).join("");

}


/* ============================================================
   MARKET COMPARISON
============================================================ */

async function loadMarketComparison() {

    if (
        AppState.marketData &&
        AppState.marketData.length
    ) {

        renderComparisonCards(
            AppState.marketData
        );

        return;

    }


    await loadMarketPrices();

}


/* ============================================================
   RENDER THREE MARKETS
============================================================ */

function renderComparisonCards(
    records
) {

    const cards =
        qsa(".market-card");


    if (!cards.length) return;


    const targetMarkets = [

        "Kopargaon APMC",

        "Yeola Market",

        "Shirdi Market"

    ];


    cards.forEach(
        (card, index) => {

            const marketName =
                targetMarkets[index];


            const heading =
                card.querySelector("h3");


            const value =
                card.querySelector(
                    ".market-value strong"
                );


            const status =
                card.querySelector("p");


            if (heading) {

                heading.textContent =
                    t(
                        index === 0
                            ? "kopargaonMarket"
                            : index === 1
                            ? "yeolaMarket"
                            : "shirdiMarket"
                    );

            }


            /*
               Match market names flexibly.
            */

            const matching =
                records.find(record => {

                    const market =
                        String(
                            record.market ||
                            record.market_name ||
                            record.mandi ||
                            record.apmc ||
                            ""
                        ).toLowerCase();


                    const target =
                        marketName.toLowerCase();


                    return (
                        market.includes(
                            target.split(" ")[0]
                        ) ||
                        target.includes(
                            market
                        )
                    );

                });


            if (matching) {

                const price =
                    matching.modal_price ??
                    matching.modalPrice ??
                    matching.price ??
                    matching.max_price ??
                    "—";


                if (value) {

                    value.textContent =
                        formatPrice(
                            price
                        );

                }


                if (status) {

                    status.textContent =
                        "Verified market data";

                }

            } else {

                if (value) {

                    value.textContent =
                        "—";

                }


                if (status) {

                    status.textContent =
                        t(
                            "dataUnavailable"
                        );

                }

            }

        }
    );

}


/* ============================================================
   MARKET SELECTOR
============================================================ */

function setupMarketSelector() {

    $("cropPriceSelector")?.addEventListener(
        "change",
        () => {

            AppState.selectedCrop =
                $("cropPriceSelector").value;

            loadMarketPrices();

        }
    );

}


/* ============================================================
   FORMAT PRICE
============================================================ */

function formatPrice(value) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "—"
    ) {

        return "—";

    }


    const numeric =
        Number(
            String(value)
                .replace(/,/g, "")
                .replace(/[₹]/g, "")
                .trim()
        );


    if (!Number.isNaN(numeric)) {

        return (
            "₹" +
            numeric.toLocaleString("en-IN") +
            " / qtl"
        );

    }


    return escapeHtml(
        String(value)
    );

}


/* ============================================================
   FORMAT DATE
============================================================ */

function formatDate(value) {

    if (!value) return "—";


    const date =
        new Date(value);


    if (Number.isNaN(
        date.getTime()
    )) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-IN"
    );

}


/* ============================================================
   CROP INFORMATION
============================================================ */

const cropInformation = {

    onion: {

        en: {
            description:
                "Onion requires well-drained soil, balanced nutrition and careful irrigation. Monitor thrips, purple blotch and bulb development.",
            guidance:
                "Use healthy seedlings and maintain proper spacing.",
            management:
                "Maintain irrigation without prolonged waterlogging.",
            practices:
                "Monitor pests regularly and maintain field sanitation."
        },

        hi: {
            description:
                "प्याज के लिए अच्छी जल निकासी वाली मिट्टी, संतुलित पोषण और उचित सिंचाई आवश्यक है।",
            guidance:
                "स्वस्थ पौधों का उपयोग करें और उचित दूरी रखें।",
            management:
                "अत्यधिक पानी जमा न होने दें।",
            practices:
                "कीटों की नियमित निगरानी करें और खेत की स्वच्छता रखें।"
        },

        mr: {
            description:
                "कांद्यासाठी चांगला निचरा होणारी जमीन, संतुलित पोषण आणि योग्य सिंचन आवश्यक आहे.",
            guidance:
                "निरोगी रोपे वापरा आणि योग्य अंतर ठेवा.",
            management:
                "जमिनीत जास्त पाणी साचू देऊ नका.",
            practices:
                "किडींचे नियमित निरीक्षण करा आणि शेत स्वच्छ ठेवा."
        }

    },


    wheat: {

        en: {
            description:
                "Wheat performs best with suitable soil moisture, timely sowing and balanced nutrient management.",
            guidance:
                "Use quality seed and sow at the recommended time.",
            management:
                "Monitor soil moisture and nutrient requirements.",
            practices:
                "Regularly inspect for rust and other crop diseases."
        },

        hi: {
            description:
                "गेहूं के लिए उचित मिट्टी की नमी, समय पर बुवाई और संतुलित पोषण आवश्यक है।",
            guidance:
                "अच्छे बीज का उपयोग करें और समय पर बुवाई करें।",
            management:
                "मिट्टी की नमी और पोषक तत्वों की निगरानी करें।",
            practices:
                "रस्ट और अन्य रोगों की नियमित जांच करें।"
        },

        mr: {
            description:
                "गव्हासाठी योग्य जमिनीतील ओलावा, वेळेवर पेरणी आणि संतुलित पोषण आवश्यक आहे.",
            guidance:
                "चांगल्या दर्जाचे बियाणे वापरा आणि वेळेवर पेरणी करा.",
            management:
                "जमिनीतील ओलावा आणि पोषक घटक तपासा.",
            practices:
                "तांबेरा आणि इतर रोगांची नियमित तपासणी करा."
        }

    }

};


/* ============================================================
   UPDATE CROP INFORMATION
============================================================ */

function updateCropInformation() {

    const cards =
        qsa(".crop-card");


    if (!cards.length) return;


    const cropKeys = [
        "onion",
        "wheat"
    ];


    cards.forEach(
        (card, index) => {

            const crop =
                cropKeys[index];


            const info =
                cropInformation[
                    crop
                ]?.[
                    AppState.language
                ] ||
                cropInformation[
                    crop
                ]?.en;


            if (!info) return;


            const description =
                card.querySelector(
                    "p[data-i18n]"
                );


            const list =
                card.querySelectorAll(
                    ".crop-list span"
                );


            if (description) {

                description.textContent =
                    info.description;

            }


            if (list[0]) {

                list[0].textContent =
                    info.guidance;

            }


            if (list[1]) {

                list[1].textContent =
                    info.management;

            }


            if (list[2]) {

                list[2].textContent =
                    info.practices;

            }

        }
    );

}


/* ============================================================
   CROP IMAGE UPLOAD
============================================================ */

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
        event => {

            const file =
                event.target.files?.[0];


            if (!file) {

                analyzeButton.disabled =
                    true;

                previewContainer.classList.add(
                    "hidden"
                );

                return;

            }


            if (!file.type.startsWith(
                "image/"
            )) {

                alert(
                    "Please choose an image file."
                );

                input.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    preview.src =
                        event.target.result;

                    previewContainer.classList.remove(
                        "hidden"
                    );

                    analyzeButton.disabled =
                        false;

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    analyzeButton?.addEventListener(
        "click",
        analyzeCrop
    );

}


/* ============================================================
   CROP HEALTH AI
============================================================ */

async function analyzeCrop() {

    const input =
        $("cropImageInput");

    const result =
        $("cropAnalysisResult");

    const button =
        $("analyzeCropBtn");


    const file =
        input?.files?.[0];


    if (!file) {

        alert(
            "Please choose a crop image first."
        );

        return;

    }


    button.disabled =
        true;


    result.innerHTML = `

        <strong>
            Analyzing crop image...
        </strong>

        <p>
            Please wait.
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
            AppState.language
        );


        formData.append(
            "farmer",
            JSON.stringify(
                AppState.farmer || {}
            )
        );


        const response =
            await fetch(
                `${API_BASE_URL}/api/crop-health`,
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                `Crop health API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const diagnosis =
            data.diagnosis ||
            data.result ||
            data.prediction ||
            "Analysis completed.";


        const confidence =
            data.confidence;


        result.innerHTML = `

            <strong>
                ${escapeHtml(
                    String(diagnosis)
                )}
            </strong>

            ${
                confidence !== undefined
                ?
                `<p>Confidence: ${escapeHtml(
                    String(confidence)
                )}</p>`
                :
                ""
            }

            ${
                data.recommendation
                ?
                `<p>${escapeHtml(
                    String(
                        data.recommendation
                    )
                )}</p>`
                :
                ""
            }

        `;


    } catch (error) {

        console.error(
            "Crop health error:",
            error
        );


        result.innerHTML = `

            <strong>
                Crop health AI is not connected.
            </strong>

            <p>
                Start your backend crop-health model
                at <code>/api/crop-health</code>.
            </p>

        `;

    }


    button.disabled =
        false;

}


/* ============================================================
   AI FARMER ASSISTANT
============================================================ */

function setupAI() {

    $("aiForm")?.addEventListener(
        "submit",
        async event => {

            /*
               CRITICAL:

               preventDefault() prevents the form from
               submitting/reloading the page.

               This fixes the problem where pressing SEND
               redirected the user back to the language page.
            */

            event.preventDefault();

            event.stopPropagation();


            const input =
                $("aiInput");

            const messages =
                $("chatMessages");


            const question =
                input?.value.trim();


            if (!question) return;


            addChatMessage(
                question,
                "user"
            );


            input.value = "";


            const loading =
                addChatMessage(
                    "Thinking...",
                    "assistant"
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

                                question,

                                language:
                                    AppState.language,

                                farmer:
                                    AppState.farmer || {},

                                location: {

                                    village:
                                        AppState.farmer?.village ||
                                        "Kopargaon",

                                    state:
                                        AppState.farmer?.state ||
                                        "Maharashtra"

                                }

                            })

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `AI API returned ${response.status}`
                    );

                }


                const data =
                    await response.json();


                if (loading) {

                    loading.remove();

                }


                const answer =
                    data.answer ||
                    data.response ||
                    data.message ||
                    "No answer received.";


                addChatMessage(
                    answer,
                    "assistant"
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                if (loading) {

                    loading.remove();

                }


                addChatMessage(

                    "AI service is not connected. Please start the backend /api/ai service.",

                    "assistant"

                );

            }

        }
    );

}


/* ============================================================
   CHAT MESSAGE
============================================================ */

function addChatMessage(
    text,
    type
) {

    const container =
        $("chatMessages");


    if (!container) return null;


    const message =
        document.createElement(
            "div"
        );


    message.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    message.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? escapeHtml(
                            AppState.farmer?.name ||
                            "Farmer"
                        )
                        : escapeHtml(
                            t("assistant")
                        )
                }
            </strong>

            <p>
                ${escapeHtml(
                    String(text)
                )}
            </p>

        </div>

    `;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;


    return message;

}


/* ============================================================
   VOICE ASSISTANCE
============================================================ */

function setupVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const start =
        $("startVoiceBtn");

    const stop =
        $("stopVoiceBtn");

    const input =
        $("voiceInput");

    const response =
        $("voiceResponse");


    if (!SpeechRecognition) {

        if (response) {

            response.textContent =
                "Voice recognition is not supported in this browser.";

        }


        if (start) {

            start.disabled =
                true;

        }

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    recognition.lang =
        getSpeechLanguage();


    recognition.onstart =
        () => {

            AppState.isListening =
                true;


            start?.classList.add(
                "hidden"
            );


            stop?.classList.remove(
                "hidden"
            );


            if (response) {

                response.textContent =
                    "Listening...";

            }

        };


    recognition.onresult =
        event => {

            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0].transcript;

            }


            if (input) {

                input.value =
                    transcript;

            }

        };


    recognition.onerror =
        event => {

            console.error(
                "Voice recognition error:",
                event.error
            );


            if (response) {

                response.textContent =
                    "Voice recognition error: " +
                    event.error;

            }

        };


    recognition.onend =
        async () => {

            AppState.isListening =
                false;


            start?.classList.remove(
                "hidden"
            );


            stop?.classList.add(
                "hidden"
            );


            const text =
                input?.value.trim();


            if (!text) {

                if (response) {

                    response.textContent =
                        t("voiceReady");

                }

                return;

            }


            if (response) {

                response.textContent =
                    "Processing your question...";

            }


            /*
               Send voice transcript to same AI backend.
            */

            try {

                const result =
                    await askAIBackend(
                        text
                    );


                if (response) {

                    response.textContent =
                        result;

                }


                speakText(
                    result
                );


            } catch (error) {

                console.error(
                    error
                );


                if (response) {

                    response.textContent =
                        "AI service is not connected.";

                }

            }

        };


    AppState.voiceRecognition =
        recognition;


    start?.addEventListener(
        "click",
        () => {

            recognition.lang =
                getSpeechLanguage();


            try {

                recognition.start();

            } catch (error) {

                console.error(error);

            }

        }
    );


    stop?.addEventListener(
        "click",
        () => {

            recognition.stop();

        }
    );

}


/* ============================================================
   SPEECH LANGUAGE
============================================================ */

function getSpeechLanguage() {

    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    return (
        languages[
            AppState.language
        ] ||
        "en-IN"
    );

}


/* ============================================================
   AI BACKEND HELPER
============================================================ */

async function askAIBackend(
    question
) {

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

                    question,

                    language:
                        AppState.language,

                    farmer:
                        AppState.farmer || {}

                })

            }
        );


    if (!response.ok) {

        throw new Error(
            "AI backend unavailable."
        );

    }


    const data =
        await response.json();


    return (
        data.answer ||
        data.response ||
        data.message ||
        "No response."
    );

}


/* ============================================================
   TEXT TO SPEECH
============================================================ */

function speakText(
    text
) {

    if (
        !window.speechSynthesis
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
        0.9;


    window.speechSynthesis.speak(
        utterance
    );

}


/* ============================================================
   PROFILE EDIT
============================================================ */

function setupProfileEditing() {

    const editButton =
        $("editProfileBtn");

    const cancelButton =
        $("cancelProfileEditBtn");

    const actions =
        $("profileEditActions");


    const fields = [

        "profileName",

        "profileMobile",

        "profileVillage",

        "profileState",

        "profileLandArea",

        "profileMarket",

        "profileLanguage"

    ];


    editButton?.addEventListener(
        "click",
        () => {

            AppState.profileEditing =
                true;


            fields.forEach(id => {

                const element =
                    $(id);

                if (element) {

                    element.disabled =
                        false;

                }

            });


            actions?.classList.remove(
                "hidden"
            );

        }
    );


    cancelButton?.addEventListener(
        "click",
        () => {

            if (AppState.farmer) {

                populateFarmerUI(
                    AppState.farmer
                );

            }


            fields.forEach(id => {

                const element =
                    $(id);

                if (element) {

                    element.disabled =
                        true;

                }

            });


            actions?.classList.add(
                "hidden"
            );

        }
    );


    $("profileForm")?.addEventListener(
        "submit",
        saveProfile
    );

}


/* ============================================================
   SAVE PROFILE
============================================================ */

async function saveProfile(
    event
) {

    event.preventDefault();


    const message =
        $("profileMessage");


    const updated = {

        name:
            $("profileName")?.value.trim(),

        mobile:
            $("profileMobile")?.value.trim(),

        village:
            $("profileVillage")?.value.trim(),

        state:
            $("profileState")?.value.trim(),

        landArea:
            $("profileLandArea")?.value.trim(),

        preferredMarket:
            $("profileMarket")?.value,

        language:
            $("profileLanguage")?.value

    };


    try {

        if (
            firebaseReady &&
            auth?.currentUser &&
            db
        ) {

            await db
                .collection("farmers")
                .doc(
                    auth.currentUser.uid
                )
                .set(

                    {

                        ...updated,

                        updatedAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    },

                    {
                        merge: true
                    }

                );

        }


        AppState.farmer = {

            ...(AppState.farmer || {}),

            ...updated

        };


        populateFarmerUI(
            AppState.farmer
        );


        applyLanguage(
            updated.language
        );


        if (message) {

            message.textContent =
                "Profile saved successfully.";

        }


        qsa(
            "#profileForm input, #profileForm select"
        ).forEach(
            element => {

                element.disabled =
                    true;

            }
        );


        $("profileEditActions")
            ?.classList.add(
                "hidden"
            );


    } catch (error) {

        console.error(error);


        if (message) {

            message.textContent =
                "Could not save profile.";

        }

    }

}


/* ============================================================
   LANGUAGE SELECTS
============================================================ */

function setupLanguageSelectors() {

    $("dashboardLanguage")?.addEventListener(
        "change",
        event => {

            applyLanguage(
                event.target.value
            );

        }
    );


    $("settingsLanguage")?.addEventListener(
        "change",
        event => {

            applyLanguage(
                event.target.value
            );

        }
    );


    $("registerLanguage")?.addEventListener(
        "change",
        event => {

            applyLanguage(
                event.target.value
            );

        }
    );


    $("profileLanguage")?.addEventListener(
        "change",
        event => {

            applyLanguage(
                event.target.value
            );

        }
    );

}


/* ============================================================
   GOVERNMENT SCHEME LINKS
============================================================ */

function setupGovernmentSchemes() {

    qsa(".scheme-button").forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const url =
                        button.dataset.schemeUrl;


                    if (!url) return;


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


/* ============================================================
   SETTINGS
============================================================ */

function setupSettings() {

    $("voiceSetting")?.addEventListener(
        "change",
        event => {

            const enabled =
                event.target.checked;


            localStorage.setItem(
                "smartagri_voice_enabled",
                String(enabled)
            );

        }
    );


    $("notificationSetting")?.addEventListener(
        "change",
        event => {

            localStorage.setItem(
                "smartagri_notifications",
                String(
                    event.target.checked
                )
            );

        }
    );

}


/* ============================================================
   HTML ESCAPE
============================================================ */

function escapeHtml(
    value
) {

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


/* ============================================================
   INITIALIZE APPLICATION
============================================================ */

function initializeSmartAgri() {

    console.log(
        "Initializing SmartAgri..."
    );


    setupLanguagePage();

    setupNavigation();

    setupSideMenu();

    setupProfileMenu();

    setupFirebaseAuth();

    setupRegistration();

    setupLogin();

    setupDemo();

    setupAuthNavigation();

    setupWeather();

    setupMarketSelector();

    setupCropHealth();

    setupAI();

    setupVoice();

    setupProfileEditing();

    setupLanguageSelectors();

    setupGovernmentSchemes();

    setupSettings();

    updateConnectionStatus();

    updateCropInformation();


    /*
       Keep user on language page initially unless
       Firebase already restores a logged-in session.
    */

    const savedLanguage =
        localStorage.getItem(
            "smartagri_language"
        );


    if (savedLanguage) {

        AppState.language =
            savedLanguage;

        applyLanguage(
            savedLanguage
        );

    }


    console.log(
        "SmartAgri initialized successfully."
    );

}


/* ============================================================
   START
============================================================ */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeSmartAgri
    );

} else {

    initializeSmartAgri();

}
