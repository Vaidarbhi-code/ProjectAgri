/* =========================================================
   SMARTAGRI
   COMPLETE JAVASCRIPT
   Firebase Authentication + Firestore
   No fake/fallback data
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

    console.error("Firebase initialization failed:", error);

    firebaseReady = false;
}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentUser = null;
let currentFarmerData = null;

let selectedLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let selectedRegistrationLanguage = "en";

let editingProfile = false;


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
        preferredLanguage: "Preferred Language",

        selectMarket: "Select Market",

        kopargaonMarket: "Kopargaon APMC",
        yeolaMarket: "Yeola Market",
        shirdiMarket: "Shirdi Market",

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

        offline: "Offline",
        online: "Online",
        connectionStatus: "Connection Status",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle:
            "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription:
            "Only verified connected data is displayed.",

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

        onion: "Onion",
        wheat: "Wheat",

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

        voiceResponse:
            "Voice Response",

        voiceReady:
            "Voice assistance is ready.",

        voiceInputPlaceholder:
            "Voice input will appear here...",

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
        preferredLanguage: "पसंदीदा भाषा",

        selectMarket: "बाजार चुनें",

        kopargaonMarket: "कोपरगांव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

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
        farmerProfile: "किसान प्रोफ़ाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",

        logout: "लॉगआउट",
        myProfile: "मेरी प्रोफ़ाइल",

        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिति",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफ़ाइल संपादित करें",

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

        marketPriceTable: "बाजार मूल्य तालिका",

        market: "बाजार",
        crop: "फसल",
        price: "कीमत",
        date: "तारीख",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले कनेक्टेड बाजार जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onion: "प्याज",
        wheat: "गेहूं",

        onionInfo:
            "प्याज की खेती की जानकारी।",

        wheatInfo:
            "गेहूं की खेती की जानकारी।",

        cultivationGuidance:
            "खेती का मार्गदर्शन",

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

        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

        analysisNotConnected:
            "AI फसल विश्लेषण कनेक्ट नहीं है",

        analysisNotConnectedDescription:
            "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि कार्यक्रम।",

        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",

        learnMore: "अधिक जानें",

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

        voiceResponse:
            "वॉइस प्रतिक्रिया",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        voiceInputPlaceholder:
            "वॉइस इनपुट यहां दिखाई देगा...",

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
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

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
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
        mobile: "मोबाईल नंबर",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्रफळ",
        preferredMarket: "पसंतीची बाजारपेठ",
        preferredLanguage: "पसंतीची भाषा",

        selectMarket: "बाजारपेठ निवडा",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीच खाते आहे?",

        dashboard: "डॅशबोर्ड",
        weather: "हवामान",
        marketPrices: "बाजार भाव",
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
        myProfile: "माझे प्रोफाइल",

        welcome: "स्वागत आहे",
        dashboardSubtitle:
            "तुमची शेतीविषयक माहिती एका ठिकाणी.",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",
        connectionStatus: "कनेक्शन स्थिती",

        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle:
            "महत्त्वाच्या शेती साधनांपर्यंत जलद पोहोचा.",

        liveDataTitle: "थेट डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

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
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक दर.",

        marketPriceTable: "बाजार भाव तक्ता",

        market: "बाजार",
        crop: "पीक",
        price: "दर",
        date: "तारीख",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onion: "कांदा",
        wheat: "गहू",

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
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री पीक विमा योजनेची माहिती.",

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

        voiceResponse:
            "व्हॉइस प्रतिसाद",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

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
            "SmartAgri हे शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."
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

function translatePage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );

    document.documentElement.lang = language;

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key =
            element.getAttribute("data-i18n");

        if (
            translations[language] &&
            translations[language][key] !== undefined
        ) {

            element.textContent =
                translations[language][key];
        }
    });


    const placeholderElements =
        document.querySelectorAll(
            "[data-i18n-placeholder]"
        );

    placeholderElements.forEach(element => {

        const key =
            element.getAttribute(
                "data-i18n-placeholder"
            );

        if (
            translations[language] &&
            translations[language][key] !== undefined
        ) {

            element.placeholder =
                translations[language][key];
        }
    });


    updateLanguageSelectors(language);
}


/* =========================================================
   UPDATE ALL LANGUAGE SELECTORS
========================================================= */

