/* =========================================================
   SMARTAGRI - COMPLETE script.js
   Works with the exact HTML provided
   Languages: English / Hindi / Marathi
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
   2. FIREBASE INITIALIZATION
========================================================= */

if (typeof firebase !== "undefined") {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    window.smartAgriAuth = firebase.auth();
    window.smartAgriDB = firebase.firestore();

} else {

    console.error(
        "Firebase SDK was not loaded."
    );

}


/* =========================================================
   3. GLOBAL VARIABLES
========================================================= */

let selectedLanguage = "en";

let currentUser = null;

let isDemoMode = false;

let recognition = null;

let selectedCropImage = null;


/* =========================================================
   4. TRANSLATIONS
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

        rememberMe: "Remember Me",

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
            "SmartAgri का उपयोग करने के लिए लॉगिन करें",

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
            "क्या आपका खाता नहीं है?",

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
            "क्या आपका पहले से खाता है?",

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
            "किसान प्रोफ़ाइल",

        settings:
            "सेटिंग्स",

        about:
            "SmartAgri के बारे में",

        logout:
            "लॉगआउट",

        myProfile:
            "मेरी प्रोफ़ाइल",

        welcome:
            "स्वागत है",

        dashboardSubtitle:
            "आपकी खेती की जानकारी एक ही स्थान पर।",

        connectionStatus:
            "कनेक्शन स्थिति",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफ़ाइल संपादित करें",

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
            "आर्द्रता",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",

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
            "भाव",

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
            "फसल उगाने और प्रबंधन संबंधी मार्गदर्शन।",

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
            "अधिक जानें",

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
            "AI उत्तरों के लिए कनेक्टेड AI सेवा/बैकएंड आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice:
            "आवाज सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "आवाज इनपुट",

        voiceInputPlaceholder:
            "आवाज इनपुट यहां दिखाई देगा...",

        voiceResponse:
            "आवाज प्रतिक्रिया",

        voiceReady:
            "आवाज सहायता तैयार है।",

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
            "आवाज सहायता चालू या बंद करें।",

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
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",

        continue:
            "पुढे चला",

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
            "तुमचे खाते नाही?",

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
            "येवला बाजारपेठ",

        shirdiMarket:
            "शिर्डी बाजारपेठ",

        preferredLanguage:
            "पसंतीची भाषा",

        createAccount:
            "खाते तयार करा",

        alreadyAccount:
            "तुमचे आधीपासून खाते आहे?",

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
            "तुमची शेतीविषयक माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची कृषी साधने त्वरीत वापरा.",

        liveDataTitle:
            "थेट डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

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
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री फसल बीमा योजना माहिती.",

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
            "तुमच्या SmartAgri पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप्लिकेशन भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप्लिकेशन सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार करण्यात आले आहे."

    }

};


/* =========================================================
   5. LANGUAGE FUNCTIONS
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


    document.documentElement.lang =
        language;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(function(element) {

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


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function(element) {

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


    updateSelectTranslations();

    updateLanguageSelectors();

    updateConnectionStatus();

    updateDynamicFarmerTexts();

}


/* =========================================================
   6. SELECT OPTION TRANSLATION
========================================================= */

function updateSelectTranslations() {

    document
        .querySelectorAll("option[data-i18n]")
        .forEach(function(option) {

            const key =
                option.getAttribute("data-i18n");

            if (
                translations[selectedLanguage] &&
                translations[selectedLanguage][key]
            ) {

                option.textContent =
                    translations[selectedLanguage][key];

            }

        });

}


/* =========================================================
   7. LANGUAGE SELECTORS
========================================================= */

function updateLanguageSelectors() {

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );

    const settingsLanguage =
        document.getElementById(
            "settingsLanguage"
        );

    const profileLanguage =
        document.getElementById(
            "profileLanguage"
        );

    const registerLanguage =
        document.getElementById(
            "registerLanguage"
        );


    if (dashboardLanguage) {
        dashboardLanguage.value =
            selectedLanguage;
    }

    if (settingsLanguage) {
        settingsLanguage.value =
            selectedLanguage;
    }

    if (profileLanguage) {
        profileLanguage.value =
            selectedLanguage;
    }

    if (registerLanguage) {
        registerLanguage.value =
            selectedLanguage;
    }

}


/* =========================================================
   8. PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".screen")
        .forEach(function(page) {

            page.classList.remove(
                "active-screen"
            );

        });


    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add(
            "active-screen"
        );

    }

}


function showSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(function(section) {

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    closeSideMenu();

    closeProfileMenu();

}


/* =========================================================
   9. CONNECTION STATUS
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

        connectionStatus.classList.remove(
            "online",
            "offline"
        );

        connectionStatus.classList.add(
            online ? "online" : "offline"
        );

    }


    if (connectionText) {

        connectionText.textContent =
            translations[selectedLanguage][
                online ? "online" : "offline"
            ];

    }


    if (dashboardConnectionText) {

        dashboardConnectionText.textContent =
            translations[selectedLanguage][
                online ? "online" : "offline"
            ];

    }

}


window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);


/* =========================================================
   10. DYNAMIC FARMER TEXT
========================================================= */

function updateDynamicFarmerTexts() {

    if (!currentUser && !isDemoMode) {
        return;
    }

}


/* =========================================================
   11. DEMO DASHBOARD
========================================================= */

function openDemoDashboard() {

    isDemoMode = true;

    currentUser = {
        displayName: "Demo Farmer",
        email: "demo@smartagri.com"
    };


    showPage(
        "dashboardPage"
    );


    const dashboardPage =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboardPage) {

        dashboardPage.style.display =
            "block";

    }


    setText(
        "headerFarmerName",
        "Demo Farmer"
    );

    setText(
        "dashboardFarmerName",
        "Demo Farmer"
    );

    setText(
        "summaryName",
        "Demo Farmer"
    );

    setText(
        "summaryVillage",
        "Kopargaon"
    );

    setText(
        "summaryLand",
        "5 Acres"
    );

    setText(
        "summaryMarket",
        "Kopargaon APMC"
    );


    setText(
        "profilePageName",
        "Demo Farmer"
    );

    setText(
        "profilePageEmail",
        "demo@smartagri.com"
    );


    setValue(
        "profileName",
        "Demo Farmer"
    );

    setValue(
        "profileEmail",
        "demo@smartagri.com"
    );

    setValue(
        "profileMobile",
        "9876543210"
    );

    setValue(
        "profileVillage",
        "Kopargaon"
    );

    setValue(
        "profileState",
        "Maharashtra"
    );

    setValue(
        "profileLandArea",
        "5 Acres"
    );

    setValue(
        "profileMarket",
        "Kopargaon APMC"
    );

    setValue(
        "profileLanguage",
        selectedLanguage
    );


    showSection(
        "dashboardSection"
    );


    updateConnectionStatus();

}


