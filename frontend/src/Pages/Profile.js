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
  Alert,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getUserData } from "../Services/UserService";
import { IMMUTABLE_PROFILE_INFO_COURIER } from "../Enums/Enums";
import { updateCourierTransport } from "../Services/UserService";
import { updateCourierStatus } from "../Services/UserService";

export default function Profile() {
  const { userData } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  const fetchProfileData = async () => {
    const response = await getUserData(userData.role, userData.id);
    if (response) {
      if (response.data.success) {
        setProfileData({...response.data.profileData, birth_date: new Date(response.data.profileData.birth_date).toISOString().substring(0,10)});
      } else {
        console.log("Could not fetch profile information");
      }
    } else {
      console.log("Server error");
    }
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const courierDataToShow = !profileData
    ? []
    : [
        profileData.firstname + ", " + profileData.lastname,
        profileData.birth_date,
        !profileData.employed_from ? "-" : profileData.employed_from,
        profileData.phone_number,
        profileData.approved === 0 ? "Ne" : "Taip",
        profileData.city,
      ];

  const allowCourierEditStatus = !profileData
    ? false
    : Object.values(COURIER_STATES_FOR_COURIER)
        .map((val) => val.value)
        .includes(profileData.status)
    ? true
    : false;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleCourierTransportUpdate = async (event) => {
    event.preventDefault();
    const response = await updateCourierTransport(
      userData.id,
      profileData.transport
    );
    setSnackOpen(true);
    if (response) {
      if (response.data.success) {
        setSnackText(response.data.message);
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

  const handleCourierStatusUpdate = async (event) => {
    event.preventDefault();
    const response = await updateCourierStatus(
      userData.id,
      profileData.status
    );
    setSnackOpen(true);
    if (response) {
      if (response.data.success) {
        setSnackText(response.data.message);
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
      <Navbar />
      <SimplePageContent>
        {userData.role === ROLES.COURIER && (
          <TableContainer>
            <Table>
              <TableBody>
                {IMMUTABLE_PROFILE_INFO_COURIER.map((colName, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <b>{colName}</b>
                    </TableCell>
                    <TableCell>{courierDataToShow[i]}</TableCell>
                  </TableRow>
                ))}
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
                      onClick={handleCourierTransportUpdate}
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
                    {
                      allowCourierEditStatus ? (
                        <>
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
                          onClick={handleCourierStatusUpdate}
                        >
                          Išsaugoti
                        </Button>
                        </>
                      ) : (
                        <>{profileData.status}</>
                      )
                    }
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
}
