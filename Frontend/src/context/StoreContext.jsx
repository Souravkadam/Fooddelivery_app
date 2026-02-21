/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../components/service/foodService";
import { addToCart, getCartData, removeQtyFromCart } from "../components/service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState("");

    const loadCartData = async (token) => {
        const items = await getCartData(token);   // ✅ FIX
        setQuantities(items || {});
    };

    const increaseQty = async (foodId) => {
        setQuantities(prev => ({
            ...prev,
            [foodId]: (prev[foodId] || 0) + 1
        }));
        await addToCart(foodId, token);
    };

    const decreaseQty = async (foodId) => {
        setQuantities(prev => ({
            ...prev,
            [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0
        }));
        await removeQtyFromCart(foodId, token);
    };

    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });
    };

    const contextValue = {
        foodList,
        increaseQty,
        setQuantities,
        decreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken,
        loadCartData
    };

    useEffect(() => { 
        async function loadData() { 
            const data = await fetchFoodList(); 
            console.log("Fetched food data:", data); 
            setFoodList(data); 
            if (localStorage.getItem('token')) { 
                setToken(localStorage.getItem('token')); 
                await loadCartData(localStorage.getItem("token")); 
            }
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