/* =========================================================
   12. HELPER FUNCTIONS
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            value;
    }

}


function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            value;
    }

}


/* =========================================================
   13. LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    languageButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    languageButtons.forEach(
                        function(item) {

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


                    translatePage(
                        selectedLanguage
                    );


                    if (continueButton) {

                        continueButton.disabled =
                            false;

                    }

                }
            );

        }
    );


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function() {

                showPage(
                    "loginPage"
                );

            }
        );

    }

}


/* =========================================================
   14. LOGIN
========================================================= */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    const demoButton =
        document.getElementById(
            "demoBtn"
        );

    const registerButton =
        document.getElementById(
            "showRegisterBtn"
        );

    const changeLanguageButton =
        document.getElementById(
            "changeLanguageFromLogin"
        );

    const forgotButton =
        document.getElementById(
            "forgotPasswordBtn"
        );


    if (demoButton) {

        demoButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                openDemoDashboard();

            }
        );

    }


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function() {

                showPage(
                    "registerPage"
                );

            }
        );

    }


    if (changeLanguageButton) {

        changeLanguageButton.addEventListener(
            "click",
            function() {

                showPage(
                    "languagePage"
                );

            }
        );

    }


    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            forgotPassword
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();

                const email =
                    document.getElementById(
                        "loginEmail"
                    ).value.trim();

                const password =
                    document.getElementById(
                        "loginPassword"
                    ).value;


                if (!email || !password) {
                    return;
                }


                if (
                    !window.smartAgriAuth
                ) {

                    showMessage(
                        "loginMessage",
                        "Firebase is not available.",
                        "error"
                    );

                    return;

                }


                try {

                    showMessage(
                        "loginMessage",
                        "Logging in...",
                        "info"
                    );


                    const result =
                        await window.smartAgriAuth
                            .signInWithEmailAndPassword(
                                email,
                                password
                            );


                    currentUser =
                        result.user;

                    isDemoMode =
                        false;


                    await loadUserProfile(
                        result.user
                    );


                    showPage(
                        "dashboardPage"
                    );


                    showSection(
                        "dashboardSection"
                    );


                    clearMessage(
                        "loginMessage"
                    );

                } catch (error) {

                    console.error(
                        error
                    );


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


/* =========================================================
   15. FIREBASE ERROR MESSAGE
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error || !error.code) {
        return "Something went wrong. Please try again.";
    }


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
            "Password must contain at least 6 characters.",

        "auth/network-request-failed":
            "Network connection failed. Please check your internet.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        messages[error.code] ||
        error.message ||
        "Something went wrong."
    );

}


/* =========================================================
   16. FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

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


    if (!window.smartAgriAuth) {

        showMessage(
            "loginMessage",
            "Firebase is not available.",
            "error"
        );

        return;

    }


    try {

        await window.smartAgriAuth
            .sendPasswordResetEmail(
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


/* =========================================================
   17. REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    const loginButton =
        document.getElementById(
            "showLoginBtn"
        );


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function() {

                showPage(
                    "loginPage"
                );

            }
        );

    }


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (!window.smartAgriAuth) {

                showMessage(
                    "registerMessage",
                    "Firebase is not available.",
                    "error"
                );

                return;

            }


            const name =
                getValue(
                    "registerName"
                );

            const email =
                getValue(
                    "registerEmail"
                );

            const mobile =
                getValue(
                    "registerMobile"
                );

            const village =
                getValue(
                    "registerVillage"
                );

            const state =
                getValue(
                    "registerState"
                );

            const landArea =
                getValue(
                    "registerLandArea"
                );

            const market =
                getValue(
                    "registerMarket"
                );

            const language =
                getValue(
                    "registerLanguage"
                );

            const password =
                getValue(
                    "registerPassword"
                );


            try {

                showMessage(
                    "registerMessage",
                    "Creating account...",
                    "info"
                );


                const result =
                    await window.smartAgriAuth
                        .createUserWithEmailAndPassword(
                            email,
                            password
                        );


                currentUser =
                    result.user;


                await result.user
                    .updateProfile({
                        displayName: name
                    });


                await window.smartAgriDB
                    .collection("farmers")
                    .doc(result.user.uid)
                    .set({

                        name: name,

                        email: email,

                        mobile: mobile,

                        village: village,

                        state: state,

                        landArea: landArea,

                        preferredMarket: market,

                        preferredLanguage:
                            language,

                        createdAt:
                            firebase.firestore
                                .FieldValue
                                .serverTimestamp()

                    });


                selectedLanguage =
                    language;


                translatePage(
                    selectedLanguage
                );


                showMessage(
                    "registerMessage",
                    "Account created successfully.",
                    "success"
                );


                setTimeout(
                    function() {

                        showPage(
                            "dashboardPage"
                        );

                        populateFarmerProfile({
                            name,
                            email,
                            mobile,
                            village,
                            state,
                            landArea,
                            preferredMarket:
                                market,
                            preferredLanguage:
                                language
                        });

                        showSection(
                            "dashboardSection"
                        );

                    },
                    700
                );


            } catch (error) {

                console.error(
                    error
                );


                showMessage(
                    "registerMessage",
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
   18. LOAD USER PROFILE
========================================================= */

async function loadUserProfile(user) {

    if (!user) {
        return;
    }


    const defaultProfile = {

        name:
            user.displayName ||
            "Farmer",

        email:
            user.email ||
            "",

        mobile: "",

        village: "",

        state: "Maharashtra",

        landArea: "",

        preferredMarket:
            "Kopargaon APMC",

        preferredLanguage:
            selectedLanguage

    };


    if (!window.smartAgriDB) {

        populateFarmerProfile(
            defaultProfile
        );

        return;

    }


    try {

        const snapshot =
            await window.smartAgriDB
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            const data =
                snapshot.data();


            populateFarmerProfile({

                ...defaultProfile,

                ...data

            });

        } else {

            populateFarmerProfile(
                defaultProfile
            );

        }

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );


        populateFarmerProfile(
            defaultProfile
        );

    }

}


