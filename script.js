/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   Language + Firebase + Dashboard + Navigation
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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;
let currentFarmerData = null;


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    /* =====================================================
       ENGLISH
    ===================================================== */

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

        offline:
            "Offline",

        online:
            "Online",

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

        onion:
            "Onion",

        wheat:
            "Wheat",

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


    /* =====================================================
       HINDI
    ===================================================== */

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
            "आवाज सहायता",

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

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

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
            "आर्द्रता",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल कीमतें।",

        marketPriceTable:
            "बाजार भाव तालिका",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

        market:
            "बाजार",

        crop:
            "फसल",

        price:
            "कीमत",

        date:
            "तारीख",

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
            "AI सहायता से विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

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
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना जानकारी।",

        learnMore:
            "अधिक जानकारी",

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
            "स्मार्ट वॉयस सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन से बोलें।",

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
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    /* =====================================================
       MARATHI
    ===================================================== */

    mr: {

        appName: "स्मार्टअॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "तुमची भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",

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
            "मोबाईल क्रमांक",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्रफळ",

        preferredMarket:
            "पसंतीची बाजारपेठ",

        selectMarket:
            "बाजारपेठ निवडा",

        kopargaonMarket:
            "कोपरगाव APMC",

        yeolaMarket:
            "येवला बाजारपेठ",

        shirdiMarket:
            "शिर्डी बाजारपेठ",

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
            "पीक माहिती",

        cropHealth:
            "पीक आरोग्य",

        governmentSchemes:
            "शासकीय योजना",

        aiAssistant:
            "AI सहाय्यक",

        voiceAssistance:
            "आवाज सहाय्य",

        farmerProfile:
            "शेतकरी प्रोफाइल",

        settings:
            "सेटिंग्ज",

        about:
            "SmartAgri विषयी",

        logout:
            "लॉगआउट",

        myProfile:
            "माझे प्रोफाइल",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        welcome:
            "स्वागत",

        dashboardSubtitle:
            "तुमची शेतीची माहिती एकाच ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची शेती साधने त्वरीत वापरा.",

        liveDataTitle:
            "थेट डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामानाची माहिती.",

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
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक बाजारभाव.",

        marketPriceTable:
            "बाजारभाव तक्ता",

        onion:
            "कांदा",

        wheat:
            "गहू",

        market:
            "बाजारपेठ",

        crop:
            "पीक",

        price:
            "भाव",

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
            "AI सहाय्याने विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

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
            "शेतकऱ्यांसाठी शासकीय मदत आणि कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री फसल विमा योजना माहिती.",

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
            "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसच्या मायक्रोफोनचा वापर करून बोला.",

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
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "तुमच्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप्लिकेशन भाषा निवडा.",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे."

    }

};


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */


/*
    Main language-changing function.

    Example:
        changeLanguage("hi");
        changeLanguage("mr");
        changeLanguage("en");
*/

