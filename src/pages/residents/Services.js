import React, { useEffect, useState } from "react";

export default function Services() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const [type, setType] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const url = type
      ? `${backend}/api/services?type=${type}`
      : `${backend}/api/services`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setServices);
  }, [type, backend, token]);

  return (
    <div className="container mt-4">
      <h4>Society Services</h4>

      <select
        className="form-select mb-3"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="">All</option>
        <option value="electrician">Electrician</option>
        <option value="plumber">Plumber</option>
        <option value="carpenter">Carpenter</option>
      </select>

      {services.map(s => (
        <div key={s.id} className="card mb-2 p-3">
          <strong>{s.name}</strong>
          <div>{s.type}</div>
          <div>📞 {s.phone}</div>
        </div>
      ))}
    </div>
  );
}
