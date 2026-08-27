/* ============================================================
   SMARTAGRI - COMPLETE MAIN JAVASCRIPT
   ============================================================

   Features:
   - Firebase Authentication
   - Firebase Firestore
   - English / Hindi / Marathi
   - Persistent language
   - Dashboard navigation
   - Weather
   - Market prices
   - Market comparison
   - Profile
   - Settings
   - Voice assistance
   - AI placeholder handling
   - Crop information modal integration
   - Government scheme links
   - Responsive menu
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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();


/* ============================================================
   GLOBAL APPLICATION STATE
   ============================================================ */

let currentLanguage =
    localStorage.getItem("smartAgriLanguage") || "en";

let currentUser = null;
let currentFarmerData = null;

let recognition = null;
let isListening = false;


/* ============================================================
   WEATHER CONFIGURATION
   ============================================================ */

const WEATHER_CONFIG = {

    /*
       Open-Meteo does not require an API key.

       Default location:
       Kopargaon, Maharashtra
    */

    latitude: 19.8820,
    longitude: 74.4760,

    city: "Kopargaon",

    timezone: "Asia/Kolkata"
};


/* ============================================================
   MARKET API CONFIGURATION
   ============================================================

   IMPORTANT:

   Put your data.gov.in API URL here when you have the
   correct resource.

   Example structure:

   MARKET_CONFIG.apiUrl =
       "https://api.data.gov.in/resource/RESOURCE_ID";

   MARKET_CONFIG.apiKey =
       "YOUR_DATA_GOV_API_KEY";

   Until configured, the application safely shows
   "Market data unavailable" instead of fake data.
   ============================================================ */

const MARKET_CONFIG = {

    apiUrl: "",

    apiKey: "",

    defaultState: "Maharashtra",

    defaultDistrict: "Nashik",

    markets: [
        "Kopargaon APMC",
        "Yeola Market",
        "Shirdi Market"
    ]
};


/* ============================================================
   TRANSLATION DATABASE
   ============================================================ */

