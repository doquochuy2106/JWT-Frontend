import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
  const { user } = React.useContext(UserContext);
  console.log("check userCOntex:  ", user);
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoute;
