import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Alert,
        Button,
        Snackbar,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        TextField, } from "@mui/material";
import {
    CreateRestaurantMeal,
  } from "../Services/RestaurantService";

export default function Dish () {
    
    const { userData } = useContext(UserContext);
    const [meal, setMeal] = useState({});
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackColor, setSnackColor] = useState("success");

    const handleSnackClose = () => {
        setSnackOpen(false);
      };

    const InsertMeal = async (event) => {
        event.preventDefault();
        const mealData = {
        mname: meal.name,
        mdescription: meal.description,
        mprice: meal.price,
        mvegetarian: meal.vegetarian,
        };

        const response = await CreateRestaurantMeal(userData.id, mealData);
        setSnackOpen(true);
        if (response) {
        if (response.data.success) {
            setSnackText("Patiekalas sukurtas sėkmingai");
            setSnackColor("success");
            setTimeout(() => window.location.reload(false), 1500);
        } else {
            setSnackText(response.data.message);
            setSnackColor("error");
        }
        } else {
        setSnackText("Serverio klaida");
        setSnackColor("error");
        }

  };

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
                
            <>
                <motion.h2 className="header">
                    Patiekalo sukūrimo langas
                </motion.h2>
                <TableContainer>
                <Table>
                <TableBody>
                    <TableRow>
                    <TableCell>
                        <b>Pavadinimas</b>
                    </TableCell>
                    <TableCell>
                        <TextField
                        size="small"
                        autoComplete="off"
                        value = {meal.name ? meal.name:""}
                        onChange={(event) =>
                            setMeal({
                                ...meal,
                                name: event.target.value,
                            })
                        }
                        />
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                        <b>Aprašymas</b>
                    </TableCell>
                    <TableCell>
                        <TextField
                        size="small"
                        autoComplete="off"
                        value = {meal.description ? meal.description:""}
                        onChange={(event) =>
                            setMeal({
                                ...meal,
                                description: event.target.value,
                            })
                        }
                        />
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                        <b>Kaina</b>
                    </TableCell>
                    <TableCell>
                        <TextField
                        size="small"
                        autoComplete="off"
                        type="number"
                        InputProps={{
                            inputProps: { 
                                max: 100, min: 1 
                            }
                        }} 
                        value = {meal.price ? meal.price: 1}
                        onChange={(event) =>
                            setMeal({
                                ...meal,
                                price: event.target.value,
                            })
                        }
                        />
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                        <b>Ar vegetariškas</b>
                    </TableCell>
                    <TableCell>
                        <div 
                        size = "small"
                        value = {meal.vegetarian ? meal.vegetarian: 0} 
                        >
                            <input type="radio" 
                            value = {1}
                            checked={1 == meal.vegetarian ? "checked" : ""}
                            onChange={(event) =>
                                setMeal({
                                    ...meal,
                                    vegetarian: event.target.value,
                                })
                            } 
                            />Taip<br/>
                            <input type="radio" 
                            value = {0} 
                            checked={0 == meal.vegetarian ? "checked" : ""}
                            onChange={(event) =>
                                setMeal({
                                    ...meal,
                                    vegetarian: event.target.value,
                                })
                            }
                            />Ne
                        </div>
                        
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                        <Button
                        size="small"
                        variant="contained"
                        onClick={InsertMeal}
                        >
                        Sukurti
                        </Button>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            </>
                <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                >
                <Alert
                    severity={snackColor}
                    sx={{ horizontal: "center", width: "100%" }}
                    onClose={handleSnackClose}
                >
                    {snackText}
                </Alert>
                </Snackbar>
            </SimplePageContent>
        </div>
    );
};