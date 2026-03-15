import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X } from "lucide-react";

export default function UpgradeModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-zinc-500" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 px-8 py-10 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Upgrade to Pro</h2>
          <p className="text-zinc-400 text-sm">Unlock unlimited projects and full platform access.</p>
        </div>

        {/* Pricing */}
        <div className="px-8 py-6 bg-white">
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-4xl font-bold text-zinc-900">$20</span>
            <span className="text-zinc-400 text-sm">/month</span>
          </div>

          <ul className="space-y-3 mb-7">
            {[
              "Unlimited projects",
              "All workspace features",
              "File uploads & storage",
              "Client portal & proposals",
              "Invoicing & feedback tools",
              "Priority support",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 h-11 text-base font-semibold rounded-xl">
            <Sparkles className="w-4 h-4 mr-2" />
            Subscribe — $20/month
          </Button>
          <p className="text-center text-xs text-zinc-400 mt-3">
            Cancel anytime · Secure payment via Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}