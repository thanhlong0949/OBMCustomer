import {fetcher} from "./Fetcher";
import store from "../redux/store";

export interface ILoginBody {
  email: string;
  password: string;
}
export interface ILoginResponse {
  successCode?: string;
  data: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    imageUrl: string;
    dob: string;
    password: string;
    accesstoken?: string;
  };
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IGetUserResponse {
  id: number;
  name?: string;
  email?: string;
  phoneNumber?: string | null;
  gender?: string;
  imageUrl?: string;
  dob?: string;
  password?: string;
}

export interface IRegisterBody {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

const path = {
  getUser: "/auth/get-user-info-by-emai",
  login: "/auth/login",
  register: "/auth/register-user",
  updateUser: "/auth/update-user-infor",
  changePass: "/auth/change_password",
};

function register(body: IRegisterBody): Promise<never> {
  return fetcher({url: path.register, method: "post", data: body});
}

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher(
    {url: path.login, method: "post", data: body},
    {displayError: true}
  );
}

function getUser(): Promise<IGetUserResponse> {
  return fetcher({
    url: `${path.getUser}/${store.getState()?.user?.email}`,
    method: "get",
  });
}

function updateUser(data: any) {
  return fetcher({url: path.updateUser, method: "put", data: data});
}

function changePass(data: any) {
  return fetcher({url: path.changePass, method: "put", data: data});
}

function isLogin(): boolean {
  const {user} = store.getState();
  return !!user?.accesstoken;
}

export default {
  login,
  isLogin,
  getUser,
  register,
  updateUser,
  changePass,
};
