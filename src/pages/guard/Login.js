import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuardLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/guard/login`, {
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
    localStorage.setItem("role", "guard");

    navigate("/guard/dashboard");
  }

  return (
    <div className="container mt-4">
      <h3>Guard Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={login} className="card p-3">
        <input
          className="form-control mb-2"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
