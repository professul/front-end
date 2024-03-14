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

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     email: "",
//     password: "",
//     name: "",
//   },

//   reducers: {
//     login: (state, action) => {
//       state.email = action.payload;
//       state.password = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//   },
// });
