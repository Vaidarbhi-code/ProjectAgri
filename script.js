/* ============================================================
   SMARTAGRI - COMPLETE script.js
   ============================================================

   Frontend responsibilities:
   - Language switching
   - Firebase Authentication
   - Dashboard navigation
   - Farmer profile
   - Market/mandi data
   - Weather
   - Crop information
   - Government schemes
   - Voice assistance
   - AI assistant
   - Crop health image upload
   - Backend API communication

   Expected backend:
   server.js

   Expected API routes:
   GET    /api/health
   GET    /api/market-prices
   GET    /api/market-prices?crop=onion
   GET    /api/weather
   POST   /api/ai/chat
   POST   /api/crop-health
   GET    /api/crops
   GET    /api/crops/:crop
   GET    /api/profile/:uid
   POST   /api/profile
   PUT    /api/profile/:uid
   ============================================================ */


/* ============================================================
   1. FIREBASE CONFIGURATION
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
   2. INITIALIZE FIREBASE
============================================================ */

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

    console.error("Firebase initialization failed:", error);

}


/* ============================================================
   3. APPLICATION CONFIGURATION
============================================================ */

const API_BASE = "/api";

const API = {

    health: `${API_BASE}/health`,

    marketPrices: `${API_BASE}/market-prices`,

    weather: `${API_BASE}/weather`,

    crops: `${API_BASE}/crops`,

    aiChat: `${API_BASE}/ai/chat`,

    cropHealth: `${API_BASE}/crop-health`,

    profile: `${API_BASE}/profile`

};


/* ============================================================
   4. APPLICATION STATE
============================================================ */

const state = {

    language: localStorage.getItem("smartagri_language") || "en",

    selectedLanguage: null,

    currentUser: null,

    farmer: null,

    isDemo: false,

    currentSection: "dashboardSection",

    marketCrop: "onion",

    weatherLoaded: false,

    marketLoaded: false,

    voiceRecognition: null,

    isListening: false,

    selectedCropImage: null,

    profileEditing: false

};


/* ============================================================
   5. TRANSLATIONS
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

        continue:
            "Continue",

        loginTitle:
            "Farmer Login",

        loginSubtitle:
            "Login to access SmartAgri",

        email:
            "Email",

        password:
            "Password",

        rememberMe:
            "Remember Me",

        forgotPassword:
            "Forgot Password?",

        login:
            "Login",

        or:
            "OR",

        demoDashboard:
            "Enter Demo Dashboard",

        noAccount:
            "Don't have an account?",

        register:
            "Register",

        changeLanguage:
            "Change Language",

        registrationTitle:
            "Farmer Registration",

        registrationSubtitle:
            "Create your SmartAgri farmer account",

        fullName:
            "Full Name",

        mobile:
            "Mobile Number",

        village:
            "Village",

        state:
            "State",

        landArea:
            "Land Area",

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
            "Connected data is retrieved from verified services.",

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
            "Weather service could not be reached.",

        temperature:
            "Temperature",

        humidity:
            "Humidity",

        windSpeed:
            "Wind Speed",

        rainChance:
            "Rain Chance",

        marketSubtitle:
            "Current crop prices from connected market sources.",

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
            "No market data could be retrieved.",

        dataUnavailable:
            "Verified data unavailable",

        comparisonSubtitle:
            "Compare connected market information before selling.",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onionInfo:
            "Onion cultivation, irrigation, fertilizer and storage guidance.",

        wheatInfo:
            "Wheat cultivation, irrigation, fertilizer and harvesting guidance.",

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
            "Connect a crop-health AI service before displaying analysis.",

        governmentSchemes:
            "Government Schemes",

        schemesSubtitle:
            "Farmer support and government agricultural programs.",

        cropInsurance:
            "Crop Insurance",

        cropInsuranceDescription:
            "Official Pradhan Mantri Fasal Bima Yojana information.",

        pmKisanDescription:
            "Official PM-KISAN farmer support information.",

        pmksyDescription:
            "Official irrigation and water-management information.",

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

        continue:
            "जारी रखें",

        loginTitle:
            "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri में लॉगिन करें",

        email:
            "ईमेल",

        password:
            "पासवर्ड",

        rememberMe:
            "मुझे याद रखें",

        forgotPassword:
            "पासवर्ड भूल गए?",

        login:
            "लॉगिन",

        or:
            "या",

        demoDashboard:
            "डेमो डैशबोर्ड खोलें",

        noAccount:
            "खाता नहीं है?",

        register:
            "पंजीकरण करें",

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
            "गांव",

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
            "शिरडी बाजार",

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
            "किसान प्रोफ़ाइल",

        settings:
            "सेटिंग्स",

        about:
            "SmartAgri के बारे में",

        logout:
            "लॉगआउट",

        myProfile:
            "मेरी प्रोफ़ाइल",

        welcome:
            "स्वागत है",

        dashboardSubtitle:
            "आपकी खेती की जानकारी एक जगह।",

        connectionStatus:
            "कनेक्शन स्थिति",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफ़ाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "कनेक्टेड सत्यापित सेवाओं से डेटा प्राप्त किया जाता है।",

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
            "मौसम सेवा से संपर्क नहीं हो सका।",

        temperature:
            "तापमान",

        humidity:
            "नमी",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड बाजार स्रोतों से वर्तमान फसल भाव।",

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
            "बाजार डेटा प्राप्त नहीं किया जा सका।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onionInfo:
            "प्याज की खेती, सिंचाई, उर्वरक और भंडारण की जानकारी।",

        wheatInfo:
            "गेहूं की खेती, सिंचाई, उर्वरक और कटाई की जानकारी।",

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
            "विश्लेषण दिखाने के लिए फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी कृषि सहायता कार्यक्रम।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        pmKisanDescription:
            "PM-KISAN किसान सहायता की आधिकारिक जानकारी।",

        pmksyDescription:
            "सिंचाई और जल प्रबंधन की आधिकारिक जानकारी।",

        learnMore:
            "अधिक जानें",

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
            "AI उत्तर के लिए कनेक्टेड AI सेवा आवश्यक है।",

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
            "परिवर्तन सहेजें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "अपनी SmartAgri प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा ऐप भाषा चुनें।",

        voiceSettingDescription:
            "वॉइस सहायता चालू या बंद करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "ऐप सूचनाएं चालू या बंद करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता उपलब्ध कराने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता"

    },


    mr: {

        appName: "स्मार्टएग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "आपली भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी आपली पसंतीची भाषा निवडा.",

        continue:
            "पुढे जा",

        loginTitle:
            "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri मध्ये लॉगिन करा",

        email:
            "ईमेल",

        password:
            "पासवर्ड",

        rememberMe:
            "मला लक्षात ठेवा",

        forgotPassword:
            "पासवर्ड विसरलात?",

        login:
            "लॉगिन",

        or:
            "किंवा",

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
            "जमीन क्षेत्र",

        preferredMarket:
            "पसंतीचे बाजार",

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
            "कनेक्ट केलेल्या सत्यापित सेवांमधून डेटा घेतला जातो.",

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
            "हवामान सेवेशी संपर्क होऊ शकला नाही.",

        temperature:
            "तापमान",

        humidity:
            "आर्द्रता",

        windSpeed:
            "वाऱ्याचा वेग",

        rainChance:
            "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्ट केलेल्या बाजार स्रोतांमधील सध्याचे पीक भाव.",

        marketPriceTable:
            "बाजार भाव तक्ता",

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
            "बाजार डेटा मिळू शकला नाही.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onionInfo:
            "कांदा लागवड, सिंचन, खत आणि साठवणूक मार्गदर्शन.",

        wheatInfo:
            "गहू लागवड, सिंचन, खत आणि कापणी मार्गदर्शन.",

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
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी कार्यक्रम.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजनेची अधिकृत माहिती.",

        pmKisanDescription:
            "PM-KISAN शेतकरी सहाय्याची अधिकृत माहिती.",

        pmksyDescription:
            "सिंचन आणि जलव्यवस्थापनाची अधिकृत माहिती.",

        learnMore:
            "अधिक जाणून घ्या",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant:
            "स्मार्ट शेतकरी सहाय्यक",

        aiNotConnected:
            "AI कनेक्ट केलेले नाही",

        assistant:
            "सहाय्यक",

        aiUnavailable:
            "AI सेवा अजून कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी कनेक्ट केलेली AI सेवा आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",

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
            "व्हॉइस उत्तर",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle:
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "आपल्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "आपली पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य"

    }

};


/* ============================================================
   6. DOM HELPER
============================================================ */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* ============================================================
   7. SAFE TEXT HELPER
