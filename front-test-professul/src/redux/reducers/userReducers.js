import { UPDATE_ACCESS_TOKEN } from "../actions/userActions";

const initialState = {
  accessToken: null,
  // 기타 사용자 관련 초기 상태 값들...
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
