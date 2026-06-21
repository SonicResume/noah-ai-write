"use client";

import { useState, FormEvent } from "react";
import { Sparkles, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      triggerError("Fill all fields before continuing.");
      return;
    }

    // 👉 Redirect straight to your real business contact page
    window.location.href = "https://www.sonicresume.com/contact";
  };

  return (
    <div style={pageBg}>
      {errorMessage && (
        <div style={errorPopup}>
          <AlertCircle style={{ width: 20, height: 20, color: themeColors.orangeBright }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>{errorMessage}</span>
        </div>
      )}

      <div style={contactCard}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={logoWrapper}>
            <MessageSquare style={{ width: 18, height: 18, color: themeColors.orangeBright }} />
            <h1 style={logoText}>SonicResume Contact</h1>
          </div>
        </div>

        <h2 style={titleHeading}>
          Contact Us <Sparkles style={inlineSparkle} />
        </h2>

        <p style={subtitleText}>
          You’ll be redirected to our secure business contact system.
        </p>

        <form onSubmit={handleSubmit} style={formStack}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputField}
          />

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputField}
          />

          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaField}
          />

          <button type="submit" style={primaryButton}>
            Go to Business Contact →
          </button>
        </form>

        {success && (
          <div style={successBox}>
            <CheckCircle style={{ width: 18, height: 18, color: "#16A34A" }} />
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const themeColors = {
  brownDark: "#361E1B",
  brownMedium: "#6E4A45",
  orangeBright: "#FA5A15",
  bgCream: "#FFFDF9",
  cardLightBg: "#F5EDE0",
};

const pageBg = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: themeColors.bgCream,
  padding: "40px 16px",
  fontFamily: "Inter, Arial, sans-serif",
  color: themeColors.brownDark,
};

const contactCard = {
  width: "100%",
  maxWidth: "440px",
  backgroundColor: themeColors.bgCream,
  border: `3px solid ${themeColors.brownDark}`,
  borderRadius: "24px",
  padding: "40px 32px",
  boxShadow: `6px 6px 0px 0px ${themeColors.brownDark}`,
};

const logoWrapper = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: themeColors.cardLightBg,
  border: `2px solid ${themeColors.brownDark}`,
  padding: "4px 12px",
  borderRadius: "100px",
};

const logoText = {
  fontSize: "14px",
  fontWeight: 900,
  color: themeColors.brownDark,
};

const titleHeading = {
  fontSize: "30px",
  fontWeight: 900,
  textAlign: "center",
  margin: "16px 0 6px 0",
};

const subtitleText = {
  fontSize: "14px",
  fontWeight: 600,
  color: themeColors.brownMedium,
  textAlign: "center",
  marginBottom: "28px",
};

const formStack = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const inputField = {
  width: "100%",
  padding: "14px",
  border: `2.5px solid ${themeColors.brownDark}`,
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: 700,
};

const textareaField = {
  ...inputField,
  height: "120px",
};

const primaryButton = {
  width: "100%",
  padding: "14px",
  background: `linear-gradient(135deg, ${themeColors.orangeBright}, #E04D03)`,
  color: "#fff",
  border: `2.5px solid ${themeColors.brownDark}`,
  borderRadius: "12px",
  fontWeight: 900,
  cursor: "pointer",
};

const errorPopup = {
  position: "fixed",
  top: "24px",
  display: "flex",
  gap: "10px",
  padding: "14px 20px",
  border: `3px solid ${themeColors.brownDark}`,
  borderRadius: "16px",
  background: "#FFFDF9",
};

const successBox = {
  marginTop: "20px",
  padding: "12px",
  background: "#DCFCE7",
  borderRadius: "12px",
  fontWeight: 700,
};

const inlineSparkle = {
  width: 22,
  height: 22,
  color: themeColors.orangeBright,
  verticalAlign: "middle",
};
