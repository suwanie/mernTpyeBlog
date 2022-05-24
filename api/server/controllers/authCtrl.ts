import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken";

import { sendSms } from "../config/sendSMS";
import sendEmail from "../config/sendMail";

import { validateEmail, validPhone } from "../middleware/valid";
import { IDecodedToken, IUser } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  //유저 등록 => 겹치는게 있는지 확인하기 위해 findOne!!
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user) {
        return res.status(400).json({ msg: "이미 메일 존재하는디 ? " });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      // new Users 인스턴스를 지워버림
      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;
      if (validateEmail(account)) {
        sendEmail(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email." });
      } else if (validPhone(account)) {
        sendSms(account, url, "Verify your phone number");
        return res.json({ msg: "Success! Please check your phone number." });
      }
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },

  // 새로시작 .. ㅎ 5강부터 =>authRouter도 해준다.
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      //<IToken> 이건 뭐지??
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      //IToken에 newUser:INewUser가 있는거 알지?
      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });
      const user = await Users.findOne({ account: newUser.account });
      if (user)
        return res
          .status(400)
          .json({ msg: "This account alreay exists - authCtrl 68" });
      const new_user = new Users(newUser);
      await new_user.save();
      res.json({ msg: "Account has been activated" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });
      if (!user)
        return res.status(400).json({ msg: "This account does not exits" });

      // if user exits
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });
      return res.json({ msg: "Logged out!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login Now" });
      //decoded =>해독하다, (컴퓨터가)해독하다, (외국어를 읽고 들어)이해하다(encode).
      //encode =>암호로 바꾸다, 부호화하다, (외국어로)표현하다(말하다, 글을 쓰다.)
      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded.id) return res.status(400).json({ msg: "Please Login Now" });

      const user = await Users.findById(decoded.id).select("-password");

      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

//이걸 왜 밖으로 뺐을까?
const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 1000, // 30dasy
  });

  res.json({
    msg: "Login Success!",
    access_token,
    //_doc은 interface에서 IUser에 추가해줬더니 에러가 사라짐
    user: { ...user._doc, password: "" },
  });
};

export default authCtrl;
