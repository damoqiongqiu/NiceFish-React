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
    getUserTable(page, searchStr) {
        let reqURL = _.template(userListURL)({ page: page });
        return axiosService.post(reqURL, { userName: searchStr });
    },

    del(id) {
        let reqURL = _.template(delUserURL)({ id: id });
        return axiosService.delete(reqURL);
    },

    getUserDetails(userId) {
        let reqURL = _.template(userDetailURL)({ id: userId });
        return axiosService.get(reqURL);
    },

    newUser(user) {
        return axiosService.post(signUpURL, user);
    },

    updateUser(user) {
        return axiosService.post(updateUserURL, user);
    },

    /**
     * 根据 userId 加载此用户的菜单
     * @param userId 
     * @returns 
     */
    getMenuByUser(userId) {
        let reqURL = _.template(userMenuListURL)({ id: userId });
        return axiosService.get(reqURL);
    }
}