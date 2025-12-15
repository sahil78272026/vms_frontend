import { useNavigate } from "react-router-dom";
import PageNav from "../../components/PageNav";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <PageNav backTo="/" backLabel="Home" />
      <h3>🛠 Admin Dashboard</h3>
      <p className="text-muted">
        Manage flats, guards and announcements from here.
      </p>

      <div className="list-group">
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/guards")}
        >
          👮 Manage Guards
        </button>

        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/flats")}
        >
          🏠 Manage Flats
        </button>

        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/announcements")}
        >
          📢 Create Announcements
        </button>

              <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/residents/pending")}
        >
          🧑‍💼 Pending Residents
        </button>
      </div>
    </div>
  );
}
