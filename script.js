/* =========================================================
   SMARTAGRI - COMPLETE FRONTEND SCRIPT
   Matches the supplied HTML IDs
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SmartAgri script.js loaded successfully.");

    /* =====================================================
       FIREBASE
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

    let auth = null;
    let db = null;

    try {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();
        db = firebase.firestore();

        console.log("Firebase initialized.");

    } catch (error) {

        console.error("Firebase initialization error:", error);

    }


    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let selectedLanguage =
        localStorage.getItem("smartagri_language") || "en";

    let currentUser = null;

    let currentWeather = null;
    let currentMarket = [];
    let currentComparison = [];

    let recognition = null;


    /* =====================================================
       TRANSLATIONS
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
            offline: "Offline",
            online: "Online",
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
            weatherUnavailableDescription: "No verified weather data has been received.",

            marketSubtitle: "Current crop prices from connected verified sources.",
            marketPriceTable: "Market Price Table",
            market: "Market",
            crop: "Crop",
            price: "Price",
            date: "Date",
            onion: "Onion",
            wheat: "Wheat",
            marketDataUnavailable: "Market data unavailable",
            marketDataUnavailableDescription: "No verified market data has been received.",
            dataUnavailable: "Verified data unavailable",

            cropSubtitle: "Cultivation and crop management guidance.",
            onionInfo: "Onion cultivation information.",
            wheatInfo: "Wheat cultivation information.",
            cultivationGuidance: "Cultivation Guidance",
            cropManagement: "Crop Management",
            farmingPractices: "Farming Practices",

            cropHealthSubtitle: "Upload a crop image for AI-assisted analysis.",
            uploadCropImage: "Upload Crop / Leaf Image",
            uploadCropDescription: "Select an image for crop health analysis.",
            chooseImage: "Choose Image",
            analyzeCrop: "Analyze Crop",
            analysisNotConnected: "AI crop analysis is not connected",
            analysisNotConnectedDescription: "Connect a verified crop-health AI service before displaying analysis.",

            schemesSubtitle: "Farmer support and government agricultural programs.",
            pmKisanDescription: "Official PM-KISAN farmer support information.",
            pmksyDescription: "Official irrigation and water-management information.",
            cropInsurance: "Crop Insurance",
            cropInsuranceDescription: "Official Pradhan Mantri Fasal Bima Yojana information.",
            learnMore: "Learn More",

            aiSubtitle: "Ask farming-related questions.",
            smartAssistant: "Smart Farmer Assistant",
            aiNotConnected: "AI Not Connected",
            assistant: "Assistant",
            aiUnavailable: "Ask a farming question to get assistance.",
            askQuestion: "Ask a farming question...",
            aiConnectionNote: "AI responses require a connected AI service/backend.",

            voiceSubtitle: "Speak and listen in your preferred language.",
            voiceAssistantTitle: "Smart Voice Assistance",
            voiceDescription: "Speak using your device microphone.",
            startVoice: "Start Voice Assistance",
            stopVoice: "Stop Listening",
            voiceInput: "Voice Input",
            voiceResponse: "Voice Response",
            voiceReady: "Voice assistance is ready.",
            voiceInputPlaceholder: "Voice input will appear here...",

            profileSubtitle: "View and edit your farmer information.",
            saveChanges: "Save Changes",
            cancel: "Cancel",

            settingsSubtitle: "Manage your SmartAgri preferences.",
            changeLanguageDescription: "Select your preferred application language.",
            voiceSettingDescription: "Enable or disable voice assistance.",
            notifications: "Notifications",
            notificationDescription: "Enable or disable application notifications.",

            about: "About SmartAgri",
            marketIntelligence: "Market Intelligence",
            multilingualSupport: "Multilingual Support",
            aboutDescription:
                "SmartAgri is designed to provide farmers with accessible agricultural information, market intelligence, crop guidance and digital farming assistance."
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
            register: "रजिस्टर करें",
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
            voiceAssistance: "वॉयस सहायता",
            farmerProfile: "किसान प्रोफ़ाइल",
            settings: "सेटिंग्स",
            about: "SmartAgri के बारे में",
            logout: "लॉगआउट",

            welcome: "स्वागत है",
            dashboardSubtitle: "आपकी खेती की जानकारी एक जगह।",
            connectionStatus: "कनेक्शन स्थिति",
            offline: "ऑफलाइन",
            online: "ऑनलाइन",
            profileSummary: "आपकी पंजीकृत जानकारी",
            editProfile: "प्रोफ़ाइल संपादित करें",
            quickActions: "त्वरित कार्य",
            quickActionsSubtitle: "महत्वपूर्ण कृषि उपकरण जल्दी खोलें।",
            liveDataTitle: "लाइव डेटा",
            liveDataDescription: "केवल सत्यापित कनेक्टेड डेटा दिखाया जाता है।",

            weatherSubtitle: "खेती के निर्णयों के लिए स्थानीय मौसम।",
            currentWeather: "वर्तमान मौसम",
            refresh: "रिफ्रेश",
            temperature: "तापमान",
            humidity: "नमी",
            windSpeed: "हवा की गति",
            rainChance: "बारिश की संभावना",
            weatherUnavailable: "मौसम डेटा उपलब्ध नहीं है",
            weatherUnavailableDescription: "कोई सत्यापित मौसम डेटा प्राप्त नहीं हुआ।",

            marketSubtitle: "सत्यापित स्रोतों से वर्तमान फसल बाजार भाव।",
            marketPriceTable: "बाजार भाव तालिका",
            market: "बाजार",
            crop: "फसल",
            price: "भाव",
            date: "तारीख",
            onion: "प्याज",
            wheat: "गेहूं",
            marketDataUnavailable: "बाजार डेटा उपलब्ध नहीं है",
            marketDataUnavailableDescription: "कोई सत्यापित बाजार डेटा प्राप्त नहीं हुआ।",
            dataUnavailable: "सत्यापित डेटा उपलब्ध नहीं है",

            cropSubtitle: "फसल उत्पादन और प्रबंधन मार्गदर्शन।",
            onionInfo: "प्याज की खेती की जानकारी।",
            wheatInfo: "गेहूं की खेती की जानकारी।",
            cultivationGuidance: "खेती मार्गदर्शन",
            cropManagement: "फसल प्रबंधन",
            farmingPractices: "कृषि पद्धतियां",

            cropHealthSubtitle: "AI विश्लेषण के लिए फसल की तस्वीर अपलोड करें।",
            uploadCropImage: "फसल / पत्ती की तस्वीर अपलोड करें",
            uploadCropDescription: "फसल स्वास्थ्य विश्लेषण के लिए तस्वीर चुनें।",
            chooseImage: "तस्वीर चुनें",
            analyzeCrop: "फसल का विश्लेषण करें",
            analysisNotConnected: "AI फसल विश्लेषण कनेक्ट नहीं है",
            analysisNotConnectedDescription: "विश्लेषण दिखाने के लिए सत्यापित फसल स्वास्थ्य सेवा कनेक्ट करें।",

            schemesSubtitle: "किसानों के लिए सरकारी कृषि सहायता और योजनाएं।",
            pmKisanDescription: "आधिकारिक PM-KISAN किसान सहायता जानकारी।",
            pmksyDescription: "आधिकारिक सिंचाई और जल प्रबंधन जानकारी।",
            cropInsurance: "फसल बीमा",
            cropInsuranceDescription: "प्रधानमंत्री फसल बीमा योजना की आधिकारिक जानकारी।",
            learnMore: "और जानें",

            aiSubtitle: "खेती से जुड़े प्रश्न पूछें।",
            smartAssistant: "स्मार्ट किसान सहायक",
            aiNotConnected: "AI कनेक्ट नहीं है",
            assistant: "सहायक",
            aiUnavailable: "सहायता पाने के लिए खेती से जुड़ा प्रश्न पूछें।",
            askQuestion: "खेती से जुड़ा प्रश्न पूछें...",
            aiConnectionNote: "AI उत्तरों के लिए AI सेवा/बैकएंड कनेक्ट होना आवश्यक है।",

            voiceSubtitle: "अपनी पसंदीदा भाषा में बोलें और सुनें।",
            voiceAssistantTitle: "स्मार्ट वॉयस सहायता",
            voiceDescription: "अपने डिवाइस के माइक्रोफोन का उपयोग करें।",
            startVoice: "वॉयस सहायता शुरू करें",
            stopVoice: "सुनना बंद करें",
            voiceInput: "वॉयस इनपुट",
            voiceResponse: "वॉयस उत्तर",
            voiceReady: "वॉयस सहायता तैयार है।",
            voiceInputPlaceholder: "वॉयस इनपुट यहां दिखाई देगा...",

            profileSubtitle: "किसान जानकारी देखें और संपादित करें।",
            saveChanges: "परिवर्तन सहेजें",
            cancel: "रद्द करें",

            settingsSubtitle: "SmartAgri की प्राथमिकताएं प्रबंधित करें।",
            changeLanguageDescription: "अपनी पसंदीदा एप्लिकेशन भाषा चुनें।",
            voiceSettingDescription: "वॉयस सहायता चालू या बंद करें।",
            notifications: "सूचनाएं",
            notificationDescription: "एप्लिकेशन सूचनाएं चालू या बंद करें।",

            marketIntelligence: "बाजार जानकारी",
            multilingualSupport: "बहुभाषी सहायता",
            aboutDescription:
                "SmartAgri किसानों को कृषि जानकारी, बाजार जानकारी, फसल मार्गदर्शन और डिजिटल कृषि सहायता प्रदान करने के लिए बनाया गया है।"
        },


        mr: {

            appName: "स्मार्टअॅग्री",
            appTagline: "स्मार्ट कृषी बाजार माहिती प्रणाली",
            chooseLanguage: "तुमची भाषा निवडा",
            languageDescription: "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",
            continue: "पुढे जा",

            loginTitle: "शेतकरी लॉगिन",
            loginSubtitle: "SmartAgri मध्ये प्रवेश करा",
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
            registrationSubtitle: "तुमचे SmartAgri शेतकरी खाते तयार करा",
            fullName: "पूर्ण नाव",
            mobile: "मोबाइल नंबर",
            village: "गाव",
            state: "राज्य",
            landArea: "जमिनीचे क्षेत्रफळ",
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
            governmentSchemes: "सरकारी योजना",
            aiAssistant: "AI सहाय्यक",
            voiceAssistance: "आवाज सहाय्य",
            farmerProfile: "शेतकरी प्रोफाइल",
            settings: "सेटिंग्ज",
            about: "SmartAgri बद्दल",
            logout: "लॉगआउट",

            welcome: "स्वागत",
            dashboardSubtitle: "तुमची शेतीविषयक माहिती एका ठिकाणी.",
            connectionStatus: "कनेक्शन स्थिती",
            offline: "ऑफलाइन",
            online: "ऑनलाइन",
            profileSummary: "तुमची नोंदणीकृत माहिती",
            editProfile: "प्रोफाइल संपादित करा",
            quickActions: "जलद कृती",
            quickActionsSubtitle: "महत्त्वाची शेती साधने पटकन वापरा.",
            liveDataTitle: "लाइव्ह डेटा",
            liveDataDescription: "फक्त सत्यापित कनेक्टेड डेटा दाखवला जातो.",

            weatherSubtitle: "शेतीच्या निर्णयांसाठी स्थानिक हवामान.",
            currentWeather: "सध्याचे हवामान",
            refresh: "रिफ्रेश",
            temperature: "तापमान",
            humidity: "आर्द्रता",
            windSpeed: "वाऱ्याचा वेग",
            rainChance: "पावसाची शक्यता",
            weatherUnavailable: "हवामान डेटा उपलब्ध नाही",
            weatherUnavailableDescription: "सत्यापित हवामान डेटा प्राप्त झालेला नाही.",

            marketSubtitle: "सत्यापित स्रोतांकडून सध्याचे पीक बाजारभाव.",
            marketPriceTable: "बाजारभाव तक्ता",
            market: "बाजार",
            crop: "पीक",
            price: "भाव",
            date: "तारीख",
            onion: "कांदा",
            wheat: "गहू",
            marketDataUnavailable: "बाजार डेटा उपलब्ध नाही",
            marketDataUnavailableDescription: "सत्यापित बाजार डेटा प्राप्त झालेला नाही.",
            dataUnavailable: "सत्यापित डेटा उपलब्ध नाही",

            cropSubtitle: "पीक लागवड आणि व्यवस्थापन मार्गदर्शन.",
            onionInfo: "कांदा लागवड माहिती.",
            wheatInfo: "गहू लागवड माहिती.",
            cultivationGuidance: "लागवड मार्गदर्शन",
            cropManagement: "पीक व्यवस्थापन",
            farmingPractices: "शेती पद्धती",

            cropHealthSubtitle: "AI विश्लेषणासाठी पिकाचा फोटो अपलोड करा.",
            uploadCropImage: "पीक / पानाचा फोटो अपलोड करा",
            uploadCropDescription: "पीक आरोग्य विश्लेषणासाठी फोटो निवडा.",
            chooseImage: "फोटो निवडा",
            analyzeCrop: "पिकाचे विश्लेषण करा",
            analysisNotConnected: "AI पीक विश्लेषण कनेक्ट केलेले नाही",
            analysisNotConnectedDescription: "विश्लेषण दाखवण्यासाठी सत्यापित पीक आरोग्य सेवा कनेक्ट करा.",

            schemesSubtitle: "शेतकऱ्यांसाठी सरकारी कृषी योजना आणि मदत.",
            pmKisanDescription: "अधिकृत PM-KISAN शेतकरी सहाय्य माहिती.",
            pmksyDescription: "अधिकृत सिंचन आणि जल व्यवस्थापन माहिती.",
            cropInsurance: "पीक विमा",
            cropInsuranceDescription: "प्रधानमंत्री फसल विमा योजनेची अधिकृत माहिती.",
            learnMore: "अधिक जाणून घ्या",

            aiSubtitle: "शेतीशी संबंधित प्रश्न विचारा.",
            smartAssistant: "स्मार्ट शेतकरी सहाय्यक",
            aiNotConnected: "AI कनेक्ट केलेले नाही",
            assistant: "सहाय्यक",
            aiUnavailable: "मदत मिळवण्यासाठी शेतीशी संबंधित प्रश्न विचारा.",
            askQuestion: "शेतीशी संबंधित प्रश्न विचारा...",
            aiConnectionNote: "AI उत्तरांसाठी AI सेवा/बॅकएंड कनेक्ट असणे आवश्यक आहे.",

            voiceSubtitle: "तुमच्या पसंतीच्या भाषेत बोला आणि ऐका.",
            voiceAssistantTitle: "स्मार्ट आवाज सहाय्य",
            voiceDescription: "तुमच्या डिव्हाइसचा मायक्रोफोन वापरा.",
            startVoice: "आवाज सहाय्य सुरू करा",
            stopVoice: "ऐकणे थांबवा",
            voiceInput: "आवाज इनपुट",
            voiceResponse: "आवाज उत्तर",
            voiceReady: "आवाज सहाय्य तयार आहे.",
            voiceInputPlaceholder: "आवाज इनपुट येथे दिसेल...",

            profileSubtitle: "तुमची शेतकरी माहिती पहा आणि संपादित करा.",
            saveChanges: "बदल जतन करा",
            cancel: "रद्द करा",

            settingsSubtitle: "SmartAgri ची प्राधान्ये व्यवस्थापित करा.",
            changeLanguageDescription: "तुमची पसंतीची अॅप भाषा निवडा.",
            voiceSettingDescription: "आवाज सहाय्य सुरू किंवा बंद करा.",
            notifications: "सूचना",
            notificationDescription: "अॅप सूचना सुरू किंवा बंद करा.",

            marketIntelligence: "बाजार माहिती",
            multilingualSupport: "बहुभाषिक सहाय्य",
            aboutDescription:
                "SmartAgri शेतकऱ्यांना कृषी माहिती, बाजार माहिती, पीक मार्गदर्शन आणि डिजिटल शेती सहाय्य देण्यासाठी तयार केले आहे."
        }

    };


/* =========================================================
   LANGUAGE SELECTORS
   ========================================================= */

