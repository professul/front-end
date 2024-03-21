import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../api/cookie";

export const loginStart = createAction("auth/loginStart");
export const loginSuccess = createAction("auth/loginSuccess", (token, user) => {
  return {
    payload: {
      token,
      id: user.userId,
      email: user.email,
      name: user.name,
      password: user.password,
    },
  };
});
export const loginFailure = createAction("auth/loginFailure");
export const logout = createAction("auth/logout");
export const setIsLoggedIn = createAction("auth/setIsLoggedIn");

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      // 서버 응답 처리
      console.log("여기가 response", response);

      if (response.status === 200) {
        const accessToken = response.headers["access"]; // 액세스 토큰을 헤더에서 추출
        const refreshToken = response.headers["refresh"]; // 리프레시 토큰을 헤더에서 추출
        const { userId, email, role } = response.data;

        dispatch({ type: "isLogin", payload: true });
        dispatch({ type: "user", payload: { userId, email, role } });
        dispatch({ type: "access", payload: accessToken });

        //토큰 저장
        setCookie("refresh", refreshToken);

        setIsLoggedIn(true); // 로그인 상태를 true로 설정

        console.log("로그인 성공");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      dispatch(loginFailure(error.message));
    }
  };
};

export const setUserInfoAction = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});
