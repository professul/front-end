import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./PasswordChangePage.module.css";
import { updatePassword } from "../../redux/slices/authSlice";
import { validatePasswordChange } from "../../util/validate";

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const toast = useRef(null);
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
    const errors = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (newPassword !== confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "비밀번호 불일치",
        detail: "비밀번호가 일치하지 않습니다",
        life: 3000,
      });
      return;
    }

    dispatch(updatePassword({ currentPassword, newPassword, confirmPassword }))
      .unwrap()
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "성공",
          detail: "비밀번호가 변경되었습니다.",
          life: 3000,
        });
        navigate("/");
      });
  };

  return (
    <div className={style["container"]}>
      <Toast ref={toast} />
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
