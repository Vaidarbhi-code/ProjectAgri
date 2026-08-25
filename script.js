/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   Firebase + Authentication + Firestore
   Language + Dashboard + Market + Weather
   Profile + Voice + AI Demo + Crop Health
========================================================= */


/* =========================================================
   1. FIREBASE CONFIGURATION
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
   2. INITIALIZE FIREBASE
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

    console.error("Firebase initialization failed:", error);

}


/* =========================================================
   3. DATA.GOV.IN CONFIGURATION
=========================================================

   IMPORTANT:

   Replace YOUR_DATA_GOV_API_KEY with your actual
   data.gov.in API key.

   Replace YOUR_RESOURCE_ID with the resource ID
   shown on the Data.gov.in API page.

   Dataset:
   Current Daily Price of Various Commodities from
   Various Markets (Mandi)

========================================================= */

const DATA_GOV_API_KEY = "YOUR_DATA_GOV_API_KEY";

/*
   Put your actual resource ID here.

   Example format:

   "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
*/
const DATA_GOV_RESOURCE_ID = "YOUR_RESOURCE_ID";


/* =========================================================
   4. OPTIONAL WEATHER API
=========================================================

   Open-Meteo is used here because it does not require
   an API key for normal non-commercial usage.

   Weather is obtained using latitude/longitude.

   Default location:
   Kopargaon, Maharashtra

========================================================= */

const DEFAULT_LOCATION = {
    name: "Kopargaon",
    latitude: 19.8826,
    longitude: 74.4762
};


/* =========================================================
   5. APPLICATION STATE
========================================================= */

let currentLanguage = localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;

let currentFarmerData = null;

let selectedLanguage = null;

let isDemoMode = false;

let editingProfile = false;

let recognition = null;

let voiceListening = false;


