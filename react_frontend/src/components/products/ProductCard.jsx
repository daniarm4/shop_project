import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Rating,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emitter from '../../events/emitter';
import OutOfStockModal from '../cart/OutOfStockModal';
import QuantityField from '../cart/QuantityField';
import AddToCartButton from '../cart/AddToCartButton';

const ProductCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(item)
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
        <Card sx={{ width: 310, ml: 1, mb: 1 }}>
            <Link to={`/product/${product.slug}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                />
            </Link>
            <CardContent>
                <Link to={`/product/${product.slug}`}>
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                </Link>
                <Rating 
                    value={product.rating}
                    readOnly
                /> 
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography> 
                <Typography variant="body2" color="text.secondary">
                    Price: {product.price / 100} $
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Quantity: {product.quantity} pc
                </Typography>
            </CardContent>
            <Box alignItems='center' p={2} justifyContext='space-between' display='flex'>
                <QuantityField 
                    product={product}
                    sx={{
                        mr: 1,
                        flex: 1
                    }}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    isActive={isActive}
                />
                <AddToCartButton
                    setShowOutOfStockModal={setShowOutOfStockModal}
                    product={product}
                    quantity={quantity}
                    setProduct={setProduct}
                    isActive={isActive}
                >
                    Add to cart
                </AddToCartButton>
            </Box>
            <OutOfStockModal 
                setShowOutOfStockModal={setShowOutOfStockModal} 
                showOutOfStockModal={showOutOfStockModal} 
            />
        </Card>
    )
}

export default ProductCard;
