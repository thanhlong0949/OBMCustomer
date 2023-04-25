import React, {useState} from "react";
import "./index.scss";
import {DownOutlined, RightOutlined} from "@ant-design/icons";

export default function DropdownGlobal(): JSX.Element {
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const handleSelectSubCate = (): void => {
    setIsSelect(!isSelect);
  };
  return (
    <div className="dropdown-global-container">
      <span onClick={handleSelectSubCate}>Tiểu Thuyết</span>
      {!isSelect ? <RightOutlined /> : <DownOutlined />}
    </div>
  );
}
