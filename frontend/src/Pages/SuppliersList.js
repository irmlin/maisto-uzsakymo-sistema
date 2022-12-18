import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SupplierData from "../TempData/SupplierData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant, getRestaurants } from "../Services/AdminService";

export default function Suppliers() {
    
    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();
    const [changed, setChanged] = useState(false);

    const [supplierData, setSupplierData] = useState([]);

    const fetchRestaurantData = async () => {
      const response = await getRestaurants();
      
      if (response) {
        if (response.data.success) {
          setSupplierData(response.data.restaurants);
          console.log(supplierData);
        }
      }
    };

    useEffect(() => {
      fetchRestaurantData();
    }, [changed]);

    const handleDelete = async (id) => {
      await deleteRestaurant(id);
      setChanged(!changed);
    }

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Tiekėjai
              </motion.h2>
                {
                    userData.role === ROLES.ADMINISTRATOR && supplierData && (
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
                                        {supplier.tax_size}
                                    </TableCell>
                                    <TableCell>
                                        <button  onClick={() => handleDelete(supplier.id)}>Pašalinti</button>
                                        <button onClick={() => navigate(`/EditSupplier/${supplier.id}`)}>Redaguoti</button>
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