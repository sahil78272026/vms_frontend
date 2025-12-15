import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "INFO",
    start_time: "",
    end_time: ""
  });

  async function submit(e) {
    e.preventDefault();

    await fetch(`${backend}/api/admin/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    alert("Announcement created");
    setForm({ title:"", description:"", type:"INFO", start_time:"", end_time:"" });
    navigate("/admin/dashboard")

  }

  return (
    <div className="container mt-4">
      <h3>Create Announcement</h3>

      <form onSubmit={submit} className="card p-3">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({...form, title:e.target.value})}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description:e.target.value})}
        />

        <select
          className="form-select mb-2"
          value={form.type}
          onChange={e => setForm({...form, type:e.target.value})}
        >
          <option value="INFO">Info</option>
          <option value="ALERT">Alert</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>

        <input type="datetime-local" className="form-control mb-2"
          onChange={e => setForm({...form, start_time:e.target.value})} />

        <input type="datetime-local" className="form-control mb-2"
          onChange={e => setForm({...form, end_time:e.target.value})} />

        <button className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
}
