import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import style from "./Login.module.css";
import "primereact/resources/primereact.min.css"; //core css
import { loginUser } from "../../redux/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { url } from "../../api/config";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const isLoading = useSelector((state) => state.auth.loading); // 로딩 상태
  const error = useSelector((state) => state.auth.error); // 에러 상태
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 디스패치 함수를 가져옴.

  const handleCheckboxChange = (e) => {
    setChecked(e.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("보내는 데이터:", { email, password }); // 이 부분을 추가하여 데이터를 콘솔에 출력

    try {
      const response = await axios.post(`${url}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("로그인 성공", data);
        //토큰 저장
        localStorage.setItem("token", data.token);
        localStorage.setItem("access", response.headers.access); // 서버 응답에서 액세스 토큰 추출
        document.cookie = `refresh=${response.headers.refresh}`; // 서버 응답에서 리프레시 토큰 추출
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

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
