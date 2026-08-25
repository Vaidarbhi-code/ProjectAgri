/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   Firebase + Language + Weather + Mandi API
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
   2. DATA.GOV.IN CONFIGURATION
========================================================= */

/*
   IMPORTANT:
   Replace YOUR_DATA_GOV_API_KEY with your actual
   data.gov.in API key.

   The resource below is the Government of India
   daily mandi price resource.
*/

const DATA_GOV_API_KEY = "YOUR_DATA_GOV_API_KEY";

const MANDI_RESOURCE_ID =
    "9ef84268-d588-465a-a308-a864a43d0070";


/* =========================================================
   3. KOPARGAON WEATHER LOCATION
========================================================= */

const KOPARGAON_LATITUDE = 19.8826;
const KOPARGAON_LONGITUDE = 74.4769;


/* =========================================================
   4. INITIALIZE FIREBASE
========================================================= */

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();


/* =========================================================
   5. GLOBAL VARIABLES
========================================================= */

let currentLanguage =
    localStorage.getItem("smartagriLanguage") || "en";

let currentUser = null;
let currentFarmerData = null;

let selectedLanguage = null;


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
        preferredLanguage: "Preferred Language",

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

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार इंटेलिजेंस सिस्टम",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri में प्रवेश करें",

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
        preferredLanguage: "पसंदीदा भाषा",

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
        quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",

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
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable: "बाजार भाव तालिका",
        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "तारीख",

        onion: "प्याज",
        wheat: "गेहूं",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

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
            "AI सहायता के लिए फसल की तस्वीर अपलोड करें।",

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
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

        pmKisanDescription:
            "आधिकारिक PM-KISAN किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        learnMore: "और जानें",

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
            "कृषि संबंधी प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्शन आवश्यक है।",

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
            "परिवर्तन सहेजें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "अपनी SmartAgri प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "वॉयस सहायता चालू या बंद करें।",

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

        appName: "स्मार्टअॅग्री",
        appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage: "आपली भाषा निवडा",
        languageDescription: "पुढे जाण्यासाठी आपली पसंतीची भाषा निवडा.",
        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle: "SmartAgri मध्ये प्रवेश करा",

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
        preferredLanguage: "पसंतीची भाषा",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीपासून खाते आहे?",

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
        about: "SmartAgri विषयी",
        logout: "लॉगआउट",

        myProfile: "माझे प्रोफाइल",

        welcome: "स्वागत",
        dashboardSubtitle: "आपली शेतीविषयक माहिती एका ठिकाणी.",
        connectionStatus: "कनेक्शन स्थिती",

        profileSummary: "आपली नोंदणीकृत माहिती",
        editProfile: "प्रोफाइल संपादित करा",

        quickActions: "जलद कृती",
        quickActionsSubtitle: "महत्त्वाची शेती साधने पटकन वापरा.",

        liveDataTitle: "लाइव्ह डेटा",
        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        offline: "ऑफलाइन",
        online: "ऑनलाइन",

        currentWeather: "सध्याचे हवामान",
        refresh: "रिफ्रेश",

        weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        temperature: "तापमान",
        humidity: "आर्द्रता",
        windSpeed: "वाऱ्याचा वेग",
        rainChance: "पावसाची शक्यता",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक बाजारभाव.",

        marketPriceTable: "बाजारभाव तक्ता",
        market: "बाजार",
        crop: "पीक",
        price: "भाव",
        date: "तारीख",

        onion: "कांदा",
        wheat: "गहू",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

        dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

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
            "AI सहाय्यासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage: "फोटो निवडा",
        analyzeCrop: "पीक विश्लेषण करा",

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
            "प्रधानमंत्री पीक विमा योजनेची अधिकृत माहिती.",

        learnMore: "अधिक जाणून घ्या",

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
            "शेतीविषयक प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

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
            "आपल्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "आपली पसंतीची अॅप भाषा निवडा.",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे."
    }

};


