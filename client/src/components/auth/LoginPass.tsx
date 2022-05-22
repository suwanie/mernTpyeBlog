import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { InputChange, FormSubmit } from "../../utils/TypeScript";
import { login } from "../../redux/action/authAction";

function LoginPass() {
  // account와 password를 개별 state로 관리하지 않는구나?
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);

  const { account, password } = userLogin;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  return (
    <form onSubmit={handleSubmit}>
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
          />

          {/* 클릭했을 때 참 거짓을 계속 바꿔준다. */}
          <small onClick={() => setTypePass(!typePass)}>
            {/* 클릭했을때 true가 되면서 Show(비밀번호가 text로 보이게 된다 )가 된다. */}
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 mt-4"
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
}

export default LoginPass;
