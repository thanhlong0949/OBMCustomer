import React, {useState} from "react";
import "../../index.scss";
import {
  Button,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Select,
  Upload,
  Form,
  DatePicker,
} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
// import type {UploadChangeParam} from "antd/es/upload";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import moment from "moment";
import {useRouter} from "next/router";
import {upLoadImage} from "@app/utils/firebase/uploadImage";
import {uuidv4} from "@firebase/util";

interface ISelfSetBook {
  handleReset: () => void;
  setListBook: any;
  setKeyPage: any;
}

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
export default function SelfOneBook(props: ISelfSetBook): JSX.Element {
  const {handleReset, setListBook, setKeyPage} = props;
  const router = useRouter();
  // const [sellOrTrade, setSellOrderTrade] = useState<string>("");
  // const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleCancel = (): void => {
    // setSellOrderTrade("");
    handleReset();
  };
  const handleSubmit = (data: any): void => {
    setListBook((prev: any) => [
      ...prev,
      {
        ...data,
        key: uuidv4(),
        bookImages: [imageUrl],
        publicationDate: moment(data.publicationDate).format("YYYY-MM-DD"),
      },
    ]);
    setKeyPage("view");
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
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    // setValue(e.target.value);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <div
        style={{marginBottom: 20, display: "flex", justifyContent: "flex-end"}}
      >
        <Button
          onClick={handleReset}
          style={{
            marginRight: "5px",
          }}
          type="primary"
        >
          Quay lại
        </Button>
      </div>
      <Form
        name="basic"
        labelAlign="left"
        labelCol={{span: 7}}
        wrapperCol={{span: 17}}
        initialValues={{}}
        onFinish={(val) => {
          // console.log(val)
          handleSubmit(val);
        }}
        // onValuesChange={(val) => setData({...data, ...val})}
        // onFinishFailed={() => {}}
        autoComplete="off"
        colon={false}
        id="form-book"
      >
        <Form.Item label="ISBN" name="isbn">
          <Input placeholder="Nhập ISBN" />
        </Form.Item>
        <Form.Item
          label="Tên sách"
          required
          name="name"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập tên sách" />
        </Form.Item>
        <Form.Item
          label="Loại bìa"
          required
          name="coverType"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập loại bìa" />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          required
          name="author"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập tác giả" />
        </Form.Item>
        <Form.Item
          label="Ngôn ngữ"
          required
          name="language"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập ngôn ngữ" />
        </Form.Item>
        <Form.Item
          label="Nhà xuất bản"
          required
          name="publicCompany"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập nhà xuất bản" />
        </Form.Item>
        <Form.Item
          label="Ngày xuất bản"
          required
          name="publicationDate"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <DatePicker
            placeholder="Chọn ngày xuất bản"
            style={{width: "100%"}}
            format={["DD-MM-YYYY"]}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          required
          name="description"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item
          label="Tình trạng sách"
          required
          name="statusQuo"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
          initialValue={"Còn mới"}
        >
          <Radio.Group name="statusQuo">
            <Radio value={"Còn mới"}>Còn mới</Radio>
            <Radio value={"Đã qua sử dụng"}>Đã qua sử dụng</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Tình trạng sách"
          required
          name="bookImages"
          rules={[{required: true, message: "Vui lòng nhập trường này"}]}
        >
          <Upload
            name="url"
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
      </Form>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button onClick={handleCancel} style={{marginRight: "5px"}}>
          Hủy
        </Button>
        <Button
          style={{marginRight: "5px"}}
          type="primary"
          htmlType="submit"
          form="form-book"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
