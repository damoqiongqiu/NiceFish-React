import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const signInURL = environment.dataURL.signInURL;
const signOutURL = environment.dataURL.signOutURL;
const getSessionUserURL = environment.dataURL.getSessionUserURL;

export default {
    /**
     * 登录
     * @param {*} user 
     * @returns 
     */
    signIn: (user) => {
        return axiosService.post(
            `${signInURL}?userName=${user.userName}&password=${user.password}&validateCode=${user.captcha}&rememberMe=${user.rememberMe}`
        );
    },

    /**
     * 注销
     * @returns 
     */
    signOut: () => {
        return axiosService.get(signOutURL);
    },

    /**
     * 获取当前登录用户信息
     * @returns 
     */
    getSessionUser: () => {
        return axiosService.get(getSessionUserURL);
    }
}