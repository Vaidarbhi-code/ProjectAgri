/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
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

let auth = null;
let db = null;

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization failed:", error);
}


/* =========================================================
   DATA.GOV.IN CONFIGURATION
========================================================= */

/*
   IMPORTANT:
   Put your DATA.GOV.IN API KEY here.

   This is NOT your Firebase API key.

   Example:
   const DATA_GOV_API_KEY = "xxxxxxxxxxxxxxxx";

   If you have not generated the key yet, leave it empty.
*/

const DATA_GOV_API_KEY = "";


/*
   The data.gov.in mandi dataset is generated from
   AGMARKNET market information.

   Resource ID can change between datasets/resources.
   Put the resource ID you get from data.gov.in here.

   Example:
   const DATA_GOV_RESOURCE_ID = "xxxxxxxxxxxxxxxx";

   If your resource page gives you an API endpoint,
   paste the resource ID here.
*/

const DATA_GOV_RESOURCE_ID = "";


/* =========================================================
   WEATHER CONFIGURATION
========================================================= */

const WEATHER_LATITUDE = 19.8824;
const WEATHER_LONGITUDE = 74.4761;

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + WEATHER_LATITUDE +
    "&longitude=" + WEATHER_LONGITUDE +
    "&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m" +
    "&hourly=temperature_2m,wind_speed_10m,rain,relative_humidity_2m" +
    "&forecast_days=16";


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let selectedLanguage = null;

let currentFarmer = null;

let recognition = null;

let selectedCropImage = null;


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

        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",
        connectionStatus: "Connection Status",
        profileSummary: "Your registered information",
        editProfile: "Edit Profile",
        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",
        liveDataTitle: "Live Data",
        liveDataDescription: "Only verified connected data is displayed.",

        currentWeather: "Current Weather",
        refresh: "Refresh",
        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription: "Unable to retrieve weather data.",
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
        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription:
            "No verified market data has been received.",
        dataUnavailable: "Verified data unavailable",

        kopargaonMarket: "Kopargaon APMC",
        yeolaMarket: "Yeola Market",
        shirdiMarket: "Shirdi Market",

        comparisonSubtitle:
            "Compare connected market information before selling.",

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
            "Connect a crop-health AI service before displaying analysis.",

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

        aiSubtitle: "Ask farming-related questions.",
        smartAssistant: "Smart Farmer Assistant",
        aiNotConnected: "AI Not Connected",
        assistant: "Assistant",
        aiUnavailable:
            "AI service is not connected yet.",
        askQuestion: "Ask a farming question...",
        aiConnectionNote:
            "AI responses require a connected AI service/backend.",

        voiceSubtitle:
            "Speak and listen in your preferred language.",
        voiceAssistantTitle: "Smart Voice Assistance",
        voiceDescription:
            "Speak using your device microphone.",
        startVoice: "Start Voice Assistance",
        stopVoice: "Stop Listening",
        voiceInput: "Voice Input",
        voiceInputPlaceholder:
            "Voice input will appear here...",
        voiceResponse: "Voice Response",
        voiceReady: "Voice assistance is ready.",

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

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",
        marketIntelligence: "Market Intelligence",
        multilingualSupport: "Multilingual Support",

        offline: "Offline",
        online: "Online"
    },


    hi: {

        appName: "स्मार्ट एग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri का उपयोग करने के लिए लॉगिन करें",
        email: "ईमेल",
        password: "पासवर्ड",
        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        login: "लॉगिन",
        or: "या",
        demoDashboard: "डेमो डैशबोर्ड खोलें",
        noAccount: "क्या आपका खाता नहीं है?",
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
        preferredLanguage: "पसंदीदा भाषा",
        createAccount: "खाता बनाएं",
        alreadyAccount: "क्या आपका पहले से खाता है?",

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

        welcome: "स्वागत है",
        dashboardSubtitle: "आपकी खेती की जानकारी एक जगह।",
        connectionStatus: "कनेक्शन स्थिति",
        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",
        quickActions: "त्वरित कार्य",
        quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",
        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",
        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription: "मौसम डेटा प्राप्त नहीं हो सका।",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "हवा की गति",
        rainChance: "बारिश",

        marketSubtitle: "सत्यापित स्रोतों से वर्तमान फसल भाव।",
        marketPriceTable: "बाजार भाव तालिका",
        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "दिनांक",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        kopargaonMarket: "कोपरगांव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        comparisonSubtitle:
            "बेचने से पहले उपलब्ध बाजारों की तुलना करें।",

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
            "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",
        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",
        analysisNotConnected:
            "AI फसल विश्लेषण कनेक्ट नहीं है",
        analysisNotConnectedDescription:
            "विश्लेषण दिखाने के लिए फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",
        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
        cropInsurance: "फसल बीमा",
        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",
        learnMore: "अधिक जानकारी",

        aiSubtitle: "खेती से संबंधित प्रश्न पूछें।",
        smartAssistant: "स्मार्ट किसान सहायक",
        aiNotConnected: "AI कनेक्ट नहीं है",
        assistant: "सहायक",
        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",
        askQuestion: "खेती से संबंधित प्रश्न पूछें...",
        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",
        voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन से बोलें।",
        startVoice: "वॉयस सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",
        voiceInput: "वॉयस इनपुट",
        voiceInputPlaceholder:
            "वॉयस इनपुट यहां दिखाई देगा...",
        voiceResponse: "वॉयस उत्तर",
        voiceReady: "वॉयस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",
        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
        voiceSettingDescription:
            "वॉयस सहायता चालू या बंद करें।",
        notifications: "सूचनाएं",
        notificationDescription:
            "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता उपलब्ध कराने के लिए बनाया गया है।",
        marketIntelligence: "बाजार सूचना",
        multilingualSupport: "बहुभाषी सहायता",

        offline: "ऑफलाइन",
        online: "ऑनलाइन"
    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",
        languageDescription: "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",
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
        noAccount: "तुमचे खाते नाही?",
        register: "नोंदणी करा",
        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle: "तुमचे SmartAgri शेतकरी खाते तयार करा",
        fullName: "पूर्ण नाव",
        mobile: "मोबाईल नंबर",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्रफळ",
        preferredMarket: "पसंतीची बाजारपेठ",
        selectMarket: "बाजार निवडा",
        preferredLanguage: "पसंतीची भाषा",
        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीपासून खाते आहे?",

        dashboard: "डॅशबोर्ड",
        weather: "हवामान",
        marketPrices: "बाजारभाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पिकांची माहिती",
        cropHealth: "पिकांचे आरोग्य",
        governmentSchemes: "सरकारी योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "व्हॉइस सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",

        welcome: "स्वागत आहे",
        dashboardSubtitle: "तुमची शेतीविषयक माहिती एका ठिकाणी.",
        connectionStatus: "कनेक्शन स्थिती",
        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",
        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची शेती साधने पटकन वापरा.",
        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",
        weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
        weatherUnavailableDescription:
            "हवामान डेटा मिळवता आला नाही.",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "सत्यापित स्रोतांमधून सध्याचे पीक बाजारभाव.",
        marketPriceTable: "बाजारभाव तक्ता",
        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "दिनांक",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
        marketDataUnavailableDescription:
            "कोणताही सत्यापित बाजार डेटा मिळालेला नाही.",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        comparisonSubtitle:
            "विक्रीपूर्वी उपलब्ध बाजारांची तुलना करा.",

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
            "AI विश्लेषणासाठी पिकाची प्रतिमा अपलोड करा.",
        uploadCropImage: "पीक / पानाची प्रतिमा अपलोड करा",
        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी प्रतिमा निवडा.",
        chooseImage: "प्रतिमा निवडा",
        analyzeCrop: "पिकाचे विश्लेषण करा",
        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",
        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",
        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",
        cropInsurance: "पीक विमा",
        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजनेची अधिकृत माहिती.",
        learnMore: "अधिक माहिती",

        aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
        aiNotConnected: "AI कनेक्ट केलेले नाही",
        assistant: "सहाय्यक",
        aiUnavailable:
            "AI सेवा अद्याप कनेक्ट केलेली नाही.",
        askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",
        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle:
            "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",
        voiceAssistantTitle: "स्मार्ट व्हॉइस सहाय्य",
        voiceDescription:
            "तुमच्या डिव्हाइसच्या मायक्रोफोनचा वापर करा.",
        startVoice: "व्हॉइस सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",
        voiceInput: "व्हॉइस इनपुट",
        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",
        voiceResponse: "व्हॉइस उत्तर",
        voiceReady: "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",
        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle:
            "SmartAgri च्या पसंती व्यवस्थापित करा.",
        changeLanguageDescription:
            "तुमची पसंतीची अ‍ॅप भाषा निवडा.",
        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",
        notifications: "सूचना",
        notificationDescription:
            "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे.",
        marketIntelligence: "बाजार माहिती",
        multilingualSupport: "बहुभाषिक सहाय्य",

        offline: "ऑफलाइन",
        online: "ऑनलाइन"
    }
};


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );

    const dictionary = translations[language];

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }

    });


    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (dictionary[key] !== undefined) {
            element.placeholder = dictionary[key];
        }

    });


    /*
       Update all language selectors without triggering
       change events.
    */

    const selectors = [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ];

    selectors.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.value = language;
        }

    });


    /*
       Update speech recognition language.
    */

    if (recognition) {
        recognition.lang = getSpeechLanguage();
    }
}


