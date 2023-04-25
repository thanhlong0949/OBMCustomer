import React from "react";
import "./index.scss";
import {ColumnsType} from "antd/es/table";
import {Image, Table} from "antd";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import ItemBook from "@app/components/ItemBook/ItemBook";

interface ITableBuy {
  keyPage?: string;
}
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

export function TableBuy(props: ITableBuy): JSX.Element {
  const {keyPage} = props;
  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
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
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <ItemBook keyPage={keyPage} data={record} />,
    },
  ];
  const data: any = [
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      transport: "Giao hàng nhanh",
      phoneNumber: "0379544861",
      address: "Quận 2, TPHCM",
      total: "500.316VNĐ",
    },
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      transport: "Giao hàng nhanh",
      phoneNumber: "0379544861",
      address: "Quận 2, TPHCM",
      total: "500.316VNĐ",
    },
    {
      name: "Áo khoác thời trang 007",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "bìa cứng, mua lẻ",
      transport: "Giao hàng nhanh",
      phoneNumber: "0379544861",
      address: "Quận 2, TPHCM",
      total: "500.316VNĐ",
    },
  ];
  return (
    <div className="item-trade-buy-container">
      <FilterGroupGlobal listSearchText={listSearchText} />
      <Table style={{marginTop: 10}} columns={columns} dataSource={data} />
    </div>
  );
}
