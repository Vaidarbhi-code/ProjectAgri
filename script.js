/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   Language: English / Hindi / Marathi
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

        console.log("Firebase initialized successfully.");

    } else {
        console.warn("Firebase SDK not loaded.");
    }

} catch (error) {
    console.error("Firebase initialization error:", error);
}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedLanguage = localStorage.getItem("smartAgriLanguage") || "en";
let currentUser = null;
let currentUserData = null;


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
        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",

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

        connectionStatus: "Connection Status",
        offline: "Offline",
        online: "Online",

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

        onion: "Onion",
        wheat: "Wheat",

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

        analysisNotConnected: "AI crop analysis is not connected",
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

        voiceInputPlaceholder:
            "Voice input will appear here...",

        voiceResponse: "Voice Response",

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

        noAccount: "खाता नहीं है?",
        register: "पंजीकरण करें",
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
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंदीदा भाषा",
        createAccount: "खाता बनाएं",
        alreadyAccount: "पहले से खाता है?",

        dashboard: "डैशबोर्ड",
        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी कृषि संबंधी जानकारी एक ही स्थान पर।",

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

        connectionStatus: "कनेक्शन स्थिति",
        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरणों तक जल्दी पहुंचें।",

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

        marketPriceTable: "बाजार भाव तालिका",

        onion: "प्याज",
        wheat: "गेहूं",

        market: "बाजार",
        crop: "फसल",
        price: "कीमत",
        date: "तारीख",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन संबंधी मार्गदर्शन।",

        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",

        cultivationGuidance: "खेती का मार्गदर्शन",
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
            "विश्लेषण प्रदर्शित करने से पहले सत्यापित फसल-स्वास्थ्य AI सेवा कनेक्ट करें।",

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

        aiSubtitle:
            "कृषि से संबंधित प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

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
            "स्मार्ट वॉयस सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice:
            "वॉयस सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "वॉयस इनपुट",

        voiceInputPlaceholder:
            "वॉयस इनपुट यहां दिखाई देगा...",

        voiceResponse:
            "वॉयस प्रतिक्रिया",

        voiceReady:
            "वॉयस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "बदलाव सेव करें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "अपनी SmartAgri प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "वॉयस सहायता को सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाओं को सक्षम या अक्षम करें।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता उपलब्ध कराने के लिए बनाया गया है।"
    },


    mr: {

        appName: "स्मार्ट ॲग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "आपली भाषा निवडा",
        languageDescription:
            "पुढे जाण्यासाठी आपली आवडती भाषा निवडा.",
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
        demoDashboard: "डेमो डॅशबोर्ड उघडा",

        noAccount: "खाते नाही?",
        register: "नोंदणी करा",
        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle:
            "आपले SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
        mobile: "मोबाईल क्रमांक",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्रफळ",
        preferredMarket: "पसंतीचे बाजार",

        selectMarket: "बाजार निवडा",
        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंतीची भाषा",
        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीपासून खाते आहे?",

        dashboard: "डॅशबोर्ड",
        welcome: "स्वागत आहे",
        dashboardSubtitle:
            "आपली शेतीविषयक माहिती एका ठिकाणी.",

        weather: "हवामान",
        marketPrices: "बाजार भाव",
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

        myProfile: "माझे प्रोफाइल",

        connectionStatus: "कनेक्शन स्थिती",
        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        profileSummary:
            "आपली नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाच्या शेती साधनांपर्यंत जलद पोहोचा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",

        currentWeather:
            "सध्याचे हवामान",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "कोणताही सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        temperature:
            "तापमान",

        humidity:
            "आर्द्रता",

        windSpeed:
            "वाऱ्याचा वेग",

        rainChance:
            "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक दर.",

        marketPriceTable:
            "बाजार भाव तक्ता",

        onion:
            "कांदा",

        wheat:
            "गहू",

        market:
            "बाजार",

        crop:
            "पीक",

        price:
            "दर",

        date:
            "तारीख",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "कोणताही सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्री करण्यापूर्वी बाजारातील माहितीची तुलना करा.",

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
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण प्रदर्शित करण्यापूर्वी सत्यापित पीक-आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री पीक विमा योजनेची अधिकृत माहिती.",

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
            "आपल्या SmartAgri पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "आपली पसंतीची अॅप्लिकेशन भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप्लिकेशन सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार केले आहे."
    }
};


