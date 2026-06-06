import { useState, FormEvent } from "react";
import { Sparkles, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  // New state tracking for our fun error box popup
  const [errorMessage, setErrorMessage] = useState("");

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    // Auto-hide the error alert after 4 seconds
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      triggerError("Whoops! Looks like you forgot to fill in some fields. 📝");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3010/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error();

      setSuccess("Message transmitted into orbit! 🚀 We'll talk soon!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      triggerError("Oh no! The message courier tripped. Try again? 📡");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageBg}>
      
      {/* FLOATING RETRO ERROR POPUP BANNER */}
      {errorMessage && (
        <div style={errorPopup}>
          <AlertCircle style={{ width: "20px", height: "20px", color: themeColors.orangeBright }} />
          <span style={{ fontWeight: "700", fontSize: "14px" }}>{errorMessage}</span>
        </div>
      )}

      <div style={contactCard}>

        {/* Brand App Branding Header */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={logoWrapper}>
            <MessageSquare style={{ width: "18px", height: "18px", color: themeColors.orangeBright }} />
            <h1 style={logoText}>NOAH AI Writer</h1>
          </div>
        </div>

        <h2 style={titleHeading}>
          Drop Us a Line! <Sparkles style={inlineSparkle} />
        </h2>
        <p style={subtitleText}>Have questions about NOAH? Want to say hi? We don't bite!</p>

        {/* Contact Input Form Layer */}
        <form onSubmit={handleSubmit} style={formStack}>
          <input
            type="text"
            placeholder="Your stunning name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputField}
          />

          <input
            type="email"
            placeholder="Your favorite email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputField}
          />

          <textarea
            placeholder="Type your magical message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaField}
          />

          <button
            disabled={loading}
            style={loading ? disabledButton : primaryButton}
          >
            {loading ? "Sending Courier... 🏃‍♂️" : "Send Message! 🔥"}
          </button>
        </form>

        {/* Playful Theme Success Notice Display */}
        {success && (
          <div style={successBox}>
            <CheckCircle style={{ width: "18px", height: "18px", color: "#16A34A" }} />
            <span>{success}</span>
          </div>
        )}

        <div style={footerNavigation}>
          <a href="/" style={backLink}>
            ⬅️ Take me back home
          </a>
        </div>
      </div>
    </div>
  );
}

// Brand Palette Matrix Constants
const themeColors = {
  brownDark: "#361E1B",
  brownMedium: "#6E4A45",
  orangeBright: "#FA5A15",
  bgCream: "#FFFDF9",
  cardLightBg: "#F5EDE0"
};

// CSS-in-JS Object System Structures
const pageBg = {
  position: "relative" as const,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: themeColors.bgCream,
  padding: "40px 16px",
  fontFamily: "Inter, Arial, sans-serif",
  color: themeColors.brownDark
};

const contactCard = {
  width: "100%",
  maxWwidth: "440px",
  maxWidth: "440px",
  backgroundColor: themeColors.bgCream,
  border: `3px solid ${themeColors.brownDark}`,
  borderRadius: "24px",
  padding: "40px 32px",
  boxShadow: `6px 6px 0px 0px ${themeColors.brownDark}` // Bold Offset Shadow Graphic
};

const logoWrapper = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: themeColors.cardLightBg,
  border: `2px solid ${themeColors.brownDark}`,
  padding: "4px 12px",
  borderRadius: "100px"
};

const logoText = {
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "-0.3px",
  color: themeColors.brownDark
};

const titleHeading = {
  fontSize: "30px",
  fontWeight: "900",
  textAlign: "center" as const,
  margin: "16px 0 6px 0",
  letterSpacing: "-1px"
};

const inlineSparkle = {
  display: "inline-block",
  width: "22px",
  height: "22px",
  color: themeColors.orangeBright,
  verticalAlign: "middle"
};

const subtitleText = {
  fontSize: "14px",
  fontWeight: "600",
  color: themeColors.brownMedium,
  textAlign: "center" as const,
  marginBottom: "28px"
};

const formStack = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px"
};

// Input aesthetics mimicking your workspace dashboard panels
const inputField = {
  width: "100%",
  boxSizing: "border-box" as const,
  backgroundColor: "#FFFFFF",
  border: `2.5px solid ${themeColors.brownDark}`,
  borderRadius: "12px",
  padding: "14px",
  fontSize: "15px",
  fontWeight: "700",
  color: themeColors.brownDark,
  outline: "none",
  transition: "all 0.15s ease",
  boxShadow: `2px 2px 0px 0px ${themeColors.brownDark}`
};

const textareaField = {
  ...inputField,
  height: "120px",
  resize: "none" as const,
  fontFamily: "inherit"
};

const primaryButton = {
  width: "100%",
  padding: "14px",
  background: `linear-gradient(135deg, ${themeColors.orangeBright}, #E04D03)`,
  color: "#FFFFFF",
  border: `2.5px solid ${themeColors.brownDark}`,
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "900",
  cursor: "pointer",
  boxShadow: `3px 3px 0px 0px ${themeColors.brownDark}`,
  transition: "transform 0.1s ease, box-shadow 0.1s ease"
};

const disabledButton = {
  ...primaryButton,
  background: themeColors.brownMedium,
  opacity: 0.7,
  cursor: "not-allowed",
  boxShadow: "none",
  transform: "none"
};

// Playful Alert Popup Custom Elements
const errorPopup = {
  position: "fixed" as const,
  top: "24px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "#FFFDF9",
  border: `3px solid ${themeColors.brownDark}`,
  padding: "14px 20px",
  borderRadius: "16px",
  boxShadow: `4px 4px 0px 0px ${themeColors.brownDark}`,
  zIndex: 100,
  animation: "slideDown 0.3s ease"
};

const successBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
  padding: "12px",
  backgroundColor: "#DCFCE7",
  border: `2px solid ${themeColors.brownDark}`,
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "700",
  color: "#166534"
};

const footerNavigation = {
  marginTop: "24px",
  textAlign: "center" as const
};

const backLink = {
  fontSize: "13px",
  fontWeight: "800",
  color: themeColors.brownMedium,
  textDecoration: "none"
};
