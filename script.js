/* =========================================================
   SMARTAGRI KOPARGAON
   COMPLETE JAVASCRIPT

   Firebase:
   - Authentication
   - Firestore farmer profile

   No fake weather values
   No fake market values
   No fake AI answers
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

    if (!firebase.apps.length) {

        firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();

    db = firebase.firestore();

    firebaseReady = true;

    console.log("Firebase initialized.");

} catch (error) {

    console.error(
        "Firebase initialization failed:",
        error
    );
}


/* =========================================================
   APPLICATION STATE
========================================================= */

let selectedLanguage = localStorage.getItem(
    "smartAgriLanguage"
) || null;

let currentUser = null;

let demoMode = false;

let editingProfile = false;

let recognition = null;

let voiceListening = false;


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        appName:
            "SmartAgri Kopargaon",

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
            "SmartAgri does not display invented weather or market values. Data will appear only when a verified data source is connected.",

        currentWeather:
            "Current Weather",

        refresh:
            "Refresh",

        weatherUnavailable:
            "Weather data unavailable",

        weatherUnavailableDescription:
            "No verified weather source is connected yet. No fallback weather values are shown.",

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
            "No verified market data source is connected. No fallback prices are displayed.",

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
            "Onion cultivation information will be displayed here.",

        wheatInfo:
            "Wheat cultivation information will be displayed here.",

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
            "Select an image to prepare it for crop health analysis.",

        chooseImage:
            "Choose Image",

        analyzeCrop:
            "Analyze Crop",

        analysisNotConnected:
            "AI crop analysis is not connected",

        analysisNotConnectedDescription:
            "No AI diagnosis will be invented. Connect a crop-health AI service to display verified analysis results.",

        schemesSubtitle:
            "Farmer support and government agricultural programs.",

        pmKisanDescription:
            "Farmer support scheme information.",

        pmksyDescription:
            "Irrigation and water management scheme information.",

        cropInsurance:
            "Crop Insurance",

        cropInsuranceDescription:
            "Crop insurance program information.",

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
            "AI service is not connected yet. I will not provide invented answers.",

        askQuestion:
            "Ask a farming question...",

        aiConnectionNote:
            "AI responses require a connected AI service/backend.",

        voiceSubtitle:
            "Speak and listen in your preferred language.",

        voiceAssistantTitle:
            "Smart Voice Assistance",

        voiceDescription:
            "Use your microphone to speak. Browser voice recognition availability may vary by device.",

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

        notifications:
            "Notifications",

        voiceSettingDescription:
            "Enable or disable voice assistance.",

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
            "स्मार्टएग्री कोपरगांव",

        appTagline:
            "स्मार्ट कृषि बाजार जानकारी प्रणाली",

        chooseLanguage:
            "अपनी भाषा चुनें",

        languageDescription:
            "ऐप में आगे बढ़ने के लिए अपनी पसंदीदा भाषा चुनें।",

        continue:
            "जारी रखें",

        loginTitle:
            "किसान लॉगिन",

        loginSubtitle:
            "SmartAgri में लॉगिन करें",

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
            "SmartAgri नकली मौसम या बाजार भाव प्रदर्शित नहीं करता। डेटा केवल सत्यापित स्रोत जुड़ने पर दिखाई देगा।",

        currentWeather:
            "वर्तमान मौसम",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "मौसम डेटा उपलब्ध नहीं है",

        weatherUnavailableDescription:
            "अभी कोई सत्यापित मौसम स्रोत जुड़ा नहीं है। कोई नकली मौसम मान नहीं दिखाया गया है।",

        temperature:
            "तापमान",

        humidity:
            "नमी",

        windSpeed:
            "हवा की गति",

        rainChance:
            "बारिश की संभावना",

        marketSubtitle:
            "जुड़े हुए सत्यापित स्रोतों से वर्तमान फसल भाव।",

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

        marketDataUnavailable:
            "बाजार डेटा उपलब्ध नहीं है",

        marketDataUnavailableDescription:
            "कोई सत्यापित बाजार डेटा स्रोत जुड़ा नहीं है। कोई नकली भाव प्रदर्शित नहीं किया गया है।",

        comparisonSubtitle:
            "बेचने से पहले बाजार की जानकारी की तुलना करें।",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नहीं है",

        cropSubtitle:
            "फसल उत्पादन और प्रबंधन की जानकारी।",

        onion:
            "प्याज",

        wheat:
            "गेहूं",

        onionInfo:
            "प्याज की खेती की जानकारी यहां प्रदर्शित होगी।",

        wheatInfo:
            "गेहूं की खेती की जानकारी यहां प्रदर्शित होगी।",

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
            "AI फसल विश्लेषण जुड़ा नहीं है",

        analysisNotConnectedDescription:
            "कोई नकली निदान नहीं दिया जाएगा। सत्यापित परिणामों के लिए crop-health AI सेवा जोड़ें।",

        schemesSubtitle:
            "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",

        pmKisanDescription:
            "किसान सहायता योजना की जानकारी।",

        pmksyDescription:
            "सिंचाई और जल प्रबंधन योजना की जानकारी।",

        cropInsurance:
            "फसल बीमा",

        cropInsuranceDescription:
            "फसल बीमा योजना की जानकारी।",

        learnMore:
            "अधिक जानें",

        aiSubtitle:
            "कृषि से जुड़े प्रश्न पूछें।",

        smartAssistant:
            "स्मार्ट किसान सहायक",

        aiNotConnected:
            "AI जुड़ा नहीं है",

        assistant:
            "सहायक",

        aiUnavailable:
            "AI सेवा अभी जुड़ी नहीं है। मैं नकली उत्तर नहीं दूंगा।",

        askQuestion:
            "कृषि संबंधी प्रश्न पूछें...",

        aiConnectionNote:
            "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्शन आवश्यक है।",

        voiceSubtitle:
            "अपनी पसंदीदा भाषा में बोलें और सुनें।",

        voiceAssistantTitle:
            "स्मार्ट वॉइस सहायता",

        voiceDescription:
            "बोलने के लिए माइक्रोफोन का उपयोग करें। वॉइस पहचान की सुविधा डिवाइस पर निर्भर करती है।",

        startVoice:
            "वॉइस सहायता शुरू करें",

        stopVoice:
            "सुनना बंद करें",

        voiceInput:
            "वॉइस इनपुट",

        voiceResponse:
            "वॉइस उत्तर",

        voiceReady:
            "वॉइस सहायता तैयार है।",

        profileSubtitle:
            "अपनी किसान जानकारी देखें और संपादित करें।",

        saveChanges:
            "परिवर्तन सहेजें",

        cancel:
            "रद्द करें",

        settingsSubtitle:
            "SmartAgri की प्राथमिकताएं प्रबंधित करें।",

        changeLanguageDescription:
            "अपनी पसंदीदा ऐप भाषा चुनें।",

        notifications:
            "सूचनाएं",

        voiceSettingDescription:
            "वॉइस सहायता चालू या बंद करें।",

        notificationDescription:
            "ऐप सूचनाएं चालू या बंद करें।",

        marketIntelligence:
            "बाजार जानकारी",

        multilingualSupport:
            "बहुभाषी सहायता",

        aboutDescription:
            "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
    },


    mr: {

        appName:
            "स्मार्टअ‍ॅग्री कोपरगाव",

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
            "मोबाइल नंबर",

        village:
            "गाव",

        state:
            "राज्य",

        landArea:
            "जमिनीचे क्षेत्र",

        preferredMarket:
            "पसंतीची बाजारपेठ",

        selectMarket:
            "बाजारपेठ निवडा",

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
            "आपली शेतीविषयक माहिती एकाच ठिकाणी.",

        connectionStatus:
            "कनेक्शन स्थिती",

        profileSummary:
            "आपली नोंदणीकृत माहिती",

        editProfile:
            "प्रोफाइल संपादित करा",

        quickActions:
            "त्वरित पर्याय",

        quickActionsSubtitle:
            "महत्त्वाची शेती साधने त्वरीत उघडा.",

        liveDataTitle:
            "थेट डेटा",

        liveDataDescription:
            "SmartAgri बनावट हवामान किंवा बाजारभाव दाखवत नाही. सत्यापित डेटा स्रोत जोडल्यावरच डेटा दिसेल.",

        currentWeather:
            "सध्याचे हवामान",

        refresh:
            "रिफ्रेश",

        weatherUnavailable:
            "हवामान डेटा उपलब्ध नाही",

        weatherUnavailableDescription:
            "सध्या सत्यापित हवामान स्रोत जोडलेला नाही. कोणतेही बनावट हवामान मूल्य दाखवले जात नाही.",

        temperature:
            "तापमान",

        humidity:
            "आर्द्रता",

        windSpeed:
            "वाऱ्याचा वेग",

        rainChance:
            "पावसाची शक्यता",

        marketSubtitle:
            "जोडलेल्या सत्यापित स्रोतांमधील सध्याचे पीक बाजारभाव.",

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
            "सत्यापित बाजार डेटा स्रोत जोडलेला नाही. कोणतेही बनावट भाव दाखवले जात नाहीत.",

        comparisonSubtitle:
            "विक्री करण्यापूर्वी बाजारातील माहितीची तुलना करा.",

        dataUnavailable:
            "सत्यापित डेटा उपलब्ध नाही",

        cropSubtitle:
            "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",

        onion:
            "कांदा",

        wheat:
            "गहू",

        onionInfo:
            "कांदा लागवडीची माहिती येथे प्रदर्शित केली जाईल.",

        wheatInfo:
            "गहू लागवडीची माहिती येथे प्रदर्शित केली जाईल.",

        cultivationGuidance:
            "लागवड मार्गदर्शन",

        cropManagement:
            "पीक व्यवस्थापन",

        farmingPractices:
            "शेती पद्धती",

        cropHealthSubtitle:
            "AI सहाय्यित विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",

        uploadCropImage:
            "पीक / पानाचा फोटो अपलोड करा",

        uploadCropDescription:
            "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",

        chooseImage:
            "फोटो निवडा",

        analyzeCrop:
            "पिकाचे विश्लेषण करा",

        analysisNotConnected:
            "AI पीक विश्लेषण जोडलेले नाही",

        analysisNotConnectedDescription:
            "बनावट निदान दिले जाणार नाही. सत्यापित विश्लेषणासाठी crop-health AI सेवा जोडा.",

        schemesSubtitle:
            "शेतकऱ्यांसाठी सरकारी मदत आणि कृषी योजना.",

        pmKisanDescription:
            "शेतकरी सहाय्य योजनेची माहिती.",

        pmksyDescription:
            "सिंचन आणि जल व्यवस्थापन योजनेची माहिती.",

        cropInsurance:
            "पीक विमा",

        cropInsuranceDescription:
            "पीक विमा योजनेची माहिती.",

        learnMore:
            "अधिक माहिती",

        aiSubtitle:
            "शेतीशी संबंधित प्रश्न विचारा.",

        smartAssistant:
            "स्मार्ट शेतकरी सहाय्यक",

        aiNotConnected:
            "AI जोडलेले नाही",

        assistant:
            "सहाय्यक",

        aiUnavailable:
            "AI सेवा अद्याप जोडलेली नाही. मी बनावट उत्तर देणार नाही.",

        askQuestion:
            "शेतीशी संबंधित प्रश्न विचारा...",

        aiConnectionNote:
            "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्शन आवश्यक आहे.",

        voiceSubtitle:
            "आपल्या पसंतीच्या भाषेत बोला आणि ऐका.",

        voiceAssistantTitle:
            "स्मार्ट व्हॉइस सहाय्य",

        voiceDescription:
            "बोलण्यासाठी मायक्रोफोन वापरा. व्हॉइस ओळख सुविधा डिव्हाइसवर अवलंबून असते.",

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

        profileSubtitle:
            "आपली शेतकरी माहिती पहा आणि संपादित करा.",

        saveChanges:
            "बदल जतन करा",

        cancel:
            "रद्द करा",

        settingsSubtitle:
            "SmartAgri च्या पसंती व्यवस्थापित करा.",

        changeLanguageDescription:
            "आपली पसंतीची अॅप भाषा निवडा.",

        notifications:
            "सूचना",

        voiceSettingDescription:
            "व्हॉइस सहाय्य सुरू किंवा बंद करा.",

        notificationDescription:
            "अॅप सूचना सुरू किंवा बंद करा.",

        marketIntelligence:
            "बाजार माहिती",

        multilingualSupport:
            "बहुभाषिक सहाय्य",

        aboutDescription:
            "SmartAgri हे शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."
    }

};


