/* ============================================================
   SMARTAGRI - MAIN JAVASCRIPT
   ============================================================

   Features:
   - English / Hindi / Marathi
   - Firebase Authentication
   - Firestore farmer profile
   - Dashboard navigation
   - Backend connection status
   - Kopargaon weather
   - AI assistant
   - Voice assistance
   - Profile editing
   - Crop information
   - Government schemes
============================================================ */


/* ============================================================
   FIREBASE CONFIGURATION
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
   FIREBASE INITIALIZATION
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

    console.error(
        "Firebase initialization failed:",
        error
    );

}


/* ============================================================
   GLOBAL VARIABLES
============================================================ */

let selectedLanguage =
    localStorage.getItem("smartagriLanguage") || "en";

let currentUser = null;

let currentFarmerData = {};

let recognition = null;
let isListening = false;


/* ============================================================
   TRANSLATIONS
============================================================ */

const translations = {

    en: {

        appName: "SmartAgri",
        appTagline:
            "Smart Agriculture Market Intelligence System",

        chooseLanguage: "Choose Your Language",

        languageDescription:
            "Select your preferred language to continue.",

        continue: "Continue",

        loginTitle: "Farmer Login",

        loginSubtitle:
            "Login to access SmartAgri",

        email: "Email",

        password: "Password",

        rememberMe: "Remember Me",

        forgotPassword:
            "Forgot Password?",

        login: "Login",

        or: "OR",

        demoDashboard:
            "Enter Demo Dashboard",

        noAccount:
            "Don't have an account?",

        register: "Register",

        changeLanguage:
            "Change Language",

        registrationTitle:
            "Farmer Registration",

        registrationSubtitle:
            "Create your SmartAgri farmer account",

        fullName: "Full Name",

        mobile: "Mobile Number",

        village: "Village",

        state: "State",

        landArea: "Land Area",

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

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

        currentWeather:
            "Current Weather",

        refresh:
            "Refresh",

        temperature:
            "Temperature",

        humidity:
            "Humidity",

        windSpeed:
            "Wind Speed",

        rainChance:
            "Rain Chance",

        weatherUnavailable:
            "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather data has been received.",

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
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        offline:
            "Offline",

        online:
            "Online"

    },


    hi: {

        appName: "स्मार्ट एग्री",

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
            "आपकी खेती की जानकारी एक ही स्थान पर।",

        connectionStatus:
            "कनेक्शन स्थिति",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरणों तक जल्दी पहुंचें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रिफ्रेश",

        temperature:
            "तापमान",

        humidity:
            "नमी",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        marketSubtitle:
            "सत्यापित स्रोतों से वर्तमान फसल भाव।",

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
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

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
            "विश्लेषण दिखाने के लिए सत्यापित AI सेवा कनेक्ट करें।",

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
            "खेती से जुड़े प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "खेती से जुड़ा प्रश्न पूछें...",

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
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन"

    },


    mr: {

        appName: "स्मार्ट एग्री",

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
            "मोबाइल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्र",

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
            "महत्त्वाच्या शेती साधनांचा त्वरीत वापर करा.",

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

        temperature:
            "तापमान",

        humidity:
            "आर्द्रता",

        windSpeed:
            "वाऱ्याचा वेग",

        rainChance:
            "पावसाची शक्यता",

        weatherUnavailable:
            "हवामान माहिती उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान माहिती प्राप्त झालेली नाही.",

        marketSubtitle:
            "सत्यापित स्रोतांकडून सध्याचे पीक भाव.",

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
            "बाजार माहिती उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार माहिती प्राप्त झालेली नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onionInfo:
            "कांदा लागवड माहिती.",

        wheatInfo:
            "गहू लागवड माहिती.",

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
            "विश्लेषण दाखवण्यासाठी सत्यापित AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

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
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

        voiceSubtitle:
            "तुमच्या आवडत्या भाषेत बोला आणि ऐका.",

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
            "SmartAgri च्या पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची आवडती अॅप भाषा निवडा.",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन"

    }

};


/* ============================================================
   HELPER FUNCTIONS
============================================================ */

function getElement(id) {
    return document.getElementById(id);
}


function setText(id, value) {

    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


function showElement(element) {

    if (element) {
        element.classList.remove("hidden");
    }
}


function hideElement(element) {

    if (element) {
        element.classList.add("hidden");
    }
}


/* ============================================================
   LANGUAGE
============================================================ */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );

    document.documentElement.lang = language;


    const dictionary =
        translations[language];


    /* -----------------------------------------------
       Normal text
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       Placeholder
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       Language selectors
    ------------------------------------------------ */

    const selectors = [

        getElement("dashboardLanguage"),

        getElement("settingsLanguage"),

        getElement("registerLanguage"),

        getElement("profileLanguage")

    ];


    selectors.forEach(function (select) {

        if (select) {
            select.value = language;
        }

    });


    updateLanguageButtons();

}


function updateLanguageButtons() {

    document
        .querySelectorAll(".language-option")
        .forEach(function (button) {

            const language =
                button.getAttribute(
                    "data-language"
                );

            if (
                language === selectedLanguage
            ) {

                button.classList.add("selected");

            } else {

                button.classList.remove(
                    "selected"
                );

            }

        });


    const continueButton =
        getElement("continueLanguageBtn");

    if (continueButton) {

        continueButton.disabled = false;

    }

}


