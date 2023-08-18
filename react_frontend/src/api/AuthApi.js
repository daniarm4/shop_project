import axios from "axios";
import axiosInstance from "../axios";

const baseUrl = 'http://127.0.0.1:8000/api/auth/'


class AuthApi {
    static login(email, password) {
        return axios.post(baseUrl + 'token/', {email, password});
    }

    static userDetail() {
        return axiosInstance.get('auth/user/');
    }

    static logout() {
        return axiosInstance.post('auth/logout/');
    }

    static register(email, username, phoneNumber, password, rePassword) {
        return axios.post(baseUrl + 'register/', {
            email,
            username,
            phone_number: phoneNumber,
            password,
            re_password: rePassword
        })
    }

    static refreshToken() {
        return axios.post(baseUrl + 'token/refresh/', {
            refresh: localStorage.getItem('refreshToken')
        });
    }
}   


export default AuthApi;
