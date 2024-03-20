import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 스토어 생성 후 상태 확인
console.log("스토어 상태 확인");
console.log(store.getState());

export default store;
