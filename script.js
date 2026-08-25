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
   FIREBASE INITIALIZATION
========================================================= */

let auth = null;
let db = null;
let firebaseInitialized = false;

try {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    firebaseInitialized = true;

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization failed:", error);

    firebaseInitialized = false;
}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedLanguage = localStorage.getItem("smartAgriLanguage") || "en";

let selectedUser = null;

let currentFarmerData = null;

let recognition = null;

let isListening = false;


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

        onion:
            "Onion",

        wheat:
            "Wheat",

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
            "SmartAgri का उपयोग करने के लिए लॉगिन करें",

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
            "गाँव",

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
            "शिर्डी बाजार",

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
            "आवाज़ सहायता",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ है।",

        temperature:
            "तापमान",

        humidity:
            "नमी",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल कीमतें।",

        marketPriceTable:
            "बाजार भाव तालिका",

        market:
            "बाजार",

        crop:
            "फसल",

        price:
            "भाव",

        date:
            "दिनांक",

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

        onion:
            "प्याज",

        wheat:
            "गेहूं",

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
            "अधिक जानें",

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
            "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट आवाज़ सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice:
            "आवाज़ सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "आवाज़ इनपुट",

        voiceInputPlaceholder:
            "आवाज़ इनपुट यहां दिखाई देगा...",

        voiceResponse:
            "आवाज़ प्रतिक्रिया",

        voiceReady:
            "आवाज़ सहायता तैयार है।",

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
            "आवाज़ सहायता चालू या बंद करें।",

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

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "तुमची भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",

        continue:
            "पुढे जा",

        loginTitle:
            "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri वापरण्यासाठी लॉगिन करा",

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
            "पिकांची माहिती",

        cropHealth:
            "पिकांचे आरोग्य",

        governmentSchemes:
            "सरकारी योजना",

        aiAssistant:
            "AI सहाय्यक",

        voiceAssistance:
            "आवाज सहाय्य",

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
            "तुमची शेतीविषयक माहिती एकाच ठिकाणी.",

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
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

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
            "विक्रीपूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

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
            "स्मार्ट आवाज सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

        startVoice:
            "आवाज सहाय्य सुरू करा",

        stopVoice:
            "ऐकणे थांबवा",

        voiceInput:
            "आवाज इनपुट",

        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",

        voiceResponse:
            "आवाज प्रतिसाद",

        voiceReady:
            "आवाज सहाय्य तयार आहे.",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "तुमच्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

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

function getElement(id) {
    return document.getElementById(id);
}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const target = getElement(screenId);

    if (target) {
        target.classList.add("active-screen");
    }
}


/* =========================================================
   APP SECTIONS
========================================================= */

function showSection(sectionId) {

    const sections = document.querySelectorAll(".app-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    const target = getElement(sectionId);

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
   LANGUAGE
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

    const languageData = translations[language];

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (
            languageData[key] !== undefined &&
            languageData[key] !== null
        ) {
            element.textContent = languageData[key];
        }

    });


    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (
            languageData[key] !== undefined &&
            languageData[key] !== null
        ) {
            element.placeholder = languageData[key];
        }

    });


    updateLanguageSelectors(language);

    updateDynamicFarmerData();

    console.log("Language changed to:", language);
}


/* =========================================================
   UPDATE LANGUAGE SELECTORS
========================================================= */

