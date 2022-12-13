import { motion } from "framer-motion";
import imgBreakfastMenu from "../img/undraw_breakfast.svg";
import { useParams } from 'react-router';
import GridPageContent from "../Components/GridPageContent";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { getRestaurantMeals } from "../Services/RestaurantService";

export default function Menu() {

  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const { restaurantId } = useParams();
  const [meals, setMeals] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("error");

  const fetchMeals = async () => {
    const response = await getRestaurantMeals(restaurantId);

    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }
    setMeals(response.data.meals);
    setRestaurantName(response.data.meals[0].restaurantName);
  }

  useEffect(() => {
    fetchMeals();
  }, [])
  
  function showError(message) {
    setSnackOpen(false);
    setSnackText(message);
    setSnackOpen(true);
  }

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  function atLeastOneMeal() {
    return meals[0] && meals[0].name;
  }

  return (
    <>
    <Navbar/>
      <GridPageContent>
        <motion.h2 className="header">
          {restaurantName}
        </motion.h2>
        <motion.div className="grid">
          {
            atLeastOneMeal() && meals
            .map((item, i) => (
              <motion.div
                className="menu-items"
                key={item.id}
                variants={itemContainer}
                transition={{ delay: i * 0.2 }}
              >
                <img src={imgBreakfastMenu} alt="food burger" />
                <motion.div className="item-content">
                  <motion.div className="item-title-box">
                    <motion.h5 className="item-title">{item.name}</motion.h5>
                    <motion.h5 className="item-price">${item.price}</motion.h5>
                  </motion.div>
                  <motion.p className="item-desc">{item.description}</motion.p>
                  <motion.p className="item-desc">Vegetariškas: {item.vegetarian ? "Taip" : "Ne"}</motion.p>
                </motion.div>
              </motion.div>
            ))
          }
        </motion.div>
      </GridPageContent>
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
    </>
  );
};
