import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import OrderApi from '../../api/OrderApi';

const OrderDetailsModal = ({ open, onClose, orderDetails }) => {
    const { id, status, address, products } = orderDetails;
    const amount = products.reduce((total, product) => total + product.price * product.quantity, 0)

    const createCheckout = async () => {
        console.log('clicked')
        try {
            await OrderApi.createCheckout(id);
        }
        catch(e) {
            if (e.response.status === 302) {
                window.location.href = e.response.data.session_url
            }
            else {
                console.log(e)
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Order details #{id}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Order status: {status !== 'not_paid' ? 'Paid' : 'Not paid'}<br />
                Total amount: {amount}<br />
                Address: {address}<br />
                Ordered products:
                <ul>
                    {products.map(item => (
                    <li key={item.id}>
                        {item.product__name} - {item.quantity} pc.
                    </li>
                    ))}
                </ul>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {status === 'not_paid' &&
                <Button onClick={createCheckout} color="primary" variant='outlined'>
                    Pay
                </Button>
            }
            <Button onClick={onClose} color="error" variant='outlined'>
                Close
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsModal;
