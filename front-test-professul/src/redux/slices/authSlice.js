import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../api/cookie";
import {
  login as loginApi,
  updateUserInfo as updateUserInfoApi,
} from "../../api/auth";
// 비동기 로그인 액션
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password);

      if (response.status === 200) {
        //HTTP헤더에서 토큰 추출
        const access = response.headers["access"];
        const refresh = response.headers["refresh"];
        const { userId, email, role, name } = response.data;

        //로컬 스토리지에 엑세스 토큰 저장
        localStorage.setItem("access", access);
        setCookie("refresh", refresh);
        // 성공했을 때 사용자 정보 반환
        return { userId, email, role, name, access };
      }
    } catch (error) {
      return rejectWithValue("로그인 정보를 확인 후 다시 시도해주세요.");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await updateUserInfoApi(userInfo);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "회원정보 업데이트에 실패했습니다."
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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

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
        state.user = action.payload; //사용자 정보 저장

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        // 기존 state.user의 정보를 유지하면서 action.payload로부터 받은 정보만 업데이트
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
