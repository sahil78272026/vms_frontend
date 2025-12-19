import React, { useEffect, useState, useCallback } from "react";

export default function GateToggle() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStatus = useCallback(async ()=>{
  const res = await fetch(`${backend}/api/gate/status`);
  const data = await res.json();
  setStatus(data.status);
  },[backend, token]);


  async function toggle() {
    setLoading(true);

    const res = await fetch(`${backend}/api/guards/gate/toggle`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setStatus(data.status);
    setLoading(false);
  }

  useEffect(() => {
    loadStatus();
  }, [backend]);

  if (!status) return null;

  const isOpen = status === "OPEN";

  return (
    <div className="card p-3 mt-3 text-center">
      <h5>🚪 Back Gate</h5>

      <p className="mb-2">
        Current Status:{" "}
        <strong className={isOpen ? "text-success" : "text-danger"}>
          {status}
        </strong>
      </p>

      <button
        className={`btn ${isOpen ? "btn-danger" : "btn-success"}`}
        onClick={toggle}
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : isOpen
          ? "Close Gate"
          : "Open Gate"}
      </button>
    </div>
  );
}
