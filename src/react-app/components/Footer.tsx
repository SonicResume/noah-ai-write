import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #eee",
        marginTop: "80px",
        padding: "30px 20px",
        background: "#fff"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >
        {/* LEFT — LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="logo" style={{ width: "28px" }} />
          <span style={{ fontWeight: "600" }}>Noah AI Writer</span>
        </div>

        {/* CENTER — LINKS */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/privacy" style={link}>Privacy</Link>
          <Link to="/terms" style={link}>Terms</Link>
        </div>

        {/* RIGHT — COPYRIGHT */}
        <div style={{ fontSize: "13px", color: "#666" }}>
          © {new Date().getFullYear()} SonicResume Group
        </div>
      </div>
    </footer>
  );
}

const link = {
  textDecoration: "none",
  color: "#555",
  fontSize: "14px"
};