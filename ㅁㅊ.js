import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";

import { sendSms } from "../config/sendSMS";
import sendEmail from "../config/sendMail";

import { validateEmail, validPhone } from "../middleware/valid";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  //유저 등록 => 겹치는게 있는지 확인하기 위해 findOne!!
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user) {
        return res.status(400).json({ msg: "이미 존재하는디 ? " });
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
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // 새로시작 .. ㅎ 5강부터 =>authRouter도 해준다.
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = jwt.verify(
        active_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );

      console.log(decoded);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
};

export default authCtrl;
