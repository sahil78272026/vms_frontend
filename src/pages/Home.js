import React, { useState } from "react";
import ResidentSidebar from "../components/ResidentSidebar";
import AdminSidebar from "../components/AdminSidebar";
import Announcements from "../components/Announcements";
import GateStatus from "../components/GateStatus";

export default function Home() {
  const role = localStorage.getItem("role");

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
      <GateStatus />
      <div className="row">

        {/* LEFT CONTENT */}
        <div className="col-md-8">
          <h4>📢 Announcements</h4>
           <Announcements />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-4">
          {renderSidebar()}
        </div>

      </div>
    </div>
  );
}
