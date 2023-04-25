import React from "react";
import "./item-book.scss";
import {Image, Avatar, Badge} from "antd";
import {UserOutlined} from "@ant-design/icons";

interface IItemBook {
  data?: any;
  keyPage?: string;
}
export default function ItemBook(props: IItemBook): JSX.Element {
  const {data, keyPage} = props;
  console.log("ssssssssw222", keyPage);
  console.log("daata", data);
  return (
    <div className="items">
      <div className="items-user">
        <Avatar size="small" icon={<UserOutlined />} />
        <div className="name-user">
          <Badge
            size="small"
            count={
              keyPage === "buy" ? "Người bán: Nguyễn Văn A" : "Nguyễn Văn A"
            }
            color="green"
          />
        </div>
      </div>
      <div className="items-book">
        <div className="image">
          <Image width={50} src={data?.image} preview={false} />
        </div>
        <div className="infor-book">
          <div className="infor-left">
            <div className="name">{data?.name}</div>
            <div className="des">{data?.description}</div>
          </div>
          <div className="infor-right">
            <div className="price">{data?.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