/* =========================================================
   LANGUAGE FUNCTION
========================================================= */

function setLanguage(language) {

    if (!translations[language]) {
        console.warn("Language not found:", language);
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );

    document.documentElement.lang = language;

    const languageData = translations[language];


    /* -----------------------------------------------------
       TRANSLATE data-i18n ELEMENTS
    ----------------------------------------------------- */

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (
            languageData[key] !== undefined &&
            languageData[key] !== null
        ) {
            element.textContent = languageData[key];
        }

    });


    /* -----------------------------------------------------
       TRANSLATE PLACEHOLDERS
    ----------------------------------------------------- */

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.getAttribute(
            "data-i18n-placeholder"
        );

        if (languageData[key] !== undefined) {
            element.placeholder = languageData[key];
        }

    });


    /* -----------------------------------------------------
       UPDATE ALL LANGUAGE SELECTORS
    ----------------------------------------------------- */

    const selectors = [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ];

    selectors.forEach(id => {

        const select = document.getElementById(id);

        if (select) {
            select.value = language;
        }

    });


    /* -----------------------------------------------------
       LANGUAGE BUTTON VISUAL STATE
    ----------------------------------------------------- */

    document.querySelectorAll(".language-option").forEach(button => {

        const buttonLanguage =
            button.getAttribute("data-language");

        button.classList.toggle(
            "selected",
            buttonLanguage === language
        );

    });


    /* -----------------------------------------------------
       CONTINUE BUTTON
    ----------------------------------------------------- */

    const continueBtn =
        document.getElementById("continueLanguageBtn");

    if (continueBtn) {
        continueBtn.disabled = false;
    }


    console.log(
        "SmartAgri language changed to:",
        language
    );
}


/* =========================================================
   SHOW SCREEN
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.add("active-screen");
    }
}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function initializeLanguagePage() {

    const languageButtons =
        document.querySelectorAll(".language-option");

    const continueButton =
        document.getElementById("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", function () {

            const language =
                this.getAttribute("data-language");

            console.log(
                "Language selected:",
                language
            );

            setLanguage(language);

            languageButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            this.classList.add("selected");

            if (continueButton) {
                continueButton.disabled = false;
            }

        });

    });


    if (continueButton) {

        continueButton.addEventListener("click", function () {

            if (!selectedLanguage) {
                return;
            }

            showScreen("loginPage");

        });

    }
}


/* =========================================================
   LOGIN / REGISTER NAVIGATION
========================================================= */

function initializeAuthNavigation() {

    const showRegisterBtn =
        document.getElementById("showRegisterBtn");

    const showLoginBtn =
        document.getElementById("showLoginBtn");

    const changeLanguageBtn =
        document.getElementById("changeLanguageFromLogin");


    if (showRegisterBtn) {

        showRegisterBtn.addEventListener(
            "click",
            () => showScreen("registerPage")
        );

    }


    if (showLoginBtn) {

        showLoginBtn.addEventListener(
            "click",
            () => showScreen("loginPage")
        );

    }


    if (changeLanguageBtn) {

        changeLanguageBtn.addEventListener(
            "click",
            () => showScreen("languagePage")
        );

    }

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function initializeDemo() {

    const demoBtn =
        document.getElementById("demoBtn");

    if (!demoBtn) return;


    demoBtn.addEventListener("click", function () {

        currentUser = null;

        currentUserData = {

            name: "Demo Farmer",
            email: "demo@smartagri.com",
            mobile: "9999999999",
            village: "Kopargaon",
            state: "Maharashtra",
            landArea: "5 Acres",
            preferredMarket: "Kopargaon APMC",
            language: selectedLanguage

        };

        openDashboard();

    });

}


/* =========================================================
   OPEN DASHBOARD
========================================================= */

function openDashboard() {

    document
        .getElementById("dashboardPage")
        ?.classList.add("active-dashboard");

    document
        .getElementById("dashboardPage")
        ?.classList.remove("hidden");

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });


    updateDashboardProfile();

    setOnlineStatus(false);

    showSection("dashboardSection");

}


