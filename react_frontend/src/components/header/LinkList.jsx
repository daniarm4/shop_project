import { Link } from "react-router-dom";
import { useRootStore } from "../../context/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";

const LinkList = () => {
    const { authStore } = useRootStore();

    const getLinks = () => {
        const links = [
            {to: '/products', name: 'Products'}
        ];
        if (authStore.isAuth) {
            links.push({to: '/orders', name: 'Orders'});
        }
        else {
            links.push({to: '/login', name: 'Login'}); 
            links.push({to: '/register', name: 'Register'});
        }
        return links;
    }

    const links = getLinks();

    return (
        <>
            {links.map(link => (
                <Button 
                    component={Link}
                    to={link.to}
                    key={link.to}
                    color='inherit'
                >
                    {link.name}
                </Button> 
            ))}
        </>
    )
}

export default observer(LinkList);