function changeLanguage(language) {

    if (!translations[language]) {

        console.error(
            "Language not found:",
            language
        );

        return;
    }


    selectedLanguage = language;


    /* Save language */

    localStorage.setItem(
        "smartAgriLanguage",
        language
    );


    /* Change HTML language */

    document.documentElement.lang = language;


    /* Get translations */

    const languageData =
        translations[language];


    /* ---------------------------------------------
       TEXT TRANSLATIONS
    --------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (
                languageData[key] !== undefined
            ) {

                element.textContent =
                    languageData[key];

            }

        });


    /* ---------------------------------------------
       PLACEHOLDER TRANSLATIONS
    --------------------------------------------- */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                languageData[key] !== undefined
            ) {

                element.placeholder =
                    languageData[key];

            }

        });


    /* ---------------------------------------------
       UPDATE LANGUAGE SELECTORS
    --------------------------------------------- */

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;

    }


    const settingsLanguage =
        document.getElementById(
            "settingsLanguage"
        );

    if (settingsLanguage) {

        settingsLanguage.value =
            language;

    }


    const registerLanguage =
        document.getElementById(
            "registerLanguage"
        );

    if (registerLanguage) {

        registerLanguage.value =
            language;

    }


    console.log(
        "SmartAgri language changed to:",
        language
    );
}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ---------------------------------------------
           LANGUAGE BUTTONS
        --------------------------------------------- */

        const languageButtons =
            document.querySelectorAll(
                ".language-option"
            );


        const continueLanguageBtn =
            document.getElementById(
                "continueLanguageBtn"
            );


        let selectedPageLanguage =
            selectedLanguage;


        languageButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    languageButtons.forEach(btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    });


                    this.classList.add(
                        "selected"
                    );


                    selectedPageLanguage =
                        this.dataset.language;


                    if (continueLanguageBtn) {

                        continueLanguageBtn.disabled =
                            false;

                    }

                }
            );

        });


        /* ---------------------------------------------
           CONTINUE
        --------------------------------------------- */

        if (continueLanguageBtn) {

            continueLanguageBtn.addEventListener(
                "click",
                function () {

                    changeLanguage(
                        selectedPageLanguage
                    );


                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* ---------------------------------------------
           INITIAL LANGUAGE
        --------------------------------------------- */

        changeLanguage(
            selectedLanguage
        );


        /* ---------------------------------------------
           MARK SELECTED LANGUAGE
        --------------------------------------------- */

        languageButtons.forEach(button => {

            if (
                button.dataset.language ===
                selectedLanguage
            ) {

                button.classList.add(
                    "selected"
                );

                selectedPageLanguage =
                    selectedLanguage;

                if (continueLanguageBtn) {

                    continueLanguageBtn.disabled =
                        false;

                }

            }

        });

    }
);


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


    const target =
        document.getElementById(screenId);


    if (target) {

        target.classList.add(
            "active-screen"
        );

    }

}


