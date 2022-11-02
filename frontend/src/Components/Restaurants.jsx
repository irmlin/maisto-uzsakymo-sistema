import { motion } from "framer-motion";
import imgAllMenu from "../img/undraw_breakfast.svg";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";

const MenuAll = (props) => {

  const { restaurantData } = props;
  const navigate = useNavigate();
  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div className="grid">
    {
        restaurantData.map((item, i) => (
          <motion.div
            className="menu-items"
            key={item.id}
            variants={itemContainer}
            transition={{ delay: i * 0.2 }}
          >
            <img src={imgAllMenu} alt="food burger" />
            <motion.div className="item-content">
              <motion.div className="item-title-box">
                <motion.h5 className="item-title">{item.name}</motion.h5>
                <motion.h5 className="item-price">{item.openingTime}-{item.closingTime}</motion.h5>
              </motion.div>
              <motion.p className="item-desc">{item.address}</motion.p>
            </motion.div>
            <StyledButton
              onClick={() => navigate(`/menu/${item.id}`)}
            >
              Meniu
            </StyledButton>
          </motion.div>
        ))
      }
    </motion.div>
  );
};

export default MenuAll;
