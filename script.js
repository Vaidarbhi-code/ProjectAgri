/* =========================================================
   SMARTAGRI - COMPLETE SCRIPT.JS
   =========================================================

   Features:
   - Firebase Authentication
   - Demo Dashboard
   - English / Hindi / Marathi
   - Online / Offline detection
   - Weather API
   - Open-Meteo fallback
   - Market API
   - Market comparison
   - Dashboard navigation
   - Profile management
   - Settings
   - Voice assistance
   - AI assistant backend connection
   - Crop health backend connection
   - Government scheme buttons
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

try {

    if (typeof firebase !== "undefined") {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        db = firebase.firestore();

        console.log("Firebase initialized successfully.");

    } else {

        console.warn("Firebase SDK not available.");

    }

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage =
    localStorage.getItem("smartagriLanguage") || "en";

let currentUser = null;

let demoMode = false;

let currentFarmer = null;

let recognition = null;

let selectedCropImage = null;


/* =========================================================
   DEMO FARMER
========================================================= */

const DEMO_FARMER = {

    uid: "demo-user",

    name: "Demo Farmer",

    email: "demo@smartagri.com",

    mobile: "9876543210",

    village: "Kopargaon",

    state: "Maharashtra",

    landArea: "5 Acres",

    preferredMarket: "Kopargaon APMC",

    language: "en"

};


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

        loginTitle:
            "Farmer Login",

        loginSubtitle:
            "Login to access SmartAgri",

        email: "Email",

        password: "Password",

        rememberMe:
            "Remember Me",

        forgotPassword:
            "Forgot Password?",

        login: "Login",

        or: "OR",

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

        connectionStatus:
            "Connection Status",

        online:
            "Online",

        offline:
            "Offline",

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

        voiceResponse:
            "Voice Response",

        voiceInputPlaceholder:
            "Voice input will appear here...",

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
            "आपकी खेती की जानकारी एक ही जगह।",

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

        connectionStatus:
            "कनेक्शन स्थिति",

        online:
            "ऑनलाइन",

        offline:
            "ऑफलाइन",

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
            "AI विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

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
            "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

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
            "वॉइस प्रतिक्रिया",

        voiceInputPlaceholder:
            "वॉइस इनपुट यहां दिखाई देगा...",

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

        appName: "स्मार्टएग्री",

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
            "जमिनीचे क्षेत्र",

        preferredMarket:
            "आवडते बाजार",

        selectMarket:
            "बाजार निवडा",

        kopargaonMarket:
            "कोपरगाव APMC",

        yeolaMarket:
            "येवला बाजार",

        shirdiMarket:
            "शिर्डी बाजार",

        preferredLanguage:
            "आवडती भाषा",

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
            "आपली शेतीची माहिती एकाच ठिकाणी.",

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

        connectionStatus:
            "कनेक्शन स्थिती",

        online:
            "ऑनलाइन",

        offline:
            "ऑफलाइन",

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
            "विक्रीपूर्वी बाजार माहितीची तुलना करा.",

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
            "व्हॉइस प्रतिसाद",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

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
            "आपली आवडती अॅप भाषा निवडा.",

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
        "smartagriLanguage",
        currentLanguage
    );


    document.documentElement.lang =
        currentLanguage;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (key && translations[currentLanguage][key]) {

                element.textContent =
                    translations[currentLanguage][key];

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                key &&
                translations[currentLanguage][key]
            ) {

                element.placeholder =
                    translations[currentLanguage][key];

            }

        });


    updateLanguageSelectors();

    updateConnectionStatus();

    updateVoiceLanguage();

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function updateLanguageSelectors() {

    const selectors = [

        document.getElementById(
            "dashboardLanguage"
        ),

        document.getElementById(
            "settingsLanguage"
        ),

        document.getElementById(
            "registerLanguage"
        ),

        document.getElementById(
            "profileLanguage"
        )

    ];


    selectors.forEach(function (select) {

        if (select) {

            select.value =
                currentLanguage;

        }

    });

}


/* =========================================================
   CONNECTION STATUS
=========================================================

   IMPORTANT:
   This uses the browser's real network state.

   navigator.onLine = true
   means browser currently has network connectivity.

========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


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


    if (connectionStatus) {

        connectionStatus.classList.toggle(
            "online",
            online
        );

        connectionStatus.classList.toggle(
            "offline",
            !online
        );

    }


    if (connectionText) {

        connectionText.textContent =
            online
                ? t("online")
                : t("offline");

    }


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            online
                ? t("online")
                : t("offline");

    }


    console.log(
        "SmartAgri network status:",
        online ? "ONLINE" : "OFFLINE"
    );

}


/* =========================================================
   REAL NETWORK EVENTS
========================================================= */

