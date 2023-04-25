import React, {useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {Formik} from "formik";
import {Input, message, Upload} from "antd";
import {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {UploadChangeParam} from "antd/es/upload";
import "./index.scss";

export function ModalEdit(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const initialValues: any = {
    username: "",
    password: "",
    remember: false,
    pass_jwt: "",
  };
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Tải ảnh lên</div>
    </div>
  );
  const handleChangeUploadImage: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
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
  const handleLogin = (value: any): void => {};
  return (
    <div>
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
              <div className="item-formik">
                <div className="title-text">
                  <span>Tên sách</span>
                </div>
                <div className="action-item">
                  <Input placeholder="Nhập tên sách" />
                </div>
              </div>
              <div className="item-formik">
                <div className="title-text">
                  <span>Mô tả</span>
                </div>
                <div className="action-item">
                  <Input placeholder="Nhập mô tả" />
                </div>
              </div>
              <div className="item-formik">
                <div className="title-text">
                  <span>Tải ảnh lên</span>
                  <span className="require">*</span>
                </div>
                <div className="action-item">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUploadImage}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{width: "100%"}}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
