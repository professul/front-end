import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./reduxpersist";
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const state = store.getState();
console.log(state.auth.user);

export { store, persistor };
