import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

export default function TermsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-16">

      <div className="max-w-3xl mx-auto">

        <Link
          to="/"
          className="text-sm text-purple-600 hover:text-purple-800 transition"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mt-4 text-purple-700">
          Terms of Service
        </h1>

        <p className="text-sm text-gray-500 mt-1 mb-6">
          Effective date: 2026
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6 text-sm leading-6 text-gray-700">

          <p>
            Welcome to AIWrite (“we”, “our”, or “us”). By using our service,
            you agree to these Terms of Service.
          </p>

          <Section title="1. Use of Service">
            You may only use the service for lawful purposes. Abuse, scraping,
            reverse engineering, or attempts to disrupt the system are prohibited.
          </Section>

          <Section title="2. Accounts">
            You are responsible for maintaining the security of your account
            and all activity under it.
          </Section>

          <Section title="3. Free & Paid Plans">
            Free usage may be limited. Paid plans provide increased access,
            features, and usage limits.
          </Section>

          <Section title="4. Payments">
            Payments are securely processed through Stripe. All payments are
            non-refundable unless required by law.
          </Section>

          <Section title="5. Generated Content">
            AI-generated content may not always be accurate or complete.
            You are responsible for reviewing all output before use.
          </Section>

          <Section title="6. Disclaimer">
            The service is provided “as-is” without warranties of any kind.
          </Section>

          <Section title="7. Limitation of Liability">
            We are not liable for any indirect, incidental, or consequential damages.
          </Section>

          <Section title="8. Termination">
            We reserve the right to suspend or terminate access if these Terms
            are violated.
          </Section>

          <Section title="9. Changes">
            These Terms may be updated at any time. Continued use of the service
            means you accept the updated Terms.
          </Section>

          <Section title="10. Contact">
            Use our Contact Page
          </Section>

        </div>

      </div>
    </div>
  );
}

/* ✅ FIXED TYPESCRIPT COMPONENT */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-purple-700 font-semibold mb-1">
        {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}