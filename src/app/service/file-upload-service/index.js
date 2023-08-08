import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const fileUploadAPI = "/cms/file/upload";

export default {
    /**
     * 同时上传多个文件
     * @param {*} files 
     * @returns 
     */
    uploadFiles: async (files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const response = await axiosService.post(fileUploadAPI, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }
}