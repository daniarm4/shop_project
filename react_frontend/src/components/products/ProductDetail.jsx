import { 
    Typography,
    Box,
    Rating,
    Grid,
} from '@mui/material';
import QuantityField from '../cart/QuantityField';
import { useState, useEffect } from 'react';
import OutOfStockModal from '../cart/OutOfStockModal';
import emitter from '../../events/emitter';
import AddToCartButton from '../cart/AddToCartButton';

const ProductDetail = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(item);
    const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
    const isActive = Boolean(product.quantity !== 0);

    useEffect(() => {
        const listener = emitter.addListener('cartProductRemoved', (data => {
            if (data.product.slug === product.slug) {
                setProduct({...product, quantity: data.product.quantity});
            }
        }))
        return () => listener.remove();
    }, []);

    return (
        <Grid container spacing={3} mt={1}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <img 
                            alt={product.name}
                            src={product.image} 
                            width="100%" 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" fontWeight='bold'>{product.name}</Typography>
                        <Rating value={product.rating} readOnly />
                        <Box>
                            <Typography>Price: ${product.price / 100}</Typography>
                            <Typography>Quantity: {product.quantity}</Typography>
                            <Box mb={1} mt={1}>
                                <QuantityField
                                    sx={{
                                        mr: 1,
                                        maxWidth: 130
                                    }}
                                    product={product}
                                    quantity={quantity}
                                    isActive={isActive}
                                    setQuantity={setQuantity}
                                />
                            </Box>
                            <AddToCartButton
                                product={product}
                                quantity={quantity}
                                setQuantity={setQuantity}
                                setProduct={setProduct}
                                setShowOutOfStockModal={setShowOutOfStockModal}
                                isActive={isActive}
                            >
                                Add to cart
                            </AddToCartButton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {product.description}
                </Typography>
            </Grid>
            <OutOfStockModal
                setShowOutOfStockModal={setShowOutOfStockModal} 
                showOutOfStockModal={showOutOfStockModal} 
            />
        </Grid>
    );
}

export default ProductDetail;
