// ============================================================
// SMARTAGRI - MAIN SCRIPT
// ============================================================


// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyAuIbj5ajXbSu1_txFSJSLViAGcc1DBgHY",
    authDomain: "kopargaonproject.firebaseapp.com",
    projectId: "kopargaonproject",
    storageBucket: "kopargaonproject.firebasestorage.app",
    messagingSenderId: "274707924421",
    appId: "1:274707924421:web:6808cf0bede74c29e437ac",
    measurementId: "G-DJ93MTY319"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

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

    console.error(
        "Firebase initialization failed:",
        error
    );
}


// ============================================================
// GLOBAL STATE
// ============================================================

let selectedLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;
let currentFarmerData = null;


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


function setText(id, value) {

    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


function showElement(id) {

    const element = getElement(id);

    if (element) {
        element.classList.remove("hidden");
    }
}


function hideElement(id) {

    const element = getElement(id);

    if (element) {
        element.classList.add("hidden");
    }
}


function showPage(id) {

    document.querySelectorAll(".screen").forEach(function (screen) {
        screen.classList.remove("active-screen");
    });

    const page = getElement(id);

    if (page) {
        page.classList.add("active-screen");
    }
}


function showMessage(id, message, type = "") {

    const element = getElement(id);

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className = "message";

    if (type) {
        element.classList.add(type);
    }
}


// ============================================================
// TRANSLATIONS
// ============================================================

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

        weatherSubtitle: "Local weather conditions for farming decisions.",
        currentWeather: "Current Weather",
        refresh: "Refresh",
        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",
        weatherUnavailable: "Weather data unavailable",
        weatherUnavailableDescription: "No verified weather data has been received.",

        marketSubtitle: "Current crop prices from connected verified sources.",
        marketPriceTable: "Market Price Table",
        onion: "Onion",
        wheat: "Wheat",
        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",
        marketDataUnavailable: "Market data unavailable",
        marketDataUnavailableDescription: "No verified market data has been received.",
        dataUnavailable: "Verified data unavailable",

        comparisonSubtitle: "Compare connected market information before selling.",

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
        analysisNotConnectedDescription: "Connect a verified crop-health AI service before displaying analysis.",

        schemesSubtitle: "Farmer support and government agricultural programs.",
        pmKisanDescription: "Official PM-KISAN farmer support information.",
        pmksyDescription: "Official irrigation and water-management information.",
        cropInsurance: "Crop Insurance",
        cropInsuranceDescription: "Official Pradhan Mantri Fasal Bima Yojana information.",
        learnMore: "Learn More",

        aiSubtitle: "Ask farming-related questions.",
        smartAssistant: "Smart Farmer Assistant",
        aiNotConnected: "AI Not Connected",
        assistant: "Assistant",
        aiUnavailable: "AI service is not connected yet.",
        askQuestion: "Ask a farming question...",
        aiConnectionNote: "AI responses require a connected AI service/backend.",

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
        changeLanguageDescription: "Select your preferred application language.",
        voiceSettingDescription: "Enable or disable voice assistance.",
        notifications: "Notifications",
        notificationDescription: "Enable or disable application notifications.",

        marketIntelligence: "Market Intelligence",
        multilingualSupport: "Multilingual Support",
        aboutDescription: "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        offline: "Offline"
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
        dashboardSubtitle: "आपकी खेती की जानकारी एक जगह।",
        connectionStatus: "कनेक्शन स्थिति",
        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",
        quickActions: "त्वरित कार्य",
        quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",
        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        weatherSubtitle: "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",
        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",
        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",
        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
        weatherUnavailableDescription: "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        marketPrices: "बाजार भाव",
        marketSubtitle: "सत्यापित स्रोतों से वर्तमान फसल कीमतें।",
        marketPriceTable: "बाजार भाव तालिका",
        onion: "प्याज",
        wheat: "गेहूं",
        market: "बाजार",
        crop: "फसल",
        price: "कीमत",
        date: "तारीख",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription: "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

        comparisonSubtitle: "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        cropSubtitle: "फसल उत्पादन और प्रबंधन मार्गदर्शन।",
        onionInfo: "प्याज की खेती की जानकारी।",
        wheatInfo: "गेहूं की खेती की जानकारी।",
        cultivationGuidance: "खेती मार्गदर्शन",
        cropManagement: "फसल प्रबंधन",
        farmingPractices: "कृषि पद्धतियां",

        cropHealth: "फसल स्वास्थ्य",
        cropHealthSubtitle: "AI विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",
        uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
        uploadCropDescription: "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",
        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",
        analysisNotConnected: "AI फसल विश्लेषण कनेक्ट नहीं है",
        analysisNotConnectedDescription: "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        governmentSchemes: "सरकारी योजनाएं",
        schemesSubtitle: "किसानों के लिए सरकारी कृषि सहायता कार्यक्रम।",
        pmKisanDescription: "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
        pmksyDescription: "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
        cropInsurance: "फसल बीमा",
        cropInsuranceDescription: "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",
        learnMore: "अधिक जानें",

        aiAssistant: "AI सहायक",
        aiSubtitle: "कृषि से संबंधित प्रश्न पूछें।",
        smartAssistant: "स्मार्ट किसान सहायक",
        aiNotConnected: "AI कनेक्ट नहीं है",
        assistant: "सहायक",
        aiUnavailable: "AI सेवा अभी कनेक्ट नहीं है।",
        askQuestion: "कृषि संबंधी प्रश्न पूछें...",
        aiConnectionNote: "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

        voiceAssistance: "वॉयस सहायता",
        voiceSubtitle: "अपनी पसंदीदा भाषा में बोलें और सुनें।",
        voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
        voiceDescription: "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",
        startVoice: "वॉयस सहायता शुरू करें",
        stopVoice: "सुनना बंद करें",
        voiceInput: "वॉयस इनपुट",
        voiceInputPlaceholder: "वॉयस इनपुट यहां दिखाई देगा...",
        voiceResponse: "वॉयस प्रतिक्रिया",
        voiceReady: "वॉयस सहायता तैयार है।",

        farmerProfile: "किसान प्रोफाइल",
        profileSubtitle: "अपनी किसान जानकारी देखें और संपादित करें।",
        saveChanges: "परिवर्तन सहेजें",
        cancel: "रद्द करें",

        settings: "सेटिंग्स",
        settingsSubtitle: "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
        changeLanguageDescription: "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
        voiceSettingDescription: "वॉयस सहायता चालू या बंद करें।",
        notifications: "सूचनाएं",
        notificationDescription: "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        marketIntelligence: "बाजार जानकारी",
        multilingualSupport: "बहुभाषी सहायता",
        aboutDescription: "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        offline: "ऑफलाइन"
    },


    mr: {

        appName: "स्मार्ट अ‍ॅग्री",
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
        noAccount: "खाते नाही?",
        register: "नोंदणी करा",
        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle: "तुमचे SmartAgri शेतकरी खाते तयार करा",
        fullName: "पूर्ण नाव",
        mobile: "मोबाइल नंबर",
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

        welcome: "स्वागत",
        dashboardSubtitle: "तुमची शेतीविषयक माहिती एका ठिकाणी.",
        connectionStatus: "कनेक्शन स्थिती",
        profileSummary: "तुमची नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",
        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची शेती साधने त्वरीत वापरा.",
        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription: "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        weatherSubtitle: "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",
        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",
        weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
        weatherUnavailableDescription: "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        marketSubtitle: "सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",
        marketPriceTable: "बाजारभाव तक्ता",
        onion: "कांदा",
        wheat: "गहू",
        market: "बाजार",
        crop: "पीक",
        price: "किंमत",
        date: "तारीख",
        marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
        marketDataUnavailableDescription: "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",
        dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

        comparisonSubtitle: "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        cropSubtitle: "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
        onionInfo: "कांदा लागवडीची माहिती.",
        wheatInfo: "गहू लागवडीची माहिती.",
        cultivationGuidance: "लागवड मार्गदर्शन",
        cropManagement: "पीक व्यवस्थापन",
        farmingPractices: "शेती पद्धती",

        cropHealthSubtitle: "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",
        uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
        uploadCropDescription: "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",
        chooseImage: "फोटो निवडा",
        analyzeCrop: "पिकाचे विश्लेषण करा",
        analysisNotConnected: "AI पीक विश्लेषण कनेक्ट केलेले नाही",
        analysisNotConnectedDescription: "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle: "शेतकऱ्यांसाठी सरकारी कृषी सहाय्य कार्यक्रम.",
        pmKisanDescription: "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
        pmksyDescription: "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",
        cropInsurance: "पीक विमा",
        cropInsuranceDescription: "अधिकृत प्रधानमंत्री फसल बीमा योजनेची माहिती.",
        learnMore: "अधिक जाणून घ्या",

        aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
        smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
        aiNotConnected: "AI कनेक्ट केलेले नाही",
        assistant: "सहाय्यक",
        aiUnavailable: "AI सेवा अद्याप कनेक्ट केलेली नाही.",
        askQuestion: "शेतीविषयक प्रश्न विचारा...",
        aiConnectionNote: "AI उत्तरांसाठी कनेक्टेड AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle: "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",
        voiceAssistantTitle: "स्मार्ट व्हॉइस सहाय्य",
        voiceDescription: "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",
        startVoice: "व्हॉइस सहाय्य सुरू करा",
        stopVoice: "ऐकणे थांबवा",
        voiceInput: "व्हॉइस इनपुट",
        voiceInputPlaceholder: "व्हॉइस इनपुट येथे दिसेल...",
        voiceResponse: "व्हॉइस प्रतिसाद",
        voiceReady: "व्हॉइस सहाय्य तयार आहे.",

        profileSubtitle: "तुमची शेतकरी माहिती पहा आणि संपादित करा.",
        saveChanges: "बदल जतन करा",
        cancel: "रद्द करा",

        settingsSubtitle: "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",
        changeLanguageDescription: "तुमची पसंतीची अ‍ॅप भाषा निवडा.",
        voiceSettingDescription: "व्हॉइस सहाय्य सुरू किंवा बंद करा.",
        notifications: "सूचना",
        notificationDescription: "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence: "बाजार माहिती",
        multilingualSupport: "बहुभाषिक सहाय्य",
        aboutDescription: "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        offline: "ऑफलाइन"
    }

};


