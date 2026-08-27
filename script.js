/* =========================================================
   SMARTAGRI - COMPLETE SCRIPT.JS
   =========================================================
   Features:
   - Firebase Authentication
   - Demo Dashboard
   - Login / Register / Logout
   - Navigation
   - Online / Offline status
   - English / Hindi / Marathi language switching
   - Weather API using Open-Meteo
   - Market price handling
   - Crop information modal
   - Multilingual crop information
   - Profile
   - Settings
   - Voice assistance
   - Government schemes
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

let isDemoMode = false;

let weatherLoaded = false;


/* =========================================================
   LANGUAGE DICTIONARY
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

        governmentSchemes:
            "Government Schemes",

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

        continue:
            "जारी रखें",

        loginTitle:
            "किसान लॉगिन",

        loginSubtitle:
            "स्मार्टएग्री का उपयोग करने के लिए लॉगिन करें",

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
            "पंजीकरण करें",

        changeLanguage:
            "भाषा बदलें",

        registrationTitle:
            "किसान पंजीकरण",

        registrationSubtitle:
            "अपना स्मार्टएग्री किसान खाता बनाएं",

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
            "कोपरगांव एपीएमसी",

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
            "एआई सहायक",

        voiceAssistance:
            "वॉयस सहायता",

        farmerProfile:
            "किसान प्रोफाइल",

        settings:
            "सेटिंग्स",

        about:
            "स्मार्टएग्री के बारे में",

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
            "महत्वपूर्ण कृषि उपकरणों को जल्दी से एक्सेस करें।",

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
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ है।",

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
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले कनेक्टेड बाजार जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन संबंधी जानकारी।",

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
            "एआई सहायता से विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

        uploadCropImage:
            "फसल / पत्ती की तस्वीर अपलोड करें",

        uploadCropDescription:
            "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",

        chooseImage:
            "तस्वीर चुनें",

        analyzeCrop:
            "फसल का विश्लेषण करें",

        analysisNotConnected:
            "एआई फसल विश्लेषण कनेक्ट नहीं है",

        analysisNotConnectedDescription:
            "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य एआई सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि कार्यक्रम।",

        pmKisanDescription:
            "आधिकारिक पीएम-किसान किसान सहायता जानकारी।",

        pmksyDescription:
            "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना की जानकारी।",

        learnMore:
            "अधिक जानकारी",

        aiSubtitle:
            "कृषि से जुड़े प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "एआई कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "एआई सेवा अभी कनेक्ट नहीं है।",

        askQuestion:
            "कृषि से संबंधित प्रश्न पूछें...",

        aiConnectionNote:
            "एआई उत्तरों के लिए कनेक्टेड एआई सेवा/बैकएंड आवश्यक है।",

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

        voiceResponse:
            "वॉयस उत्तर",

        voiceReady:
            "वॉयस सहायता तैयार है।",

        voiceInputPlaceholder:
            "वॉयस इनपुट यहां दिखाई देगा...",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "परिवर्तन सहेजें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "अपनी स्मार्टएग्री प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "वॉयस सहायता को सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाओं को सक्षम या अक्षम करें।",

        aboutDescription:
            "स्मार्टएग्री किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता उपलब्ध कराने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार जानकारी",

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
            "स्मार्टअ‍ॅग्री वापरण्यासाठी लॉगिन करा",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe:
            "मला लक्षात ठेवा",

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
            "तुमचे स्मार्टअ‍ॅग्री शेतकरी खाते तयार करा",

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
            "पसंतीचा बाजार",

        selectMarket:
            "बाजार निवडा",

        kopargaonMarket:
            "कोपरगाव एपीएमसी",

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
            "पीक माहिती",

        cropHealth:
            "पीक आरोग्य",

        governmentSchemes:
            "सरकारी योजना",

        aiAssistant:
            "एआय सहाय्यक",

        voiceAssistance:
            "व्हॉइस सहाय्य",

        farmerProfile:
            "शेतकरी प्रोफाइल",

        settings:
            "सेटिंग्ज",

        about:
            "स्मार्टअ‍ॅग्री बद्दल",

        logout:
            "लॉगआउट",

        myProfile:
            "माझे प्रोफाइल",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        welcome:
            "स्वागत आहे",

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
            "महत्त्वाची शेतीची साधने पटकन वापरा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामानाची माहिती.",

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
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांमधून सध्याचे पीक बाजारभाव.",

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

        onion:
            "कांदा",

        wheat:
            "गहू",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्री करण्यापूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

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
            "एआय विश्लेषणासाठी पिकाची प्रतिमा अपलोड करा.",

        uploadCropImage:
            "पीक / पानाची प्रतिमा अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी प्रतिमा निवडा.",

        chooseImage:
            "प्रतिमा निवडा",

        analyzeCrop:
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "एआय पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य एआय सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी कार्यक्रम.",

        pmKisanDescription:
            "अधिकृत पीएम-किसान शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

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
            "एआय कनेक्ट केलेले नाही",

        assistant:
            "सहाय्यक",

        aiUnavailable:
            "एआय सेवा अद्याप कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "एआय उत्तरांसाठी कनेक्टेड एआय सेवा/बॅकएंड आवश्यक आहे.",

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

        voiceResponse:
            "व्हॉइस उत्तर",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "तुमच्या स्मार्टअ‍ॅग्री प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अ‍ॅप्लिकेशन भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सक्षम किंवा अक्षम करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अ‍ॅप्लिकेशन सूचना सक्षम किंवा अक्षम करा.",

        aboutDescription:
            "स्मार्टअ‍ॅग्री शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य"

    }

};


/* =========================================================
   CROP MODAL TRANSLATIONS
========================================================= */

