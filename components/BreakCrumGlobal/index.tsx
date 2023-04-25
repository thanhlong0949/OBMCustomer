import React from "react";
import {Breadcrumb} from "antd";

interface IBreakCrumGlobal {
  listBreakcrum: string[];
}
export function BreakCrumGlobal(props: IBreakCrumGlobal): JSX.Element {
  const {listBreakcrum} = props;
  return (
    <div>
      <Breadcrumb>
        {listBreakcrum.map((item, index) => (
          <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}
