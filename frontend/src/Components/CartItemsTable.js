import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function CartItemsTable({items}) {

  const tableHeaders = [
    "Restoranas",
    "Patiekalas",
    "Kiekis",
    "Vegetariškas",
    "Kaina"
  ];

  // items? console.log("jo"): console.log("ne")
  const totalPrice = items.reduce((sum, item) => sum + item.count * item.meal.price, 0.0);

  return (
    
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              tableHeaders.map(header => (
                <TableCell key={header}><b>{header}</b></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            items.map((item, i) => (
              <TableRow key={i}>
                {
                  i === 0 && (
                    <TableCell rowSpan={items.length}>{item.meal.restaurantName}</TableCell> 
                  )
                }
                <TableCell>{item.meal.name}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.meal.vegetarian}</TableCell>
                <TableCell>{item.meal.price}</TableCell>
              </TableRow>
            ))
          }
          <TableRow>
            <TableCell colSpan={tableHeaders.length - 1} sx={{textAlign: "right"}}><b>Viso</b></TableCell>
            <TableCell>{totalPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}