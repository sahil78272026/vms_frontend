import React, { useEffect, useState, useCallback } from "react";
import PageNav from "../../components/PageNav";
import { useNavigate  } from "react-router-dom";

export default function Dashboard() {
  const [visits, setVisits] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const load = useCallback(async () => {
    const res = await fetch(`${backend}/api/residents/me/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(data);
    setVisits(data);
  }, [backend, token]);

  async function action(id, type) {
    const token = localStorage.getItem("token");
    await fetch(`${backend}/api/residents/visit/${id}/${type}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }
  useEffect(() => {
    load();
  }, [backend, load]);
  return (
    <div className="container mt-4">
      <PageNav backTo="/" backLabel="Home Page" />

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/residents/visits/expected")}
      >
        ➕ Add Expected Visitor
      </button>
      <h3>Pending Visitors</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Purpose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id}>
              <td>{v.visitor_name}</td>
              <td>{v.mobile}</td>
              <td>{v.purpose}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => action(v.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => action(v.id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
