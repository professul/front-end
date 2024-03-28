import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import SignUpForm from "./SignUpForm";
import style from "./Signup.module.css";
import { signUp } from "../../redux/slices/signupSlice";
import { useDispatch, useSelector } from "react-redux";
const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data, form) => {
      try {
        await dispatch(signUp(data)).unwrap();
        setFormData(data); // 사용자가 입력한 데이터를 상태에 저장
        setShowMessage(true); // 성공 메시지 표시
        form.restart(); // 폼 초기화는 성공 후에 수행
      } catch (err) {
        console.error("회원가입 실패:", err);
      }
    },
    [dispatch]
  );

  const onHideDialog = () => {
    setShowMessage(false); // 메시지 창을 닫습니다.
    navigate("/login"); // 로그인 페이지로 이동합니다.
  };

  return (
    <div className={style["form-demo"]}>
      <Dialog
        visible={showMessage}
        onHide={onHideDialog}
        position="top"
        showHeader={true}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            <b>{formData.name}</b>님, 회원가입을 진심으로 축하드립니다! 계정이
            성공적으로 생성되었습니다. 서비스를 자유롭게 이용해 주세요.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className={style["card"]}>
          <h2>회원가입</h2>
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
