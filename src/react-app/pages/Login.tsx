import { useState, FormEvent, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, LogIn, AlertCircle, CheckCircle, UserPlus, KeyRound } from "lucide-react";

type AuthMode = "login" | "signup" | "forgot";

export default function Login() {
  // Authentication UI Flow Mode Controller
  const [mode, setMode] = useState<AuthMode>("login");
  
  // Local Controlled Input Elements
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Global View Notification Hooks
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Dynamic Browser Tab Title Synchronizer
  useEffect(() => {
    const titleMap = {
      login: "Log In | NOAH AI Writer",
      signup: "Sign Up | NOAH AI Writer",
      forgot: "Reset Password | NOAH AI Writer"
    };
    document.title = titleMap[mode];
  }, [mode]);

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  // Central Form Submission Dispatcher Routing Engine
  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess("");

    if (!email) {
      triggerError("Whoops! Email input address is required! ✉️");
      return;
    }

    // MODE 1: PASSWORD RECOVERY LINK DISPATCH
    if (mode === "forgot") {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess("Magical reset link dispatched straight to your inbox! 📡");
        setTimeout(() => setMode("login"), 3000);
      } catch (error: any) {
        triggerError("Failed to trigger recovery. Verify your email spelling!");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      triggerError("Hold up! Secret password credentials are required! 🔑");
      return;
    }

    // MODE 2: CLIENT USER SIGN UP REGISTRATION
    if (mode === "signup") {
      if (password !== confirmPassword) {
        triggerError("Passcodes do not match! Check your typing! 🛑");
        return;
      }
      if (password.length < 6) {
        triggerError("Password too short! Enforce at least 6 characters for safety!");
        return;
      }

      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Account forged successfully! Prepping your workstation... 🪄");
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          triggerError("That email is already registered! Log in instead. 🧙‍♂️");
        } else {
          triggerError("Registration portal gate jammed. Let's try again!");
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // MODE 3: STANDARD LOGIN VALIDATION
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log("Firebase Auth Token secured:", idToken);

      setSuccess("Welcome back! Zooming to your dashboard... 🏎️");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        triggerError("Hmm, that combination doesn't match our spellbooks. Try again! 🧙‍♂️");
      } else {
        triggerError("Oh no! The login gate jammed. Let's try that again! 🛰️");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="noah-page-container">
      {/* CSS Stylesheet Embedded Directly to Stop Browser Clipping Bugs */}
      <style>{`
        .noah-page-container * {
          box-sizing: border-box !important;
          margin: 0;
          padding: 0;
        }
        .noah-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFDF9;
          padding: 20px;
          font-family: 'Inter', Arial, sans-serif;
        }
        .noah-login-card {
          width: 100%;
          max-width: 380px;
          background-color: #FFFDF9;
          border: 3px solid #361E1B;
          border-radius: 24px;
          padding: 32px 24px;
          box-shadow: 6px 6px 0px 0px #361E1B;
        }
        .noah-logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #F5EDE0;
          border: 2px solid #361E1B;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .noah-input-wrapper {
          width: 100%;
          height: 52px;
          display: flex;
          align-items: center;
          background-color: #FFFFFF;
          border: 2.5px solid #361E1B;
          border-radius: 12px;
          box-shadow: 2px 2px 0px 0px #361E1B;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .noah-native-input {
          width: 100%;
          height: 100%;
          padding: 0 16px;
          font-size: 16px;
          font-weight: 700;
          color: #361E1B;
          border: none !important;
          outline: none !important;
          background: transparent !important;
        }
        .noah-btn-primary {
          width: 100%;
          height: 50px;
          background: linear-gradient(135deg, #FA5A15, #E04D03);
          color: #FFFFFF;
          border: 2.5px solid #361E1B;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0px 0px #361E1B;
          margin-top: 10px;
        }
        .noah-btn-primary:disabled {
          background: #6E4A45;
          opacity: 0.7;
          cursor: not-allowed;
          box-shadow: none;
        }
        .noah-error-alert {
          position: fixed;
          top: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #FFFDF9;
          border: 3px solid #361E1B;
          padding: 14px 20px;
          border-radius: 16px;
          box-shadow: 4px 4px 0px 0px #361E1B;
          z-index: 1000;
        }
        .noah-success-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
          padding: 12px;
          background-color: #DCFCE7;
          border: 2px solid #361E1B;
          border-radius: 12px;
          color: #166534;
          font-size: 14px;
          font-weight: 700;
        }
        .noah-switch-label {
          color: #6E4A45;
          cursor: pointer;
          font-weight: 700;
          text-decoration: none;
        }
        .noah-switch-label:hover {
          color: #FA5A15;
        }
      `}</style>

      {errorMessage && (
        <div className="noah-error-alert">
          <AlertCircle style={{ width: "20px", height: "20px", color: "#FA5A15" }} />
          <span style={{ fontWeight: "700", fontSize: "14px" }}>{errorMessage}</span>
        </div>
      )}

      <div className="noah-login-card">
        <div style={{ textAlign: "center" }}>
          <div className="noah-logo-badge">
            {mode === "login" && <LogIn style={{ width: "14px", height: "14px", color: "#FA5A15" }} />}
            {mode === "signup" && <UserPlus style={{ width: "14px", height: "14px", color: "#FA5A15" }} />}
            {mode === "forgot" && <KeyRound style={{ width: "14px", height: "14px", color: "#FA5A15" }} />}
            <span style={{ fontSize: "13px", fontWeight: "900", color: "#361E1B" }}>NOAH AI Writer</span>
          </div>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: "900", textAlign: "center", marginBottom: "6px", letterSpacing: "-1px" }}>
          {mode === "login" && "Welcome Back!"}
          {mode === "signup" && "Create Account!"}
          {mode === "forgot" && "Reset Safe!"}
          <Sparkles style={{ display: "inline-block", width: "22px", height: "22px", color: "#FA5A15", verticalAlign: "middle" }} />
        </h2>
        <p style={{ fontSize: "14px", fontWeight: "600", color: "#6E4A45", textAlign: "center", marginBottom: "24px" }}>
          {mode === "login" && "Log in to unleash your writing superpower."}
          {mode === "signup" && "Join the guild to generate conversion-ready copy."}
          {mode === "forgot" && "Enter your email link to patch your dashboard entry."}
        </p>

        <form onSubmit={handleAuth}>
          {/* Email Input Field */}
          <div className="noah-input-wrapper">
            <input
              type="email"
              placeholder="Your favorite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="noah-native-input"
            />
          </div>

          {/* Password Input Field (Hidden during Reset mode) */}
          {mode !== "forgot" && (
            <div className="noah-input-wrapper">
              <input
                type="password"
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="noah-native-input"
              />
            </div>
          )}

                    {/* Confirm Password Input Field (Only visible during Sign Up) */}
          {mode === "signup" && (
            <div className="noah-input-wrapper">
              <input
                type="password"
                placeholder="Confirm your secret password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="noah-native-input"
              />
            </div>
          )}

          {mode === "login" && (
            <div style={{ textAlign: "right", marginBottom: "16px" }}>
              <span onClick={() => setMode("forgot")} className="noah-switch-label" style={{ fontSize: "13px" }}>
                Forgot password?
              </span>
            </div>
          )}

          <button type="submit" disabled={loading} className="noah-btn-primary">
            {loading && "Opening Gate... 🏃‍♂️"}
            {!loading && mode === "login" && "Log Me In! 🔥"}
            {!loading && mode === "signup" && "Start Free 🚀"}
            {!loading && mode === "forgot" && "Send Reset Link! 📡"}
          </button>
        </form>

        {success && (
          <div className="noah-success-alert">
            <CheckCircle style={{ width: "18px", height: "18px", color: "#16A34A" }} />
            <span>{success}</span>
          </div>
        )}

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#6E4A45", marginBottom: "12px" }}>
            {mode === "login" && (
              <>New to NOAH? <span onClick={() => setMode("signup")} className="noah-switch-label" style={{ color: "#FA5A15", fontWeight: "800" }}>Create an account</span></>
            )}
            {mode === "signup" && (
              <>Already registered? <span onClick={() => setMode("login")} className="noah-switch-label" style={{ color: "#FA5A15", fontWeight: "800" }}>Log in here</span></>
            )}
            {mode === "forgot" && (
              <>Found your password? <span onClick={() => setMode("login")} className="noah-switch-label" style={{ color: "#FA5A15", fontWeight: "800" }}>Return to login</span></>
            )}
          </p>
          <Link to="/" style={{ fontSize: "13px", fontWeight: "800", color: "#6E4A45", textDecoration: "none" }}>⬅️ Back home</Link>
        </div>
      </div>
    </div>
  );
}

