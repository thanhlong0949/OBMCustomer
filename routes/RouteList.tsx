import {ReactNode} from "react";
import {Icon} from "@app/components/Icon";

export interface IRoute {
  path: string;
  name: string;
  isSidebar: boolean;
  isLanding?: boolean;
  icon?: ReactNode;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/login",
    name: "Đăng nhập",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/user_profile",
    name: "Thông tin cá nhân",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/register",
    name: "Đăng Kí",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/home",
    name: "Trang chủ",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/manager_permission",
    name: "Quản lý phân quyền",
    isSidebar: true,
    isLanding: false,
  },
  {
    path: "/self_book",
    name: "Bán sách",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/detail_book",
    name: "Chi tiết sách",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/payment",
    name: "Thanh toán",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/manager_popup",
    name: "Quản lý Popup",
    isSidebar: true,
  },
  {
    path: "/list_posting",
    name: "Danh sách bài đăng",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/login_page",
    name: "Quản lý Popup",
    isSidebar: true,
  },
  {
    path: "/chat-seller",
    name: "chat seller",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/blogs",
    name: "Blogs",
    isSidebar: true,
    icon: <Icon icon="blog" size="40" />,
    children: [
      {
        path: "",
        name: "",
        isSidebar: false,
      },
    ],
  },
];

export default routes;
