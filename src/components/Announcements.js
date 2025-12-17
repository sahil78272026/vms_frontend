import React, { useEffect, useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    fetch(`${backend}/api/announcements`)
      .then(res => res.json())
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]));
  }, [backend]);

  if (announcements.length === 0) {
    return <p className="text-muted">No announcements</p>;
  }

  return (
    <>
      {announcements.map(a => (
        <div
          key={a.id}
          className={`card mb-2 p-3 ${
            a.type === "ALERT"
              ? "border-danger"
              : a.type === "MAINTENANCE"
              ? "border-warning"
              : "border-primary"
          }`}
        >
          <h6 className="mb-1">{a.title}</h6>
          <p className="mb-1">{a.description}</p>
          <small className="text-muted">
            {a.type}
          </small>
        </div>
      ))}
    </>
  );
}
