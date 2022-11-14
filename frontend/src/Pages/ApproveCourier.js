import { useState } from "react";
import SimplePageContent from "../Components/SimplePageContent";
import { TextField } from "@mui/material";
import NewCourierData from "../TempData/NewCourierData";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { useParams } from 'react-router';
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";

export default function ApproveCourier() {

  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);
  const [rate, setRate] = useState("");
  const { courierId } = useParams();
  const courier = NewCourierData.find(r => r.courierNumber === Number(courierId));

  return (
    <>
    <Navbar/>
    <GridPageContent>
        <motion.h2 className="header">
          Patvirtinti kurjerį
        </motion.h2>
      
    <SimplePageContent>
                {
                    userRole === ROLES.ADMINISTRATOR && (
                        <>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio vardas: </b>{courier.courierName}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio pavardė: </b>{courier.courierSurname}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio gimimo data: </b>{courier.courierBirthDate.toLocaleString(navigator.language, {year: 'numeric', month:'numeric', day: 'numeric'})}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio telefono nr.: </b>{courier.courierPhone}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio e. paštas: </b>{courier.courierEmail}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio transporto priemonė: </b>{courier.courierTransport}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Kurjerio tarifas: </b>
                                
                                <TextField style={{height: '1px'}}
                                  type="number"
                                  size="small"
                                  required
                                  name="rate"
                                  id="rate"
                                  onChange={event => setRate(event.target.value)}
                                  value={rate}                                  
                                  />
                                  
                            </div>
                            <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap', padding: '15px',}}>
                            
                            <StyledButton style={{flex: 1}}
                              onClick={() => navigate(`/newCouriers`)}
                            >
                                Išsaugoti
                            </StyledButton>
                            
                            <StyledButton style={{flex: 1}}
                              onClick={() => navigate(`/newCouriers`)}
                            >
                                Atšaukti
                            </StyledButton>
                            </div>
                            

                        </>
                    )
                }
            </SimplePageContent>
            </GridPageContent>
            </>

  );
}