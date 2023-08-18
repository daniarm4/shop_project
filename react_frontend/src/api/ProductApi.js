import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/products/'

class ProductApi {
    static getProducts(page=1, filters) {
        const tags = filters.tags.join(',')
        return axios.get(baseUrl, {
            params: {
                page: page,
                category__name: filters.category,
                tags: tags,
                in_stock: filters.inStock,
                ordering: filters.sortParam,
            }
        });
    }

    static getProductBySlug(productSlug) {
        return axios.get(baseUrl + `product/${productSlug}/`);
    }

    static getCategories() {
        return axios.get(baseUrl + 'categories/');
    }

    static getTags() {
        return axios.get(baseUrl + 'tags/');
    }

    static addInCart(product, quantity) {
        return axios.post(baseUrl + 'cart/add/', {product_slug: product.slug, quantity});
    }

    static removeFromCart(product, quantity) {
        return axios.post(baseUrl + 'cart/remove/', {product_slug: product.slug, quantity}) 
    }

}

export default ProductApi;
