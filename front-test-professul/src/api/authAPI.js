import api from "./config";

export const login = async ({ email, password }) => {
  return await api.post(`/login`, { email, password });
};

export const refreshAccessToken = async (refreshToken) => {
  return await api.post(`/reissue`, { refreshToken });
};
