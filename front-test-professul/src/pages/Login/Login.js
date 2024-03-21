import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import style from "./Login.module.css";
import "primereact/resources/primereact.min.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
//폼 유효성 검사 추가하기
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setChecked(e.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={style["form-container"]}>
      <div className={style["surface-card"]}>
        <div className={style["first-welcome"]}>
          <div className={style["welcome"]}>Welcome Back</div>
          <span className={style["account"]}>Don't have an account?</span>
          <a className={style["createLink"]} href="/join">
            Create today!
          </a>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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

            <a className={style["forgot"]} href="/forgot-password">
              Forgot your password?
            </a>
          </div>

          <Button
            label="로그인"
            icon="pi pi-user"
            className={style["signInButton"]}
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
        {error && <div className={style["error"]}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