// ============================================================
// LANGUAGE SYSTEM
// ============================================================

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


    const dictionary =
        translations[language];


    // --------------------------------------------------------
    // Normal text
    // --------------------------------------------------------

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        });


    // --------------------------------------------------------
    // Placeholders
    // --------------------------------------------------------

    document
        .querySelectorAll("[data-i18n-placeholder]")
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


    // --------------------------------------------------------
    // Select language controls
    // --------------------------------------------------------

    const dashboardLanguage =
        getElement("dashboardLanguage");

    if (dashboardLanguage) {
        dashboardLanguage.value = language;
    }


    const settingsLanguage =
        getElement("settingsLanguage");

    if (settingsLanguage) {
        settingsLanguage.value = language;
    }


    const registerLanguage =
        getElement("registerLanguage");

    if (registerLanguage) {
        registerLanguage.value = language;
    }


    const profileLanguage =
        getElement("profileLanguage");

    if (profileLanguage) {
        profileLanguage.value = language;
    }


    console.log(
        "Language changed to:",
        language
    );
}


// ============================================================
// LANGUAGE PAGE
// ============================================================

function setupLanguageSelection() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        getElement(
            "continueLanguageBtn"
        );


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


                selectedLanguage =
                    button.getAttribute(
                        "data-language"
                    );


                localStorage.setItem(
                    "smartAgriLanguage",
                    selectedLanguage
                );


                translatePage(
                    selectedLanguage
                );


                if (continueButton) {

                    continueButton.disabled =
                        false;

                }

            }
        );

    });


    // --------------------------------------------------------
    // Restore previously selected language
    // --------------------------------------------------------

    const savedLanguage =
        localStorage.getItem(
            "smartAgriLanguage"
        );


    if (savedLanguage) {

        const savedButton =
            document.querySelector(
                `.language-option[data-language="${savedLanguage}"]`
            );


        if (savedButton) {

            savedButton.classList.add(
                "selected"
            );

        }


        if (continueButton) {
            continueButton.disabled = false;
        }

    }


    // --------------------------------------------------------
    // CONTINUE BUTTON
    // --------------------------------------------------------

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (!selectedLanguage) {
                    selectedLanguage = "en";
                }


                localStorage.setItem(
                    "smartAgriLanguage",
                    selectedLanguage
                );


                translatePage(
                    selectedLanguage
                );


                showPage("loginPage");


                console.log(
                    "Continue button clicked. Language:",
                    selectedLanguage
                );

            }
        );

    }

}