/* ============================================================
   LANGUAGE PAGE
============================================================ */

function setupLanguagePage() {

    document
        .querySelectorAll(".language-option")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const language =
                        button.getAttribute(
                            "data-language"
                        );

                    if (language) {

                        applyLanguage(
                            language
                        );

                    }

                }
            );

        });


    const continueButton =
        getElement("continueLanguageBtn");


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "smartagriLanguageSelected",
                    "true"
                );


                showScreen("loginPage");

            }
        );

    }


    const changeLanguage =
        getElement(
            "changeLanguageFromLogin"
        );


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
   SCREEN MANAGEMENT
============================================================ */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove(
                "active-screen"
            );

        });


    const target =
        getElement(screenId);


    if (target) {

        target.classList.add(
            "active-screen"
        );

    }


    const dashboard =
        getElement("dashboardPage");


    if (screenId === "dashboardPage") {

        if (dashboard) {
            dashboard.classList.add(
                "active-screen"
            );
        }

    }

}


/* ============================================================
   LOGIN
============================================================ */

function setupLogin() {

    const form =
        getElement("loginForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                getElement("loginEmail")
                    ?.value
                    .trim();

            const password =
                getElement("loginPassword")
                    ?.value;


            if (!email || !password) {

                showMessage(
                    "loginMessage",
                    "Please enter email and password.",
                    "error"
                );

                return;
            }


            if (!firebaseReady || !auth) {

                showMessage(
                    "loginMessage",
                    "Firebase is not connected.",
                    "error"
                );

                return;
            }


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Logging in...";
            }


            try {

                const result =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    result.user;


                await loadFarmerProfile(
                    currentUser
                );


                showDashboard();


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
                    "error"
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        translations[
                            selectedLanguage
                        ].login;
                }

            }

        }
    );

}


/* ============================================================
   REGISTRATION
============================================================ */

function setupRegistration() {

    const form =
        getElement("registrationForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                getElement("registerName")
                    ?.value
                    .trim();

            const email =
                getElement("registerEmail")
                    ?.value
                    .trim();

            const mobile =
                getElement("registerMobile")
                    ?.value
                    .trim();

            const village =
                getElement("registerVillage")
                    ?.value
                    .trim();

            const state =
                getElement("registerState")
                    ?.value
                    .trim();

            const landArea =
                getElement("registerLandArea")
                    ?.value
                    .trim();

            const market =
                getElement("registerMarket")
                    ?.value;

            const language =
                getElement("registerLanguage")
                    ?.value || selectedLanguage;

            const password =
                getElement("registerPassword")
                    ?.value;


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
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            if (!firebaseReady || !auth || !db) {

                showMessage(
                    "registerMessage",
                    "Firebase is not connected.",
                    "error"
                );

                return;
            }


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Creating...";
            }


            try {

                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    result.user;


                await db
                    .collection("farmers")
                    .doc(currentUser.uid)
                    .set({

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


                applyLanguage(language);


                showMessage(
                    "registerMessage",
                    "Account created successfully.",
                    "success"
                );


                await loadFarmerProfile(
                    currentUser
                );


                setTimeout(
                    function () {

                        showDashboard();

                    },
                    800
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
                    "error"
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        translations[
                            selectedLanguage
                        ].createAccount;
                }

            }

        }
    );

}


/* ============================================================
   FIREBASE ERROR MESSAGE
============================================================ */

function getFirebaseErrorMessage(error) {

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

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[code] ||
        error?.message ||
        "Something went wrong."
    );

}


/* ============================================================
   REGISTER / LOGIN NAVIGATION
============================================================ */

function setupAuthNavigation() {

    const registerButton =
        getElement("showRegisterBtn");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    const loginButton =
        getElement("showLoginBtn");


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function () {

                showScreen(
                    "loginPage"
                );

            }
        );

    }


    const forgotButton =
        getElement("forgotPasswordBtn");


    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            async function () {

                const email =
                    getElement("loginEmail")
                        ?.value
                        .trim();


                if (!email) {

                    showMessage(
                        "loginMessage",
                        "Enter your email first.",
                        "error"
                    );

                    return;

                }


                if (!auth) {

                    showMessage(
                        "loginMessage",
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
                        "loginMessage",
                        "Password reset email sent.",
                        "success"
                    );


                } catch (error) {

                    showMessage(
                        "loginMessage",
                        getFirebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }

            }
        );

    }

}


/* ============================================================
   DEMO DASHBOARD
============================================================ */

function setupDemo() {

    const demoButton =
        getElement("demoBtn");


    if (!demoButton) {
        return;
    }


    demoButton.addEventListener(
        "click",
        async function () {

            currentUser = null;


            currentFarmerData = {

                name: "Demo Farmer",

                email: "demo@smartagri.local",

                mobile: "9999999999",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 Acres",

                preferredMarket:
                    "Kopargaon APMC",

                preferredLanguage:
                    selectedLanguage

            };


            fillFarmerProfile(
                currentFarmerData
            );


            showDashboard();


            await checkBackend();

            await loadWeather();

        }
    );

}


