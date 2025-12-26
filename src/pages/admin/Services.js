import React, { useEffect, useState, useCallback, useRef } from "react";

export default function AdminServices() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  // 🔒 Read token ONCE
  const tokenRef = useRef(localStorage.getItem("token"));

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    phone: ""
  });

  const load = useCallback(async () => {
    const res = await fetch(`${backend}/api/services`, {
      headers: {
        Authorization: `Bearer ${tokenRef.current}`
      }
    });

    const data = await res.json();
    setServices(data);
  }, [backend]); // ✅ token removed from deps

  async function submit(e) {
    e.preventDefault();

    await fetch(`${backend}/api/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenRef.current}`
      },
      body: JSON.stringify(form)
    });

    setForm({ name: "", type: "", phone: "" });
    load();
  }

  async function toggle(id) {
    await fetch(`${backend}/api/admin/services/${id}/toggle`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenRef.current}`
      }
    });

    load();
  }

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="container mt-4">
      <h3>Services</h3>

      {/* ADD SERVICE */}
      <form onSubmit={submit} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Service Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="form-select mb-2"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="">Select Type</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="carpenter">Carpenter</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />

        <button className="btn btn-primary">Add Service</button>
      </form>

      {/* LIST SERVICES */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.type}</td>
              <td>{s.phone}</td>
              <td>{s.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => toggle(s.id)}
                >
                  {s.is_active ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
