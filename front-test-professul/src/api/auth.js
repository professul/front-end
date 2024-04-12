import api from "./config";

export const login = async (email, password) => {
  const response = await api.post(`/login`, { email, password });
  return response;
};

export const updateUserInfo = async (userInfo) => {
  const response = await api.patch("/user/modify", userInfo);
  return response;
};

export const changeUserPassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  const response = await api.put("/user/change-password", {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return response;
};