/* ============================================================
   SHOW DASHBOARD
============================================================ */

function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove(
                "active-screen"
            );

        });


    const dashboard =
        getElement("dashboardPage");


    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }


    const firstSection =
        getElement("dashboardSection");


    if (firstSection) {

        document
            .querySelectorAll(".app-section")
            .forEach(function (section) {

                section.classList.remove(
                    "active-section"
                );

            });


        firstSection.classList.add(
            "active-section"
        );

    }


    updateConnectionStatus(
        false
    );


    checkBackend();

    loadWeather();

}


/* ============================================================
   FARMER PROFILE
============================================================ */

async function loadFarmerProfile(user) {

    if (!user || !db) {
        return;
    }


    try {

        const documentSnapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (
            documentSnapshot.exists
        ) {

            currentFarmerData =
                documentSnapshot.data();

        } else {

            currentFarmerData = {

                name:
                    user.displayName ||
                    "Farmer",

                email:
                    user.email || ""

            };

        }


        fillFarmerProfile(
            currentFarmerData
        );


        if (
            currentFarmerData.preferredLanguage
        ) {

            applyLanguage(
                currentFarmerData
                    .preferredLanguage
            );

        }

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


/* ============================================================
   FILL PROFILE UI
============================================================ */

function fillFarmerProfile(data) {

    const name =
        data.name || "Farmer";

    const email =
        data.email || "";

    const mobile =
        data.mobile || "";

    const village =
        data.village || "";

    const state =
        data.state || "";

    const landArea =
        data.landArea || "";

    const market =
        data.preferredMarket || "";


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


    const fields = {

        profileName: name,

        profileEmail: email,

        profileMobile: mobile,

        profileVillage: village,

        profileState: state,

        profileLandArea: landArea,

        profileMarket: market,

        profileLanguage:
            data.preferredLanguage ||
            selectedLanguage

    };


    Object.keys(fields)
        .forEach(function (id) {

            const element =
                getElement(id);

            if (element) {

                element.value =
                    fields[id];

            }

        });

}


/* ============================================================
   PROFILE EDIT
============================================================ */

function setupProfileEditing() {

    const editButton =
        getElement("editProfileBtn");

    const cancelButton =
        getElement("cancelProfileEditBtn");

    const form =
        getElement("profileForm");

    const actions =
        getElement("profileEditActions");


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                setProfileInputsDisabled(
                    false
                );

                showElement(actions);

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                fillFarmerProfile(
                    currentFarmerData
                );

                setProfileInputsDisabled(
                    true
                );

                hideElement(actions);

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const updatedData = {

                    name:
                        getElement(
                            "profileName"
                        )?.value.trim(),

                    mobile:
                        getElement(
                            "profileMobile"
                        )?.value.trim(),

                    village:
                        getElement(
                            "profileVillage"
                        )?.value.trim(),

                    state:
                        getElement(
                            "profileState"
                        )?.value.trim(),

                    landArea:
                        getElement(
                            "profileLandArea"
                        )?.value.trim(),

                    preferredMarket:
                        getElement(
                            "profileMarket"
                        )?.value,

                    preferredLanguage:
                        getElement(
                            "profileLanguage"
                        )?.value

                };


                try {

                    if (
                        currentUser &&
                        db
                    ) {

                        await db
                            .collection("farmers")
                            .doc(currentUser.uid)
                            .update(
                                updatedData
                            );

                    }


                    currentFarmerData =
                        {
                            ...currentFarmerData,
                            ...updatedData
                        };


                    fillFarmerProfile(
                        currentFarmerData
                    );


                    setProfileInputsDisabled(
                        true
                    );

                    hideElement(actions);


                    if (
                        updatedData.preferredLanguage
                    ) {

                        applyLanguage(
                            updatedData.preferredLanguage
                        );

                    }


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
        );

    }

}


function setProfileInputsDisabled(
    disabled
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
                disabled;

        }

    });

}


/* ============================================================
   LOGOUT
============================================================ */

async function logout() {

    try {

        if (
            firebaseReady &&
            auth &&
            currentUser
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    currentUser = null;

    currentFarmerData = {};


    const dashboard =
        getElement("dashboardPage");


    if (dashboard) {

        dashboard.classList.remove(
            "active-screen"
        );

    }


    showScreen("loginPage");

}


function setupLogout() {

    const buttons = [

        getElement("sideLogoutBtn"),

        getElement("profileLogoutBtn")

    ];


    buttons.forEach(function (button) {

        if (button) {

            button.addEventListener(
                "click",
                logout
            );

        }

    });

}


/* ============================================================
   NAVIGATION
============================================================ */

function setupNavigation() {

    document
        .querySelectorAll("[data-section]")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const sectionId =
                        button.getAttribute(
                            "data-section"
                        );


                    if (sectionId) {

                        showSection(
                            sectionId
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

                    const sectionId =
                        button.getAttribute(
                            "data-profile-section"
                        );


                    if (sectionId) {

                        showSection(
                            sectionId
                        );

                    }


                    closeProfileMenu();

                }
            );

        });

}


