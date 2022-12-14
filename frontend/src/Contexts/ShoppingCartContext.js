import { createContext, useEffect } from "react";
import { useState } from "react";

export const ShoppingCartContext = createContext({});

export function ShoppingCartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsRaw = localStorage.getItem('cartItems');
    setCartItems(
      cartItemsRaw ? JSON.parse(cartItemsRaw) : []
    );
  }, []) 

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, setCartItems }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
