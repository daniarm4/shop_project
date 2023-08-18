import { 
    Box, 
    Typography, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Badge, 
} 
from "@mui/material"
import { useRootStore } from "../../context/RootStoreContext"
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import emitter from "../../events/emitter";
import LinkList from "./LinkList";
import { AccountCircle, ShoppingCartOutlined } from "@mui/icons-material";
import { autorun } from "mobx";
import CartMenu from "./CartMenu";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
    const { authStore, cartStore } = useRootStore();
    const [anchorProfileMenu, setAnchorProfileMenu] = useState(null);
    const openProfileMenu = Boolean(anchorProfileMenu);
    const [cartItemsCount, setCartItemsCount] = useState(cartStore.cartProducts.length);
    const [anchorCart, setAnchorCart] = useState(null);
    const openCart = Boolean(anchorCart)

    useEffect(() => {
        autorun(() => {
            setCartItemsCount(cartStore.cartProducts.length);
        });
    }, []);

    const handleRemoveFromCart = async (product, quantity) => {
        const data = await cartStore.removeProduct(product, quantity);
        emitter.emit('cartProductRemoved', {product: data.product})
    }

    const handleCloseProfileMenu = () => {
        setAnchorProfileMenu(null)
    };

    const handleClickProfileMenu = event => {
        setAnchorProfileMenu(event.currentTarget)
    }

    const handleCloseCart = () => {
        setAnchorCart(null);
    }

    const handleClickCart = event => {
        setAnchorCart(event.currentTarget)
    }
 
    console.log(cartStore.cartProducts)

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h5" mr={1}>
                    Shop
                </Typography>
                <LinkList />
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton 
                        size="large" 
                        aria-label="show 4 new mails" 
                        color="inherit"
                        onClick={handleClickCart}
                    >
                        <Badge badgeContent={cartItemsCount} color="error">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                    {authStore.isAuth &&
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls='profile-menu'
                            onClick={handleClickProfileMenu}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    }
                </Box>
                <CartMenu 
                    open={openCart} 
                    anchorEl={anchorCart} 
                    onClose={handleCloseCart} 
                    handleRemoveFromCart={handleRemoveFromCart}
                /> 
                <ProfileMenu 
                    open={openProfileMenu}
                    anchorEl={anchorProfileMenu}
                    onClose={handleCloseProfileMenu}
                />
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);