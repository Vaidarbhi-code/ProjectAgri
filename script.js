/* =========================================================
   SMARTAGRI - COMPLETE JAVASCRIPT
   No fallback/mock/fake data
   Firebase Authentication + Firestore
========================================================= */


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

let firebaseInitialized = false;
let auth = null;
let db = null;

try {

    if (
        typeof firebase !== "undefined" &&
        firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY"
    ) {

        firebase.initializeApp(firebaseConfig);

        auth = firebase.auth();
        db = firebase.firestore();

        firebaseInitialized = true;

        console.log("Firebase initialized successfully.");

    } else {

        console.warn(
            "Firebase is not configured. Authentication and Firestore are unavailable."
        );

    }

} catch (error) {

    console.error("Firebase initialization failed:", error);

}


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentUser = null;
let currentLanguage = localStorage.getItem("smartagriLanguage") || null;
let selectedLanguage = null;
let farmerData = null;
let editingProfile = false;


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

        online:
            "Online",

        offline:
            "Offline",

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
            "आपकी कृषि जानकारी एक ही स्थान पर।",

        connectionStatus:
            "कनेक्शन स्थिति",

        online:
            "ऑनलाइन",

        offline:
            "ऑफलाइन",

        profileSummary:
            "आपकी पंजीकृत जानकारी",

        editProfile:
            "प्रोफाइल संपादित करें",

        quickActions:
            "त्वरित कार्य",

        quickActionsSubtitle:
            "महत्वपूर्ण कृषि उपकरणों तक जल्दी पहुंचें।",

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
            "विश्लेषण दिखाने से पहले सत्यापित फसल स्वास्थ्य AI सेवा कनेक्ट करें।",

        learnMore:
            "और जानें",

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
            "वॉयस सहायता को सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाओं को सक्षम या अक्षम करें।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


    mr: {

        appName: "स्मार्टएग्री",

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
            "तुमची शेतीची माहिती एकाच ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        online:
            "ऑनलाइन",

        offline:
            "ऑफलाइन",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाच्या शेती साधनांपर्यंत त्वरीत पोहोचा.",

        liveDataTitle:
            "लाइव्ह डेटा",

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
            "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

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
            "आवाज सहाय्य सक्षम किंवा अक्षम करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप्लिकेशन सूचना सक्षम किंवा अक्षम करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri हे शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य उपलब्ध करून देण्यासाठी तयार केले आहे."

    }

};


/* =========================================================
   DOM HELPERS
========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const screen = getElement(id);

    if (screen) {
        screen.classList.add("active-screen");
    }
}


function showDashboard() {

    const dashboard = getElement("dashboardPage");

    if (dashboard) {
        dashboard.style.display = "block";
    }

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    showSection("dashboardSection");

}


function hideDashboard() {

    const dashboard = getElement("dashboardPage");

    if (dashboard) {
        dashboard.style.display = "none";
    }

}


function showMessage(elementId, message, type = "") {

    const element = getElement(elementId);

    if (!element) return;

    element.textContent = message;

    element.className = "message";

    if (type) {
        element.classList.add(type);
    }
}


function clearMessage(elementId) {

    const element = getElement(elementId);

    if (element) {
        element.textContent = "";
        element.className = "message";
    }

}


/* =========================================================
   LANGUAGE
========================================================= */

function applyTranslations(language) {

    const dictionary = translations[language];

    if (!dictionary) return;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }

    });


    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (dictionary[key] !== undefined) {
            element.placeholder = dictionary[key];
        }

    });

}


function setLanguage(language) {

    if (!translations[language]) return;

    currentLanguage = language;

    localStorage.setItem(
        "smartagriLanguage",
        language
    );

    applyTranslations(language);

    const selectors = [
        "dashboardLanguage",
        "settingsLanguage",
        "profileLanguage",
        "registerLanguage"
    ];

    selectors.forEach(id => {

        const element = getElement(id);

        if (element) {
            element.value = language;
        }

    });

}


