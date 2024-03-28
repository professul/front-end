import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../../api/cookie";
import { url } from "../../api/config";
import api from "../../api/config";
// 비동기 로그인 액션
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/login`, { email, password });

      if (response.status === 200) {
        //HTTP헤더에서 토큰 추출
        const accessToken = response.headers["access"];
        const refreshToken = response.headers["refresh"];
        const { userId, email, role, name } = response.data;

        //로컬 스토리지에 엑세스 토큰 저장
        localStorage.setItem("access", accessToken);
        setCookie("refresh", refreshToken);
        // 성공했을 때 사용자 정보 반환
        return { userId, email, role, name, accessToken };
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message ||
          "로그인에 실패했습니다. 다시 시도해주세요."
      );
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { getState, rejectWithValue }) => {
    const refreshToken = getCookie("refresh"); // 또는 쿠키에서 리프레시 토큰을 가져옵니다.
    if (!refreshToken) {
      return rejectWithValue("No refresh token available");
    }
    try {
      const response = await api.post(`/reissue`, { refreshToken });
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("access", accessToken); // 새로운 accessToken 저장

        return accessToken;
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message ||
          "토큰 갱신에 실패했습니다. 다시 로그인해주세요."
      );
    }
  }
);

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //로그아웃 액션
    logout: (state) => {
      // 로그아웃 시 상태를 initialState로 초기화
      Object.assign(state, initialState);
      localStorage.removeItem("access");
      removeCookie("refresh");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        // state.user = action.payload; //사용자 정보 저장
        state.user = {
          userId: action.payload.userId,
          email: action.payload.email,
          role: action.payload.role,
          name: action.payload.name,
        };

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload; //새로운 엑세스 토큰으로 상태 업데이트
        state.isLoggedIn = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
