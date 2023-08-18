import { makeAutoObservable } from 'mobx'
import AuthApi from '../api/AuthApi';


export class AuthStore {
    constructor() {
        this._user = null;
        this._isAuth = false;
        makeAutoObservable(this);
    }

    setUser(user) {
        this._user = user;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    get user() {
        return this._user;
    }

    get isAuth() {
        return this._isAuth;
    }

    async loadUser() {
        if (localStorage.getItem('refreshToken')) {
            const user = await AuthApi.userDetail();
            this.setUser(user.data);
            this.setIsAuth(true);
        }
        else {
            console.log('Refresh token not available')
        }
    }

    async register(email, username, phoneNumber, password, rePassword) {
        try {
            const response = await AuthApi.register(email, username, phoneNumber, password, rePassword);
        }
        catch(e) {
            if (e.response.status === 401 && e.response.data) {
                throw new Error(e.response.data);
            }
            throw e;
        }
    }

    async login(email, password) {
        try {
            const response = await AuthApi.login(email, password);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            await this.loadUser();
        }
        catch(e) {
            if (e.response.status === 401 && e.response.data.detail === 'No active account found with the given credentials') {
                throw new Error('Invalid email or password');
            }
            throw e;
        }
    }
    
    async logout() {
        try {
            await AuthApi.logout();
            localStorage.clear();
            this.setIsAuth(false);
            this.setUser(null);
        }
        catch(e) {
            console.log(e);
        }
    }

}
