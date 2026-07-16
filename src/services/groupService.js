import axios from "../axios/axios";

const getGroups = () => {
  return axios.get("/api/v1/groups/read");
};

export { getGroups };
