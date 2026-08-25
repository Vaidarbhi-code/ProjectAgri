"use strict";

/* =========================================================
   SMARTAGRI FRONTEND
   Matches the HTML supplied by the user
========================================================= */

const API_BASE = "";

/* =========================================================
   FIREBASE
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

let firebaseReady = false;
let auth = null;
let db = null;

try {

    if (
        typeof firebase !== "undefined"
    ) {

        firebase.initializeApp(
            firebaseConfig
        );

        auth =
            firebase.auth();

        db =
            firebase.firestore();

        firebaseReady = true;

    }

} catch (error) {

    console.warn(
        "Firebase initialization:",
        error
    );

}

/* =========================================================
   APPLICATION STATE
========================================================= */

let selectedLanguage =
    localStorage.getItem(
        "smartagri_language"
    ) || "en";

let currentFarmer =
    JSON.parse(
        localStorage.getItem(
            "smartagri_farmer"
        ) || "null"
    );

let recognition = null;

let isListening = false;

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

        continue: "Continue",

        loginTitle: "Farmer Login",

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

        register: "Register",

        changeLanguage:
            "Change Language",

        registrationTitle:
            "Farmer Registration",

        registrationSubtitle:
            "Create your SmartAgri farmer account",

        fullName: "Full Name",

        mobile: "Mobile Number",

        village: "Village",

        state: "State",

        landArea: "Land Area",

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

        dashboard: "Dashboard",

        weather: "Weather",

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

        settings: "Settings",

        about: "About SmartAgri",

        logout: "Logout",

        myProfile: "My Profile",

        welcome: "Welcome",

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

        offline: "Offline",

        online: "Online",

        weatherSubtitle:
            "Local weather conditions for farming decisions.",

        currentWeather:
            "Current Weather",

        refresh: "Refresh",

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

        market: "Market",

        crop: "Crop",

        price: "Price",

        date: "Date",

        onion: "Onion",

        wheat: "Wheat",

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

        appName: "स्मार्ट एग्री",

        appTagline:
            "स्मार्ट कृषि बाजार सूचना प्रणाली",

        chooseLanguage:
            "अपनी भाषा चुनें",

        languageDescription:
            "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue: "जारी रखें",

        loginTitle: "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri में प्रवेश करें",

        email: "ईमेल",

        password: "पासवर्ड",

        rememberMe: "मुझे याद रखें",

        forgotPassword:
            "पासवर्ड भूल गए?",

        login: "लॉगिन",

        or: "या",

        demoDashboard:
            "डेमो डैशबोर्ड खोलें",

        noAccount:
            "खाता नहीं है?",

        register: "रजिस्टर करें",

        changeLanguage:
            "भाषा बदलें",

        registrationTitle:
            "किसान पंजीकरण",

        registrationSubtitle:
            "अपना SmartAgri किसान खाता बनाएं",

        fullName: "पूरा नाम",

        mobile: "मोबाइल नंबर",

        village: "गांव",

        state: "राज्य",

        landArea: "भूमि क्षेत्र",

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

        dashboard: "डैशबोर्ड",

        weather: "मौसम",

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

        settings: "सेटिंग्स",

        about: "SmartAgri के बारे में",

        logout: "लॉगआउट",

        myProfile: "मेरी प्रोफाइल",

        welcome: "स्वागत है",

        dashboardSubtitle:
            "आपकी खेती की जानकारी एक ही जगह।",

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
            "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

        offline: "ऑफलाइन",

        online: "ऑनलाइन",

        weatherSubtitle:
            "कृषि निर्णयों के लिए स्थानीय मौसम।",

        currentWeather:
            "वर्तमान मौसम",

        refresh: "रिफ्रेश",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

        temperature: "तापमान",

        humidity: "नमी",

        windSpeed: "हवा की गति",

        rainChance: "बारिश की संभावना",

        marketSubtitle:
            "सत्यापित स्रोतों से वर्तमान फसल भाव।",

        marketPriceTable:
            "बाजार भाव तालिका",

        market: "बाजार",

        crop: "फसल",

        price: "भाव",

        date: "तारीख",

        onion: "प्याज",

        wheat: "गेहूं",

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
            "आधिकारिक प्रधानमंत्री फसल बीमा योजना जानकारी।",

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
            "AI उत्तरों के लिए AI सेवा/बैकएंड आवश्यक है।",

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
            "वॉयस उत्तर",

        voiceReady:
            "वॉयस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "बदलाव सेव करें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा ऐप भाषा चुनें।",

        voiceSettingDescription:
            "वॉयस सहायता चालू या बंद करें।",

        notifications:
            "सूचनाएं",

        notificationDescription:
            "ऐप सूचनाएं चालू या बंद करें।",

        marketIntelligence:
            "बाजार सूचना",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार सूचना, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"

    },

    mr: {

        appName: "स्मार्ट अॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "तुमची भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",

        continue: "पुढे जा",

        loginTitle: "शेतकरी लॉगिन",

        loginSubtitle:
            "SmartAgri मध्ये प्रवेश करा",

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
            "तुमचे SmartAgri शेतकरी खाते तयार करा",

        fullName: "पूर्ण नाव",

        mobile: "मोबाईल नंबर",

        village: "गाव",

        state: "राज्य",

        landArea: "जमिनीचे क्षेत्र",

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
            "स्वागत",

        dashboardSubtitle:
            "तुमची शेतीची माहिती एका ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "तुमची नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "जलद कृती",

        quickActionsSubtitle:
            "महत्त्वाची कृषी साधने पटकन वापरा.",

        liveDataTitle:
            "लाइव्ह डेटा",

        liveDataDescription:
            "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

        offline:
            "ऑफलाइन",

        online:
            "ऑनलाइन",

        weatherSubtitle:
            "शेतीच्या निर्णयांसाठी स्थानिक हवामान.",

        currentWeather:
            "सध्याचे हवामान",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सत्यापित हवामान डेटा मिळालेला नाही.",

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

        onion:
            "कांदा",

        wheat:
            "गहू",

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नाही",

        marketDataUnavailableDescription:
            "सत्यापित बाजार डेटा मिळालेला नाही.",

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
            "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage:
            "फोटो निवडा",

        analyzeCrop:
            "पीक विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण कनेक्ट केलेले नाही",

        analysisNotConnectedDescription:
            "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य AI सेवा कनेक्ट करा.",

        schemesSubtitle:
            "शेतकरी सहाय्य आणि सरकारी कृषी कार्यक्रम.",

        pmKisanDescription:
            "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",

        pmksyDescription:
            "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "अधिकृत प्रधानमंत्री पीक विमा योजनेची माहिती.",

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
            "AI सेवा अजून कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीचा प्रश्न विचारा...",

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

        voiceInputPlaceholder:
            "व्हॉइस इनपुट येथे दिसेल...",

        voiceResponse:
            "व्हॉइस उत्तर",

        voiceReady:
            "व्हॉइस सहाय्य तयार आहे.",

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
   TRANSLATION FUNCTION
========================================================= */

function t(key) {

    return (
        translations[selectedLanguage]?.[key] ||
        translations.en[key] ||
        key
    );

}

function applyTranslations() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            const value =
                t(key);

            if (value) {

                element.textContent =
                    value;

            }

        });

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder =
                t(key);

        });

    document.documentElement.lang =
        selectedLanguage;

    updateLanguageControls();

}

