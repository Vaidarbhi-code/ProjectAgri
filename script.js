/* =========================================================
   SMARTAGRI - COMPLETE SCRIPT.JS
   Works with the exact HTML supplied by the user.

   Features:
   - Firebase Authentication
   - Demo Dashboard
   - Online / Offline status
   - English / Hindi / Marathi
   - Dashboard navigation
   - LIVE WEATHER via Open-Meteo
   - Market UI
   - Market comparison
   - Crop information modal
   - Government schemes
   - AI placeholder
   - Voice assistance
   - Farmer profile
   - Settings
   - Logout
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

        console.log("Firebase initialized successfully.");

    } else {

        console.warn("Firebase SDK not loaded.");

    }

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   GLOBAL APPLICATION STATE
========================================================= */

const AppState = {

    language:
        localStorage.getItem("smartagriLanguage") || "en",

    demoMode: false,

    currentUser: null,

    farmer: null,

    currentSection: "dashboardSection",

    voiceEnabled: true,

    notificationsEnabled: false

};


/* =========================================================
   KOPARGAON WEATHER LOCATION
========================================================= */

/*
   Approximate coordinates for Kopargaon, Maharashtra.

   Open-Meteo uses latitude + longitude.
*/

const WEATHER_LOCATION = {

    name: "Kopargaon",

    state: "Maharashtra",

    country: "India",

    latitude: 19.8826,

    longitude: 74.4767

};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        appName: "SmartAgri",
        appTagline: "Smart Agriculture Market Intelligence System",

        chooseLanguage: "Choose Your Language",
        languageDescription: "Select your preferred language to continue.",
        continue: "Continue",

        loginTitle: "Farmer Login",
        loginSubtitle: "Login to access SmartAgri",

        email: "Email",
        password: "Password",
        rememberMe: "Remember Me",
        forgotPassword: "Forgot Password?",
        login: "Login",
        or: "OR",
        demoDashboard: "Enter Demo Dashboard",

        noAccount: "Don't have an account?",
        register: "Register",
        changeLanguage: "Change Language",

        registrationTitle: "Farmer Registration",
        registrationSubtitle: "Create your SmartAgri farmer account",

        fullName: "Full Name",
        mobile: "Mobile Number",
        village: "Village",
        state: "State",
        landArea: "Land Area",
        preferredMarket: "Preferred Market",
        selectMarket: "Select Market",

        kopargaonMarket: "Kopargaon APMC",
        yeolaMarket: "Yeola Market",
        shirdiMarket: "Shirdi Market",

        preferredLanguage: "Preferred Language",
        createAccount: "Create Account",
        alreadyAccount: "Already have an account?",

        dashboard: "Dashboard",
        weather: "Weather",
        marketPrices: "Market Prices",
        marketComparison: "Market Comparison",
        cropInformation: "Crop Information",
        cropHealth: "Crop Health",
        governmentSchemes: "Government Schemes",
        aiAssistant: "AI Assistant",
        voiceAssistance: "Voice Assistance",
        farmerProfile: "Farmer Profile",
        settings: "Settings",
        about: "About SmartAgri",
        logout: "Logout",
        myProfile: "My Profile",

        welcome: "Welcome",
        dashboardSubtitle: "Your farming information in one place.",

        connectionStatus: "Connection Status",
        online: "Online",
        offline: "Offline",

        profileSummary: "Your registered information",
        editProfile: "Edit Profile",

        quickActions: "Quick Actions",
        quickActionsSubtitle: "Access important farming tools quickly.",

        liveDataTitle: "Live Data",
        liveDataDescription:
            "Only verified connected data is displayed.",

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

        currentWeather: "Current Weather",
        refresh: "Refresh",

        temperature: "Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        rainChance: "Rain Chance",

        weatherUnavailable: "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather data has been received.",

        marketSubtitle:
            "Current crop prices from connected verified sources.",

        marketPriceTable: "Market Price Table",
        onion: "Onion",
        wheat: "Wheat",

        market: "Market",
        crop: "Crop",
        price: "Price",
        date: "Date",

        marketDataUnavailable: "Market data unavailable",

        marketDataUnavailableDescription:
            "No verified market data has been received.",

        comparisonSubtitle:
            "Compare connected market information before selling.",

        dataUnavailable: "Verified data unavailable",

        cropSubtitle:
            "Cultivation and crop management guidance.",

        onionInfo:
            "Onion cultivation information.",

        wheatInfo:
            "Wheat cultivation information.",

        cultivationGuidance: "Cultivation Guidance",
        cropManagement: "Crop Management",
        farmingPractices: "Farming Practices",

        cropHealthSubtitle:
            "Upload a crop image for AI-assisted analysis.",

        uploadCropImage:
            "Upload Crop / Leaf Image",

        uploadCropDescription:
            "Select an image for crop health analysis.",

        chooseImage: "Choose Image",
        analyzeCrop: "Analyze Crop",

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

        learnMore: "Learn More",

        aiSubtitle:
            "Ask farming-related questions.",

        smartAssistant:
            "Smart Farmer Assistant",

        aiNotConnected:
            "AI Not Connected",

        assistant: "Assistant",

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
            "Multilingual Support",

        loadingWeather:
            "Loading weather...",

        loadingMarket:
            "Loading market prices...",

        loginSuccess:
            "Login successful.",

        registerSuccess:
            "Account created successfully.",

        demoModeMessage:
            "Demo dashboard opened successfully.",

        invalidLogin:
            "Invalid email or password.",

        emailAlreadyUsed:
            "This email is already registered.",

        passwordTooShort:
            "Password must be at least 6 characters.",

        registrationError:
            "Registration failed. Please try again.",

        loginError:
            "Login failed. Please try again.",

        passwordResetSent:
            "Password reset email sent.",

        enterEmail:
            "Please enter your email address first.",

        profileUpdated:
            "Profile updated successfully.",

        fillRequired:
            "Please fill in all required fields.",

        weatherError:
            "Unable to load weather data. Please try again.",

        microphoneNotSupported:
            "Voice recognition is not supported by this browser.",

        microphoneError:
            "Unable to access the microphone.",

        listening:
            "Listening...",

        stoppedListening:
            "Voice assistance stopped.",

        noVoiceText:
            "No voice input detected.",

        weatherLocation:
            "Kopargaon, Maharashtra"

    },


    hi: {

        appName: "स्मार्टएग्री",
        appTagline: "स्मार्ट कृषि बाजार इंटेलिजेंस सिस्टम",

        chooseLanguage: "अपनी भाषा चुनें",
        languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",
        loginSubtitle: "SmartAgri का उपयोग करने के लिए लॉगिन करें",

        email: "ईमेल",
        password: "पासवर्ड",
        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        login: "लॉगिन",
        or: "या",
        demoDashboard: "डेमो डैशबोर्ड खोलें",

        noAccount: "खाता नहीं है?",
        register: "पंजीकरण करें",
        changeLanguage: "भाषा बदलें",

        registrationTitle: "किसान पंजीकरण",
        registrationSubtitle: "अपना SmartAgri किसान खाता बनाएं",

        fullName: "पूरा नाम",
        mobile: "मोबाइल नंबर",
        village: "गांव",
        state: "राज्य",
        landArea: "भूमि क्षेत्र",
        preferredMarket: "पसंदीदा बाजार",
        selectMarket: "बाजार चुनें",

        kopargaonMarket: "कोपरगांव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंदीदा भाषा",
        createAccount: "खाता बनाएं",
        alreadyAccount: "पहले से खाता है?",

        dashboard: "डैशबोर्ड",
        weather: "मौसम",
        marketPrices: "बाजार भाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "फसल जानकारी",
        cropHealth: "फसल स्वास्थ्य",
        governmentSchemes: "सरकारी योजनाएं",
        aiAssistant: "AI सहायक",
        voiceAssistance: "आवाज सहायता",
        farmerProfile: "किसान प्रोफाइल",
        settings: "सेटिंग्स",
        about: "SmartAgri के बारे में",
        logout: "लॉगआउट",
        myProfile: "मेरी प्रोफाइल",

        welcome: "स्वागत है",
        dashboardSubtitle:
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        connectionStatus: "कनेक्शन स्थिति",
        online: "ऑनलाइन",
        offline: "ऑफलाइन",

        profileSummary: "आपकी पंजीकृत जानकारी",
        editProfile: "प्रोफाइल संपादित करें",

        quickActions: "त्वरित कार्य",
        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",

        liveDataTitle: "लाइव डेटा",
        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",

        currentWeather: "वर्तमान मौसम",
        refresh: "रिफ्रेश",

        temperature: "तापमान",
        humidity: "नमी",
        windSpeed: "हवा की गति",
        rainChance: "बारिश की संभावना",

        weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable: "बाजार भाव तालिका",
        onion: "प्याज",
        wheat: "गेहूं",

        market: "बाजार",
        crop: "फसल",
        price: "भाव",
        date: "तारीख",

        marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",

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
            "खेती का मार्गदर्शन",

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

        chooseImage: "तस्वीर चुनें",
        analyzeCrop: "फसल का विश्लेषण करें",

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

        learnMore: "और जानें",

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
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्ट करना आवश्यक है।",

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

        voiceReady:
            "आवाज सहायता तैयार है।",

        voiceInputPlaceholder:
            "आवाज इनपुट यहां दिखाई देगा...",

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
            "आवाज सहायता चालू या बंद करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाएं चालू या बंद करें।",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार इंटेलिजेंस, फसल मार्गदर्शन और डिजिटल कृषि सहायता उपलब्ध कराने के लिए बनाया गया है।",

        marketIntelligence:
            "बाजार इंटेलिजेंस",

        multilingualSupport:
            "बहुभाषी सहायता",

        loadingWeather:
            "मौसम लोड हो रहा है...",

        loadingMarket:
            "बाजार भाव लोड हो रहे हैं...",

        loginSuccess:
            "लॉगिन सफल हुआ।",

        registerSuccess:
            "खाता सफलतापूर्वक बनाया गया।",

        demoModeMessage:
            "डेमो डैशबोर्ड सफलतापूर्वक खोला गया।",

        invalidLogin:
            "ईमेल या पासवर्ड गलत है।",

        emailAlreadyUsed:
            "यह ईमेल पहले से पंजीकृत है।",

        passwordTooShort:
            "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",

        registrationError:
            "पंजीकरण असफल हुआ। कृपया दोबारा प्रयास करें।",

        loginError:
            "लॉगिन असफल हुआ। कृपया दोबारा प्रयास करें।",

        passwordResetSent:
            "पासवर्ड रीसेट ईमेल भेज दिया गया।",

        enterEmail:
            "कृपया पहले अपना ईमेल दर्ज करें।",

        profileUpdated:
            "प्रोफाइल सफलतापूर्वक अपडेट हुई।",

        fillRequired:
            "कृपया सभी आवश्यक जानकारी भरें।",

        weatherError:
            "मौसम डेटा लोड नहीं हो सका। कृपया दोबारा प्रयास करें।",

        microphoneNotSupported:
            "इस ब्राउज़र में आवाज पहचान उपलब्ध नहीं है।",

        microphoneError:
            "माइक्रोफोन तक पहुंच नहीं हो सकी।",

        listening:
            "सुन रहा है...",

        stoppedListening:
            "आवाज सहायता बंद कर दी गई।",

        noVoiceText:
            "कोई आवाज इनपुट नहीं मिला।",

        weatherLocation:
            "कोपरगांव, महाराष्ट्र"

    },


    mr: {

        appName: "स्मार्टअ‍ॅग्री",
        appTagline: "स्मार्ट कृषी बाजार बुद्धिमत्ता प्रणाली",

        chooseLanguage: "तुमची भाषा निवडा",
        languageDescription:
            "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",
        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",
        loginSubtitle:
            "SmartAgri वापरण्यासाठी लॉगिन करा",

        email: "ईमेल",
        password: "पासवर्ड",
        rememberMe: "मला लक्षात ठेवा",
        forgotPassword: "पासवर्ड विसरलात?",
        login: "लॉगिन",
        or: "किंवा",
        demoDashboard: "डेमो डॅशबोर्ड उघडा",

        noAccount: "खाते नाही?",
        register: "नोंदणी करा",
        changeLanguage: "भाषा बदला",

        registrationTitle: "शेतकरी नोंदणी",
        registrationSubtitle:
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",
        mobile: "मोबाईल नंबर",
        village: "गाव",
        state: "राज्य",
        landArea: "जमिनीचे क्षेत्र",
        preferredMarket: "पसंतीची बाजारपेठ",
        selectMarket: "बाजारपेठ निवडा",

        kopargaonMarket: "कोपरगाव APMC",
        yeolaMarket: "येवला बाजार",
        shirdiMarket: "शिर्डी बाजार",

        preferredLanguage: "पसंतीची भाषा",
        createAccount: "खाते तयार करा",
        alreadyAccount: "आधीच खाते आहे?",

        dashboard: "डॅशबोर्ड",
        weather: "हवामान",
        marketPrices: "बाजारभाव",
        marketComparison: "बाजार तुलना",
        cropInformation: "पीक माहिती",
        cropHealth: "पीक आरोग्य",
        governmentSchemes: "शासकीय योजना",
        aiAssistant: "AI सहाय्यक",
        voiceAssistance: "आवाज सहाय्य",
        farmerProfile: "शेतकरी प्रोफाइल",
        settings: "सेटिंग्ज",
        about: "SmartAgri विषयी",
        logout: "लॉगआउट",
        myProfile: "माझे प्रोफाइल",

        welcome: "स्वागत",
        dashboardSubtitle:
            "तुमची शेतीविषयक माहिती एका ठिकाणी.",

        connectionStatus: "कनेक्शन स्थिती",
        online: "ऑनलाइन",
        offline: "ऑफलाइन",

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
            "कोणताही सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

        marketSubtitle:
            "कनेक्टेड सत्यापित स्रोतांमधील सध्याचे पीक बाजारभाव.",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि शासकीय कृषी कार्यक्रम.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री फसल विमा योजनेची माहिती.",

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
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्ट करणे आवश्यक आहे.",

        voiceSubtitle:
            "तुमच्या आवडत्या भाषेत बोला आणि ऐका.",

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

        voiceInputPlaceholder:
            "आवाज इनपुट येथे दिसेल...",

        profileSubtitle:
            "तुमची शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "SmartAgri च्या प्राधान्यक्रमांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची आवडती अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार बुद्धिमत्ता, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार केले आहे.",

        marketIntelligence:
            "बाजार बुद्धिमत्ता",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        loadingWeather:
            "हवामान लोड होत आहे...",

        loadingMarket:
            "बाजारभाव लोड होत आहेत...",

        loginSuccess:
            "लॉगिन यशस्वी झाले.",

        registerSuccess:
            "खाते यशस्वीरित्या तयार झाले.",

        demoModeMessage:
            "डेमो डॅशबोर्ड यशस्वीरित्या उघडला.",

        invalidLogin:
            "ईमेल किंवा पासवर्ड चुकीचा आहे.",

        emailAlreadyUsed:
            "हा ईमेल आधीच नोंदणीकृत आहे.",

        passwordTooShort:
            "पासवर्ड किमान 6 अक्षरांचा असावा.",

        registrationError:
            "नोंदणी अयशस्वी झाली. पुन्हा प्रयत्न करा.",

        loginError:
            "लॉगिन अयशस्वी झाले. पुन्हा प्रयत्न करा.",

        passwordResetSent:
            "पासवर्ड रीसेट ईमेल पाठवला आहे.",

        enterEmail:
            "कृपया प्रथम तुमचा ईमेल टाका.",

        profileUpdated:
            "प्रोफाइल यशस्वीरित्या अपडेट झाले.",

        fillRequired:
            "कृपया सर्व आवश्यक माहिती भरा.",

        weatherError:
            "हवामान डेटा लोड करता आला नाही. पुन्हा प्रयत्न करा.",

        microphoneNotSupported:
            "या ब्राउझरमध्ये आवाज ओळख उपलब्ध नाही.",

        microphoneError:
            "मायक्रोफोन वापरता आला नाही.",

        listening:
            "ऐकत आहे...",

        stoppedListening:
            "आवाज सहाय्य बंद केले.",

        noVoiceText:
            "आवाज इनपुट आढळला नाही.",

        weatherLocation:
            "कोपरगाव, महाराष्ट्र"

    }

};


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(key) {

    const language =
        translations[AppState.language]
            ? AppState.language
            : "en";

    return (
        translations[language][key] ||
        translations.en[key] ||
        key
    );
}


