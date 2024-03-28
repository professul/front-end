// SignUpForm.js
import React from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import style from "./SignUpForm.module.css";
import { validateSignUpForm } from "../../util/validate";

const SignUpForm = ({ onSubmit }) => {
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) =>
    isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

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
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: "",
        email: "",
        password: "",
        date: null,
        accept: false,
      }}
      validate={validateSignUpForm}
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
            <Button type="submit" label="가입하기" className={style["mt-2"]} />
          </div>{" "}
        </form>
      )}
    />
  );
};

export default SignUpForm;