function updateLanguageSelectors(language) {

    const selectors = [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ];

    selectors.forEach(id => {

        const select = getElement(id);

        if (select) {
            select.value = language;
        }

    });
}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        document.querySelectorAll(".language-option");

    const continueButton =
        getElement("continueLanguageBtn");

    let selected = null;


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            selected =
                button.getAttribute("data-language");

            if (continueButton) {
                continueButton.disabled = false;
            }

        });

    });


    if (continueButton) {

        continueButton.addEventListener("click", () => {

            if (!selected) {
                return;
            }

            applyLanguage(selected);

            showScreen("loginPage");

        });

    }

}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        getElement("loginForm");

    const forgotButton =
        getElement("forgotPasswordBtn");

    const showRegisterButton =
        getElement("showRegisterBtn");

    const changeLanguageButton =
        getElement("changeLanguageFromLogin");


    if (loginForm) {

        loginForm.addEventListener("submit", async event => {

            event.preventDefault();

            const email =
                getElement("loginEmail").value.trim();

            const password =
                getElement("loginPassword").value;

            const rememberMe =
                getElement("rememberMe").checked;

            clearMessage("loginMessage");

            if (!email || !password) {

                showMessage(
                    "loginMessage",
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }


            if (!firebaseInitialized || !auth) {

                showMessage(
                    "loginMessage",
                    "Firebase is not configured correctly.",
                    "error"
                );

                return;
            }


            try {

                if (rememberMe) {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.LOCAL
                    );

                } else {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.SESSION
                    );

                }


                const result =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                selectedUser = result.user;

                showMessage(
                    "loginMessage",
                    "Login successful.",
                    "success"
                );


                await loadFarmerProfile(
                    result.user.uid
                );


                updateConnectionStatus(true);

                showScreen("dashboardPage");

                showSection("dashboardSection");


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

        });

    }


    if (forgotButton) {

        forgotButton.addEventListener("click", async () => {

            const email =
                getElement("loginEmail").value.trim();

            if (!email) {

                showMessage(
                    "loginMessage",
                    "Enter your email address first.",
                    "error"
                );

                return;
            }


            if (!firebaseInitialized || !auth) {

                showMessage(
                    "loginMessage",
                    "Firebase is not configured correctly.",
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

        });

    }


    if (showRegisterButton) {

        showRegisterButton.addEventListener(
            "click",
            () => {

                clearMessage("registerMessage");

                showScreen("registerPage");

            }
        );

    }


    if (changeLanguageButton) {

        changeLanguageButton.addEventListener(
            "click",
            () => {

                showScreen("languagePage");

            }
        );

    }

}


/* =========================================================
   REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        getElement("registrationForm");

    const showLoginButton =
        getElement("showLoginBtn");


    if (form) {

        form.addEventListener("submit", async event => {

            event.preventDefault();

            clearMessage("registerMessage");


            const name =
                getElement("registerName").value.trim();

            const email =
                getElement("registerEmail").value.trim();

            const mobile =
                getElement("registerMobile").value.trim();

            const village =
                getElement("registerVillage").value.trim();

            const state =
                getElement("registerState").value.trim();

            const landArea =
                getElement("registerLandArea").value.trim();

            const preferredMarket =
                getElement("registerMarket").value;

            const preferredLanguage =
                getElement("registerLanguage").value;

            const password =
                getElement("registerPassword").value;


            if (
                !name ||
                !email ||
                !mobile ||
                !village ||
                !state ||
                !landArea ||
                !preferredMarket ||
                !preferredLanguage ||
                !password
            ) {

                showMessage(
                    "registerMessage",
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "registerMessage",
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            if (!firebaseInitialized || !auth || !db) {

                showMessage(
                    "registerMessage",
                    "Firebase is not configured correctly.",
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

                        preferredMarket: preferredMarket,

                        preferredLanguage: preferredLanguage,

                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),

                        updatedAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    });


                selectedUser = user;

                currentFarmerData = {

                    uid: user.uid,

                    name: name,

                    email: email,

                    mobile: mobile,

                    village: village,

                    state: state,

                    landArea: landArea,

                    preferredMarket: preferredMarket,

                    preferredLanguage: preferredLanguage

                };


                applyLanguage(
                    preferredLanguage
                );


                showMessage(
                    "registerMessage",
                    "Account created successfully.",
                    "success"
                );


                updateFarmerUI(
                    currentFarmerData
                );


                updateConnectionStatus(true);


                setTimeout(() => {

                    showScreen("dashboardPage");

                    showSection(
                        "dashboardSection"
                    );

                }, 700);


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                showMessage(
                    "registerMessage",
                    getFirebaseErrorMessage(error),
                    "error"
                );

            }

        });

    }


    if (showLoginButton) {

        showLoginButton.addEventListener(
            "click",
            () => {

                clearMessage("loginMessage");

                showScreen("loginPage");

            }
        );

    }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupAuthStateListener() {

    if (!firebaseInitialized || !auth) {
        return;
    }


    auth.onAuthStateChanged(async user => {

        if (user) {

            selectedUser = user;

            console.log(
                "Authenticated user:",
                user.uid
            );


            try {

                await loadFarmerProfile(
                    user.uid
                );

                updateConnectionStatus(true);

            } catch (error) {

                console.error(
                    "Profile loading error:",
                    error
                );

            }

        } else {

            selectedUser = null;

            currentFarmerData = null;

            updateConnectionStatus(
                navigator.onLine
            );

        }

    });

}


/* =========================================================
   LOAD FARMER PROFILE
========================================================= */

async function loadFarmerProfile(uid) {

    if (!db) {
        throw new Error(
            "Firestore is not initialized."
        );
    }


    try {

        const document =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!document.exists) {

            currentFarmerData = null;

            clearFarmerUI();

            console.warn(
                "No farmer profile found in Firestore."
            );

            return null;
        }


        const data =
            document.data();


        currentFarmerData = {

            uid: uid,

            name: data.name || "",

            email:
                data.email ||
                (selectedUser ? selectedUser.email : ""),

            mobile: data.mobile || "",

            village: data.village || "",

            state: data.state || "",

            landArea: data.landArea || "",

            preferredMarket:
                data.preferredMarket || "",

            preferredLanguage:
                data.preferredLanguage || "en"

        };


        updateFarmerUI(
            currentFarmerData
        );


        if (
            currentFarmerData.preferredLanguage &&
            translations[
                currentFarmerData.preferredLanguage
            ]
        ) {

            applyLanguage(
                currentFarmerData.preferredLanguage
            );

        }


        return currentFarmerData;


    } catch (error) {

        console.error(
            "Firestore profile error:",
            error
        );

        currentFarmerData = null;

        clearFarmerUI();

        throw error;

    }

}


