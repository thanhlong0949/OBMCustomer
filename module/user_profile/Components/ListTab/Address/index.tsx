import React, {useEffect, useState} from "react";
import "./index.scss";
import {Modal, List, Form, Input, Button, notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import ApiAddress from "@app/api/ApiAddress";
import store from "@app/redux/store";

export function Address(): JSX.Element {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [dataCurrent, setDataCurrent] = useState<any>({});
  const [openModal, setOpenModal] = useState<any>();
  const handleCancel = (): void => {
    setOpenModal("");
    setDataCurrent({});
    setIsEdit(false);
  };
  const handleSave = (dataNew: any): void => {
    if (openModal === "new") {
      const postData = {
        ...dataNew,
        userId: store.getState()?.user?.id,
      };
      ApiAddress.creatAddress(postData).then((res) => {
        if (res) {
          notification.success({
            message: "Tạo địa chỉ thành công",
          });
          ApiAddress.getAllAddress().then((res: any) => {
            setData(res);
          });
          handleCancel();
        } else {
          notification.error({
            message: "Tạo địa chỉ thất bại!",
          });
        }
      });
    } else if (openModal === "edit") {
      const putData = {
        ...dataNew,
        addressId: dataCurrent?.id,
        userId: store.getState()?.user?.id,
      };
      ApiAddress.updateAddress(putData).then((res: any) => {
        if (res) {
          handleCancel();
          ApiAddress.getAllAddress().then((res: any) => {
            setData(res);
          });
        } else {
          notification.error({
            message: "Tạo địa chỉ thất bại!",
          });
        }
      });
    }
  };

  const handleDeleteAddress = ({id}: {id: string | number}) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa địa chỉ",
      content: "Dữ liệu đã xóa không thể khôi phục",
      onOk: () => {
        console.log(id);
        ApiAddress.deleteAddress(id).then((res) => {
          if (res) {
            notification.success({
              message: "Xóa địa chỉ thành công",
            });
            ApiAddress.getAllAddress().then((res: any) => {
              setData(res);
            });
          } else {
            notification.error({
              message: "Xóa địa chỉ thất bại!",
            });
          }
        });
      },
    });
  };

  useEffect(() => {
    ApiAddress.getAllAddress().then((res: any) => {
      setData(res);
    });
  }, []);

  return (
    <div className="address-tab-container">
      <h3>Danh sách địa chỉ</h3>
      <div className="" style={{textAlign: "right"}}>
        <Button type="primary" onClick={() => setOpenModal("new")}>
          Thêm địa chỉ
        </Button>
      </div>
      <div className="lineHorizoltal" />
      <div style={{}}>
        <List
          dataSource={data ?? []}
          renderItem={(item: any, index) => (
            <List.Item>
              <div className="item" style={{width: "100%", display: "flex"}}>
                <div className="item-left" style={{width: "80%"}}>
                  <div className="province">
                    <span className="text-bold">Tỉnh:</span>{" "}
                    {item?.province ?? "Chưa xác định"}
                  </div>
                  <div className="city">
                    <span className="text-bold">Thành phố:</span>{" "}
                    {item?.city ?? "Chưa xác định"}
                  </div>
                  <div className="district">
                    <span className="text-bold">Quận/Huyện:</span>{" "}
                    {item?.district ?? "Chưa xác định"}
                  </div>
                  <div className="ward">
                    <span className="text-bold">Xã/Phường:</span>{" "}
                    {item?.ward ?? "Chưa xác định"}
                  </div>
                  <div className="street">
                    <span className="text-bold">Địa chỉ cụ thể:</span>{" "}
                    {item?.street ?? "Chưa xác định"}
                  </div>
                </div>
                <div
                  className="item-right"
                  style={{width: "20%", display: "flex", alignItems: "center"}}
                >
                  <EditFilled
                    className="icon-edit"
                    onClick={() => {
                      setOpenModal("edit");
                      setDataCurrent(data[index]);
                    }}
                  />
                  <DeleteFilled
                    className="icon-delete"
                    onClick={() => {
                      handleDeleteAddress(data[index]);
                    }}
                  />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={"Sổ địa chỉ"}
        open={!!openModal}
        onCancel={handleCancel}
        closeIcon
        cancelText="Hủy"
        okText="Lưu địa chỉ"
        width={600}
        destroyOnClose
        okButtonProps={{
          htmlType: "submit",
          form: "form-address",
          disabled: !isEdit,
        }}
      >
        <Form
          name="basic"
          labelAlign="left"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          onFinish={(data) => {
            handleSave(data);
          }}
          onValuesChange={() => {
            setIsEdit(true);
          }}
          initialValues={dataCurrent}
          autoComplete="off"
          colon={false}
          id="form-address"
        >
          <Form.Item
            label="Tỉnh"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="province"
          >
            <Input placeholder="Nhập tỉnh" />
          </Form.Item>
          <Form.Item label="Thành phố" name="city">
            <Input placeholder="Nhập thành phố" />
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="district"
          >
            <Input placeholder="Nhập Quận/Huyện" />
          </Form.Item>
          <Form.Item
            label="Xã/Phường"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="ward"
          >
            <Input placeholder="Nhập Xã/Phường " />
          </Form.Item>
          <Form.Item
            label="Địa chỉ cụ thể"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="street"
          >
            <Input placeholder="Tên đường/thôn xóm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
