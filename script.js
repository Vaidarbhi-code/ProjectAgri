/* ============================================================
   SMARTAGRI - COMPLETE FRONTEND SCRIPT
   Matches:
   - index.html
   - server.js
   - SQLite backend
   - Open-Meteo
   - data.gov.in
   - Firebase Authentication / Firestore
   ============================================================ */

"use strict";

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

let firebaseReady = false;
let auth = null;
let db = null;

try {
    if (typeof firebase !== "undefined") {

        firebase.initializeApp(firebaseConfig);

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseReady = true;

        console.log("Firebase initialized.");

    }
} catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

}


/* ============================================================
   SERVER
   ============================================================ */

const API_BASE = window.location.protocol === "file:"
    ? "http://localhost:3000"
    : "";


/* ============================================================
   APPLICATION STATE
   ============================================================ */

const state = {

    language:
        localStorage.getItem("smartAgriLanguage") || "en",

    selectedLanguage:
        localStorage.getItem("smartAgriLanguage") || null,

    currentUser:
        null,

    farmer:
        null,

    currentSection:
        "dashboardSection",

    weatherLocation:
        "kopargaon",

    selectedCrop:
        "onion",

    weatherData:
        null,

    marketData:
        [],

    selectedCropImage:
        null,

    voiceListening:
        false,

    editingProfile:
        false

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
            "Only verified connected data is displayed.",

        offline:
            "Offline",

        online:
            "Online",

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

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

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support",

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."

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
            "SmartAgri में प्रवेश करें",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

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
            "बेचने से पहले जुड़े बाजारों की तुलना करें।",

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
            "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

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

        learnMore:
            "अधिक जानकारी",

        aiSubtitle:
            "कृषि से संबंधित प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्ट होना आवश्यक है।",

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
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "आपली भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी आपली आवडती भाषा निवडा.",

        continue:
            "पुढे जा",

        loginTitle:
            "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri मध्ये प्रवेश करा",

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
            "स्वागत आहे",

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
            "महत्त्वाची शेती साधने पटकन उघडा.",

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
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक भाव.",

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
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी उपलब्ध बाजारांची तुलना करा.",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी मदत आणि सरकारी कृषी योजना.",

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
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्ट असणे आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",

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
            "आपली आवडती अ‍ॅप भाषा निवडा.",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."

    }

};


/* ============================================================
   DOM HELPER
   ============================================================ */

function $(id) {
    return document.getElementById(id);
}


/* ============================================================
   LANGUAGE
   ============================================================ */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    state.language = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );


    const dictionary =
        translations[language];


    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        });


    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(function (element) {

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


    /*
     * Keep language selectors synchronized.
     */

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("profileLanguage"),
        $("registerLanguage")

    ];

    selectors.forEach(function (select) {

        if (select) {
            select.value = language;
        }

    });


    updateVoiceLanguage();

}


/* ============================================================
   LANGUAGE PAGE
   ============================================================ */

function initializeLanguagePage() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        $("continueLanguageBtn");


    languageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                languageButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                state.selectedLanguage =
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
            function () {

                const language =
                    state.selectedLanguage ||
                    "en";


                applyLanguage(language);


                showScreen(
                    "loginPage"
                );

            }
        );

    }


    /*
     * If a language was previously selected,
     * visually select it.
     */

    const savedLanguage =
        localStorage.getItem(
            "smartAgriLanguage"
        );

    if (savedLanguage) {

        const button =
            document.querySelector(
                `.language-option[data-language="${savedLanguage}"]`
            );

        if (button) {

            button.classList.add(
                "selected"
            );

            state.selectedLanguage =
                savedLanguage;

            if (continueButton) {
                continueButton.disabled =
                    false;
            }

        }

    }

}


/* ============================================================
   SHOW SCREEN
   ============================================================ */

function showScreen(screenId) {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(function (screen) {

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


/* ============================================================
   NAVIGATION
   ============================================================ */

function showSection(sectionId) {

    const section =
        $(sectionId);

    if (!section) {
        return;
    }


    document
        .querySelectorAll(
            ".app-section"
        )
        .forEach(function (item) {

            item.classList.remove(
                "active-section"
            );

        });


    section.classList.add(
        "active-section"
    );


    state.currentSection =
        sectionId;


    closeSideMenu();
    closeProfileMenu();


    /*
     * Load data when entering sections.
     */

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
   NAVIGATION BUTTONS
   ============================================================ */

function initializeNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

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


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    showSection(
                        button.dataset.profileSection
                    );

                }
            );

        });

}


/* ============================================================
   SIDE MENU
   ============================================================ */

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
            "active"
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
            "active"
        );

    }

}


function initializeSideMenu() {

    const hamburger =
        $("hamburgerBtn");

    const closeButton =
        $("closeMenuBtn");

    const overlay =
        $("menuOverlay");


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            openSideMenu
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
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
   PROFILE MENU
   ============================================================ */

function closeProfileMenu() {

    const menu =
        $("profileMenu");


    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

}


function toggleProfileMenu() {

    const menu =
        $("profileMenu");


    if (!menu) {
        return;
    }


    menu.classList.toggle(
        "open"
    );

}


function initializeProfileMenu() {

    const profileButton =
        $("profileButton");


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleProfileMenu();

            }
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            const menu =
                $("profileMenu");

            if (
                menu &&
                !menu.contains(event.target) &&
                event.target !== profileButton
            ) {

                closeProfileMenu();

            }

        }
    );

}


