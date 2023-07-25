import axios from "axios";
import environment from "../../../environments/environment";

/**
 * 默认加上 request 和 response 拦截器。
 * 此项目中的所有业务 Service 都应该从这里获取 axios 实例，以便处理一些公共的逻辑。
 * @author 大漠穷秋
 */
const axiosService = axios.create({
    //FIXME:加上此项目一些默认配置
});

axiosService.interceptors.request.use((request) => {
    return request;
}, function (error) {
    return Promise.reject(error);
});

axiosService.interceptors.response.use((response) => {
    return response;
}, function (error) {
    //TODO:发现 session 超时前端做退出动作，删掉浏览器缓存，跳转到首页。
    let errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    niceFishToast({
        severity: 'error',
        summary: 'HTTP ERROR',
        detail: errorMsg,
        sticky: false,
        life: 5000
    });
    return Promise.reject(error);
});

export default axiosService;