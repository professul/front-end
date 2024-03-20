import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const response = await axios.post("/login", { email, password });
      const { token } = response.data; // 서버로부터 받은 토큰
      //로그인 성공 시 토큰을 redux 상태에 저장
      dispatch(loginSuccess(token));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const setUserInfoAction = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});
