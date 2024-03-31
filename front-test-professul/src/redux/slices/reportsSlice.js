import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/config";
import axios from "axios";
const initialState = {
  reports: [],
  selectedReports: null,
  loading: false,
  error: null,
};

export const getReports = createAsyncThunk("reports/getReports", async () => {
  const accessToken = localStorage.getItem("access");
  const config = {
    headers: {
      access: `${accessToken}`,
    },
  };

  const response = await api.get("/admin", config);

  console.log("여기", response);
  return response.data;
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
