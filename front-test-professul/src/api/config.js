import axios from "axios";

export const url = "http://localhost:8080";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("access");

export const AuthApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const login = async ({ email, password }) => {
  const data = { email, password };
  const response = await AuthApi.post(`/login`, data);
  return response.data;
};
//config 세팅
