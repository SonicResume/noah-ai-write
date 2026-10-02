import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const oobCode = params.get("oobCode");

  const handleReset = async () => {
    if (!oobCode) {
      setMessage("Invalid or expired reset link.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      console.error(err);
      setMessage(err instanceof Error ? err.message : "Something went wrong");
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl mb-4">Set New Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Reset Password
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}