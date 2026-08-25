/* =========================================================
   SMARTAGRI
   COMPLETE SCRIPT.JS
   Works with the provided SmartAgri HTML
========================================================= */


/* =========================================================
   1. FIREBASE CONFIGURATION
========================================================= */

// IMPORTANT:
// Replace these values with your Firebase Web App configuration.

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


// Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();


/* =========================================================
   2. GLOBAL VARIABLES
========================================================= */

let selectedLanguage = localStorage.getItem("smartAgriLanguage") || null;

let currentUser = null;
let currentUserData = null;

let recognition = null;
let isListening = false;

let profileBackup = null;


/* =========================================================
   3. TRANSLATIONS
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

        onion:
            "Onion",

        wheat:
            "Wheat",

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

        marketIntelligence:
            "Market Intelligence",

        multilingualSupport:
            "Multilingual Support",

        aboutDescription:
            "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."

    },


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
            "सत्यापित स्रोतों से वर्तमान फसल कीमतें।",

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

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

        comparisonSubtitle:
            "बेचने से पहले जुड़े हुए बाजारों की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन संबंधी जानकारी।",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

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
            "विश्लेषण प्रदर्शित करने से पहले सत्यापित AI सेवा कनेक्ट करें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि कार्यक्रम।",

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
            "AI उत्तरों के लिए AI सेवा/बैकएंड आवश्यक है।",

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

        voiceInputPlaceholder:
            "वॉइस इनपुट यहां दिखाई देगा...",

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
            "वॉइस सहायता को सक्षम या अक्षम करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "एप्लिकेशन सूचनाओं को सक्षम या अक्षम करें।",

        marketIntelligence:
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },


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
            "जमीन क्षेत्र",

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
            "पिकांची माहिती",

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

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

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
            "महत्त्वाच्या शेती साधनांचा जलद वापर करा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा प्रदर्शित केला जातो.",

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
            "सत्यापित स्रोतांमधून सध्याचे पीक बाजारभाव.",

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

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "कोणताही सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

        comparisonSubtitle:
            "विक्रीपूर्वी उपलब्ध बाजारपेठांची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onion:
            "कांदा",

        wheat:
            "गहू",

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
            "विश्लेषण दाखवण्यापूर्वी सत्यापित AI सेवा कनेक्ट करा.",

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
            "AI सेवा अजून कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड आवश्यक आहे.",

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
            "व्हॉइस प्रतिसाद",

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
            "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे."

    }

};


/* =========================================================
   4. DOM HELPER
========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   5. PAGE / SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const screen = $(screenId);

    if (screen) {
        screen.classList.add("active-screen");
    }
}


function showDashboard() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active-screen");
    });

    $("dashboardPage").style.display = "block";

    showSection("dashboardSection");
}


function hideDashboard() {

    $("dashboardPage").style.display = "none";
}


/* =========================================================
   6. SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".app-section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = $(sectionId);

    if (section) {
        section.classList.add("active-section");
    }

    closeSideMenu();
    closeProfileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   7. SIDE MENU
========================================================= */

function openSideMenu() {

    $("sideMenu").classList.add("open");
    $("menuOverlay").classList.add("active");
}


function closeSideMenu() {

    if ($("sideMenu")) {
        $("sideMenu").classList.remove("open");
    }

    if ($("menuOverlay")) {
        $("menuOverlay").classList.remove("active");
    }
}


/* =========================================================
   8. PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    $("profileMenu").classList.toggle("open");
}


function closeProfileMenu() {

    if ($("profileMenu")) {
        $("profileMenu").classList.remove("open");
    }
}


/* =========================================================
   9. LANGUAGE SYSTEM
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

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (
            translations[language] &&
            translations[language][key]
        ) {
            element.textContent =
                translations[language][key];
        }
    });


    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (
            translations[language] &&
            translations[language][key]
        ) {
            element.placeholder =
                translations[language][key];
        }
    });


    // Update language selectors

    if ($("dashboardLanguage")) {
        $("dashboardLanguage").value = language;
    }

    if ($("settingsLanguage")) {
        $("settingsLanguage").value = language;
    }

    if ($("registerLanguage")) {
        $("registerLanguage").value = language;
    }

    if ($("profileLanguage")) {
        $("profileLanguage").value = language;
    }


    updateDynamicTexts();
}


function updateDynamicTexts() {

    const name =
        currentUserData?.name ||
        "Farmer";

    if ($("headerFarmerName")) {
        $("headerFarmerName").textContent = name;
    }

    if ($("dashboardFarmerName")) {
        $("dashboardFarmerName").textContent = name;
    }

    if ($("profilePageName")) {
        $("profilePageName").textContent = name;
    }
}


/* =========================================================
   10. LANGUAGE PAGE
========================================================= */

