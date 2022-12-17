import { Badge, Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ROLES } from "../Enums/Enums";
import CourierOrderDialog from "./CourierOrderDialog";
import OrderOfferDialog from "./OrderOfferDialog";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCartContext } from "../Contexts/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { CourierContext } from "../Contexts/CourierContext";


export default function MainPageContainer({children}) {

  const { userData } = useContext(UserContext);
  const { isDelivering } = useContext(CourierContext);
  const [orderOpen, setOrderOpen] = useState(false);
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <div>
      {children}
      {
        userData.role === ROLES.CLIENT &&
        <div style={{position: "fixed", top: 0, right: 0, margin: "10px 10px"}}>
          <IconButton onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartItems ? cartItems.length : 0} color="secondary">
            <ShoppingCartIcon fontSize="large" style={{color: 'black'}}/>
          </Badge>
          </IconButton>
        </div>
      }
      {
        userData.role === ROLES.COURIER && isDelivering && (
          <>
          <div style={{position: "fixed", bottom: 0, right: 0}}>
            <Button
              size="small"
              variant="contained"
              onClick={() => setOrderOpen(true)}
            >
              MANO PRISTATYMAS
            </Button>
          </div>
            <CourierOrderDialog
              open={orderOpen}
              setOpen={setOrderOpen} 
            >
            </CourierOrderDialog>
          </>
        )
      }
    </div>
  )
}