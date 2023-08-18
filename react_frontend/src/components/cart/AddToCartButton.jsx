import { Button } from "@mui/material";
import { useRootStore } from "../../context/RootStoreContext";


const AddToCartButton = ({ children, product, quantity, setQuantity, setProduct, setShowOutOfStockModal, isActive }) => {
    const { cartStore } = useRootStore();

    const handleAddToCart = async () => {
        try {
            const cartProduct = await cartStore.addProduct(product, quantity)
            setProduct({...product, quantity: cartProduct.quantity})
            setQuantity(1);
        }
        catch(e) {
            if (e.message === 'Out of stock') {
                setProduct({...product, quantity: 0})
                setShowOutOfStockModal(true);
            }
        }
    };

    return (
        <Button
            disabled={!isActive} 
            variant="contained" 
            color="primary" 
            onClick={handleAddToCart}
        >
            {children}
        </Button>
    )
}

export default AddToCartButton;
