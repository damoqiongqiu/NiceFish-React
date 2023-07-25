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
    getRoleTable(page, searchStr) {
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
    getRoleListAllByUserId(userId) {
        let reqURL = _.template(roleListByUserIdURL)({ userId: userId });
        return axiosService.get(reqURL);
    },

    saveUserRoleRelation(userId, roles) {
        return axiosService.post(updateUserRoleRelationURL, { userId: userId, roleEntities: roles });
    },

    getRoleInfo(roleId) {
        let reqURL = _.template(roleDetailURL)({ id: roleId });
        return axiosService.get(reqURL);
    },

    newRole(roleInfo) {
        return axiosService.post(newRoleURL, roleInfo);
    },

    updateRole(roleInfo) {
        return axiosService.post(updateRoleURL, roleInfo);
    },

    deleteRole(id) {
        let reqURL = _.template(delRoleURL)({ id: id });
        return axiosService.delete(reqURL);
    }
}