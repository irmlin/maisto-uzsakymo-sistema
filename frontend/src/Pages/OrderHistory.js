import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import OrderData from "../TempData/OrderData";
import { motion } from "framer-motion";

export default function OrderHistory () {
    
    const { userRole } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Užsakymų istorija
              </motion.h2>
                {
                    userRole === ROLES.COURIER && (
                        <>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Numeris
                                </TableCell>
                                <TableCell>
                                  Būsena
                                </TableCell>
                                <TableCell>
                                  Data
                                </TableCell>
                                <TableCell>
                                  Kaina
                                </TableCell>
                                <TableCell>
                                  Restoranas
                                </TableCell>
                                <TableCell>
                                  Restorano adresas
                                </TableCell>
                                <TableCell>
                                  Gavėjo vardas ir pavardė
                                </TableCell>
                                <TableCell>
                                  Pristatymo adresas
                                </TableCell>
                                <TableCell>
                                  Gavėjo komentarai
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                OrderData.map(order => (
                                  <TableRow key={order.orderNumber}>
                                    <TableCell>
                                      {order.orderNumber}
                                    </TableCell>
                                    <TableCell>
                                      {order.orderState}
                                    </TableCell>
                                    <TableCell>
                                    {order.orderDate.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                    {order.orderPrice}
                                    </TableCell>
                                    <TableCell>
                                    {order.restaurantName}
                                    </TableCell>
                                    <TableCell>
                                    {order.restaurantAddress}
                                    </TableCell>
                                    <TableCell>
                                    {order.recipientName} {order.recipientLastName}
                                    </TableCell>
                                    <TableCell>
                                    {order.recipientAddress}
                                    </TableCell>
                                    <TableCell>
                                    {order.recipientComments}
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </>
                    )
                }
                {
                    userRole === ROLES.CLIENT && (
                        <>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Numeris
                                </TableCell>
                                <TableCell>
                                  Būsena
                                </TableCell>
                                <TableCell>
                                  Data
                                </TableCell>
                                <TableCell>
                                  Kaina
                                </TableCell>
                                <TableCell>
                                  Restoranas
                                </TableCell>
                                <TableCell>
                                  Restorano adresas
                                </TableCell>
                                <TableCell>
                                  Pristatymo adresas
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                OrderData.map(order => (
                                  <TableRow key={order.orderNumber}>
                                    <TableCell>
                                      {order.orderNumber}
                                    </TableCell>
                                    <TableCell>
                                      {order.orderState}
                                    </TableCell>
                                    <TableCell>
                                    {order.orderDate.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                    {order.orderPrice}
                                    </TableCell>
                                    <TableCell>
                                    {order.restaurantName}
                                    </TableCell>
                                    <TableCell>
                                    {order.restaurantAddress}
                                    </TableCell>
                                    <TableCell>
                                    {order.recipientAddress}
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </>
                    )
                }
            </SimplePageContent>
        </div>
    );
};