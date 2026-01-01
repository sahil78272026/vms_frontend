import React, { useState } from "react";

export default function Maintenance() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState(null);

  async function submit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("year", year);
    fd.append("amount", amount);
    if (proof) fd.append("proof", proof);

    await fetch(`${backend}/api/residents/maintenance`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: fd
    });

    alert("Maintenance submitted for approval");
    setYear("");
    setAmount("");
    setProof(null);
  }

  return (
    <div className="container mt-4">
      <h3>Yearly Maintenance</h3>

      <form onSubmit={submit} className="card p-3">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Year (e.g. 2025)"
          value={year}
          onChange={e => setYear(e.target.value)}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={e => setProof(e.target.files[0])}
        />

        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
