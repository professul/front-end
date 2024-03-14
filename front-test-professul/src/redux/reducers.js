import { createReducer } from "@reduxjs/toolkit";
import user from "./user";
import { loginStart, loginSuccess, loginFailure, logout } from "./actions";

const authReducer = createReducer(user, (builder) => {
  builder
    .addCase(loginStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token; // 토큰 값 저장
      state.user = action.payload; // 사용자 정보 저장
    })
    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(logout, (state) => {
      state.isLoggedIn = false;
      state.user = null; // 사용자 정보 삭제
      state.token = null; // 토큰 값 삭제
    });
});

export default authReducer;
