import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { COURIER_STATES_FOR_COURIER, ROLES, TRANSPORT_TYPES } from "../Enums/Enums";
import { Button, MenuItem, Select } from "@mui/material";

export default function Dish () {
    
    const { userRole, userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
                
                {
                    userRole === ROLES.RESTAURANT && (
                        <>
                            <motion.h2 className="header">
                                Patiekalo langas
                            </motion.h2>
                            <div>
                                <b>Pavadinimas: </b>
                                <input type="text" />
                                
                            </div>
                            <div>
                                <b>Kaina: </b>
                                <input type="number" />
                            </div>
                            <div>
                                <b>Aprašymas: </b>
                                <textarea/>
                            </div>
                            <div>
                                <b>Ar vegetariškas: </b>
                                <input type="radio" value="true" name = "vegetarian" />Taip
                                <input type="radio" value="true" name = "vegetarian" />Ne
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    sx={{ ml: 2}}
                                    >
                                    Pridėti
                                </Button>                                
                            </div>
                        </>
                    )

                    
                }
            </SimplePageContent>
        </div>
    );
};