/* =========================================================
   DOM HELPERS
========================================================= */

function $(id) {

    return document.getElementById(id);
}


function showMessage(
    element,
    message,
    type = "info"
) {

    if (!element) return;

    element.textContent = message;

    element.className =
        `message show ${type}`;
}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function translatePage() {

    const language =
        translations[selectedLanguage]
            ? selectedLanguage
            : "en";

    const dictionary =
        translations[language];


    document.documentElement.lang = language;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];
            }
        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                dictionary[key] !== undefined
            ) {

                element.placeholder =
                    dictionary[key];
            }
        });


    const dashboardLanguage =
        $("dashboardLanguage");

    const settingsLanguage =
        $("settingsLanguage");

    const registerLanguage =
        $("registerLanguage");

    const profileLanguage =
        $("profileLanguage");


    if (dashboardLanguage) {

        dashboardLanguage.value =
            language;
    }


    if (settingsLanguage) {

        settingsLanguage.value =
            language;
    }


    if (registerLanguage) {

        registerLanguage.value =
            language;
    }


    if (profileLanguage) {

        profileLanguage.value =
            language;
    }
}


function setLanguage(language) {

    if (!translations[language]) {

        return;
    }


    selectedLanguage = language;


    localStorage.setItem(
        "smartAgriLanguage",
        language
    );


    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.language === language
            );
        });


    const continueButton =
        $("continueLanguageBtn");

    if (continueButton) {

        continueButton.disabled = false;
    }


    translatePage();
}


