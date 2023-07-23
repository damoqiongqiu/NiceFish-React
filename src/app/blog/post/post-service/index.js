import axiosService from "src/app/utils/nicefish.axios.service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const postListURL = environment.dataURL.postListURL;
const postDetailURL = environment.dataURL.postDetailURL;

export default {
    getPostList: (page) => {
        return axiosService.get(postListURL, {
            params: {
                id: 12345
            }
        });
    },
    getPostDetail(id) {
        let reqURL = _.template(postDetailURL)({ id: id });
        console.log(reqURL);
        return axiosService.get(reqURL);
    }
}