function initializeLanguagePage() {

    const buttons =
        document.querySelectorAll(".language-option");

    const continueButton =
        getElement("continueLanguageBtn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedLanguage =
                button.dataset.language;

            if (continueButton) {
                continueButton.disabled = false;
            }

        });

    });


    if (continueButton) {

        continueButton.addEventListener("click", () => {

            if (!selectedLanguage) return;

            setLanguage(selectedLanguage);

            showScreen("loginPage");

        });

    }


    const changeLanguageButton =
        getElement("changeLanguageFromLogin");

    if (changeLanguageButton) {

        changeLanguageButton.addEventListener("click", () => {

            showScreen("languagePage");

        });

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".app-section").forEach(section => {
        section.classList.remove("active-section");
    });

    const target = getElement(sectionId);

    if (target) {
        target.classList.add("active-section");
    }

    closeSideMenu();
    closeProfileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function initializeNavigation() {

    document.querySelectorAll("[data-section]").forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.getAttribute("data-section");

            if (section) {
                showSection(section);
            }

        });

    });


    document.querySelectorAll("[data-profile-section]").forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.getAttribute("data-profile-section");

            if (section) {
                showSection(section);
            }

        });

    });

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

    const menu = getElement("sideMenu");
    const overlay = getElement("menuOverlay");

    if (menu) {
        menu.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

}


