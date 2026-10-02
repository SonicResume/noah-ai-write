import { useEffect, useState } from "react";

export default function SuccessPage() {

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get("session_id");

    if (session) {
      setSessionId(session);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h1>Payment Successful 🎉</h1>

        {sessionId && (
          <p style={{ marginTop: 10 }}>
            Session ID: {sessionId}
          </p>
        )}

        <a href="/dashboard" style={styles.button}>
          Go to Dashboard
        </a>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  box: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    textAlign: "center" as const,
  },
  button: {
    display: "inline-block",
    marginTop: 15,
    padding: "10px 20px",
    background: "black",
    color: "white",
    textDecoration: "none",
    borderRadius: 6,
  },
};