/* =========================================================
   6. TRANSLATIONS
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
        connectionStatus: "Connection Status",
        profileSummary: "Your registered information",
        editProfile: "Edit Profile",
        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription: "Only verified connected data is displayed.",

        offline: "Offline",
        online: "Online",

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

        comparisonSubtitle:
            "Compare connected market information before selling.",

        dataUnavailable: "Verified data unavailable",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onionInfo:
            "Onion cultivation information.",

        wheatInfo:
            "Wheat cultivation information.",

        cultivationGuidance: "Cultivation Guidance",
        cropManagement: "Crop Management",
        farmingPractices: "Farming Practices",

        cropHealthSubtitle:
            "Upload a crop image for AI-assisted analysis.",

        uploadCropImage:
            "Upload Crop / Leaf Image",

        uploadCropDescription:
            "Select an image for crop health analysis.",

        chooseImage: "Choose Image",
        analyzeCrop: "Analyze Crop",

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

        learnMore: "Learn More",

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

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support",

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."
    },


    hi: {

        appName: "स्मार्ट एग्री",
        appTagline: "स्मार्ट कृषि बाजार इंटेलिजेंस सिस्टम",

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
        voiceAssistance: "वॉइस सहायता",
        farmerProfile: "किसान प्रोफाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",
        logout: "लॉगआउट",

        myProfile: "मेरी प्रोफाइल",

        welcome: "स्वागत है",
        dashboardSubtitle: "आपकी खेती की जानकारी एक ही जगह।",
        connectionStatus: "कनेक्शन स्थिति",
        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",
        quickActions: "त्वरित कार्य",
        quickActionsSubtitle: "महत्वपूर्ण कृषि टूल जल्दी एक्सेस करें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        weatherSubtitle: "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",
        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",
        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle: "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",
        marketPriceTable: "बाजार भाव तालिका",
        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "तारीख",

        onion: "प्याज",
        wheat: "गेहूं",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onionInfo:
            "प्याज की खेती की जानकारी।",

        wheatInfo:
            "गेहूं की खेती की जानकारी।",

        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि पद्धतियां",

        cropHealthSubtitle:
            "AI आधारित विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

        uploadCropImage:
            "फसल / पत्ती की तस्वीर अपलोड करें",

        uploadCropDescription:
            "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",

        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

        analysisNotConnected:
            "AI फसल विश्लेषण कनेक्ट नहीं है",

        analysisNotConnectedDescription:
            "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसान सहायता और सरकारी कृषि कार्यक्रम।",

        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना जानकारी।",

        learnMore: "अधिक जानकारी",

        aiSubtitle:
            "कृषि से जुड़े प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "कृषि से जुड़ा प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्शन आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट वॉइस सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice:
            "वॉइस सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "वॉइस इनपुट",

        voiceInputPlaceholder:
            "वॉइस इनपुट यहां दिखाई देगा...",

        voiceResponse:
            "वॉइस प्रतिक्रिया",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        profileSubtitle:
            "किसान जानकारी देखें और संपादित करें।",

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

        marketIntelligence:
            "बाजार इंटेलिजेंस",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार इंटेलिजेंस, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
    },


    mr: {

        appName: "स्मार्ट अॅग्री",
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
        landArea: "जमिनीचे क्षेत्रफळ",
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
        marketPrices: "बाजार भाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पीक माहिती",
        cropHealth: "पीक आरोग्य",
        governmentSchemes: "शासकीय योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "व्हॉइस सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",

        myProfile: "माझे प्रोफाइल",

        welcome: "स्वागत",
        dashboardSubtitle: "आपली शेतीची माहिती एकाच ठिकाणी.",
        connectionStatus: "कनेक्शन स्थिती",
        profileSummary: "आपली नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",
        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची कृषी साधने त्वरीत वापरा.",

        liveDataTitle: "थेट डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",

        weatherUnavailable:
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक भाव.",

        marketPriceTable: "बाजार भाव तक्ता",
        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",

        onion: "कांदा",
        wheat: "गहू",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onionInfo:
            "कांदा लागवडीची माहिती.",

        wheatInfo:
            "गहू लागवडीची माहिती.",

        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle:
            "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage: "फोटो निवडा",
        analyzeCrop: "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि शासकीय कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री पीक विमा योजना माहिती.",

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
            "AI उत्तरांसाठी AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या आवडत्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "आपल्या डिव्हाइसचा मायक्रोफोन वापरा.",

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
            "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",

        changeLanguageDescription:
            "आपली आवडती अॅप भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."
    }

};


/* =========================================================
   7. HELPER FUNCTIONS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const target = $(screenId);

    if (target) {
        target.classList.add("active-screen");
    }
}


function showMessage(elementId, message, type = "success") {

    const element = $(elementId);

    if (!element) return;

    element.textContent = message;
    element.className = `message ${type}`;

    setTimeout(() => {
        element.textContent = "";
        element.className = "message";
    }, 5000);
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   8. LANGUAGE SYSTEM
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


    document.documentElement.lang = language;


    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (
            translations[language] &&
            translations[language][key]
        ) {

            element.textContent =
                translations[language][key];

        }

    });


    document.querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n-placeholder");

            if (
                translations[language] &&
                translations[language][key]
            ) {

                element.placeholder =
                    translations[language][key];

            }

        });


    const dashboardLanguage = $("dashboardLanguage");

    if (dashboardLanguage) {
        dashboardLanguage.value = language;
    }


    const settingsLanguage = $("settingsLanguage");

    if (settingsLanguage) {
        settingsLanguage.value = language;
    }


    const registerLanguage = $("registerLanguage");

    if (registerLanguage) {
        registerLanguage.value = language;
    }


    const profileLanguage = $("profileLanguage");

    if (profileLanguage) {
        profileLanguage.value = language;
    }


    updateVoiceLanguage();

}


/* =========================================================
   9. LANGUAGE PAGE
========================================================= */