/* =========================================================
   APPLY TRANSLATIONS
========================================================= */

function applyTranslations() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function (element) {

            const key =
                element.getAttribute("data-i18n");

            const value = t(key);

            if (value !== undefined) {

                element.textContent = value;

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            element.placeholder = t(key);

        });


    /* -----------------------------------------
       Update HTML language
    ----------------------------------------- */

    document.documentElement.lang =
        AppState.language === "hi"
            ? "hi"
            : AppState.language === "mr"
                ? "mr"
                : "en";


    /* -----------------------------------------
       Update language selectors
    ----------------------------------------- */

    const selectors = [

        document.getElementById("dashboardLanguage"),
        document.getElementById("settingsLanguage"),
        document.getElementById("registerLanguage"),
        document.getElementById("profileLanguage")

    ];

    selectors.forEach(function (select) {

        if (select) {

            if (
                Array.from(select.options)
                    .some(
                        option =>
                            option.value === AppState.language
                    )
            ) {

                select.value =
                    AppState.language;

            }

        }

    });


    /* -----------------------------------------
       Weather location if displayed dynamically
    ----------------------------------------- */

    const weatherLocation =
        document.getElementById("weatherLocationName");

    if (weatherLocation) {

        weatherLocation.textContent =
            t("weatherLocation");

    }

}


