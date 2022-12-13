import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ROLES } from "../Enums/Enums";
import CourierOrderDialog from "./CourierOrderDialog";
import OrderOfferDialog from "./OrderOfferDialog";


export default function MainPageContainer({children}) {

  const { userData } = useContext(UserContext);
  const [offerOpen, setOfferOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div>
      {children}
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