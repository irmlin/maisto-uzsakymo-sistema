import { Badge, Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ROLES } from "../Enums/Enums";
import CourierOrderDialog from "./CourierOrderDialog";
import OrderOfferDialog from "./OrderOfferDialog";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCartContext } from "../Contexts/ShoppingCartContext";
import { useNavigate } from "react-router-dom";


export default function MainPageContainer({children}) {

  const { userData } = useContext(UserContext);
  const [offerOpen, setOfferOpen] = useState(false);
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
        userData.role === ROLES.COURIER && (
          <>
          <div style={{position: "fixed", bottom: 0, right: 0}}>
            <Button
              size="small"
              variant="contained"
              onClick={() => setOfferOpen(true)}
            >
              Užsakymo pasiūlymo pavyzdys
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => setOrderOpen(true)}
            >
              Užsakymo pavyzdys
            </Button>
          </div>
            <OrderOfferDialog
              open={offerOpen}
              setOpen={setOfferOpen}  
            >
            </OrderOfferDialog>
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