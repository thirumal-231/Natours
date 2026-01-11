import axios from "axios";
axios.defaults.withCredentials = true;

console.log("API URL = ", process.env.REACT_APP_BE_API_URL);
const api = axios.create({
  baseURL: process.env.REACT_APP_BE_API_URL,
  withCredentials: true,
});

export default api;
