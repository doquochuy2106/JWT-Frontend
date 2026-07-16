// import axios from "axios";

import axios from "../axios/axios";

const registerNewUser = (data) => {
  return axios.post("/api/v1/register", {
    email: data.email,
    phoneNumber: data.phoneNumber,
    username: data.username,
    password: data.password,
  });
};

const LoginUser = (data) => {
  return axios.post("/api/v1/login", {
    valueLogin: data.valueLogin,
    password: data.password,
  });
};

const getAllUsers = (page, limit) => {
  return axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
};

const deleteUser = (userData) => {
  console.log("check id:", userData.id);
  return axios.delete("/api/v1/users/delete", {
    data: { id: userData.id },
  });
};

const createUser = (data) => {
  return axios.post("/api/v1/users/create", data);
};

const updateUser = (data) => {
  return axios.put("/api/v1/users/update", data);
};

export {
  registerNewUser,
  LoginUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
};
