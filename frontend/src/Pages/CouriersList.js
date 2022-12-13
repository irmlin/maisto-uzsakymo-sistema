import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CourierData from "../TempData/CourierData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NewCouriers() {
    
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Kurjeriai
              </motion.h2>
                {
                    userData.role === ROLES.ADMINISTRATOR && (
                        <>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Vardas
                                </TableCell>
                                <TableCell>
                                  Pavardė
                                </TableCell>
                                <TableCell>
                                  Gimimo data
                                </TableCell>
                                <TableCell>
                                  Įdarbinimo data
                                </TableCell>
                                <TableCell>
                                  Telefonas
                                </TableCell>
                                <TableCell>
                                  E. paštas
                                </TableCell>
                                <TableCell>
                                  Transportas
                                </TableCell>
                                <TableCell>
                                  Būsena
                                </TableCell>
                                <TableCell>
                                  Tarifas
                                </TableCell>
                                <TableCell>
                                  
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                CourierData.map(courier => (
                                  <TableRow key={courier.courierNumber}>
                                    <TableCell>
                                      {courier.courierName}
                                    </TableCell>
                                    <TableCell>
                                      {courier.courierSurname}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierBirthDate.toLocaleString(navigator.language, {year: 'numeric', month:'numeric', day: 'numeric'})}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierWorkStart.toLocaleString(navigator.language, {year: 'numeric', month:'numeric', day: 'numeric'})}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierPhone}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierEmail}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierTransport}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierStatus}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierRate}
                                    </TableCell>
                                    <TableCell>
                                        <button>Pašalinti</button>
                                        <button onClick={() => navigate(`/EditCourier/${courier.courierNumber}`)}>Redaguoti</button>
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