function initializeLanguagePage() {

    const buttons =
        document.querySelectorAll(".language-option");

    const continueButton =
        $("continueLanguageBtn");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(item => {
                item.classList.remove("selected");
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

        continueButton.addEventListener("click", () => {

            if (!selectedLanguage) return;

            applyLanguage(selectedLanguage);

            showScreen("loginPage");

        });

    }


    const savedLanguage =
        localStorage.getItem("smartAgriLanguage");

    if (savedLanguage) {

        selectedLanguage = savedLanguage;

        const selectedButton =
            document.querySelector(
                `[data-language="${savedLanguage}"]`
            );

        if (selectedButton) {
            selectedButton.classList.add("selected");
        }

        if (continueButton) {
            continueButton.disabled = false;
        }
    }

}


/* =========================================================
   10. LOGIN / REGISTER NAVIGATION
========================================================= */

function initializeAuthNavigation() {

    $("showRegisterBtn")?.addEventListener("click", () => {

        showScreen("registerPage");

    });


    $("showLoginBtn")?.addEventListener("click", () => {

        showScreen("loginPage");

    });


    $("changeLanguageFromLogin")?.addEventListener("click", () => {

        showScreen("languagePage");

    });


    $("forgotPasswordBtn")?.addEventListener("click", forgotPassword);


    $("demoBtn")?.addEventListener("click", enterDemoDashboard);

}


/* =========================================================
   11. FIREBASE LOGIN
========================================================= */

async function loginUser(event) {

    event.preventDefault();

    const email =
        $("loginEmail").value.trim();

    const password =
        $("loginPassword").value;


    if (!email || !password) {

        showMessage(
            "loginMessage",
            "Please enter email and password.",
            "error"
        );

        return;
    }


    if (!auth) {

        showMessage(
            "loginMessage",
            "Firebase is not initialized.",
            "error"
        );

        return;
    }


    try {

        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        currentUser = result.user;

        isDemoMode = false;

        await loadFarmerData(currentUser.uid);

        openDashboard();

    } catch (error) {

        console.error(error);

        let message =
            "Login failed. Please check your credentials.";

        if (error.code === "auth/user-not-found") {
            message = "No account found with this email.";
        }

        if (error.code === "auth/wrong-password") {
            message = "Incorrect password.";
        }

        if (error.code === "auth/invalid-credential") {
            message = "Invalid email or password.";
        }

        if (error.code === "auth/invalid-email") {
            message = "Please enter a valid email.";
        }

        showMessage(
            "loginMessage",
            message,
            "error"
        );

    }

}


/* =========================================================
   12. REGISTRATION
========================================================= */

async function registerUser(event) {

    event.preventDefault();


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


    if (!name ||
        !email ||
        !mobile ||
        !village ||
        !state ||
        !landArea ||
        !market ||
        !password) {

        showMessage(
            "registerMessage",
            "Please fill all required fields.",
            "error"
        );

        return;
    }


    if (!auth || !db) {

        showMessage(
            "registerMessage",
            "Firebase is not initialized.",
            "error"
        );

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

                preferredLanguage: language,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        currentUser = user;

        currentFarmerData = {
            uid: user.uid,
            name,
            email,
            mobile,
            village,
            state,
            landArea,
            preferredMarket: market,
            preferredLanguage: language
        };


        applyLanguage(language);

        showMessage(
            "registerMessage",
            "Account created successfully.",
            "success"
        );


        setTimeout(() => {

            openDashboard();

        }, 1000);


    } catch (error) {

        console.error(error);

        let message =
            "Registration failed.";

        if (error.code === "auth/email-already-in-use") {
            message = "This email is already registered.";
        }

        if (error.code === "auth/invalid-email") {
            message = "Please enter a valid email.";
        }

        if (error.code === "auth/weak-password") {
            message = "Password must contain at least 6 characters.";
        }

        showMessage(
            "registerMessage",
            message,
            "error"
        );

    }

}


/* =========================================================
   13. FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    const email =
        $("loginEmail").value.trim();


    if (!email) {

        showMessage(
            "loginMessage",
            "Enter your email address first.",
            "error"
        );

        return;
    }


    try {

        await auth.sendPasswordResetEmail(email);

        showMessage(
            "loginMessage",
            "Password reset email sent.",
            "success"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "loginMessage",
            "Unable to send password reset email.",
            "error"
        );

    }

}


/* =========================================================
   14. DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    isDemoMode = true;

    currentUser = null;

    currentFarmerData = {

        uid: "demo",

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "9876543210",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "5 Acres",

        preferredMarket: "Kopargaon APMC",

        preferredLanguage: currentLanguage

    };


    openDashboard();

}


/* =========================================================
   15. LOAD FARMER DATA
========================================================= */

async function loadFarmerData(uid) {

    if (!db || !uid) return;


    try {

        const doc =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (doc.exists) {

            currentFarmerData = {
                uid,
                ...doc.data()
            };

        } else {

            currentFarmerData = {

                uid,

                name:
                    currentUser?.displayName || "Farmer",

                email:
                    currentUser?.email || "",

                mobile: "",
                village: "",
                state: "Maharashtra",
                landArea: "",
                preferredMarket: "Kopargaon APMC",
                preferredLanguage: currentLanguage

            };

        }


        if (currentFarmerData.preferredLanguage) {

            applyLanguage(
                currentFarmerData.preferredLanguage
            );

        }

    } catch (error) {

        console.error(
            "Could not load farmer data:",
            error
        );

    }

}


/* =========================================================
   16. OPEN DASHBOARD
========================================================= */

function openDashboard() {

    const dashboard =
        $("dashboardPage");

    if (!dashboard) return;


    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active-screen");

    });


    dashboard.classList.add("active-screen");


    updateFarmerUI();

    updateConnectionStatus(true);

    showSection("dashboardSection");

    loadWeather();

    loadMarketPrices();

}