const cropModalData = {

    en: {

        onion: {

            cultivation: {

                title: "Onion Cultivation Guidance",

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

                title: "Onion Crop Management",

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

                title: "Onion Farming Practices",

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

            cultivation: {

                title: "Wheat Cultivation Guidance",

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

                title: "Wheat Crop Management",

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

                title: "Wheat Farming Practices",

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

    },


    hi: {

        onion: {

            cultivation: {

                title: "प्याज की खेती का मार्गदर्शन",

                subtitle:
                    "सफल प्याज की खेती के लिए महत्वपूर्ण चरण।",

                content: `

                    <h3>🌱 भूमि की तैयारी</h3>

                    <p>
                        अच्छी जल निकासी वाली महीन और भुरभुरी क्यारी तैयार करें।
                        प्याज ढीली और अच्छी जल निकासी वाली मिट्टी में अच्छी तरह बढ़ता है।
                    </p>

                    <h3>🌱 रोपाई</h3>

                    <p>
                        स्वस्थ और रोगमुक्त पौध या उपयुक्त रोपण सामग्री का उपयोग करें।
                        पौधों और कतारों के बीच उचित दूरी बनाए रखें।
                    </p>

                    <h3>💧 सिंचाई</h3>

                    <p>
                        फसल की वृद्धि के दौरान मिट्टी में पर्याप्त नमी बनाए रखें।
                        अत्यधिक सिंचाई और जलभराव से बचें।
                    </p>

                    <h3>☀️ खेत की स्थिति</h3>

                    <p>
                        फसल को पर्याप्त धूप दें और पौधों के आसपास अच्छी
                        वायु परिसंचरण बनाए रखें।
                    </p>

                `

            },

            management: {

                title: "प्याज फसल प्रबंधन",

                subtitle:
                    "पूरी फसल अवधि के दौरान फसल का उचित प्रबंधन करें।",

                content: `

                    <h3>💧 जल प्रबंधन</h3>

                    <p>
                        विशेष रूप से कंद बनने के समय मिट्टी में लगातार नमी बनाए रखें।
                        अत्यधिक सिंचाई से बचें।
                    </p>

                    <h3>🌿 खरपतवार प्रबंधन</h3>

                    <p>
                        खेत को खरपतवार से मुक्त रखें क्योंकि खरपतवार पानी,
                        पोषक तत्वों और सूर्य के प्रकाश के लिए फसल से प्रतिस्पर्धा करते हैं।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>

                    <p>
                        मिट्टी की स्थिति, मिट्टी परीक्षण और स्थानीय अनुशंसाओं
                        के अनुसार पोषक तत्वों का प्रयोग करें।
                    </p>

                    <h3>🔍 फसल निरीक्षण</h3>

                    <p>
                        कीट, रोग, पत्तियों का पीला होना और असामान्य वृद्धि
                        के लिए नियमित रूप से फसल का निरीक्षण करें।
                    </p>

                `

            },

            practices: {

                title: "प्याज की खेती की पद्धतियां",

                subtitle:
                    "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।",

                content: `

                    <h3>🚜 खेत की स्वच्छता</h3>

                    <p>
                        रोगग्रस्त पौधों को हटाएं और खेत को साफ रखें।
                    </p>

                    <h3>🌱 स्वस्थ रोपण सामग्री</h3>

                    <p>
                        स्वस्थ और रोगमुक्त पौध या रोपण सामग्री से शुरुआत करें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>

                    <p>
                        जहां संभव हो वहां फसल चक्र अपनाएं ताकि मिट्टी का स्वास्थ्य
                        बेहतर रहे और बार-बार होने वाली समस्याएं कम हों।
                    </p>

                    <h3>📦 कटाई प्रबंधन</h3>

                    <p>
                        उचित परिपक्वता पर प्याज की कटाई करें और भंडारण से पहले
                        उन्हें अच्छी तरह सुखाएं।
                    </p>

                `

            }

        },

        wheat: {

            cultivation: {

                title: "गेहूं की खेती का मार्गदर्शन",

                subtitle:
                    "सफल गेहूं उत्पादन के लिए महत्वपूर्ण चरण।",

                content: `

                    <h3>🌱 मिट्टी की तैयारी</h3>

                    <p>
                        समान अंकुरण के लिए उचित नमी वाली समतल और अच्छी तरह
                        तैयार की गई बीज क्यारी बनाएं।
                    </p>

                    <h3>🌾 बीज का चयन</h3>

                    <p>
                        स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और गुणवत्तापूर्ण
                        गेहूं के बीज का उपयोग करें।
                    </p>

                    <h3>💧 सिंचाई</h3>

                    <p>
                        फसल की अवस्था, मिट्टी की नमी और मौसम की स्थिति के अनुसार
                        सिंचाई करें।
                    </p>

                    <h3>☀️ फसल की स्थिति</h3>

                    <p>
                        गेहूं उचित ठंडी परिस्थितियों, पर्याप्त धूप और अनुकूल
                        वातावरण में अच्छी तरह बढ़ता है।
                    </p>

                `

            },

            management: {

                title: "गेहूं फसल प्रबंधन",

                subtitle:
                    "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",

                content: `

                    <h3>💧 सिंचाई प्रबंधन</h3>

                    <p>
                        फसल की महत्वपूर्ण वृद्धि अवस्थाओं के दौरान सिंचाई
                        पर विशेष ध्यान दें।
                    </p>

                    <h3>🌿 खरपतवार नियंत्रण</h3>

                    <p>
                        खेत में खरपतवार की निगरानी करें और उचित एकीकृत
                        खरपतवार प्रबंधन अपनाएं।
                    </p>

                    <h3>🔍 कीट निगरानी</h3>

                    <p>
                        कीटों, रोगों के लक्षणों और असामान्य वृद्धि के लिए
                        नियमित रूप से फसल का निरीक्षण करें।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>

                    <p>
                        मिट्टी परीक्षण और फसल की अनुशंसित आवश्यकताओं के
                        अनुसार उर्वरक का प्रयोग करें।
                    </p>

                `

            },

            practices: {

                title: "गेहूं की खेती की पद्धतियां",

                subtitle:
                    "स्वस्थ गेहूं की फसल के लिए व्यावहारिक तरीके।",

                content: `

                    <h3>🌱 समय पर बुवाई</h3>

                    <p>
                        चुनी गई गेहूं की किस्म और क्षेत्र के लिए अनुशंसित
                        बुवाई अवधि का पालन करें।
                    </p>

                    <h3>🚜 खेत की तैयारी</h3>

                    <p>
                        समान फसल स्थापना के लिए खेत को समतल और अच्छी तरह तैयार रखें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>

                    <p>
                        फसल चक्र मिट्टी के प्रबंधन में मदद कर सकता है और
                        बार-बार होने वाली फसल समस्याओं को कम कर सकता है।
                    </p>

                    <h3>🌾 कटाई</h3>

                    <p>
                        उचित परिपक्वता पर कटाई करें और सुनिश्चित करें कि
                        अनाज की नमी कटाई और भंडारण के लिए उपयुक्त हो।
                    </p>

                `

            }

        }

    },


    mr: {

        onion: {

            cultivation: {

                title: "कांदा लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी कांदा लागवडीसाठी महत्त्वाचे टप्पे.",

                content: `

                    <h3>🌱 जमीन तयार करणे</h3>

                    <p>
                        भुसभुशीत आणि चांगला निचरा होणारी जमीन तयार करा.
                        कांदा चांगला निचरा होणाऱ्या सैल जमिनीत चांगला वाढतो.
                    </p>

                    <h3>🌱 लागवड</h3>

                    <p>
                        निरोगी आणि रोगमुक्त रोपे किंवा योग्य लागवड साहित्य वापरा.
                        रोपांमध्ये आणि ओळींमध्ये योग्य अंतर ठेवा.
                    </p>

                    <h3>💧 सिंचन</h3>

                    <p>
                        पिकाच्या वाढीच्या काळात जमिनीत पुरेसा ओलावा ठेवा.
                        जास्त पाणी देणे आणि पाणी साचणे टाळा.
                    </p>

                    <h3>☀️ शेताची परिस्थिती</h3>

                    <p>
                        पिकाला पुरेसा सूर्यप्रकाश मिळेल याची काळजी घ्या आणि
                        पिकामध्ये चांगले हवा खेळती राहू द्या.
                    </p>

                `

            },

            management: {

                title: "कांदा पीक व्यवस्थापन",

                subtitle:
                    "संपूर्ण पीक कालावधीत योग्य व्यवस्थापन करा.",

                content: `

                    <h3>💧 पाणी व्यवस्थापन</h3>

                    <p>
                        विशेषतः कांद्याची गाठ तयार होताना जमिनीत नियमित ओलावा ठेवा.
                        जास्त पाणी देणे टाळा.
                    </p>

                    <h3>🌿 तण व्यवस्थापन</h3>

                    <p>
                        शेत तणमुक्त ठेवा कारण तण पाणी, अन्नद्रव्ये आणि
                        सूर्यप्रकाशासाठी पिकाशी स्पर्धा करतात.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>

                    <p>
                        जमिनीची स्थिती, माती परीक्षण आणि स्थानिक शिफारशींनुसार
                        अन्नद्रव्यांचा वापर करा.
                    </p>

                    <h3>🔍 पीक निरीक्षण</h3>

                    <p>
                        किडी, रोग, पाने पिवळी होणे आणि असामान्य वाढ यासाठी
                        पिकाची नियमित तपासणी करा.
                    </p>

                `

            },

            practices: {

                title: "कांदा शेती पद्धती",

                subtitle:
                    "चांगल्या कांदा उत्पादनासाठी व्यावहारिक सूचना.",

                content: `

                    <h3>🚜 शेताची स्वच्छता</h3>

                    <p>
                        रोगग्रस्त झाडे काढून टाका आणि शेत स्वच्छ ठेवा.
                    </p>

                    <h3>🌱 निरोगी लागवड साहित्य</h3>

                    <p>
                        निरोगी आणि रोगमुक्त रोपे किंवा लागवड साहित्य वापरा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>

                    <p>
                        शक्य असल्यास पीक फेरपालट करा. यामुळे जमिनीचे आरोग्य
                        सुधारण्यास आणि वारंवार होणाऱ्या समस्या कमी करण्यास मदत होते.
                    </p>

                    <h3>📦 काढणी व्यवस्थापन</h3>

                    <p>
                        योग्य परिपक्वतेवर कांद्याची काढणी करा आणि साठवणुकीपूर्वी
                        कांदा योग्य प्रकारे वाळवा.
                    </p>

                `

            }

        },

        wheat: {

            cultivation: {

                title: "गहू लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे.",

                content: `

                    <h3>🌱 जमिनीची तयारी</h3>

                    <p>
                        एकसारखी उगवण होण्यासाठी योग्य ओलावा असलेली समतल
                        आणि व्यवस्थित तयार केलेली जमीन तयार करा.
                    </p>

                    <h3>🌾 बियाण्यांची निवड</h3>

                    <p>
                        स्थानिक क्षेत्रासाठी शिफारस केलेले निरोगी आणि
                        दर्जेदार बियाणे वापरा.
                    </p>

                    <h3>💧 सिंचन</h3>

                    <p>
                        पिकाची वाढीची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार
                        सिंचन करा.
                    </p>

                    <h3>☀️ पिकाची परिस्थिती</h3>

                    <p>
                        योग्य थंड हवामान, पुरेसा सूर्यप्रकाश आणि अनुकूल
                        परिस्थितीत गहू चांगला वाढतो.
                    </p>

                `

            },

            management: {

                title: "गहू पीक व्यवस्थापन",

                subtitle:
                    "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा.",

                content: `

                    <h3>💧 सिंचन व्यवस्थापन</h3>

                    <p>
                        पिकाच्या महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे
                        विशेष लक्ष द्या.
                    </p>

                    <h3>🌿 तण नियंत्रण</h3>

                    <p>
                        शेतातील तणांची नियमित पाहणी करा आणि योग्य
                        एकात्मिक तण व्यवस्थापन पद्धती वापरा.
                    </p>

                    <h3>🔍 किडींचे निरीक्षण</h3>

                    <p>
                        किडी, रोगांची लक्षणे आणि असामान्य वाढ यासाठी
                        पिकाची नियमित तपासणी करा.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>

                    <p>
                        माती परीक्षण आणि पिकाच्या शिफारस केलेल्या गरजेनुसार
                        खतांचा वापर करा.
                    </p>

                `

            },

            practices: {

                title: "गहू शेती पद्धती",

                subtitle:
                    "निरोगी गहू पिकासाठी व्यावहारिक पद्धती.",

                content: `

                    <h3>🌱 वेळेवर पेरणी</h3>

                    <p>
                        निवडलेल्या गव्हाच्या जातीसाठी आणि स्थानिक क्षेत्रासाठी
                        शिफारस केलेल्या पेरणीच्या कालावधीचे पालन करा.
                    </p>

                    <h3>🚜 शेताची तयारी</h3>

                    <p>
                        पिकाची एकसारखी वाढ होण्यासाठी जमीन समतल आणि
                        व्यवस्थित तयार ठेवा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>

                    <p>
                        पीक फेरपालट केल्यामुळे जमिनीचे व्यवस्थापन सुधारण्यास
                        आणि वारंवार होणाऱ्या समस्या कमी करण्यास मदत होते.
                    </p>

                    <h3>🌾 काढणी</h3>

                    <p>
                        पीक योग्य परिपक्वतेवर आल्यावर काढणी करा आणि धान्याची
                        आर्द्रता काढणी व साठवणुकीसाठी योग्य असल्याची खात्री करा.
                    </p>

                `

            }

        }

    }

};


/* =========================================================
   HELPER
========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   TRANSLATION FUNCTION
========================================================= */

function t(key) {

    const language =
        translations[currentLanguage] || translations.en;

    return language[key] || translations.en[key] || key;
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


    /* -----------------------------------------------------
       NORMAL TEXT
    ----------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (!key) return;

            const translated =
                t(key);

            if (translated !== undefined) {

                element.textContent =
                    translated;

            }

        });


    /* -----------------------------------------------------
       PLACEHOLDERS
    ----------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            element.placeholder =
                t(key);

        });


    /* -----------------------------------------------------
       LANGUAGE SELECTORS
    ----------------------------------------------------- */

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("registerLanguage"),
        $("profileLanguage")

    ];

    selectors.forEach(function (select) {

        if (select) {

            select.value =
                currentLanguage;

        }

    });


    /* -----------------------------------------------------
       SELECT MARKET OPTIONS
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            'option[data-i18n]'
        )
        .forEach(function (option) {

            const key =
                option.getAttribute("data-i18n");

            if (key) {

                option.textContent =
                    t(key);

            }

        });


    /* -----------------------------------------------------
       LANGUAGE PAGE BUTTONS
    ----------------------------------------------------- */

    document
        .querySelectorAll(".language-option")
        .forEach(function (button) {

            button.classList.toggle(
                "selected",
                button.dataset.language ===
                    currentLanguage
            );

        });


    /* -----------------------------------------------------
       REFRESH CROP MODAL IF OPEN
    ----------------------------------------------------- */

    refreshOpenCropModal();

}


/* =========================================================
   LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const buttons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        $("continueLanguageBtn");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                });

                button.classList.add(
                    "selected"
                );

                currentLanguage =
                    button.dataset.language;

                localStorage.setItem(
                    "smartAgriLanguage",
                    currentLanguage
                );

                applyLanguage(
                    currentLanguage
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

                if (!currentLanguage) {
                    currentLanguage = "en";
                }

                localStorage.setItem(
                    "smartAgriLanguage",
                    currentLanguage
                );

                applyLanguage(
                    currentLanguage
                );

                showScreen("loginPage");

            }
        );

    }

}


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove(
                "active-screen"
            );

        });


    const screen =
        $(screenId);

    if (screen) {

        screen.classList.add(
            "active-screen"
        );

    }

}


/* =========================================================
   DEMO FARMER
========================================================= */

const demoFarmer = {

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
   LOAD DEMO DASHBOARD
========================================================= */

function loadDemoDashboard() {

    isDemoMode = true;

    currentUser = null;

    populateFarmerData(
        demoFarmer
    );

    showDashboard();

    console.log(
        "Demo dashboard opened."
    );

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

    const loginPage =
        $("loginPage");

    const registerPage =
        $("registerPage");

    const languagePage =
        $("languagePage");

    if (loginPage) {
        loginPage.classList.remove(
            "active-screen"
        );
    }

    if (registerPage) {
        registerPage.classList.remove(
            "active-screen"
        );
    }

    if (languagePage) {
        languagePage.classList.remove(
            "active-screen"
        );
    }

    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

        dashboard.style.display =
            "block";

    }

    applyLanguage(
        currentLanguage
    );

    updateConnectionStatus();

    showSection(
        "dashboardSection"
    );

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


    const section =
        $(sectionId);

    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    closeSideMenu();

    closeProfileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "weatherSection") {

        loadWeather();

    }

}


/* =========================================================
   SETUP NAVIGATION
========================================================= */

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

                    if (section) {

                        showSection(
                            section
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

                    const section =
                        button.getAttribute(
                            "data-profile-section"
                        );

                    if (section) {

                        showSection(
                            section
                        );

                    }

                }
            );

        });

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    const menu =
        $("sideMenu");

    const overlay =
        $("menuOverlay");

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
        $("sideMenu");

    const overlay =
        $("menuOverlay");

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


