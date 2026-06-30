import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const defautValidInput = {
    isValidEmail: true,
    isValidPhoneNumber: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfimPassword: true,
  };

  const [checkValidInput, setCheckValidInput] = useState(defautValidInput);

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/v1/test-api")
    //   .then((data) => {
    //     console.log("check data axios: ", data);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi Axios rồi nè:", error.response || error.message);
    //   });
  }, []);

  const isValidInput = () => {
    setCheckValidInput(defautValidInput);

    if (!email) {
      toast.error("Email không được để trống");
      setCheckValidInput({ ...defautValidInput, isValidEmail: false });
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Email không đúng định dạng");
      setCheckValidInput({ ...defautValidInput, isValidEmail: false });
      return false;
    }

    if (!phoneNumber) {
      toast.error("PhoneNumber không được để trống");
      setCheckValidInput({ ...defautValidInput, isValidPhoneNumber: false });
      return false;
    }

    if (!username) {
      toast.error("Username không được để trống");
      setCheckValidInput({ ...defautValidInput, isValidUsername: false });
      return false;
    }

    if (!password) {
      toast.error("Password không được để trống");
      setCheckValidInput({ ...defautValidInput, isValidPassword: false });
      return false;
    }

    if (password != confirmPassword) {
      toast.error("Password không trùng khớp");
      setCheckValidInput({ ...defautValidInput, isValidConfimPassword: false });
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let check = isValidInput();

    if (check === true) {
      axios.post("http://localhost:8080/api/v1/register", {
        email: email,
        phoneNumber: phoneNumber,
        username: username,
        password: password,
      });
    }
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
            <div className="form-group ">
              <label>Email:</label>
              <input
                type="text"
                className={
                  checkValidInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address "
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className={
                  checkValidInput.isValidPhoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number "
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className={
                  checkValidInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Username "
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={
                  checkValidInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                className={
                  checkValidInput.isValidConfimPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
              <button
                className="btn btn-success"
                type="button"
                onClick={() => handleLogin()}
              >
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
