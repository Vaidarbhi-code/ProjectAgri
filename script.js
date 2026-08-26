/* =========================================================
   SMARTAGRI
   Main Frontend JavaScript
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

let firebaseReady = false;
let auth = null;
let db = null;

try {

    firebase.initializeApp(firebaseConfig);

    auth = firebase.auth();
    db = firebase.firestore();

    firebaseReady = true;

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization failed:", error);

}


/* =========================================================
   BACKEND CONFIGURATION
========================================================= */

/*
    IMPORTANT:

    Change this when your Flask backend is running.

    Local Flask:
        http://127.0.0.1:5000

    Example production:
        https://your-backend-domain.com
*/

const API_BASE_URL = "http://127.0.0.1:5000";


/* =========================================================
   APPLICATION STATE
========================================================= */

const appState = {

    selectedLanguage: localStorage.getItem("smartagriLanguage") || "en",

    currentUser: null,

    farmerProfile: null,

    isDemo: false,

    currentSection: "dashboardSection",

    marketData: [],

    weatherData: null,

    selectedCrop: "onion"

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

        dataUnavailable:
            "Verified data unavailable",

        comparisonSubtitle:
            "Compare connected market information before selling.",

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
            "SmartAgri में प्रवेश करें",

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

        welcome:
            "स्वागत है",

        dashboardSubtitle:
            "आपकी कृषि जानकारी एक जगह।",

        connectionStatus:
            "कनेक्शन स्थिति",

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
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

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
            "आर्द्रता",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "सत्यापित स्रोतों से वर्तमान फसल भाव।",

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
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

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
            "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",

        learnMore:
            "अधिक जानकारी",

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
            "आवाज सहायता सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाएं सक्षम या अक्षम करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता"

    },


    mr: {

        appName: "स्मार्टअॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "आपली भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी आपली पसंतीची भाषा निवडा.",

        continue:
            "पुढे जा",

        loginTitle:
            "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri मध्ये लॉगिन करा",

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
            "मोबाईल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमीन क्षेत्र",

        preferredMarket:
            "पसंतीचा बाजार",

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
            "आपली शेतीची माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "आपली नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची शेती साधने पटकन उघडा.",

        liveDataTitle:
            "लाइव्ह डेटा",

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
            "सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",

        marketPriceTable:
            "बाजारभाव तक्ता",

        onion:
            "कांदा",

        wheat:
            "गहू",

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

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

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
            "AI उत्तरांसाठी कनेक्टेड AI सेवा/बॅकएंड आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट आवाज सहाय्य",

        voiceDescription:
            "आपल्या डिव्हाइसचा मायक्रोफोन वापरा.",

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
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "आपल्या SmartAgri पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "आपली पसंतीची अॅप भाषा निवडा.",

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


/* =========================================================
   DOM HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function showElement(element) {

    if (!element) return;

    element.classList.remove("hidden");
}


function hideElement(element) {

    if (!element) return;

    element.classList.add("hidden");
}


function setMessage(element, message, type = "error") {

    if (!element) return;

    element.textContent = message;

    element.style.color =
        type === "success"
            ? "#1E7A4C"
            : "#B45309";
}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function translatePage(language) {

    if (!translations[language]) {
        language = "en";
    }

    appState.selectedLanguage = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );

    document.documentElement.lang = language;

    const dictionary = translations[language];

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (dictionary[key]) {
                element.textContent = dictionary[key];
            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key = element.dataset.i18nPlaceholder;

            if (dictionary[key]) {
                element.placeholder = dictionary[key];
            }

        });


    syncLanguageSelectors(language);

    updateLanguageButtons(language);
}


function syncLanguageSelectors(language) {

    const selectors = [

        $("dashboardLanguage"),
        $("settingsLanguage"),
        $("registerLanguage"),
        $("profileLanguage")

    ];

    selectors.forEach(select => {

        if (select && select.value !== language) {
            select.value = language;
        }

    });
}


function updateLanguageButtons(language) {

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language === language
            );

        });

    const continueButton = $("continueLanguageBtn");

    if (continueButton) {
        continueButton.disabled = !language;
    }
}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active-screen");

        });


    const screen = $(screenId);

    if (screen) {
        screen.classList.add("active-screen");
    }


    const dashboard = $("dashboardPage");

    if (screenId === "dashboardPage") {

        dashboard.classList.add("active-screen");

    } else {

        dashboard.classList.remove("active-screen");

    }
}


function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active-screen");

        });


    $("dashboardPage").classList.add("active-screen");

    appState.isDemo = false;

    loadDashboardProfile();

    showSection("dashboardSection");

    updateConnectionStatus();

    refreshWeather();

    loadMarketPrices();

}


function showDemoDashboard() {

    appState.isDemo = true;

    appState.currentUser = null;

    appState.farmerProfile = {

        uid: "demo-user",

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "9876543210",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "5 Acres",

        preferredMarket: "Kopargaon APMC",

        preferredLanguage:
            appState.selectedLanguage

    };


    showDashboard();

}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    const target = $(sectionId);

    if (!target) return;


    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove("active-section");

        });


    target.classList.add("active-section");

    appState.currentSection = sectionId;


    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === sectionId
            );

        });


    closeSideMenu();

    closeProfileMenu();


    if (sectionId === "weatherSection") {
        refreshWeather();
    }


    if (sectionId === "marketSection") {
        loadMarketPrices();
    }


    if (sectionId === "comparisonSection") {
        updateMarketComparison();
    }
}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    $("sideMenu").classList.add("open");
    $("menuOverlay").classList.add("open");

}


function closeSideMenu() {

    $("sideMenu").classList.remove("open");
    $("menuOverlay").classList.remove("open");

}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    $("profileMenu").classList.toggle("open");

}


function closeProfileMenu() {

    $("profileMenu").classList.remove("open");

}


/* =========================================================
   FIREBASE AUTH
========================================================= */

async function registerUser(event) {

    event.preventDefault();

    const message = $("registerMessage");

    const name = $("registerName").value.trim();
    const email = $("registerEmail").value.trim();
    const mobile = $("registerMobile").value.trim();
    const village = $("registerVillage").value.trim();
    const state = $("registerState").value.trim();
    const landArea = $("registerLandArea").value.trim();
    const preferredMarket = $("registerMarket").value;
    const preferredLanguage = $("registerLanguage").value;
    const password = $("registerPassword").value;


    if (!firebaseReady) {

        setMessage(
            message,
            "Firebase is not configured.",
            "error"
        );

        return;
    }


    try {

        setMessage(
            message,
            "Creating account...",
            "success"
        );


        const userCredential =
            await auth.createUserWithEmailAndPassword(
                email,
                password
            );


        const user = userCredential.user;


        await db
            .collection("farmers")
            .doc(user.uid)
            .set({

                uid: user.uid,

                name,

                email,

                mobile,

                village,

                state,

                landArea,

                preferredMarket,

                preferredLanguage,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        appState.currentUser = user;

        appState.selectedLanguage =
            preferredLanguage;

        translatePage(preferredLanguage);


        setMessage(
            message,
            "Account created successfully.",
            "success"
        );


        setTimeout(() => {

            showDashboard();

        }, 700);


    } catch (error) {

        console.error(error);

        setMessage(
            message,
            getFirebaseErrorMessage(error),
            "error"
        );

    }
}


async function loginUser(event) {

    event.preventDefault();

    const message = $("loginMessage");

    const email = $("loginEmail").value.trim();
    const password = $("loginPassword").value;


    if (!firebaseReady) {

        setMessage(
            message,
            "Firebase is not configured.",
            "error"
        );

        return;
    }


    try {

        setMessage(
            message,
            "Logging in...",
            "success"
        );


        const credential =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        appState.currentUser =
            credential.user;


        await loadFarmerProfile(
            credential.user.uid
        );


        showDashboard();


    } catch (error) {

        console.error(error);

        setMessage(
            message,
            getFirebaseErrorMessage(error),
            "error"
        );

    }
}


async function logoutUser() {

    closeSideMenu();
    closeProfileMenu();


    if (appState.isDemo) {

        appState.isDemo = false;
        appState.currentUser = null;
        appState.farmerProfile = null;

        showScreen("loginPage");

        return;
    }


    if (!firebaseReady) {

        showScreen("loginPage");

        return;
    }


    try {

        await auth.signOut();

        appState.currentUser = null;
        appState.farmerProfile = null;

        showScreen("loginPage");

    } catch (error) {

        console.error(
            "Logout failed:",
            error
        );

    }
}


async function resetPassword() {

    const email =
        $("loginEmail").value.trim();


    if (!email) {

        setMessage(
            $("loginMessage"),
            "Enter your email address first.",
            "error"
        );

        return;
    }


    try {

        await auth.sendPasswordResetEmail(email);

        setMessage(
            $("loginMessage"),
            "Password reset email sent.",
            "success"
        );

    } catch (error) {

        console.error(error);

        setMessage(
            $("loginMessage"),
            getFirebaseErrorMessage(error),
            "error"
        );

    }
}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    const code = error?.code || "";

    const messages = {

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Password should contain at least 6 characters.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Invalid email or password.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return messages[code] ||
        error?.message ||
        "Something went wrong.";
}


/* =========================================================
   FIRESTORE PROFILE
========================================================= */

async function loadFarmerProfile(uid) {

    if (!firebaseReady || !uid) {
        return null;
    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!snapshot.exists) {

            console.warn(
                "Farmer profile not found."
            );

            return null;
        }


        appState.farmerProfile = {

            uid,

            ...snapshot.data()

        };


        if (
            appState.farmerProfile.preferredLanguage
        ) {

            appState.selectedLanguage =
                appState.farmerProfile.preferredLanguage;

            translatePage(
                appState.selectedLanguage
            );

        }


        return appState.farmerProfile;


    } catch (error) {

        console.error(
            "Profile loading failed:",
            error
        );

        return null;

    }
}


async function loadDashboardProfile() {

    let profile =
        appState.farmerProfile;


    if (
        !profile &&
        appState.currentUser
    ) {

        profile =
            await loadFarmerProfile(
                appState.currentUser.uid
            );

    }


    if (!profile) {
        return;
    }


    setText(
        "headerFarmerName",
        profile.name || "Farmer"
    );

    setText(
        "dashboardFarmerName",
        profile.name || "Farmer"
    );

    setText(
        "summaryName",
        profile.name || "—"
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
        profile.name || "—"
    );

    setText(
        "profilePageEmail",
        profile.email || "—"
    );


    populateProfileForm(profile);
}


function setText(id, value) {

    const element = $(id);

    if (element) {
        element.textContent = value;
    }

}


function populateProfileForm(profile) {

    setValue(
        "profileName",
        profile.name
    );

    setValue(
        "profileEmail",
        profile.email
    );

    setValue(
        "profileMobile",
        profile.mobile
    );

    setValue(
        "profileVillage",
        profile.village
    );

    setValue(
        "profileState",
        profile.state
    );

    setValue(
        "profileLandArea",
        profile.landArea
    );

    setValue(
        "profileMarket",
        profile.preferredMarket
    );

    setValue(
        "profileLanguage",
        profile.preferredLanguage ||
        appState.selectedLanguage
    );

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


    fields.forEach(id => {

        const element = $(id);

        if (element) {
            element.disabled = false;
        }

    });


    showElement(
        $("profileEditActions")
    );

}


function disableProfileEditing() {

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


    fields.forEach(id => {

        const element = $(id);

        if (element) {
            element.disabled = true;
        }

    });


    hideElement(
        $("profileEditActions")
    );

}


async function saveProfile(event) {

    event.preventDefault();


    const message =
        $("profileMessage");


    const updatedProfile = {

        name:
            $("profileName").value.trim(),

        mobile:
            $("profileMobile").value.trim(),

        village:
            $("profileVillage").value.trim(),

        state:
            $("profileState").value.trim(),

        landArea:
            $("profileLandArea").value.trim(),

        preferredMarket:
            $("profileMarket").value,

        preferredLanguage:
            $("profileLanguage").value,

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    if (appState.isDemo) {

        appState.farmerProfile = {

            ...appState.farmerProfile,

            ...updatedProfile

        };


        translatePage(
            updatedProfile.preferredLanguage
        );


        await loadDashboardProfile();

        disableProfileEditing();

        setMessage(
            message,
            "Profile updated.",
            "success"
        );

        return;
    }


    if (
        !firebaseReady ||
        !appState.currentUser
    ) {

        setMessage(
            message,
            "Please login first.",
            "error"
        );

        return;
    }


    try {

        await db
            .collection("farmers")
            .doc(appState.currentUser.uid)
            .update(updatedProfile);


        appState.farmerProfile = {

            ...appState.farmerProfile,

            ...updatedProfile

        };


        translatePage(
            updatedProfile.preferredLanguage
        );


        await loadDashboardProfile();

        disableProfileEditing();


        setMessage(
            message,
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(error);

        setMessage(
            message,
            "Unable to save profile.",
            "error"
        );

    }
}


/* =========================================================
   WEATHER
========================================================= */

async function refreshWeather() {

    const emptyState =
        $("weatherEmptyState");

    const weatherData =
        $("weatherData");


    if (!emptyState || !weatherData) {
        return;
    }


    showElement(emptyState);
    hideElement(weatherData);


    try {

        const profile =
            appState.farmerProfile;


        /*
            Backend can determine the location from
            farmer profile.

            Expected response:

            {
                temperature: 28,
                humidity: 70,
                wind_speed: 12,
                rain_chance: 30
            }
        */


        const response =
            await fetch(
                `${API_BASE_URL}/api/weather`,
                {
                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {
            throw new Error(
                `Weather API returned ${response.status}`
            );
        }


        const data =
            await response.json();


        appState.weatherData = data;


        updateWeatherUI(data);


        hideElement(emptyState);
        showElement(weatherData);


    } catch (error) {

        console.error(
            "Weather request failed:",
            error
        );


        hideElement(weatherData);
        showElement(emptyState);

    }
}


function updateWeatherUI(data) {

    const temperature =
        getFirstAvailable(
            data,
            [
                "temperature",
                "temperature_c",
                "temp_c",
                "current_temperature"
            ]
        );


    const humidity =
        getFirstAvailable(
            data,
            [
                "humidity",
                "relative_humidity"
            ]
        );


    const wind =
        getFirstAvailable(
            data,
            [
                "wind_speed",
                "wind_speed_kmh",
                "wind"
            ]
        );


    const rain =
        getFirstAvailable(
            data,
            [
                "rain_chance",
                "rain_probability_pct",
                "precipitation_probability"
            ]
        );


    setText(
        "weatherTemperature",
        formatValue(
            temperature,
            "°C"
        )
    );


    setText(
        "weatherHumidity",
        formatValue(
            humidity,
            "%"
        )
    );


    setText(
        "weatherWind",
        formatValue(
            wind,
            " km/h"
        )
    );


    setText(
        "weatherRain",
        formatValue(
            rain,
            "%"
        )
    );

}


/* =========================================================
   MARKET PRICES
========================================================= */

async function loadMarketPrices() {

    const tableBody =
        $("marketTableBody");


    if (!tableBody) {
        return;
    }


    const crop =
        $("cropPriceSelector")?.value ||
        appState.selectedCrop ||
        "onion";


    appState.selectedCrop =
        crop;


    tableBody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>⏳</span>

                    <strong>Loading market data...</strong>

                    <p>
                        Connecting to verified market source.
                    </p>

                </div>

            </td>

        </tr>

    `;


    try {

        const commodity =
            crop === "onion"
                ? "Onion"
                : "Wheat";


        const url =
            `${API_BASE_URL}/api/market-prices` +
            `?commodity=${encodeURIComponent(commodity)}`;


        const response =
            await fetch(
                url,
                {
                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Market API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const records =
            Array.isArray(data)
                ? data
                : (
                    data.records ||
                    data.data ||
                    data.prices ||
                    []
                );


        appState.marketData =
            records;


        renderMarketTable(records);

        updateMarketComparison();


    } catch (error) {

        console.error(
            "Market API error:",
            error
        );


        appState.marketData = [];

        renderMarketUnavailable();

    }
}


function renderMarketTable(records) {

    const tableBody =
        $("marketTableBody");


    if (!tableBody) {
        return;
    }


    if (!records.length) {

        renderMarketUnavailable();

        return;
    }


    tableBody.innerHTML = "";


    records.forEach(record => {

        const row =
            document.createElement("tr");


        const market =
            record.market ||
            record.Market ||
            "—";


        const crop =
            record.commodity ||
            record.Commodity ||
            record.crop ||
            "—";


        const price =
            record.modal_price ??
            record.modalPrice ??
            record.price ??
            record.max_price ??
            "—";


        const date =
            record.date ||
            record.arrival_date ||
            record.Arrival_Date ||
            "—";


        row.innerHTML = `

            <td>${escapeHtml(market)}</td>

            <td>${escapeHtml(crop)}</td>

            <td>
                ${
                    price === "—"
                        ? "—"
                        : "₹" + escapeHtml(String(price))
                }
            </td>

            <td>${escapeHtml(String(date))}</td>

        `;


        tableBody.appendChild(row);

    });

}


function renderMarketUnavailable() {

    const tableBody =
        $("marketTableBody");


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${translations[
                            appState.selectedLanguage
                        ].marketDataUnavailable}
                    </strong>

                    <p>
                        ${translations[
                            appState.selectedLanguage
                        ].marketDataUnavailableDescription}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   MARKET COMPARISON
========================================================= */

function updateMarketComparison() {

    const cards =
        document.querySelectorAll(
            ".market-card"
        );


    if (!cards.length) {
        return;
    }


    const markets = [

        {
            name: "Kopargaon",
            keywords: [
                "kopargaon"
            ]
        },

        {
            name: "Yeola",
            keywords: [
                "yeola"
            ]
        },

        {
            name: "Shirdi",
            keywords: [
                "shirdi"
            ]
        }

    ];


    cards.forEach(
        (card, index) => {

            const market =
                markets[index];


            if (!market) return;


            const record =
                appState.marketData.find(
                    item => {

                        const name =
                            String(
                                item.market ||
                                item.Market ||
                                ""
                            ).toLowerCase();


                        return market.keywords.some(
                            keyword =>
                                name.includes(
                                    keyword
                                )
                        );

                    }
                );


            const value =
                card.querySelector(
                    ".market-value strong"
                );


            const status =
                card.querySelector(
                    ".market-card p"
                );


            if (!value || !status) {
                return;
            }


            if (record) {

                const price =
                    record.modal_price ??
                    record.modalPrice ??
                    record.price ??
                    record.max_price;


                value.textContent =
                    price != null
                        ? `₹${price}`
                        : "—";


                status.textContent =
                    record.date ||
                    record.arrival_date ||
                    "Verified market data";

            } else {

                value.textContent =
                    "—";


                status.textContent =
                    translations[
                        appState.selectedLanguage
                    ].dataUnavailable;

            }

        }
    );
}


/* =========================================================
   CROP SELECTOR
========================================================= */

function handleCropChange() {

    const selector =
        $("cropPriceSelector");


    if (!selector) {
        return;
    }


    appState.selectedCrop =
        selector.value;


    loadMarketPrices();

}


/* =========================================================
   CROP HEALTH IMAGE
========================================================= */

function handleCropImage(event) {

    const file =
        event.target.files?.[0];


    const preview =
        $("cropImagePreview");


    const container =
        $("imagePreviewContainer");


    const analyzeButton =
        $("analyzeCropBtn");


    if (!file) {

        hideElement(container);

        if (analyzeButton) {
            analyzeButton.disabled = true;
        }

        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please select an image file."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            preview.src =
                reader.result;

            showElement(container);

            analyzeButton.disabled =
                false;

        };


    reader.readAsDataURL(file);

}


async function analyzeCrop() {

    const input =
        $("cropImageInput");


    const result =
        $("cropAnalysisResult");


    const file =
        input?.files?.[0];


    if (!file) {
        return;
    }


    result.innerHTML = `

        <strong>
            Analyzing crop...
        </strong>

        <p>
            Please wait while the crop-health service processes the image.
        </p>

    `;


    try {

        const formData =
            new FormData();


        formData.append(
            "image",
            file
        );


        const response =
            await fetch(
                `${API_BASE_URL}/api/crop-health`,
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                `Crop health API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const diagnosis =
            data.diagnosis ||
            data.result ||
            data.prediction ||
            "Analysis completed.";


        const confidence =
            data.confidence;


        result.innerHTML = `

            <strong>
                ${escapeHtml(
                    String(diagnosis)
                )}
            </strong>

            <p>
                ${
                    confidence != null
                        ? `Confidence: ${escapeHtml(
                            String(confidence)
                        )}`
                        : "AI analysis completed."
                }
            </p>

        `;


    } catch (error) {

        console.error(
            "Crop analysis failed:",
            error
        );


        result.innerHTML = `

            <strong>
                Crop analysis unavailable
            </strong>

            <p>
                The crop-health AI service is not connected or could not process the image.
            </p>

        `;

    }
}


/* =========================================================
   AI ASSISTANT
========================================================= */

async function handleAIQuestion(event) {

    event.preventDefault();


    const input =
        $("aiInput");


    const messages =
        $("chatMessages");


    if (!input || !messages) {
        return;
    }


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


    const loadingId =
        addChatMessage(
            "assistant",
            "Thinking..."
        );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/ai`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body: JSON.stringify({

                        question,

                        language:
                            appState.selectedLanguage,

                        farmer:
                            appState.farmerProfile

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                `AI API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            "No response received.";


        removeChatMessage(
            loadingId
        );


        addChatMessage(
            "assistant",
            answer
        );


    } catch (error) {

        console.error(
            "AI request failed:",
            error
        );


        removeChatMessage(
            loadingId
        );


        addChatMessage(
            "assistant",
            "AI service is currently unavailable. Please connect the AI backend."
        );

    }

}


function addChatMessage(
    sender,
    text
) {

    const messages =
        $("chatMessages");


    if (!messages) {
        return null;
    }


    const id =
        "message-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2);


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "chat-message";


    wrapper.id =
        id;


    if (sender === "user") {

        wrapper.innerHTML = `

            <div class="chat-avatar">
                👨‍🌾
            </div>

            <div>

                <strong>
                    Farmer
                </strong>

                <p>
                    ${escapeHtml(text)}
                </p>

            </div>

        `;

    } else {

        wrapper.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    Assistant
                </strong>

                <p>
                    ${escapeHtml(text)}
                </p>

            </div>

        `;

    }


    messages.appendChild(wrapper);


    messages.scrollTop =
        messages.scrollHeight;


    return id;
}


function removeChatMessage(id) {

    const element =
        $(id);


    if (element) {
        element.remove();
    }

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let recognition = null;


function initializeVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech Recognition is not supported."
        );

        return false;
    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    recognition.lang =
        getSpeechLanguage();


    recognition.onstart =
        function () {

            hideElement(
                $("startVoiceBtn")
            );

            showElement(
                $("stopVoiceBtn")
            );


            setText(
                "voiceResponse",
                "Listening..."
            );

        };


    recognition.onresult =
        function (event) {

            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0].transcript;

            }


            const input =
                $("voiceInput");


            if (input) {
                input.value =
                    transcript;
            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Speech recognition error:",
                event.error
            );


            setText(
                "voiceResponse",
                "Voice recognition error: " +
                event.error
            );

            stopVoiceUI();

        };


    recognition.onend =
        function () {

            stopVoiceUI();


            const input =
                $("voiceInput");


            if (
                input &&
                input.value.trim()
            ) {

                handleVoiceQuestion(
                    input.value.trim()
                );

            }

        };


    return true;
}


function getSpeechLanguage() {

    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    return languages[
        appState.selectedLanguage
    ] || "en-IN";

}


function startVoice() {

    if (!recognition) {

        const initialized =
            initializeVoiceRecognition();


        if (!initialized) {

            setText(
                "voiceResponse",
                "Voice recognition is not supported in this browser."
            );

            return;
        }

    }


    recognition.lang =
        getSpeechLanguage();


    try {

        recognition.start();

    } catch (error) {

        console.warn(
            "Voice start error:",
            error
        );

    }

}


function stopVoice() {

    if (recognition) {

        try {

            recognition.stop();

        } catch (error) {

            console.warn(
                error
            );

        }

    }

    stopVoiceUI();

}


function stopVoiceUI() {

    showElement(
        $("startVoiceBtn")
    );

    hideElement(
        $("stopVoiceBtn")
    );

}


async function handleVoiceQuestion(question) {

    setText(
        "voiceResponse",
        "Processing your question..."
    );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/ai`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        question,

                        language:
                            appState.selectedLanguage,

                        farmer:
                            appState.farmerProfile

                    })

                }
            );


        if (!response.ok) {
            throw new Error(
                "AI service unavailable"
            );
        }


        const data =
            await response.json();


        const answer =
            data.answer ||
            data.response ||
            data.message ||
            "No answer received.";


        setText(
            "voiceResponse",
            answer
        );


        speakText(answer);


    } catch (error) {

        console.error(error);


        setText(
            "voiceResponse",
            "AI service is not connected."
        );

    }

}


