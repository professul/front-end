import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenSlice = createSlice({
  name: "authToken",
  initialState: {
    // 사용자의 인증 상태 (로그인 여부)
    authenticated: false,
    // 사용자의 액세스 토큰
    accessToken: null,
    // 토큰의 만료 시간
    expireTime: null,
  },
  reducers: {
    // 액션: 토큰 설정
    SET_TOKEN: (state, action) => {
      // 사용자를 인증하고
      state.authenticated = true;
      // 받은 토큰을 저장하고
      state.access = action.payload;
      // 토큰의 만료 시간을 계산하여 저장
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    // 액션: 토큰 삭제
    DELETE_TOKEN: (state) => {
      // 사용자 인증 정보 초기화
      state.authenticated = false;
      // 토큰 값 삭제
      state.access = null;
      // 토큰 만료 시간 삭제
      state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;
export default tokenSlice.reducer;
