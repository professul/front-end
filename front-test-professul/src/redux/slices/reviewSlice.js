import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/config";

export const fetchReviewByUser = createAsyncThunk(
  "reviews/fetchByUser",
  async (userId, thunkAPI) => {
    const response = await api.get("url추가");
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteReview(state, action) {
      const index = state.items.findIndex(
        (review) => review.id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateReview(state, action) {
      const index = state.items.findIndex(
        (review) => review.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewByUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchReviewByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchReviewByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { deleteReview, updateReview } = reviewSlice.actions;
export default reviewSlice.reducer;
