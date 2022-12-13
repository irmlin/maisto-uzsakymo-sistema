import { motion } from "framer-motion";
import imgAllMenu from "../img/undraw_breakfast.svg";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";
import { useContext, useEffect, useState } from "react";
import { getRestaurants } from "../Services/RestaurantService";
import { Alert, Snackbar } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import Navbar from "./Navbar";
import GridPageContent from "./GridPageContent";

export default function MenuAll() {
  const { userData } = useContext(UserContext);
  const [restaurantData, setRestaurantData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("error");

  const fetchRestaurants = async () => {
    const response = await getRestaurants(userData.cityId);

    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }
    setRestaurantData(response.data.restaurants);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  function showError(message) {
    setSnackOpen(false);
    setSnackText(message);
    setSnackOpen(true);
  }

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const navigate = useNavigate();
  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Navbar />
      <GridPageContent>
        <motion.h2 className="header">Restoranų sąrašas</motion.h2>
        <motion.div className="grid">
          {restaurantData.map((item, i) => (
            <motion.div
              className="menu-items"
              key={item.id}
              variants={itemContainer}
              transition={{ delay: i * 0.2 }}
            >
              <img src={imgAllMenu} alt="food burger"/>
              <motion.div className="item-content">
                <motion.div className="item-title-box">
                  <motion.h5 className="item-title">{item.name}</motion.h5>
                  <motion.h5 className="item-price">
                    {item.opening_time.substring(0, 5)}-
                    {item.closing_time.substring(0, 5)}
                  </motion.h5>
                </motion.div>
                <motion.p className="item-desc">{item.address}</motion.p>
              </motion.div>
              <StyledButton onClick={() => navigate(`/menu/${item.id}`)}>
                Meniu
              </StyledButton>
            </motion.div>
          ))}
          <Snackbar
            open={snackOpen}
            autoHideDuration={4000}
            onClose={handleSnackClose}
          >
            <Alert
              severity={snackColor}
              sx={{ horizontal: "center", width: "100%" }}
              onClose={handleSnackClose}
            >
              {snackText}
            </Alert>
          </Snackbar>
        </motion.div>
      </GridPageContent>
    </>
  );
}