/* =========================================================
   19. POPULATE FARMER PROFILE
========================================================= */

function populateFarmerProfile(profile) {

    const name =
        profile.name ||
        profile.displayName ||
        "Farmer";


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
        profile.village || "—"
    );

    setText(
        "summaryLand",
        profile.landArea || "—"
    );

    setText(
        "summaryMarket",
        profile.preferredMarket || "—"
    );


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        profile.email || "—"
    );


    setValue(
        "profileName",
        name
    );

    setValue(
        "profileEmail",
        profile.email || ""
    );

    setValue(
        "profileMobile",
        profile.mobile || ""
    );

    setValue(
        "profileVillage",
        profile.village || ""
    );

    setValue(
        "profileState",
        profile.state || ""
    );

    setValue(
        "profileLandArea",
        profile.landArea || ""
    );

    setValue(
        "profileMarket",
        profile.preferredMarket || ""
    );

    setValue(
        "profileLanguage",
        profile.preferredLanguage ||
        selectedLanguage
    );

}


/* =========================================================
   20. GET INPUT VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   21. MESSAGE SYSTEM
========================================================= */

function showMessage(
    id,
    message,
    type = "info"
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.classList.remove(
        "success-message",
        "error-message",
        "info-message"
    );


    if (type === "success") {

        element.classList.add(
            "success-message"
        );

    } else if (type === "error") {

        element.classList.add(
            "error-message"
        );

    } else {

        element.classList.add(
            "info-message"
        );

    }

}


function clearMessage(id) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            "";

        element.classList.remove(
            "success-message",
            "error-message",
            "info-message"
        );

    }

}


/* =========================================================
   22. SIDEBAR
========================================================= */

function setupSidebar() {

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


    document
        .querySelectorAll(
            ".side-navigation [data-section]"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        showSection(
                            button.getAttribute(
                                "data-section"
                            )
                        );

                    }
                );

            }
        );

}


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
   23. PROFILE MENU
========================================================= */

