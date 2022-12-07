import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TextField, MenuItem, InputLabel, Select} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {ROLES, TRANSPORT_TYPES} from "../Enums/Enums";
import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { getCitiesCounties } from "../Services/CityService";
import { registerNewUser } from "../Services/UserService";


export default function Register() {
  const [selectedRole, setSelectedRole] = useState(ROLES.CLIENT);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [personalCode, setpersonalCode] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [transport, setTransport] = useState(TRANSPORT_TYPES.CAR)
  const [cityId, setCityId] = useState();
  const [county, setCounty] = useState();
  const [address, setAddress] = useState("");
  const [openingTime, setopeningTime] = useState("08:00");
  const [closingTime, setclosingTime] = useState("17:00");

  const [citiesCounties, setCitiesCounties] = useState([]);

  const [visibleFields, setVisibleFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    password: true,
    personalCode: true,
    birthDate: true,
    phoneNumber: true,
    restaurantName: false,
    transport: false,
    cityId: false,
    county: false,
    address: false,
    openingTime: false,
    closingTime: false
  });
  
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("");

  const fetchCities = async () => {
    const response = await getCitiesCounties();
    if(response.status === 200) {
        setCitiesCounties(response.data.result)
        setCityId(response.data.result[0].id);
        setCounty(response.data.result[0].county);
    }
  }

  useEffect(() => {
      fetchCities();
  }, [])

  const navigate = useNavigate();
  const rolesWithoutAdmin = (({ CLIENT, COURIER, RESTAURANT }) => ({ CLIENT, COURIER, RESTAURANT }))(ROLES)

  function validatePhoneNumber() {
    const errorMsg = "Įveskite galiojantį telefono numerį!";
    try{
      const number = parseInt(phoneNumber);
      if (!isNaN(phoneNumber) && number > 0)
        return {valid: true}
      return {valid: false, message: errorMsg};
    }
    catch(e){
      return {valid: false, message: errorMsg};
    }
  }

  function validatePersonalCode() {
    const errorMsg = "Įveskite galiojantį asmens kodą!";
    try{
      const code = parseInt(personalCode);
      if (!isNaN(personalCode) && code > 0)
        return {valid: true}
      return {valid: false, message: errorMsg};
    }
    catch(e){
      return {valid: false, message: errorMsg};
    }
  }

  function validateForm() {
    let empty;
    const emptyMsg = "Užpildykite visus formos laukus!";
    if (selectedRole === ROLES.RESTAURANT){
      empty = !email || !username || !password  || !restaurantName || !cityId || !address || !openingTime || !closingTime;
      return {valid: !empty, message: empty ? emptyMsg : ""};
    }
    else if (selectedRole === ROLES.CLIENT) {
      empty = !firstName || !lastName || !email || !username || !password || !personalCode || !birthDate || !phoneNumber;
    
    } else {
      empty = !firstName || !lastName || !email || !username || !password || !personalCode || !birthDate || !phoneNumber || !transport || !cityId;
    }
    if (empty)
      return {valid: !empty, message: emptyMsg};
    const validNumber = validatePhoneNumber();
    if (!validNumber.valid)
      return validNumber;
    const validCode = validatePersonalCode();
    if (!validCode.valid)
      return validCode
    return {valid: true}
  }

  const counties = citiesCounties.map(item => item.county).filter((value, index, self) => self.indexOf(value) === index);

  const onRoleSelectChange = (event) => {
    setSelectedRole(event.target.value);
    if (event.target.value === ROLES.CLIENT) {
        setVisibleFields({...visibleFields,     
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            password: true,
            personalCode: true,
            birthDate: true,
            phoneNumber: true,
            restaurantName: false,
            transport: false,
            cityId: false,
            county: false,
            address: false,
            openingTime: false,
            closingTime: false});
    } else if (event.target.value === ROLES.COURIER) {
        setVisibleFields({...visibleFields,     
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            password: true,
            personalCode: true,
            birthDate: true,
            phoneNumber: true,
            restaurantName: false,
            transport: true,
            cityId: true,
            county: true,
            address: false,
            openingTime: false,
            closingTime: false});
    } else {
        setVisibleFields({...visibleFields,     
            firstName: false,
            lastName: false,
            email: true,
            username: true,
            password: true,
            personalCode: false,
            birthDate: false,
            phoneNumber: false,
            restaurantName: true,
            transport: false,
            cityId: true,
            county: true,
            address: true,
            openingTime: true,
            closingTime: true});
    }
    
  }

  function getDataObject() {
    if (selectedRole === ROLES.COURIER) {
      return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "username": username,
        "password": password,
        "personalCode": personalCode,
        "birthDate": birthDate,
        "phoneNumber": phoneNumber,
        "transport": transport,
        "cityId": cityId
      }
    }
    else if (selectedRole === ROLES.CLIENT) {
      return {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "username": username,
        "password": password,
        "personalCode": personalCode,
        "birthDate": birthDate,
        "phoneNumber": phoneNumber,
      }
    }
    if (selectedRole === ROLES.RESTAURANT) {
      return {
        "email": email,
        "username": username,
        "password": password,
        "restaurantName": restaurantName,
        "cityId": cityId,
        "address": address,
        "openingTime": openingTime,
        "closingTime": closingTime
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationInfo = validateForm();
    if (!validationInfo.valid) {
      setSnackOpen(true);
      setSnackColor("error");
      setSnackText(validationInfo.message);
      return;
    }
    setSnackOpen(false);
    setSnackText("");
    const data = getDataObject();
    const response = await registerNewUser(selectedRole, data);
    setSnackOpen(true);
    if (response) {
      if (response.data.success) {
        setSnackColor("success");
        setSnackText("Registracija sėkminga, nukreipiame į prisijungimo puslapį...");
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setSnackColor("error");
        setSnackText(response.data.message);
      }
    } else {
      setSnackColor("error");
      setSnackText("Serverio klaida");
    }
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
              type="email"
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
              sx={{display: visibleFields.username ? "block" : "none"}}
              required
              fullWidth
              name="username"
              label="Vartotojo Vardas"
              id="username"
              autoComplete="off"
              onChange={event => setusername(event.target.value)}
              value={username}
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
              sx={{display: visibleFields.personalCode ? "block" : "none"}}
              required
              fullWidth
              name="personalCode"
              label="Asmens Kodas"
              id="personalCode"
              autoComplete="off"
              onChange={event => setpersonalCode(event.target.value)}
              value={personalCode}
            />
            <TextField
            sx={{display: visibleFields.birthDate ? "block" : "none"}}
              margin="normal"
              required
              type="date"
              fullWidth
              name="birthDate"
              label="Gimimo Data"
              id="birthDate"
              autoComplete="off"
              onChange={event => setbirthDate(event.target.value)}
              InputLabelProps={{ shrink: true }}  
              value={birthDate}
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
            {
              county && (
                <>
                  <InputLabel sx={{display: visibleFields.county ? "block" : "none"}} id="county-select-label">Apskritis</InputLabel>
                  <Select
                    labelId="county-select-label"
                    sx={{display: visibleFields.county ? "block" : "none"}}
                    fullWidth
                    id="county-select"
                    value={county}
                    label="Pasirinkite Apskritį"
                    onChange={event => 
                      {
                        setCounty(event.target.value);
                        setCityId(citiesCounties.find(item => item.county === event.target.value).id);
                    }}
                  >
                    {
                        counties.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))
                    }
                  </Select>
                </>
              )
            }
            {
              cityId && (
                <>
                  <InputLabel sx={{display: visibleFields.cityId ? "block" : "none"}} id="cityId-select-label">Miestas</InputLabel>
                  <Select
                      labelId="cityId-select-label"
                      sx={{display: visibleFields.cityId ? "block" : "none"}}
                      fullWidth
                      id="cityId-select"
                      value={cityId}
                      label="Pasirinkite Miestą"
                      onChange={event => setCityId(event.target.value)}
                  >
                      {
                          citiesCounties.filter(item => item.county === county).map(item => (
                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                          ))
                      }
                  </Select>
                </>
              )
            }
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
              sx={{display: visibleFields.openingTime ? "block" : "none"}}
              required
              fullWidth
              type="time"
              name="openingTime"
              label="Dirbama nuo"
              id="openingTime"
              autoComplete="off"
              onChange={event => setopeningTime(event.target.value)}
              value={openingTime}
            />
            <TextField
            sx={{display: visibleFields.closingTime ? "block" : "none"}}
              margin="normal"
              required
              fullWidth
              type="time"
              name="closingTime"
              label="Dirbama iki"
              id="closingTime"
              autoComplete="off"
              onChange={event => setclosingTime(event.target.value)}
              value={closingTime}
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
            {snackOpen && (
              <Alert
                severity={snackColor}
                sx={{ horizontal: "center", width: "100%" }}
              >
                {snackText}
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
