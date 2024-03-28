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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새로운 Access Token과 Refresh Token 요청
        const { data } = await axios.post("/reissue", null, {
          withCredentials: true,
        });

        // 새로운 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        // 새로운 Refresh Token은 자동으로 Cookie에 저장됨

        // 요청 재시도
        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
