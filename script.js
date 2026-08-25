/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   Firebase + Authentication + Firestore
   Language: English / Hindi / Marathi
   No fake fallback data
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

let selectedLanguage = localStorage.getItem("smartAgriLanguage") || "en";
let currentUser = null;
let currentFarmerData = null;

let editingProfile = false;
let recognition = null;


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
            "वॉयस सहायता",

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
            "आपकी खेती से जुड़ी जानकारी एक ही जगह।",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        weatherSubtitle:
            "खेती के निर्णयों के लिए स्थानीय मौसम की जानकारी।",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रीफ्रेश",

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
            "बाजार मूल्य तालिका",

        market:
            "बाजार",

        crop:
            "फसल",

        price:
            "कीमत",

        date:
            "तारीख",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन संबंधी मार्गदर्शन।",

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
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",

        learnMore:
            "अधिक जानें",

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

        appName: "स्मार्ट एग्री",

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
            "मोबाईल नंबर",

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
            "बाजारभाव",

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
            "स्वागत आहे",

        dashboardSubtitle:
            "तुमच्या शेतीची सर्व माहिती एका ठिकाणी.",

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
            "महत्त्वाची कृषी साधने त्वरीत वापरा.",

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
            "सत्यापित कनेक्टेड स्रोतांमधून सध्याचे पीक बाजारभाव.",

        marketPriceTable:
            "बाजारभाव तक्ता",

        market:
            "बाजार",

        crop:
            "पीक",

        price:
            "किंमत",

        date:
            "तारीख",

        onion:
            "कांदा",

        wheat:
            "गहू",

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
            "AI सहाय्यक विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

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
            "अधिकृत PM-KISAN शेतकरी मदत माहिती.",

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
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",

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
            "तुमच्या SmartAgri पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची ॲप्लिकेशन भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "ॲप्लिकेशन सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार केले आहे."

    }

};


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */

function getTranslation(key) {

    if (
        translations[selectedLanguage] &&
        translations[selectedLanguage][key]
    ) {
        return translations[selectedLanguage][key];
    }

    return translations.en[key] || key;
}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        selectedLanguage
    );

    document.documentElement.lang = selectedLanguage;

    /* -----------------------------------------
       Normal text elements
    ----------------------------------------- */

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        const translatedText =
            getTranslation(key);

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }

    });


    /* -----------------------------------------
       Placeholder translations
    ----------------------------------------- */

    document.querySelectorAll(
        "[data-i18n-placeholder]"
    ).forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        element.placeholder =
            getTranslation(key);

    });


    /* -----------------------------------------
       Update all language selectors
    ----------------------------------------- */

    const languageSelectors = [

        document.getElementById(
            "dashboardLanguage"
        ),

        document.getElementById(
            "settingsLanguage"
        ),

        document.getElementById(
            "registerLanguage"
        )

    ];

    languageSelectors.forEach(select => {

        if (select) {
            select.value = selectedLanguage;
        }

    });


    /* -----------------------------------------
       Language selection buttons
    ----------------------------------------- */

    document.querySelectorAll(
        ".language-option"
    ).forEach(button => {

        const buttonLanguage =
            button.getAttribute("data-language");

        button.classList.toggle(
            "selected",
            buttonLanguage === selectedLanguage
        );

    });


    /* -----------------------------------------
       Continue button
    ----------------------------------------- */

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );

    if (continueButton) {

        continueButton.disabled = false;

        continueButton.textContent =
            getTranslation("continue");

    }


    console.log(
        "Language changed to:",
        selectedLanguage
    );
}


/* =========================================================
   LANGUAGE SELECTION PAGE
========================================================= */

function setupLanguageSelection() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const language =
                    this.getAttribute(
                        "data-language"
                    );

                applyLanguage(language);

                languageButtons.forEach(btn => {
                    btn.classList.remove(
                        "selected"
                    );
                });

                this.classList.add(
                    "selected"
                );

                if (continueButton) {
                    continueButton.disabled = false;
                }

            }
        );

    });


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                const languagePage =
                    document.getElementById(
                        "languagePage"
                    );

                const loginPage =
                    document.getElementById(
                        "loginPage"
                    );

                if (languagePage) {
                    languagePage.classList.remove(
                        "active-screen"
                    );
                }

                if (loginPage) {
                    loginPage.classList.add(
                        "active-screen"
                    );
                }

            }
        );

    }


    /* Initial language */

    applyLanguage(selectedLanguage);
}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(
        ".screen"
    ).forEach(screen => {

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

}


/* =========================================================
   AUTH PAGE BUTTONS
========================================================= */

function setupAuthNavigation() {

    const registerButton =
        document.getElementById(
            "showRegisterBtn"
        );

    const loginButton =
        document.getElementById(
            "showLoginBtn"
        );

    const changeLanguageButton =
        document.getElementById(
            "changeLanguageFromLogin"
        );


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                showScreen("registerPage");

            }
        );

    }


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function () {

                showScreen("loginPage");

            }
        );

    }


    if (changeLanguageButton) {

        changeLanguageButton.addEventListener(
            "click",
            function () {

                showScreen("languagePage");

                applyLanguage(
                    selectedLanguage
                );

            }
        );

    }

}


