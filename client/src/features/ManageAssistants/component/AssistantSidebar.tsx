"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutGrid,
  PlayCircle,
  MessageSquare,
  Settings,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "لوحة التحكم", icon: LayoutGrid, href: "/teacher" },
  { label: "دوراتي", icon: BookOpen, href: "/courses" },
  { label: "دروس مباشرة", icon: PlayCircle, href: "/BrowserCourses" },
  { label: "الرسائل", icon: MessageSquare, href: "/chat" },
  { label: "إدارة المساعدين", icon: GraduationCap, href: "/AssistantsPage" },
  { label: "الإعدادات", icon: Settings, href: "/settings" },
];

export default function AssistantsSidebar() {
  const pathname = usePathname();

  return (
    <aside
      dir="rtl"
      className="w-full border-b border-gray-200 bg-white lg:flex lg:h-full lg:w-64 lg:flex-col lg:justify-between lg:border-b-0 lg:border-l lg:px-4 lg:py-6"
    >
      {/* Brand block + full nav: shown from lg up only */}
      <div className="hidden lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">تعلّم</p>
            <p className="text-xs text-gray-500">منصة التعليم الذكي</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-emerald-700 font-medium text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {label}
              </span>
            </Link>
          )})}
        </nav>
      </div>

      {/* Compact horizontal nav: shown on small/medium, hidden from lg up */}
      <nav className="flex items-center gap-1 overflow-x-auto px-3 py-2 lg:hidden">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
          <Link
            key={label}
            href={href}
            aria-current={isActive ? "page" : undefined}
            title={label}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs whitespace-nowrap transition sm:text-sm ${
              isActive
                ? "bg-emerald-700 font-medium text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </Link>
        )})}
      </nav>

      {/* Upgrade promo card: only on lg, where there's vertical room */}
      <div className="hidden rounded-xl bg-emerald-50 p-4 text-center lg:block">
        <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" />
          الترقية للممتاز
        </div>
        <Link href="/settings" className="block w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800">
          اكتشف الآن
        </Link>
      </div>
    </aside>
  );
}