/* =========================================================
   PAGE NAVIGATION
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
        $(screenId);

    if (screen) {

        screen.classList.add(
            "active-screen"
        );
    }


    const dashboard =
        $("dashboardPage");

    if (dashboard) {

        dashboard.classList.remove(
            "active-dashboard"
        );
    }
}


function showDashboard() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );
        });


    $("dashboardPage")
        .classList.add(
            "active-dashboard"
        );


    closeSideMenu();

    closeProfileMenu();

    updateConnectionStatus();

    loadProfile();

    showSection("dashboardSection");
}


/* =========================================================
   LANGUAGE PAGE EVENTS
========================================================= */

document
    .querySelectorAll(".language-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.language
                );

            }
        );

    });


$("continueLanguageBtn")
    .addEventListener(
        "click",
        () => {

            if (!selectedLanguage) {

                return;
            }

            showScreen("loginPage");

            translatePage();

        }
    );


$("changeLanguageFromLogin")
    .addEventListener(
        "click",
        () => {

            showScreen("languagePage");

            translatePage();

        }
    );


/* =========================================================
   AUTH PAGE NAVIGATION
========================================================= */

$("showRegisterBtn")
    .addEventListener(
        "click",
        () => {

            showScreen("registerPage");

            translatePage();

        }
    );


