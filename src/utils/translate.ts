
import { LanguageKeys } from "../types";

export const LANGUAGES = {
  ENGLISH: 'english',
  HINDI: 'hindi',
  TELUGU: 'telugu'
} as const;

export type LanguageKeys = 'english' | 'hindi' | 'telugu';

export const DEFAULT_LANGUAGE: LanguageKeys = 'english';

export const LANGUAGE_DETAILS = [
  { value: 'english', label: 'English', flag: '🇬🇧' },
  { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
  { value: 'telugu', label: 'తెలుగు', flag: '🇮🇳' },
] as const;

const translations = {
  english: {
    signup: "Sign Up",
    login: "Log In",
    welcomeBack: "Welcome Back",
    forgotPassword: "Forgot Password",
    username: "Phone Number",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    termsAccepted: "I accept the terms and conditions",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    loginText: "Log in",
    orSignUpWith: "Or sign up with",
    loading: "Loading...",
    freeAccess: "14-day free access to unlimited resources",
    welcomeTitle: "Join the CoinWise Family!",
    welcomeMessage: "Start your financial journey today",
    phoneNumber: "Phone Number"
  },
  hindi: {
    signup: "साइन अप करें",
    login: "लॉग इन",
    welcomeBack: "वापसी पर स्वागत है",
    forgotPassword: "पासवर्ड भूल गए",
    username: "फोन नंबर",
    password: "पासवर्ड",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    termsAccepted: "मैं नियम और शर्तों को स्वीकार करता हूं",
    createAccount: "खाता बनाएँ",
    alreadyHaveAccount: "पहले से ही एक खाता है?",
    loginText: "लॉग इन करें",
    orSignUpWith: "या इसके साथ साइन अप करें",
    loading: "लोड हो रहा है...",
    freeAccess: "असीमित संसाधनों तक 14-दिन का मुफ्त एक्सेस",
    welcomeTitle: "CoinWise परिवार में आपका स्वागत है!",
    welcomeMessage: "आज ही अपनी वित्तीय यात्रा शुरू करें",
    phoneNumber: "फोन नंबर"
  },
  telugu: {
    signup: "సైన్ అప్",
    login: "లాగిన్",
    welcomeBack: "తిరిగి వచ్చినందుకు స్వాగతం",
    forgotPassword: "పాస్వర్డ్ మర్చిపోయాను",
    username: "ఫోన్ నంబర్",
    password: "పాస్‌వర్డ్",
    firstName: "మొదటి పేరు",
    lastName: "చివరి పేరు",
    termsAccepted: "నేను నిబంధనలు మరియు షరతులను అంగీకరిస్తున్నాను",
    createAccount: "ఖాతా సృష్టించండి",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    loginText: "లాగిన్ చేయండి",
    orSignUpWith: "లేదా దీనితో సైన్ అప్ చేయండి",
    loading: "లోడ్ అవుతోంది...",
    freeAccess: "అపరిమిత వనరులకు 14 రోజుల ఉచిత యాక్సెస్",
    welcomeTitle: "CoinWise కుటుంబంలోకి స్వాగతం!",
    welcomeMessage: "మీ ఆర్థిక ప్రయాణాన్ని ఇప్పుడే ప్రారంభించండి",
    phoneNumber: "ఫోన్ నంబర్"
  }
};

export const translate = (key: keyof typeof translations.english, language: LanguageKeys = DEFAULT_LANGUAGE): string => {
  return translations[language][key] || translations.english[key] || key;
};
