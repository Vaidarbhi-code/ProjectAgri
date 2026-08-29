/* ============================================================
   SMARTAGRI - COMPLETE SCRIPT.JS
   Works with the exact HTML provided
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
   INITIALIZE FIREBASE
============================================================ */

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


/* ============================================================
   GLOBAL STATE
============================================================ */

let currentLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;

let demoMode = false;

let farmerData = {
    name: "Demo Farmer",
    email: "demo@smartagri.com",
    mobile: "9876543210",
    village: "Kopargaon",
    state: "Maharashtra",
    landArea: "5 Acres",
    preferredMarket: "Kopargaon APMC",
    language: "en"
};


/* ============================================================
   TRANSLATIONS
============================================================ */

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
            "Crop Health AI",

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

        offline:
            "Offline",

        online:
            "Online",

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

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support"
    },


    hi: {

        appName: "स्मार्टएग्री",

        appTagline:
            "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage:
            "अपनी भाषा चुनें",

        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle:
            "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri में प्रवेश करें",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe:
            "मुझे याद रखें",

        forgotPassword:
            "पासवर्ड भूल गए?",

        login: "लॉगिन",

        or: "या",

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
            "फसल स्वास्थ्य AI",

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

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी एक्सेस करें।",

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
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",

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

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "परिवर्तन सेव करें",

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

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता"
    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",

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
            "SmartAgri मध्ये प्रवेश करा",

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
            "पीक आरोग्य AI",

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
            "तुमची शेतीची माहिती एकाच ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची शेतीची साधने पटकन वापरा.",

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
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक भाव.",

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
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री फसल बीमा योजनेची माहिती.",

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
            "स्मार्ट आवाज सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

        startVoice:
            "आवाज सहाय्य सुरू करा",

        stopVoice:
            "ऐकणे थांबवा",

        voiceInput:
            "आवाज इनपुट",

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
            "तुमच्या SmartAgri पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य"
    }

};


/* ============================================================
   HELPER: TRANSLATE
============================================================ */

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


/* ============================================================
   APPLY TRANSLATIONS
============================================================ */

function applyTranslations() {

    document.querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (!key) return;

            const translated =
                t(key);

            if (translated) {
                element.textContent =
                    translated;
            }

        });


    document.querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (!key) return;

            element.placeholder =
                t(key);

        });


    document.querySelectorAll("[data-i18n-title]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-title"
                );

            element.title =
                t(key);

        });


    document.documentElement.lang =
        currentLanguage;


    /* ---------------------------------------------------------
       Keep language selectors synchronized
    --------------------------------------------------------- */

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
            element.value =
                currentLanguage;
        }

    });


    /* ---------------------------------------------------------
       Update static loading text
    --------------------------------------------------------- */

    const weatherLoading =
        document.getElementById("weatherLoading");

    if (weatherLoading) {

        const p =
            weatherLoading.querySelector("p");

        if (p) {

            p.textContent =
                currentLanguage === "hi"
                    ? "मौसम लोड हो रहा है..."
                    : currentLanguage === "mr"
                        ? "हवामान लोड होत आहे..."
                        : "Loading weather...";

        }

    }


    const marketLoading =
        document.getElementById("marketLoading");

    if (marketLoading) {

        const p =
            marketLoading.querySelector("p");

        if (p) {

            p.textContent =
                currentLanguage === "hi"
                    ? "बाजार भाव लोड हो रहे हैं..."
                    : currentLanguage === "mr"
                        ? "बाजार भाव लोड होत आहेत..."
                        : "Loading market prices...";

        }

    }


    updateConnectionUI();

}


/* ============================================================
   CHANGE LANGUAGE
============================================================ */

function setupLanguagePage() {
    const languageOptions =
        document.querySelectorAll(".language-option");

    const continueButton =
        document.getElementById("continueLanguageBtn");

    if (!continueButton) {
        console.error(
            "Continue language button not found."
        );
        return;
    }

    // Continue is disabled until a language is selected
    continueButton.disabled = true;

    languageOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            // Remove selection from all languages
            languageOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            // Select clicked language
            option.classList.add("selected");

            // Get selected language
            const language =
                option.getAttribute("data-lang");

            if (!language) {
                console.error(
                    "Language option has no data-lang."
                );
                return;
            }

            // Save language
            setLanguage(language);

            // Enable Continue
            continueButton.disabled = false;

            console.log(
                "Selected language:",
                language
            );
        });
    });

    continueButton.addEventListener(
        "click",
        function () {

            if (continueButton.disabled) {
                return;
            }

            const languagePage =
                document.getElementById("languagePage");

            const loginPage =
                document.getElementById("loginPage");

            if (languagePage) {
                languagePage.classList.remove("active");
            }

            if (loginPage) {
                loginPage.classList.add("active");
            }

            console.log(
                "Language page → Login page"
            );
        }
    );
}


    /* Refresh weather text/data */

    if (
        document
            .getElementById("weatherSection")
            ?.classList
            .contains("active-section")
    ) {

        loadWeather();

    }

}


/* ============================================================
   LANGUAGE PAGE
============================================================ */

function setupLanguagePage() {

    const buttons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );

    let selectedLanguage =
        null;


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

                if (!selectedLanguage) {
                    return;
                }


                setLanguage(
                    selectedLanguage
                );


                showScreen(
                    "loginPage"
                );

            }
        );

    }

}


/* ============================================================
   SCREEN NAVIGATION
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
        document.getElementById(screenId);

    if (target) {

        target.classList.add(
            "active-screen"
        );

    }

}


/* ============================================================
   DASHBOARD NAVIGATION
============================================================ */

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

    if (!target) return;


    target.classList.add(
        "active-section"
    );


    closeSideMenu();
    closeProfileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* ---------------------------------------------------------
       Load weather whenever weather section opens
    --------------------------------------------------------- */

    if (sectionId === "weatherSection") {
        loadWeather();
    }


    /* ---------------------------------------------------------
       Refresh profile
    --------------------------------------------------------- */

    if (sectionId === "profileSection") {
        populateProfile();
    }

}


/* ============================================================
   SETUP SECTION NAVIGATION
============================================================ */

