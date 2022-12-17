import { useState, useContext, useEffect } from "react";
import SimplePageContent from "../Components/SimplePageContent";
import { TextField } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import { ROLES } from "../Enums/Enums";
import { useParams } from 'react-router';
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../Services/UserService";
import { approveRestaurant } from "../Services/AdminService";

export default function ApproveSupplier() {

  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [ fee, setFee] = useState("");
  const { supplierId } = useParams();
  const [ supplierData, setSupplierData ] = useState();

  const fetchRestaurantData = async () => {
    const response = await getUserData(ROLES.RESTAURANT, supplierId);
    if (response) {
      if (response.data.success) {
        setSupplierData(response.data.profileData);
      }
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const handleApprove = async (event) => {
    const response = await approveRestaurant(
      supplierId,
      fee,
      userData.id
    );
    navigate(`/newSuppliers`);
  };


  return (
    <>
    <Navbar/>
    <GridPageContent>
        <motion.h2 className="header">
          Patvirtinti tiekėją
        </motion.h2>
      
    <SimplePageContent>
                {
                    userData.role === ROLES.ADMINISTRATOR && supplierData && (
                         <>
                            <div style={{padding: '10px'}}>
                                <b>Tiekėjo pavadinimas: </b>{supplierData.name}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Atsidarymo laikas: </b>{supplierData.opening_time}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Užsidarymo laikas: </b>{supplierData.closing_time}
                            </div>
                            <div style={{padding: '10px'}}>
                                <b>Tiekėjo e. paštas: </b>{supplierData.email}
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
                              onClick={() => {
                                handleApprove();
                                
                            }}
                            >
                                Išsaugoti
                            </StyledButton>
                            
                            <StyledButton style={{flex: 1}}
                              onClick={() => navigate(`/newSuppliers`)}
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