/* =========================================================
   LANGUAGE CONTROLS
========================================================= */

function updateLanguageControls() {

    const controls = [

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

    controls.forEach(select => {

        if (select) {

            select.value =
                selectedLanguage;

        }

    });

    document
        .querySelectorAll(
            ".language-option"
        )
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language ===
                    selectedLanguage
            );

        });

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );

    if (continueButton) {

        continueButton.disabled =
            !selectedLanguage;

    }

}

function changeLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    selectedLanguage =
        language;

    localStorage.setItem(
        "smartagri_language",
        selectedLanguage
    );

    applyTranslations();

    updateVoiceLanguage();

}

/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

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

function showDashboard() {

    showScreen(
        "dashboardPage"
    );

    loadFarmerIntoUI();

    loadWeather();

    loadMarketPrices();

    showSection(
        "dashboardSection"
    );

}

/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(
            ".app-section"
        )
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });

    const section =
        document.getElementById(
            sectionId
        );

    if (!section) return;

    section.classList.add(
        "active-section"
    );

    closeSideMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (sectionId === "weatherSection") {
        loadWeather();
    }

    if (sectionId === "marketSection") {
        loadMarketPrices();
    }

    if (sectionId === "comparisonSection") {
        loadMarketComparison();
    }

    if (sectionId === "cropSection") {
        loadCropInformation();
    }

}

/* =========================================================
   SIDE MENU
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
   PROFILE MENU
========================================================= */

function toggleProfileMenu() {

    const menu =
        document.getElementById(
            "profileMenu"
        );

    if (!menu) return;

    menu.classList.toggle("open");

}

/* =========================================================
   CONNECTION STATUS
========================================================= */