/* =========================================================
   7. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupLanguage();
    setupAuthentication();
    setupNavigation();
    setupDashboard();
    setupWeather();
    setupMandi();
    setupProfile();
    setupSettings();
    setupGovernmentSchemes();
    setupCropHealth();
    setupVoice();
    setupAI();
    setupConnectionStatus();

    applyLanguage(currentLanguage);

});


/* =========================================================
   8. LANGUAGE SYSTEM
========================================================= */

function setupLanguage() {

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

        continueButton.addEventListener("click", () => {

            if (!selectedLanguage) {
                return;
            }

            currentLanguage = selectedLanguage;

            localStorage.setItem(
                "smartagriLanguage",
                currentLanguage
            );

            applyLanguage(currentLanguage);

            showScreen("loginPage");

        });

    }


    const changeLanguageButton =
        document.getElementById("changeLanguageFromLogin");

    if (changeLanguageButton) {

        changeLanguageButton.addEventListener("click", () => {

            showScreen("languagePage");

        });

    }


    const dashboardLanguage =
        document.getElementById("dashboardLanguage");

    if (dashboardLanguage) {

        dashboardLanguage.value = currentLanguage;

        dashboardLanguage.addEventListener("change", event => {

            currentLanguage =
                event.target.value;

            localStorage.setItem(
                "smartagriLanguage",
                currentLanguage
            );

            applyLanguage(currentLanguage);

        });

    }


    const settingsLanguage =
        document.getElementById("settingsLanguage");

    if (settingsLanguage) {

        settingsLanguage.value = currentLanguage;

        settingsLanguage.addEventListener("change", event => {

            currentLanguage =
                event.target.value;

            localStorage.setItem(
                "smartagriLanguage",
                currentLanguage
            );

            applyLanguage(currentLanguage);

        });

    }


    const registerLanguage =
        document.getElementById("registerLanguage");

    if (registerLanguage) {

        registerLanguage.value = currentLanguage;

        registerLanguage.addEventListener("change", event => {

            currentLanguage =
                event.target.value;

            localStorage.setItem(
                "smartagriLanguage",
                currentLanguage
            );

            applyLanguage(currentLanguage);

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

    currentLanguage = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );


    document.documentElement.lang = language;


    const dictionary =
        translations[language];


    document.querySelectorAll("[data-i18n]")
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


    document.querySelectorAll("[data-i18n-placeholder]")
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


    updateLanguageSelects(language);
}


/* =========================================================
   UPDATE LANGUAGE SELECTS
========================================================= */

function updateLanguageSelects(language) {

    const ids = [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ];

    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = language;
        }

    });

}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen")
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
   9. AUTHENTICATION
========================================================= */

