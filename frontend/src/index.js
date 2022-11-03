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

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MainPageContainer>
        <Router>
          <Routes>
            <Route exact path="/profile" element={<Profile/>} />
            <Route path="/" element={<App/>} />
            <Route path="/menu/:restaurantId" element={<Menu/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/order_history" element={<OrderHistory/>} />
          </Routes>
        </Router>
      </MainPageContainer>
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