function setConnectionStatus(
    online,
    text = null
) {

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
            "offline",
            !online
        );

        status.classList.toggle(
            "online",
            online
        );

    }

    const value =
        text ||
        (online ? t("online") : t("offline"));

    if (connectionText) {
        connectionText.textContent =
            value;
    }

    if (dashboardText) {
        dashboardText.textContent =
            value;
    }

}

/* =========================================================
   FARMER DATA
========================================================= */

function loadFarmerIntoUI() {

    const farmer =
        currentFarmer;

    if (!farmer) {

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
            "—"
        );

        setText(
            "summaryMarket",
            "Kopargaon APMC"
        );

        return;

    }

    setText(
        "headerFarmerName",
        farmer.name || "Farmer"
    );

    setText(
        "dashboardFarmerName",
        farmer.name || "Farmer"
    );

    setText(
        "summaryName",
        farmer.name || "—"
    );

    setText(
        "summaryVillage",
        farmer.village || "—"
    );

    setText(
        "summaryLand",
        farmer.land_area || "—"
    );

    setText(
        "summaryMarket",
        farmer.preferred_market || "—"
    );

    setValue(
        "profileName",
        farmer.name
    );

    setValue(
        "profileEmail",
        farmer.email
    );

    setValue(
        "profileMobile",
        farmer.mobile
    );

    setValue(
        "profileVillage",
        farmer.village
    );

    setValue(
        "profileState",
        farmer.state
    );

    setValue(
        "profileLandArea",
        farmer.land_area
    );

    setValue(
        "profileMarket",
        farmer.preferred_market
    );

    setValue(
        "profileLanguage",
        farmer.language || selectedLanguage
    );

    setValue(
        "registerLanguage",
        farmer.language || selectedLanguage
    );

    setText(
        "profilePageName",
        farmer.name || "Farmer"
    );

    setText(
        "profilePageEmail",
        farmer.email || "—"
    );

}

/* =========================================================
   HELPER DOM FUNCTIONS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            value ?? "—";
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

/* =========================================================
   WEATHER
========================================================= */

async function loadWeather() {

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );

    const weatherData =
        document.getElementById(
            "weatherData"
        );

    if (!empty || !weatherData) {
        return;
    }

    empty.classList.remove(
        "hidden"
    );

    weatherData.classList.add(
        "hidden"
    );

    try {

        const response =
            await fetch(
                `${API_BASE}/api/weather?lat=19.8824&lon=74.4761&days=7`,
                {
                    cache: "no-store"
                }
            );

        const data =
            await response.json();

        if (!response.ok ||
            !data.success) {

            throw new Error(
                data.message ||
                "Weather unavailable"
            );

        }

        setText(
            "weatherTemperature",
            data.current.temperature !== null
                ? `${data.current.temperature} °C`
                : "—"
        );

        setText(
            "weatherHumidity",
            data.current.humidity !== null
                ? `${data.current.humidity}%`
                : "—"
        );

        setText(
            "weatherWind",
            data.current.wind !== null
                ? `${data.current.wind} km/h`
                : "—"
        );

        setText(
            "weatherRain",
            data.current.rain !== null
                ? `${data.current.rain} mm`
                : "—"
        );

        empty.classList.add(
            "hidden"
        );

        weatherData.classList.remove(
            "hidden"
        );

        setConnectionStatus(
            true,
            data.cached
                ? "Cached"
                : t("online")
        );

    } catch (error) {

        console.error(
            "Weather:",
            error
        );

        empty.classList.remove(
            "hidden"
        );

        weatherData.classList.add(
            "hidden"
        );

        setConnectionStatus(
            false
        );

    }

}

/* =========================================================
   MARKET PRICES
========================================================= */

async function loadMarketPrices() {

    const body =
        document.getElementById(
            "marketTableBody"
        );

    if (!body) return;

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );

    const commodity =
        selector?.value || "onion";

    body.innerHTML = `
        <tr>
            <td colspan="4">
                <div class="table-empty">
                    <span>⏳</span>
                    <strong>Loading market data...</strong>
                    <p>Please wait.</p>
                </div>
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(
                `${API_BASE}/api/markets?commodity=${encodeURIComponent(commodity)}`,
                {
                    cache: "no-store"
                }
            );

        const data =
            await response.json();

        if (!response.ok ||
            !data.success) {

            throw new Error(
                data.message ||
                "Market data unavailable"
            );

        }

        renderMarketTable(
            data.records || []
        );

        setConnectionStatus(
            true,
            data.cached
                ? "Cached"
                : t("online")
        );

    } catch (error) {

        console.error(
            "Markets:",
            error
        );

        body.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="table-empty">
                        <span>📊</span>
                        <strong>${escapeHTML(
                            t("marketDataUnavailable")
                        )}</strong>
                        <p>${escapeHTML(
                            error.message
                        )}</p>
                    </div>
                </td>
            </tr>
        `;

    }

}

