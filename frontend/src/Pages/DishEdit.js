import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { motion } from "framer-motion";
import { COURIER_STATES_FOR_COURIER, ROLES, TRANSPORT_TYPES } from "../Enums/Enums";
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
UpdateRestaurantMeal,
GetRestaurantMeal,
} from "../Services/RestaurantService";

export default function DishEdit () {
    
    const { userData } = useContext(UserContext);
    const { mealid } = useParams();
    const [meal, setMeal] = useState({});
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackColor, setSnackColor] = useState("success");

    const fetchMealData = async () => {
        // gaunam role ir data
        const response = await GetRestaurantMeal(mealid);
        // jei gaunam
        if (response) {
          if (response.data.success) {
            setMeal(response.data.meal);
          } else {
            setSnackColor("error");
            setSnackOpen(true);
            setSnackText(response.data.message);
          }
        } else {
          setSnackColor("error");
          setSnackOpen(true);
          setSnackText("Server error");
        }
      };

      useEffect(() => {
        fetchMealData();
      }, []);

    const handleSnackClose = () => {
        setSnackOpen(false);
      };

    const UpdateMeal = async (event) => {
        event.preventDefault();
        const mealData = {
        mname: meal.name,
        mdescription: meal.description,
        mprice: meal.price,
        mvegetarian: meal.vegetarian,
        };

        const response = await UpdateRestaurantMeal(mealid, mealData);
        setSnackOpen(true);
        if (response) {
        if (response.data.success) {
            setSnackText("Patiekalas redaguotas sėkmingai");
            setSnackColor("success");
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
                    Patiekalo redagavimo langas
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
                                max: 100.00, min: 1.00 
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
                        onClick={UpdateMeal}
                        >
                        Redaguoti
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