function setupLanguagePage() {

    const languageButtons =
        document.querySelectorAll(".language-option");

    const continueButton =
        $("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedLanguage =
                button.dataset.language;

            continueButton.disabled = false;

            translatePage(selectedLanguage);
        });

    });


    continueButton.addEventListener("click", () => {

        if (!selectedLanguage) {
            return;
        }

        localStorage.setItem(
            "smartAgriLanguage",
            selectedLanguage
        );

        hideDashboard();
        showScreen("loginPage");
    });
}


/* =========================================================
   11. LOGIN / REGISTER NAVIGATION
========================================================= */

function setupAuthNavigation() {

    $("showRegisterBtn").addEventListener("click", () => {

        clearMessage("loginMessage");

        showScreen("registerPage");
    });


    $("showLoginBtn").addEventListener("click", () => {

        clearMessage("registerMessage");

        showScreen("loginPage");
    });


    $("changeLanguageFromLogin").addEventListener("click", () => {

        showScreen("languagePage");

        updateLanguageSelectionUI();
    });
}


function updateLanguageSelectionUI() {

    document.querySelectorAll(".language-option").forEach(button => {

        button.classList.toggle(
            "selected",
            button.dataset.language === selectedLanguage
        );
    });

    if ($("continueLanguageBtn")) {

        $("continueLanguageBtn").disabled =
            !selectedLanguage;
    }
}


/* =========================================================
   12. LOGIN
========================================================= */