function renderMarketTable(
    records
) {

    const body =
        document.getElementById(
            "marketTableBody"
        );

    if (!body) return;

    if (!records.length) {

        body.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="table-empty">
                        <span>📊</span>
                        <strong>${escapeHTML(
                            t("marketDataUnavailable")
                        )}</strong>
                        <p>No matching Kopargaon, Yeola or Shirdi records were returned by the selected API.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    body.innerHTML =
        records
            .map(record => {

                const price =
                    record.modal_price ??
                    record.max_price ??
                    record.min_price;

                const priceText =
                    price !== null &&
                    price !== undefined
                        ? `₹${formatNumber(price)}`
                        : "—";

                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                normalizeMarketName(
                                    record.market
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                record.commodity || "—"
                            )}
                        </td>

                        <td>
                            <strong>
                                ${priceText}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                record.arrival_date || "—"
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");

}

function normalizeMarketName(
    market
) {

    const value =
        String(market || "")
            .toLowerCase();

    if (value.includes("kopargaon")) {
        return "Kopargaon APMC";
    }

    if (value.includes("yeola")) {
        return "Yeola Market";
    }

    if (value.includes("shirdi")) {
        return "Shirdi Market";
    }

    return market || "—";

}

/* =========================================================
   MARKET COMPARISON
========================================================= */

async function loadMarketComparison() {

    try {

        const selector =
            document.getElementById(
                "cropPriceSelector"
            );

        const commodity =
            selector?.value || "onion";

        const response =
            await fetch(
                `${API_BASE}/api/markets?commodity=${encodeURIComponent(commodity)}`,
                {
                    cache: "no-store"
                }
            );

        const data =
            await response.json();

        if (!response.ok ||
            !data.success) {

            return;

        }

        const records =
            data.records || [];

        const cards =
            document.querySelectorAll(
                ".market-card"
            );

        cards.forEach(card => {

            const heading =
                card.querySelector(
                    "h3"
                );

            if (!heading) return;

            const marketName =
                heading.textContent
                    .trim()
                    .toLowerCase();

            const record =
                records.find(
                    item =>
                        normalizeMarketName(
                            item.market
                        )
                            .toLowerCase() ===
                        marketName
                );

            const priceElement =
                card.querySelector(
                    ".market-value strong"
                );

            const messageElement =
                card.querySelector(
                    "p"
                );

            if (record) {

                const price =
                    record.modal_price ??
                    record.max_price ??
                    record.min_price;

                if (priceElement) {

                    priceElement.textContent =
                        price !== null &&
                        price !== undefined
                            ? `₹${formatNumber(price)}`
                            : "—";

                }

                if (messageElement) {

                    messageElement.textContent =
                        `${record.commodity || commodity} • ${
                            record.arrival_date || ""
                        }`;

                }

            } else {

                if (priceElement) {
                    priceElement.textContent =
                        "—";
                }

                if (messageElement) {
                    messageElement.textContent =
                        t("dataUnavailable");
                }

            }

        });

    } catch (error) {

        console.error(
            "Comparison:",
            error
        );

    }

}

/* =========================================================
   CROP INFORMATION
========================================================= */

async function loadCropInformation() {

    try {

        const response =
            await fetch(
                `${API_BASE}/api/crops`
            );

        const data =
            await response.json();

        if (!data.success) {
            return;
        }

        const cards =
            document.querySelectorAll(
                ".crop-card"
            );

        data.crops.forEach(
            (crop, index) => {

                const card =
                    cards[index];

                if (!card) return;

                const paragraph =
                    card.querySelector(
                        "p"
                    );

                if (!paragraph) return;

                paragraph.textContent =
                    `${crop.information.season} ${crop.information.management}`;

            }
        );

    } catch (error) {

        console.error(
            "Crop information:",
            error
        );

    }

}

/* =========================================================
   CROP IMAGE UPLOAD
========================================================= */

function setupCropHealth() {

    const input =
        document.getElementById(
            "cropImageInput"
        );

    const preview =
        document.getElementById(
            "cropImagePreview"
        );

    const previewContainer =
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
        function() {

            const file =
                this.files?.[0];

            if (!file) {

                if (previewContainer) {
                    previewContainer.classList.add(
                        "hidden"
                    );
                }

                if (analyzeButton) {
                    analyzeButton.disabled =
                        true;
                }

                return;

            }

            if (!file.type.startsWith(
                "image/"
            )) {

                alert(
                    "Please choose an image file."
                );

                this.value = "";

                return;

            }

            const reader =
                new FileReader();

            reader.onload =
                function(event) {

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

async function analyzeCrop() {

    const input =
        document.getElementById(
            "cropImageInput"
        );

    const result =
        document.getElementById(
            "cropAnalysisResult"
        );

    const file =
        input?.files?.[0];

    if (!file) {

        alert(
            "Please choose a crop image first."
        );

        return;

    }

    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    if (result) {

        result.innerHTML = `
            <strong>Uploading crop image...</strong>
            <p>Please wait.</p>
        `;

    }

    try {

        const uploadResponse =
            await fetch(
                `${API_BASE}/api/crop-health/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

        const uploadData =
            await uploadResponse.json();

        if (!uploadResponse.ok ||
            !uploadData.success) {

            throw new Error(
                uploadData.message ||
                "Upload failed."
            );

        }

        const analysisResponse =
            await fetch(
                `${API_BASE}/api/crop-health/analyze`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        upload_id:
                            uploadData.upload_id,
                        filename:
                            uploadData.filename
                    })
                }
            );

        const analysisData =
            await analysisResponse.json();

        if (result) {

            result.innerHTML = `

                <strong>
                    ${
                        analysisData.connected
                            ? "Crop analysis completed"
                            : "Image uploaded successfully"
                    }
                </strong>

                <p>
                    ${
                        analysisData.message ||
                        uploadData.analysis.message
                    }
                </p>

            `;

        }

    } catch (error) {

        console.error(
            "Crop health:",
            error
        );

        if (result) {

            result.innerHTML = `

                <strong>
                    Crop image processing failed
                </strong>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            `;

        }

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

    const input =
        document.getElementById(
            "aiInput"
        );

    if (!form || !input) return;

    form.addEventListener(
        "submit",
        async function(event) {

            /*
             * VERY IMPORTANT:
             * Prevent default form submission.
             *
             * This prevents the page from returning
             * to the language screen.
             */

            event.preventDefault();
            event.stopPropagation();

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

            addChatMessage(
                "Thinking...",
                "assistant"
            );

            try {

                const response =
                    await fetch(
                        `${API_BASE}/api/ai`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                question,

                                language:
                                    selectedLanguage

                            })

                        }
                    );

                const data =
                    await response.json();

                if (!response.ok ||
                    !data.success) {

                    throw new Error(
                        data.message ||
                        "AI request failed."
                    );

                }

                removeThinkingMessage();

                addChatMessage(
                    data.answer,
                    "assistant"
                );

            } catch (error) {

                console.error(
                    "AI:",
                    error
                );

                removeThinkingMessage();

                addChatMessage(
                    "AI service is currently unavailable.",
                    "assistant"
                );

            }

        }
    );

}

function addChatMessage(
    text,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );

    if (!container) return;

    const message =
        document.createElement(
            "div"
        );

    message.className =
        `chat-message ${
            type === "user"
                ? "user-message"
                : "assistant-message"
        }`;

    message.innerHTML = `

        <div class="chat-avatar">
            ${
                type === "user"
                    ? "👨‍🌾"
                    : "🤖"
            }
        </div>

        <div>

            <strong>
                ${
                    type === "user"
                        ? "You"
                        : t("assistant")
                }
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;

    container.appendChild(
        message
    );

    container.scrollTop =
        container.scrollHeight;

}

function removeThinkingMessage() {

    const container =
        document.getElementById(
            "chatMessages"
        );

    if (!container) return;

    const messages =
        container.querySelectorAll(
            ".assistant-message"
        );

    messages.forEach(message => {

        const p =
            message.querySelector(
                "p"
            );

        if (
            p &&
            p.textContent ===
                "Thinking..."
        ) {

            message.remove();

        }

    });

}

/* =========================================================
   VOICE ASSISTANCE
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

    const voiceResponse =
        document.getElementById(
            "voiceResponse"
        );

    if (!startButton) return;

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        startButton.addEventListener(
            "click",
            function() {

                if (voiceResponse) {

                    voiceResponse.textContent =
                        "Speech recognition is not supported by this browser. Try Google Chrome.";

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
        getSpeechLanguage();

    recognition.onstart =
        function() {

            isListening = true;

            startButton.classList.add(
                "hidden"
            );

            if (stopButton) {

                stopButton.classList.remove(
                    "hidden"
                );

            }

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Listening...";

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

            if (voiceResponse) {

                voiceResponse.textContent =
                    "Processing your request...";

            }

            processVoiceQuestion(
                transcript
            );

        };

    recognition.onerror =
        function(event) {

            console.error(
                "Speech recognition:",
                event.error
            );

            if (voiceResponse) {

                voiceResponse.textContent =
                    `Voice error: ${event.error}`;

            }

        };

    recognition.onend =
        function() {

            isListening = false;

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
        function() {

            try {

                recognition.lang =
                    getSpeechLanguage();

                recognition.start();

            } catch (error) {

                console.warn(
                    error
                );

            }

        }
    );

    if (stopButton) {

        stopButton.addEventListener(
            "click",
            function() {

                try {

                    recognition.stop();

                } catch {}

            }
        );

    }

}

function getSpeechLanguage() {

    if (
        selectedLanguage ===
        "hi"
    ) {
        return "hi-IN";
    }

    if (
        selectedLanguage ===
        "mr"
    ) {
        return "mr-IN";
    }

    return "en-IN";

}

function updateVoiceLanguage() {

    if (recognition) {

        recognition.lang =
            getSpeechLanguage();

    }

}

async function processVoiceQuestion(
    question
) {

    const responseElement =
        document.getElementById(
            "voiceResponse"
        );

    try {

        const response =
            await fetch(
                `${API_BASE}/api/ai`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        question,

                        language:
                            selectedLanguage

                    })

                }
            );

        const data =
            await response.json();

        const answer =
            data.answer ||
            "I could not process that question.";

        if (responseElement) {

            responseElement.textContent =
                answer;

        }

        speakText(answer);

    } catch (error) {

        console.error(
            error
        );

        if (responseElement) {

            responseElement.textContent =
                "Voice assistant is currently unavailable.";

        }

    }

}

function speakText(text) {

    if (!("speechSynthesis" in window)) {
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
                function() {

                    const url =
                        this.dataset.schemeUrl;

                    if (!url) return;

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });

}

/* =========================================================
   PROFILE EDIT
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

    function setEditing(
        editing
    ) {

        fields.forEach(id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {

                /*
                 * Email is disabled because Firebase
                 * email changes require verification.
                 */

                if (id === "profileEmail") {
                    element.disabled = true;
                } else {
                    element.disabled =
                        !editing;
                }

            }

        });

        const actions =
            document.getElementById(
                "profileEditActions"
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
            function() {

                setEditing(true);

            }
        );

    }

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function() {

                loadFarmerIntoUI();

                setEditing(false);

            }
        );

    }

    if (form) {

        form.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();

                const updatedFarmer = {

                    ...(currentFarmer || {}),

                    firebase_uid:
                        currentFarmer?.firebase_uid ||
                        "demo-user",

                    name:
                        getValue(
                            "profileName"
                        ),

                    email:
                        getValue(
                            "profileEmail"
                        ),

                    mobile:
                        getValue(
                            "profileMobile"
                        ),

                    village:
                        getValue(
                            "profileVillage"
                        ),

                    state:
                        getValue(
                            "profileState"
                        ),

                    land_area:
                        getValue(
                            "profileLandArea"
                        ),

                    preferred_market:
                        getValue(
                            "profileMarket"
                        ),

                    language:
                        getValue(
                            "profileLanguage"
                        )

                };

                try {

                    const response =
                        await fetch(
                            `${API_BASE}/api/farmer`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        updatedFarmer
                                    )

                            }
                        );

                    const data =
                        await response.json();

                    if (!response.ok ||
                        !data.success) {

                        throw new Error(
                            data.message ||
                            "Unable to save profile."
                        );

                    }

                    currentFarmer =
                        data.farmer;

                    localStorage.setItem(
                        "smartagri_farmer",
                        JSON.stringify(
                            currentFarmer
                        )
                    );

                    loadFarmerIntoUI();

                    setEditing(false);

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
                        error.message,
                        "error"
                    );

                }

            }
        );

    }

}

