import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ConfirmRestartCartDialog({open, handleClose, handleConfirm, oldRestaurantName}) {

  return (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Pradėti naują užsakymą</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Šis veiksmas panaikins jūsų užsakymą iš "{oldRestaurantName}"
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>ATŠAUKTI</Button>
      <Button onClick={handleConfirm}>PATVIRTINTI</Button>
    </DialogActions>
  </Dialog>
  );
}