/* =========================================================
   17. UPDATE FARMER UI
========================================================= */

function updateFarmerUI() {

    const data =
        currentFarmerData || {};


    const name =
        data.name || "Farmer";


    const email =
        data.email || "—";


    const fields = {

        headerFarmerName: name,

        dashboardFarmerName: name,

        summaryName: name,

        summaryVillage:
            data.village || "—",

        summaryLand:
            data.landArea || "—",

        summaryMarket:
            data.preferredMarket || "—",

        profilePageName: name,

        profilePageEmail: email,

        profileName: name,

        profileEmail: email,

        profileMobile:
            data.mobile || "",

        profileVillage:
            data.village || "",

        profileState:
            data.state || "",

        profileLandArea:
            data.landArea || ""

    };


    Object.entries(fields).forEach(([id, value]) => {

        const element = $(id);

        if (!element) return;


        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA" ||
            element.tagName === "SELECT"
        ) {

            element.value = value;

        } else {

            element.textContent = value;

        }

    });


    const profileMarket =
        $("profileMarket");

    if (profileMarket) {

        profileMarket.value =
            data.preferredMarket || "";

    }


    const profileLanguage =
        $("profileLanguage");

    if (profileLanguage) {

        profileLanguage.value =
            data.preferredLanguage || currentLanguage;

    }


    const registerLanguage =
        $("registerLanguage");

    if (registerLanguage) {

        registerLanguage.value =
            data.preferredLanguage || currentLanguage;

    }

}


/* =========================================================
   18. CONNECTION STATUS
========================================================= */

function updateConnectionStatus(online) {

    const headerStatus =
        $("connectionStatus");

    const headerText =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


    if (headerStatus) {

        headerStatus.classList.toggle(
            "online",
            online
        );

        headerStatus.classList.toggle(
            "offline",
            !online
        );

    }


    const text =
        online
            ? (translations[currentLanguage]?.online || "Online")
            : (translations[currentLanguage]?.offline || "Offline");


    if (headerText) {
        headerText.textContent = text;
    }


    if (dashboardText) {
        dashboardText.textContent = text;
    }

}


/* =========================================================
   19. ONLINE / OFFLINE EVENTS
========================================================= */

window.addEventListener("online", () => {

    updateConnectionStatus(true);

});


window.addEventListener("offline", () => {

    updateConnectionStatus(false);

});


/* =========================================================
   20. SIDEBAR NAVIGATION
========================================================= */

function initializeNavigation() {

    document.querySelectorAll(
        "[data-section]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.getAttribute("data-section");

            if (section) {

                showSection(section);

                closeSideMenu();

            }

        });

    });


    document.querySelectorAll(
        "[data-profile-section]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.getAttribute(
                    "data-profile-section"
                );

            showSection(section);

            closeProfileMenu();

        });

    });

}


/* =========================================================
   21. SHOW SECTION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(
        ".app-section"
    ).forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const section =
        $(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


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
        updateMarketComparison();
    }

}


/* =========================================================
   22. SIDE MENU
========================================================= */

function initializeMenu() {

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

}


function openSideMenu() {

    $("sideMenu")?.classList.add("open");

    $("menuOverlay")?.classList.add("active");

}


function closeSideMenu() {

    $("sideMenu")?.classList.remove("open");

    $("menuOverlay")?.classList.remove("active");

}


/* =========================================================
   23. PROFILE MENU
========================================================= */

function initializeProfileMenu() {

    $("profileButton")?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            $("profileMenu")?.classList.toggle("active");

        }
    );


    document.addEventListener("click", event => {

        const menu =
            $("profileMenu");

        const button =
            $("profileButton");


        if (
            menu &&
            !menu.contains(event.target) &&
            button &&
            !button.contains(event.target)
        ) {

            closeProfileMenu();

        }

    });

}


function closeProfileMenu() {

    $("profileMenu")?.classList.remove(
        "active"
    );

}


/* =========================================================
   24. LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (!isDemoMode && auth) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(error);

    }


    currentUser = null;

    currentFarmerData = null;

    isDemoMode = false;


    closeSideMenu();

    closeProfileMenu();


    showScreen("loginPage");


    $("loginForm")?.reset();

    updateConnectionStatus(false);

}


/* =========================================================
   25. PROFILE EDIT
========================================================= */

function initializeProfileEditing() {

    $("editProfileBtn")?.addEventListener(
        "click",
        enableProfileEditing
    );


    $("cancelProfileEditBtn")?.addEventListener(
        "click",
        cancelProfileEditing
    );


    $("profileForm")?.addEventListener(
        "submit",
        saveProfile
    );

}


