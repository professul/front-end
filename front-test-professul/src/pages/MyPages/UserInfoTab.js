import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useSelector, useDispatch } from "react-redux";
import style from "./UserInfoTab.module.css";
const UserInfoTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userName = useSelector((state) => state.auth.user?.name);
  console.log("이름", userName);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  console.log(userInfo);
  useEffect(() => {
    setUserInfo({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]); // user 상태가 변경될 때마다 실행

  // 사용자 정보를 변경하는 함수
  const handleUserInfoChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  // 사용자 정보를 저장하는 함수
  const handleSaveUserInfo = () => {
    alert("사용자 정보가 저장되었습니다.");
  };

  return (
    <div className="col-12 md:col-6">
      <div className={style["cardContainer"]}>
        <h5>회원 정보</h5>
        <div className={style["field"]}>
          <label htmlFor="name3">이름</label>
          <div style={{ width: "100%" }}>
            <InputText
              id="name3"
              type="text"
              value={userInfo.name}
              onChange={(e) => handleUserInfoChange("name", e.target.value)}
            />
          </div>
        </div>
        <div className={style["field"]}>
          <label htmlFor="email3">이메일</label>
          <div style={{ width: "100%" }}>
            <InputText
              id="email3"
              type="text"
              value={userInfo.email}
              onChange={(e) => handleUserInfoChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className={style["field"]}>
          <label htmlFor="password">비밀번호</label>
          <div style={{ width: "100%" }}>
            <InputText
              id="password"
              type="password"
              value={userInfo.password}
              onChange={(e) => handleUserInfoChange("password", e.target.value)}
            />
          </div>
        </div>

        <div className={style["buttonContainer"]}>
          <Button label="회원정보 변경" onClick={handleSaveUserInfo} />
          <div>
            <Link to="/password-change">
              <Button label="비밀번호 변경" />
            </Link>
          </div>
          <Button label="탈퇴" onClick={handleSaveUserInfo} />
        </div>
      </div>
    </div>
  );
};

export default UserInfoTab;
