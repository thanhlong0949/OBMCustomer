import React, {useContext, useEffect, useState} from "react";
import {
  Avatar,
  Button,
  Image,
  Input,
  Dropdown,
  Space,
  Modal,
  Form,
  notification,
} from "antd";
import {
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
  LockOutlined,
} from "@ant-design/icons";
import {useRouter} from "next/router";
import {Icon} from "@app/components/Icon";
import Config from "@app/config";
// import store from "@app/redux/store";
import {useSelector} from "react-redux";
import {logout} from "@app/api/Fetcher";
import ApiUser from "@app/api/ApiUser";
import {useAuthState} from "react-firebase-hooks/auth";
import {authFirebase} from "@app/firebase/config";
import {ContextSearchHome} from "@app/components/Layout/Sidebar/ContextProvider/ContextSearchHome";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  // const [search, setSearch] = useState<string>();
  // const [defaultSeach, setDefaultSeach] = useState(router.query.search);
  const user = useSelector((state: any) => state.user);
  const avatar = user?.imageUrl;
  const [form] = Form.useForm();
  const [userSocial, setUserSocial] = useAuthState(authFirebase);
  const {setSearchHomeListBook} = useContext(ContextSearchHome);
  const [valueChangeSearch, setValueChangeSearch] = useState("null");
  const handleSearch = (valueSearch: any): void => {
    // setValueChangeSearch(valueSearch.target.value);
    setSearchHomeListBook(
      valueSearch.target.value.length === 0 ? "null" : valueSearch.target.value
    );
  };

  const toPageSearch = (): void => {
    // if (valueChangeSearch.length === 0) {
    //   setSearchHomeListBook(
    //     valueChangeSearch.length === 0 ? "null" : valueChangeSearch
    //   );
    // }
    // console.log("toPageSearch");
    router.push(`/`);
  };
  const toSelfBook = (): void => {
    if (user?.id) {
      router.push(`/self_book`);
    } else {
      Modal.confirm({
        title: "Tính năng này cần đăng nhập",
        content: "Bạn có muốn đăng nhập không?",
        onOk: () => {
          router.push(`/login`);
        },
      });
    }
  };
  const goToHomePage = (): void => {
    router.push("/home");
  };
  const goToLoginPage = (): void => {
    router.push("/login");
  };
  const goToRegisterPage = (): void => {
    router.push("/register");
  };
  const goToUserProfile = (): void => {
    router.push("/user_profile");
  };

  // useEffect(() => {
  //   setDefaultSeach(router.query.search);
  // }, [router.query]);

  const validateConfirmPassword = ({getFieldValue}: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Mật khẩu nhập lại không khớp"));
    },
  });

  const handleChangePass = (data: any) => {
    const putData = {
      ...data,
      email: user?.email,
    };
    ApiUser.changePass(putData).then((res) => {
      if (res) {
        notification.success({
          message: "Đổi mật khẩu thành công",
        });
        setOpenModal(false);
      } else {
        notification.error({
          message: "Đổi mật khẩu thất bại",
        });
      }
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="" onClick={() => router.push("/user_profile")}>
          Thông tin cá nhân
        </div>
      ),
      icon: <InfoCircleOutlined />,
    },
    {
      key: "2",
      label: (
        <div
          className=""
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Đổi mật khẩu
        </div>
      ),
      icon: <LockOutlined />,
    },
    {
      key: "3",
      label: (
        <div
          className=""
          onClick={() => {
            const showConfirm = () => {
              Modal.confirm({
                title: "Bạn chắc chắn muốn đăng xuất?",
                icon: <ExclamationCircleFilled />,
                onOk() {
                  if (userSocial) {
                    authFirebase.signOut();
                    notification.success({
                      message: "Đăng xuất thành công",
                      duration: 3,
                    });
                  } else {
                    logout();
                    router.push("/");
                  }
                },
                onCancel() {
                  // console.log('Cancel');
                },
              });
            };
            showConfirm();
          }}
        >
          Đăng xuất
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="navbar" style={{height: Config.HEIGHT_NAVBAR}}>
      <div onClick={goToHomePage} className="logo">
        <Image width={80} height={40} preview={false} src="/logo.jpg" />
      </div>
      <div className="search-navbar">
        <Input
          placeholder="Tìm Kiếm Sách ..."
          className="input-search"
          prefix={<SearchOutlined />}
          // value={valueChangeSearch === "null" ? "" : valueChangeSearch}
          onChange={handleSearch}
        />
        <div onClick={toPageSearch} className="button-search">
          <Button>Tìm kiếm</Button>
        </div>
        <div onClick={toSelfBook} className="button-self-book">
          <Button>Bán sách</Button>
        </div>
      </div>
      <div className="action-navbar">
        <Icon icon="Bell" size={15} color="white" />
        <div className="contact-navbar">
          <span className="text-contact">Liên Hệ</span>
          <PhoneOutlined style={{color: "white"}} />
        </div>
        <div className="author-navbar">
          {user?.accesstoken ? (
            <div className="author-infor">
              <Dropdown menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar icon={<UserOutlined />} src={avatar} />
                    {user.name.slice(0, 15) +
                      (user.name?.length > 15 ? "..." : "")}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : userSocial ? (
            <Dropdown menu={{items}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar icon={<UserOutlined />} src={userSocial.photoURL} />
                  {userSocial.displayName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <div className="author-login-resgister">
              <span onClick={goToLoginPage} className="text-hover">
                Đăng nhập
              </span>
              <span className="vertical">|</span>
              <span onClick={goToRegisterPage} className="text-hover">
                Đăng kí
              </span>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Đổi mật khẩu"
        open={openModal}
        destroyOnClose
        footer={[]}
        onCancel={() => setOpenModal(false)}
        width={600}
      >
        <Form
          name="basic"
          labelAlign="left"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={(data) => {
            handleChangePass(data);
          }}
          style={{padding: "8px"}}
          form={form}
          autoComplete="off"
          colon={false}
          id="form-changePass"
        >
          <Form.Item
            label="Mật khẩu cũ"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="oldPassword"
          >
            <Input placeholder="Nhập mật khẩu cũ" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {required: true, message: "Vui lòng nhập trường này"},
              {min: 6, message: "Mật khẩu có độ dài tối thiểu 6 kí tự"},
            ]}
          >
            <Input placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            rules={[
              {required: true, message: "Vui lòng nhập trường này"},
              {min: 6, message: "Mật khẩu có độ dài tối thiểu 6 kí tự"},
              validateConfirmPassword,
            ]}
            name="confirmPassword"
          >
            <Input placeholder="Nhập lại mật khẩu" />
          </Form.Item>
        </Form>
        <div className="btn" style={{textAlign: "center", marginTop: "24px"}}>
          <Button htmlType="submit" form="form-changePass" type="primary">
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
}
