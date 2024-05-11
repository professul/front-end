import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import reportsReducer from "./slices/reportsSlice";
import reviewReducer from "./slices/reviewSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  reports: reportsReducer, // combineReducers에 reportsReducer 추가
  review: reviewReducer,
});

const persistConfig = {
  key: "root", //localStorage Key
  storage, //local storage
  whilelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