function closeSideMenu() {

    const menu = getElement("sideMenu");
    const overlay = getElement("menuOverlay");

    if (menu) {
        menu.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}


function initializeSideMenu() {

    const hamburger =
        getElement("hamburgerBtn");

    const close =
        getElement("closeMenuBtn");

    const overlay =
        getElement("menuOverlay");

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

function openProfileMenu() {

    const menu = getElement("profileMenu");

    if (menu) {
        menu.classList.add("open");
    }

}


function closeProfileMenu() {

    const menu = getElement("profileMenu");

    if (menu) {
        menu.classList.remove("open");
    }

}


function initializeProfileMenu() {

    const button =
        getElement("profileButton");

    if (button) {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const menu =
                getElement("profileMenu");

            if (!menu) return;

            menu.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        const menu =
            getElement("profileMenu");

        const button =
            getElement("profileButton");

        if (
            menu &&
            !menu.contains(event.target) &&
            button &&
            !button.contains(event.target)
        ) {

            closeProfileMenu();

        }

    });

}


/* =========================================================
   FIREBASE AUTH
========================================================= */

function initializeAuth() {

    if (!firebaseInitialized || !auth) {
        console.warn("Firebase Authentication unavailable.");
        return;
    }


    auth.onAuthStateChanged(async user => {

        currentUser = user;

        if (user) {

            console.log(
                "Authenticated user:",
                user.uid
            );

            hideDashboard();
            showDashboard();

            await loadFarmerData(user.uid);

            updateConnectionStatus();

        } else {

            currentUser = null;
            farmerData = null;

            hideDashboard();

            if (!currentLanguage) {
                showScreen("languagePage");
            } else {
                setLanguage(currentLanguage);
                showScreen("loginPage");
            }

        }

    });

}


/* =========================================================
   REGISTRATION
========================================================= */

async function registerFarmer(event) {

    event.preventDefault();

    clearMessage("registerMessage");

    if (!firebaseInitialized || !auth || !db) {

        showMessage(
            "registerMessage",
            "Firebase is not configured.",
            "error"
        );

        return;
    }


    const name =
        getElement("registerName").value.trim();

    const email =
        getElement("registerEmail").value.trim();

    const mobile =
        getElement("registerMobile").value.trim();

    const village =
        getElement("registerVillage").value.trim();

    const state =
        getElement("registerState").value.trim();

    const landArea =
        getElement("registerLandArea").value.trim();

    const market =
        getElement("registerMarket").value;

    const language =
        getElement("registerLanguage").value;

    const password =
        getElement("registerPassword").value;


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

        showMessage(
            "registerMessage",
            "Please fill all required fields.",
            "error"
        );

        return;
    }


    try {

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
                    firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        setLanguage(language);

        showMessage(
            "registerMessage",
            "Account created successfully.",
            "success"
        );


        document.getElementById("registrationForm").reset();


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showMessage(
            "registerMessage",
            getFirebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function loginFarmer(event) {

    event.preventDefault();

    clearMessage("loginMessage");

    if (!firebaseInitialized || !auth) {

        showMessage(
            "loginMessage",
            "Firebase Authentication is not configured.",
            "error"
        );

        return;
    }


    const email =
        getElement("loginEmail").value.trim();

    const password =
        getElement("loginPassword").value;


    if (!email || !password) {

        showMessage(
            "loginMessage",
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    try {

        const persistence =
            getElement("rememberMe")?.checked
                ? firebase.auth.Auth.Persistence.LOCAL
                : firebase.auth.Auth.Persistence.SESSION;


        await auth.setPersistence(persistence);


        await auth.signInWithEmailAndPassword(
            email,
            password
        );


        showMessage(
            "loginMessage",
            "Login successful.",
            "success"
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showMessage(
            "loginMessage",
            getFirebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    if (!firebaseInitialized || !auth) {

        showMessage(
            "loginMessage",
            "Firebase Authentication is not configured.",
            "error"
        );

        return;
    }


    const email =
        getElement("loginEmail").value.trim();


    if (!email) {

        showMessage(
            "loginMessage",
            "Enter your email address first.",
            "error"
        );

        return;
    }


    try {

        await auth.sendPasswordResetEmail(email);

        showMessage(
            "loginMessage",
            "Password reset email sent.",
            "success"
        );

    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        showMessage(
            "loginMessage",
            getFirebaseErrorMessage(error),
            "error"
        );

    }

}


/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(error) {

    if (!error) {
        return "An unknown error occurred.";
    }


    switch (error.code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/user-not-found":
            return "No account was found with this email.";

        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your connection.";

        default:
            return error.message || "Something went wrong.";

    }

}


/* =========================================================
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData(uid) {

    if (!firebaseInitialized || !db || !uid) {
        return;
    }


    try {

        const document =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (!document.exists) {

            console.warn(
                "No farmer document found for UID:",
                uid
            );

            farmerData = null;

            clearFarmerUI();

            return;
        }


        farmerData = {
            id: document.id,
            ...document.data()
        };


        console.log(
            "Farmer data loaded:",
            farmerData
        );


        updateFarmerUI();

    } catch (error) {

        console.error(
            "Failed to load farmer data:",
            error
        );

        clearFarmerUI();

    }

}


/* =========================================================
   UPDATE FARMER UI
========================================================= */

function updateFarmerUI() {

    if (!farmerData) {

        clearFarmerUI();

        return;
    }


    const name =
        farmerData.name || "—";

    const email =
        farmerData.email || "—";

    const mobile =
        farmerData.mobile || "—";

    const village =
        farmerData.village || "—";

    const state =
        farmerData.state || "—";

    const landArea =
        farmerData.landArea || "—";

    const market =
        farmerData.preferredMarket || "—";

    const language =
        farmerData.preferredLanguage || currentLanguage || "en";


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


    setText(
        "profilePageName",
        name
    );

    setText(
        "profilePageEmail",
        email
    );


    setInputValue(
        "profileName",
        name
    );

    setInputValue(
        "profileEmail",
        email
    );

    setInputValue(
        "profileMobile",
        mobile
    );

    setInputValue(
        "profileVillage",
        village
    );

    setInputValue(
        "profileState",
        state
    );

    setInputValue(
        "profileLandArea",
        landArea
    );


    const profileMarket =
        getElement("profileMarket");

    if (profileMarket) {
        profileMarket.value =
            farmerData.preferredMarket || "";
    }


    const profileLanguage =
        getElement("profileLanguage");

    if (profileLanguage) {
        profileLanguage.value =
            language;
    }


    setLanguage(language);

}


/* =========================================================
   CLEAR FARMER UI
========================================================= */

function clearFarmerUI() {

    const ids = [

        "headerFarmerName",
        "dashboardFarmerName",
        "summaryName",
        "summaryVillage",
        "summaryLand",
        "summaryMarket",
        "profilePageName",
        "profilePageEmail"

    ];


    ids.forEach(id => {

        const element =
            getElement(id);

        if (element) {

            if (
                id === "headerFarmerName" ||
                id === "dashboardFarmerName" ||
                id === "profilePageName"
            ) {

                element.textContent = "Farmer";

            } else {

                element.textContent = "—";

            }

        }

    });


    [
        "profileName",
        "profileEmail",
        "profileMobile",
        "profileVillage",
        "profileState",
        "profileLandArea"
    ].forEach(id => {

        setInputValue(id, "");

    });


    const market =
        getElement("profileMarket");

    if (market) {
        market.value = "";
    }


    const language =
        getElement("profileLanguage");

    if (language) {
        language.value = currentLanguage || "en";
    }

}


/* =========================================================
   PROFILE EDIT
========================================================= */

function enableProfileEditing() {

    editingProfile = true;

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
            getElement(id);

        if (element) {
            element.disabled = false;
        }

    });


    const actions =
        getElement("profileEditActions");

    if (actions) {
        actions.classList.remove("hidden");
    }

}


function disableProfileEditing() {

    editingProfile = false;

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
            getElement(id);

        if (element) {
            element.disabled = true;
        }

    });


    const actions =
        getElement("profileEditActions");

    if (actions) {
        actions.classList.add("hidden");
    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();

    clearMessage("profileMessage");


    if (
        !firebaseInitialized ||
        !db ||
        !currentUser
    ) {

        showMessage(
            "profileMessage",
            "Firebase is not connected.",
            "error"
        );

        return;
    }


    const updatedData = {

        name:
            getElement("profileName").value.trim(),

        mobile:
            getElement("profileMobile").value.trim(),

        village:
            getElement("profileVillage").value.trim(),

        state:
            getElement("profileState").value.trim(),

        landArea:
            getElement("profileLandArea").value.trim(),

        preferredMarket:
            getElement("profileMarket").value,

        preferredLanguage:
            getElement("profileLanguage").value,

        updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()

    };


    if (
        !updatedData.name ||
        !updatedData.mobile ||
        !updatedData.village ||
        !updatedData.state ||
        !updatedData.landArea ||
        !updatedData.preferredMarket
    ) {

        showMessage(
            "profileMessage",
            "Please fill all required fields.",
            "error"
        );

        return;
    }


    try {

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update(updatedData);


        farmerData = {
            ...farmerData,
            ...updatedData
        };


        updateFarmerUI();

        disableProfileEditing();


        showMessage(
            "profileMessage",
            "Profile updated successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );

        showMessage(
            "profileMessage",
            "Unable to save profile changes.",
            "error"
        );

    }

}


/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

function cancelProfileEdit() {

    updateFarmerUI();

    disableProfileEditing();

    clearMessage("profileMessage");

}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function setText(id, value) {

    const element =
        getElement(id);

    if (element) {
        element.textContent = value;
    }

}


function setInputValue(id, value) {

    const element =
        getElement(id);

    if (element) {
        element.value = value;
    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    if (!firebaseInitialized || !auth) {

        hideDashboard();

        showScreen("loginPage");

        return;
    }


    try {

        await auth.signOut();

        farmerData = null;

        currentUser = null;

        hideDashboard();

        showScreen("loginPage");

    } catch (error) {

        console.error(
            "Logout failed:",
            error
        );

    }

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const status =
        getElement("connectionStatus");

    const text =
        getElement("connectionText");

    const dashboardText =
        getElement("dashboardConnectionText");


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


    const translatedText =
        online
            ? translations[currentLanguage || "en"].online
            : translations[currentLanguage || "en"].offline;


    if (text) {
        text.textContent = translatedText;
    }


    if (dashboardText) {
        dashboardText.textContent = translatedText;
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
   WEATHER
   NO FALLBACK DATA
========================================================= */

function clearWeatherData() {

    const weatherData =
        getElement("weatherData");

    const emptyState =
        getElement("weatherEmptyState");


    if (weatherData) {
        weatherData.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.remove("hidden");
    }


    setText(
        "weatherTemperature",
        "—"
    );

    setText(
        "weatherHumidity",
        "—"
    );

    setText(
        "weatherWind",
        "—"
    );

    setText(
        "weatherRain",
        "—"
    );

}


/*
    This function intentionally does NOT create
    weather values.

    Connect your verified weather backend here.

    Expected response:

    {
        temperature: "...",
        humidity: "...",
        windSpeed: "...",
        rainChance: "..."
    }
*/

async function loadWeatherData() {

    clearWeatherData();

    console.log(
        "Weather data request requires connected backend."
    );

}


/* =========================================================
   MARKET DATA
   NO FALLBACK DATA
========================================================= */

function clearMarketTable() {

    const tbody =
        getElement("marketTableBody");

    if (!tbody) return;


    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${getTranslation(
                            "marketDataUnavailable"
                        )}
                    </strong>

                    <p>
                        ${getTranslation(
                            "marketDataUnavailableDescription"
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;

}


/*
    This function intentionally does NOT
    insert sample/fake market prices.

    Connect your backend/API here.

    Expected market records:

    [
        {
            market: "Kopargaon APMC",
            crop: "Onion",
            price: "...",
            date: "..."
        }
    ]
*/

async function loadMarketData() {

    clearMarketTable();

    console.log(
        "Market data request requires connected verified backend."
    );

}


/* =========================================================
   CROP PRICE SELECTOR
========================================================= */

function initializeCropSelector() {

    const selector =
        getElement("cropPriceSelector");

    if (!selector) return;


    selector.addEventListener(
        "change",
        () => {

            loadMarketData();

        }
    );

}


/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

function initializeSchemeButtons() {

    document
        .querySelectorAll(".scheme-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

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
   CROP IMAGE PREVIEW
========================================================= */

function initializeCropHealth() {

    const input =
        getElement("cropImageInput");

    const previewContainer =
        getElement("imagePreviewContainer");

    const preview =
        getElement("cropImagePreview");

    const analyzeButton =
        getElement("analyzeCropBtn");


    if (!input) return;


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files?.[0];


            if (!file) {

                if (previewContainer) {
                    previewContainer.classList.add("hidden");
                }

                if (analyzeButton) {
                    analyzeButton.disabled = true;
                }

                return;
            }


            if (!file.type.startsWith("image/")) {

                if (analyzeButton) {
                    analyzeButton.disabled = true;
                }

                return;
            }


            const reader =
                new FileReader();


            reader.onload = event => {

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
                    analyzeButton.disabled = false;
                }

            };


            reader.readAsDataURL(file);

        }
    );


    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            analyzeCrop
        );

    }

}


/*
    No fake AI result is generated.
*/

async function analyzeCrop() {

    const result =
        getElement("cropAnalysisResult");


    if (!result) return;


    result.innerHTML = `

        <strong>
            AI crop analysis is not connected
        </strong>

        <p>
            Connect a verified crop-health AI service
            before displaying analysis.
        </p>

    `;

    console.log(
        "Crop analysis requires connected AI backend."
    );

}


/* =========================================================
   AI ASSISTANT
   NO FAKE RESPONSES
========================================================= */

function initializeAI() {

    const form =
        getElement("aiForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const input =
                getElement("aiInput");

            const message =
                input?.value.trim();


            if (!message) return;


            addChatMessage(
                message,
                "user"
            );


            input.value = "";


            addChatMessage(
                "AI service is not connected yet.",
                "assistant"
            );

        }
    );

}


function addChatMessage(
    message,
    type
) {

    const container =
        getElement("chatMessages");


    if (!container) return;


    const wrapper =
        document.createElement("div");


    wrapper.className =
        `chat-message ${type}-message`;


    const avatar =
        document.createElement("div");


    avatar.className =
        "chat-avatar";


    avatar.textContent =
        type === "user"
            ? "👨‍🌾"
            : "🤖";


    const content =
        document.createElement("div");


    const name =
        document.createElement("strong");


    name.textContent =
        type === "user"
            ? "Farmer"
            : "Assistant";


    const paragraph =
        document.createElement("p");


    paragraph.textContent =
        message;


    content.appendChild(name);

    content.appendChild(paragraph);

    wrapper.appendChild(avatar);

    wrapper.appendChild(content);

    container.appendChild(wrapper);


    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

let recognition = null;


function initializeVoice() {

    const startButton =
        getElement("startVoiceBtn");

    const stopButton =
        getElement("stopVoiceBtn");

    const voiceInput =
        getElement("voiceInput");

    const voiceResponse =
        getElement("voiceResponse");


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition is not supported by this browser.";

        }

        if (startButton) {
            startButton.disabled = true;
        }

        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang =
        getSpeechLanguage();


    recognition.onstart = () => {

        if (startButton) {
            startButton.classList.add("hidden");
        }

        if (stopButton) {
            stopButton.classList.remove("hidden");
        }

        if (voiceResponse) {
            voiceResponse.textContent =
                "Listening...";
        }

    };


    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;


        if (voiceInput) {
            voiceInput.value =
                transcript;
        }


        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice input received. AI response requires a connected backend.";

        }

    };


    recognition.onerror = event => {

        console.error(
            "Voice recognition error:",
            event.error
        );


        if (voiceResponse) {

            voiceResponse.textContent =
                "Voice recognition could not be completed.";

        }

    };


    recognition.onend = () => {

        if (startButton) {
            startButton.classList.remove("hidden");
        }

        if (stopButton) {
            stopButton.classList.add("hidden");
        }

    };


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                recognition.lang =
                    getSpeechLanguage();

                recognition.start();

            }
        );

    }


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            () => {

                recognition.stop();

            }
        );

    }

}


