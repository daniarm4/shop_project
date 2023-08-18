import { TextField } from "@mui/material";
import { useState } from "react";

const QuantityField = ({ product, quantity, setQuantity, isActive, sx }) => {
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ showError, setShowError ] = useState();

    const handleQuantityChange = (value) => {
        if (value > product.quantity) {
            setErrorMessage(`No more than ${product.quantity}`);
            setShowError(true);
            return;
        }
        if (value < 1) {
            setErrorMessage(`No less than 1`);
            setShowError(true);
            return;
        }
        setShowError(false);
        setQuantity(value);
    }

    return (
        <TextField
            sx={sx}
            size='small'
            disabled={!isActive}
            type='number'
            label='Quantity'
            value={quantity}
            onChange={e => handleQuantityChange(e.target.value)}
            inputProps={{
                min: 1,
                step: 1,
            }}
            error={showError}
            helperText={showError && errorMessage}
        />
    )
}

export default QuantityField;