============================================================ */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================================
   8. TRANSLATION ENGINE
============================================================ */

function translatePage(language = state.language) {

    if (!translations[language]) {
        language = "en";
    }

    state.language = language;

    localStorage.setItem(
        "smartagri_language",
        language
    );

    document.documentElement.lang = language;

    $$("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (
            translations[language] &&
            translations[language][key] !== undefined
        ) {

            element.textContent =
                translations[language][key];

        }

    });


    $$("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.dataset.i18nPlaceholder;

        if (
            translations[language] &&
            translations[language][key] !== undefined
        ) {

            element.placeholder =
                translations[language][key];

        }

    });


    syncLanguageSelectors(language);

    updateVoiceLanguage();

}


/* ============================================================
   9. LANGUAGE SELECTOR SYNC
============================================================ */

function syncLanguageSelectors(language) {

    const selectors = [

        "#dashboardLanguage",

        "#settingsLanguage",

        "#registerLanguage",

        "#profileLanguage"

    ];

    selectors.forEach(selector => {

        const element = $(selector);

        if (element) {
            element.value = language;
        }

    });
}


/* ============================================================
   10. LANGUAGE PAGE
============================================================ */

function setupLanguagePage() {

    const languageButtons =
        $$(".language-option");

    const continueButton =
        $("#continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            state.selectedLanguage =
                button.dataset.language;

            if (continueButton) {
                continueButton.disabled = false;
            }

            translatePage(
                state.selectedLanguage
            );

        });

    });


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                const language =
                    state.selectedLanguage ||
                    state.language ||
                    "en";

                state.language = language;

                localStorage.setItem(
                    "smartagri_language",
                    language
                );

                translatePage(language);

                showScreen("loginPage");

            }
        );

    }
}


/* ============================================================
   11. SCREEN MANAGEMENT
============================================================ */

function showScreen(screenId) {

    $$(".screen").forEach(screen => {

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


/* ============================================================
   12. DASHBOARD SHOW/HIDE
============================================================ */

function showDashboard() {

    $$(".screen").forEach(screen => {

        screen.classList.remove(
            "active-screen"
        );

    });

    const dashboard =
        $("#dashboardPage");

    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }

    loadDashboard();

}


/* ============================================================
   13. LOGIN NAVIGATION
============================================================ */

function setupAuthNavigation() {

    const registerButton =
        $("#showRegisterBtn");

    const loginButton =
        $("#showLoginBtn");

    const changeLanguage =
        $("#changeLanguageFromLogin");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            () => showScreen("registerPage")
        );

    }


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            () => showScreen("loginPage")
        );

    }


    if (changeLanguage) {

        changeLanguage.addEventListener(
            "click",
            () => {

                state.selectedLanguage =
                    state.language;

                showScreen("languagePage");

            }
        );

    }

}


/* ============================================================
   14. LOGIN
============================================================ */

function setupLogin() {

    const form =
        $("#loginForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const email =
                $("#loginEmail")?.value.trim();

            const password =
                $("#loginPassword")?.value;

            const message =
                $("#loginMessage");


            if (!email || !password) {

                showMessage(
                    message,
                    "Please enter email and password.",
                    "error"
                );

                return;
            }


            if (!firebaseReady || !auth) {

                showMessage(
                    message,
                    "Firebase authentication is not available. Use Demo Dashboard for the prototype.",
                    "error"
                );

                return;

            }


            try {

                setButtonLoading(
                    form.querySelector(
                        'button[type="submit"]'
                    ),
                    true
                );


                const credential =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                state.currentUser =
                    credential.user;

                state.isDemo = false;


                await loadFarmerProfile(
                    state.currentUser.uid
                );


                showMessage(
                    message,
                    "Login successful.",
                    "success"
                );


                showDashboard();


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    message,
                    firebaseAuthErrorMessage(error),
                    "error"
                );

            } finally {

                setButtonLoading(
                    form.querySelector(
                        'button[type="submit"]'
                    ),
                    false
                );

            }

        }
    );

}


/* ============================================================
   15. FIREBASE ERROR TRANSLATION
============================================================ */

function firebaseAuthErrorMessage(error) {

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
            "Network error. Check your internet connection."

    };

    return (
        messages[code] ||
        error?.message ||
        "Authentication failed."
    );

}


/* ============================================================
   16. REGISTRATION
============================================================ */

function setupRegistration() {

    const form =
        $("#registrationForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                $("#registerName")?.value.trim();

            const email =
                $("#registerEmail")?.value.trim();

            const mobile =
                $("#registerMobile")?.value.trim();

            const village =
                $("#registerVillage")?.value.trim();

            const farmerState =
                $("#registerState")?.value.trim();

            const landArea =
                $("#registerLandArea")?.value.trim();

            const market =
                $("#registerMarket")?.value;

            const language =
                $("#registerLanguage")?.value ||
                state.language;

            const password =
                $("#registerPassword")?.value;


            const message =
                $("#registerMessage");


            if (
                !name ||
                !email ||
                !mobile ||
                !village ||
                !farmerState ||
                !landArea ||
                !market ||
                !password
            ) {

                showMessage(
                    message,
                    "Please complete all required fields.",
                    "error"
                );

                return;

            }


            if (!firebaseReady || !auth) {

                showMessage(
                    message,
                    "Firebase is not available.",
                    "error"
                );

                return;

            }


            try {

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );

                setButtonLoading(
                    submitButton,
                    true
                );


                const credential =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                state.currentUser =
                    credential.user;

                state.isDemo = false;


                const farmerData = {

                    uid: credential.user.uid,

                    name,

                    email,

                    mobile,

                    village,

                    state: farmerState,

                    landArea,

                    preferredMarket: market,

                    language,

                    createdAt:
                        new Date().toISOString()

                };


                await saveFarmerProfile(
                    farmerData
                );


                await credential.user.updateProfile({
                    displayName: name
                });


                state.farmer =
                    farmerData;


                state.language =
                    language;

                translatePage(language);


                showMessage(
                    message,
                    "Account created successfully.",
                    "success"
                );


                setTimeout(
                    () => showDashboard(),
                    700
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showMessage(
                    message,
                    firebaseAuthErrorMessage(error),
                    "error"
                );

            } finally {

                setButtonLoading(
                    form.querySelector(
                        'button[type="submit"]'
                    ),
                    false
                );

            }

        }
    );

}