/* =========================================================
   SAVE LANGUAGE
========================================================= */

function setLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    AppState.language = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );

    applyTranslations();

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

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


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    if (dashboard) {

        dashboard.classList.add(
            "active-dashboard"
        );

        dashboard.style.display = "block";

    }

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove(
                "active-screen"
            );

        });

    closeSideMenu();
    closeProfileMenu();

    showSection("dashboardSection");

    updateConnectionStatus();

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
            "active-dashboard"
        );

        dashboard.style.display = "none";

    }

}


/* =========================================================
   DASHBOARD SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    if (!sectionId) {
        sectionId = "dashboardSection";
    }

    const section =
        document.getElementById(sectionId);

    if (!section) {
        console.warn(
            "Section not found:",
            sectionId
        );
        return;
    }


    document
        .querySelectorAll(".app-section")
        .forEach(function (item) {

            item.classList.remove(
                "active-section"
            );

        });


    section.classList.add(
        "active-section"
    );


    AppState.currentSection =
        sectionId;


    closeSideMenu();
    closeProfileMenu();


    if (sectionId === "weatherSection") {

        loadWeather();

    }


    if (sectionId === "profileSection") {

        loadProfileIntoUI();

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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


    const dashboardStatusDot =
        document.querySelector(
            ".dashboard-status-card .status-dot"
        );

    if (dashboardStatusDot) {

        dashboardStatusDot.classList.toggle(
            "online",
            online
        );

        dashboardStatusDot.classList.toggle(
            "offline",
            !online
        );

    }

}


/* =========================================================
   ONLINE / OFFLINE LISTENERS
========================================================= */

window.addEventListener(
    "online",
    function () {

        updateConnectionStatus();

        /*
           Automatically refresh weather after
           internet comes back.
        */

        if (
            AppState.currentSection ===
            "weatherSection"
        ) {

            loadWeather();

        }

    }
);


window.addEventListener(
    "offline",
    function () {

        updateConnectionStatus();

    }
);


/* =========================================================
   SIDE MENU
========================================================= */

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

function toggleProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (!menu) {
        return;
    }

    menu.classList.toggle(
        "open"
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
   MESSAGE HELPER
========================================================= */

function showMessage(
    elementId,
    message,
    type = "success"
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
        "message " +
        type +
        "-message";

    element.classList.remove(
        "hidden"
    );

}


function clearMessage(elementId) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    element.textContent = "";

    element.className =
        "message";

}


/* =========================================================
   DEMO FARMER
========================================================= */

const DEMO_FARMER = {

    uid: "demo-user",

    name: "Demo Farmer",

    email: "demo@smartagri.local",

    mobile: "9876543210",

    village: "Kopargaon",

    state: "Maharashtra",

    landArea: "5 Acres",

    preferredMarket: "Kopargaon APMC",

    language: "en"

};


/* =========================================================
   LOAD FARMER INTO DASHBOARD
========================================================= */

