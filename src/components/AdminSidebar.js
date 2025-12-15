import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔓 Not logged in as admin
  if (!token || role !== "admin") {
    return (
      <div className="card p-3">
        <h5>🛠 Admin Access</h5>
        <p className="text-muted">
          Login to manage guards, flats and announcements
        </p>

        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/login")}
        >
          Admin Login
        </button>
      </div>
    );
  }

  // 🔐 Logged-in admin
  return (
    <div className="card p-3">
      <h5>🛠 Admin Panel</h5>
      <p className="text-muted">Society administration</p>

      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/admin/dashboard")}
      >
        Dashboard
      </button>

      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/admin/guards")}
      >
        Manage Guards
      </button>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