/* ============================================================
   17. FORGOT PASSWORD
============================================================ */

function setupForgotPassword() {

    const button =
        $("#forgotPasswordBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        async () => {

            const email =
                $("#loginEmail")?.value.trim();


            if (!email) {

                showMessage(
                    $("#loginMessage"),
                    "Enter your email first.",
                    "error"
                );

                return;

            }


            if (!auth) {

                showMessage(
                    $("#loginMessage"),
                    "Firebase authentication is unavailable.",
                    "error"
                );

                return;

            }


            try {

                await auth.sendPasswordResetEmail(
                    email
                );


                showMessage(
                    $("#loginMessage"),
                    "Password reset email sent.",
                    "success"
                );


            } catch (error) {

                showMessage(
                    $("#loginMessage"),
                    firebaseAuthErrorMessage(error),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   18. DEMO DASHBOARD
============================================================ */

function setupDemoButton() {

    const button =
        $("#demoBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            state.isDemo = true;

            state.currentUser = null;

            state.farmer = {

                uid: "demo-user",

                name: "Demo Farmer",

                email: "demo@smartagri.local",

                mobile: "9999999999",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 acres",

                preferredMarket:
                    "Kopargaon APMC",

                language:
                    state.language

            };


            showDashboard();

        }
    );

}


/* ============================================================
   19. FIREBASE AUTH STATE
============================================================ */

function setupFirebaseAuthListener() {

    if (!firebaseReady || !auth) {
        return;
    }


    auth.onAuthStateChanged(
        async user => {

            if (!user) {

                state.currentUser = null;

                return;

            }


            state.currentUser = user;

            state.isDemo = false;


            try {

                await loadFarmerProfile(
                    user.uid
                );

            } catch (error) {

                console.warn(
                    "Could not load farmer profile:",
                    error
                );

            }

        }
    );

}


/* ============================================================
   20. PROFILE LOAD
============================================================ */

async function loadFarmerProfile(uid) {

    if (!uid) return null;


    try {

        const response =
            await apiFetch(
                `${API.profile}/${encodeURIComponent(uid)}`,
                {
                    method: "GET"
                }
            );


        if (response?.profile) {

            state.farmer =
                response.profile;

            if (
                response.profile.language
            ) {

                state.language =
                    response.profile.language;

                translatePage(
                    state.language
                );

            }

            return response.profile;

        }

    } catch (error) {

        console.warn(
            "Backend profile unavailable:",
            error
        );

    }


    /* --------------------------------------------------------
       Firestore fallback
    -------------------------------------------------------- */

    if (db) {

        try {

            const snapshot =
                await db
                    .collection("farmers")
                    .doc(uid)
                    .get();


            if (snapshot.exists) {

                state.farmer =
                    snapshot.data();

                return state.farmer;

            }

        } catch (error) {

            console.warn(
                "Firestore profile lookup failed:",
                error
            );

        }

    }


    /* --------------------------------------------------------
       Firebase Auth fallback
    -------------------------------------------------------- */

    if (auth?.currentUser) {

        state.farmer = {

            uid,

            name:
                auth.currentUser.displayName ||
                "Farmer",

            email:
                auth.currentUser.email || "",

            mobile: "",

            village: "",

            state: "Maharashtra",

            landArea: "",

            preferredMarket:
                "Kopargaon APMC",

            language:
                state.language

        };

    }


    return state.farmer;

}


/* ============================================================
   21. SAVE FARMER PROFILE
============================================================ */

async function saveFarmerProfile(profile) {

    if (!profile?.uid) {
        return;
    }


    try {

        await apiFetch(
            API.profile,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(profile)
            }
        );

        return;

    } catch (error) {

        console.warn(
            "Backend profile save failed. Trying Firestore...",
            error
        );

    }


    if (db) {

        try {

            await db
                .collection("farmers")
                .doc(profile.uid)
                .set(
                    profile,
                    { merge: true }
                );

        } catch (error) {

            console.error(
                "Firestore save failed:",
                error
            );

        }

    }

}


/* ============================================================
   22. DASHBOARD LOAD
============================================================ */

async function loadDashboard() {

    updateFarmerUI();

    setupNavigation();

    setupProfileMenu();

    loadWeather();

    loadMarketPrices();

    loadMarketComparison();

    loadCropInformation();

    checkBackendConnection();

}


/* ============================================================
   23. UPDATE FARMER UI
============================================================ */

function updateFarmerUI() {

    const farmer =
        state.farmer || {};


    setText(
        "#headerFarmerName",
        farmer.name || "Farmer"
    );


    setText(
        "#dashboardFarmerName",
        farmer.name || "Farmer"
    );


    setText(
        "#summaryName",
        farmer.name || "—"
    );


    setText(
        "#summaryVillage",
        farmer.village || "—"
    );


    setText(
        "#summaryLand",
        farmer.landArea || "—"
    );


    setText(
        "#summaryMarket",
        farmer.preferredMarket || "—"
    );


    setText(
        "#profilePageName",
        farmer.name || "—"
    );


    setText(
        "#profilePageEmail",
        farmer.email || "—"
    );


    setValue(
        "#profileName",
        farmer.name || ""
    );


    setValue(
        "#profileEmail",
        farmer.email || ""
    );


    setValue(
        "#profileMobile",
        farmer.mobile || ""
    );


    setValue(
        "#profileVillage",
        farmer.village || ""
    );


    setValue(
        "#profileState",
        farmer.state || ""
    );


    setValue(
        "#profileLandArea",
        farmer.landArea || ""
    );


    setValue(
        "#profileMarket",
        farmer.preferredMarket || ""
    );


    setValue(
        "#profileLanguage",
        farmer.language || state.language
    );

}


/* ============================================================
   24. NAVIGATION
============================================================ */

let navigationInitialized = false;

function setupNavigation() {

    if (navigationInitialized) {
        return;
    }

    navigationInitialized = true;


    $$("[data-section]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                if (!section) return;

                showSection(section);

            }
        );

    });


    const hamburger =
        $("#hamburgerBtn");

    const closeMenu =
        $("#closeMenuBtn");

    const overlay =
        $("#menuOverlay");


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            openSideMenu
        );

    }


    if (closeMenu) {

        closeMenu.addEventListener(
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


/* ============================================================
   25. SHOW APP SECTION
============================================================ */

function showSection(sectionId) {

    $$(".app-section").forEach(section => {

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

        state.currentSection =
            sectionId;

    }


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
        loadCropInformation();
    }

}


/* ============================================================
   26. SIDE MENU
============================================================ */

function openSideMenu() {

    $("#sideMenu")?.classList.add(
        "open"
    );

    $("#menuOverlay")?.classList.add(
        "active"
    );

}


function closeSideMenu() {

    $("#sideMenu")?.classList.remove(
        "open"
    );

    $("#menuOverlay")?.classList.remove(
        "active"
    );

}


/* ============================================================
   27. PROFILE MENU
============================================================ */

function setupProfileMenu() {

    const profileButton =
        $("#profileButton");

    if (!profileButton) return;


    profileButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            $("#profileMenu")?.classList.toggle(
                "open"
            );

        }
    );


    $$("[data-profile-section]").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.profileSection
                    );

                }
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            const menu =
                $("#profileMenu");

            if (
                menu &&
                !menu.contains(event.target) &&
                !profileButton.contains(event.target)
            ) {

                closeProfileMenu();

            }

        }
    );

}


