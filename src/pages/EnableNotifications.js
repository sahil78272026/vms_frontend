import React, { useEffect, useState } from "react";

export default function EnableNotifications() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  useEffect(() => {
    checkStatus();
  }, [backend, token]);

  async function checkStatus() {
    const res = await fetch(`${backend}/api/notifications/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (data.enabled) {
      window.location.href = "/residents/dashboard";
    }
  }

  async function enable() {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });

      await fetch(`${backend}/api/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sub)
      });

      window.location.href = "/residents/dashboard";
    } catch {
      setError("Notifications are required. Please allow them.");
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h3>🔔 Enable Notifications</h3>
      <p>
        Visitor approvals require real-time alerts.
        Please enable notifications to continue.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={enable}>
        Enable Notifications
      </button>
    </div>
  );
}