/* =========================================================
   CLOSE DASHBOARD
========================================================= */

function closeDashboard() {

    const dashboard =
        document.getElementById("dashboardPage");

    if (dashboard) {
        dashboard.classList.remove("active-dashboard");
    }

    showScreen("loginPage");

}


/* =========================================================
   DASHBOARD PROFILE
========================================================= */

function updateDashboardProfile() {

    if (!currentUserData) {
        return;
    }

    const data = currentUserData;


    setText(
        "headerFarmerName",
        data.name || "—"
    );

    setText(
        "dashboardFarmerName",
        data.name || "—"
    );

    setText(
        "summaryName",
        data.name || "—"
    );

    setText(
        "summaryVillage",
        data.village || "—"
    );

    setText(
        "summaryLand",
        data.landArea || "—"
    );

    setText(
        "summaryMarket",
        data.preferredMarket || "—"
    );


    setText(
        "profilePageName",
        data.name || "—"
    );

    setText(
        "profilePageEmail",
        data.email || "—"
    );


    setValue(
        "profileName",
        data.name || ""
    );

    setValue(
        "profileEmail",
        data.email || ""
    );

    setValue(
        "profileMobile",
        data.mobile || ""
    );

    setValue(
        "profileVillage",
        data.village || ""
    );

    setValue(
        "profileState",
        data.state || ""
    );

    setValue(
        "profileLandArea",
        data.landArea || ""
    );

    setValue(
        "profileMarket",
        data.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        data.language || selectedLanguage
    );

}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.value = value;
    }

}


/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".app-section").forEach(section => {

        section.classList.remove("active-section");

    });


    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.add("active-section");
    }


    closeSideMenu();

    closeProfileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   INITIALIZE DASHBOARD NAVIGATION
========================================================= */

function initializeDashboardNavigation() {

    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener("click", function () {

                const section =
                    this.getAttribute("data-section");

                if (section) {
                    showSection(section);
                }

            });

        });


    document
        .querySelectorAll("[data-profile-section]")
        .forEach(button => {

            button.addEventListener("click", function () {

                const section =
                    this.getAttribute(
                        "data-profile-section"
                    );

                if (section) {
                    showSection(section);
                }

            });

        });

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    document
        .getElementById("sideMenu")
        ?.classList.add("open");

    document
        .getElementById("menuOverlay")
        ?.classList.add("active");

}


function closeSideMenu() {

    document
        .getElementById("sideMenu")
        ?.classList.remove("open");

    document
        .getElementById("menuOverlay")
        ?.classList.remove("active");

}


function initializeSideMenu() {

    const hamburger =
        document.getElementById("hamburgerBtn");

    const closeBtn =
        document.getElementById("closeMenuBtn");

    const overlay =
        document.getElementById("menuOverlay");


    hamburger?.addEventListener(
        "click",
        openSideMenu
    );

    closeBtn?.addEventListener(
        "click",
        closeSideMenu
    );

    overlay?.addEventListener(
        "click",
        closeSideMenu
    );

}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    document
        .getElementById("profileMenu")
        ?.classList.toggle("active");

}


function closeProfileMenu() {

    document
        .getElementById("profileMenu")
        ?.classList.remove("active");

}