function setupSectionNavigation() {

    document
        .querySelectorAll("[data-section]")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

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


/* ============================================================
   SIDE MENU
============================================================ */

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


function setupMenu() {

    const hamburger =
        document.getElementById(
            "hamburgerBtn"
        );

    const closeButton =
        document.getElementById(
            "closeMenuBtn"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );


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


/* ============================================================
   PROFILE MENU
============================================================ */

function openProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (menu) {
        menu.classList.toggle("open");
    }

}


function closeProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (menu) {
        menu.classList.remove("open");
    }

}


function setupProfileMenu() {

    const button =
        document.getElementById(
            "profileButton"
        );

    if (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openProfileMenu();

            }
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
        function (event) {

            const menu =
                document.getElementById(
                    "profileMenu"
                );

            const profileButton =
                document.getElementById(
                    "profileButton"
                );

            if (
                menu &&
                !menu.contains(event.target) &&
                profileButton &&
                !profileButton.contains(event.target)
            ) {

                closeProfileMenu();

            }

        }
    );

}


/* ============================================================
   CONNECTION STATUS
   THIS IS THE IMPORTANT FIX
============================================================ */

function updateConnectionUI() {

    /*
       navigator.onLine tells us whether the browser
       currently has a network connection.

       It should NOT depend on Firebase authentication.
    */

    const online =
        navigator.onLine;


    /* ---------------------------------------------------------
       HEADER CONNECTION
    --------------------------------------------------------- */

    const status =
        document.getElementById(
            "connectionStatus"
        );

    const connectionText =
        document.getElementById(
            "connectionText"
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


    if (connectionText) {

        connectionText.textContent =
            online
                ? t("online")
                : t("offline");

    }


    /* ---------------------------------------------------------
       DASHBOARD CONNECTION CARD
    --------------------------------------------------------- */

    const dashboardConnectionText =
        document.getElementById(
            "dashboardConnectionText"
        );


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            online
                ? t("online")
                : t("offline");

    }


    /* ---------------------------------------------------------
       DASHBOARD STATUS DOT
    --------------------------------------------------------- */

    const dashboardStatusCard =
        document.querySelector(
            ".dashboard-status-card"
        );


    if (dashboardStatusCard) {

        dashboardStatusCard.classList.toggle(
            "online",
            online
        );

        dashboardStatusCard.classList.toggle(
            "offline",
            !online
        );

    }


    console.log(
        "Network status:",
        online ? "ONLINE" : "OFFLINE"
    );

}


/* ============================================================
   REAL NETWORK EVENT LISTENERS
============================================================ */

window.addEventListener(
    "online",
    function () {

        console.log(
            "Internet connection restored."
        );

        updateConnectionUI();

        /*
           If weather section is open,
           refresh it automatically.
        */

        const weatherSection =
            document.getElementById(
                "weatherSection"
            );

        if (
            weatherSection &&
            weatherSection.classList.contains(
                "active-section"
            )
        ) {

            loadWeather();

        }

    }
);


window.addEventListener(
    "offline",
    function () {

        console.log(
            "Internet connection lost."
        );

        updateConnectionUI();

    }
);


/* ============================================================
   LOGIN
============================================================ */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!form) return;


    form.addEventListener(
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


            if (!email || !password) {
                return;
            }


            if (!auth) {

                showMessage(
                    message,
                    "Firebase is not available. You can use Demo Dashboard.",
                    "error"
                );

                return;

            }


            try {

                showMessage(
                    message,
                    currentLanguage === "hi"
                        ? "लॉगिन हो रहा है..."
                        : currentLanguage === "mr"
                            ? "लॉगिन होत आहे..."
                            : "Logging in...",
                    "info"
                );


                const result =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    result.user;

                demoMode =
                    false;


                await loadFarmerData(
                    currentUser
                );


                showDashboard();


                showMessage(
                    message,
                    "",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    message,
                    getFirebaseErrorMessage(
                        error
                    ),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   DEMO DASHBOARD
============================================================ */

function setupDemoButton() {

    const button =
        document.getElementById(
            "demoBtn"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            console.log(
                "Demo Dashboard clicked"
            );


            demoMode =
                true;

            currentUser =
                null;


            farmerData = {

                name: "Demo Farmer",

                email: "demo@smartagri.com",

                mobile: "9876543210",

                village: "Kopargaon",

                state: "Maharashtra",

                landArea: "5 Acres",

                preferredMarket:
                    "Kopargaon APMC",

                language:
                    currentLanguage

            };


            showDashboard();

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
        document.getElementById(
            "dashboardPage"
        );


    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }


    populateFarmerUI();

    applyTranslations();

    updateConnectionUI();


    /*
       Weather loads only when user opens
       the weather page, preventing unnecessary
       API calls.
    */


    showSection(
        "dashboardSection"
    );

}


/* ============================================================
   FIREBASE REGISTRATION
============================================================ */

function setupRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    const message =
        document.getElementById(
            "registerMessage"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!auth) {

                showMessage(
                    message,
                    "Firebase is not available.",
                    "error"
                );

                return;

            }


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

            const preferredMarket =
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


            try {

                showMessage(
                    message,
                    currentLanguage === "hi"
                        ? "खाता बनाया जा रहा है..."
                        : currentLanguage === "mr"
                            ? "खाते तयार केले जात आहे..."
                            : "Creating account...",
                    "info"
                );


                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    result.user;


                farmerData = {

                    name,

                    email,

                    mobile,

                    village,

                    state,

                    landArea,

                    preferredMarket,

                    language

                };


                if (db) {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .set({

                            ...farmerData,

                            createdAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        });

                }


                setLanguage(language);


                showMessage(
                    message,
                    currentLanguage === "hi"
                        ? "खाता सफलतापूर्वक बनाया गया।"
                        : currentLanguage === "mr"
                            ? "खाते यशस्वीरित्या तयार झाले."
                            : "Account created successfully.",
                    "success"
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
                    message,
                    getFirebaseErrorMessage(
                        error
                    ),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   LOAD FARMER DATA
============================================================ */

async function loadFarmerData(user) {

    if (!user) return;


    farmerData.email =
        user.email || "";


    if (!db) {

        farmerData.name =
            user.displayName ||
            "Farmer";

        return;

    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            farmerData = {
                ...farmerData,
                ...snapshot.data()
            };


            if (
                farmerData.language &&
                translations[
                    farmerData.language
                ]
            ) {

                currentLanguage =
                    farmerData.language;

                localStorage.setItem(
                    "smartAgriLanguage",
                    currentLanguage
                );

            }

        } else {

            farmerData.name =
                user.displayName ||
                "Farmer";

        }

    } catch (error) {

        console.warn(
            "Could not load farmer profile:",
            error
        );

    }

}


/* ============================================================
   POPULATE FARMER UI
============================================================ */

function populateFarmerUI() {

    setText(
        "headerFarmerName",
        farmerData.name || "—"
    );

    setText(
        "dashboardFarmerName",
        farmerData.name || "—"
    );

    setText(
        "summaryName",
        farmerData.name || "—"
    );

    setText(
        "summaryVillage",
        farmerData.village || "—"
    );

    setText(
        "summaryLand",
        farmerData.landArea || "—"
    );

    setText(
        "summaryMarket",
        farmerData.preferredMarket || "—"
    );


    setText(
        "profilePageName",
        farmerData.name || "—"
    );

    setText(
        "profilePageEmail",
        farmerData.email || "—"
    );


    setValue(
        "profileName",
        farmerData.name || ""
    );

    setValue(
        "profileEmail",
        farmerData.email || ""
    );

    setValue(
        "profileMobile",
        farmerData.mobile || ""
    );

    setValue(
        "profileVillage",
        farmerData.village || ""
    );

    setValue(
        "profileState",
        farmerData.state || ""
    );

    setValue(
        "profileLandArea",
        farmerData.landArea || ""
    );

    setValue(
        "profileMarket",
        farmerData.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        farmerData.language ||
        currentLanguage
    );

}


/* ============================================================
   PROFILE
============================================================ */

function setupProfile() {

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


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                setProfileInputsDisabled(
                    false
                );


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
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                populateProfile();

                setProfileInputsDisabled(
                    true
                );


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
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            saveProfile
        );

    }

}


function populateProfile() {

    populateFarmerUI();

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
            document.getElementById(id);

        if (element) {
            element.disabled =
                disabled;
        }

    });


    const email =
        document.getElementById(
            "profileEmail"
        );

    if (email) {
        email.disabled =
            true;
    }

}


