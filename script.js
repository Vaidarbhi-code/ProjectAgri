/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND JAVASCRIPT
   Matches the HTML IDs provided by the user.

   Backend endpoints expected:
   GET  /api/weather
   GET  /api/mandi
   POST /api/plant-health
   POST /api/ai
   GET  /api/database
   GET  /api/database/<table>

   Firebase is initialized from the firebaseConfig in HTML.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. FIREBASE INITIALIZATION
    ===================================================== */

    if (typeof firebase === "undefined") {
        console.error("Firebase SDK was not loaded.");
    } else {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    }

    const auth =
        typeof firebase !== "undefined"
            ? firebase.auth()
            : null;

    const db =
        typeof firebase !== "undefined"
            ? firebase.firestore()
            : null;


    /* =====================================================
       2. TRANSLATIONS
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
            myProfile: "My Profile",

            welcome: "Welcome",
            dashboardSubtitle: "Your farming information in one place.",
            connectionStatus: "Connection Status",
            profileSummary: "Your registered information",
            editProfile: "Edit Profile",
            quickActions: "Quick Actions",
            quickActionsSubtitle: "Access important farming tools quickly.",
            liveDataTitle: "Live Data",
            liveDataDescription: "Only verified connected data is displayed.",

            online: "Online",
            offline: "Offline",

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
                "Connect a verified crop-health AI service before displaying analysis.",

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
            aiUnavailable: "AI service is not connected yet.",
            askQuestion: "Ask a farming question...",
            aiConnectionNote:
                "AI responses require a connected AI service/backend.",

            voiceSubtitle:
                "Speak and listen in your preferred language.",
            voiceAssistantTitle: "Smart Voice Assistance",
            voiceDescription:
                "Speak using your device microphone.",
            startVoice: "Start Voice Assistance",
            stopVoice: "Stop Listening",
            voiceInput: "Voice Input",
            voiceInputPlaceholder:
                "Voice input will appear here...",
            voiceResponse: "Voice Response",
            voiceReady: "Voice assistance is ready.",

            profileSubtitle:
                "View and edit your farmer information.",
            saveChanges: "Save Changes",
            cancel: "Cancel",

            settingsSubtitle:
                "Manage your SmartAgri preferences.",
            changeLanguageDescription:
                "Select your preferred application language.",
            voiceSettingDescription:
                "Enable or disable voice assistance.",
            notifications: "Notifications",
            notificationDescription:
                "Enable or disable application notifications.",

            marketIntelligence: "Market Intelligence",
            multilingualSupport: "Multilingual Support",
            aboutDescription:
                "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."
        },


        hi: {
            appName: "स्मार्ट एग्री",
            appTagline: "स्मार्ट कृषि बाजार सूचना प्रणाली",
            chooseLanguage: "अपनी भाषा चुनें",
            languageDescription: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
            continue: "जारी रखें",

            loginTitle: "किसान लॉगिन",
            loginSubtitle: "स्मार्ट एग्री में प्रवेश करें",
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
            registrationSubtitle: "अपना स्मार्ट एग्री किसान खाता बनाएं",
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
            voiceAssistance: "वॉयस सहायता",
            farmerProfile: "किसान प्रोफाइल",
            settings: "सेटिंग्स",
            about: "स्मार्ट एग्री के बारे में",
            logout: "लॉगआउट",
            myProfile: "मेरी प्रोफाइल",

            welcome: "स्वागत है",
            dashboardSubtitle: "आपकी खेती की जानकारी एक ही जगह।",
            connectionStatus: "कनेक्शन स्थिति",
            profileSummary: "आपकी पंजीकृत जानकारी",
            editProfile: "प्रोफाइल संपादित करें",
            quickActions: "त्वरित कार्य",
            quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी उपयोग करें।",
            liveDataTitle: "लाइव डेटा",
            liveDataDescription:
                "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

            online: "ऑनलाइन",
            offline: "ऑफलाइन",

            weatherSubtitle:
                "कृषि निर्णयों के लिए स्थानीय मौसम की जानकारी।",
            currentWeather: "वर्तमान मौसम",
            refresh: "रीफ्रेश",
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
            dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

            cropSubtitle:
                "फसल उत्पादन और प्रबंधन मार्गदर्शन।",
            onionInfo: "प्याज की खेती की जानकारी।",
            wheatInfo: "गेहूं की खेती की जानकारी।",
            cultivationGuidance: "खेती मार्गदर्शन",
            cropManagement: "फसल प्रबंधन",
            farmingPractices: "कृषि पद्धतियां",

            cropHealthSubtitle:
                "AI सहायता से फसल की तस्वीर का विश्लेषण करें।",
            uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
            uploadCropDescription:
                "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",
            chooseImage: "तस्वीर चुनें",
            analyzeCrop: "फसल का विश्लेषण करें",
            analysisNotConnected: "AI फसल विश्लेषण कनेक्ट नहीं है",
            analysisNotConnectedDescription:
                "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य सेवा कनेक्ट करें।",

            schemesSubtitle:
                "किसानों के लिए सरकारी सहायता और कृषि योजनाएं।",
            pmKisanDescription:
                "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
            pmksyDescription:
                "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
            cropInsurance: "फसल बीमा",
            cropInsuranceDescription:
                "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",
            learnMore: "अधिक जानकारी",

            aiSubtitle: "खेती से जुड़े प्रश्न पूछें।",
            smartAssistant: "स्मार्ट किसान सहायक",
            aiNotConnected: "AI कनेक्ट नहीं है",
            assistant: "सहायक",
            aiUnavailable: "AI सेवा अभी कनेक्ट नहीं है।",
            askQuestion: "खेती से जुड़ा प्रश्न पूछें...",
            aiConnectionNote:
                "AI उत्तर के लिए कनेक्टेड AI सेवा आवश्यक है।",

            voiceSubtitle:
                "अपनी पसंदीदा भाषा में बोलें और सुनें।",
            voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
            voiceDescription:
                "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",
            startVoice: "वॉयस सहायता शुरू करें",
            stopVoice: "सुनना बंद करें",
            voiceInput: "वॉयस इनपुट",
            voiceInputPlaceholder:
                "वॉयस इनपुट यहां दिखाई देगा...",
            voiceResponse: "वॉयस उत्तर",
            voiceReady: "वॉयस सहायता तैयार है।",

            profileSubtitle:
                "अपनी किसान जानकारी देखें और संपादित करें।",
            saveChanges: "बदलाव सहेजें",
            cancel: "रद्द करें",

            settingsSubtitle:
                "अपनी स्मार्ट एग्री प्राथमिकताएं प्रबंधित करें।",
            changeLanguageDescription:
                "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
            voiceSettingDescription:
                "वॉयस सहायता चालू या बंद करें।",
            notifications: "सूचनाएं",
            notificationDescription:
                "एप्लिकेशन सूचनाएं चालू या बंद करें।",

            marketIntelligence: "बाजार जानकारी",
            multilingualSupport: "बहुभाषी सहायता",
            aboutDescription:
                "स्मार्ट एग्री किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
        },


        mr: {
            appName: "स्मार्टअ‍ॅग्री",
            appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",
            chooseLanguage: "तुमची भाषा निवडा",
            languageDescription: "पुढे जाण्यासाठी तुमची आवडती भाषा निवडा.",
            continue: "पुढे जा",

            loginTitle: "शेतकरी लॉगिन",
            loginSubtitle: "स्मार्टअ‍ॅग्रीमध्ये प्रवेश करा",
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
            registrationSubtitle: "तुमचे स्मार्टअ‍ॅग्री शेतकरी खाते तयार करा",
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
            about: "स्मार्टअ‍ॅग्रीबद्दल",
            logout: "लॉगआउट",
            myProfile: "माझे प्रोफाइल",

            welcome: "स्वागत",
            dashboardSubtitle: "तुमची शेतीची माहिती एका ठिकाणी.",
            connectionStatus: "कनेक्शन स्थिती",
            profileSummary: "तुमची नोंदणीकृत माहिती",
            editProfile: "प्रोफाइल संपादित करा",
            quickActions: "जलद कृती",
            quickActionsSubtitle:
                "महत्त्वाची शेतीची साधने त्वरीत वापरा.",
            liveDataTitle: "लाइव्ह डेटा",
            liveDataDescription:
                "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

            online: "ऑनलाइन",
            offline: "ऑफलाइन",

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
                "सत्यापित हवामान डेटा मिळालेला नाही.",

            marketSubtitle:
                "कनेक्टेड सत्यापित स्रोतांकडून सध्याचे पीक भाव.",
            marketPriceTable: "बाजार भाव तक्ता",
            onion: "कांदा",
            wheat: "गहू",
            market: "बाजार",
            crop: "पीक",
            price: "भाव",
            date: "तारीख",
            marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
            marketDataUnavailableDescription:
                "सत्यापित बाजार डेटा मिळालेला नाही.",

            comparisonSubtitle:
                "विक्रीपूर्वी बाजारातील माहितीची तुलना करा.",
            dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

            cropSubtitle:
                "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
            onionInfo: "कांदा लागवड माहिती.",
            wheatInfo: "गहू लागवड माहिती.",
            cultivationGuidance: "लागवड मार्गदर्शन",
            cropManagement: "पीक व्यवस्थापन",
            farmingPractices: "शेती पद्धती",

            cropHealthSubtitle:
                "AI सहाय्याने पिकाच्या फोटोचे विश्लेषण करा.",
            uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
            uploadCropDescription:
                "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",
            chooseImage: "फोटो निवडा",
            analyzeCrop: "पिकाचे विश्लेषण करा",
            analysisNotConnected: "AI पीक विश्लेषण कनेक्ट केलेले नाही",
            analysisNotConnectedDescription:
                "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य सेवा कनेक्ट करा.",

            schemesSubtitle:
                "शेतकऱ्यांसाठी सरकारी मदत आणि कृषी योजना.",
            pmKisanDescription:
                "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
            pmksyDescription:
                "अधिकृत सिंचन आणि जलव्यवस्थापन माहिती.",
            cropInsurance: "पीक विमा",
            cropInsuranceDescription:
                "प्रधानमंत्री फसल विमा योजनेची अधिकृत माहिती.",
            learnMore: "अधिक माहिती",

            aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
            smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
            aiNotConnected: "AI कनेक्ट केलेले नाही",
            assistant: "सहाय्यक",
            aiUnavailable: "AI सेवा अजून कनेक्ट केलेली नाही.",
            askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",
            aiConnectionNote:
                "AI उत्तरांसाठी कनेक्टेड AI सेवा आवश्यक आहे.",

            voiceSubtitle:
                "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",
            voiceAssistantTitle: "स्मार्ट व्हॉइस सहाय्य",
            voiceDescription:
                "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",
            startVoice: "व्हॉइस सहाय्य सुरू करा",
            stopVoice: "ऐकणे थांबवा",
            voiceInput: "व्हॉइस इनपुट",
            voiceInputPlaceholder:
                "व्हॉइस इनपुट येथे दिसेल...",
            voiceResponse: "व्हॉइस उत्तर",
            voiceReady: "व्हॉइस सहाय्य तयार आहे.",

            profileSubtitle:
                "तुमची शेतकरी माहिती पहा आणि संपादित करा.",
            saveChanges: "बदल जतन करा",
            cancel: "रद्द करा",

            settingsSubtitle:
                "तुमच्या स्मार्टअ‍ॅग्री पसंती व्यवस्थापित करा.",
            changeLanguageDescription:
                "तुमची पसंतीची अ‍ॅप भाषा निवडा.",
            voiceSettingDescription:
                "व्हॉइस सहाय्य सुरू किंवा बंद करा.",
            notifications: "सूचना",
            notificationDescription:
                "अ‍ॅप सूचना सुरू किंवा बंद करा.",

            marketIntelligence: "बाजार माहिती",
            multilingualSupport: "बहुभाषिक सहाय्य",
            aboutDescription:
                "स्मार्टअ‍ॅग्री शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार करण्यात आले आहे."
        }
    };


    /* =====================================================
       3. STATE
    ===================================================== */

    let currentLanguage =
        localStorage.getItem("smartagri_language") || "en";

    let selectedLanguage = null;

    let currentUser = null;

    let currentUserProfile = null;

    let selectedCropImage = null;


    /* =====================================================
       4. BASIC HELPERS
    ===================================================== */

    function $(id) {
        return document.getElementById(id);
    }

    function showScreen(id) {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active-screen");
        });

        const screen = $(id);

        if (screen) {
            screen.classList.add("active-screen");
        }
    }

    function showDashboard() {
        const dashboard = $("dashboardPage");

        if (dashboard) {
            dashboard.classList.add("active-screen");
            dashboard.style.display = "";
        }

        document.querySelectorAll(".screen").forEach(screen => {
            if (screen.id !== "dashboardPage") {
                screen.classList.remove("active-screen");
            }
        });
    }

    function escapeHtml(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function setHidden(element, hidden) {
        if (!element) return;

        element.classList.toggle("hidden", hidden);
    }

    function setMessage(id, message, type = "") {
        const element = $(id);

        if (!element) return;

        element.textContent = message;
        element.className = "message";

        if (type) {
            element.classList.add(type);
        }
    }


    /* =====================================================
       5. TRANSLATION ENGINE
    ===================================================== */

    function translatePage(language) {

        if (!translations[language]) {
            language = "en";
        }

        currentLanguage = language;

        localStorage.setItem(
            "smartagri_language",
            language
        );

        document.documentElement.lang = language;

        document.querySelectorAll("[data-i18n]").forEach(element => {

            const key =
                element.getAttribute("data-i18n");

            if (
                translations[language] &&
                translations[language][key] !== undefined
            ) {
                element.textContent =
                    translations[language][key];
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
                    translations[language] &&
                    translations[language][key] !== undefined
                ) {
                    element.placeholder =
                        translations[language][key];
                }

            });


        /* Update language selectors */

        [
            "dashboardLanguage",
            "settingsLanguage",
            "registerLanguage",
            "profileLanguage"
        ].forEach(id => {

            const element = $(id);

            if (element) {
                element.value = language;
            }

        });


        updateCropInformationLanguage();
    }


    /* =====================================================
       6. LANGUAGE PAGE
    ===================================================== */

    const languageButtons =
        document.querySelectorAll(".language-option");

    const continueLanguageBtn =
        $("continueLanguageBtn");


    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            languageButtons.forEach(btn => {
                btn.classList.remove("selected");
                btn.removeAttribute("aria-selected");
            });

            button.classList.add("selected");
            button.setAttribute("aria-selected", "true");

            selectedLanguage =
                button.getAttribute("data-language");

            if (continueLanguageBtn) {
                continueLanguageBtn.disabled = false;
                continueLanguageBtn.removeAttribute("disabled");
            }

            if (selectedLanguage) {
                translatePage(selectedLanguage);
            }

        });

    });


    if (continueLanguageBtn) {

        continueLanguageBtn.addEventListener("click", event => {

            event.preventDefault();

            const language =
                selectedLanguage ||
                currentLanguage ||
                "en";

            localStorage.setItem(
                "smartagri_language",
                language
            );

            translatePage(language);

            showScreen("loginPage");

        });

    }


    /* Restore previously selected language */

    const savedLanguage =
        localStorage.getItem("smartagri_language");

    if (savedLanguage && translations[savedLanguage]) {

        currentLanguage = savedLanguage;

        const matchingButton =
            document.querySelector(
                `.language-option[data-language="${savedLanguage}"]`
            );

        if (matchingButton) {
            matchingButton.classList.add("selected");
            matchingButton.setAttribute(
                "aria-selected",
                "true"
            );

            selectedLanguage = savedLanguage;

            if (continueLanguageBtn) {
                continueLanguageBtn.disabled = false;
            }
        }
    }

    translatePage(currentLanguage);


    /* =====================================================
       7. LOGIN / REGISTER NAVIGATION
    ===================================================== */

    $("showRegisterBtn")?.addEventListener("click", () => {
        showScreen("registerPage");
    });

    $("showLoginBtn")?.addEventListener("click", () => {
        showScreen("loginPage");
    });

    $("changeLanguageFromLogin")?.addEventListener("click", () => {
        showScreen("languagePage");
    });


    /* =====================================================
       8. FIREBASE REGISTRATION
    ===================================================== */

    $("registrationForm")?.addEventListener("submit", async event => {

        event.preventDefault();

        if (!auth) {
            setMessage(
                "registerMessage",
                "Firebase is not available.",
                "error-message"
            );
            return;
        }

        const name =
            $("registerName")?.value.trim();

        const email =
            $("registerEmail")?.value.trim();

        const mobile =
            $("registerMobile")?.value.trim();

        const village =
            $("registerVillage")?.value.trim();

        const state =
            $("registerState")?.value.trim();

        const landArea =
            $("registerLandArea")?.value.trim();

        const market =
            $("registerMarket")?.value;

        const language =
            $("registerLanguage")?.value || currentLanguage;

        const password =
            $("registerPassword")?.value;


        try {

            setMessage(
                "registerMessage",
                "Creating account..."
            );

            const credential =
                await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );

            const user =
                credential.user;


            if (db && user) {

                await db
                    .collection("farmers")
                    .doc(user.uid)
                    .set({

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

            }


            await user.updateProfile({
                displayName: name
            });


            currentUser = user;

            currentUserProfile = {
                name,
                email,
                mobile,
                village,
                state,
                landArea,
                preferredMarket: market,
                language
            };


            localStorage.setItem(
                "smartagri_language",
                language
            );

            translatePage(language);

            setMessage(
                "registerMessage",
                "Registration successful."
            );

            showDashboard();

            loadProfileData();

            initializeDashboardData();

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setMessage(
                "registerMessage",
                firebaseErrorMessage(error),
                "error-message"
            );

        }

    });


    /* =====================================================
       9. FIREBASE LOGIN
    ===================================================== */

    $("loginForm")?.addEventListener("submit", async event => {

        event.preventDefault();

        if (!auth) {
            setMessage(
                "loginMessage",
                "Firebase is not available.",
                "error-message"
            );
            return;
        }

        const email =
            $("loginEmail")?.value.trim();

        const password =
            $("loginPassword")?.value;


        try {

            setMessage(
                "loginMessage",
                "Logging in..."
            );

            const credential =
                await auth.signInWithEmailAndPassword(
                    email,
                    password
                );

            currentUser =
                credential.user;

            await loadProfileData();

            showDashboard();

            initializeDashboardData();

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setMessage(
                "loginMessage",
                firebaseErrorMessage(error),
                "error-message"
            );

        }

    });


    function firebaseErrorMessage(error) {

        const code =
            error?.code || "";

        const messages = {

            "auth/invalid-email":
                "Please enter a valid email address.",

            "auth/user-not-found":
                "No account exists with this email.",

            "auth/wrong-password":
                "Incorrect password.",

            "auth/invalid-credential":
                "Invalid email or password.",

            "auth/email-already-in-use":
                "This email is already registered.",

            "auth/weak-password":
                "Password must be at least 6 characters.",

            "auth/too-many-requests":
                "Too many attempts. Please try again later."
        };

        return (
            messages[code] ||
            error?.message ||
            "Authentication failed."
        );

    }


    /* =====================================================
       10. DEMO DASHBOARD
    ===================================================== */

    $("demoBtn")?.addEventListener("click", () => {

        currentUser = null;

        currentUserProfile = {

            name: "Demo Farmer",
            email: "demo@smartagri.local",
            mobile: "",
            village: "Kopargaon",
            state: "Maharashtra",
            landArea: "",
            preferredMarket: "Kopargaon APMC",
            language: currentLanguage

        };

        showDashboard();

        loadProfileData();

        initializeDashboardData();

    });


    /* =====================================================
       11. FIREBASE AUTH STATE
    ===================================================== */

    if (auth) {

        auth.onAuthStateChanged(async user => {

            currentUser = user;

            if (user) {

                await loadProfileData();

                showDashboard();

                initializeDashboardData();

            }

        });

    }


    /* =====================================================
       12. PROFILE DATA
    ===================================================== */

    async function loadProfileData() {

        if (!currentUser && !currentUserProfile) {
            return;
        }

        let profile =
            currentUserProfile || {};


        if (db && currentUser) {

            try {

                const snapshot =
                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .get();

                if (snapshot.exists) {
                    profile = {
                        ...profile,
                        ...snapshot.data()
                    };
                }

            } catch (error) {

                console.warn(
                    "Could not load Firestore profile:",
                    error
                );

            }

        }


        if (currentUser) {

            profile.email =
                profile.email ||
                currentUser.email ||
                "";

            profile.name =
                profile.name ||
                currentUser.displayName ||
                "";

        }


        currentUserProfile = profile;


        if (
            profile.language &&
            translations[profile.language]
        ) {
            translatePage(profile.language);
        }


        populateProfile(profile);

    }


    function populateProfile(profile) {

        const name =
            profile.name || "—";

        const email =
            profile.email || "—";

        const mobile =
            profile.mobile || "—";

        const village =
            profile.village || "—";

        const state =
            profile.state || "—";

        const land =
            profile.landArea || "—";

        const market =
            profile.preferredMarket || "—";


        if ($("headerFarmerName"))
            $("headerFarmerName").textContent = name;

        if ($("dashboardFarmerName"))
            $("dashboardFarmerName").textContent = name;

        if ($("summaryName"))
            $("summaryName").textContent = name;

        if ($("summaryVillage"))
            $("summaryVillage").textContent = village;

        if ($("summaryLand"))
            $("summaryLand").textContent = land;

        if ($("summaryMarket"))
            $("summaryMarket").textContent = market;


        if ($("profilePageName"))
            $("profilePageName").textContent = name;

        if ($("profilePageEmail"))
            $("profilePageEmail").textContent = email;


        if ($("profileName"))
            $("profileName").value =
                profile.name || "";

        if ($("profileEmail"))
            $("profileEmail").value =
                profile.email || "";

        if ($("profileMobile"))
            $("profileMobile").value =
                profile.mobile || "";

        if ($("profileVillage"))
            $("profileVillage").value =
                profile.village || "";

        if ($("profileState"))
            $("profileState").value =
                profile.state || "";

        if ($("profileLandArea"))
            $("profileLandArea").value =
                profile.landArea || "";

        if ($("profileMarket"))
            $("profileMarket").value =
                profile.preferredMarket || "";

        if ($("profileLanguage"))
            $("profileLanguage").value =
                profile.language || currentLanguage;

    }


    /* =====================================================
       13. PROFILE EDIT
    ===================================================== */

    $("editProfileBtn")?.addEventListener("click", () => {

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
                element.disabled = false;
            }

        });

        setHidden(
            $("profileEditActions"),
            false
        );

    });


    $("cancelProfileEditBtn")?.addEventListener(
        "click",
        () => {

            populateProfile(
                currentUserProfile || {}
            );

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
                    element.disabled = true;
                }

            });

            setHidden(
                $("profileEditActions"),
                true
            );

        }
    );


    $("profileForm")?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const updatedProfile = {

                ...(currentUserProfile || {}),

                name:
                    $("profileName")?.value.trim(),

                mobile:
                    $("profileMobile")?.value.trim(),

                village:
                    $("profileVillage")?.value.trim(),

                state:
                    $("profileState")?.value.trim(),

                landArea:
                    $("profileLandArea")?.value.trim(),

                preferredMarket:
                    $("profileMarket")?.value,

                language:
                    $("profileLanguage")?.value ||
                    currentLanguage

            };


            try {

                if (db && currentUser) {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .set(
                            updatedProfile,
                            { merge: true }
                        );

                }

                currentUserProfile =
                    updatedProfile;

                populateProfile(
                    updatedProfile
                );

                translatePage(
                    updatedProfile.language
                );


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
                        element.disabled = true;
                    }

                });

                setHidden(
                    $("profileEditActions"),
                    true
                );

                setMessage(
                    "profileMessage",
                    "Profile saved successfully."
                );

            } catch (error) {

                console.error(
                    "Profile save error:",
                    error
                );

                setMessage(
                    "profileMessage",
                    "Could not save profile.",
                    "error-message"
                );

            }

        }
    );


    /* =====================================================
       14. LOGOUT
    ===================================================== */

    async function logout() {

        try {

            if (auth) {
                await auth.signOut();
            }

            currentUser = null;
            currentUserProfile = null;

            if ($("profileMenu")) {
                $("profileMenu").classList.remove("open");
            }

            showScreen("loginPage");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    }

    $("sideLogoutBtn")?.addEventListener(
        "click",
        logout
    );

    $("profileLogoutBtn")?.addEventListener(
        "click",
        logout
    );


    /* =====================================================
       15. CONNECTION STATUS
    ===================================================== */

    function updateConnectionStatus(isOnline) {

        const status =
            $("connectionStatus");

        const text =
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

        if (text) {

            text.textContent =
                translations[currentLanguage][
                    isOnline
                        ? "online"
                        : "offline"
                ];

        }

        if (dashboardText) {

            dashboardText.textContent =
                translations[currentLanguage][
                    isOnline
                        ? "online"
                        : "offline"
                ];

        }

    }


    window.addEventListener(
        "online",
        () => updateConnectionStatus(true)
    );

    window.addEventListener(
        "offline",
        () => updateConnectionStatus(false)
    );

    updateConnectionStatus(
        navigator.onLine
    );


    /* =====================================================
       16. NAVIGATION
    ===================================================== */

    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const sectionId =
                    button.getAttribute(
                        "data-section"
                    );

                if (!sectionId) return;

                document
                    .querySelectorAll(".app-section")
                    .forEach(section => {
                        section.classList.remove(
                            "active-section"
                        );
                    });

                const section =
                    $(sectionId);

                if (section) {
                    section.classList.add(
                        "active-section"
                    );
                }

                closeSideMenu();

                if (sectionId === "weatherSection") {
                    loadWeather();
                }

                if (sectionId === "marketSection") {
                    loadMandiPrices();
                }

                if (sectionId === "comparisonSection") {
                    loadMarketComparison();
                }

            });

        });


    /* =====================================================
       17. SIDE MENU
    ===================================================== */

    function openSideMenu() {

        $("sideMenu")?.classList.add("open");
        $("menuOverlay")?.classList.add("open");

    }

    function closeSideMenu() {

        $("sideMenu")?.classList.remove("open");
        $("menuOverlay")?.classList.remove("open");

    }

    $("hamburgerBtn")?.addEventListener(
        "click",
        openSideMenu
    );

    $("closeMenuBtn")?.addEventListener(
        "click",
        closeSideMenu
    );

    $("menuOverlay")?.addEventListener(
        "click",
        closeSideMenu
    );


    /* =====================================================
       18. PROFILE MENU
    ===================================================== */

    $("profileButton")?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            $("profileMenu")?.classList.toggle(
                "open"
            );

        }
    );

    document
        .querySelectorAll("[data-profile-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const sectionId =
                        button.getAttribute(
                            "data-profile-section"
                        );

                    document
                        .querySelectorAll(".app-section")
                        .forEach(section => {
                            section.classList.remove(
                                "active-section"
                            );
                        });

                    $(sectionId)?.classList.add(
                        "active-section"
                    );

                    $("profileMenu")?.classList.remove(
                        "open"
                    );

                }
            );

        });

    document.addEventListener(
        "click",
        event => {

            const menu =
                $("profileMenu");

            const profileButton =
                $("profileButton");

            if (
                menu &&
                profileButton &&
                !menu.contains(event.target) &&
                !profileButton.contains(event.target)
            ) {
                menu.classList.remove("open");
            }

        }
    );


    /* =====================================================
       19. WEATHER
    ===================================================== */

    $("refreshWeatherBtn")?.addEventListener(
        "click",
        loadWeather
    );


    async function loadWeather() {

        const loading =
            $("weatherLoading");

        const errorBox =
            $("weatherError");

        const empty =
            $("weatherEmptyState");

        const dataBox =
            $("weatherData");


        setHidden(errorBox, true);
        setHidden(empty, true);
        setHidden(dataBox, true);
        setHidden(loading, false);


        try {

            const response =
                await fetch(
                    "/api/weather",
                    {
                        method: "GET",
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    `Weather request failed (${response.status})`
                );
            }


            const current =
                data.current || {};


            if (
                current.temperature_c === null ||
                current.temperature_c === undefined
            ) {

                setHidden(empty, false);
                return;

            }


            $("weatherTemperature").textContent =
                `${current.temperature_c} °C`;

            $("weatherHumidity").textContent =
                `${current.humidity_pct ?? "—"} %`;

            $("weatherWind").textContent =
                `${current.wind_speed_kmh ?? "—"} km/h`;


            const forecast =
                data.forecast || [];

            const today =
                forecast[0];


            if (today) {

                $("weatherRain").textContent =
                    `${today.rain_probability_pct ?? 0}%`;

            } else {

                $("weatherRain").textContent =
                    `${current.precipitation_mm ?? 0} mm`;

            }


            setHidden(dataBox, false);

            updateConnectionStatus(true);

        } catch (error) {

            console.error(
                "Weather error:",
                error
            );

            setHidden(errorBox, false);

            errorBox.textContent =
                error.message ||
                "Unable to load weather data.";

            updateConnectionStatus(false);

        } finally {

            setHidden(loading, true);

        }

    }


    /* =====================================================
       20. MANDI PRICES
    ===================================================== */

    $("cropPriceSelector")?.addEventListener(
        "change",
        loadMandiPrices
    );


    async function loadMandiPrices() {

        const loading =
            $("marketLoading");

        const errorBox =
            $("marketError");

        const body =
            $("marketTableBody");


        setHidden(errorBox, true);
        setHidden(loading, false);


        const selectedCrop =
            $("cropPriceSelector")?.value ||
            "onion";


        const commodity =
            selectedCrop === "wheat"
                ? "Wheat"
                : "Onion";


        try {

            const response =
                await fetch(
                    `/api/mandi?commodity=${encodeURIComponent(
                        commodity
                    )}`,
                    {
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    `Market request failed (${response.status})`
                );
            }


            const prices =
                Array.isArray(data)
                    ? data
                    : (
                        data.prices ||
                        data.records ||
                        []
                    );


            if (!prices.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="4">
                            <div class="table-empty">
                                <span>📊</span>
                                <strong>
                                    ${escapeHtml(
                                        translations[
                                            currentLanguage
                                        ].marketDataUnavailable
                                    )}
                                </strong>
                                <p>
                                    ${escapeHtml(
                                        translations[
                                            currentLanguage
                                        ].marketDataUnavailableDescription
                                    )}
                                </p>
                            </div>
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                prices.map(record => {

                    const market =
                        record.market || "—";

                    const crop =
                        record.commodity ||
                        record.crop ||
                        "—";

                    const modal =
                        record.modal_price ??
                        record.price ??
                        "—";

                    const min =
                        record.min_price;

                    const max =
                        record.max_price;

                    let priceText =
                        `₹${escapeHtml(modal)}`;

                    if (
                        min !== undefined &&
                        min !== null &&
                        max !== undefined &&
                        max !== null
                    ) {
                        priceText =
                            `₹${escapeHtml(min)} – ₹${escapeHtml(max)}
                             <br><small>
                             Modal: ₹${escapeHtml(modal)}
                             </small>`;
                    }

                    const date =
                        record.date ||
                        record.arrival_date ||
                        "—";


                    return `
                        <tr>
                            <td>${escapeHtml(market)}</td>
                            <td>${escapeHtml(crop)}</td>
                            <td>${priceText}</td>
                            <td>${escapeHtml(date)}</td>
                        </tr>
                    `;

                }).join("");


            updateConnectionStatus(true);

        } catch (error) {

            console.error(
                "Mandi error:",
                error
            );

            setHidden(errorBox, false);

            errorBox.textContent =
                error.message ||
                "Unable to load market prices.";

            updateConnectionStatus(false);

        } finally {

            setHidden(loading, true);

        }

    }


    /* =====================================================
       21. MARKET COMPARISON
    ===================================================== */

    async function loadMarketComparison() {

        try {

            const response =
                await fetch(
                    "/api/mandi?commodity=Onion",
                    {
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Market comparison failed."
                );
            }


            const prices =
                Array.isArray(data)
                    ? data
                    : (
                        data.prices ||
                        data.records ||
                        []
                    );


            document
                .querySelectorAll("[data-market-card]")
                .forEach(card => {

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
                        prices.find(item => {

                            const market =
                                String(
                                    item.market ||
                                    ""
                                ).toLowerCase();

                            return market.includes(
                                marketName
                                    .replace(
                                        /market|apmc/gi,
                                        ""
                                    )
                                    .trim()
                                    .toLowerCase()
                            );

                        });


                    if (record) {

                        const price =
                            record.modal_price ??
                            record.max_price ??
                            record.min_price;


                        if (priceElement) {
                            priceElement.textContent =
                                `₹${price}`;
                        }

                        if (statusElement) {
                            statusElement.textContent =
                                translations[
                                    currentLanguage
                                ].price;
                        }

                    } else {

                        if (priceElement) {
                            priceElement.textContent =
                                "—";
                        }

                        if (statusElement) {
                            statusElement.textContent =
                                translations[
                                    currentLanguage
                                ].dataUnavailable;
                        }

                    }

                });


            updateConnectionStatus(true);

        } catch (error) {

            console.error(
                "Comparison error:",
                error
            );

        }

    }


    /* =====================================================
       22. PLANT.ID CROP HEALTH
    ===================================================== */

    const cropImageInput =
        $("cropImageInput");

    const analyzeCropBtn =
        $("analyzeCropBtn");

    const previewContainer =
        $("imagePreviewContainer");

    const previewImage =
        $("cropImagePreview");


    cropImageInput?.addEventListener(
        "change",
        event => {

            const file =
                event.target.files?.[0];

            selectedCropImage =
                file || null;


            if (!file) {

                setHidden(
                    previewContainer,
                    true
                );

                if (analyzeCropBtn) {
                    analyzeCropBtn.disabled = true;
                }

                return;

            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                cropImageInput.value = "";

                selectedCropImage = null;

                if (analyzeCropBtn) {
                    analyzeCropBtn.disabled = true;
                }

                return;

            }


            const reader =
                new FileReader();


            reader.onload = e => {

                if (previewImage) {
                    previewImage.src =
                        e.target.result;
                }

                setHidden(
                    previewContainer,
                    false
                );

            };


            reader.readAsDataURL(file);


            if (analyzeCropBtn) {
                analyzeCropBtn.disabled = false;
            }

        }
    );


    analyzeCropBtn?.addEventListener(
        "click",
        analyzeCrop
    );


    async function analyzeCrop() {

        if (!selectedCropImage) {
            return;
        }


        const resultBox =
            $("cropAnalysisResult");


        analyzeCropBtn.disabled = true;

        resultBox.innerHTML = `
            <strong>Analyzing crop...</strong>
            <p>Please wait while Plant.id analyzes the image.</p>
        `;


        try {

            const formData =
                new FormData();

            formData.append(
                "image",
                selectedCropImage
            );


            const response =
                await fetch(
                    "/api/plant-health",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    data.message ||
                    `Plant.id request failed (${response.status})`
                );

            }


            renderPlantResult(
                data
            );

            updateConnectionStatus(true);

        } catch (error) {

            console.error(
                "Plant.id error:",
                error
            );

            resultBox.innerHTML = `
                <strong>Crop analysis failed</strong>
                <p>${escapeHtml(
                    error.message ||
                    "Unable to analyze the crop."
                )}</p>
            `;

            updateConnectionStatus(false);

        } finally {

            analyzeCropBtn.disabled = false;

        }

    }


    function renderPlantResult(data) {

        const resultBox =
            $("cropAnalysisResult");


        /*
         * Supports several possible Flask response shapes.
         */

        const plant =
            data.result ||
            data;


        const suggestions =
            plant.suggestions ||
            plant.classification?.suggestions ||
            [];


        const health =
            plant.health_assessment ||
            plant.health ||
            plant.health_assessment?.is_healthy;


        let html = `
            <h3>🌱 Crop Analysis</h3>
        `;


        if (suggestions.length) {

            html += `
                <div>
                    <strong>Plant identification</strong>
                    <ul>
            `;

            suggestions
                .slice(0, 5)
                .forEach(item => {

                    const name =
                        item.name ||
                        item.plant_name ||
                        "Unknown";

                    const probability =
                        item.probability !== undefined
                            ? `${(
                                Number(
                                    item.probability
                                ) * 100
                            ).toFixed(1)}%`
                            : "";

                    html += `
                        <li>
                            ${escapeHtml(name)}
                            ${probability
                                ? ` — ${probability}`
                                : ""}
                        </li>
                    `;

                });


            html += `
                    </ul>
                </div>
            `;

        }


        if (health !== undefined) {

            let healthText;

            if (typeof health === "boolean") {

                healthText =
                    health
                        ? "Healthy"
                        : "Potential health issue detected";

            } else {

                healthText =
                    typeof health === "object"
                        ? JSON.stringify(health)
                        : String(health);

            }


            html += `
                <div>
                    <strong>Health assessment</strong>
                    <p>${escapeHtml(
                        healthText
                    )}</p>
                </div>
            `;

        }


        if (
            !suggestions.length &&
            health === undefined
        ) {

            html += `
                <p>
                    ${escapeHtml(
                        data.message ||
                        "Plant.id returned an analysis, but no standard result fields were found."
                    )}
                </p>
            `;

        }


        resultBox.innerHTML =
            html;

    }


    /* =====================================================
       23. OPENAI ASSISTANT
    ===================================================== */

    $("aiForm")?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const input =
                $("aiInput");

            const sendButton =
                $("aiSendButton");

            const message =
                input?.value.trim();


            if (!message) {
                return;
            }


            appendChatMessage(
                "user",
                message
            );

            input.value = "";

            sendButton.disabled = true;


            try {

                const response =
                    await fetch(
                        "/api/ai",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                                "Accept":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                message,

                                language:
                                    currentLanguage,

                                user:
                                    currentUserProfile || {}

                            })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        data.message ||
                        `AI request failed (${response.status})`
                    );

                }


                const answer =
                    data.answer ||
                    data.response ||
                    data.message ||
                    data.content ||
                    "No AI response received.";


                appendChatMessage(
                    "assistant",
                    answer
                );


                if ($("aiConnectionText")) {

                    $("aiConnectionText").textContent =
                        translations[
                            currentLanguage
                        ].online;

                }


                $("aiConnectionBadge")
                    ?.classList.remove(
                        "not-connected-badge"
                    );


                updateConnectionStatus(true);

            } catch (error) {

                console.error(
                    "OpenAI error:",
                    error
                );

                appendChatMessage(
                    "assistant",
                    error.message ||
                    "Unable to connect to the AI assistant."
                );

            } finally {

                sendButton.disabled = false;

                input?.focus();

            }

        }
    );


    function appendChatMessage(
        sender,
        message
    ) {

        const container =
            $("chatMessages");

        if (!container) return;


        const wrapper =
            document.createElement("div");

        wrapper.className =
            sender === "user"
                ? "chat-message user-message"
                : "chat-message assistant-message";


        const avatar =
            sender === "user"
                ? "👨‍🌾"
                : "🤖";


        const label =
            sender === "user"
                ? (
                    currentUserProfile?.name ||
                    "You"
                )
                : (
                    translations[
                        currentLanguage
                    ].assistant
                );


        wrapper.innerHTML = `
            <div class="chat-avatar">
                ${avatar}
            </div>

            <div>
                <strong>
                    ${escapeHtml(label)}
                </strong>

                <p>
                    ${escapeHtml(message)}
                </p>
            </div>
        `;


        container.appendChild(
            wrapper
        );

        container.scrollTop =
            container.scrollHeight;

    }


    /* =====================================================
       24. VOICE ASSISTANCE
    ===================================================== */

    let recognition = null;


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        recognition =
            new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = false;

        recognition.lang =
            speechLanguage(currentLanguage);


        recognition.onstart = () => {

            setHidden(
                $("stopVoiceBtn"),
                false
            );

            setHidden(
                $("startVoiceBtn"),
                true
            );

            if ($("voiceResponse")) {
                $("voiceResponse").textContent =
                    "Listening...";
            }

        };


        recognition.onresult = event => {

            const transcript =
                event.results[
                    event.results.length - 1
                ][0].transcript;


            if ($("voiceInput")) {
                $("voiceInput").value =
                    transcript;
            }


            askVoiceAssistant(
                transcript
            );

        };


        recognition.onerror = event => {

            console.error(
                "Voice recognition error:",
                event.error
            );

            if ($("voiceResponse")) {
                $("voiceResponse").textContent =
                    "Voice recognition error: " +
                    event.error;
            }

        };


        recognition.onend = () => {

            setHidden(
                $("stopVoiceBtn"),
                true
            );

            setHidden(
                $("startVoiceBtn"),
                false
            );

        };

    }


    $("startVoiceBtn")?.addEventListener(
        "click",
        () => {

            if (!recognition) {

                if ($("voiceResponse")) {
                    $("voiceResponse").textContent =
                        "Voice recognition is not supported by this browser.";
                }

                return;

            }


            recognition.lang =
                speechLanguage(
                    currentLanguage
                );


            try {
                recognition.start();
            } catch (error) {
                console.warn(error);
            }

        }
    );


    $("stopVoiceBtn")?.addEventListener(
        "click",
        () => {

            if (recognition) {
                recognition.stop();
            }

        }
    );


    function speechLanguage(language) {

        if (language === "hi") {
            return "hi-IN";
        }

        if (language === "mr") {
            return "mr-IN";
        }

        return "en-IN";

    }


    async function askVoiceAssistant(text) {

        if (!text) return;


        if ($("voiceResponse")) {
            $("voiceResponse").textContent =
                "Getting AI response...";
        }


        try {

            const response =
                await fetch(
                    "/api/ai",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({

                            message: text,

                            language:
                                currentLanguage,

                            user:
                                currentUserProfile || {}

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    data.message ||
                    "AI request failed."
                );

            }


            const answer =
                data.answer ||
                data.response ||
                data.message ||
                data.content ||
                "";


            if ($("voiceResponse")) {
                $("voiceResponse").textContent =
                    answer;
            }


            speakText(
                answer,
                currentLanguage
            );

        } catch (error) {

            console.error(
                "Voice AI error:",
                error
            );

            if ($("voiceResponse")) {
                $("voiceResponse").textContent =
                    error.message ||
                    "Unable to get an AI response.";
            }

        }

    }


    function speakText(
        text,
        language
    ) {

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


        utterance.lang =
            speechLanguage(language);


        window.speechSynthesis.speak(
            utterance
        );

    }


    /* =====================================================
       25. DASHBOARD LANGUAGE SELECTOR
    ===================================================== */

    $("dashboardLanguage")?.addEventListener(
        "change",
        event => {

            const language =
                event.target.value;

            translatePage(
                language
            );

            if (currentUserProfile) {

                currentUserProfile.language =
                    language;

            }

            if (recognition) {
                recognition.lang =
                    speechLanguage(language);
            }

        }
    );


    $("settingsLanguage")?.addEventListener(
        "change",
        event => {

            const language =
                event.target.value;

            translatePage(
                language
            );

            if (currentUserProfile) {
                currentUserProfile.language =
                    language;
            }

            saveLanguageToFirebase(
                language
            );

        }
    );


    async function saveLanguageToFirebase(
        language
    ) {

        if (
            !db ||
            !currentUser
        ) {
            return;
        }


        try {

            await db
                .collection("farmers")
                .doc(currentUser.uid)
                .set(
                    { language },
                    { merge: true }
                );

        } catch (error) {

            console.warn(
                "Could not save language:",
                error
            );

        }

    }


    /* =====================================================
       26. CROP INFORMATION TRANSLATION
    ===================================================== */

    function updateCropInformationLanguage() {

        /*
         * The crop modal data is inside your HTML.
         * These replacements update the existing modal content
         * when the selected language changes.
         */

        const modalTitle =
            $("cropInfoModalTitle");

        const modalSubtitle =
            $("cropInfoModalSubtitle");

        const modalBody =
            $("cropInfoModalBody");


        if (!modalTitle || !modalBody) {
            return;
        }


        const activeButton =
            document.querySelector(
                ".crop-info-button.active-crop-info"
            );


        if (!activeButton) {
            return;
        }


        const crop =
            activeButton.getAttribute(
                "data-crop"
            );

        const topic =
            activeButton.getAttribute(
                "data-topic"
            );


        const content =
            getTranslatedCropContent(
                crop,
                topic,
                currentLanguage
            );


        if (!content) {
            return;
        }


        modalTitle.textContent =
            content.title;

        modalSubtitle.textContent =
            content.subtitle;

        modalBody.innerHTML =
            content.body;

    }


    function getTranslatedCropContent(
        crop,
        topic,
        language
    ) {

        const data = {

            en: {

                onion: {

                    cultivation: {
                        title: "Onion Cultivation Guidance",
                        subtitle: "Important steps for successful onion cultivation.",
                        body: `
                            <h3>🌱 Land Preparation</h3>
                            <p>Prepare a fine, well-drained seedbed. Onion grows well in loose soil with good drainage.</p>

                            <h3>🌱 Planting</h3>
                            <p>Use healthy and disease-free seedlings or suitable planting material. Maintain appropriate spacing.</p>

                            <h3>💧 Irrigation</h3>
                            <p>Maintain adequate soil moisture during crop growth. Avoid excessive irrigation and waterlogging.</p>

                            <h3>☀️ Field Conditions</h3>
                            <p>Provide adequate sunlight and maintain good air circulation around the crop.</p>
                        `
                    },

                    management: {
                        title: "Onion Crop Management",
                        subtitle: "Manage the crop throughout its growing period.",
                        body: `
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
                        subtitle: "Practical recommendations for better onion production.",
                        body: `
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
                        subtitle: "Important steps for successful wheat production.",
                        body: `
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
                        subtitle: "Manage wheat from germination through harvest.",
                        body: `
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
                        subtitle: "Practical methods for maintaining a healthy wheat crop.",
                        body: `
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
                        subtitle: "सफल प्याज की खेती के लिए महत्वपूर्ण चरण।",
                        body: `
                            <h3>🌱 भूमि की तैयारी</h3>
                            <p>बारीक और अच्छी जल निकासी वाली क्यारी तैयार करें। प्याज ढीली और अच्छी जल निकासी वाली मिट्टी में अच्छी तरह बढ़ता है।</p>

                            <h3>🌱 रोपण</h3>
                            <p>स्वस्थ और रोगमुक्त पौध या उपयुक्त रोपण सामग्री का उपयोग करें। उचित दूरी बनाए रखें।</p>

                            <h3>💧 सिंचाई</h3>
                            <p>फसल के दौरान मिट्टी में पर्याप्त नमी रखें। अत्यधिक सिंचाई और जलभराव से बचें।</p>

                            <h3>☀️ खेत की स्थिति</h3>
                            <p>पर्याप्त धूप और पौधों के बीच अच्छी हवा का आवागमन सुनिश्चित करें।</p>
                        `
                    },

                    management: {
                        title: "प्याज फसल प्रबंधन",
                        subtitle: "पूरे फसल चक्र में फसल का प्रबंधन करें।",
                        body: `
                            <h3>💧 जल प्रबंधन</h3>
                            <p>विशेष रूप से कंद बनने के समय मिट्टी में लगातार नमी बनाए रखें। अत्यधिक सिंचाई से बचें।</p>

                            <h3>🌿 खरपतवार प्रबंधन</h3>
                            <p>खेत को खरपतवार से मुक्त रखें क्योंकि वे पानी, पोषक तत्व और धूप के लिए प्रतिस्पर्धा करते हैं।</p>

                            <h3>🧪 पोषक तत्व प्रबंधन</h3>
                            <p>मिट्टी की स्थिति और मिट्टी परीक्षण के अनुसार पोषक तत्व दें।</p>

                            <h3>🔍 फसल निगरानी</h3>
                            <p>कीट, रोग, पत्तियों का पीला होना और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>
                        `
                    },

                    practices: {
                        title: "प्याज की खेती की पद्धतियां",
                        subtitle: "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।",
                        body: `
                            <h3>🚜 खेत की स्वच्छता</h3>
                            <p>रोगग्रस्त पौधों को हटाएं और खेती का क्षेत्र साफ रखें।</p>

                            <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                            <p>स्वस्थ और रोगमुक्त पौध या रोपण सामग्री से शुरुआत करें।</p>

                            <h3>🔄 फसल चक्र</h3>
                            <p>जहां संभव हो फसल चक्र अपनाएं ताकि मिट्टी का स्वास्थ्य बेहतर रहे और बार-बार होने वाली समस्याएं कम हों।</p>

                            <h3>📦 कटाई प्रबंधन</h3>
                            <p>उचित परिपक्वता पर प्याज की कटाई करें और भंडारण से पहले सही तरीके से सुखाएं।</p>
                        `
                    }

                },

                wheat: {

                    cultivation: {
                        title: "गेहूं की खेती का मार्गदर्शन",
                        subtitle: "सफल गेहूं उत्पादन के लिए महत्वपूर्ण चरण।",
                        body: `
                            <h3>🌱 मिट्टी की तैयारी</h3>
                            <p>समान अंकुरण के लिए खेत को अच्छी तरह समतल और तैयार करें।</p>

                            <h3>🌾 बीज चयन</h3>
                            <p>स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और अच्छी गुणवत्ता वाले बीज का उपयोग करें।</p>

                            <h3>💧 सिंचाई</h3>
                            <p>फसल की अवस्था, मिट्टी की नमी और मौसम के अनुसार सिंचाई करें।</p>

                            <h3>☀️ फसल की स्थिति</h3>
                            <p>गेहूं सामान्यतः उपयुक्त ठंडी परिस्थितियों और पर्याप्त धूप में अच्छी तरह बढ़ता है।</p>
                        `
                    },

                    management: {
                        title: "गेहूं फसल प्रबंधन",
                        subtitle: "अंकुरण से कटाई तक गेहूं का प्रबंधन करें।",
                        body: `
                            <h3>💧 सिंचाई प्रबंधन</h3>
                            <p>फसल की महत्वपूर्ण अवस्थाओं में सिंचाई पर विशेष ध्यान दें।</p>

                            <h3>🌿 खरपतवार नियंत्रण</h3>
                            <p>खेत में खरपतवार की निगरानी करें और उचित एकीकृत प्रबंधन अपनाएं।</p>

                            <h3>🔍 कीट निगरानी</h3>
                            <p>कीट, रोग के लक्षण और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>

                            <h3>🧪 पोषक तत्व प्रबंधन</h3>
                            <p>मिट्टी परीक्षण और अनुशंसित फसल आवश्यकताओं के अनुसार उर्वरक दें।</p>
                        `
                    },

                    practices: {
                        title: "गेहूं की खेती की पद्धतियां",
                        subtitle: "स्वस्थ गेहूं की फसल के लिए व्यावहारिक तरीके।",
                        body: `
                            <h3>🌱 समय पर बुवाई</h3>
                            <p>स्थानीय क्षेत्र और गेहूं की किस्म के लिए अनुशंसित बुवाई समय का पालन करें।</p>

                            <h3>🚜 खेत की तैयारी</h3>
                            <p>समान फसल स्थापना के लिए खेत को समतल और अच्छी तरह तैयार रखें।</p>

                            <h3>🔄 फसल चक्र</h3>
                            <p>फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है और बार-बार होने वाली समस्याओं को कम कर सकता है।</p>

                            <h3>🌾 कटाई</h3>
                            <p>उचित परिपक्वता और उपयुक्त नमी होने पर कटाई करें।</p>
                        `
                    }

                }

            },


            mr: {

                onion: {

                    cultivation: {
                        title: "कांदा लागवड मार्गदर्शन",
                        subtitle: "यशस्वी कांदा लागवडीसाठी महत्त्वाचे टप्पे.",
                        body: `
                            <h3>🌱 जमिनीची तयारी</h3>
                            <p>भुसभुशीत आणि चांगला निचरा होणारी जमीन तयार करा. कांदा अशा जमिनीत चांगला वाढतो.</p>

                            <h3>🌱 लागवड</h3>
                            <p>निरोगी आणि रोगमुक्त रोपे किंवा योग्य लागवड साहित्य वापरा. योग्य अंतर ठेवा.</p>

                            <h3>💧 सिंचन</h3>
                            <p>पिकाच्या वाढीदरम्यान जमिनीत योग्य ओलावा ठेवा. जास्त पाणी आणि पाणी साचणे टाळा.</p>

                            <h3>☀️ शेताची परिस्थिती</h3>
                            <p>पुरेसा सूर्यप्रकाश आणि चांगली हवा खेळती राहील याची काळजी घ्या.</p>
                        `
                    },

                    management: {
                        title: "कांदा पीक व्यवस्थापन",
                        subtitle: "संपूर्ण पीक कालावधीत योग्य व्यवस्थापन करा.",
                        body: `
                            <h3>💧 पाणी व्यवस्थापन</h3>
                            <p>विशेषतः कांदा तयार होत असताना जमिनीत सातत्याने ओलावा ठेवा. जास्त सिंचन टाळा.</p>

                            <h3>🌿 तण व्यवस्थापन</h3>
                            <p>शेत तणमुक्त ठेवा कारण तण पाणी, अन्नद्रव्ये आणि सूर्यप्रकाशासाठी पिकाशी स्पर्धा करते.</p>

                            <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                            <p>मातीची स्थिती आणि माती परीक्षणानुसार अन्नद्रव्यांचा वापर करा.</p>

                            <h3>🔍 पीक निरीक्षण</h3>
                            <p>किडी, रोग, पाने पिवळी होणे आणि असामान्य वाढ यासाठी नियमित निरीक्षण करा.</p>
                        `
                    },

                    practices: {
                        title: "कांदा शेती पद्धती",
                        subtitle: "चांगल्या कांदा उत्पादनासाठी व्यावहारिक सूचना.",
                        body: `
                            <h3>🚜 शेत स्वच्छता</h3>
                            <p>रोगट झाडे काढून टाका आणि शेतीचे क्षेत्र स्वच्छ ठेवा.</p>

                            <h3>🌱 निरोगी लागवड साहित्य</h3>
                            <p>निरोगी आणि रोगमुक्त रोपांपासून लागवड सुरू करा.</p>

                            <h3>🔄 पीक फेरपालट</h3>
                            <p>शक्य असल्यास पीक फेरपालट करा. यामुळे जमिनीचे आरोग्य सुधारण्यास मदत होते.</p>

                            <h3>📦 काढणी व्यवस्थापन</h3>
                            <p>योग्य परिपक्वतेवर कांद्याची काढणी करा आणि साठवणुकीपूर्वी योग्य प्रकारे वाळवा.</p>
                        `
                    }

                },

                wheat: {

                    cultivation: {
                        title: "गहू लागवड मार्गदर्शन",
                        subtitle: "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे.",
                        body: `
                            <h3>🌱 जमिनीची तयारी</h3>
                            <p>समान उगवण होण्यासाठी जमीन योग्य प्रकारे समतल आणि तयार करा.</p>

                            <h3>🌾 बियाणे निवड</h3>
                            <p>स्थानिक भागासाठी शिफारस केलेले निरोगी आणि दर्जेदार बियाणे वापरा.</p>

                            <h3>💧 सिंचन</h3>
                            <p>पिकाची वाढीची अवस्था, जमिनीतील ओलावा आणि हवामानानुसार सिंचन करा.</p>

                            <h3>☀️ पिकाची परिस्थिती</h3>
                            <p>गहू योग्य थंड हवामान आणि पुरेशा सूर्यप्रकाशात चांगला वाढतो.</p>
                        `
                    },

                    management: {
                        title: "गहू पीक व्यवस्थापन",
                        subtitle: "उगवणीपासून काढणीपर्यंत गव्हाचे व्यवस्थापन करा.",
                        body: `
                            <h3>💧 सिंचन व्यवस्थापन</h3>
                            <p>पिकाच्या महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे विशेष लक्ष द्या.</p>

                            <h3>🌿 तण नियंत्रण</h3>
                            <p>शेतातील तणांचे निरीक्षण करा आणि योग्य एकात्मिक तण व्यवस्थापन पद्धती वापरा.</p>

                            <h3>🔍 कीड निरीक्षण</h3>
                            <p>किडी, रोगाची लक्षणे आणि असामान्य वाढ यासाठी नियमित निरीक्षण करा.</p>

                            <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                            <p>माती परीक्षण आणि शिफारस केलेल्या पीक गरजेनुसार खतांचा वापर करा.</p>
                        `
                    },

                    practices: {
                        title: "गहू शेती पद्धती",
                        subtitle: "निरोगी गहू पिकासाठी व्यावहारिक पद्धती.",
                        body: `
                            <h3>🌱 वेळेवर पेरणी</h3>
                            <p>स्थानिक भाग आणि निवडलेल्या गव्हाच्या वाणासाठी शिफारस केलेल्या पेरणी कालावधीचे पालन करा.</p>

                            <h3>🚜 शेताची तयारी</h3>
                            <p>समान पीक वाढीसाठी जमीन समतल आणि योग्य प्रकारे तयार ठेवा.</p>

                            <h3>🔄 पीक फेरपालट</h3>
                            <p>पीक फेरपालट केल्याने जमिनीचे व्यवस्थापन सुधारण्यास आणि वारंवार होणाऱ्या समस्या कमी करण्यास मदत होते.</p>

                            <h3>🌾 काढणी</h3>
                            <p>पीक योग्य परिपक्वतेवर आणि योग्य ओलाव्यावर पोहोचल्यावर काढणी करा.</p>
                        `
                    }

                }

            }

        };


        return (
            data[language]?.[crop]?.[topic] ||
            data.en?.[crop]?.[topic] ||
            null
        );

    }


    /* =====================================================
       27. CONNECT CROP BUTTONS TO TRANSLATED MODAL
    ===================================================== */

    document
        .querySelectorAll(".crop-info-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".crop-info-button"
                        )
                        .forEach(btn => {
                            btn.classList.remove(
                                "active-crop-info"
                            );
                        });

                    button.classList.add(
                        "active-crop-info"
                    );

                    const crop =
                        button.getAttribute(
                            "data-crop"
                        );

                    const topic =
                        button.getAttribute(
                            "data-topic"
                        );


                    const content =
                        getTranslatedCropContent(
                            crop,
                            topic,
                            currentLanguage
                        );


                    if (!content) return;


                    if ($("cropInfoModalIcon")) {

                        $("cropInfoModalIcon").textContent =
                            crop === "onion"
                                ? "🧅"
                                : "🌾";

                    }


                    if ($("cropInfoModalTitle")) {

                        $("cropInfoModalTitle").textContent =
                            content.title;

                    }


                    if ($("cropInfoModalSubtitle")) {

                        $("cropInfoModalSubtitle").textContent =
                            content.subtitle;

                    }


                    if ($("cropInfoModalBody")) {

                        $("cropInfoModalBody").innerHTML =
                            content.body;

                    }


                    $("cropInfoModal")
                        ?.classList.remove(
                            "hidden"
                        );

                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );

        });


    $("closeCropInfoBtn")?.addEventListener(
        "click",
        closeCropModal
    );

    $("cropInfoModalOverlay")?.addEventListener(
        "click",
        closeCropModal
    );


    function closeCropModal() {

        $("cropInfoModal")
            ?.classList.add(
                "hidden"
            );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       28. GOVERNMENT SCHEMES
    ===================================================== */

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


    /* =====================================================
       29. INITIAL DASHBOARD LOAD
    ===================================================== */

    async function initializeDashboardData() {

        updateConnectionStatus(
            navigator.onLine
        );

        /*
         * Do not automatically call every API at once.
         * Load weather immediately because it is the first
         * connected service, while market data loads when
         * its section is opened.
         */

        if (navigator.onLine) {

            await loadWeather();

        }

    }


    /* =====================================================
       30. SETTINGS
    ===================================================== */

    $("voiceSetting")?.addEventListener(
        "change",
        event => {

            const enabled =
                event.target.checked;

            if (!enabled && recognition) {

                try {
                    recognition.stop();
                } catch (_) {}

            }

        }
    );


    /* =====================================================
       31. FORGOT PASSWORD
    ===================================================== */

    $("forgotPasswordBtn")?.addEventListener(
        "click",
        async () => {

            if (!auth) {
                alert(
                    "Firebase is not available."
                );
                return;
            }


            const email =
                $("loginEmail")?.value.trim();


            if (!email) {

                alert(
                    "Enter your email address first."
                );

                $("loginEmail")?.focus();

                return;

            }


            try {

                await auth.sendPasswordResetEmail(
                    email
                );

                setMessage(
                    "loginMessage",
                    "Password reset email sent."
                );

            } catch (error) {

                setMessage(
                    "loginMessage",
                    firebaseErrorMessage(error),
                    "error-message"
                );

            }

        }
    );


    /* =====================================================
       32. INITIAL STATE
    ===================================================== */

    /*
     * Make sure the dashboard is not accidentally shown
     * before login/demo.
     */

    const dashboard =
        $("dashboardPage");

    if (
        dashboard &&
        !dashboard.classList.contains(
            "active-screen"
        )
    ) {
        dashboard.style.display = "";
    }


    console.log(
        "SmartAgri script.js loaded successfully."
    );

});
