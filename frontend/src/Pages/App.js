import restaurantData from "../TempData/RestaurantData";
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import Restaurants from "../Components/Restaurants";
import { motion } from "framer-motion";

function App() {

  return (
    <div>
      <Navbar/>

      <GridPageContent>
        <motion.h2 className="header">
          Restoranų sąrašas
        </motion.h2>
        <Restaurants restaurantData={restaurantData}/>
      </GridPageContent>

    </div>
  );
}

export default App;