async function loginUser(event) {

    event.preventDefault();

    const email =
        $("loginEmail").value.trim();

    const password =
        $("loginPassword").value;

    const rememberMe =
        $("rememberMe").checked;


    if (!email || !password) {
        showMessage(
            "loginMessage",
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    try {

        if (rememberMe) {

            await auth.setPersistence(
                firebase.auth.Auth.Persistence.LOCAL
            );

        } else {

            await auth.setPersistence(
                firebase.auth.Auth.Persistence.SESSION
            );
        }


        showMessage(
            "loginMessage",
            "Logging in...",
            "info"
        );


        await auth.signInWithEmailAndPassword(
            email,
            password
        );

    } catch (error) {

        console.error("Login error:", error);

        let message =
            "Unable to login. Please check your credentials.";

        if (error.code === "auth/user-not-found") {
            message = "No account found with this email.";
        }

        if (error.code === "auth/wrong-password") {
            message = "Incorrect password.";
        }

        if (error.code === "auth/invalid-credential") {
            message = "Invalid email or password.";
        }

        if (error.code === "auth/invalid-email") {
            message = "Please enter a valid email address.";
        }

        showMessage(
            "loginMessage",
            message,
            "error"
        );
    }
}


/* =========================================================
   13. REGISTRATION
========================================================= */

async function registerUser(event) {

    event.preventDefault();


    const name =
        $("registerName").value.trim();

    const email =
        $("registerEmail").value.trim();

    const mobile =
        $("registerMobile").value.trim();

    const village =
        $("registerVillage").value.trim();

    const state =
        $("registerState").value.trim();

    const landArea =
        $("registerLandArea").value.trim();

    const market =
        $("registerMarket").value;

    const language =
        $("registerLanguage").value;

    const password =
        $("registerPassword").value;


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


    if (password.length < 6) {

        showMessage(
            "registerMessage",
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    try {

        showMessage(
            "registerMessage",
            "Creating your account...",
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
                    firebase.firestore.FieldValue.serverTimestamp(),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });


        localStorage.setItem(
            "smartAgriLanguage",
            language
        );

        selectedLanguage = language;

        translatePage(language);


        showMessage(
            "registerMessage",
            "Account created successfully!",
            "success"
        );


        setTimeout(() => {

            showDashboard();

        }, 1000);


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        let message =
            "Unable to create account.";

        if (error.code === "auth/email-already-in-use") {
            message =
                "An account already exists with this email.";
        }

        if (error.code === "auth/invalid-email") {
            message =
                "Please enter a valid email address.";
        }

        if (error.code === "auth/weak-password") {
            message =
                "Password is too weak.";
        }


        showMessage(
            "registerMessage",
            message,
            "error"
        );
    }
}


/* =========================================================
   14. FORGOT PASSWORD
========================================================= */

async function forgotPassword() {

    const email =
        $("loginEmail").value.trim();


    if (!email) {

        showMessage(
            "loginMessage",
            "Enter your email address first.",
            "error"
        );

        $("loginEmail").focus();

        return;
    }


    try {

        await auth.sendPasswordResetEmail(email);

        showMessage(
            "loginMessage",
            "Password reset email sent. Check your inbox.",
            "success"
        );

    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        showMessage(
            "loginMessage",
            "Unable to send password reset email.",
            "error"
        );
    }
}


/* =========================================================
   15. DEMO DASHBOARD
========================================================= */

function enterDemoDashboard() {

    currentUser = null;

    currentUserData = {

        name: "Demo Farmer",

        email: "demo@smartagri.local",

        mobile: "Not available",

        village: "Kopargaon",

        state: "Maharashtra",

        landArea: "Not available",

        preferredMarket: "Kopargaon APMC",

        preferredLanguage:
            selectedLanguage || "en"

    };


    translatePage(
        currentUserData.preferredLanguage
    );

    updateProfileUI();

    showDashboard();

    setConnectionStatus(false);
}


/* =========================================================
   16. FIREBASE AUTH STATE
========================================================= */

auth.onAuthStateChanged(async user => {

    if (user) {

        currentUser = user;

        await loadUserProfile();

        showDashboard();

        setConnectionStatus(
            navigator.onLine
        );

    } else {

        currentUser = null;

        if (
            $("dashboardPage").style.display !== "none"
        ) {

            hideDashboard();

            if (
                localStorage.getItem(
                    "smartAgriLanguage"
                )
            ) {

                showScreen("loginPage");

            } else {

                showScreen("languagePage");
            }
        }
    }
});


/* =========================================================
   17. LOAD USER PROFILE
========================================================= */

async function loadUserProfile() {

    if (!currentUser) {
        return;
    }


    try {

        const documentSnapshot =
            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .get();


        if (documentSnapshot.exists) {

            currentUserData =
                documentSnapshot.data();

        } else {

            currentUserData = {

                uid: currentUser.uid,

                name: "Farmer",

                email:
                    currentUser.email || "",

                mobile: "",

                village: "",

                state: "Maharashtra",

                landArea: "",

                preferredMarket: "",

                preferredLanguage:
                    selectedLanguage || "en"

            };
        }


        if (
            currentUserData.preferredLanguage
        ) {

            selectedLanguage =
                currentUserData.preferredLanguage;

            localStorage.setItem(
                "smartAgriLanguage",
                selectedLanguage
            );

            translatePage(
                selectedLanguage
            );
        }


        updateProfileUI();


    } catch (error) {

        console.error(
            "Error loading farmer profile:",
            error
        );

        currentUserData = {

            name: "Farmer",

            email:
                currentUser.email || "",

            mobile: "",

            village: "",

            state: "",

            landArea: "",

            preferredMarket: "",

            preferredLanguage:
                selectedLanguage || "en"

        };

        updateProfileUI();
    }
}


/* =========================================================
   18. UPDATE PROFILE UI
========================================================= */

function updateProfileUI() {

    const data =
        currentUserData || {};


    const name =
        data.name || "Farmer";


    // Header

    if ($("headerFarmerName")) {
        $("headerFarmerName").textContent =
            name;
    }


    // Dashboard

    if ($("dashboardFarmerName")) {
        $("dashboardFarmerName").textContent =
            name;
    }


    // Summary

    if ($("summaryName")) {
        $("summaryName").textContent =
            data.name || "—";
    }

    if ($("summaryVillage")) {
        $("summaryVillage").textContent =
            data.village || "—";
    }

    if ($("summaryLand")) {
        $("summaryLand").textContent =
            data.landArea || "—";
    }

    if ($("summaryMarket")) {
        $("summaryMarket").textContent =
            data.preferredMarket || "—";
    }


    // Profile page

    if ($("profilePageName")) {
        $("profilePageName").textContent =
            name;
    }

    if ($("profilePageEmail")) {
        $("profilePageEmail").textContent =
            data.email ||
            currentUser?.email ||
            "—";
    }


    if ($("profileName")) {
        $("profileName").value =
            data.name || "";
    }

    if ($("profileEmail")) {
        $("profileEmail").value =
            data.email ||
            currentUser?.email ||
            "";
    }

    if ($("profileMobile")) {
        $("profileMobile").value =
            data.mobile || "";
    }

    if ($("profileVillage")) {
        $("profileVillage").value =
            data.village || "";
    }

    if ($("profileState")) {
        $("profileState").value =
            data.state || "";
    }

    if ($("profileLandArea")) {
        $("profileLandArea").value =
            data.landArea || "";
    }

    if ($("profileMarket")) {
        $("profileMarket").value =
            data.preferredMarket || "";
    }

    if ($("profileLanguage")) {
        $("profileLanguage").value =
            data.preferredLanguage ||
            selectedLanguage ||
            "en";
    }
}


/* =========================================================
   19. PROFILE EDIT
========================================================= */

function enableProfileEditing() {

    profileBackup = {

        name: $("profileName").value,

        email: $("profileEmail").value,

        mobile: $("profileMobile").value,

        village: $("profileVillage").value,

        state: $("profileState").value,

        landArea: $("profileLandArea").value,

        market: $("profileMarket").value,

        language: $("profileLanguage").value
    };


    $("profileName").disabled = false;

    $("profileMobile").disabled = false;

    $("profileVillage").disabled = false;

    $("profileState").disabled = false;

    $("profileLandArea").disabled = false;

    $("profileMarket").disabled = false;

    $("profileLanguage").disabled = false;


    $("editProfileBtn").classList.add("hidden");

    $("profileEditActions").classList.remove("hidden");
}


function cancelProfileEditing() {

    if (profileBackup) {

        $("profileName").value =
            profileBackup.name;

        $("profileEmail").value =
            profileBackup.email;

        $("profileMobile").value =
            profileBackup.mobile;

        $("profileVillage").value =
            profileBackup.village;

        $("profileState").value =
            profileBackup.state;

        $("profileLandArea").value =
            profileBackup.landArea;

        $("profileMarket").value =
            profileBackup.market;

        $("profileLanguage").value =
            profileBackup.language;
    }


    disableProfileEditing();
}


function disableProfileEditing() {

    $("profileName").disabled = true;

    $("profileEmail").disabled = true;

    $("profileMobile").disabled = true;

    $("profileVillage").disabled = true;

    $("profileState").disabled = true;

    $("profileLandArea").disabled = true;

    $("profileMarket").disabled = true;

    $("profileLanguage").disabled = true;


    $("editProfileBtn").classList.remove("hidden");

    $("profileEditActions").classList.add("hidden");
}


/* =========================================================
   20. SAVE PROFILE
========================================================= */

async function saveProfile(event) {

    event.preventDefault();


    if (!currentUser) {

        showMessage(
            "profileMessage",
            "Profile editing is unavailable in demo mode.",
            "info"
        );

        return;
    }


    const updatedData = {

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


    try {

        await db
            .collection("farmers")
            .doc(currentUser.uid)
            .update(updatedData);


        currentUserData = {

            ...currentUserData,

            ...updatedData
        };


        selectedLanguage =
            updatedData.preferredLanguage;

        localStorage.setItem(
            "smartAgriLanguage",
            selectedLanguage
        );


        translatePage(
            selectedLanguage
        );

        updateProfileUI();

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
            "Unable to update profile.",
            "error"
        );
    }
}


/* =========================================================
   21. LOGOUT
========================================================= */

async function logoutUser() {

    try {

        await auth.signOut();

        currentUser = null;
        currentUserData = null;

        hideDashboard();

        showScreen("loginPage");

        clearMessage("loginMessage");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
}


/* =========================================================
   22. CONNECTION STATUS
========================================================= */

function setConnectionStatus(isOnline) {

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
        translations[
            selectedLanguage || "en"
        ]?.[isOnline ? "online" : "offline"] ||
        (isOnline ? "Online" : "Offline");


    if (connectionText) {
        connectionText.textContent = text;
    }

    if (dashboardText) {
        dashboardText.textContent = text;
    }
}


window.addEventListener(
    "online",
    () => setConnectionStatus(true)
);


window.addEventListener(
    "offline",
    () => setConnectionStatus(false)
);


/* =========================================================
   23. WEATHER
========================================================= */

function refreshWeather() {

    // IMPORTANT:
    // No fake weather values are generated.
    // This section remains unavailable until a
    // verified weather API/backend is connected.

    $("weatherEmptyState").classList.remove("hidden");

    $("weatherData").classList.add("hidden");

    console.log(
        "Weather refresh requested. No verified weather source connected."
    );
}


/* =========================================================
   24. MARKET DATA
========================================================= */

function updateMarketTable() {

    const crop =
        $("cropPriceSelector").value;

    const tbody =
        $("marketTableBody");


    // No fake market prices.

    tbody.innerHTML = `

        <tr>

            <td colspan="4">

                <div class="table-empty">

                    <span>📊</span>

                    <strong>
                        ${
                            translations[
                                selectedLanguage || "en"
                            ]?.marketDataUnavailable ||
                            "Market data unavailable"
                        }
                    </strong>

                    <p>
                        ${
                            translations[
                                selectedLanguage || "en"
                            ]?.marketDataUnavailableDescription ||
                            "No verified market data has been received."
                        }
                    </p>

                </div>

            </td>

        </tr>

    `;


    console.log(
        "Market selected:",
        crop
    );
}


/* =========================================================
   25. CROP IMAGE PREVIEW
========================================================= */

function setupCropImage() {

    const input =
        $("cropImageInput");

    const previewContainer =
        $("imagePreviewContainer");

    const preview =
        $("cropImagePreview");

    const analyzeButton =
        $("analyzeCropBtn");


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                previewContainer.classList.add(
                    "hidden"
                );

                analyzeButton.disabled = true;

                return;
            }


            if (!file.type.startsWith("image/")) {

                showMessage(
                    "cropAnalysisResult",
                    "Please select a valid image file.",
                    "error"
                );

                analyzeButton.disabled = true;

                return;
            }


            const reader =
                new FileReader();


            reader.onload = function(e) {

                preview.src =
                    e.target.result;

                previewContainer.classList.remove(
                    "hidden"
                );

                analyzeButton.disabled = false;
            };


            reader.readAsDataURL(file);
        }
    );
}


/* =========================================================
   26. CROP ANALYSIS
========================================================= */

function analyzeCrop() {

    const result =
        $("cropAnalysisResult");


    // No fake AI result.

    result.innerHTML = `

        <strong>
            ${
                translations[
                    selectedLanguage || "en"
                ]?.analysisNotConnected ||
                "AI crop analysis is not connected"
            }
        </strong>

        <p>
            ${
                translations[
                    selectedLanguage || "en"
                ]?.analysisNotConnectedDescription ||
                "Connect a verified crop-health AI service before displaying analysis."
            }
        </p>

    `;


    console.log(
        "Crop image selected. AI analysis backend is not connected."
    );
}


/* =========================================================
   27. GOVERNMENT SCHEMES
========================================================= */

function setupGovernmentSchemes() {

    document
        .querySelectorAll(".scheme-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const url =
                        button.dataset.schemeUrl;

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
   28. AI ASSISTANT
========================================================= */

function handleAIQuestion(event) {

    event.preventDefault();


    const input =
        $("aiInput");

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


    // Do NOT pretend that an AI backend exists.

    setTimeout(() => {

        const message =
            translations[
                selectedLanguage || "en"
            ]?.aiUnavailable ||
            "AI service is not connected yet.";


        addChatMessage(
            "assistant",
            message
        );

    }, 300);
}


function addChatMessage(
    type,
    text
) {

    const container =
        $("chatMessages");


    const message =
        document.createElement("div");

    message.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";


    if (type === "user") {

        message.innerHTML = `

            <div class="chat-avatar">
                👨‍🌾
            </div>

            <div>

                <strong>
                    ${
                        currentUserData?.name ||
                        "Farmer"
                    }
                </strong>

                <p></p>

            </div>
        `;

    } else {

        message.innerHTML = `

            <div class="chat-avatar">
                🤖
            </div>

            <div>

                <strong>
                    ${
                        translations[
                            selectedLanguage || "en"
                        ]?.assistant ||
                        "Assistant"
                    }
                </strong>

                <p></p>

            </div>
        `;
    }


    message.querySelector("p").textContent =
        text;


    container.appendChild(message);


    container.scrollTop =
        container.scrollHeight;
}


/* =========================================================
   29. VOICE ASSISTANCE
========================================================= */

function setupVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        $("startVoiceBtn").disabled = true;

        $("voiceResponse").textContent =
            "Voice recognition is not supported by this browser.";

        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang =
        getSpeechLanguage(
            selectedLanguage || "en"
        );


    recognition.onstart = () => {

        isListening = true;

        $("startVoiceBtn")
            .classList.add("hidden");

        $("stopVoiceBtn")
            .classList.remove("hidden");


        $("voiceResponse").textContent =
            getTranslation(
                "voiceListening",
                "Listening..."
            );
    };


    recognition.onresult = event => {

        let transcript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            transcript +=
                event.results[i][0].transcript;
        }


        $("voiceInput").value =
            transcript;
    };


    recognition.onerror = event => {

        console.error(
            "Voice recognition error:",
            event.error
        );

        $("voiceResponse").textContent =
            "Unable to use voice recognition.";
    };


    recognition.onend = () => {

        isListening = false;

        $("startVoiceBtn")
            .classList.remove("hidden");

        $("stopVoiceBtn")
            .classList.add("hidden");


        if (
            $("voiceInput").value.trim()
        ) {

            $("voiceResponse").textContent =
                getTranslation(
                    "voiceReady",
                    "Voice assistance is ready."
                );

            speakText(
                $("voiceInput").value.trim()
            );
        }
    };
}


function getSpeechLanguage(language) {

    const languages = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"
    };


    return (
        languages[language] ||
        "en-IN"
    );
}


