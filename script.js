/* =========================================================
   SMARTAGRI - COMPLETE SCRIPT
   Matches the HTML provided
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

let selectedLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let selectedCrop = "onion";

let currentFarmer = null;

let recognition = null;

let isListening = false;


/* =========================================================
   API CONFIGURATION
========================================================= */

/*
   OPEN-METEO
   Kopargaon coordinates supplied by you.
*/

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=19.8824" +
    "&longitude=74.4761" +
    "&hourly=temperature_2m,wind_speed_10m,rain,relative_humidity_1000hPa,wind_speed_1000hPa" +
    "&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m" +
    "&forecast_days=16";


/*
   MANDI API

   IMPORTANT:
   Replace the values below with your actual
   data.gov.in resource ID and API key.

   Example:

   const MANDI_API_KEY = "YOUR_API_KEY";

   const MANDI_RESOURCE_ID =
       "YOUR_RESOURCE_ID";
*/

const MANDI_API_KEY = "";

const MANDI_RESOURCE_ID = "";


/* =========================================================
   LANGUAGE TRANSLATIONS
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
        myProfile: "My Profile",

        welcome: "Welcome",

        dashboardSubtitle:
            "Your farming information in one place.",

        connectionStatus: "Connection Status",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",

        quickActionsSubtitle:
            "Access important farming tools quickly.",

        liveDataTitle: "Live Data",

        liveDataDescription:
            "Only verified connected data is displayed.",

        offline: "Offline",
        online: "Online",

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

        currentWeather: "Current Weather",
        refresh: "Refresh",

        weatherUnavailable: "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather data has been received.",

        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        marketSubtitle:
            "Current crop prices from connected verified sources.",

        marketPriceTable: "Market Price Table",
        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",

        onion: "Onion",
        wheat: "Wheat",

        marketDataUnavailable:
            "Market data unavailable",

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

        cropInsurance: "Crop Insurance",

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

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

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
        voiceAssistance: "वॉइस सहायता",
        farmerProfile: "किसान प्रोफाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",
        logout: "लॉगआउट",
        myProfile: "मेरी प्रोफाइल",

        welcome: "स्वागत है",

        dashboardSubtitle:
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        connectionStatus:
            "कनेक्शन स्थिति",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी एक्सेस करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम जानकारी।",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable:
            "बाजार भाव तालिका",

        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "दिनांक",

        onion: "प्याज",
        wheat: "गेहूं",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

        comparisonSubtitle:
            "फसल बेचने से पहले बाजार की जानकारी की तुलना करें।",

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
            "AI सहायता के लिए फसल की तस्वीर अपलोड करें।",

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
            "अधिक जानकारी",

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
            "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

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
            "वॉइस उत्तर",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "बदलाव सहेजें",

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
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",

        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri वापरण्यासाठी लॉगिन करा",

        email: "ईमेल",
        password: "पासवर्ड",
        rememberMe: "मला लक्षात ठेवा",
        forgotPassword: "पासवर्ड विसरलात?",
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
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName:
            "पूर्ण नाव",

        mobile:
            "मोबाईल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्रफळ",

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
            "आधीच खाते आहे?",

        dashboard:
            "डॅशबोर्ड",

        weather:
            "हवामान",

        marketPrices:
            "बाजारभाव",

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
            "तुमची शेतीची माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची शेती साधने पटकन वापरा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",

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
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक भाव.",

        marketPriceTable:
            "बाजारभाव तक्ता",

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
            "पीक विकण्यापूर्वी बाजारातील माहितीची तुलना करा.",

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
            "AI सहाय्यासाठी पिकाचा फोटो अपलोड करा.",

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
            "शेतकऱ्यांसाठी सरकारी मदत आणि कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

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
            "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

        startVoice:
            "व्हॉइस सहाय्य सुरू करा",

        stopVoice:
            "ऐकणे थांबवा",

        voiceInput:
            "व्हॉइस इनपुट",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        voiceResponse:
            "व्हॉइस उत्तर",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अ‍ॅप भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे."
    }

};


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */

function translatePage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );


    /* Normal text */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (
                translations[language] &&
                translations[language][key]
            ) {

                element.textContent =
                    translations[language][key];

            }

        });


    /* Placeholders */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                translations[language] &&
                translations[language][key]
            ) {

                element.placeholder =
                    translations[language][key];

            }

        });


    /* Select language values */

    const languageSelectors = [
        document.getElementById("dashboardLanguage"),
        document.getElementById("settingsLanguage"),
        document.getElementById("registerLanguage"),
        document.getElementById("profileLanguage")
    ];

    languageSelectors.forEach(select => {

        if (select) {
            select.value = language;
        }

    });


    /* Voice recognition language */

    if (recognition) {
        recognition.lang =
            getSpeechLanguage(language);
    }


    console.log(
        "Language changed to:",
        language
    );
}


function getSpeechLanguage(language) {

    if (language === "hi") {
        return "hi-IN";
    }

    if (language === "mr") {
        return "mr-IN";
    }

    return "en-IN";
}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.add(
            "active-screen"
        );

    }

}


/* =========================================================
   APP SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        document.getElementById(sectionId);

    if (section) {

        section.classList.add(
            "active-section"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    closeSideMenu();

    closeProfileMenu();

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    const sideMenu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");

    if (sideMenu) {
        sideMenu.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

}


function closeSideMenu() {

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
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("open");

}


function closeProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    if (menu) {
        menu.classList.remove("open");
    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function setConnectionStatus(isOnline) {

    const connection =
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


    if (connection) {

        connection.classList.toggle(
            "online",
            isOnline
        );

        connection.classList.toggle(
            "offline",
            !isOnline
        );

    }


    if (text) {

        text.textContent =
            isOnline
                ? getTranslation("online")
                : getTranslation("offline");

    }


    if (dashboardText) {

        dashboardText.textContent =
            isOnline
                ? getTranslation("online")
                : getTranslation("offline");

    }

}


function getTranslation(key) {

    return (
        translations[selectedLanguage] &&
        translations[selectedLanguage][key]
    ) || key;

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (auth) {

    auth.onAuthStateChanged(async user => {

        if (user) {

            console.log(
                "Logged in:",
                user.email
            );

            await loadFarmerProfile(user.uid);

            showScreen("dashboardPage");

            showSection("dashboardSection");

            loadWeather();

        } else {

            console.log("No authenticated user.");

        }

    });

}


/* =========================================================
   REGISTRATION
========================================================= */