function speakText(text) {

    if (
        !window.speechSynthesis ||
        !text
    ) {
        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    const voiceLanguages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    utterance.lang =
        voiceLanguages[
            appState.selectedLanguage
        ] || "en-IN";


    window.speechSynthesis.speak(
        utterance
    );

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
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const headerStatus =
        $("connectionStatus");


    const headerText =
        $("connectionText");


    const dashboardText =
        $("dashboardConnectionText");


    if (headerStatus) {

        headerStatus.classList.toggle(
            "online",
            online
        );

        headerStatus.classList.toggle(
            "offline",
            !online
        );

    }


    const language =
        appState.selectedLanguage;


    const text =
        online
            ? translations[language].online
            : translations[language].offline;


    if (headerText) {
        headerText.textContent =
            text;
    }


    if (dashboardText) {
        dashboardText.textContent =
            text;
    }

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function setValue(id, value) {

    const element =
        $(id);


    if (element) {

        element.value =
            value ?? "";

    }

}


function getFirstAvailable(
    object,
    keys
) {

    for (const key of keys) {

        if (
            object &&
            object[key] !== undefined &&
            object[key] !== null
        ) {

            return object[key];

        }

    }


    return null;
}


function formatValue(
    value,
    suffix = ""
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";

    }


    return `${value}${suffix}`;

}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function initializeEventListeners() {


    /* -----------------------------------------------------
       LANGUAGE PAGE
    ----------------------------------------------------- */

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const language =
                        button.dataset.language;


                    appState.selectedLanguage =
                        language;


                    updateLanguageButtons(
                        language
                    );


                    translatePage(
                        language
                    );

                }
            );

        });


    $("continueLanguageBtn")
        ?.addEventListener(
            "click",
            () => {

                if (
                    !appState.selectedLanguage
                ) {
                    return;
                }


                showScreen(
                    "loginPage"
                );

            }
        );


    /* -----------------------------------------------------
       LOGIN
    ----------------------------------------------------- */

    $("loginForm")
        ?.addEventListener(
            "submit",
            loginUser
        );


    $("forgotPasswordBtn")
        ?.addEventListener(
            "click",
            resetPassword
        );


    $("demoBtn")
        ?.addEventListener(
            "click",
            showDemoDashboard
        );


    $("showRegisterBtn")
        ?.addEventListener(
            "click",
            () => {

                showScreen(
                    "registerPage"
                );

            }
        );


    $("changeLanguageFromLogin")
        ?.addEventListener(
            "click",
            () => {

                showScreen(
                    "languagePage"
                );

            }
        );


    /* -----------------------------------------------------
       REGISTRATION
    ----------------------------------------------------- */

    $("registrationForm")
        ?.addEventListener(
            "submit",
            registerUser
        );


    $("showLoginBtn")
        ?.addEventListener(
            "click",
            () => {

                showScreen(
                    "loginPage"
                );

            }
        );


    /* -----------------------------------------------------
       SIDE MENU
    ----------------------------------------------------- */

    $("hamburgerBtn")
        ?.addEventListener(
            "click",
            openSideMenu
        );


    $("closeMenuBtn")
        ?.addEventListener(
            "click",
            closeSideMenu
        );


    $("menuOverlay")
        ?.addEventListener(
            "click",
            closeSideMenu
        );


    document
        .querySelectorAll(
            ".side-navigation [data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.section
                    );

                }
            );

        });


    /* -----------------------------------------------------
       ALL DATA-SECTION BUTTONS
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            if (
                button.closest(
                    ".side-navigation"
                )
            ) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.section
                    );

                }
            );

        });


    /* -----------------------------------------------------
       PROFILE MENU
    ----------------------------------------------------- */

    $("profileButton")
        ?.addEventListener(
            "click",
            toggleProfileMenu
        );


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.profileSection
                    );

                }
            );

        });


    $("profileLogoutBtn")
        ?.addEventListener(
            "click",
            logoutUser
        );


    $("sideLogoutBtn")
        ?.addEventListener(
            "click",
            logoutUser
        );


    /* -----------------------------------------------------
       WEATHER
    ----------------------------------------------------- */

    $("refreshWeatherBtn")
        ?.addEventListener(
            "click",
            refreshWeather
        );


    /* -----------------------------------------------------
       MARKET
    ----------------------------------------------------- */

    $("cropPriceSelector")
        ?.addEventListener(
            "change",
            handleCropChange
        );


    /* -----------------------------------------------------
       CROP HEALTH
    ----------------------------------------------------- */

    $("cropImageInput")
        ?.addEventListener(
            "change",
            handleCropImage
        );


    $("analyzeCropBtn")
        ?.addEventListener(
            "click",
            analyzeCrop
        );


    /* -----------------------------------------------------
       AI
    ----------------------------------------------------- */

    $("aiForm")
        ?.addEventListener(
            "submit",
            handleAIQuestion
        );


    /* -----------------------------------------------------
       VOICE
    ----------------------------------------------------- */

    $("startVoiceBtn")
        ?.addEventListener(
            "click",
            startVoice
        );


    $("stopVoiceBtn")
        ?.addEventListener(
            "click",
            stopVoice
        );


    /* -----------------------------------------------------
       PROFILE
    ----------------------------------------------------- */

    $("editProfileBtn")
        ?.addEventListener(
            "click",
            enableProfileEditing
        );


    $("cancelProfileEditBtn")
        ?.addEventListener(
            "click",
            () => {

                populateProfileForm(
                    appState.farmerProfile || {}
                );

                disableProfileEditing();

            }
        );


    $("profileForm")
        ?.addEventListener(
            "submit",
            saveProfile
        );


    /* -----------------------------------------------------
       LANGUAGE SELECTORS
    ----------------------------------------------------- */

    $("dashboardLanguage")
        ?.addEventListener(
            "change",
            event => {

                changeApplicationLanguage(
                    event.target.value
                );

            }
        );


    $("settingsLanguage")
        ?.addEventListener(
            "change",
            event => {

                changeApplicationLanguage(
                    event.target.value
                );

            }
        );


    $("registerLanguage")
        ?.addEventListener(
            "change",
            event => {

                const language =
                    event.target.value;


                appState.selectedLanguage =
                    language;

            }
        );


    $("profileLanguage")
        ?.addEventListener(
            "change",
            event => {

                appState.selectedLanguage =
                    event.target.value;

            }
        );


    /* -----------------------------------------------------
       GOVERNMENT SCHEMES
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openScheme(
                        button.dataset.schemeUrl
                    );

                }
            );

        });


    /* -----------------------------------------------------
       CONNECTION EVENTS
    ----------------------------------------------------- */

    window.addEventListener(
        "online",
        updateConnectionStatus
    );


    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    /* -----------------------------------------------------
       CLOSE MENUS WHEN CLICKING OUTSIDE
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            const profileMenu =
                $("profileMenu");

            const profileButton =
                $("profileButton");


            if (
                profileMenu &&
                profileButton &&
                profileMenu.classList.contains(
                    "open"
                ) &&
                !profileMenu.contains(
                    event.target
                ) &&
                !profileButton.contains(
                    event.target
                )
            ) {

                closeProfileMenu();

            }

        }
    );

}


/* =========================================================
   APPLICATION LANGUAGE CHANGE
========================================================= */

