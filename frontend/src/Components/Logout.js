import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext';
import { updateCourierStatus } from '../Services/UserService';
import { ROLES } from '../Enums/Enums';
import { COURIER_STATES } from '../Enums/Enums';

export default function Logout() {

  const { setIsAuthenticated, userData, setUserData } = useContext(UserContext);

  localStorage.setItem('userData', JSON.stringify({}));
  localStorage.setItem('isAuthenticated', false);

  const logoutCourier = async () => {
    // change courier status to 'offline'
    if (userData.role === ROLES.COURIER) {
      await updateCourierStatus(userData.id, COURIER_STATES.OFFLINE);
    }
  }

  useEffect(() => {
    setIsAuthenticated(false);
    setUserData({});
    logoutCourier();
  })


  return <Navigate to="/login"/>;
}