import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, unauthRoutes } from './routes';
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import { useRootStore } from './context/RootStoreContext';
import Header from './components/header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles' 
import './App.css'

const App = () => {
    const { authStore } = useRootStore();
    const [ authReady, setAuthReady ] = useState(false);
    const theme = createTheme({
        palette: {
            primary: {
                main: '#7B68EE'
            }
        }
    })


    useEffect(() => {
    async function loadUser() {
        try {
            await authStore.loadUser();
        }
        catch(e) {
            console.log(e.response.data.detail);
        }
        finally {
            setAuthReady(true);
        }
    }

        loadUser();
    }, [])

    if (!authReady) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    {publicRoutes.map(route =>
                        <Route path={route.path} element={route.element} exact key={route.path}/>
                    )}
                    {authStore.isAuth 
                    ? 
                    authRoutes.map(route => 
                        <Route path={route.path} element={route.element} exact key={route.path}/>
                    )
                    :
                    unauthRoutes.map(route => 
                        <Route path={route.path} element={route.element} exact key={route.path}/>
                    )}
                    <Route path='*' element={<Navigate to='/products' />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default observer(App);
