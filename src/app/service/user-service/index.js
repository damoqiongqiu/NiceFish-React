import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const userListURL = environment.dataURL.userListURL;
const delUserURL = environment.dataURL.delUserURL;
const userDetailURL = environment.dataURL.userDetailURL;
const signUpURL = environment.dataURL.signUpURL;
const updateUserURL = environment.dataURL.updateUserURL;
const userMenuListURL = environment.dataURL.userMenuListURL;
const userFollowerCountURL = environment.dataURL.userFollowerCountURL;
const userFollowingCountURL = environment.dataURL.userFollowingCountURL;
const userPostLikedCountURL = environment.dataURL.userPostLikedCountURL;
const userPostRelationURL = environment.dataURL.userPostRelationURL;
const userPostRelationSaveURL = environment.dataURL.userPostRelationSaveURL;
const userPostRelationDeleteURL = environment.dataURL.userPostRelationDeleteURL;
const userFollowURL = environment.dataURL.userFollowURL;
const userUnFollowURL = environment.dataURL.userUnFollowURL;
const userFollowExistsURL = environment.dataURL.userFollowExistsURL;

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
     * 根据 userId 加载此用户的粉丝数量
     * @param {*} userId 
     * @returns 
     */
    getUserFollowerCount: (userId) => {
        let reqURL = _.template(userFollowerCountURL)({ userId });
        return axiosService.get(reqURL);
    },

    /**
     * 根据 userId 加载此用户的已关注数量
     * @param {*} userId 
     * @returns 
     */
    getUserFollowingCount: (userId) => {
        let reqURL = _.template(userFollowingCountURL)({ userId });
        return axiosService.get(reqURL);
    },

    /**
     * 根据 userId 加载此用户的被赞数量
     * @param {*} userId 
     * @returns 
     */
    getUserLikedCount: (userId) => {
        let reqURL = _.template(userPostLikedCountURL)({ userId });
        return axiosService.get(reqURL);
    },

    /**
     * 判断用户与内容之间是否存在点赞与收藏的关系
     * @param {*} userPostRelation 
     * @returns {boolean}
     */
    existsRelation: (userPostRelation) => {
        return axiosService.post(userPostRelationURL, userPostRelation);
    },

    /**
     * 保存用户与内容之间的点赞和收藏关系
     * @param {*} userPostRelation 
     * @returns
     */
    saveRelation: (userPostRelation) => {
        return axiosService.post(userPostRelationSaveURL, userPostRelation);
    },

    /**
     * 删除用户与内容之间的点赞和收藏关系
     * @param {*} userPostRelation 
     * @returns 
     */
    deleteRelation: (userPostRelation) => {
        return axiosService.delete(userPostRelationDeleteURL, { data: userPostRelation });
    },

    /**
     * 关注用户
     * @param {*} userFollow 
     * @returns 
     */
    follow: (userFollow) => {
        return axiosService.post(userFollowURL, userFollow);
    },

    /**
     * 取消关注用户
     * @param {*} userFollow 
     * @returns 
     */
    unfollow: (userFollow) => {
        return axiosService.delete(userUnFollowURL, { data: userFollow });
    },

    /**
     * 判断用户是否关注了某人
     * @param {*} userFollow 
     * @returns 
     */
    existsFollow: (userFollow) => {
        return axiosService.post(userFollowExistsURL, userFollow);
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