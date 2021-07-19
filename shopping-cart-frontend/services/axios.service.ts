import axios, { ResponseType } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default axiosInstance;
