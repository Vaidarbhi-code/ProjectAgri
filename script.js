/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND JAVASCRIPT
   =========================================================
   Backend:
     GET  /api/weather
     GET  /api/weather/history
     GET  /api/market-prices
     GET  /api/market/history
     POST /api/ai
     POST /api/crop-health
     GET  /api/status
     GET  /health

   Features:
     - Firebase Authentication
     - Firebase Firestore
     - Login / Register / Logout
     - Demo Dashboard
     - Online / Offline status
     - Navigation / side menu
     - Profile
     - English / Hindi / Marathi
     - Crop information
     - Live weather from Flask/Open-Meteo
     - Mandi prices from Flask/data.gov.in
     - Plant.id crop-health detector
     - AI assistant through Flask/OpenAI
     - Voice assistance
     - Government scheme links
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
   BACKEND CONFIGURATION
   ========================================================= */

/*
 * IMPORTANT:
 * If your browser opens the frontend from the same Flask server,
 * "/api/..." is correct.
 *
 * If your HTML is being opened separately with Live Server
 * (for example http://127.0.0.1:5500), use:
 *
 *   http://127.0.0.1:5000
 *
 * The automatic configuration below handles both cases.
 */

const BACKEND_BASE_URL =
    window.location.protocol === "file:"
        ? "http://127.0.0.1:5000"
        : (
            window.location.port === "5500" ||
            window.location.port === "5501" ||
            window.location.port === "3000" ||
            window.location.port === "5173"
        )
            ? "http://127.0.0.1:5000"
            : "";


/* =========================================================
   FIREBASE INITIALIZATION
   ========================================================= */

let firebaseReady = false;
let auth = null;
let db = null;

try {

    if (typeof firebase !== "undefined") {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseReady = true;

        console.log(
            "SmartAgri: Firebase initialized."
        );

    } else {

        console.warn(
            "SmartAgri: Firebase SDK not loaded."
        );

    }

} catch (error) {

    console.error(
        "SmartAgri: Firebase initialization error:",
        error
    );

}


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let currentLanguage =
    localStorage.getItem(
        "smartAgriLanguage"
    ) || "en";

let currentUser = null;
let currentFarmerData = null;

let speechRecognition = null;

let selectedCropImageFile = null;


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

        analysisLoading:
            "Analyzing your crop image...",

        analysisSuccess:
            "Crop analysis completed.",

        analysisFailed:
            "Crop analysis failed.",

        analysisNoResult:
            "No crop-health result was returned.",

        plantIdentified:
            "Plant Identified",

        healthStatus:
            "Health Status",

        disease:
            "Disease",

        confidence:
            "Confidence",

        healthy:
            "Healthy",

        possibleDisease:
            "Possible Disease",

        recommendations:
            "Recommendations",

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
            "AI service is not available.",

        askQuestion:
            "Ask a farming question...",

        aiConnectionNote:
            "AI answers are provided by the connected SmartAgri backend.",

        aiThinking:
            "Thinking...",

        aiError:
            "Unable to get an AI response right now.",

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
            "Multilingual Support",

        offline:
            "Offline",

        online:
            "Online",

        loading:
            "Loading...",

        noData:
            "No data available.",

        error:
            "Something went wrong.",

        saved:
            "Saved successfully.",

        loginSuccessful:
            "Login successful.",

        accountCreated:
            "Account created successfully."

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
            "SmartAgri तक पहुँचने के लिए लॉगिन करें",

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
            "कोपरगांव कृषि बाजार",

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
            "सरकारी योजनाएँ",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

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
            "दिनांक",

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
            "कृषि पद्धतियाँ",

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
            "फसल विश्लेषण के लिए AI सेवा कनेक्ट करें।",

        analysisLoading:
            "फसल की तस्वीर का विश्लेषण किया जा रहा है...",

        analysisSuccess:
            "फसल विश्लेषण पूरा हुआ।",

        analysisFailed:
            "फसल विश्लेषण विफल हुआ।",

        analysisNoResult:
            "फसल स्वास्थ्य का कोई परिणाम नहीं मिला।",

        plantIdentified:
            "पहचाना गया पौधा",

        healthStatus:
            "स्वास्थ्य स्थिति",

        disease:
            "रोग",

        confidence:
            "विश्वास स्तर",

        healthy:
            "स्वस्थ",

        possibleDisease:
            "संभावित रोग",

        recommendations:
            "सुझाव",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएँ।",

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
            "कृषि से जुड़े प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI कनेक्ट नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी उपलब्ध नहीं है।",

        askQuestion:
            "कृषि से जुड़ा प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तर SmartAgri के कनेक्टेड बैकएंड द्वारा दिए जाते हैं।",

        aiThinking:
            "सोच रहा हूँ...",

        aiError:
            "अभी AI उत्तर प्राप्त नहीं हो सका।",

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
            "आवाज इनपुट यहाँ दिखाई देगा...",

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
            "SmartAgri की प्राथमिकताएँ प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",

        voiceSettingDescription:
            "आवाज सहायता चालू या बंद करें।",

        notifications:
            "सूचनाएँ",

        notificationDescription:
            "एप्लिकेशन सूचनाएँ चालू या बंद करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        loading:
            "लोड हो रहा है...",

        noData:
            "कोई डेटा उपलब्ध नहीं है।",

        error:
            "कुछ गलत हो गया।",

        saved:
            "सफलतापूर्वक सहेजा गया।",

        loginSuccessful:
            "लॉगिन सफल हुआ।",

        accountCreated:
            "खाता सफलतापूर्वक बनाया गया।"

    },


    /* =====================================================
       MARATHI
       ===================================================== */

    mr: {

        appName:
            "स्मार्टअ‍ॅग्री",

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
            "कोपरगाव कृषी बाजार",

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
            "स्वागत आहे",

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
            "महत्त्वाची शेती साधने पटकन वापरा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

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
            "बाजारपेठ",

        crop:
            "पीक",

        price:
            "भाव",

        date:
            "दिनांक",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",

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
            "पीक विश्लेषणासाठी AI सेवा कनेक्ट करा.",

        analysisLoading:
            "पिकाच्या फोटोचे विश्लेषण केले जात आहे...",

        analysisSuccess:
            "पीक विश्लेषण पूर्ण झाले.",

        analysisFailed:
            "पीक विश्लेषण अयशस्वी झाले.",

        analysisNoResult:
            "पिकाच्या आरोग्याचा निकाल मिळाला नाही.",

        plantIdentified:
            "ओळखलेले पीक",

        healthStatus:
            "आरोग्य स्थिती",

        disease:
            "रोग",

        confidence:
            "विश्वास पातळी",

        healthy:
            "निरोगी",

        possibleDisease:
            "संभाव्य रोग",

        recommendations:
            "शिफारसी",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी योजना.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "प्रधानमंत्री पीक विमा योजनेची अधिकृत माहिती.",

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
            "AI सेवा सध्या उपलब्ध नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरे SmartAgri च्या कनेक्टेड बॅकएंडद्वारे दिली जातात.",

        aiThinking:
            "विचार करत आहे...",

        aiError:
            "सध्या AI उत्तर मिळू शकले नाही.",

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
            "SmartAgri च्या पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अ‍ॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अ‍ॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri हे शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषी सहाय्य",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        loading:
            "लोड होत आहे...",

        noData:
            "डेटा उपलब्ध नाही.",

        error:
            "काहीतरी चूक झाली.",

        saved:
            "यशस्वीरित्या जतन केले.",

        loginSuccessful:
            "लॉगिन यशस्वी झाले.",

        accountCreated:
            "खाते यशस्वीरित्या तयार झाले."

    }

};


/* =========================================================
   CROP INFORMATION
   ========================================================= */