function getSpeechLanguage() {

    if (currentLanguage === "hi") {
        return "hi-IN";
    }

    if (currentLanguage === "mr") {
        return "mr-IN";
    }

    return "en-IN";
}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active-screen");
    }
}


function showDashboard() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const dashboard =
        document.getElementById("dashboardPage");

    if (dashboard) {
        dashboard.classList.add("active-screen");
    }

    loadFarmerData();

    updateConnectionStatus();

    /*
       Load these after dashboard appears.
    */

    loadWeather();

    loadMarketPrices();

    loadCropInformation();
}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        document.querySelectorAll(".language-option");

    const continueButton =
        document.getElementById("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedLanguage =
                button.dataset.language;

            if (continueButton) {
                continueButton.disabled = false;
            }

        });

    });


    if (continueButton) {

        continueButton.addEventListener("click", event => {

            event.preventDefault();

            const language =
                selectedLanguage || currentLanguage || "en";

            applyLanguage(language);

            showScreen("loginPage");

        });

    }
}


/* =========================================================
   CHANGE LANGUAGE FROM LOGIN
========================================================= */

function setupLanguageSelectors() {

    const loginChangeLanguage =
        document.getElementById(
            "changeLanguageFromLogin"
        );

    if (loginChangeLanguage) {

        loginChangeLanguage.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showScreen("languagePage");

            }
        );

    }


    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            event => {

                applyLanguage(event.target.value);

            }
        );

    }


    const settingsLanguage =
        document.getElementById("settingsLanguage");

    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            event => {

                applyLanguage(event.target.value);

            }
        );

    }


    const registerLanguage =
        document.getElementById("registerLanguage");

    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            event => {

                applyLanguage(event.target.value);

            }
        );

    }


    const profileLanguage =
        document.getElementById("profileLanguage");

    if (profileLanguage) {

        profileLanguage.addEventListener(
            "change",
            event => {

                applyLanguage(event.target.value);

            }
        );

    }
}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) return;


    loginForm.addEventListener("submit", async event => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        if (!email || !password) {
            showMessage(
                message,
                "Please enter email and password.",
                "error"
            );
            return;
        }


        try {

            if (!auth) {
                throw new Error(
                    "Firebase authentication is unavailable."
                );
            }


            const result =
                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );


            currentFarmer = result.user;

            showMessage(
                message,
                "Login successful.",
                "success"
            );


            setTimeout(() => {
                showDashboard();
            }, 300);

        } catch (error) {

            console.error(error);

            showMessage(
                message,
                getFirebaseErrorMessage(error),
                "error"
            );

        }

    });


    const forgotPasswordBtn =
        document.getElementById("forgotPasswordBtn");


    if (forgotPasswordBtn) {

        forgotPasswordBtn.addEventListener(
            "click",
            async event => {

                event.preventDefault();

                const email =
                    document
                        .getElementById("loginEmail")
                        .value
                        .trim();


                if (!email) {

                    showMessage(
                        document.getElementById("loginMessage"),
                        "Enter your email address first.",
                        "error"
                    );

                    return;
                }


                try {

                    await auth.sendPasswordResetEmail(email);

                    showMessage(
                        document.getElementById("loginMessage"),
                        "Password reset email sent.",
                        "success"
                    );

                } catch (error) {

                    showMessage(
                        document.getElementById("loginMessage"),
                        getFirebaseErrorMessage(error),
                        "error"
                    );

                }

            }
        );

    }


    const demoBtn =
        document.getElementById("demoBtn");


    if (demoBtn) {

        demoBtn.addEventListener(
            "click",
            event => {

                event.preventDefault();

                currentFarmer = {
                    uid: "demo-user",
                    email: "demo@smartagri.local",
                    displayName: "Demo Farmer"
                };


                const demoData = {
                    name: "Demo Farmer",
                    email: "demo@smartagri.local",
                    mobile: "9999999999",
                    village: "Kopargaon",
                    state: "Maharashtra",
                    landArea: "5 acres",
                    market: "Kopargaon APMC",
                    language: currentLanguage
                };


                localStorage.setItem(
                    "smartAgriDemoFarmer",
                    JSON.stringify(demoData)
                );


                showDashboard();

            }
        );

    }


    const registerButton =
        document.getElementById("showRegisterBtn");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showScreen("registerPage");

            }
        );

    }

}


