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

const deleteUser = (userData) => {
  console.log("check id:", userData.id);
  return axios.delete("http://localhost:8080/api/v1/users/delete", {
    data: { id: userData.id },
  });
};

const createUser = (data) => {
  return axios.post("http://localhost:8080/api/v1/users/create", data);
};

const updateUser = (data) => {
  return axios.put("http://localhost:8080/api/v1/users/update", data);
};

export {
  registerNewUser,
  LoginUser,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
};
