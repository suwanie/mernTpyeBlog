import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";
export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootReducer = ReturnType<typeof rootReducer>;

export interface IParams {
  page?: string;
  slug?: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

// 오호.. 이렇게 상속시키면 account와 password를 따로 안적어줘도 되는구나?
export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}

export interface IALERT {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}
