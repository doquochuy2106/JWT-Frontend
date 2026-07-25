import React, { useEffect } from "react";
import {
  Redirect,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
  const { user } = React.useContext(UserContext);
  console.log("cehck usercontext: ", user);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/login"></Redirect>
      </>
    );
  }
};

export default PrivateRoute;
