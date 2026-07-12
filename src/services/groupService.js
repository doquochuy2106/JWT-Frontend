import axios from "axios";

const getGroups = () => {
  return axios.get("http://localhost:8080/api/v1/groups/read");
};

export { getGroups };
