import { motion } from "framer-motion";
import imgBreakfastMenu from "../img/undraw_breakfast.svg";
import { useParams } from 'react-router';
import GridPageContent from "../Components/GridPageContent";
import restaurantData from "../TempData/RestaurantData";
import Navbar from "../Components/Navbar";

const Menu = () => {

  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const { restaurantId } = useParams();
  const selectedRestaurant = restaurantData.find(r => r.id === Number(restaurantId));

  return (
    <>
    <Navbar/>
      <GridPageContent>
        <motion.h2 className="menu-header">
          {selectedRestaurant.name}
        </motion.h2>
        <motion.div className="grid">
          {
            selectedRestaurant.meals
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
                    <motion.h5 className="item-title">{item.title}</motion.h5>
                    <motion.h5 className="item-price">${item.price}</motion.h5>
                  </motion.div>
                  <motion.p className="item-desc">{item.desc}</motion.p>
                  <motion.p className="item-desc">Vegetariškas: {item.vegetarian ? "Taip" : "Ne"}</motion.p>
                </motion.div>
              </motion.div>
            ))
          }
        </motion.div>
      </GridPageContent>
    </>
  );
};

export default Menu;