const translations = {

    en: {

        appName:
            "SmartAgri",

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

        loadingWeather:
            "Loading weather...",

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

        loadingMarket:
            "Loading market prices...",

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

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support",

        loginSuccess:
            "Login successful.",

        logoutSuccess:
            "Logged out successfully.",

        registrationSuccess:
            "Account created successfully.",

        invalidLogin:
            "Invalid email or password.",

        emailAlreadyUsed:
            "This email is already registered.",

        weakPassword:
            "Password should contain at least 6 characters.",

        passwordResetSent:
            "Password reset email sent.",

        profileUpdated:
            "Profile updated successfully.",

        somethingWrong:
            "Something went wrong. Please try again.",

        demoMode:
            "Demo Mode",

        demoUser:
            "Demo Farmer",

        demoVillage:
            "Kopargaon",

        demoLand:
            "5 acres",

        demoMarket:
            "Kopargaon APMC",

        weatherError:
            "Unable to load verified weather data.",

        marketError:
            "Unable to load verified market data.",

        voiceNotSupported:
            "Voice recognition is not supported by this browser.",

        listening:
            "Listening...",

        voiceStopped:
            "Voice assistance stopped.",

        imageSelected:
            "Image selected successfully.",

        aiNotAvailable:
            "AI service is currently unavailable."
    },


    hi: {

        appName:
            "स्मार्टएग्री",

        appTagline:
            "स्मार्ट कृषि बाजार खुफिया प्रणाली",

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
            "कोपरगांव एपीएमसी",

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
            "एआई सहायक",

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

        loadingWeather:
            "मौसम लोड हो रहा है...",

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
            "दिनांक",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

        loadingMarket:
            "बाजार भाव लोड हो रहे हैं...",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ है।",

        comparisonSubtitle:
            "बेचने से पहले जुड़े हुए बाजार की जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन मार्गदर्शन।",

        onionInfo:
            "प्याज की खेती की जानकारी।",

        wheatInfo:
            "गेहूं की खेती की जानकारी।",

        cultivationGuidance:
            "खेती का मार्गदर्शन",

        cropManagement:
            "फसल प्रबंधन",

        farmingPractices:
            "कृषि पद्धतियां",

        cropHealthSubtitle:
            "एआई विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",

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
            "विश्लेषण दिखाने से पहले सत्यापित फसल-स्वास्थ्य एआई सेवा कनेक्ट करें।",

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
            "स्मार्ट आवाज सहायता",

        voiceDescription:
            "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",

        startVoice:
            "आवाज सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "आवाज इनपुट",

        voiceResponse:
            "आवाज प्रतिक्रिया",

        voiceInputPlaceholder:
            "आवाज इनपुट यहां दिखाई देगा...",

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
            "आवाज सहायता को सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाओं को सक्षम या अक्षम करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

        loginSuccess:
            "लॉगिन सफल हुआ।",

        logoutSuccess:
            "सफलतापूर्वक लॉगआउट किया गया।",

        registrationSuccess:
            "खाता सफलतापूर्वक बनाया गया।",

        invalidLogin:
            "ईमेल या पासवर्ड गलत है।",

        emailAlreadyUsed:
            "यह ईमेल पहले से पंजीकृत है।",

        weakPassword:
            "पासवर्ड में कम से कम 6 अक्षर होने चाहिए।",

        passwordResetSent:
            "पासवर्ड रीसेट ईमेल भेज दिया गया है।",

        profileUpdated:
            "प्रोफाइल सफलतापूर्वक अपडेट हुई।",

        somethingWrong:
            "कुछ गलत हुआ। कृपया फिर से प्रयास करें।",

        demoMode:
            "डेमो मोड",

        demoUser:
            "डेमो किसान",

        demoVillage:
            "कोपरगांव",

        demoLand:
            "5 एकड़",

        demoMarket:
            "कोपरगांव एपीएमसी",

        weatherError:
            "सत्यापित मौसम डेटा लोड नहीं किया जा सका।",

        marketError:
            "सत्यापित बाजार डेटा लोड नहीं किया जा सका।",

        voiceNotSupported:
            "इस ब्राउज़र में आवाज पहचान उपलब्ध नहीं है।",

        listening:
            "सुन रहा है...",

        voiceStopped:
            "आवाज सहायता बंद कर दी गई।",

        imageSelected:
            "तस्वीर सफलतापूर्वक चुनी गई।",

        aiNotAvailable:
            "एआई सेवा अभी उपलब्ध नहीं है।"
    },


    mr: {

        appName:
            "स्मार्टअॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार बुद्धिमत्ता प्रणाली",

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
            "कोपरगाव एपीएमसी",

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
            "सरकारी योजना",

        aiAssistant:
            "एआय सहाय्यक",

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
            "माझी प्रोफाइल",

        welcome:
            "स्वागत",

        dashboardSubtitle:
            "तुमची शेतीविषयक माहिती एका ठिकाणी.",

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
            "महत्त्वाची शेती साधने त्वरीत वापरा.",

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
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        loadingWeather:
            "हवामान लोड होत आहे...",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक बाजारभाव.",

        marketPriceTable:
            "बाजारभाव तक्ता",

        market:
            "बाजारपेठ",

        crop:
            "पीक",

        price:
            "भाव",

        date:
            "दिनांक",

        onion:
            "कांदा",

        wheat:
            "गहू",

        loadingMarket:
            "बाजारभाव लोड होत आहेत...",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

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
            "एआय विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage:
            "फोटो निवडा",

        analyzeCrop:
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "एआय पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य एआय सेवा कनेक्ट करा.",

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

        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",

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
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार बुद्धिमत्ता, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार बुद्धिमत्ता",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        loginSuccess:
            "लॉगिन यशस्वी झाले.",

        logoutSuccess:
            "यशस्वीरित्या लॉगआउट झाले.",

        registrationSuccess:
            "खाते यशस्वीरित्या तयार झाले.",

        invalidLogin:
            "ईमेल किंवा पासवर्ड चुकीचा आहे.",

        emailAlreadyUsed:
            "हा ईमेल आधीच नोंदणीकृत आहे.",

        weakPassword:
            "पासवर्डमध्ये किमान 6 अक्षरे असणे आवश्यक आहे.",

        passwordResetSent:
            "पासवर्ड रीसेट ईमेल पाठवण्यात आला आहे.",

        profileUpdated:
            "प्रोफाइल यशस्वीरित्या अपडेट झाली.",

        somethingWrong:
            "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",

        demoMode:
            "डेमो मोड",

        demoUser:
            "डेमो शेतकरी",

        demoVillage:
            "कोपरगाव",

        demoLand:
            "5 एकर",

        demoMarket:
            "कोपरगाव एपीएमसी",

        weatherError:
            "सत्यापित हवामान डेटा लोड करता आला नाही.",

        marketError:
            "सत्यापित बाजार डेटा लोड करता आला नाही.",

        voiceNotSupported:
            "या ब्राउझरमध्ये आवाज ओळख उपलब्ध नाही.",

        listening:
            "ऐकत आहे...",

        voiceStopped:
            "आवाज सहाय्य बंद केले.",

        imageSelected:
            "फोटो यशस्वीरित्या निवडला.",

        aiNotAvailable:
            "एआय सेवा सध्या उपलब्ध नाही."
    }

};


/* ============================================================
   TRANSLATION HELPER
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
   APPLY LANGUAGE
   ============================================================ */

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


    /* --------------------------------------------------------
       Normal text elements
       -------------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
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


    /* --------------------------------------------------------
       Placeholder translations
       -------------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (key) {

                element.placeholder =
                    t(key);

            }

        });


    /* --------------------------------------------------------
       Select language dropdowns
       -------------------------------------------------------- */

    const languageSelectors = [

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


    languageSelectors.forEach(
        function (select) {

            if (select) {

                select.value =
                    currentLanguage;

            }

        }
    );


    /* --------------------------------------------------------
       Update language selection buttons
       -------------------------------------------------------- */

    document
        .querySelectorAll(".language-option")
        .forEach(function (button) {

            const buttonLanguage =
                button.getAttribute(
                    "data-language"
                );

            button.classList.toggle(
                "selected",
                buttonLanguage === currentLanguage
            );

        });


    /* --------------------------------------------------------
       Voice recognition language
       -------------------------------------------------------- */

    updateSpeechLanguage();


    /* --------------------------------------------------------
       Refresh dynamic weather/market text
       -------------------------------------------------------- */

    updateDynamicLanguageContent();

}


