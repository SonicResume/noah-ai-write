import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  const location = useLocation();

  // The dashboard is the actual app workspace.
  // Keep the marketing navigation/footer on public pages.
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboard && <Navbar />}

      <Outlet />

      {!isDashboard && <Footer />}
    </div>
  );
}
