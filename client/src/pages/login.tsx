import LoginPass from "../components/auth/LoginPass";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [sms, setSms] = useState(false);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <small className="col-6">
            <Link to="/forgot_password" className="col-6">
              Forgot password
            </Link>
          </small>

          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          You don't have an accout? &nbsp;
          <Link to={`/register`} style={{ color: "crimson" }}>
            {/* 걍 글만써도 되는데 왜 이렇게 하지? */}
            {`Register Now`}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
