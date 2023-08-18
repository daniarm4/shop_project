import { Menu, MenuItem } from "@mui/material";
import { useRootStore } from "../../context/RootStoreContext";



const ProfileMenu = ({ anchorEl, open, onClose }) => {
    const { cartStore, authStore } = useRootStore();

    return (
        <Menu
            id='profile-menu'
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            onClose={onClose}
        >
            <MenuItem
                onClick={() => {
                    cartStore.clearCart();
                    authStore.logout();
                    onClose();
                }}
            >
                Logout
            </MenuItem>
        </Menu>
    )
}

export default ProfileMenu;