/* ============================================================
   CONNECTION STATUS
   ============================================================ */

function setConnectionStatus(
    connected,
    text = null
) {

    const status =
        $("connectionStatus");

    const connectionText =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


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
        text ||
        (
            connected
                ? translations[state.language].online
                : translations[state.language].offline
        );


    if (connectionText) {

        connectionText.textContent =
            label;

    }


    if (dashboardText) {

        dashboardText.textContent =
            label;

    }

}


/* ============================================================
   API HELPER
   ============================================================ */

async function apiRequest(
    endpoint,
    options = {}
) {

    const response =
        await fetch(
            `${API_BASE}${endpoint}`,
            {

                ...options,

                headers: {

                    ...(options.headers || {})

                }

            }
        );


    let data;

    try {

        data =
            await response.json();

    } catch (error) {

        data = {};

    }


    if (!response.ok) {

        throw new Error(
            data.error ||
            `Server error: ${response.status}`
        );

    }


    return data;

}


/* ============================================================
   WEATHER
   ============================================================ */

async function loadWeather(
    location = state.weatherLocation
) {

    const emptyState =
        $("weatherEmptyState");

    const weatherDataElement =
        $("weatherData");


    if (emptyState) {

        emptyState.classList.remove(
            "hidden"
        );

    }


    if (weatherDataElement) {

        weatherDataElement.classList.add(
            "hidden"
        );

    }


    try {

        setConnectionStatus(
            false,
            "Loading..."
        );


        const result =
            await apiRequest(
                `/api/weather?location=${encodeURIComponent(location)}`
            );


        state.weatherData =
            result;


        displayWeather(
            result
        );


        setConnectionStatus(
            true,
            translations[state.language].online
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        setConnectionStatus(
            false
        );


        showMessage(
            "weatherEmptyState",
            error.message ||
            translations[
                state.language
            ].weatherUnavailableDescription
        );

    }

}


/* ============================================================
   DISPLAY WEATHER
   ============================================================ */

function displayWeather(result) {

    const data =
        result.data || result;


    const current =
        result.current ||
        data.current;


    const daily =
        result.daily ||
        data.daily;


    if (!current) {

        throw new Error(
            "No current weather data received."
        );

    }


    const temperature =
        current.temperature_2m;


    const humidity =
        current.relative_humidity_2m;


    const wind =
        current.wind_speed_10m;


    const rain =
        current.rain;


    if ($("weatherTemperature")) {

        $("weatherTemperature").textContent =
            formatNumber(temperature) +
            " °C";

    }


    if ($("weatherHumidity")) {

        $("weatherHumidity").textContent =
            formatNumber(humidity) +
            " %";

    }


    if ($("weatherWind")) {

        $("weatherWind").textContent =
            formatNumber(wind) +
            " km/h";

    }


    let rainProbability =
        null;


    if (
        daily &&
        daily.precipitation_probability_max &&
        daily.precipitation_probability_max.length
    ) {

        rainProbability =
            daily.precipitation_probability_max[0];

    }


    if ($("weatherRain")) {

        if (rainProbability !== null) {

            $("weatherRain").textContent =
                formatNumber(
                    rainProbability
                ) +
                " %";

        } else if (rain !== undefined) {

            $("weatherRain").textContent =
                formatNumber(rain) +
                " mm";

        } else {

            $("weatherRain").textContent =
                "—";

        }

    }


    if ($("weatherEmptyState")) {

        $("weatherEmptyState").classList.add(
            "hidden"
        );

    }


    if ($("weatherData")) {

        $("weatherData").classList.remove(
            "hidden"
        );

    }

}


/* ============================================================
   WEATHER REFRESH
   ============================================================ */

function initializeWeather() {

    const refreshButton =
        $("refreshWeatherBtn");


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async function () {

                await loadWeather(
                    state.weatherLocation
                );

            }
        );

    }

}


/* ============================================================
   MARKET PRICES
   ============================================================ */