/* =========================================================
   LOGIN / REGISTER NAVIGATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const showRegisterBtn =
            document.getElementById(
                "showRegisterBtn"
            );


        const showLoginBtn =
            document.getElementById(
                "showLoginBtn"
            );


        const changeLanguageFromLogin =
            document.getElementById(
                "changeLanguageFromLogin"
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


        if (changeLanguageFromLogin) {

            changeLanguageFromLogin.addEventListener(
                "click",
                function () {

                    showScreen(
                        "languagePage"
                    );

                }
            );

        }

    }
);


/* =========================================================
   DASHBOARD LANGUAGE SELECTOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const dashboardLanguage =
            document.getElementById(
                "dashboardLanguage"
            );


        if (dashboardLanguage) {

            dashboardLanguage.addEventListener(
                "change",
                function () {

                    changeLanguage(
                        this.value
                    );

                }
            );

        }

    }
);


/* =========================================================
   SETTINGS LANGUAGE SELECTOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const settingsLanguage =
            document.getElementById(
                "settingsLanguage"
            );


        if (settingsLanguage) {

            settingsLanguage.addEventListener(
                "change",
                function () {

                    changeLanguage(
                        this.value
                    );

                }
            );

        }

    }
);


/* =========================================================
   REGISTRATION LANGUAGE SELECTOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const registerLanguage =
            document.getElementById(
                "registerLanguage"
            );


        if (registerLanguage) {

            registerLanguage.addEventListener(
                "change",
                function () {

                    changeLanguage(
                        this.value
                    );

                }
            );

        }

    }
);


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (auth) {

    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser = user;

                console.log(
                    "Logged in:",
                    user.email
                );


                await loadFarmerData(
                    user.uid
                );


                showDashboard();

            } else {

                currentUser = null;

                console.log(
                    "No Firebase user logged in."
                );

            }

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (!loginForm) return;


        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const email =
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
                        .value;


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                try {

                    if (!auth) {

                        throw new Error(
                            "Firebase is not initialized."
                        );

                    }


                    const result =
                        await auth.signInWithEmailAndPassword(
                            email,
                            password
                        );


                    currentUser =
                        result.user;


                    if (message) {

                        message.textContent =
                            "Login successful.";

                        message.className =
                            "message success";

                    }


                    await loadFarmerData(
                        currentUser.uid
                    );


                    showDashboard();

                } catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    if (message) {

                        message.textContent =
                            getFirebaseErrorMessage(
                                error
                            );

                        message.className =
                            "message error";

                    }

                }

            }
        );

    }
);


/* =========================================================
   REGISTRATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (!registrationForm) return;


        registrationForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "registerName"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "registerEmail"
                        )
                        .value
                        .trim();


                const mobile =
                    document
                        .getElementById(
                            "registerMobile"
                        )
                        .value
                        .trim();


                const village =
                    document
                        .getElementById(
                            "registerVillage"
                        )
                        .value
                        .trim();


                const state =
                    document
                        .getElementById(
                            "registerState"
                        )
                        .value
                        .trim();


                const landArea =
                    document
                        .getElementById(
                            "registerLandArea"
                        )
                        .value
                        .trim();


                const market =
                    document
                        .getElementById(
                            "registerMarket"
                        )
                        .value;


                const language =
                    document
                        .getElementById(
                            "registerLanguage"
                        )
                        .value;


                const password =
                    document
                        .getElementById(
                            "registerPassword"
                        )
                        .value;


                const message =
                    document.getElementById(
                        "registerMessage"
                    );


                try {

                    if (!auth || !db) {

                        throw new Error(
                            "Firebase is not initialized."
                        );

                    }


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


                    changeLanguage(
                        language
                    );


                    currentUser =
                        user;


                    currentFarmerData = {

                        name,
                        email,
                        mobile,
                        village,
                        state,
                        landArea,
                        preferredMarket: market,
                        preferredLanguage: language

                    };


                    if (message) {

                        message.textContent =
                            "Account created successfully.";

                        message.className =
                            "message success";

                    }


                    showDashboard();

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    if (message) {

                        message.textContent =
                            getFirebaseErrorMessage(
                                error
                            );

                        message.className =
                            "message error";

                    }

                }

            }
        );

    }
);


/* =========================================================
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData(uid) {

    if (!db) return;


    try {

        const documentSnapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (
            documentSnapshot.exists
        ) {

            currentFarmerData =
                documentSnapshot.data();


            if (
                currentFarmerData.preferredLanguage
            ) {

                changeLanguage(
                    currentFarmerData.preferredLanguage
                );

            }


            updateFarmerUI();

        }

    } catch (error) {

        console.error(
            "Could not load farmer data:",
            error
        );

    }

}


/* =========================================================
   UPDATE FARMER UI
========================================================= */

