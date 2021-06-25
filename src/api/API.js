import axios from "axios";
import endPoints from "./endPoints.json";
const ServerInstance = axios.create({
  baseURL: endPoints.baseURL,
});

ServerInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.authorization = token;

  return config;
});

export default ServerInstance;