function setupAuthentication() {

    const loginForm =
        document.getElementById("loginForm");

    const registrationForm =
        document.getElementById("registrationForm");

    const forgotPasswordBtn =
        document.getElementById("forgotPasswordBtn");

    const demoBtn =
        document.getElementById("demoBtn");

    const showRegisterBtn =
        document.getElementById("showRegisterBtn");

    const showLoginBtn =
        document.getElementById("showLoginBtn");


    if (showRegisterBtn) {

        showRegisterBtn.addEventListener("click", () => {

            showScreen("registerPage");

        });

    }


    if (showLoginBtn) {

        showLoginBtn.addEventListener("click", () => {

            showScreen("loginPage");

        });

    }


    if (loginForm) {

        loginForm.addEventListener("submit", async event => {

            event.preventDefault();

            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const remember =
                document.getElementById("rememberMe").checked;

            const message =
                document.getElementById("loginMessage");


            try {

                if (remember) {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.LOCAL
                    );

                } else {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.SESSION
                    );

                }


                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );


                showMessage(
                    message,
                    "Login successful.",
                    "success"
                );

            } catch (error) {

                showMessage(
                    message,
                    firebaseErrorMessage(error),
                    "error"
                );

            }

        });

    }


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            async event => {

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

                    const result =
                        await auth.createUserWithEmailAndPassword(
                            email,
                            password
                        );


                    await db
                        .collection("farmers")
                        .doc(result.user.uid)
                        .set({

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

                        });


                    currentLanguage =
                        language;

                    localStorage.setItem(
                        "smartagriLanguage",
                        language
                    );

                    applyLanguage(language);


                    showMessage(
                        message,
                        "Account created successfully.",
                        "success"
                    );


                    setTimeout(() => {

                        showScreen("dashboardPage");

                    }, 700);


                } catch (error) {

                    showMessage(
                        message,
                        firebaseErrorMessage(error),
                        "error"
                    );

                }

            }
        );

    }


    if (forgotPasswordBtn) {

        forgotPasswordBtn.addEventListener(
            "click",
            async () => {

                const email =
                    document.getElementById("loginEmail").value.trim();

                const message =
                    document.getElementById("loginMessage");


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
                        firebaseErrorMessage(error),
                        "error"
                    );

                }

            }
        );

    }


    if (demoBtn) {

        demoBtn.addEventListener("click", () => {

            currentFarmerData = {

                name: "Demo Farmer",
                email: "demo@smartagri.in",
                mobile: "9876543210",
                village: "Kopargaon",
                state: "Maharashtra",
                landArea: "5 Acres",
                market: "Kopargaon APMC",
                language: currentLanguage

            };


            populateFarmerData(
                currentFarmerData
            );


            showScreen("dashboardPage");

            loadWeather();

            loadMandiData();

        });

    }


    auth.onAuthStateChanged(async user => {

        currentUser = user;


        if (!user) {
            return;
        }


        try {

            const doc =
                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .get();


            if (doc.exists) {

                currentFarmerData =
                    doc.data();

                populateFarmerData(
                    currentFarmerData
                );

            } else {

                currentFarmerData = {

                    name:
                        user.displayName || "Farmer",

                    email:
                        user.email || "",

                    mobile: "",
                    village: "",
                    state: "Maharashtra",
                    landArea: "",
                    market: "Kopargaon APMC",
                    language: currentLanguage

                };

                populateFarmerData(
                    currentFarmerData
                );

            }


            showScreen("dashboardPage");

            loadWeather();

            loadMandiData();


        } catch (error) {

            console.error(
                "Auth data error:",
                error
            );

        }

    });

}


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function firebaseErrorMessage(error) {

    const code =
        error?.code || "";

    const messages = {

        "auth/invalid-email":
            "Invalid email address.",

        "auth/user-not-found":
            "No account found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password must contain at least 6 characters.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return messages[code] ||
        error?.message ||
        "Something went wrong.";
}


/* =========================================================
   10. FARMER DATA
========================================================= */

function populateFarmerData(data) {

    if (!data) {
        return;
    }


    setText(
        "headerFarmerName",
        data.name || "Farmer"
    );

    setText(
        "dashboardFarmerName",
        data.name || "Farmer"
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
        data.market || "—"
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
        data.market || ""
    );

    setValue(
        "profileLanguage",
        data.language || currentLanguage
    );


    setText(
        "profilePageName",
        data.name || "Farmer"
    );

    setText(
        "profilePageEmail",
        data.email || ""
    );


    if (data.language) {

        currentLanguage =
            data.language;

        applyLanguage(
            currentLanguage
        );

    }

}


/* =========================================================
   11. NAVIGATION
========================================================= */

function setupNavigation() {

    const hamburger =
        document.getElementById("hamburgerBtn");

    const closeMenu =
        document.getElementById("closeMenuBtn");

    const sideMenu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");


    if (hamburger) {

        hamburger.addEventListener("click", () => {

            sideMenu?.classList.add("open");
            overlay?.classList.add("active");

        });

    }


    if (closeMenu) {

        closeMenu.addEventListener("click", closeSideMenu);

    }


    if (overlay) {

        overlay.addEventListener("click", closeSideMenu);

    }


    document.querySelectorAll(
        "[data-section]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.dataset.section;

            showAppSection(section);

            closeSideMenu();

        });

    });


    document.querySelectorAll(
        "[data-profile-section]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            showAppSection(
                button.dataset.profileSection
            );

            closeProfileMenu();

        });

    });


    const profileButton =
        document.getElementById("profileButton");

    const profileMenu =
        document.getElementById("profileMenu");


    if (profileButton) {

        profileButton.addEventListener("click", event => {

            event.stopPropagation();

            profileMenu?.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        if (
            profileMenu &&
            !profileMenu.contains(event.target) &&
            event.target !== profileButton
        ) {

            profileMenu.classList.remove("open");

        }

    });


    document
        .querySelectorAll(
            "#sideLogoutBtn, #profileLogoutBtn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                logoutUser
            );

        });

}