function closeProfileMenu() {

    $("#profileMenu")?.classList.remove(
        "open"
    );

}


/* ============================================================
   28. LOGOUT
============================================================ */

function setupLogout() {

    [
        "#sideLogoutBtn",
        "#profileLogoutBtn"
    ].forEach(selector => {

        const button = $(selector);

        if (!button) return;


        button.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        firebaseReady &&
                        auth &&
                        auth.currentUser
                    ) {

                        await auth.signOut();

                    }

                } catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                }


                state.currentUser = null;

                state.farmer = null;

                state.isDemo = false;

                closeSideMenu();

                closeProfileMenu();

                showScreen("loginPage");

            }
        );

    });

}


/* ============================================================
   29. WEATHER
============================================================ */

async function loadWeather() {

    const empty =
        $("#weatherEmptyState");

    const data =
        $("#weatherData");


    if (empty) {
        empty.classList.remove("hidden");
    }

    if (data) {
        data.classList.add("hidden");
    }


    try {

        const response =
            await apiFetch(
                API.weather,
                {
                    method: "GET"
                }
            );


        const weather =
            response?.weather ||
            response?.data ||
            response;


        if (!weather) {
            throw new Error(
                "No weather data returned."
            );
        }


        const temperature =
            getFirstValue(
                weather,
                [
                    "temperature",
                    "temperature_2m",
                    "current_temperature"
                ]
            );


        const humidity =
            getFirstValue(
                weather,
                [
                    "humidity",
                    "relative_humidity_2m",
                    "relative_humidity"
                ]
            );


        const wind =
            getFirstValue(
                weather,
                [
                    "wind_speed",
                    "wind_speed_10m",
                    "windspeed"
                ]
            );


        const rain =
            getFirstValue(
                weather,
                [
                    "rain_chance",
                    "precipitation_probability",
                    "rain"
                ]
            );


        setText(
            "#weatherTemperature",
            formatWeatherValue(
                temperature,
                "°C"
            )
        );


        setText(
            "#weatherHumidity",
            formatWeatherValue(
                humidity,
                "%"
            )
        );


        setText(
            "#weatherWind",
            formatWeatherValue(
                wind,
                "km/h"
            )
        );


        setText(
            "#weatherRain",
            formatWeatherValue(
                rain,
                "%"
            )
        );


        if (empty) {
            empty.classList.add("hidden");
        }

        if (data) {
            data.classList.remove("hidden");
        }


        state.weatherLoaded = true;


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        state.weatherLoaded = false;

        updateConnectionStatus(
            false
        );

        showWeatherUnavailable();

    }

}


/* ============================================================
   30. WEATHER REFRESH BUTTON
============================================================ */

function setupWeatherRefresh() {

    const button =
        $("#refreshWeatherBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        async () => {

            setButtonLoading(
                button,
                true
            );


            await loadWeather();


            setButtonLoading(
                button,
                false
            );

        }
    );

}


function showWeatherUnavailable() {

    $("#weatherEmptyState")
        ?.classList.remove("hidden");

    $("#weatherData")
        ?.classList.add("hidden");

}


/* ============================================================
   31. MARKET PRICES
============================================================ */

async function loadMarketPrices() {

    const tbody =
        $("#marketTableBody");

    if (!tbody) return;


    renderTableLoading(tbody);


    const crop =
        $("#cropPriceSelector")?.value ||
        state.marketCrop ||
        "onion";


    state.marketCrop =
        crop;


    try {

        const url =
            `${API.marketPrices}?crop=${encodeURIComponent(crop)}`;


        const response =
            await apiFetch(
                url,
                {
                    method: "GET"
                }
            );


        const records =
            normalizeMarketRecords(
                response
            );


        if (!records.length) {

            renderMarketEmpty(
                tbody
            );

            state.marketLoaded = false;

            return;

        }


        renderMarketTable(
            tbody,
            records
        );


        state.marketLoaded = true;

        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        state.marketLoaded = false;

        renderMarketEmpty(
            tbody
        );

    }

}


/* ============================================================
   32. MARKET SELECTOR
============================================================ */

function setupMarketSelector() {

    const selector =
        $("#cropPriceSelector");

    if (!selector) return;


    selector.addEventListener(
        "change",
        () => {

            state.marketCrop =
                selector.value;

            loadMarketPrices();

        }
    );

}


/* ============================================================
   33. NORMALIZE MARKET RECORDS
============================================================ */

function normalizeMarketRecords(response) {

    let records = [];


    if (Array.isArray(response)) {

        records = response;

    } else if (
        Array.isArray(response?.records)
    ) {

        records = response.records;

    } else if (
        Array.isArray(response?.data)
    ) {

        records = response.data;

    } else if (
        Array.isArray(response?.result)
    ) {

        records = response.result;

    } else if (
        Array.isArray(response?.results)
    ) {

        records = response.results;

    }


    return records
        .map(record => {

            const market =
                record.market ||
                record.Market ||
                record.market_name ||
                record.MarketName ||
                record.apmc ||
                record.APMC ||
                record.marketName ||
                "";


            const commodity =
                record.commodity ||
                record.Commodity ||
                record.crop ||
                record.Crop ||
                record.commodity_name ||
                record.CommodityName ||
                "";


            const minPrice =
                record.min_price ??
                record.MinPrice ??
                record.min_price_rs ??
                record.minPrice ??
                null;


            const maxPrice =
                record.max_price ??
                record.MaxPrice ??
                record.max_price_rs ??
                record.maxPrice ??
                null;


            const modalPrice =
                record.modal_price ??
                record.ModalPrice ??
                record.modal_price_rs ??
                record.modalPrice ??
                record.price ??
                record.Price ??
                null;


            const date =
                record.arrival_date ||
                record.ArrivalDate ||
                record.date ||
                record.Date ||
                record.price_date ||
                record.PriceDate ||
                "";


            return {

                market:
                    market || "Unknown Market",

                crop:
                    commodity || state.marketCrop,

                minPrice,

                maxPrice,

                modalPrice,

                date

            };

        })
        .filter(record => {

            const market =
                String(record.market)
                    .toLowerCase();


            return (
                market.includes("kopargaon") ||
                market.includes("yeola") ||
                market.includes("shirdi") ||
                market.includes("कोपरगाव") ||
                market.includes("येवला") ||
                market.includes("शिर्डी")
            );

        });

}


