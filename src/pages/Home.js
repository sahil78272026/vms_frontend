import React, { useEffect, useState } from "react";
import ResidentSidebar from "../components/ResidentSidebar";
import AdminSidebar from "../components/AdminSidebar";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_BASE_URL;
  const role = localStorage.getItem("role");

  useEffect(() => {
  fetch(`${backend}/api/residents/announcements`)
    .then(res => res.json())
    .then(setAnnouncements);
}, [backend]);

  function renderSidebar() {
    // 🟢 Not logged in → show both
    console.log(role)
    if (!role) {
      return (
        <>
          <ResidentSidebar />
          <div className="mt-3">
            <AdminSidebar />
          </div>
        </>
      );
    }

    // 🔐 Logged in
    if (role === "resident") return <ResidentSidebar />;
    if (role === "admin") return <AdminSidebar />;

    return null;
  }

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT CONTENT */}
        <div className="col-md-8">
          <h4>📢 Announcements</h4>
          {announcements.map(a => (
            <div key={a.id} className="card mb-2 p-3">
              <h6>{a.title}</h6>
              <p className="mb-0 text-muted">{a.body}</p>
            </div>
          ))}

          <h4 className="mt-4">📊 Today’s Activity</h4>
          <ul className="list-group">
            {activities.map((act, idx) => (
              <li key={idx} className="list-group-item">
                {act}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-4">
          {renderSidebar()}
        </div>

      </div>
    </div>
  );
}
