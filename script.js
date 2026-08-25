/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   No fake/fallback market or weather values
========================================================= */


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let firebaseReady = false;
let auth = null;
let db = null;

try {
    if (
        firebaseConfig.apiKey !== "YOUR_API_KEY" &&
        typeof firebase !== "undefined"
    ) {
        firebase.initializeApp(firebaseConfig);

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseReady = true;

        console.log("Firebase initialized successfully.");
    } else {
        console.log("Firebase configuration not added yet.");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}


/* =========================================================
   GLOBAL STATE
========================================================= */

let selectedLanguage = localStorage.getItem("smartAgriLanguage") || null;

let currentUser = null;
let currentFarmerData = null;

let selectedCrop = "onion";

let recognition = null;
let isListening = false;


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

        offline: "Offline",
        online: "Online",
        connectionStatus: "Connection Status",

        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription: "Only verified connected data is displayed.",

        weatherSubtitle: "Local weather conditions for farming decisions.",
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

        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription:
            "No verified market data has been received.",

        comparisonSubtitle:
            "Compare connected market information before selling.",

        dataUnavailable: "Verified data unavailable",

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
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."
    },


    hi: {

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri तक पहुँचने के लिए लॉगिन करें",

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
        village: "गाँव",
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

        myProfile: "मेरी प्रोफाइल",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिति",

        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",

        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",

        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ है।",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल कीमतें।",

        marketPriceTable: "बाजार मूल्य तालिका",
        market: "बाजार",
        crop: "फसल",
        price: "कीमत",
        date: "तारीख",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले कनेक्टेड बाजार जानकारी की तुलना करें।",

        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन संबंधी मार्गदर्शन।",

        onion: "प्याज",
        wheat: "गेहूं",

        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",

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

        analysisNotConnected:
            "AI फसल विश्लेषण कनेक्ट नहीं है",

        analysisNotConnectedDescription:
            "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सहायता और सरकारी कृषि योजनाएं।",

        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance: "फसल बीमा",

        cropInsuranceDescription:
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",

        learnMore: "अधिक जानें",

        aiSubtitle:
            "कृषि से संबंधित प्रश्न पूछें।",

        smartAssistant: "स्मार्ट किसान सहायक",
        aiNotConnected: "AI कनेक्ट नहीं है",
        assistant: "सहायक",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice: "आवाज सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज प्रतिक्रिया",

        voiceInputPlaceholder:
            "आवाज इनपुट यहां दिखाई देगा...",

        voiceReady:
            "आवाज सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settingsSubtitle:
            "अपनी SmartAgri प्राथमिकताएं प्रबंधित करें।",

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
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
    },


    mr: {

        appName: "स्मार्टअॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",
        languageDescription:
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",
        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle:
            "SmartAgri मध्ये प्रवेश करण्यासाठी लॉगिन करा",

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
        marketPrices: "बाजारभाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पिकांची माहिती",
        cropHealth: "पिकांचे आरोग्य",
        governmentSchemes: "सरकारी योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "आवाज सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri बद्दल",
        logout: "लॉगआउट",

        myProfile: "माझे प्रोफाइल",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिती",

        welcome: "स्वागत",
        dashboardSubtitle:
            "तुमची शेतीविषयक माहिती एका ठिकाणी.",

        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle:
            "महत्त्वाची शेतीची साधने पटकन वापरा.",

        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामानाची माहिती.",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",

        weatherUnavailable:
            "हवामानाचा डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "कोणताही सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",

        marketPriceTable: "बाजारभाव तक्ता",
        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",

        marketDataUnavailable:
            "बाजाराचा डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "कोणताही सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्री करण्यापूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

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
            "AI सहाय्यासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage: "फोटो निवडा",
        analyzeCrop: "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकऱ्यांसाठी सरकारी कृषी योजना आणि मदत.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance: "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री पीक विमा योजनेची माहिती.",

        learnMore: "अधिक जाणून घ्या",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant:
            "स्मार्ट शेतकरी सहाय्यक",

        aiNotConnected:
            "AI कनेक्ट केलेले नाही",

        assistant: "सहाय्यक",

        aiUnavailable:
            "AI सेवा अद्याप कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी कनेक्टेड AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle:
            "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

        startVoice:
            "आवाज सहाय्य सुरू करा",

        stopVoice:
            "ऐकणे थांबवा",

        voiceInput: "आवाज इनपुट",
        voiceResponse: "आवाज प्रतिसाद",

        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",

        voiceReady:
            "आवाज सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel: "रद्द करा",

        settingsSubtitle:
            "तुमच्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications: "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार केले आहे."
    }
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SmartAgri JavaScript loaded.");

    setupLanguageSystem();
    setupNavigation();
    setupAuthentication();
    setupProfile();
    setupDashboard();
    setupMarket();
    setupWeather();
    setupCropHealth();
    setupAISystem();
    setupVoiceSystem();
    setupSettings();
    setupGovernmentSchemes();
    setupConnectionStatus();

    if (selectedLanguage) {
        applyLanguage(selectedLanguage);
    } else {
        showScreen("languagePage");
    }

});


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function setupLanguageSystem() {

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

            applyLanguage(selectedLanguage);
        });

    });


    if (continueButton) {

        continueButton.addEventListener("click", () => {

            if (!selectedLanguage) return;

            localStorage.setItem(
                "smartAgriLanguage",
                selectedLanguage
            );

            applyLanguage(selectedLanguage);

            showScreen("loginPage");

        });

    }


    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (dashboardLanguage) {

        dashboardLanguage.addEventListener("change", event => {

            changeLanguage(event.target.value);

        });

    }


    const settingsLanguage =
        document.getElementById("settingsLanguage");

    if (settingsLanguage) {

        settingsLanguage.addEventListener("change", event => {

            changeLanguage(event.target.value);

        });

    }


    const changeLanguageLogin =
        document.getElementById("changeLanguageFromLogin");

    if (changeLanguageLogin) {

        changeLanguageLogin.addEventListener("click", () => {

            showScreen("languagePage");

            const buttons =
                document.querySelectorAll(".language-option");

            buttons.forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.language === selectedLanguage
                );

            });

            const continueButton =
                document.getElementById("continueLanguageBtn");

            if (continueButton) {
                continueButton.disabled = !selectedLanguage;
            }

        });

    }

}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );

    document.documentElement.lang = language;

    const dictionary =
        translations[language];


    /* ---------- TEXT ---------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        });


    /* ---------- PLACEHOLDERS ---------- */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            if (
                dictionary[key] !== undefined
            ) {

                element.placeholder =
                    dictionary[key];

            }

        });


    /* ---------- SELECT VALUES ---------- */

    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (dashboardLanguage) {
        dashboardLanguage.value = language;
    }


    const settingsLanguage =
        document.getElementById("settingsLanguage");

    if (settingsLanguage) {
        settingsLanguage.value = language;
    }


    const registerLanguage =
        document.getElementById("registerLanguage");

    if (registerLanguage) {
        registerLanguage.value = language;
    }


    const profileLanguage =
        document.getElementById("profileLanguage");

    if (profileLanguage) {
        profileLanguage.value = language;
    }


    /* ---------- LANGUAGE PAGE ---------- */

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language === language
            );

        });


    /* ---------- UPDATE DYNAMIC FARMER DATA ---------- */

    updateFarmerUI();

    console.log(
        "Language changed to:",
        language
    );
}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {

    if (!translations[language]) {
        return;
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );

    applyLanguage(language);

}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });

    const screen =
        document.getElementById(screenId);

    if (screen) {

        screen.classList.add(
            "active-screen"
        );

    }


    if (screenId === "dashboardPage") {

        const dashboard =
            document.getElementById("dashboardPage");

        if (dashboard) {
            dashboard.classList.add("active-screen");
        }

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const hamburger =
        document.getElementById("hamburgerBtn");

    const closeMenu =
        document.getElementById("closeMenuBtn");

    const overlay =
        document.getElementById("menuOverlay");

    const sideMenu =
        document.getElementById("sideMenu");


    function openMenu() {

        if (sideMenu) {
            sideMenu.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

    }


    function closeMenuFunction() {

        if (sideMenu) {
            sideMenu.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

    }


    if (hamburger) {
        hamburger.addEventListener(
            "click",
            openMenu
        );
    }


    if (closeMenu) {
        closeMenu.addEventListener(
            "click",
            closeMenuFunction
        );
    }


    if (overlay) {
        overlay.addEventListener(
            "click",
            closeMenuFunction
        );
    }


    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.section;

                showAppSection(section);

                closeMenuFunction();

            });

        });


    document
        .querySelectorAll("[data-profile-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                showAppSection(
                    button.dataset.profileSection
                );

                closeProfileMenu();

            });

        });

}


