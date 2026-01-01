import React, { useEffect, useState, useCallback } from "react";

export default function AdminMaintenance() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState([]);

  const load = useCallback(async () => {
    const res = await fetch(`${backend}/api/maintenance/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPayments(await res.json());
  },  [backend, token]);

  async function approve(id) {
    await fetch(`${backend}/api/maintenance/${id}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    load();
  }

  useEffect(() => {
    load();
  }, [backend, load]);

  return (
    <div className="container mt-4">
      <h3>Pending Maintenance Payments</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Resident</th>
            <th>Flat</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Proof</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.resident}</td>
              <td>{p.flat}</td>
              <td>{p.year}</td>
              <td>₹{p.amount}</td>
              <td>
                {p.proof && (
                  <a
                    href={`${backend}/api/uploads/${p.proof}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => approve(p.id)}
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
