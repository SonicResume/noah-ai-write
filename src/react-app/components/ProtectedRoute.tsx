import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ⏳ Wait for Firebase to respond
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // 🔒 Block access
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow access
  return children;
}