$("showLoginBtn")
    .addEventListener(
        "click",
        () => {

            showScreen("loginPage");

            translatePage();

        }
    );


/* =========================================================
   FIREBASE REGISTRATION
========================================================= */

$("registrationForm")
    .addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!firebaseReady) {

                showMessage(
                    $("registerMessage"),
                    "Firebase is not connected.",
                    "error"
                );

                return;
            }


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


                selectedLanguage =
                    language;

                localStorage.setItem(
                    "smartAgriLanguage",
                    language
                );


                currentUser = user;


                showDashboard();


                translatePage();


                showMessage(
                    $("profileMessage"),
                    "Account created successfully.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showMessage(
                    $("registerMessage"),
                    firebaseErrorMessage(error),
                    "error"
                );
            }

        }
    );


/* =========================================================
   FIREBASE LOGIN
========================================================= */

$("loginForm")
    .addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!firebaseReady) {

                showMessage(
                    $("loginMessage"),
                    "Firebase is not connected.",
                    "error"
                );

                return;
            }


            const email =
                $("loginEmail").value.trim();

            const password =
                $("loginPassword").value;


            try {

                const credential =
                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                currentUser =
                    credential.user;

                demoMode = false;


                showDashboard();

                translatePage();


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    $("loginMessage"),
                    firebaseErrorMessage(error),
                    "error"
                );
            }

        }
    );


