import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PRICE_ID = "price_1TBjPC7bpL2WPaP2w4XyIimC";

const PRO_FEATURES = [
  "Unlimited projects",
  "Everything in Free",
  "File uploads up to 20 GB",
  "Extended file storage (14 days)",
  "Priority support",
];

export default function UpgradeModal({ open, onClose, userEmail }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    // Block checkout inside iframe (Base44 preview)
    if (window.self !== window.top) {
      alert("Checkout is only available from the published app. Please open the app in a new tab.");
      return;
    }

    setLoading(true);
    try {
      const successUrl = `${window.location.origin}/Dashboard?upgraded=true`;
      const cancelUrl = `${window.location.origin}/Dashboard`;

      const res = await base44.functions.invoke("stripeCreateCheckout", {
        priceId: PRICE_ID,
        successUrl,
        cancelUrl,
        userEmail: userEmail || undefined,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Could not start checkout. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-zinc-500" />
        </button>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 px-8 py-10 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Upgrade to Pro</h2>
          <p className="text-zinc-400 text-sm">Unlock unlimited projects and 20 GB uploads.</p>
        </div>

        <div className="px-8 py-6 bg-white">
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-4xl font-bold text-zinc-900">$20</span>
            <span className="text-zinc-400 text-sm">/month</span>
          </div>

          <ul className="space-y-3 mb-7">
            {PRO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 h-11 text-base font-semibold rounded-xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {loading ? "Redirecting…" : "Subscribe — $20/month"}
          </Button>
          <p className="text-center text-xs text-zinc-400 mt-3">
            Cancel anytime · Secure payment via Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}