/* =========================================================
   FIREBASE AUTH - REGISTRATION
========================================================= */

async function registerFarmer(event) {

    event.preventDefault();

    const message =
        document.getElementById(
            "registerMessage"
        );

    if (!auth || !db) {

        showMessage(
            message,
            "Firebase is not configured correctly.",
            "error"
        );

        return;
    }


    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();

    const mobile =
        document.getElementById(
            "registerMobile"
        ).value.trim();

    const village =
        document.getElementById(
            "registerVillage"
        ).value.trim();

    const state =
        document.getElementById(
            "registerState"
        ).value.trim();

    const landArea =
        document.getElementById(
            "registerLandArea"
        ).value.trim();

    const market =
        document.getElementById(
            "registerMarket"
        ).value;

    const language =
        document.getElementById(
            "registerLanguage"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    try {

        showMessage(
            message,
            "Creating account...",
            "info"
        );


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
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        selectedLanguage = language;

        localStorage.setItem(
            "smartAgriLanguage",
            language
        );

        applyLanguage(language);


        showMessage(
            message,
            "Account created successfully.",
            "success"
        );


        setTimeout(() => {

            openDashboard(user);

        }, 1000);


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
   FIREBASE AUTH - LOGIN
========================================================= */

async function loginFarmer(event) {

    event.preventDefault();

    const message =
        document.getElementById(
            "loginMessage"
        );

    if (!auth) {

        showMessage(
            message,
            "Firebase Authentication is not configured.",
            "error"
        );

        return;
    }


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    try {

        showMessage(
            message,
            "Logging in...",
            "info"
        );


        const userCredential =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        const user =
            userCredential.user;


        await loadFarmerData(user);


        showMessage(
            message,
            "Login successful.",
            "success"
        );


        setTimeout(() => {

            openDashboard(user);

        }, 500);


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
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData(user) {

    if (!db || !user) {
        return null;
    }


    try {

        const documentSnapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (!documentSnapshot.exists) {

            console.warn(
                "No farmer document found."
            );

            currentFarmerData = null;

            return null;
        }


        currentFarmerData =
            documentSnapshot.data();


        if (
            currentFarmerData.preferredLanguage &&
            translations[
                currentFarmerData.preferredLanguage
            ]
        ) {

            selectedLanguage =
                currentFarmerData.preferredLanguage;

            localStorage.setItem(
                "smartAgriLanguage",
                selectedLanguage
            );

            applyLanguage(
                selectedLanguage
            );

        }


        updateFarmerUI(
            currentFarmerData
        );


        return currentFarmerData;


    } catch (error) {

        console.error(
            "Error loading farmer data:",
            error
        );

        currentFarmerData = null;

        return null;
    }

}


/* =========================================================
   UPDATE FARMER UI
========================================================= */

function updateFarmerUI(data) {

    if (!data) {
        return;
    }


    const name =
        data.name || "";

    const email =
        data.email || "";

    const village =
        data.village || "";

    const landArea =
        data.landArea || "";

    const market =
        data.preferredMarket || "";

    const mobile =
        data.mobile || "";

    const state =
        data.state || "";

    const language =
        data.preferredLanguage || selectedLanguage;


    /* Header */

    setText(
        "headerFarmerName",
        name
    );


    /* Dashboard */

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


    /* Profile */

    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        email
    );


    setValue(
        "profileName",
        name
    );

    setValue(
        "profileEmail",
        email
    );

    setValue(
        "profileMobile",
        mobile
    );

    setValue(
        "profileVillage",
        village
    );

    setValue(
        "profileState",
        state
    );

    setValue(
        "profileLandArea",
        landArea
    );

    setValue(
        "profileMarket",
        market
    );

    setValue(
        "profileLanguage",
        language
    );

}


/* =========================================================
   OPEN DASHBOARD
========================================================= */

async function openDashboard(user) {

    currentUser = user;


    if (user) {

        await loadFarmerData(user);

    }


    showScreen("dashboardPage");

    updateConnectionStatus();

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function setupDemoButton() {

    const demoButton =
        document.getElementById(
            "demoBtn"
        );


    if (!demoButton) {
        return;
    }


    demoButton.addEventListener(
        "click",
        async function () {

            /*
             * Demo mode does NOT create fake farmer data.
             * Dashboard opens without invented values.
             */

            currentUser = null;

            currentFarmerData = null;

            showScreen(
                "dashboardPage"
            );

            updateConnectionStatus();

        }
    );

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

        closeSideMenu();

        closeProfileMenu();

        showScreen("loginPage");

        console.log(
            "User logged out."
        );

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupAuthStateListener() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser = user;

                await loadFarmerData(
                    user
                );

            }

        }
    );

}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {
        return "An error occurred.";
    }


    switch (error.code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email.";

        case "auth/weak-password":
            return "Password must contain at least 6 characters.";

        case "auth/user-not-found":
            return "No account was found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return error.message ||
                   "Something went wrong.";
    }

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function setupProfileEditing() {

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
            function () {

                setProfileEditing(
                    true
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                updateFarmerUI(
                    currentFarmerData
                );

                setProfileEditing(
                    false
                );

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
   ENABLE / DISABLE PROFILE EDIT
========================================================= */

function setProfileEditing(enabled) {

    editingProfile = enabled;


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
            document.getElementById(id);

        if (element) {

            element.disabled =
                !enabled;

        }

    });


    const actions =
        document.getElementById(
            "profileEditActions"
        );


    if (actions) {

        actions.classList.toggle(
            "hidden",
            !enabled
        );

    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    if (!currentUser || !db) {

        showMessage(
            document.getElementById(
                "profileMessage"
            ),
            "You must be logged in to save your profile.",
            "error"
        );

        return;

    }


    const updatedData = {

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

        preferredLanguage:
            getValue("profileLanguage")

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


        selectedLanguage =
            updatedData.preferredLanguage;

        localStorage.setItem(
            "smartAgriLanguage",
            selectedLanguage
        );


        applyLanguage(
            selectedLanguage
        );


        updateFarmerUI(
            currentFarmerData
        );


        setProfileEditing(
            false
        );


        showMessage(
            document.getElementById(
                "profileMessage"
            ),
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            document.getElementById(
                "profileMessage"
            ),
            error.message ||
            "Unable to update profile.",
            "error"
        );

    }

}


/* =========================================================
   SIDE MENU
========================================================= */

function setupSideMenu() {

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


    document.querySelectorAll(
        "[data-section]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const section =
                    this.getAttribute(
                        "data-section"
                    );

                showAppSection(
                    section
                );

                closeSideMenu();

            }
        );

    });

}


/* =========================================================
   OPEN SIDE MENU
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


/* =========================================================
   CLOSE SIDE MENU
========================================================= */

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
   APP SECTION NAVIGATION
========================================================= */

function showAppSection(sectionId) {

    document.querySelectorAll(
        ".app-section"
    ).forEach(section => {

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
   PROFILE MENU
========================================================= */

function setupProfileMenu() {

    const profileButton =
        document.getElementById(
            "profileButton"
        );


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

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
        );

    }


    document.querySelectorAll(
        "[data-profile-section]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const section =
                    this.getAttribute(
                        "data-profile-section"
                    );

                showAppSection(
                    section
                );

                closeProfileMenu();

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

            const button =
                document.getElementById(
                    "profileButton"
                );


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
   LANGUAGE SELECTORS
========================================================= */

function setupLanguageSelectors() {

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    const settingsLanguage =
        document.getElementById(
            "settingsLanguage"
        );

    const registerLanguage =
        document.getElementById(
            "registerLanguage"
        );


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            function () {

                changeApplicationLanguage(
                    this.value
                );

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            function () {

                changeApplicationLanguage(
                    this.value
                );

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function () {

                changeApplicationLanguage(
                    this.value
                );

            }
        );

    }

}


/* =========================================================
   CHANGE APPLICATION LANGUAGE
========================================================= */

async function changeApplicationLanguage(
    language
) {

    applyLanguage(language);


    /*
     * If user is logged in, save preference
     * to Firestore.
     */

    if (
        currentUser &&
        db
    ) {

        try {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .update({

                    preferredLanguage:
                        language

                });


            if (currentFarmerData) {

                currentFarmerData.preferredLanguage =
                    language;

            }


        } catch (error) {

            console.error(
                "Unable to save language preference:",
                error
            );

        }

    }

}


/* =========================================================
   CONNECTION STATUS
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

    const dashboardText =
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
                ? getTranslation("online")
                : getTranslation("offline");

    }


    if (dashboardText) {

        dashboardText.textContent =
            online
                ? getTranslation("online")
                : getTranslation("offline");

    }

}


/* =========================================================
   WEATHER
========================================================= */

function setupWeather() {

    const refreshButton =
        document.getElementById(
            "refreshWeatherBtn"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                /*
                 * No fallback weather data.
                 * Backend/API must provide verified data.
                 */

                console.log(
                    "Weather refresh requested."
                );

            }
        );

    }

}


/* =========================================================
   MARKET CROP SELECTOR
========================================================= */

function setupMarketSelector() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (!selector) {
        return;
    }


    selector.addEventListener(
        "change",
        function () {

            /*
             * No fake market prices.
             * Backend/API data will be inserted here.
             */

            console.log(
                "Selected crop:",
                this.value
            );

        }
    );

}


/* =========================================================
   CROP IMAGE PREVIEW
========================================================= */

function setupCropImage() {

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
        function () {

            const file =
                this.files &&
                this.files[0];


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

                analyzeButton.disabled = false;

            }

        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            function () {

                /*
                 * No fake AI result.
                 * Actual AI backend will be connected later.
                 */

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
                            Connect a verified crop-health AI service before displaying analysis.
                        </p>
                    `;

                }

            }
        );

    }

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        document.getElementById(
            "aiForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
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


            /*
             * No fake AI response.
             */

            addChatMessage(
                question,
                "user"
            );


            addChatMessage(
                getTranslation(
                    "aiUnavailable"
                ),
                "assistant"
            );


            input.value = "";

        }
    );

}


/* =========================================================
   CHAT MESSAGE
========================================================= */

function addChatMessage(
    message,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) {
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


    wrapper.innerHTML = `

        <div class="chat-avatar">
            ${type === "user" ? "👨‍🌾" : "🤖"}
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? getTranslation("fullName")
                        : getTranslation("assistant")
                }
            </strong>

            <p></p>

        </div>

    `;


    const paragraph =
        wrapper.querySelector("p");


    if (paragraph) {

        paragraph.textContent =
            message;

    }


    container.appendChild(
        wrapper
    );


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function setupVoiceAssistant() {

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


    if (!startButton) {
        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        startButton.addEventListener(
            "click",
            function () {

                const response =
                    document.getElementById(
                        "voiceResponse"
                    );

                if (response) {

                    response.textContent =
                        "Speech recognition is not supported on this device.";

                }

            }
        );

        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    recognition.lang =
        getSpeechLanguage(
            selectedLanguage
        );


    recognition.onstart =
        function () {

            startButton.classList.add(
                "hidden"
            );

            if (stopButton) {

                stopButton.classList.remove(
                    "hidden"
                );

            }

        };


    recognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0].transcript;


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            const response =
                document.getElementById(
                    "voiceResponse"
                );


            if (response) {

                response.textContent =
                    getTranslation(
                        "aiUnavailable"
                    );

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );

        };


    recognition.onend =
        function () {

            startButton.classList.remove(
                "hidden"
            );

            if (stopButton) {

                stopButton.classList.add(
                    "hidden"
                );

            }

        };


    startButton.addEventListener(
        "click",
        function () {

            recognition.lang =
                getSpeechLanguage(
                    selectedLanguage
                );

            recognition.start();

        }
    );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function () {

                recognition.stop();

            }
        );

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

        default:
            return "en-IN";

    }

}


/* =========================================================
   GOVERNMENT SCHEME LINKS
========================================================= */

function setupSchemeButtons() {

    document.querySelectorAll(
        ".scheme-button"
    ).forEach(button => {

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
                        "_blank"
                    );

                }

            }
        );

    });

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function setupForgotPassword() {

    const button =
        document.getElementById(
            "forgotPasswordBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


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
                    "Firebase Authentication is not configured.",
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
                    getFirebaseErrorMessage(
                        error
                    ),
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value ?? "";

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
            value ?? "";

    }

}


function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   MESSAGE DISPLAY
========================================================= */

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
        "message " + (type || "");


    if (text) {

        setTimeout(() => {

            /*
             * Do not erase error messages
             * immediately if they are useful.
             */

        }, 3000);

    }

}


/* =========================================================
   ONLINE / OFFLINE EVENTS
========================================================= */

window.addEventListener(
    "online",
    updateConnectionStatus
);

window.addEventListener(
    "offline",
    updateConnectionStatus
);


/* =========================================================
   FORM EVENT LISTENERS
========================================================= */

function setupForms() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginFarmer
        );

    }


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            registerFarmer
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
            "SmartAgri application loaded."
        );


        /* Language */

        setupLanguageSelection();

        setupLanguageSelectors();


        /* Authentication */

        setupAuthNavigation();

        setupForms();

        setupDemoButton();

        setupForgotPassword();

        setupAuthStateListener();


        /* Dashboard */

        setupSideMenu();

        setupProfileMenu();

        setupProfileEditing();


        /* Farming features */

        setupWeather();

        setupMarketSelector();

        setupCropImage();

        setupAI();

        setupVoiceAssistant();

        setupSchemeButtons();


        /* Connection */

        updateConnectionStatus();


        /*
         * Make sure saved language is applied
         * after every element has loaded.
         */

        applyLanguage(
            selectedLanguage
        );


        console.log(
            "SmartAgri initialization complete."
        );

    }
);