/* =========================================================
   FORGOT PASSWORD
========================================================= */

$("forgotPasswordBtn")
    .addEventListener(
        "click",
        async () => {

            if (!firebaseReady) {

                showMessage(
                    $("loginMessage"),
                    "Firebase is not connected.",
                    "error"
                );

                return;
            }


            const email =
                $("loginEmail").value.trim();


            if (!email) {

                showMessage(
                    $("loginMessage"),
                    "Enter your email address first.",
                    "error"
                );

                return;
            }


            try {

                await auth
                    .sendPasswordResetEmail(
                        email
                    );


                showMessage(
                    $("loginMessage"),
                    "Password reset email sent.",
                    "success"
                );


            } catch (error) {

                showMessage(
                    $("loginMessage"),
                    firebaseErrorMessage(error),
                    "error"
                );
            }

        }
    );


/* =========================================================
   DEMO DASHBOARD
========================================================= */

$("demoBtn")
    .addEventListener(
        "click",
        () => {

            demoMode = true;

            currentUser = null;


            const demoProfile = {

                name: "Demo Farmer",

                email: "Demo mode",

                mobile: "—",

                village: "—",

                state: "Maharashtra",

                landArea: "—",

                preferredMarket: "—",

                preferredLanguage:
                    selectedLanguage || "en"

            };


            fillProfileUI(
                demoProfile
            );


            showDashboard();

            translatePage();

        }
    );


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

if (firebaseReady) {

    auth.onAuthStateChanged(
        async user => {

            if (user && !demoMode) {

                currentUser =
                    user;

                showDashboard();

                await loadProfile();

            }

        }
    );
}


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function firebaseErrorMessage(error) {

    const code =
        error && error.code
            ? error.code
            : "";


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
            "Incorrect email or password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later.",

        "auth/network-request-failed":
            "Network error. Please check your internet connection."

    };


    return messages[code]
        || "Something went wrong. Please try again.";
}


/* =========================================================
   HAMBURGER MENU
========================================================= */

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


function openSideMenu() {

    $("sideMenu")
        .classList.add("open");

    $("menuOverlay")
        .classList.add("show");
}


function closeSideMenu() {

    $("sideMenu")
        .classList.remove("open");

    $("menuOverlay")
        .classList.remove("show");
}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

document
    .querySelectorAll("[data-section]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                showSection(section);

                closeSideMenu();

            }
        );

    });


function showSection(sectionId) {

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


    document
        .querySelectorAll(".side-navigation button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === sectionId
            );

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PROFILE MENU
========================================================= */

$("profileButton")
    .addEventListener(
        "click",
        event => {

            event.stopPropagation();

            $("profileMenu")
                .classList.toggle("open");

        }
    );


document
    .querySelectorAll("[data-profile-section]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.profileSection
                );

                closeProfileMenu();

            }
        );

    });


document.addEventListener(
    "click",
    event => {

        const profileMenu =
            $("profileMenu");

        const profileButton =
            $("profileButton");


        if (
            profileMenu.classList.contains("open") &&
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            closeProfileMenu();

        }

    }
);


function closeProfileMenu() {

    $("profileMenu")
        .classList.remove("open");
}


