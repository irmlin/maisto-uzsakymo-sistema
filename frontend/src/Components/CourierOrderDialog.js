import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { COURIER_STATES, ORDER_STATES, ORDER_STATES_FOR_COURIER } from "../Enums/Enums";
import { cancelDelivery, updateOrderPrice, updateOrderStatus } from "../Services/OrderService";
import { CourierContext } from "../Contexts/CourierContext";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getOrderById } from "../Services/OrderService";
import { UserContext } from "../Contexts/UserContext";
import { updateCourierStatus } from "../Services/UserService";

export default function CourierOrderDialog({open, setOpen}) {

  const { setIsDelivering, orderInfo, setOrderInfo, toggleOrders, setToggleOrders } = useContext(CourierContext);
  const { userData, setUserData } = useContext(UserContext);
  const emptyOrder = Object.keys(orderInfo).length === 0; 
  const [foodTaken, setFoodTaken] = useState(
    emptyOrder ? false : orderInfo.basicInfo.orderStatus === ORDER_STATES_FOR_COURIER.FOOD_TAKEN
  );

  const [foodTakenDisabled, setFoodTakenDisabled] = useState(
    emptyOrder ? true : orderInfo.basicInfo.orderStatus === ORDER_STATES.FOOD_TAKEN || orderInfo.basicInfo.orderStatus === ORDER_STATES.COMPLETED
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

    setFoodTakenDisabled(response.data.order[0].status === ORDER_STATES.FOOD_TAKEN || response.data.order[0].status === ORDER_STATES.COMPLETED);
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
    "Bendra kaina u?? maist??: ",
    "Dabartin?? u??sakymo b??sena: "
  ];

  const basicInfo = Object.keys(orderInfo).length === 0 ? [] : [
    orderInfo.basicInfo.firstname + " " + orderInfo.basicInfo.lastname,
    orderInfo.basicInfo.delivery_address,
    orderInfo.basicInfo.client_comments,
    orderInfo.basicInfo.restaurantName,
    orderInfo.basicInfo.restaurantAddress,
    orderInfo.mealInfo.reduce((text, meal) => {return text + `${meal.mealName} (x${meal.amount}), `}, ""),
    orderInfo.basicInfo.totalCartPrice + "???",
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

    const courierResponse = await updateCourierStatus(userData.id, COURIER_STATES.WAITING_FOR_ORDER);
    const updatedProfileData = {...userData};
    updatedProfileData.status = COURIER_STATES.WAITING_FOR_ORDER;
    setUserData(updatedProfileData);
    localStorage.setItem('userData', JSON.stringify(updatedProfileData));
    
    const orderPriceResponse = await updateOrderPrice(orderInfo.basicInfo.orderId, orderInfo.basicInfo.totalCartPrice, userData.id);

    const updatedOrderInfo = {...orderInfo};
    updatedOrderInfo.basicInfo.orderStatus = ORDER_STATES_FOR_COURIER.COMPLETED;

    setFoodDelivered(true);
    setFoodDeliveredDisabled(true);

    setToggleOrders(!toggleOrders);
    showSuccess("U??sakymas baigiamas...");

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

  const handleCancelDelivery = async (e) => {
    e.preventDefault();
    const response = await cancelDelivery(orderInfo.basicInfo.orderId, userData.id);
    if (!response || !response.data.success) {
      showError(response ? response.data.message : "Serverio klaida");
      return;
    }

    const updatedProfileData = {...userData};
    updatedProfileData.status = COURIER_STATES.WAITING_FOR_ORDER;
    setUserData(updatedProfileData);
    localStorage.setItem('userData', JSON.stringify(updatedProfileData));

    setToggleOrders(!toggleOrders);
    showSuccess("U??sakymas at??aukiamas...");

    setTimeout(() => {
      handleClose();
      resetState();
    }, 4000);
  }

  return (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>J??s?? vykdomas u??sakymas</DialogTitle>
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
        label="Pa??miau u??sakym?? i?? restorano"
      />
      <FormControlLabel 
        control={<Checkbox checked={foodDelivered} onChange={onFoodDeliveredChange} disabled={foodDeliveredDisabled}/>} 
        label="Prista??iau u??sakym?? klientui" 
      />
      <IconButton onClick={() => setToggleOrders(!toggleOrders)}>
        <RefreshIcon fontSize="large" style={{color: 'black'}}/>
      </IconButton>
    </DialogActions>
    <DialogActions>
      <Button color={"error"} onClick={handleCancelDelivery}>NEBENORIU ATLIKTI PRISTATYMO</Button>
      <Button onClick={handleClose}>U??DARYTI</Button>
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