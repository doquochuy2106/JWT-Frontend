import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Register = (props) => {
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/test-api")
    //   .then((data) => {
    //     console.log("check data axios: ", data);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi Axios rồi nè:", error.response || error.message);
    //   });
  }, []);

  const handleRegister = () => {
    let userData = {
      email: email,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log("check userData: ", userData);
  };

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number "
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username "
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="RE-enter password "
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

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