function updateFarmerUI() {

    if (!currentFarmerData) return;


    const data =
        currentFarmerData;


    setElementText(
        "headerFarmerName",
        data.name || "Farmer"
    );


    setElementText(
        "dashboardFarmerName",
        data.name || "Farmer"
    );


    setElementText(
        "summaryName",
        data.name || "—"
    );


    setElementText(
        "summaryVillage",
        data.village || "—"
    );


    setElementText(
        "summaryLand",
        data.landArea || "—"
    );


    setElementText(
        "summaryMarket",
        data.preferredMarket || "—"
    );


    setElementText(
        "profilePageName",
        data.name || "—"
    );


    setElementText(
        "profilePageEmail",
        data.email || "—"
    );


    setInputValue(
        "profileName",
        data.name || ""
    );


    setInputValue(
        "profileEmail",
        data.email || ""
    );


    setInputValue(
        "profileMobile",
        data.mobile || ""
    );


    setInputValue(
        "profileVillage",
        data.village || ""
    );


    setInputValue(
        "profileState",
        data.state || ""
    );


    setInputValue(
        "profileLandArea",
        data.landArea || ""
    );


    setInputValue(
        "profileMarket",
        data.preferredMarket || ""
    );


    setInputValue(
        "profileLanguage",
        data.preferredLanguage || selectedLanguage
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

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
            "active-dashboard"
        );

    }


    setConnectionStatus(
        true
    );


    showSection(
        "dashboardSection"
    );


    updateFarmerUI();

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (auth) {

            await auth.signOut();

        }

        currentUser = null;

        currentFarmerData = null;


        const dashboard =
            document.getElementById(
                "dashboardPage"
            );


        if (dashboard) {

            dashboard.classList.remove(
                "active-dashboard"
            );

        }


        showScreen(
            "loginPage"
        );

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const sideLogoutBtn =
            document.getElementById(
                "sideLogoutBtn"
            );


        const profileLogoutBtn =
            document.getElementById(
                "profileLogoutBtn"
            );


        if (sideLogoutBtn) {

            sideLogoutBtn.addEventListener(
                "click",
                logoutUser
            );

        }


        if (profileLogoutBtn) {

            profileLogoutBtn.addEventListener(
                "click",
                logoutUser
            );

        }

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

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


                        if (!section) return;


                        showSection(
                            section
                        );


                        closeSideMenu();

                    }
                );

            });

    }
);


/* =========================================================
   SHOW SECTION
========================================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SIDE MENU
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const hamburgerBtn =
            document.getElementById(
                "hamburgerBtn"
            );


        const closeMenuBtn =
            document.getElementById(
                "closeMenuBtn"
            );


        const menuOverlay =
            document.getElementById(
                "menuOverlay"
            );


        if (hamburgerBtn) {

            hamburgerBtn.addEventListener(
                "click",
                openSideMenu
            );

        }


        if (closeMenuBtn) {

            closeMenuBtn.addEventListener(
                "click",
                closeSideMenu
            );

        }


        if (menuOverlay) {

            menuOverlay.addEventListener(
                "click",
                closeSideMenu
            );

        }

    }
);


function openSideMenu() {

    const sideMenu =
        document.getElementById(
            "sideMenu"
        );


    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    if (sideMenu) {

        sideMenu.classList.add(
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

    const sideMenu =
        document.getElementById(
            "sideMenu"
        );


    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    if (sideMenu) {

        sideMenu.classList.remove(
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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const profileButton =
            document.getElementById(
                "profileButton"
            );


        const profileMenu =
            document.getElementById(
                "profileMenu"
            );


        if (profileButton) {

            profileButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (profileMenu) {

                        profileMenu.classList.toggle(
                            "open"
                        );

                    }

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
                    function () {

                        const section =
                            this.dataset.profileSection;


                        showSection(
                            section
                        );


                        if (profileMenu) {

                            profileMenu.classList.remove(
                                "open"
                            );

                        }

                    }
                );

            });


        document.addEventListener(
            "click",
            function () {

                if (profileMenu) {

                    profileMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   PROFILE EDITING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const editProfileBtn =
            document.getElementById(
                "editProfileBtn"
            );


        const cancelProfileEditBtn =
            document.getElementById(
                "cancelProfileEditBtn"
            );


        const profileEditActions =
            document.getElementById(
                "profileEditActions"
            );


        const profileForm =
            document.getElementById(
                "profileForm"
            );


        const editableFields = [

            "profileName",
            "profileMobile",
            "profileVillage",
            "profileState",
            "profileLandArea",
            "profileMarket",
            "profileLanguage"

        ];


        if (editProfileBtn) {

            editProfileBtn.addEventListener(
                "click",
                function () {

                    editableFields.forEach(
                        id => {

                            const field =
                                document.getElementById(
                                    id
                                );


                            if (field) {

                                field.disabled =
                                    false;

                            }

                        }
                    );


                    if (profileEditActions) {

                        profileEditActions.classList.remove(
                            "hidden"
                        );

                    }

                }
            );

        }


        if (cancelProfileEditBtn) {

            cancelProfileEditBtn.addEventListener(
                "click",
                function () {

                    updateFarmerUI();


                    editableFields.forEach(
                        id => {

                            const field =
                                document.getElementById(
                                    id
                                );


                            if (field) {

                                field.disabled =
                                    true;

                            }

                        }
                    );


                    if (profileEditActions) {

                        profileEditActions.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        }


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    if (
                        !currentUser ||
                        !db
                    ) {

                        return;

                    }


                    const updatedData = {

                        name:
                            document.getElementById(
                                "profileName"
                            ).value.trim(),

                        mobile:
                            document.getElementById(
                                "profileMobile"
                            ).value.trim(),

                        village:
                            document.getElementById(
                                "profileVillage"
                            ).value.trim(),

                        state:
                            document.getElementById(
                                "profileState"
                            ).value.trim(),

                        landArea:
                            document.getElementById(
                                "profileLandArea"
                            ).value.trim(),

                        preferredMarket:
                            document.getElementById(
                                "profileMarket"
                            ).value,

                        preferredLanguage:
                            document.getElementById(
                                "profileLanguage"
                            ).value

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


                        changeLanguage(
                            updatedData.preferredLanguage
                        );


                        updateFarmerUI();


                        editableFields.forEach(
                            id => {

                                const field =
                                    document.getElementById(
                                        id
                                    );


                                if (field) {

                                    field.disabled =
                                        true;

                                }

                            }
                        );


                        if (profileEditActions) {

                            profileEditActions.classList.add(
                                "hidden"
                            );

                        }


                        const message =
                            document.getElementById(
                                "profileMessage"
                            );


                        if (message) {

                            message.textContent =
                                "Profile updated successfully.";

                            message.className =
                                "message success";

                        }

                    } catch (error) {

                        console.error(
                            "Profile update error:",
                            error
                        );

                    }

                }
            );

        }

    }
);


/* =========================================================
   ONLINE / OFFLINE STATUS
========================================================= */

