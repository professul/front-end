import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/config";
const initialState = {
  reports: [],
  selectedReports: null,
  loading: false,
  error: null,
};

export const getReports = createAsyncThunk("reports/getReports", async () => {
  const response = await api.get("/admin");
  return response.data;
});

export const suspendUser = createAsyncThunk(
  "reports/suspendUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/suspend`, { userId });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const banUser = createAsyncThunk(
  "reports/banUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/ban`, { userId });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
