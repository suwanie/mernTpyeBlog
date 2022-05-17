import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "이름 입력좀;"],
      trim: true,
      maxLength: [20, "무슨 이름이 20글자가 넘어"],
    },
    account: {
      type: String,
      required: [true, "제발 이메일이나 폰번호 적어"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "비밀번호도 없이 하겠다?"],
      minlength: [6, "20개 이상 플리즈"],
    },
    avatar: {
      type: String,
      default:
        "http://file3.instiz.net/data/cached_img/upload/2021/07/01/23/78d6fe3eedee51cff3ceff169ceb3f20.jpg",
    },
    role: {
      type: String,
      default: "user", //admin
    },
    type: {
      type: String,
      default: "register", //login
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