function initializeProfileMenu() {

    const profileButton =
        document.getElementById("profileButton");


    profileButton?.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleProfileMenu();

        }
    );


    document.addEventListener(
        "click",
        function () {

            closeProfileMenu();

        }
    );


    document
        .getElementById("profileMenu")
        ?.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function initializeLanguageSelectors() {

    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    const settingsLanguage =
        document.getElementById("settingsLanguage");

    const registerLanguage =
        document.getElementById("registerLanguage");

    const profileLanguage =
        document.getElementById("profileLanguage");


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            function () {

                setLanguage(this.value);

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            function () {

                setLanguage(this.value);

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function () {

                setLanguage(this.value);

            }
        );

    }


    if (profileLanguage) {

        profileLanguage.addEventListener(
            "change",
            function () {

                setLanguage(this.value);

                if (currentUserData) {
                    currentUserData.language = this.value;
                }

            }
        );

    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function setOnlineStatus(isOnline) {

    const connectionStatus =
        document.getElementById("connectionStatus");

    const connectionText =
        document.getElementById("connectionText");

    const dashboardConnectionText =
        document.getElementById(
            "dashboardConnectionText"
        );


    if (connectionStatus) {

        connectionStatus.classList.toggle(
            "online",
            isOnline
        );

        connectionStatus.classList.toggle(
            "offline",
            !isOnline
        );

    }


    const text =
        isOnline
            ? translations[selectedLanguage].online
            : translations[selectedLanguage].offline;


    if (connectionText) {
        connectionText.textContent = text;
    }


    if (dashboardConnectionText) {
        dashboardConnectionText.textContent = text;
    }

}


/* =========================================================
   FIREBASE LOGIN
========================================================= */

function initializeLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) return;


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )?.value.trim();

            const password =
                document.getElementById(
                    "loginPassword"
                )?.value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (!firebaseReady || !auth) {

                showMessage(
                    message,
                    "Firebase is not connected.",
                    "error"
                );

                return;

            }


            try {

                const credential =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    credential.user;


                await loadUserData(
                    currentUser.uid
                );


                showMessage(
                    message,
                    "Login successful.",
                    "success"
                );


                openDashboard();


            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   FIREBASE REGISTRATION
========================================================= */

function initializeRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const message =
                document.getElementById(
                    "registerMessage"
                );


            const name =
                document.getElementById(
                    "registerName"
                )?.value.trim();

            const email =
                document.getElementById(
                    "registerEmail"
                )?.value.trim();

            const mobile =
                document.getElementById(
                    "registerMobile"
                )?.value.trim();

            const village =
                document.getElementById(
                    "registerVillage"
                )?.value.trim();

            const state =
                document.getElementById(
                    "registerState"
                )?.value.trim();

            const landArea =
                document.getElementById(
                    "registerLandArea"
                )?.value.trim();

            const preferredMarket =
                document.getElementById(
                    "registerMarket"
                )?.value;

            const language =
                document.getElementById(
                    "registerLanguage"
                )?.value || selectedLanguage;

            const password =
                document.getElementById(
                    "registerPassword"
                )?.value;


            if (!firebaseReady || !auth || !db) {

                showMessage(
                    message,
                    "Firebase is not connected.",
                    "error"
                );

                return;

            }


            try {

                const credential =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    credential.user;


                const userData = {

                    name,
                    email,
                    mobile,
                    village,
                    state,
                    landArea,
                    preferredMarket,
                    language,

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                await db
                    .collection("users")
                    .doc(user.uid)
                    .set(userData);


                currentUser = user;

                currentUserData = userData;


                setLanguage(language);


                showMessage(
                    message,
                    "Account created successfully.",
                    "success"
                );


                setTimeout(
                    () => openDashboard(),
                    700
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   LOAD USER DATA
========================================================= */

async function loadUserData(uid) {

    if (!db) return;


    try {

        const snapshot =
            await db
                .collection("users")
                .doc(uid)
                .get();


        if (snapshot.exists) {

            currentUserData =
                snapshot.data();


            if (currentUserData.language) {

                setLanguage(
                    currentUserData.language
                );

            }

        } else {

            currentUserData = {

                name:
                    currentUser?.email || "Farmer",

                email:
                    currentUser?.email || "",

                language:
                    selectedLanguage

            };

        }

    } catch (error) {

        console.error(
            "Could not load user data:",
            error
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    const code = error?.code || "";


    const messages = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-not-found":
            "No account found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/email-already-in-use":
            "An account with this email already exists.",

        "auth/weak-password":
            "Password must contain at least 6 characters.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection."

    };


    return messages[code] ||
        error?.message ||
        "Something went wrong.";
}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(element, text, type) {

    if (!element) return;


    element.textContent = text;

    element.className =
        "message " + type;

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function initializeForgotPassword() {

    const button =
        document.getElementById(
            "forgotPasswordBtn"
        );


    button?.addEventListener(
        "click",
        async function () {

            const email =
                document.getElementById(
                    "loginEmail"
                )?.value.trim();


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


            if (!auth) {

                showMessage(
                    message,
                    "Firebase is not connected.",
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
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (auth && currentUser) {
            await auth.signOut();
        }

    } catch (error) {

        console.error(error);

    }


    currentUser = null;
    currentUserData = null;


    closeSideMenu();
    closeProfileMenu();


    document
        .getElementById("dashboardPage")
        ?.classList.remove(
            "active-dashboard"
        );


    showScreen("loginPage");

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function initializeLogout() {

    document
        .getElementById("sideLogoutBtn")
        ?.addEventListener(
            "click",
            logout
        );


    document
        .getElementById("profileLogoutBtn")
        ?.addEventListener(
            "click",
            logout
        );

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function initializeProfileEditing() {

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );

    const cancelButton =
        document.getElementById(
            "cancelProfileEditBtn"
        );

    const form =
        document.getElementById(
            "profileForm"
        );

    const actions =
        document.getElementById(
            "profileEditActions"
        );


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


    function enableEditing() {

        fields.forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.disabled = false;
            }

        });


        actions?.classList.remove("hidden");

    }


    function disableEditing() {

        fields.forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.disabled = true;
            }

        });


        actions?.classList.add("hidden");

    }


    editButton?.addEventListener(
        "click",
        enableEditing
    );


    cancelButton?.addEventListener(
        "click",
        function () {

            updateDashboardProfile();

            disableEditing();

        }
    );


    form?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const updatedData = {

                name:
                    document.getElementById(
                        "profileName"
                    )?.value.trim(),

                mobile:
                    document.getElementById(
                        "profileMobile"
                    )?.value.trim(),

                village:
                    document.getElementById(
                        "profileVillage"
                    )?.value.trim(),

                state:
                    document.getElementById(
                        "profileState"
                    )?.value.trim(),

                landArea:
                    document.getElementById(
                        "profileLandArea"
                    )?.value.trim(),

                preferredMarket:
                    document.getElementById(
                        "profileMarket"
                    )?.value,

                language:
                    document.getElementById(
                        "profileLanguage"
                    )?.value

            };


            try {

                if (
                    firebaseReady &&
                    currentUser &&
                    db
                ) {

                    await db
                        .collection("users")
                        .doc(currentUser.uid)
                        .update(updatedData);

                }


                currentUserData = {
                    ...currentUserData,
                    ...updatedData
                };


                setLanguage(
                    updatedData.language
                );


                updateDashboardProfile();


                showMessage(
                    document.getElementById(
                        "profileMessage"
                    ),
                    "Profile updated successfully.",
                    "success"
                );


                disableEditing();


            } catch (error) {

                console.error(error);

                showMessage(
                    document.getElementById(
                        "profileMessage"
                    ),
                    error.message,
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   WEATHER
========================================================= */

function initializeWeather() {

    const refreshButton =
        document.getElementById(
            "refreshWeatherBtn"
        );


    refreshButton?.addEventListener(
        "click",
        function () {

            console.log(
                "Weather refresh requested."
            );

        }
    );

}


/* =========================================================
   MARKET SELECTOR
========================================================= */

function initializeMarketSelector() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    selector?.addEventListener(
        "change",
        function () {

            console.log(
                "Selected crop:",
                this.value
            );

        }
    );

}


/* =========================================================
   CROP IMAGE
========================================================= */

function initializeCropHealth() {

    const input =
        document.getElementById(
            "cropImageInput"
        );

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


    input?.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    if (preview) {
                        preview.src =
                            event.target.result;
                    }

                    previewContainer
                        ?.classList
                        .remove("hidden");

                    if (analyzeButton) {
                        analyzeButton.disabled = false;
                    }

                };


            reader.readAsDataURL(file);

        }
    );


    analyzeButton?.addEventListener(
        "click",
        function () {

            const result =
                document.getElementById(
                    "cropAnalysisResult"
                );


            if (result) {

                result.innerHTML = `

                    <strong>
                        AI crop analysis is not connected
                    </strong>

                    <p>
                        Connect a verified crop-health
                        AI service before displaying analysis.
                    </p>

                `;

            }

        }
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function initializeAI() {

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


    form?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const question =
                input?.value.trim();


            if (!question) {
                return;
            }


            const userMessage =
                document.createElement("div");

            userMessage.className =
                "chat-message user-message";


            userMessage.innerHTML = `

                <div class="chat-avatar">
                    👨‍🌾
                </div>

                <div>

                    <strong>
                        You
                    </strong>

                    <p></p>

                </div>

            `;


            userMessage.querySelector("p")
                .textContent = question;


            messages?.appendChild(
                userMessage
            );


            input.value = "";


            const assistantMessage =
                document.createElement("div");

            assistantMessage.className =
                "chat-message assistant-message";


            assistantMessage.innerHTML = `

                <div class="chat-avatar">
                    🤖
                </div>

                <div>

                    <strong>
                        ${translations[selectedLanguage].assistant}
                    </strong>

                    <p>
                        ${translations[selectedLanguage].aiUnavailable}
                    </p>

                </div>

            `;


            messages?.appendChild(
                assistantMessage
            );


            messages?.scrollTo({
                top: messages.scrollHeight,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function initializeVoice() {

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

    const voiceResponse =
        document.getElementById(
            "voiceResponse"
        );


    let recognition = null;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        recognition =
            new SpeechRecognition();


        recognition.continuous = false;
        recognition.interimResults = false;


        recognition.onresult =
            function (event) {

                const transcript =
                    event.results[0][0].transcript;


                if (voiceInput) {
                    voiceInput.value =
                        transcript;
                }


                if (voiceResponse) {
                    voiceResponse.textContent =
                        transcript;
                }

            };


        recognition.onend =
            function () {

                startButton
                    ?.classList
                    .remove("hidden");

                stopButton
                    ?.classList
                    .add("hidden");

            };

    }


    startButton?.addEventListener(
        "click",
        function () {

            if (!recognition) {

                if (voiceResponse) {

                    voiceResponse.textContent =
                        "Speech recognition is not supported by this browser.";

                }

                return;

            }


            recognition.lang =
                selectedLanguage === "hi"
                    ? "hi-IN"
                    : selectedLanguage === "mr"
                        ? "mr-IN"
                        : "en-IN";


            recognition.start();


            startButton
                ?.classList
                .add("hidden");

            stopButton
                ?.classList
                .remove("hidden");

        }
    );


    stopButton?.addEventListener(
        "click",
        function () {

            recognition?.stop();

        }
    );

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function initializeSchemes() {

    document
        .querySelectorAll(".scheme-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const url =
                        this.getAttribute(
                            "data-scheme-url"
                        );

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
   SETTINGS
========================================================= */

function initializeSettings() {

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );

    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    voiceSetting?.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "smartAgriVoice",
                this.checked
            );

        }
    );


    notificationSetting?.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "smartAgriNotifications",
                this.checked
            );

        }
    );


    const savedVoice =
        localStorage.getItem(
            "smartAgriVoice"
        );

    if (savedVoice !== null && voiceSetting) {
        voiceSetting.checked =
            savedVoice === "true";
    }


    const savedNotifications =
        localStorage.getItem(
            "smartAgriNotifications"
        );

    if (
        savedNotifications !== null &&
        notificationSetting
    ) {

        notificationSetting.checked =
            savedNotifications === "true";

    }

}


/* =========================================================
   AUTH STATE
========================================================= */

function initializeAuthState() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser = user;

                await loadUserData(
                    user.uid
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri application starting..."
        );


        /* FIRST: APPLY SAVED LANGUAGE */

        setLanguage(
            selectedLanguage
        );


        /* LANGUAGE */

        initializeLanguagePage();

        initializeLanguageSelectors();


        /* AUTH */

        initializeAuthNavigation();

        initializeLogin();

        initializeRegistration();

        initializeForgotPassword();

        initializeAuthState();


        /* DEMO */

        initializeDemo();


        /* DASHBOARD */

        initializeDashboardNavigation();

        initializeSideMenu();

        initializeProfileMenu();

        initializeLogout();

        initializeProfileEditing();


        /* FEATURES */

        initializeWeather();

        initializeMarketSelector();

        initializeCropHealth();

        initializeAI();

        initializeVoice();

        initializeSchemes();

        initializeSettings();


        console.log(
            "SmartAgri application ready."
        );

    }
);
