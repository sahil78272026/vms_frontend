import React, { useEffect, useState } from "react";

export default function PendingResidents() {
  const [residents, setResidents] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  async function load() {
    const res = await fetch(
      `${backend}/api/admin/residents/pending`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setResidents(data);
  }

  async function approve(id) {
    await fetch(
      `${backend}/api/admin/residents/${id}/approve`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    load(); // refresh list
  }

  useEffect(() => {
    load();
  }, [backend]);

  return (
    <div className="container mt-4">
      <h3>Pending Residents</h3>

      {residents.length === 0 && (
        <p className="text-muted">No pending approvals</p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Flat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {residents.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.mobile}</td>
              <td>{r.flat_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => approve(r.id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
