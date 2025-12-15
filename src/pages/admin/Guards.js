import React, { useEffect, useState } from "react";

export default function AdminGuards() {
  const [guards, setGuards] = useState([]);
  const [form, setForm] = useState({ name: "", mobile: "", password: "" });

  const token = localStorage.getItem("token");
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    fetch(`${backend}/api/admin/guards`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setGuards(data));
  }, [backend, token]);

  async function addGuard(e) {
    e.preventDefault();

    const res = await fetch(`${backend}/api/admin/guards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Error creating guard");
    }
  }

  async function toggleGuard(id) {
    await fetch(`${backend}/api/admin/guards/${id}/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    setGuards(gs =>
      gs.map(g =>
        g.id === id ? { ...g, is_active: !g.is_active } : g
      )
    );
  }

  return (
    <div className="container mt-4">
      <h3>👮 Manage Guards</h3>

      <form onSubmit={addGuard} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Mobile"
          onChange={e => setForm({ ...form, mobile: e.target.value })}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-dark">Add Guard</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {guards.map(g => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.mobile}</td>
              <td>
                {g.is_active ? (
                  <span className="text-success">Active</span>
                ) : (
                  <span className="text-danger">Inactive</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => toggleGuard(g.id)}
                >
                  {g.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
