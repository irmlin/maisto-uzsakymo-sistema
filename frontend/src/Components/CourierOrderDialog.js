import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { ORDER_STATES_FOR_COURIER } from "../Enums/Enums";
import OrderData from "../TempData/OrderData";

export default function CourierOrderDialog({open, setOpen}) {

  const [orderState, setOrderState] = useState(ORDER_STATES_FOR_COURIER.IN_PROGRESS);

  const handleClose = (event, reason) => {
    setOpen(false);
  }

  const exampleOrder = OrderData[0];

  return (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Jūsų vykdomas užsakymas</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <b>Klientas: </b>{exampleOrder.recipientName} {exampleOrder.recipientLastName}
      </DialogContentText>
      <DialogContentText>
        <b>Pristatymo adresas: </b>{exampleOrder.recipientAddress}
      </DialogContentText>
      <DialogContentText>
        <b>Kliento komentaras: </b>{exampleOrder.recipientComments}
      </DialogContentText>
      <DialogContentText>
        <b>Restoranas: </b>{exampleOrder.restaurantName}, <b>adresas: </b> {exampleOrder.restaurantAddress}
      </DialogContentText>
      <DialogContentText>
        <b>Užsakymo būsena: </b> 
        <Select
          size="small"
          id="order-status-select"
          value={orderState}
          onChange={event => setOrderState(event.target.value)}
        >
          {
              Object.values(ORDER_STATES_FOR_COURIER).map(item => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
              ))
          }
        </Select>
        <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ ml: 2}}
            >
            Išsaugoti
        </Button>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>UŽDARYTI</Button>
    </DialogActions>
  </Dialog>
  );
}