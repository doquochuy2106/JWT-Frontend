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

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <Approutes />
        </div>

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
      </Router>
    </>
  );
}

export default App;