async function saveProfile(event) {

    event.preventDefault();


    const message =
        document.getElementById(
            "profileMessage"
        );


    const updated = {

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


    farmerData = {
        ...farmerData,
        ...updated
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
                    farmerData,
                    {
                        merge: true
                    }
                );

        }


        setLanguage(
            updated.language
        );


        populateFarmerUI();

        setProfileInputsDisabled(
            true
        );


        const actions =
            document.getElementById(
                "profileEditActions"
            );

        if (actions) {
            actions.classList.add(
                "hidden"
            );
        }


        showMessage(
            message,
            currentLanguage === "hi"
                ? "प्रोफाइल सफलतापूर्वक अपडेट की गई।"
                : currentLanguage === "mr"
                    ? "प्रोफाइल यशस्वीरित्या अपडेट झाली."
                    : "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            message,
            "Could not save profile.",
            "error"
        );

    }

}


/* ============================================================
   FORGOT PASSWORD
============================================================ */

function setupForgotPassword() {

    const button =
        document.getElementById(
            "forgotPasswordBtn"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        async function () {

            const email =
                getValue("loginEmail");


            if (!email) {

                showMessage(
                    document.getElementById(
                        "loginMessage"
                    ),
                    currentLanguage === "hi"
                        ? "पहले अपना ईमेल दर्ज करें।"
                        : currentLanguage === "mr"
                            ? "प्रथम तुमचा ईमेल टाका."
                            : "Enter your email first.",
                    "error"
                );

                return;

            }


            if (!auth) return;


            try {

                await auth.sendPasswordResetEmail(
                    email
                );


                showMessage(
                    document.getElementById(
                        "loginMessage"
                    ),
                    currentLanguage === "hi"
                        ? "पासवर्ड रीसेट ईमेल भेजा गया।"
                        : currentLanguage === "mr"
                            ? "पासवर्ड रीसेट ईमेल पाठवला आहे."
                            : "Password reset email sent.",
                    "success"
                );


            } catch (error) {

                showMessage(
                    document.getElementById(
                        "loginMessage"
                    ),
                    getFirebaseErrorMessage(
                        error
                    ),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   LOGOUT
============================================================ */

function logout() {

    demoMode =
        false;

    currentUser =
        null;


    if (auth) {

        auth.signOut()
            .catch(function (error) {

                console.warn(
                    "Logout error:",
                    error
                );

            });

    }


    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboard) {

        dashboard.classList.remove(
            "active-screen"
        );

    }


    showScreen(
        "loginPage"
    );


    closeSideMenu();
    closeProfileMenu();

}


function setupLogout() {

    const buttons = [

        "sideLogoutBtn",
        "profileLogoutBtn"

    ];


    buttons.forEach(function (id) {

        const button =
            document.getElementById(id);

        if (button) {

            button.addEventListener(
                "click",
                logout
            );

        }

    });

}


/* ============================================================
   LOGIN / REGISTER NAVIGATION
============================================================ */

function setupAuthNavigation() {

    const register =
        document.getElementById(
            "showRegisterBtn"
        );

    const login =
        document.getElementById(
            "showLoginBtn"
        );

    const changeLanguage =
        document.getElementById(
            "changeLanguageFromLogin"
        );


    if (register) {

        register.addEventListener(
            "click",
            function () {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    if (login) {

        login.addEventListener(
            "click",
            function () {

                showScreen(
                    "loginPage"
                );

            }
        );

    }


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
   WEATHER
   Uses Open-Meteo - no API key required
============================================================ */

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

    const weatherDataBox =
        document.getElementById(
            "weatherData"
        );


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }


    if (errorBox) {

        errorBox.classList.add(
            "hidden"
        );

        errorBox.textContent =
            "";

    }


    if (weatherDataBox) {

        weatherDataBox.classList.add(
            "hidden"
        );

    }


    if (emptyState) {

        emptyState.classList.add(
            "hidden"
        );

    }


    try {

        /*
           Kopargaon coordinates.

           Latitude:
           19.8826

           Longitude:
           74.4762
        */

        const latitude =
            19.8826;

        const longitude =
            74.4762;


        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,rain" +
            "&hourly=precipitation_probability" +
            "&timezone=Asia%2FKolkata";


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Weather API returned " +
                response.status
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !data.current
        ) {

            throw new Error(
                "Invalid weather data"
            );

        }


        const current =
            data.current;


        const temperature =
            current.temperature_2m;


        const humidity =
            current.relative_humidity_2m;


        const wind =
            current.wind_speed_10m;


        const rain =
            current.rain;


        /*
           Find current-hour rain probability.
        */

        let rainProbability =
            null;


        if (
            data.hourly &&
            Array.isArray(
                data.hourly
                    .precipitation_probability
            ) &&
            data.hourly
                .precipitation_probability
                .length > 0
        ) {

            const currentTime =
                current.time;


            const index =
                data.hourly.time.indexOf(
                    currentTime
                );


            if (index >= 0) {

                rainProbability =
                    data.hourly
                        .precipitation_probability[
                            index
                        ];

            }

        }


        /*
           If probability is unavailable,
           use rain amount as fallback.
        */

        if (
            rainProbability === null ||
            rainProbability === undefined
        ) {

            rainProbability =
                Number(rain) > 0
                    ? 100
                    : 0;

        }


        setText(
            "weatherTemperature",
            Math.round(
                Number(temperature)
            ) + " °C"
        );


        setText(
            "weatherHumidity",
            Math.round(
                Number(humidity)
            ) + " %"
        );


        setText(
            "weatherWind",
            Math.round(
                Number(wind)
            ) + " km/h"
        );


        setText(
            "weatherRain",
            Math.round(
                Number(rainProbability)
            ) + " %"
        );


        if (weatherDataBox) {

            weatherDataBox.classList.remove(
                "hidden"
            );

        }


        if (emptyState) {

            emptyState.classList.add(
                "hidden"
            );

        }


        console.log(
            "Weather loaded:",
            data
        );


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        if (errorBox) {

            errorBox.textContent =
                currentLanguage === "hi"
                    ? "मौसम डेटा लोड नहीं किया जा सका। इंटरनेट कनेक्शन जांचें।"
                    : currentLanguage === "mr"
                        ? "हवामान डेटा लोड करता आला नाही. इंटरनेट कनेक्शन तपासा."
                        : "Weather data could not be loaded. Please check your internet connection.";

            errorBox.classList.remove(
                "hidden"
            );

        }


        if (emptyState) {

            emptyState.classList.remove(
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


/* ============================================================
   WEATHER REFRESH BUTTON
============================================================ */

function setupWeather() {

    const button =
        document.getElementById(
            "refreshWeatherBtn"
        );


    if (button) {

        button.addEventListener(
            "click",
            loadWeather
        );

    }

}


/* ============================================================
   MARKET SECTION
============================================================ */

function setupMarketSelector() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (!selector) return;


    selector.addEventListener(
        "change",
        function () {

            /*
               The HTML currently does not provide
               a verified market API.

               Therefore we keep the safe empty state
               instead of displaying fake prices.
            */

            showMarketUnavailable();

        }
    );


    showMarketUnavailable();

}


function showMarketUnavailable() {

    const body =
        document.getElementById(
            "marketTableBody"
        );


    if (!body) return;


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


/* ============================================================
   MARKET COMPARISON
============================================================ */

function setupMarketComparison() {

    document
        .querySelectorAll(
            ".market-card"
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
                price.textContent =
                    "—";
            }


            if (status) {
                status.textContent =
                    t(
                        "dataUnavailable"
                    );
            }

        });

}


/* ============================================================
   CROP HEALTH IMAGE
============================================================ */

function setupCropHealth() {

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

    const analyzeButton =
        document.getElementById(
            "analyzeCropBtn"
        );


    if (!input) return;


    input.addEventListener(
        "change",
        function () {

            const file =
                input.files &&
                input.files[0];


            if (!file) {

                if (container) {
                    container.classList.add(
                        "hidden"
                    );
                }

                if (analyzeButton) {
                    analyzeButton.disabled =
                        true;
                }

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
                input.files &&
                input.files[0];

            const result =
                document.getElementById(
                    "cropAnalysisResult"
                );

            if (!file) {
                return;
            }

            if (!result) {
                return;
            }

            // Show loading state
            result.innerHTML = `
                <strong>🌱 Analyzing Crop...</strong>
                <p>
                    SmartAgri AI is examining your crop image.
                    Please wait.
                </p>
            `;

            analyzeButton.disabled = true;
            analyzeButton.textContent = "Analyzing...";

            try {

                // Convert image to Base64
                const imageData =
                    await new Promise(
                        function (resolve, reject) {

                            const reader =
                                new FileReader();

                            reader.onload =
                                function () {
                                    resolve(
                                        reader.result
                                    );
                                };

                            reader.onerror =
                                reject;

                            reader.readAsDataURL(
                                file
                            );
                        }
                    );

                // Send image to YOUR backend
                const response =
                    await fetch(
                        "/api/crop-health",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                image: imageData
                            })
                        }
                    );

                const response = await fetch("/api/crop-health", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        image: imageData
    })
});

const responseText = await response.text();

console.log("HTTP Status:", response.status);
console.log("Raw Server Response:", responseText);

let resultData;

try {
    resultData = JSON.parse(responseText);
} catch (parseError) {
    throw new Error(
        `Server returned invalid response (${response.status}): ${responseText || "EMPTY RESPONSE"}`
    );
}

                console.log(
                    "Crop Health Response:",
                    resultData
                );

                if (!response.ok ||
                    !resultData.success) {

                    throw new Error(
                        resultData.error ||
                        "Crop analysis failed"
                    );
                }

                // Display the result
                displayCropHealthResult(
                    resultData.data
                );

            } catch (error) {

                console.error(
                    "Crop Health Error:",
                    error
                );

                result.innerHTML = `
                    <strong>⚠️ Analysis Failed</strong>
                    <p>
                        ${escapeHTML(
                            error.message ||
                            "Unable to analyze crop."
                        )}
                    </p>
                `;

            } finally {

                analyzeButton.disabled = false;
                analyzeButton.textContent =
                    t("analyzeCrop");

            }
        }
    );
}
function displayCropHealthResult(data) {

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );

    if (!result) return;

    /*
     * Plant.id returns the detailed
     * identification and health data.
     */

    const suggestions =
        data?.result?.classification?.suggestions ||
        [];

    const healthAssessment =
        data?.result?.disease?.suggestions ||
        [];

    let html = `
        <div class="crop-result-card">

            <h3>🌱 Crop Health Analysis</h3>
    `;

    if (suggestions.length > 0) {

        const topCrop =
            suggestions[0];

        html += `
            <div class="analysis-item">
                <strong>Crop Identified</strong>
                <span>
                    ${escapeHTML(
                        topCrop.name || "Unknown"
                    )}
                </span>
            </div>

            <div class="analysis-item">
                <strong>Confidence</strong>
                <span>
                    ${Math.round(
                        (topCrop.probability || 0) * 100
                    )}%
                </span>
            </div>
        `;
    }

    if (healthAssessment.length > 0) {

        html += `
            <h4>🦠 Possible Health Issues</h4>
        `;

        healthAssessment
            .slice(0, 5)
            .forEach(function (item) {

                html += `
                    <div class="analysis-item">
                        <strong>
                            ${escapeHTML(
                                item.name ||
                                "Unknown condition"
                            )}
                        </strong>

                        <span>
                            ${Math.round(
                                (item.probability || 0) * 100
                            )}%
                        </span>
                    </div>
                `;
            });
    }

    if (
        suggestions.length === 0 &&
        healthAssessment.length === 0
    ) {

        html += `
            <p>
                The AI could not confidently identify
                a crop or health condition from this image.
                Please upload a clearer leaf or crop image.
            </p>
        `;
    }

    html += `
        </div>
    `;

    result.innerHTML = html;
}
}


