import { Request, Response, NextFunction } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;

  const err = [];

  if (!name) {
    err.push("이름을 넣어주렴.");
  } else if (name.length > 20) {
    err.push("20자 넘기지 말라고, 뒤질래?");
  }

  // email과 phone number는 따로해야하지 않을까?..
  if (!account) {
    err.push("이메일이나 폰번호 이새캬 ");
  } else if (!validPhone(account) && !validateEmail(account)) {
    err.push("이상한데 너의 번호와 이메일?");
  }
  //usermodel에서 minlength를 지정해줘서 어쩌면 될지도?
  if (password.length < 6) {
    err.push("6글자 이상 해봐 ..쫌");
  }

  if (err.length > 0) return res.status(400).json({ msg: err });

  next();
};

// 여기 잘 모르겠..
export function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