function updateLanguageSelectors(language) {

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("profileLanguage"),
        $("registerLanguage")

    ];

    selectors.forEach(select => {

        if (select) {
            select.value = language;
        }
    });
}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function initializeLanguagePage() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        $("continueLanguageBtn");

    let chosenLanguage =
        localStorage.getItem(
            "smartAgriLanguage"
        );

    if (chosenLanguage) {

        translatePage(chosenLanguage);

        languageButtons.forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language ===
                chosenLanguage
            );

        });

        if (continueButton) {
            continueButton.disabled = false;
        }
    }


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                chosenLanguage =
                    this.dataset.language;

                languageButtons.forEach(btn => {

                    btn.classList.remove(
                        "selected"
                    );

                });

                this.classList.add("selected");

                translatePage(
                    chosenLanguage
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
            function () {

                if (!chosenLanguage) {
                    return;
                }

                localStorage.setItem(
                    "smartAgriLanguage",
                    chosenLanguage
                );

                translatePage(
                    chosenLanguage
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

    const screens =
        document.querySelectorAll(
            ".screen"
        );

    screens.forEach(screen => {

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


/* =========================================================
   DASHBOARD VISIBILITY
========================================================= */

function showDashboard() {

    const dashboard =
        $("dashboardPage");

    if (dashboard) {
        dashboard.style.display = "block";
    }

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });

    closeSideMenu();
    closeProfileMenu();
}


/* =========================================================
   HIDE DASHBOARD
========================================================= */

function hideDashboard() {

    const dashboard =
        $("dashboardPage");

    if (dashboard) {
        dashboard.style.display = "none";
    }
}


/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {
        return "An unknown error occurred.";
    }

    switch (error.code) {

        case "auth/email-already-in-use":
            return "This email is already registered in Firebase Authentication. Please login or use Forgot Password.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password is too weak. Please use a stronger password.";

        case "auth/user-not-found":
            return "No account was found with this email address.";

        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please wait and try again.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/requires-recent-login":
            return "Please login again before performing this action.";

        default:
            return error.message ||
                "Something went wrong. Please try again.";
    }
}


/* =========================================================
   MESSAGE DISPLAY
========================================================= */

function showMessage(
    elementId,
    message,
    type = "info"
) {

    const element = $(elementId);

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "message " + type;
}


/* =========================================================
   CLEAR MESSAGE
========================================================= */

function clearMessage(elementId) {

    const element = $(elementId);

    if (!element) {
        return;
    }

    element.textContent = "";
    element.className = "message";
}


/* =========================================================
   REGISTRATION
========================================================= */

async function registerFarmer(event) {

    event.preventDefault();

    clearMessage("registerMessage");

    if (!firebaseReady || !auth || !db) {

        showMessage(
            "registerMessage",
            "Firebase is not configured correctly.",
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

    const state =
        $("registerState").value.trim();

    const landArea =
        $("registerLandArea").value.trim();

    const market =
        $("registerMarket").value;

    const preferredLanguage =
        $("registerLanguage").value;

    const password =
        $("registerPassword").value;


    if (
        !name ||
        !email ||
        !mobile ||
        !village ||
        !state ||
        !landArea ||
        !market ||
        !password
    ) {

        showMessage(
            "registerMessage",
            "Please fill in all required fields.",
            "error"
        );

        return;
    }


    try {

        /*
         * IMPORTANT:
         * createUserWithEmailAndPassword checks
         * Firebase Authentication.
         *
         * Firestore is NOT used to determine whether
         * an email already exists.
         */

        const userCredential =
            await auth.createUserWithEmailAndPassword(
                email,
                password
            );

        const user =
            userCredential.user;


        /*
         * Store farmer profile in Firestore.
         */

        const farmerData = {

            uid: user.uid,

            name: name,

            email: email,

            mobile: mobile,

            village: village,

            state: state,

            landArea: landArea,

            preferredMarket: market,

            preferredLanguage:
                preferredLanguage,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp(),

            updatedAt:
                firebase.firestore.FieldValue.serverTimestamp()
        };


        await db
            .collection("farmers")
            .doc(user.uid)
            .set(farmerData);


        localStorage.setItem(
            "smartAgriLanguage",
            preferredLanguage
        );

        translatePage(
            preferredLanguage
        );


        showMessage(
            "registerMessage",
            "Account created successfully.",
            "success"
        );


        /*
         * Firebase automatically signs the new
         * user in after registration.
         */

        setTimeout(
            async function () {

                currentUser = user;

                await loadFarmerProfile(
                    user.uid
                );

                showDashboard();

            },
            800
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        /*
         * This specifically catches:
         *
         * auth/email-already-in-use
         *
         * even if the Firestore profile is missing.
         */

        showMessage(
            "registerMessage",
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

    clearMessage("loginMessage");

    if (!firebaseReady || !auth || !db) {

        showMessage(
            "loginMessage",
            "Firebase is not configured correctly.",
            "error"
        );

        return;
    }


    const email =
        $("loginEmail").value.trim();

    const password =
        $("loginPassword").value;


    if (!email || !password) {

        showMessage(
            "loginMessage",
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    try {

        const userCredential =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );

        currentUser =
            userCredential.user;


        await loadFarmerProfile(
            currentUser.uid
        );


        if (
            currentFarmerData &&
            currentFarmerData.preferredLanguage
        ) {

            translatePage(
                currentFarmerData.preferredLanguage
            );

        }


        showDashboard();


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showMessage(
            "loginMessage",
            getFirebaseErrorMessage(error),
            "error"
        );
    }
}


/* =========================================================
   LOAD FARMER PROFILE
========================================================= */

async function loadFarmerProfile(uid) {

    if (!uid || !db) {
        return null;
    }


    try {

        const document =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!document.exists) {

            /*
             * IMPORTANT:
             * We do NOT create fake/default farmer data.
             */

            currentFarmerData = null;

            console.warn(
                "Firebase Authentication user exists, but Firestore farmer profile does not exist."
            );

            updateDashboardWithNoProfile();

            return null;
        }


        currentFarmerData =
            document.data();


        updateDashboardProfile();

        return currentFarmerData;


    } catch (error) {

        console.error(
            "Error loading farmer profile:",
            error
        );

        currentFarmerData = null;

        return null;
    }
}


/* =========================================================
   UPDATE DASHBOARD PROFILE
========================================================= */

function updateDashboardProfile() {

    if (!currentFarmerData) {
        return;
    }


    const name =
        currentFarmerData.name || "";

    const village =
        currentFarmerData.village || "";

    const landArea =
        currentFarmerData.landArea || "";

    const market =
        currentFarmerData.preferredMarket || "";

    const email =
        currentFarmerData.email ||
        currentUser?.email ||
        "";


    if ($("headerFarmerName")) {
        $("headerFarmerName").textContent =
            name;
    }

    if ($("dashboardFarmerName")) {
        $("dashboardFarmerName").textContent =
            name;
    }

    if ($("summaryName")) {
        $("summaryName").textContent =
            name;
    }

    if ($("summaryVillage")) {
        $("summaryVillage").textContent =
            village;
    }

    if ($("summaryLand")) {
        $("summaryLand").textContent =
            landArea;
    }

    if ($("summaryMarket")) {
        $("summaryMarket").textContent =
            market;
    }


    if ($("profilePageName")) {
        $("profilePageName").textContent =
            name;
    }

    if ($("profilePageEmail")) {
        $("profilePageEmail").textContent =
            email;
    }


    if ($("profileName")) {
        $("profileName").value =
            name;
    }

    if ($("profileEmail")) {
        $("profileEmail").value =
            email;
    }

    if ($("profileMobile")) {
        $("profileMobile").value =
            currentFarmerData.mobile || "";
    }

    if ($("profileVillage")) {
        $("profileVillage").value =
            village;
    }

    if ($("profileState")) {
        $("profileState").value =
            currentFarmerData.state || "";
    }

    if ($("profileLandArea")) {
        $("profileLandArea").value =
            landArea;
    }

    if ($("profileMarket")) {
        $("profileMarket").value =
            market;
    }

    if ($("profileLanguage")) {
        $("profileLanguage").value =
            currentFarmerData.preferredLanguage ||
            "en";
    }

    updateLanguageSelectors(
        currentFarmerData.preferredLanguage ||
        selectedLanguage
    );
}


/* =========================================================
   NO PROFILE FALLBACK
========================================================= */

function updateDashboardWithNoProfile() {

    /*
     * No fake farmer values are inserted.
     *
     * The UI remains blank where actual Firestore
     * information is unavailable.
     */

    const fields = [

        "headerFarmerName",
        "dashboardFarmerName",
        "summaryName",
        "summaryVillage",
        "summaryLand",
        "summaryMarket",
        "profilePageName",
        "profilePageEmail"

    ];

    fields.forEach(id => {

        const element = $(id);

        if (element) {
            element.textContent = "";
        }

    });
}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    if (!firebaseReady || !auth) {

        showMessage(
            "loginMessage",
            "Firebase is not configured correctly.",
            "error"
        );

        return;
    }


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

        await auth.sendPasswordResetEmail(
            email
        );


        showMessage(
            "loginMessage",
            "Password reset email sent. Please check your inbox.",
            "success"
        );


    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        showMessage(
            "loginMessage",
            getFirebaseErrorMessage(error),
            "error"
        );
    }
}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutFarmer() {

    if (!auth) {
        return;
    }


    try {

        await auth.signOut();

        currentUser = null;
        currentFarmerData = null;

        closeSideMenu();
        closeProfileMenu();

        hideDashboard();

        showScreen("loginPage");

        clearMessage("loginMessage");

        if ($("loginForm")) {
            $("loginForm").reset();
        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    /*
     * Demo mode only opens the UI.
     *
     * It does NOT insert fake farmer,
     * weather or market values.
     */

    currentUser = null;
    currentFarmerData = null;

    updateDashboardWithNoProfile();

    showDashboard();
}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".app-section"
        );

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const target =
        $(sectionId);

    if (target) {

        target.classList.add(
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

    const menu = $("sideMenu");
    const overlay = $("menuOverlay");

    if (menu) {
        menu.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }
}


function closeSideMenu() {

    const menu = $("sideMenu");
    const overlay = $("menuOverlay");

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

    const menu =
        $("profileMenu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("open");
}


function closeProfileMenu() {

    const menu =
        $("profileMenu");

    if (menu) {
        menu.classList.remove("open");
    }
}


/* =========================================================
   PROFILE EDIT
========================================================= */

function enableProfileEditing() {

    editingProfile = true;


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

        const element = $(id);

        if (element) {
            element.disabled = false;
        }

    });


    if ($("profileEditActions")) {

        $("profileEditActions")
            .classList.remove("hidden");
    }


    if ($("editProfileBtn")) {

        $("editProfileBtn")
            .classList.add("hidden");
    }
}


/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

function cancelProfileEditing() {

    editingProfile = false;

    updateDashboardProfile();


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

        const element = $(id);

        if (element) {
            element.disabled = true;
        }

    });


    if ($("profileEditActions")) {

        $("profileEditActions")
            .classList.add("hidden");
    }


    if ($("editProfileBtn")) {

        $("editProfileBtn")
            .classList.remove("hidden");
    }


    clearMessage("profileMessage");
}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();

    if (!currentUser || !db) {

        showMessage(
            "profileMessage",
            "You must be logged in to save your profile.",
            "error"
        );

        return;
    }


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

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update(updatedData);


        currentFarmerData = {

            ...currentFarmerData,
            ...updatedData
        };


        localStorage.setItem(
            "smartAgriLanguage",
            updatedData.preferredLanguage
        );


        translatePage(
            updatedData.preferredLanguage
        );


        updateDashboardProfile();

        cancelProfileEditing();


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );

        showMessage(
            "profileMessage",
            error.message ||
            "Unable to update profile.",
            "error"
        );
    }
}


/* =========================================================
   CONNECTION STATUS
========================================================= */

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
            "online",
            online
        );

        status.classList.toggle(
            "offline",
            !online
        );
    }


    if (text) {

        text.textContent =
            translations[selectedLanguage][
                online ? "online" : "offline"
            ];
    }


    if (dashboardText) {

        dashboardText.textContent =
            translations[selectedLanguage][
                online ? "online" : "offline"
            ];
    }
}