function setupSideMenu() {

    const hamburger =
        $("hamburgerBtn");

    const close =
        $("closeMenuBtn");

    const overlay =
        $("menuOverlay");


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            openSideMenu
        );

    }


    if (close) {

        close.addEventListener(
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


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    const menu =
        $("profileMenu");

    if (menu) {

        menu.classList.toggle(
            "open"
        );

    }

}


function closeProfileMenu() {

    const menu =
        $("profileMenu");

    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const connectionStatus =
        $("connectionStatus");

    const connectionText =
        $("connectionText");

    const dashboardConnectionText =
        $("dashboardConnectionText");


    if (connectionStatus) {

        connectionStatus.classList.toggle(
            "offline",
            !online
        );

        connectionStatus.classList.toggle(
            "online",
            online
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

}


/* =========================================================
   PROFILE DATA
========================================================= */

function populateFarmerData(data) {

    if (!data) return;


    const name =
        data.name || "Demo Farmer";

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


    const fields = {

        dashboardFarmerName: name,

        headerFarmerName: name,

        summaryName: name,

        summaryVillage: village,

        summaryLand: landArea,

        summaryMarket: market,

        profilePageName: name,

        profilePageEmail: email,

        profileName: name,

        profileEmail: email,

        profileMobile: mobile,

        profileVillage: village,

        profileState: state,

        profileLandArea: landArea

    };


    Object.keys(fields).forEach(
        function (id) {

            const element =
                $(id);

            if (element) {

                if (
                    element.tagName ===
                    "INPUT"
                ) {

                    element.value =
                        fields[id];

                } else {

                    element.textContent =
                        fields[id];

                }

            }

        }
    );


    const profileMarket =
        $("profileMarket");

    if (profileMarket) {

        profileMarket.value =
            market;

    }


    const profileLanguage =
        $("profileLanguage");

    if (profileLanguage) {

        profileLanguage.value =
            data.language ||
            currentLanguage;

    }


    const registerLanguage =
        $("registerLanguage");

    if (registerLanguage) {

        registerLanguage.value =
            data.language ||
            currentLanguage;

    }

}


/* =========================================================
   DEMO BUTTON
========================================================= */

function setupDemoButton() {

    const demoButton =
        $("demoBtn");

    if (!demoButton) return;


    demoButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            loadDemoDashboard();

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        $("loginForm");

    if (!loginForm) return;


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                $("loginEmail")?.value.trim();

            const password =
                $("loginPassword")?.value;


            const message =
                $("loginMessage");


            if (!email || !password) {

                showMessage(
                    message,
                    t("email") +
                    " / " +
                    t("password"),
                    "error"
                );

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

                showMessage(
                    message,
                    "Logging in...",
                    "info"
                );


                const result =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                isDemoMode = false;

                currentUser =
                    result.user;


                await loadFirestoreProfile(
                    currentUser
                );


                showMessage(
                    message,
                    "",
                    "success"
                );


                showDashboard();


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                let errorText =
                    "Login failed.";

                if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    errorText =
                        "Account not found.";

                } else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    errorText =
                        "Incorrect password.";

                } else if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    errorText =
                        "Invalid email or password.";

                } else if (
                    error.message
                ) {

                    errorText =
                        error.message;

                }


                showMessage(
                    message,
                    errorText,
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   REGISTER
========================================================= */

function setupRegistration() {

    const form =
        $("registrationForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                $("registerName")?.value.trim();

            const email =
                $("registerEmail")?.value.trim();

            const mobile =
                $("registerMobile")?.value.trim();

            const village =
                $("registerVillage")?.value.trim();

            const state =
                $("registerState")?.value.trim();

            const landArea =
                $("registerLandArea")?.value.trim();

            const preferredMarket =
                $("registerMarket")?.value;

            const language =
                $("registerLanguage")?.value ||
                currentLanguage;

            const password =
                $("registerPassword")?.value;


            const message =
                $("registerMessage");


            if (!auth) {

                showMessage(
                    message,
                    "Firebase is not available.",
                    "error"
                );

                return;

            }


            try {

                showMessage(
                    message,
                    "Creating account...",
                    "info"
                );


                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    result.user;


                const farmerData = {

                    name,

                    email,

                    mobile,

                    village,

                    state,

                    landArea,

                    preferredMarket,

                    language,

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                if (db) {

                    await db
                        .collection("farmers")
                        .doc(user.uid)
                        .set(
                            farmerData,
                            {
                                merge: true
                            }
                        );

                }


                currentUser =
                    user;

                isDemoMode =
                    false;


                currentLanguage =
                    language;


                localStorage.setItem(
                    "smartAgriLanguage",
                    currentLanguage
                );


                populateFarmerData(
                    farmerData
                );


                applyLanguage(
                    currentLanguage
                );


                showDashboard();


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showMessage(
                    message,
                    error.message ||
                    "Registration failed.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   LOAD FIRESTORE PROFILE
========================================================= */

async function loadFirestoreProfile(user) {

    if (!user) return;


    const defaultData = {

        name:
            user.displayName ||
            "Farmer",

        email:
            user.email || "",

        mobile: "",

        village: "",

        state: "",

        landArea: "",

        preferredMarket: "",

        language:
            currentLanguage

    };


    if (!db) {

        populateFarmerData(
            defaultData
        );

        return;

    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            const data =
                snapshot.data();

            populateFarmerData({
                ...defaultData,
                ...data
            });

            if (data.language) {

                currentLanguage =
                    data.language;

            }

        } else {

            populateFarmerData(
                defaultData
            );

        }


        applyLanguage(
            currentLanguage
        );


    } catch (error) {

        console.error(
            "Firestore profile error:",
            error
        );


        populateFarmerData(
            defaultData
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (auth && !isDemoMode) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    currentUser =
        null;

    isDemoMode =
        false;


    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.remove(
            "active-screen"
        );

    }


    showScreen(
        "loginPage"
    );

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function setupForgotPassword() {

    const button =
        $("forgotPasswordBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        async function () {

            const email =
                $("loginEmail")?.value.trim();

            const message =
                $("loginMessage");


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
                    error.message ||
                    "Unable to send reset email.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   MESSAGE HELPER
========================================================= */

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


/* =========================================================
   WEATHER
   Open-Meteo - no API key required
========================================================= */

async function loadWeather() {

    const loading =
        $("weatherLoading");

    const errorBox =
        $("weatherError");

    const empty =
        $("weatherEmptyState");

    const dataBox =
        $("weatherData");


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }

    if (errorBox) {
        errorBox.classList.add(
            "hidden"
        );
        errorBox.textContent = "";
    }

    if (empty) {
        empty.classList.add(
            "hidden"
        );
    }


    try {

        const latitude =
            19.8823;

        const longitude =
            74.4762;


        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation" +
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
                "Weather API request failed."
            );

        }


        const weather =
            await response.json();


        if (
            !weather.current
        ) {

            throw new Error(
                "Weather data unavailable."
            );

        }


        const current =
            weather.current;


        const temperature =
            current.temperature_2m;


        const humidity =
            current.relative_humidity_2m;


        const wind =
            current.wind_speed_10m;


        let rainChance = 0;


        if (
            weather.hourly &&
            weather.hourly.precipitation_probability
        ) {

            const probabilities =
                weather.hourly
                    .precipitation_probability;

            const times =
                weather.hourly.time || [];


            const now =
                new Date();


            let closestIndex =
                0;

            let smallestDifference =
                Infinity;


            times.forEach(
                function (time, index) {

                    const date =
                        new Date(time);

                    const difference =
                        Math.abs(
                            date.getTime() -
                            now.getTime()
                        );

                    if (
                        difference <
                        smallestDifference
                    ) {

                        smallestDifference =
                            difference;

                        closestIndex =
                            index;

                    }

                }
            );


            rainChance =
                probabilities[
                    closestIndex
                ] ?? 0;

        }


        const temperatureElement =
            $("weatherTemperature");

        const humidityElement =
            $("weatherHumidity");

        const windElement =
            $("weatherWind");

        const rainElement =
            $("weatherRain");


        if (temperatureElement) {

            temperatureElement.textContent =
                `${temperature} °C`;

        }


        if (humidityElement) {

            humidityElement.textContent =
                `${humidity}%`;

        }


        if (windElement) {

            windElement.textContent =
                `${wind} km/h`;

        }


        if (rainElement) {

            rainElement.textContent =
                `${rainChance}%`;

        }


        if (dataBox) {

            dataBox.classList.remove(
                "hidden"
            );

        }


        weatherLoaded =
            true;


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );


        if (dataBox) {

            dataBox.classList.add(
                "hidden"
            );

        }


        if (errorBox) {

            errorBox.textContent =
                "Unable to load weather data.";

            errorBox.classList.remove(
                "hidden"
            );

        }


        if (empty) {

            empty.classList.remove(
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
   WEATHER REFRESH
========================================================= */

function setupWeather() {

    const button =
        $("refreshWeatherBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            loadWeather();

        }
    );

}


/* =========================================================
   MARKET DATA
========================================================= */

const marketData = {

    onion: [

        {
            market: "Kopargaon APMC",
            crop: "Onion",
            price: "₹2,800 / quintal",
            date: "Latest available"
        },

        {
            market: "Yeola Market",
            crop: "Onion",
            price: "₹2,900 / quintal",
            date: "Latest available"
        },

        {
            market: "Shirdi Market",
            crop: "Onion",
            price: "₹2,750 / quintal",
            date: "Latest available"
        }

    ],

    wheat: [

        {
            market: "Kopargaon APMC",
            crop: "Wheat",
            price: "₹2,400 / quintal",
            date: "Latest available"
        },

        {
            market: "Yeola Market",
            crop: "Wheat",
            price: "₹2,350 / quintal",
            date: "Latest available"
        },

        {
            market: "Shirdi Market",
            crop: "Wheat",
            price: "₹2,380 / quintal",
            date: "Latest available"
        }

    ]

};


/* =========================================================
   MARKET TABLE
========================================================= */

function renderMarketTable() {

    const selector =
        $("cropPriceSelector");

    const body =
        $("marketTableBody");


    if (!selector || !body) return;


    const crop =
        selector.value || "onion";


    const rows =
        marketData[crop] || [];


    body.innerHTML =
        "";


    rows.forEach(
        function (row) {

            const tr =
                document.createElement(
                    "tr"
                );


            tr.innerHTML = `

                <td>${escapeHTML(row.market)}</td>

                <td>${escapeHTML(
                    crop === "onion"
                        ? t("onion")
                        : t("wheat")
                )}</td>

                <td>${escapeHTML(row.price)}</td>

                <td>${escapeHTML(row.date)}</td>

            `;


            body.appendChild(
                tr
            );

        }
    );


    updateComparisonCards(
        crop
    );

}


/* =========================================================
   COMPARISON CARDS
========================================================= */

function updateComparisonCards(crop) {

    const rows =
        marketData[crop] || [];


    document
        .querySelectorAll(
            "[data-market-card]"
        )
        .forEach(
            function (card) {

                const marketName =
                    card.getAttribute(
                        "data-market-card"
                    );


                const match =
                    rows.find(
                        function (row) {

                            return (
                                row.market ===
                                marketName
                            );

                        }
                    );


                const price =
                    card.querySelector(
                        ".comparison-price"
                    );


                const status =
                    card.querySelector(
                        ".comparison-status"
                    );


                if (match) {

                    if (price) {

                        price.textContent =
                            match.price;

                    }


                    if (status) {

                        status.textContent =
                            match.date;

                    }

                } else {

                    if (price) {

                        price.textContent =
                            "—";

                    }


                    if (status) {

                        status.textContent =
                            t("dataUnavailable");

                    }

                }

            }
        );

}


/* =========================================================
   MARKET SELECTOR
========================================================= */

function setupMarkets() {

    const selector =
        $("cropPriceSelector");


    if (!selector) return;


    selector.addEventListener(
        "change",
        renderMarketTable
    );


    renderMarketTable();

}


/* =========================================================
   CROP MODAL
========================================================= */

let activeCropModalCrop =
    null;

let activeCropModalTopic =
    null;


/* =========================================================
   RENDER CROP MODAL
========================================================= */

function renderCropModal(
    crop,
    topic
) {

    const modal =
        $("cropInfoModal");

    const icon =
        $("cropInfoModalIcon");

    const title =
        $("cropInfoModalTitle");

    const subtitle =
        $("cropInfoModalSubtitle");

    const body =
        $("cropInfoModalBody");


    if (
        !modal ||
        !icon ||
        !title ||
        !subtitle ||
        !body
    ) {

        return;

    }


    const languageData =
        cropModalData[
            currentLanguage
        ] || cropModalData.en;


    const cropData =
        languageData[crop];


    if (
        !cropData ||
        !cropData[topic]
    ) {

        return;

    }


    const topicData =
        cropData[topic];


    const cropIcon =
        crop === "onion"
            ? "🧅"
            : "🌾";


    activeCropModalCrop =
        crop;

    activeCropModalTopic =
        topic;


    icon.textContent =
        cropIcon;

    title.textContent =
        topicData.title;

    subtitle.textContent =
        topicData.subtitle;

    body.innerHTML =
        topicData.content;


    modal.classList.remove(
        "hidden"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   REFRESH OPEN MODAL
========================================================= */

function refreshOpenCropModal() {

    const modal =
        $("cropInfoModal");


    if (
        !modal ||
        modal.classList.contains(
            "hidden"
        )
    ) {

        return;

    }


    if (
        activeCropModalCrop &&
        activeCropModalTopic
    ) {

        renderCropModal(
            activeCropModalCrop,
            activeCropModalTopic
        );

    }

}


/* =========================================================
   CLOSE CROP MODAL
========================================================= */

function closeCropModal() {

    const modal =
        $("cropInfoModal");


    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }


    document.body.classList.remove(
        "modal-open"
    );


    activeCropModalCrop =
        null;

    activeCropModalTopic =
        null;

}


/* =========================================================
   SETUP CROP MODAL
========================================================= */

function setupCropModal() {

    /*
       IMPORTANT:

       The HTML you provided already contains an older
       crop-modal script.

       This script intentionally attaches another handler
       so our multilingual content replaces the old English
       content after it runs.
    */


    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(
            function (button) {

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


                        renderCropModal(
                            crop,
                            topic
                        );

                    }
                );

            }
        );


    const closeButton =
        $("closeCropInfoBtn");


    const overlay =
        $("cropInfoModalOverlay");


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
                event.key === "Escape"
            ) {

                const modal =
                    $("cropInfoModal");


                if (
                    modal &&
                    !modal.classList.contains(
                        "hidden"
                    )
                ) {

                    closeCropModal();

                }

            }

        }
    );

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function setupSchemes() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(
            function (button) {

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

            }
        );

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function setupProfile() {

    const editButton =
        $("editProfileBtn");

    const cancelButton =
        $("cancelProfileEditBtn");

    const form =
        $("profileForm");

    const actions =
        $("profileEditActions");


    const editableFields = [

        $("profileName"),
        $("profileMobile"),
        $("profileVillage"),
        $("profileState"),
        $("profileLandArea"),
        $("profileMarket"),
        $("profileLanguage")

    ];


    function setEditing(
        editing
    ) {

        editableFields.forEach(
            function (field) {

                if (field) {

                    field.disabled =
                        !editing;

                }

            }
        );


        if (actions) {

            actions.classList.toggle(
                "hidden",
                !editing
            );

        }

    }


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                setEditing(
                    true
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                if (
                    isDemoMode
                ) {

                    populateFarmerData(
                        demoFarmer
                    );

                } else if (
                    currentUser
                ) {

                    loadFirestoreProfile(
                        currentUser
                    );

                }

                setEditing(
                    false
                );

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
                        $("profileName")?.value.trim(),

                    mobile:
                        $("profileMobile")?.value.trim(),

                    village:
                        $("profileVillage")?.value.trim(),

                    state:
                        $("profileState")?.value.trim(),

                    landArea:
                        $("profileLandArea")?.value.trim(),

                    preferredMarket:
                        $("profileMarket")?.value,

                    language:
                        $("profileLanguage")?.value ||
                        currentLanguage

                };


                if (
                    isDemoMode
                ) {

                    Object.assign(
                        demoFarmer,
                        updatedData
                    );


                    currentLanguage =
                        updatedData.language;


                    localStorage.setItem(
                        "smartAgriLanguage",
                        currentLanguage
                    );


                    populateFarmerData(
                        demoFarmer
                    );

                    applyLanguage(
                        currentLanguage
                    );

                    setEditing(
                        false
                    );

                    return;

                }


                if (
                    currentUser &&
                    db
                ) {

                    try {

                        await db
                            .collection("farmers")
                            .doc(
                                currentUser.uid
                            )
                            .set(
                                updatedData,
                                {
                                    merge: true
                                }
                            );


                        currentLanguage =
                            updatedData.language;


                        localStorage.setItem(
                            "smartAgriLanguage",
                            currentLanguage
                        );


                        populateFarmerData(
                            updatedData
                        );


                        applyLanguage(
                            currentLanguage
                        );


                        const message =
                            $("profileMessage");


                        showMessage(
                            message,
                            "Profile updated successfully.",
                            "success"
                        );


                        setEditing(
                            false
                        );


                    } catch (error) {

                        console.error(
                            "Profile update error:",
                            error
                        );


                        showMessage(
                            $("profileMessage"),
                            error.message ||
                            "Unable to update profile.",
                            "error"
                        );

                    }

                }

            }
        );

    }


    setEditing(
        false
    );

}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function setupLanguageSelectors() {

    const dashboardLanguage =
        $("dashboardLanguage");


    const settingsLanguage =
        $("settingsLanguage");


    const registerLanguage =
        $("registerLanguage");


    const profileLanguage =
        $("profileLanguage");


    function changeLanguage(
        language
    ) {

        if (!language) return;


        applyLanguage(
            language
        );


        if (
            currentUser &&
            db
        ) {

            db.collection("farmers")
                .doc(currentUser.uid)
                .set(
                    {
                        language
                    },
                    {
                        merge: true
                    }
                )
                .catch(
                    function (error) {

                        console.error(
                            "Language save error:",
                            error
                        );

                    }
                );

        }

    }


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            function () {

                changeLanguage(
                    dashboardLanguage.value
                );

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            function () {

                changeLanguage(
                    settingsLanguage.value
                );

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function () {

                changeLanguage(
                    registerLanguage.value
                );

            }
        );

    }


    if (profileLanguage) {

        profileLanguage.addEventListener(
            "change",
            function () {

                changeLanguage(
                    profileLanguage.value
                );

            }
        );

    }

}


/* =========================================================
   CHANGE LANGUAGE FROM LOGIN
========================================================= */

function setupLoginLanguageButton() {

    const button =
        $("changeLanguageFromLogin");


    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            showScreen(
                "languagePage"
            );

        }
    );

}


/* =========================================================
   REGISTER / LOGIN NAVIGATION
========================================================= */

function setupAuthNavigation() {

    const showRegister =
        $("showRegisterBtn");

    const showLogin =
        $("showLoginBtn");


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

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function setupLogoutButtons() {

    const sideLogout =
        $("sideLogoutBtn");

    const profileLogout =
        $("profileLogoutBtn");


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

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

function setupProfileMenu() {

    const button =
        $("profileButton");


    if (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleProfileMenu();

            }
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            const menu =
                $("profileMenu");

            const button =
                $("profileButton");


            if (
                menu &&
                button &&
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                closeProfileMenu();

            }

        }
    );

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let speechRecognition =
    null;


function setupVoice() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");

    const input =
        $("voiceInput");

    const response =
        $("voiceResponse");

    const setting =
        $("voiceSetting");


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
            getSpeechLanguage();


        speechRecognition.onstart =
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


        speechRecognition.onresult =
            function (event) {

                const transcript =
                    event.results[0][0].transcript;


                if (input) {

                    input.value =
                        transcript;

                }


                if (response) {

                    response.textContent =
                        transcript;

                }

            };


        speechRecognition.onend =
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


        speechRecognition.onerror =
            function (event) {

                console.error(
                    "Voice recognition error:",
                    event.error
                );

                if (response) {

                    response.textContent =
                        "Voice recognition error.";

                }

            };

    }


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                if (
                    setting &&
                    !setting.checked
                ) {

                    return;

                }


                if (!speechRecognition) {

                    if (response) {

                        response.textContent =
                            "Voice recognition is not supported in this browser.";

                    }

                    return;

                }


                speechRecognition.lang =
                    getSpeechLanguage();


                speechRecognition.start();

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function () {

                if (
                    speechRecognition
                ) {

                    speechRecognition.stop();

                }

            }
        );

    }

}


