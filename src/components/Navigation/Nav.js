import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./Nav.scss";
import { useEffect, useState } from "react";

const Nav = (props) => {
  const [show, setShow] = useState(true);
  let localtion = useLocation();
  console.log("check location: ", localtion);
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (localtion.pathname === "/login") {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
