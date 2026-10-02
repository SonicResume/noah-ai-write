import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get("session_id");

    if (session) {
      setSessionId(session);
    }

    // Optional: simulate backend confirmation check
    const timer = setTimeout(() => {
      setLoading(false);
      setStatus("Your account has been upgraded 🎉");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h1 style={styles.title}>Payment Successful 🎉</h1>

        <p style={styles.subtitle}>
          {status}
        </p>

        {loading && (
          <div style={styles.loader}>
            Processing upgrade...
          </div>
        )}

        {!loading && (
          <a href="/dashboard" style={styles.button}>
            Go to Dashboard
          </a>
        )}

        {sessionId && (
          <p style={styles.session}>
            Session ID: {sessionId}
          </p>
        )}

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f5f5, #e5e7eb)",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    textAlign: "center",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "26px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  loader: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
  session: {
    marginTop: "15px",
    fontSize: "11px",
    color: "#aaa",
    wordBreak: "break-all",
  },
};