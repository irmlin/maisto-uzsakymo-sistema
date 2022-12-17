import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getCouriers, deleteCouriers } from "../Services/AdminService";

export default function Couriers() {
    
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [changed, setChanged] = useState(false);

    const [courierData, setCourierData] = useState([]);

    const fetchCourierData = async () => {
      const response = await getCouriers();

      
      
      if (response) {
        if (response.data.success) {
          setCourierData(response.data.couriers);
        }
      }
      console.log(courierData);
    };
  
    useEffect(() => {
      fetchCourierData();
    }, [changed]);

    const handleDelete = async (id) => {
      await deleteCouriers(id);
      setChanged(!changed);
    }

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
                                courierData.map(courier => (
                                  <TableRow key={courier.id}>
                                    <TableCell>
                                      {courier.firstname}
                                    </TableCell>
                                    <TableCell>
                                      {courier.lastname}
                                    </TableCell>
                                    <TableCell>
                                        {courier.birth_date.split("T")[0]}
                                    </TableCell>
                                    <TableCell>
                                        {courier.employed_from.split("T")[0]}
                                    </TableCell>
                                    <TableCell>
                                        {courier.phone_number}
                                    </TableCell>
                                    <TableCell>
                                        {courier.email}
                                    </TableCell>
                                    <TableCell>
                                        {courier.transport}
                                    </TableCell>
                                    <TableCell>
                                        {courier.status}
                                    </TableCell>
                                    <TableCell>
                                        {courier.tariff_size}
                                    </TableCell>
                                    <TableCell>
                                        <button  onClick={() => handleDelete(courier.id)}>Pašalinti</button>
                                        <button onClick={() => navigate(`/EditCourier/${courier.id}`)}>Redaguoti</button>
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
