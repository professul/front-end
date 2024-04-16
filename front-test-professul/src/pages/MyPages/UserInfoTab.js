import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import style from "./UserInfoTab.module.css";
import { logout, userWithdrawl } from "../../redux/slices/authSlice";
const UserInfoTab = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user.userId);

  const handleWithdrawal = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await dispatch(userWithdrawl(user.userId)).unwrap();

        dispatch(logout());
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("탈퇴 처리중 오류 발생", error);
        alert("탈퇴 처리 중 오류가 발생했습니다");
      }
    }
  };

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
        <Button label="탈퇴" onClick={handleWithdrawal} />
      </div>
    </div>
  );
};

export default UserInfoTab;