async function loadMarketPrices() {

    const crop =
        $("cropPriceSelector")?.value ||
        state.selectedCrop ||
        "onion";


    state.selectedCrop =
        crop;


    const tableBody =
        $("marketTableBody");


    if (tableBody) {

        tableBody.innerHTML = `

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


    try {

        const result =
            await apiRequest(
                `/api/market-prices?crop=${encodeURIComponent(crop)}`
            );


        state.marketData =
            result.data || [];


        renderMarketTable(
            state.marketData
        );


        setConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        /*
         * Try SQLite cache.
         */

        try {

            const cached =
                await apiRequest(
                    `/api/market-cache?crop=${encodeURIComponent(crop)}`
                );


            if (
                cached.data &&
                cached.data.length
            ) {

                state.marketData =
                    cached.data;

                renderMarketTable(
                    cached.data,
                    true
                );

                return;

            }

        } catch (cacheError) {

            console.error(
                "Market cache error:",
                cacheError
            );

        }


        renderMarketUnavailable(
            error.message
        );

    }

}


/* ============================================================
   MARKET TABLE
   ============================================================ */

function renderMarketTable(
    records,
    cached = false
) {

    const tableBody =
        $("marketTableBody");


    if (!tableBody) {
        return;
    }


    if (
        !records ||
        records.length === 0
    ) {

        renderMarketUnavailable(
            "No verified market records were returned."
        );

        return;

    }


    tableBody.innerHTML = "";


    records.forEach(function (record) {

        const row =
            document.createElement(
                "tr"
            );


        const market =
            record.market ||
            record.Market ||
            "—";


        const crop =
            record.crop ||
            record.commodity ||
            record.Commodity ||
            "—";


        const price =
            getMarketPrice(
                record
            );


        const date =
            record.arrival_date ||
            record.Arrival_Date ||
            record.date ||
            record.Date ||
            "—";


        row.innerHTML = `

            <td>
                ${escapeHTML(market)}
            </td>

            <td>
                ${escapeHTML(crop)}
            </td>

            <td>
                <strong>
                    ${escapeHTML(price)}
                </strong>
            </td>

            <td>
                ${escapeHTML(String(date))}
            </td>

        `;


        tableBody.appendChild(
            row
        );

    });


    if (cached) {

        const note =
            document.createElement(
                "tr"
            );


        note.innerHTML = `

            <td colspan="4">

                <small style="display:block;padding:8px;opacity:.7;">
                    Showing cached market data.
                </small>

            </td>

        `;


        tableBody.appendChild(
            note
        );

    }

}


/* ============================================================
   MARKET PRICE FORMAT
   ============================================================ */

function getMarketPrice(record) {

    const modal =
        record.modal_price ??
        record.Modal_Price;


    const min =
        record.min_price ??
        record.Min_Price;


    const max =
        record.max_price ??
        record.Max_Price;


    if (
        modal !== null &&
        modal !== undefined &&
        modal !== ""
    ) {

        return (
            "₹" +
            formatNumber(
                modal
            ) +
            "/quintal"
        );

    }


    if (
        min !== null &&
        min !== undefined &&
        max !== null &&
        max !== undefined
    ) {

        return (
            "₹" +
            formatNumber(min) +
            " - ₹" +
            formatNumber(max) +
            "/quintal"
        );

    }


    if (
        min !== null &&
        min !== undefined
    ) {

        return (
            "₹" +
            formatNumber(min) +
            "/quintal"
        );

    }


    return "—";

}


/* ============================================================
   MARKET UNAVAILABLE
   ============================================================ */

function renderMarketUnavailable(
    message = ""
) {

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
                        ${escapeHTML(
                            translations[
                                state.language
                            ].marketDataUnavailable
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            message ||
                            translations[
                                state.language
                            ].marketDataUnavailableDescription
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* ============================================================
   MARKET SELECTOR
   ============================================================ */

function initializeMarket() {

    const selector =
        $("cropPriceSelector");


    if (selector) {

        selector.addEventListener(
            "change",
            function () {

                state.selectedCrop =
                    selector.value;

                loadMarketPrices();

            }
        );

    }

}


/* ============================================================
   MARKET COMPARISON
   ============================================================ */

async function loadMarketComparison() {

    try {

        const result =
            await apiRequest(
                `/api/market-prices?crop=${encodeURIComponent(
                    state.selectedCrop || "onion"
                )}`
            );


        const records =
            result.data || [];


        const cards =
            document.querySelectorAll(
                ".market-card"
            );


        cards.forEach(function (card) {

            const heading =
                card.querySelector(
                    "h3"
                );


            if (!heading) {
                return;
            }


            const marketName =
                heading.textContent
                    .trim()
                    .toLowerCase();


            const matching =
                records.find(
                    function (record) {

                        return String(
                            record.market || ""
                        )
                            .toLowerCase()
                            .includes(
                                getMarketSearchTerm(
                                    marketName
                                )
                            );

                    }
                );


            const value =
                card.querySelector(
                    ".market-value strong"
                );


            const status =
                card.querySelector(
                    ".market-card p"
                );


            if (matching) {

                if (value) {

                    value.textContent =
                        getMarketPrice(
                            matching
                        );

                }


                if (status) {

                    status.textContent =
                        translations[
                            state.language
                        ].online;

                }

            } else {

                if (value) {

                    value.textContent =
                        "—";

                }


                if (status) {

                    status.textContent =
                        translations[
                            state.language
                        ].dataUnavailable;

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


/* ============================================================
   MARKET SEARCH TERM
   ============================================================ */

function getMarketSearchTerm(
    marketName
) {

    if (
        marketName.includes(
            "kopargaon"
        ) ||
        marketName.includes(
            "कोपरगांव"
        ) ||
        marketName.includes(
            "कोपरगाव"
        )
    ) {

        return "kopargaon";

    }


    if (
        marketName.includes(
            "yeola"
        ) ||
        marketName.includes(
            "येवला"
        )
    ) {

        return "yeola";

    }


    if (
        marketName.includes(
            "shirdi"
        ) ||
        marketName.includes(
            "शिर्डी"
        )
    ) {

        return "shirdi";

    }


    return marketName;

}


/* ============================================================
   CROP INFORMATION
   ============================================================ */

async function loadCropInformation() {

    try {

        const result =
            await apiRequest(
                "/api/crops"
            );


        renderCropInformation(
            result.crops || []
        );


    } catch (error) {

        console.error(
            "Crop information error:",
            error
        );

        /*
         * The HTML already contains basic
         * information, so don't destroy it.
         */

    }

}


/* ============================================================
   RENDER CROP INFORMATION
   ============================================================ */

function renderCropInformation(
    crops
) {

    if (
        !crops ||
        crops.length === 0
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".crop-card"
        );


    cards.forEach(function (card) {

        const heading =
            card.querySelector(
                "h2"
            );


        if (!heading) {
            return;
        }


        const crop =
            crops.find(
                function (item) {

                    return (
                        item.name
                            .toLowerCase() ===
                        heading.textContent
                            .trim()
                            .toLowerCase()
                    );

                }
            );


        if (!crop) {
            return;
        }


        const info =
            crop.information;


        if (!info) {
            return;
        }


        let details =
            card.querySelector(
                ".server-crop-details"
            );


        if (!details) {

            details =
                document.createElement(
                    "div"
                );

            details.className =
                "server-crop-details";

            details.style.marginTop =
                "15px";

            card.appendChild(
                details
            );

        }


        details.innerHTML = `

            <p>
                <strong>Season:</strong>
                ${escapeHTML(info.season || "—")}
            </p>

            <p>
                <strong>Soil:</strong>
                ${escapeHTML(info.soil || "—")}
            </p>

            <p>
                <strong>Irrigation:</strong>
                ${escapeHTML(info.irrigation || "—")}
            </p>

            <p>
                <strong>Fertilizer:</strong>
                ${escapeHTML(info.fertilizer || "—")}
            </p>

            <p>
                <strong>Pests:</strong>
                ${escapeHTML(info.pests || "—")}
            </p>

            <p>
                <strong>Diseases:</strong>
                ${escapeHTML(info.diseases || "—")}
            </p>

        `;

    });

}


/* ============================================================
   CROP IMAGE UPLOAD
   ============================================================ */

function initializeCropHealth() {

    const imageInput =
        $("cropImageInput");

    const previewContainer =
        $("imagePreviewContainer");

    const preview =
        $("cropImagePreview");

    const analyzeButton =
        $("analyzeCropBtn");


    if (!imageInput) {
        return;
    }


    imageInput.addEventListener(
        "change",
        function () {

            const file =
                imageInput.files &&
                imageInput.files[0];


            if (!file) {

                state.selectedCropImage =
                    null;

                if (analyzeButton) {
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
                    "Please select an image file."
                );

                imageInput.value = "";

                return;

            }


            state.selectedCropImage =
                file;


            if (preview) {

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        preview.src =
                            event.target.result;

                    };


                reader.readAsDataURL(
                    file
                );

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
   ANALYZE CROP IMAGE
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


    const resultContainer =
        $("cropAnalysisResult");


    const button =
        $("analyzeCropBtn");


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Analyzing...";

    }


    if (resultContainer) {

        resultContainer.innerHTML = `

            <strong>
                🔄 Analyzing crop image...
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
                `${API_BASE}/api/crop-health`,
                {

                    method:
                        "POST",

                    body:
                        formData

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Crop analysis failed."
            );

        }


        renderCropAnalysis(
            result
        );


    } catch (error) {

        console.error(
            "Crop health error:",
            error
        );


        if (resultContainer) {

            resultContainer.innerHTML = `

                <strong>
                    ❌ Crop analysis unavailable
                </strong>

                <p>
                    ${escapeHTML(
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


/* ============================================================
   DISPLAY CROP ANALYSIS
   ============================================================ */

function renderCropAnalysis(
    result
) {

    const container =
        $("cropAnalysisResult");


    if (!container) {
        return;
    }


    const modelResult =
        result.result ||
        result;


    let text =
        "";


    if (
        typeof modelResult ===
        "string"
    ) {

        text =
            modelResult;

    } else {

        text =
            modelResult.message ||
            modelResult.diagnosis ||
            modelResult.prediction ||
            modelResult.result ||
            "";


        if (!text) {

            text =
                JSON.stringify(
                    modelResult,
                    null,
                    2
                );

        }

    }


    if (
        result.connected === false
    ) {

        container.innerHTML = `

            <strong>
                ⚠️ Crop Health AI Model Not Connected
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

            <small>
                Image upload is working. Connect your
                crop-health model through
                CROP_HEALTH_API_URL in .env.
            </small>

        `;

        return;

    }


    container.innerHTML = `

        <strong>
            🩺 Crop Health Analysis
        </strong>

        <p>
            ${escapeHTML(text)}
        </p>

    `;

}


/* ============================================================
   AI ASSISTANT
   ============================================================ */

function initializeAI() {

    const form =
        $("aiForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            /*
             * CRITICAL:
             * Prevents the form from navigating
             * back to the language page.
             */

            event.preventDefault();
            event.stopPropagation();


            const input =
                $("aiInput");


            const question =
                input?.value.trim();


            if (!question) {
                return;
            }


            addChatMessage(
                question,
                "user"
            );


            input.value = "";


            const typingId =
                addTypingMessage();


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

                                    question

                                })

                        }
                    );


                removeChatMessage(
                    typingId
                );


                addChatMessage(

                    result.response ||
                    "No response received.",

                    "assistant"

                );


            } catch (error) {

                removeChatMessage(
                    typingId
                );


                addChatMessage(

                    "AI service is currently unavailable. " +
                    error.message,

                    "assistant"

                );

            }

        }
    );

}


/* ============================================================
   ADD CHAT MESSAGE
   ============================================================ */

function addChatMessage(
    text,
    type
) {

    const container =
        $("chatMessages");


    if (!container) {
        return;
    }


    const message =
        document.createElement(
            "div"
        );


    message.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    if (type === "user") {

        message.innerHTML = `

            <div class="chat-avatar">
                👨‍🌾
            </div>

            <div>

                <strong>
                    You
                </strong>

                <p>
                    ${escapeHTML(text)}
                </p>

            </div>

        `;

    } else {

        message.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    Assistant
                </strong>

                <p>
                    ${escapeHTML(text)}
                </p>

            </div>

        `;

    }


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;

}


