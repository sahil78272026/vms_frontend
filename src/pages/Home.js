import React, { useEffect, useState } from "react";
import ResidentSidebar from "../components/ResidentSidebar";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // For now: static data (can be API later)
    setAnnouncements([
      { id: 1, title: "Water Maintenance", body: "Water supply off from 10–12 PM" },
      { id: 2, title: "Security Drill", body: "Fire drill this Sunday" },
    ]);

    setActivities([
      "12 visitors entered today",
      "3 approvals pending",
      "Maintenance ongoing in Block A",
    ]);
  }, []);

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
          <ResidentSidebar />
        </div>

      </div>
    </div>
  );
}