function showSection(sectionId) {

    const target =
        getElement(sectionId);


    if (!target) {

        console.warn(
            "Section not found:",
            sectionId
        );

        return;

    }


    document
        .querySelectorAll(".app-section")
        .forEach(function (section) {

            section.classList.remove(
                "active-section"
            );

        });


    target.classList.add(
        "active-section"
    );


    closeSideMenu();

    closeProfileMenu();


    if (
        sectionId === "weatherSection"
    ) {

        loadWeather();

    }


    if (
        sectionId === "marketSection"
    ) {

        loadMarketPrices();

    }

}


/* ============================================================
   SIDE MENU
============================================================ */

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
        overlay.classList.add("active");
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
        overlay.classList.remove("active");
    }

}


/* ============================================================
   PROFILE MENU
============================================================ */

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

                closeProfileMenu();

            }

        }
    );

}


function closeProfileMenu() {

    const menu =
        getElement("profileMenu");


    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

}


/* ============================================================
   CONNECTION STATUS
============================================================ */

function updateConnectionStatus(
    isOnline
) {

    const status =
        getElement("connectionStatus");

    const text =
        getElement("connectionText");

    const dashboardText =
        getElement(
            "dashboardConnectionText"
        );


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
                ? translations[
                    selectedLanguage
                  ].online
                : translations[
                    selectedLanguage
                  ].offline;

    }


    if (dashboardText) {

        dashboardText.textContent =
            isOnline
                ? translations[
                    selectedLanguage
                  ].online
                : translations[
                    selectedLanguage
                  ].offline;

    }

}


/* ============================================================
   BACKEND FETCH HELPER
============================================================ */

async function apiFetch(
    endpoint,
    options = {}
) {

    const response =
        await fetch(
            endpoint,
            {
                ...options,

                headers: {

                    "Content-Type":
                        "application/json",

                    ...(options.headers || {})

                }
            }
        );


    let data = null;


    try {

        data =
            await response.json();

    } catch {

        data = null;

    }


    if (!response.ok) {

        const error =
            new Error(
                data?.error ||
                `Server returned ${response.status}`
            );

        error.status =
            response.status;

        throw error;

    }


    return data;

}


/* ============================================================
   BACKEND STATUS
============================================================ */

async function checkBackend() {

    console.log(
        "Checking SmartAgri backend..."
    );


    try {

        /*
         * IMPORTANT:
         *
         * Your Flask backend must have:
         *
         * @app.route("/api/status")
         *
         * If this endpoint does not exist,
         * this check will return 404.
         */

        const data =
            await apiFetch(
                "/api/status"
            );


        console.log(
            "Backend status:",
            data
        );


        updateConnectionStatus(
            true
        );


        return true;


    } catch (error) {

        console.error(
            "Backend connection failed:",
            error
        );


        updateConnectionStatus(
            false
        );


        return false;

    }

}


/* ============================================================
   WEATHER
============================================================ */

