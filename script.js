/* =========================================================
   SMARTAGRI - COMPLETE SCRIPT.JS
   Works with the exact HTML provided
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

let auth = null;
let db = null;

try {

    if (typeof firebase !== "undefined") {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        db = firebase.firestore();

        console.log("Firebase initialized successfully.");

    }

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;

let currentFarmer = null;

let weatherData = null;


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        appName: "SmartAgri",

        appTagline:
            "Smart Agriculture Market Intelligence System",

        chooseLanguage:
            "Choose Your Language",

        languageDescription:
            "Select your preferred language to continue.",

        continue: "Continue",

        loginTitle: "Farmer Login",

        loginSubtitle:
            "Login to access SmartAgri",

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

        alreadyAccount:
            "Already have an account?",

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

        connectionStatus:
            "Connection Status",

        online: "Online",

        offline: "Offline",

        profileSummary:
            "Your registered information",

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

        weatherUnavailable:
            "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather data has been received.",

        temperature: "Temperature",

        humidity: "Humidity",

        windSpeed: "Wind Speed",

        rainChance: "Rain Chance",

        marketSubtitle:
            "Current crop prices from connected verified sources.",

        marketPriceTable:
            "Market Price Table",

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

        appTagline:
            "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage:
            "अपनी भाषा चुनें",

        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri का उपयोग करने के लिए लॉगिन करें",

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

        shirdiMarket: "शिरडी बाजार",

        preferredLanguage: "पसंदीदा भाषा",

        createAccount: "खाता बनाएं",

        alreadyAccount:
            "पहले से खाता है?",

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

        online: "ऑनलाइन",

        offline: "ऑफ़लाइन",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

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

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ है।",

        temperature: "तापमान",

        humidity: "नमी",

        windSpeed: "हवा की गति",

        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable:
            "बाजार भाव तालिका",

        market: "बाजार",

        crop: "फसल",

        price: "भाव",

        date: "तारीख",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

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
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        learnMore: "अधिक जानें",

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

        voiceResponse:
            "वॉइस उत्तर",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        voiceInputPlaceholder:
            "वॉइस इनपुट यहां दिखाई देगा...",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "परिवर्तन सहेजें",

        cancel: "रद्द करें",

        settingsSubtitle:
            "अपनी SmartAgri प्राथमिकताएं प्रबंधित करें।",

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
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    mr: {

        appName: "स्मार्ट अॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "आपली भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी आपली आवडती भाषा निवडा.",

        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri वापरण्यासाठी लॉगिन करा",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe: "मला लक्षात ठेवा",

        forgotPassword:
            "पासवर्ड विसरलात?",

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
            "जमिनीचे क्षेत्र",

        preferredMarket:
            "पसंतीचे बाजारपेठ",

        selectMarket:
            "बाजारपेठ निवडा",

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
            "पिकांची माहिती",

        cropHealth:
            "पिकांचे आरोग्य",

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
            "आपली शेतीची माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        online:
            "ऑनलाइन",

        offline:
            "ऑफलाइन",

        profileSummary:
            "आपली नोंदणीकृत माहिती",

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
            "सत्यापित स्रोतांमधून सध्याचे पिकांचे बाजारभाव.",

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

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पिकांची लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onion:
            "कांदा",

        wheat:
            "गहू",

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
            "AI सहाय्यासाठी पिकाची प्रतिमा अपलोड करा.",

        uploadCropImage:
            "पीक / पानाची प्रतिमा अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी प्रतिमा निवडा.",

        chooseImage:
            "प्रतिमा निवडा",

        analyzeCrop:
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री फसल विमा योजनेची अधिकृत माहिती.",

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
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

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

        voiceResponse:
            "व्हॉइस उत्तर",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        profileSubtitle:
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "आपल्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "आपली आवडती अॅप्लिकेशन भाषा निवडा.",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."

    }

};


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(key) {

    if (
        translations[currentLanguage] &&
        translations[currentLanguage][key]
    ) {
        return translations[currentLanguage][key];
    }

    if (translations.en[key]) {
        return translations.en[key];
    }

    return key;
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
        "smartAgriLanguage",
        currentLanguage
    );

    document.documentElement.lang =
        currentLanguage;


    /* -----------------------------------------
       TEXT
    ----------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (key) {
                element.textContent = t(key);
            }

        });


    /* -----------------------------------------
       PLACEHOLDERS
    ----------------------------------------- */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (key) {
                element.placeholder = t(key);
            }

        });


    /* -----------------------------------------
       LANGUAGE SELECTORS
    ----------------------------------------- */

    const selectors = [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ];

    selectors.forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = currentLanguage;
        }

    });


    /* -----------------------------------------
       CONNECTION STATUS
    ----------------------------------------- */

    updateConnectionStatus();


    /* -----------------------------------------
       WEATHER TEXT
    ----------------------------------------- */

    if (weatherData) {
        displayWeather(weatherData);
    }


    /* -----------------------------------------
       CROP MODAL
    ----------------------------------------- */

    translateOpenCropModal();

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus(forceOnline = false) {

    const isOnline =
        forceOnline || navigator.onLine;


    const connectionStatus =
        document.getElementById(
            "connectionStatus"
        );

    const connectionText =
        document.getElementById(
            "connectionText"
        );

    const dashboardConnectionText =
        document.getElementById(
            "dashboardConnectionText"
        );


    if (isOnline) {

        if (connectionStatus) {

            connectionStatus
                .classList
                .remove("offline");

            connectionStatus
                .classList
                .add("online");

        }

        if (connectionText) {
            connectionText.textContent =
                t("online");
        }

        if (dashboardConnectionText) {
            dashboardConnectionText.textContent =
                t("online");
        }

    } else {

        if (connectionStatus) {

            connectionStatus
                .classList
                .remove("online");

            connectionStatus
                .classList
                .add("offline");

        }

        if (connectionText) {
            connectionText.textContent =
                t("offline");
        }

        if (dashboardConnectionText) {
            dashboardConnectionText.textContent =
                t("offline");
        }

    }

}


