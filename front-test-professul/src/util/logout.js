import api from "../api/config";
import { logout } from "../redux/slices/authSlice";

export const handleLogout = async (dispatch) => {
  try {
    await api.post("/logout");
    dispatch(logout());
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};
