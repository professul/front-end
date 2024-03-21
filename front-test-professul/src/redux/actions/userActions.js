// 액세스 토큰 갱신 액션 타입
export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";

// 액세스 토큰 갱신 액션 생성자
export const updateAccessToken = (accessToken) => ({
  type: UPDATE_ACCESS_TOKEN,
  payload: accessToken,
});