/* Browser network events */

window.addEventListener(
    "online",
    function () {

        updateConnectionStatus(true);

    }
);


window.addEventListener(
    "offline",
    function () {

        updateConnectionStatus(false);

    }
);


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

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
   DASHBOARD
========================================================= */

function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove(
                "active-screen"
            );

        });


    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }

    loadFarmerIntoUI();

    updateConnectionStatus();

}


/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(function (section) {

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

    }


    closeSideMenu();

    closeProfileMenu();


    if (sectionId === "weatherSection") {

        loadWeather();

    }

}


/* =========================================================
   SIDE MENU
========================================================= */

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
        overlay.classList.add("active");
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
        overlay.classList.remove("active");
    }

}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (menu) {

        menu.classList.toggle(
            "active"
        );

    }

}


function closeProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (menu) {
        menu.classList.remove(
            "active"
        );
    }

}


/* =========================================================
   DEMO FARMER
========================================================= */

function createDemoFarmer() {

    return {

        name: "Demo Farmer",

        email: "demo@smartagri.com",

        mobile: "9876543210",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "5 Acres",

        preferredMarket:
            "Kopargaon APMC",

        language: currentLanguage

    };

}


/* =========================================================
   LOAD FARMER INTO UI
========================================================= */

function loadFarmerIntoUI() {

    if (!currentFarmer) {
        currentFarmer =
            createDemoFarmer();
    }


    const farmer =
        currentFarmer;


    const ids = {

        headerFarmerName:
            farmer.name,

        dashboardFarmerName:
            farmer.name,

        summaryName:
            farmer.name,

        summaryVillage:
            farmer.village,

        summaryLand:
            farmer.landArea,

        summaryMarket:
            farmer.preferredMarket,

        profilePageName:
            farmer.name,

        profilePageEmail:
            farmer.email,

        profileName:
            farmer.name,

        profileEmail:
            farmer.email,

        profileMobile:
            farmer.mobile,

        profileVillage:
            farmer.village,

        profileState:
            farmer.state,

        profileLandArea:
            farmer.landArea,

        profileMarket:
            farmer.preferredMarket,

        profileLanguage:
            farmer.language || currentLanguage

    };


    Object.keys(ids).forEach(function (id) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }


        if (
            element.tagName === "INPUT" ||
            element.tagName === "SELECT" ||
            element.tagName === "TEXTAREA"
        ) {

            element.value =
                ids[id];

        } else {

            element.textContent =
                ids[id];

        }

    });


    const profileLanguage =
        document.getElementById(
            "profileLanguage"
        );

    if (profileLanguage) {

        profileLanguage.value =
            farmer.language ||
            currentLanguage;

    }


    applyLanguage(currentLanguage);

}


