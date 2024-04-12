import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./PasswordChangePage.module.css";
import { updatePassword } from "../../redux/slices/authSlice";

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = () => {
    dispatch(updatePassword({ currentPassword, newPassword, confirmPassword }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className={style["container"]}>
      <h2>비밀번호 변경</h2>
      <div className={style["field"]}>
        <InputText
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="현재 비밀번호를 입력하세요"
        />
      </div>
      <div className={style["field"]}>
        <InputText
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새 비밀번호를 입력하세요"
        />
      </div>
      <div className={style["field"]}>
        <InputText
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="새 비밀번호를 다시 입력하세요"
        />
      </div>
      <Button label="변경" onClick={handlePasswordChange} />
    </div>
  );
};

export default PasswordChangePage;
