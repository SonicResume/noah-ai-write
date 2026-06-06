import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="flex justify-between p-4">

      <h1>Logo</h1>

      <div className="flex gap-4">

        {/* TOOL BUTTON */}
        <button
          onClick={() => {
            if (!token) {
              navigate("/auth");   // 🔒 redirect if not logged in
            } else {
              navigate("/tool");   // ✅ allow if logged in
            }
          }}
        >
          Tool
        </button>

        {/* LOGIN / LOGOUT */}
        {!token ? (
          <button onClick={() => navigate("/auth")}>
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}