function setupLanguageSelectors() {

    /* -------------------------------------------------------
       Language buttons on the first language page
       ------------------------------------------------------- */

    document
        .querySelectorAll(".language-option")
        .forEach(button => {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                document
                    .querySelectorAll(".language-option")
                    .forEach(btn => {
                        btn.classList.remove("selected");
                    });

                this.classList.add("selected");

                const language =
                    this.dataset.language;

                if (language && translations[language]) {

                    translatePage(language);

                    console.log(
                        "SmartAgri language selected:",
                        language
                    );
                }

            });

        });


    /* -------------------------------------------------------
       CONTINUE BUTTON
       Language Page -> Demo Dashboard
       ------------------------------------------------------- */

    const continueButton =
        $("continueLanguageBtn");

    if (continueButton) {

        /*
         * Make absolutely sure this button does not
         * submit a form or reload the page.
         */

        continueButton.type = "button";

        continueButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "SmartAgri: Continue button clicked."
                );

                /*
                 * Apply the selected language first.
                 */

                translatePage(
                    currentLanguage
                );

                /*
                 * Go DIRECTLY to the demo dashboard.
                 *
                 * Do NOT go to loginPage.
                 */

                startDemoDashboard();

            }
        );

    } else {

        console.warn(
            "SmartAgri: continueLanguageBtn was not found."
        );

    }


    /* -------------------------------------------------------
       Dashboard language selector
       ------------------------------------------------------- */

    setupSelectLanguage(
        "dashboardLanguage"
    );


    /* -------------------------------------------------------
       Settings language selector
       ------------------------------------------------------- */

    setupSelectLanguage(
        "settingsLanguage"
    );


    /* -------------------------------------------------------
       Register language selector
       ------------------------------------------------------- */

    setupSelectLanguage(
        "registerLanguage"
    );


    /* -------------------------------------------------------
       Profile language selector
       ------------------------------------------------------- */

    setupSelectLanguage(
        "profileLanguage"
    );


    /* -------------------------------------------------------
       Change language from login page
       ------------------------------------------------------- */

    const changeLanguageFromLogin =
        $("changeLanguageFromLogin");

    if (changeLanguageFromLogin) {

        changeLanguageFromLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage(
                    "languagePage"
                );

            }
        );

    }

}

    /* =====================================================
       SCREEN MANAGEMENT
    ===================================================== */

    function showScreen(screenId) {

        document
            .querySelectorAll(
                "#languagePage, #loginPage, #registerPage"
            )
            .forEach(screen => {

                screen.classList.remove(
                    "active-screen"
                );

                screen.style.display = "none";

            });


        const target =
            document.getElementById(screenId);

        if (!target) {
            console.error(
                "Screen not found:",
                screenId
            );
            return;
        }


        target.style.display = "flex";

        target.classList.add(
            "active-screen"
        );


        if (screenId === "dashboardPage") {

            target.style.display = "block";

        }

    }


    /* =====================================================
       DASHBOARD SECTION NAVIGATION
    ===================================================== */

    function showSection(sectionId) {

        const sections =
            document.querySelectorAll(
                ".app-section"
            );


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const target =
            document.getElementById(sectionId);

        if (!target) {

            console.error(
                "Section not found:",
                sectionId
            );

            return;

        }


        target.classList.add(
            "active-section"
        );


        closeSideMenu();
        closeProfileMenu();


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


    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

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
       LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const email =
                    document.getElementById(
                        "loginEmail"
                    ).value.trim();

                const password =
                    document.getElementById(
                        "loginPassword"
                    ).value;

                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                setMessage(
                    message,
                    "Logging in...",
                    "info"
                );


                try {

                    if (!auth) {
                        throw new Error(
                            "Firebase is not initialized."
                        );
                    }


                    const result =
                        await auth.signInWithEmailAndPassword(
                            email,
                            password
                        );


                    currentUser =
                        result.user;


                    await loadFarmerProfile();


                    setMessage(
                        message,
                        "",
                        "success"
                    );


                    openDashboard();


                } catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    setMessage(
                        message,
                        firebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       REGISTRATION
    ===================================================== */

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );


    if (registrationForm) {

        registrationForm.addEventListener(
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

                const market =
                    getValue("registerMarket");

                const language =
                    getValue("registerLanguage") ||
                    selectedLanguage;

                const password =
                    getValue("registerPassword");


                const message =
                    document.getElementById(
                        "registerMessage"
                    );


                setMessage(
                    message,
                    "Creating account...",
                    "info"
                );


                try {

                    if (!auth) {

                        throw new Error(
                            "Firebase is not initialized."
                        );

                    }


                    const result =
                        await auth.createUserWithEmailAndPassword(
                            email,
                            password
                        );


                    currentUser =
                        result.user;


                    await currentUser.updateProfile({
                        displayName: name
                    });


                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .set({

                            name,
                            email,
                            mobile,
                            village,
                            state,
                            landArea,
                            market,
                            language,

                            createdAt:
                                firebase.firestore.FieldValue.serverTimestamp(),

                            updatedAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        });


                    selectedLanguage =
                        language;

                    applyLanguage(
                        language
                    );


                    setMessage(
                        message,
                        "Account created successfully.",
                        "success"
                    );


                    setTimeout(
                        () => {

                            openDashboard();

                        },
                        700
                    );


                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    setMessage(
                        message,
                        firebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       SHOW REGISTER / LOGIN
    ===================================================== */

    const showRegisterBtn =
        document.getElementById(
            "showRegisterBtn"
        );

    if (showRegisterBtn) {

        showRegisterBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "registerPage"
                );

            }
        );

    }


    const showLoginBtn =
        document.getElementById(
            "showLoginBtn"
        );

    if (showLoginBtn) {

        showLoginBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "loginPage"
                );

            }
        );

    }


    const changeLanguageFromLogin =
        document.getElementById(
            "changeLanguageFromLogin"
        );

    if (changeLanguageFromLogin) {

        changeLanguageFromLogin.addEventListener(
            "click",
            () => {

                showScreen(
                    "languagePage"
                );

            }
        );

    }


    /* =====================================================
       DEMO DASHBOARD
    ===================================================== */

    const demoBtn =
        document.getElementById(
            "demoBtn"
        );


    if (demoBtn) {

        demoBtn.addEventListener(
            "click",
            async () => {

                currentUser = null;

                setDemoProfile();

                openDashboard();

            }
        );

    }


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    const forgotPasswordBtn =
        document.getElementById(
            "forgotPasswordBtn"
        );


    if (forgotPasswordBtn) {

        forgotPasswordBtn.addEventListener(
            "click",
            async () => {

                const email =
                    getValue("loginEmail");

                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                if (!email) {

                    setMessage(
                        message,
                        "Enter your email address first.",
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

                    setMessage(
                        message,
                        firebaseErrorMessage(
                            error
                        ),
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       OPEN DASHBOARD
    ===================================================== */

    function openDashboard() {

        showScreen(
            "dashboardPage"
        );


        updateConnectionStatus(
            true
        );


        loadFarmerProfile();

        loadWeather();

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    async function loadFarmerProfile() {

        if (!currentUser) {

            setDemoProfile();

            return;

        }


        try {

            const snapshot =
                await db
                    .collection("farmers")
                    .doc(currentUser.uid)
                    .get();


            if (!snapshot.exists) {

                setDemoProfile();

                return;

            }


            const data =
                snapshot.data();


            populateProfile(
                data
            );


            if (data.language) {

                applyLanguage(
                    data.language
                );

            }


        } catch (error) {

            console.error(
                "Profile load error:",
                error
            );

        }

    }


    function populateProfile(data) {

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
            data.market || "—"
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
            data.market || ""
        );

        setValue(
            "profileLanguage",
            data.language || "en"
        );


        setText(
            "profilePageName",
            data.name || "Farmer"
        );

        setText(
            "profilePageEmail",
            data.email || "—"
        );

    }


    function setDemoProfile() {

        populateProfile({

            name: "Demo Farmer",
            email: "demo@smartagri.local",
            mobile: "0000000000",
            village: "Kopargaon",
            state: "Maharashtra",
            landArea: "2 acres",
            market: "Kopargaon APMC",
            language: selectedLanguage

        });

    }


    /* =====================================================
       PROFILE EDIT
    ===================================================== */

    const editProfileBtn =
        document.getElementById(
            "editProfileBtn"
        );


    const profileEditActions =
        document.getElementById(
            "profileEditActions"
        );


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            () => {

                [
                    "profileName",
                    "profileMobile",
                    "profileVillage",
                    "profileState",
                    "profileLandArea",
                    "profileMarket",
                    "profileLanguage"
                ].forEach(id => {

                    const element =
                        document.getElementById(
                            id
                        );

                    if (element) {

                        element.disabled =
                            false;

                    }

                });


                if (profileEditActions) {

                    profileEditActions.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }


    const cancelProfileEditBtn =
        document.getElementById(
            "cancelProfileEditBtn"
        );


    if (cancelProfileEditBtn) {

        cancelProfileEditBtn.addEventListener(
            "click",
            () => {

                loadFarmerProfile();

                disableProfileEditing();

            }
        );

    }


    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (!currentUser) {

                    setMessage(
                        document.getElementById(
                            "profileMessage"
                        ),
                        "Profile editing is unavailable in demo mode.",
                        "error"
                    );

                    return;

                }


                const data = {

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

                    market:
                        getValue("profileMarket"),

                    language:
                        getValue("profileLanguage")

                };


                try {

                    await db
                        .collection("farmers")
                        .doc(currentUser.uid)
                        .update({

                            ...data,

                            updatedAt:
                                firebase.firestore.FieldValue.serverTimestamp()

                        });


                    if (
                        currentUser.displayName !==
                        data.name
                    ) {

                        await currentUser.updateProfile({
                            displayName:
                                data.name
                        });

                    }


                    applyLanguage(
                        data.language
                    );


                    populateProfile(
                        data
                    );


                    disableProfileEditing();


                    setMessage(
                        document.getElementById(
                            "profileMessage"
                        ),
                        "Profile updated successfully.",
                        "success"
                    );


                } catch (error) {

                    console.error(
                        error
                    );


                    setMessage(
                        document.getElementById(
                            "profileMessage"
                        ),
                        error.message,
                        "error"
                    );

                }

            }
        );

    }


    function disableProfileEditing() {

        [
            "profileName",
            "profileMobile",
            "profileVillage",
            "profileState",
            "profileLandArea",
            "profileMarket",
            "profileLanguage"
        ].forEach(id => {

            const element =
                document.getElementById(id);

            if (element) {

                element.disabled = true;

            }

        });


        if (profileEditActions) {

            profileEditActions.classList.add(
                "hidden"
            );

        }

    }


    // ============================================================
// SMARTAGRI FRONTEND CONFIGURATION
// ============================================================

const API_BASE_URL = "http://localhost:5000";


// ============================================================
// DOM HELPERS
// ============================================================

function $(id) {
    return document.getElementById(id);
}


// ============================================================
// CONNECTION STATUS
// ============================================================

async function checkConnection() {

    const statusElement = $("connectionStatus");

    if (!statusElement) {
        console.warn("connectionStatus element not found");
        return;
    }

    statusElement.textContent = "Checking...";

    try {

        const response = await fetch(
            `${API_BASE_URL}/health`,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "healthy") {

            statusElement.textContent = "Online";

            statusElement.classList.remove("offline");
            statusElement.classList.add("online");

        } else {

            statusElement.textContent = "Offline";

            statusElement.classList.remove("online");
            statusElement.classList.add("offline");
        }

    } catch (error) {

        console.error("Connection check failed:", error);

        statusElement.textContent = "Offline";

        statusElement.classList.remove("online");
        statusElement.classList.add("offline");
    }
}


// ============================================================
// SMARTAGRI - COMPLETE FRONTEND SCRIPT
// Weather: Flask backend -> Open-Meteo -> Kopargaon
// ============================================================

const API_BASE_URL = "http://127.0.0.1:5000";

// ============================================================
// API HELPER
// ============================================================

async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        cache: "no-store",
        ...options,
        headers: {
            "Cache-Control": "no-cache",
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error(`API request failed: HTTP ${response.status}`);
    }

    return await response.json();
}


// ============================================================
// DOM HELPERS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


// ============================================================
// WEATHER
// ============================================================

async function loadWeather() {

    console.log("Loading live Kopargaon weather...");

    const refreshButton = getElement("refreshWeatherBtn");

    if (refreshButton) {
        refreshButton.disabled = true;
        refreshButton.textContent = "Refreshing...";
    }

    try {

        const data = await apiFetch("/api/weather");

        console.log("Weather API response:", data);

        if (!data || data.success === false) {
            throw new Error(
                data?.error || "Weather data unavailable."
            );
        }

        updateWeatherUI(data);

        console.log("Kopargaon weather updated successfully.");

    } catch (error) {

        console.error("Weather loading error:", error);

        showWeatherError();

    } finally {

        if (refreshButton) {
            refreshButton.disabled = false;
            refreshButton.textContent = "Refresh Weather";
        }
    }
}


// ============================================================
// UPDATE WEATHER UI
// ============================================================

function updateWeatherUI(data) {

    console.log("Updating weather UI:", data);

    // --------------------------------------------------------
    // Location
    // --------------------------------------------------------

    setText(
        "weatherLocation",
        data.location || "Kopargaon"
    );


    // --------------------------------------------------------
    // Temperature
    // --------------------------------------------------------

    const temperature =
        data.temperature_c ??
        data.temperature;

    if (temperature !== null && temperature !== undefined) {

        setText(
            "temperature",
            `${Math.round(Number(temperature))}°C`
        );

    } else {

        setText(
            "temperature",
            "--°C"
        );
    }


    // --------------------------------------------------------
    // Humidity
    // --------------------------------------------------------

    const humidity =
        data.humidity_pct ??
        data.humidity;

    if (humidity !== null && humidity !== undefined) {

        setText(
            "humidity",
            `${Math.round(Number(humidity))}%`
        );

    } else {

        setText(
            "humidity",
            "--%"
        );
    }


    // --------------------------------------------------------
    // Wind
    // --------------------------------------------------------

    const wind =
        data.wind_speed_kmh ??
        data.wind_speed;

    if (wind !== null && wind !== undefined) {

        setText(
            "windSpeed",
            `${Math.round(Number(wind))} km/h`
        );

    } else {

        setText(
            "windSpeed",
            "-- km/h"
        );
    }


    // --------------------------------------------------------
    // Rain / Precipitation
    // --------------------------------------------------------

    const precipitation =
        data.precipitation_mm ??
        data.precipitation;

    if (
        precipitation !== null &&
        precipitation !== undefined
    ) {

        setText(
            "rainfall",
            `${Number(precipitation).toFixed(1)} mm`
        );

    } else {

        setText(
            "rainfall",
            "0 mm"
        );
    }


    // --------------------------------------------------------
    // Weather condition
    // --------------------------------------------------------

    setText(
        "weatherCondition",
        data.condition ||
        data.weather_condition ||
        "Weather data available"
    );


    // --------------------------------------------------------
    // Rain probability
    //
    // Flask backend provides this inside:
    // data.forecast[0].rain_probability_pct
    // --------------------------------------------------------

    let rainProbability = null;

    if (
        Array.isArray(data.forecast) &&
        data.forecast.length > 0
    ) {

        rainProbability =
            data.forecast[0].rain_probability_pct;
    }

    if (
        rainProbability !== null &&
        rainProbability !== undefined
    ) {

        setText(
            "rainChance",
            `${Math.round(Number(rainProbability))}%`
        );

    } else {

        setText(
            "rainChance",
            "--%"
        );
    }


    // --------------------------------------------------------
    // Weather status
    // --------------------------------------------------------

    const statusElement =
        getElement("weatherStatus");

    if (statusElement) {

        if (data.cached) {

            statusElement.textContent =
                "Showing latest stored weather";

        } else {

            statusElement.textContent =
                "Live weather • Open-Meteo";
        }
    }


    // --------------------------------------------------------
    // Forecast
    // --------------------------------------------------------

    updateForecast(data.forecast || []);
}


// ============================================================
// WEATHER ERROR
// ============================================================

function showWeatherError() {

    console.warn(
        "Unable to load live weather."
    );

    setText(
        "temperature",
        "--°C"
    );

    setText(
        "humidity",
        "--%"
    );

    setText(
        "windSpeed",
        "-- km/h"
    );

    setText(
        "rainfall",
        "-- mm"
    );

    setText(
        "rainChance",
        "--%"
    );

    setText(
        "weatherCondition",
        "Weather unavailable"
    );

    setText(
        "weatherLocation",
        "Kopargaon"
    );

    setText(
        "weatherStatus",
        "Unable to connect to weather server"
    );
}


// ============================================================
// FORECAST
// ============================================================

function updateForecast(forecast) {

    const forecastContainer =
        getElement("forecastContainer");

    if (!forecastContainer) {
        console.log(
            "forecastContainer not found. Skipping forecast UI."
        );
        return;
    }

    forecastContainer.innerHTML = "";

    if (!Array.isArray(forecast) || forecast.length === 0) {

        forecastContainer.innerHTML =
            "<p>No forecast data available.</p>";

        return;
    }


    forecast.forEach(day => {

        const card =
            document.createElement("div");

        card.className = "forecast-card";


        const date =
            day.date || "--";


        const maxTemp =
            day.temp_max_c ??
            "--";


        const minTemp =
            day.temp_min_c ??
            "--";


        const rain =
            day.rain_probability_pct ??
            0;


        const rainfall =
            day.rainfall_mm ??
            0;


        const condition =
            day.condition ||
            "Unknown";


        card.innerHTML = `
            <div class="forecast-date">
                ${formatForecastDate(date)}
            </div>

            <div class="forecast-condition">
                ${condition}
            </div>

            <div class="forecast-temperature">
                ${Math.round(Number(maxTemp))}° /
                ${Math.round(Number(minTemp))}°
            </div>

            <div class="forecast-rain">
                Rain: ${Math.round(Number(rain))}%
            </div>

            <div class="forecast-rainfall">
                ${Number(rainfall).toFixed(1)} mm
            </div>
        `;


        forecastContainer.appendChild(card);

    });
}


// ============================================================
// FORMAT FORECAST DATE
// ============================================================

function formatForecastDate(dateString) {

    if (!dateString) {
        return "--";
    }

    try {

        const date =
            new Date(`${dateString}T00:00:00`);

        return date.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "numeric",
                month: "short"
            }
        );

    } catch (error) {

        return dateString;
    }
}


// ============================================================
// REFRESH WEATHER BUTTON
// ============================================================

function setupWeatherRefresh() {

    const refreshButton =
        getElement("refreshWeatherBtn");

    if (!refreshButton) {

        console.warn(
            "refreshWeatherBtn was not found."
        );

        return;
    }


    // Prevent form submission if the button
    // happens to be inside a form.

    refreshButton.type = "button";


    refreshButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            console.log(
                "Refresh Weather button clicked."
            );

            loadWeather();
        }
    );
}


