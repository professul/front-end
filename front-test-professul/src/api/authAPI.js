import api from "./config";

export const login = async ({ email, password }) => {
  return await api.post(`/login`, { email, password });
};

export const refreshAccessToken = async (refresh) => {
  return await api.post(`/reissue`, { refresh });
};
