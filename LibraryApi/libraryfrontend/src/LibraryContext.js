
import { createContext, useContext, useEffect, useState } from "react";
import AuthorizeService from "./Components/Authorization/AuthorizeService";
const AppContext = createContext({
    cartItems:null,
    setCartItems: ()=>{},
});

export const LibraryContextProvider =({children})=>{
    const [cartItems, setCartItems] = useState(0);

    useEffect(()=>{
        //var user=AuthorizeService.GetAccessToken();
        if(JSON.parse(sessionStorage.getItem("cart"))){
            setCartItems((JSON.parse(sessionStorage.getItem("cart"))).length);
        }
        console.log("con",cartItems);
    },[cartItems]);

    return(
        <AppContext.Provider value={{cartItems, setCartItems}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext;