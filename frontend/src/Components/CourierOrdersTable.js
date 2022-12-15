import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CourierOrdersTable({orders}) {

  const tableHeaders = [
    "Klientas", "Pristatymo adresas", "Restoranas", "Restorano adresas", "Užsakymo statusas"
  ];

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
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}