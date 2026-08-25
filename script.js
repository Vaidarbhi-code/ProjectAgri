/* =========================================================
   SMARTAGRI
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   FIREBASE CONFIGURATION
=========================================================

   IMPORTANT:
   Replace the values below with your Firebase Web App
   configuration.

========================================================= */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",

    appId: "YOUR_APP_ID"

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

    console.log("SmartAgri Firebase initialized.");

} catch (error) {

    console.error(
        "Firebase initialization failed:",
        error
    );

}



/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedLanguage =
    localStorage.getItem("smartagriLanguage") || "en";


let currentUser = null;

let currentFarmerData = null;

let selectedCrop = "onion";

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

        appName:
            "स्मार्ट एग्री",

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
            "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",

        liveDataTitle:
            "लाइव डेटा",

        liveDataDescription:
            "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

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
            "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",

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

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

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
            "AI उत्तरों के लिए बैकएंड सेवा आवश्यक है।",

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
            "आवाज उत्तर",

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

        appName:
            "स्मार्ट अॅग्री",

        appTagline:
            "स्मार्ट कृषी बाजार माहिती प्रणाली",

        chooseLanguage:
            "तुमची भाषा निवडा",

        languageDescription:
            "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",

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
            "मोबाइल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्र",

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
            "बाजार भाव",

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
            "स्वागत",

        dashboardSubtitle:
            "तुमची शेतीची माहिती एका ठिकाणी.",

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
            "कनेक्टेड सत्यापित स्रोतांमधून सध्याचे पिकांचे भाव.",

        marketPriceTable:
            "बाजार भाव तक्ता",

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
            "विक्रीपूर्वी कनेक्टेड बाजार माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पिकांची लागवड आणि व्यवस्थापन मार्गदर्शन.",

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
            "AI सेवा अद्याप कनेक्ट केलेली नाही.",

        askQuestion:
            "शेतीचा प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी बॅकएंड सेवा आवश्यक आहे.",

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
            "तुमच्या SmartAgri प्राधान्यांचे व्यवस्थापन करा.",

        changeLanguageDescription:
            "तुमची पसंतीची अॅप भाषा निवडा.",

        voiceSettingDescription:
            "आवाज सहाय्य सुरू किंवा बंद करा.",

        notifications:
            "सूचना",

        notificationDescription:
            "अॅपच्या सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."

    }

};



/* =========================================================
   HELPER: TRANSLATION
========================================================= */

function t(key) {

    return (
        translations[selectedLanguage]?.[key] ||
        translations.en[key] ||
        key
    );

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
        "smartagriLanguage",
        selectedLanguage
    );


    document.documentElement.lang =
        selectedLanguage;


    /* TEXT */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            const value = t(key);

            if (value) {

                element.textContent = value;

            }

        });


    /* PLACEHOLDERS */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            element.placeholder = t(key);

        });


    /* LANGUAGE SELECTORS */

    const selectors = [

        "dashboardLanguage",

        "settingsLanguage",

        "profileLanguage",

        "registerLanguage"

    ];


    selectors.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                selectedLanguage;

        }

    });


    updateLanguageButtons();

}



/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

function updateLanguageButtons() {

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language === selectedLanguage
            );

        });


    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    if (continueButton) {

        continueButton.disabled = false;

    }

}



/* =========================================================
   SCREEN MANAGEMENT
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



/* =========================================================
   DASHBOARD SHOW
========================================================= */

function showDashboard() {

    showScreen("dashboardPage");

    document.body.classList.add(
        "dashboard-active"
    );

    closeSideMenu();

    closeProfileMenu();

    updateConnectionStatus();

}



/* =========================================================
   LANGUAGE PAGE
========================================================= */

