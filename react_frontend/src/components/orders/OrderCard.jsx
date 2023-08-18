import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const OrderCard = ({ orderNumber, deliveryAddress, orderStatus, onDetailsClick }) => {

    return (
    <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Order #{orderNumber}
            </Typography>
            <Typography variant="body1">
                Delivery address: {deliveryAddress}
            </Typography>
            <Typography variant="body2" color={orderStatus !== 'not_paid' ? 'success' : 'error'}>
                Order status: {orderStatus !== 'not_paid' ? 'Paid' : 'Not paid'}
            </Typography>
        </CardContent>
        <Button variant="outlined" onClick={onDetailsClick} style={{ marginRight: '12px' }}>
            Order details
        </Button>
    </Card>
    );
};

export default OrderCard;