window.addEventListener(
    "online",
    function () {

        updateConnectionStatus();

    }
);


window.addEventListener(
    "offline",
    function () {

        updateConnectionStatus();

    }
);


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(
            "#languagePage, #loginPage, #registerPage"
        )
        .forEach(function (screen) {

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


    const dashboard =
        document.getElementById(
            "dashboardPage"
        );


    if (dashboard) {

        if (screenId === "dashboardPage") {

            dashboard.classList.add(
                "active"
            );

        }

    }

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

    document
        .querySelectorAll(
            "#languagePage, #loginPage, #registerPage"
        )
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
            "active"
        );

    }


    showSection("dashboardSection");

    updateConnectionStatus();

    loadFarmerIntoUI();

}


/* =========================================================
   HIDE DASHBOARD
========================================================= */

function hideDashboard() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );


    if (dashboard) {

        dashboard.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   DASHBOARD SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

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
        document.getElementById(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    closeSideMenu();

    closeProfileMenu();


    if (sectionId === "weatherSection") {

        loadWeather();

    }


    if (sectionId === "marketSection") {

        loadMarketPrices();

    }


    if (sectionId === "comparisonSection") {

        loadMarketComparison();

    }

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    demoMode = true;

    currentUser = null;

    currentFarmer = {
        ...DEMO_FARMER
    };


    localStorage.setItem(
        "smartagriDemoMode",
        "true"
    );


    localStorage.setItem(
        "smartagriFarmer",
        JSON.stringify(currentFarmer)
    );


    showDashboard();

}


/* =========================================================
   LOAD FARMER INTO UI
========================================================= */

function loadFarmerIntoUI() {

    if (!currentFarmer) {

        const stored =
            localStorage.getItem(
                "smartagriFarmer"
            );


        if (stored) {

            try {

                currentFarmer =
                    JSON.parse(stored);

            } catch (error) {

                currentFarmer = null;

            }

        }

    }


    if (!currentFarmer) {
        return;
    }


    setText(
        "headerFarmerName",
        currentFarmer.name || "Farmer"
    );


    setText(
        "dashboardFarmerName",
        currentFarmer.name || "Farmer"
    );


    setText(
        "summaryName",
        currentFarmer.name || "—"
    );


    setText(
        "summaryVillage",
        currentFarmer.village || "—"
    );


    setText(
        "summaryLand",
        currentFarmer.landArea || "—"
    );


    setText(
        "summaryMarket",
        currentFarmer.preferredMarket || "—"
    );


    setValue(
        "profileName",
        currentFarmer.name || ""
    );


    setValue(
        "profileEmail",
        currentFarmer.email || ""
    );


    setValue(
        "profileMobile",
        currentFarmer.mobile || ""
    );


    setValue(
        "profileVillage",
        currentFarmer.village || ""
    );


    setValue(
        "profileState",
        currentFarmer.state || ""
    );


    setValue(
        "profileLandArea",
        currentFarmer.landArea || ""
    );


    setValue(
        "profileMarket",
        currentFarmer.preferredMarket || ""
    );


    setValue(
        "profileLanguage",
        currentFarmer.language ||
        currentLanguage
    );


    setText(
        "profilePageName",
        currentFarmer.name || "—"
    );


    setText(
        "profilePageEmail",
        currentFarmer.email || "—"
    );

}


/* =========================================================
   DOM HELPERS
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value == null ? "" : value;

    }

}


function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value == null ? "" : value;

    }

}


/* =========================================================
   FIREBASE PROFILE LOAD
========================================================= */

async function loadFirebaseProfile(user) {

    if (!user || !db) {
        return null;
    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            return {

                uid: user.uid,

                email:
                    user.email ||
                    snapshot.data().email ||
                    "",

                ...snapshot.data()

            };

        }


        return {

            uid: user.uid,

            email:
                user.email || ""

        };

    } catch (error) {

        console.error(
            "Could not load farmer profile:",
            error
        );

        return null;

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function loginUser(email, password) {

    if (!auth) {

        showMessage(
            "loginMessage",
            "Firebase authentication is unavailable.",
            "error"
        );

        return;

    }


    try {

        showMessage(
            "loginMessage",
            "Logging in...",
            ""
        );


        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        currentUser =
            result.user;


        demoMode = false;


        currentFarmer =
            await loadFirebaseProfile(
                currentUser
            );


        if (!currentFarmer) {

            currentFarmer = {

                uid:
                    currentUser.uid,

                email:
                    currentUser.email || "",

                name:
                    currentUser.displayName ||
                    "Farmer"

            };

        }


        localStorage.removeItem(
            "smartagriDemoMode"
        );


        localStorage.setItem(
            "smartagriFarmer",
            JSON.stringify(currentFarmer)
        );


        showDashboard();


    } catch (error) {

        console.error(error);


        showMessage(
            "loginMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGE
========================================================= */

function firebaseErrorMessage(error) {

    if (!error) {
        return "An error occurred.";
    }


    switch (error.code) {

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Invalid email or password.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        default:
            return error.message ||
                "Authentication failed.";

    }

}


/* =========================================================
   REGISTRATION
========================================================= */

async function registerUser(formData) {

    if (!auth || !db) {

        showMessage(
            "registerMessage",
            "Firebase is unavailable.",
            "error"
        );

        return;

    }


    try {

        showMessage(
            "registerMessage",
            "Creating account...",
            ""
        );


        const result =
            await auth
                .createUserWithEmailAndPassword(
                    formData.email,
                    formData.password
                );


        const user =
            result.user;


        const farmerData = {

            uid:
                user.uid,

            name:
                formData.name,

            email:
                formData.email,

            mobile:
                formData.mobile,

            village:
                formData.village,

            state:
                formData.state,

            landArea:
                formData.landArea,

            preferredMarket:
                formData.preferredMarket,

            language:
                formData.language,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        };


        await db
            .collection("farmers")
            .doc(user.uid)
            .set(
                farmerData,
                {
                    merge: true
                }
            );


        currentUser =
            user;


        currentFarmer =
            farmerData;


        currentLanguage =
            formData.language || "en";


        localStorage.setItem(
            "smartagriFarmer",
            JSON.stringify(currentFarmer)
        );


        applyLanguage(
            currentLanguage
        );


        showDashboard();


    } catch (error) {

        console.error(error);


        showMessage(
            "registerMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

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

    demoMode = false;


    localStorage.removeItem(
        "smartagriDemoMode"
    );

    localStorage.removeItem(
        "smartagriFarmer"
    );


    hideDashboard();

    showScreen("loginPage");

}


/* =========================================================
   PASSWORD RESET
========================================================= */

async function resetPassword() {

    const emailElement =
        document.getElementById(
            "loginEmail"
        );


    const email =
        emailElement
            ? emailElement.value.trim()
            : "";


    if (!email) {

        showMessage(
            "loginMessage",
            "Enter your email address first.",
            "error"
        );

        return;

    }


    if (!auth) {

        showMessage(
            "loginMessage",
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
            "loginMessage",
            "Password reset email sent.",
            "success"
        );


    } catch (error) {

        showMessage(
            "loginMessage",
            firebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        "message";


    if (type) {

        element.classList.add(
            type === "error"
                ? "error-message"
                : "success-message"
        );

    }

}


/* =========================================================
   WEATHER
=========================================================

   Primary endpoint:
       /api/weather

   If your backend endpoint is unavailable,
   Open-Meteo is used as fallback.

   Kopargaon coordinates:
       Latitude 19.8823
       Longitude 74.4762

========================================================= */

const KOPARGAON_LAT =
    19.8823;

const KOPARGAON_LON =
    74.4762;


async function loadWeather() {

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const errorBox =
        document.getElementById(
            "weatherError"
        );

    const emptyState =
        document.getElementById(
            "weatherEmptyState"
        );

    const weatherData =
        document.getElementById(
            "weatherData"
        );


    if (loading) {
        loading.classList.remove("hidden");
    }

    if (errorBox) {
        errorBox.classList.add("hidden");
    }


    try {

        let data = null;


        /* -------------------------------------------------
           TRY YOUR BACKEND WEATHER API FIRST
        ------------------------------------------------- */

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


            if (response.ok) {

                data =
                    await response.json();

                console.log(
                    "Weather loaded from /api/weather"
                );

            }

        } catch (backendError) {

            console.warn(
                "Backend weather API unavailable. Trying Open-Meteo.",
                backendError
            );

        }


        /* -------------------------------------------------
           OPEN-METEO FALLBACK
        ------------------------------------------------- */

        if (!data) {

            const url =
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=" +
                KOPARGAON_LAT +
                "&longitude=" +
                KOPARGAON_LON +
                "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation" +
                "&hourly=precipitation_probability" +
                "&timezone=Asia%2FKolkata";


            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "Weather service returned an error."
                );

            }


            data =
                await response.json();


            console.log(
                "Weather loaded from Open-Meteo."
            );

        }


        const normalized =
            normalizeWeatherData(
                data
            );


        if (!normalized) {

            throw new Error(
                "Weather data format was not recognized."
            );

        }


        renderWeather(
            normalized
        );


        if (emptyState) {

            emptyState.classList.add(
                "hidden"
            );

        }

        if (weatherData) {

            weatherData.classList.remove(
                "hidden"
            );

        }


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        if (weatherData) {

            weatherData.classList.add(
                "hidden"
            );

        }


        if (emptyState) {

            emptyState.classList.remove(
                "hidden"
            );

        }


        if (errorBox) {

            errorBox.textContent =
                error.message ||
                "Unable to load weather.";

            errorBox.classList.remove(
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
   NORMALIZE WEATHER DATA
========================================================= */

function normalizeWeatherData(data) {

    if (!data) {
        return null;
    }


    /* -----------------------------------------------
       OPEN-METEO FORMAT
    ------------------------------------------------ */

    if (data.current) {

        const current =
            data.current;


        let rainChance = 0;


        if (
            data.hourly &&
            Array.isArray(
                data.hourly.precipitation_probability
            )
        ) {

            rainChance =
                data.hourly
                    .precipitation_probability[0] || 0;

        }


        return {

            temperature:
                current.temperature_2m,

            humidity:
                current.relative_humidity_2m,

            wind:
                current.wind_speed_10m,

            rain:
                rainChance

        };

    }


    /* -----------------------------------------------
       COMMON BACKEND FORMATS
    ------------------------------------------------ */

    const source =
        data.weather ||
        data.data ||
        data;


    const temperature =
        source.temperature ??
        source.temp ??
        source.temperature_2m;


    const humidity =
        source.humidity ??
        source.relative_humidity ??
        source.relative_humidity_2m;


    const wind =
        source.windSpeed ??
        source.wind_speed ??
        source.wind;


    const rain =
        source.rainChance ??
        source.rain_chance ??
        source.precipitation_probability ??
        source.rain;


    if (
        temperature !== undefined ||
        humidity !== undefined ||
        wind !== undefined
    ) {

        return {

            temperature:
                temperature,

            humidity:
                humidity,

            wind:
                wind,

            rain:
                rain || 0

        };

    }


    return null;

}


/* =========================================================
   RENDER WEATHER
========================================================= */

function renderWeather(weather) {

    setText(
        "weatherTemperature",
        formatWeatherValue(
            weather.temperature,
            "°C"
        )
    );


    setText(
        "weatherHumidity",
        formatWeatherValue(
            weather.humidity,
            "%"
        )
    );


    setText(
        "weatherWind",
        formatWeatherValue(
            weather.wind,
            " km/h"
        )
    );


    setText(
        "weatherRain",
        formatWeatherValue(
            weather.rain,
            "%"
        )
    );

}


/* =========================================================
   WEATHER VALUE FORMATTER
========================================================= */

function formatWeatherValue(
    value,
    suffix
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


    if (Number.isNaN(number)) {

        return String(value);

    }


    return (
        Math.round(number * 10) / 10
    ) + suffix;

}


/* =========================================================
   MARKET PRICES
========================================================= */

async function loadMarketPrices() {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );

    const loading =
        document.getElementById(
            "marketLoading"
        );

    const errorBox =
        document.getElementById(
            "marketError"
        );


    if (!tbody) {
        return;
    }


    if (loading) {

        loading.classList.remove(
            "hidden"
        );

    }


    if (errorBox) {

        errorBox.classList.add(
            "hidden"
        );

    }


    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    const crop =
        selector
            ? selector.value
            : "onion";


    try {

        const response =
            await fetch(
                "/api/market?crop=" +
                encodeURIComponent(crop)
            );


        if (!response.ok) {

            throw new Error(
                "Market API unavailable."
            );

        }


        const data =
            await response.json();


        renderMarketTable(
            data,
            crop
        );


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        renderMarketUnavailable();


        if (errorBox) {

            errorBox.textContent =
                error.message;

            errorBox.classList.remove(
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
   RENDER MARKET TABLE
========================================================= */

function renderMarketTable(
    data,
    crop
) {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tbody) {
        return;
    }


    let rows = [];


    if (Array.isArray(data)) {

        rows = data;

    } else if (
        data &&
        Array.isArray(data.data)
    ) {

        rows =
            data.data;

    } else if (
        data &&
        Array.isArray(data.records)
    ) {

        rows =
            data.records;

    } else if (
        data &&
        Array.isArray(data.results)
    ) {

        rows =
            data.results;

    }


    if (!rows.length) {

        renderMarketUnavailable();

        return;

    }


    tbody.innerHTML =
        "";


    rows.forEach(function (item) {

        const row =
            document.createElement(
                "tr"
            );


        const market =
            item.market ||
            item.marketName ||
            item.market_name ||
            item.agmarknet_market ||
            "—";


        const cropName =
            item.crop ||
            item.commodity ||
            item.cropName ||
            crop;


        const price =
            item.price ??
            item.modal_price ??
            item.modalPrice ??
            item.min_price ??
            "—";


        const date =
            item.date ||
            item.arrival_date ||
            item.arrivalDate ||
            "—";


        row.innerHTML = `

            <td>${escapeHtml(market)}</td>

            <td>${escapeHtml(cropName)}</td>

            <td>₹${escapeHtml(price)}</td>

            <td>${escapeHtml(date)}</td>

        `;


        tbody.appendChild(
            row
        );

    });

}


/* =========================================================
   MARKET UNAVAILABLE
========================================================= */

function renderMarketUnavailable() {

    const tbody =
        document.getElementById(
            "marketTableBody"
        );


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
                            t("marketDataUnavailable")
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            t("marketDataUnavailableDescription")
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

async function loadMarketComparison() {

    try {

        const response =
            await fetch(
                "/api/market-comparison"
            );


        if (!response.ok) {
            throw new Error(
                "Comparison API unavailable."
            );
        }


        const data =
            await response.json();


        updateComparisonCards(
            data
        );


    } catch (error) {

        console.warn(
            "Market comparison unavailable:",
            error
        );

    }

}


/* =========================================================
   UPDATE COMPARISON CARDS
========================================================= */

function updateComparisonCards(data) {

    if (!data) {
        return;
    }


    const cards =
        document.querySelectorAll(
            "[data-market-card]"
        );


    cards.forEach(function (card) {

        const marketName =
            card.getAttribute(
                "data-market-card"
            );


        const item =
            findMarketItem(
                data,
                marketName
            );


        if (!item) {
            return;
        }


        const price =
            item.price ??
            item.modal_price ??
            item.modalPrice ??
            item.value;


        const priceElement =
            card.querySelector(
                ".comparison-price"
            );


        const statusElement =
            card.querySelector(
                ".comparison-status"
            );


        if (priceElement && price != null) {

            priceElement.textContent =
                "₹" + price;

        }


        if (statusElement) {

            statusElement.textContent =
                "Verified market data";

        }

    });

}


/* =========================================================
   FIND MARKET ITEM
========================================================= */

function findMarketItem(
    data,
    marketName
) {

    let rows = [];


    if (Array.isArray(data)) {

        rows = data;

    } else if (
        data.data &&
        Array.isArray(data.data)
    ) {

        rows =
            data.data;

    } else if (
        data.markets &&
        Array.isArray(data.markets)
    ) {

        rows =
            data.markets;

    }


    return rows.find(
        function (item) {

            const name =
                item.market ||
                item.marketName ||
                item.name ||
                "";


            return (
                name.toLowerCase() ===
                marketName.toLowerCase()
            );

        }
    );

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function enableProfileEditing() {

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


    fields.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.disabled =
                false;

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


/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

function cancelProfileEditing() {

    loadFarmerIntoUI();


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


    fields.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.disabled =
                true;

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


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    const updated = {

        ...(currentFarmer || {}),

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

        preferredMarket:
            getValue("profileMarket"),

        language:
            getValue("profileLanguage")

    };


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


        currentFarmer =
            updated;


        localStorage.setItem(
            "smartagriFarmer",
            JSON.stringify(
                currentFarmer
            )
        );


        if (updated.language) {

            applyLanguage(
                updated.language
            );

        }


        loadFarmerIntoUI();


        cancelProfileEditing();


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);


        showMessage(
            "profileMessage",
            "Could not save profile.",
            "error"
        );

    }

}


/* =========================================================
   VALUE HELPER
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

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
        document.getElementById(
            "sideMenu"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );


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
            "open"
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
            "open"
        );

    }

}


/* =========================================================
   VOICE LANGUAGE
========================================================= */

function updateVoiceLanguage() {

    if (!recognition) {
        return;
    }


    const languageMap = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    recognition.lang =
        languageMap[
            currentLanguage
        ] || "en-IN";

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function initializeVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported."
        );

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    updateVoiceLanguage();


    recognition.onstart =
        function () {

            const startButton =
                document.getElementById(
                    "startVoiceBtn"
                );

            const stopButton =
                document.getElementById(
                    "stopVoiceBtn"
                );


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

            let text = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                text +=
                    event.results[i][0].transcript;

            }


            setValue(
                "voiceInput",
                text
            );


            if (
                event.results[
                    event.results.length - 1
                ].isFinal
            ) {

                setText(
                    "voiceResponse",
                    text
                );

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice error:",
                event.error
            );


            setText(
                "voiceResponse",
                "Voice recognition error."
            );

            stopVoiceUI();

        };


    recognition.onend =
        function () {

            stopVoiceUI();

        };

}


/* =========================================================
   START VOICE
========================================================= */

function startVoice() {

    if (!recognition) {

        initializeVoiceRecognition();

    }


    if (!recognition) {

        setText(
            "voiceResponse",
            "Voice recognition is not supported by this browser."
        );

        return;

    }


    updateVoiceLanguage();


    try {

        recognition.start();

    } catch (error) {

        console.warn(
            "Voice start:",
            error
        );

    }

}


/* =========================================================
   STOP VOICE
========================================================= */

function stopVoice() {

    if (recognition) {

        try {

            recognition.stop();

        } catch (error) {

            console.warn(error);

        }

    }


    stopVoiceUI();

}


/* =========================================================
   VOICE UI
========================================================= */

function stopVoiceUI() {

    const startButton =
        document.getElementById(
            "startVoiceBtn"
        );

    const stopButton =
        document.getElementById(
            "stopVoiceBtn"
        );


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

}


/* =========================================================
   AI ASSISTANT
========================================================= */

async function sendAIQuestion(question) {

    const chat =
        document.getElementById(
            "chatMessages"
        );


    if (!chat || !question.trim()) {
        return;
    }


    addChatMessage(
        "user",
        question
    );


    try {

        const response =
            await fetch(
                "/api/ai",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            message:
                                question,

                            language:
                                currentLanguage,

                            farmer:
                                currentFarmer

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "AI service unavailable."
            );

        }


        const data =
            await response.json();


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            "No response received.";


        addChatMessage(
            "assistant",
            answer
        );


    } catch (error) {

        console.error(
            "AI error:",
            error
        );


        addChatMessage(
            "assistant",
            t("aiUnavailable")
        );

    }

}


/* =========================================================
   ADD CHAT MESSAGE
========================================================= */

function addChatMessage(
    type,
    message
) {

    const chat =
        document.getElementById(
            "chatMessages"
        );


    if (!chat) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    const avatar =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? "You"
                        : escapeHtml(t("assistant"))
                }
            </strong>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;


    chat.appendChild(
        wrapper
    );


    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================================
   CROP HEALTH
========================================================= */

function handleCropImage(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    selectedCropImage =
        file;


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


    if (preview) {

        preview.src =
            URL.createObjectURL(
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


/* =========================================================
   ANALYZE CROP
========================================================= */

async function analyzeCrop() {

    if (!selectedCropImage) {
        return;
    }


    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    if (result) {

        result.innerHTML =
            "<strong>Analyzing crop...</strong>";

    }


    try {

        const formData =
            new FormData();


        formData.append(
            "image",
            selectedCropImage
        );


        formData.append(
            "language",
            currentLanguage
        );


        const response =
            await fetch(
                "/api/crop-analysis",
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                "Crop analysis service unavailable."
            );

        }


        const data =
            await response.json();


        const resultText =
            data.analysis ||
            data.result ||
            data.message ||
            "Analysis completed.";


        if (result) {

            result.innerHTML = `

                <strong>
                    Crop Analysis
                </strong>

                <p>
                    ${escapeHtml(resultText)}
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
                    ${escapeHtml(
                        t("analysisNotConnected")
                    )}
                </strong>

                <p>
                    ${escapeHtml(
                        t("analysisNotConnectedDescription")
                    )}
                </p>

            `;

        }

    }

}


/* =========================================================
   SCHEME BUTTONS
========================================================= */

function initializeSchemeButtons() {

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


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


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


/* =========================================================
   EVENT INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri JavaScript loaded."
        );


        /* ---------------------------------------------
           INITIAL LANGUAGE
        --------------------------------------------- */

        applyLanguage(
            currentLanguage
        );


        /* ---------------------------------------------
           INITIAL CONNECTION STATUS
        --------------------------------------------- */

        updateConnectionStatus();


        /* ---------------------------------------------
           LANGUAGE PAGE
        --------------------------------------------- */

        let selectedLanguage =
            null;


        document
            .querySelectorAll(
                ".language-option"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".language-option"
                            )
                            .forEach(
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


                        const continueButton =
                            document.getElementById(
                                "continueLanguageBtn"
                            );


                        if (continueButton) {

                            continueButton.disabled =
                                false;

                        }

                    }
                );

            });


        const continueLanguageBtn =
            document.getElementById(
                "continueLanguageBtn"
            );


        if (continueLanguageBtn) {

            continueLanguageBtn.addEventListener(
                "click",
                function () {

                    if (!selectedLanguage) {
                        return;
                    }


                    applyLanguage(
                        selectedLanguage
                    );


                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* ---------------------------------------------
           CHANGE LANGUAGE FROM LOGIN
        --------------------------------------------- */

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


        /* ---------------------------------------------
           DEMO DASHBOARD
        --------------------------------------------- */

        const demoButton =
            document.getElementById(
                "demoBtn"
            );


        if (demoButton) {

            demoButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    console.log(
                        "Demo dashboard clicked."
                    );

                    enterDemoDashboard();

                }
            );

        }


        /* ---------------------------------------------
           LOGIN FORM
        --------------------------------------------- */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        getValue(
                            "loginEmail"
                        );


                    const password =
                        getValue(
                            "loginPassword"
                        );


                    loginUser(
                        email,
                        password
                    );

                }
            );

        }


        /* ---------------------------------------------
           FORGOT PASSWORD
        --------------------------------------------- */

        const forgotButton =
            document.getElementById(
                "forgotPasswordBtn"
            );


        if (forgotButton) {

            forgotButton.addEventListener(
                "click",
                resetPassword
            );

        }


        /* ---------------------------------------------
           REGISTER PAGE
        --------------------------------------------- */

        const showRegister =
            document.getElementById(
                "showRegisterBtn"
            );


        if (showRegister) {

            showRegister.addEventListener(
                "click",
                function () {

                    showScreen(
                        "registerPage"
                    );

                }
            );

        }


        const showLogin =
            document.getElementById(
                "showLoginBtn"
            );


        if (showLogin) {

            showLogin.addEventListener(
                "click",
                function () {

                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* ---------------------------------------------
           REGISTRATION FORM
        --------------------------------------------- */

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (registrationForm) {

            registrationForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    registerUser({

                        name:
                            getValue(
                                "registerName"
                            ),

                        email:
                            getValue(
                                "registerEmail"
                            ),

                        mobile:
                            getValue(
                                "registerMobile"
                            ),

                        village:
                            getValue(
                                "registerVillage"
                            ),

                        state:
                            getValue(
                                "registerState"
                            ),

                        landArea:
                            getValue(
                                "registerLandArea"
                            ),

                        preferredMarket:
                            getValue(
                                "registerMarket"
                            ),

                        language:
                            getValue(
                                "registerLanguage"
                            ),

                        password:
                            getValue(
                                "registerPassword"
                            )

                    });

                }
            );

        }


        /* ---------------------------------------------
           DASHBOARD NAVIGATION
        --------------------------------------------- */

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


        /* ---------------------------------------------
           HAMBURGER
        --------------------------------------------- */

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


        /* ---------------------------------------------
           PROFILE MENU
        --------------------------------------------- */

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


        document
            .querySelectorAll(
                "[data-profile-section]"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        showSection(
                            button.getAttribute(
                                "data-profile-section"
                            )
                        );

                    }
                );

            });


        /* ---------------------------------------------
           LOGOUT BUTTONS
        --------------------------------------------- */

        const logoutButtons = [

            document.getElementById(
                "sideLogoutBtn"
            ),

            document.getElementById(
                "profileLogoutBtn"
            )

        ];


        logoutButtons.forEach(
            function (button) {

                if (button) {

                    button.addEventListener(
                        "click",
                        logoutUser
                    );

                }

            }
        );


        /* ---------------------------------------------
           DASHBOARD LANGUAGE
        --------------------------------------------- */

        const dashboardLanguage =
            document.getElementById(
                "dashboardLanguage"
            );


        if (dashboardLanguage) {

            dashboardLanguage.addEventListener(
                "change",
                function () {

                    applyLanguage(
                        dashboardLanguage.value
                    );

                }
            );

        }


        /* ---------------------------------------------
           SETTINGS LANGUAGE
        --------------------------------------------- */

        const settingsLanguage =
            document.getElementById(
                "settingsLanguage"
            );


        if (settingsLanguage) {

            settingsLanguage.addEventListener(
                "change",
                function () {

                    applyLanguage(
                        settingsLanguage.value
                    );

                }
            );

        }


        /* ---------------------------------------------
           REGISTER LANGUAGE
        --------------------------------------------- */

        const registerLanguage =
            document.getElementById(
                "registerLanguage"
            );


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


        /* ---------------------------------------------
           PROFILE LANGUAGE
        --------------------------------------------- */

        const profileLanguage =
            document.getElementById(
                "profileLanguage"
            );


        if (profileLanguage) {

            profileLanguage.addEventListener(
                "change",
                function () {

                    applyLanguage(
                        profileLanguage.value
                    );

                }
            );

        }


        /* ---------------------------------------------
           WEATHER REFRESH
        --------------------------------------------- */

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


        /* ---------------------------------------------
           CROP PRICE SELECTOR
        --------------------------------------------- */

        const cropSelector =
            document.getElementById(
                "cropPriceSelector"
            );


        if (cropSelector) {

            cropSelector.addEventListener(
                "change",
                loadMarketPrices
            );

        }


        /* ---------------------------------------------
           PROFILE EDIT
        --------------------------------------------- */

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


        /* ---------------------------------------------
           VOICE
        --------------------------------------------- */

        initializeVoiceRecognition();


        const startVoice =
            document.getElementById(
                "startVoiceBtn"
            );


        if (startVoice) {

            startVoice.addEventListener(
                "click",
                startVoice
            );

        }


        const stopVoice =
            document.getElementById(
                "stopVoiceBtn"
            );


        if (stopVoice) {

            stopVoice.addEventListener(
                "click",
                stopVoice
            );

        }


        /* ---------------------------------------------
           AI
        --------------------------------------------- */

        const aiForm =
            document.getElementById(
                "aiForm"
            );


        if (aiForm) {

            aiForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const input =
                        document.getElementById(
                            "aiInput"
                        );


                    if (!input) {
                        return;
                    }


                    const question =
                        input.value.trim();


                    if (!question) {
                        return;
                    }


                    input.value =
                        "";


                    sendAIQuestion(
                        question
                    );

                }
            );

        }


        /* ---------------------------------------------
           CROP HEALTH IMAGE
        --------------------------------------------- */

        const cropImageInput =
            document.getElementById(
                "cropImageInput"
            );


        if (cropImageInput) {

            cropImageInput.addEventListener(
                "change",
                handleCropImage
            );

        }


        const analyzeCropButton =
            document.getElementById(
                "analyzeCropBtn"
            );


        if (analyzeCropButton) {

            analyzeCropButton.addEventListener(
                "click",
                analyzeCrop
            );

        }


        /* ---------------------------------------------
           SCHEME BUTTONS
        --------------------------------------------- */

        initializeSchemeButtons();


        /* ---------------------------------------------
           FIREBASE AUTH STATE
        --------------------------------------------- */

        if (auth) {

            auth.onAuthStateChanged(
                async function (user) {

                    if (user) {

                        if (!demoMode) {

                            currentUser =
                                user;


                            const profile =
                                await loadFirebaseProfile(
                                    user
                                );


                            if (profile) {

                                currentFarmer =
                                    profile;

                            }


                            if (!currentFarmer) {

                                currentFarmer = {

                                    uid:
                                        user.uid,

                                    email:
                                        user.email || "",

                                    name:
                                        user.displayName ||
                                        "Farmer"

                                };

                            }


                            localStorage.setItem(
                                "smartagriFarmer",
                                JSON.stringify(
                                    currentFarmer
                                )
                            );


                            showDashboard();

                        }

                    }

                }
            );

        }


        /* ---------------------------------------------
           RESTORE DEMO SESSION
        --------------------------------------------- */

        const storedDemo =
            localStorage.getItem(
                "smartagriDemoMode"
            );


        if (
            storedDemo === "true"
        ) {

            demoMode = true;

            currentFarmer = {
                ...DEMO_FARMER
            };

            showDashboard();

        }

    }
);


/* =========================================================
   KEYBOARD SUPPORT
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
   INITIAL STATUS
========================================================= */

updateConnectionStatus();

console.log(
    "SmartAgri script.js ready."
);