/* ============================================================
   TYPING MESSAGE
   ============================================================ */

function addTypingMessage() {

    const container =
        $("chatMessages");


    if (!container) {
        return null;
    }


    const id =
        "typing-" +
        Date.now();


    const message =
        document.createElement(
            "div"
        );


    message.id =
        id;


    message.className =
        "chat-message assistant-message";


    message.innerHTML = `

        <div class="chat-avatar">
            🤖
        </div>

        <div>

            <strong>
                Assistant
            </strong>

            <p>
                Thinking...
            </p>

        </div>

    `;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;


    return id;

}


/* ============================================================
   REMOVE CHAT MESSAGE
   ============================================================ */

function removeChatMessage(id) {

    if (!id) {
        return;
    }


    const element =
        $(id);


    if (element) {

        element.remove();

    }

}


/* ============================================================
   VOICE ASSISTANCE
   ============================================================ */

let recognition = null;


function initializeVoice() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");


    if (!startButton) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.addEventListener(
            "click",
            function () {

                setVoiceResponse(
                    "Voice recognition is not supported by this browser. Please use Google Chrome."
                );

            }
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    recognition.lang =
        getSpeechLanguage();


    recognition.onstart =
        function () {

            state.voiceListening =
                true;


            startButton.classList.add(
                "hidden"
            );


            if (stopButton) {

                stopButton.classList.remove(
                    "hidden"
                );

            }


            setVoiceResponse(
                getVoiceListeningText()
            );

        };


    recognition.onresult =
        function (event) {

            let transcript =
                "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;

            }


            const voiceInput =
                $("voiceInput");


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            const lastResult =
                event.results[
                    event.results.length - 1
                ];


            if (
                lastResult &&
                lastResult.isFinal
            ) {

                processVoiceQuestion(
                    transcript
                );

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );


            setVoiceResponse(
                "Voice recognition error: " +
                event.error
            );

        };


    recognition.onend =
        function () {

            state.voiceListening =
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
        function () {

            try {

                recognition.lang =
                    getSpeechLanguage();

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

                if (recognition) {

                    recognition.stop();

                }

            }
        );

    }

}


