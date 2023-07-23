import axiosService from "src/app/utils/nicefish.axios.service";
import * as _ from 'lodash';
import environment from "src/environments/environment";

const signInURL = environment.dataURL.signInURL;
const signOutURL = environment.dataURL.signOutURL;
const getSessionUserURL = environment.dataURL.getSessionUserURL;

export default {
    signIn(user) {
        return axiosService.post(signInURL, {
            params: user
        });
    },
    signOut() {
        return axiosService.get(signOutURL);
    },
    getSessionUser() {
        return axiosService.get(getSessionUserURL);
    }
}