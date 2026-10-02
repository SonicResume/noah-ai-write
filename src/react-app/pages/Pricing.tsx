"use client";

import { useState } from "react";
import { auth } from "../firebase";

const plans = [
  {
    name: "Free",
    planKey: "free",
    price: 0,
    desc: "Turn photos, scans, and handwriting into editable digital text.",
    stripePriceId: null,
    features: [
      "10 OCR scans per day",
      "Extract text from images",
      "Handwritten text recognition",
      "Camera capture",
      "Image upload",
      "Recent scan history",
    ],
  },
  {
    name: "Pro",
    planKey: "pro",
    price: 19,
    desc: "Extract text, then use AI to rewrite, improve, summarize, and translate it.",
    stripePriceId: "price_1TbF9BPE4wCsfg732ScUJfmc",
    features: [
      "Unlimited OCR scans",
      "Handwriting-to-text",
      "Image & camera capture",
      "Editable extracted text",
      "AI writing tools",
      "AI translation",
      "Scan history",
    ],
  },
  {
    name: "Business",
    planKey: "business",
    price: 29,
    desc: "Turn documents into usable text and move directly into AI-powered writing and translation.",
    stripePriceId: "price_1TnzrFPE4wCsfg73xSOMZNuH",
    features: [
      "Everything in Pro",
      "High-volume OCR",
      "Advanced document processing",
      "AI rewriting & editing",
      "AI translation",
      "Document history",
      "Priority processing",
    ],
  },
  {
    name: "Premium",
    planKey: "premium",
    price: 49,
    desc: "Capture → OCR → Edit → Write → Translate — all in one workflow.",
    stripePriceId: "price_1TGwAJPE4wCsfg73gMQlv8Ph",
    features: [
      "Everything in Business",
      "Unlimited OCR",
      "Advanced document extraction",
      "Handwriting recognition",
      "AI writing & rewriting",
      "AI translation",
      "Document history",
      "Fastest processing",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function checkout(plan: (typeof plans)[number]) {
  if (plan.planKey === "free") {
    window.location.href = "/login";
    return;
  }

  setLoading(plan.planKey);

  try {
    const res = await fetch(
      "https://billing-service-qorj.onrender.com/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: plan.stripePriceId,
          email: auth.currentUser?.email || "supportsrg2025@gmail.com",
          plan: plan.planKey,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      }
    );

    const text = await res.text();

    let data: { url?: string; error?: string; detail?: string } = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Checkout service returned invalid data (${res.status})`);
    }

    if (!res.ok) {
      throw new Error(
        data.error ||
          data.detail ||
          `Checkout failed (${res.status})`
      );
    }

    if (!data.url) {
      throw new Error("Checkout URL was not returned.");
    }

    sessionStorage.setItem("noah_pending_plan", plan.planKey);
    window.location.href = data.url;
  } catch (err) {
    console.error("Checkout error:", err);
    alert(
      err instanceof Error
        ? err.message
        : "Something went wrong starting checkout."
    );
  } finally {
    setLoading(null);
  }
}

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#35D07F]/10 blur-3xl" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <div className="inline-flex px-4 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm mb-6">
            NOAH AI Visual
          </div>

          <h1 className="text-6xl font-black tracking-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-[#35D07F] bg-clip-text text-transparent">
              NOAH Plan
            </span>
          </h1>

          <p className="mt-8 text-xl text-zinc-400 max-w-3xl mx-auto">
            Scan documents, recognize handwritten text, and turn images into
            usable digital text with NOAH AI Visual.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const featured = plan.planKey === "business";

            return (
              <div
                key={plan.planKey}
                className={`relative rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${
                  featured
                    ? "border-[#35D07F] shadow-[0_0_60px_rgba(250,204,21,.15)] bg-zinc-900"
                    : "border-zinc-800 bg-zinc-950"
                }`}
              >
                {featured && (
                  <div className="bg-gradient-to-r from-[#35D07F] to-[#2DBA70] text-white text-center py-3 font-bold">
                    ★ MOST POPULAR ★
                  </div>
                )}

                <div className="p-8">
                  <h2 className="text-3xl font-bold">
                    {plan.planKey === "free"
                      ? "Scan & Extract"
                      : plan.planKey === "pro"
                      ? "OCR + AI Writing"
                      : plan.planKey === "business"
                      ? "Document Workflow"
                      : "Complete NOAH Workspace"}
                  </h2>

                  <p className="text-zinc-400 mt-3">{plan.desc}</p>

                  <div className="mt-8">
                    <span className="text-6xl font-black">
                      ${plan.price}
                    </span>

                    <span className="text-zinc-500 text-lg">/month</span>
                  </div>

                  <button
                    onClick={() => checkout(plan)}
                    disabled={loading !== null}
                    className={`mt-8 w-full rounded-xl py-4 font-bold text-lg transition ${
                      featured
                        ? "bg-gradient-to-r from-[#35D07F] to-[#2DBA70] text-black hover:scale-105"
                        : plan.planKey === "free"
                        ? "bg-zinc-800 hover:bg-zinc-700"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                    }`}
                  >
                    {loading === plan.planKey
                      ? "Processing..."
                      : plan.planKey === "free"
                      ? "Start Free"
                      : "Upgrade Now"}
                  </button>

                  <div className="mt-10 space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <div className="text-[#35D07F] mt-0.5">
                          ✓
                        </div>

                        <span className="text-zinc-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center text-zinc-500 text-sm">
          Secure payments powered by Stripe • Cancel anytime • No hidden fees
        </div>
      </section>
    </main>
  );
}