/* ============================================================
   UPDATE DYNAMIC LANGUAGE CONTENT
   ============================================================ */

function updateDynamicLanguageContent() {

    const weatherLoading =
        document.getElementById(
            "weatherLoading"
        );

    if (
        weatherLoading &&
        !weatherLoading.classList.contains("hidden")
    ) {

        const loadingText =
            weatherLoading.querySelector("p");

        if (loadingText) {
            loadingText.textContent =
                t("loadingWeather");
        }

    }


    const marketLoading =
        document.getElementById(
            "marketLoading"
        );

    if (
        marketLoading &&
        !marketLoading.classList.contains("hidden")
    ) {

        const loadingText =
            marketLoading.querySelector("p");

        if (loadingText) {
            loadingText.textContent =
                t("loadingMarket");
        }

    }

}


/* ============================================================
   LANGUAGE PAGE
   ============================================================ */

function initializeLanguagePage() {

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    let selectedLanguage =
        localStorage.getItem(
            "smartAgriLanguage"
        );


    languageButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    selectedLanguage =
                        button.getAttribute(
                            "data-language"
                        );

                    languageButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    button.classList.add(
                        "selected"
                    );


                    if (continueButton) {

                        continueButton.disabled =
                            false;

                    }

                }
            );

        }
    );


    if (
        selectedLanguage &&
        translations[selectedLanguage]
    ) {

        languageButtons.forEach(
            function (button) {

                if (
                    button.getAttribute(
                        "data-language"
                    ) === selectedLanguage
                ) {

                    button.classList.add(
                        "selected"
                    );

                }

            }
        );

        if (continueButton) {
            continueButton.disabled =
                false;
        }

    }


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                if (!selectedLanguage) {
                    return;
                }

                applyLanguage(
                    selectedLanguage
                );

                showScreen("loginPage");

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

function showDashboard() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboard) {

        dashboard.classList.add(
            "active-screen"
        );

    }


    showAppSection(
        "dashboardSection"
    );


    closeSideMenu();

    closeProfileMenu();

}


/* ============================================================
   APP SECTION NAVIGATION
   ============================================================ */

function showAppSection(sectionId) {

    document
        .querySelectorAll(".app-section")
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


/* ============================================================
   SETUP NAVIGATION
   ============================================================ */

function initializeNavigation() {

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

                        showAppSection(
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

                        showAppSection(
                            section
                        );

                    }

                }
            );

        });

}


/* ============================================================
   SIDE MENU
   ============================================================ */

function initializeSideMenu() {

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


/* ============================================================
   PROFILE MENU
   ============================================================ */

function initializeProfileMenu() {

    const profileButton =
        document.getElementById(
            "profileButton"
        );

    if (!profileButton) {
        return;
    }


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
                    "open"
                );

            }

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            const menu =
                document.getElementById(
                    "profileMenu"
                );

            if (
                menu &&
                !menu.contains(event.target) &&
                event.target !== profileButton
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


/* ============================================================
   LOGIN
   ============================================================ */

function initializeLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) {
        return;
    }


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


            showMessage(
                "loginMessage",
                "",
                ""
            );


            try {

                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                let message =
                    t("somethingWrong");


                if (
                    error.code ===
                    "auth/invalid-credential" ||
                    error.code ===
                    "auth/user-not-found" ||
                    error.code ===
                    "auth/wrong-password"
                ) {

                    message =
                        t("invalidLogin");

                }


                showMessage(
                    "loginMessage",
                    message,
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   FIREBASE AUTH STATE
   ============================================================ */

function initializeAuthState() {

    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser =
                    user;

                await loadFarmerProfile(
                    user.uid
                );

                updateConnectionStatus(
                    true
                );

                showDashboard();

            } else {

                currentUser =
                    null;

                currentFarmerData =
                    null;

                updateConnectionStatus(
                    false
                );

            }

        }
    );

}


/* ============================================================
   REGISTRATION
   ============================================================ */

function initializeRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

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

            const market =
                getValue("registerMarket");

            const language =
                getValue("registerLanguage");

            const password =
                getValue("registerPassword");


            try {

                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                await db
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

                        language:
                            language || "en",

                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),

                        updatedAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    });


                applyLanguage(
                    language || "en"
                );


                showMessage(
                    "registerMessage",
                    t("registrationSuccess"),
                    "success"
                );


                setTimeout(
                    function () {

                        showScreen(
                            "loginPage"
                        );

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                let message =
                    t("somethingWrong");


                if (
                    error.code ===
                    "auth/email-already-in-use"
                ) {

                    message =
                        t("emailAlreadyUsed");

                }


                if (
                    error.code ===
                    "auth/weak-password"
                ) {

                    message =
                        t("weakPassword");

                }


                showMessage(
                    "registerMessage",
                    message,
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   LOAD FARMER PROFILE
   ============================================================ */

async function loadFarmerProfile(uid) {

    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (snapshot.exists) {

            currentFarmerData =
                snapshot.data();


            if (
                currentFarmerData.language &&
                translations[
                    currentFarmerData.language
                ]
            ) {

                applyLanguage(
                    currentFarmerData.language
                );

            }


            updateProfileUI(
                currentFarmerData
            );

        } else {

            updateProfileUI({});

        }


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


/* ============================================================
   UPDATE PROFILE UI
   ============================================================ */

function updateProfileUI(data) {

    const name =
        data.name ||
        t("demoUser");

    const email =
        data.email ||
        (currentUser
            ? currentUser.email
            : "—");

    const village =
        data.village ||
        "—";

    const landArea =
        data.landArea ||
        "—";

    const market =
        data.preferredMarket ||
        "—";

    const mobile =
        data.mobile ||
        "—";

    const state =
        data.state ||
        "—";


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
        data.language ||
        currentLanguage
    );


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        email
    );

}


/* ============================================================
   PROFILE EDITING
   ============================================================ */

function initializeProfileEditing() {

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
            function () {

                updateProfileUI(
                    currentFarmerData || {}
                );

                disableProfileEditing();

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
        function (id) {

            const element =
                document.getElementById(id);

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
        function (id) {

            const element =
                document.getElementById(id);

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


    if (!currentUser) {
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

        language:
            getValue("profileLanguage") ||
            currentLanguage,

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    try {

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update(
                updatedData
            );


        currentFarmerData = {

            ...(currentFarmerData || {}),
            ...updatedData

        };


        applyLanguage(
            updatedData.language
        );


        updateProfileUI(
            currentFarmerData
        );


        disableProfileEditing();


        showMessage(
            "profileMessage",
            t("profileUpdated"),
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            "profileMessage",
            t("somethingWrong"),
            "error"
        );

    }

}


/* ============================================================
   FORGOT PASSWORD
   ============================================================ */

function initializePasswordReset() {

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
                getValue("loginEmail");


            if (!email) {

                showMessage(
                    "loginMessage",
                    t("email"),
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
                    t("passwordResetSent"),
                    "success"
                );


            } catch (error) {

                console.error(
                    error
                );


                showMessage(
                    "loginMessage",
                    t("somethingWrong"),
                    "error"
                );

            }

        }
    );

}


/* ============================================================
   LOGOUT
   ============================================================ */

async function logoutUser() {

    try {

        await auth.signOut();

        currentUser =
            null;

        currentFarmerData =
            null;

        showScreen(
            "loginPage"
        );

        showMessage(
            "loginMessage",
            t("logoutSuccess"),
            "success"
        );


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* ============================================================
   LOGOUT BUTTONS
   ============================================================ */

function initializeLogoutButtons() {

    const buttons = [

        document.getElementById(
            "sideLogoutBtn"
        ),

        document.getElementById(
            "profileLogoutBtn"
        )

    ];


    buttons.forEach(
        function (button) {

            if (button) {

                button.addEventListener(
                    "click",
                    logoutUser
                );

            }

        }
    );

}


/* ============================================================
   LOGIN -> REGISTER
   ============================================================ */

function initializeAuthNavigation() {

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

                showScreen(
                    "registerPage"
                );

            }
        );

    }


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


    if (changeLanguageButton) {

        changeLanguageButton.addEventListener(
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
   DEMO DASHBOARD
   ============================================================ */

function initializeDemo() {

    const button =
        document.getElementById(
            "demoBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            currentUser =
                null;


            currentFarmerData = {

                name:
                    t("demoUser"),

                email:
                    "demo@smartagri.local",

                mobile:
                    "9876543210",

                village:
                    t("demoVillage"),

                state:
                    currentLanguage === "en"
                        ? "Maharashtra"
                        : currentLanguage === "hi"
                            ? "महाराष्ट्र"
                            : "महाराष्ट्र",

                landArea:
                    t("demoLand"),

                preferredMarket:
                    t("demoMarket"),

                language:
                    currentLanguage

            };


            updateProfileUI(
                currentFarmerData
            );


            showDashboard();


            setTimeout(
                function () {

                    loadWeather();

                },
                300
            );

        }
    );

}


/* ============================================================
   CONNECTION STATUS
   ============================================================ */

function updateConnectionStatus(isOnline) {

    const status =
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


    if (connectionText) {

        connectionText.textContent =
            isOnline
                ? t("online")
                : t("offline");

    }


    if (dashboardText) {

        dashboardText.textContent =
            isOnline
                ? t("online")
                : t("offline");

    }

}


/* ============================================================
   WEATHER
   ============================================================ */

async function loadWeather() {

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const error =
        document.getElementById(
            "weatherError"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const data =
        document.getElementById(
            "weatherData"
        );


    if (loading) {
        loading.classList.remove(
            "hidden"
        );
    }

    if (error) {
        error.classList.add(
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


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" +
            encodeURIComponent(
                WEATHER_CONFIG.latitude
            ) +
            "&longitude=" +
            encodeURIComponent(
                WEATHER_CONFIG.longitude
            ) +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain" +
            "&hourly=precipitation_probability" +
            "&timezone=" +
            encodeURIComponent(
                WEATHER_CONFIG.timezone
            );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }


        const weather =
            await response.json();


        if (
            !weather ||
            !weather.current
        ) {

            throw new Error(
                "No weather data"
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


        let rainChance =
            0;


        if (
            weather.hourly &&
            Array.isArray(
                weather.hourly.precipitation_probability
            )
        ) {

            rainChance =
                weather.hourly
                    .precipitation_probability[0] ||
                0;

        }


        setText(
            "weatherTemperature",
            formatNumber(
                temperature
            ) + " °C"
        );


        setText(
            "weatherHumidity",
            formatNumber(
                humidity
            ) + "%"
        );


        setText(
            "weatherWind",
            formatNumber(
                wind
            ) + " km/h"
        );


        setText(
            "weatherRain",
            formatNumber(
                rainChance
            ) + "%"
        );


        if (data) {

            data.classList.remove(
                "hidden"
            );

        }


    } catch (weatherError) {

        console.error(
            "Weather error:",
            weatherError
        );


        if (error) {

            error.textContent =
                t("weatherError");

            error.classList.remove(
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


/* ============================================================
   REFRESH WEATHER
   ============================================================ */

function initializeWeather() {

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
   MARKET PRICES
   ============================================================ */

async function loadMarketPrices() {

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

        loading.classList.remove(
            "hidden"
        );

    }


    if (error) {

        error.classList.add(
            "hidden"
        );

    }


    try {

        /*
           If API is not configured, do NOT create fake prices.
           Show the verified-data unavailable state.
        */

        if (
            !MARKET_CONFIG.apiUrl ||
            !MARKET_CONFIG.apiKey
        ) {

            renderMarketUnavailable();

            return;

        }


        const selector =
            document.getElementById(
                "cropPriceSelector"
            );


        const crop =
            selector
                ? selector.value
                : "onion";


        const params =
            new URLSearchParams();


        params.set(
            "api-key",
            MARKET_CONFIG.apiKey
        );


        params.set(
            "format",
            "json"
        );


        /*
           These parameter names depend on the exact
           data.gov.in resource.

           Change them according to your selected resource.
        */

        params.set(
            "state",
            MARKET_CONFIG.defaultState
        );

        params.set(
            "district",
            MARKET_CONFIG.defaultDistrict
        );

        params.set(
            "commodity",
            crop === "onion"
                ? "Onion"
                : "Wheat"
        );


        const response =
            await fetch(
                MARKET_CONFIG.apiUrl +
                "?" +
                params.toString()
            );


        if (!response.ok) {

            throw new Error(
                "Market API request failed"
            );

        }


        const result =
            await response.json();


        const records =
            normalizeMarketRecords(
                result
            );


        if (!records.length) {

            renderMarketUnavailable();

            return;

        }


        renderMarketTable(
            records
        );


    } catch (marketError) {

        console.error(
            "Market error:",
            marketError
        );


        if (error) {

            error.textContent =
                t("marketError");

            error.classList.remove(
                "hidden"
            );

        }


        renderMarketUnavailable();


    } finally {

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }

    }

}


/* ============================================================
   MARKET SELECTOR
   ============================================================ */

function initializeMarketSelector() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (selector) {

        selector.addEventListener(
            "change",
            loadMarketPrices
        );

    }

}


/* ============================================================
   NORMALIZE MARKET API RECORDS
   ============================================================ */

function normalizeMarketRecords(result) {

    if (!result) {
        return [];
    }


    const rawRecords =
        Array.isArray(result.records)
            ? result.records
            : Array.isArray(result.data)
                ? result.data
                : [];


    return rawRecords
        .map(function (record) {

            const market =
                record.market ||
                record.market_name ||
                record.marketName ||
                record.apmc ||
                record.market_center ||
                "—";


            const commodity =
                record.commodity ||
                record.crop ||
                record.commodity_name ||
                "—";


            const price =
                record.modal_price ||
                record.modalPrice ||
                record.price ||
                record.max_price ||
                record.min_price ||
                "—";


            const date =
                record.arrival_date ||
                record.arrivalDate ||
                record.date ||
                record.trade_date ||
                "—";


            return {

                market:
                    market,

                crop:
                    commodity,

                price:
                    price,

                date:
                    date

            };

        });

}


/* ============================================================
   RENDER MARKET TABLE
   ============================================================ */

function renderMarketTable(records) {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    records.forEach(
        function (record) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        translateMarketName(
                            record.market
                        )
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        translateCropName(
                            record.crop
                        )
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        String(record.price)
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        String(record.date)
                    )}
                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}


/* ============================================================
   MARKET UNAVAILABLE
   ============================================================ */

function renderMarketUnavailable() {

    const tableBody =
        document.getElementById(
            "marketTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = `

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

async function loadMarketComparison() {

    /*
       We deliberately do not generate fake prices.

       If the market API is connected, we use the returned
       data and update the matching cards.
    */

    if (
        !MARKET_CONFIG.apiUrl ||
        !MARKET_CONFIG.apiKey
    ) {

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
                    price.textContent =
                        "—";
                }


                if (status) {

                    status.textContent =
                        t("dataUnavailable");

                }

            });


        return;

    }


    try {

        const selector =
            document.getElementById(
                "cropPriceSelector"
            );


        const crop =
            selector
                ? selector.value
                : "onion";


        const params =
            new URLSearchParams();


        params.set(
            "api-key",
            MARKET_CONFIG.apiKey
        );

        params.set(
            "format",
            "json"
        );

        params.set(
            "state",
            MARKET_CONFIG.defaultState
        );

        params.set(
            "district",
            MARKET_CONFIG.defaultDistrict
        );

        params.set(
            "commodity",
            crop === "onion"
                ? "Onion"
                : "Wheat"
        );


        const response =
            await fetch(
                MARKET_CONFIG.apiUrl +
                "?" +
                params.toString()
            );


        if (!response.ok) {

            throw new Error(
                "Comparison request failed"
            );

        }


        const result =
            await response.json();


        const records =
            normalizeMarketRecords(
                result
            );


        document
            .querySelectorAll(
                "[data-market-card]"
            )
            .forEach(function (card) {

                const marketName =
                    card.getAttribute(
                        "data-market-card"
                    );


                const matchingRecord =
                    records.find(
                        function (record) {

                            return normalizeText(
                                record.market
                            ).includes(
                                normalizeText(
                                    marketName.replace(
                                        " APMC",
                                        ""
                                    )
                                )
                            );

                        }
                    );


                const priceElement =
                    card.querySelector(
                        ".comparison-price"
                    );


                const statusElement =
                    card.querySelector(
                        ".comparison-status"
                    );


                if (
                    matchingRecord &&
                    matchingRecord.price !== "—"
                ) {

                    if (priceElement) {

                        priceElement.textContent =
                            matchingRecord.price;

                    }


                    if (statusElement) {

                        statusElement.textContent =
                            getVerifiedStatusText();

                    }

                } else {

                    if (priceElement) {

                        priceElement.textContent =
                            "—";

                    }


                    if (statusElement) {

                        statusElement.textContent =
                            t("dataUnavailable");

                    }

                }

            });


    } catch (error) {

        console.error(
            "Comparison error:",
            error
        );

    }

}


/* ============================================================
   VERIFIED STATUS TEXT
   ============================================================ */

function getVerifiedStatusText() {

    if (currentLanguage === "hi") {
        return "सत्यापित डेटा";
    }

    if (currentLanguage === "mr") {
        return "सत्यापित डेटा";
    }

    return "Verified data";

}


/* ============================================================
   TRANSLATE CROP NAME FROM API
   ============================================================ */

function translateCropName(name) {

    const normalized =
        normalizeText(name);


    if (
        normalized.includes("onion") ||
        normalized.includes("kanda")
    ) {

        return t("onion");

    }


    if (
        normalized.includes("wheat") ||
        normalized.includes("gehu") ||
        normalized.includes("gahu")
    ) {

        return t("wheat");

    }


    return name;

}


/* ============================================================
   TRANSLATE MARKET NAME
   ============================================================ */

function translateMarketName(name) {

    const normalized =
        normalizeText(name);


    if (
        normalized.includes(
            "kopargaon"
        )
    ) {

        return t(
            "kopargaonMarket"
        );

    }


    if (
        normalized.includes(
            "yeola"
        )
    ) {

        return t(
            "yeolaMarket"
        );

    }


    if (
        normalized.includes(
            "shirdi"
        )
    ) {

        return t(
            "shirdiMarket"
        );

    }


    return name;

}


/* ============================================================
   CROP IMAGE
   ============================================================ */

function initializeCropHealth() {

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
                input.files &&
                input.files[0];


            if (!file) {

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

                /*
                   AI backend is not connected yet.
                   Do not pretend to perform AI analysis.
                */

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


/* ============================================================
   AI ASSISTANT
   ============================================================ */

function initializeAI() {

    const form =
        document.getElementById(
            "aiForm"
        );

    const input =
        document.getElementById(
            "aiInput"
        );


    if (!form || !input) {
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


            addChatMessage(
                question,
                "user"
            );


            input.value = "";


            /*
               AI backend has not been connected.
               Therefore we clearly show that it is unavailable.
            */

            setTimeout(
                function () {

                    addChatMessage(
                        t("aiNotAvailable"),
                        "assistant"
                    );

                },
                300
            );

        }
    );

}


/* ============================================================
   ADD CHAT MESSAGE
   ============================================================ */

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

            <div class="chat-avatar">
                👨‍🌾
            </div>

            <div>

                <strong>
                    ${escapeHTML(
                        currentFarmerData?.name ||
                        t("demoUser")
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        message
                    )}
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
                    ${escapeHTML(
                        t("assistant")
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        message
                    )}
                </p>

            </div>

        `;

    }


    container.appendChild(
        wrapper
    );


    container.scrollTop =
        container.scrollHeight;

}


/* ============================================================
   VOICE ASSISTANCE
   ============================================================ */

function initializeVoice() {

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

    const voiceResponse =
        document.getElementById(
            "voiceResponse"
        );


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        if (startButton) {

            startButton.addEventListener(
                "click",
                function () {

                    if (voiceResponse) {

                        voiceResponse.textContent =
                            t(
                                "voiceNotSupported"
                            );

                    }

                }
            );

        }

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        true;


    updateSpeechLanguage();


    recognition.onstart =
        function () {

            isListening =
                true;


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


            if (voiceResponse) {

                voiceResponse.textContent =
                    t("listening");

            }

        };


    recognition.onresult =
        function (event) {

            let transcript =
                "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;

            }


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }

        };


    recognition.onend =
        function () {

            isListening =
                false;


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


            if (voiceResponse) {

                voiceResponse.textContent =
                    t("voiceReady");

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice error:",
                event
            );


            isListening =
                false;


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


            if (voiceResponse) {

                voiceResponse.textContent =
                    t("voiceNotSupported");

            }

        };


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                if (
                    document.getElementById(
                        "voiceSetting"
                    ) &&
                    !document.getElementById(
                        "voiceSetting"
                    ).checked
                ) {

                    return;

                }


                if (!isListening) {

                    updateSpeechLanguage();

                    recognition.start();

                }

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function () {

                if (isListening) {

                    recognition.stop();

                }

            }
        );

    }

}


/* ============================================================
   SPEECH LANGUAGE
   ============================================================ */

function updateSpeechLanguage() {

    if (!recognition) {
        return;
    }


    const speechLanguages = {

        en:
            "en-IN",

        hi:
            "hi-IN",

        mr:
            "mr-IN"

    };


    recognition.lang =
        speechLanguages[
            currentLanguage
        ] || "en-IN";

}


/* ============================================================
   SETTINGS LANGUAGE
   ============================================================ */

function initializeSettings() {

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
                    dashboardLanguage.value
                );

            }
        );

    }


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            function () {

                changeApplicationLanguage(
                    settingsLanguage.value
                );

            }
        );

    }


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function () {

                /*
                   Registration language is saved when
                   account is created.
                */

                applyLanguage(
                    registerLanguage.value
                );

            }
        );

    }


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

}


/* ============================================================
   CHANGE APPLICATION LANGUAGE
   ============================================================ */

async function changeApplicationLanguage(
    language
) {

    applyLanguage(
        language
    );


    /*
       Save language to Firebase if a farmer is logged in.
    */

    if (currentUser) {

        try {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .update({

                    language:
                        language,

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });


            currentFarmerData = {

                ...(currentFarmerData || {}),

                language:
                    language

            };

        } catch (error) {

            console.error(
                "Language update error:",
                error
            );

        }

    }


    /*
       Refresh data-related screens after language change.
    */

    const activeSection =
        document.querySelector(
            ".app-section.active-section"
        );


    if (!activeSection) {
        return;
    }


    if (
        activeSection.id ===
        "weatherSection"
    ) {

        loadWeather();

    }


    if (
        activeSection.id ===
        "marketSection"
    ) {

        loadMarketPrices();

    }


    if (
        activeSection.id ===
        "comparisonSection"
    ) {

        loadMarketComparison();

    }

}


/* ============================================================
   VOICE SETTING
   ============================================================ */

function initializeVoiceSetting() {

    const checkbox =
        document.getElementById(
            "voiceSetting"
        );


    if (!checkbox) {
        return;
    }


    const saved =
        localStorage.getItem(
            "smartAgriVoiceEnabled"
        );


    if (saved !== null) {

        checkbox.checked =
            saved === "true";

    }


    checkbox.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "smartAgriVoiceEnabled",
                checkbox.checked
            );

        }
    );

}


/* ============================================================
   NOTIFICATION SETTING
   ============================================================ */

function initializeNotificationSetting() {

    const checkbox =
        document.getElementById(
            "notificationSetting"
        );


    if (!checkbox) {
        return;
    }


    const saved =
        localStorage.getItem(
            "smartAgriNotifications"
        );


    if (saved !== null) {

        checkbox.checked =
            saved === "true";

    }


    checkbox.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "smartAgriNotifications",
                checkbox.checked
            );

        }
    );

}


/* ============================================================
   SCHEME LINKS
   ============================================================ */

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


/* ============================================================
   CROP MODAL LANGUAGE SUPPORT
   ============================================================ */

function initializeCropModalLanguage() {

    /*
       The crop modal content is defined in the inline
       <script> inside your HTML.

       This function replaces the modal headings and
       common labels based on the selected language.

       Your existing crop modal functionality remains intact.
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".crop-info-button"
                );


            if (!button) {
                return;
            }


            setTimeout(
                function () {

                    translateCropModal();

                },
                20
            );

        }
    );

}


function translateCropModal() {

    const title =
        document.getElementById(
            "cropInfoModalTitle"
        );

    const subtitle =
        document.getElementById(
            "cropInfoModalSubtitle"
        );


    if (!title) {
        return;
    }


    /*
       The inline crop script initially writes English.
       We update common modal text according to language.
    */

    const currentTitle =
        title.textContent.trim();


    if (currentLanguage === "hi") {

        title.textContent =
            translateCropModalTitleHindi(
                currentTitle
            );

        if (subtitle) {

            subtitle.textContent =
                translateCropModalSubtitleHindi(
                    subtitle.textContent
                );

        }

    }


    if (currentLanguage === "mr") {

        title.textContent =
            translateCropModalTitleMarathi(
                currentTitle
            );

        if (subtitle) {

            subtitle.textContent =
                translateCropModalSubtitleMarathi(
                    subtitle.textContent
                );

        }

    }

}


function translateCropModalTitleHindi(
    title
) {

    if (
        title.includes("Onion Cultivation")
    ) {
        return "प्याज की खेती का मार्गदर्शन";
    }

    if (
        title.includes("Onion Crop Management")
    ) {
        return "प्याज फसल प्रबंधन";
    }

    if (
        title.includes("Onion Farming")
    ) {
        return "प्याज की कृषि पद्धतियां";
    }

    if (
        title.includes("Wheat Cultivation")
    ) {
        return "गेहूं की खेती का मार्गदर्शन";
    }

    if (
        title.includes("Wheat Crop Management")
    ) {
        return "गेहूं फसल प्रबंधन";
    }

    if (
        title.includes("Wheat Farming")
    ) {
        return "गेहूं की कृषि पद्धतियां";
    }

    return title;

}


function translateCropModalTitleMarathi(
    title
) {

    if (
        title.includes("Onion Cultivation")
    ) {
        return "कांदा लागवड मार्गदर्शन";
    }

    if (
        title.includes("Onion Crop Management")
    ) {
        return "कांदा पीक व्यवस्थापन";
    }

    if (
        title.includes("Onion Farming")
    ) {
        return "कांदा शेती पद्धती";
    }

    if (
        title.includes("Wheat Cultivation")
    ) {
        return "गहू लागवड मार्गदर्शन";
    }

    if (
        title.includes("Wheat Crop Management")
    ) {
        return "गहू पीक व्यवस्थापन";
    }

    if (
        title.includes("Wheat Farming")
    ) {
        return "गहू शेती पद्धती";
    }

    return title;

}


function translateCropModalSubtitleHindi(
    subtitle
) {

    return subtitle;

}


function translateCropModalSubtitleMarathi(
    subtitle
) {

    return subtitle;

}


/* ============================================================
   CHANGE LANGUAGE BUTTONS
   ============================================================ */

function initializeAllLanguageControls() {

    /*
       Make sure language is applied immediately
       when the page opens.
    */

    applyLanguage(
        currentLanguage
    );


    /*
       Keep language selectors synchronized.
    */

    [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ].forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                currentLanguage;

        }

    });

}


/* ============================================================
   ONLINE / OFFLINE BROWSER STATUS
   ============================================================ */

function initializeBrowserConnection() {

    function update() {

        const online =
            navigator.onLine;

        updateConnectionStatus(
            online
        );

    }


    window.addEventListener(
        "online",
        update
    );

    window.addEventListener(
        "offline",
        update
    );


    update();

}


/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return "";
    }


    return element.value.trim();

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
        message || "";


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


function formatNumber(
    value
) {

    const number =
        Number(value);


    if (
        Number.isNaN(number)
    ) {

        return "—";

    }


    return number.toFixed(0);

}


function normalizeText(
    text
) {

    return String(
        text || ""
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
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
   PAGE LOAD
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri JavaScript started."
        );


        /* Language */

        initializeLanguagePage();

        initializeAllLanguageControls();


        /* Navigation */

        initializeNavigation();

        initializeSideMenu();

        initializeProfileMenu();

        initializeAuthNavigation();


        /* Firebase */

        initializeLogin();

        initializeRegistration();

        initializeAuthState();

        initializePasswordReset();

        initializeLogoutButtons();


        /* Demo */

        initializeDemo();


        /* Profile */

        initializeProfileEditing();


        /* Weather */

        initializeWeather();


        /* Market */

        initializeMarketSelector();


        /* Crop health */

        initializeCropHealth();


        /* AI */

        initializeAI();


        /* Voice */

        initializeVoice();

        initializeVoiceSetting();


        /* Settings */

        initializeSettings();

        initializeNotificationSetting();


        /* Government schemes */

        initializeSchemeButtons();


        /* Crop modal */

        initializeCropModalLanguage();


        /* Browser connection */

        initializeBrowserConnection();


        /*
           If no saved language exists, keep language
           selection screen visible.

           If language already exists, automatically use it.
        */

        const savedLanguage =
            localStorage.getItem(
                "smartAgriLanguage"
            );


        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {

            applyLanguage(
                savedLanguage
            );

        }


        console.log(
            "SmartAgri initialized."
        );

    }
);
