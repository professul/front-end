import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 전송을 위해 필요
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시
    if (error.response.status === 403 && !originalRequest._retry) {
      //토큰 만료
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새로운 Access Token과 Refresh Token 요청
        const { data } = await api.post("/reissue", null, {
          withCredentials: true,
        });

        // 새로운 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        // 새로운 Refresh Token은 자동으로 Cookie에 저장됨
        // axios 인스턴스의 기본 헤더에 새로운 액세스 토큰 설정
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        // 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
