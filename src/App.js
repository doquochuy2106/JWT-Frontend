import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/ManageUsers/Users";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Approutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { Rings } from "react-loader-spinner";
import "./App.scss";

function App() {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <div>
        <Router>
          {user && user.isLoading ? (
            <>
              <div className="loading-container">
                <Rings
                  height="100"
                  width="100"
                  color="#1877f2"
                  ariaLabel="loading"
                />
                <div>Loading data...</div>
              </div>
            </>
          ) : (
            <>
              <div className="app-header">
                <Nav />
              </div>
              <div className="app-container">
                <Approutes />
              </div>
            </>
          )}
        </Router>
        <ToastContainer
          position="bottom-center "
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
