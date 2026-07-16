import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Login.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginUser } from "../../services/userService";
const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultValue = {
    inputValueLogin: true,
    inputPassword: true,
  };

  const [checkValidInput, setCheckValidInput] = useState(defaultValue);

  let history = useHistory();

  const checkInput = () => {
    setCheckValidInput(defaultValue);
    if (!valueLogin) {
      toast.error("Vui lòng nhập vào Email hoặc phoneNumber");
      setCheckValidInput({ ...defaultValue, inputValueLogin: false });
      return false;
    }
    if (!password) {
      toast.error("Vui lòng nhập vào password");
      setCheckValidInput({ ...defaultValue, inputPassword: false });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    let check = checkInput();

    if (check == true) {
      let response = await LoginUser({ valueLogin, password });
      if (response && +response.EC === 0) {
        toast.success(response.EM);

        let data = {
          isAuthenticated: true,
          token: "fake token",
        };

        sessionStorage.setItem("account", JSON.stringify(data));

        history.push("/users");
        window.location.reload();
      }
      if (response && +response.EC !== 0) toast.error(response.EM);
    }
  };

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handlePressEnter = async (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      await handleLogin();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/");
      window.location.reload();
    }
  }, []);

  return (
    <div className="login-container px-3 px-sm-0 ">
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
            <input
              type="text"
              className={
                checkValidInput.inputValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={
                checkValidInput.inputPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => {
                handlePressEnter(event);
              }}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot yout password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
