import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whilelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
