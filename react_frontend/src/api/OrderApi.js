import axiosInstance from "../axios";


class OrderApi {
    static createOrder(products, address) {
        return axiosInstance.post('orders/list-create/', {
            products, 
            address
        }
        );
    }  

    static getOrderById(orderId) {
        return axiosInstance.get(`orders/detail/${orderId}/`);
    }

    static getOrderList() {
        return axiosInstance.get('orders/list-create/')
    }

    static createCheckout(orderId) {
        return axiosInstance.post('orders/create-checkout/', {
            order_id: orderId,
        })
    }
}

export default OrderApi;
