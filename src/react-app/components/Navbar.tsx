import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Helper function to dynamically add the playful wavy border on active tabs
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="noah-nav-container">
      {/* Dynamic CSS Styling Injector - Solves all clipping & responsiveness bugs */}
      <style>{`
        .noah-nav-container * {
          box-sizing: border-box !important;
          margin: 0;
          padding: 0;
        }
        .noah-nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          max-width: 1100px;
          margin: 0 auto;
          background-color: #FFFDF9;
          font-family: 'Inter', Arial, sans-serif;
        }
        .noah-nav-flex-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .noah-nav-brand {
          font-weight: 900;
          font-size: 18px;
          text-decoration: none;
          color: #361E1B;
          letter-spacing: -0.5px;
        }
        .noah-nav-center-menu {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .noah-nav-link {
          text-decoration: none;
          color: #6E4A45;
          font-size: 14px;
          font-weight: 700;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .noah-nav-link:hover {
          color: #FA5A15;
        }
        .noah-nav-link-active {
          color: #FA5A15;
          border-bottom: 2px wavy #FA5A15;
        }
        .noah-nav-btn-primary {
          padding: 10px 18px;
          background: linear-gradient(135deg, #FA5A15, #E04D03);
          color: #FFFFFF;
          border: 2.5px solid #361E1B;
          border-radius: 12px;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 3px 3px 0px 0px #361E1B;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .noah-nav-btn-primary:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px 0px #361E1B;
        }
        .noah-nav-btn-primary:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px 0px #361E1B;
        }
        
        /* Mobile Breakpoint Optimization Screen Shield */
        @media (max-width: 640px) {
          .noah-nav-center-menu {
            gap: 14px;
          }
          .noah-nav-brand {
            display: none; /* Collapses text name on small mobile viewports to prevent layout break */
          }
        }
      `}</style>

      {/* LEFT SECTION - Brand Identity */}
      <div className="noah-nav-flex-group">
        <img 
          src="/logo.png" 
          style={{ width: "30px", height: "30px", objectFit: "contain" }} 
          alt="NOAH AI Logo" 
        />
        <Link to="/" className="noah-nav-brand">
          NOAH AI Writer
        </Link>
      </div>

      {/* CENTER SECTION - Core Application Hub Links */}
      <div className="noah-nav-center-menu">
        <Link to="/" className={`noah-nav-link ${isActive("/") ? "noah-nav-link-active" : ""}`}>
          Home
        </Link>
        <Link to="/pricing" className={`noah-nav-link ${isActive("/pricing") ? "noah-nav-link-active" : ""}`}>
          Pricing
        </Link>
        <Link to="/blog" className={`noah-nav-link ${isActive("/blog") ? "noah-nav-link-active" : ""}`}>
          Blog 📝
        </Link>
        <Link to="/contact" className={`noah-nav-link ${isActive("/contact") ? "noah-nav-link-active" : ""}`}>
          Contact
        </Link>
      </div>

      {/* RIGHT SECTION - Single Access Gate (No separate signup route) */}
      <div className="noah-nav-flex-group">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="noah-nav-btn-primary">
            Log In 🔥
          </button>
        </Link>
      </div>

    </nav>
  );
}
