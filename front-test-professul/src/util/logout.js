import axios from "axios";
import { url } from "../../api/config";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
//로그아웃
export const handleLogout = () => {
  const dispatch = useDispatch();

  return async () => {
    try {
      // 서버에 로그아웃 요청을 보냅니다.
      await axios.get(`${url}/logout`, {
        withCredentials: true,
      });

      // Redux 상태를 업데이트하여 사용자 정보를 초기화합니다.
      dispatch(logout());

      // 요청이 성공하면, 홈 페이지로 리다이렉트합니다.
      window.location.replace("/");
    } catch (error) {
      // 로그아웃 요청이 실패하면, 에러를 처리합니다.
      console.error("로그아웃 실패:", error);
      // 필요한 경우 사용자에게 에러 메시지를 표시할 수 있습니다.
    }
  };
};
