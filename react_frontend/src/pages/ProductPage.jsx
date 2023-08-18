import { useParams } from "react-router-dom"
import ProductDetail from "../components/products/ProductDetail";
import { useState, useEffect } from "react";
import ProductApi from "../api/ProductApi";
import ReviewsApi from "../api/ReviewsApi"
import ProductReviews from "../components/products/ProductReviews";
import ReviewProductForm from "../components/products/ReviewProductForm";
import { Container } from "@mui/material";
import { useRootStore } from "../context/RootStoreContext";
import Loader from "../components/loader/Loader";

const ProductPage = () => {
    const { slug } = useParams();
    const { authStore } = useRootStore();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState('');
    const [reviews, setReviews] = useState([]);
    const [isReviewed, setIsReviewed] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const [product, reviews] = await Promise.all([
                    ProductApi.getProductBySlug(slug),
                    ReviewsApi.getReviewsByProductSlug(slug),
                ]);
                setProduct(product.data);
                setReviews(reviews.data);
                authStore.isAuth && setIsReviewed(Boolean(reviews.data.some(r => r.username === authStore.user.username)))
            } 
            catch (e) {
                console.log(e);
            }  
            finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [slug, isReviewed]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Container maxWidth="md">  
            <ProductDetail 
                item={product} 
            />
            <ProductReviews 
                slug={slug} 
                reviews={reviews} 
                setReviews={setReviews} 
            />
            <ReviewProductForm 
                slug={slug} 
                isReviewed={isReviewed}
                setIsReviewed={setIsReviewed} 
                setIsLoading={setIsLoading} 
            />
        </Container>
    )
}

export default ProductPage;