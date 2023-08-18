import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const OutOfStockModal = ({showOutOfStockModal, setShowOutOfStockModal}) => {
    return (
        <Dialog open={showOutOfStockModal} onClose={() => setShowOutOfStockModal(false)}>
            <DialogTitle>Out of Stock</DialogTitle>
            <DialogContent>
                <DialogContentText>This product is currently out of stock.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowOutOfStockModal(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OutOfStockModal;