/* =========================================================
   FIREBASE PROFILE LOAD
========================================================= */

async function loadFirebaseProfile(user) {

    if (!user || !db) {
        return null;
    }


    try {

        const doc =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (doc.exists) {

            return {

                ...doc.data(),

                email:
                    doc.data().email ||
                    user.email ||
                    ""

            };

        }

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }


    return null;

}


/* =========================================================
   LOGIN
========================================================= */

async function handleLogin(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            ?.value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            ?.value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!email || !password) {
        return;
    }


    if (!auth) {

        showMessage(
            message,
            "Firebase is not available. Use Demo Dashboard.",
            "error"
        );

        return;

    }


    try {

        if (message) {
            message.textContent = "";
        }


        const credential =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        currentUser =
            credential.user;


        const profile =
            await loadFirebaseProfile(
                currentUser
            );


        currentFarmer =
            profile || {

                name:
                    currentUser.displayName ||
                    "Farmer",

                email:
                    currentUser.email,

                mobile: "",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "",

                preferredMarket:
                    "Kopargaon APMC",

                language:
                    currentLanguage

            };


        showDashboard();


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
   REGISTER
========================================================= */

async function handleRegistration(event) {

    event.preventDefault();


    const name =
        getValue("registerName");

    const email =
        getValue("registerEmail");

    const mobile =
        getValue("registerMobile");

    const village =
        getValue("registerVillage");

    const state =
        getValue("registerState");

    const landArea =
        getValue("registerLandArea");

    const preferredMarket =
        getValue("registerMarket");

    const language =
        getValue("registerLanguage") ||
        currentLanguage;

    const password =
        getValue("registerPassword");


    const message =
        document.getElementById(
            "registerMessage"
        );


    if (!auth || !db) {

        showMessage(
            message,
            "Firebase is not available.",
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


        await user.updateProfile({
            displayName: name
        });


        await db
            .collection("farmers")
            .doc(user.uid)
            .set({

                name,

                email,

                mobile,

                village,

                state,

                landArea,

                preferredMarket,

                language,

                createdAt:
                    firebase.firestore
                        .FieldValue
                        .serverTimestamp()

            });


        currentUser =
            user;


        currentFarmer = {

            name,

            email,

            mobile,

            village,

            state,

            landArea,

            preferredMarket,

            language

        };


        currentLanguage =
            language;


        localStorage.setItem(
            "smartAgriLanguage",
            language
        );


        showDashboard();


        loadWeather();


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
   FIREBASE ERROR MESSAGE
========================================================= */

function getFirebaseErrorMessage(error) {

    const code =
        error?.code || "";


    const messages = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password should contain at least 6 characters.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[code] ||
        error?.message ||
        "Something went wrong."
    );

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function handleForgotPassword() {

    const email =
        getValue("loginEmail");


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
            "Firebase is not available.",
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
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    currentUser = null;

    currentFarmer =
        createDemoFarmer();


    showDashboard();


    /* Force the connection badge to reflect
       the browser's actual network status. */

    updateConnectionStatus();


    /* Weather */

    loadWeather();

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

        console.error(
            "Logout error:",
            error
        );

    }


    currentUser = null;

    currentFarmer = null;

    weatherData = null;


    document
        .querySelectorAll(".app-section")
        .forEach(function (section) {

            section.classList.remove(
                "active-section"
            );

        });


    const dashboard =
        document.getElementById(
            "dashboardSection"
        );

    if (dashboard) {

        dashboard.classList.add(
            "active-section"
        );

    }


    showScreen("loginPage");

}


/* =========================================================
   PROFILE EDIT
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


    fields.forEach(function (id) {

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
        actions.classList.remove(
            "hidden"
        );
    }

}


function cancelProfileEditing() {

    loadFarmerIntoUI();


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
        actions.classList.add(
            "hidden"
        );

    }

}


async function saveProfile(event) {

    event.preventDefault();


    const updated = {

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

        language:
            getValue("profileLanguage") ||
            currentLanguage

    };


    if (!currentFarmer) {
        currentFarmer =
            createDemoFarmer();
    }


    currentFarmer = {

        ...currentFarmer,

        ...updated

    };


    const message =
        document.getElementById(
            "profileMessage"
        );


    try {

        if (
            currentUser &&
            db
        ) {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .set(
                    updated,
                    {
                        merge: true
                    }
                );

        }


        currentLanguage =
            updated.language;


        localStorage.setItem(
            "smartAgriLanguage",
            currentLanguage
        );


        loadFarmerIntoUI();


        cancelProfileEditing();


        showMessage(
            message,
            "Profile saved successfully.",
            "success"
        );


        loadWeather();


    } catch (error) {

        console.error(
            "Profile save error:",
            error
        );


        showMessage(
            message,
            error.message ||
            "Unable to save profile.",
            "error"
        );

    }

}


/* =========================================================
   WEATHER API
   OPEN-METEO - NO API KEY REQUIRED
========================================================= */

async function getCoordinatesForVillage(
    village,
    state
) {

    const query =
        encodeURIComponent(
            `${village}, ${state}, India`
        );


    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;


    const response =
        await fetch(url);


    if (!response.ok) {
        throw new Error(
            "Unable to find location."
        );
    }


    const data =
        await response.json();


    if (
        !data.results ||
        data.results.length === 0
    ) {

        throw new Error(
            "Location not found."
        );

    }


    /* Prefer Maharashtra / India */

    let result =
        data.results.find(function (item) {

            return (
                item.country_code === "IN" &&
                (
                    !state ||
                    item.admin1 === state
                )
            );

        });


    if (!result) {
        result = data.results[0];
    }


    return {

        latitude:
            result.latitude,

        longitude:
            result.longitude,

        name:
            result.name,

        state:
            result.admin1 ||
            state ||
            "Maharashtra"

    };

}


/* =========================================================
   LOAD WEATHER
========================================================= */

async function loadWeather() {

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const errorElement =
        document.getElementById(
            "weatherError"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const weatherDisplay =
        document.getElementById(
            "weatherData"
        );


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }


    if (errorElement) {

        errorElement.classList.add(
            "hidden"
        );

        errorElement.textContent = "";

    }


    try {

        let village =
            currentFarmer?.village ||
            "Kopargaon";


        let state =
            currentFarmer?.state ||
            "Maharashtra";


        let location;


        try {

            location =
                await getCoordinatesForVillage(
                    village,
                    state
                );

        } catch (locationError) {

            console.warn(
                "Village geocoding failed. Using Kopargaon fallback.",
                locationError
            );


            location = {

                latitude:
                    19.8826,

                longitude:
                    74.4764,

                name:
                    "Kopargaon",

                state:
                    "Maharashtra"

            };

        }


        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1&timezone=auto`;


        const response =
            await fetch(
                weatherUrl
            );


        if (!response.ok) {

            throw new Error(
                `Weather service returned ${response.status}`
            );

        }


        const data =
            await response.json();


        if (!data.current) {

            throw new Error(
                "Weather data was empty."
            );

        }


        let rainChance = 0;


        if (
            data.hourly &&
            Array.isArray(
                data.hourly
                    .precipitation_probability
            )
        ) {

            const currentTime =
                data.current.time;


            let index =
                data.hourly.time.indexOf(
                    currentTime
                );


            if (index < 0) {
                index = 0;
            }


            rainChance =
                data.hourly
                    .precipitation_probability[
                        index
                    ] ?? 0;

        }


        weatherData = {

            location:

                location.name,

            state:

                location.state,

            temperature:

                data.current
                    .temperature_2m,

            humidity:

                data.current
                    .relative_humidity_2m,

            wind:

                data.current
                    .wind_speed_10m,

            rain:

                rainChance,

            precipitation:

                data.current
                    .precipitation,

            weatherCode:

                data.current
                    .weather_code,

            time:

                data.current.time

        };


        /* Successful internet request means
           the application is online. */

        updateConnectionStatus(true);


        displayWeather(
            weatherData
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        if (weatherDisplay) {

            weatherDisplay.classList.add(
                "hidden"
            );

        }


        if (empty) {

            empty.classList.remove(
                "hidden"
            );

        }


        if (errorElement) {

            errorElement.textContent =
                "Weather service unavailable: " +
                error.message;

            errorElement.classList.remove(
                "hidden"
            );

        }

    } finally {

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }

    }

}


/* =========================================================
   WEATHER DISPLAY
========================================================= */

function displayWeather(data) {

    if (!data) {
        return;
    }


    const temperature =
        document.getElementById(
            "weatherTemperature"
        );

    const humidity =
        document.getElementById(
            "weatherHumidity"
        );

    const wind =
        document.getElementById(
            "weatherWind"
        );

    const rain =
        document.getElementById(
            "weatherRain"
        );

    const weatherDisplay =
        document.getElementById(
            "weatherData"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );


    if (temperature) {

        temperature.textContent =
            `${Number(data.temperature).toFixed(1)} °C`;

    }


    if (humidity) {

        humidity.textContent =
            `${data.humidity}%`;

    }


    if (wind) {

        wind.textContent =
            `${Number(data.wind).toFixed(1)} km/h`;

    }


    if (rain) {

        rain.textContent =
            `${Math.round(data.rain)}%`;

    }


    if (weatherDisplay) {

        weatherDisplay.classList.remove(
            "hidden"
        );

    }


    if (empty) {

        empty.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   MARKET TABLE
========================================================= */

function showMarketUnavailable() {

    const body =
        document.getElementById(
            "marketTableBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHTML(
                            t("marketDataUnavailable")
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            t(
                                "marketDataUnavailableDescription"
                            )
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


function updateMarketSelection() {

    showMarketUnavailable();

    updateComparisonCards();

}


function updateComparisonCards() {

    document
        .querySelectorAll(
            "[data-market-card]"
        )
        .forEach(function (card) {

            const price =
                card.querySelector(
                    ".comparison-price"
                );

            const status =
                card.querySelector(
                    ".comparison-status"
                );


            if (price) {
                price.textContent = "—";
            }


            if (status) {

                status.textContent =
                    t("dataUnavailable");

            }

        });

}


/* =========================================================
   CROP MODAL LANGUAGE SUPPORT
========================================================= */

const localizedCropContent = {

    en: {

        onion: {

            cultivation: {

                title:
                    "Onion Cultivation Guidance",

                subtitle:
                    "Important steps for successful onion cultivation."

            },

            management: {

                title:
                    "Onion Crop Management",

                subtitle:
                    "Manage the crop throughout its growing period."

            },

            practices: {

                title:
                    "Onion Farming Practices",

                subtitle:
                    "Practical recommendations for better onion production."

            }

        },

        wheat: {

            cultivation: {

                title:
                    "Wheat Cultivation Guidance",

                subtitle:
                    "Important steps for successful wheat production."

            },

            management: {

                title:
                    "Wheat Crop Management",

                subtitle:
                    "Manage wheat from germination through harvest."

            },

            practices: {

                title:
                    "Wheat Farming Practices",

                subtitle:
                    "Practical methods for maintaining a healthy wheat crop."

            }

        }

    },


    hi: {

        onion: {

            cultivation: {

                title:
                    "प्याज की खेती का मार्गदर्शन",

                subtitle:
                    "सफल प्याज उत्पादन के लिए महत्वपूर्ण चरण।"

            },

            management: {

                title:
                    "प्याज फसल प्रबंधन",

                subtitle:
                    "पूरे फसल विकास के दौरान फसल का प्रबंधन करें।"

            },

            practices: {

                title:
                    "प्याज की खेती की पद्धतियां",

                subtitle:
                    "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।"

            }

        },

        wheat: {

            cultivation: {

                title:
                    "गेहूं की खेती का मार्गदर्शन",

                subtitle:
                    "सफल गेहूं उत्पादन के लिए महत्वपूर्ण चरण।"

            },

            management: {

                title:
                    "गेहूं फसल प्रबंधन",

                subtitle:
                    "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।"

            },

            practices: {

                title:
                    "गेहूं की खेती की पद्धतियां",

                subtitle:
                    "स्वस्थ गेहूं फसल के लिए व्यावहारिक तरीके।"

            }

        }

    },


    mr: {

        onion: {

            cultivation: {

                title:
                    "कांदा लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी कांदा लागवडीसाठी महत्त्वाचे टप्पे."

            },

            management: {

                title:
                    "कांदा पीक व्यवस्थापन",

                subtitle:
                    "पिकाच्या संपूर्ण वाढीच्या काळात व्यवस्थापन करा."

            },

            practices: {

                title:
                    "कांदा शेती पद्धती",

                subtitle:
                    "चांगल्या कांदा उत्पादनासाठी व्यावहारिक सूचना."

            }

        },

        wheat: {

            cultivation: {

                title:
                    "गहू लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे."

            },

            management: {

                title:
                    "गहू पीक व्यवस्थापन",

                subtitle:
                    "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा."

            },

            practices: {

                title:
                    "गहू शेती पद्धती",

                subtitle:
                    "निरोगी गहू पिकासाठी व्यावहारिक पद्धती."

            }

        }

    }

};


function translateOpenCropModal() {

    const modal =
        document.getElementById(
            "cropInfoModal"
        );


    if (
        !modal ||
        modal.classList.contains("hidden")
    ) {
        return;
    }


    const title =
        document.getElementById(
            "cropInfoModalTitle"
        );

    const subtitle =
        document.getElementById(
            "cropInfoModalSubtitle"
        );


    const currentTitle =
        title?.textContent || "";


    let crop = null;


    if (
        currentTitle
            .toLowerCase()
            .includes("onion") ||
        currentTitle.includes("प्याज") ||
        currentTitle.includes("कांदा")
    ) {

        crop = "onion";

    } else if (

        currentTitle
            .toLowerCase()
            .includes("wheat") ||
        currentTitle.includes("गेहूं") ||
        currentTitle.includes("गहू")

    ) {

        crop = "wheat";

    }


    if (!crop) {
        return;
    }


    let topic = null;


    if (
        currentTitle
            .toLowerCase()
            .includes("cultivation") ||
        currentTitle.includes("खेती") ||
        currentTitle.includes("लागवड")
    ) {

        topic = "cultivation";

    } else if (
        currentTitle
            .toLowerCase()
            .includes("management") ||
        currentTitle.includes("प्रबंधन") ||
        currentTitle.includes("व्यवस्थापन")
    ) {

        topic = "management";

    } else if (
        currentTitle
            .toLowerCase()
            .includes("practices") ||
        currentTitle.includes("पद्धत")
    ) {

        topic = "practices";

    }


    if (
        crop &&
        topic &&
        localizedCropContent[
            currentLanguage
        ] &&
        localizedCropContent[
            currentLanguage
        ][crop] &&
        localizedCropContent[
            currentLanguage
        ][crop][topic]
    ) {

        const data =
            localizedCropContent[
                currentLanguage
            ][crop][topic];


        if (title) {
            title.textContent =
                data.title;
        }


        if (subtitle) {
            subtitle.textContent =
                data.subtitle;
        }

    }

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function openScheme(url) {

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
   IMAGE UPLOAD / CROP HEALTH
========================================================= */

function setupCropImage() {

    const input =
        document.getElementById(
            "cropImageInput"
        );

    const preview =
        document.getElementById(
            "cropImagePreview"
        );

    const container =
        document.getElementById(
            "imagePreviewContainer"
        );

    const button =
        document.getElementById(
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


                    if (container) {

                        container.classList.remove(
                            "hidden"
                        );

                    }


                    if (button) {

                        button.disabled =
                            false;

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    if (button) {

        button.addEventListener(
            "click",
            function () {

                const result =
                    document.getElementById(
                        "cropAnalysisResult"
                    );


                if (result) {

                    result.innerHTML = `

                        <strong>
                            ${escapeHTML(
                                t(
                                    "analysisNotConnected"
                                )
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                t(
                                    "analysisNotConnectedDescription"
                                )
                            )}
                        </p>

                    `;

                }

            }
        );

    }

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let recognition = null;


function setupVoiceAssistant() {

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

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        recognition =
            new SpeechRecognition();


        recognition.continuous =
            false;

        recognition.interimResults =
            false;


        recognition.lang =
            getSpeechLanguage();


        recognition.onstart =
            function () {

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


        recognition.onresult =
            function (event) {

                const text =
                    event
                        .results[0][0]
                        .transcript;


                if (input) {
                    input.value = text;
                }


                if (response) {

                    response.textContent =
                        text;

                }

            };


        recognition.onerror =
            function (event) {

                console.error(
                    "Voice error:",
                    event.error
                );

            };


        recognition.onend =
            function () {

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

    }


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                if (
                    voiceSetting &&
                    !voiceSetting.checked
                ) {

                    return;

                }


                if (!recognition) {

                    if (response) {

                        response.textContent =
                            "Voice recognition is not supported by this browser.";

                    }

                    return;

                }


                recognition.lang =
                    getSpeechLanguage();


                recognition.start();

            }
        );

    }


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


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const question =
                input?.value.trim();


            if (!question) {
                return;
            }


            addChatMessage(
                question,
                false
            );


            addChatMessage(
                t("aiUnavailable"),
                true
            );


            if (input) {
                input.value = "";
            }

        }
    );

}


function addChatMessage(
    text,
    assistant
) {

    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!messages) {
        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        assistant
            ? "chat-message assistant-message"
            : "chat-message";


    div.innerHTML = `

        <div class="chat-avatar">
            ${assistant ? "🤖" : "👨‍🌾"}
        </div>

        <div>

            <strong>
                ${assistant
                    ? escapeHTML(t("assistant"))
                    : escapeHTML(
                        currentFarmer?.name ||
                        "Farmer"
                    )
                }
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    messages.appendChild(div);


    messages.scrollTop =
        messages.scrollHeight;

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
                    voiceSetting.checked
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
                    notificationSetting.checked
                );

            }
        );

    }

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function setupLanguageSelectors() {

    const selectors = [

        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"

    ];


    selectors.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (!element) {
            return;
        }


        element.addEventListener(
            "change",
            function () {

                const language =
                    element.value;


                if (
                    !translations[language]
                ) {
                    return;
                }


                currentLanguage =
                    language;


                localStorage.setItem(
                    "smartAgriLanguage",
                    language
                );


                applyLanguage(
                    language
                );


                if (
                    currentFarmer &&
                    !currentUser
                ) {

                    currentFarmer.language =
                        language;

                }


                if (
                    id ===
                    "profileLanguage"
                ) {

                    currentFarmer =
                        currentFarmer ||
                        createDemoFarmer();

                    currentFarmer.language =
                        language;

                }

            }
        );

    });

}


