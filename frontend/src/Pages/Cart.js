import Restaurants from "../Components/Restaurants";
import { motion } from "framer-motion";
import { ROLES } from "../Enums/Enums";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import SimplePageContent from "../Components/SimplePageContent";
import Navbar from "../Components/Navbar";
import { ShoppingCartContext } from "../Contexts/ShoppingCartContext";
import CartItemsTable from "../Components/CartItemsTable";

function Cart() {

  const { userData } = useContext(UserContext);
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    userData.role === ROLES.CLIENT &&
    <>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Jūsų krepšelis</motion.h2>
        <CartItemsTable
          items={cartItems}
        />
      </SimplePageContent>
    </>
  );
}

export default Cart;