export const checkUserRole = (role) => {
  // role이 유효한지 확인
  console.log("Provided Role", role);
  if (role !== "ROLE_USER" && role !== "ROLE_ADMIN") {
    console.error(
      "Invalid role provided to checkUserRole. Only 'USER' or 'ADMIN' is allowed."
    );
    return false;
  }
  console.log("Fetching data from localStorage...");

  const loginDataString = localStorage.getItem("persist:root");

  // 로컬 스토리지에서 가져온 데이터 확인
  if (!loginDataString) {
    console.log("No data found in localStorage.");
    return false;
  }
  const rootData = JSON.parse(loginDataString);
  // 수정된 부분: 'auth' 객체를 먼저 파싱합니다.
  if (!rootData.auth) {
    console.log("No auth data found in rootData.");
    return false;
  }
  const authData = JSON.parse(rootData.auth);

  if (!authData.user) {
    console.log("No user data found in authData.");
    return false;
  }

  const user = authData.user;

  console.log("Final user data:", user);

  return user.role === role;
};

// 사용 예시
const isUser = checkUserRole("ROLE_USER");
const isAdmin = checkUserRole("ROLE_ADMIN");
