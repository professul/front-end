export const checkUserRole = (role) => {
  // role이 유효한지 확인
  console.log("Provided Role", role);
  if (role !== "ROLE_USER" && role !== "ROLE_ADMIN") {
    console.error(
      "Invalid role provided to checkUserRole. Only 'ROLE_USER' or 'ROLE_ADMIN' is allowed."
    );
    return false;
  }

  console.log("Fetching data from localStorage...");
  const loginDataString = localStorage.getItem("persist:root");
  console.log("Retrieved data string:", loginDataString);

  // 로컬 스토리지에서 가져온 데이터 확인
  if (!loginDataString) {
    console.log("No data found in localStorage.");
    return false;
  }

  let rootData;
  try {
    rootData = JSON.parse(loginDataString);
  } catch (error) {
    console.error("Error parsing loginDataString:", error);
    return false; // 에러 발생 시 false 반환
  }

  if (!rootData.auth) {
    console.log("No auth data found in rootData.");
    return false;
  }

  let authData;
  try {
    authData = JSON.parse(rootData.auth);
  } catch (error) {
    console.error("Error parsing auth data:", error);
    return false; // 에러 발생 시 false 반환
  }

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
console.log(`Is User: ${isUser}, Is Admin: ${isAdmin}`);
