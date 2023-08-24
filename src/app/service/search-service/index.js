import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const searchPostURL = environment.dataURL.searchPostURL;
const searchUserURL = environment.dataURL.searchUserURL;

export default {
    /**
     * 搜索内容
     * @param {*} page 
     * @param {*} size 
     * @param {*} keywords 
     * @returns 
     */
    searchPost: (page, size, keywords) => {
        let reqURL = _.template(searchPostURL)({ page, size, keywords });
        return axiosService.get(reqURL);
    },
    /**
     * 搜索用户
     * @param {*} page 
     * @param {*} size 
     * @param {*} keywords 
     * @returns 
     */
    searchUser: (page, size, keywords) => {
        let reqURL = _.template(searchUserURL)({ page, size, keywords });
        return axiosService.get(reqURL);
    }
}