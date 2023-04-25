import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {useRouter} from "next/router";
import ApiBook from "@app/api/ApiBook";
interface ContentProps {
  children: React.ReactNode;
}

export default function Content({children}: ContentProps): JSX.Element {
  return (
    <div className="content">
      <div>{children}</div>
    </div>
  );
}
