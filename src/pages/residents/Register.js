import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageNav from "../../components/PageNav";

export default function ResidentRegister() {
  const navigate = useNavigate();

  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    flat_id: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/flats")
      .then((res) => res.json())
      .then((data) => setFlats(data));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(
      "http://localhost:5000/api/auth/resident/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed");
      return;
    }

    setSuccess("Registration successful! Please login.");
    setTimeout(() => navigate("/residents/login"), 1500);
  }

  return (
    <div className="container mt-4">
      <PageNav backTo="/" backLabel="Back to Home" />
      <h3>Resident Registration</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={submit} className="card p-3">
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="form-select mb-3"
          value={form.flat_id}
          onChange={(e) => setForm({ ...form, flat_id: e.target.value })}
          required
        >
          <option value="">Select Flat Number</option>
          {flats.map((f) => (
            <option key={f.id} value={f.id}>
              {f.number}
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-100">Register</button>
      </form>
      <small className="d-block text-center mt-3">
        Already registered? <Link to="/residents/login">Login</Link>
      </small>
    </div>
  );
}
