import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Alert, Snackbar } from "@mui/material";
import { getAvailableOrders } from "../Services/OrderService";
import CourierOrdersTable from "../Components/CourierOrdersTable";


export default function CourierOrders() {

  const { userData } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    const response = await getAvailableOrders(userData.cityId);
    console.log(response)
    if (!response || !response.data.success) {
      showError("Serverio klaida");
      return;
    }
    if (!response.data.orders.length) {
      showError("Sistemoje šiuo metu nėra užsakymų!")
    }
    setOrders(response.data.orders);
  }

  function showError(errorMsg) {
    setSnackOpen(true);
    setSnackColor("error");
    setSnackText(errorMsg);
  }

  return (
    <>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Užsakymų sąrašas</motion.h2>
        <CourierOrdersTable
          orders={orders}
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