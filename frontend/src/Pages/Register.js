import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TextField, MenuItem, InputLabel, Select} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {ROLES, TRANSPORT_TYPES, DISTRICTS} from "../Enums/Enums";


export default function Register() {
  const [selectedRole, setSelectedRole] = useState(ROLES.CLIENT);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [personalId, setPersonalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [cityName, setCityName] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [openedFrom, setOpenedFrom] = useState("");
  const [closedFrom, setClosedFrom] = useState("");

  const [visibleFields, setVisibleFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    userName: true,
    password: true,
    personalId: true,
    dateOfBirth: true,
    phoneNumber: true,
    restaurantName: false,
    cityName: false,
    district: false,
    address: false,
    openedFrom: false,
    closedFrom: false
  });
  
  const [isErrorOpen, setErrorOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  const navigate = useNavigate();

  const onRoleSelectChange = (event) => {
    setSelectedRole(event.target.value);
    if (event.target.value === ROLES.CLIENT) {
        setVisibleFields({...visibleFields,     
            firstName: true,
            lastName: true,
            email: true,
            userName: true,
            password: true,
            personalId: true,
            dateOfBirth: true,
            phoneNumber: true,
            restaurantName: false,
            cityName: false,
            district: false,
            address: false,
            openenFrom: false,
            closedFrom: false});
    } else if (event.target.value === ROLES.COURIER) {
        setVisibleFields({...visibleFields,     
            firstName: true,
            lastName: true,
            email: true,
            userName: true,
            password: true,
            personalId: true,
            dateOfBirth: true,
            phoneNumber: true,
            restaurantName: false,
            cityName: true,
            district: true,
            address: false,
            openenFrom: false,
            closedFrom: false});
    } else {
        setVisibleFields({...visibleFields,     
            firstName: false,
            lastName: false,
            email: true,
            userName: true,
            password: true,
            personalId: false,
            dateOfBirth: false,
            phoneNumber: false,
            restaurantName: true,
            cityName: true,
            district: true,
            address: true,
            openenFrom: true,
            closedFrom: true});
    }
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
    // const response = await login(email, password);
    // if (response) {
    //   if (response.data.success) {
    //     setIsAuthenticated(true);
    //     redirect();
    //   } else {
    //     setErrorOpen(true);
    //     setErrorText(response.data.cause);
    //   }
    // } else {
    //   setErrorOpen(true);
    //   setErrorText("Server Error");
    // }
  };

  return (
        <Box
          sx={{
            width: "40%",
            margin: "auto",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registracija
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 0 }}
          >
            {isErrorOpen && (
              <Alert
                severity="error"
                sx={{ horizontal: "center", width: "100%" }}
              >
                {errorText}
              </Alert>
            )}
            <InputLabel id="role-select-label">Vartotojo rolė</InputLabel>
            <Select
                labelId="role-select-label"
                fullWidth
                id="role-select"
                value={selectedRole}
                label="Pasirinkite rolę"
                onChange={onRoleSelectChange}
            >
                {
                    Object.entries(ROLES).map(([key, role]) => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))
                }
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              sx={{display: visibleFields.email ? "block" : "none"}}
              label="E-pašto adresas"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
            {/* <TextField
              margin="normal"
              sx={{display: visibleFields.firstName ? "block" : "none"}}
              required
              fullWidth
              name="firstname"
              label="Vardas"
              id="firstname"
              autoComplete="off"
              onChange={event => setFirstName(event.target.value)}
              value={firstName}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.lastName ? "block" : "none"}}
              required
              fullWidth
              name="lastname"
              label="Pavardė"
              id="lastname"
              autoComplete="off"
              onChange={event => setLastName(event.target.value)}
              value={lastName}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.userName ? "block" : "none"}}
              required
              fullWidth
              name="username"
              label="Vartotojo Vardas"
              id="username"
              autoComplete="off"
              onChange={event => setUserName(event.target.value)}
              value={userName}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.phoneNumber ? "block" : "none"}}
              required
              fullWidth
              name="phonenumber"
              label="Telefono Numeris"
              id="phonenumber"
              autoComplete="off"
              onChange={event => setPhoneNumber(event.target.value)}
              value={phoneNumber}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.personalId ? "block" : "none"}}
              required
              fullWidth
              name="personalid"
              label="Asmens Kodas"
              id="personalid"
              autoComplete="off"
              onChange={event => setPersonalId(event.target.value)}
              value={personalId}
            />
            <TextField
            sx={{display: visibleFields.dateOfBirth ? "block" : "none"}}
              margin="normal"
              required
              type="date"
              fullWidth
              name="dateofbirth"
              label="Gimimo Data"
              id="dateofbirth"
              autoComplete="off"
              onChange={event => setDateOfBirth(event.target.value)}
              value={dateOfBirth}
            />
            <TextField
            sx={{display: visibleFields.restaurantName ? "block" : "none"}}
              margin="normal"
              required
              fullWidth
              name="restaurantname"
              label="Restorano Pavadinimas"
              id="restaurantname"
              autoComplete="off"
              onChange={event => setRestaurantName(event.target.value)}
              value={restaurantName}
            />
            <TextField
            sx={{display: visibleFields.cityName ? "block" : "none"}}
              margin="normal"
              required
              fullWidth
              name="city"
              label="Miestas"
              id="city"
              autoComplete="off"
              onChange={event => setCityName(event.target.value)}
              value={cityName}
            />
            <InputLabel id="district-select-label">Apskritis</InputLabel>
            <Select
                labelId="district-select-label"
                sx={{display: visibleFields.district ? "block" : "none"}}
                fullWidth
                id="district-select"
                value={district}
                label="Pasirinkite Apskritį"
                onChange={event => setDistrict(event.target.value)}
            >
                {
                    Object.entries(DISTRICTS).map(([key, role]) => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))
                }
            </Select>
            <TextField
              margin="normal"
              sx={{display: visibleFields.address ? "block" : "none"}}
              required
              fullWidth
              name="address"
              label="Adresas"
              id="address"
              autoComplete="off"
              onChange={event => setAddress(event.target.value)}
              value={address}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.openedFrom ? "block" : "none"}}
              required
              fullWidth
              name="openedfrom"
              label="Dirbama nuo"
              id="openedfrom"
              autoComplete="off"
              onChange={event => setOpenedFrom(event.target.value)}
              value={openedFrom}
            />
            <TextField
            sx={{display: visibleFields.closedFrom ? "block" : "none"}}
              margin="normal"
              required
              fullWidth
              name="closedfrom"
              label="Dirbama iki"
              id="closedfrom"
              autoComplete="off"
              onChange={event => setClosedFrom(event.target.value)}
              value={closedFrom}
            />
            <TextField
              margin="normal"
              sx={{display: visibleFields.password ? "block" : "none"}}
              required
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              autoComplete="off"
              onChange={event => setPassword(event.target.value)}
              value={password}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !password}
            >
              Registruotis
            </Button>
          </Box>
        </Box>
  );
}
