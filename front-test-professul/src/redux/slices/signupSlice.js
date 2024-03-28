import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/config";

//비동기 회원가입 액션
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (signUpData, { rejectWithValue }) => {
    try {
      const response = await api.post("/join", signUpData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 회원가입 슬라이스
export const signUpSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // 필요한 추가 리듀서 정의
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default signUpSlice.reducer;
