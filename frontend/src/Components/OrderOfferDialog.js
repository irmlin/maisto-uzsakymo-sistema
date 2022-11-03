import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import OrderData from "../TempData/OrderData";

export default function OrderOfferDialog({open, setOpen}) {

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") 
      return;
    setOpen(false);
  }

  const exampleOrder = OrderData[0];

  return (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Užsakymo pasiūlymas</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Jums priskirtas užsakymas. Jei atsisakysite, užsakymas atiteks kitam kurjeriui. Užsakymo informacija:
      </DialogContentText>
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
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>PRIIMTI</Button>
      <Button onClick={handleClose}>ATMESTI</Button>
    </DialogActions>
  </Dialog>
  );
}