/* =========================================================
   REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const name =
                getValue(
                    "registerName"
                );

            const email =
                getValue(
                    "registerEmail"
                );

            const password =
                getValue(
                    "registerPassword"
                );

            const data = {

                name,

                email,

                mobile:
                    getValue(
                        "registerMobile"
                    ),

                village:
                    getValue(
                        "registerVillage"
                    ),

                state:
                    getValue(
                        "registerState"
                    ),

                land_area:
                    getValue(
                        "registerLandArea"
                    ),

                preferred_market:
                    getValue(
                        "registerMarket"
                    ),

                language:
                    getValue(
                        "registerLanguage"
                    )

            };

            const messageId =
                "registerMessage";

            try {

                let uid =
                    "demo-" +
                    Date.now();

                if (
                    firebaseReady &&
                    auth
                ) {

                    const result =
                        await auth
                            .createUserWithEmailAndPassword(
                                email,
                                password
                            );

                    uid =
                        result.user.uid;

                }

                const response =
                    await fetch(
                        `${API_BASE}/api/farmer`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    ...data,

                                    firebase_uid:
                                        uid

                                })

                        }
                    );

                const result =
                    await response.json();

                if (!response.ok ||
                    !result.success) {

                    throw new Error(
                        result.message ||
                        "Registration failed."
                    );

                }

                currentFarmer =
                    result.farmer;

                localStorage.setItem(
                    "smartagri_farmer",
                    JSON.stringify(
                        currentFarmer
                    )
                );

                changeLanguage(
                    data.language
                );

                showMessage(
                    messageId,
                    "Registration successful.",
                    "success"
                );

                setTimeout(
                    showDashboard,
                    500
                );

            } catch (error) {

                console.error(
                    "Registration:",
                    error
                );

                showMessage(
                    messageId,
                    error.message ||
                        "Registration failed.",
                    "error"
                );

            }

        }
    );

}

/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                getValue(
                    "loginEmail"
                );

            const password =
                getValue(
                    "loginPassword"
                );

            try {

                if (
                    firebaseReady &&
                    auth
                ) {

                    const result =
                        await auth
                            .signInWithEmailAndPassword(
                                email,
                                password
                            );

                    const uid =
                        result.user.uid;

                    try {

                        const response =
                            await fetch(
                                `${API_BASE}/api/farmer/${uid}`
                            );

                        if (response.ok) {

                            const data =
                                await response.json();

                            currentFarmer =
                                data.farmer;

                            localStorage.setItem(
                                "smartagri_farmer",
                                JSON.stringify(
                                    currentFarmer
                                )
                            );

                        }

                    } catch {}

                } else {

                    /*
                     * Demo fallback.
                     */

                    currentFarmer = {

                        firebase_uid:
                            "demo-user",

                        name:
                            "Demo Farmer",

                        email,

                        mobile:
                            "",

                        village:
                            "Kopargaon",

                        state:
                            "Maharashtra",

                        land_area:
                            "",

                        preferred_market:
                            "Kopargaon APMC",

                        language:
                            selectedLanguage

                    };

                    localStorage.setItem(
                        "smartagri_farmer",
                        JSON.stringify(
                            currentFarmer
                        )
                    );

                }

                showDashboard();

            } catch (error) {

                console.error(
                    "Login:",
                    error
                );

                showMessage(
                    "loginMessage",
                    error.message ||
                        "Login failed.",
                    "error"
                );

            }

        }
    );

}