/* =========================================================
   UPDATE FARMER UI
========================================================= */

function updateFarmerUI(data) {

    if (!data) {
        clearFarmerUI();
        return;
    }


    const name =
        data.name || "";


    setText(
        "headerFarmerName",
        name || "—"
    );

    setText(
        "dashboardFarmerName",
        name || "—"
    );

    setText(
        "summaryName",
        name || "—"
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
        name || "—"
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
        data.preferredLanguage || "en"
    );


    updateDynamicFarmerData();
}


/* =========================================================
   CLEAR FARMER UI
========================================================= */

function clearFarmerUI() {

    const ids = [

        "headerFarmerName",

        "dashboardFarmerName",

        "summaryName",

        "summaryVillage",

        "summaryLand",

        "summaryMarket",

        "profilePageName",

        "profilePageEmail"

    ];


    ids.forEach(id => {

        const element =
            getElement(id);

        if (!element) {
            return;
        }


        if (
            id === "profilePageName" ||
            id === "profilePageEmail"
        ) {

            element.textContent = "—";

        } else {

            element.textContent = "—";

        }

    });


    const profileFields = [

        "profileName",

        "profileEmail",

        "profileMobile",

        "profileVillage",

        "profileState",

        "profileLandArea"

    ];


    profileFields.forEach(id => {
        setValue(id, "");
    });


    setValue(
        "profileMarket",
        ""
    );

}


/* =========================================================
   DYNAMIC FARMER DATA
========================================================= */

function updateDynamicFarmerData() {

    if (!currentFarmerData) {
        return;
    }


    updateFarmerUIWithoutLoop(
        currentFarmerData
    );

}


function updateFarmerUIWithoutLoop(data) {

    if (!data) {
        return;
    }


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

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function setupProfileEditing() {

    const editButton =
        getElement("editProfileBtn");

    const cancelButton =
        getElement("cancelProfileEditBtn");

    const profileForm =
        getElement("profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            enableProfileEditing
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            disableProfileEditing
        );

    }


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfileChanges
        );

    }

}


