import React, {useEffect, useState} from "react";
import "./index.scss";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {Button, Image, Input, Select} from "antd";
import {
  CheckCircleFilled,
  DollarCircleOutlined,
  HeartOutlined,
  MoneyCollectOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useRouter} from "next/router";
import {BreakCrumGlobal} from "@app/components/BreakCrumGlobal";
import ApiBook from "@app/api/ApiBook";
import moment from "moment";
import {getMoneyFormat} from "@app/utils/convert/ConvertHelper";

export function DetailBook(): JSX.Element {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  // const [imagePreview, setImagePreview] = useState<any>([]);
  const [dataCurrent, setDataCurent] = useState<any>();
  const [imageCurent, setImageCurent] = useState<any>();
  const keyPage = router.query.key.toString();
  // console.log("keyPage", keyPage);
  // const imagePreview = [
  //   {
  //     url: "https://bizweb.dktcdn.net/100/415/039/products/dac-nhan-tam-biamem2019-76k-bia1.jpg?v=1625125173703",
  //   },
  //   {
  //     url: "https://salt.tikicdn.com/cache/280x280/ts/product/05/3f/91/9e0157711ad88490a2497018aaf79bad.png.webp",
  //   },
  //   {
  //     url: "https://salt.tikicdn.com/cache/280x280/ts/product/15/28/5d/d086661715806b0cd6053f2a40c5e1a4.jpg.webp",
  //   },
  // ];

  const goToPayment = (value: string): void => {
    router.push({
      pathname: "/payment",
      query: {keyPage: keyPage},
    });
  };

  const handleGetBook = (book: any) => {
    const tmp = data.find((el: any) => el.bookId === book.bookId);
    setDataCurent(tmp);
    setImageCurent(book.bookImages[0]?.url);
  };

  const handleListImage = () => {
    return data.map((el: any, index: number) => (
      <div className="item-book" onClick={() => handleGetBook(el)} key={index}>
        <Image
          width={50}
          height={70}
          preview={false}
          src={el.bookImages[0]?.url}
        />
      </div>
    ));
  };

  useEffect(() => {
    if (router.query.postId) {
      ApiBook.getBookDetail(router.query.postId as string).then((res: any) => {
        setData(res);
        setDataCurent(res[0]);
        setImageCurent(res[0].bookImages[0]?.url);
      });
    }
  }, [router.query]);

  return (
    <div className="detail-book-container-new">
      <Navbar />
      <div className="self-book">
        <BreakCrumGlobal
          listBreakcrum={
            keyPage.toLowerCase() === "bán"
              ? ["Trang chủ", "Mua sách"]
              : ["Trang chủ", "Trao đổi sách"]
          }
        />
        <div className="main">
          <div className="image-book">
            <div className="icon">
              <div className="group-icon">
                <ShareAltOutlined style={{fontSize: "25px", width: "45px"}} />
                <HeartOutlined style={{fontSize: "25px"}} />
              </div>
            </div>
            <div className="image">
              <div style={{display: "flex", justifyContent: "center"}}>
                <Image
                  width={200}
                  height={260}
                  preview={false}
                  src={imageCurent}
                />
              </div>
              <div className="horizontalLine" />
              <div className="group-image-preview">{handleListImage()}</div>
            </div>
          </div>
          <div className="detail-book">
            <h2 style={{color: "#333"}}>{dataCurrent?.name}</h2>
            {keyPage.toLowerCase() === "bán" ? (
              <div className="price">
                <span style={{marginLeft: "5px"}}>
                  {getMoneyFormat(dataCurrent?.price) ?? 0}VND
                </span>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => goToPayment("Bán")}
                  type="primary"
                  icon={<MoneyCollectOutlined />}
                >
                  Trao đổi
                </Button>
                <Button
                  style={{marginLeft: 7}}
                  type="primary"
                  onClick={() => router.push("/chat-seller")}
                >
                  Chat với người bán
                </Button>
              </div>
            )}

            {keyPage.toLowerCase() === "bán" ? (
              <div className="button-sale">
                <Button
                  type="primary"
                  onClick={() => goToPayment("Mua")}
                  icon={<MoneyCollectOutlined />}
                >
                  Mua ngay
                </Button>
                <Button
                  style={{marginLeft: 7}}
                  type="primary"
                  onClick={() => router.push("/chat-seller")}
                >
                  Chat với người bán
                </Button>
              </div>
            ) : (
              <div />
            )}

            <div className="group-text">
              <div className="row-text">
                <div className="title">Ngày xuất bản</div>
                <div className="detail">
                  {moment(dataCurrent?.publicationDate).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className="row-text">
                <div className="title">Loại bìa</div>
                <div className="detail">{dataCurrent?.coverType}</div>
              </div>
              <div className="row-text">
                <div className="title">Tình trạng</div>
                <div className="detail">{dataCurrent?.statusQuo}</div>
              </div>
              <div className="row-text">
                <div className="title">Thể loại</div>
                <div className="detail">{dataCurrent?.subcategoryName}</div>
              </div>
              <div className="row-text">
                <div className="title">Tác giả</div>
                <div className="detail">{dataCurrent?.author}</div>
              </div>
              <div className="row-text">
                <div className="title">Ngôn ngữ</div>
                <div className="detail">{dataCurrent?.language}</div>
              </div>
              {keyPage !== "bán" && (
                <div>
                  {/* <div className="row-text">
                    <div className="title">Thể loại sách</div>
                    <div className="detail">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{width: "50%"}}
                        placeholder="Please select"
                        onChange={() => console.log("select category")}
                        options={dataList}
                      />
                    </div>
                  </div> */}
                  <div className="row-text">
                    <div className="title">Tên sách</div>
                    <div className="detail">
                      <Input />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="description">
          <div className="left">
            <h3>Mô tả</h3>
            <p>{dataCurrent?.description}</p>
            <div className="row-info">
              <span>{moment(dataCurrent?.createAt).format("DD-MM-YYYY")}</span>
            </div>
          </div>
          <div className="right">
            <h3>Liên hệ</h3>
            <div className="row1">
              <div className="icon">
                <UserOutlined style={{fontSize: 20}} />
              </div>
              <div className="detail-icon">
                <h4>{dataCurrent?.userName}</h4>
                <CheckCircleFilled
                  style={{marginRight: 4, marginLeft: 4, color: "#26a541"}}
                />
                <h5>Xác thực</h5>
              </div>
            </div>
            {/* <div className="row1">
              <div className="icon">
                <GlobalOutlined style={{fontSize: 20}} />
              </div>
              <div className="detail-icon">
                <h5>North West Delhi (110009), DELHI</h5>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