function enableProfileEditing() {

    editingProfile = true;


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


    $("profileEditActions")
        ?.classList.remove("hidden");

}


function cancelProfileEditing() {

    editingProfile = false;

    updateFarmerUI();


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

        const element = $(id);

        if (element) {
            element.disabled = true;
        }

    });


    $("profileEditActions")
        ?.classList.add("hidden");

}


async function saveProfile(event) {

    event.preventDefault();


    const updatedData = {

        name:
            $("profileName").value.trim(),

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

        preferredLanguage:
            $("profileLanguage").value,

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    try {

        if (!isDemoMode && currentUser && db) {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .update(updatedData);

        }


        currentFarmerData = {

            ...currentFarmerData,

            ...updatedData

        };


        applyLanguage(
            updatedData.preferredLanguage
        );


        updateFarmerUI();


        cancelProfileEditing();


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "profileMessage",
            "Could not update profile.",
            "error"
        );

    }

}


/* =========================================================
   26. WEATHER
========================================================= */

async function loadWeather() {

    const emptyState =
        $("weatherEmptyState");

    const weatherData =
        $("weatherData");


    if (!emptyState || !weatherData) {
        return;
    }


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${DEFAULT_LOCATION.latitude}` +
            `&longitude=${DEFAULT_LOCATION.longitude}` +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m" +
            "&hourly=precipitation_probability" +
            "&forecast_days=1" +
            "&timezone=auto";


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error("Weather request failed");
        }


        const data =
            await response.json();


        const current =
            data.current;


        if (!current) {
            throw new Error("No weather data");
        }


        $("weatherTemperature").textContent =
            `${current.temperature_2m} °C`;


        $("weatherHumidity").textContent =
            `${current.relative_humidity_2m}%`;


        $("weatherWind").textContent =
            `${current.wind_speed_10m} km/h`;


        let rainChance = 0;


        if (
            data.hourly &&
            Array.isArray(
                data.hourly.precipitation_probability
            )
        ) {

            rainChance =
                Math.max(
                    ...data.hourly
                        .precipitation_probability
                        .slice(0, 6)
                );

        }


        $("weatherRain").textContent =
            `${rainChance}%`;


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

    }

}


/* =========================================================
   27. MARKET PRICE API
========================================================= */

async function loadMarketPrices() {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    const crop =
        $("cropPriceSelector")?.value || "onion";


    /*
       If API credentials have not been configured,
       show a clear message instead of fake data.
    */

    if (
        !DATA_GOV_API_KEY ||
        DATA_GOV_API_KEY ===
            "YOUR_DATA_GOV_API_KEY" ||
        !DATA_GOV_RESOURCE_ID ||
        DATA_GOV_RESOURCE_ID ===
            "YOUR_RESOURCE_ID"
    ) {

        renderMarketUnavailable(
            "Add your data.gov.in API key and resource ID in script.js."
        );

        return;

    }


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


    try {

        const url =
            `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}` +
            `?api-key=${encodeURIComponent(DATA_GOV_API_KEY)}` +
            "&format=json" +
            "&limit=100";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                `Market API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const records =
            Array.isArray(data.records)
                ? data.records
                : [];


        const filtered =
            filterMarketRecords(
                records,
                crop
            );


        if (!filtered.length) {

            renderMarketUnavailable(
                `No ${crop} market records were returned for the configured dataset.`
            );

            return;

        }


        renderMarketTable(filtered);

        updateMarketComparisonFromRecords(filtered);

        updateConnectionStatus(true);


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        renderMarketUnavailable(
            "Unable to load verified market data. Check your API key/resource ID."
        );

    }

}


/* =========================================================
   28. MARKET RECORD FILTER
========================================================= */

function filterMarketRecords(records, crop) {

    const cropNames = {

        onion: [
            "onion",
            "kanda",
            "कांदा",
            "प्याज"
        ],

        wheat: [
            "wheat",
            "गेहूं",
            "गहू"
        ]

    };


    const searchTerms =
        cropNames[crop] || [crop];


    const normalizedTerms =
        searchTerms.map(term =>
            term.toLowerCase()
        );


    const result =
        records.filter(record => {

            const commodity =
                String(
                    record.commodity ||
                    record.Commodity ||
                    record.COMMODITY ||
                    ""
                ).toLowerCase();


            return normalizedTerms.some(
                term => commodity.includes(term)
            );

        });


    /*
       Prefer Maharashtra markets.

       The API may return records with different
       capitalization/field names.
    */

    const maharashtra =
        result.filter(record => {

            const state =
                String(
                    record.state ||
                    record.State ||
                    record.STATE ||
                    ""
                ).toLowerCase();

            return state.includes("maharashtra");

        });


    return maharashtra.length
        ? maharashtra
        : result;

}