// ============================================================
// CHANGE LANGUAGE FROM LOGIN
// ============================================================

function setupLoginLanguageButton() {

    const button =
        getElement(
            "changeLanguageFromLogin"
        );

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            showPage("languagePage");

        }
    );

}


// ============================================================
// AUTHENTICATION
// ============================================================

function setupAuthentication() {

    const loginForm =
        getElement("loginForm");


    const registrationForm =
        getElement("registrationForm");


    // --------------------------------------------------------
    // LOGIN
    // --------------------------------------------------------

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                if (!auth) {

                    showMessage(
                        "loginMessage",
                        "Firebase is not available.",
                        "error-message"
                    );

                    return;

                }


                const email =
                    getElement(
                        "loginEmail"
                    ).value.trim();


                const password =
                    getElement(
                        "loginPassword"
                    ).value;


                showMessage(
                    "loginMessage",
                    "Logging in..."
                );


                try {

                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                    showMessage(
                        "loginMessage",
                        "Login successful."
                    );


                    console.log(
                        "Firebase login successful."
                    );

                } catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    showMessage(
                        "loginMessage",
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error-message"
                    );

                }

            }
        );

    }


    // --------------------------------------------------------
    // REGISTRATION
    // --------------------------------------------------------

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                if (!auth || !db) {

                    showMessage(
                        "registerMessage",
                        "Firebase is not available.",
                        "error-message"
                    );

                    return;

                }


                const name =
                    getElement(
                        "registerName"
                    ).value.trim();


                const email =
                    getElement(
                        "registerEmail"
                    ).value.trim();


                const mobile =
                    getElement(
                        "registerMobile"
                    ).value.trim();


                const village =
                    getElement(
                        "registerVillage"
                    ).value.trim();


                const state =
                    getElement(
                        "registerState"
                    ).value.trim();


                const landArea =
                    getElement(
                        "registerLandArea"
                    ).value.trim();


                const market =
                    getElement(
                        "registerMarket"
                    ).value;


                const language =
                    getElement(
                        "registerLanguage"
                    ).value;


                const password =
                    getElement(
                        "registerPassword"
                    ).value;


                showMessage(
                    "registerMessage",
                    "Creating account..."
                );


                try {

                    const userCredential =
                        await auth.createUserWithEmailAndPassword(
                            email,
                            password
                        );


                    const user =
                        userCredential.user;


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


                    await user.updateProfile({
                        displayName: name
                    });


                    selectedLanguage =
                        language;


                    localStorage.setItem(
                        "smartAgriLanguage",
                        language
                    );


                    translatePage(
                        language
                    );


                    showMessage(
                        "registerMessage",
                        "Account created successfully."
                    );


                    console.log(
                        "Registration successful."
                    );

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    showMessage(
                        "registerMessage",
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error-message"
                    );

                }

            }
        );

    }

}


