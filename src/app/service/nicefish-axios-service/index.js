import axios from "axios";
import i18n from "src/app/shared/i18n";

/**
 * 默认加上 request 和 response 拦截器。
 * 此项目中的所有业务 Service 都应该从这里获取 axios 实例，以便处理一些公共的逻辑。
 * @author 大漠穷秋
 */
const axiosService = axios.create({
    //FIXME:加上此项目一些默认配置
});

axiosService.interceptors.request.use(
    (request) => {
        window.showGlobalSpin();
        return request;
    }, (error) => {
        return Promise.reject(error);
    }
);

axiosService.interceptors.response.use(
    (response) => {
        window.hideGlobalSpin();
        return response;
    },
    (error) => {
        window.hideGlobalSpin();
        console.log(error);
        let errorMsg = i18n.t(`http.${error?.response?.status}`) || `Error Code: ${error.response.status},  Message: ${error.message}`;
        //TODO:发现 session 超时前端做退出动作，删掉浏览器缓存，跳转到首页。
        niceFishToast({
            severity: 'error',
            summary: 'HTTP ERROR',
            detail: errorMsg,
            sticky: true,
            life: 5000
        });
        return Promise.reject(error);
    }
);

export default axiosService;