/* =========================================================
   REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        document.getElementById("registrationForm");

    if (!form) return;


    form.addEventListener("submit", async event => {

        event.preventDefault();


        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const mobile =
            document.getElementById("registerMobile").value.trim();

        const village =
            document.getElementById("registerVillage").value.trim();

        const state =
            document.getElementById("registerState").value.trim();

        const landArea =
            document.getElementById("registerLandArea").value.trim();

        const market =
            document.getElementById("registerMarket").value;

        const language =
            document.getElementById("registerLanguage").value;

        const password =
            document.getElementById("registerPassword").value;


        const message =
            document.getElementById("registerMessage");


        try {

            if (!auth) {
                throw new Error("Firebase is not initialized.");
            }


            const result =
                await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );


            const user =
                result.user;


            const farmerData = {

                name,
                email,
                mobile,
                village,
                state,
                landArea,
                market,
                language,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            };


            if (db) {

                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .set(farmerData);

            }


            currentFarmer = user;

            applyLanguage(language);


            showMessage(
                message,
                "Account created successfully.",
                "success"
            );


            setTimeout(() => {
                showDashboard();
            }, 500);


        } catch (error) {

            console.error(error);

            showMessage(
                message,
                getFirebaseErrorMessage(error),
                "error"
            );

        }

    });


    const loginButton =
        document.getElementById("showLoginBtn");


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showScreen("loginPage");

            }
        );

    }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupAuthState() {

    if (!auth) return;


    auth.onAuthStateChanged(async user => {

        if (user) {

            currentFarmer = user;

            /*
               Don't force dashboard automatically if user
               is currently choosing language.
            */

            const languagePage =
                document.getElementById("languagePage");

            const loginPage =
                document.getElementById("loginPage");

            const dashboard =
                document.getElementById("dashboardPage");


            const languageActive =
                languagePage &&
                languagePage.classList.contains(
                    "active-screen"
                );


            const loginActive =
                loginPage &&
                loginPage.classList.contains(
                    "active-screen"
                );


            if (!languageActive && !loginActive && dashboard) {
                showDashboard();
            }

        }

    });

}


/* =========================================================
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData() {

    let data = null;


    /*
       Demo data
    */

    const demoData =
        localStorage.getItem(
            "smartAgriDemoFarmer"
        );


    if (demoData) {

        try {
            data = JSON.parse(demoData);
        } catch (error) {
            console.error(error);
        }

    }


    /*
       Firebase data
    */

    if (
        currentFarmer &&
        currentFarmer.uid !== "demo-user" &&
        db
    ) {

        try {

            const snapshot =
                await db
                    .collection("farmers")
                    .doc(currentFarmer.uid)
                    .get();


            if (snapshot.exists) {

                data = snapshot.data();

            }

        } catch (error) {

            console.error(
                "Could not load farmer profile:",
                error
            );

        }

    }


    /*
       Fallback
    */

    if (!data && currentFarmer) {

        data = {
            name:
                currentFarmer.displayName ||
                "Farmer",

            email:
                currentFarmer.email || "",

            mobile: "",
            village: "Kopargaon",
            state: "Maharashtra",
            landArea: "",
            market: "Kopargaon APMC",
            language: currentLanguage
        };

    }


    if (!data) return;


    populateFarmerUI(data);

}