const cropInformation = {

    onion: {

        name: "Onion",

        icon: "🧅",

        cultivation: {

            title: {
                en: "Onion Cultivation Guidance",
                hi: "प्याज खेती मार्गदर्शन",
                mr: "कांदा लागवड मार्गदर्शन"
            },

            subtitle: {
                en: "Important steps for growing onion successfully.",
                hi: "प्याज की सफल खेती के लिए महत्वपूर्ण चरण।",
                mr: "कांद्याची यशस्वी लागवड करण्यासाठी महत्त्वाचे टप्पे."
            },

            content: {

                en: `
                    <h3>🌱 Land Preparation</h3>
                    <p>
                        Prepare a fine, well-drained soil bed.
                        Onion performs best in loose soil with good drainage.
                    </p>

                    <h3>🌱 Planting</h3>
                    <p>
                        Use healthy seedlings or suitable onion sets.
                        Maintain proper spacing between plants and rows.
                    </p>

                    <h3>💧 Irrigation</h3>
                    <p>
                        Provide regular irrigation according to soil moisture
                        and weather conditions. Avoid waterlogging.
                    </p>

                    <h3>☀️ Field Conditions</h3>
                    <p>
                        Onion requires adequate sunlight and good air movement
                        around the crop.
                    </p>
                `,

                hi: `
                    <h3>🌱 भूमि तैयारी</h3>
                    <p>
                        अच्छी जल निकासी वाली भुरभुरी मिट्टी तैयार करें।
                        प्याज की फसल जल निकासी वाली मिट्टी में अच्छी होती है।
                    </p>

                    <h3>🌱 रोपाई</h3>
                    <p>
                        स्वस्थ पौध या उपयुक्त रोपण सामग्री का उपयोग करें।
                        पौधों और कतारों के बीच उचित दूरी रखें।
                    </p>

                    <h3>💧 सिंचाई</h3>
                    <p>
                        मिट्टी की नमी और मौसम के अनुसार नियमित सिंचाई करें।
                        खेत में पानी जमा न होने दें।
                    </p>

                    <h3>☀️ खेत की स्थिति</h3>
                    <p>
                        प्याज के लिए पर्याप्त धूप और अच्छा वायु संचार आवश्यक है।
                    </p>
                `,

                mr: `
                    <h3>🌱 जमीन तयार करणे</h3>
                    <p>
                        चांगला निचरा होणारी भुसभुशीत जमीन तयार करा.
                        कांद्याला योग्य निचरा असलेली जमीन चांगली असते.
                    </p>

                    <h3>🌱 लागवड</h3>
                    <p>
                        निरोगी रोपे किंवा योग्य लागवड साहित्य वापरा.
                        रोपे आणि ओळींमध्ये योग्य अंतर ठेवा.
                    </p>

                    <h3>💧 सिंचन</h3>
                    <p>
                        जमिनीतील ओलावा आणि हवामानानुसार नियमित पाणी द्या.
                        शेतात पाणी साचू देऊ नका.
                    </p>

                    <h3>☀️ शेताची परिस्थिती</h3>
                    <p>
                        कांद्याला पुरेसा सूर्यप्रकाश आणि चांगली हवा आवश्यक आहे.
                    </p>
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
                    <p>
                        Maintain consistent soil moisture during bulb development.
                        Avoid excessive irrigation.
                    </p>

                    <h3>🌿 Weed Management</h3>
                    <p>
                        Keep the field free from weeds because weeds compete
                        with onion plants for water, nutrients and sunlight.
                    </p>

                    <h3>🧪 Nutrient Management</h3>
                    <p>
                        Apply nutrients according to soil condition and
                        recommended agricultural practices.
                    </p>

                    <h3>🔍 Crop Monitoring</h3>
                    <p>
                        Regularly inspect plants for pests, diseases,
                        yellowing leaves and poor growth.
                    </p>
                `,

                hi: `
                    <h3>💧 जल प्रबंधन</h3>
                    <p>
                        कंद बनने के दौरान मिट्टी में उचित नमी बनाए रखें।
                        अधिक सिंचाई से बचें।
                    </p>

                    <h3>🌿 खरपतवार प्रबंधन</h3>
                    <p>
                        खेत को खरपतवार से मुक्त रखें क्योंकि खरपतवार पानी,
                        पोषक तत्व और धूप के लिए फसल से प्रतिस्पर्धा करते हैं।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>
                    <p>
                        मिट्टी की स्थिति और अनुशंसित कृषि पद्धतियों के अनुसार
                        पोषक तत्व दें।
                    </p>

                    <h3>🔍 फसल निरीक्षण</h3>
                    <p>
                        कीट, रोग, पीली पत्तियों और खराब वृद्धि के लिए
                        नियमित रूप से फसल की जांच करें।
                    </p>
                `,

                mr: `
                    <h3>💧 पाणी व्यवस्थापन</h3>
                    <p>
                        कांदा वाढीच्या काळात जमिनीत योग्य ओलावा ठेवा.
                        जास्त पाणी देणे टाळा.
                    </p>

                    <h3>🌿 तण व्यवस्थापन</h3>
                    <p>
                        शेत तणमुक्त ठेवा कारण तण पाणी, अन्नद्रव्ये आणि
                        सूर्यप्रकाशासाठी पिकाशी स्पर्धा करतात.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                    <p>
                        मातीची स्थिती आणि शिफारस केलेल्या कृषी पद्धतीनुसार
                        अन्नद्रव्ये द्या.
                    </p>

                    <h3>🔍 पीक निरीक्षण</h3>
                    <p>
                        कीड, रोग, पिवळी पाने आणि कमी वाढ यासाठी पिकाची
                        नियमित तपासणी करा.
                    </p>
                `

            }

        },


        practices: {

            title: {
                en: "Onion Farming Practices",
                hi: "प्याज खेती की पद्धतियाँ",
                mr: "कांदा शेती पद्धती"
            },

            subtitle: {
                en: "Practical recommendations for better crop production.",
                hi: "बेहतर फसल उत्पादन के लिए व्यावहारिक सुझाव।",
                mr: "चांगल्या पीक उत्पादनासाठी व्यावहारिक शिफारसी."
            },

            content: {

                en: `
                    <h3>🚜 Field Hygiene</h3>
                    <p>
                        Remove diseased plant material and maintain clean
                        cultivation areas.
                    </p>

                    <h3>🌱 Healthy Planting Material</h3>
                    <p>
                        Start with healthy, disease-free seedlings or planting
                        material.
                    </p>

                    <h3>🔄 Crop Rotation</h3>
                    <p>
                        Avoid repeatedly growing the same crop in the same
                        field when possible.
                    </p>

                    <h3>📦 Harvest Management</h3>
                    <p>
                        Harvest bulbs when they reach maturity and allow
                        appropriate curing before storage.
                    </p>
                `,

                hi: `
                    <h3>🚜 खेत की स्वच्छता</h3>
                    <p>
                        रोगग्रस्त पौधों को हटाएं और खेती का क्षेत्र साफ रखें।
                    </p>

                    <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                    <p>
                        स्वस्थ और रोगमुक्त पौध या रोपण सामग्री से शुरुआत करें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>
                    <p>
                        संभव हो तो एक ही खेत में बार-बार एक ही फसल उगाने से बचें।
                    </p>

                    <h3>📦 कटाई प्रबंधन</h3>
                    <p>
                        कंदों के परिपक्व होने पर कटाई करें और भंडारण से पहले
                        उचित तरीके से सुखाएं।
                    </p>
                `,

                mr: `
                    <h3>🚜 शेत स्वच्छता</h3>
                    <p>
                        रोगट झाडे काढून टाका आणि शेतीचा परिसर स्वच्छ ठेवा.
                    </p>

                    <h3>🌱 निरोगी लागवड साहित्य</h3>
                    <p>
                        निरोगी आणि रोगमुक्त रोपे किंवा लागवड साहित्य वापरा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>
                    <p>
                        शक्य असल्यास एकाच शेतात वारंवार तेच पीक घेणे टाळा.
                    </p>

                    <h3>📦 काढणी व्यवस्थापन</h3>
                    <p>
                        कांदे पूर्ण वाढल्यानंतर काढणी करा आणि साठवणुकीपूर्वी
                        योग्य प्रकारे वाळवा.
                    </p>
                `

            }

        }

    },


    wheat: {

        name: "Wheat",

        icon: "🌾",

        cultivation: {

            title: {
                en: "Wheat Cultivation Guidance",
                hi: "गेहूं खेती मार्गदर्शन",
                mr: "गहू लागवड मार्गदर्शन"
            },

            subtitle: {
                en: "Important steps for successful wheat production.",
                hi: "गेहूं के सफल उत्पादन के लिए महत्वपूर्ण चरण।",
                mr: "गव्हाच्या यशस्वी उत्पादनासाठी महत्त्वाचे टप्पे."
            },

            content: {

                en: `
                    <h3>🌱 Soil Preparation</h3>
                    <p>
                        Prepare a well-levelled seedbed with suitable soil
                        moisture for uniform germination.
                    </p>

                    <h3>🌾 Seed Selection</h3>
                    <p>
                        Use healthy and suitable wheat seed varieties
                        recommended for your growing region.
                    </p>

                    <h3>💧 Irrigation</h3>
                    <p>
                        Irrigate according to crop stage, soil moisture and
                        weather conditions.
                    </p>

                    <h3>☀️ Crop Conditions</h3>
                    <p>
                        Wheat generally performs best under suitable cool
                        growing conditions with adequate sunlight.
                    </p>
                `,

                hi: `
                    <h3>🌱 मिट्टी की तैयारी</h3>
                    <p>
                        समान अंकुरण के लिए अच्छी तरह समतल और उचित नमी वाली
                        बीज क्यारी तैयार करें।
                    </p>

                    <h3>🌾 बीज चयन</h3>
                    <p>
                        अपने क्षेत्र के लिए अनुशंसित स्वस्थ और उपयुक्त
                        गेहूं की किस्मों का उपयोग करें।
                    </p>

                    <h3>💧 सिंचाई</h3>
                    <p>
                        फसल अवस्था, मिट्टी की नमी और मौसम के अनुसार सिंचाई करें।
                    </p>

                    <h3>☀️ फसल की स्थिति</h3>
                    <p>
                        गेहूं सामान्यतः उपयुक्त ठंडे मौसम और पर्याप्त
                        सूर्यप्रकाश में अच्छी तरह बढ़ता है।
                    </p>
                `,

                mr: `
                    <h3>🌱 जमीन तयार करणे</h3>
                    <p>
                        एकसारख्या उगवणीसाठी योग्य ओलावा असलेली आणि सपाट
                        वाफेची जमीन तयार करा.
                    </p>

                    <h3>🌾 बियाणे निवड</h3>
                    <p>
                        तुमच्या भागासाठी शिफारस केलेले निरोगी आणि योग्य
                        गव्हाचे वाण वापरा.
                    </p>

                    <h3>💧 सिंचन</h3>
                    <p>
                        पिकाची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार
                        पाणी द्या.
                    </p>

                    <h3>☀️ पीक परिस्थिती</h3>
                    <p>
                        गहू योग्य थंड हवामान आणि पुरेशा सूर्यप्रकाशात
                        चांगला वाढतो.
                    </p>
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
                en: "Manage wheat from germination to harvest.",
                hi: "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",
                mr: "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा."
            },

            content: {

                en: `
                    <h3>💧 Irrigation Management</h3>
                    <p>
                        Pay particular attention to irrigation during important
                        crop growth stages.
                    </p>

                    <h3>🌿 Weed Control</h3>
                    <p>
                        Monitor the field for weeds and use appropriate
                        integrated weed-management practices.
                    </p>

                    <h3>🔍 Pest Monitoring</h3>
                    <p>
                        Regularly inspect the crop for insects, disease symptoms
                        and abnormal plant growth.
                    </p>

                    <h3>🧪 Nutrient Management</h3>
                    <p>
                        Apply fertilizers based on soil testing and recommended
                        crop requirements.
                    </p>
                `,

                hi: `
                    <h3>💧 सिंचाई प्रबंधन</h3>
                    <p>
                        फसल की महत्वपूर्ण वृद्धि अवस्थाओं में सिंचाई पर
                        विशेष ध्यान दें।
                    </p>

                    <h3>🌿 खरपतवार नियंत्रण</h3>
                    <p>
                        खेत में खरपतवार की निगरानी करें और उचित एकीकृत
                        खरपतवार प्रबंधन अपनाएं।
                    </p>

                    <h3>🔍 कीट निगरानी</h3>
                    <p>
                        कीट, रोग के लक्षण और असामान्य वृद्धि के लिए
                        नियमित रूप से फसल की जांच करें।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>
                    <p>
                        मिट्टी परीक्षण और फसल की अनुशंसित आवश्यकता के
                        आधार पर उर्वरक दें।
                    </p>
                `,

                mr: `
                    <h3>💧 सिंचन व्यवस्थापन</h3>
                    <p>
                        पिकाच्या महत्त्वाच्या वाढीच्या अवस्थांमध्ये
                        सिंचनाकडे विशेष लक्ष द्या.
                    </p>

                    <h3>🌿 तण नियंत्रण</h3>
                    <p>
                        शेतातील तणांचे निरीक्षण करा आणि योग्य एकात्मिक
                        तण व्यवस्थापन पद्धती वापरा.
                    </p>

                    <h3>🔍 किडींचे निरीक्षण</h3>
                    <p>
                        किडी, रोगाची लक्षणे आणि असामान्य वाढ यासाठी
                        पिकाची नियमित तपासणी करा.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                    <p>
                        माती परीक्षण आणि पिकाच्या शिफारस केलेल्या
                        गरजेनुसार खतांचा वापर करा.
                    </p>
                `

            }

        },


        practices: {

            title: {
                en: "Wheat Farming Practices",
                hi: "गेहूं खेती की पद्धतियाँ",
                mr: "गहू शेती पद्धती"
            },

            subtitle: {
                en: "Practical methods for maintaining a healthy wheat crop.",
                hi: "स्वस्थ गेहूं फसल के लिए व्यावहारिक तरीके।",
                mr: "निरोगी गहू पिकासाठी व्यावहारिक पद्धती."
            },

            content: {

                en: `
                    <h3>🌱 Timely Sowing</h3>
                    <p>
                        Follow the locally recommended sowing window for the
                        wheat variety and growing region.
                    </p>

                    <h3>🚜 Field Preparation</h3>
                    <p>
                        Maintain a level and properly prepared seedbed to
                        support uniform crop establishment.
                    </p>

                    <h3>🔄 Crop Rotation</h3>
                    <p>
                        Crop rotation can help improve soil management and
                        reduce recurring crop-related problems.
                    </p>

                    <h3>🌾 Harvesting</h3>
                    <p>
                        Harvest when the crop reaches appropriate maturity and
                        grain moisture is suitable for harvesting and storage.
                    </p>
                `,

                hi: `
                    <h3>🌱 समय पर बुवाई</h3>
                    <p>
                        गेहूं की किस्म और क्षेत्र के अनुसार अनुशंसित
                        बुवाई समय का पालन करें।
                    </p>

                    <h3>🚜 खेत की तैयारी</h3>
                    <p>
                        समान फसल स्थापना के लिए खेत को समतल और उचित
                        तरीके से तैयार रखें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>
                    <p>
                        फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है और
                        बार-बार होने वाली समस्याओं को कम कर सकता है।
                    </p>

                    <h3>🌾 कटाई</h3>
                    <p>
                        फसल उचित परिपक्वता पर पहुंचने के बाद और अनाज की
                        नमी उपयुक्त होने पर कटाई करें।
                    </p>
                `,

                mr: `
                    <h3>🌱 वेळेवर पेरणी</h3>
                    <p>
                        गव्हाच्या वाणासाठी आणि तुमच्या भागासाठी शिफारस
                        केलेल्या पेरणीच्या कालावधीचे पालन करा.
                    </p>

                    <h3>🚜 शेताची तयारी</h3>
                    <p>
                        एकसारखी पीक उगवण होण्यासाठी जमीन सपाट आणि
                        योग्य प्रकारे तयार ठेवा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>
                    <p>
                        पीक फेरपालट माती व्यवस्थापन सुधारण्यास आणि
                        वारंवार होणाऱ्या समस्या कमी करण्यास मदत करू शकते.
                    </p>

                    <h3>🌾 काढणी</h3>
                    <p>
                        पीक योग्य परिपक्व झाल्यानंतर आणि धान्यातील ओलावा
                        योग्य असल्यावर काढणी करा.
                    </p>
                `

            }

        }

    }

};


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function $(id) {
    return document.getElementById(id);
}


function apiUrl(path) {

    if (!path.startsWith("/")) {
        path = "/" + path;
    }

    return BACKEND_BASE_URL + path;
}


function safeText(id, value) {

    const element = $(id);

    if (!element) {
        return;
    }

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        element.textContent = "—";

    } else {

        element.textContent = value;

    }
}


function show(element) {

    if (element) {
        element.classList.remove("hidden");
    }

}


function hide(element) {

    if (element) {
        element.classList.add("hidden");
    }

}


function setValue(id, value) {

    const element = $(id);

    if (element) {
        element.value =
            value ?? "";
    }

}


function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function t(key) {

    return (
        translations[currentLanguage]?.[key] ??
        translations.en[key] ??
        key
    );

}


function getErrorMessage(data, fallback) {

    if (!data) {
        return fallback;
    }

    return (
        data.error ||
        data.message ||
        data.details ||
        fallback
    );

}


/* =========================================================
   LANGUAGE
   ========================================================= */

function translatePage(
    language = currentLanguage
) {

    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    localStorage.setItem(
        "smartAgriLanguage",
        currentLanguage
    );


    /* -----------------------------------------------------
       data-i18n elements
       ----------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            const translated =
                translations[
                    currentLanguage
                ]?.[key];

            if (
                translated !== undefined
            ) {

                element.textContent =
                    translated;

            }

        });


    /* -----------------------------------------------------
       Placeholders
       ----------------------------------------------------- */

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            const translated =
                translations[
                    currentLanguage
                ]?.[key];

            if (
                translated !== undefined
            ) {

                element.placeholder =
                    translated;

            }

        });


    /* -----------------------------------------------------
       Select elements
       ----------------------------------------------------- */

    [
        "dashboardLanguage",
        "settingsLanguage",
        "registerLanguage",
        "profileLanguage"
    ].forEach(id => {

        const element = $(id);

        if (element) {
            element.value =
                currentLanguage;
        }

    });


    updateMarketSelector();

    updateConnectionStatus(
        navigator.onLine
    );

    updateDynamicLanguageContent();

    updateCropAnalysisLanguage();

    updateVoiceLanguage();

}


/* =========================================================
   FIX STATIC TEXT THAT MAY NOT HAVE data-i18n
   ========================================================= */

function updateDynamicLanguageContent() {

    /*
     * Some existing HTML elements may not have data-i18n.
     * These IDs are handled directly so language changes
     * still work with your current HTML.
     */

    const mappings = {

        dashboardHeading:
            "dashboard",

        weatherHeading:
            "currentWeather",

        marketHeading:
            "marketPrices",

        marketComparisonHeading:
            "marketComparison",

        cropInformationHeading:
            "cropInformation",

        cropHealthHeading:
            "cropHealth",

        governmentSchemesHeading:
            "governmentSchemes",

        aiHeading:
            "aiAssistant",

        voiceHeading:
            "voiceAssistance",

        profileHeading:
            "farmerProfile",

        settingsHeading:
            "settings",

        aboutHeading:
            "about"

    };


    Object.entries(
        mappings
    ).forEach(
        ([id, key]) => {

            const element = $(id);

            if (
                element &&
                !element.hasAttribute(
                    "data-i18n"
                )
            ) {

                element.textContent =
                    t(key);

            }

        }
    );

}


/* =========================================================
   MARKET SELECTOR
   ========================================================= */

function updateMarketSelector() {

    const selectors = [
        "registerMarket",
        "profileMarket"
    ];

    selectors.forEach(id => {

        const select = $(id);

        if (!select) {
            return;
        }

        select
            .querySelectorAll("option")
            .forEach(option => {

                const key =
                    option.getAttribute(
                        "data-i18n"
                    );

                if (
                    key &&
                    translations[
                        currentLanguage
                    ]?.[key]
                ) {

                    option.textContent =
                        translations[
                            currentLanguage
                        ][key];

                }

            });

    });

}


/* =========================================================
   LANGUAGE SELECTORS
   ========================================================= */

function setupLanguageSelectors() {

    document
        .querySelectorAll(
            ".language-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".language-option"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "selected"
                            );

                        });

                    this.classList.add(
                        "selected"
                    );

                    const language =
                        this.dataset.language;

                    if (
                        translations[language]
                    ) {

                        translatePage(
                            language
                        );

                    }

                }
            );

        });


    const continueButton =
        $("continueLanguageBtn");

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                translatePage(
                    currentLanguage
                );

                showPage(
                    "loginPage"
                );

            }
        );

    }


    setupSelectLanguage(
        "dashboardLanguage"
    );

    setupSelectLanguage(
        "settingsLanguage"
    );

    setupSelectLanguage(
        "registerLanguage"
    );

    setupSelectLanguage(
        "profileLanguage"
    );


    const changeLanguageFromLogin =
        $("changeLanguageFromLogin");

    if (
        changeLanguageFromLogin
    ) {

        changeLanguageFromLogin.addEventListener(
            "click",
            function () {

                showPage(
                    "languagePage"
                );

            }
        );

    }

}


function setupSelectLanguage(id) {

    const select = $(id);

    if (!select) {
        return;
    }

    select.addEventListener(
        "change",
        function () {

            translatePage(
                this.value
            );

            /*
             * Also update the saved Firestore
             * profile language when possible.
             */

            if (
                currentFarmerData
            ) {

                currentFarmerData
                    .preferredLanguage =
                    this.value;

            }

        }
    );

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    const page = $(pageId);

    if (page) {

        page.classList.add(
            "active-screen"
        );

    }

}


function showDashboard() {

    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.add(
            "dashboard-visible"
        );

        dashboard.style.display =
            "block";

    }


    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const dashboardSection =
        $("dashboardSection");

    if (dashboardSection) {

        dashboardSection.classList.add(
            "active-section"
        );

    }

}


/* =========================================================
   DASHBOARD NAVIGATION
   ========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const sectionId =
                        this.getAttribute(
                            "data-section"
                        );

                    if (!sectionId) {
                        return;
                    }

                    openDashboardSection(
                        sectionId
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const sectionId =
                        this.getAttribute(
                            "data-profile-section"
                        );

                    openDashboardSection(
                        sectionId
                    );

                    closeProfileMenu();

                }
            );

        });

}


function openDashboardSection(
    sectionId
) {

    document
        .querySelectorAll(".app-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const target =
        $(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    closeSideMenu();

    closeProfileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        sectionId ===
        "weatherSection"
    ) {

        updateWeatherUI();

    }


    if (
        sectionId ===
        "marketSection"
    ) {

        loadMarketPrices();

    }

}


/* =========================================================
   SIDE MENU
   ========================================================= */

function setupSideMenu() {

    const hamburger =
        $("hamburgerBtn");

    const closeButton =
        $("closeMenuBtn");

    const overlay =
        $("menuOverlay");


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


/* =========================================================
   PROFILE MENU
   ========================================================= */

function setupProfileMenu() {

    const profileButton =
        $("profileButton");


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const menu =
                    $("profileMenu");

                if (menu) {

                    menu.classList.toggle(
                        "active"
                    );

                }

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
                !menu.contains(
                    event.target
                ) &&
                !button.contains(
                    event.target
                )
            ) {

                closeProfileMenu();

            }

        }
    );

}


function closeProfileMenu() {

    const menu =
        $("profileMenu");

    if (menu) {

        menu.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CONNECTION STATUS
   ========================================================= */

function setupConnectionStatus() {

    window.addEventListener(
        "online",
        function () {

            updateConnectionStatus(
                true
            );

            /*
             * When connection comes back,
             * refresh backend data.
             */

            updateBackendStatus();

        }
    );


    window.addEventListener(
        "offline",
        function () {

            updateConnectionStatus(
                false
            );

        }
    );


    updateConnectionStatus(
        navigator.onLine
    );

}


function updateConnectionStatus(
    isOnline
) {

    const status =
        $("connectionStatus");

    const connectionText =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


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


    const text =
        isOnline
            ? t("online")
            : t("offline");


    if (connectionText) {

        connectionText.textContent =
            text;

    }


    if (dashboardText) {

        dashboardText.textContent =
            text;

    }

}


/* =========================================================
   BACKEND STATUS
   ========================================================= */

async function updateBackendStatus() {

    try {

        const response =
            await fetch(
                apiUrl(
                    "/api/status"
                ),
                {
                    method: "GET",
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "Backend status " +
                response.status
            );
        }

        const data =
            await response.json();

        console.log(
            "SmartAgri backend status:",
            data
        );

        /*
         * Backend is reachable even if
         * navigator.onLine gives an incorrect
         * result in some browser situations.
         */

        updateConnectionStatus(
            true
        );

        return data;

    } catch (error) {

        console.warn(
            "SmartAgri backend unavailable:",
            error
        );

        return null;

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

function setupLogin() {

    const loginForm =
        $("loginForm");

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                $("loginEmail")
                    ?.value
                    .trim();

            const password =
                $("loginPassword")
                    ?.value;

            const message =
                $("loginMessage");


            if (
                !email ||
                !password
            ) {

                setMessage(
                    message,
                    currentLanguage === "hi"
                        ? "कृपया ईमेल और पासवर्ड दर्ज करें।"
                        : currentLanguage === "mr"
                            ? "कृपया ईमेल आणि पासवर्ड प्रविष्ट करा."
                            : "Please enter email and password.",
                    "error"
                );

                return;

            }


            if (
                !firebaseReady ||
                !auth
            ) {

                setMessage(
                    message,
                    "Firebase is not available. Use Demo Dashboard.",
                    "error"
                );

                return;

            }


            setMessage(
                message,
                currentLanguage === "hi"
                    ? "लॉगिन हो रहा है..."
                    : currentLanguage === "mr"
                        ? "लॉगिन होत आहे..."
                        : "Logging in...",
                "info"
            );


            try {

                const result =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    result.user;


                await loadFarmerData(
                    currentUser
                );


                setMessage(
                    message,
                    t("loginSuccessful"),
                    "success"
                );


                setTimeout(
                    () => {

                        showDashboard();

                    },
                    400
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                let errorMessage =
                    "Login failed.";


                if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    errorMessage =
                        "No account found with this email.";

                } else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    errorMessage =
                        "Incorrect password.";

                } else if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    errorMessage =
                        "Invalid email or password.";

                } else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    errorMessage =
                        "Please enter a valid email.";

                }


                setMessage(
                    message,
                    errorMessage,
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   REGISTRATION
   ========================================================= */

function setupRegistration() {

    const form =
        $("registrationForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                $("registerName")
                    ?.value
                    .trim();

            const email =
                $("registerEmail")
                    ?.value
                    .trim();

            const mobile =
                $("registerMobile")
                    ?.value
                    .trim();

            const village =
                $("registerVillage")
                    ?.value
                    .trim();

            const state =
                $("registerState")
                    ?.value
                    .trim();

            const landArea =
                $("registerLandArea")
                    ?.value
                    .trim();

            const market =
                $("registerMarket")
                    ?.value;

            const language =
                $("registerLanguage")
                    ?.value ||
                "en";

            const password =
                $("registerPassword")
                    ?.value;

            const message =
                $("registerMessage");


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

                setMessage(
                    message,
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            if (
                !firebaseReady ||
                !auth ||
                !db
            ) {

                setMessage(
                    message,
                    "Firebase is not available.",
                    "error"
                );

                return;

            }


            setMessage(
                message,
                "Creating account...",
                "info"
            );


            try {

                const result =
                    await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );


                const user =
                    result.user;


                const farmerData = {

                    uid:
                        user.uid,

                    name:
                        name,

                    email:
                        email,

                    mobile:
                        mobile,

                    village:
                        village,

                    state:
                        state,

                    landArea:
                        landArea,

                    preferredMarket:
                        market,

                    preferredLanguage:
                        language,

                    createdAt:
                        firebase.firestore
                            .FieldValue
                            .serverTimestamp()

                };


                await db
                    .collection(
                        "farmers"
                    )
                    .doc(
                        user.uid
                    )
                    .set(
                        farmerData
                    );


                currentUser =
                    user;

                currentFarmerData =
                    farmerData;


                translatePage(
                    language
                );

                fillProfile(
                    farmerData
                );


                setMessage(
                    message,
                    t("accountCreated"),
                    "success"
                );


                setTimeout(
                    () => {

                        showDashboard();

                    },
                    500
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                let errorMessage =
                    "Registration failed.";


                if (
                    error.code ===
                    "auth/email-already-in-use"
                ) {

                    errorMessage =
                        "An account already exists with this email.";

                } else if (
                    error.code ===
                    "auth/weak-password"
                ) {

                    errorMessage =
                        "Password should contain at least 6 characters.";

                } else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    errorMessage =
                        "Please enter a valid email address.";

                }


                setMessage(
                    message,
                    errorMessage,
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   AUTH NAVIGATION
   ========================================================= */

function setupAuthNavigation() {

    const registerButton =
        $("showRegisterBtn");

    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                showPage(
                    "registerPage"
                );

            }
        );

    }


    const loginButton =
        $("showLoginBtn");

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function () {

                showPage(
                    "loginPage"
                );

            }
        );

    }


    const demoButton =
        $("demoBtn");

    if (demoButton) {

        demoButton.addEventListener(
            "click",
            function () {

                startDemoDashboard();

            }
        );

    }


    const forgotButton =
        $("forgotPasswordBtn");

    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            handleForgotPassword
        );

    }

}


/* =========================================================
   DEMO DASHBOARD
   ========================================================= */

function startDemoDashboard() {

    currentUser = {

        uid:
            "demo-user",

        email:
            "demo@smartagri.local"

    };


    currentFarmerData = {

        uid:
            "demo-user",

        name:
            "Demo Farmer",

        email:
            "demo@smartagri.local",

        mobile:
            "9876543210",

        village:
            "Kopargaon",

        state:
            "Maharashtra",

        landArea:
            "5 Acres",

        preferredMarket:
            "Kopargaon APMC",

        preferredLanguage:
            currentLanguage

    };


    fillProfile(
        currentFarmerData
    );


    showDashboard();


    /*
     * Immediately load real backend data.
     */

    updateBackendStatus();

    updateWeatherUI();

    loadMarketPrices();

}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

async function handleForgotPassword() {

    const email =
        $("loginEmail")
            ?.value
            .trim();

    const message =
        $("loginMessage");


    if (!email) {

        setMessage(
            message,
            "Enter your email address first.",
            "error"
        );

        return;

    }


    if (!auth) {

        setMessage(
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


        setMessage(
            message,
            "Password reset email sent.",
            "success"
        );


    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );


        setMessage(
            message,
            "Unable to send password reset email.",
            "error"
        );

    }

}


/* =========================================================
   FIRESTORE FARMER DATA
   ========================================================= */

async function loadFarmerData(
    user
) {

    if (
        !user ||
        !db
    ) {
        return null;
    }


    try {

        const snapshot =
            await db
                .collection(
                    "farmers"
                )
                .doc(
                    user.uid
                )
                .get();


        if (
            snapshot.exists
        ) {

            currentFarmerData =
                snapshot.data();

        } else {

            currentFarmerData = {

                uid:
                    user.uid,

                name:
                    user.displayName ||
                    "Farmer",

                email:
                    user.email ||
                    "",

                mobile:
                    "",

                village:
                    "",

                state:
                    "",

                landArea:
                    "",

                preferredMarket:
                    "",

                preferredLanguage:
                    currentLanguage

            };

        }


        const preferredLanguage =
            currentFarmerData
                .preferredLanguage;


        if (
            preferredLanguage &&
            translations[
                preferredLanguage
            ]
        ) {

            translatePage(
                preferredLanguage
            );

        } else {

            translatePage(
                currentLanguage
            );

        }


        fillProfile(
            currentFarmerData
        );


        return currentFarmerData;


    } catch (error) {

        console.error(
            "Firestore read error:",
            error
        );

        return null;

    }

}


/* =========================================================
   FILL PROFILE
   ========================================================= */

function fillProfile(
    data
) {

    if (!data) {
        return;
    }


    const name =
        data.name ||
        "Farmer";

    const email =
        data.email ||
        "";

    const mobile =
        data.mobile ||
        "";

    const village =
        data.village ||
        "";

    const state =
        data.state ||
        "";

    const landArea =
        data.landArea ||
        "";

    const market =
        data.preferredMarket ||
        "";

    const language =
        data.preferredLanguage ||
        currentLanguage;


    safeText(
        "headerFarmerName",
        name
    );

    safeText(
        "dashboardFarmerName",
        name
    );

    safeText(
        "summaryName",
        name
    );

    safeText(
        "summaryVillage",
        village
    );

    safeText(
        "summaryLand",
        landArea
    );

    safeText(
        "summaryMarket",
        getTranslatedMarketName(
            market
        )
    );

    safeText(
        "profilePageName",
        name
    );

    safeText(
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


    if (
        translations[language]
    ) {

        translatePage(
            language
        );

    }

}


/* =========================================================
   MARKET NAME TRANSLATION
   ========================================================= */

function getTranslatedMarketName(
    market
) {

    if (!market) {
        return "—";
    }


    const normalized =
        String(market)
            .trim()
            .toLowerCase();


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


    return market;

}


/* =========================================================
   PROFILE EDIT
   ========================================================= */

function setupProfileEditing() {

    const editButton =
        $("editProfileBtn");

    const cancelButton =
        $("cancelProfileEditBtn");

    const form =
        $("profileForm");


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                setProfileInputsDisabled(
                    false
                );

                show(
                    $("profileEditActions")
                );

            }
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                fillProfile(
                    currentFarmerData
                );

                setProfileInputsDisabled(
                    true
                );

                hide(
                    $("profileEditActions")
                );

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


    ids.forEach(id => {

        const element =
            $(id);

        if (element) {

            element.disabled =
                disabled;

        }

    });


    const email =
        $("profileEmail");

    if (email) {

        email.disabled =
            true;

    }

}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

async function saveProfile(
    event
) {

    event.preventDefault();


    const updatedData = {

        name:
            $("profileName")
                ?.value
                .trim() ||
            "",

        mobile:
            $("profileMobile")
                ?.value
                .trim() ||
            "",

        village:
            $("profileVillage")
                ?.value
                .trim() ||
            "",

        state:
            $("profileState")
                ?.value
                .trim() ||
            "",

        landArea:
            $("profileLandArea")
                ?.value
                .trim() ||
            "",

        preferredMarket:
            $("profileMarket")
                ?.value ||
            "",

        preferredLanguage:
            $("profileLanguage")
                ?.value ||
            "en"

    };


    const message =
        $("profileMessage");


    try {

        if (
            currentUser &&
            currentUser.uid !==
                "demo-user" &&
            db
        ) {

            await db
                .collection(
                    "farmers"
                )
                .doc(
                    currentUser.uid
                )
                .update(
                    updatedData
                );

        }


        currentFarmerData = {

            ...(currentFarmerData || {}),

            ...updatedData

        };


        translatePage(
            updatedData.preferredLanguage
        );


        fillProfile(
            currentFarmerData
        );


        setProfileInputsDisabled(
            true
        );

        hide(
            $("profileEditActions")
        );


        setMessage(
            message,
            t("saved"),
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        setMessage(
            message,
            "Unable to save profile.",
            "error"
        );

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function setupLogout() {

    const logoutButtons = [

        $("sideLogoutBtn"),

        $("profileLogoutBtn")

    ];


    logoutButtons.forEach(
        button => {

            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                async function () {

                    try {

                        if (
                            auth &&
                            currentUser &&
                            currentUser.uid !==
                                "demo-user"
                        ) {

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

                    currentFarmerData =
                        null;


                    const dashboard =
                        $("dashboardPage");

                    if (dashboard) {

                        dashboard.style.display =
                            "none";

                    }


                    showPage(
                        "loginPage"
                    );


                    closeSideMenu();

                    closeProfileMenu();

                }
            );

        }
    );

}


/* =========================================================
   CROP INFORMATION MODAL
   ========================================================= */

function setupCropInformation() {

    const modal =
        $("cropInfoModal");

    const overlay =
        $("cropInfoModalOverlay");

    const closeButton =
        $("closeCropInfoBtn");

    const title =
        $("cropInfoModalTitle");

    const subtitle =
        $("cropInfoModalSubtitle");

    const icon =
        $("cropInfoModalIcon");

    const body =
        $("cropInfoModalBody");


    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const crop =
                        this.dataset.crop;

                    const topic =
                        this.dataset.topic;


                    const information =
                        cropInformation[
                            crop
                        ]?.[
                            topic
                        ];


                    if (!information) {
                        return;
                    }


                    if (icon) {

                        icon.textContent =
                            cropInformation[
                                crop
                            ].icon;

                    }


                    if (title) {

                        title.textContent =
                            information
                                .title[
                                    currentLanguage
                                ] ||
                            information
                                .title
                                .en;

                    }


                    if (subtitle) {

                        subtitle.textContent =
                            information
                                .subtitle[
                                    currentLanguage
                                ] ||
                            information
                                .subtitle
                                .en;

                    }


                    if (body) {

                        body.innerHTML =
                            information
                                .content[
                                    currentLanguage
                                ] ||
                            information
                                .content
                                .en;

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

        });


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
        function (event) {

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
   WEATHER
   Flask -> Open-Meteo
   ========================================================= */

function setupWeather() {

    const button =
        $("refreshWeatherBtn");

    if (button) {

        button.addEventListener(
            "click",
            updateWeatherUI
        );

    }


    updateWeatherUI();

}


/* =========================================================
   WEATHER API
   ========================================================= */

async function updateWeatherUI() {

    const loading =
        $("weatherLoading");

    const empty =
        $("weatherEmptyState");

    const dataElement =
        $("weatherData");

    const error =
        $("weatherError");


    hide(error);
    hide(dataElement);
    hide(empty);

    show(loading);


    try {

        /*
         * Do NOT call Open-Meteo directly from the browser.
         * The Flask backend handles Open-Meteo.
         */

        const response =
            await fetch(
                apiUrl(
                    "/api/weather"
                ),
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Weather backend returned HTTP " +
                response.status
            );

        }


        const weather =
            await response.json();


        console.log(
            "SmartAgri weather:",
            weather
        );


        if (
            weather.success === false
        ) {

            throw new Error(
                getErrorMessage(
                    weather,
                    "Weather data unavailable."
                )
            );

        }


        /*
         * The final Flask backend may return:
         *
         * {
         *   temperature,
         *   humidity,
         *   wind_speed,
         *   rain_chance
         * }
         *
         * OR:
         *
         * {
         *   current: {...},
         *   forecast: [...]
         * }
         *
         * This parser supports both.
         */

        const current =
            weather.current ||
            weather;


        const temperature =
            firstNumber([
                current.temperature_c,
                current.temperature,
                current.temperature_2m,
                weather.temperature_c,
                weather.temperature
            ]);


        const humidity =
            firstNumber([
                current.humidity_pct,
                current.humidity,
                current.relative_humidity_2m,
                weather.humidity
            ]);


        const wind =
            firstNumber([
                current.wind_speed_kmh,
                current.wind_speed,
                current.wind_speed_10m,
                weather.wind_speed_kmh,
                weather.wind_speed
            ]);


        const rain =
            firstNumber([
                current.rain_probability_pct,
                current.rain_chance,
                current.precipitation_probability,
                weather.rain_probability_pct,
                weather.rain_chance
            ]);


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
                temperature !== null
                    ? Math.round(
                        temperature
                    ) + "°C"
                    : "—";

        }


        if (humidityElement) {

            humidityElement.textContent =
                humidity !== null
                    ? Math.round(
                        humidity
                    ) + "%"
                    : "—";

        }


        if (windElement) {

            windElement.textContent =
                wind !== null
                    ? Math.round(
                        wind
                    ) + " km/h"
                    : "—";

        }


        if (rainElement) {

            rainElement.textContent =
                rain !== null
                    ? Math.round(
                        rain
                    ) + "%"
                    : "—";

        }


        /*
         * Render 7-day forecast if the HTML has
         * a weatherForecast container.
         */

        renderWeatherForecast(
            weather
        );


        hide(loading);

        hide(empty);

        hide(error);

        show(dataElement);


        updateConnectionStatus(
            true
        );


    } catch (err) {

        console.error(
            "SmartAgri Weather Error:",
            err
        );


        hide(loading);

        hide(dataElement);

        show(empty);


        if (error) {

            error.textContent =
                currentLanguage === "hi"
                    ? "मौसम डेटा लोड नहीं हो सका। कृपया बैकएंड जांचें।"
                    : currentLanguage === "mr"
                        ? "हवामान डेटा लोड करता आला नाही. कृपया बॅकएंड तपासा."
                        : "Unable to load weather data. Please check the backend.";

            show(error);

        }

    }

}


/* =========================================================
   WEATHER FORECAST RENDERER
   ========================================================= */

function renderWeatherForecast(
    weather
) {

    const forecast =
        weather.forecast ||
        weather.daily?.forecast ||
        [];


    if (
        !Array.isArray(
            forecast
        ) ||
        forecast.length === 0
    ) {

        return;

    }


    /*
     * Try existing containers first.
     */

    let container =
        $("weatherForecast");

    if (!container) {

        container =
            $("weatherForecastContainer");

    }


    if (!container) {

        /*
         * Do not change the HTML if it does not
         * have a forecast section.
         */

        return;

    }


    container.innerHTML = "";


    forecast
        .slice(0, 7)
        .forEach(day => {

            const date =
                day.date ||
                day.time ||
                "—";

            const max =
                firstNumber([
                    day.temp_max_c,
                    day.temperature_2m_max,
                    day.max_temp
                ]);

            const min =
                firstNumber([
                    day.temp_min_c,
                    day.temperature_2m_min,
                    day.min_temp
                ]);

            const rainfall =
                firstNumber([
                    day.rainfall_mm,
                    day.precipitation_sum,
                    day.precipitation
                ]);

            const probability =
                firstNumber([
                    day.rain_probability_pct,
                    day.precipitation_probability_max
                ]);


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "weather-forecast-card";


            card.innerHTML = `

                <div class="forecast-date">
                    ${escapeHtml(date)}
                </div>

                <div class="forecast-temp">
                    ${
                        min !== null
                            ? Math.round(min)
                            : "—"
                    }
                    –
                    ${
                        max !== null
                            ? Math.round(max)
                            : "—"
                    }°C
                </div>

                <div class="forecast-rain">
                    💧 ${
                        rainfall !== null
                            ? rainfall
                            : "—"
                    } mm
                </div>

                <div class="forecast-probability">
                    🌧️ ${
                        probability !== null
                            ? Math.round(
                                probability
                            )
                            : "—"
                    }%
                </div>

            `;


            container.appendChild(
                card
            );

        });

}


/* =========================================================
   NUMBER HELPER
   ========================================================= */

function firstNumber(
    values
) {

    for (
        const value of values
    ) {

        if (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !Number.isNaN(
                Number(value)
            )
        ) {

            return Number(value);

        }

    }

    return null;

}


/* =========================================================
   MARKET
   Flask -> data.gov.in
   ========================================================= */

function setupMarket() {

    const selector =
        $("cropPriceSelector");


    if (selector) {

        selector.addEventListener(
            "change",
            loadMarketPrices
        );

    }


    loadMarketPrices();

}


/* =========================================================
   LOAD MARKET PRICES
   ========================================================= */

async function loadMarketPrices() {

    const selector =
        $("cropPriceSelector");


    let commodity =
        selector?.value ||
        "Onion";


    /*
     * Convert selector values to backend
     * commodity names.
     */

    if (
        String(
            commodity
        ).toLowerCase() ===
        "onions"
    ) {

        commodity =
            "Onion";

    }


    if (
        String(
            commodity
        ).toLowerCase() ===
        "wheat"
    ) {

        commodity =
            "Wheat";

    }


    const body =
        $("marketTableBody");


    if (!body) {
        return;
    }


    renderMarketLoading(
        body
    );


    try {

        const url =
            apiUrl(
                "/api/market-prices" +
                "?commodity=" +
                encodeURIComponent(
                    commodity
                )
            );


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
                "Market backend returned HTTP " +
                response.status
            );

        }


        const payload =
            await response.json();


        console.log(
            "SmartAgri market:",
            payload
        );


        const records =
            payload.records ||
            payload.data ||
            payload.prices ||
            [];


        if (
            payload.success === false ||
            !records.length
        ) {

            renderMarketUnavailable();

            return;

        }


        renderMarketTable(
            records
        );


        renderMarketComparison(
            records
        );


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "SmartAgri market error:",
            error
        );


        renderMarketUnavailable();

    }

}


/* =========================================================
   MARKET LOADING
   ========================================================= */

function renderMarketLoading(
    body
) {

    body.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHtml(
                            t("loading")
                        )}
                    </strong>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   MARKET EMPTY
   ========================================================= */

function renderMarketUnavailable() {

    const body =
        $("marketTableBody");


    if (!body) {
        return;
    }


    body.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${escapeHtml(
                            t(
                                "marketDataUnavailable"
                            )
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            t(
                                "marketDataUnavailableDescription"
                            )
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;


    /*
     * Clear comparison prices.
     */

    document
        .querySelectorAll(
            "[data-market-card]"
        )
        .forEach(card => {

            const marketName =
                card.dataset.marketCard;


            const heading =
                card.querySelector(
                    "h3"
                );

            const price =
                card.querySelector(
                    ".comparison-price"
                );

            const status =
                card.querySelector(
                    ".comparison-status"
                );


            if (heading) {

                heading.textContent =
                    getTranslatedMarketName(
                        marketName
                    );

            }


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


/* =========================================================
   MARKET TABLE
   ========================================================= */

function renderMarketTable(
    records
) {

    const body =
        $("marketTableBody");


    if (!body) {
        return;
    }


    body.innerHTML = "";


    records.forEach(
        record => {

            const market =
                record.market ||
                record.Market ||
                "Unknown";

            const commodity =
                record.commodity ||
                record.Commodity ||
                record.crop ||
                "—";

            const min =
                firstNumber([
                    record.min_price,
                    record.minPrice
                ]);

            const max =
                firstNumber([
                    record.max_price,
                    record.maxPrice
                ]);

            const modal =
                firstNumber([
                    record.modal_price,
                    record.modalPrice,
                    record.price
                ]);

            const date =
                record.arrival_date ||
                record.Arrival_Date ||
                record.date ||
                "—";


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHtml(
                        getTranslatedMarketName(
                            market
                        )
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        translateCommodity(
                            commodity
                        )
                    )}
                </td>

                <td>
                    ₹${
                        min !== null
                            ? formatNumber(
                                min
                            )
                            : "—"
                    }
                    –
                    ₹${
                        max !== null
                            ? formatNumber(
                                max
                            )
                            : "—"
                    }

                    ${
                        modal !== null
                            ? `<br>
                               <strong>
                                   Modal: ₹${formatNumber(modal)}
                               </strong>`
                            : ""
                    }
                </td>

                <td>
                    ${escapeHtml(
                        date
                    )}
                </td>

            `;


            body.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   COMMODITY TRANSLATION
   ========================================================= */

function translateCommodity(
    commodity
) {

    const value =
        String(
            commodity || ""
        ).toLowerCase();


    if (
        value.includes(
            "onion"
        )
    ) {

        return t(
            "onion"
        );

    }


    if (
        value.includes(
            "wheat"
        )
    ) {

        return t(
            "wheat"
        );

    }


    return commodity;

}


/* =========================================================
   MARKET COMPARISON
   ========================================================= */

function renderMarketComparison(
    records
) {

    const cards =
        document.querySelectorAll(
            "[data-market-card]"
        );


    if (
        !cards.length
    ) {

        return;

    }


    cards.forEach(
        card => {

            const requestedName =
                String(
                    card.dataset.marketCard ||
                    ""
                )
                .toLowerCase();


            let matchingRecord =
                records.find(
                    record => {

                        const market =
                            String(
                                record.market ||
                                record.Market ||
                                ""
                            )
                            .toLowerCase();

                        return market.includes(
                            requestedName
                        ) ||
                        requestedName.includes(
                            market
                        );

                    }
                );


            /*
             * Kopargaon card should match any
             * record containing Kopargaon.
             */

            if (
                !matchingRecord &&
                requestedName.includes(
                    "kopargaon"
                )
            ) {

                matchingRecord =
                    records.find(
                        record =>
                            String(
                                record.market ||
                                record.Market ||
                                ""
                            )
                            .toLowerCase()
                            .includes(
                                "kopargaon"
                            )
                    );

            }


            const heading =
                card.querySelector(
                    "h3"
                );

            const price =
                card.querySelector(
                    ".comparison-price"
                );

            const status =
                card.querySelector(
                    ".comparison-status"
                );


            if (heading) {

                heading.textContent =
                    getTranslatedMarketName(
                        card.dataset.marketCard
                    );

            }


            if (
                matchingRecord
            ) {

                const modal =
                    firstNumber([
                        matchingRecord.modal_price,
                        matchingRecord.modalPrice,
                        matchingRecord.price
                    ]);

                const min =
                    firstNumber([
                        matchingRecord.min_price,
                        matchingRecord.minPrice
                    ]);

                const max =
                    firstNumber([
                        matchingRecord.max_price,
                        matchingRecord.maxPrice
                    ]);


                if (price) {

                    if (
                        modal !== null
                    ) {

                        price.textContent =
                            "₹" +
                            formatNumber(
                                modal
                            );

                    } else if (
                        min !== null ||
                        max !== null
                    ) {

                        price.textContent =
                            "₹" +
                            (
                                min !== null
                                    ? formatNumber(min)
                                    : "—"
                            ) +
                            " – ₹" +
                            (
                                max !== null
                                    ? formatNumber(max)
                                    : "—"
                            );

                    } else {

                        price.textContent =
                            "—";

                    }

                }


                if (status) {

                    status.textContent =
                        matchingRecord.source ||
                        t(
                            "online"
                        );

                }

            } else {

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

            }

        }
    );

}


/* =========================================================
   NUMBER FORMAT
   ========================================================= */

function formatNumber(
    number
) {

    return Number(
        number
    ).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   CROP HEALTH
   Plant.id through Flask
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

    const result =
        $("cropAnalysisResult");


    if (!input) {

        console.warn(
            "cropImageInput not found."
        );

        return;

    }


    if (analyzeButton) {

        analyzeButton.disabled =
            true;

    }


    /*
     * Image selected
     */

    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            selectedCropImageFile =
                file || null;


            if (!file) {

                hide(
                    previewContainer
                );

                if (analyzeButton) {

                    analyzeButton.disabled =
                        true;

                }

                return;

            }


            /*
             * Validate image.
             */

            const allowedTypes = [

                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp"

            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                selectedCropImageFile =
                    null;

                if (analyzeButton) {

                    analyzeButton.disabled =
                        true;

                }


                if (result) {

                    result.innerHTML = `

                        <strong>
                            ${escapeHtml(
                                currentLanguage === "hi"
                                    ? "कृपया JPG, PNG या WEBP तस्वीर चुनें।"
                                    : currentLanguage === "mr"
                                        ? "कृपया JPG, PNG किंवा WEBP फोटो निवडा."
                                        : "Please select a JPG, PNG or WEBP image."
                            )}
                        </strong>

                    `;

                }

                return;

            }


            /*
             * Preview image.
             */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    if (preview) {

                        preview.src =
                            event.target.result;

                    }


                    show(
                        previewContainer
                    );


                    if (analyzeButton) {

                        analyzeButton.disabled =
                            false;

                    }


                    /*
                     * Clear previous result.
                     */

                    if (result) {

                        result.innerHTML = "";

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    /*
     * REAL ANALYZE BUTTON
     *
     * This is the important fix.
     *
     * Previous code only displayed:
     * "AI crop analysis is not connected"
     *
     * This code actually sends:
     *
     * POST /api/crop-health
     *
     * using multipart/form-data.
     */

    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeCropImage
        );

    }

}


/* =========================================================
   ANALYZE CROP IMAGE
   ========================================================= */

async function analyzeCropImage() {

    const input =
        $("cropImageInput");

    const button =
        $("analyzeCropBtn");

    const result =
        $("cropAnalysisResult");


    const file =
        selectedCropImageFile ||
        input?.files?.[0];


    if (!file) {

        if (result) {

            result.innerHTML = `

                <strong>
                    ${escapeHtml(
                        currentLanguage === "hi"
                            ? "पहले फसल की तस्वीर चुनें।"
                            : currentLanguage === "mr"
                                ? "प्रथम पिकाचा फोटो निवडा."
                                : "Please choose a crop image first."
                    )}
                </strong>

            `;

        }

        return;

    }


    /*
     * Prevent double-click requests.
     */

    if (button) {

        button.disabled =
            true;

        button.dataset.originalText =
            button.textContent;

        button.textContent =
            t(
                "analysisLoading"
            );

    }


    if (result) {

        result.innerHTML = `

            <div class="analysis-loading">

                <strong>
                    ${escapeHtml(
                        t(
                            "analysisLoading"
                        )
                    )}
                </strong>

                <p>
                    ${escapeHtml(
                        currentLanguage === "hi"
                            ? "कृपया प्रतीक्षा करें..."
                            : currentLanguage === "mr"
                                ? "कृपया प्रतीक्षा करा..."
                                : "Please wait..."
                    )}
                </p>

            </div>

        `;

    }


    try {

        const formData =
            new FormData();


        /*
         * Flask expects request.files["image"].
         */

        formData.append(
            "image",
            file,
            file.name
        );


        /*
         * Also send the current language.
         * Your Flask backend can use this if supported.
         */

        formData.append(
            "language",
            currentLanguage
        );


        /*
         * Also send basic farmer information
         * when available.
         */

        if (
            currentFarmerData
        ) {

            formData.append(
                "farmer",
                JSON.stringify(
                    currentFarmerData
                )
            );

        }


        const response =
            await fetch(
                apiUrl(
                    "/api/crop-health"
                ),
                {
                    method: "POST",
                    body: formData
                }
            );


        /*
         * Always attempt to read JSON.
         */

        let payload = null;

        try {

            payload =
                await response.json();

        } catch (jsonError) {

            payload = null;

        }


        console.log(
            "SmartAgri crop-health response:",
            payload
        );


        if (
            !response.ok
        ) {

            throw new Error(
                getErrorMessage(
                    payload,
                    "Crop-health request failed. HTTP " +
                    response.status
                )
            );

        }


        /*
         * The Flask backend may return 200
         * with success:false.
         */

        if (
            payload &&
            payload.success === false
        ) {

            /*
             * HTTP 501 from the old backend means
             * Plant.id was not configured.
             */

            throw new Error(
                getErrorMessage(
                    payload,
                    t(
                        "analysisFailed"
                    )
                )
            );

        }


        renderCropHealthResult(
            payload
        );


        updateConnectionStatus(
            true
        );


    } catch (error) {

        console.error(
            "SmartAgri Crop Health Error:",
            error
        );


        if (result) {

            result.innerHTML = `

                <div class="analysis-error">

                    <strong>
                        ${escapeHtml(
                            t(
                                "analysisFailed"
                            )
                        )}
                    </strong>

                    <p>
                        ${escapeHtml(
                            error.message ||
                            t(
                                "analysisFailed"
                            )
                        )}
                    </p>

                </div>

            `;

        }

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                button.dataset.originalText ||
                t(
                    "analyzeCrop"
                );

        }

    }

}


/* =========================================================
   RENDER PLANT.ID RESULT
   ========================================================= */

function renderCropHealthResult(
    payload
) {

    const result =
        $("cropAnalysisResult");


    if (!result) {
        return;
    }


    if (!payload) {

        result.innerHTML = `

            <strong>
                ${escapeHtml(
                    t(
                        "analysisNoResult"
                    )
                )}
            </strong>

        `;

        return;

    }


    /*
     * Plant.id responses can contain:
     *
     * result.is_healthy
     * result.disease
     * result.classification
     * result.suggestions
     *
     * depending on API response.
     *
     * The Flask backend may also already
     * normalize these values.
     */


    const diagnosis =
        payload.diagnosis ||
        payload.prediction ||
        payload.result?.diagnosis ||
        payload.result?.prediction ||
        payload.message ||
        "";


    const plantName =
        payload.plant_name ||
        payload.plant ||
        payload.species ||
        payload.result?.plant_name ||
        payload.result?.plant ||
        payload.result?.species ||
        "";


    const health =
        payload.health ||
        payload.health_status ||
        payload.result?.health ||
        payload.result?.health_status ||
        "";


    const disease =
        payload.disease ||
        payload.disease_name ||
        payload.result?.disease ||
        payload.result?.disease_name ||
        "";


    const confidence =
        payload.confidence ??
        payload.probability ??
        payload.result?.confidence ??
        payload.result?.probability ??
        null;


    const recommendations =
        payload.recommendations ||
        payload.recommendation ||
        payload.result?.recommendations ||
        payload.result?.recommendation ||
        "";


    /*
     * If the backend returned a plain answer
     * but no structured data, show it.
     */

    if (
        !plantName &&
        !health &&
        !disease &&
        !diagnosis &&
        !recommendations
    ) {

        result.innerHTML = `

            <strong>
                ${escapeHtml(
                    t(
                        "analysisNoResult"
                    )
                )}
            </strong>

        `;

        return;

    }


    let html = `

        <div class="crop-analysis-result">

            <div class="analysis-result-header">

                <span>
                    🌿
                </span>

                <strong>
                    ${escapeHtml(
                        t(
                            "analysisSuccess"
                        )
                    )}
                </strong>

            </div>

    `;


    if (plantName) {

        html += `

            <div class="analysis-result-item">

                <strong>
                    ${escapeHtml(
                        t(
                            "plantIdentified"
                        )
                    )}
                </strong>

                <span>
                    ${escapeHtml(
                        formatPlantName(
                            plantName
                        )
                    )}
                </span>

            </div>

        `;

    }


    if (health) {

        html += `

            <div class="analysis-result-item">

                <strong>
                    ${escapeHtml(
                        t(
                            "healthStatus"
                        )
                    )}
                </strong>

                <span>
                    ${escapeHtml(
                        translateHealthStatus(
                            health
                        )
                    )}
                </span>

            </div>

        `;

    }


    if (disease) {

        html += `

            <div class="analysis-result-item">

                <strong>
                    ${escapeHtml(
                        t(
                            "disease"
                        )
                    )}
                </strong>

                <span>
                    ${escapeHtml(
                        disease
                    )}
                </span>

            </div>

        `;

    }


    if (
        confidence !== null &&
        confidence !== undefined &&
        confidence !== ""
    ) {

        let confidenceNumber =
            Number(
                confidence
            );


        if (
            confidenceNumber <= 1
        ) {

            confidenceNumber *=
                100;

        }


        html += `

            <div class="analysis-result-item">

                <strong>
                    ${escapeHtml(
                        t(
                            "confidence"
                        )
                    )}
                </strong>

                <span>
                    ${Math.round(
                        confidenceNumber
                    )}%
                </span>

            </div>

        `;

    }


    if (diagnosis) {

        html += `

            <div class="analysis-result-description">

                <strong>
                    ${escapeHtml(
                        currentLanguage === "hi"
                            ? "विश्लेषण"
                            : currentLanguage === "mr"
                                ? "विश्लेषण"
                                : "Analysis"
                    )}
                </strong>

                <p>
                    ${escapeHtml(
                        flattenResultText(
                            diagnosis
                        )
                    )}
                </p>

            </div>

        `;

    }


    if (recommendations) {

        html += `

            <div class="analysis-result-description">

                <strong>
                    ${escapeHtml(
                        t(
                            "recommendations"
                        )
                    )}
                </strong>

                <p>
                    ${escapeHtml(
                        flattenResultText(
                            recommendations
                        )
                    )}
                </p>

            </div>

        `;

    }


    /*
     * Show raw useful Plant.id suggestions
     * if the Flask backend passes them through.
     */

    const suggestions =
        extractPlantSuggestions(
            payload
        );


    if (
        suggestions.length
    ) {

        html += `

            <div class="analysis-result-description">

                <strong>
                    ${escapeHtml(
                        t(
                            "recommendations"
                        )
                    )}
                </strong>

                <ul>

        `;


        suggestions
            .slice(0, 5)
            .forEach(
                suggestion => {

                    html += `

                        <li>
                            ${escapeHtml(
                                suggestion
                            )}
                        </li>

                    `;

                }
            );


        html += `

                </ul>

            </div>

        `;

    }


    html += `

        </div>

    `;


    result.innerHTML =
        html;

}


/* =========================================================
   PLANT NAME
   ========================================================= */

function formatPlantName(
    value
) {

    if (
        typeof value ===
        "object"
    ) {

        return (
            value.name ||
            value.scientific_name ||
            value.scientificName ||
            JSON.stringify(
                value
            )
        );

    }


    return value;

}


/* =========================================================
   HEALTH STATUS
   ========================================================= */

function translateHealthStatus(
    value
) {

    const text =
        String(
            value
        ).toLowerCase();


    if (
        text.includes(
            "healthy"
        ) ||
        text.includes(
            "no disease"
        ) ||
        text === "true"
    ) {

        return t(
            "healthy"
        );

    }


    if (
        text.includes(
            "disease"
        ) ||
        text.includes(
            "unhealthy"
        ) ||
        text === "false"
    ) {

        return t(
            "possibleDisease"
        );

    }


    return value;

}


/* =========================================================
   FLATTEN API RESULT
   ========================================================= */

function flattenResultText(
    value
) {

    if (
        typeof value ===
        "string"
    ) {

        return value;

    }


    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .map(
                item =>
                    flattenResultText(
                        item
                    )
            )
            .join(
                "\n"
            );

    }


    if (
        typeof value ===
        "object" &&
        value !== null
    ) {

        return Object.entries(
            value
        )
        .map(
            ([key, val]) =>
                key +
                ": " +
                flattenResultText(
                    val
                )
        )
        .join(
            "\n"
        );

    }


    return String(
        value ?? ""
    );

}


/* =========================================================
   EXTRACT PLANT.ID SUGGESTIONS
   ========================================================= */

function extractPlantSuggestions(
    payload
) {

    const suggestions = [];


    const arrays = [

        payload?.suggestions,

        payload?.result?.suggestions,

        payload?.health_assessment?.suggestions

    ];


    arrays.forEach(
        array => {

            if (
                !Array.isArray(
                    array
                )
            ) {
                return;
            }


            array.forEach(
                item => {

                    if (
                        typeof item ===
                        "string"
                    ) {

                        suggestions.push(
                            item
                        );

                    } else if (
                        item &&
                        typeof item ===
                        "object"
                    ) {

                        const name =
                            item.name ||
                            item.disease ||
                            item.description ||
                            item.details;

                        if (name) {

                            suggestions.push(
                                String(
                                    name
                                )
                            );

                        }

                    }

                }
            );

        }
    );


    return [
        ...new Set(
            suggestions
        )
    ];

}


/* =========================================================
   UPDATE CROP ANALYSIS LANGUAGE
   ========================================================= */

function updateCropAnalysisLanguage() {

    const result =
        $("cropAnalysisResult");


    if (!result) {
        return;
    }


    /*
     * Do not overwrite a real result.
     */

    if (
        result.querySelector(
            ".crop-analysis-result"
        )
    ) {

        return;

    }

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


/* =========================================================
   VOICE ASSISTANCE
   ========================================================= */

function setupVoiceAssistance() {

    const startButton =
        $("startVoiceBtn");

    const stopButton =
        $("stopVoiceBtn");

    const voiceInput =
        $("voiceInput");

    const voiceResponse =
        $("voiceResponse");


    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!Recognition) {

        if (voiceResponse) {

            voiceResponse.textContent =
                currentLanguage === "hi"
                    ? "इस ब्राउज़र में आवाज पहचान उपलब्ध नहीं है।"
                    : currentLanguage === "mr"
                        ? "या ब्राउझरमध्ये आवाज ओळख उपलब्ध नाही."
                        : "Speech recognition is not supported in this browser.";

        }

        return;

    }


    speechRecognition =
        new Recognition();


    speechRecognition.continuous =
        true;

    speechRecognition.interimResults =
        true;

    speechRecognition.lang =
        getSpeechLanguage();


    speechRecognition.onstart =
        function () {

            hide(
                startButton
            );

            show(
                stopButton
            );


            if (voiceResponse) {

                voiceResponse.textContent =
                    getVoiceText();

            }

        };


    speechRecognition.onresult =
        function (event) {

            let text = "";


            for (
                let i =
                    event.resultIndex;

                i <
                event.results.length;

                i++
            ) {

                text +=
                    event.results[i][0]
                        .transcript;

            }


            if (voiceInput) {

                voiceInput.value =
                    text;

            }

        };


    speechRecognition.onerror =
        function (event) {

            console.error(
                "Speech recognition error:",
                event.error
            );


            if (voiceResponse) {

                voiceResponse.textContent =
                    currentLanguage === "hi"
                        ? "आवाज पहचान में त्रुटि: " +
                          event.error
                        : currentLanguage === "mr"
                            ? "आवाज ओळख त्रुटी: " +
                              event.error
                            : "Voice recognition error: " +
                              event.error;

            }

        };


    speechRecognition.onend =
        function () {

            hide(
                stopButton
            );

            show(
                startButton
            );

        };


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                try {

                    speechRecognition.lang =
                        getSpeechLanguage();

                    speechRecognition.start();

                } catch (error) {

                    console.warn(
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
            function () {

                try {

                    speechRecognition.stop();

                } catch (error) {

                    console.warn(
                        "Voice stop error:",
                        error
                    );

                }

            }
        );

    }

}


/* =========================================================
   VOICE LANGUAGE
   ========================================================= */

function getSpeechLanguage() {

    if (
        currentLanguage === "hi"
    ) {

        return "hi-IN";

    }


    if (
        currentLanguage === "mr"
    ) {

        return "mr-IN";

    }


    return "en-IN";

}


function getVoiceText() {

    if (
        currentLanguage === "hi"
    ) {

        return "सुन रहा हूँ...";

    }


    if (
        currentLanguage === "mr"
    ) {

        return "ऐकत आहे...";

    }


    return "Listening...";

}


function updateVoiceLanguage() {

    if (
        speechRecognition
    ) {

        speechRecognition.lang =
            getSpeechLanguage();

    }

}


/* =========================================================
   AI ASSISTANT
   Flask -> OpenAI
   ========================================================= */

function setupAI() {

    const form =
        $("aiForm");

    const input =
        $("aiInput");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const question =
                input?.value
                    .trim();


            if (!question) {
                return;
            }


            addChatMessage(
                question,
                "user"
            );


            if (input) {

                input.value =
                    "";

            }


            const thinkingMessage =
                addChatMessage(
                    t(
                        "aiThinking"
                    ),
                    "assistant",
                    true
                );


            try {

                const response =
                    await fetch(
                        apiUrl(
                            "/api/ai"
                        ),
                        {
                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    question:
                                        question,

                                    language:
                                        currentLanguage,

                                    farmer:
                                        currentFarmerData ||
                                        {}

                                })

                        }
                    );


                const payload =
                    await response.json()
                        .catch(
                            () => ({})
                        );


                console.log(
                    "SmartAgri AI:",
                    payload
                );


                if (
                    !response.ok ||
                    payload.success === false
                ) {

                    throw new Error(
                        getErrorMessage(
                            payload,
                            t(
                                "aiError"
                            )
                        )
                    );

                }


                const answer =
                    payload.answer ||
                    payload.response ||
                    payload.message ||
                    "";


                if (!answer) {

                    throw new Error(
                        t(
                            "aiError"
                        )
                    );

                }


                if (
                    thinkingMessage
                ) {

                    thinkingMessage
                        .remove();

                }


                addChatMessage(
                    answer,
                    "assistant"
                );


                updateConnectionStatus(
                    true
                );


            } catch (error) {

                console.error(
                    "SmartAgri AI error:",
                    error
                );


                if (
                    thinkingMessage
                ) {

                    thinkingMessage
                        .remove();

                }


                addChatMessage(
                    error.message ||
                    t(
                        "aiError"
                    ),
                    "assistant"
                );

            }

        }
    );

}