function startVoiceRecognition() {

    if (!recognition) {
        setupVoiceRecognition();
    }


    if (!recognition || isListening) {
        return;
    }


    recognition.lang =
        getSpeechLanguage(
            selectedLanguage || "en"
        );


    try {

        recognition.start();

    } catch (error) {

        console.error(
            "Unable to start voice recognition:",
            error
        );
    }
}


function stopVoiceRecognition() {

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();
    }
}


function speakText(text) {

    if (
        !window.speechSynthesis ||
        !text
    ) {
        return;
    }


    const utterance =
        new SpeechSynthesisUtterance(text);


    utterance.lang =
        getSpeechLanguage(
            selectedLanguage || "en"
        );


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        utterance
    );
}


/* =========================================================
   30. SETTINGS
========================================================= */

function setupSettings() {

    $("settingsLanguage")
        .addEventListener(
            "change",
            event => {

                const language =
                    event.target.value;

                selectedLanguage =
                    language;

                localStorage.setItem(
                    "smartAgriLanguage",
                    language
                );

                translatePage(language);


                if (
                    currentUser &&
                    currentUserData
                ) {

                    db.collection("farmers")
                        .doc(currentUser.uid)
                        .update({

                            preferredLanguage:
                                language,

                            updatedAt:
                                firebase.firestore
                                    .FieldValue
                                    .serverTimestamp()
                        })
                        .catch(error => {

                            console.error(
                                "Language update error:",
                                error
                            );
                        });
                }


                if (recognition) {

                    recognition.lang =
                        getSpeechLanguage(language);
                }
            }
        );


    $("dashboardLanguage")
        .addEventListener(
            "change",
            event => {

                const language =
                    event.target.value;

                selectedLanguage =
                    language;

                localStorage.setItem(
                    "smartAgriLanguage",
                    language
                );

                translatePage(language);


                if (
                    currentUser &&
                    currentUserData
                ) {

                    db.collection("farmers")
                        .doc(currentUser.uid)
                        .update({

                            preferredLanguage:
                                language,

                            updatedAt:
                                firebase.firestore
                                    .FieldValue
                                    .serverTimestamp()
                        })
                        .catch(error => {

                            console.error(
                                error
                            );
                        });
                }
            }
        );


    $("voiceSetting")
        .addEventListener(
            "change",
            event => {

                localStorage.setItem(
                    "smartAgriVoiceEnabled",
                    event.target.checked
                );
            }
        );


    $("notificationSetting")
        .addEventListener(
            "change",
            event => {

                localStorage.setItem(
                    "smartAgriNotifications",
                    event.target.checked
                );
            }
        );


    loadSettings();
}


