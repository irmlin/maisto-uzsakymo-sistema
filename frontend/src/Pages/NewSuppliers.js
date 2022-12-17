import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getunaprovedRestaurants } from "../Services/AdminService";

export default function NewSuppliers() {
    
    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();
    const [supplierData, setSupplierData] = useState([]);

    const fetchRestaurantData = async () => {
      const response = await getunaprovedRestaurants();
      
      if (response) {
        if (response.data.success) {
          setSupplierData(response.data.restaurants);
          console.log(supplierData);
        }
      }
    };

    useEffect(() => {

      fetchRestaurantData();
    }, []);

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
                              {supplierData &&
                                supplierData.map(supplier => (
                                  <TableRow key={supplier.id}>
                                    <TableCell>
                                      {supplier.name}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.opening_time}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.closing_time}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.email}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => navigate(`/ApproveSupplier/${supplier.id}`)}>Patvirtinti</button>
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