import React, {useState} from "react";
import "./index.scss";
import {Input, Radio, Upload} from "antd";
import {Formik} from "formik";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;
export function Complaint(): JSX.Element {
  const [value, setValue] = useState(1);
  const [isChangeInfor, setIsChangeInfor] = useState<boolean>(false);

  const handleCancel = (): void => {
    setIsChangeInfor(!isChangeInfor);
  };
  const handleSave = (): void => {};

  const addressList = [
    {
      title: "Tiêu đề",
      placeholder: "Nhập tiêu đề",
      type: "input",
      require,
    },
    {
      title: "Mô tả",
      placeholder: "Nhập mô tả",
      type: "text-area",
      require,
    },
    {
      title: "Mã đơn hàng",
      placeholder: "Khác",
      type: "input",
      require,
    },
  ];

  const initialValues = {
    username: "",
    password: "",
    remember: false,
    pass_jwt: "",
  };
  return (
    <div className="complaint-container">
      <h2>TẠO KHIẾU NẠI</h2>
      <div className="main">
        <div className="address">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            validateOnChange
            validateOnBlur
            // validationSchema={LoginValidation}
          >
            {({handleSubmit}): JSX.Element => {
              return (
                <div className="formik-address-tab-container">
                  <div className="address-tab-container">
                    {addressList.map((item, index) => (
                      <div key={index}>
                        {item.type === "input" && (
                          <div className="form-item">
                            <div className="title">
                              <span>{item.title}:</span>
                              {item.require && (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: 3,
                                    fontSize: 15,
                                  }}
                                >
                                  *
                                </span>
                              )}
                            </div>
                            <div className="item-detail">
                              <InputGlobal
                                name="username"
                                placeholder={item.placeholder}
                                // prefix={<UserOutlined />}
                                className="input_login"
                                onPressEnter={(): void => handleSubmit()}
                              />
                            </div>
                            <ErrorMessageGlobal name="username" />
                          </div>
                        )}
                        {item.type === "text-area" && (
                          <div className="form-item">
                            <div className="title">
                              <span>{item.title}:</span>
                              {item.require && (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: 3,
                                    fontSize: 15,
                                  }}
                                >
                                  *
                                </span>
                              )}
                            </div>
                            <div className="item-detail">
                              <TextArea
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Nhập mô tả"
                                autoSize={{minRows: 3, maxRows: 5}}
                              />
                            </div>
                            <ErrorMessageGlobal name="username" />
                          </div>
                        )}
                        {item.type === "radio" && (
                          <div className="form-item">
                            <div className="title">
                              <span>{item.title}:</span>
                              {item.require && (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: 3,
                                    fontSize: 15,
                                  }}
                                >
                                  *
                                </span>
                              )}
                            </div>
                            <div className="item-detail">
                              <Radio.Group
                                onChange={item.onChangeRadio}
                                value={value}
                              >
                                {item.radioList &&
                                  item.radioList.map((itemRadio, index) => (
                                    <Radio key={index} value={itemRadio.value}>
                                      {itemRadio.label}
                                    </Radio>
                                  ))}
                              </Radio.Group>
                            </div>
                            <ErrorMessageGlobal name="username" />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="form-item">
                      <div className="title">
                        <span>Ảnh mô tả:</span>
                        <span
                          style={{
                            color: "red",
                            marginLeft: 3,
                            fontSize: 15,
                          }}
                        >
                          *
                        </span>
                      </div>
                      <div className="item-detail">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList
                          maxCount={1}
                          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          // beforeUpload={beforeUpload}
                          // onChange={handleChange}
                        >
                          {/* {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{width: "100%"}}
                                />
                              ) : (
                                uploadButton
                              )} */}
                          <PlusOutlined />
                        </Upload>
                      </div>
                      <ErrorMessageGlobal name="username" />
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="lineHorizoltal" />
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <div style={{display: "flex"}}>
          <div style={{marginRight: 5}}>
            <ButtonGlobal
              onClick={handleCancel}
              className="btn-cancel"
              title="Huỷ"
              // loading={login.isLoading}
            />
          </div>
          <ButtonGlobal
            onClick={handleSave}
            className="btn-save"
            title="Gửi"
            type="primary-filled"
            // loading={login.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
