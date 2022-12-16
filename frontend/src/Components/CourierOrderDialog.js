import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ORDER_STATES, ORDER_STATES_FOR_COURIER } from "../Enums/Enums";
import { updateOrderStatus } from "../Services/OrderService";
import { CourierContext } from "../Contexts/CourierContext";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getOrderById } from "../Services/OrderService";

export default function CourierOrderDialog({open, setOpen}) {

  const { setIsDelivering, orderInfo, setOrderInfo, toggleOrders, setToggleOrders } = useContext(CourierContext);
  const emptyOrder = Object.keys(orderInfo).length === 0; 
  const [foodTaken, setFoodTaken] = useState(
    emptyOrder ? false : orderInfo.basicInfo.orderStatus === ORDER_STATES_FOR_COURIER.FOOD_TAKEN
  );

  const [foodTakenDisabled, setFoodTakenDisabled] = useState(
    emptyOrder ? true : orderInfo.basicInfo.orderStatus !== ORDER_STATES.DONE_COOKING
  );
  
  const [foodDelivered, setFoodDelivered] = useState(
    emptyOrder ? false : orderInfo.basicInfo.orderStatus === ORDER_STATES_FOR_COURIER.COMPLETED
  );

  const [foodDeliveredDisabled, setFoodDeliveredDisabled] = useState(
    emptyOrder ? true : orderInfo.basicInfo.orderStatus !== ORDER_STATES.FOOD_TAKEN
  );

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  const fetchCurrentOrder = async () => {
    if (emptyOrder) {
      return;
    }

    const response = await getOrderById(orderInfo.basicInfo.orderId);
    if (!response || !response.data.success) {
      return;
    }
    setOrderInfo({
      ...orderInfo,
      basicInfo: {
        ...orderInfo.basicInfo, orderStatus: response.data.order[0].status
      }
    })

    setFoodTakenDisabled(response.data.order[0].status !== ORDER_STATES.DONE_COOKING);
    setFoodDeliveredDisabled(response.data.order[0].status !== ORDER_STATES_FOR_COURIER.FOOD_TAKEN);
  }

  useEffect(() => {
    fetchCurrentOrder();
  }, [toggleOrders])


  const handleClose = (event, reason) => {
    setOpen(false);
  }

  const basicInfoHeaders = [
    "Klientas: ",
    "Pristatymo adresas: ",
    "Kliento komentaras: ",
    "Restoranas: ",
    "Restorano adresas: ",
    "Patiekalai: ",
    "Bendra kaina už maistą: ",
    "Pristatymo kaina: ",
    "Viso: ",
    "Dabartinė užsakymo būsena: "
  ];

  const basicInfo = Object.keys(orderInfo).length === 0 ? [] : [
    orderInfo.basicInfo.firstname + " " + orderInfo.basicInfo.lastname,
    orderInfo.basicInfo.delivery_address,
    orderInfo.basicInfo.client_comments,
    orderInfo.basicInfo.restaurantName,
    orderInfo.basicInfo.restaurantAddress,
    orderInfo.mealInfo.reduce((text, meal) => {return text + `${meal.mealName} (x${meal.amount}), `}, ""),
    orderInfo.basicInfo.totalCartPrice + "€",
    orderInfo.basicInfo.deliveryTax + "€",
    orderInfo.basicInfo.totalCartPrice + orderInfo.basicInfo.deliveryTax + "€",
    orderInfo.basicInfo.orderStatus
  ]

  const onFoodTakenChange = async (e) => {
    e.preventDefault();
    const response = await updateOrderStatus(orderInfo.basicInfo.orderId, ORDER_STATES_FOR_COURIER.FOOD_TAKEN);
    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }
    
    const updatedOrderInfo = {...orderInfo};
    updatedOrderInfo.basicInfo.orderStatus = ORDER_STATES_FOR_COURIER.FOOD_TAKEN;

    setOrderInfo(updatedOrderInfo);
    localStorage.setItem('orderInfo', JSON.stringify(updatedOrderInfo));
    showSuccess(response.data.message);
    setFoodTaken(true);
    setFoodTakenDisabled(true);

    setToggleOrders(!toggleOrders);
  }

  const onFoodDeliveredChange = async (e) => {
    e.preventDefault();
    const response = await updateOrderStatus(orderInfo.basicInfo.orderId, ORDER_STATES_FOR_COURIER.COMPLETED);
    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }
    
    const updatedOrderInfo = {...orderInfo};
    updatedOrderInfo.basicInfo.orderStatus = ORDER_STATES_FOR_COURIER.COMPLETED;

    // setOrderInfo(updatedOrderInfo);
    // localStorage.setItem('orderInfo', JSON.stringify(updatedOrderInfo));
    setFoodDelivered(true);
    setFoodDeliveredDisabled(true);

    setToggleOrders(!toggleOrders);
    showSuccess("Užsakymas baigiamas...");

    setTimeout(() => {
      handleClose();
      resetState();
    }, 4000);
  }

  function resetState() {
    setIsDelivering(false);
    setOrderInfo({});
    localStorage.setItem('isDelivering', false);
    localStorage.setItem('orderInfo', JSON.stringify({}));
  }

  function showError(message) {
    setSnackText(message);
    setSnackOpen(true);
    setSnackColor("error");
  }

  function showSuccess(message) {
    setSnackText(message);
    setSnackOpen(true);
    setSnackColor("success");
  }

  return (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Jūsų vykdomas užsakymas</DialogTitle>
    <DialogContent>
      {
        basicInfoHeaders.map((header, i) => (
          <DialogContentText key={i}>
            <b>{header}</b>{basicInfo[i]}
          </DialogContentText>
        ))
      }
    </DialogContent>
    <DialogActions>
      <FormControlLabel
        control={<Checkbox checked={foodTaken} onChange={onFoodTakenChange} disabled={foodTakenDisabled}/>}
        label="Paėmiau užsakymą iš restorano"
      />
      <FormControlLabel 
        control={<Checkbox checked={foodDelivered} onChange={onFoodDeliveredChange} disabled={foodDeliveredDisabled}/>} 
        label="Pristačiau užsakymą klientui" 
      />
      <IconButton onClick={() => setToggleOrders(!toggleOrders)}>
        <RefreshIcon fontSize="large" style={{color: 'black'}}/>
      </IconButton>
    </DialogActions>
    <DialogActions>
      <Button color={"error"} onClick={handleClose}>NEBENORIU ATLIKTI PRISTATYMO</Button>
      <Button onClick={handleClose}>UŽDARYTI</Button>
    </DialogActions>
    <Snackbar
      open={snackOpen}
      autoHideDuration={4000}
      onClose={() => setSnackOpen(false)}
    >
      <Alert
        severity={snackColor}
        sx={{ horizontal: "center", width: "100%" }}
        onClose={() => setSnackOpen(false)}
      >
        {snackText}
      </Alert>
    </Snackbar>
  </Dialog>
  );
}