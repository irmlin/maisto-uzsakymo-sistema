import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { COURIER_STATES_FOR_COURIER, ROLES, TRANSPORT_TYPES } from "../Enums/Enums";
import { Button, MenuItem, Select } from "@mui/material";

export default function Profile () {
    
    const { userRole, userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
                {
                    userRole === ROLES.COURIER && (
                        <>
                            <div>
                                <b>Vartotojo vardas: </b>{userData.userName}
                            </div>
                            <div>
                                <b>Transporto priemonė: </b>
                                <Select
                                    size="small"
                                    id="transport-select"
                                    value={userData.transport}
                                    // label="Pasirinkite Transporto Priemonę"
                                    onChange={event => setUserData({...userData, transport: event.target.value})}
                                >
                                    {
                                        Object.values(TRANSPORT_TYPES).map(item => (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    sx={{ ml: 2}}
                                    >
                                    Išsaugoti
                                </Button>
                            </div>
                            <div>
                                <b>Mano būsena: </b>
                                <Select
                                    size="small"
                                    id="courier-state-select"
                                    value={userData.state}
                                    onChange={event => setUserData({...userData, state: event.target.value})}
                                >
                                    {
                                        Object.values(COURIER_STATES_FOR_COURIER).map(item => (
                                            <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    sx={{ ml: 2}}
                                    >
                                    Išsaugoti
                                </Button>
                            </div>
                        </>
                    )
                }
{
                    userRole === ROLES.CLIENT && (
                        <>
                        
                            <div>
                                <b>Vartotojo vardas: </b>{userData.userName}
                            </div>
                            <div>
                                <b><label for="address">Pristatymo adresas: </label></b>
                                <input 
                                type="text" 
                                id="address" 
                                name="adresas" 
                                placeholder="Įveskite pristatymo adresą..">
                                </input>
                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    sx={{ ml: 2}}
                                    >
                                    Išsaugoti
                                </Button>
                            </div>
                        </>
                    )
                }
            </SimplePageContent>
        </div>
    );
};
