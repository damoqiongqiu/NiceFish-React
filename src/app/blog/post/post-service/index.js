import axiosService from "src/app/utils/nicefish.axios.service";
import environment from "src/environments/environment";

const postListURL = environment.dataURL.postListURL;

export default {
    getPostList: (page) => {
        return axiosService.get(postListURL, {
            params: {
                id: 12345
            }
        });
    }
}