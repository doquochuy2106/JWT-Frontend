import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoute from "./PrivateRoutes";
const Approutes = (props) => {
  const project = () => {
    return <span>Project</span>;
  };
  return (
    <>
      <Switch>
        {/* <Route path="/project">project</Route>
        <Route path="/users">
          <Users />
        </Route> */}

        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/projects/" component={project} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default Approutes;
