import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { ROLES } from "../Enums/Enums";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {getunaprovedCouriers} from "../Services/AdminService"

export default function NewCouriers() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const [courierData, setCourierData] = useState([]);

  const fetchCourierData = async () => {
    const response = await getunaprovedCouriers();
    
    if (response) {
      if (response.data.success) {
        setCourierData(response.data.couriers);
      }
    }
  };

  useEffect(() => {
    fetchCourierData();
  }, []);

  return (
    <div>
      <Navbar />
      <SimplePageContent>
        <motion.h2 className="header">Nauji kurjeriai</motion.h2>
        {userData.role === ROLES.ADMINISTRATOR && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vardas</TableCell>
                  <TableCell>Pavardė</TableCell>
                  <TableCell>Gimimo data</TableCell>
                  <TableCell>Telefonas</TableCell>
                  <TableCell>E. paštas</TableCell>
                  <TableCell>Transportas</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courierData.map((courier) => (
                  <TableRow key={courier.id}>
                    <TableCell>{courier.firstname}</TableCell>
                    <TableCell>{courier.lastname}</TableCell>
                    <TableCell>
                      {courier.birth_date.split("T")[0]}
                    </TableCell>
                    <TableCell>{courier.phone_number}</TableCell>
                    <TableCell>{courier.email}</TableCell>
                    <TableCell>{courier.transport}</TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          navigate(`/ApproveCourier/${courier.id}`)
                        }
                      >
                        Patvirtinti
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </SimplePageContent>
    </div>
  );
}
