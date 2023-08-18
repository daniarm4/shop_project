import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const CheckoutCancel = () => {
	return (
		<Container maxWidth="sm">
			<Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
				<CancelIcon color="error" style={{ fontSize: 64 }} />
				<Typography variant="h5" gutterBottom>
					Order cancelled
				</Typography>
				<Typography variant="body1">
					Order has been canceled
				</Typography>
				<Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
					Go back to the main page
				</Button>
			</Paper>
		</Container>
  );
};

export default CheckoutCancel;
