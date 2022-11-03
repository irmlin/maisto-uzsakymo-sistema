import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";

export default function Login() {

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isErrorOpen, setErrorOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  const navigate = useNavigate();

  function emptyFields() {
    return !password || !userName;
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
    console.log("logged in");
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
            Prisijungimas
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={event => setUserName(event.target.value)}
              value={userName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
              Prisijungti
            </Button>
          </Box>
        </Box>
      </SimplePageContent>
    </div>
  );
}
