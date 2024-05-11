import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./PasswordCheckPage.module.css";
import api from "../../../api/config";
const PasswordCheckPage = () => {
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const toast = useRef(null);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await api.post("user/checkPassword", { password });
      console.log(response.data);
      if (response.status === 200) {
        navigate("/edit-user-info");
      } else {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "오류",
            detail: "비밀번호가 일치하지 않습니다.",
            life: 3000,
          });
        }
        console.error("비밀번호 불일치");
      }
    } catch (error) {
      console.error("비밀번호 확인 중 오류가 발생했습니다");
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "오류",
          detail: "비밀번호 확인 중 문제가 발생했습니다.",
          life: 3000,
        });
      }
    }
  };

  return (
    <div className={style["container"]}>
      <Toast ref={toast} />
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