// ============================================================
// INITIAL WEATHER LOAD
// ============================================================

function initializeWeather() {

    console.log(
        "Initializing SmartAgri weather..."
    );

    setupWeatherRefresh();

    loadWeather();
}


// ============================================================
// OPTIONAL BACKEND STATUS CHECK
// ============================================================

async function checkBackend() {

    try {

        const data =
            await apiFetch("/api/status");

        console.log(
            "SmartAgri backend status:",
            data
        );

        return true;

    } catch (error) {

        console.error(
            "SmartAgri backend is not reachable:",
            error
        );

        return false;
    }
}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "SmartAgri frontend loaded."
        );

        initializeWeather();

        checkBackend();
    }
);


    /* =====================================================
       MARKET / MANDI
    ===================================================== */

    const cropPriceSelector =
        document.getElementById(
            "cropPriceSelector"
        );


    if (cropPriceSelector) {

        cropPriceSelector.addEventListener(
            "change",
            loadMarket
        );

    }


    async function loadMarket() {

        showElement(
            "marketLoading"
        );

        hideElement(
            "marketError"
        );


        const selectedCrop =
            cropPriceSelector
                ? cropPriceSelector.value
                : "onion";


        const commodity =
            selectedCrop.toLowerCase() ===
            "wheat"
                ? "Wheat"
                : "Onion";


        try {

            const url =
                `/api/market?commodity=${encodeURIComponent(
                    commodity
                )}`;


            const response =
                await fetch(
                    url,
                    {
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Market API returned ${response.status}`
                );

            }


            const data =
                await response.json();


            console.log(
                "Market response:",
                data
            );


            currentMarket =
                Array.isArray(data)
                    ? data
                    : (
                        data.prices ||
                        data.records ||
                        []
                    );


            renderMarket(
                currentMarket
            );


            updateConnectionStatus(
                true
            );


        } catch (error) {

            console.error(
                "Market error:",
                error
            );


            showElement(
                "marketError"
            );


            const errorBox =
                document.getElementById(
                    "marketError"
                );


            if (errorBox) {

                errorBox.textContent =
                    "Unable to load market data: " +
                    error.message;

            }

        } finally {

            hideElement(
                "marketLoading"
            );

        }

    }


    function renderMarket(prices) {

        const body =
            document.getElementById(
                "marketTableBody"
            );


        if (!body) return;


        body.innerHTML = "";


        if (
            !Array.isArray(prices) ||
            prices.length === 0
        ) {

            body.innerHTML = `

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
                                    t("marketDataUnavailableDescription")
                                )}
                            </p>

                        </div>

                    </td>

                </tr>

            `;

            return;

        }


        prices.forEach(price => {

            const market =
                price.market ||
                price.Market ||
                "—";


            const crop =
                price.commodity ||
                price.crop ||
                "—";


            const modal =
                price.modal_price ??
                price.modalPrice ??
                null;


            const min =
                price.min_price ??
                null;


            const max =
                price.max_price ??
                null;


            let priceText = "—";


            if (modal !== null) {

                priceText =
                    `₹${modal}`;

            } else if (
                min !== null ||
                max !== null
            ) {

                priceText =
                    `₹${min ?? "—"} - ₹${max ?? "—"}`;

            }


            const date =
                price.date ||
                price.arrival_date ||
                "—";


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>${escapeHtml(
                    market
                )}</td>

                <td>${escapeHtml(
                    crop
                )}</td>

                <td>
                    <strong>
                        ${escapeHtml(
                            priceText
                        )}
                    </strong>
                </td>

                <td>${escapeHtml(
                    date
                )}</td>

            `;


            body.appendChild(
                row
            );

        });

    }


    /* =====================================================
       MARKET COMPARISON
    ===================================================== */

    async function loadMarketComparison() {

        try {

            const response =
                await fetch(
                    "/api/market-comparison",
                    {
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Comparison API returned ${response.status}`
                );

            }


            const data =
                await response.json();


            console.log(
                "Comparison response:",
                data
            );


            currentComparison =
                Array.isArray(data)
                    ? data
                    : (
                        data.markets ||
                        data.records ||
                        []
                    );


            renderMarketComparison(
                currentComparison
            );


        } catch (error) {

            console.error(
                "Market comparison error:",
                error
            );

        }

    }


    function renderMarketComparison(data) {

        const cards =
            document.querySelectorAll(
                "[data-market-card]"
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


            const match =
                data.find(item => {

                    const name =
                        item.market ||
                        item.name ||
                        "";

                    return normalize(name)
                        .includes(
                            normalize(
                                marketName
                            )
                        ) ||
                        normalize(
                            marketName
                        ).includes(
                            normalize(name)
                        );

                });


            if (!match) {

                if (priceElement) {

                    priceElement.textContent =
                        "—";

                }

                if (statusElement) {

                    statusElement.textContent =
                        t("dataUnavailable");

                }

                return;

            }


            const price =
                match.modal_price ??
                match.modalPrice ??
                match.price ??
                null;


            if (priceElement) {

                priceElement.textContent =
                    price !== null
                        ? `₹${price}`
                        : "—";

            }


            if (statusElement) {

                statusElement.textContent =
                    price !== null
                        ? "Verified live data"
                        : t("dataUnavailable");

            }

        });

    }


    /* =====================================================
       CROP HEALTH - PLANT.ID
    ===================================================== */

    const cropImageInput =
        document.getElementById(
            "cropImageInput"
        );


    const cropImagePreview =
        document.getElementById(
            "cropImagePreview"
        );


    const imagePreviewContainer =
        document.getElementById(
            "imagePreviewContainer"
        );


    const analyzeCropBtn =
        document.getElementById(
            "analyzeCropBtn"
        );


    let selectedCropImage = null;


    if (cropImageInput) {

        cropImageInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];


                if (!file) {

                    selectedCropImage = null;

                    if (analyzeCropBtn) {

                        analyzeCropBtn.disabled =
                            true;

                    }

                    hideElement(
                        "imagePreviewContainer"
                    );

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

                    return;

                }


                selectedCropImage =
                    file;


                const reader =
                    new FileReader();


                reader.onload =
                    event => {

                        if (
                            cropImagePreview
                        ) {

                            cropImagePreview.src =
                                event.target.result;

                        }


                        showElement(
                            "imagePreviewContainer"
                        );


                        if (analyzeCropBtn) {

                            analyzeCropBtn.disabled =
                                false;

                        }

                    };


                reader.readAsDataURL(
                    file
                );

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

        if (!selectedCropImage) {

            alert(
                "Please choose a crop image first."
            );

            return;

        }


        const resultBox =
            document.getElementById(
                "cropAnalysisResult"
            );


        if (resultBox) {

            resultBox.innerHTML = `

                <strong>
                    Analyzing crop...
                </strong>

                <p>
                    Please wait while Plant.id analyzes the image.
                </p>

            `;

        }


        analyzeCropBtn.disabled =
            true;


        try {

            const formData =
                new FormData();


            formData.append(
                "image",
                selectedCropImage
            );


            const response =
                await fetch(
                    "/api/crop-analysis",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(
                    `Crop analysis API returned ${response.status}: ${errorText}`
                );

            }


            const data =
                await response.json();


            console.log(
                "Plant.id response:",
                data
            );


            renderCropAnalysis(
                data
            );


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
                            error.message
                        )}
                    </p>

                `;

            }

        } finally {

            analyzeCropBtn.disabled =
                false;

        }

    }


    function renderCropAnalysis(data) {

        const resultBox =
            document.getElementById(
                "cropAnalysisResult"
            );


        if (!resultBox) return;


        const result =
            data.result ||
            data;


        let plantName =
            "Unknown";


        let healthStatus =
            "Unknown";


        let diseases = [];


        if (
            result.classification &&
            result.classification.suggestions
        ) {

            const suggestions =
                result.classification
                    .suggestions;


            if (suggestions.length) {

                plantName =
                    suggestions[0].name ||
                    "Unknown";

            }

        }


        if (
            result.health_assessment
        ) {

            const health =
                result.health_assessment;


            if (
                health.is_healthy
            ) {

                healthStatus =
                    "Healthy";

            } else {

                healthStatus =
                    "Possible health issue detected";

            }


            if (
                Array.isArray(
                    health.diseases
                )
            ) {

                diseases =
                    health.diseases;

            }

        }


        if (
            result.health_assessment &&
            result.health_assessment
                .diseases
        ) {

            diseases =
                result.health_assessment
                    .diseases;

        }


        let diseaseHtml =
            "<p>No specific disease information returned.</p>";


        if (diseases.length) {

            diseaseHtml = `

                <ul>

                    ${diseases
                        .slice(0, 5)
                        .map(
                            disease => `

                            <li>

                                <strong>
                                    ${escapeHtml(
                                        disease.name ||
                                        "Possible issue"
                                    )}
                                </strong>

                                ${
                                    disease.probability !== undefined
                                        ? ` - ${Math.round(
                                            disease.probability * 100
                                        )}%`
                                        : ""
                                }

                            </li>

                        `
                        )
                        .join("")}

                </ul>

            `;

        }


        resultBox.innerHTML = `

            <div>

                <h3>
                    🌿 Crop Analysis Result
                </h3>

                <p>

                    <strong>
                        Plant:
                    </strong>

                    ${escapeHtml(
                        plantName
                    )}

                </p>

                <p>

                    <strong>
                        Health:
                    </strong>

                    ${escapeHtml(
                        healthStatus
                    )}

                </p>

                <h4>
                    Possible Issues
                </h4>

                ${diseaseHtml}

            </div>

        `;

    }


    /* =====================================================
       AI ASSISTANT
    ===================================================== */

    const aiForm =
        document.getElementById(
            "aiForm"
        );


    if (aiForm) {

        aiForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const input =
                    document.getElementById(
                        "aiInput"
                    );


                const question =
                    input
                        ? input.value.trim()
                        : "";


                if (!question) return;


                addChatMessage(
                    question,
                    "user"
                );


                input.value = "";


                addChatMessage(
                    "Thinking...",
                    "assistant",
                    true
                );


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

                                body:
                                    JSON.stringify({

                                        message:
                                            question,

                                        question:
                                            question,

                                        language:
                                            selectedLanguage

                                    })
                            }
                        );


                    if (!response.ok) {

                        const text =
                            await response.text();

                        throw new Error(
                            `AI API returned ${response.status}: ${text}`
                        );

                    }


                    const data =
                        await response.json();


                    console.log(
                        "AI response:",
                        data
                    );


                    removeThinkingMessage();


                    const answer =
                        data.response ||
                        data.answer ||
                        data.message ||
                        data.content ||
                        "No response received.";


                    addChatMessage(
                        answer,
                        "assistant"
                    );


                    updateAIStatus(
                        true
                    );


                } catch (error) {

                    console.error(
                        "AI error:",
                        error
                    );


                    removeThinkingMessage();


                    addChatMessage(
                        "AI service error: " +
                        error.message,
                        "assistant"
                    );


                    updateAIStatus(
                        false
                    );

                }

            }
        );

    }


    function addChatMessage(
        message,
        type,
        temporary = false
    ) {

        const chat =
            document.getElementById(
                "chatMessages"
            );


        if (!chat) return;


        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            type === "user"
                ? "chat-message user-message"
                : "chat-message assistant-message";


        if (temporary) {

            wrapper.dataset.thinking =
                "true";

        }


        wrapper.innerHTML = `

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
                            : escapeHtml(
                                t("assistant")
                            )
                    }

                </strong>

                <p>
                    ${escapeHtml(
                        message
                    )}
                </p>

            </div>

        `;


        chat.appendChild(
            wrapper
        );


        chat.scrollTop =
            chat.scrollHeight;

    }


    function removeThinkingMessage() {

        const chat =
            document.getElementById(
                "chatMessages"
            );


        if (!chat) return;


        const thinking =
            chat.querySelector(
                '[data-thinking="true"]'
            );


        if (thinking) {

            thinking.remove();

        }

    }


    function updateAIStatus(
        connected
    ) {

        const badge =
            document.getElementById(
                "aiConnectionBadge"
            );


        const text =
            document.getElementById(
                "aiConnectionText"
            );


        if (connected) {

            if (text) {

                text.textContent =
                    "AI Connected";

            }

            if (badge) {

                badge.classList.remove(
                    "not-connected-badge"
                );

            }

        } else {

            if (text) {

                text.textContent =
                    t("aiNotConnected");

            }

        }

    }


    /* =====================================================
       VOICE ASSISTANCE
    ===================================================== */

    const startVoiceBtn =
        document.getElementById(
            "startVoiceBtn"
        );


    const stopVoiceBtn =
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


    if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
    ) {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        recognition =
            new SpeechRecognition();


        recognition.continuous =
            false;

        recognition.interimResults =
            false;


        recognition.onstart =
            () => {

                if (startVoiceBtn) {

                    startVoiceBtn.classList.add(
                        "hidden"
                    );

                }

                if (stopVoiceBtn) {

                    stopVoiceBtn.classList.remove(
                        "hidden"
                    );

                }


                if (voiceResponse) {

                    voiceResponse.textContent =
                        "Listening...";

                }

            };


        recognition.onresult =
            event => {

                const transcript =
                    event
                        .results[0][0]
                        .transcript;


                if (voiceInput) {

                    voiceInput.value =
                        transcript;

                }


                if (voiceResponse) {

                    voiceResponse.textContent =
                        "Voice input received.";

                }


                speakText(
                    transcript
                );

            };


        recognition.onerror =
            event => {

                console.error(
                    "Voice recognition error:",
                    event.error
                );


                if (voiceResponse) {

                    voiceResponse.textContent =
                        "Voice recognition error: " +
                        event.error;

                }


                stopVoiceUI();

            };


        recognition.onend =
            () => {

                stopVoiceUI();

            };

    } else {

        console.warn(
            "Speech Recognition is not supported."
        );

    }


    if (startVoiceBtn) {

        startVoiceBtn.addEventListener(
            "click",
            () => {

                if (!recognition) {

                    if (voiceResponse) {

                        voiceResponse.textContent =
                            "Voice recognition is not supported by this browser.";

                    }

                    return;

                }


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

    }


    if (stopVoiceBtn) {

        stopVoiceBtn.addEventListener(
            "click",
            () => {

                if (recognition) {

                    recognition.stop();

                }

                stopVoiceUI();

            }
        );

    }


    function stopVoiceUI() {

        if (startVoiceBtn) {

            startVoiceBtn.classList.remove(
                "hidden"
            );

        }

        if (stopVoiceBtn) {

            stopVoiceBtn.classList.add(
                "hidden"
            );

        }

    }


    function getSpeechLanguage() {

        if (selectedLanguage === "hi")
            return "hi-IN";

        if (selectedLanguage === "mr")
            return "mr-IN";

        return "en-IN";

    }


    function speakText(text) {

        if (
            !("speechSynthesis" in window)
        ) return;


        const utterance =
            new SpeechSynthesisUtterance(
                text
            );


        utterance.lang =
            getSpeechLanguage();


        window.speechSynthesis.speak(
            utterance
        );

    }


    /* =====================================================
       DASHBOARD LANGUAGE
    ===================================================== */

    const dashboardLanguage =
        document.getElementById(
            "dashboardLanguage"
        );


    if (dashboardLanguage) {

        dashboardLanguage.addEventListener(
            "change",
            event => {

                applyLanguage(
                    event.target.value
                );

            }
        );

    }


    /* =====================================================
       SETTINGS LANGUAGE
    ===================================================== */

    const settingsLanguage =
        document.getElementById(
            "settingsLanguage"
        );


    if (settingsLanguage) {

        settingsLanguage.addEventListener(
            "change",
            async event => {

                const language =
                    event.target.value;


                applyLanguage(
                    language
                );


                if (
                    currentUser &&
                    db
                ) {

                    try {

                        await db
                            .collection("farmers")
                            .doc(currentUser.uid)
                            .update({

                                language,

                                updatedAt:
                                    firebase.firestore.FieldValue.serverTimestamp()

                            });

                    } catch (error) {

                        console.error(
                            "Language save error:",
                            error
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       REGISTER LANGUAGE
    ===================================================== */

    const registerLanguage =
        document.getElementById(
            "registerLanguage"
        );


    if (registerLanguage) {

        registerLanguage.addEventListener(
            "change",
            event => {

                selectedLanguage =
                    event.target.value;

            }
        );

    }


    /* =====================================================
       VOICE SETTING
    ===================================================== */

    const voiceSetting =
        document.getElementById(
            "voiceSetting"
        );


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


    /* =====================================================
       NOTIFICATION SETTING
    ===================================================== */

    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


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
       SIDE MENU
    ===================================================== */

    const hamburgerBtn =
        document.getElementById(
            "hamburgerBtn"
        );


    const closeMenuBtn =
        document.getElementById(
            "closeMenuBtn"
        );


    const menuOverlay =
        document.getElementById(
            "menuOverlay"
        );


    const sideMenu =
        document.getElementById(
            "sideMenu"
        );


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


    function openSideMenu() {

        if (sideMenu) {

            sideMenu.classList.add(
                "open"
            );

        }

        if (menuOverlay) {

            menuOverlay.classList.add(
                "active"
            );

        }

    }


    function closeSideMenu() {

        if (sideMenu) {

            sideMenu.classList.remove(
                "open"
            );

        }

        if (menuOverlay) {

            menuOverlay.classList.remove(
                "active"
            );

        }

    }


    /* =====================================================
       PROFILE MENU
    ===================================================== */

    const profileButton =
        document.getElementById(
            "profileButton"
        );


    const profileMenu =
        document.getElementById(
            "profileMenu"
        );


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (profileMenu) {

                    profileMenu.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }


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

                    showSection(
                        section
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                profileMenu &&
                !profileMenu.contains(
                    event.target
                ) &&
                !profileButton?.contains(
                    event.target
                )
            ) {

                closeProfileMenu();

            }

        }
    );


    function closeProfileMenu() {

        if (profileMenu) {

            profileMenu.classList.remove(
                "open"
            );

        }

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const sideLogoutBtn =
        document.getElementById(
            "sideLogoutBtn"
        );


    const profileLogoutBtn =
        document.getElementById(
            "profileLogoutBtn"
        );


    async function logout() {

        try {

            if (auth) {

                await auth.signOut();

            }

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }


        currentUser = null;

        closeSideMenu();
        closeProfileMenu();


        showScreen(
            "loginPage"
        );

    }


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
       CONNECTION STATUS
    ===================================================== */

    window.addEventListener(
        "online",
        () => {

            updateConnectionStatus(
                true
            );

        }
    );


    window.addEventListener(
        "offline",
        () => {

            updateConnectionStatus(
                false
            );

        }
    );


    function updateConnectionStatus(
        online
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


        if (online) {

            if (status) {

                status.classList.remove(
                    "offline"
                );

                status.classList.add(
                    "online"
                );

            }

            if (connectionText) {

                connectionText.textContent =
                    t("online");

            }

            if (dashboardText) {

                dashboardText.textContent =
                    t("online");

            }

        } else {

            if (status) {

                status.classList.remove(
                    "online"
                );

                status.classList.add(
                    "offline"
                );

            }

            if (connectionText) {

                connectionText.textContent =
                    t("offline");

            }

            if (dashboardText) {

                dashboardText.textContent =
                    t("offline");

            }

        }

    }


    /* =====================================================
       CROP MODAL TRANSLATIONS
    ===================================================== */

    function updateCropModalLanguage() {

        /*
         * The crop modal in your HTML contains hard-coded
         * English content. This function changes the modal
         * content according to the selected language.
         */

        const modal =
            document.getElementById(
                "cropInfoModal"
            );


        if (!modal) return;


        const title =
            document.getElementById(
                "cropInfoModalTitle"
            );


        const subtitle =
            document.getElementById(
                "cropInfoModalSubtitle"
            );


        if (
            modal.dataset.currentCrop &&
            modal.dataset.currentTopic
        ) {

            const crop =
                modal.dataset.currentCrop;

            const topic =
                modal.dataset.currentTopic;


            renderTranslatedCropModal(
                crop,
                topic
            );

        }

    }


    const translatedCropData = {

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
                        <p>Maintain adequate soil moisture. Avoid excessive irrigation and waterlogging.</p>

                        <h3>☀️ Field Conditions</h3>
                        <p>Provide adequate sunlight and maintain good air circulation around the crop.</p>
                    `
                },

                management: {
                    title: "Onion Crop Management",
                    subtitle: "Manage the crop throughout its growing period.",
                    body: `
                        <h3>💧 Water Management</h3>
                        <p>Maintain consistent soil moisture, especially during bulb development.</p>

                        <h3>🌿 Weed Management</h3>
                        <p>Keep the field free from weeds because weeds compete for water, nutrients and sunlight.</p>

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
                        <p>Start with healthy and disease-free planting material.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Rotate crops when practical to support soil health.</p>

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
                        <p>Prepare a well-levelled seedbed with suitable soil moisture.</p>

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
                        <p>Follow the locally recommended sowing period for the selected wheat variety.</p>

                        <h3>🚜 Field Preparation</h3>
                        <p>Maintain a level and properly prepared seedbed.</p>

                        <h3>🔄 Crop Rotation</h3>
                        <p>Crop rotation can help with soil management and reduce recurring crop problems.</p>

                        <h3>🌾 Harvesting</h3>
                        <p>Harvest when the crop reaches appropriate maturity.</p>
                    `
                }

            }

        },


        hi: {

            onion: {

                cultivation: {
                    title: "प्याज की खेती का मार्गदर्शन",
                    subtitle: "सफल प्याज उत्पादन के लिए महत्वपूर्ण चरण।",
                    body: `
                        <h3>🌱 भूमि की तैयारी</h3>
                        <p>अच्छी जल निकासी वाली महीन और भुरभुरी मिट्टी तैयार करें।</p>

                        <h3>🌱 रोपाई</h3>
                        <p>स्वस्थ और रोगमुक्त पौध या रोपण सामग्री का उपयोग करें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>मिट्टी में उचित नमी बनाए रखें और जलभराव से बचें।</p>

                        <h3>☀️ खेत की स्थिति</h3>
                        <p>फसल को पर्याप्त धूप और अच्छी हवा का संचार दें।</p>
                    `
                },

                management: {
                    title: "प्याज फसल प्रबंधन",
                    subtitle: "पूरे फसल चक्र में फसल का प्रबंधन करें।",
                    body: `
                        <h3>💧 जल प्रबंधन</h3>
                        <p>विशेष रूप से कंद बनने के समय उचित नमी बनाए रखें।</p>

                        <h3>🌿 खरपतवार प्रबंधन</h3>
                        <p>खेत को खरपतवार से मुक्त रखें क्योंकि वे पानी और पोषक तत्वों के लिए प्रतिस्पर्धा करते हैं।</p>

                        <h3>🧪 पोषक तत्व</h3>
                        <p>मिट्टी परीक्षण और स्थानीय अनुशंसाओं के अनुसार पोषक तत्व दें।</p>

                        <h3>🔍 फसल निरीक्षण</h3>
                        <p>कीट, रोग और असामान्य वृद्धि के लिए नियमित निरीक्षण करें।</p>
                    `
                },

                practices: {
                    title: "प्याज की खेती की पद्धतियां",
                    subtitle: "बेहतर प्याज उत्पादन के लिए व्यावहारिक सुझाव।",
                    body: `
                        <h3>🚜 खेत की स्वच्छता</h3>
                        <p>रोगग्रस्त पौधों को हटाएं और खेत साफ रखें।</p>

                        <h3>🌱 स्वस्थ रोपण सामग्री</h3>
                        <p>स्वस्थ और रोगमुक्त रोपण सामग्री का उपयोग करें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>जहां संभव हो फसल चक्र अपनाएं।</p>

                        <h3>📦 कटाई प्रबंधन</h3>
                        <p>उचित परिपक्वता पर प्याज की कटाई करें और भंडारण से पहले अच्छी तरह सुखाएं।</p>
                    `
                }

            },

            wheat: {

                cultivation: {
                    title: "गेहूं की खेती का मार्गदर्शन",
                    subtitle: "सफल गेहूं उत्पादन के लिए महत्वपूर्ण चरण।",
                    body: `
                        <h3>🌱 मिट्टी की तैयारी</h3>
                        <p>समतल और अच्छी तरह तैयार खेत में उचित नमी बनाए रखें।</p>

                        <h3>🌾 बीज चयन</h3>
                        <p>स्थानीय क्षेत्र के लिए अनुशंसित स्वस्थ और गुणवत्तापूर्ण बीज चुनें।</p>

                        <h3>💧 सिंचाई</h3>
                        <p>फसल की अवस्था, मिट्टी की नमी और मौसम के अनुसार सिंचाई करें।</p>

                        <h3>☀️ फसल की स्थिति</h3>
                        <p>गेहूं के लिए उपयुक्त ठंडी परिस्थितियां और पर्याप्त धूप आवश्यक हैं।</p>
                    `
                },

                management: {
                    title: "गेहूं फसल प्रबंधन",
                    subtitle: "अंकुरण से कटाई तक गेहूं का प्रबंधन।",
                    body: `
                        <h3>💧 सिंचाई प्रबंधन</h3>
                        <p>महत्वपूर्ण विकास अवस्थाओं में सिंचाई पर विशेष ध्यान दें।</p>

                        <h3>🌿 खरपतवार नियंत्रण</h3>
                        <p>खेत में खरपतवार की नियमित निगरानी करें।</p>

                        <h3>🔍 कीट निगरानी</h3>
                        <p>कीट और रोग के लक्षणों की नियमित जांच करें।</p>

                        <h3>🧪 पोषक तत्व प्रबंधन</h3>
                        <p>मिट्टी परीक्षण और अनुशंसित आवश्यकताओं के अनुसार खाद दें।</p>
                    `
                },

                practices: {
                    title: "गेहूं की खेती की पद्धतियां",
                    subtitle: "स्वस्थ गेहूं फसल के लिए व्यावहारिक तरीके।",
                    body: `
                        <h3>🌱 समय पर बुवाई</h3>
                        <p>स्थानीय क्षेत्र और किस्म के अनुसार सही समय पर बुवाई करें।</p>

                        <h3>🚜 खेत की तैयारी</h3>
                        <p>समतल और अच्छी तरह तैयार बीजbed बनाए रखें।</p>

                        <h3>🔄 फसल चक्र</h3>
                        <p>फसल चक्र मिट्टी प्रबंधन में मदद कर सकता है।</p>

                        <h3>🌾 कटाई</h3>
                        <p>उचित परिपक्वता पर फसल की कटाई करें।</p>
                    `
                }

            }

        },


        mr: {

            onion: {

                cultivation: {
                    title: "कांदा लागवड मार्गदर्शन",
                    subtitle: "यशस्वी कांदा उत्पादनासाठी महत्त्वाचे टप्पे.",
                    body: `
                        <h3>🌱 जमीन तयार करणे</h3>
                        <p>चांगला निचरा होणारी भुसभुशीत जमीन तयार करा.</p>

                        <h3>🌱 लागवड</h3>
                        <p>निरोगी आणि रोगमुक्त रोपे किंवा लागवड साहित्य वापरा.</p>

                        <h3>💧 सिंचन</h3>
                        <p>जमिनीत योग्य ओलावा ठेवा आणि पाणी साचू देऊ नका.</p>

                        <h3>☀️ शेताची स्थिती</h3>
                        <p>पिकाला पुरेसा सूर्यप्रकाश आणि हवा खेळती राहील याची काळजी घ्या.</p>
                    `
                },

                management: {
                    title: "कांदा पीक व्यवस्थापन",
                    subtitle: "संपूर्ण वाढीच्या काळात पिकाचे व्यवस्थापन करा.",
                    body: `
                        <h3>💧 पाणी व्यवस्थापन</h3>
                        <p>कांदा तयार होताना जमिनीत योग्य ओलावा ठेवा.</p>

                        <h3>🌿 तण व्यवस्थापन</h3>
                        <p>तण काढून टाका कारण तण पाणी आणि अन्नद्रव्यांसाठी स्पर्धा करतात.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>माती परीक्षण आणि स्थानिक शिफारसीनुसार अन्नद्रव्ये द्या.</p>

                        <h3>🔍 पीक निरीक्षण</h3>
                        <p>कीड, रोग आणि असामान्य वाढीसाठी नियमित निरीक्षण करा.</p>
                    `
                },

                practices: {
                    title: "कांदा शेती पद्धती",
                    subtitle: "चांगल्या कांदा उत्पादनासाठी व्यावहारिक सूचना.",
                    body: `
                        <h3>🚜 शेताची स्वच्छता</h3>
                        <p>रोगग्रस्त वनस्पती काढून टाका आणि शेत स्वच्छ ठेवा.</p>

                        <h3>🌱 निरोगी लागवड साहित्य</h3>
                        <p>निरोगी आणि रोगमुक्त लागवड साहित्य वापरा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>शक्य असल्यास पीक फेरपालट करा.</p>

                        <h3>📦 काढणी व्यवस्थापन</h3>
                        <p>योग्य परिपक्वतेनंतर कांद्याची काढणी करा आणि साठवणुकीपूर्वी वाळवा.</p>
                    `
                }

            },

            wheat: {

                cultivation: {
                    title: "गहू लागवड मार्गदर्शन",
                    subtitle: "यशस्वी गहू उत्पादनासाठी महत्त्वाचे टप्पे.",
                    body: `
                        <h3>🌱 मातीची तयारी</h3>
                        <p>समतल आणि योग्य प्रकारे तयार केलेली जमीन वापरा.</p>

                        <h3>🌾 बियाणे निवड</h3>
                        <p>स्थानिक भागासाठी शिफारस केलेले निरोगी आणि दर्जेदार बियाणे वापरा.</p>

                        <h3>💧 सिंचन</h3>
                        <p>पिकाची अवस्था, मातीतील ओलावा आणि हवामानानुसार सिंचन करा.</p>

                        <h3>☀️ पीक परिस्थिती</h3>
                        <p>गव्हासाठी योग्य थंड वातावरण आणि पुरेसा सूर्यप्रकाश आवश्यक आहे.</p>
                    `
                },

                management: {
                    title: "गहू पीक व्यवस्थापन",
                    subtitle: "उगवण ते काढणीपर्यंत गव्हाचे व्यवस्थापन.",
                    body: `
                        <h3>💧 सिंचन व्यवस्थापन</h3>
                        <p>महत्त्वाच्या वाढीच्या अवस्थांमध्ये सिंचनाकडे विशेष लक्ष द्या.</p>

                        <h3>🌿 तण नियंत्रण</h3>
                        <p>शेतातील तणांचे नियमित निरीक्षण करा.</p>

                        <h3>🔍 कीड निरीक्षण</h3>
                        <p>कीड आणि रोगाची लक्षणे नियमित तपासा.</p>

                        <h3>🧪 अन्नद्रव्य व्यवस्थापन</h3>
                        <p>माती परीक्षण आणि शिफारशींनुसार खतांचा वापर करा.</p>
                    `
                },

                practices: {
                    title: "गहू शेती पद्धती",
                    subtitle: "निरोगी गहू पिकासाठी व्यावहारिक पद्धती.",
                    body: `
                        <h3>🌱 वेळेवर पेरणी</h3>
                        <p>स्थानिक भाग आणि निवडलेल्या जातीसाठी योग्य वेळी पेरणी करा.</p>

                        <h3>🚜 शेताची तयारी</h3>
                        <p>समतल आणि योग्य प्रकारे तयार केलेली जमीन ठेवा.</p>

                        <h3>🔄 पीक फेरपालट</h3>
                        <p>पीक फेरपालट माती व्यवस्थापनासाठी उपयुक्त ठरू शकते.</p>

                        <h3>🌾 काढणी</h3>
                        <p>योग्य परिपक्वतेनंतर गव्हाची काढणी करा.</p>
                    `
                }

            }

        }

    };


    /* =====================================================
       CROP BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".crop-info-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const crop =
                        button.getAttribute(
                            "data-crop"
                        );

                    const topic =
                        button.getAttribute(
                            "data-topic"
                        );


                    openTranslatedCropModal(
                        crop,
                        topic
                    );

                }
            );

        });


    function openTranslatedCropModal(
        crop,
        topic
    ) {

        const modal =
            document.getElementById(
                "cropInfoModal"
            );


        if (!modal) return;


        modal.dataset.currentCrop =
            crop;

        modal.dataset.currentTopic =
            topic;


        renderTranslatedCropModal(
            crop,
            topic
        );


        modal.classList.remove(
            "hidden"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    function renderTranslatedCropModal(
        crop,
        topic
    ) {

        const data =
            translatedCropData
                [selectedLanguage]
                ?. [crop]
                ?. [topic];


        if (!data) return;


        setText(
            "cropInfoModalIcon",
            crop === "onion"
                ? "🧅"
                : "🌾"
        );


        setText(
            "cropInfoModalTitle",
            data.title
        );


        setText(
            "cropInfoModalSubtitle",
            data.subtitle
        );


        const body =
            document.getElementById(
                "cropInfoModalBody"
            );


        if (body) {

            body.innerHTML =
                data.body;

        }

    }


    const closeCropInfoBtn =
        document.getElementById(
            "closeCropInfoBtn"
        );


    const cropInfoModalOverlay =
        document.getElementById(
            "cropInfoModalOverlay"
        );


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
       GOVERNMENT SCHEMES
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
       FIREBASE AUTH STATE
    ===================================================== */

    if (auth) {

        auth.onAuthStateChanged(
            async user => {

                console.log(
                    "Firebase auth state:",
                    user
                );


                if (user) {

                    currentUser =
                        user;


                    /*
                     * Only automatically open dashboard
                     * when the user is already logged in.
                     */

                    const loginPage =
                        document.getElementById(
                            "loginPage"
                        );


                    const dashboardPage =
                        document.getElementById(
                            "dashboardPage"
                        );


                    const languagePage =
                        document.getElementById(
                            "languagePage"
                        );


                    if (
                        loginPage &&
                        dashboardPage &&
                        languagePage
                    ) {

                        const dashboardVisible =
                            dashboardPage
                                .classList
                                .contains(
                                    "active-screen"
                                );


                        if (
                            !dashboardVisible &&
                            localStorage.getItem(
                                "smartagri_entered"
                            ) === "true"
                        ) {

                            await loadFarmerProfile();

                            openDashboard();

                        }

                    }

                }

            }
        );

    }


    /* =====================================================
       REMEMBER DASHBOARD
    ===================================================== */

    const originalOpenDashboard =
        openDashboard;


    /*
     * Mark dashboard entry.
     */

    function markDashboardEntered() {

        localStorage.setItem(
            "smartagri_entered",
            "true"
        );

    }


    /*
     * Patch dashboard opening through
     * a small wrapper is unnecessary;
     * mark when DOM dashboard becomes active.
     */

    const observer =
        new MutationObserver(
            () => {

                const dashboard =
                    document.getElementById(
                        "dashboardPage"
                    );


                if (
                    dashboard &&
                    dashboard.classList.contains(
                        "active-screen"
                    )
                ) {

                    markDashboardEntered();

                }

            }
        );


    const dashboardElement =
        document.getElementById(
            "dashboardPage"
        );


    if (dashboardElement) {

        observer.observe(
            dashboardElement,
            {
                attributes: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    }


    /* =====================================================
       INITIAL LANGUAGE
    ===================================================== */

    applyLanguage(
        selectedLanguage
    );


    /*
     * IMPORTANT:
     * Do NOT automatically hide the language page.
     * The Continue button must control this.
     */

    const languagePage =
        document.getElementById(
            "languagePage"
        );


    const loginPage =
        document.getElementById(
            "loginPage"
        );


    const registerPage =
        document.getElementById(
            "registerPage"
        );


    const dashboardPage =
        document.getElementById(
            "dashboardPage"
        );


    if (languagePage) {

        languagePage.style.display =
            "flex";

        languagePage.classList.add(
            "active-screen"
        );

    }


    if (loginPage) {

        loginPage.style.display =
            "none";

        loginPage.classList.remove(
            "active-screen"
        );

    }


    if (registerPage) {

        registerPage.style.display =
            "none";

        registerPage.classList.remove(
            "active-screen"
        );

    }


    if (dashboardPage) {

        dashboardPage.style.display =
            "none";

        dashboardPage.classList.remove(
            "active-screen"
        );

    }


    updateConnectionStatus(
        navigator.onLine
    );


    console.log(
        "SmartAgri initialization complete."
    );


    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

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


    function showElement(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.classList.remove(
                "hidden"
            );

        }

    }


    function hideElement(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.classList.add(
                "hidden"
            );

        }

    }


    function setMessage(
        element,
        text,
        type
    ) {

        if (!element) return;


        element.textContent =
            text || "";


        element.classList.remove(
            "error-message",
            "success-message",
            "info-message"
        );


        if (type === "error") {

            element.classList.add(
                "error-message"
            );

        }


        if (type === "success") {

            element.classList.add(
                "success-message"
            );

        }


        if (type === "info") {

            element.classList.add(
                "info-message"
            );

        }

    }


    function firebaseErrorMessage(
        error
    ) {

        const code =
            error?.code || "";


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
                "Incorrect password.",

            "auth/invalid-credential":
                "Incorrect email or password.",

            "auth/too-many-requests":
                "Too many attempts. Please try again later."

        };


        return (
            messages[code] ||
            error?.message ||
            "An unexpected error occurred."
        );

    }


    function t(key) {

        return (
            translations[selectedLanguage]?.[key] ||
            translations.en[key] ||
            key
        );

    }


    function normalize(value) {

        return String(
            value || ""
        )
            .toLowerCase()
            .replace(
                /[^a-z0-9]/g,
                ""
            );

    }


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

});