// ============================================================
// FIREBASE ERROR MESSAGES
// ============================================================

function getFirebaseErrorMessage(error) {

    if (!error || !error.code) {
        return "Something went wrong.";
    }


    const messages = {

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Password should contain at least 6 characters.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[error.code] ||
        error.message ||
        "Authentication failed."
    );

}


// ============================================================
// AUTH STATE
// ============================================================

function setupAuthStateListener() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            currentUser = user;


            if (user) {

                console.log(
                    "User logged in:",
                    user.email
                );


                await loadFarmerProfile(
                    user.uid
                );


                showPage(
                    "dashboardPage"
                );


                updateConnectionStatus(
                    true
                );


                loadWeather();

            } else {

                console.log(
                    "No authenticated user."
                );

                updateConnectionStatus(
                    false
                );

            }

        }
    );

}


// ============================================================
// DEMO DASHBOARD
// ============================================================

function setupDemoButton() {

    const button =
        getElement("demoBtn");

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            currentUser = {
                uid: "demo-user",
                email: "demo@smartagri.local",
                displayName: "Demo Farmer"
            };


            currentFarmerData = {

                name: "Demo Farmer",

                email: "demo@smartagri.local",

                mobile: "9876543210",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 acres",

                preferredMarket:
                    "Kopargaon APMC",

                preferredLanguage:
                    selectedLanguage

            };


            populateFarmerUI(
                currentFarmerData
            );


            showPage(
                "dashboardPage"
            );


            updateConnectionStatus(
                true
            );


            loadWeather();


            console.log(
                "Demo dashboard opened."
            );

        }
    );

}


// ============================================================
// LOAD FARMER PROFILE
// ============================================================

async function loadFarmerProfile(uid) {

    if (!db) {
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


            populateFarmerUI(
                currentFarmerData
            );


            console.log(
                "Farmer profile loaded."
            );

        } else {

            console.log(
                "No farmer profile found."
            );

        }

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


// ============================================================
// POPULATE FARMER UI
// ============================================================

function populateFarmerUI(data) {

    if (!data) {
        return;
    }


    const name =
        data.name ||
        currentUser?.displayName ||
        "Farmer";


    const email =
        data.email ||
        currentUser?.email ||
        "—";


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
        name
    );


    setText(
        "profilePageEmail",
        email
    );


    const profileName =
        getElement("profileName");

    if (profileName) {
        profileName.value = name;
    }


    const profileEmail =
        getElement("profileEmail");

    if (profileEmail) {
        profileEmail.value = email;
    }


    const profileMobile =
        getElement("profileMobile");

    if (profileMobile) {
        profileMobile.value =
            data.mobile || "";
    }


    const profileVillage =
        getElement("profileVillage");

    if (profileVillage) {
        profileVillage.value =
            data.village || "";
    }


    const profileState =
        getElement("profileState");

    if (profileState) {
        profileState.value =
            data.state || "";
    }


    const profileLandArea =
        getElement("profileLandArea");

    if (profileLandArea) {
        profileLandArea.value =
            data.landArea || "";
    }


    const profileMarket =
        getElement("profileMarket");

    if (profileMarket) {
        profileMarket.value =
            data.preferredMarket || "";
    }


    const profileLanguage =
        getElement("profileLanguage");

    if (profileLanguage) {
        profileLanguage.value =
            data.preferredLanguage || selectedLanguage;
    }


    const registerLanguage =
        getElement("registerLanguage");

    if (registerLanguage) {
        registerLanguage.value =
            data.preferredLanguage || selectedLanguage;
    }

}


// ============================================================
// REGISTRATION / LOGIN NAVIGATION
// ============================================================

function setupAuthNavigation() {

    const showRegister =
        getElement(
            "showRegisterBtn"
        );


    const showLogin =
        getElement(
            "showLoginBtn"
        );


    if (showRegister) {

        showRegister.addEventListener(
            "click",
            function () {

                showPage(
                    "registerPage"
                );

            }
        );

    }


    if (showLogin) {

        showLogin.addEventListener(
            "click",
            function () {

                showPage(
                    "loginPage"
                );

            }
        );

    }


    const forgotPassword =
        getElement(
            "forgotPasswordBtn"
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            async function () {

                const email =
                    getElement(
                        "loginEmail"
                    ).value.trim();


                if (!email) {

                    showMessage(
                        "loginMessage",
                        "Enter your email address first.",
                        "error-message"
                    );

                    return;

                }


                if (!auth) {
                    return;
                }


                try {

                    await auth.sendPasswordResetEmail(
                        email
                    );


                    showMessage(
                        "loginMessage",
                        "Password reset email sent."
                    );

                } catch (error) {

                    console.error(
                        "Password reset error:",
                        error
                    );


                    showMessage(
                        "loginMessage",
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error-message"
                    );

                }

            }
        );

    }

}


// ============================================================
// LOGOUT
// ============================================================

