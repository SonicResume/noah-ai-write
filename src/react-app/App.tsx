import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FunBlogPostPage from "./pages/FunBlogPostPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wraps ALL pages */}
        <Route path="/" element={<Layout />}>

          {/* Home */}
          <Route index element={<LandingPage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* App */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Pages */}
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
  
          {/* 2. Added the new Blog path under your main Layout wrapper */}
          <Route path="blog" element={<FunBlogPostPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
