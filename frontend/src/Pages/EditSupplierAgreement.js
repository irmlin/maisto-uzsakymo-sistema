import { useState } from "react";
import SimplePageContent from "../Components/SimplePageContent";
import { TextField } from "@mui/material";
import NewSupplierData from "../TempData/NewSupplierData";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { useParams } from 'react-router';
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";

export default function ApproveSupplier() {

  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [ fee, setFee] = useState("");
  const { supplierId } = useParams();
  const supplier = NewSupplierData.find(r => r.supplierNumber === Number(supplierId));

  return (
    <>
    <Navbar/>
    <GridPageContent>
        <motion.h2 className="header">
          Patvirtinti tiekėją
        </motion.h2>
      
    <SimplePageContent>
                {
                    userData.role === ROLES.ADMINISTRATOR && (
                        <>
                            <div style={{padding: '10px'}}>
                                <b>Tiekėjo pavadinimas: </b>{supplier.supplierName}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Atsidarymo laikas: </b>{supplier.supplierOpen.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Užsidarymo laikas: </b>{supplier.supplierClose.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Tiekėjo e. paštas: </b>{supplier.supplierEmail}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Tiekėjo mokestis: </b>
                                
                                <TextField style={{height: '1px'}}
                                  type="number"
                                  size="small"
                                  required
                                  name="fee"
                                  id="fee"
                                  onChange={event => setFee(event.target.value)}
                                  value={fee}                                  
                                  />
                                  
                            </div>
                            <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap', padding: '15px',}}>
                            
                            <StyledButton style={{flex: 1}}
                              onClick={() => navigate(`/SuppliersList`)}
                            >
                                Išsaugoti
                            </StyledButton>
                            
                            <StyledButton style={{flex: 1}}
                              onClick={() => navigate(`/SuppliersList`)}
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