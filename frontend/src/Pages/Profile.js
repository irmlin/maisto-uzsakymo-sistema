import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import {
  COURIER_STATES_FOR_COURIER,
  ROLES,
  TRANSPORT_TYPES,
} from "../Enums/Enums";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getUserData } from "../Services/UserService";

export default function Profile() {
  const { userData } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});

  const fetchProfileData = async () => {
    const response = await getUserData(userData.role, userData.id);
    if (response) {
      if (response.data.success) {
        setProfileData(response.data.profileData);
      } else {
        console.log("Could not fetch profile information");
      }
    } else {
      console.log("Server error");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>
      <Navbar />
      <SimplePageContent>
        {userData.role === ROLES.COURIER && (
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Vardas, Pavardė</b>
                  </TableCell>
                  <TableCell>
                    {profileData.firstname} {profileData.lastname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gimimo data</b>
                  </TableCell>
                  <TableCell>{profileData.birth_date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Transporto priemonė: </b>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      id="transport-select"
                      value={profileData.transport ? profileData.transport : ""}
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          transport: event.target.value,
                        })
                      }
                    >
                      {Object.values(TRANSPORT_TYPES).map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      sx={{ ml: 2 }}
                    >
                      Išsaugoti
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Mano būsena: </b>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      id="courier-state-select"
                      value={profileData.status ? profileData.status : ""}
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          status: event.target.value,
                        })
                      }
                    >
                      {Object.values(COURIER_STATES_FOR_COURIER).map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.text}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      sx={{ ml: 2 }}
                    >
                      Išsaugoti
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {userData.role === ROLES.RESTAURANT && (
          <>
            <div>
              <b>Pavadinimas: </b>
              <input type="text" value={userData.name} />
            </div>
            <div>
              <b>Adresas: </b>
              <input type="text" value={userData.address} />
            </div>
            <div>
              <b>Atidarymo laikas: </b>
              <input type="text" value={userData.o_time} />
            </div>
            <div>
              <b>Uždarymo laikas: </b>
              <input type="text" value={userData.c_time} />
            </div>
            <div>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Išsaugoti
              </Button>
            </div>
          </>
        )}
        {userData.role === ROLES.CLIENT && (
          <>
            <div>
              <b>Vartotojo vardas: </b>
              {userData.userName}
            </div>
            <div>
              <b>
                <label for="address">Pristatymo adresas: </label>
              </b>
              <input
                type="text"
                id="address"
                name="adresas"
                placeholder="Įveskite pristatymo adresą.."
              ></input>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Išsaugoti
              </Button>
            </div>
          </>
        )}
      </SimplePageContent>
    </div>
  );
}