/* ============================================================
   CROP INFORMATION MODAL
============================================================ */

const cropInformation = {

    onion: {

        icon: "🧅",

        topics: {

            cultivation: {

                title: {
                    en: "Onion Cultivation Guidance",
                    hi: "प्याज की खेती का मार्गदर्शन",
                    mr: "कांदा लागवड मार्गदर्शन"
                },

                subtitle: {
                    en: "Important steps for successful onion cultivation.",
                    hi: "सफल प्याज की खेती के लिए महत्वपूर्ण कदम।",
                    mr: "यशस्वी कांदा लागवडीसाठी महत्त्वाचे टप्पे."
                },

                content: {

                    en: `
                        <h3>🌱 Land Preparation</h3>
                        <p>Prepare a fine, well-drained seedbed. Onion grows well in loose soil with good drainage.</p>

                        <h3>🌱 Planting</h3>
                        <p>Use healthy and disease-free seedlings or suitable planting material. Maintain appropriate spacing.</p>

                        <h3>💧 Irrigation</h3>
                        <p>Maintain adequate soil moisture during crop growth. Avoid excessive irrigation and waterlogging.</p>

                        <h3>☀️ Field Conditions</h3>
                        <p>Provide adequate sunlight and maintain good air circulation around the crop.</p>
                    `,

                    hi: `
                        <h3>🌱 भूमि की तैयारी</h3>
                        <p>अच्छी जल निकासी वाली भुरभुरी मिट्टी तैयार करें। प्याज अच्छी जल निकासी वाली मिट्टी में अच्छी तरह बढ़ता है।</p>

                        <h3>🌱 रोपण</h3>
                        <p>स्वस्थ और रोगमुक्त पौध का उपयोग करें तथा उचित दूरी बनाए रखें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>फसल की वृद्धि के दौरान पर्याप्त नमी बनाए रखें। अत्यधिक सिंचाई और जलभराव से बचें।</p>

                        <h3>☀️ खेत की स्थिति</h3>
                        <p>पर्याप्त धूप और फसल के आसपास अच्छा वायु संचार रखें।</p>
                    `,

                    mr: `
                        <h3>🌱 जमिनीची तयारी</h3>
                        <p>चांगला निचरा होणारी भुसभुशीत जमीन तयार करा. कांदा चांगल्या निचऱ्याच्या जमिनीत चांगला वाढतो.</p>

                        <h3>🌱 लागवड</h3>
                        <p>निरोगी आणि रोगमुक्त रोपे वापरा आणि योग्य अंतर ठेवा.</p>

                        <h3>💧 सिंचन</h3>
                        <p>पिकाच्या वाढीच्या काळात योग्य ओलावा ठेवा. जास्त पाणी देणे आणि पाणी साचणे टाळा.</p>

                        <h3>☀️ शेताची स्थिती</h3>
                        <p>पुरेसा सूर्यप्रकाश आणि चांगले हवेचे वहन सुनिश्चित करा.</p>
                    `

                }

            },


            management: {

                title: {
                    en: "Onion Crop Management",
                    hi: "प्याज फसल प्रबंधन",
                    mr: "कांदा पीक व्यवस्थापन"
                },

                subtitle: {
                    en: "Manage the crop throughout its growing period.",
                    hi: "पूरे फसल चक्र के दौरान फसल का प्रबंधन करें।",
                    mr: "संपूर्ण वाढीच्या काळात पिकाचे व्यवस्थापन करा."
                },

                content: {

                    en: `
                        <h3>💧 Water Management</h3>
                        <p>Maintain consistent soil moisture, especially during bulb development.</p>

                        <h3>🌿 Weed Management</h3>
                        <p>Keep the field free from weeds because weeds compete for water, nutrients and sunlight.</p>

                        <h3>🧪 Nutrient Management</h3>
                        <p>Apply nutrients according to soil condition, soil testing and locally recommended practices.</p>

                        <h3>🔍 Crop Monitoring</h3>
                        <p>Inspect plants regularly for pests, diseases, yellowing leaves and abnormal growth.</p>
                    `,

                    hi: `
                        <h3>💧 जल प्रबंधन</h3>
                        <p>विशेष रूप से बल्ब बनने के दौरान मिट्टी में पर्याप्त नमी बनाए रखें।</p>

                        <h3>🌿 खरपतवार प्रबंधन</h3>
                        <p>खेत को खरपतवार से मुक्त रखें क्योंकि वे पानी, पोषक तत्वों और धूप के लिए प्रतिस्पर्धा करते हैं।</p>

                        <h3>🧪 पोषक तत्व प्रबंधन</h3>
                        <p>मिट्टी की स्थिति और स्थानीय अनुशंसाओं के अनुसार पोषक तत्व दें।</p>

                        <h3>🔍 फसल निगरानी</h3>
                        <p>कीट, रोग, पीली पत्तियों और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>
                    `,

                    mr: `
                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>विशेषतः कांद्याच्या गड्ड्या तयार होताना जमिनीत योग्य ओलावा ठेवा.</p>

                        <h3>🌿 तण व्यवस्थापन</h3>
                        <p>शेत तणमुक्त ठेवा कारण तणे पाणी, अन्नद्रव्ये आणि सूर्यप्रकाशासाठी स्पर्धा करतात.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>मातीची स्थिती आणि स्थानिक शिफारसीनुसार अन्नद्रव्ये द्या.</p>

                        <h3>🔍 पीक निरीक्षण</h3>
                        <p>कीड, रोग, पिवळी पाने आणि असामान्य वाढीसाठी नियमित तपासणी करा.</p>
                    `

                }

            },


            practices: {

                title: {
                    en: "Onion Farming Practices",
                    hi: "प्याज की खेती की पद्धतियां",
                    mr: "कांदा शेती पद्धती"
                },

                subtitle: {
                    en: "Practical recommendations for better onion production.",
                    hi: "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।",
                    mr: "चांगल्या कांदा उत्पादनासाठी व्यावहारिक सूचना."
                },

                content: {

                    en: `
                        <h3>🚜 Field Hygiene</h3>
                        <p>Remove diseased plant material and maintain clean cultivation areas.</p>

                        <h3>🌱 Healthy Planting Material</h3>
                        <p>Start with healthy and disease-free seedlings or planting material.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Rotate crops when practical to support soil health and reduce recurring crop problems.</p>

                        <h3>📦 Harvest Management</h3>
                        <p>Harvest bulbs at suitable maturity and cure them properly before storage.</p>
                    `,

                    hi: `
                        <h3>🚜 खेत की स्वच्छता</h3>
                        <p>रोगग्रस्त पौधों को हटाएं और खेत को साफ रखें।</p>

                        <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                        <p>स्वस्थ और रोगमुक्त पौधों से शुरुआत करें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>मिट्टी के स्वास्थ्य को बनाए रखने और बार-बार होने वाली समस्याओं को कम करने के लिए फसल चक्र अपनाएं।</p>

                        <h3>📦 कटाई प्रबंधन</h3>
                        <p>उचित परिपक्वता पर बल्बों की कटाई करें और भंडारण से पहले अच्छी तरह सुखाएं।</p>
                    `,

                    mr: `
                        <h3>🚜 शेत स्वच्छता</h3>
                        <p>रोगट झाडांचे अवशेष काढून शेत स्वच्छ ठेवा.</p>

                        <h3>🌱 निरोगी लागवड साहित्य</h3>
                        <p>निरोगी आणि रोगमुक्त रोपांपासून सुरुवात करा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>मातीचे आरोग्य सुधारण्यासाठी आणि वारंवार होणाऱ्या समस्या कमी करण्यासाठी पीक फेरपालट करा.</p>

                        <h3>📦 काढणी व्यवस्थापन</h3>
                        <p>योग्य परिपक्वतेवर कांद्याची काढणी करा आणि साठवणुकीपूर्वी योग्य प्रकारे वाळवा.</p>
                    `

                }

            }

        }

    },


    wheat: {

        icon: "🌾",

        topics: {

            cultivation: {

                title: {
                    en: "Wheat Cultivation Guidance",
                    hi: "गेहूं की खेती का मार्गदर्शन",
                    mr: "गहू लागवड मार्गदर्शन"
                },

                subtitle: {
                    en: "Important steps for successful wheat production.",
                    hi: "सफल गेहूं उत्पादन के लिए महत्वपूर्ण कदम।",
                    mr: "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे."
                },

                content: {

                    en: `
                        <h3>🌱 Soil Preparation</h3>
                        <p>Prepare a well-levelled and properly prepared seedbed with suitable soil moisture.</p>

                        <h3>🌾 Seed Selection</h3>
                        <p>Use healthy, quality seed varieties recommended for the local growing region.</p>

                        <h3>💧 Irrigation</h3>
                        <p>Irrigate according to crop growth stage, soil moisture and weather conditions.</p>

                        <h3>☀️ Crop Conditions</h3>
                        <p>Wheat generally performs well under suitable cool growing conditions with adequate sunlight.</p>
                    `,

                    hi: `
                        <h3>🌱 मिट्टी की तैयारी</h3>
                        <p>उचित नमी के साथ समतल और अच्छी तरह तैयार खेत बनाएं।</p>

                        <h3>🌾 बीज चयन</h3>
                        <p>स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और गुणवत्तापूर्ण बीज का उपयोग करें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>फसल की अवस्था, मिट्टी की नमी और मौसम के अनुसार सिंचाई करें।</p>

                        <h3>☀️ फसल की स्थिति</h3>
                        <p>गेहूं उपयुक्त ठंडी परिस्थितियों और पर्याप्त धूप में अच्छी तरह बढ़ता है।</p>
                    `,

                    mr: `
                        <h3>🌱 जमिनीची तयारी</h3>
                        <p>योग्य ओलाव्यासह जमीन समतल आणि व्यवस्थित तयार करा.</p>

                        <h3>🌾 बियाणे निवड</h3>
                        <p>स्थानिक प्रदेशासाठी शिफारस केलेले निरोगी आणि दर्जेदार बियाणे वापरा.</p>

                        <h3>💧 सिंचन</h3>
                        <p>पिकाची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार सिंचन करा.</p>

                        <h3>☀️ पिकाची स्थिती</h3>
                        <p>गहू योग्य थंड हवामान आणि पुरेशा सूर्यप्रकाशात चांगला वाढतो.</p>
                    `

                }

            },


            management: {

                title: {
                    en: "Wheat Crop Management",
                    hi: "गेहूं फसल प्रबंधन",
                    mr: "गहू पीक व्यवस्थापन"
                },

                subtitle: {
                    en: "Manage wheat from germination through harvest.",
                    hi: "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",
                    mr: "उगवण ते काढणीपर्यंत गव्हाचे व्यवस्थापन करा."
                },

                content: {

                    en: `
                        <h3>💧 Irrigation Management</h3>
                        <p>Pay particular attention to irrigation during important crop growth stages.</p>

                        <h3>🌿 Weed Control</h3>
                        <p>Monitor fields for weeds and use appropriate integrated weed-management practices.</p>

                        <h3>🔍 Pest Monitoring</h3>
                        <p>Inspect the crop regularly for insects, disease symptoms and abnormal plant growth.</p>

                        <h3>🧪 Nutrient Management</h3>
                        <p>Apply fertilizers according to soil testing and recommended crop requirements.</p>
                    `,

                    hi: `
                        <h3>💧 सिंचाई प्रबंधन</h3>
                        <p>फसल की महत्वपूर्ण अवस्थाओं में सिंचाई पर विशेष ध्यान दें।</p>

                        <h3>🌿 खरपतवार नियंत्रण</h3>
                        <p>खेत में खरपतवार की निगरानी करें और उचित एकीकृत प्रबंधन अपनाएं।</p>

                        <h3>🔍 कीट निगरानी</h3>
                        <p>कीट, रोग के लक्षण और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>

                        <h3>🧪 पोषक तत्व प्रबंधन</h3>
                        <p>मिट्टी परीक्षण और अनुशंसित आवश्यकताओं के अनुसार उर्वरक दें।</p>
                    `,

                    mr: `
                        <h3>💧 सिंचन व्यवस्थापन</h3>
                        <p>पिकाच्या महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे विशेष लक्ष द्या.</p>

                        <h3>🌿 तण नियंत्रण</h3>
                        <p>शेतातील तणांचे निरीक्षण करा आणि योग्य एकात्मिक तण व्यवस्थापन पद्धती वापरा.</p>

                        <h3>🔍 कीड निरीक्षण</h3>
                        <p>कीड, रोगाची लक्षणे आणि असामान्य वाढीसाठी नियमित तपासणी करा.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>माती परीक्षण आणि शिफारस केलेल्या गरजेनुसार खतांचा वापर करा.</p>
                    `

                }

            },


            practices: {

                title: {
                    en: "Wheat Farming Practices",
                    hi: "गेहूं की खेती की पद्धतियां",
                    mr: "गहू शेती पद्धती"
                },

                subtitle: {
                    en: "Practical methods for maintaining a healthy wheat crop.",
                    hi: "स्वस्थ गेहूं फसल बनाए रखने के व्यावहारिक तरीके।",
                    mr: "निरोगी गहू पीक राखण्यासाठी व्यावहारिक पद्धती."
                },

                content: {

                    en: `
                        <h3>🌱 Timely Sowing</h3>
                        <p>Follow the locally recommended sowing period for the selected wheat variety.</p>

                        <h3>🚜 Field Preparation</h3>
                        <p>Maintain a level and properly prepared seedbed.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Crop rotation can help with soil management and reduce recurring crop problems.</p>

                        <h3>🌾 Harvesting</h3>
                        <p>Harvest when the crop reaches appropriate maturity and grain moisture is suitable.</p>
                    `,

                    hi: `
                        <h3>🌱 समय पर बुवाई</h3>
                        <p>चयनित गेहूं की किस्म के लिए स्थानीय अनुशंसित बुवाई समय का पालन करें।</p>

                        <h3>🚜 खेत की तैयारी</h3>
                        <p>समतल और अच्छी तरह तैयार खेत बनाए रखें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है और बार-बार होने वाली समस्याओं को कम कर सकता है।</p>

                        <h3>🌾 कटाई</h3>
                        <p>उचित परिपक्वता और अनाज की उचित नमी पर कटाई करें।</p>
                    `,

                    mr: `
                        <h3>🌱 वेळेवर पेरणी</h3>
                        <p>निवडलेल्या गव्हाच्या वाणासाठी स्थानिक शिफारस केलेल्या पेरणीच्या कालावधीचे पालन करा.</p>

                        <h3>🚜 शेताची तयारी</h3>
                        <p>जमीन समतल आणि व्यवस्थित तयार ठेवा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>पीक फेरपालट माती व्यवस्थापनास मदत करते आणि वारंवार होणाऱ्या समस्या कमी करू शकते.</p>

                        <h3>🌾 काढणी</h3>
                        <p>पीक योग्य परिपक्वतेवर आणि धान्यात योग्य ओलावा असताना काढणी करा.</p>
                    `

                }

            }

        }

    }

};