function loadSettings() {

    const voiceEnabled =
        localStorage.getItem(
            "smartAgriVoiceEnabled"
        );


    if (
        voiceEnabled !== null
    ) {

        $("voiceSetting").checked =
            voiceEnabled === "true";
    }


    const notifications =
        localStorage.getItem(
            "smartAgriNotifications"
        );


    if (
        notifications !== null
    ) {

        $("notificationSetting").checked =
            notifications === "true";
    }
}


/* =========================================================
   31. UTILITY FUNCTIONS
========================================================= */

function showMessage(
    elementId,
    message,
    type = "info"
) {

    const element =
        $(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        `message ${type}`;
}


function clearMessage(elementId) {

    const element =
        $(elementId);


    if (!element) {
        return;
    }


    element.textContent = "";

    element.className =
        "message";
}


function getTranslation(
    key,
    fallback
) {

    return (
        translations[
            selectedLanguage || "en"
        ]?.[key] ||
        fallback
    );
}


/* =========================================================
   32. NAVIGATION EVENT LISTENERS
========================================================= */

function setupNavigation() {

    // Side navigation

    document
        .querySelectorAll(
            ".side-navigation button[data-section]"
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


    // All buttons using data-section

    document
        .querySelectorAll(
            "[data-section]:not(.side-navigation button)"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;

                    if (section) {
                        showSection(section);
                    }
                }
            );
        });


    // Profile menu

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


    $("hamburgerBtn")
        .addEventListener(
            "click",
            openSideMenu
        );


    $("closeMenuBtn")
        .addEventListener(
            "click",
            closeSideMenu
        );


    $("menuOverlay")
        .addEventListener(
            "click",
            closeSideMenu
        );


    $("profileButton")
        .addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleProfileMenu();
            }
        );


    document.addEventListener(
        "click",
        event => {

            if (
                !$("profileMenu").contains(event.target) &&
                !$("profileButton").contains(event.target)
            ) {

                closeProfileMenu();
            }
        }
    );
}


