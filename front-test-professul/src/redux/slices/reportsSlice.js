import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/config";
const initialState = {
  reports: [],
  selectedReports: null,
  loading: false,
  error: null,
};

export const getReports = createAsyncThunk("reports/getReports", async () => {
  //서버에서 신고 데이터 가져오기
  const response = await api.get("/admin");
  const data = response.data; // Axios를 사용할 때 응답은 'data' 속성에 저장됩니다.
  return data; // 필요한 데이터를 반환합니다.
});

//슬라이스 생성
const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setSelectedReports: (state, action) => {
      state.selectedReports = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedReports } = reportsSlice.actions;
export default reportsSlice.reducer;
