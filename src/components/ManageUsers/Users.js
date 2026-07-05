import { useEffect } from "react";
import "./Users.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Users = (props) => {
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
  }, []);
  return <div>User</div>;
};

export default Users;
