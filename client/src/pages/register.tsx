import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForn";
function Register() {
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Register</h3>
        <RegisterForm />
        <p>
          {`Already have an account?`} &nbsp;
          <Link to={`/login`} style={{ color: "crimson" }}>
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