/* ============================================================
   CROP MODAL SETUP
============================================================ */

function setupCropModal() {

    const modal =
        document.getElementById(
            "cropInfoModal"
        );

    const overlay =
        document.getElementById(
            "cropInfoModalOverlay"
        );

    const closeButton =
        document.getElementById(
            "closeCropInfoBtn"
        );


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


                    openCropModal(
                        crop,
                        topic
                    );

                }
            );

        });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCropModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCropModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                !modal.classList.contains(
                    "hidden"
                )
            ) {

                closeCropModal();

            }

        }
    );

}


function openCropModal(
    crop,
    topic
) {

    const cropData =
        cropInformation[crop];


    if (
        !cropData ||
        !cropData.topics ||
        !cropData.topics[topic]
    ) {

        console.error(
            "Crop information not found:",
            crop,
            topic
        );

        return;

    }


    const topicData =
        cropData.topics[topic];


    const modal =
        document.getElementById(
            "cropInfoModal"
        );

    const icon =
        document.getElementById(
            "cropInfoModalIcon"
        );

    const title =
        document.getElementById(
            "cropInfoModalTitle"
        );

    const subtitle =
        document.getElementById(
            "cropInfoModalSubtitle"
        );

    const body =
        document.getElementById(
            "cropInfoModalBody"
        );


    if (icon) {
        icon.textContent =
            cropData.icon;
    }


    if (title) {
        title.textContent =
            topicData.title[
                currentLanguage
            ] ||
            topicData.title.en;
    }


    if (subtitle) {
        subtitle.textContent =
            topicData.subtitle[
                currentLanguage
            ] ||
            topicData.subtitle.en;
    }


    if (body) {
        body.innerHTML =
            topicData.content[
                currentLanguage
            ] ||
            topicData.content.en;
    }


    if (modal) {

        modal.classList.remove(
            "hidden"
        );

        document.body.classList.add(
            "modal-open"
        );

    }

}


