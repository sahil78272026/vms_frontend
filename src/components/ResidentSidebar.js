import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResidentSidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  const [profile, setProfile] = useState({
    name: "",
    flat: ""
  });

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!token || role !== "resident") return;

    // 🔹 Load pending approvals
    fetch(`${backend}/api/residents/me/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPendingCount(data.length);
        }
      });

    // 🔹 Load resident profile
    fetch(`${backend}/api/residents/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name,
          flat: `Flat ${data.flat}`
        });
      });

  }, [token, role, backend]);

  // 🔓 Not logged in
  if (!token || role !== "resident") {
    return (
      <div className="card p-3">
        <h5>Resident Access</h5>
        <p className="text-muted">
          Login to approve visitors and manage your flat
        </p>

        <button
          className="btn btn-primary mb-2"
          onClick={() => navigate("/residents/login")}
        >
          Login
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/residents/register")}
        >
          Register
        </button>
      </div>
    );
  }

  // 🔐 Logged in resident
  return (
    <div className="card p-3">
      <h5>Welcome 👋</h5>

      <p className="mb-1">
        <strong>{profile.name}</strong>
      </p>

      <p className="text-muted">{profile.flat}</p>

      <div className="alert alert-warning">
        Pending Approvals: <strong>{pendingCount}</strong>
      </div>

      <button
        className="btn btn-success mb-2"
        onClick={() => navigate("/residents/dashboard")}
      >
        Visitors
      </button>

      <button
        className="btn btn-outline-primary w-100 mb-2"
        onClick={() => navigate("/residents/services")}
      >
        🔧 Society Services
      </button>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