/* =========================================================
   SHOW APP SECTION
========================================================= */

function showAppSection(sectionId) {

    document.querySelectorAll(
        ".app-section"
    ).forEach(section => {

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    if (sectionId === "weatherSection") {
        loadWeather();
    }


    if (sectionId === "marketSection") {
        loadMandiData();
    }


    if (sectionId === "comparisonSection") {
        loadMarketComparison();
    }

}


function closeSideMenu() {

    document
        .getElementById("sideMenu")
        ?.classList.remove("open");

    document
        .getElementById("menuOverlay")
        ?.classList.remove("active");

}


function closeProfileMenu() {

    document
        .getElementById("profileMenu")
        ?.classList.remove("open");

}


/* =========================================================
   12. WEATHER API
========================================================= */

function setupWeather() {

    const refreshButton =
        document.getElementById(
            "refreshWeatherBtn"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            loadWeather
        );

    }

}


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


    emptyState.classList.remove("hidden");
    weatherData.classList.add("hidden");


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + KOPARGAON_LATITUDE +
            "&longitude=" + KOPARGAON_LONGITUDE +
            "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m" +
            "&hourly=precipitation_probability" +
            "&timezone=Asia%2FKolkata";


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Weather API request failed."
            );
        }


        const data =
            await response.json();


        const current =
            data.current || {};


        setText(
            "weatherTemperature",
            current.temperature_2m !== undefined
                ? `${current.temperature_2m} °C`
                : "—"
        );


        setText(
            "weatherHumidity",
            current.relative_humidity_2m !== undefined
                ? `${current.relative_humidity_2m} %`
                : "—"
        );


        setText(
            "weatherWind",
            current.wind_speed_10m !== undefined
                ? `${current.wind_speed_10m} km/h`
                : "—"
        );


        let rainProbability = "—";


        if (
            data.hourly &&
            data.hourly.precipitation_probability &&
            data.hourly.precipitation_probability.length
        ) {

            rainProbability =
                data.hourly.precipitation_probability[0] +
                " %";

        }


        setText(
            "weatherRain",
            rainProbability
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
   13. MANDI / MARKET API
========================================================= */

function setupMandi() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (selector) {

        selector.addEventListener(
            "change",
            () => {

                loadMandiData();

            }
        );

    }

}


/* =========================================================
   LOAD MANDI DATA
========================================================= */

