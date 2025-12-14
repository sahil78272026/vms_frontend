import React from "react";

export default function GateQR() {
  const backendBase =
    process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5000";

  const qrUrl = `${backendBase}/api/qr/gate-qr`;

  return (
    <div className="container mt-4 text-center">
      <h3>Gate Entry QR Code</h3>
      <p>Print and place this QR at the society gate</p>

      <img
        src={qrUrl}
        alt="Gate QR"
        style={{ width: "260px", height: "260px" }}
      />

      <p className="mt-3 text-muted">
        Scanning this QR opens visitor entry form
      </p>
    </div>
  );
}