function loadFarmerIntoUI() {

    const farmer =
        AppState.farmer ||
        DEMO_FARMER;


    const fields = {

        headerFarmerName:
            farmer.name,

        dashboardFarmerName:
            farmer.name,

        summaryName:
            farmer.name,

        summaryVillage:
            farmer.village,

        summaryLand:
            farmer.landArea,

        summaryMarket:
            farmer.preferredMarket,

        profilePageName:
            farmer.name,

        profilePageEmail:
            farmer.email,

        profileName:
            farmer.name,

        profileEmail:
            farmer.email,

        profileMobile:
            farmer.mobile,

        profileVillage:
            farmer.village,

        profileState:
            farmer.state,

        profileLandArea:
            farmer.landArea,

        profileMarket:
            farmer.preferredMarket,

        profileLanguage:
            farmer.language || AppState.language

    };


    Object.keys(fields).forEach(
        function (id) {

            const element =
                document.getElementById(id);

            if (!element) {
                return;
            }

            if (
                element.tagName ===
                "INPUT" ||
                element.tagName ===
                "SELECT"
            ) {

                element.value =
                    fields[id];

            } else {

                element.textContent =
                    fields[id];

            }

        }
    );


    const headerName =
        document.getElementById(
            "headerFarmerName"
        );

    if (headerName) {

        headerName.textContent =
            farmer.name || "Farmer";

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function loginUser(
    email,
    password
) {

    if (!firebaseReady || !auth) {

        showMessage(
            "loginMessage",
            "Firebase is not available. Use Demo Dashboard.",
            "error"
        );

        return;

    }


    try {

        const result =
            await auth.signInWithEmailAndPassword(
                email,
                password
            );


        AppState.currentUser =
            result.user;

        AppState.demoMode = false;


        await loadFirestoreProfile(
            result.user.uid,
            result.user
        );


        showMessage(
            "loginMessage",
            t("loginSuccess"),
            "success"
        );


        setTimeout(
            function () {

                showDashboard();

                loadFarmerIntoUI();

            },
            500
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        let message =
            t("loginError");


        if (
            error.code ===
            "auth/invalid-credential" ||
            error.code ===
            "auth/wrong-password" ||
            error.code ===
            "auth/user-not-found"
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


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (firebaseReady && auth) {

    auth.onAuthStateChanged(
        async function (user) {

            if (user) {

                AppState.currentUser =
                    user;

                if (!AppState.demoMode) {

                    await loadFirestoreProfile(
                        user.uid,
                        user
                    );

                }

            }

        }
    );

}


/* =========================================================
   LOAD FIRESTORE PROFILE
========================================================= */

async function loadFirestoreProfile(
    uid,
    user
) {

    if (!db) {

        AppState.farmer = {

            ...DEMO_FARMER,

            uid: uid,

            email:
                user && user.email
                    ? user.email
                    : DEMO_FARMER.email

        };

        return;

    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (snapshot.exists) {

            const data =
                snapshot.data();


            AppState.farmer = {

                ...DEMO_FARMER,

                ...data,

                uid: uid,

                email:
                    data.email ||
                    (
                        user
                            ? user.email
                            : ""
                    )

            };

        } else {

            AppState.farmer = {

                ...DEMO_FARMER,

                uid: uid,

                email:
                    user
                        ? user.email
                        : ""

            };

        }


    } catch (error) {

        console.error(
            "Firestore profile error:",
            error
        );


        AppState.farmer = {

            ...DEMO_FARMER,

            uid: uid,

            email:
                user
                    ? user.email
                    : ""

        };

    }

}


/* =========================================================
   REGISTRATION
========================================================= */

async function registerUser() {

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

    const preferredMarket =
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


    if (
        !name ||
        !email ||
        !mobile ||
        !village ||
        !state ||
        !landArea ||
        !preferredMarket ||
        !password
    ) {

        showMessage(
            "registerMessage",
            t("fillRequired"),
            "error"
        );

        return;

    }


    if (password.length < 6) {

        showMessage(
            "registerMessage",
            t("passwordTooShort"),
            "error"
        );

        return;

    }


    if (!firebaseReady || !auth) {

        showMessage(
            "registerMessage",
            "Firebase is not available.",
            "error"
        );

        return;

    }


    try {

        const result =
            await auth.createUserWithEmailAndPassword(
                email,
                password
            );


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
                firebase.firestore.FieldValue
                    .serverTimestamp()

        };


        if (db) {

            await db
                .collection("farmers")
                .doc(result.user.uid)
                .set(farmerData);

        }


        AppState.currentUser =
            result.user;

        AppState.farmer = {

            ...farmerData,

            uid:
                result.user.uid

        };


        setLanguage(language);


        showMessage(
            "registerMessage",
            t("registerSuccess"),
            "success"
        );


        setTimeout(
            function () {

                showDashboard();

                loadFarmerIntoUI();

            },
            700
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        let message =
            t("registrationError");


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
                t("passwordTooShort");

        }


        showMessage(
            "registerMessage",
            message,
            "error"
        );

    }

}


/* =========================================================
   PASSWORD RESET
========================================================= */

async function resetPassword() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    if (!email) {

        showMessage(
            "loginMessage",
            t("enterEmail"),
            "error"
        );

        return;

    }


    if (!auth) {

        showMessage(
            "loginMessage",
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
            "loginMessage",
            t("passwordResetSent"),
            "success"
        );


    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );


        showMessage(
            "loginMessage",
            error.message ||
            t("loginError"),
            "error"
        );

    }

}


/* =========================================================
   DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    AppState.demoMode =
        true;

    AppState.currentUser =
        null;

    AppState.farmer = {

        ...DEMO_FARMER,

        language:
            AppState.language

    };


    hideDashboard();

    showDashboard();

    loadFarmerIntoUI();

    showMessage(
        "loginMessage",
        t("demoModeMessage"),
        "success"
    );


    /*
       Automatically load weather when
       entering demo mode.
    */

    setTimeout(
        function () {

            loadWeather();

        },
        300
    );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutUser() {

    try {

        if (
            firebaseReady &&
            auth &&
            AppState.currentUser
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    AppState.currentUser =
        null;

    AppState.farmer =
        null;

    AppState.demoMode =
        false;


    hideDashboard();

    showScreen(
        "loginPage"
    );

}


/* =========================================================
   PROFILE SAVE
========================================================= */

async function saveProfile() {

    const farmer =
        AppState.farmer ||
        DEMO_FARMER;


    const updated = {

        ...farmer,

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

        language:
            document.getElementById(
                "profileLanguage"
            ).value

    };


    AppState.farmer =
        updated;


    setLanguage(
        updated.language
    );


    if (
        db &&
        AppState.currentUser &&
        !AppState.demoMode
    ) {

        try {

            await db
                .collection("farmers")
                .doc(
                    AppState.currentUser.uid
                )
                .set(
                    updated,
                    {
                        merge: true
                    }
                );

        } catch (error) {

            console.error(
                "Profile save error:",
                error
            );

        }

    }


    loadFarmerIntoUI();


    showMessage(
        "profileMessage",
        t("profileUpdated"),
        "success"
    );


    disableProfileEditing();

}


/* =========================================================
   PROFILE EDITING
========================================================= */

function enableProfileEditing() {

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


function disableProfileEditing() {

    const ids = [

        "profileName",
        "profileEmail",
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
   LOAD PROFILE INTO UI
========================================================= */

function loadProfileIntoUI() {

    loadFarmerIntoUI();

    disableProfileEditing();

}


/* =========================================================
   WEATHER API
========================================================= */

/*
   Open-Meteo endpoint:

   https://api.open-meteo.com/v1/forecast

   It does not require an API key for this prototype.

   We request:
   - current temperature
   - current humidity
   - current wind speed
   - hourly precipitation probability

   Open-Meteo documents these variables in its Forecast API.
*/


async function loadWeather() {

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const errorBox =
        document.getElementById(
            "weatherError"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const dataBox =
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

        errorBox.textContent = "";

    }


    if (empty) {

        empty.classList.add(
            "hidden"
        );

    }


    if (dataBox) {

        dataBox.classList.add(
            "hidden"
        );

    }


    /*
       If browser says offline,
       do not attempt API call.
    */

    if (!navigator.onLine) {

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


        if (errorBox) {

            errorBox.textContent =
                t("weatherError");

            errorBox.classList.remove(
                "hidden"
            );

        }

        return;

    }


    try {

        /*
           Current weather data.
        */

        const url =
            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" +
            WEATHER_LOCATION.latitude +

            "&longitude=" +
            WEATHER_LOCATION.longitude +

            "&current=" +
            "temperature_2m," +
            "relative_humidity_2m," +
            "wind_speed_10m," +
            "weather_code" +

            "&hourly=" +
            "precipitation_probability" +

            "&forecast_days=1" +

            "&timezone=Asia%2FKolkata";


        console.log(
            "Fetching weather:",
            url
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
                "Weather API returned HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Weather API response:",
            data
        );


        if (
            !data ||
            !data.current
        ) {

            throw new Error(
                "Invalid weather response."
            );

        }


        /*
           -----------------------------------------
           CURRENT VALUES
           -----------------------------------------
        */

        const temperature =
            data.current.temperature_2m;

        const humidity =
            data.current.relative_humidity_2m;

        const wind =
            data.current.wind_speed_10m;


        /*
           -----------------------------------------
           RAIN PROBABILITY
           -----------------------------------------

           Open-Meteo gives precipitation probability
           as an hourly array.

           Find the hour corresponding to
           current.time.
        */

        let rainProbability = null;


        if (
            data.hourly &&
            Array.isArray(
                data.hourly.time
            ) &&
            Array.isArray(
                data.hourly.precipitation_probability
            )
        ) {

            const currentTime =
                data.current.time;


            let index =
                data.hourly.time.indexOf(
                    currentTime
                );


            /*
               Sometimes timestamps may differ slightly.
               If exact match isn't found, find the closest hour.
            */

            if (index === -1) {

                const currentDate =
                    new Date(currentTime);


                let smallestDifference =
                    Infinity;

                let closestIndex =
                    -1;


                data.hourly.time.forEach(
                    function (
                        time,
                        i
                    ) {

                        const difference =
                            Math.abs(
                                new Date(time)
                                    .getTime() -
                                currentDate.getTime()
                            );


                        if (
                            difference <
                            smallestDifference
                        ) {

                            smallestDifference =
                                difference;

                            closestIndex =
                                i;

                        }

                    }
                );


                index =
                    closestIndex;

            }


            if (
                index >= 0 &&
                data.hourly
                    .precipitation_probability[index]
                    !== undefined
            ) {

                rainProbability =
                    data.hourly
                        .precipitation_probability[index];

            }

        }


        /*
           -----------------------------------------
           DISPLAY VALUES
           -----------------------------------------
        */

        const temperatureElement =
            document.getElementById(
                "weatherTemperature"
            );

        const humidityElement =
            document.getElementById(
                "weatherHumidity"
            );

        const windElement =
            document.getElementById(
                "weatherWind"
            );

        const rainElement =
            document.getElementById(
                "weatherRain"
            );


        if (temperatureElement) {

            temperatureElement.textContent =
                temperature !== null &&
                temperature !== undefined
                    ? Number(
                        temperature
                    ).toFixed(1) + " °C"
                    : "—";

        }


        if (humidityElement) {

            humidityElement.textContent =
                humidity !== null &&
                humidity !== undefined
                    ? Math.round(
                        humidity
                    ) + "%"
                    : "—";

        }


        if (windElement) {

            windElement.textContent =
                wind !== null &&
                wind !== undefined
                    ? Number(
                        wind
                    ).toFixed(1) + " km/h"
                    : "—";

        }


        if (rainElement) {

            rainElement.textContent =
                rainProbability !== null
                    ? Math.round(
                        rainProbability
                    ) + "%"
                    : "—";

        }


        /*
           -----------------------------------------
           SHOW WEATHER DATA
           -----------------------------------------
        */

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }


        if (empty) {

            empty.classList.add(
                "hidden"
            );

        }


        if (dataBox) {

            dataBox.classList.remove(
                "hidden"
            );

        }


        /*
           Optional: store last successful weather
           response for offline display.
        */

        try {

            localStorage.setItem(
                "smartagriLastWeather",
                JSON.stringify({
                    timestamp:
                        Date.now(),

                    temperature:
                        temperature,

                    humidity:
                        humidity,

                    wind:
                        wind,

                    rainProbability:
                        rainProbability
                })
            );

        } catch (storageError) {

            console.warn(
                "Could not cache weather:",
                storageError
            );

        }


    } catch (error) {

        console.error(
            "Weather loading error:",
            error
        );


        /*
           Try cached weather before showing
           complete failure.
        */

        const cached =
            getCachedWeather();


        if (cached) {

            displayCachedWeather(
                cached
            );

        } else {

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


            if (errorBox) {

                errorBox.textContent =
                    t("weatherError");

                errorBox.classList.remove(
                    "hidden"
                );

            }

        }

    }

}


/* =========================================================
   CACHED WEATHER
========================================================= */

function getCachedWeather() {

    try {

        const saved =
            localStorage.getItem(
                "smartagriLastWeather"
            );


        if (!saved) {
            return null;
        }


        return JSON.parse(
            saved
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   DISPLAY CACHED WEATHER
========================================================= */

function displayCachedWeather(
    weather
) {

    const temperatureElement =
        document.getElementById(
            "weatherTemperature"
        );

    const humidityElement =
        document.getElementById(
            "weatherHumidity"
        );

    const windElement =
        document.getElementById(
            "weatherWind"
        );

    const rainElement =
        document.getElementById(
            "weatherRain"
        );

    const loading =
        document.getElementById(
            "weatherLoading"
        );

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const dataBox =
        document.getElementById(
            "weatherData"
        );


    if (temperatureElement) {

        temperatureElement.textContent =
            weather.temperature !== null &&
            weather.temperature !== undefined
                ? Number(
                    weather.temperature
                ).toFixed(1) + " °C"
                : "—";

    }


    if (humidityElement) {

        humidityElement.textContent =
            weather.humidity !== null &&
            weather.humidity !== undefined
                ? Math.round(
                    weather.humidity
                ) + "%"
                : "—";

    }


    if (windElement) {

        windElement.textContent =
            weather.wind !== null &&
            weather.wind !== undefined
                ? Number(
                    weather.wind
                ).toFixed(1) + " km/h"
                : "—";

    }


    if (rainElement) {

        rainElement.textContent =
            weather.rainProbability !== null &&
            weather.rainProbability !== undefined
                ? Math.round(
                    weather.rainProbability
                ) + "%"
                : "—";

    }


    if (loading) {

        loading.classList.add(
            "hidden"
        );

    }


    if (empty) {

        empty.classList.add(
            "hidden"
        );

    }


    if (dataBox) {

        dataBox.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   REFRESH WEATHER BUTTON
========================================================= */

function refreshWeather() {

    loadWeather();

}


/* =========================================================
   MARKET SECTION
========================================================= */

function updateMarketDisplay() {

    /*
       Your HTML currently does not contain a connected
       market API. Therefore we intentionally keep the
       market values as unavailable rather than inventing
       prices.
    */

    const body =
        document.getElementById(
            "marketTableBody"
        );


    if (!body) {
        return;
    }


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


/* =========================================================
   MARKET COMPARISON
========================================================= */

function updateMarketComparison() {

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
                    t("dataUnavailable");

            }

        });

}


/* =========================================================
   CROP INFORMATION
========================================================= */

const cropInformation = {

    onion: {

        icon: "🧅",

        en: {

            name: "Onion",

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

        hi: {

            name: "प्याज",

            cultivation: {

                title:
                    "प्याज की खेती का मार्गदर्शन",

                subtitle:
                    "सफल प्याज उत्पादन के लिए महत्वपूर्ण चरण।",

                content: `

                    <h3>🌱 भूमि की तैयारी</h3>

                    <p>
                        अच्छी जल निकासी वाली भुरभुरी मिट्टी में
                        अच्छी तरह तैयार क्यारी बनाएं।
                    </p>

                    <h3>🌱 रोपण</h3>

                    <p>
                        स्वस्थ और रोगमुक्त पौध सामग्री का उपयोग करें
                        और उचित दूरी बनाए रखें।
                    </p>

                    <h3>💧 सिंचाई</h3>

                    <p>
                        फसल के विकास के दौरान पर्याप्त नमी बनाए रखें।
                        जलभराव से बचें।
                    </p>

                    <h3>☀️ खेत की स्थिति</h3>

                    <p>
                        पर्याप्त धूप और पौधों के बीच अच्छा वायु संचार रखें।
                    </p>

                `

            },

            management: {

                title:
                    "प्याज फसल प्रबंधन",

                subtitle:
                    "पूरे फसल चक्र के दौरान फसल का प्रबंधन करें।",

                content: `

                    <h3>💧 जल प्रबंधन</h3>

                    <p>
                        बल्ब बनने के समय मिट्टी में पर्याप्त नमी रखें।
                    </p>

                    <h3>🌿 खरपतवार प्रबंधन</h3>

                    <p>
                        खेत को खरपतवार मुक्त रखें क्योंकि वे पानी,
                        पोषक तत्व और प्रकाश के लिए प्रतिस्पर्धा करते हैं।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>

                    <p>
                        मिट्टी परीक्षण और स्थानीय सिफारिशों के अनुसार
                        पोषक तत्वों का प्रयोग करें।
                    </p>

                    <h3>🔍 फसल निगरानी</h3>

                    <p>
                        कीट, रोग और पत्तियों के असामान्य बदलाव की
                        नियमित जांच करें।
                    </p>

                `

            },

            practices: {

                title:
                    "प्याज की कृषि पद्धतियां",

                subtitle:
                    "बेहतर प्याज उत्पादन के लिए व्यावहारिक तरीके।",

                content: `

                    <h3>🚜 खेत की स्वच्छता</h3>

                    <p>
                        रोगग्रस्त पौधों को हटाएं और खेत साफ रखें।
                    </p>

                    <h3>🌱 स्वस्थ पौध सामग्री</h3>

                    <p>
                        स्वस्थ और रोगमुक्त पौध सामग्री का उपयोग करें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>

                    <p>
                        संभव हो तो फसल चक्र अपनाएं।
                    </p>

                    <h3>📦 कटाई प्रबंधन</h3>

                    <p>
                        उचित परिपक्वता पर प्याज की कटाई करें और
                        भंडारण से पहले अच्छी तरह सुखाएं।
                    </p>

                `

            }

        },

        mr: {

            name: "कांदा",

            cultivation: {

                title:
                    "कांदा लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी कांदा लागवडीसाठी महत्त्वाचे टप्पे.",

                content: `

                    <h3>🌱 जमीन तयार करणे</h3>

                    <p>
                        उत्तम निचरा होणारी भुसभुशीत जमीन तयार करा.
                    </p>

                    <h3>🌱 लागवड</h3>

                    <p>
                        निरोगी आणि रोगमुक्त रोपे वापरा व योग्य अंतर ठेवा.
                    </p>

                    <h3>💧 पाणी व्यवस्थापन</h3>

                    <p>
                        पिकाच्या वाढीच्या काळात जमिनीत योग्य ओलावा ठेवा.
                        पाणी साचू देऊ नका.
                    </p>

                    <h3>☀️ शेताची परिस्थिती</h3>

                    <p>
                        पुरेसा सूर्यप्रकाश आणि चांगले वायुवीजन ठेवा.
                    </p>

                `

            },

            management: {

                title:
                    "कांदा पीक व्यवस्थापन",

                subtitle:
                    "संपूर्ण पीक कालावधीत योग्य व्यवस्थापन करा.",

                content: `

                    <h3>💧 पाणी व्यवस्थापन</h3>

                    <p>
                        कांदा तयार होत असताना जमिनीत योग्य ओलावा ठेवा.
                    </p>

                    <h3>🌿 तण व्यवस्थापन</h3>

                    <p>
                        तणांमुळे पाणी, अन्नद्रव्ये आणि सूर्यप्रकाशासाठी
                        स्पर्धा होते. त्यामुळे तण नियंत्रण करा.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>

                    <p>
                        माती परीक्षण आणि स्थानिक शिफारशींनुसार
                        खतांचा वापर करा.
                    </p>

                    <h3>🔍 पीक निरीक्षण</h3>

                    <p>
                        किडी, रोग आणि पानांमधील बदलांची नियमित तपासणी करा.
                    </p>

                `

            },

            practices: {

                title:
                    "कांदा शेती पद्धती",

                subtitle:
                    "चांगल्या कांदा उत्पादनासाठी व्यावहारिक पद्धती.",

                content: `

                    <h3>🚜 शेत स्वच्छता</h3>

                    <p>
                        रोगग्रस्त झाडे काढून शेत स्वच्छ ठेवा.
                    </p>

                    <h3>🌱 निरोगी रोपे</h3>

                    <p>
                        निरोगी आणि रोगमुक्त रोपांचा वापर करा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>

                    <p>
                        शक्य असल्यास पीक फेरपालट पद्धतीचा वापर करा.
                    </p>

                    <h3>📦 काढणी व्यवस्थापन</h3>

                    <p>
                        योग्य परिपक्वतेनंतर कांद्याची काढणी करा आणि
                        साठवणुकीपूर्वी योग्य प्रकारे वाळवा.
                    </p>

                `

            }

        }

    },


    wheat: {

        icon: "🌾",

        en: {

            name: "Wheat",

            cultivation: {

                title:
                    "Wheat Cultivation Guidance",

                subtitle:
                    "Important steps for successful wheat production.",

                content: `

                    <h3>🌱 Soil Preparation</h3>

                    <p>
                        Prepare a well-levelled and properly prepared seedbed
                        with suitable soil moisture.
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
                        Pay attention to irrigation during important
                        crop growth stages.
                    </p>

                    <h3>🌿 Weed Control</h3>

                    <p>
                        Monitor fields for weeds and use appropriate
                        integrated weed-management practices.
                    </p>

                    <h3>🔍 Pest Monitoring</h3>

                    <p>
                        Inspect the crop regularly for insects,
                        disease symptoms and abnormal plant growth.
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
                        for the selected wheat variety.
                    </p>

                    <h3>🚜 Field Preparation</h3>

                    <p>
                        Maintain a level and properly prepared seedbed
                        for uniform crop establishment.
                    </p>

                    <h3>🔄 Crop Rotation</h3>

                    <p>
                        Crop rotation can support soil management
                        and reduce recurring crop problems.
                    </p>

                    <h3>🌾 Harvesting</h3>

                    <p>
                        Harvest when the crop reaches appropriate maturity
                        and grain moisture is suitable.
                    </p>

                `

            }

        },

        hi: {

            name: "गेहूं",

            cultivation: {

                title:
                    "गेहूं की खेती का मार्गदर्शन",

                subtitle:
                    "सफल गेहूं उत्पादन के लिए महत्वपूर्ण चरण।",

                content: `

                    <h3>🌱 मिट्टी की तैयारी</h3>

                    <p>
                        अच्छी तरह समतल और तैयार खेत में उचित नमी बनाए रखें।
                    </p>

                    <h3>🌾 बीज चयन</h3>

                    <p>
                        स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और
                        गुणवत्तापूर्ण बीज का उपयोग करें।
                    </p>

                    <h3>💧 सिंचाई</h3>

                    <p>
                        फसल की अवस्था, मिट्टी की नमी और मौसम के अनुसार
                        सिंचाई करें।
                    </p>

                    <h3>☀️ फसल की स्थिति</h3>

                    <p>
                        गेहूं उचित ठंडी परिस्थितियों और पर्याप्त
                        सूर्यप्रकाश में अच्छी तरह बढ़ता है।
                    </p>

                `

            },

            management: {

                title:
                    "गेहूं फसल प्रबंधन",

                subtitle:
                    "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",

                content: `

                    <h3>💧 सिंचाई प्रबंधन</h3>

                    <p>
                        महत्वपूर्ण विकास अवस्थाओं में सिंचाई पर ध्यान दें।
                    </p>

                    <h3>🌿 खरपतवार नियंत्रण</h3>

                    <p>
                        खेत में खरपतवार की निगरानी करें और उचित
                        एकीकृत नियंत्रण अपनाएं।
                    </p>

                    <h3>🔍 कीट निगरानी</h3>

                    <p>
                        कीट, रोग और असामान्य वृद्धि की नियमित जांच करें।
                    </p>

                    <h3>🧪 पोषक तत्व प्रबंधन</h3>

                    <p>
                        मिट्टी परीक्षण और अनुशंसित आवश्यकताओं के अनुसार
                        उर्वरक दें।
                    </p>

                `

            },

            practices: {

                title:
                    "गेहूं की कृषि पद्धतियां",

                subtitle:
                    "स्वस्थ गेहूं फसल के लिए व्यावहारिक तरीके।",

                content: `

                    <h3>🌱 समय पर बुवाई</h3>

                    <p>
                        स्थानीय रूप से अनुशंसित समय पर बुवाई करें।
                    </p>

                    <h3>🚜 खेत की तैयारी</h3>

                    <p>
                        समान फसल स्थापना के लिए समतल और उचित
                        बीज क्यारी तैयार करें।
                    </p>

                    <h3>🔄 फसल चक्र</h3>

                    <p>
                        फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है।
                    </p>

                    <h3>🌾 कटाई</h3>

                    <p>
                        उचित परिपक्वता और उपयुक्त नमी पर कटाई करें।
                    </p>

                `

            }

        },

        mr: {

            name: "गहू",

            cultivation: {

                title:
                    "गहू लागवड मार्गदर्शन",

                subtitle:
                    "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे.",

                content: `

                    <h3>🌱 जमिनीची तयारी</h3>

                    <p>
                        जमीन समतल करून योग्य ओलावा असलेली
                        भुसभुशीत पेरणीची जमीन तयार करा.
                    </p>

                    <h3>🌾 बियाणे निवड</h3>

                    <p>
                        स्थानिक भागासाठी शिफारस केलेले
                        निरोगी आणि दर्जेदार बियाणे वापरा.
                    </p>

                    <h3>💧 पाणी व्यवस्थापन</h3>

                    <p>
                        पिकाची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार
                        पाणी द्या.
                    </p>

                    <h3>☀️ पीक परिस्थिती</h3>

                    <p>
                        योग्य थंड हवामान आणि पुरेसा सूर्यप्रकाश
                        गव्हासाठी उपयुक्त असतो.
                    </p>

                `

            },

            management: {

                title:
                    "गहू पीक व्यवस्थापन",

                subtitle:
                    "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा.",

                content: `

                    <h3>💧 पाणी व्यवस्थापन</h3>

                    <p>
                        पिकाच्या महत्त्वाच्या वाढीच्या अवस्थेत
                        पाण्याचे योग्य नियोजन करा.
                    </p>

                    <h3>🌿 तण नियंत्रण</h3>

                    <p>
                        तणांची नियमित पाहणी करून योग्य नियंत्रण पद्धती वापरा.
                    </p>

                    <h3>🔍 किडींचे निरीक्षण</h3>

                    <p>
                        किडी, रोगांची लक्षणे आणि असामान्य वाढ
                        यांची नियमित तपासणी करा.
                    </p>

                    <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>

                    <p>
                        माती परीक्षण आणि शिफारशींनुसार खतांचा वापर करा.
                    </p>

                `

            },

            practices: {

                title:
                    "गहू शेती पद्धती",

                subtitle:
                    "निरोगी गहू पिकासाठी व्यावहारिक पद्धती.",

                content: `

                    <h3>🌱 वेळेवर पेरणी</h3>

                    <p>
                        स्थानिक शिफारशीप्रमाणे योग्य वेळी पेरणी करा.
                    </p>

                    <h3>🚜 शेताची तयारी</h3>

                    <p>
                        समान उगवणीसाठी जमीन समतल आणि योग्य प्रकारे तयार करा.
                    </p>

                    <h3>🔄 पीक फेरपालट</h3>

                    <p>
                        पीक फेरपालट केल्याने जमिनीचे व्यवस्थापन सुधारण्यास
                        मदत होऊ शकते.
                    </p>

                    <h3>🌾 काढणी</h3>

                    <p>
                        योग्य परिपक्वतेनंतर आणि योग्य आर्द्रतेवर काढणी करा.
                    </p>

                `

            }

        }

    }

};


/* =========================================================
   OPEN CROP MODAL
========================================================= */

function openCropModal(
    crop,
    topic
) {

    if (
        !cropInformation[crop] ||
        !cropInformation[crop][
            AppState.language
        ] ||
        !cropInformation[crop][
            AppState.language
        ][topic]
    ) {

        console.error(
            "Crop information not found:",
            crop,
            topic
        );

        return;

    }


    const cropData =
        cropInformation[crop];

    const languageData =
        cropData[
            AppState.language
        ];


    const topicData =
        languageData[topic];


    const modal =
        document.getElementById(
            "cropInfoModal"
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


    if (!modal) {
        return;
    }


    modalIcon.textContent =
        cropData.icon;

    modalTitle.textContent =
        topicData.title;

    modalSubtitle.textContent =
        topicData.subtitle;

    modalBody.innerHTML =
        topicData.content;


    modal.classList.remove(
        "hidden"
    );

    document.body.classList.add(
        "modal-open"
    );


    const closeButton =
        document.getElementById(
            "closeCropInfoBtn"
        );

    if (closeButton) {

        closeButton.focus();

    }

}


/* =========================================================
   CLOSE CROP MODAL
========================================================= */

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


/* =========================================================
   GOVERNMENT SCHEME
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
   VOICE ASSISTANCE
========================================================= */

let recognition = null;
let isListening = false;


function getSpeechLanguage() {

    if (AppState.language === "hi") {

        return "hi-IN";

    }

    if (AppState.language === "mr") {

        return "mr-IN";

    }

    return "en-IN";

}


/* =========================================================
   START VOICE
========================================================= */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        const response =
            document.getElementById(
                "voiceResponse"
            );

        if (response) {

            response.textContent =
                t("microphoneNotSupported");

        }

        return;

    }


    if (isListening) {
        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        getSpeechLanguage();

    recognition.continuous =
        false;

    recognition.interimResults =
        true;

    recognition.maxAlternatives =
        1;


    recognition.onstart =
        function () {

            isListening =
                true;


            const startButton =
                document.getElementById(
                    "startVoiceBtn"
                );

            const stopButton =
                document.getElementById(
                    "stopVoiceBtn"
                );

            const response =
                document.getElementById(
                    "voiceResponse"
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


            if (response) {

                response.textContent =
                    t("listening");

            }

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
                    event.results[i][0]
                        .transcript;

            }


            const voiceInput =
                document.getElementById(
                    "voiceInput"
                );


            if (voiceInput) {

                voiceInput.value =
                    transcript;

            }


            if (
                event.results[
                    event.results.length - 1
                ].isFinal
            ) {

                handleVoiceQuestion(
                    transcript
                );

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Speech recognition error:",
                event
            );


            const response =
                document.getElementById(
                    "voiceResponse"
                );


            if (response) {

                response.textContent =
                    t("microphoneError");

            }

        };


    recognition.onend =
        function () {

            isListening =
                false;


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

        };


    try {

        recognition.start();

    } catch (error) {

        console.error(
            "Could not start recognition:",
            error
        );

    }

}


/* =========================================================
   STOP VOICE
========================================================= */

function stopVoice() {

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();

    }


    const response =
        document.getElementById(
            "voiceResponse"
        );

    if (response) {

        response.textContent =
            t("stoppedListening");

    }

}


/* =========================================================
   VOICE QUESTION HANDLER
========================================================= */

function handleVoiceQuestion(
    text
) {

    if (!text) {

        return;

    }


    const response =
        document.getElementById(
            "voiceResponse"
        );


    let answer = "";


    const lower =
        text.toLowerCase();


    if (
        lower.includes("weather") ||
        lower.includes("मौसम") ||
        lower.includes("हवामान")
    ) {

        answer =
            AppState.language === "hi"
                ? "मैं कोपरगांव का वर्तमान मौसम डैशबोर्ड में दिखा रहा हूं।"
                : AppState.language === "mr"
                    ? "मी कोपरगावचे सध्याचे हवामान डॅशबोर्डमध्ये दाखवत आहे."
                    : "I am showing the current Kopargaon weather on the dashboard.";

        showSection(
            "weatherSection"
        );

        loadWeather();

    } else {

        answer =
            AppState.language === "hi"
                ? "आपका प्रश्न प्राप्त हुआ। AI सेवा कनेक्ट होने पर मैं विस्तृत उत्तर दे सकता हूं।"
                : AppState.language === "mr"
                    ? "तुमचा प्रश्न प्राप्त झाला. AI सेवा कनेक्ट झाल्यावर मी सविस्तर उत्तर देऊ शकतो."
                    : "I received your question. I can provide a detailed answer once the AI service is connected.";

    }


    if (response) {

        response.textContent =
            answer;

    }


    speakText(
        answer
    );

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(
    text
) {

    if (
        !AppState.voiceEnabled
    ) {

        return;

    }


    if (
        !window.speechSynthesis
    ) {

        return;

    }


    if (!text) {
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
        0.95;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function handleAIQuestion(
    event
) {

    event.preventDefault();


    const input =
        document.getElementById(
            "aiInput"
        );

    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!input || !messages) {
        return;
    }


    const question =
        input.value.trim();


    if (!question) {
        return;
    }


    /*
       Add user message.
    */

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
                    AppState.farmer
                        ? AppState.farmer.name
                        : "Farmer"
                )}
            </strong>

            <p>
                ${escapeHTML(question)}
            </p>

        </div>

    `;


    messages.appendChild(
        userMessage
    );


    /*
       AI isn't connected yet.
    */

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


    input.value = "";


    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================================
   CROP IMAGE PREVIEW
========================================================= */

function handleCropImage(
    event
) {

    const file =
        event.target.files &&
        event.target.files[0];


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
        function (e) {

            if (preview) {

                preview.src =
                    e.target.result;

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


/* =========================================================
   CROP ANALYSIS PLACEHOLDER
========================================================= */

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
            ${escapeHTML(
                t("analysisNotConnected")
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


/* =========================================================
   SETTINGS
========================================================= */

function loadSettings() {

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );

    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    if (voiceSetting) {

        voiceSetting.checked =
            localStorage.getItem(
                "smartagriVoiceEnabled"
            ) !== "false";

    }


    if (notificationSetting) {

        notificationSetting.checked =
            localStorage.getItem(
                "smartagriNotificationsEnabled"
            ) === "true";

    }

}


function saveSettings() {

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );

    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    if (voiceSetting) {

        AppState.voiceEnabled =
            voiceSetting.checked;

        localStorage.setItem(
            "smartagriVoiceEnabled",
            String(
                voiceSetting.checked
            )
        );

    }


    if (notificationSetting) {

        AppState.notificationsEnabled =
            notificationSetting.checked;

        localStorage.setItem(
            "smartagriNotificationsEnabled",
            String(
                notificationSetting.checked
            )
        );

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

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
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SmartAgri application starting..."
        );


        /* -----------------------------------------
           LANGUAGE PAGE
        ----------------------------------------- */

        const languageButtons =
            document.querySelectorAll(
                ".language-option"
            );


        const continueLanguageBtn =
            document.getElementById(
                "continueLanguageBtn"
            );


        let selectedLanguage =
            AppState.language;


        languageButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        languageButtons
                            .forEach(
                                function (
                                    item
                                ) {

                                    item.classList
                                        .remove(
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


                        if (
                            continueLanguageBtn
                        ) {

                            continueLanguageBtn.disabled =
                                false;

                        }

                    }
                );

            }
        );


        if (continueLanguageBtn) {

            continueLanguageBtn.addEventListener(
                "click",
                function () {

                    setLanguage(
                        selectedLanguage
                    );

                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* -----------------------------------------
           LOGIN FORM
        ----------------------------------------- */

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
                        document.getElementById(
                            "loginEmail"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "loginPassword"
                        ).value;


                    loginUser(
                        email,
                        password
                    );

                }
            );

        }


        /* -----------------------------------------
           DEMO BUTTON
        ----------------------------------------- */

        const demoButton =
            document.getElementById(
                "demoBtn"
            );


        if (demoButton) {

            demoButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    enterDemoDashboard();

                }
            );

        }


        /* -----------------------------------------
           REGISTER BUTTON
        ----------------------------------------- */

        const showRegisterBtn =
            document.getElementById(
                "showRegisterBtn"
            );


        if (showRegisterBtn) {

            showRegisterBtn.addEventListener(
                "click",
                function () {

                    clearMessage(
                        "loginMessage"
                    );

                    showScreen(
                        "registerPage"
                    );

                }
            );

        }


        /* -----------------------------------------
           LOGIN FROM REGISTER
        ----------------------------------------- */

        const showLoginBtn =
            document.getElementById(
                "showLoginBtn"
            );


        if (showLoginBtn) {

            showLoginBtn.addEventListener(
                "click",
                function () {

                    clearMessage(
                        "registerMessage"
                    );

                    showScreen(
                        "loginPage"
                    );

                }
            );

        }


        /* -----------------------------------------
           CHANGE LANGUAGE FROM LOGIN
        ----------------------------------------- */

        const changeLanguageFromLogin =
            document.getElementById(
                "changeLanguageFromLogin"
            );


        if (
            changeLanguageFromLogin
        ) {

            changeLanguageFromLogin.addEventListener(
                "click",
                function () {

                    showScreen(
                        "languagePage"
                    );

                }
            );

        }


        /* -----------------------------------------
           FORGOT PASSWORD
        ----------------------------------------- */

        const forgotPasswordBtn =
            document.getElementById(
                "forgotPasswordBtn"
            );


        if (forgotPasswordBtn) {

            forgotPasswordBtn.addEventListener(
                "click",
                resetPassword
            );

        }


        /* -----------------------------------------
           REGISTRATION FORM
        ----------------------------------------- */

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (registrationForm) {

            registrationForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    registerUser();

                }
            );

        }


        /* -----------------------------------------
           HAMBURGER
        ----------------------------------------- */

        const hamburgerBtn =
            document.getElementById(
                "hamburgerBtn"
            );


        if (hamburgerBtn) {

            hamburgerBtn.addEventListener(
                "click",
                openSideMenu
            );

        }


        /* -----------------------------------------
           CLOSE MENU
        ----------------------------------------- */

        const closeMenuBtn =
            document.getElementById(
                "closeMenuBtn"
            );


        if (closeMenuBtn) {

            closeMenuBtn.addEventListener(
                "click",
                closeSideMenu
            );

        }


        /* -----------------------------------------
           MENU OVERLAY
        ----------------------------------------- */

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


        /* -----------------------------------------
           SIDE NAVIGATION
        ----------------------------------------- */

        document
            .querySelectorAll(
                ".side-navigation button[data-section]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            showSection(
                                button.getAttribute(
                                    "data-section"
                                )
                            );

                        }
                    );

                }
            );


        /* -----------------------------------------
           ALL DASHBOARD SECTION BUTTONS
        ----------------------------------------- */

        document
            .querySelectorAll(
                "[data-section]"
            )
            .forEach(
                function (button) {

                    /*
                       Skip side-navigation because
                       it already has a listener.
                    */

                    if (
                        button.closest(
                            ".side-navigation"
                        )
                    ) {

                        return;

                    }


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

                }
            );


        /* -----------------------------------------
           PROFILE BUTTON
        ----------------------------------------- */

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


        /* -----------------------------------------
           PROFILE MENU ITEMS
        ----------------------------------------- */

        document
            .querySelectorAll(
                "[data-profile-section]"
            )
            .forEach(
                function (button) {

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

                }
            );


        /* -----------------------------------------
           LOGOUT BUTTONS
        ----------------------------------------- */

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


        /* -----------------------------------------
           LANGUAGE SELECTORS
        ----------------------------------------- */

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


        const profileLanguage =
            document.getElementById(
                "profileLanguage"
            );


        [
            dashboardLanguage,
            settingsLanguage
        ].forEach(
            function (select) {

                if (!select) {
                    return;
                }


                select.addEventListener(
                    "change",
                    function () {

                        setLanguage(
                            select.value
                        );

                    }
                );

            }
        );


        if (registerLanguage) {

            registerLanguage.addEventListener(
                "change",
                function () {

                    setLanguage(
                        registerLanguage.value
                    );

                }
            );

        }


        if (profileLanguage) {

            profileLanguage.addEventListener(
                "change",
                function () {

                    setLanguage(
                        profileLanguage.value
                    );

                }
            );

        }


        /* -----------------------------------------
           WEATHER REFRESH
        ----------------------------------------- */

        const refreshWeatherBtn =
            document.getElementById(
                "refreshWeatherBtn"
            );


        if (refreshWeatherBtn) {

            refreshWeatherBtn.addEventListener(
                "click",
                refreshWeather
            );

        }


        /* -----------------------------------------
           MARKET SELECTOR
        ----------------------------------------- */

        const cropPriceSelector =
            document.getElementById(
                "cropPriceSelector"
            );


        if (cropPriceSelector) {

            cropPriceSelector.addEventListener(
                "change",
                updateMarketDisplay
            );

        }


        /* -----------------------------------------
           CROP INFORMATION BUTTONS
        ----------------------------------------- */

        document
            .querySelectorAll(
                ".crop-info-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            openCropModal(
                                button.getAttribute(
                                    "data-crop"
                                ),
                                button.getAttribute(
                                    "data-topic"
                                )
                            );

                        }
                    );

                }
            );


        /* -----------------------------------------
           CROP MODAL CLOSE
        ----------------------------------------- */

        const closeCropInfoBtn =
            document.getElementById(
                "closeCropInfoBtn"
            );


        const cropInfoModalOverlay =
            document.getElementById(
                "cropInfoModalOverlay"
            );


        if (closeCropInfoBtn) {

            closeCropInfoBtn.addEventListener(
                "click",
                closeCropModal
            );

        }


        if (cropInfoModalOverlay) {

            cropInfoModalOverlay.addEventListener(
                "click",
                closeCropModal
            );

        }


        /* -----------------------------------------
           GOVERNMENT SCHEMES
        ----------------------------------------- */

        document
            .querySelectorAll(
                ".scheme-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            openScheme(
                                button.getAttribute(
                                    "data-scheme-url"
                                )
                            );

                        }
                    );

                }
            );


        /* -----------------------------------------
           VOICE
        ----------------------------------------- */

        const startVoiceBtn =
            document.getElementById(
                "startVoiceBtn"
            );


        const stopVoiceBtn =
            document.getElementById(
                "stopVoiceBtn"
            );


        if (startVoiceBtn) {

            startVoiceBtn.addEventListener(
                "click",
                startVoice
            );

        }


        if (stopVoiceBtn) {

            stopVoiceBtn.addEventListener(
                "click",
                stopVoice
            );

        }


        /* -----------------------------------------
           AI FORM
        ----------------------------------------- */

        const aiForm =
            document.getElementById(
                "aiForm"
            );


        if (aiForm) {

            aiForm.addEventListener(
                "submit",
                handleAIQuestion
            );

        }


        /* -----------------------------------------
           CROP IMAGE
        ----------------------------------------- */

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


        /* -----------------------------------------
           ANALYZE CROP
        ----------------------------------------- */

        const analyzeCropBtn =
            document.getElementById(
                "analyzeCropBtn"
            );


        if (analyzeCropBtn) {

            analyzeCropBtn.addEventListener(
                "click",
                analyzeCrop
            );

        }


        /* -----------------------------------------
           PROFILE EDIT
        ----------------------------------------- */

        const editProfileBtn =
            document.getElementById(
                "editProfileBtn"
            );


        const cancelProfileEditBtn =
            document.getElementById(
                "cancelProfileEditBtn"
            );


        const profileForm =
            document.getElementById(
                "profileForm"
            );


        if (editProfileBtn) {

            editProfileBtn.addEventListener(
                "click",
                enableProfileEditing
            );

        }


        if (cancelProfileEditBtn) {

            cancelProfileEditBtn.addEventListener(
                "click",
                function () {

                    loadProfileIntoUI();

                }
            );

        }


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    saveProfile();

                }
            );

        }


        /* -----------------------------------------
           SETTINGS
        ----------------------------------------- */

        const voiceSetting =
            document.getElementById(
                "voiceSetting"
            );


        const notificationSetting =
            document.getElementById(
                "notificationSetting"
            );


        if (voiceSetting) {

            voiceSetting.addEventListener(
                "change",
                saveSettings
            );

        }


        if (notificationSetting) {

            notificationSetting.addEventListener(
                "change",
                saveSettings
            );

        }


        /* -----------------------------------------
           ESCAPE KEY
        ----------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeSideMenu();

                    closeProfileMenu();

                    closeCropModal();

                }

            }
        );


        /* -----------------------------------------
           CLICK OUTSIDE PROFILE MENU
        ----------------------------------------- */

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
                    menu.classList.contains(
                        "open"
                    ) &&
                    !menu.contains(
                        event.target
                    ) &&
                    !(
                        button &&
                        button.contains(
                            event.target
                        )
                    )
                ) {

                    closeProfileMenu();

                }

            }
        );


        /* -----------------------------------------
           INITIAL APPLICATION STATE
        ----------------------------------------- */

        applyTranslations();

        updateConnectionStatus();

        loadSettings();

        updateMarketDisplay();

        updateMarketComparison();


        /*
           Hide dashboard until demo/login is selected.
        */

        const dashboard =
            document.getElementById(
                "dashboardPage"
            );


        if (dashboard) {

            /*
               The CSS may already control this.
               We only force the dashboard hidden
               if no active dashboard class exists.
            */

            if (
                !dashboard.classList.contains(
                    "active-dashboard"
                )
            ) {

                dashboard.style.display =
                    "none";

            }

        }


        /*
           If language was previously selected,
           keep language page from becoming a
           blocker when user returns to the app.

           We still show language page on first
           visit.
        */

        const savedLanguage =
            localStorage.getItem(
                "smartagriLanguage"
            );


        if (savedLanguage) {

            setLanguage(
                savedLanguage
            );

            /*
               If the user has not logged in,
               show login page directly.
            */

            showScreen(
                "loginPage"
            );

        } else {

            showScreen(
                "languagePage"
            );

        }


        console.log(
            "SmartAgri initialized successfully."
        );

    }
);
