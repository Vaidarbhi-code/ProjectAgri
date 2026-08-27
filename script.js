/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND SCRIPT
   Firebase + Language + Dashboard + Weather + Mandi
   Plant.id + OpenAI + Profile + Voice
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FIREBASE CONFIG
    ===================================================== */

    const firebaseConfig = {
        apiKey: "AIzaSyAuIbj5ajXbSu1_txFSJSLViAGcc1DBgHY",
        authDomain: "kopargaonproject.firebaseapp.com",
        projectId: "kopargaonproject",
        storageBucket: "kopargaonproject.firebasestorage.app",
        messagingSenderId: "274707924421",
        appId: "1:274707924421:web:6808cf0bede74c29e437ac",
        measurementId: "G-DJ93MTY319"
    };

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }

    const auth = firebase.auth();
    const db = firebase.firestore();


    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let selectedLanguage =
        localStorage.getItem("smartagri_language") || "en";

    let currentUser = null;
    let farmerData = null;
    let recognition = null;
    let isListening = false;


    /* =====================================================
       API BASE
       IMPORTANT:
       If frontend and Flask are served from same server,
       keep this as empty string.
    ===================================================== */

    const API_BASE = "";


    /* =====================================================
       ELEMENT HELPER
    ===================================================== */

    function $(id) {
        return document.getElementById(id);
    }


    /* =====================================================
       SCREEN NAVIGATION
    ===================================================== */

    function showScreen(id) {

        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active-screen");
        });

        const target = $(id);

        if (target) {
            target.classList.add("active-screen");
        }
    }


    /* =====================================================
       APP SECTION NAVIGATION
    ===================================================== */

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

        if (sectionId === "weatherSection") {
            loadWeather();
        }

        if (sectionId === "marketSection") {
            loadMarket();
        }

        if (sectionId === "comparisonSection") {
            loadMarketComparison();
        }
    }


    /* =====================================================
       LANGUAGE TRANSLATIONS
    ===================================================== */

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
            liveDataDescription: "Only verified connected data is displayed.",

            weatherSubtitle: "Local weather conditions for farming decisions.",
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
            onionInfo: "Onion cultivation information.",
            wheatInfo: "Wheat cultivation information.",
            cultivationGuidance: "Cultivation Guidance",
            cropManagement: "Crop Management",
            farmingPractices: "Farming Practices",

            cropHealthSubtitle:
                "Upload a crop image for AI-assisted analysis.",
            uploadCropImage: "Upload Crop / Leaf Image",
            uploadCropDescription:
                "Select an image for crop health analysis.",
            chooseImage: "Choose Image",
            analyzeCrop: "Analyze Crop",

            analysisNotConnected: "AI crop analysis is not connected",
            analysisNotConnectedDescription:
                "Upload an image and connect the crop-health service.",

            schemesSubtitle:
                "Farmer support and government agricultural programs.",
            pmKisanDescription:
                "Official PM-KISAN farmer support information.",
            pmksyDescription:
                "Official irrigation and water-management information.",
            cropInsurance: "Crop Insurance",
            cropInsuranceDescription:
                "Official Pradhan Mantri Fasal Bima Yojana information.",
            learnMore: "Learn More",

            aiSubtitle: "Ask farming-related questions.",
            smartAssistant: "Smart Farmer Assistant",
            aiNotConnected: "AI Not Connected",
            assistant: "Assistant",
            aiUnavailable: "Ask me a farming question.",
            askQuestion: "Ask a farming question...",
            aiConnectionNote:
                "AI responses are provided by the connected backend.",

            voiceSubtitle:
                "Speak and listen in your preferred language.",
            voiceAssistantTitle: "Smart Voice Assistance",
            voiceDescription:
                "Speak using your device microphone.",
            startVoice: "Start Voice Assistance",
            stopVoice: "Stop Listening",
            voiceInput: "Voice Input",
            voiceResponse: "Voice Response",
            voiceReady: "Voice assistance is ready.",
            voiceInputPlaceholder:
                "Voice input will appear here...",

            profileSubtitle:
                "View and edit your farmer information.",
            saveChanges: "Save Changes",
            cancel: "Cancel",
            myProfile: "My Profile",

            settingsSubtitle:
                "Manage your SmartAgri preferences.",
            changeLanguageDescription:
                "Select your preferred application language.",
            voiceSettingDescription:
                "Enable or disable voice assistance.",
            notifications: "Notifications",
            notificationDescription:
                "Enable or disable application notifications.",

            aboutDescription:
                "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance.",
            marketIntelligence: "Market Intelligence",
            multilingualSupport: "Multilingual Support"
        },


        hi: {

            appName: "स्मार्टएग्री",
            appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",

            chooseLanguage: "अपनी भाषा चुनें",
            languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
            continue: "जारी रखें",

            loginTitle: "किसान लॉगिन",
            loginSubtitle: "SmartAgri में प्रवेश करें",

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
            voiceAssistance: "वॉइस सहायता",
            farmerProfile: "किसान प्रोफ़ाइल",
            settings: "सेटिंग्स",
            about: "SmartAgri के बारे में",
            logout: "लॉगआउट",

            welcome: "स्वागत है",
            dashboardSubtitle: "आपकी कृषि जानकारी एक ही स्थान पर।",
            connectionStatus: "कनेक्शन स्थिति",
            online: "ऑनलाइन",
            offline: "ऑफलाइन",

            profileSummary: "आपकी पंजीकृत जानकारी",
            editProfile: "प्रोफ़ाइल संपादित करें",
            quickActions: "त्वरित कार्य",
            quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",
            liveDataTitle: "लाइव डेटा",
            liveDataDescription:
                "केवल सत्यापित कनेक्टेड डेटा प्रदर्शित किया जाता है।",

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
                "कनेक्टेड सत्यापित स्रोतों से वर्तमान फसल बाजार भाव।",
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
                "बेचने से पहले बाजार की जानकारी की तुलना करें.",
            dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

            cropSubtitle:
                "फसल उत्पादन और प्रबंधन संबंधी मार्गदर्शन।",
            onionInfo: "प्याज की खेती की जानकारी।",
            wheatInfo: "गेहूं की खेती की जानकारी।",
            cultivationGuidance: "खेती मार्गदर्शन",
            cropManagement: "फसल प्रबंधन",
            farmingPractices: "कृषि पद्धतियां",

            cropHealthSubtitle:
                "AI आधारित विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",
            uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
            uploadCropDescription:
                "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",
            chooseImage: "तस्वीर चुनें",
            analyzeCrop: "फसल का विश्लेषण करें",

            analysisNotConnected:
                "AI फसल विश्लेषण कनेक्ट नहीं है",
            analysisNotConnectedDescription:
                "तस्वीर अपलोड करें और फसल स्वास्थ्य सेवा से कनेक्ट करें।",

            schemesSubtitle:
                "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",
            pmKisanDescription:
                "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
            pmksyDescription:
                "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
            cropInsurance: "फसल बीमा",
            cropInsuranceDescription:
                "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",
            learnMore: "और जानें",

            aiSubtitle: "कृषि से जुड़े प्रश्न पूछें।",
            smartAssistant: "स्मार्ट किसान सहायक",
            aiNotConnected: "AI कनेक्ट नहीं है",
            assistant: "सहायक",
            aiUnavailable: "मुझसे कृषि संबंधी प्रश्न पूछें।",
            askQuestion: "कृषि संबंधी प्रश्न पूछें...",
            aiConnectionNote:
                "AI उत्तर कनेक्टेड बैकएंड द्वारा दिए जाते हैं।",

            voiceSubtitle:
                "अपनी पसंदीदा भाषा में बोलें और सुनें।",
            voiceAssistantTitle: "स्मार्ट वॉइस सहायता",
            voiceDescription:
                "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",
            startVoice: "वॉइस सहायता शुरू करें",
            stopVoice: "सुनना बंद करें",
            voiceInput: "वॉइस इनपुट",
            voiceResponse: "वॉइस उत्तर",
            voiceReady: "वॉइस सहायता तैयार है।",
            voiceInputPlaceholder:
                "वॉइस इनपुट यहां दिखाई देगा...",

            profileSubtitle:
                "अपनी किसान जानकारी देखें और संपादित करें।",
            saveChanges: "परिवर्तन सहेजें",
            cancel: "रद्द करें",
            myProfile: "मेरी प्रोफ़ाइल",

            settingsSubtitle:
                "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
            changeLanguageDescription:
                "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
            voiceSettingDescription:
                "वॉइस सहायता चालू या बंद करें।",
            notifications: "सूचनाएं",
            notificationDescription:
                "एप्लिकेशन सूचनाएं चालू या बंद करें।",

            aboutDescription:
                "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।",
            marketIntelligence: "बाजार जानकारी",
            multilingualSupport: "बहुभाषी सहायता"
        },


        mr: {

            appName: "स्मार्टअ‍ॅग्री",
            appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",

            chooseLanguage: "तुमची भाषा निवडा",
            languageDescription:
                "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",
            continue: "पुढे जा",

            loginTitle: "शेतकरी लॉगिन",
            loginSubtitle: "SmartAgri मध्ये लॉगिन करा",

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
            landArea: "जमिनीचे क्षेत्रफळ",
            preferredMarket: "पसंतीचे बाजार",
            selectMarket: "बाजार निवडा",
            kopargaonMarket: "कोपरगाव APMC",
            yeolaMarket: "येवला बाजार",
            shirdiMarket: "शिर्डी बाजार",
            preferredLanguage: "पसंतीची भाषा",
            createAccount: "खाते तयार करा",
            alreadyAccount: "आधीच खाते आहे?",

            dashboard: "डॅशबोर्ड",
            weather: "हवामान",
            marketPrices: "बाजार भाव",
            marketComparison: "बाजार तुलना",
            cropInformation: "पीक माहिती",
            cropHealth: "पीक आरोग्य",
            governmentSchemes: "सरकारी योजना",
            aiAssistant: "AI सहाय्यक",
            voiceAssistance: "व्हॉइस सहाय्य",
            farmerProfile: "शेतकरी प्रोफाइल",
            settings: "सेटिंग्ज",
            about: "SmartAgri बद्दल",
            logout: "लॉगआउट",

            welcome: "स्वागत",
            dashboardSubtitle:
                "तुमची शेतीविषयक माहिती एका ठिकाणी.",
            connectionStatus: "कनेक्शन स्थिती",
            online: "ऑनलाइन",
            offline: "ऑफलाइन",

            profileSummary: "तुमची नोंदणीकृत माहिती",
            editProfile: "प्रोफाइल संपादित करा",
            quickActions: "जलद कृती",
            quickActionsSubtitle:
                "महत्त्वाची शेती साधने पटकन वापरा.",
            liveDataTitle: "लाइव्ह डेटा",
            liveDataDescription:
                "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

            weatherSubtitle:
                "शेतीच्या निर्णयांसाठी स्थानिक हवामान माहिती.",
            currentWeather: "सध्याचे हवामान",
            refresh: "रिफ्रेश",
            temperature: "तापमान",
            humidity: "आर्द्रता",
            windSpeed: "वाऱ्याचा वेग",
            rainChance: "पावसाची शक्यता",
            weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
            weatherUnavailableDescription:
                "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

            marketSubtitle:
                "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे बाजार भाव.",
            marketPriceTable: "बाजार भाव तक्ता",
            onion: "कांदा",
            wheat: "गहू",
            market: "बाजार",
            crop: "पीक",
            price: "भाव",
            date: "तारीख",

            marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
            marketDataUnavailableDescription:
                "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",

            comparisonSubtitle:
                "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",
            dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

            cropSubtitle:
                "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
            onionInfo: "कांदा लागवडीची माहिती.",
            wheatInfo: "गहू लागवडीची माहिती.",
            cultivationGuidance: "लागवड मार्गदर्शन",
            cropManagement: "पीक व्यवस्थापन",
            farmingPractices: "शेती पद्धती",

            cropHealthSubtitle:
                "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",
            uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
            uploadCropDescription:
                "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",
            chooseImage: "फोटो निवडा",
            analyzeCrop: "पिकाचे विश्लेषण करा",

            analysisNotConnected:
                "AI पीक विश्लेषण कनेक्ट केलेले नाही",
            analysisNotConnectedDescription:
                "फोटो अपलोड करा आणि पीक आरोग्य सेवा कनेक्ट करा.",

            schemesSubtitle:
                "शेतकऱ्यांसाठी सरकारी मदत आणि कृषी योजना.",
            pmKisanDescription:
                "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
            pmksyDescription:
                "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",
            cropInsurance: "पीक विमा",
            cropInsuranceDescription:
                "प्रधानमंत्री फसल बीमा योजनेची अधिकृत माहिती.",
            learnMore: "अधिक जाणून घ्या",

            aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
            smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
            aiNotConnected: "AI कनेक्ट केलेले नाही",
            assistant: "सहाय्यक",
            aiUnavailable:
                "मला शेतीशी संबंधित प्रश्न विचारा.",
            askQuestion:
                "शेतीशी संबंधित प्रश्न विचारा...",
            aiConnectionNote:
                "AI उत्तरे कनेक्टेड बॅकएंडद्वारे दिली जातात.",

            voiceSubtitle:
                "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",
            voiceAssistantTitle: "स्मार्ट व्हॉइस सहाय्य",
            voiceDescription:
                "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",
            startVoice: "व्हॉइस सहाय्य सुरू करा",
            stopVoice: "ऐकणे थांबवा",
            voiceInput: "व्हॉइस इनपुट",
            voiceResponse: "व्हॉइस उत्तर",
            voiceReady: "व्हॉइस सहाय्य तयार आहे.",
            voiceInputPlaceholder:
                "व्हॉइस इनपुट येथे दिसेल...",

            profileSubtitle:
                "तुमची शेतकरी माहिती पहा आणि संपादित करा.",
            saveChanges: "बदल जतन करा",
            cancel: "रद्द करा",
            myProfile: "माझे प्रोफाइल",

            settingsSubtitle:
                "SmartAgri च्या पसंती व्यवस्थापित करा.",
            changeLanguageDescription:
                "तुमची पसंतीची अॅप भाषा निवडा.",
            voiceSettingDescription:
                "व्हॉइस सहाय्य सुरू किंवा बंद करा.",
            notifications: "सूचना",
            notificationDescription:
                "अॅप सूचना सुरू किंवा बंद करा.",

            aboutDescription:
                "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे.",
            marketIntelligence: "बाजार माहिती",
            multilingualSupport: "बहुभाषिक सहाय्य"
        }

    };


    /* =====================================================
       APPLY LANGUAGE
    ===================================================== */

    function applyLanguage(language) {

        if (!translations[language]) {
            language = "en";
        }

        selectedLanguage = language;

        localStorage.setItem(
            "smartagri_language",
            language
        );

        document.documentElement.lang = language;

        const dictionary =
            translations[language];

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


        /* Header/settings/profile language */

        const selectors = [
            $("dashboardLanguage"),
            $("settingsLanguage"),
            $("profileLanguage"),
            $("registerLanguage")
        ];

        selectors.forEach(select => {

            if (select) {
                select.value = language;
            }

        });


        /*
         * Update the crop-information modal
         * because its contents are generated separately.
         */

        updateCropInformationLanguage();

        updateVoiceLanguage();

    }


    /* =====================================================
       LANGUAGE PAGE
    ===================================================== */

    const languageButtons =
        document.querySelectorAll(
            ".language-option"
        );

    const continueLanguageBtn =
        $("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                languageButtons.forEach(btn => {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");

                selectedLanguage =
                    button.getAttribute(
                        "data-language"
                    );

                localStorage.setItem(
                    "smartagri_language",
                    selectedLanguage
                );

                if (continueLanguageBtn) {
                    continueLanguageBtn.disabled = false;
                }

            }
        );

    });


    if (continueLanguageBtn) {

        continueLanguageBtn.addEventListener(
            "click",
            () => {

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


    /* =====================================================
       RESTORE LANGUAGE SELECTION
    ===================================================== */

    if (selectedLanguage) {

        const selectedButton =
            document.querySelector(
                `.language-option[data-language="${selectedLanguage}"]`
            );

        if (selectedButton) {

            selectedButton.classList.add(
                "selected"
            );

            if (continueLanguageBtn) {
                continueLanguageBtn.disabled = false;
            }

        }

    }

    applyLanguage(selectedLanguage);


    /* =====================================================
       LOGIN / REGISTER NAVIGATION
    ===================================================== */

    const showRegisterBtn =
        $("showRegisterBtn");

    const showLoginBtn =
        $("showLoginBtn");

    if (showRegisterBtn) {

        showRegisterBtn.addEventListener(
            "click",
            () => showScreen("registerPage")
        );

    }

    if (showLoginBtn) {

        showLoginBtn.addEventListener(
            "click",
            () => showScreen("loginPage")
        );

    }


    const changeLanguageFromLogin =
        $("changeLanguageFromLogin");

    if (changeLanguageFromLogin) {

        changeLanguageFromLogin.addEventListener(
            "click",
            () => showScreen("languagePage")
        );

    }


    /* =====================================================
       FIREBASE REGISTRATION
    ===================================================== */

    const registrationForm =
        $("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const message =
                    $("registerMessage");

                try {

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


                    if (message) {
                        message.textContent =
                            "Creating account...";
                    }


                    const result =
                        await auth.createUserWithEmailAndPassword(
                            email,
                            password
                        );


                    const user =
                        result.user;


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
                            preferredMarket: market,
                            language,

                            createdAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        });


                    localStorage.setItem(
                        "smartagri_language",
                        language
                    );

                    applyLanguage(language);


                    if (message) {

                        message.textContent =
                            "Account created successfully.";

                    }

                    await loadFarmerProfile(
                        user
                    );

                    showScreen(
                        "dashboardPage"
                    );

                    initializeDashboard();

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );

                    if (message) {
                        message.textContent =
                            firebaseErrorMessage(
                                error
                            );
                    }

                }

            }
        );

    }


    /* =====================================================
       FIREBASE LOGIN
    ===================================================== */

    const loginForm =
        $("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const message =
                    $("loginMessage");

                try {

                    const email =
                        $("loginEmail").value.trim();

                    const password =
                        $("loginPassword").value;


                    if (message) {
                        message.textContent =
                            "Logging in...";
                    }


                    const result =
                        await auth.signInWithEmailAndPassword(
                            email,
                            password
                        );


                    await loadFarmerProfile(
                        result.user
                    );


                    if (farmerData &&
                        farmerData.language) {

                        applyLanguage(
                            farmerData.language
                        );

                    }


                    showScreen(
                        "dashboardPage"
                    );

                    initializeDashboard();


                } catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );

                    if (message) {

                        message.textContent =
                            firebaseErrorMessage(
                                error
                            );

                    }

                }

            }
        );

    }


    /* =====================================================
       FIREBASE AUTH STATE
    ===================================================== */

    auth.onAuthStateChanged(
        async user => {

            currentUser = user;

            if (user) {

                try {

                    await loadFarmerProfile(
                        user
                    );

                    showScreen(
                        "dashboardPage"
                    );

                    initializeDashboard();

                } catch (error) {

                    console.error(
                        "Profile loading error:",
                        error
                    );

                }

            }

        }
    );


    /* =====================================================
       FIREBASE ERROR MESSAGES
    ===================================================== */

    function firebaseErrorMessage(error) {

        const code =
            error && error.code
                ? error.code
                : "";

        switch (code) {

            case "auth/email-already-in-use":
                return "This email is already registered.";

            case "auth/invalid-email":
                return "Please enter a valid email address.";

            case "auth/weak-password":
                return "Password must be at least 6 characters.";

            case "auth/user-not-found":
                return "No account was found with this email.";

            case "auth/wrong-password":
                return "Incorrect password.";

            case "auth/invalid-credential":
                return "Invalid email or password.";

            default:
                return error.message ||
                    "An authentication error occurred.";

        }

    }


    /* =====================================================
       LOAD FARMER PROFILE
    ===================================================== */

    async function loadFarmerProfile(user) {

        currentUser = user;

        const snapshot =
            await db
                .collection("farmers")
                .doc(user.uid)
                .get();


        if (snapshot.exists) {

            farmerData =
                snapshot.data();

        } else {

            farmerData = {

                name:
                    user.displayName || "",

                email:
                    user.email || "",

                language:
                    selectedLanguage

            };

        }


        populateProfile();

    }


    /* =====================================================
       POPULATE PROFILE
    ===================================================== */

    function populateProfile() {

        if (!farmerData) {
            return;
        }


        setValue(
            "headerFarmerName",
            farmerData.name || "Farmer"
        );

        setValue(
            "dashboardFarmerName",
            farmerData.name || "Farmer"
        );

        setValue(
            "summaryName",
            farmerData.name || "—"
        );

        setValue(
            "summaryVillage",
            farmerData.village || "—"
        );

        setValue(
            "summaryLand",
            farmerData.landArea || "—"
        );

        setValue(
            "summaryMarket",
            farmerData.preferredMarket || "—"
        );


        setValue(
            "profilePageName",
            farmerData.name || "—"
        );

        setValue(
            "profilePageEmail",
            farmerData.email ||
            currentUser?.email ||
            "—"
        );


        setInput(
            "profileName",
            farmerData.name
        );

        setInput(
            "profileEmail",
            farmerData.email ||
            currentUser?.email
        );

        setInput(
            "profileMobile",
            farmerData.mobile
        );

        setInput(
            "profileVillage",
            farmerData.village
        );

        setInput(
            "profileState",
            farmerData.state
        );

        setInput(
            "profileLandArea",
            farmerData.landArea
        );


        if ($("profileMarket")) {

            $("profileMarket").value =
                farmerData.preferredMarket || "";

        }


        if ($("profileLanguage")) {

            $("profileLanguage").value =
                farmerData.language || "en";

        }


        if ($("dashboardLanguage")) {

            $("dashboardLanguage").value =
                farmerData.language || selectedLanguage;

        }


        if ($("settingsLanguage")) {

            $("settingsLanguage").value =
                farmerData.language || selectedLanguage;

        }

    }


    function setValue(id, value) {

        const element = $(id);

        if (element) {
            element.textContent =
                value ?? "—";
        }

    }


    function setInput(id, value) {

        const element = $(id);

        if (element) {
            element.value =
                value || "";
        }

    }


    /* =====================================================
       DEMO DASHBOARD
    ===================================================== */

    const demoBtn =
        $("demoBtn");

    if (demoBtn) {

        demoBtn.addEventListener(
            "click",
            () => {

                farmerData = {

                    name: "Demo Farmer",
                    email: "demo@smartagri.local",
                    mobile: "",
                    village: "Kopargaon",
                    state: "Maharashtra",
                    landArea: "",
                    preferredMarket: "Kopargaon APMC",
                    language: selectedLanguage

                };

                populateProfile();

                showScreen(
                    "dashboardPage"
                );

                initializeDashboard();

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    async function logout() {

        try {

            await auth.signOut();

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

        currentUser = null;
        farmerData = null;

        showScreen("loginPage");

    }


    const sideLogoutBtn =
        $("sideLogoutBtn");

    const profileLogoutBtn =
        $("profileLogoutBtn");


    if (sideLogoutBtn) {
        sideLogoutBtn.addEventListener(
            "click",
            logout
        );
    }

    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener(
            "click",
            logout
        );
    }


    /* =====================================================
       SIDE MENU
    ===================================================== */

    const hamburgerBtn =
        $("hamburgerBtn");

    const closeMenuBtn =
        $("closeMenuBtn");

    const menuOverlay =
        $("menuOverlay");


    function openSideMenu() {

        const menu =
            $("sideMenu");

        if (menu) {
            menu.classList.add("open");
        }

        if (menuOverlay) {
            menuOverlay.classList.add("active");
        }

    }


    function closeSideMenu() {

        const menu =
            $("sideMenu");

        if (menu) {
            menu.classList.remove("open");
        }

        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }

    }


    if (hamburgerBtn) {
        hamburgerBtn.addEventListener(
            "click",
            openSideMenu
        );
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener(
            "click",
            closeSideMenu
        );
    }

    if (menuOverlay) {
        menuOverlay.addEventListener(
            "click",
            closeSideMenu
        );
    }


    /* =====================================================
       NAVIGATION BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.getAttribute(
                            "data-section"
                        );

                    if (section) {
                        showSection(section);
                    }

                }
            );

        });


    /* =====================================================
       PROFILE MENU
    ===================================================== */

    const profileButton =
        $("profileButton");

    const profileMenu =
        $("profileMenu");


    function closeProfileMenu() {

        if (profileMenu) {
            profileMenu.classList.remove(
                "active"
            );
        }

    }


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (profileMenu) {

                    profileMenu.classList.toggle(
                        "active"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                profileMenu &&
                !profileMenu.contains(event.target) &&
                event.target !== profileButton
            ) {

                closeProfileMenu();

            }

        }
    );


    document
        .querySelectorAll(
            "[data-profile-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.getAttribute(
                            "data-profile-section"
                        );

                    showSection(section);

                }
            );

        });


    /* =====================================================
       LANGUAGE SELECTORS
    ===================================================== */

    [
        "dashboardLanguage",
        "settingsLanguage",
        "profileLanguage"
    ].forEach(id => {

        const select = $(id);

        if (!select) {
            return;
        }

        select.addEventListener(
            "change",
            async () => {

                const language =
                    select.value;

                applyLanguage(language);

                if (
                    farmerData &&
                    currentUser
                ) {

                    farmerData.language =
                        language;

                    try {

                        await db
                            .collection("farmers")
                            .doc(currentUser.uid)
                            .set(
                                {
                                    language
                                },
                                {
                                    merge: true
                                }
                            );

                    } catch (error) {

                        console.error(
                            "Language save error:",
                            error
                        );

                    }

                }

            }
        );

    });


    /* =====================================================
       WEATHER
    ===================================================== */

    async function loadWeather() {

        const loading =
            $("weatherLoading");

        const errorBox =
            $("weatherError");

        const dataBox =
            $("weatherData");

        const empty =
            $("weatherEmptyState");


        if (loading) {
            loading.classList.remove("hidden");
        }

        if (errorBox) {
            errorBox.classList.add("hidden");
            errorBox.textContent = "";
        }


        try {

            const response =
                await fetch(
                    `${API_BASE}/api/weather`,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Weather API returned ${response.status}`
                );

            }


            const data =
                await response.json();


            console.log(
                "Weather response:",
                data
            );


            const current =
                data.current || data.weather?.current || {};


            const temperature =
                current.temperature_c ??
                current.temperature ??
                current.temperature_2m;


            const humidity =
                current.humidity_pct ??
                current.humidity ??
                current.relative_humidity_2m;


            const wind =
                current.wind_speed_kmh ??
                current.wind_speed ??
                current.wind_speed_10m;


            const rain =
                current.rain_probability_pct ??
                current.rain_probability ??
                current.precipitation_probability ??
                current.precipitation ??
                0;


            if (
                temperature === undefined &&
                humidity === undefined &&
                wind === undefined
            ) {

                throw new Error(
                    "Weather response contains no current weather data."
                );

            }


            setValue(
                "weatherTemperature",
                temperature !== undefined
                    ? `${temperature} °C`
                    : "—"
            );

            setValue(
                "weatherHumidity",
                humidity !== undefined
                    ? `${humidity} %`
                    : "—"
            );

            setValue(
                "weatherWind",
                wind !== undefined
                    ? `${wind} km/h`
                    : "—"
            );

            setValue(
                "weatherRain",
                rain !== undefined
                    ? `${rain} %`
                    : "—"
            );


            if (dataBox) {
                dataBox.classList.remove(
                    "hidden"
                );
            }

            if (empty) {
                empty.classList.add(
                    "hidden"
                );
            }


            setConnection(true);


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

            if (empty) {
                empty.classList.remove(
                    "hidden"
                );
            }

            if (errorBox) {

                errorBox.textContent =
                    error.message ||
                    "Unable to load weather data.";

                errorBox.classList.remove(
                    "hidden"
                );

            }

            /*
             * Do NOT automatically call the user offline
             * merely because weather API failed.
             */

            if (!navigator.onLine) {
                setConnection(false);
            }

        } finally {

            if (loading) {
                loading.classList.add("hidden");
            }

        }

    }


    const refreshWeatherBtn =
        $("refreshWeatherBtn");

    if (refreshWeatherBtn) {

        refreshWeatherBtn.addEventListener(
            "click",
            loadWeather
        );

    }


    /* =====================================================
       MARKET / MANDI
    ===================================================== */

    async function loadMarket() {

        const loading =
            $("marketLoading");

        const errorBox =
            $("marketError");

        const tableBody =
            $("marketTableBody");

        const selector =
            $("cropPriceSelector");


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


        try {

            const crop =
                selector
                    ? selector.value
                    : "onion";


            const commodity =
                crop.toLowerCase() === "onion"
                    ? "Onion"
                    : "Wheat";


            const url =
                `${API_BASE}/api/market?commodity=${encodeURIComponent(commodity)}`;


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
                    `Market API returned ${response.status}`
                );

            }


            const result =
                await response.json();


            console.log(
                "Market response:",
                result
            );


            const prices =
                Array.isArray(result)
                    ? result
                    : (
                        result.prices ||
                        result.records ||
                        result.data ||
                        []
                    );


            if (!tableBody) {
                return;
            }


            if (!prices.length) {

                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            <div class="table-empty">
                                <span>📊</span>
                                <strong>
                                    ${translations[selectedLanguage].marketDataUnavailable}
                                </strong>
                                <p>
                                    ${translations[selectedLanguage].marketDataUnavailableDescription}
                                </p>
                            </div>
                        </td>
                    </tr>
                `;

                return;

            }


            tableBody.innerHTML = "";


            prices.forEach(item => {

                const market =
                    item.market ||
                    "—";

                const cropName =
                    item.commodity ||
                    item.crop ||
                    commodity;

                const modalPrice =
                    item.modal_price ??
                    item.modalPrice ??
                    item.price ??
                    "—";

                const minPrice =
                    item.min_price;

                const maxPrice =
                    item.max_price;

                let priceText = "—";


                if (
                    minPrice !== undefined &&
                    maxPrice !== undefined
                ) {

                    priceText =
                        `₹${minPrice} – ₹${maxPrice}`;

                    if (
                        modalPrice !== "—"
                    ) {

                        priceText +=
                            ` | Modal ₹${modalPrice}`;

                    }

                } else if (
                    modalPrice !== undefined
                ) {

                    priceText =
                        `₹${modalPrice}`;

                }


                const date =
                    item.date ||
                    item.arrival_date ||
                    "—";


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `
                    <td>${escapeHtml(market)}</td>
                    <td>${escapeHtml(cropName)}</td>
                    <td>${escapeHtml(priceText)}</td>
                    <td>${escapeHtml(date)}</td>
                `;


                tableBody.appendChild(row);

            });


            setConnection(true);


        } catch (error) {

            console.error(
                "Market error:",
                error
            );

            if (errorBox) {

                errorBox.textContent =
                    error.message ||
                    "Unable to load market data.";

                errorBox.classList.remove(
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


    const cropPriceSelector =
        $("cropPriceSelector");

    if (cropPriceSelector) {

        cropPriceSelector.addEventListener(
            "change",
            loadMarket
        );

    }


    /* =====================================================
       MARKET COMPARISON
    ===================================================== */

    async function loadMarketComparison() {

        try {

            const response =
                await fetch(
                    `${API_BASE}/api/market-comparison`,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {
                throw new Error(
                    `Comparison API returned ${response.status}`
                );
            }


            const result =
                await response.json();


            console.log(
                "Market comparison:",
                result
            );


            const cards =
                document.querySelectorAll(
                    "[data-market-card]"
                );


            let records =
                Array.isArray(result)
                    ? result
                    : (
                        result.prices ||
                        result.data ||
                        result.records ||
                        []
                    );


            cards.forEach(card => {

                const marketName =
                    card.getAttribute(
                        "data-market-card"
                    );


                const priceElement =
                    card.querySelector(
                        ".comparison-price"
                    );

                const statusElement =
                    card.querySelector(
                        ".comparison-status"
                    );


                const record =
                    records.find(item => {

                        const market =
                            String(
                                item.market ||
                                ""
                            ).toLowerCase();

                        return market.includes(
                            marketName
                                .replace(
                                    " APMC",
                                    ""
                                )
                                .replace(
                                    " Market",
                                    ""
                                )
                                .toLowerCase()
                        );

                    });


                if (record) {

                    const price =
                        record.modal_price ??
                        record.modalPrice ??
                        record.price;


                    if (
                        price !== undefined &&
                        price !== null
                    ) {

                        priceElement.textContent =
                            `₹${price}`;

                        statusElement.textContent =
                            translations[
                                selectedLanguage
                            ].online;

                    }

                }

            });


        } catch (error) {

            console.error(
                "Market comparison error:",
                error
            );

        }

    }


    /* =====================================================
       CROP HEALTH / PLANT.ID
    ===================================================== */

    const cropImageInput =
        $("cropImageInput");

    const analyzeCropBtn =
        $("analyzeCropBtn");

    const cropImagePreview =
        $("cropImagePreview");

    const imagePreviewContainer =
        $("imagePreviewContainer");


    if (cropImageInput) {

        cropImageInput.addEventListener(
            "change",
            () => {

                const file =
                    cropImageInput.files[0];


                if (!file) {

                    if (analyzeCropBtn) {
                        analyzeCropBtn.disabled =
                            true;
                    }

                    return;

                }


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select an image file."
                    );

                    cropImageInput.value = "";

                    return;

                }


                if (cropImagePreview) {

                    cropImagePreview.src =
                        URL.createObjectURL(file);

                }


                if (imagePreviewContainer) {

                    imagePreviewContainer.classList.remove(
                        "hidden"
                    );

                }


                if (analyzeCropBtn) {
                    analyzeCropBtn.disabled =
                        false;
                }

            }
        );

    }


    if (analyzeCropBtn) {

        analyzeCropBtn.addEventListener(
            "click",
            analyzeCrop
        );

    }


    async function analyzeCrop() {

        const file =
            cropImageInput?.files[0];

        const resultBox =
            $("cropAnalysisResult");


        if (!file) {

            return;

        }


        analyzeCropBtn.disabled = true;

        analyzeCropBtn.textContent =
            "Analyzing...";


        if (resultBox) {

            resultBox.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Analyzing crop image...</p>
                </div>
            `;

        }


        try {

            const formData =
                new FormData();

            /*
             * Flask backend should accept "image".
             */

            formData.append(
                "image",
                file
            );


            const response =
                await fetch(
                    `${API_BASE}/api/crop-analysis`,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            console.log(
                "Plant.id result:",
                result
            );


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    result.message ||
                    `Crop analysis failed (${response.status})`
                );

            }


            displayCropAnalysis(
                result
            );


            setConnection(true);


        } catch (error) {

            console.error(
                "Plant.id error:",
                error
            );


            if (resultBox) {

                resultBox.innerHTML = `
                    <strong>
                        Crop analysis failed
                    </strong>
                    <p>
                        ${escapeHtml(
                            error.message ||
                            "Unable to analyze the image."
                        )}
                    </p>
                `;

            }

        } finally {

            analyzeCropBtn.disabled = false;

            analyzeCropBtn.textContent =
                translations[
                    selectedLanguage
                ].analyzeCrop;

        }

    }


    function displayCropAnalysis(result) {

        const resultBox =
            $("cropAnalysisResult");


        if (!resultBox) {
            return;
        }


        /*
         * Support the Plant.id response directly
         * or a simplified Flask response.
         */

        const health =
            result.health ||
            result.health_assessment ||
            result.result?.health_assessment ||
            null;


        const suggestions =
            result.suggestions ||
            result.result?.classification?.suggestions ||
            [];


        let html = "";


        html += `
            <div class="analysis-success">
                <h3>🌱 Crop Analysis</h3>
        `;


        if (suggestions.length) {

            const first =
                suggestions[0];


            html += `
                <p>
                    <strong>Plant:</strong>
                    ${escapeHtml(
                        first.name ||
                        first.plant_name ||
                        "Unknown"
                    )}
                </p>
            `;


            if (
                first.probability !== undefined
            ) {

                html += `
                    <p>
                        <strong>Confidence:</strong>
                        ${(
                            Number(
                                first.probability
                            ) * 100
                        ).toFixed(1)}%
                    </p>
                `;

            }

        }


        if (health) {

            html += `
                <h4>🩺 Health Assessment</h4>
            `;


            if (
                health.is_healthy !==
                undefined
            ) {

                html += `
                    <p>
                        <strong>Status:</strong>
                        ${
                            health.is_healthy
                                ? "Healthy"
                                : "Possible health issue detected"
                        }
                    </p>
                `;

            }


            const diseases =
                health.diseases ||
                health.disease ||
                [];


            if (
                Array.isArray(diseases) &&
                diseases.length
            ) {

                html += `
                    <ul>
                `;


                diseases.forEach(
                    disease => {

                        const name =
                            disease.name ||
                            disease.disease ||
                            "Possible issue";

                        const probability =
                            disease.probability;


                        html += `
                            <li>
                                ${escapeHtml(name)}
                                ${
                                    probability !== undefined
                                        ? ` - ${(
                                            Number(
                                                probability
                                            ) * 100
                                        ).toFixed(1)}%`
                                        : ""
                                }
                            </li>
                        `;

                    }
                );


                html += `
                    </ul>
                `;

            }

        }


        /*
         * If Flask returns a simple "message",
         * display it.
         */

        if (
            result.message &&
            !suggestions.length &&
            !health
        ) {

            html += `
                <p>
                    ${escapeHtml(
                        result.message
                    )}
                </p>
            `;

        }


        html += `
            </div>
        `;


        resultBox.innerHTML =
            html;

    }


    /* =====================================================
       OPENAI ASSISTANT
    ===================================================== */

    const aiForm =
        $("aiForm");

    const aiInput =
        $("aiInput");

    const chatMessages =
        $("chatMessages");

    const aiSendButton =
        $("aiSendButton");


    if (aiForm) {

        aiForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const question =
                    aiInput
                        ? aiInput.value.trim()
                        : "";


                if (!question) {
                    return;
                }


                addChatMessage(
                    question,
                    "user"
                );


                aiInput.value = "";


                if (aiSendButton) {
                    aiSendButton.disabled =
                        true;
                }


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

                                    message:
                                        question,

                                    language:
                                        selectedLanguage,

                                    user_id:
                                        currentUser
                                            ? currentUser.uid
                                            : null

                                })

                            }
                        );


                    const result =
                        await response.json();


                    console.log(
                        "AI response:",
                        result
                    );


                    if (!response.ok) {

                        throw new Error(
                            result.error ||
                            result.message ||
                            "AI request failed."
                        );

                    }


                    const answer =
                        result.answer ||
                        result.response ||
                        result.message ||
                        result.content ||
                        "No response received.";


                    addChatMessage(
                        answer,
                        "assistant"
                    );


                    updateAIStatus(true);

                    setConnection(true);


                } catch (error) {

                    console.error(
                        "AI error:",
                        error
                    );


                    addChatMessage(
                        `AI error: ${error.message}`,
                        "assistant"
                    );


                    updateAIStatus(false);

                } finally {

                    if (aiSendButton) {
                        aiSendButton.disabled =
                            false;
                    }

                }

            }
        );

    }


    function addChatMessage(
        text,
        type
    ) {

        if (!chatMessages) {
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
                <div>
                    <strong>You</strong>
                    <p>${escapeHtml(text)}</p>
                </div>
            `;

        } else {

            wrapper.innerHTML = `
                <div class="chat-avatar">
                    🤖
                </div>
                <div>
                    <strong>
                        ${
                            translations[
                                selectedLanguage
                            ].assistant
                        }
                    </strong>
                    <p>${escapeHtml(text)}</p>
                </div>
            `;

        }


        chatMessages.appendChild(
            wrapper
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    function updateAIStatus(connected) {

        const text =
            $("aiConnectionText");

        const badge =
            $("aiConnectionBadge");


        if (!text) {
            return;
        }


        text.textContent =
            connected
                ? "AI Connected"
                : translations[
                    selectedLanguage
                  ].aiNotConnected;


        if (badge) {

            badge.classList.toggle(
                "not-connected-badge",
                !connected
            );

            badge.classList.toggle(
                "connected-badge",
                connected
            );

        }

    }


    /* =====================================================
       VOICE ASSISTANCE
    ===================================================== */

    function setupVoiceRecognition() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            console.warn(
                "Speech Recognition is not supported."
            );

            return;

        }


        recognition =
            new SpeechRecognition();


        recognition.continuous =
            false;

        recognition.interimResults =
            false;


        updateVoiceLanguage();


        recognition.onstart = () => {

            isListening = true;

            const start =
                $("startVoiceBtn");

            const stop =
                $("stopVoiceBtn");


            if (start) {
                start.classList.add(
                    "hidden"
                );
            }

            if (stop) {
                stop.classList.remove(
                    "hidden"
                );
            }

        };


        recognition.onresult =
            event => {

                const transcript =
                    event.results[0][0]
                        .transcript;


                const input =
                    $("voiceInput");


                if (input) {
                    input.value =
                        transcript;
                }


                askVoiceQuestion(
                    transcript
                );

            };


        recognition.onerror =
            event => {

                console.error(
                    "Voice recognition error:",
                    event.error
                );

                stopVoice();

            };


        recognition.onend = () => {

            stopVoice();

        };

    }


    function updateVoiceLanguage() {

        if (!recognition) {
            return;
        }


        if (selectedLanguage === "hi") {

            recognition.lang =
                "hi-IN";

        } else if (
            selectedLanguage === "mr"
        ) {

            recognition.lang =
                "mr-IN";

        } else {

            recognition.lang =
                "en-IN";

        }

    }


    function startVoice() {

        if (!recognition) {

            alert(
                "Voice recognition is not supported by this browser."
            );

            return;

        }


        updateVoiceLanguage();


        try {

            recognition.start();

        } catch (error) {

            console.error(
                "Could not start voice recognition:",
                error
            );

        }

    }


    function stopVoice() {

        isListening = false;


        if (recognition) {

            try {
                recognition.stop();
            } catch (_) {}

        }


        const start =
            $("startVoiceBtn");

        const stop =
            $("stopVoiceBtn");


        if (start) {
            start.classList.remove(
                "hidden"
            );
        }

        if (stop) {
            stop.classList.add(
                "hidden"
            );
        }

    }


    async function askVoiceQuestion(
        question
    ) {

        const responseBox =
            $("voiceResponse");


        if (responseBox) {

            responseBox.textContent =
                "Getting answer...";

        }


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

                            message: question,

                            language:
                                selectedLanguage

                        })

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    result.message ||
                    "AI request failed."
                );

            }


            const answer =
                result.answer ||
                result.response ||
                result.message ||
                result.content ||
                "No answer received.";


            if (responseBox) {

                responseBox.textContent =
                    answer;

            }


            speakText(answer);

        } catch (error) {

            console.error(
                "Voice AI error:",
                error
            );


            if (responseBox) {

                responseBox.textContent =
                    error.message;

            }

        }

    }


    function speakText(text) {

        if (
            !window.speechSynthesis
        ) {
            return;
        }


        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(
                text
            );


        if (selectedLanguage === "hi") {

            utterance.lang =
                "hi-IN";

        } else if (
            selectedLanguage === "mr"
        ) {

            utterance.lang =
                "mr-IN";

        } else {

            utterance.lang =
                "en-IN";

        }


        window.speechSynthesis.speak(
            utterance
        );

    }


    const startVoiceBtn =
        $("startVoiceBtn");

    const stopVoiceBtn =
        $("stopVoiceBtn");


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


    setupVoiceRecognition();


    /* =====================================================
       PROFILE EDIT
    ===================================================== */

    const editProfileBtn =
        $("editProfileBtn");

    const cancelProfileEditBtn =
        $("cancelProfileEditBtn");

    const profileEditActions =
        $("profileEditActions");


    function setProfileEditing(
        enabled
    ) {

        [
            "profileName",
            "profileMobile",
            "profileVillage",
            "profileState",
            "profileLandArea",
            "profileMarket",
            "profileLanguage"
        ].forEach(id => {

            const element = $(id);

            if (element) {
                element.disabled =
                    !enabled;
            }

        });


        if (profileEditActions) {

            profileEditActions.classList.toggle(
                "hidden",
                !enabled
            );

        }

    }


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            () => setProfileEditing(true)
        );

    }


    if (cancelProfileEditBtn) {

        cancelProfileEditBtn.addEventListener(
            "click",
            () => {

                populateProfile();

                setProfileEditing(
                    false
                );

            }
        );

    }


    const profileForm =
        $("profileForm");


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (!currentUser) {

                    alert(
                        "Please login first."
                    );

                    return;

                }


                const updated = {

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

                    language:
                        $("profileLanguage").value

                };


                try {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .set(
                            updated,
                            {
                                merge: true
                            }
                        );


                    farmerData = {
                        ...farmerData,
                        ...updated
                    };


                    applyLanguage(
                        updated.language
                    );

                    populateProfile();

                    setProfileEditing(
                        false
                    );


                    const message =
                        $("profileMessage");

                    if (message) {

                        message.textContent =
                            "Profile updated successfully.";

                    }

                } catch (error) {

                    console.error(
                        "Profile update error:",
                        error
                    );


                    const message =
                        $("profileMessage");

                    if (message) {

                        message.textContent =
                            error.message;

                    }

                }

            }
        );

    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const voiceSetting =
        $("voiceSetting");


    if (voiceSetting) {

        const saved =
            localStorage.getItem(
                "smartagri_voice"
            );


        if (saved !== null) {

            voiceSetting.checked =
                saved === "true";

        }


        voiceSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartagri_voice",
                    voiceSetting.checked
                );

            }
        );

    }


    const notificationSetting =
        $("notificationSetting");


    if (notificationSetting) {

        const saved =
            localStorage.getItem(
                "smartagri_notifications"
            );


        if (saved !== null) {

            notificationSetting.checked =
                saved === "true";

        }


        notificationSetting.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "smartagri_notifications",
                    notificationSetting.checked
                );

            }
        );

    }


    /* =====================================================
       ONLINE / OFFLINE STATUS
    ===================================================== */

    function setConnection(online) {

        const status =
            $("connectionStatus");

        const text =
            $("connectionText");

        const dashboardText =
            $("dashboardConnectionText");


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


        if (text) {

            text.textContent =
                online
                    ? translations[
                        selectedLanguage
                      ].online
                    : translations[
                        selectedLanguage
                      ].offline;

        }


        if (dashboardText) {

            dashboardText.textContent =
                online
                    ? translations[
                        selectedLanguage
                      ].online
                    : translations[
                        selectedLanguage
                      ].offline;

        }

    }


    window.addEventListener(
        "online",
        () => setConnection(true)
    );

    window.addEventListener(
        "offline",
        () => setConnection(false)
    );


    /* =====================================================
       CHECK BACKEND CONNECTION
    ===================================================== */

    async function checkBackendConnection() {

        if (!navigator.onLine) {

            setConnection(false);

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE}/api/weather`,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            /*
             * Even a 4xx/5xx response means the browser
             * reached the server. Therefore "online"
             * is based on network connectivity here,
             * not on whether the weather API succeeded.
             */

            if (response) {
                setConnection(true);
            }

        } catch (error) {

            console.error(
                "Backend connection check:",
                error
            );


            /*
             * If browser itself says online, do not
             * falsely label the user offline.
             */

            setConnection(
                navigator.onLine
            );

        }

    }


    /* =====================================================
       CROP INFORMATION TRANSLATION
    ===================================================== */

    const cropInfoTranslations = {

        en: {

            onion: {

                cultivation: {
                    title: "Onion Cultivation Guidance",
                    subtitle:
                        "Important steps for successful onion cultivation.",
                    content: `
                        <h3>🌱 Land Preparation</h3>
                        <p>Prepare a fine, well-drained seedbed. Onion grows well in loose soil with good drainage.</p>

                        <h3>🌱 Planting</h3>
                        <p>Use healthy and disease-free seedlings or suitable planting material. Maintain appropriate spacing between plants and rows.</p>

                        <h3>💧 Irrigation</h3>
                        <p>Maintain adequate soil moisture during crop growth. Avoid excessive irrigation and waterlogging.</p>

                        <h3>☀️ Field Conditions</h3>
                        <p>Provide adequate sunlight and maintain good air circulation around the crop.</p>
                    `
                },

                management: {
                    title: "Onion Crop Management",
                    subtitle:
                        "Manage the crop throughout its growing period.",
                    content: `
                        <h3>💧 Water Management</h3>
                        <p>Maintain consistent soil moisture, especially during bulb development. Avoid excessive irrigation.</p>

                        <h3>🌿 Weed Management</h3>
                        <p>Keep the field free from weeds because weeds compete with onion plants for water, nutrients and sunlight.</p>

                        <h3>🧪 Nutrient Management</h3>
                        <p>Apply nutrients according to soil condition, soil testing and locally recommended practices.</p>

                        <h3>🔍 Crop Monitoring</h3>
                        <p>Inspect plants regularly for pests, diseases, yellowing leaves and abnormal growth.</p>
                    `
                },

                practices: {
                    title: "Onion Farming Practices",
                    subtitle:
                        "Practical recommendations for better onion production.",
                    content: `
                        <h3>🚜 Field Hygiene</h3>
                        <p>Remove diseased plant material and maintain clean cultivation areas.</p>

                        <h3>🌱 Healthy Planting Material</h3>
                        <p>Start with healthy and disease-free seedlings or planting material.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Rotate crops when practical to support soil health and reduce recurring crop problems.</p>

                        <h3>📦 Harvest Management</h3>
                        <p>Harvest bulbs at suitable maturity and cure them properly before storage.</p>
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
                        <p>Prepare a well-levelled and properly prepared seedbed with suitable soil moisture for uniform germination.</p>

                        <h3>🌾 Seed Selection</h3>
                        <p>Use healthy, quality seed varieties recommended for the local growing region.</p>

                        <h3>💧 Irrigation</h3>
                        <p>Irrigate according to crop growth stage, soil moisture and weather conditions.</p>

                        <h3>☀️ Crop Conditions</h3>
                        <p>Wheat generally performs well under suitable cool growing conditions with adequate sunlight.</p>
                    `
                },

                management: {
                    title: "Wheat Crop Management",
                    subtitle:
                        "Manage wheat from germination through harvest.",
                    content: `
                        <h3>💧 Irrigation Management</h3>
                        <p>Pay particular attention to irrigation during important crop growth stages.</p>

                        <h3>🌿 Weed Control</h3>
                        <p>Monitor fields for weeds and use appropriate integrated weed-management practices.</p>

                        <h3>🔍 Pest Monitoring</h3>
                        <p>Inspect the crop regularly for insects, disease symptoms and abnormal plant growth.</p>

                        <h3>🧪 Nutrient Management</h3>
                        <p>Apply fertilizers according to soil testing and recommended crop requirements.</p>
                    `
                },

                practices: {
                    title: "Wheat Farming Practices",
                    subtitle:
                        "Practical methods for maintaining a healthy wheat crop.",
                    content: `
                        <h3>🌱 Timely Sowing</h3>
                        <p>Follow the locally recommended sowing period for the selected wheat variety and growing region.</p>

                        <h3>🚜 Field Preparation</h3>
                        <p>Maintain a level and properly prepared seedbed to support uniform crop establishment.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Crop rotation can help with soil management and reduce recurring crop-related problems.</p>

                        <h3>🌾 Harvesting</h3>
                        <p>Harvest when the crop reaches appropriate maturity and grain moisture is suitable for harvesting and storage.</p>
                    `
                }

            }

        },


        hi: {

            onion: {

                cultivation: {
                    title: "प्याज की खेती का मार्गदर्शन",
                    subtitle:
                        "सफल प्याज उत्पादन के लिए महत्वपूर्ण चरण।",
                    content: `
                        <h3>🌱 भूमि की तैयारी</h3>
                        <p>बारीक और अच्छी जल निकासी वाली क्यारी तैयार करें। प्याज ढीली और अच्छी जल निकासी वाली मिट्टी में अच्छी तरह बढ़ता है।</p>

                        <h3>🌱 रोपण</h3>
                        <p>स्वस्थ और रोगमुक्त पौध का उपयोग करें। पौधों और कतारों के बीच उचित दूरी रखें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>फसल की वृद्धि के दौरान पर्याप्त मिट्टी की नमी बनाए रखें। अधिक सिंचाई और जलभराव से बचें।</p>

                        <h3>☀️ खेत की स्थिति</h3>
                        <p>पर्याप्त सूर्यप्रकाश और पौधों के बीच अच्छा वायु संचार सुनिश्चित करें।</p>
                    `
                },

                management: {
                    title: "प्याज फसल प्रबंधन",
                    subtitle:
                        "पूरे फसल चक्र के दौरान प्याज का प्रबंधन करें।",
                    content: `
                        <h3>💧 जल प्रबंधन</h3>
                        <p>विशेष रूप से कंद बनने के समय मिट्टी की नमी बनाए रखें। अत्यधिक सिंचाई से बचें।</p>

                        <h3>🌿 खरपतवार प्रबंधन</h3>
                        <p>खेत को खरपतवार से मुक्त रखें क्योंकि खरपतवार पानी, पोषक तत्व और प्रकाश के लिए फसल से प्रतिस्पर्धा करते हैं।</p>

                        <h3>🧪 पोषक तत्व प्रबंधन</h3>
                        <p>मिट्टी की स्थिति और स्थानीय अनुशंसाओं के अनुसार पोषक तत्व दें।</p>

                        <h3>🔍 फसल निगरानी</h3>
                        <p>कीट, रोग, पत्तियों का पीला होना और असामान्य वृद्धि के लिए नियमित जांच करें।</p>
                    `
                },

                practices: {
                    title: "प्याज की कृषि पद्धतियां",
                    subtitle:
                        "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।",
                    content: `
                        <h3>🚜 खेत की स्वच्छता</h3>
                        <p>रोगग्रस्त पौधों को हटाएं और खेत को साफ रखें।</p>

                        <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                        <p>स्वस्थ और रोगमुक्त पौध का उपयोग करें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>संभव होने पर फसल चक्र अपनाएं ताकि मिट्टी का स्वास्थ्य बेहतर रहे।</p>

                        <h3>📦 कटाई प्रबंधन</h3>
                        <p>उचित परिपक्वता पर प्याज की कटाई करें और भंडारण से पहले अच्छी तरह सुखाएं।</p>
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
                        <p>समान अंकुरण के लिए समतल और उचित रूप से तैयार खेत रखें।</p>

                        <h3>🌾 बीज चयन</h3>
                        <p>स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और गुणवत्तापूर्ण बीज का उपयोग करें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>फसल की अवस्था, मिट्टी की नमी और मौसम के अनुसार सिंचाई करें।</p>

                        <h3>☀️ फसल की स्थिति</h3>
                        <p>गेहूं उचित ठंडी परिस्थितियों और पर्याप्त सूर्यप्रकाश में अच्छी तरह बढ़ता है।</p>
                    `
                },

                management: {
                    title: "गेहूं फसल प्रबंधन",
                    subtitle:
                        "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",
                    content: `
                        <h3>💧 सिंचाई प्रबंधन</h3>
                        <p>महत्वपूर्ण वृद्धि अवस्थाओं के दौरान सिंचाई पर विशेष ध्यान दें।</p>

                        <h3>🌿 खरपतवार नियंत्रण</h3>
                        <p>खेत में खरपतवार की नियमित निगरानी करें और उचित नियंत्रण पद्धतियां अपनाएं।</p>

                        <h3>🔍 कीट निगरानी</h3>
                        <p>कीट, रोग के लक्षण और असामान्य वृद्धि के लिए फसल की नियमित जांच करें।</p>

                        <h3>🧪 पोषक तत्व प्रबंधन</h3>
                        <p>मिट्टी परीक्षण और अनुशंसित फसल आवश्यकताओं के अनुसार उर्वरक दें।</p>
                    `
                },

                practices: {
                    title: "गेहूं की कृषि पद्धतियां",
                    subtitle:
                        "स्वस्थ गेहूं की फसल के लिए व्यावहारिक तरीके।",
                    content: `
                        <h3>🌱 समय पर बुवाई</h3>
                        <p>स्थानीय क्षेत्र और चयनित किस्म के लिए अनुशंसित समय पर बुवाई करें।</p>

                        <h3>🚜 खेत की तैयारी</h3>
                        <p>समान फसल स्थापना के लिए समतल और उचित रूप से तैयार खेत रखें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>फसल चक्र मिट्टी प्रबंधन में सहायता कर सकता है।</p>

                        <h3>🌾 कटाई</h3>
                        <p>उचित परिपक्वता और उपयुक्त नमी पर फसल की कटाई करें।</p>
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
                        <p>भुसभुशीत आणि चांगला निचरा होणारी जमीन तयार करा.</p>

                        <h3>🌱 लागवड</h3>
                        <p>निरोगी आणि रोगमुक्त रोपांचा वापर करा. रोपे आणि ओळींमध्ये योग्य अंतर ठेवा.</p>

                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>पीक वाढीच्या काळात योग्य ओलावा ठेवा. जास्त पाणी आणि पाणी साचणे टाळा.</p>

                        <h3>☀️ शेताची परिस्थिती</h3>
                        <p>पुरेसा सूर्यप्रकाश आणि चांगली हवा खेळती राहील याची खात्री करा.</p>
                    `
                },

                management: {
                    title: "कांदा पीक व्यवस्थापन",
                    subtitle:
                        "संपूर्ण पीक कालावधीत कांद्याचे व्यवस्थापन करा.",
                    content: `
                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>विशेषतः कांद्याचा गड्डा तयार होताना जमिनीतील ओलावा योग्य ठेवा.</p>

                        <h3>🌿 तण व्यवस्थापन</h3>
                        <p>शेत तणमुक्त ठेवा कारण तण पाणी, अन्नद्रव्ये आणि सूर्यप्रकाशासाठी पिकाशी स्पर्धा करतात.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>मातीची स्थिती आणि स्थानिक शिफारसीनुसार अन्नद्रव्ये द्या.</p>

                        <h3>🔍 पीक निरीक्षण</h3>
                        <p>कीड, रोग, पाने पिवळी होणे आणि असामान्य वाढ यासाठी नियमित निरीक्षण करा.</p>
                    `
                },

                practices: {
                    title: "कांदा शेती पद्धती",
                    subtitle:
                        "चांगल्या कांदा उत्पादनासाठी व्यावहारिक पद्धती.",
                    content: `
                        <h3>🚜 शेत स्वच्छता</h3>
                        <p>रोगग्रस्त झाडे काढून टाका आणि शेत स्वच्छ ठेवा.</p>

                        <h3>🌱 निरोगी लागवड साहित्य</h3>
                        <p>निरोगी आणि रोगमुक्त रोपांचा वापर करा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>शक्य असल्यास पीक फेरपालट केल्याने जमिनीचे आरोग्य सुधारण्यास मदत होते.</p>

                        <h3>📦 काढणी व्यवस्थापन</h3>
                        <p>योग्य परिपक्वतेवर कांदा काढा आणि साठवणीपूर्वी योग्य प्रकारे वाळवा.</p>
                    `
                }

            },

            wheat: {

                cultivation: {
                    title: "गहू लागवड मार्गदर्शन",
                    subtitle:
                        "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे.",
                    content: `
                        <h3>🌱 मातीची तयारी</h3>
                        <p>एकसारख्या उगवणीसाठी जमीन समतल आणि योग्य प्रकारे तयार करा.</p>

                        <h3>🌾 बियाणे निवड</h3>
                        <p>स्थानिक भागासाठी शिफारस केलेले निरोगी आणि दर्जेदार बियाणे वापरा.</p>

                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>पिकाची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार पाणी द्या.</p>

                        <h3>☀️ पीक परिस्थिती</h3>
                        <p>योग्य थंड वातावरण आणि पुरेसा सूर्यप्रकाश गव्हासाठी उपयुक्त असतो.</p>
                    `
                },

                management: {
                    title: "गहू पीक व्यवस्थापन",
                    subtitle:
                        "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा.",
                    content: `
                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे विशेष लक्ष द्या.</p>

                        <h3>🌿 तण नियंत्रण</h3>
                        <p>तणांची नियमित पाहणी करा आणि योग्य तण व्यवस्थापन पद्धती वापरा.</p>

                        <h3>🔍 कीड निरीक्षण</h3>
                        <p>कीड, रोगाची लक्षणे आणि असामान्य वाढ यासाठी नियमित निरीक्षण करा.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>माती परीक्षण आणि शिफारस केलेल्या गरजेनुसार खतांचा वापर करा.</p>
                    `
                },

                practices: {
                    title: "गहू शेती पद्धती",
                    subtitle:
                        "निरोगी गहू पिकासाठी व्यावहारिक पद्धती.",
                    content: `
                        <h3>🌱 वेळेवर पेरणी</h3>
                        <p>स्थानिक भाग आणि निवडलेल्या वाणासाठी शिफारस केलेल्या वेळेत पेरणी करा.</p>

                        <h3>🚜 शेताची तयारी</h3>
                        <p>एकसारख्या पिकाच्या वाढीसाठी जमीन समतल आणि योग्य प्रकारे तयार ठेवा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>पीक फेरपालट जमिनीच्या व्यवस्थापनास मदत करू शकते.</p>

                        <h3>🌾 काढणी</h3>
                        <p>योग्य परिपक्वतेवर आणि योग्य आर्द्रतेच्या वेळी पीक काढा.</p>
                    `
                }

            }

        }

    };


    /* =====================================================
       CROP MODAL LANGUAGE
    ===================================================== */

    let activeCrop = null;
    let activeTopic = null;


    function updateCropInformationLanguage() {

        if (
            !activeCrop ||
            !activeTopic
        ) {
            return;
        }


        const languageData =
            cropInfoTranslations[
                selectedLanguage
            ];


        if (
            !languageData ||
            !languageData[activeCrop] ||
            !languageData[activeCrop][activeTopic]
        ) {
            return;
        }


        const data =
            languageData[
                activeCrop
            ][
                activeTopic
            ];


        const title =
            $("cropInfoModalTitle");

        const subtitle =
            $("cropInfoModalSubtitle");

        const body =
            $("cropInfoModalBody");


        if (title) {
            title.textContent =
                data.title;
        }

        if (subtitle) {
            subtitle.textContent =
                data.subtitle;
        }

        if (body) {
            body.innerHTML =
                data.content;
        }

    }


    /*
     * Attach our own handlers to the existing crop buttons.
     * This works with the HTML you provided.
     */

    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    activeCrop =
                        button.getAttribute(
                            "data-crop"
                        );

                    activeTopic =
                        button.getAttribute(
                            "data-topic"
                        );


                    const modal =
                        $("cropInfoModal");

                    const icon =
                        $("cropInfoModalIcon");


                    if (icon) {

                        icon.textContent =
                            activeCrop === "onion"
                                ? "🧅"
                                : "🌾";

                    }


                    updateCropInformationLanguage();


                    if (modal) {

                        modal.classList.remove(
                            "hidden"
                        );

                        document.body.classList.add(
                            "modal-open"
                        );

                    }

                }
            );

        });


    /* =====================================================
       SCHEME BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".scheme-button"
        )
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


    /* =====================================================
       CLOSE CROP MODAL
    ===================================================== */

    const cropInfoModal =
        $("cropInfoModal");

    const cropInfoModalOverlay =
        $("cropInfoModalOverlay");

    const closeCropInfoBtn =
        $("closeCropInfoBtn");


    function closeCropModal() {

        if (cropInfoModal) {

            cropInfoModal.classList.add(
                "hidden"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    }


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


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                cropInfoModal &&
                !cropInfoModal.classList.contains(
                    "hidden"
                )
            ) {

                closeCropModal();

            }

        }
    );


    /* =====================================================
       UTILITY - ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

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


    /* =====================================================
       INITIALIZE DASHBOARD
    ===================================================== */

    function initializeDashboard() {

        applyLanguage(
            selectedLanguage
        );

        checkBackendConnection();

        loadWeather();

        updateAIStatus(false);

    }


    /* =====================================================
       STARTUP
    ===================================================== */

    setConnection(
        navigator.onLine
    );


    /*
     * If the user already has a Firebase login,
     * auth.onAuthStateChanged will initialize dashboard.
     */

    if (
        auth.currentUser
    ) {

        loadFarmerProfile(
            auth.currentUser
        )
            .then(() => {

                showScreen(
                    "dashboardPage"
                );

                initializeDashboard();

            })
            .catch(error => {

                console.error(
                    "Startup profile error:",
                    error
                );

            });

    }

});