/* ============================================================
   PROCESS VOICE QUESTION
   ============================================================ */

async function processVoiceQuestion(
    transcript
) {

    if (!transcript.trim()) {
        return;
    }


    setVoiceResponse(
        "Processing..."
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
                                transcript

                        })

                }
            );


        const answer =
            result.response ||
            "No response received.";


        setVoiceResponse(
            answer
        );


        speakText(
            answer
        );


    } catch (error) {

        setVoiceResponse(
            "AI service unavailable."
        );

    }

}


/* ============================================================
   SPEECH LANGUAGE
   ============================================================ */

function getSpeechLanguage() {

    switch (
        state.language
    ) {

        case "hi":
            return "hi-IN";

        case "mr":
            return "mr-IN";

        default:
            return "en-IN";

    }

}


function updateVoiceLanguage() {

    if (recognition) {

        recognition.lang =
            getSpeechLanguage();

    }

}


/* ============================================================
   VOICE RESPONSE
   ============================================================ */

function setVoiceResponse(
    text
) {

    const response =
        $("voiceResponse");


    if (response) {

        response.textContent =
            text;

    }

}


function getVoiceListeningText() {

    if (
        state.language === "hi"
    ) {

        return "सुन रहा हूँ... बोलिए।";

    }


    if (
        state.language === "mr"
    ) {

        return "ऐकत आहे... बोला.";

    }


    return "Listening... Please speak.";

}


/* ============================================================
   TEXT TO SPEECH
   ============================================================ */

function speakText(
    text
) {

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
        getSpeechLanguage();


    utterance.rate =
        0.9;


    window.speechSynthesis.speak(
        utterance
    );

}


/* ============================================================
   AUTHENTICATION
   ============================================================ */

