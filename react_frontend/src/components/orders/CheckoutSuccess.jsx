import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckoutSuccess = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <CheckCircleIcon color="success" style={{ fontSize: 64 }} />
                <Typography variant="h5" gutterBottom>
                    Payment completed successfully
                </Typography>
                <Typography variant="body1">
                    Your order has been successfully paid and will be processed as soon as possible.
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Go back to the main page
                </Button>
            </Paper>
        </Container>
    );
};

export default CheckoutSuccess;