/* =========================================================
   ENABLE PROFILE EDITING
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
            getElement(id);

        if (element) {
            element.disabled = false;
        }

    });


    const actions =
        getElement("profileEditActions");

    if (actions) {
        actions.classList.remove("hidden");
    }

}


/* =========================================================
   DISABLE PROFILE EDITING
========================================================= */

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
            getElement(id);

        if (element) {
            element.disabled = true;
        }

    });


    const actions =
        getElement("profileEditActions");

    if (actions) {
        actions.classList.add("hidden");
    }


    if (currentFarmerData) {

        setValue(
            "profileName",
            currentFarmerData.name || ""
        );

        setValue(
            "profileMobile",
            currentFarmerData.mobile || ""
        );

        setValue(
            "profileVillage",
            currentFarmerData.village || ""
        );

        setValue(
            "profileState",
            currentFarmerData.state || ""
        );

        setValue(
            "profileLandArea",
            currentFarmerData.landArea || ""
        );

        setValue(
            "profileMarket",
            currentFarmerData.preferredMarket || ""
        );

        setValue(
            "profileLanguage",
            currentFarmerData.preferredLanguage || "en"
        );

    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfileChanges(event) {

    event.preventDefault();


    if (!selectedUser || !db) {

        showMessage(
            "profileMessage",
            "You must be logged in to save your profile.",
            "error"
        );

        return;
    }


    const name =
        getElement("profileName").value.trim();

    const mobile =
        getElement("profileMobile").value.trim();

    const village =
        getElement("profileVillage").value.trim();

    const state =
        getElement("profileState").value.trim();

    const landArea =
        getElement("profileLandArea").value.trim();

    const preferredMarket =
        getElement("profileMarket").value;

    const preferredLanguage =
        getElement("profileLanguage").value;


    if (
        !name ||
        !mobile ||
        !village ||
        !state ||
        !landArea ||
        !preferredMarket ||
        !preferredLanguage
    ) {

        showMessage(
            "profileMessage",
            "Please fill in all required fields.",
            "error"
        );

        return;
    }


    try {

        await db
            .collection("farmers")
            .doc(selectedUser.uid)
            .update({

                name: name,

                mobile: mobile,

                village: village,

                state: state,

                landArea: landArea,

                preferredMarket:
                    preferredMarket,

                preferredLanguage:
                    preferredLanguage,

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        currentFarmerData = {

            ...currentFarmerData,

            name: name,

            mobile: mobile,

            village: village,

            state: state,

            landArea: landArea,

            preferredMarket:
                preferredMarket,

            preferredLanguage:
                preferredLanguage

        };


        updateFarmerUI(
            currentFarmerData
        );


        applyLanguage(
            preferredLanguage
        );


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


        disableProfileEditing();


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );

        showMessage(
            "profileMessage",
            getFirebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    if (!auth) {
        return;
    }


    try {

        await auth.signOut();

        selectedUser = null;

        currentFarmerData = null;

        clearFarmerUI();

        closeSideMenu();

        closeProfileMenu();

        clearAllMessages();

        showScreen("loginPage");

        showSection("dashboardSection");

        console.log("User logged out.");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function setupLogoutButtons() {

    const sideLogout =
        getElement("sideLogoutBtn");

    const profileLogout =
        getElement("profileLogoutBtn");


    if (sideLogout) {

        sideLogout.addEventListener(
            "click",
            logoutUser
        );

    }


    if (profileLogout) {

        profileLogout.addEventListener(
            "click",
            logoutUser
        );

    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus(isOnline) {

    const status =
        getElement("connectionStatus");

    const text =
        getElement("connectionText");

    const dashboardText =
        getElement("dashboardConnectionText");


    if (status) {

        status.classList.toggle(
            "online",
            isOnline
        );

        status.classList.toggle(
            "offline",
            !isOnline
        );

    }


    if (text) {

        text.textContent =
            isOnline
                ? translations[selectedLanguage].online
                : translations[selectedLanguage].offline;

    }


    if (dashboardText) {

        dashboardText.textContent =
            isOnline
                ? translations[selectedLanguage].online
                : translations[selectedLanguage].offline;

    }

}


/* =========================================================
   ONLINE / OFFLINE EVENTS
========================================================= */

function setupConnectionMonitoring() {

    window.addEventListener(
        "online",
        () => updateConnectionStatus(true)
    );


    window.addEventListener(
        "offline",
        () => updateConnectionStatus(false)
    );


    updateConnectionStatus(
        navigator.onLine
    );

}


/* =========================================================
   SIDE MENU
========================================================= */

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


    document
        .querySelectorAll(
            ".side-navigation button[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.getAttribute(
                            "data-section"
                        );

                    showSection(section);

                }
            );

        });

}


/* =========================================================
   OPEN SIDE MENU
========================================================= */

function openSideMenu() {

    const menu =
        getElement("sideMenu");

    const overlay =
        getElement("menuOverlay");


    if (menu) {
        menu.classList.add("open");
    }


    if (overlay) {
        overlay.classList.add("active");
    }

}


/* =========================================================
   CLOSE SIDE MENU
========================================================= */

function closeSideMenu() {

    const menu =
        getElement("sideMenu");

    const overlay =
        getElement("menuOverlay");


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

function setupProfileMenu() {

    const button =
        getElement("profileButton");

    const menu =
        getElement("profileMenu");


    if (button) {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (!menu) {
                    return;
                }

                menu.classList.toggle("active");

            }
        );

    }


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.getAttribute(
                            "data-profile-section"
                        );

                    showSection(section);

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

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
   CLOSE PROFILE MENU
========================================================= */

function closeProfileMenu() {

    const menu =
        getElement("profileMenu");

    if (menu) {
        menu.classList.remove("active");
    }

}


/* =========================================================
   GENERAL SECTION BUTTONS
========================================================= */

function setupSectionButtons() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            if (
                button.closest(".side-navigation")
            ) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.getAttribute(
                            "data-section"
                        );

                    if (section) {
                        showSection(section);
                    }

                }
            );

        });

}


