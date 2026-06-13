export default function PricingPage() {
  const goToStripe = async (plan: string) => {
    const res = await fetch("https://your-backend.onrender.com/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        plan,
        email: "test@example.com" // replace with real user email
      })
    });

    const data = await res.json();

    if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  const plans = [
    {
      name: "Free",
      plan: "free",
      price: "$0",
      period: "forever",
      features: ["20 free credits", "Basic AI tools", "Limited usage"],
      button: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      plan: "pro",
      price: "$15",
      period: "per month",
      features: ["150 credits", "All AI tools", "Faster processing"],
      button: "Upgrade",
      highlight: false
    },
    {
      name: "Business",
      plan: "business",
      price: "$29",
      period: "per month",
      features: ["500 credits", "Priority speed", "Best value plan"],
      button: "Go Business",
      highlight: true
    },
    {
      name: "Premium",
      plan: "premium",
      price: "$49",
      period: "per month",
      features: ["Unlimited credits", "Fastest AI responses", "Premium support"],
      button: "Go Premium",
      highlight: false
    }
  ];

  return (
    <div className="bg-[#f7f6f3] min-h-screen py-16 px-6 text-gray-900">

      <h1 className="text-4xl font-bold text-center mb-4">
        Pricing
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Start free. Upgrade anytime. No commitment.
      </p>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {plans.map((p, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-xl shadow-sm border transition ${
              p.highlight
                ? "border-orange-400 scale-105 relative"
                : "border-gray-200"
            }`}
          >
            {p.highlight && (
              <p className="absolute top-2 right-2 text-xs text-orange-600 font-semibold">
                Most Popular
              </p>
            )}

            <h2 className="text-xl font-semibold">{p.name}</h2>

            <p className="text-3xl font-bold mt-2">{p.price}</p>

            <p className="text-sm text-gray-500">{p.period}</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {p.features.map((f, idx) => (
                <li key={idx}>✓ {f}</li>
              ))}
            </ul>

            <button
              onClick={() => goToStripe(p.plan)}
              className={`mt-6 w-full py-2 rounded transition ${
                p.plan === "free"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {p.button}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
