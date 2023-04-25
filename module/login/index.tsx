import React, {useEffect} from "react";
import "./index.scss";
import {Formik} from "formik";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {InputGlobal, InputPasswordGlobal} from "@app/components/InputGlobal";
import {
  FacebookOutlined,
  GoogleOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import ApiUser from "@app/api/ApiUser";
import {useMutation} from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useRouter} from "next/router";
import {notification} from "antd";
import {authFirebase} from "@app/firebase/config";
import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

interface UserAccount {
  email: string;
  password: string;
  pass_jwt: string;
}

export function Login(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useAuthState(authFirebase);
  const googleAuth = new GoogleAuthProvider();
  const handleLoginSocial = async () => {
    const result = await signInWithPopup(authFirebase, googleAuth);
  };
  useEffect(() => {
    console.log(user);
    console.log(user?.accessToken);
    if (user) {
      // dispatch(
      //   loginUser({
      //     id: user.uid,
      //     email: user.email,
      //     firstname: user.displayName,
      //     url_image: user?.photoURL,
      //     accesstoken: user?.accessToken,
      //   })
      // );
      notification.success({
        message: "Đăng nhập thành công",
        duration: 3,
      });
      router.push("/");
    }
  }, [user]);

  const initialValues: UserAccount = {
    email: "",
    password: "",
    pass_jwt: "",
  };

  const handleRegister = (): void => {
    router.push("/register");
  };

  const login = useMutation(ApiUser.login);
  const handleLogin = (value: UserAccount): void => {
    // router.push("/home");
    login.mutate(
      {
        email: value.email.trim(),
        password: value.password.trim(),
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          if (res) {
            dispatch(loginUser(res));
            router.push("/");
          } else {
            notification.error({
              message: "Tài khoản hoặc mật khẩu không chính xác",
            });
          }
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validateOnChange
      validateOnBlur
      // validationSchema={LoginValidation}
    >
      {({handleSubmit}): JSX.Element => {
        return (
          <div className="page-login-container">
            <div className="title-login-form">
              <span style={{fontWeight: 600}}>Đăng nhập</span>
              <UserOutlined style={{marginLeft: 5}} />
            </div>
            <span className="text-logo">Chợ sách cũ</span>
            <div className="login-container">
              <div className="login-form-item">
                <InputGlobal
                  name="email"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  className="input_login"
                  onPressEnter={(): void => handleSubmit()}
                />
                <ErrorMessageGlobal name="email" />
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
                {/* <CheckboxGlobal */}
                {/*  name="remember" */}
                {/*  checked */}
                {/*  onChange={(e): void => handleCheckRemember(e.target.checked)} */}
                {/* > */}
                {/*  Nhớ tài khoản */}
                {/* </CheckboxGlobal> */}
                <div>.</div>

                <div>
                  {/* <span */}
                  {/*  className="forgot-password_link" */}
                  {/*  style={{marginRight: 10}} */}
                  {/* > */}
                  {/*  Quên mật khẩu? */}
                  {/* </span> */}
                  <span
                    onClick={handleRegister}
                    className="forgot-password_link"
                  >
                    Đăng kí
                  </span>
                </div>
              </div>
              <div className="login-social-group" onClick={handleLoginSocial}>
                <div className="item-social">
                  <GoogleOutlined style={{fontSize: 30, color: "red"}} />
                  <span>Login by Google</span>
                </div>
              </div>

              <ButtonGlobal
                onClick={handleSubmit}
                className="btn-login"
                title="Đăng nhập"
                type="primary-filled"
                loading={login.isLoading}
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