function initializeAuth() {

    const loginForm =
        $("loginForm");

    const registrationForm =
        $("registrationForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            registerUser
        );

    }


    if (firebaseReady && auth) {

        auth.onAuthStateChanged(
            async function (user) {

                state.currentUser =
                    user;


                if (user) {

                    await loadFarmerProfile(
                        user
                    );

                }

            }
        );

    }

}


/* ============================================================
   LOGIN
   ============================================================ */

async function loginUser(
    event
) {

    event.preventDefault();


    const email =
        $("loginEmail")?.value.trim();


    const password =
        $("loginPassword")?.value;


    if (!email || !password) {
        return;
    }


    setMessage(
        "loginMessage",
        "Logging in...",
        "info"
    );


    if (!firebaseReady || !auth) {

        enterDemoDashboard(
            "Firebase is unavailable. Entering demo mode."
        );

        return;

    }


    try {

        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        await loadFarmerProfile(
            result.user
        );


        showDashboard();


    } catch (error) {

        console.error(
            error
        );


        setMessage(
            "loginMessage",
            getFirebaseError(
                error
            ),
            "error"
        );

    }

}


/* ============================================================
   REGISTRATION
   ============================================================ */

async function registerUser(
    event
) {

    event.preventDefault();


    const name =
        $("registerName")?.value.trim();


    const email =
        $("registerEmail")?.value.trim();


    const mobile =
        $("registerMobile")?.value.trim();


    const village =
        $("registerVillage")?.value.trim();


    const stateName =
        $("registerState")?.value.trim();


    const landArea =
        $("registerLandArea")?.value.trim();


    const market =
        $("registerMarket")?.value;


    const language =
        $("registerLanguage")?.value ||
        state.language;


    const password =
        $("registerPassword")?.value;


    setMessage(
        "registerMessage",
        "Creating account...",
        "info"
    );


    if (
        !name ||
        !email ||
        !mobile ||
        !village ||
        !stateName ||
        !landArea ||
        !market ||
        !password
    ) {

        setMessage(
            "registerMessage",
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    if (!firebaseReady || !auth) {

        setMessage(
            "registerMessage",
            "Firebase is not available.",
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


        const farmerData = {

            uid:
                user.uid,

            name,

            email,

            mobile,

            village,

            state:
                stateName,

            landArea,

            preferredMarket:
                market,

            preferredLanguage:
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
                farmerData
            );


        state.farmer =
            farmerData;


        applyLanguage(
            language
        );


        showDashboard();


    } catch (error) {

        console.error(
            error
        );


        setMessage(
            "registerMessage",
            getFirebaseError(
                error
            ),
            "error"
        );

    }

}


/* ============================================================
   LOAD FARMER PROFILE
   ============================================================ */

async function loadFarmerProfile(
    user
) {

    if (!user) {
        return;
    }


    let farmer =
        null;


    if (
        firebaseReady &&
        db
    ) {

        try {

            const snapshot =
                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .get();


            if (snapshot.exists) {

                farmer =
                    snapshot.data();

            }

        } catch (error) {

            console.error(
                "Firestore profile error:",
                error
            );

        }

    }


    /*
     * Fallback if no Firestore document exists.
     */

    if (!farmer) {

        farmer = {

            uid:
                user.uid,

            name:
                user.displayName ||
                "Farmer",

            email:
                user.email ||
                "",

            mobile:
                "",

            village:
                "",

            state:
                "",

            landArea:
                "",

            preferredMarket:
                "Kopargaon APMC",

            preferredLanguage:
                state.language

        };

    }


    state.farmer =
        farmer;


    populateFarmerUI(
        farmer
    );


    if (
        farmer.preferredLanguage
    ) {

        applyLanguage(
            farmer.preferredLanguage
        );

    }

}


/* ============================================================
   POPULATE FARMER UI
   ============================================================ */

function populateFarmerUI(
    farmer
) {

    const name =
        farmer.name ||
        "Farmer";


    const email =
        farmer.email ||
        "";


    const fields = {

        headerFarmerName:
            name,

        dashboardFarmerName:
            name,

        summaryName:
            name,

        summaryVillage:
            farmer.village || "—",

        summaryLand:
            farmer.landArea || "—",

        summaryMarket:
            farmer.preferredMarket || "—",

        profilePageName:
            name,

        profilePageEmail:
            email,

        profileName:
            name,

        profileEmail:
            email,

        profileMobile:
            farmer.mobile || "",

        profileVillage:
            farmer.village || "",

        profileState:
            farmer.state || "",

        profileLandArea:
            farmer.landArea || ""

    };


    Object.keys(fields).forEach(
        function (id) {

            const element =
                $(id);


            if (!element) {
                return;
            }


            if (
                element.tagName ===
                "INPUT"
            ) {

                element.value =
                    fields[id];

            } else {

                element.textContent =
                    fields[id];

            }

        }
    );


    if ($("profileMarket")) {

        $("profileMarket").value =
            farmer.preferredMarket ||
            "";

    }


    if ($("profileLanguage")) {

        $("profileLanguage").value =
            farmer.preferredLanguage ||
            state.language;

    }


    if ($("dashboardLanguage")) {

        $("dashboardLanguage").value =
            farmer.preferredLanguage ||
            state.language;

    }


    if ($("settingsLanguage")) {

        $("settingsLanguage").value =
            farmer.preferredLanguage ||
            state.language;

    }

}


/* ============================================================
   SHOW DASHBOARD
   ============================================================ */

function showDashboard() {

    showScreen(
        "dashboardPage"
    );


    showSection(
        "dashboardSection"
    );


    if (state.farmer) {

        populateFarmerUI(
            state.farmer
        );

    }


    /*
     * Check backend.
     */

    checkServerConnection();

}


/* ============================================================
   DEMO DASHBOARD
   ============================================================ */

function enterDemoDashboard(
    message = ""
) {

    state.currentUser =
        null;


    state.farmer = {

        name:
            "Demo Farmer",

        email:
            "demo@smartagri.local",

        mobile:
            "9999999999",

        village:
            "Kopargaon",

        state:
            "Maharashtra",

        landArea:
            "5 acres",

        preferredMarket:
            "Kopargaon APMC",

        preferredLanguage:
            state.language

    };


    populateFarmerUI(
        state.farmer
    );


    showDashboard();


    if (message) {

        console.log(
            message
        );

    }

}


/* ============================================================
   DEMO BUTTON
   ============================================================ */

function initializeDemo() {

    const button =
        $("demoBtn");


    if (button) {

        button.addEventListener(
            "click",
            function () {

                enterDemoDashboard();

            }
        );

    }

}


/* ============================================================
   LOGIN / REGISTER NAVIGATION
   ============================================================ */

function initializeAuthNavigation() {

    const register =
        $("showRegisterBtn");

    const login =
        $("showLoginBtn");

    const changeLanguage =
        $("changeLanguageFromLogin");


    if (register) {

        register.addEventListener(
            "click",
            function () {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    if (login) {

        login.addEventListener(
            "click",
            function () {

                showScreen(
                    "loginPage"
                );

            }
        );

    }


    if (changeLanguage) {

        changeLanguage.addEventListener(
            "click",
            function () {

                showScreen(
                    "languagePage"
                );

            }
        );

    }

}


/* ============================================================
   FORGOT PASSWORD
   ============================================================ */

function initializeForgotPassword() {

    const button =
        $("forgotPasswordBtn");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

            const email =
                $("loginEmail")?.value.trim();


            if (!email) {

                setMessage(
                    "loginMessage",
                    "Enter your email address first.",
                    "error"
                );

                return;

            }


            if (!firebaseReady || !auth) {

                setMessage(
                    "loginMessage",
                    "Firebase is unavailable.",
                    "error"
                );

                return;

            }


            try {

                await auth.sendPasswordResetEmail(
                    email
                );


                setMessage(
                    "loginMessage",
                    "Password reset email sent.",
                    "success"
                );


            } catch (error) {

                setMessage(
                    "loginMessage",
                    getFirebaseError(
                        error
                    ),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   PROFILE EDITING
   ============================================================ */

function initializeProfileEditing() {

    const editButton =
        $("editProfileBtn");

    const cancelButton =
        $("cancelProfileEditBtn");

    const profileForm =
        $("profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                setProfileEditing(
                    true
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                populateFarmerUI(
                    state.farmer
                );

                setProfileEditing(
                    false
                );

            }
        );

    }


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );

    }

}


/* ============================================================
   SET PROFILE EDITING
   ============================================================ */

function setProfileEditing(
    enabled
) {

    state.editingProfile =
        enabled;


    const fields = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    fields.forEach(function (id) {

        const element =
            $(id);


        if (element) {

            element.disabled =
                !enabled;

        }

    });


    const actions =
        $("profileEditActions");


    if (actions) {

        actions.classList.toggle(
            "hidden",
            !enabled
        );

    }

}


/* ============================================================
   SAVE PROFILE
   ============================================================ */

async function saveProfile(
    event
) {

    event.preventDefault();


    if (!state.farmer) {
        return;
    }


    const updated = {

        ...state.farmer,

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

        preferredLanguage:
            $("profileLanguage")?.value,

        updatedAt:
            firebaseReady
                ? firebase.firestore.FieldValue.serverTimestamp()
                : new Date()

    };


    try {

        if (
            firebaseReady &&
            db &&
            state.currentUser
        ) {

            await db
                .collection("farmers")
                .doc(
                    state.currentUser.uid
                )
                .set(
                    updated,
                    {
                        merge: true
                    }
                );

        }


        state.farmer =
            updated;


        applyLanguage(
            updated.preferredLanguage ||
            state.language
        );


        populateFarmerUI(
            updated
        );


        setProfileEditing(
            false
        );


        setMessage(
            "profileMessage",
            "Profile saved successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            error
        );


        setMessage(
            "profileMessage",
            "Unable to save profile.",
            "error"
        );

    }

}


/* ============================================================
   LANGUAGE SELECTORS
   ============================================================ */

function initializeLanguageSelectors() {

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("profileLanguage")

    ];


    selectors.forEach(function (select) {

        if (!select) {
            return;
        }


        select.addEventListener(
            "change",
            async function () {

                const language =
                    select.value;


                applyLanguage(
                    language
                );


                /*
                 * Synchronize every selector.
                 */

                selectors.forEach(
                    function (other) {

                        if (other) {

                            other.value =
                                language;

                        }

                    }
                );


                /*
                 * Save language to Firestore.
                 */

                if (
                    state.farmer
                ) {

                    state.farmer.preferredLanguage =
                        language;

                }


                if (
                    firebaseReady &&
                    db &&
                    state.currentUser
                ) {

                    try {

                        await db
                            .collection("farmers")
                            .doc(
                                state.currentUser.uid
                            )
                            .set(

                                {

                                    preferredLanguage:
                                        language,

                                    updatedAt:
                                        firebase.firestore.FieldValue.serverTimestamp()

                                },

                                {
                                    merge: true
                                }

                            );

                    } catch (error) {

                        console.error(
                            "Language save error:",
                            error
                        );

                    }

                }

            }
        );

    });


    /*
     * Register page language selector.
     */

    const registerLanguage =
        $("registerLanguage");


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function () {

                applyLanguage(
                    registerLanguage.value
                );

            }
        );

    }

}


/* ============================================================
   GOVERNMENT SCHEMES
   ============================================================ */

function initializeGovernmentSchemes() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const url =
                        button.dataset.schemeUrl;


                    if (!url) {
                        return;
                    }


                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });

}


