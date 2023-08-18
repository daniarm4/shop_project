import { makeAutoObservable } from "mobx";
import ProductApi from "../api/ProductApi";


export class CartStore { 
    constructor() {
        this._cartProducts = this.getCartProducts();
        makeAutoObservable(this);
    }

    getCartProducts() {
        const cartProducts = localStorage.getItem('cartProducts');
        if (!cartProducts) {
            return [];
        }
        return JSON.parse(cartProducts);
    }

    get cartProducts() {
        return this._cartProducts;
    }

    get totalAmount() {
        return this._cartProducts.reduce((total, product) => total + product[0].price * product[1], 0);
    }

    updateLocalStorage() {
        localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
    }

    async addProduct(product, quantity) {
        try {   
            const response = await ProductApi.addInCart(product, quantity);
            const responseProduct = response.data.cart_product
            const existingProductIndex = this._cartProducts.findIndex(
                item => item[0].slug === responseProduct.slug
            );
    
            if (existingProductIndex !== -1) {
                this._cartProducts[existingProductIndex][1] += +quantity;
            } else {
                this._cartProducts.push([responseProduct, +quantity]);
            }
            this.updateLocalStorage();
            return responseProduct;
        }
        catch(e) {  
            throw new Error(e.response.data.error); 
        }
    }

    async removeProduct(product, quantity) {
        try {
            const response = await ProductApi.removeFromCart(product, quantity)
            this._cartProducts = this._cartProducts.filter(item => item[0] !== product);
            this.updateLocalStorage();
            return response.data;
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async clearCart() {
        try {
            this._cartProducts.forEach(item => {
                const [product, quantity] = item;
                this.removeProduct(product, quantity);
            })
        }
        catch(e) {
            console.log(e);
        }
    }
}

