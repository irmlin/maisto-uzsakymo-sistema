import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import RestaurantData from "../TempData/RestaurantData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dishes () {
    const { userData } = useContext(UserContext);

    const navigate = useNavigate();

    const navigateCreate = () => {
        navigate("/dish");
    }

    const navigateEdit = () => {
        navigate("/dishedit");
    }

    return (
        <div>
            <Navbar/>
            <SimplePageContent> 
                {
                    userData.role === ROLES.RESTAURANT && (
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
                                RestaurantData[0].meals.map(meal => (
                                  <TableRow key={meal.id}>
                                    <TableCell>
                                      {meal.id}
                                    </TableCell>
                                    <TableCell>
                                      {meal.title}
                                    </TableCell>
                                    <TableCell>
                                    {meal.description}
                                    </TableCell>
                                    <TableCell>
                                    {meal.price}
                                    </TableCell>
                                    <TableCell>
                                    {meal.vegetarian.toString()}
                                    </TableCell>

                                    
                                    
                                    <TableCell>
                                    <Button
                                    onClick={navigateEdit}
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
                        </>
                    )
                }
            </SimplePageContent>
        </div>
    );
};