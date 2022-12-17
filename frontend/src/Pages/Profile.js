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
  TextField,
} from "@mui/material";
import { getUserData } from "../Services/UserService";
import { IMMUTABLE_PROFILE_INFO_COURIER } from "../Enums/Enums";
import {
  updateCourierTransport,
  updateCourierStatus,
  updateRestaurant,
} from "../Services/UserService";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackColor, setSnackColor] = useState("success");

  const fetchProfileData = async () => {
    const response = await getUserData(userData.role, userData.id);
    if (response) {
      if (response.data.success) {
        if (userData.role === ROLES.COURIER) {
          setProfileData({
            ...response.data.profileData,
            birth_date: new Date(response.data.profileData.birth_date)
              .toISOString()
              .substring(0, 10),
          });
        } else {
          setProfileData(response.data.profileData);
        }
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
        .includes(profileData.status);

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
    const response = await updateCourierStatus(userData.id, profileData.status);
    setSnackOpen(true);
    if (response) {
      if (response.data.success) {
        setSnackText(response.data.message);
        setSnackColor("success");
        const updatedFullProfile = {...userData};
        updatedFullProfile.status = profileData.status;
        setUserData(updatedFullProfile);
        localStorage.setItem('userData', JSON.stringify(updatedFullProfile));
      } else {
        setSnackText(response.data.message);
        setSnackColor("error");
      }
    } else {
      setSnackText("Serverio klaida");
      setSnackColor("error");
    }
  };

  const handleRestaurantUpdate = async (event) => {
    event.preventDefault();
    const updatedRestaurantData = {
      name: profileData.name,
      address: profileData.address,
      opening_time: profileData.opening_time,
      closing_time: profileData.closing_time,
    };

    const response = await updateRestaurant(userData.id, updatedRestaurantData);
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

  function transformDateString(date) {
    return date.substring(0, 10);
  }

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
                    <TableCell>{i === 2 ? transformDateString(courierDataToShow[i]) : courierDataToShow[i]}</TableCell>
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
                    {allowCourierEditStatus ? (
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
                          {Object.values(COURIER_STATES_FOR_COURIER).map(
                            (item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.text}
                              </MenuItem>
                            )
                          )}
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
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {userData.role === ROLES.RESTAURANT && (
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
                      value={profileData.name ? profileData.name : ""}
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          name: event.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Adresas</b>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      autoComplete="off"
                      value={profileData.address ? profileData.address : ""}
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          address: event.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Atidarymo laikas</b>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      autoComplete="off"
                      type="time"
                      value={
                        profileData.opening_time ? profileData.opening_time : ""
                      }
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          opening_time: event.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Uždarymo laikas</b>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      autoComplete="off"
                      type="time"
                      value={
                        profileData.closing_time ? profileData.closing_time : ""
                      }
                      onChange={(event) =>
                        setProfileData({
                          ...profileData,
                          closing_time: event.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleRestaurantUpdate}
                    >
                      Išsaugoti
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {userData.role === ROLES.CLIENT && (
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Vartotojo vardas</b>
                  </TableCell>
                  <TableCell>{profileData.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Pristatymo adresas</b>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
