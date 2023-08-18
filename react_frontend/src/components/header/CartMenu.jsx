import { 
    Box,
    Button,
    Card,
    CardMedia,
    Popover, 
    Typography,
} 
from "@mui/material"
import { useRootStore } from "../../context/RootStoreContext"
import { Link } from "react-router-dom";

const CartMenu = ({ open, anchorEl, onClose, handleRemoveFromCart }) => {
    const { cartStore, authStore } = useRootStore();
    const totalAmount = cartStore.totalAmount;

    const checkoutButton = () => {
        if (totalAmount >= 50) {
            return (
                <Button
                    component={Link}
                    to='/orders/create'
                    onClick={() => onClose()}
                >   
                    Checkout
                </Button>
            )
        }
        return (
            <Button
                onClick={() => alert('Order amount must be more than 50 cents')}
            >   
                Checkout
            </Button>
        )
    }

    return (    
        <Popover 
            id='cart'
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {cartStore.cartProducts.length > 0 
            ? 
            <>
                <Typography
                    variant="h5"
                    component="div"
                    textAlign='center'
                    sx={{ fontWeight: 400, mt: 1 }}
                >
                    Cart items
                </Typography>
                {cartStore.cartProducts.map(item => {
                    const [product, quantity] = item;

                    return (
                        <>
                            <Card sx={{ display: 'flex', margin: '0 10px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100, height: 80 }}
                                    image={product.image}
                                />
                                <Box sx={{ flexGrow: 1, ml: 2, width: 170 }}>
                                    <Typography variant="subtitle1">
                                        {product.name} 
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {product.price / 100} $
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {quantity} pc
                                    </Typography>
                                </Box>
                                <Button
                                    sx={{ ml: 'auto' }}
                                    onClick={() => handleRemoveFromCart(product, quantity)}
                                >
                                    Remove
                                </Button>
                            </Card>
                        </>
                )})}
                {authStore.isAuth &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        m: 1,
                    }}
                >
                    {checkoutButton()}
                </Box>
                }
            </>
            :
            <Box>
                <Typography
                    variant="h5"
                    component="div"
                    textAlign='center'
                >
                    Cart is empty
                </Typography>
            </Box>
            }
        </Popover>
    )
}

export default CartMenu;
