import axios from "axios";
import environment from "src/environments/environment";
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

        //Mock 状态下，所有的请求都改成 get 请求。
        if (environment.isMock) {
            niceFishToast({
                severity: 'warn',
                summary: 'Warning',
                detail: "注意：当前为 Mock 模式，不会与服务端交互，某些请求会报错。所有输入项都可以随意输入，符合校验规则即可。如果需要与服务端交互，请重新启动到 backend 模式 npm run start:dev-backend ",
                sticky: false,
                life: 10000
            });

            if (request.method !== 'get') {
                request.method = 'get';
            }
        }

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