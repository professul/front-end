import React from "react";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./ConfirmUserInfoPage.module.css";

const ConfirmUserInfoPage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/");
  };

  const handleEdit = () => {
    navigate("/edit-user-info");
  };

  return (
    <div className={style["container"]}>
      <h2>변경된 회원정보 확인</h2>
      <div className={style["field"]}>
        <label htmlFor="name">이름</label>
        <div>{user.name}</div>
      </div>
      <div className={style["field"]}>
        <label htmlFor="email">이메일</label>
        <div>{user.email}</div>
      </div>
      <div className={style["buttonContainer"]}>
        <Button label="완료" onClick={handleConfirm} />
        <Button label="수정" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default ConfirmUserInfoPage;
