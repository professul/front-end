import api from "../api/config";

export const deleteUser = async (userId) => {
  try {
    const response = await api.post(`/user/delete/${userId}`);
    console.log("회원탈퇴 성공", response);
    return response;
  } catch (error) {
    console.error("회원 탈퇴 실패", error);
    throw error;
  }
};