function logoutUser() {

    if (!auth) {

        currentUser = null;

        showPage(
            "loginPage"
        );

        return;

    }


    auth.signOut()
        .then(function () {

            currentUser = null;
            currentFarmerData = null;

            showPage(
                "loginPage"
            );

            console.log(
                "User logged out."
            );

        })
        .catch(function (error) {

            console.error(
                "Logout error:",
                error
            );

        });

}


function setupLogoutButtons() {

    const buttons = [

        getElement("sideLogoutBtn"),
        getElement("profileLogoutBtn")

    ];


    buttons.forEach(function (button) {

        if (button) {

            button.addEventListener(
                "click",
                logoutUser
            );

        }

    });

}


// ============================================================
// DASHBOARD NAVIGATION
// ============================================================

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        button.getAttribute(
                            "data-section"
                        );


                    if (!section) {
                        return;
                    }


                    showDashboardSection(
                        section
                    );

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

                    const section =
                        button.getAttribute(
                            "data-profile-section"
                        );


                    showDashboardSection(
                        section
                    );


                    hideProfileMenu();

                }
            );

        });

}


function showDashboardSection(sectionId) {

    document
        .querySelectorAll(
            ".app-section"
        )
        .forEach(function (section) {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        getElement(sectionId);


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


    // Load weather when weather section opens

    if (
        sectionId === "weatherSection"
    ) {

        loadWeather();

    }

}


// ============================================================
// HAMBURGER MENU
// ============================================================

function setupSideMenu() {

    const hamburger =
        getElement("hamburgerBtn");


    const closeButton =
        getElement("closeMenuBtn");


    const overlay =
        getElement("menuOverlay");


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            function () {

                openSideMenu();

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                closeSideMenu();

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeSideMenu();

            }
        );

    }

}


function openSideMenu() {

    const menu =
        getElement("sideMenu");


    const overlay =
        getElement("menuOverlay");


    if (menu) {
        menu.classList.add("open");
    }


    if (overlay) {
        overlay.classList.add("open");
    }

}


function closeSideMenu() {

    const menu =
        getElement("sideMenu");


    const overlay =
        getElement("menuOverlay");


    if (menu) {
        menu.classList.remove("open");
    }


    if (overlay) {
        overlay.classList.remove("open");
    }

}


// ============================================================
// PROFILE MENU
// ============================================================

function setupProfileMenu() {

    const button =
        getElement("profileButton");


    const menu =
        getElement("profileMenu");


    if (!button || !menu) {
        return;
    }


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
                !button.contains(event.target)
            ) {

                hideProfileMenu();

            }

        }
    );

}


function hideProfileMenu() {

    const menu =
        getElement("profileMenu");


    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

}


// ============================================================
// WEATHER
// ============================================================

async function loadWeather() {

    console.log(
        "Loading Kopargaon weather..."
    );


    const refreshButton =
        getElement(
            "refreshWeatherBtn"
        );


    if (refreshButton) {

        refreshButton.disabled = true;

        refreshButton.innerHTML =
            "🔄 Refreshing...";

    }


    showElement(
        "weatherLoading"
    );


    hideElement(
        "weatherError"
    );


    try {

        const response =
            await fetch(
                "/api/weather",
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Weather server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Weather API response:",
            data
        );


        if (
            !data ||
            data.success === false
        ) {

            throw new Error(
                data?.error ||
                "Weather data unavailable."
            );

        }


        updateWeatherUI(
            data
        );


        updateConnectionStatus(
            true
        );


        console.log(
            "Kopargaon weather updated."
        );

    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        showWeatherError(
            error.message
        );

        updateConnectionStatus(
            false
        );

    } finally {

        hideElement(
            "weatherLoading"
        );


        if (refreshButton) {

            refreshButton.disabled =
                false;

            refreshButton.innerHTML =
                `🔄 <span data-i18n="refresh">${translations[selectedLanguage]?.refresh || "Refresh"}</span>`;

        }

    }

}


// ============================================================
// UPDATE WEATHER UI
// ============================================================

function updateWeatherUI(data) {

    hideElement(
        "weatherEmptyState"
    );


    showElement(
        "weatherData"
    );


    const temperature =
        data.temperature_c ??
        data.temperature;


    const humidity =
        data.humidity_pct ??
        data.humidity;


    const wind =
        data.wind_speed_kmh ??
        data.wind_speed;


    let rainProbability = null;


    if (
        Array.isArray(data.forecast) &&
        data.forecast.length > 0
    ) {

        rainProbability =
            data.forecast[0]
                .rain_probability_pct;

    }


    // --------------------------------------------------------
    // Temperature
    // --------------------------------------------------------

    if (
        temperature !== null &&
        temperature !== undefined &&
        !Number.isNaN(Number(temperature))
    ) {

        setText(
            "weatherTemperature",
            `${Math.round(Number(temperature))}°C`
        );

    } else {

        setText(
            "weatherTemperature",
            "—"
        );

    }


    // --------------------------------------------------------
    // Humidity
    // --------------------------------------------------------

    if (
        humidity !== null &&
        humidity !== undefined &&
        !Number.isNaN(Number(humidity))
    ) {

        setText(
            "weatherHumidity",
            `${Math.round(Number(humidity))}%`
        );

    } else {

        setText(
            "weatherHumidity",
            "—"
        );

    }


    // --------------------------------------------------------
    // Wind
    // --------------------------------------------------------

    if (
        wind !== null &&
        wind !== undefined &&
        !Number.isNaN(Number(wind))
    ) {

        setText(
            "weatherWind",
            `${Math.round(Number(wind))} km/h`
        );

    } else {

        setText(
            "weatherWind",
            "—"
        );

    }


    // --------------------------------------------------------
    // Rain probability
    // --------------------------------------------------------

    if (
        rainProbability !== null &&
        rainProbability !== undefined &&
        !Number.isNaN(
            Number(rainProbability)
        )
    ) {

        setText(
            "weatherRain",
            `${Math.round(Number(rainProbability))}%`
        );

    } else {

        setText(
            "weatherRain",
            "—"
        );

    }


    console.log(
        "Weather UI updated.",
        data
    );

}


