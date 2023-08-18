import axios from "axios"
import axiosInstance from "../axios"

const baseUrl = 'http://127.0.0.1:8000/api/reviews/'

class ReviewsApi {
    static getReviewsByProductSlug(productSlug) {
        return axios.get(baseUrl + `${productSlug}`);
    }

    static createReview(productSlug, text, rate) {
        return axiosInstance.post(`reviews/${productSlug}/`, {text, rate});
    }

    static deleteReview(productSlug) {
        return axiosInstance.delete(`reviews/${productSlug}/delete/`);
    }

}

export default ReviewsApi;
