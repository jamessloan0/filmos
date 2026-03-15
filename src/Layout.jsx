import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard,
  Plus,
  LogOut,
  Menu,
  X,
  ChevronRight } from
"lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
{ label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
{ label: "New Project", icon: Plus, page: "CreateProject" }];


export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Client portal pages don't get layout
  if (currentPageName === "ClientPortal") {
    return <>{children}</>;
  }

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Mobile overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-zinc-950 text-white flex flex-col transform transition-transform duration-300 ease-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`
        }>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800">
          <Link
            to={createPageUrl("Dashboard")}
            className="flex items-center">

            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b490115c68bd1fe6d609a8/5053cc76b_filmOSlogomain-removebg-preview.png"

            alt="FilmOS" className="h-8 w-auto brightness-0 invert" />


          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive ?
                "bg-zinc-800 text-white" :
                "text-zinc-400 hover:text-white hover:bg-zinc-900"}`
                }>

                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive &&
                <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />
                }
              </Link>);

          })}
        </nav>

        {/* User section */}
        {user &&
        <div className="px-3 py-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500 text-sm font-semibold">
                {user.full_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {user.full_name || "Filmmaker"}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors mt-1">

              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        }
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-200 bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-zinc-100">

            <Menu className="w-5 h-5 text-zinc-700" />
          </button>
          <div className="flex items-center">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b490115c68bd1fe6d609a8/dc115084a_filmOSlogomain-removebg-preview.png"

            alt="FilmOS" className="h-7 w-auto" />


          </div>
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>);

}