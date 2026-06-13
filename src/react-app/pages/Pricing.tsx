import React from "react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  const goToStripe = async (plan: string) => {
    try {
      const res = await fetch(
        "https://my-backend-1-qdhh.onrender.com/api/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.error || "Unable to start checkout.");
    } catch (err) {
      console.error(err);
      alert("Payment service unavailable.");
    }
  };

  return (
    <div className="bg-[#f7f6f3] min-h-screen py-16 px-6 text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>

      <p className="text-center text-gray-500 mb-12">
        Start free. Upgrade anytime.
      </p>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* FREE */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-3xl font-bold mt-2">$0</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Get Started Free
          </button>
        </div>

        {/* PRO */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold">Pro</h2>

          <button
            type="button"
            onClick={() => goToStripe("pro")}
            className="mt-6 w-full py-2 rounded bg-orange-500 text-white"
          >
            Upgrade
          </button>
        </div>

        {/* BUSINESS */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold">Business</h2>

          <button
            type="button"
            onClick={() => goToStripe("business")}
            className="mt-6 w-full py-2 rounded bg-orange-500 text-white"
          >
            Go Business
          </button>
        </div>

        {/* PREMIUM */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold">Premium</h2>

          <button
            type="button"
            onClick={() => goToStripe("premium")}
            className="mt-6 w-full py-2 rounded bg-orange-500 text-white"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
}