// ============================================================
// WEATHER ERROR
// ============================================================

function showWeatherError(message) {

    hideElement(
        "weatherData"
    );


    showElement(
        "weatherEmptyState"
    );


    const errorElement =
        getElement(
            "weatherError"
        );


    if (errorElement) {

        errorElement.textContent =
            message ||
            "Unable to connect to weather server.";

        errorElement.classList.remove(
            "hidden"
        );

    }

}


// ============================================================
// WEATHER REFRESH
// ============================================================

function setupWeatherRefresh() {

    const button =
        getElement(
            "refreshWeatherBtn"
        );


    if (!button) {
        return;
    }


    button.type = "button";


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            loadWeather();

        }
    );

}


// ============================================================
// CONNECTION STATUS
// ============================================================

function updateConnectionStatus(
    online
) {

    const connectionStatus =
        getElement(
            "connectionStatus"
        );


    const connectionText =
        getElement(
            "connectionText"
        );


    const dashboardConnectionText =
        getElement(
            "dashboardConnectionText"
        );


    if (connectionStatus) {

        if (online) {

            connectionStatus.classList.remove(
                "offline"
            );

            connectionStatus.classList.add(
                "online"
            );

        } else {

            connectionStatus.classList.remove(
                "online"
            );

            connectionStatus.classList.add(
                "offline"
            );

        }

    }


    if (connectionText) {

        connectionText.textContent =
            online
                ? "Online"
                : "Offline";

    }


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            online
                ? "Online"
                : "Offline";

    }

}


// ============================================================
// AI ASSISTANT
// ============================================================

function setupAI() {

    const form =
        getElement("aiForm");


    const input =
        getElement("aiInput");


    const sendButton =
        getElement("aiSendButton");


    if (!form || !input) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const question =
                input.value.trim();


            if (!question) {
                return;
            }


            addChatMessage(
                question,
                "user"
            );


            input.value = "";


            if (sendButton) {
                sendButton.disabled = true;
            }


            setAIStatus(
                true
            );


            const loadingMessage =
                addChatMessage(
                    "Thinking...",
                    "assistant"
                );


            try {

                const response =
                    await fetch(
                        "/api/ai",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                question:
                                    question,

                                language:
                                    selectedLanguage,

                                location:
                                    "Kopargaon",

                                user:
                                    currentFarmerData || null

                            })
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `AI server returned ${response.status}`
                    );

                }


                const data =
                    await response.json();


                console.log(
                    "AI response:",
                    data
                );


                if (
                    loadingMessage
                ) {

                    loadingMessage.remove();

                }


                const answer =
                    data.answer ||
                    data.response ||
                    data.message ||
                    data.result;


                if (!answer) {

                    throw new Error(
                        "AI returned no answer."
                    );

                }


                addChatMessage(
                    answer,
                    "assistant"
                );


                setAIStatus(
                    true
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                if (
                    loadingMessage
                ) {

                    loadingMessage.remove();

                }


                addChatMessage(
                    "AI service is currently unavailable. Please try again.",
                    "assistant"
                );


                setAIStatus(
                    false
                );

            } finally {

                if (sendButton) {
                    sendButton.disabled =
                        false;
                }

            }

        }
    );

}


// ============================================================
// ADD CHAT MESSAGE
// ============================================================