async function registerFarmer(event) {

    event.preventDefault();

    const message =
        document.getElementById(
            "registerMessage"
        );


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


    if (!auth) {

        showMessage(
            message,
            "Firebase is not initialized.",
            "error"
        );

        return;

    }


    try {

        showMessage(
            message,
            "Creating account...",
            "info"
        );


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

                name,

                email,

                mobile,

                village,

                state,

                landArea,

                preferredMarket: market,

                preferredLanguage: language,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        translatePage(language);


        showMessage(
            message,
            "Account created successfully.",
            "success"
        );


        document
            .getElementById(
                "registrationForm"
            )
            .reset();


        showScreen("dashboardPage");

        await loadFarmerProfile(user.uid);


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


/* =========================================================
   LOGIN
========================================================= */

async function loginFarmer(event) {

    event.preventDefault();

    const message =
        document.getElementById(
            "loginMessage"
        );


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    if (!auth) {

        showMessage(
            message,
            "Firebase is not initialized.",
            "error"
        );

        return;

    }


    try {

        showMessage(
            message,
            "Logging in...",
            "info"
        );


        const credential =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        await loadFarmerProfile(
            credential.user.uid
        );


        showScreen("dashboardPage");

        showSection("dashboardSection");

        loadWeather();


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


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (auth) {
            await auth.signOut();
        }

        currentFarmer = null;

        showScreen("languagePage");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const message =
        document.getElementById(
            "loginMessage"
        );


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
            getFirebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   LOAD FARMER PROFILE
========================================================= */

async function loadFarmerProfile(uid) {

    if (!db) {
        return;
    }


    try {

        const doc =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!doc.exists) {

            console.warn(
                "Farmer profile not found."
            );

            return;

        }


        currentFarmer = {

            uid,

            ...doc.data()

        };


        populateFarmerUI();


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


/* =========================================================
   POPULATE FARMER UI
========================================================= */

function populateFarmerUI() {

    if (!currentFarmer) {
        return;
    }


    const name =
        currentFarmer.name || "Farmer";


    const email =
        currentFarmer.email || "";


    const village =
        currentFarmer.village || "—";


    const landArea =
        currentFarmer.landArea || "—";


    const market =
        currentFarmer.preferredMarket || "—";


    const mobile =
        currentFarmer.mobile || "";


    const state =
        currentFarmer.state || "";


    const language =
        currentFarmer.preferredLanguage || "en";


    /* Header */

    setText(
        "headerFarmerName",
        name
    );


    setText(
        "dashboardFarmerName",
        name
    );


    /* Dashboard */

    setText(
        "summaryName",
        name
    );

    setText(
        "summaryVillage",
        village
    );

    setText(
        "summaryLand",
        landArea
    );

    setText(
        "summaryMarket",
        market
    );


    /* Profile */

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
        mobile
    );

    setValue(
        "profileVillage",
        village
    );

    setValue(
        "profileState",
        state
    );

    setValue(
        "profileLandArea",
        landArea
    );

    setValue(
        "profileMarket",
        market
    );

    setValue(
        "profileLanguage",
        language
    );


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        email
    );


    /* Apply stored language */

    if (language) {

        translatePage(language);

    }

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function enableProfileEditing() {

    const fields = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.disabled = false;
        }

    });


    const actions =
        document.getElementById(
            "profileEditActions"
        );

    if (actions) {
        actions.classList.remove("hidden");
    }

}


function cancelProfileEditing() {

    populateFarmerUI();

    disableProfileEditing();

}


function disableProfileEditing() {

    const fields = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.disabled = true;
        }

    });


    const actions =
        document.getElementById(
            "profileEditActions"
        );

    if (actions) {
        actions.classList.add("hidden");
    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    if (!auth || !auth.currentUser) {
        return;
    }


    const uid =
        auth.currentUser.uid;


    const updatedProfile = {

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

        preferredMarket:
            getValue("profileMarket"),

        preferredLanguage:
            getValue("profileLanguage"),

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    try {

        await db
            .collection("farmers")
            .doc(uid)
            .update(updatedProfile);


        currentFarmer = {

            ...currentFarmer,
            ...updatedProfile

        };


        translatePage(
            updatedProfile.preferredLanguage
        );


        populateFarmerUI();

        disableProfileEditing();


        showMessage(
            document.getElementById(
                "profileMessage"
            ),
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            document.getElementById(
                "profileMessage"
            ),
            "Unable to update profile.",
            "error"
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


    if (!emptyState || !weatherData) {
        return;
    }


    try {

        setConnectionStatus(true);


        emptyState.classList.remove(
            "hidden"
        );

        weatherData.classList.add(
            "hidden"
        );


        const response =
            await fetch(
                WEATHER_API,
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


        const data =
            await response.json();


        if (!data.current) {

            throw new Error(
                "No current weather data."
            );

        }


        const current =
            data.current;


        setText(
            "weatherTemperature",
            formatNumber(
                current.temperature_2m
            ) +
            " °C"
        );


        setText(
            "weatherHumidity",
            formatNumber(
                current.relative_humidity_2m
            ) +
            " %"
        );


        setText(
            "weatherWind",
            formatNumber(
                current.wind_speed_10m
            ) +
            " km/h"
        );


        setText(
            "weatherRain",
            formatNumber(
                current.rain
            ) +
            " mm"
        );


        emptyState.classList.add(
            "hidden"
        );

        weatherData.classList.remove(
            "hidden"
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        setConnectionStatus(false);


        emptyState.classList.remove(
            "hidden"
        );

        weatherData.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   MARKET DATA
========================================================= */

async function loadMarketPrices() {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tbody) {
        return;
    }


    /*
       If no data.gov.in API configuration
       is supplied, show a clear status instead
       of pretending prices are live.
    */

    if (
        !MANDI_API_KEY ||
        !MANDI_RESOURCE_ID
    ) {

        showMarketUnavailable(
            "Live mandi API is not configured yet."
        );

        updateComparisonCards([]);

        return;

    }


    try {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="table-empty">
                        <span>⏳</span>
                        <strong>Loading market prices...</strong>
                    </div>
                </td>
            </tr>
        `;


        const crop =
            selectedCrop === "onion"
                ? "Onion"
                : "Wheat";


        const apiURL =
            "https://api.data.gov.in/resource/" +
            MANDI_RESOURCE_ID +
            "?api-key=" +
            encodeURIComponent(
                MANDI_API_KEY
            ) +
            "&format=json" +
            "&limit=100";


        const response =
            await fetch(
                apiURL,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Mandi API request failed."
            );

        }


        const result =
            await response.json();


        const records =
            Array.isArray(result.records)
                ? result.records
                : [];


        /*
           Filter for the three markets.
        */

        const wantedMarkets = [

            "Kopargaon",
            "Yeola",
            "Shirdi"

        ];


        const filtered =
            records.filter(record => {

                const text =
                    JSON.stringify(
                        record
                    ).toLowerCase();


                return (

                    text.includes(
                        "kopargaon"
                    ) ||

                    text.includes(
                        "yeola"
                    ) ||

                    text.includes(
                        "shirdi"
                    )

                );

            });


        if (!filtered.length) {

            showMarketUnavailable(
                "No verified prices found for the selected crop."
            );

            updateComparisonCards([]);

            return;

        }


        renderMarketTable(
            filtered,
            crop
        );


        updateComparisonCards(
            filtered
        );


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        showMarketUnavailable(
            "Unable to load verified market prices."
        );

        updateComparisonCards([]);

    }

}


/* =========================================================
   RENDER MARKET TABLE
========================================================= */

function renderMarketTable(
    records,
    cropName
) {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    records.forEach(record => {

        const marketName =
            record.market ||
            record.market_name ||
            record.apmc ||
            record.Market ||
            "Market";


        const crop =
            record.commodity ||
            record.Commodity ||
            record.crop ||
            cropName;


        const price =
            record.modal_price ||
            record.Modal_Price ||
            record.modal ||
            record.price ||
            record.Min_Price ||
            "—";


        const date =
            record.arrival_date ||
            record.Arrival_Date ||
            record.date ||
            "—";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(
                    marketName
                )}
            </td>

            <td>
                ${escapeHTML(
                    crop
                )}
            </td>

            <td>
                ₹${escapeHTML(
                    String(price)
                )}
            </td>

            <td>
                ${escapeHTML(
                    String(date)
                )}
            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   MARKET UNAVAILABLE
========================================================= */

function showMarketUnavailable(
    description
) {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHTML(
                            getTranslation(
                                "marketDataUnavailable"
                            )
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            description
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

function updateComparisonCards(
    records
) {

    const cards =
        document.querySelectorAll(
            ".market-card"
        );


    const marketNames = [

        "Kopargaon",
        "Yeola",
        "Shirdi"

    ];


    cards.forEach(
        (card, index) => {

            const strong =
                card.querySelector(
                    ".market-value strong"
                );


            const status =
                card.querySelector(
                    ".market-value + p"
                );


            const targetMarket =
                marketNames[index];


            let found = null;


            if (Array.isArray(records)) {

                found =
                    records.find(record => {

                        const text =
                            JSON.stringify(
                                record
                            ).toLowerCase();


                        return text.includes(
                            targetMarket.toLowerCase()
                        );

                    });

            }


            if (
                found &&
                records.length
            ) {

                const price =
                    found.modal_price ||
                    found.Modal_Price ||
                    found.modal ||
                    found.price ||
                    found.Min_Price ||
                    "—";


                if (strong) {

                    strong.textContent =
                        "₹" + price;

                }


                if (status) {

                    status.textContent =
                        getTranslation(
                            "online"
                        );

                }

            } else {

                if (strong) {

                    strong.textContent =
                        "—";

                }


                if (status) {

                    status.textContent =
                        getTranslation(
                            "dataUnavailable"
                        );

                }

            }

        }
    );

}


/* =========================================================
   CROP SELECTOR
========================================================= */

function handleCropChange(event) {

    selectedCrop =
        event.target.value || "onion";


    loadMarketPrices();

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function openGovernmentScheme(url) {

    if (!url) {
        return;
    }


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function handleAIMessage(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "aiInput"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!input || !messages) {
        return;
    }


    const question =
        input.value.trim();


    if (!question) {
        return;
    }


    /*
       IMPORTANT:
       preventDefault() prevents the form
       from redirecting to the language page.
    */


    addChatMessage(
        question,
        "user"
    );


    input.value = "";


    /*
       No external AI API has been provided yet.
       Therefore we give a useful local response
       rather than pretending an AI backend exists.
    */

    const response =
        getLocalAIResponse(
            question
        );


    setTimeout(() => {

        addChatMessage(
            response,
            "assistant"
        );

    }, 400);

}


/* =========================================================
   LOCAL AI RESPONSE
========================================================= */

function getLocalAIResponse(
    question
) {

    const q =
        question.toLowerCase();


    if (
        q.includes("onion") ||
        q.includes("कांदा") ||
        q.includes("प्याज")
    ) {

        return getTranslation(
            "Onion cultivation requires suitable soil, proper irrigation, weed management and regular monitoring for pests and diseases."
        );

    }


    if (
        q.includes("wheat") ||
        q.includes("गेहूं") ||
        q.includes("गहू")
    ) {

        return getTranslation(
            "Wheat generally requires timely sowing, appropriate irrigation, weed control and monitoring for crop diseases."
        );

    }


    if (
        q.includes("weather") ||
        q.includes("मौसम") ||
        q.includes("हवामान")
    ) {

        return getTranslation(
            "Check the Weather section for the latest weather data available for Kopargaon."
        );

    }


    if (
        q.includes("market") ||
        q.includes("price") ||
        q.includes("भाव") ||
        q.includes("बाजार")
    ) {

        return getTranslation(
            "Open Market Prices to compare available prices from Kopargaon, Yeola and Shirdi."
        );

    }


    return getTranslation(
        "The Smart Farmer Assistant interface is working. Connect your AI backend to receive advanced farming answers."
    );

}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(
    message,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) {
        return;
    }


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "chat-message " +
        (
            type === "user"
                ? "user-message"
                : "assistant-message"
        );


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${
                type === "user"
                    ? "👨‍🌾"
                    : "🤖"
            }
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? getTranslation(
                            "fullName"
                          )
                        : getTranslation(
                            "assistant"
                          )
                }
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;


    container.appendChild(wrapper);


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   CROP IMAGE SELECTION
========================================================= */

function handleCropImage(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    const preview =
        document.getElementById(
            "cropImagePreview"
        );


    const previewContainer =
        document.getElementById(
            "imagePreviewContainer"
        );


    const analyzeButton =
        document.getElementById(
            "analyzeCropBtn"
        );


    if (!file) {

        if (analyzeButton) {
            analyzeButton.disabled = true;
        }

        return;

    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please select an image file."
        );

        event.target.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

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

                analyzeButton.disabled =
                    false;

            }

        };


    reader.readAsDataURL(file);

}


/* =========================================================
   CROP HEALTH ANALYSIS
========================================================= */

function analyzeCrop() {

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    if (!result) {
        return;
    }


    result.innerHTML = `

        <strong>
            Crop image selected successfully.
        </strong>

        <p>
            The image-upload functionality is working.
            A real AI diagnosis requires a connected
            crop-health AI backend.
        </p>

    `;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function initializeVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech Recognition is not supported."
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    recognition.onstart =
        function() {

            isListening = true;


            toggleVoiceButtons(
                true
            );


            setVoiceResponse(
                "Listening..."
            );

        };


    recognition.onresult =
        function(event) {

            const transcript =
                event
                    .results[0][0]
                    .transcript;


            const voiceInput =
                document.getElementById(
                    "voiceInput"
                );


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            handleVoiceCommand(
                transcript
            );

        };


    recognition.onerror =
        function(event) {

            console.error(
                "Voice recognition error:",
                event.error
            );


            setVoiceResponse(
                "Unable to understand voice input."
            );


            toggleVoiceButtons(
                false
            );

        };


    recognition.onend =
        function() {

            isListening = false;

            toggleVoiceButtons(
                false
            );

        };

}


function startVoice() {

    if (!recognition) {

        initializeVoiceRecognition();

    }


    if (!recognition) {

        setVoiceResponse(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    recognition.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    try {

        recognition.start();

    } catch (error) {

        console.warn(
            "Voice start error:",
            error
        );

    }

}


function stopVoice() {

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();

    }

}


function toggleVoiceButtons(
    listening
) {

    const start =
        document.getElementById(
            "startVoiceBtn"
        );


    const stop =
        document.getElementById(
            "stopVoiceBtn"
        );


    if (start) {

        start.classList.toggle(
            "hidden",
            listening
        );

    }


    if (stop) {

        stop.classList.toggle(
            "hidden",
            !listening
        );

    }

}


function setVoiceResponse(
    text
) {

    const element =
        document.getElementById(
            "voiceResponse"
        );


    if (element) {

        element.textContent =
            text;

    }

}


function handleVoiceCommand(
    transcript
) {

    const lower =
        transcript.toLowerCase();


    if (
        lower.includes("weather") ||
        lower.includes("मौसम") ||
        lower.includes("हवामान")
    ) {

        showSection(
            "weatherSection"
        );

        loadWeather();


        speakText(
            "Weather section opened."
        );

        return;

    }


    if (
        lower.includes("market") ||
        lower.includes("price") ||
        lower.includes("भाव") ||
        lower.includes("बाजार")
    ) {

        showSection(
            "marketSection"
        );

        loadMarketPrices();


        speakText(
            "Market prices section opened."
        );

        return;

    }


    if (
        lower.includes("crop") ||
        lower.includes("फसल") ||
        lower.includes("पीक")
    ) {

        showSection(
            "cropSection"
        );


        speakText(
            "Crop information section opened."
        );

        return;

    }


    setVoiceResponse(
        transcript
    );


    speakText(
        transcript
    );

}


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


    utterance.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    utterance.rate =
        0.9;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   SETTINGS
========================================================= */

function handleLanguageSelector(
    event
) {

    const language =
        event.target.value;


    translatePage(
        language
    );


    if (
        currentFarmer &&
        currentFarmer.uid &&
        db
    ) {

        db.collection("farmers")
            .doc(currentFarmer.uid)
            .update({

                preferredLanguage:
                    language,

                updatedAt:
                    firebase.firestore
                        .FieldValue
                        .serverTimestamp()

            })
            .catch(error => {

                console.error(
                    "Language save error:",
                    error
                );

            });

    }

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    currentFarmer = {

        uid: "demo",

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "0000000000",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "5 Acres",

        preferredMarket:
            "Kopargaon APMC",

        preferredLanguage:
            selectedLanguage

    };


    populateFarmerUI();


    showScreen(
        "dashboardPage"
    );


    showSection(
        "dashboardSection"
    );


    loadWeather();

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "—";

    }

}


function setValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value ?? "";

    }

}


function getValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

}


function formatNumber(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "—";
    }


    return number.toFixed(1);

}


function escapeHTML(value) {

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


function showMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        "message " +
        (type || "");


    setTimeout(() => {

        element.textContent = "";

    }, 5000);

}


function getFirebaseErrorMessage(
    error
) {

    if (!error) {
        return "Something went wrong.";
    }


    switch (error.code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/weak-password":
            return "Password should be at least 6 characters.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return (
                error.message ||
                "Something went wrong."
            );

    }

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "SmartAgri JavaScript loaded."
        );


        /* -----------------------------------------
           INITIAL LANGUAGE
        ----------------------------------------- */

        translatePage(
            selectedLanguage
        );


        /* -----------------------------------------
           LANGUAGE PAGE
        ----------------------------------------- */

        const languageButtons =
            document.querySelectorAll(
                ".language-option"
            );


        const continueButton =
            document.getElementById(
                "continueLanguageBtn"
            );


        let selectedLanguageButton =
            null;


        languageButtons.forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    languageButtons.forEach(
                        b =>
                            b.classList.remove(
                                "selected"
                            )
                    );


                    button.classList.add(
                        "selected"
                    );


                    selectedLanguageButton =
                        button.getAttribute(
                            "data-language"
                        );


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
                function() {

                    const language =
                        selectedLanguageButton ||
                        selectedLanguage ||
                        "en";


                    translatePage(
                        language
                    );


                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* -----------------------------------------
           CHANGE LANGUAGE FROM LOGIN
        ----------------------------------------- */

        const changeLanguageLogin =
            document.getElementById(
                "changeLanguageFromLogin"
            );


        if (changeLanguageLogin) {

            changeLanguageLogin.addEventListener(
                "click",
                function() {

                    showScreen(
                        "languagePage"
                    );

                }
            );

        }


        /* -----------------------------------------
           LOGIN
        ----------------------------------------- */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                loginFarmer
            );

        }


        /* -----------------------------------------
           REGISTER
        ----------------------------------------- */

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (registrationForm) {

            registrationForm.addEventListener(
                "submit",
                registerFarmer
            );

        }


        const showRegister =
            document.getElementById(
                "showRegisterBtn"
            );


        if (showRegister) {

            showRegister.addEventListener(
                "click",
                function() {

                    showScreen(
                        "registerPage"
                    );

                }
            );

        }


        const showLogin =
            document.getElementById(
                "showLoginBtn"
            );


        if (showLogin) {

            showLogin.addEventListener(
                "click",
                function() {

                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* -----------------------------------------
           FORGOT PASSWORD
        ----------------------------------------- */

        const forgot =
            document.getElementById(
                "forgotPasswordBtn"
            );


        if (forgot) {

            forgot.addEventListener(
                "click",
                forgotPassword
            );

        }


        /* -----------------------------------------
           DEMO
        ----------------------------------------- */

        const demo =
            document.getElementById(
                "demoBtn"
            );


        if (demo) {

            demo.addEventListener(
                "click",
                enterDemoDashboard
            );

        }


        /* -----------------------------------------
           HAMBURGER
        ----------------------------------------- */

        const hamburger =
            document.getElementById(
                "hamburgerBtn"
            );


        if (hamburger) {

            hamburger.addEventListener(
                "click",
                openSideMenu
            );

        }


        const closeMenu =
            document.getElementById(
                "closeMenuBtn"
            );


        if (closeMenu) {

            closeMenu.addEventListener(
                "click",
                closeSideMenu
            );

        }


        const overlay =
            document.getElementById(
                "menuOverlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeSideMenu
            );

        }


        /* -----------------------------------------
           SIDE NAVIGATION
        ----------------------------------------- */

        document
            .querySelectorAll(
                "[data-section]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const section =
                            button.getAttribute(
                                "data-section"
                            );


                        if (section) {

                            showSection(
                                section
                            );

                        }

                    }
                );

            });


        /* -----------------------------------------
           PROFILE BUTTON
        ----------------------------------------- */

        const profileButton =
            document.getElementById(
                "profileButton"
            );


        if (profileButton) {

            profileButton.addEventListener(
                "click",
                toggleProfileMenu
            );

        }


        document
            .querySelectorAll(
                "[data-profile-section]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const section =
                            button.getAttribute(
                                "data-profile-section"
                            );


                        showSection(
                            section
                        );

                    }
                );

            });


        /* -----------------------------------------
           LOGOUT
        ----------------------------------------- */

        const logoutButtons = [

            "sideLogoutBtn",
            "profileLogoutBtn"

        ];


        logoutButtons.forEach(id => {

            const button =
                document.getElementById(id);


            if (button) {

                button.addEventListener(
                    "click",
                    logoutUser
                );

            }

        });


        /* -----------------------------------------
           WEATHER REFRESH
        ----------------------------------------- */

        const refreshWeather =
            document.getElementById(
                "refreshWeatherBtn"
            );


        if (refreshWeather) {

            refreshWeather.addEventListener(
                "click",
                loadWeather
            );

        }


        /* -----------------------------------------
           CROP PRICE SELECTOR
        ----------------------------------------- */

        const cropSelector =
            document.getElementById(
                "cropPriceSelector"
            );


        if (cropSelector) {

            cropSelector.addEventListener(
                "change",
                handleCropChange
            );

        }


        /* -----------------------------------------
           GOVERNMENT SCHEMES
        ----------------------------------------- */

        document
            .querySelectorAll(
                ".scheme-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const url =
                            button.getAttribute(
                                "data-scheme-url"
                            );


                        openGovernmentScheme(
                            url
                        );

                    }
                );

            });


        /* -----------------------------------------
           AI ASSISTANT
        ----------------------------------------- */

        const aiForm =
            document.getElementById(
                "aiForm"
            );


        if (aiForm) {

            aiForm.addEventListener(
                "submit",
                handleAIMessage
            );

        }


        /* -----------------------------------------
           CROP IMAGE
        ----------------------------------------- */

        const cropImageInput =
            document.getElementById(
                "cropImageInput"
            );


        if (cropImageInput) {

            cropImageInput.addEventListener(
                "change",
                handleCropImage
            );

        }


        const analyzeCropButton =
            document.getElementById(
                "analyzeCropBtn"
            );


        if (analyzeCropButton) {

            analyzeCropButton.addEventListener(
                "click",
                analyzeCrop
            );

        }


        /* -----------------------------------------
           VOICE
        ----------------------------------------- */

        initializeVoiceRecognition();


        const startVoiceButton =
            document.getElementById(
                "startVoiceBtn"
            );


        if (startVoiceButton) {

            startVoiceButton.addEventListener(
                "click",
                startVoice
            );

        }


        const stopVoiceButton =
            document.getElementById(
                "stopVoiceBtn"
            );


        if (stopVoiceButton) {

            stopVoiceButton.addEventListener(
                "click",
                stopVoice
            );

        }


        /* -----------------------------------------
           PROFILE
        ----------------------------------------- */

        const editProfile =
            document.getElementById(
                "editProfileBtn"
            );


        if (editProfile) {

            editProfile.addEventListener(
                "click",
                enableProfileEditing
            );

        }


        const cancelProfile =
            document.getElementById(
                "cancelProfileEditBtn"
            );


        if (cancelProfile) {

            cancelProfile.addEventListener(
                "click",
                cancelProfileEditing
            );

        }


        const profileForm =
            document.getElementById(
                "profileForm"
            );


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                saveProfile
            );

        }


        /* -----------------------------------------
           LANGUAGE SELECTORS
        ----------------------------------------- */

        const selectors = [

            "dashboardLanguage",
            "settingsLanguage",
            "registerLanguage",
            "profileLanguage"

        ];


        selectors.forEach(id => {

            const selector =
                document.getElementById(id);


            if (selector) {

                selector.addEventListener(
                    "change",
                    handleLanguageSelector
                );

            }

        });


        /* -----------------------------------------
           NETWORK STATUS
        ----------------------------------------- */

        window.addEventListener(
            "online",
            function() {

                setConnectionStatus(
                    true
                );

            }
        );


        window.addEventListener(
            "offline",
            function() {

                setConnectionStatus(
                    false
                );

            }
        );


        setConnectionStatus(
            navigator.onLine
        );


        /* -----------------------------------------
           INITIAL DATA
        ----------------------------------------- */

        loadMarketPrices();

    }
);


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener(
    "error",
    function(event) {

        console.error(
            "SmartAgri error:",
            event.error || event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    function(event) {

        console.error(
            "SmartAgri promise error:",
            event.reason
        );

    }
);