function initializeLanguagePage() {

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectedLanguage =
                        button.dataset.language;

                    applyLanguage(
                        selectedLanguage
                    );

                }
            );

        });


    const continueButton =
        document.getElementById(
            "continueLanguageBtn"
        );


    continueButton.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "smartagriLanguage",
                selectedLanguage
            );

            showScreen("loginPage");

        }
    );


    const changeLanguageButton =
        document.getElementById(
            "changeLanguageFromLogin"
        );


    changeLanguageButton.addEventListener(
        "click",
        () => {

            showScreen("languagePage");

        }
    );

}



/* =========================================================
   LOGIN
========================================================= */

function initializeLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    form.addEventListener(
        "submit",
        async event => {

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


            const remember =
                document
                    .getElementById(
                        "rememberMe"
                    )
                    .checked;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (!firebaseReady) {

                showMessage(
                    message,
                    "Firebase is not configured yet.",
                    "error"
                );

                return;

            }


            try {

                if (remember) {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.LOCAL
                    );

                } else {

                    await auth.setPersistence(
                        firebase.auth.Auth.Persistence.SESSION
                    );

                }


                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );


                showMessage(
                    message,
                    "Login successful.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


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



    /* FORGOT PASSWORD */

    document
        .getElementById(
            "forgotPasswordBtn"
        )
        .addEventListener(
            "click",
            async () => {

                const email =
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value
                        .trim();


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


                if (!firebaseReady) {

                    showMessage(
                        message,
                        "Firebase is not configured yet.",
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



    /* REGISTER */

    document
        .getElementById(
            "showRegisterBtn"
        )
        .addEventListener(
            "click",
            () => {

                showScreen(
                    "registerPage"
                );

            }
        );



    /* DEMO */

    document
        .getElementById(
            "demoBtn"
        )
        .addEventListener(
            "click",
            () => {

                currentUser = {
                    uid: "demo-user",
                    email: "demo@smartagri.app"
                };


                currentFarmerData = {

                    name: "Demo Farmer",

                    email: "demo@smartagri.app",

                    mobile: "9876543210",

                    village: "Kopargaon",

                    state: "Maharashtra",

                    landArea: "2.5 acres",

                    preferredMarket:
                        "Kopargaon APMC",

                    preferredLanguage:
                        selectedLanguage

                };


                populateFarmerData();

                showDashboard();

            }
        );

}



/* =========================================================
   REGISTRATION
========================================================= */

function initializeRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );


    form.addEventListener(
        "submit",
        async event => {

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


            const preferredMarket =
                getValue("registerMarket");


            const preferredLanguage =
                getValue("registerLanguage");


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (!firebaseReady) {

                showMessage(
                    message,
                    "Firebase is not configured yet.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;

            }


            try {

                const credential =
                    await auth
                        .createUserWithEmailAndPassword(
                            email,
                            password
                        );


                const user =
                    credential.user;


                const farmerData = {

                    uid: user.uid,

                    name: name,

                    email: email,

                    mobile: mobile,

                    village: village,

                    state: state,

                    landArea: landArea,

                    preferredMarket:
                        preferredMarket,

                    preferredLanguage:
                        preferredLanguage,

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp(),

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .set(farmerData);


                currentFarmerData =
                    farmerData;


                currentUser = user;


                selectedLanguage =
                    preferredLanguage;


                applyLanguage(
                    selectedLanguage
                );


                populateFarmerData();


                showDashboard();


                form.reset();


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


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



    document
        .getElementById(
            "showLoginBtn"
        )
        .addEventListener(
            "click",
            () => {

                showScreen(
                    "loginPage"
                );

            }
        );

}



/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function initializeAuthState() {

    if (!firebaseReady) {

        console.warn(
            "Firebase unavailable."
        );

        return;

    }


    auth.onAuthStateChanged(
        async user => {

            if (user) {

                currentUser = user;


                await loadFarmerData(
                    user.uid
                );


                showDashboard();


            } else {

                currentUser = null;

                currentFarmerData = null;

                showScreen(
                    "languagePage"
                );

            }

        }
    );

}



/* =========================================================
   LOAD FARMER DATA
========================================================= */

async function loadFarmerData(uid) {

    if (!db) {

        return;

    }


    try {

        const document =
            await db
                .collection("farmers")
                .doc(uid)
                .get();


        if (document.exists) {

            currentFarmerData =
                document.data();


            if (
                currentFarmerData.preferredLanguage
            ) {

                selectedLanguage =
                    currentFarmerData.preferredLanguage;

                applyLanguage(
                    selectedLanguage
                );

            }


            populateFarmerData();


        } else {

            currentFarmerData = {

                name:
                    currentUser?.email ||
                    "Farmer",

                email:
                    currentUser?.email ||
                    "",

                mobile: "",

                village: "",

                state: "",

                landArea: "",

                preferredMarket: "",

                preferredLanguage:
                    selectedLanguage

            };


            populateFarmerData();

        }


    } catch (error) {

        console.error(
            "Error loading farmer data:",
            error
        );

    }

}



/* =========================================================
   POPULATE FARMER DATA
========================================================= */

function populateFarmerData() {

    if (!currentFarmerData) {

        return;

    }


    const data =
        currentFarmerData;


    setText(
        "headerFarmerName",
        data.name || "Farmer"
    );


    setText(
        "dashboardFarmerName",
        data.name || "Farmer"
    );


    setText(
        "summaryName",
        data.name || "—"
    );


    setText(
        "summaryVillage",
        data.village || "—"
    );


    setText(
        "summaryLand",
        data.landArea || "—"
    );


    setText(
        "summaryMarket",
        data.preferredMarket || "—"
    );


    setText(
        "profilePageName",
        data.name || "Farmer"
    );


    setText(
        "profilePageEmail",
        data.email || "—"
    );


    setValue(
        "profileName",
        data.name || ""
    );


    setValue(
        "profileEmail",
        data.email || ""
    );


    setValue(
        "profileMobile",
        data.mobile || ""
    );


    setValue(
        "profileVillage",
        data.village || ""
    );


    setValue(
        "profileState",
        data.state || ""
    );


    setValue(
        "profileLandArea",
        data.landArea || ""
    );


    setValue(
        "profileMarket",
        data.preferredMarket || ""
    );


    setValue(
        "profileLanguage",
        data.preferredLanguage ||
        selectedLanguage
    );


}



/* =========================================================
   PROFILE EDIT
========================================================= */

function initializeProfile() {

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


    editButton.addEventListener(
        "click",
        enableProfileEditing
    );


    cancelButton.addEventListener(
        "click",
        () => {

            populateFarmerData();

            disableProfileEditing();

        }
    );


    form.addEventListener(
        "submit",
        async event => {

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

                preferredLanguage:
                    getValue("profileLanguage"),

                updatedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            };


            const message =
                document.getElementById(
                    "profileMessage"
                );


            try {

                if (
                    firebaseReady &&
                    currentUser.uid !== "demo-user"
                ) {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update(updatedData);

                }


                currentFarmerData = {

                    ...currentFarmerData,

                    ...updatedData

                };


                selectedLanguage =
                    updatedData.preferredLanguage;


                applyLanguage(
                    selectedLanguage
                );


                populateFarmerData();

                disableProfileEditing();


                showMessage(
                    message,
                    "Profile updated successfully.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Profile update error:",
                    error
                );


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
   ENABLE PROFILE EDITING
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

        const element =
            document.getElementById(id);

        if (element) {

            element.disabled = false;

        }

    });


    document
        .getElementById(
            "profileEditActions"
        )
        .classList.remove("hidden");

}



/* =========================================================
   DISABLE PROFILE EDITING
========================================================= */

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


    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.disabled = true;

        }

    });


    document
        .getElementById(
            "profileEditActions"
        )
        .classList.add("hidden");

}



/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    document
        .querySelectorAll(
            "[data-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const sectionId =
                        button.dataset.section;

                    showSection(
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
                () => {

                    showSection(
                        button.dataset.profileSection
                    );

                }
            );

        });

}



/* =========================================================
   SHOW APP SECTION
========================================================= */

function showSection(sectionId) {

    document
        .querySelectorAll(".app-section")
        .forEach(section => {

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
   SIDE MENU
========================================================= */

function initializeSideMenu() {

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


    hamburger.addEventListener(
        "click",
        openSideMenu
    );


    close.addEventListener(
        "click",
        closeSideMenu
    );


    overlay.addEventListener(
        "click",
        closeSideMenu
    );

}



/* =========================================================
   OPEN MENU
========================================================= */

function openSideMenu() {

    document
        .getElementById("sideMenu")
        .classList.add("open");


    document
        .getElementById("menuOverlay")
        .classList.add("active");

}



/* =========================================================
   CLOSE MENU
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

function initializeProfileMenu() {

    const profileButton =
        document.getElementById(
            "profileButton"
        );


    profileButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const menu =
                document.getElementById(
                    "profileMenu"
                );

            menu.classList.toggle(
                "active"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            const menu =
                document.getElementById(
                    "profileMenu"
                );


            const button =
                document.getElementById(
                    "profileButton"
                );


            if (
                !menu.contains(event.target) &&
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
   LOGOUT
========================================================= */

function initializeLogout() {

    const logoutButtons = [

        "sideLogoutBtn",

        "profileLogoutBtn"

    ];


    logoutButtons.forEach(id => {

        const button =
            document.getElementById(id);


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        firebaseReady &&
                        currentUser &&
                        currentUser.uid !== "demo-user"
                    ) {

                        await auth.signOut();

                    }


                    currentUser = null;

                    currentFarmerData = null;


                    closeSideMenu();

                    closeProfileMenu();


                    showScreen(
                        "languagePage"
                    );


                } catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                }

            }
        );

    });

}



