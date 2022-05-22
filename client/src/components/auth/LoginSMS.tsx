import React, { useState } from "react";

function LoginSMS() {
  const [phone, setPhone] = useState("");

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          onChange={(f) => setPhone(f.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100"
        disabled={phone ? false : true}
      >
        Login
      </button>
    </form>
  );
}

export default LoginSMS;