function closeCropModal() {

    const modal =
        document.getElementById(
            "cropInfoModal"
        );


    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );

}


/* ============================================================
   GOVERNMENT SCHEMES
============================================================ */

function setupGovernmentSchemes() {

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
   SETTINGS
============================================================ */

function setupSettings() {

    const language =
        document.getElementById(
            "settingsLanguage"
        );

    const voice =
        document.getElementById(
            "voiceSetting"
        );

    const notifications =
        document.getElementById(
            "notificationSetting"
        );


    if (language) {

        language.value =
            currentLanguage;


        language.addEventListener(
            "change",
            function () {

                setLanguage(
                    language.value
                );

            }
        );

    }


    if (voice) {

        const saved =
            localStorage.getItem(
                "smartAgriVoice"
            );


        if (saved !== null) {

            voice.checked =
                saved === "true";

        }


        voice.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriVoice",
                    voice.checked
                );

            }
        );

    }


    if (notifications) {

        const saved =
            localStorage.getItem(
                "smartAgriNotifications"
            );


        if (saved !== null) {

            notifications.checked =
                saved === "true";

        }


        notifications.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriNotifications",
                    notifications.checked
                );

            }
        );

    }

}


/* ============================================================
   DASHBOARD LANGUAGE SELECTOR
============================================================ */

