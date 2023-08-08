import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const compPermListURL = environment.dataURL.compPermListURL;
const compPermDetailURL = environment.dataURL.compPermDetailURL;
const compPermissionListAllByRole = environment.dataURL.compPermissionListAllByRole;
const delCompPermURL = environment.dataURL.delCompPermURL;
const newCompPermURL = environment.dataURL.newCompPermURL;
const updateCompPermURL = environment.dataURL.updateCompPermURL;
const compRoleListURL = environment.dataURL.compRoleListURL;

export default {
    /**
     * 获取组件权限列表
     * @param {*} page 
     * @param {*} searchStr 
     * @returns 
     */
    getCompPermTable: (page, searchStr) => {
        let reqURL = _.template(compPermListURL)({ page: page });
        return axiosService.post(reqURL, {
            componentName: searchStr,
        });
    },

    /**
     * 根据 role 获取组件权限列表
     * @param {*} roleEntity 
     * @returns 
     */
    getCompPermListByRoleId: (roleEntity) => {
        let reqURL = _.template(compPermissionListAllByRole)();
        return axiosService.post(reqURL, roleEntity);
    },

    /**
     * 根据组件权限 id 获取角色列表
     * @param {*} compPermId 
     * @returns 
     */
    getRolesByCompId: (compPermId) => {
        let reqURL = _.template(compRoleListURL)({ id: compPermId });
        return axiosService.get(reqURL);
    },

    /**
     * 根据组件权限 id 获取组件权限详情
     * @param {*} compPermId 
     * @returns 
     */
    getCompPermDetails: (compPermId) => {
        let reqURL = _.template(compPermDetailURL)({ id: compPermId });
        return axiosService.get(reqURL);
    },

    /**
     * 根据组件权限 id 删除组件权限
     * @param {*} compPermId 
     * @returns 
     */
    deleteByCompPermId: (compPermId) => {
        let reqURL = _.template(delCompPermURL)({ id: compPermId });
        return axiosService.delete(reqURL);
    },

    /**
     * 新增组件权限
     * @param {*} componentPermission 
     * @returns 
     */
    newCompPerm: (componentPermission) => {
        return axiosService.post(newCompPermURL, componentPermission);
    },

    /**
     * 更新组件权限
     * @param {*} componentPermission 
     * @returns 
     */
    updateCompPerm: (componentPermission) => {
        return axiosService.post(updateCompPermURL, componentPermission);
    }
}