/* =========================================================
   SHOW APP SECTION
========================================================= */

function showAppSection(sectionId) {

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

}


/* =========================================================
   AUTHENTICATION
========================================================= */

function setupAuthentication() {

    const loginForm =
        document.getElementById("loginForm");

    const registrationForm =
        document.getElementById("registrationForm");


    const showRegister =
        document.getElementById("showRegisterBtn");

    const showLogin =
        document.getElementById("showLoginBtn");

    const demoButton =
        document.getElementById("demoBtn");

    const forgotButton =
        document.getElementById("forgotPasswordBtn");


    if (showRegister) {

        showRegister.addEventListener(
            "click",
            () => {

                showScreen("registerPage");

            }
        );

    }


    if (showLogin) {

        showLogin.addEventListener(
            "click",
            () => {

                showScreen("loginPage");

            }
        );

    }


    if (demoButton) {

        demoButton.addEventListener(
            "click",
            () => {

                enterDashboardWithoutFakeData();

            }
        );

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            handleRegistration
        );

    }


    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            handleForgotPassword
        );

    }


    const logoutButtons = [

        document.getElementById("sideLogoutBtn"),
        document.getElementById("profileLogoutBtn")

    ];


    logoutButtons.forEach(button => {

        if (button) {

            button.addEventListener(
                "click",
                logoutUser
            );

        }

    });

}


