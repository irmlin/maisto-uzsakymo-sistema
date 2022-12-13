import { useState } from "react";
import SimplePageContent from "../Components/SimplePageContent";
import { TextField } from "@mui/material";
import CourierData from "../TempData/CourierData";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { useParams } from "react-router";
import Navbar from "../Components/Navbar";
import GridPageContent from "../Components/GridPageContent";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";

export default function EditCourierAgreement() {
  const { courierId } = useParams();
  const courier = CourierData.find(
    (r) => r.courierNumber === Number(courierId)
  );
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [rate, setRate] = useState(courier.courierRate);

  return (
    <>
      <Navbar />
      <GridPageContent>
        <motion.h2 className="header">Redaguoti kurjerio tarifą</motion.h2>

        <SimplePageContent>
          {userData.role === ROLES.ADMINISTRATOR && (
            <>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio vardas: </b>
                {courier.courierName}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio pavardė: </b>
                {courier.courierSurname}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio gimimo data: </b>
                {courier.courierBirthDate.toLocaleString(navigator.language, {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio įdarbinimo data: </b>
                {courier.courierWorkStart.toLocaleString(navigator.language, {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio telefono nr.: </b>
                {courier.courierPhone}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio e. paštas: </b>
                {courier.courierEmail}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio transporto priemonė: </b>
                {courier.courierTransport}
              </div>
              <div style={{ padding: "10px" }}>
                <b>Kurjerio tarifas: </b>

                <TextField
                  style={{ height: "1px" }}
                  type="number"
                  size="small"
                  required
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
                  onClick={() => navigate(`/CouriersList`)}
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
