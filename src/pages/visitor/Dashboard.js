import React, { useEffect, useState } from "react";

export default function VisitorDashboard() {
  const [visits, setVisits] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    fetch(`${backend}/api/visitors/my-visits`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVisits(data);
        } else {
          setVisits([]);
        }
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Visit Requests</h3>

      {visits.length === 0 && (
        <div className="alert alert-info">No visits found</div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Flat</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>In Time</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id}>
              <td>{v.flat}</td>
              <td>{v.purpose}</td>
              <td>
                <span
                  className={`badge ${
                    v.status === "APPROVED"
                      ? "bg-success"
                      : v.status === "REJECTED"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {v.status}
                </span>
              </td>
              <td>{new Date(v.in_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
