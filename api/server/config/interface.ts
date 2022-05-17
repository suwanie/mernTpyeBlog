import { Document } from "mongoose";

// model에 있는거 하나씩 가져옴 그리고 userModel에 팔아버린다.
export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IDecodedIToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}