function changeApplicationLanguage(
    language
) {

    if (!translations[language]) {
        return;
    }


    appState.selectedLanguage =
        language;


    translatePage(
        language
    );


    updateConnectionStatus();


    if (
        recognition
    ) {

        recognition.lang =
            getSpeechLanguage();

    }


    if (
        appState.currentUser &&
        firebaseReady
    ) {

        db
            .collection("farmers")
            .doc(appState.currentUser.uid)
            .update({

                preferredLanguage:
                    language,

                updatedAt:
                    firebase.firestore
                        .FieldValue
                        .serverTimestamp()

            })
            .catch(error => {

                console.warn(
                    "Could not save language:",
                    error
                );

            });

    }


    if (appState.farmerProfile) {

        appState.farmerProfile.preferredLanguage =
            language;

    }

}


/* =========================================================
   AUTH STATE OBSERVER
========================================================= */

function initializeAuthObserver() {

    if (!firebaseReady) {

        console.warn(
            "Firebase unavailable. Demo mode is still available."
        );

        return;
    }


    auth.onAuthStateChanged(
        async user => {

            if (user) {

                appState.currentUser =
                    user;


                await loadFarmerProfile(
                    user.uid
                );


                /*
                    Do not automatically force dashboard
                    when the language page is being shown
                    for the first time.

                    If Firebase has an existing session,
                    open dashboard.
                */

                if (
                    !document
                        .querySelector(
                            ".screen.active-screen"
                        )
                ) {

                    showDashboard();

                }

            } else {

                if (
                    !appState.isDemo
                ) {

                    appState.currentUser =
                        null;

                }

            }

        }
    );

}


/* =========================================================
   INITIAL APPLICATION STARTUP
========================================================= */

function initializeApp() {

    console.log(
        "Starting SmartAgri..."
    );


    translatePage(
        appState.selectedLanguage
    );


    initializeEventListeners();

    initializeAuthObserver();

    updateConnectionStatus();

    disableProfileEditing();


    /*
        Start on language page unless
        a language was previously selected.
    */

    showScreen(
        "languagePage"
    );


    console.log(
        "SmartAgri initialized."
    );

}


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