function setupProfileMenu() {

    const button =
        document.getElementById(
            "profileButton"
        );

    const menu =
        document.getElementById(
            "profileMenu"
        );


    if (button) {

        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                if (menu) {

                    menu.classList.toggle(
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
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        showSection(
                            button.getAttribute(
                                "data-profile-section"
                            )
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function(event) {

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
   24. QUICK ACTIONS / GENERAL SECTION BUTTONS
========================================================= */

function setupSectionButtons() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(
            function(button) {

                if (
                    button.closest(
                        ".side-navigation"
                    ) ||
                    button.hasAttribute(
                        "data-profile-section"
                    )
                ) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function() {

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

            }
        );

}


/* =========================================================
   25. LANGUAGE SELECT EVENTS
========================================================= */

function setupLanguageSelectors() {

    const selectors = [

        "dashboardLanguage",

        "settingsLanguage",

        "profileLanguage",

        "registerLanguage"

    ];


    selectors.forEach(
        function(id) {

            const select =
                document.getElementById(
                    id
                );


            if (!select) {
                return;
            }


            select.addEventListener(
                "change",
                async function() {

                    const language =
                        select.value;


                    translatePage(
                        language
                    );


                    if (
                        id ===
                        "profileLanguage"
                    ) {

                        selectedLanguage =
                            language;

                    }


                    if (
                        id ===
                        "settingsLanguage"
                    ) {

                        selectedLanguage =
                            language;

                    }


                    if (
                        currentUser &&
                        !isDemoMode &&
                        id !==
                        "registerLanguage"
                    ) {

                        await saveLanguagePreference(
                            language
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   26. SAVE LANGUAGE PREFERENCE
========================================================= */

async function saveLanguagePreference(
    language
) {

    if (
        !currentUser ||
        !window.smartAgriDB
    ) {
        return;
    }


    try {

        await window.smartAgriDB
            .collection("farmers")
            .doc(currentUser.uid)
            .set(
                {
                    preferredLanguage:
                        language
                },
                {
                    merge: true
                }
            );

    } catch (error) {

        console.error(
            "Language save error:",
            error
        );

    }

}


/* =========================================================
   27. PROFILE EDIT
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

    const form =
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
            disableProfileEditing
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            saveProfile
        );

    }

}


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


    fields.forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.disabled =
                    false;
            }

        }
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


    fields.forEach(
        function(id) {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.disabled =
                    true;
            }

        }
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


async function saveProfile(event) {

    event.preventDefault();


    const profile = {

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

        preferredLanguage:
            getValue("profileLanguage")

    };


    if (isDemoMode) {

        populateFarmerProfile(
            profile
        );

        selectedLanguage =
            profile.preferredLanguage;

        translatePage(
            selectedLanguage
        );

        disableProfileEditing();

        showMessage(
            "profileMessage",
            "Profile updated in demo mode.",
            "success"
        );

        return;

    }


    if (
        !currentUser ||
        !window.smartAgriDB
    ) {

        showMessage(
            "profileMessage",
            "You must be logged in to save your profile.",
            "error"
        );

        return;

    }


    try {

        await window.smartAgriDB
            .collection("farmers")
            .doc(currentUser.uid)
            .set(
                profile,
                {
                    merge: true
                }
            );


        if (
            currentUser.updateProfile &&
            profile.name
        ) {

            await currentUser
                .updateProfile({
                    displayName:
                        profile.name
                });

        }


        populateFarmerProfile(
            profile
        );


        selectedLanguage =
            profile.preferredLanguage;


        translatePage(
            selectedLanguage
        );


        disableProfileEditing();


        showMessage(
            "profileMessage",
            "Profile saved successfully.",
            "success"
        );

    } catch (error) {

        console.error(
            error
        );


        showMessage(
            "profileMessage",
            error.message ||
            "Unable to save profile.",
            "error"
        );

    }

}


/* =========================================================
   28. LOGOUT
========================================================= */

function setupLogout() {

    const buttons = [

        document.getElementById(
            "sideLogoutBtn"
        ),

        document.getElementById(
            "profileLogoutBtn"
        )

    ];


    buttons.forEach(
        function(button) {

            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                logoutUser
            );

        }
    );

}


async function logoutUser() {

    isDemoMode =
        false;

    currentUser =
        null;


    if (
        window.smartAgriAuth
    ) {

        try {

            await window.smartAgriAuth
                .signOut();

        } catch (error) {

            console.error(
                error
            );

        }

    }


    closeSideMenu();

    closeProfileMenu();


    showPage(
        "loginPage"
    );

}


/* =========================================================
   29. WEATHER
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

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const data =
        document.getElementById(
            "weatherData"
        );

    const error =
        document.getElementById(
            "weatherError"
        );


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }

    if (empty) {
        empty.classList.add(
            "hidden"
        );
    }

    if (data) {
        data.classList.add(
            "hidden"
        );
    }

    if (error) {
        error.classList.add(
            "hidden"
        );
    }


    /*
       No weather API was provided in the HTML/config.
       Therefore this function does NOT invent live weather data.
    */

    setTimeout(
        function() {

            if (loading) {
                loading.classList.add(
                    "hidden"
                );
            }

            if (empty) {
                empty.classList.remove(
                    "hidden"
                );
            }

        },
        400
    );

}


/* =========================================================
   30. MARKET PRICES
========================================================= */

function setupMarket() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (selector) {

        selector.addEventListener(
            "change",
            function() {

                loadMarketPrices(
                    selector.value
                );

            }
        );

    }

}


function loadMarketPrices(
    crop
) {

    const loading =
        document.getElementById(
            "marketLoading"
        );

    const error =
        document.getElementById(
            "marketError"
        );

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (loading) {
        loading.classList.add(
            "hidden"
        );
    }


    if (error) {
        error.classList.add(
            "hidden"
        );
    }


    /*
       No verified market API was provided.
       Keep the exact "data unavailable" state
       rather than showing fake prices.
    */

    if (tableBody) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="table-empty">

                        <span>📊</span>

                        <strong>
                            ${
                                translations[
                                    selectedLanguage
                                ].marketDataUnavailable
                            }
                        </strong>

                        <p>
                            ${
                                translations[
                                    selectedLanguage
                                ].marketDataUnavailableDescription
                            }
                        </p>

                    </div>

                </td>

            </tr>

        `;

    }

}


/* =========================================================
   31. MARKET COMPARISON
========================================================= */

function setupMarketComparison() {

    /*
       No verified market API is currently connected.
       Keep comparison cards in unavailable state.
    */

    document
        .querySelectorAll(
            ".market-card"
        )
        .forEach(
            function(card) {

                const price =
                    card.querySelector(
                        ".comparison-price"
                    );

                if (price) {
                    price.textContent =
                        "—";
                }

            }
        );

}


/* =========================================================
   32. CROP HEALTH IMAGE
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


    if (input) {

        input.addEventListener(
            "change",
            function() {

                const file =
                    input.files &&
                    input.files[0];


                if (!file) {
                    return;
                }


                selectedCropImage =
                    file;


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
        );

    }


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeCrop
        );

    }

}


function analyzeCrop() {

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    if (!result) {
        return;
    }


    result.innerHTML = `

        <strong>
            ${translations[selectedLanguage].analysisNotConnected}
        </strong>

        <p>
            ${translations[selectedLanguage].analysisNotConnectedDescription}
        </p>

    `;

}


/* =========================================================
   33. GOVERNMENT SCHEMES
========================================================= */

function setupGovernmentSchemes() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

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

            }
        );

}


/* =========================================================
   34. AI ASSISTANT
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
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "aiInput"
                );


            const question =
                input
                    ? input.value.trim()
                    : "";


            if (!question) {
                return;
            }


            addChatMessage(
                question,
                "user"
            );


            if (input) {
                input.value = "";
            }


            setTimeout(
                function() {

                    addChatMessage(
                        translations[
                            selectedLanguage
                        ].aiUnavailable,
                        "assistant"
                    );

                },
                300
            );

        }
    );

}


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


    if (type === "user") {

        wrapper.innerHTML = `

            <div>

                <strong>
                    Farmer
                </strong>

                <p></p>

            </div>

        `;

    } else {

        wrapper.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    ${translations[selectedLanguage].assistant}
                </strong>

                <p></p>

            </div>

        `;

    }


    const paragraph =
        wrapper.querySelector(
            "p"
        );


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
   35. VOICE ASSISTANCE
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


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (
        SpeechRecognition
    ) {

        recognition =
            new SpeechRecognition();

        recognition.continuous =
            false;

        recognition.interimResults =
            false;

        recognition.lang =
            getSpeechLanguage();


        recognition.onstart =
            function() {

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
            function(event) {

                const transcript =
                    event.results[0][0]
                        .transcript;


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
                        getVoiceResponse(
                            transcript
                        );

                }

            };


        recognition.onerror =
            function(error) {

                console.error(
                    "Voice recognition error:",
                    error
                );

            };


        recognition.onend =
            function() {

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
            function() {

                if (!recognition) {

                    const response =
                        document.getElementById(
                            "voiceResponse"
                        );

                    if (response) {

                        response.textContent =
                            "Voice recognition is not supported by this browser.";

                    }

                    return;

                }


                recognition.lang =
                    getSpeechLanguage();


                try {

                    recognition.start();

                } catch (error) {

                    console.error(
                        error
                    );

                }

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function() {

                if (recognition) {

                    recognition.stop();

                }

            }
        );

    }

}


/* =========================================================
   36. SPEECH LANGUAGE
========================================================= */

function getSpeechLanguage() {

    if (selectedLanguage === "hi") {
        return "hi-IN";
    }

    if (selectedLanguage === "mr") {
        return "mr-IN";
    }

    return "en-IN";

}


/* =========================================================
   37. VOICE RESPONSE
========================================================= */

function getVoiceResponse(
    question
) {

    if (selectedLanguage === "hi") {

        return "आपका प्रश्न प्राप्त हुआ है। AI सेवा कनेक्ट होने के बाद विस्तृत उत्तर दिया जाएगा।";

    }


    if (selectedLanguage === "mr") {

        return "तुमचा प्रश्न प्राप्त झाला आहे. AI सेवा कनेक्ट केल्यानंतर सविस्तर उत्तर दिले जाईल.";

    }


    return "Your question was received. A detailed answer will be available once the AI service is connected.";

}


/* =========================================================
   38. SETTINGS
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

        const savedVoice =
            localStorage.getItem(
                "smartAgriVoice"
            );


        if (savedVoice !== null) {

            voiceSetting.checked =
                savedVoice === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function() {

                localStorage.setItem(
                    "smartAgriVoice",
                    voiceSetting.checked
                );

            }
        );

    }


    if (notificationSetting) {

        const savedNotification =
            localStorage.getItem(
                "smartAgriNotifications"
            );


        if (savedNotification !== null) {

            notificationSetting.checked =
                savedNotification === "true";

        }


        notificationSetting.addEventListener(
            "change",
            function() {

                localStorage.setItem(
                    "smartAgriNotifications",
                    notificationSetting.checked
                );

            }
        );

    }

}


/* =========================================================
   39. FIREBASE AUTH STATE
========================================================= */

function setupAuthState() {

    if (!window.smartAgriAuth) {
        return;
    }


    window.smartAgriAuth
        .onAuthStateChanged(
            async function(user) {

                if (!user) {
                    return;
                }


                if (isDemoMode) {
                    return;
                }


                currentUser =
                    user;


                await loadUserProfile(
                    user
                );

            }
        );

}


/* =========================================================
   40. CROP INFORMATION MODAL
========================================================= */

function setupCropInformationModal() {

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

    const modalIcon =
        document.getElementById(
            "cropInfoModalIcon"
        );

    const modalTitle =
        document.getElementById(
            "cropInfoModalTitle"
        );

    const modalSubtitle =
        document.getElementById(
            "cropInfoModalSubtitle"
        );

    const modalBody =
        document.getElementById(
            "cropInfoModalBody"
        );


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
                        planting material. Maintain appropriate spacing
                        between plants and rows.
                    </p>

                    <h3>💧 Irrigation</h3>

                    <p>
                        Maintain adequate soil moisture during crop growth.
                        Avoid excessive irrigation and waterlogging.
                    </p>

                    <h3>☀️ Field Conditions</h3>

                    <p>
                        Provide adequate sunlight and maintain good air
                        circulation around the crop.
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
                        Maintain consistent soil moisture, especially during
                        bulb development. Avoid excessive irrigation.
                    </p>

                    <h3>🌿 Weed Management</h3>

                    <p>
                        Keep the field free from weeds because weeds compete
                        with onion plants for water, nutrients and sunlight.
                    </p>

                    <h3>🧪 Nutrient Management</h3>

                    <p>
                        Apply nutrients according to soil condition,
                        soil testing and locally recommended practices.
                    </p>

                    <h3>🔍 Crop Monitoring</h3>

                    <p>
                        Inspect plants regularly for pests, diseases,
                        yellowing leaves and abnormal growth.
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
                        Remove diseased plant material and maintain clean
                        cultivation areas.
                    </p>

                    <h3>🌱 Healthy Planting Material</h3>

                    <p>
                        Start with healthy and disease-free seedlings
                        or planting material.
                    </p>

                    <h3>🔄 Crop Rotation</h3>

                    <p>
                        Rotate crops when practical to support soil health
                        and reduce recurring crop problems.
                    </p>

                    <h3>📦 Harvest Management</h3>

                    <p>
                        Harvest bulbs at suitable maturity and cure them
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
                        Prepare a well-levelled and properly prepared seedbed
                        with suitable soil moisture for uniform germination.
                    </p>

                    <h3>🌾 Seed Selection</h3>

                    <p>
                        Use healthy, quality seed varieties recommended
                        for the local growing region.
                    </p>

                    <h3>💧 Irrigation</h3>

                    <p>
                        Irrigate according to crop growth stage, soil moisture
                        and weather conditions.
                    </p>

                    <h3>☀️ Crop Conditions</h3>

                    <p>
                        Wheat generally performs well under suitable cool
                        growing conditions with adequate sunlight.
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
                        Pay particular attention to irrigation during
                        important crop growth stages.
                    </p>

                    <h3>🌿 Weed Control</h3>

                    <p>
                        Monitor fields for weeds and use appropriate
                        integrated weed-management practices.
                    </p>

                    <h3>🔍 Pest Monitoring</h3>

                    <p>
                        Inspect the crop regularly for insects, disease
                        symptoms and abnormal plant growth.
                    </p>

                    <h3>🧪 Nutrient Management</h3>

                    <p>
                        Apply fertilizers according to soil testing and
                        recommended crop requirements.
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
                        Follow the locally recommended sowing period for
                        the selected wheat variety and growing region.
                    </p>

                    <h3>🚜 Field Preparation</h3>

                    <p>
                        Maintain a level and properly prepared seedbed
                        to support uniform crop establishment.
                    </p>

                    <h3>🔄 Crop Rotation</h3>

                    <p>
                        Crop rotation can help with soil management and
                        reduce recurring crop-related problems.
                    </p>

                    <h3>🌾 Harvesting</h3>

                    <p>
                        Harvest when the crop reaches appropriate maturity
                        and grain moisture is suitable for harvesting
                        and storage.
                    </p>

                `

            }

        }

    };


    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const crop =
                            button.getAttribute(
                                "data-crop"
                            );

                        const topic =
                            button.getAttribute(
                                "data-topic"
                            );


                        if (
                            !crop ||
                            !topic ||
                            !cropInformation[crop] ||
                            !cropInformation[crop][topic]
                        ) {

                            return;

                        }


                        const cropData =
                            cropInformation[crop];

                        const topicData =
                            cropData[topic];


                        if (modalIcon) {
                            modalIcon.textContent =
                                cropData.icon;
                        }

                        if (modalTitle) {
                            modalTitle.textContent =
                                topicData.title;
                        }

                        if (modalSubtitle) {
                            modalSubtitle.textContent =
                                topicData.subtitle;
                        }

                        if (modalBody) {
                            modalBody.innerHTML =
                                topicData.content;
                        }

                        if (modal) {
                            modal.classList.remove(
                                "hidden"
                            );
                        }

                        document.body.classList.add(
                            "modal-open"
                        );

                    }
                );

            }
        );


    function closeModal() {

        if (modal) {

            modal.classList.add(
                "hidden"
            );

        }

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
        function(event) {

            if (
                event.key === "Escape" &&
                modal &&
                !modal.classList.contains(
                    "hidden"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   41. DASHBOARD INITIALIZATION
========================================================= */

function setupDashboard() {

    setupSidebar();

    setupProfileMenu();

    setupSectionButtons();

    setupLanguageSelectors();

    setupProfile();

    setupLogout();

    setupWeather();

    setupMarket();

    setupMarketComparison();

    setupCropHealth();

    setupGovernmentSchemes();

    setupAI();

    setupVoice();

    setupSettings();

    setupCropInformationModal();

}


/* =========================================================
   42. APPLICATION START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "SmartAgri JavaScript started."
        );


        /*
           Restore saved language.
        */

        const savedLanguage =
            localStorage.getItem(
                "smartAgriLanguage"
            );


        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {

            selectedLanguage =
                savedLanguage;

        } else {

            selectedLanguage =
                "en";

        }


        setupLanguagePage();

        setupLogin();

        setupRegistration();

        setupDashboard();

        setupAuthState();


        translatePage(
            selectedLanguage
        );


        updateConnectionStatus();


        /*
           Keep dashboard hidden until login/demo.
        */

        const dashboard =
            document.getElementById(
                "dashboardPage"
            );


        if (
            dashboard &&
            !dashboard.classList.contains(
                "active-screen"
            )
        ) {

            /*
               CSS normally controls this.
               We do not force display:none here
               because the user's existing CSS may
               already handle dashboard visibility.
            */

        }


        /*
           Initial market state.
        */

        loadMarketPrices(
            "onion"
        );


        console.log(
            "SmartAgri initialization complete."
        );

    }
);
