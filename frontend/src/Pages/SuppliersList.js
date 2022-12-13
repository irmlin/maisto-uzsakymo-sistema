import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SupplierData from "../TempData/SupplierData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
    
    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Tiekėjai
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
                                  Mokestis
                                </TableCell>
                                <TableCell>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                SupplierData.map(supplier => (
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
                                        {supplier.supplierFee}
                                    </TableCell>
                                    <TableCell>
                                        <button>Pašalinti</button>
                                        <button onClick={() => navigate(`/EditSupplier/${supplier.supplierNumber}`)}>Redaguoti</button>
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