/* =========================================================
   POPULATE FARMER UI
========================================================= */

function populateFarmerUI(data) {

    setText("headerFarmerName", data.name || "Farmer");

    setText("dashboardFarmerName", data.name || "Farmer");

    setText("summaryName", data.name || "—");
    setText("summaryVillage", data.village || "—");
    setText("summaryLand", data.landArea || "—");
    setText("summaryMarket", data.market || "—");

    setText("profilePageName", data.name || "—");
    setText("profilePageEmail", data.email || "—");

    setValue("profileName", data.name || "");
    setValue("profileEmail", data.email || "");
    setValue("profileMobile", data.mobile || "");
    setValue("profileVillage", data.village || "");
    setValue("profileState", data.state || "");
    setValue("profileLandArea", data.landArea || "");
    setValue("profileMarket", data.market || "");
    setValue(
        "profileLanguage",
        data.language || currentLanguage
    );

    if (data.language) {
        applyLanguage(data.language);
    }

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function setupProfile() {

    const editButton =
        document.getElementById("editProfileBtn");

    const cancelButton =
        document.getElementById("cancelProfileEditBtn");

    const form =
        document.getElementById("profileForm");

    const actions =
        document.getElementById("profileEditActions");


    const fields = [
        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"
    ];


    function setEditing(enabled) {

        fields.forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.disabled = !enabled;
            }

        });


        if (actions) {
            actions.classList.toggle(
                "hidden",
                !enabled
            );
        }

    }


    if (editButton) {

        editButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                setEditing(true);

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                setEditing(false);

                loadFarmerData();

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const data = {

                    name:
                        getValue("profileName"),

                    mobile:
                        getValue("profileMobile"),

                    village:
                        getValue("profileVillage"),

                    state:
                        getValue("profileState"),

                    landArea:
                        getValue("profileLandArea"),

                    market:
                        getValue("profileMarket"),

                    language:
                        getValue("profileLanguage")

                };


                try {

                    if (
                        currentFarmer &&
                        currentFarmer.uid !== "demo-user" &&
                        db
                    ) {

                        await db
                            .collection("farmers")
                            .doc(currentFarmer.uid)
                            .set(
                                data,
                                { merge: true }
                            );

                    } else {

                        const existing =
                            JSON.parse(
                                localStorage.getItem(
                                    "smartAgriDemoFarmer"
                                ) || "{}"
                            );


                        localStorage.setItem(
                            "smartAgriDemoFarmer",
                            JSON.stringify({
                                ...existing,
                                ...data
                            })
                        );

                    }


                    applyLanguage(data.language);

                    setEditing(false);

                    populateFarmerUI(data);


                    showMessage(
                        document.getElementById(
                            "profileMessage"
                        ),
                        "Profile updated successfully.",
                        "success"
                    );


                } catch (error) {

                    console.error(error);

                    showMessage(
                        document.getElementById(
                            "profileMessage"
                        ),
                        "Unable to save profile.",
                        "error"
                    );

                }

            }
        );

    }

}


/* =========================================================
   WEATHER
========================================================= */

async function loadWeather() {

    const emptyState =
        document.getElementById(
            "weatherEmptyState"
        );

    const weatherData =
        document.getElementById(
            "weatherData"
        );


    if (!emptyState || !weatherData) return;


    emptyState.classList.remove("hidden");

    weatherData.classList.add("hidden");


    try {

        const response =
            await fetch(WEATHER_API, {
                method: "GET",
                cache: "no-store"
            });


        if (!response.ok) {
            throw new Error(
                "Weather API returned " +
                response.status
            );
        }


        const data =
            await response.json();


        const current =
            data.current;


        if (!current) {
            throw new Error(
                "Current weather data unavailable."
            );
        }


        setText(
            "weatherTemperature",
            `${round(current.temperature_2m)} °C`
        );


        setText(
            "weatherHumidity",
            `${round(current.relative_humidity_2m)} %`
        );


        setText(
            "weatherWind",
            `${round(current.wind_speed_10m)} km/h`
        );


        /*
           Open-Meteo current rain is rainfall amount,
           not probability.

           Therefore we show the current rain amount
           rather than incorrectly calling it a chance.
        */

        setText(
            "weatherRain",
            `${round(current.rain || 0)} mm`
        );


        emptyState.classList.add("hidden");

        weatherData.classList.remove("hidden");


        updateConnectionStatus(true);


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        emptyState.classList.remove("hidden");

        weatherData.classList.add("hidden");


        updateConnectionStatus(false);

    }

}


/* =========================================================
   WEATHER REFRESH
========================================================= */

function setupWeather() {

    const button =
        document.getElementById(
            "refreshWeatherBtn"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        async event => {

            event.preventDefault();

            button.disabled = true;

            const oldText =
                button.innerHTML;

            button.innerHTML = "🔄 Loading...";


            try {

                await loadWeather();

            } finally {

                button.disabled = false;

                button.innerHTML = oldText;

            }

        }
    );

}


/* =========================================================
   MARKET PRICE API
========================================================= */

