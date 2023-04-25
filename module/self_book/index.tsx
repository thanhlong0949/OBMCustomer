import React, {useState} from "react";
import "./index.scss";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  message,
  Upload,
  Button,
  TabsProps,
  Tabs,
} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import type {UploadChangeParam} from "antd/es/upload";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {useRouter} from "next/router";
import PostToSelf from "@app/module/self_book/Components/PostToSelf";
import PostToTrade from "@app/module/self_book/Components/PostToTrade";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
export function SelfBook(): JSX.Element {
  const onChangeTab = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Đăng bán`,
      children: <PostToSelf />,
    },
    {
      key: "2",
      label: `Trao đổi`,
      children: <PostToTrade />,
    },
  ];

  return (
    <div className="self-book-container">
      <Navbar />
      <div className="self-book">
        <div className="title-text">
          <p style={{fontSize: 20, fontWeight: "500"}}>Chi tiết sách</p>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </div>
    </div>
  );
}