/* =========================================================
   INITIAL LANGUAGE PAGE
========================================================= */

let selectedLanguage =
    localStorage.getItem(
        "smartAgriLanguage"
    );


function setupLanguagePage() {

    const buttons =
        document.querySelectorAll(
            ".language-option"
        );


    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(
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
                    selectedLanguage ||
                    "en";


                applyLanguage(
                    language
                );


                showScreen(
                    "loginPage"
                );

            }
        );

    }

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

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


    element.classList.remove(
        "success",
        "error"
    );


    if (type) {
        element.classList.add(
            type
        );
    }

}


function escapeHTML(value) {

    return String(value ?? "")
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


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri application starting..."
        );


        /* -----------------------------------------
           LANGUAGE
        ----------------------------------------- */

        setupLanguagePage();

        setupLanguageSelectors();


        /* -----------------------------------------
           INITIAL LANGUAGE
        ----------------------------------------- */

        applyLanguage(
            currentLanguage
        );


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
                handleLogin
            );

        }


        /* -----------------------------------------
           REGISTRATION
        ----------------------------------------- */

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (registrationForm) {

            registrationForm.addEventListener(
                "submit",
                handleRegistration
            );

        }


        /* -----------------------------------------
           LOGIN / REGISTER NAVIGATION
        ----------------------------------------- */

        const showRegisterBtn =
            document.getElementById(
                "showRegisterBtn"
            );


        if (showRegisterBtn) {

            showRegisterBtn.addEventListener(
                "click",
                function () {

                    showScreen(
                        "registerPage"
                    );

                }
            );

        }


        const showLoginBtn =
            document.getElementById(
                "showLoginBtn"
            );


        if (showLoginBtn) {

            showLoginBtn.addEventListener(
                "click",
                function () {

                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        const changeLanguageLogin =
            document.getElementById(
                "changeLanguageFromLogin"
            );


        if (changeLanguageLogin) {

            changeLanguageLogin.addEventListener(
                "click",
                function () {

                    showScreen(
                        "languagePage"
                    );

                }
            );

        }


        /* -----------------------------------------
           DEMO DASHBOARD
        ----------------------------------------- */

        const demoButton =
            document.getElementById(
                "demoBtn"
            );


        if (demoButton) {

            demoButton.addEventListener(
                "click",
                function () {

                    enterDemoDashboard();

                }
            );

        }


        /* -----------------------------------------
           FORGOT PASSWORD
        ----------------------------------------- */

        const forgotButton =
            document.getElementById(
                "forgotPasswordBtn"
            );


        if (forgotButton) {

            forgotButton.addEventListener(
                "click",
                handleForgotPassword
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


        const menuOverlay =
            document.getElementById(
                "menuOverlay"
            );


        if (menuOverlay) {

            menuOverlay.addEventListener(
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
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

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


        /* -----------------------------------------
           PROFILE MENU
        ----------------------------------------- */

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


                        showSection(
                            section
                        );

                    }
                );

            });


        /* -----------------------------------------
           LOGOUT
        ----------------------------------------- */

        const sideLogout =
            document.getElementById(
                "sideLogoutBtn"
            );


        const profileLogout =
            document.getElementById(
                "profileLogoutBtn"
            );


        if (sideLogout) {

            sideLogout.addEventListener(
                "click",
                logout
            );

        }


        if (profileLogout) {

            profileLogout.addEventListener(
                "click",
                logout
            );

        }


        /* -----------------------------------------
           WEATHER
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
           MARKET
        ----------------------------------------- */

        const cropSelector =
            document.getElementById(
                "cropPriceSelector"
            );


        if (cropSelector) {

            cropSelector.addEventListener(
                "change",
                updateMarketSelection
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
           GOVERNMENT SCHEMES
        ----------------------------------------- */

        document
            .querySelectorAll(
                ".scheme-button"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openScheme(
                            button.getAttribute(
                                "data-scheme-url"
                            )
                        );

                    }
                );

            });


        /* -----------------------------------------
           CROP IMAGE
        ----------------------------------------- */

        setupCropImage();


        /* -----------------------------------------
           VOICE
        ----------------------------------------- */

        setupVoiceAssistant();


        /* -----------------------------------------
           AI
        ----------------------------------------- */

        setupAI();


        /* -----------------------------------------
           SETTINGS
        ----------------------------------------- */

        setupSettings();


        /* -----------------------------------------
           MARKET INITIAL STATE
        ----------------------------------------- */

        showMarketUnavailable();


        /* -----------------------------------------
           CONNECTION
        ----------------------------------------- */

        updateConnectionStatus();


        /* -----------------------------------------
           FIREBASE AUTH STATE
        ----------------------------------------- */

        if (auth) {

            auth.onAuthStateChanged(
                async function (user) {

                    if (!user) {
                        return;
                    }


                    currentUser =
                        user;


                    const profile =
                        await loadFirebaseProfile(
                            user
                        );


                    if (profile) {

                        currentFarmer =
                            profile;


                        if (
                            profile.language &&
                            translations[
                                profile.language
                            ]
                        ) {

                            currentLanguage =
                                profile.language;

                            localStorage.setItem(
                                "smartAgriLanguage",
                                currentLanguage
                            );

                        }

                    }

                }
            );

        }


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);


/* =========================================================
   CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const menu =
            document.getElementById(
                "profileMenu"
            );

        const button =
            document.getElementById(
                "profileButton"
            );


        if (
            menu &&
            button &&
            !menu.contains(event.target) &&
            !button.contains(event.target)
        ) {

            menu.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSideMenu();

            closeProfileMenu();

        }

    }
);


/* =========================================================
   FINAL INITIALIZATION FALLBACK
========================================================= */

setTimeout(
    function () {

        updateConnectionStatus();

    },
    500
);