/* =========================================================
   ADD CHAT MESSAGE
   ========================================================= */

function addChatMessage(
    text,
    sender,
    temporary = false
) {

    const messages =
        $("chatMessages");


    if (!messages) {
        return null;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        sender === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    if (temporary) {

        wrapper.classList.add(
            "temporary-message"
        );

    }


    const senderName =
        sender === "user"

            ? (
                currentLanguage === "hi"
                    ? "आप"
                    : currentLanguage === "mr"
                        ? "तुम्ही"
                        : "You"
            )

            : t(
                "assistant"
            );


    wrapper.innerHTML = `

        <div class="chat-avatar">

            ${
                sender === "user"
                    ? "👨‍🌾"
                    : "🤖"
            }

        </div>

        <div>

            <strong>
                ${escapeHtml(
                    senderName
                )}
            </strong>

            <p></p>

        </div>

    `;


    const paragraph =
        wrapper.querySelector(
            "p"
        );


    if (paragraph) {

        paragraph.textContent =
            text;

    }


    messages.appendChild(
        wrapper
    );


    messages.scrollTop =
        messages.scrollHeight;


    return wrapper;

}


/* =========================================================
   MESSAGE HELPER
   ========================================================= */

function setMessage(
    element,
    text,
    type = "info"
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.classList.remove(

        "success-message",

        "error-message",

        "info-message"

    );


    if (
        type === "success"
    ) {

        element.classList.add(
            "success-message"
        );

    } else if (
        type === "error"
    ) {

        element.classList.add(
            "error-message"
        );

    } else {

        element.classList.add(
            "info-message"
        );

    }

}


/* =========================================================
   FIREBASE AUTH STATE
   ========================================================= */

function setupFirebaseAuthState() {

    if (!auth) {
        return;
    }


    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                currentUser =
                    user;


                await loadFarmerData(
                    user
                );


                console.log(
                    "Firebase user logged in:",
                    user.email
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri application starting..."
        );


        /*
         * Language
         */

        setupLanguageSelectors();


        /*
         * Navigation
         */

        setupNavigation();

        setupSideMenu();

        setupProfileMenu();


        /*
         * Authentication
         */

        setupLogin();

        setupRegistration();

        setupAuthNavigation();

        setupLogout();

        setupFirebaseAuthState();


        /*
         * Profile
         */

        setupProfileEditing();


        /*
         * Connectivity
         */

        setupConnectionStatus();


        /*
         * Crop information
         */

        setupCropInformation();


        /*
         * Weather
         */

        setupWeather();


        /*
         * Market

         */

        setupMarket();


        /*
         * Crop health / Plant.id

         */

        setupCropHealth();


        /*
         * Government schemes

         */

        setupGovernmentSchemes();


        /*
         * Voice

         */

        setupVoiceAssistance();


        /*
         * AI assistant

         */

        setupAI();


        /*
         * Apply saved language
         */

        translatePage(
            currentLanguage
        );


        /*
         * Backend status check
         */

        updateBackendStatus();


        console.log(
            "SmartAgri application ready."
        );

    }
);
