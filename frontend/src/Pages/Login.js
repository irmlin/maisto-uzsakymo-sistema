// import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Avatar from "@mui/material/Avatar";
// import CssBaseline from "@mui/material/CssBaseline";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { login } from "../services/authService";
// import { AuthContext } from "../contexts/AuthContext";

// const theme = createTheme();

// export default function Login() {
//   const [selectedRole, setSelectedRole] = useState("");

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [personalId, setPersonalId] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [restaurantName, setRestaurantName] = useState("");
//   const [cityName, setCityName] = useState("");
//   const [district, setDistrict] = useState("");
//   const [address, setAddress] = useState("");
//   const [openenFrom, setOpenenFrom] = useState("");
//   const [closedFrom, setClosedFrom] = useState("");

//   const [visibleFields, setVisibleFields] = {
//     "firstName": false,
//     "lastName": false,
//     "email": false,
//     "userName": false,
//     "password": false,
//     "personalId": false,
//     "dateOfBirth": false,
//     "phoneNumber": false,
//     "restaurantName": false,
//     "cityName": false,
//     "district": false,
//     "address": false,
//     "openenFrom": false,
//     "closedFrom": false
//   }
  
//   const [isErrorOpen, setErrorOpen] = React.useState(false);
//   const [errorText, setErrorText] = React.useState("");

//   const navigate = useNavigate();

//   const { setIsAuthenticated } = useContext(AuthContext);

//   const redirect = () => {
//     history.push("/");
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await login(email, password);
//     if (response) {
//       if (response.data.success) {
//         setIsAuthenticated(true);
//         redirect();
//       } else {
//         setErrorOpen(true);
//         setErrorText(response.data.cause);
//       }
//     } else {
//       setErrorOpen(true);
//       setErrorText("Server Error");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 0 }}
//           >
//             {isErrorOpen && (
//               <Alert
//                 severity="error"
//                 sx={{ horizontal: "center", width: "100%" }}
//               >
//                 {errorText}
//               </Alert>
//             )}
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="off"
//               autoFocus
//               onChange={handleEmailChange}
//               value={email}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="off"
//               onChange={handlePasswordChange}
//               value={password}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={!email || !password}
//             >
//               Sign In
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
