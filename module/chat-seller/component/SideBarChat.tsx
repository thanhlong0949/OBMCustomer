import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Avatar, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import classNames from "classnames";
import "./index.scss";

export default function SideBarChat() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const data = [
    {
      name: "Seller 1",
      sender: "Seller 1",
      content: "ok bạn.",
      avatar:
        "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg",
    },
    {
      name: "Seller 2",
      sender: "Seller 2",
      content: "Tôi có thể giúp gì cho bạn?",
      avatar: "",
    },
    {
      name: "Seller 3",
      sender: "Seller 3",
      content: "Tôi rất xin lỗi bạn.",
      avatar:
        "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg",
    },
    {
      name: "Seller 4",
      sender: "Seller 4",
      content: "Tôi có thể giúp gì cho bạn?",
      avatar:
        "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg",
    },
    {
      name: "Seller 5",
      sender: "Bạn",
      content: "Cảm ơn bạn rất nhiều.",
      avatar: "",
    },
    {
      name: "Seller 6",
      sender: "Bạn",
      content: "Rất vui khi được bạn tư vấn",
      avatar:
        "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg",
    },
    {
      name: "Seller 7",
      sender: "Bạn",
      content: "Rất vui khi được bạn tư vấn, mong có thể làm việc với bạn.",
      avatar:
        "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg",
    },
  ];

  useEffect(() => {
    router.push(`/chat-seller?seller=${data[0].name}`);
  }, []);

  const renderUser = () => {
    return data.map((el, index) => (
      <div
        className={classNames("user", {active: active === index})}
        key={index}
        onClick={() => {
          setActive(index);
          router.push(`/chat-seller?seller=${el.name}`);
        }}
      >
        <div className="user-left">
          <Avatar src={el.avatar} icon={<UserOutlined />} />
          <div className="status"></div>
        </div>
        <div className="user-right">
          <div className="name-user">{el.name}</div>
          <div className="mess-latest">
            <div className="sender">{el.sender}</div>:
            <div className="mess-content">{el.content}</div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="sidebar-chat">
      <div className="search">
        <Input.Search placeholder="Tìm kiếm" />
      </div>
      <div className="list-user">{renderUser()}</div>
    </div>
  );
}
