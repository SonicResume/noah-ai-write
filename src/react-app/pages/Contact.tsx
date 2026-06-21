export default function ContactPage() {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Contact Us</h1>
        <p style={subtitle}>Choose how you want to reach us</p>

        <button
          style={primaryButton}
          onClick={() =>
            (window.location.href = "https://www.sonicresume.com/contact")
          }
        >
          📩 SonicResume Contact
        </button>

        <button
          style={secondaryButton}
          onClick={() =>
            (window.location.href =
              "https://www.facebook.com/profile.php?id=61585916721060")
          }
        >
          📘 Facebook Profile
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES (PEARL + ORANGE) ---------------- */

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FFF8F0", // pearl
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "90%",
  maxWidth: "420px",
  padding: "40px",
  borderRadius: "20px",
  background: "#FFF8F0",
  border: "3px solid #3A241D",
  boxShadow: "6px 6px 0px #3A241D",
  textAlign: "center",
};

const title = {
  fontSize: "28px",
  fontWeight: "900",
  color: "#2B1B16",
  marginBottom: "8px",
};

const subtitle = {
  fontSize: "14px",
  color: "#7A5C55",
  marginBottom: "24px",
};

const primaryButton = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  background: "#FA5A15", // orange
  color: "#fff",
  fontWeight: "800",
  border: "2px solid #3A241D",
  borderRadius: "12px",
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  padding: "14px",
  background: "#1877F2", // facebook blue
  color: "#fff",
  fontWeight: "800",
  border: "2px solid #3A241D",
  borderRadius: "12px",
  cursor: "pointer",
};