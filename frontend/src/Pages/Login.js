import React, { useState, useContext } from "react";
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
import {login} from "../Services/UserService"
import { ROLES } from "../Enums/Enums";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";

export default function Login() {

  const [selectedRole, setSelectedRole] = useState(ROLES.CLIENT);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  function emptyFields() {
    return !password || !email;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emptyFields()) {
      setSnackOpen(true);
      setSnackText("Užpildykite visus formos laukus!");
      return;
    }
    setSnackOpen(false);
    setSnackText("");

    const response = await login({selectedRole, email, password});
    if (response) {
      if (response.data.success) {
        const newUserData = {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
          username: response.data.username
        };
        setUserData(newUserData);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(newUserData));
        localStorage.setItem('isAuthenticated', true);
        navigate("/");
      } else {
        setSnackOpen(true);
        setSnackText(response.data.message);
        setSnackColor("error");
      }
    } else {
      setSnackOpen(true);
      setSnackText("Serverio klaida");
      setSnackColor("error");
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
            Prisijungimas
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5, width: "100%" }}
          >
            <InputLabel id="role-select-label">Jūsų rolė</InputLabel>
            <Select
                labelId="role-select-label"
                fullWidth
                id="role-select"
                value={selectedRole}
                label="Pasirinkite rolę"
                onChange={e => setSelectedRole(e.target.value)}
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
              label="E-pašto adresas"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
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
              Prisijungti
            </Button>
          </Box>
        </Box>
      </SimplePageContent>
    </div>
  );
}