/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

    try {

        if (
            firebaseReady &&
            auth
        ) {

            await auth.signOut();

        }

    } catch (error) {

        console.error(
            error
        );

    }

    currentFarmer = null;

    localStorage.removeItem(
        "smartagri_farmer"
    );

    showScreen(
        "languagePage"
    );

}

/* =========================================================
   FORGOT PASSWORD
========================================================= */

function setupForgotPassword() {

    const button =
        document.getElementById(
            "forgotPasswordBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        async function() {

            const email =
                getValue(
                    "loginEmail"
                );

            if (!email) {

                showMessage(
                    "loginMessage",
                    "Enter your email address first.",
                    "error"
                );

                return;

            }

            try {

                if (
                    firebaseReady &&
                    auth
                ) {

                    await auth
                        .sendPasswordResetEmail(
                            email
                        );

                    showMessage(
                        "loginMessage",
                        "Password reset email sent.",
                        "success"
                    );

                } else {

                    showMessage(
                        "loginMessage",
                        "Password reset requires Firebase Authentication.",
                        "error"
                    );

                }

            } catch (error) {

                showMessage(
                    "loginMessage",
                    error.message,
                    "error"
                );

            }

        }
    );

}

/* =========================================================
   DEMO BUTTON
========================================================= */

function setupDemo() {

    const button =
        document.getElementById(
            "demoBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        function() {

            currentFarmer = {

                firebase_uid:
                    "demo-user",

                name:
                    "Demo Farmer",

                email:
                    "demo@smartagri.local",

                mobile:
                    "0000000000",

                village:
                    "Kopargaon",

                state:
                    "Maharashtra",

                land_area:
                    "2 acres",

                preferred_market:
                    "Kopargaon APMC",

                language:
                    selectedLanguage

            };

            localStorage.setItem(
                "smartagri_farmer",
                JSON.stringify(
                    currentFarmer
                )
            );

            showDashboard();

        }
    );

}