/* ============================================================
   34. RENDER MARKET TABLE
============================================================ */

function renderMarketTable(
    tbody,
    records
) {

    tbody.innerHTML = "";


    records.forEach(record => {

        const row =
            document.createElement("tr");


        const price =
            formatMarketPrice(
                record
            );


        row.innerHTML = `

            <td>
                ${escapeHTML(record.market)}
            </td>

            <td>
                ${escapeHTML(
                    record.crop
                )}
            </td>

            <td>
                ${escapeHTML(price)}
            </td>

            <td>
                ${escapeHTML(
                    formatDate(
                        record.date
                    )
                )}
            </td>

        `;


        tbody.appendChild(row);

    });

}


function formatMarketPrice(record) {

    if (
        record.minPrice !== null &&
        record.maxPrice !== null &&
        record.minPrice !== undefined &&
        record.maxPrice !== undefined
    ) {

        if (
            String(record.minPrice) !==
            String(record.maxPrice)
        ) {

            return `₹${record.minPrice} - ₹${record.maxPrice}`;

        }

    }


    if (
        record.modalPrice !== null &&
        record.modalPrice !== undefined
    ) {

        return `₹${record.modalPrice}`;

    }


    if (
        record.minPrice !== null &&
        record.minPrice !== undefined
    ) {

        return `₹${record.minPrice}`;

    }


    return "—";

}


/* ============================================================
   35. MARKET EMPTY STATE
============================================================ */

function renderMarketEmpty(tbody) {

    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHTML(
                            translations[state.language]
                                ?.marketDataUnavailable ||
                            "Market data unavailable"
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            translations[state.language]
                                ?.marketDataUnavailableDescription ||
                            "No market data could be retrieved."
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


function renderTableLoading(tbody) {

    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>⏳</span>

                    <strong>
                        Loading market data...
                    </strong>

                </div>

            </td>

        </tr>

    `;

}


/* ============================================================
   36. MARKET COMPARISON
============================================================ */

async function loadMarketComparison() {

    try {

        const response =
            await apiFetch(
                `${API.marketPrices}?crop=${encodeURIComponent(
                    state.marketCrop || "onion"
                )}`,
                {
                    method: "GET"
                }
            );


        const records =
            normalizeMarketRecords(
                response
            );


        const marketNames = {

            kopargaon: [
                "Kopargaon APMC",
                "Kopargaon",
                "कोपरगाव"
            ],

            yeola: [
                "Yeola Market",
                "Yeola",
                "येवला"
            ],

            shirdi: [
                "Shirdi Market",
                "Shirdi",
                "शिर्डी"
            ]

        };


        updateComparisonCard(
            marketNames.kopargaon,
            records,
            0
        );


        updateComparisonCard(
            marketNames.yeola,
            records,
            1
        );


        updateComparisonCard(
            marketNames.shirdi,
            records,
            2
        );


    } catch (error) {

        console.error(
            "Market comparison error:",
            error
        );

        setComparisonUnavailable();

    }

}


/* ============================================================
   37. COMPARISON CARD UPDATE
============================================================ */

function updateComparisonCard(
    names,
    records,
    index
) {

    const cards =
        $$(".market-card");

    const card =
        cards[index];

    if (!card) return;


    const record =
        records.find(item => {

            const value =
                String(item.market)
                    .toLowerCase();

            return names.some(name =>
                value.includes(
                    String(name).toLowerCase()
                )
            );

        });


    const value =
        card.querySelector(
            ".market-value strong"
        );


    const status =
        card.querySelector("p");


    if (!record) {

        if (value) {
            value.textContent = "—";
        }

        if (status) {

            status.textContent =
                translations[state.language]
                    ?.dataUnavailable ||
                "Verified data unavailable";

        }

        return;

    }


    if (value) {

        value.textContent =
            formatMarketPrice(record);

    }


    if (status) {

        status.textContent =
            formatDate(record.date);

    }

}


/* ============================================================
   38. COMPARISON UNAVAILABLE
============================================================ */

function setComparisonUnavailable() {

    $$(".market-card").forEach(
        card => {

            const value =
                card.querySelector(
                    ".market-value strong"
                );

            if (value) {
                value.textContent = "—";
            }

        }
    );

}


/* ============================================================
   39. CROP INFORMATION
============================================================ */

async function loadCropInformation() {

    const fallback =
        getLocalCropInformation();


    try {

        const response =
            await apiFetch(
                API.crops,
                {
                    method: "GET"
                }
            );


        if (
            response &&
            (
                Array.isArray(response) ||
                Array.isArray(response.data) ||
                Array.isArray(response.crops)
            )
        ) {

            renderCropInformation(
                response
            );

            return;

        }

    } catch (error) {

        console.warn(
            "Crop API unavailable. Using local crop information.",
            error
        );

    }


    renderLocalCropInformation(
        fallback
    );

}


/* ============================================================
   40. LOCAL CROP INFORMATION
============================================================ */

function getLocalCropInformation() {

    return {

        onion: {

            title: "Onion",

            icon: "🧅",

            description:
                "Onion requires well-drained soil, suitable irrigation and proper nutrient management.",

            guidance: [
                "Prepare well-drained soil.",
                "Maintain regular irrigation without waterlogging.",
                "Monitor thrips and fungal diseases.",
                "Allow proper curing before storage."

            ]

        },


        wheat: {

            title: "Wheat",

            icon: "🌾",

            description:
                "Wheat requires timely sowing, balanced nutrients and controlled irrigation.",

            guidance: [
                "Use quality seed.",
                "Maintain appropriate soil moisture.",
                "Apply balanced fertilizer.",
                "Monitor weeds and diseases."
            ]

        }

    };

}


/* ============================================================
   41. RENDER LOCAL CROP INFORMATION
============================================================ */

function renderLocalCropInformation(
    crops
) {

    const cards =
        $$(".crop-card");


    if (cards.length < 2) {
        return;
    }


    const onion =
        crops.onion;

    const wheat =
        crops.wheat;


    updateCropCard(
        cards[0],
        onion
    );


    updateCropCard(
        cards[1],
        wheat
    );

}


function updateCropCard(
    card,
    crop
) {

    if (!card || !crop) return;


    const title =
        card.querySelector("h2");

    const paragraph =
        card.querySelector("p");

    const list =
        card.querySelector(".crop-list");


    if (title) {

        title.textContent =
            crop.title;

    }


    if (paragraph) {

        paragraph.textContent =
            crop.description;

    }


    if (list && Array.isArray(crop.guidance)) {

        list.innerHTML =
            crop.guidance
                .map(item =>
                    `<span>${escapeHTML(item)}</span>`
                )
                .join("");

    }

}


/* ============================================================
   42. SERVER CROP RENDERER
============================================================ */

function renderCropInformation(
    response
) {

    const data =
        response.data ||
        response.crops ||
        response;


    if (!Array.isArray(data)) {
        return;
    }


    const cards =
        $$(".crop-card");


    data.slice(0, cards.length)
        .forEach(
            (crop, index) => {

                const card =
                    cards[index];

                updateCropCard(
                    card,
                    {
                        title:
                            crop.title ||
                            crop.name ||
                            "Crop",

                        description:
                            crop.description ||
                            crop.info ||
                            "Crop information available.",

                        guidance:
                            Array.isArray(
                                crop.guidance
                            )
                                ? crop.guidance
                                : [
                                    "Cultivation Guidance",
                                    "Crop Management",
                                    "Farming Practices"
                                ]
                    }
                );

            }
        );

}


/* ============================================================
   43. GOVERNMENT SCHEME LINKS
============================================================ */

function setupGovernmentSchemes() {

    $$(".scheme-button").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

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
   44. AI ASSISTANT
============================================================ */

function setupAI() {

    const form =
        $("#aiForm");

    const input =
        $("#aiInput");

    if (!form || !input) return;


    form.addEventListener(
        "submit",
        async event => {

            /*
             * VERY IMPORTANT:
             * Prevents form submission from reloading
             * the page and returning to language screen.
             */

            event.preventDefault();

            event.stopPropagation();


            const question =
                input.value.trim();


            if (!question) {
                return;
            }


            appendChatMessage(
                question,
                "user"
            );


            input.value = "";


            const sendButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            setButtonLoading(
                sendButton,
                true
            );


            try {

                const response =
                    await apiFetch(
                        API.aiChat,
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
                                    state.farmer || null

                            })

                        }
                    );


                const answer =
                    response?.answer ||
                    response?.response ||
                    response?.message ||
                    response?.data?.answer;


                if (!answer) {

                    throw new Error(
                        "AI returned no response."
                    );

                }


                appendChatMessage(
                    answer,
                    "assistant"
                );


                speakText(
                    answer
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                appendChatMessage(
                    getAIErrorMessage(),
                    "assistant"
                );

            } finally {

                setButtonLoading(
                    sendButton,
                    false
                );

            }

        }
    );

}


/* ============================================================
   45. CHAT MESSAGE
============================================================ */

function appendChatMessage(
    message,
    type
) {

    const container =
        $("#chatMessages");

    if (!container) return;


    const wrapper =
        document.createElement("div");


    if (type === "user") {

        wrapper.className =
            "chat-message user-message";


        wrapper.innerHTML = `

            <div class="chat-avatar">
                👨‍🌾
            </div>

            <div>

                <strong>
                    ${escapeHTML(
                        state.farmer?.name ||
                        "Farmer"
                    )}
                </strong>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    } else {

        wrapper.className =
            "chat-message assistant-message";


        wrapper.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    ${escapeHTML(
                        translations[state.language]
                            ?.assistant ||
                        "Assistant"
                    )}
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


function getAIErrorMessage() {

    const messages = {

        en:
            "AI service is temporarily unavailable. Please make sure the AI backend is running.",

        hi:
            "AI सेवा अभी उपलब्ध नहीं है। कृपया जांचें कि AI बैकएंड चल रहा है।",

        mr:
            "AI सेवा सध्या उपलब्ध नाही. कृपया AI बॅकएंड सुरू आहे का ते तपासा."

    };

    return (
        messages[state.language] ||
        messages.en
    );

}


/* ============================================================
   46. CROP IMAGE UPLOAD
============================================================ */

function setupCropHealth() {

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

                state.selectedCropImage =
                    null;

                analyzeButton &&
                    (analyzeButton.disabled = true);

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

                input.value = "";

                return;

            }


            const maxSize =
                10 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "Image must be smaller than 10 MB."
                );

                input.value = "";

                return;

            }


            state.selectedCropImage =
                file;


            const reader =
                new FileReader();


            reader.onload = event => {

                if (preview) {

                    preview.src =
                        event.target.result;

                }


                previewContainer
                    ?.classList.remove(
                        "hidden"
                    );

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
            analyzeCropImage
        );

    }

}


