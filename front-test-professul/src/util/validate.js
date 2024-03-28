export const validateSignUpForm = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "이름을 입력해주세요.";
  }
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "유효한 이메일 주소를 입력해주세요.";
  }
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 6) {
    errors.password = "비밀번호는 6자 이상이어야 합니다.";
  }
  return errors;
};
