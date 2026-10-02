import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={pageContainer}>

      {/* HERO SECTION */}
      <section style={heroSection}>
        <div style={badgeStyle}>✨ Your Magical AI Writing Companion</div>
        <h1 style={heroHeadline}>
          Content Writing That <span style={highlightText}>Converts!</span>
        </h1>

        <p style={heroSubline}>
          Turn weak sentences into clear, professional, and high-energy content in seconds.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={primaryButton}
        >
          Start Free 🚀
        </button>
      </section>

      {/* CORE TOOL SELECTION CARDS */}
      <section style={sectionContainer}>
        <h2 style={sectionHeader}>Six Magical Tools. One Powerful App.</h2>
        <div style={threeColumnGrid}>
          {[
            "🔄 Rewrite Text",
            "✅ Fix Grammar",
            "⤢ Expand Content",
            "📄 Summarize",
            "💬 Change Tone",
            "🌐 Translate"
          ].map((t, i) => (
            <div key={i} style={toolCard}>
              <h3 style={cardTitle}>{t}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION CARDS */}
      <section style={sectionContainer}>
        <h2 style={sectionHeader}>Why Writers Love NOAH AI</h2>
        <div style={threeColumnGrid}>
          {[
            { title: "💼 Get Hired Faster", desc: "Build stronger resumes and crisp job applications." },
            { title: "📣 Sound Professional", desc: "Craft flawless business emails and team communication." },
            { title: "📈 Sell Much More", desc: "Generate product landing pages and sales copy that converts." },
            { title: "⏳ Save Hours of Time", desc: "Stop rewriting the exact same paragraph over and over." },
            { title: "🎯 Avoid Costly Mistakes", desc: "Instantly check spelling and structural errors." },
            { title: "💡 Write Clearly", desc: "Say exactly what you mean without the awkward fluff." }
          ].map((c, i) => (
            <div key={i} style={valueCard}>
              <h3 style={cardTitle}>{c.title}</h3>
              <p style={cardDescription}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CALL TO ACTION SECTION */}
      <section style={ctaSection}>
        <h2 style={{ ...sectionHeader, marginBottom: "12px" }}>
          Ready to write better content today?
        </h2>
        <p style={{ ...cardDescription, marginBottom: "24px" }}>No credit card required. Start creating instantly.</p>
        <button
          onClick={() => navigate("/login")}
          style={ctaButton}
        >
          Try AIWrite For Free 🎉
        </button>
      </section>

    </div>
  );
}

// Retro Theme Palette Design Constants
const themeColors = {
  brownDark: "#361E1B",
  brownMedium: "#6E4A45",
  orangeBright: "#FA5A15",
  bgCream: "#FFFDF9",
  cardBg: "#FFFDF9",
  cardLightBg: "#F5EDE0"
};

// Structural & Aesthetic Styles
const pageContainer = { 
  fontFamily: "Inter, Arial, sans-serif", 
  background: themeColors.bgCream,
  color: themeColors.brownDark,
  paddingBottom: "60px"
};

const heroSection = {
  textAlign: "center" as const,
  padding: "100px 20px 80px 20px",
  maxWidth: "900px",
  margin: "0 auto"
};

const badgeStyle = {
  inlineSize: "max-content",
  margin: "0 auto 24px auto",
  padding: "6px 16px",
  background: themeColors.cardLightBg,
  border: `2px solid ${themeColors.brownDark}`,
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: "800",
  color: themeColors.brownMedium,
  boxShadow: `2px 2px 0px 0px ${themeColors.brownDark}`
};

const heroHeadline = {
  fontSize: "58px",
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: "-1.5px",
  color: themeColors.brownDark,
  marginBottom: "20px"
};

const highlightText = {
  color: themeColors.orangeBright,
  textDecoration: "underline decoration-wavy",
  textDecorationColor: "#E04D03"
};

const heroSubline = {
  fontSize: "20px",
  color: themeColors.brownMedium,
  fontWeight: "500",
  maxWidth: "600px",
  margin: "0 auto"
};

const sectionContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "60px 20px"
};

const sectionHeader = {
  fontSize: "32px",
  fontWeight: "900",
  textAlign: "center" as const,
  marginBottom: "40px",
  letterSpacing: "-0.5px"
};

const threeColumnGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px"
};

// Card Structures (Using the bold retro border-pop look)
const baseCard = {
  background: themeColors.cardBg,
  padding: "28px",
  borderRadius: "20px",
  border: `3px solid ${themeColors.brownDark}`,
  boxShadow: `5px 5px 0px 0px ${themeColors.brownDark}`,
  transition: "transform 0.2s ease"
};

const toolCard = {
  ...baseCard,
  background: themeColors.cardLightBg,
  textAlign: "center" as const,
  padding: "20px"
};

const valueCard = {
  ...baseCard
};

const cardTitle = { 
  fontWeight: 900, 
  fontSize: "18px",
  color: themeColors.brownDark 
};

const cardDescription = { 
  color: themeColors.brownMedium, 
  marginTop: "10px",
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "1.5"
};

// Interactive Buttons
const primaryButton = {
  marginTop: "36px",
  padding: "16px 36px",
  background: `linear-gradient(135deg, ${themeColors.orangeBright}, #E04D03)`,
  color: "#fff",
  borderRadius: "14px",
  border: `3px solid ${themeColors.brownDark}`,
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: `4px 4px 0px 0px ${themeColors.brownDark}`,
  transform: "translateY(0px)",
  transition: "all 0.1s ease"
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "80px 20px 40px 20px",
  maxWidth: "700px",
  margin: "0 auto"
};

const ctaButton = {
  padding: "16px 32px",
  background: themeColors.brownDark,
  color: themeColors.bgCream,
  borderRadius: "14px",
  border: `3px solid ${themeColors.brownDark}`,
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: `4px 4px 0px 0px ${themeColors.orangeBright}`,
  transition: "all 0.1s ease"
};
