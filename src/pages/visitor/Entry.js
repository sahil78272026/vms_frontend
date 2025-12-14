import React, { useState } from "react";
import { lookupVisitor, submitEntry } from "../../api/visitors";
import { useNavigate } from "react-router-dom";

export default function Entry() {
  const [mobile, setMobile] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    flat_id: "",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLookup() {
    if (!mobile) return;
    const r = await lookupVisitor(mobile);
    if (r.found) {
      setForm({ ...form, name: r.name, company: r.company });
    }
  }

  async function submit(e) {
    e.preventDefault(); // ✅ IMPORTANT

    try {
      await submitEntry({ mobile, ...form });
      setSubmitted(true); // ✅ show success UI
    } catch (err) {
      setError("Submission failed");
    }
  }

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="container mt-4 text-center">
        <h3>✅ Request Submitted</h3>
        <p>Your entry request is waiting for resident approval.</p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/visitor/login")}
        >
          Login to Track Status
        </button>
      </div>
    );
  }

  // 📝 ENTRY FORM
  return (
    <div className="container mt-4">
      <h3>Visitor Entry</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit} className="card p-3">
        <div className="mb-2">
          <label>Mobile</label>
          <div className="d-flex">
            <input
              className="form-control me-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleLookup}
            >
              Lookup
            </button>
          </div>
        </div>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Flat ID"
          value={form.flat_id}
          onChange={(e) => setForm({ ...form, flat_id: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
