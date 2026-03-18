import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import {
  Film, MessageSquareText, FolderKanban, HardDrive,
  GitBranch, CheckCircle2, Lock, ChevronRight, Play,
  Star, ArrowRight, Menu, X, FileText, Receipt, Heart, Loader2, Send
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquareText,
    title: "Timeline Comments",
    desc: "Clients leave feedback at exact timestamps — no more confusing email threads.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: FolderKanban,
    title: "Project Collaboration",
    desc: "All communication between filmmaker and client in one organized workspace.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: FileText,
    title: "Proposals",
    desc: "Send beautiful slide-based proposals that clients can approve or request changes on — all in one place.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Receipt,
    title: "Invoicing",
    desc: "Create and send invoices directly from your project. Track payment status and export PDFs instantly.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: GitBranch,
    title: "Version History",
    desc: "Upload multiple drafts and keep a clean record of every revision.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: HardDrive,
    title: "Large File Delivery",
    desc: "Upload and share high-quality video exports with secure, private download links you control.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a Project",
    desc: "Invite your client and upload your first draft in minutes.",
  },
  {
    n: "02",
    title: "Send a Proposal",
    desc: "Share a professional proposal for client approval before you begin.",
  },
  {
    n: "03",
    title: "Collaborate on Edits",
    desc: "Clients review videos and leave timestamp-precise comments.",
  },
  {
    n: "04",
    title: "Invoice & Deliver",
    desc: "Send an invoice and deliver the final video with a secure download link.",
  },
];

const PRICE_ID = "price_1TBjPC7bpL2WPaP2w4XyIimC";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistDone, setWaitlistDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect admin users to dashboard
    base44.auth.me().then((u) => {
      if (u?.role === 'admin') navigate("/Dashboard");
    }).catch(() => {});
  }, []);

  const handleWaitlistSubmit = async (e, source = "hero") => {
    e?.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistSubmitting(true);
    try {
      await base44.entities.WaitlistEmail.create({ email: waitlistEmail.trim(), source });
      setWaitlistDone(true);
      setWaitlistEmail("");
    } catch (_) {}
    setWaitlistSubmitting(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToLogin = () => base44.auth.redirectToLogin();

  const handleProCheckout = async () => {
    if (window.self !== window.top) {
      alert("Checkout is only available from the published app. Please open the app in a new tab.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await base44.functions.invoke("stripeCreateCheckout", {
        priceId: PRICE_ID,
        successUrl: `${window.location.origin}/Dashboard?upgraded=true`,
        cancelUrl: window.location.origin,
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Could not start checkout. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-100" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img
              src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png"
              alt="FilmOS"
              className="h-7 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Features</a>
            <a href="#how" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={goToLogin} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2">
              Log in
            </button>
            <button onClick={goToLogin} className="text-sm font-semibold bg-zinc-900 text-white px-5 py-2 rounded-xl hover:bg-zinc-700 transition-colors shadow-sm">
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-100 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm text-zinc-600 py-2" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" className="block text-sm text-zinc-600 py-2" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#pricing" className="block text-sm text-zinc-600 py-2" onClick={() => setMenuOpen(false)}>Pricing</a>
            <div className="flex flex-col gap-2 pt-2">
              <button onClick={goToLogin} className="text-sm font-medium border border-zinc-200 rounded-xl px-4 py-2.5">Log in</button>
              <button onClick={goToLogin} className="text-sm font-semibold bg-zinc-900 text-white rounded-xl px-4 py-2.5">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-sky-50 via-violet-50/40 to-transparent rounded-full blur-3xl opacity-70" />
          <div className="absolute top-40 right-0 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
          <div className="absolute top-20 left-0 w-60 h-60 bg-violet-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-xs font-medium text-zinc-600">Made by filmmakers, for filmmakers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.05]">
            Client Collaboration<br />
            <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              Built for Filmmakers
            </span>
          </h1>

          <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            We built the tool we always wished we had — proposals, feedback, invoicing, and file delivery in one place. No more juggling apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={goToLogin}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-8 py-3.5 rounded-2xl text-base shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToLogin}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-medium px-8 py-3.5 rounded-2xl text-base shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Play className="w-4 h-4 text-sky-500" />
              Log In
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl overflow-hidden p-1">
            <div className="bg-zinc-950 rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                  <Film className="w-9 h-9 text-white" />
                </div>
                <p className="text-zinc-400 text-sm font-medium">Video Review with Timeline Comments</p>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-sky-500 rounded-full" />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">1:24 / 3:45</span>
                </div>
                <div className="flex gap-2">
                  {["Great transition here", "Fix audio", "Perfect shot"].map((c, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-300">
                      💬 {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILMMAKER CALLOUT ── */}
      <section className="py-16 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            <span className="text-white font-semibold">We're filmmakers too.</span> We got tired of sending proposals over email, chasing invoice payments, and getting feedback like "you know, the part around 2 minutes." FilmOS is the platform we built for ourselves — and now we're sharing it.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-zinc-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-sky-500 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Everything from pitch<br />to final delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-7 border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className={`w-11 h-11 ${f.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              From first pitch<br />to final delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-start">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-zinc-200 to-transparent -translate-x-8 z-0" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center text-sm font-bold mb-5 shadow-md flex-shrink-0 z-10">
                  {s.n}
                </div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 bg-zinc-50/60">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-zinc-500 mb-12">Start free. Upgrade when you're ready.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-7 pt-7 pb-6 flex-1">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Free</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-zinc-900">$0</span>
                  <span className="text-zinc-400 mb-1">/ month</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">Try FilmOS with your first project.</p>
                <ul className="space-y-2.5">
                  {[
                    "1 project",
                    "All core features included",
                    "Video review & comments",
                    "Proposals & invoicing",
                    "File uploads up to 2 GB",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-600">
                      <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <button
                  onClick={goToLogin}
                  className="w-full border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold py-3 rounded-2xl text-sm transition-colors"
                >
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Pro */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col relative">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold bg-sky-500 text-white px-2.5 py-1 rounded-full">Popular</span>
              </div>
              <div className="px-7 pt-7 pb-6 flex-1">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Pro</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">$20</span>
                  <span className="text-zinc-400 mb-1">/ month</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6">For filmmakers running a real business.</p>
                <ul className="space-y-2.5">
                  {[
                    "Unlimited projects",
                    "Everything in Free",
                    "File uploads up to 20 GB",
                    "Extended file storage (14 days)",
                    "Priority support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-7 pb-7">
                <button
                  onClick={handleProCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-white hover:bg-zinc-100 text-zinc-900 font-semibold py-3 rounded-2xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Subscribe — $20/month <ChevronRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

            <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Run your film business<br />like a pro.
            </h2>
            <p className="relative text-zinc-400 mb-8 text-base">
              Join filmmakers who use FilmOS to win more clients and deliver work they're proud of.
            </p>
            <button
              onClick={goToLogin}
              className="relative inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-2xl text-base hover:bg-zinc-100 transition-all duration-200 shadow-lg"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png"
              alt="FilmOS"
              className="h-7 w-auto"
            />
            <p className="text-xs text-zinc-400 max-w-xs text-center md:text-left">
              Made by filmmakers, for filmmakers. Proposals, collaboration, invoicing, and delivery — all in one place.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={goToLogin} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Log in</button>
            <button onClick={goToLogin} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Sign up</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} FilmOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/Terms" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">Terms of Service</a>
            <a href="/Privacy" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}