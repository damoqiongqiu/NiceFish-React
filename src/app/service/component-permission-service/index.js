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
    getCompPermTable: (page, searchStr) => {
        let reqURL = _.template(compPermListURL)({ page: page });
        return axiosService.post(reqURL, {
            componentName: searchStr,
        });
    },

    getCompPermListByRoleId: (roleEntity) => {
        let reqURL = _.template(compPermissionListAllByRole)();
        return axiosService.post(reqURL, roleEntity);
    },

    getRolesByCompId: (compPermId) => {
        let reqURL = _.template(compRoleListURL)({ id: compPermId });
        return axiosService.get(reqURL);
    },

    getCompPermDetails: (compPermId) => {
        let reqURL = _.template(compPermDetailURL)({ id: compPermId });
        return axiosService.get(reqURL);
    },

    deleteByCompPermId: (compPermId) => {
        let reqURL = _.template(delCompPermURL)({ id: compPermId });
        return axiosService.delete(reqURL);
    },

    newCompPerm: (componentPermission) => {
        return axiosService.post(newCompPermURL, componentPermission);
    },

    updateCompPerm: (componentPermission) => {
        return axiosService.post(updateCompPermURL, componentPermission);
    }
}