import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../api/cookie";
import { url } from "../../api/config";

// 비동기 로그인 액션
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        //HTTP헤더에서 토큰 추출
        const accessToken = response.headers["access"];
        const refreshToken = response.headers["refresh"];
        const { userId, email, role } = response.data;

        //로컬 스토리지에 엑세스 토큰 저장
        localStorage.setItem("access", accessToken);
        //쿠키에 refreshToekn 저장
        setCookie("refresh", refreshToken);

        // 성공했을 때 사용자 정보 반환
        return { userId, email, role, accessToken };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    //로그아웃 액션
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
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
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
