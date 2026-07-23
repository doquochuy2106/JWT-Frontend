import axios from "axios";
import { toast } from "react-toastify";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN 123";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response.data;
  },
  function (err) {
    const status = (err && err.response && err.response.status) || 500;
    switch (status) {
      //authenticated
      case 401: {
        toast.error("Unauthorized the user, Please Login...");
        return Promise.reject(err);
      }

      //forbidden (permission related issues)
      case 403: {
        toast.error(`You don't have Permission...`);
        return Promise.reject(err);
      }

      //Bad request
      case 400: {
        return Promise.reject(err);
      }

      //Not found
      case 404: {
        return Promise.reject(err);
      }

      //conflict
      case 409: {
        return Promise.reject(err);
      }

      //unprocessable
      case 422: {
        return Promise.reject(err);
      }

      default: {
        return Promise.reject(err);
      }
    }
  },
);

export default instance;
