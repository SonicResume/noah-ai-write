import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        background: "#000000",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* LEFT */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="NOAH AI"
            style={{
              width: "38px",
              height: "38px",
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontWeight: 700,
              fontSize: "17px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#35d07f" }}>NOAH</span>
            <span style={{ color: "#ffffff" }}> AI Writer</span>
          </span>
        </Link>

        {/* CENTER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <Link to="/" style={link}>
            Home
          </Link>

          <Link to="/pricing" style={link}>
            Pricing
          </Link>

          <Link to="/contact" style={link}>
            Contact
          </Link>
        </div>

        {/* RIGHT */}
        <div style={{ flexShrink: 0 }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button type="button" style={button}>
              Start Free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const link: React.CSSProperties = {
  textDecoration: "none",
  color: "#e5e7eb",
  fontSize: "14px",
  fontWeight: 500,
  transition: "color 0.2s ease",
};

const button: React.CSSProperties = {
  padding: "10px 18px",
  background: "#35d07f",
  color: "#07140d",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "14px",
};