function getSpeechLanguage() {

    switch (currentLanguage) {

        case "hi":
            return "hi-IN";

        case "mr":
            return "mr-IN";

        default:
            return "en-IN";

    }

}


/* =========================================================
   SETTINGS
========================================================= */

function initializeSettings() {

    const language =
        getElement("settingsLanguage");


    if (language) {

        language.addEventListener(
            "change",
            () => {

                setLanguage(
                    language.value
                );

                if (
                    currentUser &&
                    db
                ) {

                    db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update({

                            preferredLanguage:
                                language.value,

                            updatedAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        })
                        .catch(error => {

                            console.error(
                                "Language update failed:",
                                error
                            );

                        });

                }

            }
        );

    }


    const dashboardLanguage =
        getElement("dashboardLanguage");


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            () => {

                setLanguage(
                    dashboardLanguage.value
                );

            }
        );

    }

}


/* =========================================================
   LOGIN / REGISTER NAVIGATION
========================================================= */

function initializeAuthNavigation() {

    const registerButton =
        getElement("showRegisterBtn");

    const loginButton =
        getElement("showLoginBtn");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            () => {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            () => {

                showScreen(
                    "loginPage"
                );

            }
        );

    }

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function initializeEventListeners() {


    const loginForm =
        getElement("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginFarmer
        );

    }


    const registrationForm =
        getElement("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            registerFarmer
        );

    }


    const forgotButton =
        getElement("forgotPasswordBtn");

    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            forgotPassword
        );

    }


    const logoutButton =
        getElement("sideLogoutBtn");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }


    const profileLogout =
        getElement("profileLogoutBtn");

    if (profileLogout) {

        profileLogout.addEventListener(
            "click",
            logout
        );

    }


    const editProfile =
        getElement("editProfileBtn");

    if (editProfile) {

        editProfile.addEventListener(
            "click",
            enableProfileEditing
        );

    }


    const cancelProfile =
        getElement("cancelProfileEditBtn");

    if (cancelProfile) {

        cancelProfile.addEventListener(
            "click",
            cancelProfileEdit
        );

    }


    const profileForm =
        getElement("profileForm");

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );

    }


    const refreshWeather =
        getElement("refreshWeatherBtn");

    if (refreshWeather) {

        refreshWeather.addEventListener(
            "click",
            loadWeatherData
        );

    }

}


