// src/react-app/pages/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

type Mode = "login" | "signup" | "reset";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      if (!email) throw new Error("Email required");
      if (mode !== "reset" && password.length < 6) {
        throw new Error("Password must be 6+ characters");
      }

      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        setMsg("Protocol Sent. Check Inbox.");
        setMode("login");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message.replace("Firebase: ", "") : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // wait for auth state to settle
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f8fafc] p-4 font-sans">
      
      {/* 🧭 HOME NAV */}
      <nav className="absolute top-8 left-8 z-50">
        <Link to="/" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-[#35D07F] shadow-sm transition-all hover:-translate-y-0.5 active:scale-95">
          <Home size={14} /> Home
        </Link>
      </nav>

      {/* 🛡️ AUTH MODAL */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 p-10">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-50 mb-6 overflow-hidden">
            <img src="/logo.png" alt="NOAH" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">
            Noah <span className="text-[#35D07F]">AI Writer</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
            Secure Neural Access 
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex bg-slate-100/80 rounded-2xl p-1.5 mb-8">
          {["login", "signup", "reset"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m as Mode)}
              className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                mode === m
                  ? "bg-white shadow-md text-[#35D07F]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <div className="space-y-3">
            <input
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
              placeholder="NETWORK EMAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {mode !== "reset" && (
              <input
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                placeholder="ACCESS KEY"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>

          {/* FEEDBACK */}
          {msg && <p className="text-emerald-600 text-[10px] font-black uppercase bg-emerald-50 p-3 rounded-xl text-center tracking-widest">{msg}</p>}
          {err && <p className="text-red-500 text-[10px] font-black uppercase bg-red-50 p-3 rounded-xl text-center tracking-widest">{err}</p>}

          {/* BUTTONS */}
          <div className="space-y-4 pt-4">
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "Syncing..." : mode === "login" ? "Authorize Access" : mode === "signup" ? "Create Identity" : "Bypass Security"}
            </button>

           <button
            onClick={google}
            className="w-full border border-slate-200 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex  items-center justify-center gap-3"
         >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-[18px] h-[18px]"
            alt="Google"
           />
          Sync Google
         </button>
          </div>
        </div>

        {/* COMPLIANCE FOOTER */}
        <div className="mt-10 pt-6 border-t border-slate-50">
          <div className="flex justify-center gap-6 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <Link to="/privacy" className="hover:text-[#35D07F] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#35D07F] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
