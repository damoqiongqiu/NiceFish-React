import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const commentListURL = environment.dataURL.commentListURL;
const delCommentURL = environment.dataURL.delCommentURL;

export default {
    getCommentTable(page) {
        let reqURL = _.template(commentListURL)({ page: page });
        return axiosService.get(reqURL);
    },
    delComment(id) {
        let reqURL = _.template(delCommentURL)({ id: id });
        return axiosService.delete(reqURL);
    }
}