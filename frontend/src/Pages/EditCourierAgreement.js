import { useState } from "react";
import SimplePageContent from "../Components/SimplePageContent";
import { TextField } from "@mui/material";
import CourierData from "../TempData/CourierData";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect } from "react";
import { ROLES } from "../Enums/Enums";
import { useParams } from "react-router";
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../Services/UserService";
import { editCourier } from "../Services/AdminService";


export default function EditCourierAgreement() {
  const { courierId } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);  
  const [ courierData, setCourierData ] = useState();
  const [rate, setRate] = useState();

  const fetchCourierData = async () => {
    const response = await getUserData(ROLES.COURIER, courierId);
    if (response) {
      if (response.data.success) {
        setCourierData(response.data.profileData);
      }
    }
    
  };

  useEffect(() => {
    fetchCourierData();
  }, []);

  const handleSubmit = async () => {
    const response = await editCourier(
      courierId,
      rate,

    );
    navigate(`/CouriersList`);
  };

  return (
    <>
      <Navbar />
      <GridPageContent>
        <motion.h2 className="header">Redaguoti kurjerio tarifą</motion.h2>

        <SimplePageContent>
          {userData.role === ROLES.ADMINISTRATOR && courierData && (
            <>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio vardas: </b>
                {courierData.firstname}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio pavardė: </b>
                {courierData.lastname}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio gimimo data: </b>
                {courierData.birth_date.split("T")[0]}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio įdarbinimo data: </b>
                {courierData.employed_from.split("T")[0]}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio telefono nr.: </b>
                {courierData.phone_number}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio e. paštas: </b>
                {courierData.email}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio transporto priemonė: </b>
                {courierData.transport}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio tarifas: </b>

                <TextField
                  style={{ height: "1px" }}
                  type="number"
                  size="small"
                  required
                  placeholder={courierData.tariff_size.toString()}
                  name="rate"
                  id="rate"
                  onChange={(event) => setRate(event.target.value)}
                  value={rate}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: "15px",
                }}
              >
                <StyledButton
                  style={{ flex: 1 }}
                  onClick={() => handleSubmit()}
                >
                  Išsaugoti
                </StyledButton>

                <StyledButton
                  style={{ flex: 1 }}
                  onClick={() => navigate(`/CouriersList`)}
                >
                  Atšaukti
                </StyledButton>
              </div>
            </>
          )}
        </SimplePageContent>
      </GridPageContent>
    </>
  );
}
