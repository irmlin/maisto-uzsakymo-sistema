import Restaurants from "../Components/Restaurants";
import { motion } from "framer-motion";
import { ROLES } from "../Enums/Enums";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import SimplePageContent from "../Components/SimplePageContent";
import Navbar from "../Components/Navbar";
import { ShoppingCartContext } from "../Contexts/ShoppingCartContext";
import CartItemsTable from "../Components/CartItemsTable";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { makeOrder } from "../Services/OrderService";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { userData } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  function showError(msg) {
    setSnackOpen(true);
    setSnackColor("error")
    setSnackText(msg);
  }

  const completeOrder = async(e) => {
    e.preventDefault();

    if (!deliveryAddress.length) {
      showError("Įveskite pristatymo adresą!");
      return;
    }

    const response = await makeOrder({meals: cartItems, userId: userData.id, address: deliveryAddress, comment: comment});

    if (response && response.data.success) {
      
      localStorage.setItem('cartItems', JSON.stringify([]));
      setCartItems([]);

      setSnackOpen(true);
      setSnackColor("success")
      setSnackText("Užsakymas sukurtas!");
      setTimeout(() => {
        navigate("/order_history");
      }, 3000)
      return;
    }
    setSnackOpen(true);
    setSnackColor("error")
    setSnackText("Įvyko klaida");
  }

  return (
    userData.role === ROLES.CLIENT &&
    <>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Jūsų krepšelis</motion.h2>
        <CartItemsTable
          items={cartItems}
        />
        {
          cartItems.length !== 0 && (
            <>
              <br/>
              <motion.h2 className="header">Atlikite užsakymą</motion.h2>
              <div>
                <TextField
                  margin="normal"
                  required
                  id="address"
                  label="Pristatymo adresas"
                  autoComplete="off"
                  autoFocus
                  onChange={event => setDeliveryAddress(event.target.value)}
                  value={deliveryAddress}
                />
              </div>
              <div>
                <TextField
                  margin="normal"
                  required
                  id="comment"
                  label="Jūsų komentaras"
                  autoComplete="off"
                  autoFocus
                  onChange={event => setComment(event.target.value)}
                  value={comment}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{ ml: 5, mt: 3 }}
                  onClick={completeOrder}
                >
                  UŽSAKYTI
                </Button>
              </div>     
            </>       
          )
        }
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

export default Cart;