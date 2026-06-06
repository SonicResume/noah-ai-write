import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    if (userId) {
      fetch("http://localhost:3010/api/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
    }
  }, []);

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>Payment successful 🎉</h1>
      <p>Your credits have been added.</p>
      <a href="/">Go back</a>
    </div>
  );
}