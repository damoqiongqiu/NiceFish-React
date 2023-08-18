import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import environment from "src/environments/environment";

// 获取当前页面的协议、域名和端口号
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;

//开发态默认指向根目录，构建指向 /NiceFish-React/ ，请根据项目情况修改这里的值。
const baseUrl = !environment.production
    ? '/'
    : `${protocol}//${hostname}${port ? ':' + port : ''}/NiceFish-React/`;

// 构建加载路径
const baseLoadPath = `${baseUrl}locales/{{lng}}/translation.json`;

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
        },
        backend: {
            loadPath: baseLoadPath,
        },
    });

export default i18n;