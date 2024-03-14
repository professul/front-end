import React, { useReducer } from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";
export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
