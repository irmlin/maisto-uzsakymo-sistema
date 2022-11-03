import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TextField, MenuItem, InputLabel, Select} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {ROLES, TRANSPORT_TYPES, DISTRICTS_CITIES} from "../Enums/Enums";
import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";


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
  const [transport, setTransport] = useState(TRANSPORT_TYPES.CAR)
  const [cityName, setCityName] = useState(DISTRICTS_CITIES.VILNIUS.CITIES[0]);
  const [district, setDistrict] = useState(DISTRICTS_CITIES.VILNIUS.DISTRICT_NAME);
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
    transport: false,
    cityName: false,
    district: false,
    address: false,
    openedFrom: false,
    closedFrom: false
  });
  
  const [isErrorOpen, setErrorOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  const navigate = useNavigate();
  const rolesWithoutAdmin = (({ CLIENT, COURIER, RESTAURANT }) => ({ CLIENT, COURIER, RESTAURANT }))(ROLES)

  function emptyFields() {
    if (selectedRole === ROLES.CLIENT) {
      return !firstName || !lastName || !email || !userName || !password || !personalId || !dateOfBirth || !phoneNumber;
    } else if (selectedRole === ROLES.COURIER) {
      return !firstName || !lastName || !email || !userName || !password || !personalId || !dateOfBirth || !phoneNumber || !transport || !cityName || !district;
    } else {
      return !email || !userName || !password || !phoneNumber || !restaurantName || !cityName || !district || !address || !openedFrom || !closedFrom;
    }
  }

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
            transport: false,
            cityName: false,
            district: false,
            address: false,
            openedFrom: false,
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
            transport: true,
            cityName: true,
            district: true,
            address: false,
            openedFrom: false,
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
            transport: false,
            cityName: true,
            district: true,
            address: true,
            openedFrom: true,
            closedFrom: true});
    }
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emptyFields()) {
      setErrorOpen(true);
      setErrorText("Užpildykite visus formos laukus!");
      return;
    }
    setErrorOpen(false);
    setErrorText("");
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
    <div>
      <Navbar/>
      <SimplePageContent>
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
            sx={{ mt: 5, width: "100%" }}
          >
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
                    Object.entries(rolesWithoutAdmin).map(([key, role]) => (
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
            <TextField
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
              InputLabelProps={{ shrink: true }}  
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
            <InputLabel sx={{display: visibleFields.district ? "block" : "none"}} id="district-select-label">Apskritis</InputLabel>
            <Select
                labelId="district-select-label"
                sx={{display: visibleFields.district ? "block" : "none"}}
                fullWidth
                id="district-select"
                value={district}
                label="Pasirinkite Apskritį"
                onChange={event => 
                    {
                      setDistrict(event.target.value);
                      setCityName(Object.values(DISTRICTS_CITIES).find(item => item.DISTRICT_NAME === event.target.value).CITIES[0])
                  }}
            >
                {
                    Object.values(DISTRICTS_CITIES).map(item => (
                        <MenuItem key={item.DISTRICT_NAME} value={item.DISTRICT_NAME}>{item.DISTRICT_NAME}</MenuItem>
                    ))
                }
            </Select>
            <InputLabel sx={{display: visibleFields.cityName ? "block" : "none"}} id="city-select-label">Miestas</InputLabel>
            <Select
                labelId="city-select-label"
                sx={{display: visibleFields.cityName ? "block" : "none"}}
                fullWidth
                id="city-select"
                value={cityName}
                label="Pasirinkite Miestą"
                onChange={event => setCityName(event.target.value)}
            >
                {
                    Object.values(DISTRICTS_CITIES).find(item => item.DISTRICT_NAME === district).CITIES.map(city => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))
                }
            </Select>
            <InputLabel sx={{display: visibleFields.transport ? "block" : "none"}} id="transport-select-label">Transporto priemonė</InputLabel>
            <Select
                labelId="transport-select-label"
                sx={{display: visibleFields.transport ? "block" : "none"}}
                fullWidth
                id="transport-select"
                value={transport}
                label="Pasirinkite Transporto Priemonę"
                onChange={event => setTransport(event.target.value)}
            >
                {
                    Object.values(TRANSPORT_TYPES).map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
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
            />
            {isErrorOpen && (
              <Alert
                severity="error"
                sx={{ horizontal: "center", width: "100%" }}
              >
                {errorText}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registruotis
            </Button>
          </Box>
        </Box>
      </SimplePageContent>
    </div>
  );
}
