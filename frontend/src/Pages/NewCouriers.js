import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import NewCourierData from "../TempData/NewCourierData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NewCouriers() {
    
    const navigate = useNavigate();
    const { userRole } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Nauji kurjeriai
              </motion.h2>
                {
                    userRole === ROLES.ADMINISTRATOR && (
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
                                  Telefonas
                                </TableCell>
                                <TableCell>
                                  E. paštas
                                </TableCell>
                                <TableCell>
                                  Transportas
                                </TableCell>
                                <TableCell>
                                  
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                NewCourierData.map(courier => (
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
                                        {courier.courierPhone}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierEmail}
                                    </TableCell>
                                    <TableCell>
                                        {courier.courierTransport}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => navigate(`/ApproveCourier/${courier.courierNumber}`)}>Patvirtinti</button>
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
