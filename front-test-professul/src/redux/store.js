import React, { useReducer } from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";
import tokenReducer from "./auth";
export default configureStore({
  reducer: {
    auth: authReducer,
    // authToken: tokenReducer,
  },
});
