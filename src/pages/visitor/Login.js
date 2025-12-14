import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VisitorLogin() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login() {
    const res = await fetch("http://localhost:5000/api/auth/visitor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", "visitor");

    navigate("/visitor/dashboard");
  }

  return (
    <div className="container mt-4">
      <h3>Visitor Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control mb-2"
        placeholder="Mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default VisitorLogin;
