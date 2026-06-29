"use client";
import NotificationBell from "@/components/ui/NotificationBell";
import { useState } from "react";
import Link from "next/link";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-6 md:px-16"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between gap-4">
          {/* Right Side: Branding Logo & Desktop Navigation */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2"
            >
              <span className="text-[#007f5f]">تعلّم</span>
            </Link>

            {/* Hidden on mobile, visible on desktop */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
              <Link
                href="/"
                className="text-[#007f5f] hover:text-[#02664a] transition-all"
              >
                الرئيسية
              </Link>
              <Link
                href="#features"
                className="hover:text-slate-900 transition-all"
              >
                المميزات
              </Link>
              <Link
                href="#pricing"
                className="hover:text-slate-900 transition-all"
              >
                الأسعار
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 flex-1 md:flex-initial justify-end">
            <div className="relative w-full max-w-[240px] hidden md:block">
              <input
                type="text"
                placeholder="ابحث عن مسار أو درس..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-10 pl-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-200 focus:bg-white transition-all text-right"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button className="hidden sm:block bg-slate-940 hover:bg-slate-940 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all whitespace-nowrap">
              <Link
                href="/login"
                className="hidden sm:block bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all whitespace-nowrap text-center"
              >
                دخول
              </Link>
            </button>
            <NotificationBell></NotificationBell>

            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all flex-shrink-0">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              aria-label="Open Menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-2xl z-50 p-6 transform transition-transform duration-300 ease-out flex flex-col justify-between text-right ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <span className="text-xl font-black text-[#007f5f]">تعلّم</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 relative w-full">
            <input
              type="text"
              placeholder="ابحث عن مسار أو درس..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-10 pl-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <nav className="flex flex-col gap-5 mt-8 text-sm font-bold text-slate-600">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-[#007f5f] py-1"
            >
              الرئيسية
            </Link>
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-900 py-1 transition-all"
            >
              المميزات
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-900 py-1 transition-all"
            >
              الأسعار
            </Link>
          </nav>
        </div>

        <div className="sm:hidden space-y-3 pt-6 border-t border-slate-100">
          <button className="w-full bg-slate-950 text-white font-bold text-xs py-3 rounded-xl transition-all">
            دخول
          </button>
        </div>
      </div>
    </>
  );
}