/* =========================================================
   WEATHER
========================================================= */

function refreshWeather() {

    /*
     * No fake weather data.
     *
     * The actual backend/API will be connected here later.
     */

    const emptyState =
        $("weatherEmptyState");

    const weatherData =
        $("weatherData");


    if (weatherData) {
        weatherData.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.remove("hidden");
    }


    console.log(
        "Weather refresh requested, but no verified weather backend is connected."
    );
}


/* =========================================================
   MARKET DATA
========================================================= */

function refreshMarketData() {

    /*
     * No fake market prices.
     *
     * Actual verified market data must come from
     * the backend/API.
     */

    const tbody =
        $("marketTableBody");


    if (!tbody) {
        return;
    }


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHtml(
                            translations[
                                selectedLanguage
                            ].marketDataUnavailable
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            translations[
                                selectedLanguage
                            ].marketDataUnavailableDescription
                        )}
                    </p>

                </div>

            </td>

        </tr>
    `;
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    if (value === null ||
        value === undefined) {

        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   CROP IMAGE PREVIEW
========================================================= */

function setupCropImage() {

    const input =
        $("cropImageInput");

    const previewContainer =
        $("imagePreviewContainer");

    const preview =
        $("cropImagePreview");

    const analyzeButton =
        $("analyzeCropBtn");


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files &&
                this.files[0];


            if (!file) {

                if (previewContainer) {
                    previewContainer
                        .classList.add("hidden");
                }

                if (analyzeButton) {
                    analyzeButton.disabled =
                        true;
                }

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

                    if (previewContainer) {
                        previewContainer
                            .classList.remove(
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
            function () {

                const result =
                    $("cropAnalysisResult");

                if (!result) {
                    return;
                }


                result.innerHTML = `

                    <strong>
                        AI crop analysis is not connected
                    </strong>

                    <p>
                        Connect a verified crop-health AI
                        service before displaying analysis.
                    </p>
                `;

                console.log(
                    "Crop image selected. No AI analysis is performed because no verified AI backend is connected."
                );
            }
        );
    }
}


/* =========================================================
   AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        $("aiForm");

    const input =
        $("aiInput");

    const messages =
        $("chatMessages");


    if (!form || !input || !messages) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const question =
                input.value.trim();


            if (!question) {
                return;
            }


            /*
             * We do not provide fake AI answers.
             */

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
                        ${escapeHtml(
                            currentFarmerData?.name ||
                            "Farmer"
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(question)}
                    </p>

                </div>
            `;


            messages.appendChild(
                userMessage
            );


            const unavailableMessage =
                document.createElement("div");

            unavailableMessage.className =
                "chat-message assistant-message";

            unavailableMessage.innerHTML = `

                <div class="chat-avatar">
                    🤖
                </div>

                <div>

                    <strong>
                        ${escapeHtml(
                            translations[
                                selectedLanguage
                            ].assistant
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            translations[
                                selectedLanguage
                            ].aiUnavailable
                        )}
                    </p>

                </div>
            `;


            messages.appendChild(
                unavailableMessage
            );


            input.value = "";

            messages.scrollTop =
                messages.scrollHeight;
        }
    );
}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let speechRecognition = null;