/* =========================================================
   DASHBOARD LANGUAGE
========================================================= */

function setupDashboardLanguage() {

    const select =
        getElement("dashboardLanguage");


    if (select) {

        select.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );

    }

}


/* =========================================================
   SETTINGS LANGUAGE
========================================================= */

function setupSettingsLanguage() {

    const select =
        getElement("settingsLanguage");


    if (select) {

        select.addEventListener(
            "change",
            async event => {

                const language =
                    event.target.value;


                applyLanguage(
                    language
                );


                if (
                    selectedUser &&
                    db &&
                    currentFarmerData
                ) {

                    try {

                        await db
                            .collection("farmers")
                            .doc(selectedUser.uid)
                            .update({

                                preferredLanguage:
                                    language,

                                updatedAt:
                                    firebase.firestore.FieldValue.serverTimestamp()

                            });


                        currentFarmerData.preferredLanguage =
                            language;


                    } catch (error) {

                        console.error(
                            "Language save error:",
                            error
                        );

                    }

                }

            }
        );

    }

}


/* =========================================================
   REGISTER LANGUAGE
========================================================= */

function setupRegisterLanguage() {

    const select =
        getElement("registerLanguage");


    if (select) {

        select.addEventListener(
            "change",
            event => {

                const language =
                    event.target.value;

                if (translations[language]) {

                    /*
                     Only registration form language
                     is changed here after selection.
                    */

                    applyLanguage(
                        language
                    );

                }

            }
        );

    }

}


/* =========================================================
   PROFILE LANGUAGE
========================================================= */

function setupProfileLanguage() {

    const select =
        getElement("profileLanguage");


    if (select) {

        select.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );

    }

}


/* =========================================================
   MARKET DATA
========================================================= */

function setupMarketSection() {

    const selector =
        getElement("cropPriceSelector");


    if (selector) {

        selector.addEventListener(
            "change",
            () => {

                loadMarketData(
                    selector.value
                );

            }
        );

    }


    loadMarketData("onion");

}


/* =========================================================
   LOAD MARKET DATA
========================================================= */