/* =========================================================
   ONLINE / OFFLINE STATUS
========================================================= */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    const status =
        $("connectionStatus");

    const text =
        $("connectionText");

    const dashboardText =
        $("dashboardConnectionText");


    if (!status) return;


    status.classList.toggle(
        "online",
        online
    );

    status.classList.toggle(
        "offline",
        !online
    );


    if (text) {

        text.textContent =
            online
                ? "Online"
                : "Offline";
    }


    if (dashboardText) {

        dashboardText.textContent =
            online
                ? "Online"
                : "Offline";
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
   DASHBOARD LANGUAGE
========================================================= */

$("dashboardLanguage")
    .addEventListener(
        "change",
        event => {

            setLanguage(
                event.target.value
            );

        }
    );


$("settingsLanguage")
    .addEventListener(
        "change",
        async event => {

            const language =
                event.target.value;


            setLanguage(language);


            if (
                currentUser &&
                !demoMode
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

                } catch (error) {

                    console.error(
                        "Language update failed:",
                        error
                    );
                }

            }

        }
    );


/* =========================================================
   PROFILE LOADING
========================================================= */

async function loadProfile() {

    if (demoMode) {

        return;
    }


    if (!currentUser || !db) {

        return;
    }


    try {

        const snapshot =
            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .get();


        if (snapshot.exists) {

            const profile =
                snapshot.data();


            fillProfileUI(
                profile
            );


            if (
                profile.preferredLanguage &&
                translations[
                    profile.preferredLanguage
                ]
            ) {

                selectedLanguage =
                    profile.preferredLanguage;

                localStorage.setItem(
                    "smartAgriLanguage",
                    selectedLanguage
                );

                translatePage();
            }

        } else {

            const basicProfile = {

                name:
                    currentUser.displayName || "Farmer",

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


            fillProfileUI(
                basicProfile
            );
        }


    } catch (error) {

        console.error(
            "Profile loading failed:",
            error
        );

    }
}


/* =========================================================
   FILL PROFILE UI
========================================================= */

function fillProfileUI(profile) {

    const value = field =>
        profile[field] || "—";


    $("dashboardFarmerName")
        .textContent =
        value("name");


    $("summaryName")
        .textContent =
        value("name");


    $("summaryVillage")
        .textContent =
        value("village");


    $("summaryLand")
        .textContent =
        value("landArea");


    $("summaryMarket")
        .textContent =
        value("preferredMarket");


    $("profilePageName")
        .textContent =
        value("name");


    $("profilePageEmail")
        .textContent =
        value("email");


    $("profileName").value =
        profile.name || "";


    $("profileEmail").value =
        profile.email || "";


    $("profileMobile").value =
        profile.mobile || "";


    $("profileVillage").value =
        profile.village || "";


    $("profileState").value =
        profile.state || "";


    $("profileLandArea").value =
        profile.landArea || "";


    $("profileMarket").value =
        profile.preferredMarket || "";


    $("profileLanguage").value =
        profile.preferredLanguage || "en";


    $("profileName")
        .dataset.original =
        profile.name || "";

    $("profileMobile")
        .dataset.original =
        profile.mobile || "";

    $("profileVillage")
        .dataset.original =
        profile.village || "";

    $("profileState")
        .dataset.original =
        profile.state || "";

    $("profileLandArea")
        .dataset.original =
        profile.landArea || "";

    $("profileMarket")
        .dataset.original =
        profile.preferredMarket || "";

    $("profileLanguage")
        .dataset.original =
        profile.preferredLanguage || "en";


    $("profileEmail")
        .disabled = true;


    $("profileName")
        .disabled = true;


    $("profileMobile")
        .disabled = true;


    $("profileVillage")
        .disabled = true;


    $("profileState")
        .disabled = true;


    $("profileLandArea")
        .disabled = true;


    $("profileMarket")
        .disabled = true;


    $("profileLanguage")
        .disabled = true;


    $("profileEditActions")
        .classList.add("hidden");


    $("profileButton")
        .querySelector(".profile-name-header")
        .textContent =
        profile.name || "Farmer";
}


/* =========================================================
   EDIT PROFILE
========================================================= */

$("editProfileBtn")
    .addEventListener(
        "click",
        () => {

            if (demoMode) {

                showMessage(
                    $("profileMessage"),
                    "Profile editing requires a registered account.",
                    "info"
                );

                return;
            }


            editingProfile = true;


            $("profileName").disabled = false;

            $("profileMobile").disabled = false;

            $("profileVillage").disabled = false;

            $("profileState").disabled = false;

            $("profileLandArea").disabled = false;

            $("profileMarket").disabled = false;

            $("profileLanguage").disabled = false;


            $("profileEditActions")
                .classList.remove("hidden");

        }
    );


$("cancelProfileEditBtn")
    .addEventListener(
        "click",
        async () => {

            editingProfile = false;

            await loadProfile();

        }
    );


/* =========================================================
   SAVE PROFILE
========================================================= */

$("profileForm")
    .addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!currentUser || demoMode) {

                return;
            }


            try {

                const updatedProfile = {

                    name:
                        $("profileName")
                            .value.trim(),

                    mobile:
                        $("profileMobile")
                            .value.trim(),

                    village:
                        $("profileVillage")
                            .value.trim(),

                    state:
                        $("profileState")
                            .value.trim(),

                    landArea:
                        $("profileLandArea")
                            .value.trim(),

                    preferredMarket:
                        $("profileMarket")
                            .value,

                    preferredLanguage:
                        $("profileLanguage")
                            .value,

                    updatedAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                };


                await db
                    .collection("farmers")
                    .doc(currentUser.uid)
                    .update(
                        updatedProfile
                    );


                selectedLanguage =
                    updatedProfile.preferredLanguage;


                localStorage.setItem(
                    "smartAgriLanguage",
                    selectedLanguage
                );


                editingProfile = false;


                await loadProfile();

                translatePage();


                showMessage(
                    $("profileMessage"),
                    "Profile updated successfully.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Profile update failed:",
                    error
                );


                showMessage(
                    $("profileMessage"),
                    "Unable to save profile.",
                    "error"
                );
            }

        }
    );