/* ============================================================
   LOGOUT
   ============================================================ */

function initializeLogout() {

    const buttons = [

        $("sideLogoutBtn"),
        $("profileLogoutBtn")

    ];


    buttons.forEach(function (button) {

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            logoutUser
        );

    });

}


async function logoutUser() {

    try {

        if (
            firebaseReady &&
            auth
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            error
        );

    }


    state.currentUser =
        null;

    state.farmer =
        null;


    closeSideMenu();
    closeProfileMenu();


    showScreen(
        "loginPage"
    );

}


/* ============================================================
   SETTINGS
   ============================================================ */

function initializeSettings() {

    const voiceSetting =
        $("voiceSetting");

    const notificationSetting =
        $("notificationSetting");


    if (voiceSetting) {

        const saved =
            localStorage.getItem(
                "smartAgriVoiceEnabled"
            );


        if (saved !== null) {

            voiceSetting.checked =
                saved === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriVoiceEnabled",
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
                "smartAgriNotifications"
            );


        if (saved !== null) {

            notificationSetting.checked =
                saved === "true";

        }


        notificationSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriNotifications",
                    String(
                        notificationSetting.checked
                    )
                );

            }
        );

    }

}


/* ============================================================
   SERVER CONNECTION
   ============================================================ */

async function checkServerConnection() {

    try {

        await apiRequest(
            "/api/health"
        );


        setConnectionStatus(
            true
        );


    } catch (error) {

        setConnectionStatus(
            false
        );


        console.warn(
            "SmartAgri backend unavailable."
        );

    }

}


