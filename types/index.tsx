import React from "react";

export interface CommonReduxAction {
  type: string;
}

export interface CommonReactProps {
  children: React.ReactNode;
}

export interface IAccountInfo {
  id?: any;
  accesstoken?: string;
  expires_in?: number;
  role?: any;
  firstname?: string;
  email?: string;
  url_image?: string;
  pass_jwt?: string;
  refreshToken?: string;
  password?: string;
}

export interface ICategory {
  id?: number;
  name?: string;
  subcategoryList?: {
    id?: number;
    name?: string;
  }[];
}