function setupDashboardLanguage() {

    const selector =
        document.getElementById(
            "dashboardLanguage"
        );


    if (!selector) return;


    selector.value =
        currentLanguage;


    selector.addEventListener(
        "change",
        function () {

            setLanguage(
                selector.value
            );

        }
    );

}


/* ============================================================
   VOICE ASSISTANCE
============================================================ */

function getSpeechLanguage() {

    if (currentLanguage === "hi") {
        return "hi-IN";
    }

    if (currentLanguage === "mr") {
        return "mr-IN";
    }

    return "en-IN";

}


function setupVoice() {

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


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        if (response) {

            response.textContent =
                currentLanguage === "hi"
                    ? "आपके ब्राउज़र में वॉइस पहचान उपलब्ध नहीं है।"
                    : currentLanguage === "mr"
                        ? "तुमच्या ब्राउझरमध्ये आवाज ओळख उपलब्ध नाही."
                        : "Speech recognition is not supported by your browser.";

        }

        return;

    }


    const recognition =
        new SpeechRecognition();


    window.smartAgriRecognition =
        recognition;


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


            if (response) {

                response.textContent =
                    currentLanguage === "hi"
                        ? "सुन रहा हूँ..."
                        : currentLanguage === "mr"
                            ? "ऐकत आहे..."
                            : "Listening...";

            }

        };


    recognition.onresult =
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
                    currentLanguage === "hi"
                        ? "आपने कहा: " + transcript
                        : currentLanguage === "mr"
                            ? "तुम्ही म्हणालात: " + transcript
                            : "You said: " + transcript;

            }


            speakText(
                transcript
            );

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Speech recognition error:",
                event.error
            );


            if (response) {

                response.textContent =
                    currentLanguage === "hi"
                        ? "वॉइस इनपुट में समस्या हुई।"
                        : currentLanguage === "mr"
                            ? "आवाज इनपुटमध्ये समस्या आली."
                            : "There was a problem with voice input.";

            }

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


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

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

                recognition.stop();

            }
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


    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );


    if (
        voiceSetting &&
        !voiceSetting.checked
    ) {
        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        getSpeechLanguage();


    utterance.rate =
        0.9;


    window.speechSynthesis.speak(
        utterance
    );

}