/* =========================================================
   SPEECH LANGUAGE
========================================================= */

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
   SETTINGS
========================================================= */

function setupSettings() {

    const voiceSetting =
        $("voiceSetting");

    const notificationSetting =
        $("notificationSetting");


    if (voiceSetting) {

        const saved =
            localStorage.getItem(
                "smartAgriVoice"
            );


        if (
            saved !== null
        ) {

            voiceSetting.checked =
                saved === "true";

        }


        voiceSetting.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "smartAgriVoice",
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


        if (
            saved !== null
        ) {

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
   CROP IMAGE
========================================================= */

function setupCropHealth() {

    const input =
        $("cropImageInput");

    const previewContainer =
        $("imagePreviewContainer");

    const preview =
        $("cropImagePreview");

    const analyzeButton =
        $("analyzeCropBtn");


    if (!input) return;


    input.addEventListener(
        "change",
        function () {

            const file =
                input.files?.[0];


            if (!file) {

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


                    if (previewContainer) {

                        previewContainer.classList.remove(
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
            function () {

                const result =
                    $("cropAnalysisResult");


                if (!result) return;


                result.innerHTML = `

                    <strong>
                        ${escapeHTML(
                            t("analysisNotConnected")
                        )}
                    </strong>

                    <p>
                        ${escapeHTML(
                            t("analysisNotConnectedDescription")
                        )}
                    </p>

                `;

            }
        );

    }

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function setupAI() {

    const form =
        $("aiForm");

    const input =
        $("aiInput");

    const messages =
        $("chatMessages");


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
                "chat-message";


            userMessage.innerHTML = `

                <div class="chat-avatar">
                    👨‍🌾
                </div>

                <div>

                    <strong>
                        ${escapeHTML(
                            currentUser?.displayName ||
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


            input.value =
                "";


            messages.scrollTop =
                messages.scrollHeight;

        }
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

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
   ONLINE / OFFLINE EVENTS
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
   FIREBASE AUTH STATE
========================================================= */

function setupFirebaseAuth() {

    if (!auth) {

        return;

    }


    auth.onAuthStateChanged(
        async function (user) {

            if (!user) {

                return;

            }


            currentUser =
                user;

            isDemoMode =
                false;


            await loadFirestoreProfile(
                user
            );


            showDashboard();

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri initializing..."
        );


        /* -------------------------------------------------
           LANGUAGE
        ------------------------------------------------- */

        applyLanguage(
            currentLanguage
        );


        setupLanguagePage();

        setupLanguageSelectors();


        /* -------------------------------------------------
           AUTH
        ------------------------------------------------- */

        setupDemoButton();

        setupLogin();

        setupRegistration();

        setupForgotPassword();

        setupAuthNavigation();

        setupLoginLanguageButton();

        setupLogoutButtons();


        /* -------------------------------------------------
           NAVIGATION
        ------------------------------------------------- */

        setupNavigation();

        setupSideMenu();

        setupProfileMenu();


        /* -------------------------------------------------
           WEATHER
        ------------------------------------------------- */

        setupWeather();


        /* -------------------------------------------------
           MARKET
        ------------------------------------------------- */

        setupMarkets();


        /* -------------------------------------------------
           CROP
        ------------------------------------------------- */

        setupCropModal();


        /* -------------------------------------------------
           OTHER FEATURES
        ------------------------------------------------- */

        setupSchemes();

        setupProfile();

        setupVoice();

        setupSettings();

        setupCropHealth();

        setupAI();


        /* -------------------------------------------------
           CONNECTION
        ------------------------------------------------- */

        updateConnectionStatus();


        /* -------------------------------------------------
           FIREBASE
        ------------------------------------------------- */

        setupFirebaseAuth();


        /* -------------------------------------------------
           INITIAL SCREEN
        ------------------------------------------------- */

        const dashboard =
            $("dashboardPage");


        if (
            dashboard &&
            !dashboard.classList.contains(
                "active-screen"
            )
        ) {

            dashboard.style.display =
                "";

        }


        /*
           If no saved language exists,
           start at language page.
        */

        const savedLanguage =
            localStorage.getItem(
                "smartAgriLanguage"
            );


        if (!savedLanguage) {

            showScreen(
                "languagePage"
            );

        } else {

            applyLanguage(
                savedLanguage
            );


            /*
               Do not automatically open dashboard
               unless Firebase has a logged-in user.
            */

            if (
                !currentUser &&
                !isDemoMode
            ) {

                const dashboard =
                    $("dashboardPage");

                if (dashboard) {

                    dashboard.classList.remove(
                        "active-screen"
                    );

                }

            }

        }


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);
