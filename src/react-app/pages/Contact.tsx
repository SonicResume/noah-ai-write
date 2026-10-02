export default function ContactPage() {
  return (
    <div
      style={{
        background: "#F7F2EC",
        minHeight: "100vh",
        padding: "80px 20px",
        textAlign: "center",
        fontFamily: "sans-serif",
        color: "#171717",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: 40,
          marginBottom: 10,
          color: "#171717",
          fontWeight: 900,
          letterSpacing: "-1px",
        }}
      >
        Contact NOAH
      </h1>

      <p
        style={{
          color: "#6B625B",
          fontWeight: 700,
          marginBottom: 40,
          fontSize: 16,
        }}
      >
        Connect with the NOAH AI Visual Scanner team
      </p>

      {/* CARD */}
      <div
        style={{
          maxWidth: 460,
          margin: "0 auto",
          padding: 40,
          borderRadius: 18,
          background: "#FFFFFF",
          border: "1px solid #DDD2C7",
          boxShadow: "0 20px 50px rgba(66, 45, 30, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* BUSINESS */}
          <a
            href="https://www.sonicresume.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: 14,
              borderRadius: 12,
              border: "1px solid #2DBA70",
              background: "#35D07F",
              color: "#07140D",
              fontWeight: "900",
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(53, 208, 127, 0.18)",
              transition: "0.2s",
            }}
          >
            💼 Contact Support / Business
          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/profile.php?id=61585916721060"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: 14,
              borderRadius: 12,
              border: "1px solid #DDD2C7",
              background: "#F1EAE2",
              color: "#2F241F",
              fontWeight: "900",
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(66, 45, 30, 0.08)",
              transition: "0.2s",
            }}
          >
            🌍 Facebook Community
          </a>
        </div>
      </div>
    </div>
  );
}