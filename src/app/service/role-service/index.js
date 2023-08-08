import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const roleTableURL = environment.dataURL.roleTableURL;
const roleListByUserIdURL = environment.dataURL.roleListByUserIdURL;
const delRoleURL = environment.dataURL.delRoleURL;
const newRoleURL = environment.dataURL.newRoleURL;
const updateRoleURL = environment.dataURL.updateRoleURL;
const roleDetailURL = environment.dataURL.roleDetailURL;
const updateUserRoleRelationURL = environment.dataURL.updateUserRoleRelationURL;

export default {
    /**
     * 获取角色列表
     * @param {*} page 
     * @param {*} searchStr 
     * @returns 
     */
    getRoleTable: (page, searchStr) => {
        let reqURL = _.template(roleTableURL)({ page: page });
        return axiosService.post(reqURL, {
            roleName: searchStr
        });
    },

    /**
     * 根据 userId 获取此用户的所有角色列表
     * @param userId 
     * @returns 
     */
    getRoleListAllByUserId: (userId) => {
        let reqURL = _.template(roleListByUserIdURL)({ userId: userId });
        return axiosService.get(reqURL);
    },

    /**
     * 保存用户角色关系
     * @param {*} userId 
     * @param {*} roles 
     * @returns 
     */
    saveUserRoleRelation: (userId, roles) => {
        return axiosService.post(updateUserRoleRelationURL, { userId: userId, roleEntities: roles });
    },

    /**
     * 根据 roleId 获取角色信息
     * @param {*} roleId 
     * @returns 
     */
    getRoleInfo: (roleId) => {
        let reqURL = _.template(roleDetailURL)({ id: roleId });
        return axiosService.get(reqURL);
    },

    /**
     * 新增角色
     * @param {*} roleInfo 
     * @returns 
     */
    newRole: (roleInfo) => {
        return axiosService.post(newRoleURL, roleInfo);
    },

    /**
     * 更新角色
     * @param {*} roleInfo 
     * @returns 
     */
    updateRole: (roleInfo) => {
        return axiosService.post(updateRoleURL, roleInfo);
    },

    /**
     * 删除角色
     * @param {*} id 
     * @returns 
     */
    deleteRole: (id) => {
        let reqURL = _.template(delRoleURL)({ id: id });
        return axiosService.delete(reqURL);
    }
}