import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, email, plan } = req.body || {};

    if (!priceId) {
      return res.status(400).json({
        error: "Missing priceId",
      });
    }

    const billingResponse = await fetch(
      "https://billing-service-qorj.onrender.com/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: priceId,
          email: email || "supportsrg2025@gmail.com",
          plan,
          success_url:
            "https://noah-resume.vercel.app/pricing/success",
          cancel_url:
            "https://noah-resume.vercel.app/pricing/pricing",
        }),
      }
    );

    const data = await billingResponse.json();

    if (!billingResponse.ok) {
      console.error("Billing service error:", data);

      return res.status(billingResponse.status).json({
        error: "Checkout failed",
        detail:
          data?.detail ||
          data?.error ||
          "Billing service error",
      });
    }

    return res.status(200).json({
      url: data.url,
    });
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err);

    return res.status(500).json({
      error: "Checkout failed",
      detail: err?.message || "unknown error",
    });
  }
}