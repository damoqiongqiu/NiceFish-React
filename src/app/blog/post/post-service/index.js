import axiosService from "src/app/utils/nicefish.axios.service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const postListURL = environment.dataURL.postListURL;
const postDetailURL = environment.dataURL.postDetailURL;

export default {
    getPostList: (page) => {
        let reqURL = _.template(postListURL)({ page: page });
        return axiosService.get(reqURL);
    },
    getPostDetail(id) {
        let reqURL = _.template(postDetailURL)({ id: id });
        return axiosService.get(reqURL);
    }
}