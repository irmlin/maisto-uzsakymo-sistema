// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { Redirect, Route, Navigate, Outlet } from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => {

//   const { isAuthenticated} = useContext(UserContext);

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         return isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   )
// }

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useContext(UserContext);
  // const isAuthenticated = localStorage.getItem('isAuthenticated');
  // console.log(isAuthenticated)
  // debugger
  return isAuthenticated ? <Outlet/> : (isLoading ? 'Loading...' : <Navigate to="/login" />);
}

export default PrivateRoute
