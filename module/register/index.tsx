import React from "react";
import "./index.scss";
import {Formik} from "formik";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {InputGlobal, InputPasswordGlobal} from "@app/components/InputGlobal";
import {
  MailOutlined,
  PhoneOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import ApiUser from "@app/api/ApiUser";
import {useMutation} from "react-query";
import {useRouter} from "next/router";
import {notification} from "antd";

interface UserAccount {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
}

export function Register(): JSX.Element {
  const router = useRouter();
  // const isRemember = useSelector(
  //   (state: IRootState) => state.remember.isRemember
  // );

  const initialValues: UserAccount = {
    name: "",
    password: "",
    phoneNumber: "",
    email: "",
  };

  const register = useMutation(ApiUser.register);
  const handleRegister = async (value: UserAccount): Promise<void> => {
    console.log("vcalue", value);
    await register.mutate(
      {
        name: value.name.trim(),
        email: value.email.trim(),
        phoneNumber: value.phoneNumber.trim(),
        password: value.password.trim(),
        // has_role: true,
      },
      {
        onSuccess: (res: any) => {
          notification.success({
            message: "Đăng kí thành công",
            duration: 3,
          });
          router.push("/login");

          if (res !== undefined) {
            console.log("res register", res);
          }
          console.log("ssss");
          // const dataUser = {
          //   accessToken: res.response.access_token,
          //   expires_in: res.response.expires_in,
          //   role: res.role,
          //   pass_jwt: res.response.pass_jwt,
          // };
          // dispatch(loginUser(dataUser));
          // router.push("/");
        },
        onError: (res) => {
          console.log("ddd", res);
          notification.error({
            message: "Đăng kí thất bại, vui lòng thử lại",
            duration: 3,
          });
        },
      }
    );
  };

  // const handleCheckRemember = (checked: boolean): void => {
  //   if (checked) {
  //     dispatch(rememberAccount());
  //     sessionStorage.removeItem("isRemember");
  //   } else {
  //     dispatch(noRememberAccount());
  //     sessionStorage.setItem("isRemember", "false");
  //   }
  // };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validateOnChange
      validateOnBlur
      // validationSchema={LoginValidation}
    >
      {({handleSubmit}): JSX.Element => {
        return (
          <div className="page-register-container">
            <div className="title-login-form">
              <span style={{fontWeight: 600}}>Đăng kí</span>
              <UserOutlined style={{marginLeft: 5}} />
            </div>
            <span className="text-logo">Chợ sách cũ</span>
            <div className="login-container">
              <div className="login-form-item">
                <InputGlobal
                  name="name"
                  placeholder="Username"
                  prefix={<UserOutlined />}
                  className="input_login"
                  onPressEnter={(): void => handleSubmit()}
                />
                <ErrorMessageGlobal name="username" />
              </div>
              <div className="login-form-item">
                <InputGlobal
                  name="email"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  className="input_login"
                  onPressEnter={(): void => handleSubmit()}
                />
                <ErrorMessageGlobal name="email" />
              </div>
              <div className="login-form-item">
                <InputGlobal
                  name="phoneNumber"
                  placeholder="Phone number"
                  prefix={<PhoneOutlined />}
                  className="input_login"
                  onPressEnter={(): void => handleSubmit()}
                />
                <ErrorMessageGlobal name="phone number" />
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

              <ButtonGlobal
                onClick={handleSubmit}
                className="btn-login"
                title="Đăng kí"
                type="primary-filled"
                loading={register.isLoading}
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
