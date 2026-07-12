import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getGroups } from "../../services/groupService";

import { toast } from "react-toastify";
const ModalUser = (props) => {
  const [groupUser, setGroupUser] = useState();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, SetUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    FetchGroups();
  }, []);

  const FetchGroups = async () => {
    let respone = await getGroups();

    if (respone && respone.data && respone.data.EC === 0) {
      setGroupUser(respone.data.DT);
    } else {
      toast.error(respone.data.EM);
    }
  };

  const handleSave = () => {
    let user = {
      email,
      phoneNumber,
      username,
      password,
      address,
      sex,
      group,
    };
    console.log("cehck onchange: ", user);
  };

  return (
    <>
      <Modal size="lg" show={true} className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>):
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>):
              </label>
              <input
                className="form-control"
                type="text"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={(event) => SetUsername(event.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>):
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Sex:</label>
              <select
                className="form-select"
                value={sex}
                onChange={(event) => setSex(event.target.value)}
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
                className="form-select"
                value={group}
                onChange={(event) => setGroup(event.target.value)}
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
            Save
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