function addChatMessage(
    message,
    type
) {

    const container =
        getElement(
            "chatMessages"
        );


    if (!container) {
        return null;
    }


    const messageDiv =
        document.createElement(
            "div"
        );


    messageDiv.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    const sender =
        type === "user"
            ? (
                currentFarmerData?.name ||
                "Farmer"
            )
            : (
                translations[
                    selectedLanguage
                ]?.assistant ||
                "Assistant"
            );


    messageDiv.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHTML(sender)}
            </strong>

            <p>
                ${escapeHTML(String(message))}
            </p>

        </div>

    `;


    container.appendChild(
        messageDiv
    );


    container.scrollTop =
        container.scrollHeight;


    return messageDiv;

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


// ============================================================
// AI CONNECTION STATUS
// ============================================================

function setAIStatus(
    connected
) {

    const badge =
        getElement(
            "aiConnectionBadge"
        );


    const text =
        getElement(
            "aiConnectionText"
        );


    if (!badge || !text) {
        return;
    }


    if (connected) {

        badge.classList.remove(
            "not-connected-badge"
        );


        badge.classList.add(
            "connected-badge"
        );


        text.textContent =
            "AI Connected";

    } else {

        badge.classList.remove(
            "connected-badge"
        );


        badge.classList.add(
            "not-connected-badge"
        );


        text.textContent =
            "AI Not Connected";

    }

}


// ============================================================
// PROFILE EDITING
// ============================================================

function setupProfileEditing() {

    const editButton =
        getElement(
            "editProfileBtn"
        );


    const cancelButton =
        getElement(
            "cancelProfileEditBtn"
        );


    const form =
        getElement(
            "profileForm"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                toggleProfileInputs(
                    true
                );

                showElement(
                    "profileEditActions"
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                populateFarmerUI(
                    currentFarmerData
                );

                toggleProfileInputs(
                    false
                );

                hideElement(
                    "profileEditActions"
                );

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                if (
                    !currentUser ||
                    !db ||
                    currentUser.uid === "demo-user"
                ) {

                    showMessage(
                        "profileMessage",
                        "Profile editing is unavailable in demo mode.",
                        "error-message"
                    );

                    return;

                }


                const updatedData = {

                    name:
                        getElement(
                            "profileName"
                        ).value.trim(),

                    mobile:
                        getElement(
                            "profileMobile"
                        ).value.trim(),

                    village:
                        getElement(
                            "profileVillage"
                        ).value.trim(),

                    state:
                        getElement(
                            "profileState"
                        ).value.trim(),

                    landArea:
                        getElement(
                            "profileLandArea"
                        ).value.trim(),

                    preferredMarket:
                        getElement(
                            "profileMarket"
                        ).value,

                    preferredLanguage:
                        getElement(
                            "profileLanguage"
                        ).value,

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                try {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update(
                            updatedData
                        );


                    currentFarmerData = {

                        ...currentFarmerData,

                        ...updatedData

                    };


                    if (
                        updatedData.preferredLanguage
                    ) {

                        selectedLanguage =
                            updatedData.preferredLanguage;


                        translatePage(
                            selectedLanguage
                        );

                    }


                    populateFarmerUI(
                        currentFarmerData
                    );


                    toggleProfileInputs(
                        false
                    );


                    hideElement(
                        "profileEditActions"
                    );


                    showMessage(
                        "profileMessage",
                        "Profile updated successfully."
                    );


                } catch (error) {

                    console.error(
                        "Profile update error:",
                        error
                    );


                    showMessage(
                        "profileMessage",
                        "Unable to save profile.",
                        "error-message"
                    );

                }

            }
        );

    }

}


function toggleProfileInputs(
    enabled
) {

    const ids = [

        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"

    ];


    ids.forEach(function (id) {

        const element =
            getElement(id);


        if (element) {

            element.disabled =
                !enabled;

        }

    });

}


// ============================================================
// LANGUAGE CONTROLS IN DASHBOARD
// ============================================================

function setupLanguageControls() {

    const dashboardLanguage =
        getElement(
            "dashboardLanguage"
        );


    const settingsLanguage =
        getElement(
            "settingsLanguage"
        );


    const registerLanguage =
        getElement(
            "registerLanguage"
        );


    if (dashboardLanguage) {

        dashboardLanguage.value =
            selectedLanguage;


        dashboardLanguage.addEventListener(
            "change",
            function () {

                translatePage(
                    this.value
                );

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.value =
            selectedLanguage;


        settingsLanguage.addEventListener(
            "change",
            function () {

                translatePage(
                    this.value
                );

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.value =
            selectedLanguage;


        registerLanguage.addEventListener(
            "change",
            function () {

                selectedLanguage =
                    this.value;


                translatePage(
                    this.value
                );

            }
        );

    }

}


// ============================================================
// VOICE ASSISTANCE
// ============================================================

let speechRecognition = null;


function setupVoiceAssistance() {

    const startButton =
        getElement(
            "startVoiceBtn"
        );


    const stopButton =
        getElement(
            "stopVoiceBtn"
        );


    const input =
        getElement(
            "voiceInput"
        );


    const response =
        getElement(
            "voiceResponse"
        );


    if (!startButton) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.disabled =
            true;


        if (response) {

            response.textContent =
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


    speechRecognition.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    speechRecognition.onstart =
        function () {

            hideElement(
                "startVoiceBtn"
            );


            showElement(
                "stopVoiceBtn"
            );


            if (response) {

                response.textContent =
                    "Listening...";

            }

        };


    speechRecognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0]
                    .transcript;


            if (input) {

                input.value =
                    transcript;

            }


            if (response) {

                response.textContent =
                    "Voice input received.";

            }

        };


    speechRecognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );


            if (response) {

                response.textContent =
                    "Unable to understand voice input.";

            }

        };


    speechRecognition.onend =
        function () {

            showElement(
                "startVoiceBtn"
            );


            hideElement(
                "stopVoiceBtn"
            );

        };


    startButton.addEventListener(
        "click",
        function () {

            speechRecognition.lang =
                getSpeechLanguage(
                    selectedLanguage
                );


            speechRecognition.start();

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

}


function getSpeechLanguage(
    language
) {

    if (language === "hi") {
        return "hi-IN";
    }


    if (language === "mr") {
        return "mr-IN";
    }


    return "en-IN";

}


// ============================================================
// SETTINGS
// ============================================================

function setupSettings() {

    const voiceSetting =
        getElement(
            "voiceSetting"
        );


    const notificationSetting =
        getElement(
            "notificationSetting"
        );


    if (voiceSetting) {

        const saved =
            localStorage.getItem(
                "smartAgriVoice"
            );


        if (saved !== null) {

            voiceSetting.checked =
                saved === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriVoice",
                    this.checked
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
                    this.checked
                );

            }
        );

    }

}


// ============================================================
// CROP IMAGE PREVIEW
// ============================================================

function setupCropImage() {

    const input =
        getElement(
            "cropImageInput"
        );


    const previewContainer =
        getElement(
            "imagePreviewContainer"
        );


    const preview =
        getElement(
            "cropImagePreview"
        );


    const analyzeButton =
        getElement(
            "analyzeCropBtn"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        function () {

            const file =
                input.files?.[0];


            if (!file) {
                return;
            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

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


                    showElement(
                        "imagePreviewContainer"
                    );


                    if (analyzeButton) {

                        analyzeButton.disabled =
                            false;

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            function () {

                analyzeCropImage();

            }
        );

    }

}


// ============================================================
// CROP AI ANALYSIS
// ============================================================

async function analyzeCropImage() {

    const input =
        getElement(
            "cropImageInput"
        );


    const result =
        getElement(
            "cropAnalysisResult"
        );


    const button =
        getElement(
            "analyzeCropBtn"
        );


    const file =
        input?.files?.[0];


    if (!file) {
        return;
    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Analyzing...";

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
            selectedLanguage
        );


        formData.append(
            "location",
            "Kopargaon"
        );


        const response =
            await fetch(
                "/api/crop-health",
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                `Crop AI server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const answer =
            data.analysis ||
            data.answer ||
            data.result ||
            data.message;


        if (!answer) {

            throw new Error(
                "No crop analysis returned."
            );

        }


        if (result) {

            result.innerHTML = `
                <strong>
                    ${escapeHTML(
                        translations[
                            selectedLanguage
                        ]?.analysisResult ||
                        "AI Analysis"
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        String(answer)
                    )}
                </p>
            `;

        }

    } catch (error) {

        console.error(
            "Crop analysis error:",
            error
        );


        if (result) {

            result.innerHTML = `
                <strong>
                    AI analysis unavailable
                </strong>

                <p>
                    Unable to connect to the crop-health AI service.
                </p>
            `;

        }

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                translations[
                    selectedLanguage
                ]?.analyzeCrop ||
                "Analyze Crop";

        }

    }

}


