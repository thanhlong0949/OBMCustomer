import React, {ReactElement} from "react";
import "./index.scss";
import {Menu} from "antd";
import type {MenuProps} from "antd/es/menu";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface ISideBarUserProfile {
  TabListUserProfile: {
    tabName: string;
    key: string;
    icon: ReactElement;
  }[];
  setKeyTab?: any;
}

export function SideBarUserProfile(props: ISideBarUserProfile): JSX.Element {
  const {TabListUserProfile, setKeyTab} = props;
  const convertItem = (): MenuProps["items"] => {
    const items: MenuItem[] = [];
    TabListUserProfile.map((item, index) =>
      items.push(getItem(item.tabName, item.key, item.icon))
    );
    return items;
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setKeyTab(e.key);
  };
  return (
    <div className="side_bar_user_profile_container">
      <h2 style={{color: "red", paddingLeft: 20, paddingTop: 10}}>Tài khoản</h2>
      <Menu
        onClick={onClick}
        style={{width: 256}}
        defaultSelectedKeys={["UserInfor"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        items={convertItem()}
      />
    </div>
  );
}
