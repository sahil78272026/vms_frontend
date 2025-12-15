import { useNavigate } from "react-router-dom";

export default function PageNav({ backTo, backLabel = "Back" }) {
  const navigate = useNavigate();

  return (
    <div className="mb-3">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => navigate(backTo)}
      >
        ← {backLabel}
      </button>
    </div>
  );
}