/* =========================================================
   29. MARKET TABLE RENDER
========================================================= */

function renderMarketTable(records) {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    tbody.innerHTML = "";


    records
        .slice(0, 20)
        .forEach(record => {

            const market =
                record.market ||
                record.Market ||
                record.MARKET ||
                "—";


            const commodity =
                record.commodity ||
                record.Commodity ||
                record.COMMODITY ||
                "—";


            const modal =
                record.modal_price ||
                record.Modal_Price ||
                record.modalPrice ||
                record.MODAL_PRICE ||
                record.modal ||
                "—";


            const min =
                record.min_price ||
                record.Min_Price ||
                record.minPrice ||
                record.MIN_PRICE ||
                "—";


            const max =
                record.max_price ||
                record.Max_Price ||
                record.maxPrice ||
                record.MAX_PRICE ||
                "—";


            const date =
                record.arrival_date ||
                record.Arrival_Date ||
                record.date ||
                record.Date ||
                "—";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${escapeHTML(market)}</td>

                <td>${escapeHTML(commodity)}</td>

                <td>
                    ₹${escapeHTML(modal)}
                    <small>
                        (${escapeHTML(min)} - ${escapeHTML(max)})
                    </small>
                </td>

                <td>${escapeHTML(date)}</td>

            `;


            tbody.appendChild(row);

        });

}


/* =========================================================
   30. MARKET EMPTY STATE
========================================================= */

function renderMarketUnavailable(message) {

    const tbody =
        $("marketTableBody");


    if (!tbody) return;


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHTML(
                            translations[currentLanguage]
                                ?.marketDataUnavailable ||
                            "Market data unavailable"
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(message)}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   31. MARKET COMPARISON
========================================================= */

function updateMarketComparison() {

    /*
       The comparison cards use the latest loaded
       market information.

       If API data is not available, the cards remain
       "Verified data unavailable".
    */

    loadMarketPrices();

}


function updateMarketComparisonFromRecords(records) {

    const markets = {

        "Kopargaon APMC": null,

        "Yeola Market": null,

        "Shirdi Market": null

    };


    records.forEach(record => {

        const market =
            String(
                record.market ||
                record.Market ||
                record.MARKET ||
                ""
            );


        const modal =
            record.modal_price ||
            record.Modal_Price ||
            record.modalPrice ||
            record.MODAL_PRICE ||
            record.modal;


        if (!modal) return;


        Object.keys(markets).forEach(key => {

            if (
                market
                    .toLowerCase()
                    .includes(
                        key
                            .replace(" APMC", "")
                            .replace(" Market", "")
                            .toLowerCase()
                    )
            ) {

                markets[key] = modal;

            }

        });

    });


    const cards =
        document.querySelectorAll(
            ".market-card"
        );


    cards.forEach(card => {

        const heading =
            card.querySelector("h3");


        const value =
            card.querySelector(
                ".market-value strong"
            );


        if (!heading || !value) return;


        const name =
            heading.textContent.trim();


        if (markets[name] !== null) {

            value.textContent =
                `₹${markets[name]}`;

        }

    });

}


/* =========================================================
   32. CROP SELECTOR
========================================================= */

function initializeMarketSelector() {

    $("cropPriceSelector")?.addEventListener(
        "change",
        loadMarketPrices
    );

}


/* =========================================================
   33. WEATHER REFRESH
========================================================= */

function initializeWeather() {

    $("refreshWeatherBtn")?.addEventListener(
        "click",
        loadWeather
    );

}


/* =========================================================
   34. GOVERNMENT SCHEMES
========================================================= */

function initializeSchemes() {

    document.querySelectorAll(
        ".scheme-button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const url =
                    button.getAttribute(
                        "data-scheme-url"
                    );


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
   35. CROP IMAGE
========================================================= */

function initializeCropHealth() {

    const input =
        $("cropImageInput");

    const preview =
        $("cropImagePreview");

    const previewContainer =
        $("imagePreviewContainer");

    const analyzeButton =
        $("analyzeCropBtn");


    if (!input) return;


    input.addEventListener(
        "change",
        () => {

            const file =
                input.files?.[0];


            if (!file) {

                analyzeButton.disabled = true;

                previewContainer
                    ?.classList.add("hidden");

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    preview.src =
                        event.target.result;

                    previewContainer
                        ?.classList.remove(
                            "hidden"
                        );

                    analyzeButton.disabled =
                        false;

                };


            reader.readAsDataURL(file);

        }
    );


    analyzeButton?.addEventListener(
        "click",
        analyzeCrop
    );

}


function analyzeCrop() {

    const result =
        $("cropAnalysisResult");


    if (!result) return;


    result.innerHTML = `

        <strong>
            AI crop analysis is not connected
        </strong>

        <p>
            The image was selected successfully,
            but a verified crop-health AI backend
            has not been connected yet.
        </p>

    `;

}


/* =========================================================
   36. AI ASSISTANT
========================================================= */

function initializeAI() {

    $("aiForm")?.addEventListener(
        "submit",
        handleAIQuestion
    );

}


function handleAIQuestion(event) {

    event.preventDefault();


    const input =
        $("aiInput");


    const question =
        input.value.trim();


    if (!question) return;


    addChatMessage(
        question,
        "user"
    );


    input.value = "";


    setTimeout(() => {

        let response =
            "AI service is not connected yet. Please connect your AI backend to receive live farming answers.";


        const q =
            question.toLowerCase();


        if (
            q.includes("onion") &&
            q.includes("price")
        ) {

            response =
                "You can check the Market Prices section for verified onion market prices.";

        } else if (
            q.includes("weather")
        ) {

            response =
                "Open the Weather section to view the latest weather information for Kopargaon.";

        } else if (
            q.includes("crop")
        ) {

            response =
                "Open Crop Information or Crop Health to get crop-related guidance.";

        }


        addChatMessage(
            response,
            "assistant"
        );


    }, 500);

}


function addChatMessage(
    message,
    type
) {

    const container =
        $("chatMessages");


    if (!container) return;


    const wrapper =
        document.createElement("div");


    wrapper.className =
        `chat-message ${
            type === "user"
                ? "user-message"
                : "assistant-message"
        }`;


    if (type === "assistant") {

        wrapper.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    ${escapeHTML(
                        translations[currentLanguage]
                            ?.assistant ||
                        "Assistant"
                    )}
                </strong>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    } else {

        wrapper.innerHTML = `

            <div>

                <strong>
                    You
                </strong>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    }


    container.appendChild(wrapper);


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   37. VOICE ASSISTANCE
========================================================= */

function initializeVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech Recognition is not supported."
        );

        $("startVoiceBtn")?.addEventListener(
            "click",
            () => {

                updateVoiceResponse(
                    "Voice recognition is not supported in this browser. Please use Chrome."
                );

            }
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = true;

    recognition.interimResults = true;

    updateVoiceLanguage();


    recognition.onstart = () => {

        voiceListening = true;

        $("startVoiceBtn")
            ?.classList.add("hidden");

        $("stopVoiceBtn")
            ?.classList.remove("hidden");


        updateVoiceResponse(
            currentLanguage === "mr"
                ? "ऐकत आहे..."
                : currentLanguage === "hi"
                    ? "सुन रहा हूँ..."
                    : "Listening..."
        );

    };


    recognition.onresult = event => {

        let finalText = "";

        let interimText = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const text =
                event.results[i][0].transcript;


            if (
                event.results[i].isFinal
            ) {

                finalText += text;

            } else {

                interimText += text;

            }

        }


        if (finalText) {

            $("voiceInput").value +=
                finalText + " ";

            speakVoiceResponse(finalText);

        } else if (interimText) {

            $("voiceInput").value =
                interimText;

        }

    };


    recognition.onerror = event => {

        console.error(
            "Voice recognition error:",
            event.error
        );


        updateVoiceResponse(
            "Voice recognition error: " +
            event.error
        );

    };


    recognition.onend = () => {

        voiceListening = false;

        $("startVoiceBtn")
            ?.classList.remove("hidden");

        $("stopVoiceBtn")
            ?.classList.add("hidden");

    };


    $("startVoiceBtn")?.addEventListener(
        "click",
        startVoice
    );


    $("stopVoiceBtn")?.addEventListener(
        "click",
        stopVoice
    );

}


