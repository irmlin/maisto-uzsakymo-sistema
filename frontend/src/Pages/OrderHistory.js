import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import OrderData from "../TempData/OrderData";
import { motion } from "framer-motion";

export default function OrderHistory () {
    
    const { userData } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Užsakymų istorija
              </motion.h2>
                {
                    userData.role === ROLES.COURIER && (
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
                    userData.role === ROLES.CLIENT && (
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

                {
                    userData.role === ROLES.RESTAURANT && (
                        <>
                          <div>
                            <h3>Filtruoti pagal datą</h3>
                            <div>
                              <b>Nuo:</b>
                              <input type="date"/>
                            </div>
                            <div>
                              <b>Iki:</b>
                              <input type="date"/>
                            </div>
                            <div>
                              <Button
                              type="submit"
                              size="small"
                              variant="contained"
                              sx={{ ml: 2}}
                              >
                                Teikti
                              </Button>
                            </div>
                          </div>
                          
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
                                  Gavėjo vardas ir pavardė
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
                                    {order.recipientName} {order.recipientLastName}
                                    </TableCell>
                                    <TableCell>
                                    {order.recipientAddress}
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>

                          <div>
                            <h3>Suma:</h3>
                          </div>
                        </>
                    )
                }
            </SimplePageContent>
        </div>
    );
};