/* ============================================================
   ONLINE / OFFLINE DETECTION
   ============================================================ */

function initializeNetworkStatus() {

    window.addEventListener(
        "online",
        function () {

            checkServerConnection();

        }
    );


    window.addEventListener(
        "offline",
        function () {

            setConnectionStatus(
                false
            );

        }
    );

}


/* ============================================================
   UTILITY: NUMBER FORMAT
   ============================================================ */

function formatNumber(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";

    }


    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return String(value);

    }


    return number.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 1
        }
    );

}


/* ============================================================
   UTILITY: HTML ESCAPE
   ============================================================ */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
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
   MESSAGES
   ============================================================ */

function setMessage(
    elementId,
    message,
    type = "info"
) {

    const element =
        $(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        `message ${type}`;

}


function showMessage(
    elementId,
    message
) {

    const element =
        $(elementId);


    if (!element) {
        return;
    }


    element.classList.remove(
        "hidden"
    );


    const p =
        element.querySelector(
            "p"
        );


    if (p) {

        p.textContent =
            message;

    }

}


/* ============================================================
   FIREBASE ERROR MESSAGES
   ============================================================ */

function getFirebaseError(
    error
) {

    const code =
        error?.code || "";


    const messages = {

        "auth/invalid-email":
            "Invalid email address.",

        "auth/user-not-found":
            "No account exists with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/email-already-in-use":
            "An account already exists with this email.",

        "auth/weak-password":
            "Password must contain at least 6 characters.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[code] ||
        error?.message ||
        "An authentication error occurred."
    );

}


/* ============================================================
   INITIALIZE EVERYTHING
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri initializing..."
        );


        /*
         * Language must be initialized first.
         */

        applyLanguage(
            state.language
        );


        initializeLanguagePage();

        initializeNavigation();

        initializeSideMenu();

        initializeProfileMenu();

        initializeWeather();

        initializeMarket();

        initializeCropHealth();

        initializeAI();

        initializeVoice();

        initializeAuth();

        initializeDemo();

        initializeAuthNavigation();

        initializeForgotPassword();

        initializeProfileEditing();

        initializeLanguageSelectors();

        initializeGovernmentSchemes();

        initializeLogout();

        initializeSettings();

        initializeNetworkStatus();


        /*
         * Initial backend check.
         */

        checkServerConnection();


        /*
         * Load weather in background.
         */

        setTimeout(
            function () {

                loadWeather(
                    state.weatherLocation
                );

            },
            500
        );


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);
