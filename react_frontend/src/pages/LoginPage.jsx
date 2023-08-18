import { Typography, Container, Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm"
import { Link } from "react-router-dom";


const LoginPage = () => {
    return (
        <>
            <Typography align='center' variant='h4' mt={2}>
                Login
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
                    <LoginForm />
                    <Box display='flex' justifyContent='center' mt={2}>
                        <Link
                            to='/register'
                            style={{
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            Don't have an account? Sign up
                        </Link>
                    </Box> 
                </Box>
            </Container>
        </>
    )
}

export default LoginPage;
