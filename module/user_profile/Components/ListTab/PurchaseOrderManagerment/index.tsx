import React from "react";
import "./index.scss";
import {Tabs, TabsProps} from "antd";
import {TableBuy} from "@app/module/user_profile/Components/TableBuy";

export function PurchaseOrderManagerment(): JSX.Element {
  const onChange = (key: string) => {
    console.log(key);
  };
  const key = "buy";

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: `TẤT CẢ`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "1",
      label: `CHỜ XÁC NHẬN`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "2",
      label: `ĐANG XỬ LÍ`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "3",
      label: `ĐANG GIAO`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "4",
      label: `HOÀN THÀNH`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "5",
      label: `ĐÃ HUỶ`,
      children: <TableBuy keyPage={key} />,
    },
    {
      key: "6",
      label: `HOÀN LẠI`,
      children: <TableBuy keyPage={key} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
    </div>
  );
}
