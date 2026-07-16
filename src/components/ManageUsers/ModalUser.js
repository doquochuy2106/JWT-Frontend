import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getGroups } from "../../services/groupService";
import _ from "lodash";
import { createUser, updateUser } from "../../services/userService";

import { toast } from "react-toastify";
const ModalUser = (props) => {
  const [groupUser, setGroupUser] = useState();

  // const [email, setEmail] = useState("");
  // const [phone, setphone] = useState("");
  // const [username, SetUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [sex, setSex] = useState("");
  // const [group, setGroup] = useState("");

  const defaultValue = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const [userData, setUserData] = useState(defaultValue);

  const defaultCheckvalidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [checkValidInput, setCheckValidInput] = useState(
    defaultCheckvalidInput,
  );

  useEffect(() => {
    FetchGroups();
  }, []);

  useEffect(() => {
    if (props.action === "UPDATE") {
      console.log("check userDataModal: ", props.dataModalUser);
      setUserData({
        ...props.dataModalUser,
        group: props.dataModalUser.Group ? props.dataModalUser.Group.id : "",
      });
    }
  }, [props.dataModalUser]);

  useEffect(() => {
    if (props.action === "CREATE") {
      if (groupUser && groupUser.length > 0) {
        setUserData({ ...userData, group: groupUser[0].id });
      }
    }
  }, [props.action]);

  const FetchGroups = async () => {
    let respone = await getGroups();

    if (respone && respone.EC === 0) {
      setGroupUser(respone.DT);
      if (respone.DT && respone.DT.length > 0) {
        setUserData({ ...userData, group: respone.DT[0].id });
      }
    } else {
      toast.error(respone.EM);
    }
  };

  const handleInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkInput = () => {
    if (props.action === "UPDATE") return true;

    setCheckValidInput(defaultCheckvalidInput);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _checkValidInput = _.cloneDeep(defaultCheckvalidInput);
        _checkValidInput[arr[i]] = false;
        setCheckValidInput(_checkValidInput);
        toast.error(`Vui lòng nhập ${arr[i]} `);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleSave = async () => {
    let check = checkInput();
    if (check === true) {
      let response =
        props.action === "CREATE"
          ? await createUser(userData)
          : await updateUser(userData);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        setUserData({ ...defaultValue, group: groupUser[0].id });
        props.handleCloseModaluser();
      } else {
        toast.error(response.EM);
        let _checkValidInput = _.cloneDeep(defaultCheckvalidInput);
        _checkValidInput[response.DT] = false;
        setCheckValidInput(_checkValidInput);
      }
    }
  };

  const handleCloseModal = () => {
    props.handleCloseModaluser();
    setUserData(defaultValue);
    setCheckValidInput(defaultCheckvalidInput);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.showModalUser}
        onHide={() => handleCloseModal()}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create a new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>):
              </label>
              <input
                className={
                  checkValidInput.email
                    ? "form-control"
                    : "form-control is-invalid"
                }
                disabled={props.action === "CREATE" ? false : true}
                type="email"
                value={userData.email}
                onChange={(event) => handleInput(event.target.value, "email")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>):
              </label>
              <input
                className={
                  checkValidInput.phone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                disabled={props.action === "CREATE" ? false : true}
                type="text"
                value={userData.phone}
                onChange={(event) => handleInput(event.target.value, "phone")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {props.action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>):
                  </label>
                  <input
                    className={
                      checkValidInput.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handleInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) => handleInput(event.target.value, "address")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Sex:</label>
              <select
                className="form-select"
                value={userData.sex}
                onChange={(event) => handleInput(event.target.value, "sex")}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>):
              </label>
              <select
                className={
                  checkValidInput.group
                    ? "form-select"
                    : "form-select is-invalid"
                }
                value={userData.group}
                onChange={(event) => handleInput(event.target.value, "group")}
              >
                {groupUser &&
                  groupUser.length > 0 &&
                  groupUser.map((item, index) => {
                    return (
                      <option key={`group ${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSave()}>
            {props.action === "CREATE" ? "Save" : "Update"}
          </Button>
          <Button variant="secondary" onClick={props.handleCloseModaluser}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
