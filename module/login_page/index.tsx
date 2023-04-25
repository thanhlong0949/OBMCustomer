import React from "react";
import "./index.scss";
import {Button} from "antd";
import {
  CheckboxGlobal,
  InputGlobal,
  InputPasswordGlobal,
} from "@app/components/InputGlobal";
import {UnlockOutlined, UserOutlined} from "@ant-design/icons";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import {Formik} from "formik";
import {
  noRememberAccount,
  rememberAccount,
} from "@app/redux/slices/RememberAccountSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

// import {useRouter} from "next/router";

export function LoginPage(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
    remember: false,
    pass_jwt: "",
  };
  const handleButton = (): void => {
    console.log("sss");
  };
  const handleCheckRemember = (checked: boolean): void => {
    if (checked) {
      dispatch(rememberAccount());
      sessionStorage.removeItem("isRemember");
    } else {
      dispatch(noRememberAccount());
      sessionStorage.setItem("isRemember", "false");
    }
  };
  const handleLogin = (): void => {
    router.push("/home");
  };
  return (
    <div className="login_page-container">
      <div className="filter_login-page">
        <Button
          type="primary"
          style={{borderRadius: 20}}
          onClick={handleButton}
        >
          Đăng Bán Sách
        </Button>
      </div>
      <div className="login_page-detail">
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit}): JSX.Element => {
            return (
              <div className="formik-login-container">
                <div className="title-login-form">
                  <span style={{fontWeight: 600}}>Đăng nhập</span>
                  <UserOutlined style={{marginLeft: 5}} />
                </div>
                <span className="text-logo">Chợ sách cũ</span>
                <div className="login-container">
                  <div className="login-form-item">
                    <InputGlobal
                      name="username"
                      placeholder="Username"
                      prefix={<UserOutlined />}
                      className="input_login"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="username" />
                  </div>

                  <div className="login-form-item">
                    <InputPasswordGlobal
                      name="password"
                      placeholder="Password"
                      prefix={<UnlockOutlined />}
                      className="input_login"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="password" />
                  </div>

                  <div className="forgot-password-wrap">
                    <CheckboxGlobal
                      name="remember"
                      checked
                      onChange={(e): void =>
                        handleCheckRemember(e.target.checked)
                      }
                    >
                      Nhớ tài khoản
                    </CheckboxGlobal>

                    <span className="forgot-password_link">Quên mật khẩu?</span>
                  </div>

                  <ButtonGlobal
                    onClick={handleSubmit}
                    className="btn-login"
                    title="Đăng nhập"
                    type="primary-filled"
                    // loading={login.isLoading}
                  />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