/* =========================================================
   REGISTRATION
========================================================= */

async function handleRegistration(event) {

    event.preventDefault();

    const message =
        document.getElementById("registerMessage");


    if (!firebaseReady) {

        showMessage(
            message,
            "Firebase is not configured. Add your Firebase configuration first.",
            "error"
        );

        return;

    }


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
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        await user.updateProfile({
            displayName: name
        });


        selectedLanguage = language;

        applyLanguage(language);


        showMessage(
            message,
            "Account created successfully.",
            "success"
        );


        setTimeout(() => {

            loadUserDashboard(user);

        }, 800);


    } catch (error) {

        console.error(error);

        showMessage(
            message,
            error.message,
            "error"
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function handleLogin(event) {

    event.preventDefault();

    const message =
        document.getElementById("loginMessage");


    if (!firebaseReady) {

        showMessage(
            message,
            "Firebase is not configured. Add your Firebase configuration first.",
            "error"
        );

        return;

    }


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    try {

        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        loadUserDashboard(result.user);


    } catch (error) {

        console.error(error);

        showMessage(
            message,
            error.message,
            "error"
        );

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function handleForgotPassword() {

    if (!firebaseReady) {

        alert(
            "Firebase is not configured yet."
        );

        return;

    }


    const email =
        document.getElementById("loginEmail").value.trim();


    if (!email) {

        alert(
            "Please enter your email address first."
        );

        return;

    }


    try {

        await auth.sendPasswordResetEmail(email);

        alert(
            "Password reset email sent."
        );

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/* =========================================================
   LOAD USER DASHBOARD
========================================================= */

async function loadUserDashboard(user) {

    currentUser = user;

    await loadFarmerData(user.uid);

    showScreen("dashboardPage");

    updateConnectionStatus();

}


/* =========================================================
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData(uid) {

    currentFarmerData = null;


    if (!firebaseReady || !db || !uid) {

        updateFarmerUI();

        return;

    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (snapshot.exists) {

            currentFarmerData =
                snapshot.data();

        }


        updateFarmerUI();


    } catch (error) {

        console.error(
            "Error loading farmer data:",
            error
        );

        currentFarmerData = null;

        updateFarmerUI();

    }

}


/* =========================================================
   UPDATE FARMER UI
========================================================= */

function updateFarmerUI() {

    const data =
        currentFarmerData;


    const name =
        data && data.name
            ? data.name
            : currentUser && currentUser.displayName
                ? currentUser.displayName
                : "Farmer";


    const email =
        data && data.email
            ? data.email
            : currentUser && currentUser.email
                ? currentUser.email
                : "—";


    const village =
        data && data.village
            ? data.village
            : "—";


    const landArea =
        data && data.landArea
            ? data.landArea
            : "—";


    const market =
        data && data.preferredMarket
            ? data.preferredMarket
            : "—";


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
        data?.mobile || ""
    );

    setValue(
        "profileVillage",
        data?.village || ""
    );

    setValue(
        "profileState",
        data?.state || ""
    );

    setValue(
        "profileLandArea",
        data?.landArea || ""
    );

    setValue(
        "profileMarket",
        data?.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        data?.preferredLanguage || selectedLanguage
    );

}


/* =========================================================
   PROFILE
========================================================= */

function setupProfile() {

    const editButton =
        document.getElementById("editProfileBtn");

    const cancelButton =
        document.getElementById("cancelProfileEditBtn");

    const profileForm =
        document.getElementById("profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            enableProfileEditing
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            () => {

                disableProfileEditing();

                updateFarmerUI();

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


/* =========================================================
   ENABLE PROFILE EDIT
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
        document.getElementById("profileEditActions");

    if (actions) {
        actions.classList.remove("hidden");
    }

}


/* =========================================================
   DISABLE PROFILE EDIT
========================================================= */

function disableProfileEditing() {

    const fields = [

        "profileName",
        "profileEmail",
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
        document.getElementById("profileEditActions");

    if (actions) {
        actions.classList.add("hidden");
    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    const message =
        document.getElementById("profileMessage");


    if (!firebaseReady || !currentUser) {

        showMessage(
            message,
            "You must be logged in with a connected Firebase account.",
            "error"
        );

        return;

    }


    const updatedData = {

        name:
            document.getElementById("profileName").value.trim(),

        mobile:
            document.getElementById("profileMobile").value.trim(),

        village:
            document.getElementById("profileVillage").value.trim(),

        state:
            document.getElementById("profileState").value.trim(),

        landArea:
            document.getElementById("profileLandArea").value.trim(),

        preferredMarket:
            document.getElementById("profileMarket").value,

        preferredLanguage:
            document.getElementById("profileLanguage").value

    };


    try {

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update(updatedData);


        await currentUser.updateProfile({

            displayName:
                updatedData.name

        });


        currentFarmerData = {

            ...currentFarmerData,
            ...updatedData

        };


        selectedLanguage =
            updatedData.preferredLanguage;


        applyLanguage(
            selectedLanguage
        );


        updateFarmerUI();

        disableProfileEditing();


        showMessage(
            message,
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            message,
            error.message,
            "error"
        );

    }

}


/* =========================================================
   DEMO DASHBOARD
   No fake farmer data
========================================================= */

function enterDashboardWithoutFakeData() {

    currentUser = null;

    currentFarmerData = null;

    showScreen("dashboardPage");

    updateFarmerUI();

    updateConnectionStatus();

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (firebaseReady && auth) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(error);

    }


    currentUser = null;
    currentFarmerData = null;


    closeProfileMenu();


    showScreen("loginPage");

}


/* =========================================================
   DASHBOARD
========================================================= */

function setupDashboard() {

    const profileButton =
        document.getElementById("profileButton");

    const profileMenu =
        document.getElementById("profileMenu");


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (profileMenu) {

                    profileMenu.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                profileMenu &&
                !profileMenu.contains(event.target) &&
                event.target !== profileButton
            ) {

                closeProfileMenu();

            }

        }
    );

}


/* =========================================================
   CLOSE PROFILE MENU
========================================================= */

function closeProfileMenu() {

    const profileMenu =
        document.getElementById("profileMenu");

    if (profileMenu) {

        profileMenu.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   MARKET
========================================================= */

function setupMarket() {

    const selector =
        document.getElementById("cropPriceSelector");


    if (selector) {

        selector.addEventListener(
            "change",
            event => {

                selectedCrop =
                    event.target.value;

                loadMarketData();

            }
        );

    }


    loadMarketData();

}


/* =========================================================
   MARKET DATA
   IMPORTANT:
   No fake/fallback prices
========================================================= */

async function loadMarketData() {

    const tableBody =
        document.getElementById("marketTableBody");


    if (!tableBody) return;


    showMarketUnavailable(
        tableBody
    );


    /*
       Real backend/API connection should be
       added here.

       We intentionally DO NOT insert fake prices.
    */

    console.log(
        "Waiting for verified market data for:",
        selectedCrop
    );

}


/* =========================================================
   MARKET EMPTY STATE
========================================================= */

function showMarketUnavailable(tableBody) {

    const dictionary =
        translations[selectedLanguage || "en"];


    tableBody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${
                            dictionary.marketDataUnavailable
                        }
                    </strong>

                    <p>
                        ${
                            dictionary.marketDataUnavailableDescription
                        }
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   WEATHER
========================================================= */

function setupWeather() {

    const refreshButton =
        document.getElementById("refreshWeatherBtn");


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            loadWeatherData
        );

    }


    loadWeatherData();

}


/* =========================================================
   WEATHER DATA
   IMPORTANT:
   No fake/fallback weather
========================================================= */

async function loadWeatherData() {

    const emptyState =
        document.getElementById("weatherEmptyState");

    const weatherData =
        document.getElementById("weatherData");


    if (emptyState) {

        emptyState.classList.remove(
            "hidden"
        );

    }


    if (weatherData) {

        weatherData.classList.add(
            "hidden"
        );

    }


    /*
       Real weather API/backend connection
       will be added here.

       No fake weather values are inserted.
    */

    console.log(
        "Waiting for verified weather data."
    );

}


/* =========================================================
   CROP HEALTH
========================================================= */

function setupCropHealth() {

    const imageInput =
        document.getElementById("cropImageInput");

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


    if (!imageInput) return;


    imageInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                if (previewContainer) {
                    previewContainer.classList.add(
                        "hidden"
                    );
                }

                if (analyzeButton) {
                    analyzeButton.disabled = true;
                }

                return;

            }


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

                    analyzeButton.disabled =
                        false;

                }

            };


            reader.readAsDataURL(file);

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

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    if (!result) return;


    const dictionary =
        translations[selectedLanguage || "en"];


    result.innerHTML = `

        <strong>
            ${dictionary.analysisNotConnected}
        </strong>

        <p>
            ${dictionary.analysisNotConnectedDescription}
        </p>

    `;


    /*
       No fake AI disease result is generated.

       Connect your real AI backend here.
    */

}


/* =========================================================
   AI SYSTEM
========================================================= */

function setupAISystem() {

    const form =
        document.getElementById("aiForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const input =
                document.getElementById("aiInput");

            const value =
                input.value.trim();


            if (!value) return;


            addChatMessage(
                value,
                "user"
            );


            input.value = "";


            const dictionary =
                translations[selectedLanguage || "en"];


            addChatMessage(
                dictionary.aiUnavailable,
                "assistant"
            );

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

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) return;


    const message =
        document.createElement("div");


    message.className =
        `chat-message ${
            type === "user"
                ? "user-message"
                : "assistant-message"
        }`;


    message.innerHTML = `

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
                        ? "You"
                        : translations[
                            selectedLanguage || "en"
                        ].assistant
                }
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    container.appendChild(message);


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   VOICE SYSTEM
========================================================= */

function setupVoiceSystem() {

    const startButton =
        document.getElementById(
            "startVoiceBtn"
        );

    const stopButton =
        document.getElementById(
            "stopVoiceBtn"
        );

    const voiceInput =
        document.getElementById(
            "voiceInput"
        );


    if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
    ) {

        console.log(
            "Speech recognition is not supported."
        );

        return;

    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;
    recognition.interimResults = false;


    updateRecognitionLanguage();


    recognition.onstart = () => {

        isListening = true;


        if (startButton) {
            startButton.classList.add(
                "hidden"
            );
        }


        if (stopButton) {
            stopButton.classList.remove(
                "hidden"
            );
        }

    };


    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;


        if (voiceInput) {

            voiceInput.value =
                transcript;

        }


        const response =
            document.getElementById(
                "voiceResponse"
            );


        if (response) {

            response.textContent =
                translations[
                    selectedLanguage || "en"
                ].aiUnavailable;

        }

    };


    recognition.onerror = error => {

        console.error(
            "Voice recognition error:",
            error
        );

    };


    recognition.onend = () => {

        isListening = false;


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

    };


    if (startButton) {

        startButton.addEventListener(
            "click",
            startVoice
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            stopVoice
        );

    }

}


/* =========================================================
   VOICE LANGUAGE
========================================================= */

function updateRecognitionLanguage() {

    if (!recognition) return;


    if (selectedLanguage === "hi") {

        recognition.lang = "hi-IN";

    } else if (selectedLanguage === "mr") {

        recognition.lang = "mr-IN";

    } else {

        recognition.lang = "en-IN";

    }

}


/* =========================================================
   START VOICE
========================================================= */

function startVoice() {

    if (!recognition) {

        alert(
            "Voice recognition is not supported by this browser."
        );

        return;

    }


    updateRecognitionLanguage();


    try {

        recognition.start();

    } catch (error) {

        console.error(error);

    }

}


/* =========================================================
   STOP VOICE
========================================================= */

function stopVoice() {

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();

    }

}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );

    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    if (voiceSetting) {

        const savedVoice =
            localStorage.getItem(
                "smartAgriVoice"
            );


        if (savedVoice !== null) {

            voiceSetting.checked =
                savedVoice === "true";

        }


        voiceSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartAgriVoice",
                    voiceSetting.checked
                );

            }
        );

    }


    if (notificationSetting) {

        const savedNotifications =
            localStorage.getItem(
                "smartAgriNotifications"
            );


        if (savedNotifications !== null) {

            notificationSetting.checked =
                savedNotifications === "true";

        }


        notificationSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartAgriNotifications",
                    notificationSetting.checked
                );

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
                () => {

                    const url =
                        button.dataset.schemeUrl;


                    if (url) {

                        window.open(
                            url,
                            "_blank"
                        );

                    }

                }
            );

        });

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function setupConnectionStatus() {

    window.addEventListener(
        "online",
        updateConnectionStatus
    );

    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    updateConnectionStatus();

}


/* =========================================================
   UPDATE CONNECTION STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


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


    const dictionary =
        translations[selectedLanguage || "en"];


    if (text) {

        text.textContent =
            online
                ? dictionary.online
                : dictionary.offline;

    }


    if (dashboardText) {

        dashboardText.textContent =
            online
                ? dictionary.online
                : dictionary.offline;

    }

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

if (
    typeof firebase !== "undefined" &&
    firebaseReady &&
    auth
) {

    auth.onAuthStateChanged(
        user => {

            if (user) {

                currentUser = user;

                loadFarmerData(
                    user.uid
                );

            }

        }
    );

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
            value;

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
            value;

    }

}


function showMessage(
    element,
    text,
    type
) {

    if (!element) return;


    element.textContent =
        text;


    element.className =
        `message ${type}`;


    setTimeout(() => {

        element.textContent =
            "";

        element.className =
            "message";

    }, 5000);

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   DEBUG INFORMATION
========================================================= */

console.log(
    "SmartAgri loaded."
);

console.log(
    "Selected language:",
    selectedLanguage
);

console.log(
    "Firebase ready:",
    firebaseReady
);

console.log(
    "No fake market/weather fallback values are used."
);
