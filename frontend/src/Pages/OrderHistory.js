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
import { getCourierCompletedOrders } from "../Services/OrderService";

export default function OrderHistory() {
  const { userData } = useContext(UserContext);
  const [orderData, setorderData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchOrders = async () => {
    let response;
    if (userData.role === ROLES.COURIER) {
      response = await getCourierCompletedOrders(userData.id);
    } else if (userData.role === ROLES.CLIENT) {
      return;
    } else if (userData.role === ROLES.RESTAURANT) {
      return;
    }

    if (!response || !response.data.success) {
      showError(!response ? "Serverio klaida" : response.data.message);
      return;
    }

    setorderData(response.data.orders);
  };

  useEffect(() => {
    fetchOrders();
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
            <div>
              <h3>Filtruoti pagal datą</h3>
              <div>
                <b>Nuo:</b>
                <input type="date" />
              </div>
              <div>
                <b>Iki:</b>
                <input type="date" />
              </div>
              <div>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Teikti
                </Button>
              </div>
            </div>

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
                {orderData.map((order) => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderState}</TableCell>
                    <TableCell>{order.orderDate.toLocaleString()}</TableCell>
                    <TableCell>{order.orderPrice}</TableCell>
                    <TableCell>
                      {order.recipientName} {order.recipientLastName}
                    </TableCell>
                    <TableCell>{order.recipientAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <h3>Suma:</h3>
            </div>
          </>
        )}
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
