import React, { useState } from "react";
import { Link } from "react-router-dom";
import { residentLogin } from "../../api/auth";
import PageNav from "../../components/PageNav";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      const data = await residentLogin(mobile, pw);

      // ✅ success
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", "resident");


      window.location.href = "/";
    } catch (error) {
      /**
       * residentLogin should throw with:
       * { status, message }
       */
      if (error.status === 403) {
        setErr("Your account is pending admin approval.");
      } else if (error.status === 401) {
        setErr("Invalid mobile number or password.");
      } else {
        setErr("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <PageNav backTo="/" backLabel="Back" />

      <h3 className="mb-3">Resident Login</h3>

      {err && <div className="alert alert-danger">{err}</div>}

      <form onSubmit={submit} className="card p-3 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="text-center mt-3">
        <small>
          New resident?{" "}
          <Link to="/residents/register">
            Register here
          </Link>
        </small>
      </div>
    </div>
  );
}