async function loadWeather() {

    console.log(
        "Loading Kopargaon weather..."
    );


    const loading =
        getElement("weatherLoading");

    const weatherData =
        getElement("weatherData");

    const emptyState =
        getElement("weatherEmptyState");

    const errorBox =
        getElement("weatherError");

    const refreshButton =
        getElement("refreshWeatherBtn");


    hideElement(errorBox);

    hideElement(emptyState);


    if (refreshButton) {

        refreshButton.disabled =
            true;

        refreshButton.innerHTML =
            "🔄 <span>Refreshing...</span>";

    }


    showElement(loading);


    try {

        /*
         * IMPORTANT:
         *
         * Flask must provide:
         *
         * GET /api/weather
         *
         * The backend should return JSON.
         */

        const data =
            await apiFetch(
                "/api/weather"
            );


        console.log(
            "Weather response:",
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


        hideElement(emptyState);

        showElement(weatherData);


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        showWeatherError(
            error
        );

    } finally {

        hideElement(loading);


        if (refreshButton) {

            refreshButton.disabled =
                false;

            refreshButton.innerHTML =
                "🔄 <span data-i18n=\"refresh\">" +
                translations[
                    selectedLanguage
                ].refresh +
                "</span>";

        }

    }

}


/* ============================================================
   WEATHER UI
============================================================ */

function updateWeatherUI(data) {

    const temperature =
        data.temperature_c ??
        data.temperature;

    const humidity =
        data.humidity_pct ??
        data.humidity;

    const wind =
        data.wind_speed_kmh ??
        data.wind_speed;

    const rain =
        data.rain_probability_pct ??
        data.rainChance ??
        data.rain_probability;


    setText(
        "weatherTemperature",
        temperature !== null &&
        temperature !== undefined
            ? `${Math.round(Number(temperature))}°C`
            : "—"
    );


    setText(
        "weatherHumidity",
        humidity !== null &&
        humidity !== undefined
            ? `${Math.round(Number(humidity))}%`
            : "—"
    );


    setText(
        "weatherWind",
        wind !== null &&
        wind !== undefined
            ? `${Math.round(Number(wind))} km/h`
            : "—"
    );


    setText(
        "weatherRain",
        rain !== null &&
        rain !== undefined
            ? `${Math.round(Number(rain))}%`
            : "—"
    );


    const location =
        data.location ||
        "Kopargaon";


    console.log(
        "Weather location:",
        location
    );


    const status =
        getElement("weatherStatus");


    if (status) {

        status.textContent =
            data.cached
                ? "Showing latest stored weather"
                : "Live weather • Open-Meteo";

    }

}


/* ============================================================
   WEATHER ERROR
============================================================ */

function showWeatherError(error) {

    const weatherData =
        getElement("weatherData");

    const emptyState =
        getElement("weatherEmptyState");

    const errorBox =
        getElement("weatherError");


    hideElement(weatherData);

    showElement(emptyState);


    if (errorBox) {

        errorBox.textContent =
            error?.message ||
            "Unable to load weather.";

        showElement(errorBox);

    }


    setText(
        "weatherTemperature",
        "—"
    );

    setText(
        "weatherHumidity",
        "—"
    );

    setText(
        "weatherWind",
        "—"
    );

    setText(
        "weatherRain",
        "—"
    );

}


/* ============================================================
   MARKET PRICES
============================================================ */

async function loadMarketPrices() {

    const crop =
        getElement(
            "cropPriceSelector"
        )?.value ||
        "onion";


    const loading =
        getElement("marketLoading");

    const errorBox =
        getElement("marketError");

    const tableBody =
        getElement("marketTableBody");


    hideElement(errorBox);

    showElement(loading);


    try {

        /*
         * This assumes your Flask backend has:
         *
         * GET /api/market-prices?crop=onion
         *
         * If your backend has a different route,
         * change this endpoint.
         */

        const data =
            await apiFetch(
                `/api/market-prices?crop=${encodeURIComponent(crop)}`
            );


        renderMarketPrices(
            data
        );


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "Market price error:",
            error
        );


        if (errorBox) {

            errorBox.textContent =
                error.message ||
                "Market data unavailable.";

            showElement(errorBox);

        }


        if (tableBody) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="4">

                        <div class="table-empty">

                            <span>📊</span>

                            <strong>
                                Market data unavailable
                            </strong>

                            <p>
                                ${escapeHtml(
                                    error.message ||
                                    "No verified market data has been received."
                                )}
                            </p>

                        </div>

                    </td>

                </tr>

            `;

        }

    } finally {

        hideElement(loading);

    }

}


function renderMarketPrices(data) {

    const tableBody =
        getElement("marketTableBody");


    if (!tableBody) {
        return;
    }


    let rows = [];


    if (Array.isArray(data)) {

        rows = data;

    } else if (
        Array.isArray(data?.data)
    ) {

        rows = data.data;

    } else if (
        Array.isArray(data?.prices)
    ) {

        rows = data.prices;

    } else if (
        Array.isArray(data?.results)
    ) {

        rows = data.results;

    }


    if (rows.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            Market data unavailable
                        </strong>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    tableBody.innerHTML = "";


    rows.forEach(function (row) {

        const tr =
            document.createElement("tr");


        const market =
            row.market ||
            row.market_name ||
            "—";

        const crop =
            row.crop ||
            row.commodity ||
            "—";

        const price =
            row.price ||
            row.modal_price ||
            row.price_per_quintal ||
            "—";

        const date =
            row.date ||
            row.arrival_date ||
            "—";


        tr.innerHTML = `

            <td>
                ${escapeHtml(market)}
            </td>

            <td>
                ${escapeHtml(crop)}
            </td>

            <td>
                ${escapeHtml(String(price))}
            </td>

            <td>
                ${escapeHtml(String(date))}
            </td>

        `;


        tableBody.appendChild(
            tr
        );

    });

}


/* ============================================================
   AI ASSISTANT
============================================================ */

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
                "user",
                question
            );


            input.value = "";


            if (sendButton) {
                sendButton.disabled = true;
            }


            setAIStatus(
                true,
                "AI Connected"
            );


            const typing =
                addChatMessage(
                    "assistant",
                    "Thinking..."
                );


            try {

                /*
                 * This assumes Flask provides:
                 *
                 * POST /api/ai
                 *
                 * Body:
                 * {
                 *   "message": "question"
                 * }
                 */

                const data =
                    await apiFetch(
                        "/api/ai",
                        {

                            method: "POST",

                            body:
                                JSON.stringify({

                                    message:
                                        question,

                                    question:
                                        question,

                                    language:
                                        selectedLanguage

                                })

                        }
                    );


                if (typing) {

                    typing.remove();

                }


                const answer =
                    data.answer ||
                    data.response ||
                    data.message ||
                    data.reply ||
                    "No response received from AI.";


                addChatMessage(
                    "assistant",
                    answer
                );


                setAIStatus(
                    true,
                    "AI Connected"
                );


            } catch (error) {

                console.error(
                    "AI error:",
                    error
                );


                if (typing) {
                    typing.remove();
                }


                addChatMessage(
                    "assistant",
                    "AI service is currently unavailable."
                );


                setAIStatus(
                    false,
                    "AI Not Connected"
                );

            } finally {

                if (sendButton) {
                    sendButton.disabled = false;
                }

            }

        }
    );

}


/* ============================================================
   CHAT MESSAGE
============================================================ */

function addChatMessage(
    sender,
    message
) {

    const container =
        getElement("chatMessages");


    if (!container) {
        return null;
    }


    const wrapper =
        document.createElement("div");


    wrapper.className =
        sender === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        sender === "user"
            ? "👨‍🌾"
            : "🤖";


    const label =
        sender === "user"
            ? "You"
            : translations[
                selectedLanguage
              ].assistant;


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHtml(label)}
            </strong>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;


    container.appendChild(
        wrapper
    );


    container.scrollTop =
        container.scrollHeight;


    return wrapper;

}


/* ============================================================
   AI STATUS
============================================================ */

function setAIStatus(
    connected,
    text
) {

    const badge =
        getElement(
            "aiConnectionBadge"
        );

    const label =
        getElement(
            "aiConnectionText"
        );


    if (badge) {

        badge.classList.toggle(
            "connected",
            connected
        );

        badge.classList.toggle(
            "not-connected-badge",
            !connected
        );

    }


    if (label) {

        label.textContent =
            text ||
            (
                connected
                    ? "AI Connected"
                    : "AI Not Connected"
            );

    }

}


/* ============================================================
   VOICE ASSISTANCE
============================================================ */

function setupVoice() {

    const startButton =
        getElement("startVoiceBtn");

    const stopButton =
        getElement("stopVoiceBtn");

    const input =
        getElement("voiceInput");

    const response =
        getElement("voiceResponse");


    if (
        !startButton ||
        !stopButton
    ) {

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
                "Voice recognition is not supported in this browser.";

        }

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    updateRecognitionLanguage();


    recognition.onstart =
        function () {

            isListening = true;

            hideElement(
                startButton
            );

            showElement(
                stopButton
            );


            if (response) {

                response.textContent =
                    "Listening...";

            }

        };


    recognition.onresult =
        async function (event) {

            const transcript =
                event
                    .results[0][0]
                    .transcript;


            if (input) {

                input.value =
                    transcript;

            }


            if (response) {

                response.textContent =
                    "Processing...";

            }


            await askAIFromVoice(
                transcript
            );

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event
            );


            if (response) {

                response.textContent =
                    "Voice recognition error.";

            }

        };


    recognition.onend =
        function () {

            isListening = false;

            showElement(
                startButton
            );

            hideElement(
                stopButton
            );

        };


    startButton.addEventListener(
        "click",
        function () {

            updateRecognitionLanguage();

            try {

                recognition.start();

            } catch (error) {

                console.warn(
                    "Voice start error:",
                    error
                );

            }

        }
    );


    stopButton.addEventListener(
        "click",
        function () {

            if (recognition) {

                recognition.stop();

            }

        }
    );

}


function updateRecognitionLanguage() {

    if (!recognition) {
        return;
    }


    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    recognition.lang =
        languages[
            selectedLanguage
        ] || "en-IN";

}


async function askAIFromVoice(
    text
) {

    try {

        const data =
            await apiFetch(
                "/api/ai",
                {

                    method: "POST",

                    body:
                        JSON.stringify({

                            message: text,

                            question: text,

                            language:
                                selectedLanguage

                        })

                }
            );


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            data.reply ||
            "No response received.";


        setText(
            "voiceResponse",
            answer
        );


        speakText(
            answer
        );


    } catch (error) {

        console.error(
            "Voice AI error:",
            error
        );


        setText(
            "voiceResponse",
            "AI service is currently unavailable."
        );

    }

}


/* ============================================================
   TEXT TO SPEECH
============================================================ */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


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
        languages[
            selectedLanguage
        ] || "en-IN";


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        utterance
    );

}


/* ============================================================
   LANGUAGE SELECTORS
============================================================ */

function setupLanguageSelectors() {

    const selectors = [

        getElement("dashboardLanguage"),

        getElement("settingsLanguage"),

        getElement("registerLanguage"),

        getElement("profileLanguage")

    ];


    selectors.forEach(function (select) {

        if (!select) {
            return;
        }


        select.addEventListener(
            "change",
            function () {

                applyLanguage(
                    select.value
                );


                updateRecognitionLanguage();

            }
        );

    });

}


/* ============================================================
   CROP HEALTH IMAGE
============================================================ */

function setupCropHealth() {

    const input =
        getElement("cropImageInput");

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

                hideElement(
                    previewContainer
                );

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


                    showElement(
                        previewContainer
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
            async function () {

                const file =
                    input.files?.[0];


                if (!file) {
                    return;
                }


                /*
                 * This endpoint is optional.
                 *
                 * If your backend supports crop AI:
                 *
                 * POST /api/crop-health
                 */

                const formData =
                    new FormData();


                formData.append(
                    "image",
                    file
                );


                analyzeButton.disabled =
                    true;


                setText(
                    "cropAnalysisResult",
                    "Analyzing crop..."
                );


                try {

                    const response =
                        await fetch(
                            "/api/crop-health",
                            {

                                method: "POST",

                                body:
                                    formData

                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data?.error ||
                            "Crop analysis failed."
                        );

                    }


                    const result =
                        data.result ||
                        data.analysis ||
                        data.message ||
                        "Analysis completed.";


                    const resultElement =
                        getElement(
                            "cropAnalysisResult"
                        );


                    if (resultElement) {

                        resultElement.innerHTML = `

                            <strong>
                                AI Crop Analysis
                            </strong>

                            <p>
                                ${escapeHtml(
                                    result
                                )}
                            </p>

                        `;

                    }


                } catch (error) {

                    console.error(
                        "Crop health error:",
                        error
                    );


                    const resultElement =
                        getElement(
                            "cropAnalysisResult"
                        );


                    if (resultElement) {

                        resultElement.innerHTML = `

                            <strong>
                                AI crop analysis unavailable
                            </strong>

                            <p>
                                ${escapeHtml(
                                    error.message
                                )}
                            </p>

                        `;

                    }

                } finally {

                    analyzeButton.disabled =
                        false;

                }

            }
        );

    }

}


/* ============================================================
   GOVERNMENT SCHEMES
============================================================ */

function setupSchemeButtons() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const url =
                        button.getAttribute(
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


/* ============================================================
   CROP INFORMATION
============================================================ */

function setupCropButtons() {

    const modal =
        getElement("cropInfoModal");

    const overlay =
        getElement(
            "cropInfoModalOverlay"
        );

    const closeButton =
        getElement(
            "closeCropInfoBtn"
        );

    const icon =
        getElement(
            "cropInfoModalIcon"
        );

    const title =
        getElement(
            "cropInfoModalTitle"
        );

    const subtitle =
        getElement(
            "cropInfoModalSubtitle"
        );

    const body =
        getElement(
            "cropInfoModalBody"
        );


    if (!modal) {
        return;
    }


    const cropInformation = {

        onion: {

            name: "Onion",

            icon: "🧅",

            cultivation: {

                title:
                    "Onion Cultivation Guidance",

                subtitle:
                    "Important steps for successful onion cultivation.",

                content: `

                    <h3>🌱 Land Preparation</h3>

                    <p>
                        Prepare a fine, well-drained seedbed.
                        Onion grows well in loose soil with good drainage.
                    </p>

                    <h3>🌱 Planting</h3>

                    <p>
                        Use healthy and disease-free seedlings or suitable
                        planting material.
                    </p>

                    <h3>💧 Irrigation</h3>

                    <p>
                        Maintain adequate soil moisture and avoid
                        excessive irrigation and waterlogging.
                    </p>

                    <h3>☀️ Field Conditions</h3>

                    <p>
                        Provide adequate sunlight and good air circulation.
                    </p>

                `

            },

            management: {

                title:
                    "Onion Crop Management",

                subtitle:
                    "Manage the crop throughout its growing period.",

                content: `

                    <h3>💧 Water Management</h3>

                    <p>
                        Maintain consistent soil moisture during
                        bulb development.
                    </p>

                    <h3>🌿 Weed Management</h3>

                    <p>
                        Keep the field free from weeds.
                    </p>

                    <h3>🧪 Nutrient Management</h3>

                    <p>
                        Apply nutrients according to soil condition
                        and recommended practices.
                    </p>

                    <h3>🔍 Crop Monitoring</h3>

                    <p>
                        Inspect plants regularly for pests and diseases.
                    </p>

                `

            },

            practices: {

                title:
                    "Onion Farming Practices",

                subtitle:
                    "Practical recommendations for better onion production.",

                content: `

                    <h3>🚜 Field Hygiene</h3>

                    <p>
                        Remove diseased plant material and maintain
                        clean cultivation areas.
                    </p>

                    <h3>🌱 Healthy Planting Material</h3>

                    <p>
                        Start with healthy and disease-free planting material.
                    </p>

                    <h3>🔄 Crop Rotation</h3>

                    <p>
                        Rotate crops when practical to support soil health.
                    </p>

                    <h3>📦 Harvest Management</h3>

                    <p>
                        Harvest at suitable maturity and cure bulbs
                        properly before storage.
                    </p>

                `

            }

        },


        wheat: {

            name: "Wheat",

            icon: "🌾",

            cultivation: {

                title:
                    "Wheat Cultivation Guidance",

                subtitle:
                    "Important steps for successful wheat production.",

                content: `

                    <h3>🌱 Soil Preparation</h3>

                    <p>
                        Prepare a well-levelled seedbed with suitable
                        soil moisture.
                    </p>

                    <h3>🌾 Seed Selection</h3>

                    <p>
                        Use healthy quality seed varieties recommended
                        for the local region.
                    </p>

                    <h3>💧 Irrigation</h3>

                    <p>
                        Irrigate according to crop growth stage,
                        soil moisture and weather conditions.
                    </p>

                    <h3>☀️ Crop Conditions</h3>

                    <p>
                        Maintain suitable cool growing conditions
                        with adequate sunlight.
                    </p>

                `

            },

            management: {

                title:
                    "Wheat Crop Management",

                subtitle:
                    "Manage wheat from germination through harvest.",

                content: `

                    <h3>💧 Irrigation Management</h3>

                    <p>
                        Pay attention to irrigation during important
                        crop growth stages.
                    </p>

                    <h3>🌿 Weed Control</h3>

                    <p>
                        Monitor fields and use appropriate
                        weed-management practices.
                    </p>

                    <h3>🔍 Pest Monitoring</h3>

                    <p>
                        Inspect the crop regularly for insects,
                        diseases and abnormal growth.
                    </p>

                    <h3>🧪 Nutrient Management</h3>

                    <p>
                        Apply fertilizers according to soil testing
                        and recommended crop requirements.
                    </p>

                `

            },

            practices: {

                title:
                    "Wheat Farming Practices",

                subtitle:
                    "Practical methods for maintaining a healthy wheat crop.",

                content: `

                    <h3>🌱 Timely Sowing</h3>

                    <p>
                        Follow the locally recommended sowing period
                        for the selected variety.
                    </p>

                    <h3>🚜 Field Preparation</h3>

                    <p>
                        Maintain a level and properly prepared seedbed.
                    </p>

                    <h3>🔄 Crop Rotation</h3>

                    <p>
                        Crop rotation can support soil management.
                    </p>

                    <h3>🌾 Harvesting</h3>

                    <p>
                        Harvest when the crop reaches suitable maturity.
                    </p>

                `

            }

        }

    };


    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const crop =
                        button.getAttribute(
                            "data-crop"
                        );

                    const topic =
                        button.getAttribute(
                            "data-topic"
                        );


                    const cropData =
                        cropInformation[crop];

                    const topicData =
                        cropData?.[topic];


                    if (
                        !cropData ||
                        !topicData
                    ) {

                        console.error(
                            "Crop information missing."
                        );

                        return;

                    }


                    if (icon) {

                        icon.textContent =
                            cropData.icon;

                    }


                    if (title) {

                        title.textContent =
                            topicData.title;

                    }


                    if (subtitle) {

                        subtitle.textContent =
                            topicData.subtitle;

                    }


                    if (body) {

                        body.innerHTML =
                            topicData.content;

                    }


                    modal.classList.remove(
                        "hidden"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );


                    if (closeButton) {
                        closeButton.focus();
                    }

                }
            );

        });


    function closeModal() {

        modal.classList.add(
            "hidden"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                !modal.classList.contains(
                    "hidden"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* ============================================================
   SETTINGS
============================================================ */

function setupSettings() {

    const voiceSetting =
        getElement("voiceSetting");


    if (voiceSetting) {

        const stored =
            localStorage.getItem(
                "smartagriVoiceEnabled"
            );


        if (stored !== null) {

            voiceSetting.checked =
                stored === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartagriVoiceEnabled",
                    voiceSetting.checked
                );

            }
        );

    }


    const notificationSetting =
        getElement(
            "notificationSetting"
        );


    if (notificationSetting) {

        const stored =
            localStorage.getItem(
                "smartagriNotifications"
            );


        if (stored !== null) {

            notificationSetting.checked =
                stored === "true";

        }


        notificationSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartagriNotifications",
                    notificationSetting.checked
                );

            }
        );

    }

}


/* ============================================================
   MESSAGE
============================================================ */

function showMessage(
    id,
    message,
    type = ""
) {

    const element =
        getElement(id);


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


/* ============================================================
   ESCAPE HTML
============================================================ */

function escapeHtml(value) {

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


/* ============================================================
   FIREBASE AUTH STATE
============================================================ */

function setupAuthStateListener() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser =
                    user;


                await loadFarmerProfile(
                    user
                );


            } else {

                currentUser =
                    null;

            }

        }
    );

}


/* ============================================================
   INITIALIZATION
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri frontend loaded."
        );


        /* -----------------------------------------------
           Language
        ------------------------------------------------ */

        applyLanguage(
            selectedLanguage
        );

        setupLanguagePage();

        setupLanguageSelectors();


        /* -----------------------------------------------
           Authentication
        ------------------------------------------------ */

        setupLogin();

        setupRegistration();

        setupAuthNavigation();

        setupDemo();

        setupLogout();

        setupAuthStateListener();


        /* -----------------------------------------------
           Dashboard
        ------------------------------------------------ */

        setupNavigation();

        setupSideMenu();

        setupProfileMenu();

        setupProfileEditing();


        /* -----------------------------------------------
           Weather
        ------------------------------------------------ */

        const refreshWeather =
            getElement(
                "refreshWeatherBtn"
            );


        if (refreshWeather) {

            refreshWeather.type =
                "button";


            refreshWeather.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    loadWeather();

                }
            );

        }


        /* -----------------------------------------------
           Market
        ------------------------------------------------ */

        const cropSelector =
            getElement(
                "cropPriceSelector"
            );


        if (cropSelector) {

            cropSelector.addEventListener(
                "change",
                loadMarketPrices
            );

        }


        /* -----------------------------------------------
           AI
        ------------------------------------------------ */

        setupAI();


        /* -----------------------------------------------
           Voice
        ------------------------------------------------ */

        setupVoice();


        /* -----------------------------------------------
           Crop health
        ------------------------------------------------ */

        setupCropHealth();


        /* -----------------------------------------------
           Crop information
        ------------------------------------------------ */

        setupCropButtons();


        /* -----------------------------------------------
           Government schemes
        ------------------------------------------------ */

        setupSchemeButtons();


        /* -----------------------------------------------
           Settings
        ------------------------------------------------ */

        setupSettings();


        /* -----------------------------------------------
           Backend
        ------------------------------------------------ */

        checkBackend();

    }
);