function setupVoiceRecognition() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");

    const voiceInput =
        $("voiceInput");

    const voiceResponse =
        $("voiceResponse");


    if (!startButton) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.disabled = true;

        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition is not supported by this browser.";
        }

        return;
    }


    speechRecognition =
        new SpeechRecognition();


    speechRecognition.continuous =
        false;

    speechRecognition.interimResults =
        false;


    function getRecognitionLanguage() {

        if (selectedLanguage === "hi") {
            return "hi-IN";
        }

        if (selectedLanguage === "mr") {
            return "mr-IN";
        }

        return "en-IN";
    }


    startButton.addEventListener(
        "click",
        function () {

            speechRecognition.lang =
                getRecognitionLanguage();

            speechRecognition.start();

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
        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function () {

                speechRecognition.stop();
            }
        );
    }


    speechRecognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0].transcript;


            if (voiceInput) {
                voiceInput.value =
                    transcript;
            }


            if (voiceResponse) {

                voiceResponse.textContent =
                    "Voice input received. AI voice response is not connected yet.";
            }
        };


    speechRecognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Unable to recognize voice input.";
            }

            resetVoiceButtons();
        };


    speechRecognition.onend =
        function () {

            resetVoiceButtons();
        };
}


function resetVoiceButtons() {

    if ($("startVoiceBtn")) {

        $("startVoiceBtn")
            .classList.remove("hidden");
    }

    if ($("stopVoiceBtn")) {

        $("stopVoiceBtn")
            .classList.add("hidden");
    }
}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function setupGovernmentSchemes() {

    const buttons =
        document.querySelectorAll(
            ".scheme-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const url =
                    this.dataset.schemeUrl;


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


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupAuthListener() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser = user;

                console.log(
                    "Firebase user signed in:",
                    user.email
                );


                await loadFarmerProfile(
                    user.uid
                );


                if (
                    currentFarmerData &&
                    currentFarmerData.preferredLanguage
                ) {

                    translatePage(
                        currentFarmerData.preferredLanguage
                    );
                }


                showDashboard();


            } else {

                currentUser = null;

                /*
                 * Do not automatically create
                 * any fake user data.
                 */

                if (
                    !$("dashboardPage") ||
                    $("dashboardPage").style.display !== "block"
                ) {

                    hideDashboard();
                }
            }
        }
    );
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {


    /* LANGUAGE */

    initializeLanguagePage();


    /* LOGIN */

    if ($("loginForm")) {

        $("loginForm").addEventListener(
            "submit",
            loginFarmer
        );
    }


    /* REGISTER */

    if ($("registrationForm")) {

        $("registrationForm").addEventListener(
            "submit",
            registerFarmer
        );
    }


    /* SHOW REGISTER */

    if ($("showRegisterBtn")) {

        $("showRegisterBtn").addEventListener(
            "click",
            function () {

                showScreen(
                    "registerPage"
                );

                clearMessage(
                    "registerMessage"
                );
            }
        );
    }


    /* SHOW LOGIN */

    if ($("showLoginBtn")) {

        $("showLoginBtn").addEventListener(
            "click",
            function () {

                showScreen(
                    "loginPage"
                );

                clearMessage(
                    "loginMessage"
                );
            }
        );
    }


    /* FORGOT PASSWORD */

    if ($("forgotPasswordBtn")) {

        $("forgotPasswordBtn").addEventListener(
            "click",
            forgotPassword
        );
    }


    /* CHANGE LANGUAGE FROM LOGIN */

    if ($("changeLanguageFromLogin")) {

        $("changeLanguageFromLogin")
            .addEventListener(
                "click",
                function () {

                    showScreen(
                        "languagePage"
                    );
                }
            );
    }


    /* DEMO */

    if ($("demoBtn")) {

        $("demoBtn").addEventListener(
            "click",
            enterDemoDashboard
        );
    }


    /* HAMBURGER */

    if ($("hamburgerBtn")) {

        $("hamburgerBtn")
            .addEventListener(
                "click",
                openSideMenu
            );
    }


    /* CLOSE MENU */

    if ($("closeMenuBtn")) {

        $("closeMenuBtn")
            .addEventListener(
                "click",
                closeSideMenu
            );
    }


    /* MENU OVERLAY */

    if ($("menuOverlay")) {

        $("menuOverlay")
            .addEventListener(
                "click",
                closeSideMenu
            );
    }


    /* PROFILE MENU */

    if ($("profileButton")) {

        $("profileButton")
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    toggleProfileMenu();
                }
            );
    }


    /* PROFILE MENU ITEMS */

    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    showSection(
                        this.dataset.profileSection
                    );
                }
            );
        });


    /* SIDE NAVIGATION */

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        this.dataset.section;

                    if (section) {

                        showSection(
                            section
                        );
                    }
                }
            );
        });


    /* LOGOUT BUTTONS */

    if ($("sideLogoutBtn")) {

        $("sideLogoutBtn")
            .addEventListener(
                "click",
                logoutFarmer
            );
    }


    if ($("profileLogoutBtn")) {

        $("profileLogoutBtn")
            .addEventListener(
                "click",
                logoutFarmer
            );
    }


    /* PROFILE EDIT */

    if ($("editProfileBtn")) {

        $("editProfileBtn")
            .addEventListener(
                "click",
                enableProfileEditing
            );
    }


    if ($("cancelProfileEditBtn")) {

        $("cancelProfileEditBtn")
            .addEventListener(
                "click",
                cancelProfileEditing
            );
    }


    if ($("profileForm")) {

        $("profileForm")
            .addEventListener(
                "submit",
                saveProfile
            );
    }


    /* LANGUAGE SELECTORS */

    if ($("dashboardLanguage")) {

        $("dashboardLanguage")
            .addEventListener(
                "change",
                function () {

                    translatePage(
                        this.value
                    );

                    saveLanguageToFirestore(
                        this.value
                    );

                    updateConnectionStatus();
                }
            );
    }


    if ($("settingsLanguage")) {

        $("settingsLanguage")
            .addEventListener(
                "change",
                function () {

                    translatePage(
                        this.value
                    );

                    saveLanguageToFirestore(
                        this.value
                    );

                    updateConnectionStatus();
                }
            );
    }


    if ($("registerLanguage")) {

        $("registerLanguage")
            .addEventListener(
                "change",
                function () {

                    selectedRegistrationLanguage =
                        this.value;

                    translatePage(
                        this.value
                    );
                }
            );
    }


    if ($("profileLanguage")) {

        $("profileLanguage")
            .addEventListener(
                "change",
                function () {

                    translatePage(
                        this.value
                    );
                }
            );
    }


    /* WEATHER */

    if ($("refreshWeatherBtn")) {

        $("refreshWeatherBtn")
            .addEventListener(
                "click",
                refreshWeather
            );
    }


    /* MARKET */

    if ($("cropPriceSelector")) {

        $("cropPriceSelector")
            .addEventListener(
                "change",
                refreshMarketData
            );
    }


    /* CROP IMAGE */

    setupCropImage();


    /* AI */

    setupAI();


    /* VOICE */

    setupVoiceRecognition();


    /* SCHEMES */

    setupGovernmentSchemes();


    /* CONNECTION */

    window.addEventListener(
        "online",
        updateConnectionStatus
    );

    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    /* CLOSE PROFILE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener(
        "click",
        function (event) {

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
        }
    );
}


/* =========================================================
   SAVE LANGUAGE TO FIRESTORE
========================================================= */

async function saveLanguageToFirestore(
    language
) {

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );


    if (!currentUser || !db) {
        return;
    }


    try {

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update({

                preferredLanguage:
                    language,

                updatedAt:
                    firebase.firestore.FieldValue
                        .serverTimestamp()
            });


        if (currentFarmerData) {

            currentFarmerData.preferredLanguage =
                language;
        }


    } catch (error) {

        /*
         * Do not show fake success.
         * Log the actual Firestore error.
         */

        console.error(
            "Could not save language to Firestore:",
            error
        );
    }
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri application loading..."
        );


        translatePage(
            selectedLanguage
        );


        setupEventListeners();


        updateConnectionStatus();


        if (firebaseReady) {

            setupAuthListener();

        } else {

            console.error(
                "Firebase is not available."
            );
        }


        /*
         * Start with dashboard hidden.
         * Firebase Auth listener will open it
         * if a user is actually authenticated.
         */

        const dashboard =
            $("dashboardPage");

        if (dashboard) {

            dashboard.style.display =
                "none";
        }
    }
);