/* =========================================================
   CROP IMAGE
========================================================= */

$("cropImageInput")
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function(e) {

                    $("cropImagePreview")
                        .src =
                        e.target.result;


                    $("imagePreviewContainer")
                        .classList.remove(
                            "hidden"
                        );


                    $("analyzeCropBtn")
                        .disabled = false;

                };


            reader.readAsDataURL(file);

        }
    );


/* =========================================================
   CROP ANALYSIS
========================================================= */

$("analyzeCropBtn")
    .addEventListener(
        "click",
        () => {

            const result =
                $("cropAnalysisResult");


            result.innerHTML = `

                <strong>
                    ${translations[selectedLanguage || "en"]
                        .analysisNotConnected}
                </strong>

                <p>
                    ${translations[selectedLanguage || "en"]
                        .analysisNotConnectedDescription}
                </p>

            `;

        }
    );


/* =========================================================
   WEATHER REFRESH
========================================================= */

$("refreshWeatherBtn")
    .addEventListener(
        "click",
        () => {

            /*
             * Deliberately no fake weather data.
             *
             * A verified weather API/backend should be
             * connected here later.
             */

            const emptyState =
                $("weatherEmptyState");


            emptyState.classList.remove(
                "hidden"
            );


            $("weatherData")
                .classList.add(
                    "hidden"
                );

        }
    );


/* =========================================================
   MARKET CROP SELECTOR
========================================================= */

$("cropPriceSelector")
    .addEventListener(
        "change",
        () => {

            /*
             * No fallback market prices.
             *
             * Real verified market API data should
             * populate #marketTableBody.
             */

            console.log(
                "Selected crop:",
                $("cropPriceSelector").value
            );

        }
    );


/* =========================================================
   GOVERNMENT SCHEME BUTTONS
========================================================= */

document
    .querySelectorAll(".scheme-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const scheme =
                    button.dataset.scheme;


                showMessage(
                    $("schemeMessage"),
                    `${scheme}: verified scheme details should be connected to an official government source.`,
                    "info"
                );

            }
        );

    });


/* =========================================================
   AI ASSISTANT
========================================================= */

$("aiForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                $("aiInput");

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
             * IMPORTANT:
             * No fake AI answer is generated.
             *
             * A backend / AI API must be connected here.
             */

            addChatMessage(
                translations[
                    selectedLanguage || "en"
                ].aiUnavailable,
                "assistant"
            );

        }
    );


