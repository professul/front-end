import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import style from "./Login.module.css";
import "primereact/resources/primereact.min.css"; //core css

const LoginForm = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.checked);
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
          />

          <label htmlFor="password" className={style["label"]}>
            Password
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Password"
            className={style["password"]}
          />

          {/* <div className="flex items-center justify-between mb-6"> */}
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
            {/* <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a> */}
            <a className={style["forgot"]}>Forgot your password?</a>
          </div>

          <Button
            label="로그인"
            icon="pi pi-user"
            className={style["signInButton"]}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
