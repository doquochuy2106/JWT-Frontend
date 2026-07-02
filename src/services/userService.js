import axios from "axios";

const registerNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email: data.email,
    phoneNumber: data.phoneNumber,
    username: data.username,
    password: data.password,
  });
};

export { registerNewUser };