function setConnectionStatus(isOnline) {

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
            "offline",
            !isOnline
        );

        connectionStatus.classList.toggle(
            "online",
            isOnline
        );

    }


    if (connectionText) {

        connectionText.textContent =
            translations[selectedLanguage][
                isOnline
                    ? "online"
                    : "offline"
            ];

    }


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            translations[selectedLanguage][
                isOnline
                    ? "online"
                    : "offline"
            ];

    }

}


window.addEventListener(
    "online",
    function () {

        setConnectionStatus(
            true
        );

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


/* =========================================================
   DEMO DASHBOARD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const demoBtn =
            document.getElementById(
                "demoBtn"
            );


        if (demoBtn) {

            demoBtn.addEventListener(
                "click",
                function () {

                    currentFarmerData = {

                        name: "Demo Farmer",

                        email: "demo@smartagri.com",

                        mobile: "9876543210",

                        village: "Kopargaon",

                        state: "Maharashtra",

                        landArea: "5 Acres",

                        preferredMarket:
                            "Kopargaon APMC",

                        preferredLanguage:
                            selectedLanguage

                    };


                    updateFarmerUI();


                    showDashboard();

                }
            );

        }

    }
);


/* =========================================================
   FORGOT PASSWORD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const forgotPasswordBtn =
            document.getElementById(
                "forgotPasswordBtn"
            );


        if (!forgotPasswordBtn) return;


        forgotPasswordBtn.addEventListener(
            "click",
            async function () {

                const email =
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value
                        .trim();


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                if (!email) {

                    if (message) {

                        message.textContent =
                            "Enter your email address first.";

                        message.className =
                            "message error";

                    }

                    return;

                }


                try {

                    await auth.sendPasswordResetEmail(
                        email
                    );


                    if (message) {

                        message.textContent =
                            "Password reset email sent.";

                        message.className =
                            "message success";

                    }

                } catch (error) {

                    if (message) {

                        message.textContent =
                            getFirebaseErrorMessage(
                                error
                            );

                        message.className =
                            "message error";

                    }

                }

            }
        );

    }
);


/* =========================================================
   MARKET CROP SELECTOR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const cropSelector =
            document.getElementById(
                "cropPriceSelector"
            );


        if (cropSelector) {

            cropSelector.addEventListener(
                "change",
                function () {

                    console.log(
                        "Selected crop:",
                        this.value
                    );

                }
            );

        }

    }
);


/* =========================================================
   WEATHER REFRESH
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const refreshWeatherBtn =
            document.getElementById(
                "refreshWeatherBtn"
            );


        if (refreshWeatherBtn) {

            refreshWeatherBtn.addEventListener(
                "click",
                function () {

                    console.log(
                        "Weather refresh requested."
                    );

                }
            );

        }

    }
);


/* =========================================================
   CROP IMAGE PREVIEW
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const cropImageInput =
            document.getElementById(
                "cropImageInput"
            );


        const cropImagePreview =
            document.getElementById(
                "cropImagePreview"
            );


        const imagePreviewContainer =
            document.getElementById(
                "imagePreviewContainer"
            );


        const analyzeCropBtn =
            document.getElementById(
                "analyzeCropBtn"
            );


        if (!cropImageInput) return;


        cropImageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) return;


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        if (cropImagePreview) {

                            cropImagePreview.src =
                                event.target.result;

                        }


                        if (
                            imagePreviewContainer
                        ) {

                            imagePreviewContainer.classList.remove(
                                "hidden"
                            );

                        }


                        if (analyzeCropBtn) {

                            analyzeCropBtn.disabled =
                                false;

                        }

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }
);


/* =========================================================
   CROP ANALYSIS BUTTON
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const analyzeCropBtn =
            document.getElementById(
                "analyzeCropBtn"
            );


        if (analyzeCropBtn) {

            analyzeCropBtn.addEventListener(
                "click",
                function () {

                    const result =
                        document.getElementById(
                            "cropAnalysisResult"
                        );


                    if (result) {

                        result.innerHTML = `

                            <strong>
                                ${
                                    translations[
                                        selectedLanguage
                                    ].analysisNotConnected
                                }
                            </strong>

                            <p>
                                ${
                                    translations[
                                        selectedLanguage
                                    ].analysisNotConnectedDescription
                                }
                            </p>

                        `;

                    }

                }
            );

        }

    }
);


/* =========================================================
   AI FORM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const aiForm =
            document.getElementById(
                "aiForm"
            );


        const aiInput =
            document.getElementById(
                "aiInput"
            );


        const chatMessages =
            document.getElementById(
                "chatMessages"
            );


        if (!aiForm) return;


        aiForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!aiInput) return;


                const question =
                    aiInput.value.trim();


                if (!question) return;


                if (chatMessages) {

                    const message =
                        document.createElement(
                            "div"
                        );


                    message.className =
                        "chat-message user-message";


                    message.innerHTML = `

                        <div class="chat-avatar">
                            👨‍🌾
                        </div>

                        <div>

                            <strong>
                                Farmer
                            </strong>

                            <p>
                                ${escapeHTML(question)}
                            </p>

                        </div>

                    `;


                    chatMessages.appendChild(
                        message
                    );


                    const response =
                        document.createElement(
                            "div"
                        );


                    response.className =
                        "chat-message assistant-message";


                    response.innerHTML = `

                        <div class="chat-avatar">
                            🤖
                        </div>

                        <div>

                            <strong>
                                ${
                                    translations[
                                        selectedLanguage
                                    ].assistant
                                }
                            </strong>

                            <p>
                                ${
                                    translations[
                                        selectedLanguage
                                    ].aiUnavailable
                                }
                            </p>

                        </div>

                    `;


                    chatMessages.appendChild(
                        response
                    );


                    chatMessages.scrollTop =
                        chatMessages.scrollHeight;

                }


                aiInput.value = "";

            }
        );

    }
);


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let speechRecognition = null;


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const startVoiceBtn =
            document.getElementById(
                "startVoiceBtn"
            );


        const stopVoiceBtn =
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


        if (
            SpeechRecognition
        ) {

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

                    if (startVoiceBtn) {

                        startVoiceBtn.classList.add(
                            "hidden"
                        );

                    }


                    if (stopVoiceBtn) {

                        stopVoiceBtn.classList.remove(
                            "hidden"
                        );

                    }

                };


            speechRecognition.onresult =
                function (event) {

                    const transcript =
                        event.results[0][0]
                            .transcript;


                    if (voiceInput) {

                        voiceInput.value =
                            transcript;

                    }


                    if (voiceResponse) {

                        voiceResponse.textContent =
                            transcript;

                    }

                };


            speechRecognition.onend =
                function () {

                    if (startVoiceBtn) {

                        startVoiceBtn.classList.remove(
                            "hidden"
                        );

                    }


                    if (stopVoiceBtn) {

                        stopVoiceBtn.classList.add(
                            "hidden"
                        );

                    }

                };


            speechRecognition.onerror =
                function (error) {

                    console.error(
                        "Voice recognition error:",
                        error
                    );


                    if (startVoiceBtn) {

                        startVoiceBtn.classList.remove(
                            "hidden"
                        );

                    }


                    if (stopVoiceBtn) {

                        stopVoiceBtn.classList.add(
                            "hidden"
                        );

                    }

                };

        }


        if (startVoiceBtn) {

            startVoiceBtn.addEventListener(
                "click",
                function () {

                    if (!speechRecognition) {

                        alert(
                            "Voice recognition is not supported in this browser."
                        );

                        return;

                    }


                    speechRecognition.lang =
                        getSpeechLanguage(
                            selectedLanguage
                        );


                    speechRecognition.start();

                }
            );

        }


        if (stopVoiceBtn) {

            stopVoiceBtn.addEventListener(
                "click",
                function () {

                    if (speechRecognition) {

                        speechRecognition.stop();

                    }

                }
            );

        }

    }
);


/* =========================================================
   SPEECH LANGUAGE
========================================================= */

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
   GOVERNMENT SCHEME BUTTONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .querySelectorAll(
                ".scheme-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const url =
                            this.dataset.schemeUrl;


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
);


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function setElementText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


function setInputValue(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.value =
            value;

    }

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {

        return "An unknown error occurred.";

    }


    switch (error.code) {

        case "auth/invalid-email":

            return "Invalid email address.";

        case "auth/user-not-found":

            return "No account found with this email.";

        case "auth/wrong-password":

            return "Incorrect password.";

        case "auth/email-already-in-use":

            return "This email is already registered.";

        case "auth/weak-password":

            return "Password must contain at least 6 characters.";

        case "auth/too-many-requests":

            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":

            return "Network error. Check your internet connection.";

        default:

            return (
                error.message ||
                "Something went wrong."
            );

    }

}


/* =========================================================
   INITIAL CONNECTION STATUS
========================================================= */

setConnectionStatus(
    navigator.onLine
);


/* =========================================================
   DEBUG / TEST FUNCTION
========================================================= */

/*
   You can test the language from browser console:

       changeLanguage("en")

       changeLanguage("hi")

       changeLanguage("mr")
*/

window.changeLanguage =
    changeLanguage;


/* =========================================================
   END
========================================================= */

console.log(
    "SmartAgri JavaScript loaded successfully."
);


console.log(
    "SmartAgri JavaScript loaded."
);