async function loadMandiData() {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) {
        return;
    }


    if (
        !DATA_GOV_API_KEY ||
        DATA_GOV_API_KEY ===
        "YOUR_DATA_GOV_API_KEY"
    ) {

        showMandiUnavailable(
            "Add your data.gov.in API key in script.js."
        );

        return;
    }


    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    const selectedCrop =
        selector
            ? selector.value
            : "onion";


    const commodity =
        selectedCrop === "wheat"
            ? "Wheat"
            : "Onion";


    tableBody.innerHTML = `

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

        /*
          data.gov.in API
        */

        const url =
            "https://api.data.gov.in/resource/" +
            MANDI_RESOURCE_ID +
            "?api-key=" +
            encodeURIComponent(DATA_GOV_API_KEY) +
            "&format=json" +
            "&limit=100" +
            "&filters[state]=Maharashtra" +
            "&filters[commodity]=" +
            encodeURIComponent(commodity);


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                `Mandi API HTTP ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "Mandi API response:",
            result
        );


        let records =
            Array.isArray(result.records)
                ? result.records
                : [];


        /*
          Try to identify Kopargaon records.
        */

        const kopargaonRecords =
            records.filter(record => {

                const market =
                    String(
                        record.market ||
                        record.Market ||
                        ""
                    ).toLowerCase();

                const district =
                    String(
                        record.district ||
                        record.District ||
                        ""
                    ).toLowerCase();


                return (
                    market.includes("kopargaon") ||
                    district.includes("ahmednagar") ||
                    district.includes("ahilyanagar")
                );

            });


        /*
          Prefer Kopargaon.
          If no Kopargaon record is returned,
          display Maharashtra records so the
          prototype does not remain blank.
        */

        if (kopargaonRecords.length > 0) {

            records =
                kopargaonRecords;

        }


        if (records.length === 0) {

            showMandiUnavailable(
                "No current mandi record was returned for this crop."
            );

            updateConnectionStatus(false);

            return;
        }


        renderMandiTable(records);

        updateConnectionStatus(true);

        loadMarketComparisonFromRecords(records);


    } catch (error) {

        console.error(
            "Mandi API error:",
            error
        );


        showMandiUnavailable(
            "Mandi API could not be reached. Check your API key and connection."
        );


        updateConnectionStatus(false);

    }

}


/* =========================================================
   RENDER MANDI TABLE
========================================================= */