/* =========================================================
   LANGUAGE PAGE BUTTONS
========================================================= */

function setupLanguagePage() {

    document
        .querySelectorAll(
            ".language-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    changeLanguage(
                        this.dataset.language
                    );

                }
            );

        });

    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function() {

                showScreen(
                    "loginPage"
                );

            }
        );

    }

    const changeButton =
        document.getElementById(
            "changeLanguageFromLogin"
        );

    if (changeButton) {

        changeButton.addEventListener(
            "click",
            function() {

                showScreen(
                    "languagePage"
                );

            }
        );

    }

}

/* =========================================================
   SETTINGS LANGUAGE
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
            function() {

                changeLanguage(
                    this.value
                );

            }
        );

    }

    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            function() {

                changeLanguage(
                    this.value
                );

            }
        );

    }

    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            function() {

                changeLanguage(
                    this.value
                );

            }
        );

    }

}

/* =========================================================
   NAVIGATION EVENTS
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    const section =
                        this.dataset.section;

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
        .forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    showSection(
                        this.dataset.profileSection
                    );

                    const menu =
                        document.getElementById(
                            "profileMenu"
                        );

                    menu?.classList.remove(
                        "open"
                    );

                }
            );

        });

}

/* =========================================================
   HEADER MENU
========================================================= */

