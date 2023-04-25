import Avatar from "antd/lib/avatar/avatar";
import {
  UserOutlined,
  SearchOutlined,
  MoreOutlined,
  PlusCircleFilled,
  SendOutlined,
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "./index.scss";
import {Input} from "antd";

export default function ContentChat() {
  const [userName, setUserName] = useState<string | string[] | undefined>();
  const router = useRouter();
  const data = [
    {
      type: 0,
      mess: "bạn muốn tôi giúp bạn điều gì?",
    },
    {
      type: 1,
      mess: "Tôi muốn hỏi bạn về một số quyển sách.",
    },
    {
      type: 0,
      mess: "Vâng , Tôi rất sẵn lòng giúp bạn",
    },
    {
      type: 1,
      mess: "Bạn có thể giới thiệu cho tôi một số loại sách về lập trình được không?",
    },
    {
      type: 0,
      mess: "Vâng ở chỗ tôi có rất nhiều sách về lập trình, không biết bạn quan tâm đến ngôn ngữ lập trình nào?",
    },
    {
      type: 0,
      mess: "Bạn vui lòng cho tôi biết thêm thông tin.",
    },
    {
      type: 1,
      mess: "Tôi đang muốn tìm hiểu về lập trình web",
    },
    {
      type: 0,
      mess: "Vâng, đối với web chúng tôi các sách về cách xây dựng 1 trang web từ a-z.",
    },
    {
      type: 1,
      mess: "Vâng cảm ơn bạn.",
    },
    {
      type: 1,
      mess: "bạn có thể cho tôi biết giá của cuốn sách không?",
    },
  ];

  const handleRendermess = () => {
    return data.map((mess, index) => {
      if (mess.type) {
        return (
          <div className="mess-right">
            <div className="des-mess">{mess.mess}</div>
          </div>
        );
      } else {
        return (
          <div className="mess-left">
            <div className="mess-main">
              <Avatar icon={<UserOutlined />} />
              <div className="des-mess">{mess.mess}</div>
            </div>
          </div>
        );
      }
    });
  };

  useEffect(() => {
    const {seller} = router.query;
    setUserName(seller);
  }, [router.query]);

  return (
    <div className="content-chat">
      <div className="nav-chat">
        <div className="nav-left">
          <Avatar icon={<UserOutlined />} />
          <div className="name">{userName}</div>
        </div>
        <div className="nav-right">
          <SearchOutlined />
          <MoreOutlined />
        </div>
      </div>
      <div className="content-chat-mess">{handleRendermess()}</div>
      <div className="control-mess">
        <PlusCircleFilled />
        <Input size="small" placeholder="Type a message..." />
        <SendOutlined />
      </div>
    </div>
  );
}