function addChatMessage(
    message,
    sender
) {

    const container =
        $("chatMessages");


    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        "chat-message";


    const avatar =
        sender === "assistant"
            ? "🤖"
            : "👨‍🌾";


    const name =
        sender === "assistant"
            ? translations[
                selectedLanguage || "en"
              ].assistant
            : "You";


    messageDiv.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div>

            <strong>
                ${escapeHtml(name)}
            </strong>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>
    `;


    container.appendChild(
        messageDiv
    );


    container.scrollTop =
        container.scrollHeight;
}


/* =========================================================
   VOICE ASSISTANCE
========================================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        true;


    recognition.onstart =
        () => {

            voiceListening = true;


            $("startVoiceBtn")
                .classList.add(
                    "hidden"
                );


            $("stopVoiceBtn")
                .classList.remove(
                    "hidden"
                );

        };


    recognition.onresult =
        event => {

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


            $("voiceInput")
                .value =
                transcript;

        };


    recognition.onerror =
        event => {

            console.error(
                "Voice recognition error:",
                event.error
            );

        };


    recognition.onend =
        () => {

            voiceListening = false;


            $("startVoiceBtn")
                .classList.remove(
                    "hidden"
                );


            $("stopVoiceBtn")
                .classList.add(
                    "hidden"
                );


            const text =
                $("voiceInput")
                    .value.trim();


            if (text) {

                speakText(
                    translations[
                        selectedLanguage || "en"
                    ].voiceReady
                );

            }

        };

} else {

    console.warn(
        "Speech recognition is not supported by this browser."
    );
}


/* =========================================================
   START VOICE
========================================================= */

$("startVoiceBtn")
    .addEventListener(
        "click",
        () => {

            if (!recognition) {

                $("voiceResponse")
                    .textContent =
                    "Voice recognition is not supported by this browser.";

                return;
            }


            const languageMap = {

                en: "en-IN",

                hi: "hi-IN",

                mr: "mr-IN"

            };


            recognition.lang =
                languageMap[
                    selectedLanguage || "en"
                ];


            $("voiceInput")
                .value = "";


            recognition.start();

        }
    );


/* =========================================================
   STOP VOICE
========================================================= */

$("stopVoiceBtn")
    .addEventListener(
        "click",
        () => {

            if (
                recognition &&
                voiceListening
            ) {

                recognition.stop();

            }

        }
    );


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;
    }


    const languageMap = {

        en: "en-IN",

        hi: "hi-IN",

        mr: "mr-IN"

    };


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        languageMap[
            selectedLanguage || "en"
        ];


    window.speechSynthesis.speak(
        utterance
    );
}


/* =========================================================
   VOICE SETTING
========================================================= */

$("voiceSetting")
    .addEventListener(
        "change",
        event => {

            const enabled =
                event.target.checked;


            if (!enabled) {

                if (
                    recognition &&
                    voiceListening
                ) {

                    recognition.stop();
                }

                window.speechSynthesis.cancel();
            }

        }
    );


/* =========================================================
   NOTIFICATION SETTING
========================================================= */

$("notificationSetting")
    .addEventListener(
        "change",
        event => {

            console.log(
                "Notifications:",
                event.target.checked
            );

        }
    );


/* =========================================================
   LOGOUT
========================================================= */

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


async function logoutUser() {

    demoMode = false;

    currentUser = null;


    if (firebaseReady) {

        try {

            await auth.signOut();

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );
        }

    }


    closeSideMenu();

    closeProfileMenu();


    showScreen("loginPage");

    translatePage();


    $("loginForm").reset();


    showMessage(
        $("loginMessage"),
        "You have been logged out.",
        "success"
    );
}


/* =========================================================
   HTML ESCAPE
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

function initializeApp() {

    if (selectedLanguage) {

        setLanguage(
            selectedLanguage
        );

    } else {

        showScreen(
            "languagePage"
        );

        translatePage();
    }


    updateConnectionStatus();


    /*
     * Keep the app on the login/language flow
     * until Firebase reports an authenticated user.
     */

    $("dashboardPage")
        .classList.remove(
            "active-dashboard"
        );
}


/* =========================================================
   START
========================================================= */

initializeApp();

console.log(
    "SmartAgri Kopargaon loaded successfully."
);
