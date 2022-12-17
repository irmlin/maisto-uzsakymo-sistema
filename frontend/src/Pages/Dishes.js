import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { ROLES } from "../Enums/Enums";
import {
  Alert,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import RestaurantData from "../TempData/RestaurantData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  getRestaurantMeals,
  DeleteRestaurantMeal,
} from "../Services/RestaurantService";

export default function Dishes () {
    const { userData } = useContext(UserContext);
    const [meals, setMeals] = useState([]);
  // alert error
    const [snackOpen, setSnackOpen] = useState(false);
    // alert text
    const [snackText, setSnackText] = useState("");
    // alert colour
    const [snackColor, setSnackColor] = useState("success");

    const fetchDishes = async () => {
      // gaunam role ir data
      const response = await getRestaurantMeals(userData.id);
      // jei gaunam
      if (response) {
        if (response.data.success) {
          setMeals(response.data.meals);
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

    const handleSnackClose = () => {
      setSnackOpen(false);
    };

    useEffect(() => {
      fetchDishes();
    }, []);

    const navigate = useNavigate();

    const navigateCreate = () => {
        navigate("/dish");
    }

    const navigateEdit = (id) => {
        navigate(`/dishedit/${id}`);
    }

    const deleteMeal = async (id) => {
      const response = await DeleteRestaurantMeal(id);
      // jei gaunam
      setSnackOpen(true);
      if (response) {
        if (response.data.success) {            
            setSnackText("Patiekalas ištrintas");
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
    }

    return (
        <div>
            <Navbar/>
            <SimplePageContent> 
                {
                    <>
                    <motion.h2 className="header">
                        Patiekalai
                    </motion.h2>
                    <div>
                        <Button
                            onClick={navigateCreate}
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ ml: 2}}                                                          
                        >
                        Pridėti patiekalą
                        </Button>
                    </div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Numeris
                            </TableCell>
                            <TableCell>
                              Pavadinimas
                            </TableCell>
                            <TableCell>
                            Aprašymas
                            </TableCell>
                            <TableCell>                                 
                              Kaina
                            </TableCell>
                            <TableCell>
                              Ar vegetariškas?
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            meals &&
                            meals.map(meal => (
                              <TableRow key={meal.id}>
                                <TableCell>
                                  {meal.id}
                                </TableCell>
                                <TableCell>
                                  {meal.name}
                                </TableCell>
                                <TableCell>
                                {meal.description}
                                </TableCell>
                                <TableCell>
                                {meal.price}
                                </TableCell>
                                <TableCell>
                                {meal.vegetarian ? "Taip" : ""}
                                </TableCell>

                                
                                
                                <TableCell>
                                <Button
                                onClick={() => navigateEdit(meal.id)}
                                type="submit"
                                size="small"
                                variant="contained"
                                sx={{ ml: 2}}
                                >
                                Redaguoti
                                </Button>
                                </TableCell>

                                <TableCell>                                    
                                <Button
                                onClick={() => { if (window.confirm('Ar tikrai ištrinti??')) deleteMeal(meal.id)}}
                                type="submit"
                                size="small"
                                variant="contained"
                                sx={{ ml: 2}}
                                >
                                Ištrinti
                                </Button>
                                </TableCell>
                                
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                      {snackOpen && (
                        <Alert
                          severity={snackColor}
                          sx={{ horizontal: "center", width: "100%" }}
                        >
                          {snackText}
                        </Alert>
                      )}
                    </>
                    
                }
                
            </SimplePageContent>
        </div>
    );
};