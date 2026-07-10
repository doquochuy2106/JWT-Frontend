import axios from "axios";

const registerNewUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email: data.email,
    phoneNumber: data.phoneNumber,
    username: data.username,
    password: data.password,
  });
};

const LoginUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin: data.valueLogin,
    password: data.password,
  });
};

const getAllUsers = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/users/read?page=${page}&limit=${limit}`,
  );
};

export { registerNewUser, LoginUser, getAllUsers };
