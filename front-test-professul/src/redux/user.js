import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = {
  isLoggedIn: false,
  userId: null,
  email: null,
  name: null,
  password: null,
  loading: false,
  error: null,
  token: null,
};

export default user;
