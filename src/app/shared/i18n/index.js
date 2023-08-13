import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: navigator.language,    //动态指定语言使用 changeLanguage 函数
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;