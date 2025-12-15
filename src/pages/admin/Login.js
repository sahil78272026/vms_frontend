import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../../components/PageNav";

export default function AdminLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  async function login(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${backend}/api/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", "admin");

    navigate("/admin/dashboard");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <PageNav backTo="/" backLabel="Back to Home" />
      <h3 className="mb-3">Admin Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={login} className="card p-3 shadow-sm">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">
          Login
        </button>
      </form>
    </div>
  );
}
