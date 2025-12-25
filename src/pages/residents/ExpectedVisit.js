import React, { useState } from "react";
import PageNav from "../../components/PageNav";

export default function ExpectedVisit() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    purpose: ""
  });

  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("");

    const res = await fetch(`${backend}/api/residents/visits/expected`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Failed to add visitor");
      return;
    }

    setMsg("✅ Expected visitor added successfully");
    setForm({ name: "", mobile: "", purpose: "" });
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <PageNav backTo="/residents/dashboard" backLabel="Back" />

      <h4 className="mb-3">Add Expected Visitor</h4>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={submit} className="card p-3 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Visitor Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={e => setForm({ ...form, mobile: e.target.value })}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Purpose"
          value={form.purpose}
          onChange={e => setForm({ ...form, purpose: e.target.value })}
          required
        />

        <button className="btn btn-success w-100">
          Create Expected Visit
        </button>
      </form>
    </div>
  );
}