// ============================================================
// BACKEND STATUS
// ============================================================

async function checkBackend() {

    try {

        const response =
            await fetch(
                "/api/status",
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {
            throw new Error(
                "Backend unavailable"
            );
        }


        const data =
            await response.json();


        console.log(
            "SmartAgri backend status:",
            data
        );


        updateConnectionStatus(
            true
        );


        return true;

    } catch (error) {

        console.error(
            "Backend unavailable:",
            error
        );


        updateConnectionStatus(
            false
        );


        return false;

    }

}


// ============================================================
// KEYBOARD SUPPORT
// ============================================================

function setupKeyboardSupport() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSideMenu();

                hideProfileMenu();

            }

        }
    );

}


// ============================================================
// INITIALIZE APPLICATION
// ============================================================

function initializeSmartAgri() {

    console.log(
        "======================================"
    );


    console.log(
        "SmartAgri application starting..."
    );


    console.log(
        "======================================"
    );


    // --------------------------------------------------------
    // Language
    // --------------------------------------------------------

    translatePage(
        selectedLanguage
    );


    setupLanguageSelection();


    setupLoginLanguageButton();


    setupLanguageControls();


    // --------------------------------------------------------
    // Authentication
    // --------------------------------------------------------

    setupAuthentication();


    setupAuthNavigation();


    setupAuthStateListener();


    setupDemoButton();


    setupLogoutButtons();


    // --------------------------------------------------------
    // Dashboard
    // --------------------------------------------------------

    setupNavigation();


    setupSideMenu();


    setupProfileMenu();


    // --------------------------------------------------------
    // Weather
    // --------------------------------------------------------

    setupWeatherRefresh();


    // --------------------------------------------------------
    // AI
    // --------------------------------------------------------

    setupAI();


    // --------------------------------------------------------
    // Profile
    // --------------------------------------------------------

    setupProfileEditing();


    // --------------------------------------------------------
    // Voice
    // --------------------------------------------------------

    setupVoiceAssistance();


    // --------------------------------------------------------
    // Crop health
    // --------------------------------------------------------

    setupCropImage();


    // --------------------------------------------------------
    // Settings
    // --------------------------------------------------------

    setupSettings();


    // --------------------------------------------------------
    // Backend
    // --------------------------------------------------------

    checkBackend();


    // --------------------------------------------------------
    // Keyboard
    // --------------------------------------------------------

    setupKeyboardSupport();


    console.log(
        "SmartAgri initialized successfully."
    );

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSmartAgri();

    }
);
