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

axiosService.interceptors.request.use(
    (request) => {
        window.showGlobalSpin();
        return request;
    }, (error) => {
        return Promise.reject(error);
    }
);

const errorMsgMap = {
    400: '请求参数错误',
    401: '当前操作没有权限',
    403: '权限不足,请联系管理员',
    404: '请求地址不存在',
    405: '不支持该请求类型',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    503: '服务不可用',
    504: '后端服务异常',
    600: '网络异常，请稍后重试',
}
axiosService.interceptors.response.use(
    (response) => {
        window.hideGlobalSpin();
        return response;
    },
    (error) => {
        window.hideGlobalSpin();
        console.error(error);
        let errorMsg = errorMsgMap[error?.response?.status] || `Error Code: ${error.response.status},  Message: ${error.message}`;
        console.error(errorMsg);
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