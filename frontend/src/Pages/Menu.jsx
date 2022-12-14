import { motion } from "framer-motion";
import imgBreakfastMenu from "../img/undraw_breakfast.svg";
import { useParams } from 'react-router';
import GridPageContent from "../Components/GridPageContent";
import Navbar from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { getRestaurantMeals } from "../Services/RestaurantService";
import StyledButton from "../Components/StyledButton";
import { ShoppingCartContext } from "../Contexts/ShoppingCartContext";
import ConfirmRestartCartDialog from "../Components/ConfirmRestartCartDialog";

export default function Menu() {

  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const buttonStyle = { backgroundColor: "#24242a", padding:0, minWidth: 0, width: "20%"};

  const { restaurantId } = useParams();
  const [meals, setMeals] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("error");
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({});
  const [addedAmounts, setAddedAmounts] = useState([]);
  const {cartItems, setCartItems} = useContext(ShoppingCartContext);

  const fetchMeals = async () => {
    const response = await getRestaurantMeals(restaurantId);
    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }
    setMeals(response.data.meals);
    setRestaurantName(response.data.meals[0].restaurantName);
    setAddedAmounts(new Array(response.data.meals.length).fill(1));
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

  function mealFromSameRestaurant(newMeal) {
    if (!cartItems.length) {
      return true;
    }
    return cartItems[0].meal.restaurantId === newMeal.restaurantId;
  }

  function addMeal(meal, count) {
    let updatedCart;
    let mealAlreadyAdded = cartItems.length && cartItems.some(item => item.meal.id === meal.id);
    
    if (!mealAlreadyAdded) {
      const newMealObject = {
        meal: meal,
        count: count
      };
      updatedCart = [...cartItems, newMealObject];
    } else {
        updatedCart = [...cartItems];
        const index = cartItems.findIndex(item => item.meal.id === meal.id);
        updatedCart[index].count += count;
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }

  const addMealToShoppingCart = (event, meal, count) => {
    event.preventDefault();
    setSelectedMeal({meal: meal, count: count});
    if (!mealFromSameRestaurant(meal)) {
      handleRestartDialogOpen();
      return;
    }
    addMeal(meal, count);
    showSuccessfulAddedMeal();
  }

  function showSuccessfulAddedMeal() {
    setSnackColor("success");
    setSnackOpen(true);
    setSnackText("Pridėta į krepšelį!");
  }

  const handleRestartDialogOpen = () => {
    setRestartDialogOpen(true);
  }

  const handleRestartDialogClose = () => {
    setRestartDialogOpen(false);
  }

  const handleRestartDialogConfirm = () => {
    const newCart = [selectedMeal];
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    handleRestartDialogClose();
    showSuccessfulAddedMeal();
  }

  const increaseMealCount = (event, index) => {
    let amounts = [...addedAmounts];
    if (amounts[index] > 4) {
      return;
    }
    amounts[index] += 1;
    setAddedAmounts(amounts);
  }

  const decreaseMealCount = (event, index) => {
    let amounts = [...addedAmounts];
    if (amounts[index] < 2) {
      return;
    }
    amounts[index] -= 1;
    setAddedAmounts(amounts);
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
                <div>
                  <StyledButton onClick={(e) => addMealToShoppingCart(e, item, addedAmounts[i])}>
                    Į krepšelį
                  </StyledButton>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8}}>
                    <Button onClick={(e) => increaseMealCount(e, i)} sx={buttonStyle} variant={"contained"}>+</Button>
                    <div style={{padding: "0px 8px"}}>{addedAmounts[i]}</div>
                    <Button onClick={(e) => decreaseMealCount(e, i)} sx={buttonStyle} variant={"contained"}>-</Button>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </motion.div>
      </GridPageContent>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
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
      <ConfirmRestartCartDialog
        open={restartDialogOpen}
        handleClose={handleRestartDialogClose}
        handleConfirm={handleRestartDialogConfirm}
        oldRestaurantName={cartItems.length ? cartItems[0].meal.restaurantName : ""}
      />
    </>
  );
};