/* =========================================================
   33. INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application loaded."
        );


        // Initially hide dashboard

        $("dashboardPage").style.display =
            "none";


        // Apply saved language

        if (selectedLanguage) {

            translatePage(
                selectedLanguage
            );

        } else {

            translatePage("en");
        }


        // Initialize language page

        setupLanguagePage();


        // Auth navigation

        setupAuthNavigation();


        // Login

        $("loginForm")
            .addEventListener(
                "submit",
                loginUser
            );


        // Registration

        $("registrationForm")
            .addEventListener(
                "submit",
                registerUser
            );


        // Forgot password

        $("forgotPasswordBtn")
            .addEventListener(
                "click",
                forgotPassword
            );


        // Demo

        $("demoBtn")
            .addEventListener(
                "click",
                enterDemoDashboard
            );


        // Navigation

        setupNavigation();


        // Logout

        $("sideLogoutBtn")
            .addEventListener(
                "click",
                logoutUser
            );


        $("profileLogoutBtn")
            .addEventListener(
                "click",
                logoutUser
            );


        // Weather

        $("refreshWeatherBtn")
            .addEventListener(
                "click",
                refreshWeather
            );


        // Market

        $("cropPriceSelector")
            .addEventListener(
                "change",
                updateMarketTable
            );


        // Crop health

        setupCropImage();


        $("analyzeCropBtn")
            .addEventListener(
                "click",
                analyzeCrop
            );


        // Government schemes

        setupGovernmentSchemes();


        // AI

        $("aiForm")
            .addEventListener(
                "submit",
                handleAIQuestion
            );


        // Voice

        $("startVoiceBtn")
            .addEventListener(
                "click",
                startVoiceRecognition
            );


        $("stopVoiceBtn")
            .addEventListener(
                "click",
                stopVoiceRecognition
            );


        // Profile

        $("editProfileBtn")
            .addEventListener(
                "click",
                enableProfileEditing
            );


        $("cancelProfileEditBtn")
            .addEventListener(
                "click",
                cancelProfileEditing
            );


        $("profileForm")
            .addEventListener(
                "submit",
                saveProfile
            );


        // Settings

        setupSettings();


        // Select default language

        if (selectedLanguage) {

            updateLanguageSelectionUI();

        } else {

            showScreen("languagePage");
        }


        // Initial connection status

        setConnectionStatus(
            navigator.onLine
        );
    }
);
