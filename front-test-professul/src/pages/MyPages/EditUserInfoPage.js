import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../redux/slices/authSlice";
import style from "./EditUserInfoPage.module.css";

const EditUserInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    setUserInfo({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleUserInfoChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const handleSaveUserInfo = () => {
    dispatch(updateUserInfo(userInfo));
    navigate("/confirm-user-info");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={style["container"]}>
      <h2>회원정보 변경</h2>
      <div className={style["field"]}>
        <label htmlFor="name">이름</label>
        <InputText
          id="name"
          type="text"
          value={userInfo.name}
          onChange={(e) => handleUserInfoChange("name", e.target.value)}
        />
      </div>
      <div className={style["field"]}>
        <label htmlFor="email">이메일</label>
        <InputText
          id="email"
          type="text"
          value={userInfo.email}
          onChange={(e) => handleUserInfoChange("email", e.target.value)}
        />
      </div>
      <div className={style["buttonContainer"]}>
        <Button label="저장" onClick={handleSaveUserInfo} />
        <Button label="취소" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default EditUserInfoPage;
