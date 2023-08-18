import { Box, Container, Typography } from "@mui/material";
import { RegisterForm } from "../components/auth/RegisterForm"
import { Link } from "react-router-dom";


const RegisterPage = () => {
    return (
        <>
            <Typography align='center' variant='h4' mt={2}>
                Register
            </Typography>
            <Container maxWidth="sm">
                <Box
                    sx={{ 
                    border: 1,
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 3,
                    mt: 2  
                    }}
                >   
                    <RegisterForm />
                    <Box display='flex' justifyContent='center' mt={2}>
                        <Link
                            to='/login'
                            style={{
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            Already have an account? Sign in
                        </Link>
                    </Box> 
                </Box>
            </Container>
        </>
    )
}

export default RegisterPage;
