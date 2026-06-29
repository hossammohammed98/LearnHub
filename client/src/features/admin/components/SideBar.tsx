"use client";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi"; // Using react-icons since you just installed it!

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CoursesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FinanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const navItems: NavItem[] = [
  { label: "لوحة التحكم العامة", icon: <DashboardIcon />, href: "/dashboard" },
  { label: "إدارة المستخدمين",   icon: <UsersIcon />,    href: "/users" },
  { label: "اعتماد الدورات",     icon: <CoursesIcon />,  href: "/courses" },
  { label: "التقارير المالية",   icon: <FinanceIcon />,  href: "/finance" },
  { label: "إعدادات المنصة",    icon: <SettingsIcon />, href: "/settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("/dashboard");

  return (
    <aside
      dir="rtl"
      className="w-[260px] min-h-screen bg-[#0f172a] text-slate-300 border-l border-slate-800 flex flex-col justify-between py-6 select-none font-sans"
    >
      {/* Top Section Container */}
      <div className="flex flex-col w-full">
        
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-2 mb-8 px-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <LogoIcon />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white tracking-wide">
              تعلَّم
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              بوابة المعلم
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(item.href);
                }}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group
                  ${isActive 
                    ? "bg-emerald-950/40 text-emerald-400 border-r-4 border-emerald-500" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white border-r-4 border-transparent"
                  }`}
              >
                {/* Content text */}
                <span className="flex-1 text-right">{item.label}</span>
                
                {/* Icon wrapper */}
                <span className={`flex items-center shrink-0 transition-colors duration-200
                  ${isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`}
                >
                  {item.icon}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Logout Button */}
      <div className="px-3 pt-4 border-t border-slate-800/60">
        <button
          onClick={() => console.log("Logging out...")}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all duration-200 cursor-pointer group"
        >
          <span className="flex-1 text-right">تسجيل الخروج</span>
          <span className="flex items-center shrink-0 text-red-400/70 group-hover:text-red-400 text-lg">
            <FiLogOut />
          </span>
        </button>
      </div>
    </aside>
  );
}