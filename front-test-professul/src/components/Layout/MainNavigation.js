import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./MainNavigation.module.css";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"; // Button 컴포넌트를 import 합니다.
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../util/logout";
import { logout } from "../../redux/slices/authSlice";
export default function MainHeader() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userName = useSelector((state) => state.auth.user?.name);
  console.log(user);
  const isMainPage = location.pathname === "/";
  const items = isMainPage
    ? []
    : [{ label: "Home", icon: "pi pi-home", url: "/" }]; // 메인 페이지가 아니면 홈 버튼만 표시
  const handleLogoutClick = async () => {
    await handleLogout(dispatch);
    navigate("/");
  };
  const start = <img alt="logo" height="40" className="mr-2"></img>;

  const end = (
    <React.Fragment>
      {isMainPage ? (
        isLoggedIn ? (
          <>
            <span className="userName">{`안녕하세요, ${userName}님`}</span>
            <Button
              label="마이페이지"
              icon="pi pi-user"
              className={style.myPageButton}
              onClick={() => (window.location.href = "/mypage")}
            />
            <Button
              label="로그아웃"
              icon="pi pi-sign-out"
              className={style.logoutButton}
              onClick={handleLogoutClick}
            />
          </>
        ) : (
          <>
            <Button
              label="로그인"
              icon="pi pi-user"
              className={style.loginButton}
              onClick={() => (window.location.href = "/login")}
            />
            <Button
              label="회원가입"
              icon="pi pi-users"
              className={`${style.signUpButton}`}
              onClick={() => (window.location.href = "/join")}
            />
          </>
        )
      ) : (
        <InputText
          placeholder="Search"
          type="text"
          className="w-8rem sm:w-auto"
        />
      )}
    </React.Fragment>
  );

  return (
    <div className={style["card"]}>
      <Menubar
        model={items}
        start={start}
        end={end}
        className={`${style["custom-menubar"]} ${
          !isMainPage ? style["nonMainPageMenubar"] : ""
        }`}
      />
    </div>
  );
}