/* =========================================================
   TRANSLATION HELPER
========================================================= */

function getTranslation(key) {

    const language =
        currentLanguage || "en";

    return (
        translations[language]?.[key] ||
        translations.en[key] ||
        key
    );

}


/* =========================================================
   DEMO BUTTON
   IMPORTANT:
   NO FAKE DASHBOARD DATA
========================================================= */

function initializeDemoButton() {

    const button =
        getElement("demoBtn");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            /*
                Demo mode is intentionally disabled
                because no fake/fallback values are allowed.
            */

            showMessage(
                "loginMessage",
                "Demo mode is disabled because SmartAgri displays only verified connected data.",
                "error"
            );

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application loaded."
        );


        /*
            Language
        */

        if (currentLanguage) {
            setLanguage(currentLanguage);
        }


        /*
            Initial page
        */

        if (!currentLanguage) {

            showScreen(
                "languagePage"
            );

        } else {

            showScreen(
                "loginPage"
            );

        }


        /*
            Initialize modules
        */

        initializeLanguagePage();

        initializeNavigation();

        initializeSideMenu();

        initializeProfileMenu();

        initializeAuthNavigation();

        initializeEventListeners();

        initializeCropSelector();

        initializeSchemeButtons();

        initializeCropHealth();

        initializeAI();

        initializeVoice();

        initializeSettings();

        initializeDemoButton();

        initializeAuth();

        updateConnectionStatus();

        clearWeatherData();

        clearMarketTable();

    }
);