async function loadMarketData(crop) {

    const tbody =
        getElement("marketTableBody");


    if (!tbody) {
        return;
    }


    /*
       IMPORTANT:

       There is NO fallback price here.

       The application will only display market
       information when a real verified data source
       is connected.
    */


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${translations[selectedLanguage].marketDataUnavailable}
                    </strong>

                    <p>
                        ${translations[selectedLanguage].marketDataUnavailableDescription}
                    </p>

                </div>

            </td>

        </tr>

    `;


    console.log(
        "Market data unavailable. No fallback data used.",
        crop
    );

}


/* =========================================================
   WEATHER
========================================================= */

function setupWeather() {

    const refreshButton =
        getElement("refreshWeatherBtn");


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            loadWeatherData
        );

    }


    loadWeatherData();

}


/* =========================================================
   LOAD WEATHER DATA
========================================================= */

async function loadWeatherData() {

    const emptyState =
        getElement("weatherEmptyState");

    const weatherData =
        getElement("weatherData");


    if (emptyState) {
        emptyState.classList.remove("hidden");
    }


    if (weatherData) {
        weatherData.classList.add("hidden");
    }


    /*
       No fake weather data.

       Weather API/backend should be connected here later.
    */


    console.log(
        "Weather data unavailable. No fallback data used."
    );

}


/* =========================================================
   CROP IMAGE
========================================================= */

function setupCropImage() {

    const input =
        getElement("cropImageInput");

    const previewContainer =
        getElement("imagePreviewContainer");

    const preview =
        getElement("cropImagePreview");

    const analyzeButton =
        getElement("analyzeCropBtn");


    if (!input) {
        return;
    }


    input.addEventListener(
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


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select a valid image."
                );

                input.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload = event => {

                if (preview) {

                    preview.src =
                        event.target.result;

                }


                if (previewContainer) {

                    previewContainer.classList.remove(
                        "hidden"
                    );

                }


                if (analyzeButton) {
                    analyzeButton.disabled = false;
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
   CROP ANALYSIS
========================================================= */

async function analyzeCrop() {

    const result =
        getElement("cropAnalysisResult");


    if (!result) {
        return;
    }


    /*
       No fake AI analysis.

       A real crop-health AI backend needs to be
       connected before analysis can be displayed.
    */


    result.innerHTML = `

        <strong>
            ${translations[selectedLanguage].analysisNotConnected}
        </strong>

        <p>
            ${translations[selectedLanguage].analysisNotConnectedDescription}
        </p>

    `;


    console.log(
        "Crop AI analysis unavailable. No fallback analysis used."
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        getElement("aiForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const input =
                getElement("aiInput");


            if (!input) {
                return;
            }


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


            /*
               No fake AI response.

               Real AI backend/API must be connected.
            */


            addChatMessage(
                translations[selectedLanguage].aiUnavailable,
                "assistant"
            );


            console.log(
                "AI backend not connected. No fallback response used."
            );

        }
    );

}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(message, type) {

    const container =
        getElement("chatMessages");


    if (!container) {
        return;
    }


    const messageDiv =
        document.createElement("div");


    if (type === "user") {

        messageDiv.className =
            "chat-message user-message";

        messageDiv.innerHTML = `

            <div>

                <strong>
                    You
                </strong>

                <p>
                    ${escapeHtml(message)}
                </p>

            </div>

        `;

    } else {

        messageDiv.className =
            "chat-message assistant-message";

        messageDiv.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    ${translations[selectedLanguage].assistant}
                </strong>

                <p>
                    ${escapeHtml(message)}
                </p>

            </div>

        `;

    }


    container.appendChild(
        messageDiv
    );


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function setupVoice() {

    const startButton =
        getElement("startVoiceBtn");

    const stopButton =
        getElement("stopVoiceBtn");

    const voiceInput =
        getElement("voiceInput");

    const voiceResponse =
        getElement("voiceResponse");


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


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang =
        getSpeechLanguage(selectedLanguage);


    recognition.onstart = () => {

        isListening = true;


        if (startButton) {
            startButton.classList.add("hidden");
        }


        if (stopButton) {
            stopButton.classList.remove("hidden");
        }


        if (voiceResponse) {

            voiceResponse.textContent =
                getVoiceListeningText();

        }

    };


    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;


        if (voiceInput) {
            voiceInput.value =
                transcript;
        }


        if (voiceResponse) {

            voiceResponse.textContent =
                getVoiceReceivedText();

        }

    };


    recognition.onerror = event => {

        console.error(
            "Voice recognition error:",
            event.error
        );


        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition could not be completed.";

        }


        stopVoiceUI();

    };


    recognition.onend = () => {

        stopVoiceUI();

    };


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                recognition.lang =
                    getSpeechLanguage(
                        selectedLanguage
                    );

                try {

                    recognition.start();

                } catch (error) {

                    console.error(
                        "Voice start error:",
                        error
                    );

                }

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                try {

                    recognition.stop();

                } catch (error) {

                    console.error(
                        "Voice stop error:",
                        error
                    );

                }

            }
        );

    }

}


/* =========================================================
   STOP VOICE UI
========================================================= */

function stopVoiceUI() {

    isListening = false;


    const startButton =
        getElement("startVoiceBtn");

    const stopButton =
        getElement("stopVoiceBtn");


    if (startButton) {
        startButton.classList.remove("hidden");
    }


    if (stopButton) {
        stopButton.classList.add("hidden");
    }

}