function setupMenus() {

    const hamburger =
        document.getElementById(
            "hamburgerBtn"
        );

    const close =
        document.getElementById(
            "closeMenuBtn"
        );

    const overlay =
        document.getElementById(
            "menuOverlay"
        );

    const profile =
        document.getElementById(
            "profileButton"
        );

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

    if (profile) {

        profile.addEventListener(
            "click",
            toggleProfileMenu
        );

    }

    document.addEventListener(
        "click",
        function(event) {

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
                button &&
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                menu.classList.remove(
                    "open"
                );

            }

        }
    );

}

/* =========================================================
   LOGIN / REGISTER NAVIGATION
========================================================= */

function setupAuthNavigation() {

    const register =
        document.getElementById(
            "showRegisterBtn"
        );

    const login =
        document.getElementById(
            "showLoginBtn"
        );

    if (register) {

        register.addEventListener(
            "click",
            function() {

                showScreen(
                    "registerPage"
                );

            }
        );

    }

    if (login) {

        login.addEventListener(
            "click",
            function() {

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

function setupLogout() {

    const sideLogout =
        document.getElementById(
            "sideLogoutBtn"
        );

    const profileLogout =
        document.getElementById(
            "profileLogoutBtn"
        );

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
   REFRESH BUTTONS
========================================================= */

function setupRefresh() {

    const weather =
        document.getElementById(
            "refreshWeatherBtn"
        );

    if (weather) {

        weather.addEventListener(
            "click",
            function() {

                loadWeather();

            }
        );

    }

    const cropSelector =
        document.getElementById(
            "cropPriceSelector"
        );

    if (cropSelector) {

        cropSelector.addEventListener(
            "change",
            function() {

                loadMarketPrices();

                loadMarketComparison();

            }
        );

    }

}

/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

    const voice =
        document.getElementById(
            "voiceSetting"
        );

    if (voice) {

        voice.addEventListener(
            "change",
            function() {

                localStorage.setItem(
                    "smartagri_voice_enabled",
                    this.checked
                        ? "1"
                        : "0"
                );

            }
        );

        const stored =
            localStorage.getItem(
                "smartagri_voice_enabled"
            );

        if (stored !== null) {

            voice.checked =
                stored === "1";

        }

    }

    const notifications =
        document.getElementById(
            "notificationSetting"
        );

    if (notifications) {

        notifications.addEventListener(
            "change",
            function() {

                localStorage.setItem(
                    "smartagri_notifications",
                    this.checked
                        ? "1"
                        : "0"
                );

            }
        );

    }

}

/* =========================================================
   ONLINE / OFFLINE
========================================================= */

function setupConnectionMonitoring() {

    function update() {

        setConnectionStatus(
            navigator.onLine
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

/* =========================================================
   UTILITIES
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}

function formatNumber(value) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );

}

function escapeHTML(value) {

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

function showMessage(
    id,
    message,
    type = "info"
) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent =
        message;

    element.className =
        `message ${type}`;

}

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
         * Language MUST be applied before
         * anything else.
         */

        applyTranslations();

        setupLanguagePage();

        setupLanguageSelectors();

        setupNavigation();

        setupMenus();

        setupAuthNavigation();

        setupLogout();

        setupDemo();

        setupLogin();

        setupRegistration();

        setupForgotPassword();

        setupRefresh();

        setupCropHealth();

        setupAI();

        setupVoice();

        setupProfile();

        setupGovernmentSchemes();

        setupSettings();

        setupConnectionMonitoring();

        /*
         * If a farmer was already stored,
         * allow direct dashboard restoration.
         *
         * Otherwise start with language page.
         */

        if (currentFarmer) {

            showDashboard();

        } else {

            showScreen(
                "languagePage"
            );

        }

    }
);
