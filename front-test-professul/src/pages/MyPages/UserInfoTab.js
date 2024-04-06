import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import style from "./UserInfoTab.module.css";

const UserInfoTab = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={style["cardContainer"]}>
      <h5>회원 정보</h5>
      <div>
        <div className={style["field"]}>
          <label htmlFor="name3">이름</label>
          <div>{user.name}</div>
        </div>
        <div className={style["field"]}>
          <label htmlFor="email3">이메일</label>
          <div>{user.email}</div>
        </div>
      </div>
      <div className={style["buttonContainer"]}>
        <Link to="/password-check">
          <Button label="회원정보 변경" />
        </Link>
        <div>
          <Link to="/password-change">
            <Button label="비밀번호 변경" />
          </Link>
        </div>
        {/* <Button label="탈퇴" onClick={handleWithdrawal} /> */}
      </div>
    </div>
  );
};

export default UserInfoTab;
