import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext';

export default function Logout() {

  const { setIsAuthenticated, setUserData } = useContext(UserContext);

  localStorage.setItem('userData', JSON.stringify({}));
  localStorage.setItem('isAuthenticated', false);
  setIsAuthenticated(false);
  setUserData({});
  return <Navigate to="/login"/>;
}
