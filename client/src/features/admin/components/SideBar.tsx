"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { BookOpen, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { label: "لوحة التحكم العامة", icon: <LayoutDashboard className="h-5 w-5" />, href: "/admin" },
  { label: "إدارة المساعدين", icon: <Users className="h-5 w-5" />, href: "/AssistantsPage" },
  { label: "الدورات", icon: <BookOpen className="h-5 w-5" />, href: "/courses" },
  { label: "الرسائل", icon: <MessageSquare className="h-5 w-5" />, href: "/chat" },
  { label: "إعدادات المنصة", icon: <Settings className="h-5 w-5" />, href: "/settings" },
];

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside dir="rtl" className="flex min-h-screen w-[260px] flex-col justify-between border-l border-slate-800 bg-[#0f172a] py-6 font-sans text-slate-300 select-none">
      <div className="flex w-full flex-col">
        <div className="mb-8 flex flex-col items-center gap-2 px-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-900/20">
            <LogoIcon />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold tracking-wide text-white">تعلَّم</div>
            <div className="mt-0.5 text-xs text-slate-400">بوابة المعلم</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl border-r-4 px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "border-emerald-500 bg-emerald-950/40 text-emerald-400"
                    : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <span className="flex-1 text-right">{item.label}</span>
                <span className={`flex shrink-0 items-center transition-colors duration-200 ${isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                  {item.icon}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800/60 px-3 pt-4">
        <Link
          href="/login"
          className="group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-950/20 hover:text-red-300"
        >
          <span className="flex-1 text-right">تسجيل الخروج</span>
          <span className="flex items-center shrink-0 text-lg text-red-400/70 group-hover:text-red-400">
            <FiLogOut />
          </span>
        </Link>
      </div>
    </aside>
  );
}