import {FilterBookGlobal} from "@app/components/FilterBookGlobal";
import "./index.scss";
import {Carousel, Image, Button} from "antd";
import React from "react";
import {size} from "lodash";
import {
  DownloadOutlined,
  MessageOutlined,
  PhoneOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "250px",
  color: "#fff",
  lineHeight: "250px",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "10px",
};
export function ManagerPopup(): JSX.Element {
  const avatar =
    "https://images.pexels.com/photos/1442297/pexels-photo-1442297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div className="detail-book-container">
      {/* <FilterBookGlobal /> */}
      <div className="detail-book">
        <div className="info-book">
          <div className="box-carousel">
            <Carousel afterChange={onChange} autoplay>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    width={250}
                    src="https://images.pexels.com/photos/1442297/pexels-photo-1442297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </div>
          {/* <div className="text-info-book"> */}
          {/*  <h3>[SB39] Pass sách "Kỷ luật tự giác"</h3> */}
          {/*  <p>35.000đ</p> */}
          {/*  <p>-Thể loại:Self-help, kỹ năng sống, tư duy</p> */}
          {/*  <p>-Chủ đề: Phát triển bản thân</p> */}
          {/*  <p>-Tác giả: Tiểu dã</p> */}
          {/*  <p>-Giá gốc: 94.000đ</p> */}
          {/*  <p>-Tình Trạng: 95%</p> */}
          {/* </div> */}
        </div>
        <div className="detail-info-user">
          <div className="avatar-user">
            <Image
              style={{borderRadius: 50}}
              width={60}
              height={60}
              preview={false}
              src={avatar}
            />
          </div>
          <div className="info_detail">
            <div className="row1">
              <div className="name">
                <h3 style={{marginBottom: 0}}>Minh Thư</h3>
                <h5>Đang hoạt động</h5>
              </div>
              <Button shape="round">Xem trang</Button>
            </div>
            <h4 className="row2">Đánh giá</h4>
            <div className="row3">
              <StarOutlined />
              <StarFilled />
            </div>
            {/* <div className="row4"> */}
            {/*  <Button shape="round" icon={<PhoneOutlined />} size="large"> */}
            {/*    Liên hệ: 097xxxxxxxx */}
            {/*  </Button> */}
            {/* </div> */}
            {/* <div className="row5"> */}
            {/*  <Button shape="round" icon={<MessageOutlined />} size="large"> */}
            {/*    <span style={{marginRight: 7}}>Chat với người bán</span> */}
            {/*  </Button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