/* =========================================================
   SPEECH LANGUAGE
========================================================= */

function getSpeechLanguage(language) {

    switch (language) {

        case "hi":
            return "hi-IN";

        case "mr":
            return "mr-IN";

        case "en":
        default:
            return "en-IN";

    }

}


/* =========================================================
   VOICE TEXT
========================================================= */

function getVoiceListeningText() {

    if (selectedLanguage === "hi") {
        return "सुन रहा हूँ...";
    }


    if (selectedLanguage === "mr") {
        return "ऐकत आहे...";
    }


    return "Listening...";

}


function getVoiceReceivedText() {

    if (selectedLanguage === "hi") {
        return "आवाज़ इनपुट प्राप्त हुआ।";
    }


    if (selectedLanguage === "mr") {
        return "आवाज इनपुट प्राप्त झाला.";
    }


    return "Voice input received.";

}


/* =========================================================
   GOVERNMENT SCHEMES
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
                        button.getAttribute(
                            "data-scheme-url"
                        );


                    if (!url) {
                        return;
                    }


                    window.open(
                        url,
                        "_blank"
                    );

                }
            );

        });

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

function setupProfileButton() {

    const button =
        getElement("profileButton");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const menu =
                getElement("profileMenu");


            if (!menu) {
                return;
            }


            menu.classList.toggle(
                "active"
            );

        }
    );

}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

    const voiceSetting =
        getElement("voiceSetting");

    const notificationSetting =
        getElement("notificationSetting");


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
            event => {

                localStorage.setItem(
                    "smartAgriVoiceEnabled",
                    event.target.checked
                );

            }
        );

    }


    if (notificationSetting) {

        const saved =
            localStorage.getItem(
                "smartAgriNotificationsEnabled"
            );


        if (saved !== null) {

            notificationSetting.checked =
                saved === "true";

        }


        notificationSetting.addEventListener(
            "change",
            event => {

                localStorage.setItem(
                    "smartAgriNotificationsEnabled",
                    event.target.checked
                );

            }
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {
        return "An unknown error occurred.";
    }


    switch (error.code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        case "auth/user-not-found":
            return "No account was found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "permission-denied":
            return "Firebase permission denied. Check Firestore security rules.";

        default:
            return error.message ||
                "Something went wrong. Please try again.";

    }

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        getElement(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        "message";


    if (type) {
        element.classList.add(type);
    }

}


/* =========================================================
   CLEAR MESSAGE
========================================================= */

function clearMessage(elementId) {

    const element =
        getElement(elementId);


    if (!element) {
        return;
    }


    element.textContent = "";

    element.className =
        "message";

}


/* =========================================================
   CLEAR ALL MESSAGES
========================================================= */

function clearAllMessages() {

    document
        .querySelectorAll(".message")
        .forEach(element => {

            element.textContent = "";

            element.className =
                "message";

        });

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        getElement(id);


    if (!element) {
        return;
    }


    element.textContent =
        value !== undefined &&
        value !== null &&
        value !== ""
            ? value
            : "—";

}


/* =========================================================
   SET VALUE
========================================================= */

function setValue(id, value) {

    const element =
        getElement(id);


    if (!element) {
        return;
    }


    element.value =
        value !== undefined &&
        value !== null
            ? value
            : "";

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


/* =========================================================
   KEYBOARD / ESCAPE
========================================================= */

function setupKeyboardEvents() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSideMenu();

                closeProfileMenu();

            }

        }
    );

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

function initializeSmartAgri() {

    console.log(
        "SmartAgri application starting..."
    );


    setupLanguagePage();

    setupLogin();

    setupRegistration();

    setupAuthStateListener();

    setupProfileEditing();

    setupLogoutButtons();

    setupConnectionMonitoring();

    setupSideMenu();

    setupProfileMenu();

    setupSectionButtons();

    setupDashboardLanguage();

    setupSettingsLanguage();

    setupRegisterLanguage();

    setupProfileLanguage();

    setupMarketSection();

    setupWeather();

    setupCropImage();

    setupAI();

    setupVoice();

    setupGovernmentSchemes();

    setupSettings();

    setupKeyboardEvents();


    applyLanguage(
        selectedLanguage
    );


    console.log(
        "SmartAgri application loaded."
    );

}


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeSmartAgri
);