/* =========================================================
   CONNECTION STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const connection =
        document.getElementById(
            "connectionStatus"
        );


    const headerText =
        document.getElementById(
            "connectionText"
        );


    const dashboardText =
        document.getElementById(
            "dashboardConnectionText"
        );


    if (connection) {

        connection.classList.toggle(
            "online",
            online
        );

        connection.classList.toggle(
            "offline",
            !online
        );

    }


    if (headerText) {

        headerText.textContent =
            online
                ? t("online")
                : t("offline");

    }


    if (dashboardText) {

        dashboardText.textContent =
            online
                ? t("online")
                : t("offline");

    }

}



/* =========================================================
   ONLINE / OFFLINE EVENTS
========================================================= */

function initializeConnectionEvents() {

    window.addEventListener(
        "online",
        updateConnectionStatus
    );


    window.addEventListener(
        "offline",
        updateConnectionStatus
    );

}



/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

function initializeLanguageSelectors() {

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


    dashboardLanguage.addEventListener(
        "change",
        event => {

            changeApplicationLanguage(
                event.target.value
            );

        }
    );


    settingsLanguage.addEventListener(
        "change",
        event => {

            changeApplicationLanguage(
                event.target.value
            );

        }
    );


    registerLanguage.addEventListener(
        "change",
        event => {

            selectedLanguage =
                event.target.value;

        }
    );


    profileLanguage.addEventListener(
        "change",
        event => {

            selectedLanguage =
                event.target.value;

        }
    );

}



