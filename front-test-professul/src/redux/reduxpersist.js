import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import reportsReducer from "./slices/reportsSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  reports: reportsReducer, // combineReducers에 reportsReducer 추가
});

const persistConfig = {
  key: "root",
  storage,
  whilelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
