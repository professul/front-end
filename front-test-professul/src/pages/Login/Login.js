import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import style from "./Login.module.css";
import "primereact/resources/primereact.min.css"; //core css
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions";
import { login, url } from "../../api/config";
import { setCookie } from "../../api/cookie";

import { useNavigate } from "react-router-dom";

// import { useNavigate, useNavigation } from "react-router-dom";
const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태

  const [checked, setChecked] = useState(false);
  const isLoading = useSelector((state) => state.auth.loading); // 로딩 상태
  const error = useSelector((state) => state.auth.error); // 에러 상태
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 디스패치 함수를 가져옴.

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    setChecked(e.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("보내는 데이터:", { email, password }); // 이 부분을 추가하여 데이터를 콘솔에 출력
    axios
      .post(
        `${url}/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(async (response) => {
        // 서버 응답 처리
        console.log("여기가 response", response);

        // const { access, refresh } = response.headers; // 서버에서 응답으로 받은 헤더에서 토큰 추출
        if (response.status === 200) {
          const accessToken = response.headers["access"]; // 액세스 토큰을 헤더에서 추출
          const refreshToken = response.headers["refresh"]; // 리프레시 토큰을 헤더에서 추출
          const { userId, email, role } = response.data;

          dispatch({ type: "isLogin", payload: true });
          dispatch({ type: "user", payload: { userId, email, role } });

          dispatch({ type: "access", payload: accessToken });

          // dispatch({ type: "refresh", payload: refreshToken });

          //토큰 저장
          setCookie("refresh", refreshToken);

          setIsLoggedIn(true); // 로그인 상태를 true로 설정

          console.log("로그인 성공");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("로그인 실패", error);
      });
  };
  if (isLoggedIn) {
    navigate("/"); // 홈페이지로 리다이렉트
    return null; // 리다이렉션 후 렌더링할 컴포넌트가 없으므로 null 반환
  }

  return (
    <div className={style["form-container"]}>
      <div className={style["surface-card"]}>
        <div className={style["first-welcome"]}>
          <div className={style["welcome"]}>Welcome Back</div>
          <span className={style["account"]}>Don't have an account?</span>

          <a className={style["createLink"]}>Create today!</a>
        </div>
        <div>
          <label htmlFor="email" className={style["label"]}>
            Email
          </label>
          <InputText
            id="email"
            type="text"
            placeholder="Email address"
            className={style["email"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 변경 핸들러
          />

          <label htmlFor="password" className={style["label"]}>
            Password
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Password"
            className={style["password"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 패스워드 입력값 변경 핸들러
          />

          <div className={style["checkbox-container"]}>
            <div className={style["checkbox"]}>
              <Checkbox
                id="rememberme"
                onChange={handleCheckboxChange}
                checked={checked}
                className={style["checkbox"]}
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>

            <a className={style["forgot"]}>Forgot your password?</a>
          </div>

          <Button
            label="로그인"
            icon="pi pi-user"
            className={style["signInButton"]}
            onClick={handleSubmit} // 클릭 핸들러를 추가
            disabled={isLoading} // 로딩 중일 때 버튼 비활성화
          />
        </div>
        {error && <div className={style["error"]}>{error}</div>}{" "}
        {/* 에러 메시지 표시 */}
      </div>
    </div>
  );
};

export default LoginForm;