/* ============================================================
   AI ASSISTANT
============================================================ */

function setupAI() {

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


            const userMessage =
                document.createElement(
                    "div"
                );


            userMessage.className =
                "chat-message user-message";


            userMessage.innerHTML = `

                <div class="chat-avatar">
                    👨‍🌾
                </div>

                <div>

                    <strong>
                        ${escapeHTML(
                            farmerData.name ||
                            "Farmer"
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            question
                        )}
                    </p>

                </div>

            `;


            messages.appendChild(
                userMessage
            );


            input.value =
                "";


            const assistantMessage =
                document.createElement(
                    "div"
                );


            assistantMessage.className =
                "chat-message assistant-message";


            assistantMessage.innerHTML = `

                <div class="chat-avatar">
                    🤖
                </div>

                <div>

                    <strong>
                        ${escapeHTML(
                            t("assistant")
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            t("aiUnavailable")
                        )}
                    </p>

                </div>

            `;


            messages.appendChild(
                assistantMessage
            );


            messages.scrollTop =
                messages.scrollHeight;

        }
    );

}


/* ============================================================
   UTILITY FUNCTIONS
============================================================ */

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

    if (!element) return;


    element.textContent =
        text || "";


    element.className =
        "message";


    if (type) {

        element.classList.add(
            type
        );

    }

}


function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

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


function getFirebaseErrorMessage(
    error
) {

    if (!error) {
        return "An error occurred.";
    }


    const code =
        error.code || "";


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
            "Password should contain at least 6 characters.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return messages[code] ||
        error.message ||
        "Something went wrong.";

}


/* ============================================================
   FIREBASE AUTH STATE
============================================================ */

function setupFirebaseAuthState() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            /*
               IMPORTANT:

               Firebase authentication DOES NOT control
               the Online/Offline indicator.

               The indicator is controlled by navigator.onLine.
            */


            if (user && !demoMode) {

                currentUser =
                    user;


                await loadFarmerData(
                    user
                );


                populateFarmerUI();

                applyTranslations();

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
            "SmartAgri initializing..."
        );


        /* -----------------------------------------------------
           Initial language
        ----------------------------------------------------- */

        applyTranslations();


        /* -----------------------------------------------------
           Actual browser connection
        ----------------------------------------------------- */

        updateConnectionUI();


        /* -----------------------------------------------------
           Setup pages
        ----------------------------------------------------- */

        setupLanguagePage();

        setupAuthNavigation();

        setupLogin();

        setupRegistration();

        setupDemoButton();

        setupForgotPassword();

        setupLogout();


        /* -----------------------------------------------------
           Dashboard
        ----------------------------------------------------- */

        setupSectionNavigation();

        setupMenu();

        setupProfileMenu();

        setupProfile();

        setupDashboardLanguage();

        setupSettings();


        /* -----------------------------------------------------
           Agriculture features
        ----------------------------------------------------- */

        setupWeather();

        setupMarketSelector();

        setupMarketComparison();

        setupCropHealth();

        setupCropModal();

        setupGovernmentSchemes();


        /* -----------------------------------------------------
           AI and voice
        ----------------------------------------------------- */

        setupAI();

        setupVoice();


        /* -----------------------------------------------------
           Firebase
        ----------------------------------------------------- */

        setupFirebaseAuthState();


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);
