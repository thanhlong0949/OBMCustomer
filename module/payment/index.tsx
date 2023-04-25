import React from "react";
import "./index.scss";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {Icon} from "@app/components/Icon";
import {Avatar, Badge, Button, Image, Input} from "antd";
import {
  BankOutlined,
  CheckCircleFilled,
  CommentOutlined,
  PoundOutlined,
  ProfileOutlined,
  SwitcherOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useRouter} from "next/router";
import {BreakCrumGlobal} from "@app/components/BreakCrumGlobal";

const {TextArea} = Input;
export function Payment(): JSX.Element {
  const router = useRouter();
  const {keyPage} = router.query;
  console.log("sss", keyPage);
  const data = {
    name: "Áo khoác thời trang 007",
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
    description: "bìa cứng, mua lẻ",
    transport: "Giao hàng nhanh",
    phoneNumber: "0379544861",
    address: "Quận 2, TPHCM",
    total: "500.316VNĐ",
  };
  const listBreakcrum = ["Trang chủ", "Tất cả sách", "Trao đổi", "Trao đổi"];
  const listBreakcrumTrade = ["Trang chủ", "Tất cả sách", "Bán", "Thanh toán"];
  return (
    <div className="payment-container">
      <Navbar />
      <div className="main">
        <BreakCrumGlobal
          listBreakcrum={
            keyPage !== "Trao đổi" ? listBreakcrumTrade : listBreakcrum
          }
        />
        <div>
          <h2>{keyPage !== "Trao đổi" ? "Thanh toán" : "Trao đổi"}</h2>
          <div className="location-given">
            <div className="title">
              <div className="location-text">
                <Icon icon="location" size={20} color="#1890FF" />
                <span>Địa chỉ Người nhận</span>
              </div>
              <span className="change">THAY ĐỔI</span>
            </div>
            <div className="detail">
              <div>
                <span>Ho Vinh Duy</span>
                <span style={{margin: "0 4px"}}>|</span>
                <span>0379999999</span>
              </div>
              <p>
                38 nguyen thi ding, phuong Muong Thanh, Thanh pho Dien Bien Phu
              </p>
            </div>
          </div>
          <div className="item-book">
            <div className="items">
              <div className="items-user">
                <div style={{display: "flex"}}>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <div className="name-user">
                    <Badge
                      size="small"
                      count="Người bán: Nguyễn Văn A"
                      color="green"
                    />
                  </div>
                </div>
                <div className="chat">
                  <CommentOutlined style={{color: "#52C41A"}} />
                  <span>Chat</span>
                </div>
              </div>
              <div className="items-book">
                <div className="image">
                  <Image
                    width={85}
                    height={100}
                    src={data?.image}
                    preview={false}
                  />
                </div>
                <div className="infor-book">
                  <div className="infor-left">
                    <div className="name">{data?.name}</div>
                    <div className="des">{data?.description}</div>
                    <div className="price">{data?.total}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cost-of-payment">
            <div className="title">
              <BankOutlined style={{color: "orange", fontSize: 20}} />
              <span>
                <b>
                  {keyPage !== "Trao đổi"
                    ? "Số tiền thanh toán"
                    : "Số tiền đặt cọc"}{" "}
                </b>
              </span>
            </div>
            <div className="detail">
              <h4>{keyPage !== "Trao đổi" ? "THANH TOÁN" : "TRAO ĐỔI"}</h4>
              <b>30.000đ</b>
              <p>
                {keyPage !== "Trao đổi" ? "Thanh toán" : "Trao đổi"} toàn bộ số
                tiền
              </p>
            </div>
            <div className="notifi">
              <CheckCircleFilled
                style={{marginRight: 4, marginLeft: 4, color: "#26a541"}}
              />
              <span>
                Số tiền {keyPage !== "Trao đổi" ? "thanh toán" : "trao đổi"}{" "}
                được đảm bảo trong 7 ngày hoặc đến khi bạn nhận được hàng
              </span>
            </div>
          </div>
          <div className="delivery-method">
            <div className="title">
              <ThunderboltOutlined style={{color: "orange"}} />
              <span>
                <b>Phương thức Giao hàng</b>
              </span>
            </div>
            <div className="detail">
              <PoundOutlined style={{color: "orange", marginRight: 5}} />
              <span>Tự thoả thuận phí giao hàng</span>
            </div>
          </div>
          <div className="payment-method">
            <div className="title">
              <SwitcherOutlined style={{color: "orange", fontSize: 20}} />
              <span>
                <b>Phương thức thanh toán</b>
              </span>
            </div>
          </div>
          <div className="payment-accept">
            <span className="row1">
              <b>Thông tin Thanh toán</b>
            </span>
            <div className="row2">
              <div>Số tiền</div>
              <div>30.000đ</div>
            </div>
            <div style={{overflow: "hidden"}}>
              ............................................................................................................................................................................................................................................................................................................................................................
            </div>
            <div className="row3">
              <div className="title">Tổng thanh toán</div>
              <div className="detail">
                <b>30.000đ</b>
              </div>
            </div>
            <div className="row4">
              <div className="title">
                <ProfileOutlined style={{fontSize: 19, marginRight: 5}} />
                <span>
                  <b style={{fontSize: 15}}>Ghi chú</b>
                </span>
              </div>
              <TextArea
                placeholder="Nhập ghi chú cho người bán"
                autoSize={{minRows: 3, maxRows: 5}}
              />
            </div>
            <div className="button">
              <Button type="primary">
                {" "}
                {keyPage !== "Trao đổi" ? "ĐẶT HÀNG" : "TRAO ĐỔI"}{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
