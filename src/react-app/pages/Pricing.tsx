export default function PricingPage() {
  const goToStripe = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 text-gray-900">
      
      <h1 className="text-4xl font-bold text-center mb-4">
        Pricing
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Start free. Upgrade anytime. No commitment.
      </p>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {/* FREE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-3xl font-bold mt-2">$0</p>
          <p className="text-sm text-gray-500">forever</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ 20 free credits</li>
            <li>✅ Basic AI tools</li>
            <li>❌ Limited usage</li>
          </ul>

          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
          >
            Get Started
          </button>
        </div>

        {/* PRO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="text-3xl font-bold mt-2">$15</p>
          <p className="text-sm text-gray-500">per month</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ 150 credits</li>
            <li>✅ All AI tools</li>
            <li>✅ Faster processing</li>
          </ul>

          <button
            onClick={() =>
              goToStripe("https://buy.stripe.com/bJe6oJ3zke4y3Vq8rR8k80j")
            }
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Upgrade
          </button>
        </div>

        {/* BUSINESS (highlighted) */}
        <div className="bg-white p-6 rounded-xl shadow border-2 border-black scale-105 relative">
          <p className="absolute top-2 right-2 text-xs text-green-600 font-semibold">
            Most Popular
          </p>

          <h2 className="text-xl font-semibold">Business</h2>
          <p className="text-3xl font-bold mt-2">$29</p>
          <p className="text-sm text-gray-500">per month</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ 500 credits</li>
            <li>✅ Priority speed</li>
            <li>✅ Best value plan</li>
          </ul>

          <button
            onClick={() =>
              goToStripe("https://buy.stripe.com/8x2dRb1rc0dIfE8dMb8k809")
            }
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Go Business
          </button>
        </div>

        {/* PREMIUM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Premium</h2>
          <p className="text-3xl font-bold mt-2">$49</p>
          <p className="text-sm text-gray-500">per month</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✅ Unlimited credits</li>
            <li>✅ Fastest AI responses</li>
            <li>✅ Premium support</li>
          </ul>

          <button
            onClick={() =>
              goToStripe("https://buy.stripe.com/8x228t8TEbWq9fK23t8k80k")
            }
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Go Premium
          </button>
        </div>

      </div>
    </div>
  );
}