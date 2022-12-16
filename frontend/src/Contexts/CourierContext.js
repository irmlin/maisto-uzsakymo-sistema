import { createContext, useEffect } from "react";
import { useState } from "react";

export const CourierContext = createContext({});

export function CourierContextProvider({ children }) {
  const [isDelivering, setIsDelivering] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);
  const [toggleOrders, setToggleOrders] = useState(false);

  useEffect(() => {
    const orderInfoRaw = localStorage.getItem('orderInfo');
    const isInDelivery = localStorage.getItem('isDelivering');
    setOrderInfo(
      orderInfoRaw ? JSON.parse(orderInfoRaw) : {}
    );
    setIsDelivering(
      !isInDelivery ? false : (isInDelivery === "true" ? true : false) 
    );
  }, []) 

  return (
    <CourierContext.Provider
      value={{ isDelivering, setIsDelivering, orderInfo, setOrderInfo, toggleOrders, setToggleOrders }}
    >
      {children}
    </CourierContext.Provider>
  );
}
