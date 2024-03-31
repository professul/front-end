import axios from "axios";
import { setAccessToken } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 전송을 위해 필요
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시
    if (error.response.status === 401 && !originalRequest._retry) {
      //토큰 만료
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새로운 Access Token과 Refresh Token 요청
        const response = await api.post("/reissue", null, {
          withCredentials: true,
        });

        //응답 헤더에서 access 토큰과 refresh 토큰을 추출
        const accessToken = response.headers["access"];
        const refreshToken = response.headers["refresh"]; //이건 굳이 필요없음
        // 새로운 액세스 토큰으로 Redux 상태 업데이트
        dispatch(setAccessToken(accessToken));

        // 새로운 토큰 저장
        localStorage.setItem("access", accessToken);

        // 새로운 Refresh Token은 자동으로 Cookie에 저장됨
        // axios 인스턴스의 기본 헤더에 새로운 액세스 토큰 설정
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch (err) {
        console.log("에러 메시지:", err.message);
        console.log("토큰 받아오기 실패");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
