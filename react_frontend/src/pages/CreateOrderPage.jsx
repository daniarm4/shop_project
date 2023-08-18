import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container, Box } from '@mui/material';
import { useRootStore } from '../context/RootStoreContext';
import OrderApi from '../api/OrderApi';
import { useNavigate } from 'react-router'

const CreateOrderPage = () => {
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const { cartStore } = useRootStore();
    const products = cartStore.cartProducts;
    const totalAmount = cartStore.totalAmount;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (address.length < 4) {
            setAddressError(true);
            return
        }
        try {
            const responseProducts = products.map(item => {
                return [item[0].slug, item[1]];
            })
            await OrderApi.createOrder(responseProducts, address);
            localStorage.removeItem('cartProducts');
            navigate('/orders')
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{ my: 4 }}>
                Checkout
            </Typography>
            <Box
                sx={{ 
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'grey.300',
                    p: 2,
                    mb: 2
                }}
            >
                <TextField
                    label="Delivery address"
                    variant="outlined"
                    fullWidth
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressError(false);
                    }}
                    margin="normal"
                    required
                    helperText={addressError && 'Address must contain at least 4 characters'}
                    error={addressError}
                />
                <Typography variant="h6" sx={{ mt: 4 }}>
                    List of ordered products
                </Typography>
                <List>
                    {products.map((product) => (
                        <ListItem key={product.slug}>
                            <ListItemText primary={product[0].name} secondary={
                                <>
                                    Price: {product[0].price / 100} $.
                                    <br/> 
                                    Quantity: {product[1]} pc
                                </>
                            } /> 
                        </ListItem>
                    ))}
                </List>

                <Box display="flex" justifyContent="space-between" sx={{mt: 2}}>
                    <Typography variant="subtitle1">
                        Total amount:  
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {totalAmount / 100} $
                    </Typography>
                </Box>
                <Button 
                    disabled={Boolean(totalAmount < 50)}
                    variant="contained" 
                    color="primary"
                    size="large"
                    sx={{ mt: 4, display: 'block', mx: 'auto' }}
                    onClick={handleSubmit}
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
}

export default CreateOrderPage;
