import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Alert, Snackbar } from "@mui/material";
import { getAvailableOrders } from "../Services/OrderService";
import CourierOrdersTable from "../Components/CourierOrdersTable";
import { CourierContext } from "../Contexts/CourierContext";
import { assignOrderToCourier } from "../Services/OrderService";


export default function CourierOrders() {

  const { userData } = useContext(UserContext);
  const { setIsDelivering, setOrderInfo, toggleOrders, setToggleOrders, orderInfo } = useContext(CourierContext);
  const [orders, setOrders] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  useEffect(() => {
    fetchOrders();
  }, [toggleOrders])

  const fetchOrders = async () => {
    const response = await getAvailableOrders(userData.cityId);
    if (!response || !response.data.success) {
      showError("Serverio klaida");
      return;
    }
    if (!response.data.orders.length) {
      // showError("Sistemoje šiuo metu nėra užsakymų!");
    }
    setOrders(response.data.orders);
  }

  function showError(errorMsg) {
    setSnackOpen(true);
    setSnackColor("error");
    setSnackText(errorMsg);
  }

  function showStartedOrder() {
    setSnackOpen(true);
    setSnackColor("success");
    setSnackText("Užsakymas pradėtas! Detalią užsakymo informaciją rasite paspaudę MANO PRISTATYMAS");
  }

  const handleSelectOrder = async (e, orderInfoRaw) => {

    e.preventDefault();
    const response = await assignOrderToCourier(userData.id, orderInfoRaw[0].orderId);
    if (!response || !response.data.success) {
      showError("Serverio klaida");
      return;
    }

    const {
      cartId, clientId, client_comments,
      date, deliveryTax, delivery_address, firstname, lastname,
      orderId, orderStatus, phone_number, restaurantAddress, restaurantName, totalCartPrice
    } = orderInfoRaw[0];

    const orderInfoToSave = {
      basicInfo: {
        cartId, clientId, client_comments, date, deliveryTax,
        delivery_address, firstname, lastname, orderId, orderStatus,
        phone_number, restaurantAddress, restaurantName, totalCartPrice
      }, 
      mealInfo: orderInfoRaw.map(order => ({mealName: order.mealName, amount: order.currentMealAmount})) 
    };

    setIsDelivering(true);
    setOrderInfo(orderInfoToSave);
    localStorage.setItem('isDelivering', true);
    localStorage.setItem('orderInfo', JSON.stringify(orderInfoToSave));
    showStartedOrder();

    setToggleOrders(!toggleOrders);
  }

  return (
    <>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Užsakymų sąrašas</motion.h2>
        <CourierOrdersTable
          orders={orders}
          handleSelectOrder={handleSelectOrder}
        />
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={() => setSnackOpen(false)}
        >
          <Alert
            severity={snackColor}
            sx={{ horizontal: "center", width: "100%" }}
            onClose={() => setSnackOpen(false)}
          >
            {snackText}
          </Alert>
        </Snackbar>
      </SimplePageContent>
    </>
  );
}