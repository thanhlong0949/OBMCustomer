import React, {useEffect, useState} from "react";
import SelfOneBook from "@app/module/self_book/Components/SelfOneBook";
import {Button, Form, Image, Input, notification, Select, Upload} from "antd";
import {
  BarcodeOutlined,
  LoadingOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./indexPostToSelf.scss";
import ApiBook from "@app/api/ApiBook";
import {upLoadImage} from "@app/utils/firebase/uploadImage";
import ApiPost from "@app/api/ApiPost";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

export default function PostToTrade(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [keyPage, setKeyPage] = useState("view"); // view || post
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [idCategorySelect, setIdCategorySelect] = useState<any>();
  const [subcategory, setSubcategory] = useState<any>();
  const [listBook, setListBook] = useState([]);
  const [data, setData] = useState<any>();

  const handleReset = (): void => {
    setKeyPage("view");
  };

  const handleAddBook = (): void => {
    setKeyPage("post");
  };

  const handleDeleteBook = (book: any): void => {
    const bookNew = listBook.filter((el: any) => el.key !== book.key);
    setListBook(bookNew);
  };

  const handleChangeUploadImage = async (file: any) => {
    const link = await upLoadImage(file.file);
    setImageUrl(link);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Tải ảnh lên</div>
    </div>
  );

  const handleSubmit = (data: any) => {
    const postData = {
      ...data,
      form: "trao đổi",
      imageUrl: imageUrl,
      bookList: listBook,
      userId: user?.id,
    };
    ApiPost.creatPost(postData).then((res) => {
      if (res) {
        notification.success({
          message: "Tạo bài post thành công!",
        });
        router.push("/");
      }
    });
  };
  useEffect(() => {
    ApiBook.getCategoryDetail().then((res) => {
      setCategory(res);
    });
  }, []);

  useEffect(() => {
    if (idCategorySelect) {
      ApiBook.getSubcategoryDeatail(idCategorySelect).then((res) => {
        setSubcategory(res);
      });
    }
  }, [idCategorySelect]);
  return (
    <div className="post-to-self-container">
      {keyPage === "view" ? (
        <div>
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleReset}
              style={{
                marginRight: "5px",
              }}
              htmlType="submit"
              form="form-trade"
              type="primary"
              disabled={listBook.length === 0}
            >
              Đăng bài
            </Button>
            <Button
              onClick={handleAddBook}
              style={{
                marginRight: "5px",
              }}
              type="primary"
            >
              Thêm sách
            </Button>
          </div>
          <Form
            name="basic"
            labelAlign="left"
            labelCol={{span: 7}}
            wrapperCol={{span: 17}}
            onFinish={(data) => {
              handleSubmit(data);
            }}
            initialValues={data}
            onValuesChange={(value) => {
              setData({
                ...data,
                ...value,
              });
            }}
            autoComplete="off"
            colon={false}
            id="form-trade"
          >
            <Form.Item
              label="Danh mục sách"
              name="categoryId"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            >
              <Select
                allowClear
                fieldNames={{label: "name", value: "id"}}
                onChange={(val) => {
                  setIdCategorySelect(val);
                }}
                options={category}
                placeholder="Chọn danh mục sách"
              />
            </Form.Item>
            <Form.Item
              label="Thể loại sách"
              required
              name="subCategoryId"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            >
              <Select
                allowClear
                fieldNames={{label: "name", value: "id"}}
                options={subcategory}
                placeholder="Chọn thể loại sách"
              />
            </Form.Item>
            <Form.Item
              label="Tiêu đề bài đăng"
              required
              name="title"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            >
              <Input placeholder="Nhập tiêu đề" />
            </Form.Item>
            <Form.Item
              label="Ảnh bài đăng"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="imageUrl"
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(file) => handleChangeUploadImage(file)}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{width: "100%"}} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Giá gốc"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="initPrice"
            >
              <Input placeholder="Nhập giá gốc" />
            </Form.Item>
            <Form.Item
              label="Tên sách muốn trao đổi"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="bookExchange"
            >
              <Input placeholder="Nhập giá bán" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="location"
            >
              <Input placeholder="Số nhà - tên đường - phường/xã - quận/huyện - tỉnh/TP" />
            </Form.Item>
          </Form>
          {listBook.length > 0 && (
            <div className="home-list-book">
              {listBook.map((item: any, index) => (
                <div className="item-book" key={index}>
                  <div className="icon-delete">
                    <CloseCircleOutlined
                      onClick={() => handleDeleteBook(item)}
                    />
                  </div>
                  <Image
                    preview={false}
                    width={160}
                    height={160}
                    src={item?.bookImages[0]}
                  />
                  <div className="text-title">{item?.name}</div>
                  <div className="author">
                    Tác giả:{item?.author} - ({item?.statusQuo})
                  </div>
                  <div className="row-end">
                    <div>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <BarcodeOutlined />
                        <div className="text-align-center">{item?.isbn}</div>
                      </div>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <div className="text-align-center">
                          {item?.publicationDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <SelfOneBook
          setListBook={setListBook}
          setKeyPage={setKeyPage}
          handleReset={handleReset}
        />
      )}

      {/* {value === 2 && <SelfSetBook handleReset={handleReset} />} */}
    </div>
  );
}
