import React, { useEffect, useState } from "react";
import GateToggle from "./GateToggle";
import { replace, useNavigate } from "react-router-dom";

export default function GuardDashboard() {
  const [visits, setVisits] = useState([]);
  const token = localStorage.getItem("token");
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/");

  }

  useEffect(() => {
    fetch(`${backend}/api/guards/visits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVisits(data);
      });
  }, [backend, token]);

  async function allowEntry(id) {
    const res = await fetch(
      `${backend}/api/guards/visit/${id}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setVisits(prev =>
        prev.map(v =>
          v.id === id ? { ...v, status: "ENTERED" } : v
        )
      );
    } else {
      alert("Visitor not approved yet");
    }
  }

  return (
    <div className="container mt-4">
      {/* 🔝 TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">👮 Guard Dashboard</h3>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Mobile</th>
            <th>Flat</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visits.map(v => (
            <tr key={v.id}>
              <td>{v.visitor_name}</td>
              <td>{v.mobile}</td>
              <td>{v.flat_number}</td>
              <td>{v.purpose}</td>
              <td>
                <span
                  className={
                    v.status === "APPROVED"
                      ? "text-success"
                      : v.status === "ENTERED"
                      ? "text-muted"
                      : v.status === "PENDING"
                      ? "text-warning"
                      : "text-danger"
                  }
                >
                  {v.status}
                </span>
              </td>
              <td>
                {v.status === "APPROVED" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => allowEntry(v.id)}
                  >
                    Allow Entry
                  </button>
                )}
                {v.status === "ENTERED" && "✔"}
                {v.status === "PENDING" && "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <GateToggle />
    </div>
  );
}
