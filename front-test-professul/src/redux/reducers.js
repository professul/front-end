import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 1000;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    isLoggedIn: false,
    user: null,
    accessToken: null, // 액세스 토큰
    refreshToken: null, // 리프레시 토큰
    accessTokenExpireTime: null, // 액세스 토큰 만료 시간
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpireTime = null;
    },
    SET_TOKEN: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpireTime = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  SET_TOKEN,
  DELETE_TOKEN,
} = authSlice.actions;

export default authSlice.reducer;
