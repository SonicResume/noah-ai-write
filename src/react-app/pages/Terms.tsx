import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container}>

      <div style={styles.wrapper}>

        <Link to="/" style={styles.back}>
          ← Back to Home
        </Link>

        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.date}>Effective date: 2026</p>

        <div style={styles.card}>

          <p>
            Welcome to AIWrite (“we”, “our”, or “us”). By using our service,
            you agree to these Terms of Service.
          </p>

          <h2>1. Use of Service</h2>
          <p>
            You may only use the service for lawful purposes. Abuse, scraping,
            reverse engineering, or attempts to disrupt the system are prohibited.
          </p>

          <h2>2. Accounts</h2>
          <p>
            You are responsible for maintaining the security of your account
            and all activity under it.
          </p>

          <h2>3. Free & Paid Plans</h2>
          <p>
            Free usage may be limited. Paid plans provide increased access,
            features, and usage limits.
          </p>

          <h2>4. Payments</h2>
          <p>
            Payments are securely processed through Stripe. All payments are
            non-refundable unless required by law.
          </p>

          <h2>5. Generated Content</h2>
          <p>
            AI-generated content may not always be accurate or complete.
            You are responsible for reviewing all output before use.
          </p>

          <h2>6. Disclaimer</h2>
          <p>
            The service is provided “as-is” without warranties of any kind.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages.
          </p>

          <h2>8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access if these Terms
            are violated.
          </p>

          <h2>9. Changes</h2>
          <p>
            These Terms may be updated at any time. Continued use of the service
            means you accept the updated Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            Use our Contact Page
          </p>

        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "60px 20px",
    background: "#f5f5f5",
  },
  wrapper: {
    maxWidth: 800,
    margin: "0 auto",
  },
  back: {
    display: "inline-block",
    marginBottom: 20,
    textDecoration: "none",
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    marginBottom: 5,
  },
  date: {
    color: "#666",
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    lineHeight: 1.6,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};