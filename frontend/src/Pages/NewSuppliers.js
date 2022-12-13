import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import NewSupplierData from "../TempData/NewSupplierData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NewSuppliers() {
    
    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Nauji tiekėjai
              </motion.h2>
                {
                    userData.role === ROLES.ADMINISTRATOR && (
                        <>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Pavadinimas
                                </TableCell>
                                <TableCell>
                                  Atsidarymo laikas
                                </TableCell>
                                <TableCell>
                                  Užsidarymo laikas
                                </TableCell>
                                <TableCell>
                                  E. paštas
                                </TableCell>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                NewSupplierData.map(supplier => (
                                  <TableRow key={supplier.supplierNumber}>
                                    <TableCell>
                                      {supplier.supplierName}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.supplierOpen.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.supplierClose.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.supplierEmail}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => navigate(`/ApproveSupplier/${supplier.supplierNumber}`)}>Patvirtinti</button>
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