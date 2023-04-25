import React, {useEffect, useState} from "react";
import "./index.scss";
import {
  Radio,
  Upload,
  Form,
  Input,
  DatePicker,
  Button,
  notification,
} from "antd";
import {PlusOutlined, LoadingOutlined} from "@ant-design/icons";
import ApiUser from "@app/api/ApiUser";
import {upLoadImage} from "@app/utils/firebase/uploadImage";
import moment from "moment";
import store from "@app/redux/store";

export function UserInfor(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>();

  const handleSubmit = (dataNew: any) => {
    const putData = {
      ...dataNew,
      id: store.getState()?.user?.id,
      dob: moment(dataNew.dob).format("YYYY-MM-DD"),
      imageUrl: imageUrl,
      email: undefined,
      password: store.getState()?.user?.password,
    };
    ApiUser.updateUser(putData)
      .then((res: any) => {
        notification.success({
          message: "Sửa thông tin thành công",
        });
        setData({
          ...res,
          dob: moment(res.dob),
        });
        setImageUrl(res?.imageUrl);
      })
      .catch(() => {
        notification.error({
          message: "Sửa thông tin thất bại",
        });
      });
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

  useEffect(() => {
    ApiUser.getUser().then((res) => {
      setData({
        ...res,
        dob: moment(res.dob),
      });
      setImageUrl(res?.imageUrl);
    });
  }, []);
  return (
    <div className="user-profile-tab-container">
      <h3>THÔNG TIN TÀI KHOẢN</h3>
      {data && (
        <div style={{width: "60%", margin: "12px auto"}}>
          <Form
            name="basic"
            labelAlign="left"
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            onFinish={(data) => {
              handleSubmit(data);
            }}
            onValuesChange={() => {
              setIsEdit(true);
            }}
            initialValues={data}
            autoComplete="off"
            colon={false}
            id="form-profile"
          >
            <Form.Item
              label="Avatar"
              name="imageUrl"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
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
              label="Họ và tên"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="name"
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Email"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="email"
            >
              <Input disabled placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="gender"
            >
              <Radio.Group name="gender">
                <Radio value={"nam"}>Nam</Radio>
                <Radio value={"nữ"}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              rules={[{required: true, message: "Vui lòng nhập trường này"}]}
              name="dob"
              initialValue={data?.dob}
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                style={{width: "100%"}}
                format={["DD-MM-YYYY"]}
              />
            </Form.Item>
          </Form>
          <div className="btn" style={{textAlign: "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isEdit}
              style={{marginTop: "24px", textAlign: "center"}}
              form="form-profile"
            >
              Sửa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