async function loadMarketPrices() {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) return;


    const cropSelector =
        document.getElementById(
            "cropPriceSelector"
        );


    const crop =
        cropSelector
            ? cropSelector.value
            : "onion";


    const cropName =
        crop === "wheat"
            ? "Wheat"
            : "Onion";


    /*
       If API credentials are not entered,
       show a clear configuration message instead
       of fake prices.
    */

    if (
        !DATA_GOV_API_KEY ||
        !DATA_GOV_RESOURCE_ID
    ) {

        renderMarketMessage(
            "Market API is not configured yet."
        );

        /*
           We still load the three market cards
           with an honest unavailable state.
        */

        updateComparisonCards([]);

        return;
    }


    try {

        const url =
            "https://api.data.gov.in/resource/" +
            encodeURIComponent(DATA_GOV_RESOURCE_ID) +
            "?api-key=" +
            encodeURIComponent(DATA_GOV_API_KEY) +
            "&format=json" +
            "&limit=1000";


        const response =
            await fetch(url, {
                method: "GET",
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                "Mandi API returned " +
                response.status
            );

        }


        const result =
            await response.json();


        const records =
            Array.isArray(result.records)
                ? result.records
                : [];


        /*
           Filter Maharashtra + selected crop
        */

        const filtered =
            records.filter(record => {

                const state =
                    String(
                        record.state ||
                        record.State ||
                        ""
                    ).toLowerCase();


                const commodity =
                    String(
                        record.commodity ||
                        record.Commodity ||
                        ""
                    ).toLowerCase();


                const market =
                    String(
                        record.market ||
                        record.Market ||
                        ""
                    ).toLowerCase();


                const cropMatches =
                    commodity.includes(
                        cropName.toLowerCase()
                    );


                const stateMatches =
                    state.includes("maharashtra");


                const marketMatches =
                    market.includes("kopargaon") ||
                    market.includes("yeola") ||
                    market.includes("shirdi");


                return (
                    cropMatches &&
                    stateMatches &&
                    marketMatches
                );

            });


        renderMarketTable(
            filtered,
            cropName
        );


        updateComparisonCards(
            filtered
        );


        updateConnectionStatus(true);


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        renderMarketMessage(
            "Market data could not be retrieved."
        );


        updateComparisonCards([]);

    }

}


/* =========================================================
   MARKET TABLE
========================================================= */