/* =========================================================
   CHANGE APPLICATION LANGUAGE
========================================================= */

async function changeApplicationLanguage(
    language
) {

    applyLanguage(language);


    if (
        currentUser &&
        firebaseReady &&
        currentUser.uid !== "demo-user"
    ) {

        try {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .update({

                    preferredLanguage:
                        language,

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });


            if (currentFarmerData) {

                currentFarmerData.preferredLanguage =
                    language;

            }


        } catch (error) {

            console.error(
                "Language update error:",
                error
            );

        }

    }

}



/* =========================================================
   SETTINGS
========================================================= */

function initializeSettings() {

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );


    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    const savedVoice =
        localStorage.getItem(
            "smartagriVoice"
        );


    const savedNotifications =
        localStorage.getItem(
            "smartagriNotifications"
        );


    if (savedVoice !== null) {

        voiceSetting.checked =
            savedVoice === "true";

    }


    if (savedNotifications !== null) {

        notificationSetting.checked =
            savedNotifications === "true";

    }


    voiceSetting.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "smartagriVoice",
                voiceSetting.checked
            );

        }
    );


    notificationSetting.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "smartagriNotifications",
                notificationSetting.checked
            );

        }
    );

}



/* =========================================================
   GOVERNMENT SCHEME BUTTONS
========================================================= */

