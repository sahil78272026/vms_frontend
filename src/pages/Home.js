import React, { useEffect } from "react";
import ResidentSidebar from "../components/ResidentSidebar";
import AdminSidebar from "../components/AdminSidebar";
import Announcements from "../components/Announcements";
import GateStatus from "../components/GateStatus";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token")
  const navigate = useNavigate()


  useEffect(() => {
    // 👮 Guard should never stay on home
    if (role === "guard") {
      if (token) {
        navigate("/guard/dashboard", { replace: true });
      } else {
        navigate("/guard/login", { replace: true });
      }
    }
  }, [role, token, navigate]);




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
      {(role === "resident" || role === "admin") && <GateStatus />}
      <div className="row">

        {/* LEFT CONTENT */}

        <div className="col-md-8">
        {(role === "resident" || role === "admin") &&  <Announcements />}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-4">
          {renderSidebar()}
        </div>

      </div>
    </div>
  );
}
