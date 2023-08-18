import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/' 

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}
)

axiosInstance.interceptors.response.use(
    config => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
            try {
                const response = await axios.post(baseUrl + 'auth/token/refresh/', {refresh: localStorage.getItem('refreshToken')})
                localStorage.setItem('accessToken', response.data.access);
                return axiosInstance(originalRequest)
            }
            catch(e) {
                const data = e.response.data;
                if (data?.code && data.code === 'token_not_valid') {
                    localStorage.clear();
                    console.log('Refresh token deleted');
                }
                return Promise.reject(error);
            }
        }
        throw error;
    }
)

export default axiosInstance;
