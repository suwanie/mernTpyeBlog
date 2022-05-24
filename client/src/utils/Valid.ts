import { IUserRegister } from "./TypeScript";

// 값이 객체여서 data: 이렇게 콜론으로 넣는건가?
export const ValidRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister;
  const err = [];

  if (!name) {
    err.push("이름을 넣어주렴.");
  } else if (name.length > 20) {
    err.push("20자 넘기지 말라고, 뒤질래?");
  }

  if (!account) {
    err.push("이메일이나 폰번호 이새캬 ");
  } else if (!validPhone(account) && !validateEmail(account)) {
    err.push("이상한데 너의 번호와 이메일?");
  }

  if (password.length < 6) {
    err.push("6글자 이상 해봐 ..쫌");
  } else if (password !== cf_password) {
    err.push("Confirm password did not match.");
  }

  return {
    errMsg: err,
    errLength: err.length,
  };
};

export function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
