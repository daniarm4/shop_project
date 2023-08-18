import React, { useEffect, useState } from 'react';
import OrderCard from '../components/orders/OrderCard';
import OrderApi from '../api/OrderApi';
import OrderDetailsModal from '../components/orders/OrderDetailModal';
import Loader from '../components/loader/Loader';
import { Box, Typography } from '@mui/material';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await OrderApi.getOrderList();
                setOrders(response.data);
                
            } 
            catch (e) {
                console.log(e);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setModalOpen(false);
    };

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (orders.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={4}
            >
                <Typography
                    variant='h5'
                >
                    No orders
                </Typography>
            </Box>
        )
    }

    return (
        <>
            {orders.map((order) => (
                <OrderCard
                    key={order.id}
                    orderNumber={order.id}
                    deliveryAddress={order.address}
                    orderStatus={order.status}
                    onDetailsClick={() => handleDetailsClick(order)}
                />
            ))}
            {selectedOrder && (
                <OrderDetailsModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    orderDetails={selectedOrder}
                />
            )}
        </>
    );
};

export default OrderListPage;
