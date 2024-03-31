import api from "./config";

export const login = async ({ email, password }) => {
  return await api.post(`/login`, { email, password });
};
