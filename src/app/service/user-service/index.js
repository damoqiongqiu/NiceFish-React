import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const userListURL = environment.dataURL.userListURL;
const delUserURL = environment.dataURL.delUserURL;
const userDetailURL = environment.dataURL.userDetailURL;
const signUpURL = environment.dataURL.signUpURL;
const updateUserURL = environment.dataURL.updateUserURL;
const userMenuListURL = environment.dataURL.userMenuListURL;

export default {
    /**
     * 管理后台用的用户列表
     * @param {*} page 
     * @param {*} searchStr 
     * @returns 
     */
    getUserTable: (page, searchStr) => {
        let reqURL = _.template(userListURL)({ page: page });
        return axiosService.post(reqURL, { userName: searchStr });
    },

    /**
     * 删除用户
     * @param {*} id 
     * @returns 
     */
    del: (id) => {
        let reqURL = _.template(delUserURL)({ id: id });
        return axiosService.delete(reqURL);
    },

    /**
     * 根据 userId 加载用户信息
     * @param {*} userId 
     * @returns 
     */
    getUserDetails: (userId) => {
        let reqURL = _.template(userDetailURL)({ id: userId });
        return axiosService.get(reqURL);
    },

    /**
     * 注册新用户
     * @param {*} user 
     * @returns 
     */
    newUser: (user) => {
        return axiosService.post(signUpURL, user);
    },

    /**
     * 更新用户信息
     * @param {*} user 
     * @returns 
     */
    updateUser: (user) => {
        return axiosService.post(updateUserURL, user);
    },

    /**
     * 根据 userId 加载此用户的菜单
     * @param userId 
     * @returns 
     */
    getMenuByUser: (userId) => {
        let reqURL = _.template(userMenuListURL)({ id: userId });
        return axiosService.get(reqURL);
    }
}