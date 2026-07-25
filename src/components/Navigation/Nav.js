import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./Nav.scss";
import React, { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Nav = (props) => {
  let localtion = useLocation();

  const { user } = React.useContext(UserContext);

  if ((user && user.isAuthenticated === true) || localtion.pathname === "/") {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Nav;
