import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./PasswordCheckPage.module.css";

const PasswordCheckPage = () => {
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === user.password) {
      navigate("/edit-user-info");
    } else {
      alert("비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className={style["container"]}>
      <h2>비밀번호 확인</h2>
      <div className={style["field"]}>
        <InputText
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <Button label="확인" onClick={handlePasswordSubmit} />
    </div>
  );
};

export default PasswordCheckPage;
