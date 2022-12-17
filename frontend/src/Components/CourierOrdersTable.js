import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { CourierContext } from "../Contexts/CourierContext";

export default function CourierOrdersTable({orders, handleSelectOrder}) {

  const tableHeaders = [
    "Klientas", "Pristatymo adresas", "Restoranas", "Restorano adresas", "Užsakymo statusas"
  ];

  const { isDelivering } = useContext(CourierContext);

  const genericOrderData = orders.reduce((result, element) => {
    if (!result.length) {
      result.push(element);
      return result;
    }
    if (element.orderId !== result[result.length - 1].orderId) {
      result.push(element);
    }
    return result;
  }, [])

  function extractOrderFeaturesForTableRow(order) {

    return [
      order.firstname + " " + order.lastname, 
      order.delivery_address,
      order.restaurantName,
      order.restaurantAddress,
      order.orderStatus
    ]
  }

  function getSelectedOrderInfoForCourier(index) {
    const orderId = genericOrderData[index].orderId;
    return orders.filter(o => o.orderId === orderId);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              tableHeaders.map((header, i) => (
                <TableCell key={i}><b>{header}</b></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            genericOrderData.map((order, i) => (
              <TableRow key={i}>
                {
                  extractOrderFeaturesForTableRow(order).map((feature, j) => (
                    <TableCell key={j}>
                      {feature}
                    </TableCell>
                  ))
                }
                <TableCell>
                  <Button
                    onClick={(e) => handleSelectOrder(e, getSelectedOrderInfoForCourier(i))} 
                    variant={"contained"} 
                    size={"small"}
                    disabled={isDelivering}  
                  >
                    ATLIKTI UŽSAKYMĄ
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}