import axios from "axios";
import { store } from "../redux/store";
import { setAccessToken } from "../redux/slices/authSlice";
import { logout } from "../redux/slices/authSlice";

const backendPort = "8080";
const serverUrl = "http://" + window.location.hostname + ":" + backendPort;

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // reissue 요청에 대한 예외 처리
    if (!config.url.endsWith("/reissue")) {
      // 로컬 스토리지에서 액세스 토큰을 가져옴
      const accessToken = localStorage.getItem("access");
      if (accessToken) {
        config.headers["access"] = accessToken;
      }
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403) {
      console.log("쿠키가 없어 로그인이 필요합니다");
      store.dispatch(logout);
      window.location.href = "/login";
      return Promise.reject(error);
    }
    // Access Token 만료 시 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //로그인 요청이 아닐 경우에만 토큰 재발급 시도
        if (!originalRequest.url.includes("/login")) {
          // Refresh Token으로 새로운 Access Token과 Refresh Token 요청
          const response = await api.post("/reissue", null, {
            withCredentials: true,
          });

          //응답 헤더에서 access 토큰과 refresh 토큰을 추출
          const accessToken = response.headers["access"];

          // 새로운 토큰 저장
          localStorage.setItem("access", accessToken);
          // 새로운 액세스 토큰으로 Redux 상태 업데이트
          store.dispatch(setAccessToken(accessToken));
          // 새로운 Refresh Token은 자동으로 Cookie에 저장됨
          // axios 인스턴스의 기본 헤더에 새로운 액세스 토큰 설정
          api.defaults.headers.common["access"] = accessToken;

          // 요청 재시도
          originalRequest.headers["access"] = accessToken;

          return api.request(originalRequest);
        }
      } catch (err) {
        console.log("에러 메시지:", err.message);
        console.log("토큰 받아오기 실패");
        store.dispatch(logout);

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
