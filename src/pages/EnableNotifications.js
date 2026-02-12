import React, { useEffect, useState, useCallback } from "react";

export default function EnableNotifications() {
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  const checkStatus = useCallback(async () => {
    const res = await fetch(`${backend}/api/notifications/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    console.log('data:',data)

    if (data.enabled) {
      window.location.href = "/residents/dashboard";
    }
  }, [backend, token]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);


  function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

  async function enable() {
    console.log("function clicked")
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("service worked registered")
      console.log("process.env.REACT_APP_VAPID_PUBLIC_KEY", process.env.REACT_APP_VAPID_PUBLIC_KEY)
      const urlBase64ToUint8Array_str = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
      console.log('urlBase64ToUint8Array_str', urlBase64ToUint8Array_str)
      console.log(urlBase64ToUint8Array_str.length, urlBase64ToUint8Array_str[0])
      
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:urlBase64ToUint8Array_str
      });
      console.log("pushmanager subscribe", sub)
      console.log("Notification permission:", Notification.permission);
      await fetch(`${backend}/api/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sub)
      });

      window.location.href = "/residents/dashboard";
    } catch (error){
      console.error("error" ,error.message)
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