function updateVoiceLanguage() {

    if (!recognition) return;


    const languageMap = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    recognition.lang =
        languageMap[currentLanguage] ||
        "en-IN";

}


function startVoice() {

    if (!recognition) return;


    $("voiceInput").value = "";


    try {

        recognition.start();

    } catch (error) {

        console.warn(
            "Voice already running.",
            error
        );

    }

}


function stopVoice() {

    if (!recognition) return;


    try {

        recognition.stop();

    } catch (error) {

        console.warn(error);

    }

}


function speakVoiceResponse(text) {

    if (
        !window.speechSynthesis ||
        !text
    ) {
        return;
    }


    let response;


    if (currentLanguage === "mr") {

        response =
            "तुमचा प्रश्न प्राप्त झाला आहे. अधिक माहितीसाठी संबंधित विभाग वापरा.";

    } else if (currentLanguage === "hi") {

        response =
            "आपका प्रश्न प्राप्त हुआ है। अधिक जानकारी के लिए संबंधित विभाग का उपयोग करें।";

    } else {

        response =
            "Your question was received. Please use the relevant section for more information.";

    }


    updateVoiceResponse(response);


    const utterance =
        new SpeechSynthesisUtterance(
            response
        );


    utterance.lang =
        currentLanguage === "mr"
            ? "mr-IN"
            : currentLanguage === "hi"
                ? "hi-IN"
                : "en-IN";


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        utterance
    );

}


