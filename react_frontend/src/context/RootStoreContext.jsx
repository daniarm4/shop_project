import { createContext, useContext } from "react";
import { AuthStore } from "../store/AuthStore";
import { CartStore } from "../store/CartStore";
import { useLocalObservable } from "mobx-react-lite";

const RootStoreContext = createContext(null);

export default RootStoreContext;

export const RootStoreProvider = ({children}) => {

    const authStore = new AuthStore();
    const cartStore = new CartStore();

    return (
    <RootStoreContext.Provider value={{ authStore, cartStore }}>
        {children}
    </RootStoreContext.Provider>
    )
}

export const useRootStore = () => useContext(RootStoreContext);