function renderMandiTable(records) {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    records
        .slice(0, 20)
        .forEach(record => {

            const market =
                record.market ||
                record.Market ||
                "—";


            const commodity =
                record.commodity ||
                record.Commodity ||
                "—";


            const modalPrice =
                record.modal_price ||
                record.Modal_Price ||
                record.modalPrice ||
                "—";


            const minPrice =
                record.min_price ||
                record.Min_Price ||
                "—";


            const maxPrice =
                record.max_price ||
                record.Max_Price ||
                "—";


            const arrivalDate =
                record.arrival_date ||
                record.Arrival_Date ||
                record.date ||
                "—";


            const priceText =
                modalPrice !== "—"
                    ? `₹${modalPrice}`
                    : `₹${minPrice} - ₹${maxPrice}`;


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${escapeHTML(market)}</td>

                <td>${escapeHTML(commodity)}</td>

                <td>
                    <strong>
                        ${escapeHTML(priceText)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(arrivalDate)}
                </td>

            `;


            tableBody.appendChild(row);

        });

}


/* =========================================================
   MANDI EMPTY STATE
========================================================= */

function showMandiUnavailable(message) {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


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
   14. MARKET COMPARISON
========================================================= */

async function loadMarketComparison() {

    /*
      The same mandi API is used here.
      We fetch a larger Maharashtra dataset
      and try to identify the three markets
      used in your HTML.
    */


    if (
        !DATA_GOV_API_KEY ||
        DATA_GOV_API_KEY ===
        "YOUR_DATA_GOV_API_KEY"
    ) {

        return;

    }


    try {

        const selector =
            document.getElementById(
                "cropPriceSelector"
            );


        const commodity =
            selector?.value === "wheat"
                ? "Wheat"
                : "Onion";


        const url =
            "https://api.data.gov.in/resource/" +
            MANDI_RESOURCE_ID +
            "?api-key=" +
            encodeURIComponent(DATA_GOV_API_KEY) +
            "&format=json" +
            "&limit=500" +
            "&filters[state]=Maharashtra" +
            "&filters[commodity]=" +
            encodeURIComponent(commodity);


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Comparison API failed."
            );
        }


        const result =
            await response.json();


        const records =
            Array.isArray(result.records)
                ? result.records
                : [];


        loadMarketComparisonFromRecords(
            records
        );


    } catch (error) {

        console.error(
            "Comparison error:",
            error
        );

    }

}


/* =========================================================
   COMPARISON FROM RECORDS
========================================================= */

function loadMarketComparisonFromRecords(
    records
) {

    const cards =
        document.querySelectorAll(
            "#comparisonSection .market-card"
        );


    if (!cards.length) {
        return;
    }


    const marketNames = [
        "Kopargaon",
        "Yeola",
        "Shirdi"
    ];


    cards.forEach((card, index) => {

        const target =
            marketNames[index];


        const record =
            records.find(item => {

                const market =
                    String(
                        item.market ||
                        item.Market ||
                        ""
                    ).toLowerCase();


                return market.includes(
                    target.toLowerCase()
                );

            });


        const priceElement =
            card.querySelector(
                ".market-value strong"
            );


        const statusElement =
            card.querySelector(
                "p"
            );


        if (!record) {

            if (priceElement) {
                priceElement.textContent =
                    "—";
            }

            if (statusElement) {

                statusElement.textContent =
                    translations[
                        currentLanguage
                    ]?.dataUnavailable ||
                    "Verified data unavailable";

            }

            return;

        }


        const modalPrice =
            record.modal_price ||
            record.Modal_Price ||
            record.modalPrice;


        const minPrice =
            record.min_price ||
            record.Min_Price;


        const maxPrice =
            record.max_price ||
            record.Max_Price;


        if (priceElement) {

            if (modalPrice) {

                priceElement.textContent =
                    `₹${modalPrice}`;

            } else if (
                minPrice &&
                maxPrice
            ) {

                priceElement.textContent =
                    `₹${minPrice} - ₹${maxPrice}`;

            } else {

                priceElement.textContent =
                    "—";

            }

        }


        if (statusElement) {

            statusElement.textContent =
                record.arrival_date ||
                record.Arrival_Date ||
                "Verified market data";

        }

    });

}


/* =========================================================
   15. PROFILE
========================================================= */

function setupProfile() {

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );

    const cancelButton =
        document.getElementById(
            "cancelProfileEditBtn"
        );

    const profileForm =
        document.getElementById(
            "profileForm"
        );


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

                populateFarmerData(
                    currentFarmerData
                );

                disableProfileEditing();

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

    const ids = [
        "profileName",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"
    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.disabled = false;
        }

    });


    document
        .getElementById(
            "profileEditActions"
        )
        ?.classList.remove("hidden");

}


/* =========================================================
   DISABLE PROFILE EDIT
========================================================= */

function disableProfileEditing() {

    const ids = [
        "profileName",
        "profileEmail",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea",
        "profileMarket",
        "profileLanguage"
    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.disabled = true;
        }

    });


    document
        .getElementById(
            "profileEditActions"
        )
        ?.classList.add("hidden");

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    const message =
        document.getElementById(
            "profileMessage"
        );


    const updatedData = {

        name:
            getValue("profileName"),

        email:
            getValue("profileEmail"),

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
            currentUser &&
            !currentUser.isAnonymous
        ) {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .set(
                    updatedData,
                    {
                        merge: true
                    }
                );

        }


        currentFarmerData =
            updatedData;


        currentLanguage =
            updatedData.language ||
            currentLanguage;


        localStorage.setItem(
            "smartagriLanguage",
            currentLanguage
        );


        populateFarmerData(
            currentFarmerData
        );


        disableProfileEditing();


        showMessage(
            message,
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            message,
            error.message ||
            "Could not update profile.",
            "error"
        );

    }

}


/* =========================================================
   16. SETTINGS
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

        voiceSetting.checked =
            localStorage.getItem(
                "smartagriVoice"
            ) !== "false";


        voiceSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartagriVoice",
                    voiceSetting.checked
                );

            }
        );

    }


    if (notificationSetting) {

        notificationSetting.checked =
            localStorage.getItem(
                "smartagriNotifications"
            ) === "true";


        notificationSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartagriNotifications",
                    notificationSetting.checked
                );

            }
        );

    }

}


/* =========================================================
   17. GOVERNMENT SCHEMES
========================================================= */

function setupGovernmentSchemes() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const url =
                        button.dataset.schemeUrl;

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
   18. CROP HEALTH IMAGE
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


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files?.[0];


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload = e => {

                if (preview) {

                    preview.src =
                        e.target.result;

                }


                previewContainer
                    ?.classList.remove(
                        "hidden"
                    );


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
            () => {

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
                            Image uploaded successfully,
                            but an AI crop-health API
                            has not been connected yet.
                        </p>

                    `;

                }

            }
        );

    }

}


