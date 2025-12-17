import React, { useEffect, useState } from "react";

export default function GateStatus() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${backend}/api/gate/status`)
      .then(res => res.json())
      .then(data => setStatus(data.status));
  }, [backend]);

  if (!status) return null;

  return (
    <div className={`alert ${status === "OPEN" ? "alert-success" : "alert-danger"}`}>
      🚪 Back Gate is <strong>{status}</strong>
    </div>
  );
}
