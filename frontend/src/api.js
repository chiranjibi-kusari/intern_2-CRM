import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.10.102:8080/api/v1",
  //baseURL: "https://jsonplaceholder.typicode.com",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;

export const roles = ["ROLE_SALES", "ROLE_ACCOUNTANT"];
