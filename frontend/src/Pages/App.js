import Restaurants from "../Components/Restaurants";
import { motion } from "framer-motion";
import { ROLES } from "../Enums/Enums";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import SimplePageContent from "../Components/SimplePageContent";
import Navbar from "../Components/Navbar";

function App() {

  const { userData } = useContext(UserContext);

  return (
    userData.role === ROLES.CLIENT ? 
    <Restaurants/> :
    <>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Pradinis puslapis. Pasirinkite veiksmą meniu!</motion.h2>
      </SimplePageContent>
    </>
  );
}

export default App;