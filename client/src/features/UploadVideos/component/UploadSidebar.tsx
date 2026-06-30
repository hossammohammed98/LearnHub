"use client";

import {
  LayoutGrid,
  GraduationCap,
  BookOpen,
  BarChart2,
  Library,
  Plus,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "لوحة التحكم", icon: LayoutGrid, active: false, href: "/teacher" },
  { label: "فصولي", icon: GraduationCap, active: true, href: "/UploadVideos" },
  { label: "المناهج", icon: BookOpen, active: false, href: "/teacher" },
  { label: "التقارير", icon: BarChart2, active: false, href: "/teacher" },
  { label: "المكتبة", icon: Library, active: false, href: "/BrowescorsesPage" },
];

export default function UploadSidebar() {
  return (
    <aside
      dir="rtl"
      className="w-full border-b border-gray-200 bg-white lg:flex lg:h-full lg:w-64 lg:flex-col lg:justify-between lg:border-b-0 lg:border-l lg:px-4 lg:py-6"
    >
      <div className="hidden lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">تعلّم</p>
            <p className="text-xs text-gray-500">بوابة المعلم</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, active, href }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {label}
              </span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
            </Link>
          ))}
        </nav>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto px-3 py-2 lg:hidden">
        {navItems.map(({ label, icon: Icon, active, href }) => (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            title={label}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs whitespace-nowrap transition sm:text-sm ${
              active
                ? "bg-emerald-50 font-medium text-emerald-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex lg:flex-col lg:gap-3">
        <Link
          href="/UploadVideos"
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          <Plus className="h-4 w-4" />
          إضافة حصة جديدة
        </Link>

        <Link
          href="/chat"
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:text-gray-700"
        >
          <HelpCircle className="h-4 w-4" />
          الدعم الفني
        </Link>
      </div>
    </aside>
  );
}