/* =========================================================
   19. VOICE ASSISTANCE
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

    const voiceInput =
        document.getElementById(
            "voiceInput"
        );

    const voiceResponse =
        document.getElementById(
            "voiceResponse"
        );


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition is not supported by this browser.";

        }

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.continuous = false;
    recognition.interimResults = false;


    recognition.lang =
        getSpeechLanguage(
            currentLanguage
        );


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                recognition.lang =
                    getSpeechLanguage(
                        currentLanguage
                    );

                recognition.start();

                startButton.classList.add(
                    "hidden"
                );

                stopButton?.classList.remove(
                    "hidden"
                );

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                recognition.stop();

            }
        );

    }


    recognition.onresult =
        event => {

            const text =
                event.results[0][0].transcript;


            if (voiceInput) {
                voiceInput.value =
                    text;
            }


            if (voiceResponse) {

                voiceResponse.textContent =
                    text;

            }

        };


    recognition.onend =
        () => {

            startButton?.classList.remove(
                "hidden"
            );

            stopButton?.classList.add(
                "hidden"
            );

        };


    recognition.onerror =
        error => {

            console.error(
                "Voice recognition error:",
                error
            );


            startButton?.classList.remove(
                "hidden"
            );

            stopButton?.classList.add(
                "hidden"
            );

        };

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
   20. AI ASSISTANT
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

    if (!form || !input) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

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


            setTimeout(() => {

                addChatMessage(
                    "AI service is not connected yet. Connect your AI backend to receive farming answers.",
                    "assistant"
                );

            }, 500);

        }
    );

}


function addChatMessage(
    text,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) {
        return;
    }


    const message =
        document.createElement("div");


    message.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    message.innerHTML = `

        <div class="chat-avatar">
            ${type === "user" ? "👨‍🌾" : "🤖"}
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? "You"
                        : (
                            translations[
                                currentLanguage
                            ]?.assistant ||
                            "Assistant"
                        )
                }
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   21. CONNECTION STATUS
========================================================= */

function setupConnectionStatus() {

    updateConnectionStatus(
        navigator.onLine
    );


    window.addEventListener(
        "online",
        () => {

            updateConnectionStatus(true);

        }
    );


    window.addEventListener(
        "offline",
        () => {

            updateConnectionStatus(false);

        }
    );

}


function updateConnectionStatus(
    isOnline
) {

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
            "offline",
            !isOnline
        );

        status.classList.toggle(
            "online",
            isOnline
        );

    }


    const translated =
        isOnline
            ? (
                translations[
                    currentLanguage
                ]?.online ||
                "Online"
            )
            : (
                translations[
                    currentLanguage
                ]?.offline ||
                "Offline"
            );


    if (text) {
        text.textContent =
            translated;
    }


    if (dashboardText) {
        dashboardText.textContent =
            translated;
    }

}


/* =========================================================
   22. LOGOUT
========================================================= */

async function logoutUser() {

    try {

        await auth.signOut();

        currentUser = null;
        currentFarmerData = null;

        showScreen("loginPage");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* =========================================================
   23. HELPER FUNCTIONS
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


function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.className =
        `message ${type}`;

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
