// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useContext(UserContext);
  return isAuthenticated ? <Outlet/> : (isLoading ? 'Loading...' : <Navigate to="/login" />);
}

export default PrivateRoute