function renderMarketTable(records, cropName) {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) return;


    if (!records.length) {

        renderMarketMessage(
            `No verified ${cropName} prices found for Kopargaon, Yeola or Shirdi.`
        );

        return;

    }


    tableBody.innerHTML = "";


    records.forEach(record => {

        const row =
            document.createElement("tr");


        const market =
            getRecordValue(
                record,
                [
                    "market",
                    "Market",
                    "market_name",
                    "Market Name"
                ]
            );


        const commodity =
            getRecordValue(
                record,
                [
                    "commodity",
                    "Commodity"
                ]
            ) || cropName;


        const modal =
            getRecordValue(
                record,
                [
                    "modal_price",
                    "Modal Price",
                    "modalprice",
                    "ModalPrice"
                ]
            );


        const min =
            getRecordValue(
                record,
                [
                    "min_price",
                    "Min Price",
                    "minimum_price",
                    "Min Price"
                ]
            );


        const max =
            getRecordValue(
                record,
                [
                    "max_price",
                    "Max Price",
                    "maximum_price",
                    "Max Price"
                ]
            );


        const date =
            getRecordValue(
                record,
                [
                    "arrival_date",
                    "Arrival_Date",
                    "date",
                    "Date"
                ]
            );


        row.innerHTML = `
            <td>${escapeHtml(market || "—")}</td>

            <td>${escapeHtml(commodity || cropName)}</td>

            <td>
                <strong>
                    ${formatPrice(modal)}
                </strong>
                <br>
                <small>
                    Min: ${formatPrice(min)}
                    |
                    Max: ${formatPrice(max)}
                </small>
            </td>

            <td>${escapeHtml(date || "—")}</td>
        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   MARKET MESSAGE
========================================================= */

function renderMarketMessage(message) {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = `
        <tr>
            <td colspan="4">
                <div class="table-empty">
                    <span>📊</span>
                    <strong>Market data unavailable</strong>
                    <p>${escapeHtml(message)}</p>
                </div>
            </td>
        </tr>
    `;

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

function updateComparisonCards(records) {

    const markets = {

        kopargaon: {
            name: "Kopargaon APMC",
            keywords: ["kopargaon"]
        },

        yeola: {
            name: "Yeola Market",
            keywords: ["yeola"]
        },

        shirdi: {
            name: "Shirdi Market",
            keywords: ["shirdi"]
        }

    };


    Object.entries(markets).forEach(
        ([key, marketInfo]) => {

            const cards =
                document.querySelectorAll(
                    ".market-card"
                );


            let card = null;


            cards.forEach(candidate => {

                const heading =
                    candidate.querySelector("h3");


                if (
                    heading &&
                    heading.textContent
                        .toLowerCase()
                        .includes(
                            marketInfo.name
                                .split(" ")[0]
                                .toLowerCase()
                        )
                ) {

                    card = candidate;

                }

            });


            if (!card) return;


            const priceElement =
                card.querySelector(
                    ".market-value strong"
                );


            const statusElement =
                card.querySelector("p");


            const record =
                records.find(item => {

                    const market =
                        String(
                            item.market ||
                            item.Market ||
                            ""
                        ).toLowerCase();


                    return marketInfo.keywords.some(
                        keyword =>
                            market.includes(keyword)
                    );

                });


            if (record) {

                const modal =
                    getRecordValue(
                        record,
                        [
                            "modal_price",
                            "Modal Price",
                            "modalprice"
                        ]
                    );


                if (priceElement) {
                    priceElement.textContent =
                        formatPrice(modal);
                }


                if (statusElement) {
                    statusElement.textContent =
                        "Verified market data";
                }

            } else {

                if (priceElement) {
                    priceElement.textContent = "—";
                }


                if (statusElement) {
                    statusElement.textContent =
                        "Verified data unavailable";
                }

            }

        }
    );

}


/* =========================================================
   CROP SELECTOR
========================================================= */

function setupMarketSelector() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (!selector) return;


    selector.addEventListener(
        "change",
        () => {
            loadMarketPrices();
        }
    );

}


/* =========================================================
   CROP INFORMATION
========================================================= */

const cropInformation = {

    onion: {

        en: {
            title: "Onion",
            description:
                "Onion requires well-drained soil, regular irrigation and proper nutrient management. Avoid waterlogging and monitor for thrips and fungal diseases.",
            items: [
                "Use well-drained soil",
                "Maintain regular irrigation",
                "Monitor thrips and fungal diseases",
                "Use balanced fertilizer",
                "Harvest after proper bulb maturity"
            ]
        },

        hi: {
            title: "प्याज",
            description:
                "प्याज के लिए अच्छी जल निकासी वाली मिट्टी, नियमित सिंचाई और उचित पोषक प्रबंधन आवश्यक है।",
            items: [
                "अच्छी जल निकासी वाली मिट्टी का उपयोग करें",
                "नियमित सिंचाई करें",
                "थ्रिप्स और रोगों की निगरानी करें",
                "संतुलित उर्वरक का उपयोग करें",
                "उचित परिपक्वता पर कटाई करें"
            ]
        },

        mr: {
            title: "कांदा",
            description:
                "कांद्याला चांगला निचरा होणारी जमीन, नियमित पाणी आणि योग्य अन्नद्रव्य व्यवस्थापन आवश्यक आहे.",
            items: [
                "चांगला निचरा होणारी जमीन वापरा",
                "नियमित सिंचन करा",
                "थ्रिप्स आणि रोगांवर लक्ष ठेवा",
                "संतुलित खतांचा वापर करा",
                "योग्य परिपक्वतेनंतर काढणी करा"
            ]
        }

    },


    wheat: {

        en: {
            title: "Wheat",
            description:
                "Wheat performs best with suitable soil moisture, timely sowing, balanced nutrition and monitoring for rust and insect pests.",
            items: [
                "Prepare a fine seedbed",
                "Use certified seed",
                "Maintain suitable soil moisture",
                "Apply balanced nutrients",
                "Monitor rust and insect pests"
            ]
        },

        hi: {
            title: "गेहूं",
            description:
                "गेहूं के लिए उचित मिट्टी की नमी, समय पर बुवाई, संतुलित पोषण और रोग एवं कीट निगरानी आवश्यक है।",
            items: [
                "अच्छी बीज क्यारी तैयार करें",
                "प्रमाणित बीज का उपयोग करें",
                "मिट्टी की उचित नमी बनाए रखें",
                "संतुलित पोषक तत्व दें",
                "रोग और कीटों की निगरानी करें"
            ]
        },

        mr: {
            title: "गहू",
            description:
                "गव्हासाठी योग्य जमिनीतील ओलावा, वेळेवर पेरणी, संतुलित अन्नद्रव्ये आणि रोग-कीड निरीक्षण आवश्यक आहे.",
            items: [
                "चांगली बीजशय्या तयार करा",
                "प्रमाणित बियाणे वापरा",
                "जमिनीतील योग्य ओलावा ठेवा",
                "संतुलित अन्नद्रव्ये द्या",
                "रोग आणि किडींवर लक्ष ठेवा"
            ]
        }

    }

};


function loadCropInformation() {

    const cards =
        document.querySelectorAll(
            ".crop-card"
        );


    if (!cards.length) return;


    cards.forEach(card => {

        const heading =
            card.querySelector("h2");


        if (!heading) return;


        const key =
            heading.textContent
                .trim()
                .toLowerCase()
                .includes("wheat") ||
            heading.textContent
                .trim()
                .includes("गेहूं") ||
            heading.textContent
                .trim()
                .includes("गहू")
                ? "wheat"
                : "onion";


        const info =
            cropInformation[key][currentLanguage] ||
            cropInformation[key].en;


        const description =
            card.querySelector("p");


        if (description) {
            description.textContent =
                info.description;
        }


        const list =
            card.querySelector(".crop-list");


        if (list) {

            list.innerHTML = "";

            info.items.forEach(item => {

                const span =
                    document.createElement("span");

                span.textContent = "✓ " + item;

                list.appendChild(span);

            });

        }

    });

}


/* =========================================================
   CROP HEALTH IMAGE UPLOAD
========================================================= */

function setupCropHealth() {

    const input =
        document.getElementById(
            "cropImageInput"
        );

    const previewContainer =
        document.getElementById(
            "imagePreviewContainer"
        );

    const preview =
        document.getElementById(
            "cropImagePreview"
        );

    const analyzeButton =
        document.getElementById(
            "analyzeCropBtn"
        );

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    if (!input) return;


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files &&
                event.target.files[0];


            if (!file) {
                return;
            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select a valid image."
                );

                input.value = "";

                return;
            }


            selectedCropImage = file;


            const reader =
                new FileReader();


            reader.onload = e => {

                if (preview) {
                    preview.src =
                        e.target.result;
                }


                if (previewContainer) {
                    previewContainer.classList.remove(
                        "hidden"
                    );
                }


                if (analyzeButton) {
                    analyzeButton.disabled = false;
                }


                if (result) {

                    result.innerHTML = `
                        <strong>
                            Image selected successfully
                        </strong>
                        <p>
                            Click "Analyze Crop" to continue.
                        </p>
                    `;

                }

            };


            reader.readAsDataURL(file);

        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


                if (!selectedCropImage) {
                    return;
                }


                /*
                   This is a frontend-ready placeholder.

                   Actual disease detection requires a connected
                   AI model/backend such as a crop disease API
                   or your own trained model.

                   We deliberately do NOT invent a disease result.
                */

                if (result) {

                    result.innerHTML = `
                        <strong>
                            Image received successfully.
                        </strong>

                        <p>
                            AI disease detection is ready to be
                            connected. The selected image was:
                            ${escapeHtml(selectedCropImage.name)}
                        </p>

                        <p>
                            No disease diagnosis is being fabricated
                            without a connected crop-health model.
                        </p>
                    `;

                }

            }
        );

    }

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function setupGovernmentSchemes() {

    document
        .querySelectorAll(".scheme-button")
        .forEach(button => {

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

        });

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        document.getElementById(
            "aiForm"
        );


    const input =
        document.getElementById(
            "aiInput"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!form || !input || !messages) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            /*
               CRITICAL:
               Prevent browser form submission.
               This was causing the page to return to
               the language screen.
            */

            event.preventDefault();

            event.stopPropagation();


            const question =
                input.value.trim();


            if (!question) return;


            addChatMessage(
                "user",
                question
            );


            input.value = "";


            /*
               No AI backend is configured in the HTML.
               Therefore give an honest local assistant response
               rather than pretending a real AI response exists.
            */

            const answer =
                getLocalAIResponse(
                    question
                );


            setTimeout(() => {

                addChatMessage(
                    "assistant",
                    answer
                );

            }, 300);

        }
    );

}


/* =========================================================
   LOCAL FARMING ASSISTANT
========================================================= */

function getLocalAIResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("onion") ||
        q.includes("कांदा") ||
        q.includes("प्याज")
    ) {

        if (
            q.includes("price") ||
            q.includes("भाव") ||
            q.includes("भाव")
        ) {

            return "Please open Market Prices to see the latest connected mandi data.";
        }


        return "For onion cultivation, use well-drained soil, maintain proper irrigation, monitor thrips and fungal diseases, and harvest when bulbs reach proper maturity.";
    }


    if (
        q.includes("wheat") ||
        q.includes("गहू") ||
        q.includes("गेहूं")
    ) {

        return "For wheat, use certified seed, timely sowing, suitable soil moisture and balanced nutrition. Monitor the crop regularly for rust and insect pests.";
    }


    if (
        q.includes("weather") ||
        q.includes("मौसम") ||
        q.includes("हवामान")
    ) {

        return "Open the Weather section and press Refresh to retrieve the latest weather information.";
    }


    if (
        q.includes("market") ||
        q.includes("mandi") ||
        q.includes("बाजार") ||
        q.includes("बाजारभाव")
    ) {

        return "SmartAgri supports Kopargaon APMC, Yeola Market and Shirdi Market. Open Market Prices or Market Comparison to view connected data.";
    }


    if (
        q.includes("scheme") ||
        q.includes("योजना") ||
        q.includes("योजना")
    ) {

        return "Open Government Schemes to access official PM-KISAN, PMKSY and PMFBY information.";
    }


    return "I can help with crop cultivation, market prices, weather, government schemes and farming practices. Please ask a specific farming question.";
}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(type, text) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) return;


    const message =
        document.createElement("div");


    message.className =
        "chat-message " +
        (
            type === "user"
                ? "user-message"
                : "assistant-message"
        );


    message.innerHTML = `

        <div class="chat-avatar">
            ${type === "user" ? "👨‍🌾" : "🤖"}
        </div>

        <div>

            <strong>
                ${type === "user" ? "You" : "Assistant"}
            </strong>

            <p>
                ${escapeHtml(text)}
            </p>

        </div>

    `;


    container.appendChild(message);


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function setupVoice() {

    const startButton =
        document.getElementById(
            "startVoiceBtn"
        );

    const stopButton =
        document.getElementById(
            "stopVoiceBtn"
        );

    const input =
        document.getElementById(
            "voiceInput"
        );

    const response =
        document.getElementById(
            "voiceResponse"
        );


    if (!startButton) return;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.disabled = true;

        if (response) {

            response.textContent =
                "Voice recognition is not supported in this browser. Try Chrome or Edge.";

        }

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang =
        getSpeechLanguage();


    recognition.onstart = () => {

        startButton.classList.add(
            "hidden"
        );


        if (stopButton) {
            stopButton.classList.remove(
                "hidden"
            );
        }


        if (response) {
            response.textContent =
                "Listening...";
        }

    };


    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;


        if (input) {
            input.value =
                transcript;
        }


        const answer =
            getLocalAIResponse(
                transcript
            );


        if (response) {
            response.textContent =
                answer;
        }


        speakText(answer);

    };


    recognition.onerror = event => {

        console.error(
            "Speech recognition error:",
            event.error
        );


        if (response) {

            response.textContent =
                "Voice recognition error: " +
                event.error;

        }

    };


    recognition.onend = () => {

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
        event => {

            event.preventDefault();

            try {

                recognition.lang =
                    getSpeechLanguage();

                recognition.start();

            } catch (error) {

                console.error(error);

            }

        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                recognition.stop();

            }
        );

    }

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        getSpeechLanguage();


    utterance.rate = 0.9;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   DASHBOARD SECTION NAVIGATION
========================================================= */

function setupNavigation() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-section]"
                );


            if (!button) return;


            const sectionId =
                button.dataset.section;


            if (!sectionId) return;


            event.preventDefault();


            openAppSection(
                sectionId
            );

        }
    );


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openAppSection(
                        button.dataset.profileSection
                    );

                    closeProfileMenu();

                }
            );

        });

}


function openAppSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    closeSideMenu();


    /*
       Load section-specific data.
    */

    if (sectionId === "weatherSection") {
        loadWeather();
    }


    if (sectionId === "marketSection") {
        loadMarketPrices();
    }


    if (sectionId === "comparisonSection") {
        loadMarketPrices();
    }


    if (sectionId === "cropSection") {
        loadCropInformation();
    }

}


/* =========================================================
   SIDE MENU
========================================================= */

function setupSideMenu() {

    const hamburger =
        document.getElementById(
            "hamburgerBtn"
        );

    const closeButton =
        document.getElementById(
            "closeMenuBtn"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openSideMenu();

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeSideMenu();

            }
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
        document.getElementById(
            "sideMenu"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    if (menu) {
        menu.classList.add("open");
    }


    if (overlay) {
        overlay.classList.add("open");
    }

}


function closeSideMenu() {

    const menu =
        document.getElementById(
            "sideMenu"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    if (menu) {
        menu.classList.remove("open");
    }


    if (overlay) {
        overlay.classList.remove("open");
    }

}


/* =========================================================
   PROFILE MENU
========================================================= */

function setupProfileMenu() {

    const button =
        document.getElementById(
            "profileButton"
        );

    const menu =
        document.getElementById(
            "profileMenu"
        );


    if (!button || !menu) return;


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            menu.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                closeProfileMenu();

            }

        }
    );

}


function closeProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );


    if (menu) {
        menu.classList.remove(
            "open"
        );
    }

}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    const buttons = [
        "sideLogoutBtn",
        "profileLogoutBtn"
    ];


    buttons.forEach(id => {

        const button =
            document.getElementById(id);


        if (!button) return;


        button.addEventListener(
            "click",
            async event => {

                event.preventDefault();


                try {

                    if (
                        auth &&
                        currentFarmer &&
                        currentFarmer.uid !== "demo-user"
                    ) {

                        await auth.signOut();

                    }

                } catch (error) {

                    console.error(error);

                }


                currentFarmer = null;


                localStorage.removeItem(
                    "smartAgriDemoFarmer"
                );


                closeSideMenu();

                closeProfileMenu();


                showScreen(
                    "languagePage"
                );

            }
        );

    });

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus(online = null) {

    const status =
        document.getElementById(
            "connectionStatus"
        );

    const text =
        document.getElementById(
            "connectionText"
        );

    const dashboardText =
        document.getElementById(
            "dashboardConnectionText"
        );


    if (online === null) {
        online = navigator.onLine;
    }


    if (status) {

        status.classList.toggle(
            "online",
            online
        );

        status.classList.toggle(
            "offline",
            !online
        );

    }


    const label =
        online
            ? (
                translations[currentLanguage].online ||
                "Online"
            )
            : (
                translations[currentLanguage].offline ||
                "Offline"
            );


    if (text) {
        text.textContent = label;
    }


    if (dashboardText) {
        dashboardText.textContent = label;
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
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    const code =
        error && error.code
            ? error.code
            : "";


    const messages = {

        "auth/invalid-email":
            "Invalid email address.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password must contain at least 6 characters.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection."

    };


    return (
        messages[code] ||
        error.message ||
        "An unexpected error occurred."
    );

}


/* =========================================================
   GENERIC HELPERS
========================================================= */

function showMessage(element, text, type) {

    if (!element) return;


    element.textContent =
        text;


    element.className =
        "message " +
        type;

}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.textContent =
            value;
    }

}


function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.value =
            value;
    }

}


function getValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value
        : "";

}


function round(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "—";
    }


    return Math.round(
        number * 10
    ) / 10;

}


function formatPrice(value) {

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
        );


    if (!Number.isFinite(number)) {
        return "₹ " + escapeHtml(value);
    }


    return (
        "₹ " +
        number.toLocaleString(
            "en-IN"
        )
    );

}


function getRecordValue(record, keys) {

    for (const key of keys) {

        if (
            record[key] !== undefined &&
            record[key] !== null &&
            record[key] !== ""
        ) {

            return record[key];

        }

    }


    return "";

}


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application starting..."
        );


        /*
           Apply saved language immediately.
        */

        applyLanguage(
            currentLanguage
        );


        /*
           Initialize all application modules.
        */

        setupLanguagePage();

        setupLanguageSelectors();

        setupLogin();

        setupRegistration();

        setupAuthState();

        setupNavigation();

        setupSideMenu();

        setupProfileMenu();

        setupLogout();

        setupWeather();

        setupMarketSelector();

        setupCropHealth();

        setupGovernmentSchemes();

        setupAI();

        setupVoice();

        setupProfile();

        updateConnectionStatus();

        loadCropInformation();


        /*
           Start weather immediately if dashboard
           is already visible.
        */

        const dashboard =
            document.getElementById(
                "dashboardPage"
            );


        if (
            dashboard &&
            dashboard.classList.contains(
                "active-screen"
            )
        ) {

            loadWeather();

            loadMarketPrices();

        }


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);
