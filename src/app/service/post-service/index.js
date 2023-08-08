import axiosService from "src/app/service/nicefish-axios-service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const postListURL = environment.dataURL.postListURL;
const postDetailURL = environment.dataURL.postDetailURL;
const delPostURL = environment.dataURL.delPostURL;
const postTableURL = environment.dataURL.postTableURL;

export default {
    //首页用的文章列表
    getPostList: (page) => {
        let reqURL = _.template(postListURL)({ page: page });
        return axiosService.get(reqURL);
    },
    //文章详情
    getPostDetail: (id) => {
        let reqURL = _.template(postDetailURL)({ id: id });
        return axiosService.get(reqURL);
    },
    //写文章
    writePost: (post) => {
        return axiosService.post("/cms/post/write-post", post);
    },
    //管理后台用的文章列表
    getPostTable: (page) => {
        let reqURL = _.template(postTableURL)({ page: page });
        return axiosService.get(reqURL);
    },
    //删除文章
    del: (id) => {
        let reqURL = _.template(delPostURL)({ id: id });
        return axiosService.delete(reqURL);
    }
}