import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import style from "./Signup.module.css";
import axios from "axios";
import { url } from "../../api/config";

const SignUp = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Name is required.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!data.accept) {
      errors.accept = "You need to agree to the terms and conditions.";
    }

    return errors;
  };

  const onSubmit = async (data, form) => {
    try {
      // 회원가입 데이터
      const signUpData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      // 서버에 회원가입 요청 보내기
      const response = await axios.post(`${url}/join`, signUpData);

      setShowMessage(true);
      form.restart();
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className={style["form-demo"]}>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
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
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              email: "",
              password: "",
              date: null,
              accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <div className={style["field"]}>
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          이름*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className={style["field"]}>
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className={style["field"]}>
                      <span className="p-float-label">
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="confirmPassword"
                  render={({ input, meta }) => (
                    <div className={style["field"]}>
                      <span className="p-float-label">
                        <Password
                          id="confirmPassword"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={<h6>Confirm Password</h6>}
                        />
                        <label
                          htmlFor="confirmPassword"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Confirm Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="accept"
                  type="checkbox"
                  render={({ input, meta }) => (
                    <div className="field-checkbox">
                      <Checkbox
                        inputId="accept"
                        {...input}
                        className={classNames({
                          "p-invalid": isFormFieldValid(meta),
                        })}
                      />
                      <label
                        htmlFor="accept"
                        className={classNames({
                          "p-error": isFormFieldValid(meta),
                        })}
                      >
                        I agree to the terms and conditions*
                      </label>
                    </div>
                  )}
                />
                <div className={style["button"]}>
                  <Button
                    type="submit"
                    label="가입하기"
                    className={style["mt-2"]}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
