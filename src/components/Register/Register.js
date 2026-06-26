import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useEffect } from "react";

const Register = (props) => {
  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/test-api")
      .then((data) => {
        console.log("check data axios: ", data);
      })
      .catch((error) => {
        console.error("Lỗi Axios rồi nè:", error.response || error.message);
      });
  }, []);

  return (
    <div className="register-container px-3 px-sm-0 ">
      <div className="container">
        <div className="row ">
          <div className="content-left  col-12 d-none col-sm-7 d-sm-block   ">
            <div className="brand">Do Quoc Huy</div>
            <div className="detail">
              Do Quoc Huy helps you connect and share with the people in your
              life
            </div>
          </div>

          <div className="content-right  col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-block d-sm-none">Do Quoc Huy</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address "
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number "
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username "
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password "
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="RE-enter password "
              />
            </div>

            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an accout. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
