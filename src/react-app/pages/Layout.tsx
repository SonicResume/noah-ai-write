import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  const location = useLocation();

  // hide footer on tool page
  const hideFooter = location.pathname === "/tool";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Outlet />

      {!hideFooter && <Footer />}
    </div>
  );
}