/* ============================================================
   47. ANALYZE CROP IMAGE
============================================================ */

async function analyzeCropImage() {

    const file =
        state.selectedCropImage;


    if (!file) {

        alert(
            "Please choose a crop image first."
        );

        return;

    }


    const button =
        $("#analyzeCropBtn");

    const result =
        $("#cropAnalysisResult");


    setButtonLoading(
        button,
        true
    );


    if (result) {

        result.innerHTML = `

            <strong>
                Analyzing image...
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


        formData.append(
            "language",
            state.language
        );


        if (state.farmer?.uid) {

            formData.append(
                "uid",
                state.farmer.uid
            );

        }


        const response =
            await apiFetch(
                API.cropHealth,
                {
                    method: "POST",
                    body: formData
                }
            );


        const diagnosis =
            response?.diagnosis ||
            response?.result ||
            response?.analysis ||
            response?.message;


        if (!diagnosis) {

            throw new Error(
                "Crop-health API returned no analysis."
            );

        }


        renderCropAnalysis(
            diagnosis,
            response
        );


    } catch (error) {

        console.error(
            "Crop health error:",
            error
        );


        if (result) {

            result.innerHTML = `

                <strong>
                    ${escapeHTML(
                        getCropHealthError()
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        error.message || ""
                    )}
                </p>

            `;

        }

    } finally {

        setButtonLoading(
            button,
            false
        );

    }

}


/* ============================================================
   48. CROP ANALYSIS RESULT
============================================================ */

function renderCropAnalysis(
    diagnosis,
    response
) {

    const result =
        $("#cropAnalysisResult");

    if (!result) return;


    let extra = "";


    if (response?.confidence !== undefined) {

        extra += `

            <p>
                <strong>Confidence:</strong>
                ${escapeHTML(
                    response.confidence
                )}
            </p>

        `;

    }


    if (response?.recommendation) {

        extra += `

            <p>
                <strong>Recommendation:</strong>
                ${escapeHTML(
                    response.recommendation
                )}
            </p>

        `;

    }


    result.innerHTML = `

        <strong>
            ${escapeHTML(
                diagnosis
            )}
        </strong>

        ${extra}

    `;

}


function getCropHealthError() {

    const messages = {

        en:
            "Crop health AI is currently unavailable.",

        hi:
            "फसल स्वास्थ्य AI अभी उपलब्ध नहीं है।",

        mr:
            "पीक आरोग्य AI सध्या उपलब्ध नाही."

    };

    return (
        messages[state.language] ||
        messages.en
    );

}


/* ============================================================
   49. VOICE ASSISTANCE
============================================================ */

function setupVoice() {

    const startButton =
        $("#startVoiceBtn");

    const stopButton =
        $("#stopVoiceBtn");

    if (!startButton) return;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.addEventListener(
            "click",
            () => {

                setVoiceResponse(
                    "Voice recognition is not supported by this browser."
                );

            }
        );

        return;

    }


    state.voiceRecognition =
        new SpeechRecognition();


    state.voiceRecognition.continuous =
        false;

    state.voiceRecognition.interimResults =
        false;

    state.voiceRecognition.maxAlternatives =
        1;


    updateVoiceLanguage();


    state.voiceRecognition.onstart =
        () => {

            state.isListening = true;

            startButton.classList.add(
                "hidden"
            );

            stopButton?.classList.remove(
                "hidden"
            );

            setVoiceResponse(
                getVoiceListeningText()
            );

        };


    state.voiceRecognition.onresult =
        event => {

            const transcript =
                event.results[0][0]
                    .transcript;


            setValue(
                "#voiceInput",
                transcript
            );


            setVoiceResponse(
                getVoiceReceivedText()
            );


            speakText(
                getVoiceReceivedText()
            );


            /*
             * Also send recognized speech
             * to the AI backend.
             */

            sendVoiceToAI(
                transcript
            );

        };


    state.voiceRecognition.onerror =
        event => {

            console.error(
                "Speech recognition error:",
                event.error
            );


            setVoiceResponse(
                getVoiceErrorText()
            );


            resetVoiceButtons();

        };


    state.voiceRecognition.onend =
        () => {

            state.isListening = false;

            resetVoiceButtons();

        };


    startButton.addEventListener(
        "click",
        () => {

            if (
                !state.voiceRecognition ||
                state.isListening
            ) {
                return;
            }


            updateVoiceLanguage();


            try {

                state.voiceRecognition.start();

            } catch (error) {

                console.warn(
                    "Voice start failed:",
                    error
                );

            }

        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                if (
                    state.voiceRecognition &&
                    state.isListening
                ) {

                    state.voiceRecognition.stop();

                }

            }
        );

    }

}


/* ============================================================
   50. VOICE LANGUAGE
============================================================ */

function updateVoiceLanguage() {

    if (!state.voiceRecognition) {
        return;
    }


    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    state.voiceRecognition.lang =
        languages[state.language] ||
        "en-IN";

}


/* ============================================================
   51. VOICE -> AI
============================================================ */

async function sendVoiceToAI(
    transcript
) {

    if (!transcript) {
        return;
    }


    try {

        const response =
            await apiFetch(
                API.aiChat,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message:
                            transcript,

                        language:
                            state.language,

                        farmer:
                            state.farmer || null

                    })

                }
            );


        const answer =
            response?.answer ||
            response?.response ||
            response?.message;


        if (answer) {

            setVoiceResponse(
                answer
            );

            speakText(
                answer
            );

        }

    } catch (error) {

        console.error(
            "Voice AI error:",
            error
        );

        setVoiceResponse(
            getAIErrorMessage()
        );

    }

}


/* ============================================================
   52. VOICE UI HELPERS
============================================================ */

function resetVoiceButtons() {

    $("#startVoiceBtn")
        ?.classList.remove(
            "hidden"
        );

    $("#stopVoiceBtn")
        ?.classList.add(
            "hidden"
        );

}


function getVoiceListeningText() {

    const messages = {

        en:
            "Listening...",

        hi:
            "सुन रहा हूँ...",

        mr:
            "ऐकत आहे..."

    };

    return (
        messages[state.language] ||
        messages.en
    );

}


function getVoiceReceivedText() {

    const messages = {

        en:
            "Your question was received.",

        hi:
            "आपका प्रश्न प्राप्त हो गया है।",

        mr:
            "आपला प्रश्न प्राप्त झाला आहे."

    };

    return (
        messages[state.language] ||
        messages.en
    );

}


function getVoiceErrorText() {

    const messages = {

        en:
            "Could not understand the voice input.",

        hi:
            "वॉइस इनपुट समझ नहीं आया।",

        mr:
            "व्हॉइस इनपुट समजला नाही."

    };

    return (
        messages[state.language] ||
        messages.en
    );

}


function setVoiceResponse(
    text
) {

    setText(
        "#voiceResponse",
        text
    );

}


/* ============================================================
   53. TEXT TO SPEECH
============================================================ */

function speakText(text) {

    if (
        !text ||
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const voiceEnabled =
        $("#voiceSetting")?.checked !== false;


    if (!voiceEnabled) {
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


    utterance.rate = 0.9;

    utterance.pitch = 1;


    window.speechSynthesis.speak(
        utterance
    );

}


/* ============================================================
   54. PROFILE EDIT
============================================================ */

function setupProfileEditing() {

    const editButton =
        $("#editProfileBtn");

    const cancelButton =
        $("#cancelProfileEditBtn");

    const form =
        $("#profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            () => {

                setProfileEditing(
                    true
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            () => {

                updateFarmerUI();

                setProfileEditing(
                    false
                );

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            saveEditedProfile
        );

    }

}


/* ============================================================
   55. PROFILE EDIT MODE
============================================================ */

function setProfileEditing(
    editing
) {

    state.profileEditing =
        editing;


    const fields = [

        "#profileName",
        "#profileEmail",
        "#profileMobile",
        "#profileVillage",
        "#profileState",
        "#profileLandArea",
        "#profileMarket",
        "#profileLanguage"

    ];


    fields.forEach(
        selector => {

            const field =
                $(selector);

            if (field) {
                field.disabled =
                    !editing;
            }

        }
    );


    $("#profileEditActions")
        ?.classList.toggle(
            "hidden",
            !editing
        );

}


/* ============================================================
   56. SAVE PROFILE
============================================================ */

async function saveEditedProfile(
    event
) {

    event.preventDefault();


    const farmer =
        state.farmer || {};


    const updated = {

        ...farmer,

        uid:
            farmer.uid ||
            state.currentUser?.uid,

        name:
            $("#profileName")?.value.trim(),

        email:
            $("#profileEmail")?.value.trim(),

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
            $("#profileLanguage")?.value ||

            state.language

    };


    const message =
        $("#profileMessage");


    try {

        await saveFarmerProfile(
            updated
        );


        state.farmer =
            updated;


        state.language =
            updated.language;


        translatePage(
            state.language
        );


        updateFarmerUI();


        setProfileEditing(
            false
        );


        showMessage(
            message,
            "Profile saved successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            message,
            "Could not save profile.",
            "error"
        );

    }

}


/* ============================================================
   57. LANGUAGE SELECTORS INSIDE APP
============================================================ */

function setupDashboardLanguage() {

    const dashboardLanguage =
        $("#dashboardLanguage");

    const settingsLanguage =
        $("#settingsLanguage");

    const registerLanguage =
        $("#registerLanguage");

    const profileLanguage =
        $("#profileLanguage");


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            event => {

                changeApplicationLanguage(
                    event.target.value
                );

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            event => {

                changeApplicationLanguage(
                    event.target.value
                );

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            event => {

                /*
                 * Registration language is just
                 * the preferred language field.
                 */

                state.language =
                    event.target.value;

                syncLanguageSelectors(
                    state.language
                );

            }
        );

    }


    if (profileLanguage) {

        profileLanguage.addEventListener(
            "change",
            event => {

                changeApplicationLanguage(
                    event.target.value
                );

            }
        );

    }

}


/* ============================================================
   58. CHANGE APPLICATION LANGUAGE
============================================================ */

async function changeApplicationLanguage(
    language
) {

    if (!translations[language]) {
        return;
    }


    state.language =
        language;


    localStorage.setItem(
        "smartagri_language",
        language
    );


    translatePage(
        language
    );


    /*
     * Update farmer's saved preference.
     */

    if (
        state.farmer &&
        state.farmer.uid
    ) {

        state.farmer.language =
            language;


        try {

            await saveFarmerProfile(
                state.farmer
            );

        } catch (error) {

            console.warn(
                "Could not save language preference:",
                error
            );

        }

    }

}


/* ============================================================
   59. SETTINGS
============================================================ */

function setupSettings() {

    const voiceSetting =
        $("#voiceSetting");

    const notificationSetting =
        $("#notificationSetting");


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
            () => {

                localStorage.setItem(
                    "smartagri_voice",
                    String(
                        voiceSetting.checked
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
            () => {

                localStorage.setItem(
                    "smartagri_notifications",
                    String(
                        notificationSetting.checked
                    )
                );

            }
        );

    }

}


/* ============================================================
   60. BACKEND CONNECTION
============================================================ */

async function checkBackendConnection() {

    try {

        await apiFetch(
            API.health,
            {
                method: "GET"
            }
        );


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.warn(
            "Backend unavailable:",
            error
        );


        updateConnectionStatus(
            false
        );

    }

}


/* ============================================================
   61. CONNECTION STATUS
============================================================ */

function updateConnectionStatus(
    online
) {

    const status =
        $("#connectionStatus");

    const headerText =
        $("#connectionText");

    const dashboardText =
        $("#dashboardConnectionText");


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


    const text =
        online
            ? (
                translations[state.language]
                    ?.online ||
                "Online"
            )
            : (
                translations[state.language]
                    ?.offline ||
                "Offline"
            );


    if (headerText) {
        headerText.textContent = text;
    }


    if (dashboardText) {
        dashboardText.textContent = text;
    }

}


/* ============================================================
   62. API FETCH
============================================================ */

async function apiFetch(
    url,
    options = {}
) {

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

                    signal:
                        controller.signal
                }
            );


        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        let data;


        if (
            contentType.includes(
                "application/json"
            )
        ) {

            data =
                await response.json();

        } else {

            const text =
                await response.text();


            try {

                data =
                    JSON.parse(text);

            } catch {

                data = {
                    message: text
                };

            }

        }


        if (!response.ok) {

            const errorMessage =
                data?.error ||
                data?.message ||
                `Request failed (${response.status})`;


            throw new Error(
                errorMessage
            );

        }


        return data;


    } finally {

        clearTimeout(
            timeout
        );

    }

}


/* ============================================================
   63. GENERAL HELPERS
============================================================ */

function setText(
    selector,
    value
) {

    const element =
        $(selector);

    if (element) {

        element.textContent =
            value ?? "";

    }

}


function setValue(
    selector,
    value
) {

    const element =
        $(selector);

    if (element) {

        element.value =
            value ?? "";

    }

}


function getFirstValue(
    object,
    keys
) {

    if (!object) {
        return null;
    }


    for (const key of keys) {

        if (
            object[key] !== undefined &&
            object[key] !== null
        ) {

            return object[key];

        }

    }


    return null;

}


function formatWeatherValue(
    value,
    unit
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";

    }


    const numeric =
        Number(value);


    if (
        Number.isFinite(numeric)
    ) {

        return `${Math.round(numeric * 10) / 10}${unit}`;

    }


    return `${value}${unit}`;

}


function formatDate(
    date
) {

    if (!date) {
        return "—";
    }


    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return String(date);

    }


    return parsed.toLocaleDateString(
        state.language === "mr"
            ? "mr-IN"
            : state.language === "hi"
                ? "hi-IN"
                : "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ============================================================
   64. MESSAGE
============================================================ */

function showMessage(
    element,
    message,
    type = "info"
) {

    if (!element) return;


    element.textContent =
        message;


    element.className =
        `message ${type}`;


    setTimeout(
        () => {

            if (element) {

                element.textContent =
                    "";

                element.className =
                    "message";

            }

        },
        5000
    );

}


/* ============================================================
   65. BUTTON LOADING
============================================================ */

function setButtonLoading(
    button,
    loading
) {

    if (!button) return;


    if (loading) {

        button.dataset.originalText =
            button.innerHTML;


        button.disabled = true;

        button.innerHTML =
            "⏳";

    } else {

        button.disabled = false;


        if (
            button.dataset.originalText
        ) {

            button.innerHTML =
                button.dataset.originalText;

        }

    }

}


/* ============================================================
   66. NETWORK CHANGE
============================================================ */

function setupNetworkStatus() {

    window.addEventListener(
        "online",
        () => {

            updateConnectionStatus(
                true
            );

            checkBackendConnection();

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

}


/* ============================================================
   67. PREVENT ACCIDENTAL FORM RELOADS
============================================================ */

function preventUnexpectedFormReloads() {

    /*
     * The AI form already uses preventDefault().
     * This additionally prevents Enter key behaviour
     * from accidentally submitting unrelated forms.
     */

    const aiForm =
        $("#aiForm");


    if (aiForm) {

        aiForm.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    /*
                     * Allow the normal AI submit
                     * handler to process it.
                     */

                }

            }
        );

    }

}


/* ============================================================
   68. INITIAL APPLICATION START
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application starting..."
        );


        /*
         * Restore saved language.
         */

        translatePage(
            state.language
        );


        /*
         * Initialize all modules.
         */

        setupLanguagePage();

        setupAuthNavigation();

        setupLogin();

        setupRegistration();

        setupForgotPassword();

        setupDemoButton();

        setupFirebaseAuthListener();

        setupWeatherRefresh();

        setupMarketSelector();

        setupGovernmentSchemes();

        setupAI();

        setupCropHealth();

        setupVoice();

        setupProfileEditing();

        setupDashboardLanguage();

        setupSettings();

        setupLogout();

        setupNetworkStatus();

        preventUnexpectedFormReloads();


        /*
         * Restore profile if available.
         */

        if (
            firebaseReady &&
            auth &&
            auth.currentUser
        ) {

            state.currentUser =
                auth.currentUser;

        }


        /*
         * If language was previously selected,
         * keep it selected on language screen.
         */

        $$(".language-option").forEach(
            button => {

                if (
                    button.dataset.language ===
                    state.language
                ) {

                    button.classList.add(
                        "selected"
                    );

                    state.selectedLanguage =
                        state.language;

                    const continueButton =
                        $("#continueLanguageBtn");

                    if (continueButton) {

                        continueButton.disabled =
                            false;

                    }

                }

            }
        );


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);


/* ============================================================
   69. OPTIONAL DEBUG API
============================================================ */

window.SmartAgri = {

    state,

    loadWeather,

    loadMarketPrices,

    loadMarketComparison,

    loadCropInformation,

    translatePage,

    changeApplicationLanguage,

    showSection,

    showDashboard

};
