import React, {useState} from "react";
import "./index.scss";
import {ColumnsType} from "antd/es/table";
import {Image, Modal, Switch, Table} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import ItemBook from "@app/components/ItemBook/ItemBook";
import {ModalEdit} from "@app/module/user_profile/Components/ListTab/HistoryPost/Components/ModalEdit";

interface DataType {
  key: string;
  name: string;
  image: string;
  address: string;
  description: string;
  transport: string;
  phoneNumber: string;
  total: string;
}

export function HistoryPost(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <ItemBook data={record} />,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: () => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div onClick={showModal} style={{marginLeft: 8}}>
            <EditOutlined style={{fontSize: 22, color: "blue"}} />
          </div>
        </div>
      ),
      fixed: "right",
      width: 120,
    },
  ];
  const data: any = [
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      status: "Đã bán",
    },
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      status: "Đã trao đổi",
    },
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      time_created: "12/02/2023",
      status: "Còn hàng",
    },
  ];

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="item-trade-buy-container">
      <FilterGroupGlobal listSearchText={listSearchText} />
      <Table style={{marginTop: 10}} columns={columns} dataSource={data} />
      <Modal
        title="Chỉnh sửa bài đăng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalEdit />
      </Modal>
    </div>
  );
}
