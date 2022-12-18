import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { ROLES } from "../Enums/Enums";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { getCourierCompletedOrders, getRestaurantCompletedOrders } from "../Services/OrderService";

export default function OrderHistory() {
  const { userData } = useContext(UserContext);
  const [orderData, setorderData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fullsum, setFullsum] = useState(0);
  const [ listToShow, setShow ] = useState([]);

  const fetchOrders = async () => {
    let response;
    if (userData.role === ROLES.COURIER) {
      response = await getCourierCompletedOrders(userData.id);
    } else if (userData.role === ROLES.CLIENT) {
      return;
    } else if (userData.role === ROLES.RESTAURANT) {
      response = await getRestaurantCompletedOrders(userData.id);
    }

    if (!response || !response.data.success) {
      showError(!response ? "Serverio klaida" : response.data.message);
      return;
    }

    setorderData(response.data.orders);
    setShow(response.data.orders);
  };

  useEffect(() => {
    fetchOrders();
    setShow(orderData);
  }, [])

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

  const tableHeaders = [
    "Numeris",
    "Data",
    "Pristatymo adresas",
    "Restoranas",
    "Užsakymo kaina",
    "Pristatymo kaina",
  ];

  function transformDateString(date) {
    return date.substring(0, 10) + " " + date.substring(11, 19);
  }

  function filterOrderData() {
    if (!dateFrom && !dateTo) {
      return orderData;
    }
    if(dateFrom && !dateTo){
      return orderData.filter(order => order.date >= dateFrom);
    }
    if(!dateFrom && dateTo){
      return orderData.filter(order => order.date <= dateTo);
    }
    return orderData.filter(order => order.date >= dateFrom && order.date <= dateTo);
  }

  const filterByData = () => {
    let showList = orderData;
    if (!dateFrom && !dateTo) {
      setShow(showList);
    }
    if(dateFrom && !dateTo){
      setShow(showList.filter(order => order.date >= dateFrom));
    }
    if(!dateFrom && dateTo){
      setShow(showList.filter(order => order.date <= dateTo));
    }
    setShow(showList.filter(order => order.date >= dateFrom && order.date <= dateTo));
    setFullsum(0);
  }

  const addToSum = () =>{
    return setFullsum(listToShow.reduce((a, v) => a = a + v.orderPrice, 0))
  }

  const filteredOrderData = 
    !dateFrom && !dateTo ? orderData :
    dateFrom && !dateTo ? orderData.filter(order => order.date >= dateFrom) :
    !dateFrom && dateTo ? orderData.filter(order => order.date <= dateTo) :
    orderData.filter(order => order.date >= dateFrom && order.date <= dateTo);

  return (
    <div>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Užsakymų istorija</motion.h2>
        {userData.role === ROLES.COURIER && (
          <>
            <b>Nuo</b>
            <TextField
              type="date"
              size="small"
              name="dateFrom"
              id="dateFrom"
              sx={{mx: 2}}
              onChange={(event) => setDateFrom(event.target.value)}
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
            />
            <b>Iki</b>
            <TextField
              type="date"
              size="small"
              name="dateTo"
              id="dateTo"
              sx={{ml: 2}}
              onChange={(event) => setDateTo(event.target.value)}
              InputLabelProps={{ shrink: true }}
              value={dateTo}
            />
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, i) => (
                    <TableCell key={i}>
                      <b>{header}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filterOrderData().map((order, i) => (
                    <TableRow key={i}>
                      {
                        Object.entries(order).map((item, j) => (
                          <TableCell key={j}>
                            {
                              item[0] === "date" ? transformDateString(item[1]) :
                              item[0] === "earnings" || item[0] === "orderPrice" ? item[1] + "€" :
                              item[1]
                             }
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
                <TableRow>
                  <TableCell colSpan={5} sx={{textAlign: "right"}}>
                    <b>Uždarbis</b>
                  </TableCell>
                  <TableCell>
                    {filteredOrderData.reduce((sum, order) => sum + order.earnings, 0.0) + "€"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
        {userData.role === ROLES.CLIENT && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Numeris</TableCell>
                  <TableCell>Būsena</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Kaina</TableCell>
                  <TableCell>Restoranas</TableCell>
                  <TableCell>Restorano adresas</TableCell>
                  <TableCell>Pristatymo adresas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.map((order) => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderState}</TableCell>
                    <TableCell>{order.orderDate.toLocaleString()}</TableCell>
                    <TableCell>{order.orderPrice}</TableCell>
                    <TableCell>{order.restaurantName}</TableCell>
                    <TableCell>{order.restaurantAddress}</TableCell>
                    <TableCell>{order.recipientAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {userData.role === ROLES.RESTAURANT && (
          <>
            <b>Nuo</b>
            <TextField
              type="date"
              size="small"
              name="dateFrom"
              id="dateFrom"
              sx={{mx: 2}}
              onChange={(event) => setDateFrom(event.target.value)}
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
            />
            <b>Iki</b>
            <TextField
              type="date"
              size="small"
              name="dateTo"
              id="dateTo"
              sx={{ml: 2}}
              onChange={(event) => setDateTo(event.target.value)}
              InputLabelProps={{ shrink: true }}
              value={dateTo}
            />
            <Button
                  onClick={filterByData}
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ ml: 2}}                                                          
              >
              Filtruoti
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Numeris</TableCell>
                  <TableCell>Būsena</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Kaina</TableCell>
                  <TableCell>Gavėjo vardas ir pavardė</TableCell>
                  <TableCell>Pristatymo adresas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listToShow.map((order) => (
                  <TableRow key={order.number}>
                    <TableCell>{order.number}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.date.toLocaleString()}</TableCell>
                    <TableCell>{order.orderPrice}</TableCell>
                    <TableCell>
                      {order.firstname} {order.lastname}
                    </TableCell>
                    <TableCell>{order.delivery_address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <Button
                  onClick={addToSum}
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ ml: 2}}                                                          
              >
              Skaičiuoti sumą
              </Button>
              <h3>Suma: {fullsum} Eu.</h3>
        </div>
        </>)}
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
      </SimplePageContent>
    </div>
  );
}
