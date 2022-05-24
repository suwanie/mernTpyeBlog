import { useState } from "react";
import { useDispatch } from "react-redux";
import { InputChange, FormSubmit } from "../../utils/TypeScript";
import { register } from "../../redux/action/authAction";
import { useAppDispatch } from "../../redux/hook";
function RegisterForm() {
  const initialState = { name: "", account: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = useState(initialState);

  const { name, account, password, cf_password } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        {/* htmlFor땜시 저 부분을 누르면 자동으로 input창으로 넘어가게 된다. */}
        <label htmlFor="account" className="form-label">
          {" "}
          Name{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          placeholder="Your name is up to 20 chars."
        />
      </div>

      <div className="form-group mb-3">
        {/* htmlFor땜시 저 부분을 누르면 자동으로 input창으로 넘어가게 된다. */}
        <label htmlFor="account" className="form-label">
          Email / Phone number
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          placeholder="Example@naver.com/+821071962013"
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>

        <div className="pass">
          <input
            // typePass의 기본값을 false로 했는데, 이럴거면 이걸 왜만들지?
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            placeholder="Password must be at least 6chars."
          />

          {/* 클릭했을 때 참 거짓을 계속 바꿔준다. */}
          <small onClick={() => setTypePass(!typePass)}>
            {/* 클릭했을때 true가 되면서 Show(비밀번호가 text로 보이게 된다 )가 된다. */}
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          ConfirmPassword
        </label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="Your confirm password."
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 my-2">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