function initializeSchemeButtons() {

    document
        .querySelectorAll(
            ".scheme-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const url =
                        button.dataset.schemeUrl;


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
   WEATHER
========================================================= */

function initializeWeather() {

    const refreshButton =
        document.getElementById(
            "refreshWeatherBtn"
        );


    refreshButton.addEventListener(
        "click",
        () => {

            loadWeather();

        }
    );

}


function loadWeather() {

    /*
       Weather backend is not connected yet.

       We deliberately keep the empty state instead
       of displaying fake weather data.
    */

    const empty =
        document.getElementById(
            "weatherEmptyState"
        );


    const data =
        document.getElementById(
            "weatherData"
        );


    if (empty) {

        empty.classList.remove(
            "hidden"
        );

    }


    if (data) {

        data.classList.add(
            "hidden"
        );

    }


    console.log(
        "Verified weather data is not connected yet."
    );

}



/* =========================================================
   MARKET PRICES
========================================================= */

function initializeMarket() {

    const selector =
        document.getElementById(
            "cropPriceSelector"
        );


    selector.addEventListener(
        "change",
        event => {

            selectedCrop =
                event.target.value;

            loadMarketPrices(
                selectedCrop
            );

        }
    );


    loadMarketPrices(
        selectedCrop
    );

}



/* =========================================================
   LOAD MARKET PRICES
========================================================= */

function loadMarketPrices(crop) {

    /*
       No fake prices are inserted.

       Real prices should come from your backend/API.
    */

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
                        ${escapeHtml(
                            t("marketDataUnavailable")
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


    console.log(
        "Market selected:",
        crop
    );

}



/* =========================================================
   CROP IMAGE
========================================================= */

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


    const result =
        document.getElementById(
            "cropAnalysisResult"
        );


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            if (!file.type.startsWith("image/")) {

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    preview.src =
                        event.target.result;


                    previewContainer.classList.remove(
                        "hidden"
                    );


                    analyzeButton.disabled =
                        false;


                    result.innerHTML = `

                        <strong>
                            Image selected successfully.
                        </strong>

                        <p>
                            The image is ready for
                            AI crop-health analysis.
                        </p>

                    `;

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    analyzeButton.addEventListener(
        "click",
        () => {

            /*
               AI backend will be connected here later.
            */

            result.innerHTML = `

                <strong>
                    AI crop analysis is not connected yet.
                </strong>

                <p>
                    Connect your crop-health AI backend
                    to analyze this image.
                </p>

            `;

        }
    );

}



/* =========================================================
   AI ASSISTANT
========================================================= */

function initializeAI() {

    const form =
        document.getElementById(
            "aiForm"
        );


    const input =
        document.getElementById(
            "aiInput"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    form.addEventListener(
        "submit",
        event => {

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


            setTimeout(
                () => {

                    addChatMessage(
                        "AI service is not connected yet. Your backend AI service can be connected here.",
                        "assistant"
                    );

                },
                500
            );

        }
    );


    function addChatMessage(
        text,
        type
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            type === "user"
                ? "chat-message user-message"
                : "chat-message assistant-message";


        message.innerHTML = `

            <div class="chat-avatar">
                ${type === "user" ? "👨‍🌾" : "🤖"}
            </div>

            <div>

                <strong>
                    ${type === "user"
                        ? "You"
                        : escapeHtml(t("assistant"))}
                </strong>

                <p>
                    ${escapeHtml(text)}
                </p>

            </div>

        `;


        messages.appendChild(
            message
        );


        messages.scrollTop =
            messages.scrollHeight;

    }

}



/* =========================================================
   VOICE ASSISTANCE
========================================================= */

function initializeVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const startButton =
        document.getElementById(
            "startVoiceBtn"
        );


    const stopButton =
        document.getElementById(
            "stopVoiceBtn"
        );


    const input =
        document.getElementById(
            "voiceInput"
        );


    const response =
        document.getElementById(
            "voiceResponse"
        );


    if (!SpeechRecognition) {

        startButton.disabled =
            true;


        response.textContent =
            "Voice recognition is not supported by this browser.";

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
        () => {

            isListening = true;

            startButton.classList.add(
                "hidden"
            );

            stopButton.classList.remove(
                "hidden"
            );

            response.textContent =
                "Listening...";

        };


    recognition.onresult =
        event => {

            const transcript =
                event
                    .results[0][0]
                    .transcript;


            input.value =
                transcript;


            response.textContent =
                "Voice input received.";

        };


    recognition.onerror =
        event => {

            console.error(
                "Voice recognition error:",
                event.error
            );


            response.textContent =
                "Unable to recognize voice.";

        };


    recognition.onend =
        () => {

            isListening = false;

            startButton.classList.remove(
                "hidden"
            );

            stopButton.classList.add(
                "hidden"
            );

        };


    startButton.addEventListener(
        "click",
        () => {

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


    stopButton.addEventListener(
        "click",
        () => {

            if (recognition) {

                recognition.stop();

            }

        }
    );

}



/* =========================================================
   SPEECH LANGUAGE
========================================================= */

function getSpeechLanguage() {

    if (
        selectedLanguage === "hi"
    ) {

        return "hi-IN";

    }


    if (
        selectedLanguage === "mr"
    ) {

        return "mr-IN";

    }


    return "en-IN";

}



/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    return element
        ? element.value.trim()
        : "";

}



function setValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value;

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
            value;

    }

}



function showMessage(
    element,
    message,
    type
) {

    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.className =
        `message ${type}`;


    setTimeout(
        () => {

            element.textContent =
                "";

            element.className =
                "message";

        },
        5000
    );

}



/* =========================================================
   FIREBASE ERROR MESSAGES
========================================================= */

function getFirebaseErrorMessage(
    error
) {

    if (!error) {

        return "Something went wrong.";

    }


    switch (error.code) {

        case "auth/invalid-email":

            return "Please enter a valid email address.";


        case "auth/user-not-found":

            return "No account was found with this email.";


        case "auth/wrong-password":

            return "Incorrect password.";


        case "auth/invalid-credential":

            return "Invalid email or password.";


        case "auth/email-already-in-use":

            return "An account already exists with this email.";


        case "auth/weak-password":

            return "Password is too weak.";


        case "auth/network-request-failed":

            return "Network connection failed.";


        case "auth/too-many-requests":

            return "Too many attempts. Please try again later.";


        default:

            return (
                error.message ||
                "Something went wrong."
            );

    }

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

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
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SmartAgri application loaded."
        );


        /* Apply saved language */

        applyLanguage(
            selectedLanguage
        );


        /* Initialize modules */

        initializeLanguagePage();

        initializeLogin();

        initializeRegistration();

        initializeNavigation();

        initializeSideMenu();

        initializeProfileMenu();

        initializeLogout();

        initializeConnectionEvents();

        initializeLanguageSelectors();

        initializeSettings();

        initializeSchemeButtons();

        initializeWeather();

        initializeMarket();

        initializeCropHealth();

        initializeAI();

        initializeVoice();

        initializeProfile();

        updateConnectionStatus();


        /* Firebase authentication */

        initializeAuthState();

    }
);