function updateVoiceResponse(text) {

    const element =
        $("voiceResponse");


    if (element) {

        element.textContent = text;

    }

}


/* =========================================================
   38. SETTINGS
========================================================= */

function initializeSettings() {

    $("dashboardLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    $("settingsLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );


                if (
                    currentFarmerData
                ) {

                    currentFarmerData
                        .preferredLanguage =
                        event.target.value;

                }

            }
        );


    $("profileLanguage")
        ?.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );


    $("voiceSetting")
        ?.addEventListener(
            "change",
            event => {

                const enabled =
                    event.target.checked;


                if (!enabled) {

                    stopVoice();

                }

            }
        );


    $("notificationSetting")
        ?.addEventListener(
            "change",
            event => {

                localStorage.setItem(
                    "smartAgriNotifications",
                    event.target.checked
                );

            }
        );

}


/* =========================================================
   39. FIREBASE AUTH STATE
========================================================= */

function initializeFirebaseAuth() {

    if (!auth) return;


    auth.onAuthStateChanged(
        async user => {

            if (user && !isDemoMode) {

                currentUser = user;

                await loadFarmerData(
                    user.uid
                );


                /*
                   Do not automatically switch to dashboard
                   if user is currently on login/register.
                */

                const dashboard =
                    $("dashboardPage");


                if (
                    dashboard &&
                    dashboard.classList.contains(
                        "active-screen"
                    )
                ) {

                    updateFarmerUI();

                }

            }

        }
    );

}


/* =========================================================
   40. LOCAL STORAGE SETTINGS
========================================================= */

function loadSavedSettings() {

    const notifications =
        localStorage.getItem(
            "smartAgriNotifications"
        );


    if (
        notifications !== null &&
        $("notificationSetting")
    ) {

        $("notificationSetting").checked =
            notifications === "true";

    }


    applyLanguage(
        currentLanguage
    );

}


/* =========================================================
   41. INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application starting..."
        );


        initializeLanguagePage();

        initializeAuthNavigation();

        initializeNavigation();

        initializeMenu();

        initializeProfileMenu();

        initializeProfileEditing();

        initializeMarketSelector();

        initializeWeather();

        initializeSchemes();

        initializeCropHealth();

        initializeAI();

        initializeVoice();

        initializeSettings();

        initializeFirebaseAuth();

        loadSavedSettings();


        /*
           Logout buttons
        */

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


        /*
           Login / registration forms
        */

        $("loginForm")
            ?.addEventListener(
                "submit",
                loginUser
            );


        $("registrationForm")
            ?.addEventListener(
                "submit",
                registerUser
            );


        /*
           Initial connection status
        */

        updateConnectionStatus(
            navigator.onLine
        );


        /*
           If there is a saved language,
           do not force the language page.
        */

        if (
            localStorage.getItem(
                "smartAgriLanguage"
            )
        ) {

            /*
               Keep language page available,
               but preselect saved language.
            */

            applyLanguage(
                currentLanguage
            );

        }


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);


/* =========================================================
   42. DEBUG HELPERS
========================================================= */

window.SmartAgri = {

    getCurrentUser: () =>
        currentUser,

    getFarmerData: () =>
        currentFarmerData,

    getLanguage: () =>
        currentLanguage,

    reloadWeather:
        loadWeather,

    reloadMarket:
        loadMarketPrices,

    showSection:
        showSection,

    logout:
        logoutUser

};


console.log(
    "SmartAgri JavaScript loaded."
);
