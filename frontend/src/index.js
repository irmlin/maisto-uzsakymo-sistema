import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './Pages/App';
import Login from './Pages/Login';
import Register from './Pages/Register';
import reportWebVitals from './reportWebVitals';
import Profile from "./Pages/Profile";
import Menu from "./Pages/Menu";
import { css, Global } from "@emotion/react";
import {UserContextProvider} from "./Contexts/UserContext";
import OrderHistory from './Pages/OrderHistory';
import MainPageContainer from './Components/MainPageContainer';
import NewCourierData from './Pages/NewCouriers';
import NewSupplierData from './Pages/NewSuppliers';
import ApproveCourier from './Pages/ApproveCourier';
import ApproveSupplier from './Pages/ApproveSupplier';
import ClientsReport from './Pages/ClientReport';
import CouriersReport from './Pages/CourierReport';
import SuppliersReport from './Pages/SupplierReport';
import CouriersList from './Pages/CouriersList';
import SuppliersList from './Pages/SuppliersList';
import EditCourierAgreement from './Pages/EditCourierAgreement';
import EditSupplierAgreement from './Pages/EditSupplierAgreement';
import Dishes from './Pages/Dishes';
import Dish from './Pages/Dish';
import DishEdit from './Pages/DishEdit';
import ProtectedRoute from './Components/ProtectedRoute';
import Logout from './Components/Logout';
import { ShoppingCartContextProvider } from './Contexts/ShoppingCartContext';
import Cart from './Pages/Cart';
import CourierOrders from './Pages/CourierOrders';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ShoppingCartContextProvider>
        <Router>
          <MainPageContainer>
          <Routes>

            {/* These paths are accessible to anyone */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* These are all the protected routes. A user that is not logged in will be redirected to /login when trying to access them. */}
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<App/>}></Route>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/menu/:restaurantId" element={<Menu/>}/>
              <Route path="/order_history" element={<OrderHistory/>} />
              <Route path="/dishes" element={<Dishes/>}/>
              <Route path="/dish" element={<Dish/>}/>
              <Route path="/dishedit/:mealid" element={<DishEdit/>}/>
              <Route path="/newCouriers" element={<NewCourierData/>}/>
              <Route path="/newSuppliers" element={<NewSupplierData/>}/>
              <Route path="/ApproveCourier/:courierId" element={<ApproveCourier/>}/>
              <Route path="/ApproveSupplier/:supplierId" element={<ApproveSupplier/>}/>
              <Route path="/ClientsReports" element={<ClientsReport/>}/>
              <Route path="/CouriersReports" element={<CouriersReport/>}/>
              <Route path="/SuppliersReports" element={<SuppliersReport/>}/>
              <Route path="/CouriersList" element={<CouriersList/>}/>
              <Route path="/SuppliersList" element={<SuppliersList/>}/>
              <Route path="/EditCourier/:courierId" element={<EditCourierAgreement/>}/>
              <Route path="/EditSupplier/:supplierId" element={<EditSupplierAgreement/>}/>
              <Route path="/courier-orders" element={<CourierOrders/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Route>

            {/* For invalid paths, redirect to /login */}
            <Route path="/*" element={<Login/>} />
            
          </Routes>
          </MainPageContainer>
        </Router>
      </ShoppingCartContextProvider>
    </UserContextProvider>
    <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
          ::selection {
            background: #000;
            color: #f0eff1;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
            --webkit-tap-highlight-color: transparent;
          }
          body::-webkit-scrollbar {
            width: 12px; /* width of the entire scrollbar */
          }
          body::-webkit-scrollbar-track {
            background: #f0eff1; /* color of the tracking area */
          }
          body::-webkit-scrollbar-thumb {
            background-color: #444444; /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            border: 3px solid #f0eff1; /* creates padding around scroll thumb */
          }
          body {
            background: #f0eff1;
            padding: 70px 0;
          }
          .container {
            width: 80%;
            margin: auto;
          }
        `}
      />

  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


{/* <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
<Route path="/menu/:restaurantId" element={<ProtectedRoute><Menu/></ProtectedRoute>} />
<Route path="/order_history" element={<ProtectedRoute><OrderHistory/></ProtectedRoute>} />
<Route path="/dishes" element={<ProtectedRoute><Dishes/></ProtectedRoute>} />
<Route path="/dish" element={<ProtectedRoute><Dish/></ProtectedRoute>} />
<Route path="/dishedit" element={<ProtectedRoute><DishEdit/></ProtectedRoute>} />
<Route path="/newCouriers" element={<ProtectedRoute><NewCourierData/></ProtectedRoute>} />
<Route path="/newSuppliers" element={<ProtectedRoute><NewSupplierData/></ProtectedRoute>} />
<Route path="/ApproveCourier/:courierId" element={<ProtectedRoute><ApproveCourier/></ProtectedRoute>} />
<Route path="/ApproveSupplier/:supplierId" element={<ProtectedRoute><ApproveSupplier/></ProtectedRoute>} />
<Route path="/ClientsReports" element={<ProtectedRoute><ClientsReport/></ProtectedRoute>} />
<Route path="/CouriersReports" element={<ProtectedRoute><CouriersReport/></ProtectedRoute>} />
<Route path="/SuppliersReports" element={<ProtectedRoute><SuppliersReport/></ProtectedRoute>} />
<Route path="/CouriersList" element={<ProtectedRoute><CouriersList/></ProtectedRoute>} />
<Route path="/SuppliersList" element={<ProtectedRoute><SuppliersList/></ProtectedRoute>} />
<Route path="/EditCourier/:courierId" element={<ProtectedRoute><EditCourierAgreement/></ProtectedRoute>} />
<Route path="/EditSupplier/:supplierId" element={<ProtectedRoute><EditSupplierAgreement/></ProtectedRoute>} /> */}