"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  MessageSquareWarning,
  Settings,
} from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

const sideBarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    name: "لوحة القيادة",
    href: "/register",
  },
  {
    icon: GraduationCap,
    name: "المسارات",
    href: "/BrowserCourses",
  },
  {
    icon: MessageSquare,
    name: "الرسائل",
    href: "/chat",
  },
  {
    icon: CalendarDays,
    name: "الجدول",
    href: "/teacher",
  },
  {
    icon: Settings,
    name: "الإعدادات",
    href: "/settings",
  },
  {
    icon: MessageSquareWarning,
    name: "الدعم",
    href: "/chat",
  },
];

export default function BrowseSidebar() {
  // Defaulting to index 1 ("المسارات") to match your layout's active page
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <div className="flex h-full w-60 shrink-0 flex-col justify-between border-l border-gray-200 bg-white px-4 py-6">
      <nav className="flex flex-col gap-1.5">
        {sideBarItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeIndex === i;

          return (
            <Link
              href={item.href}
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 text-right
                ${
                  isActive
                    ? "bg-[#25a18e]/10 text-[#25a18e]"
                    : "text-gray-500 hover:bg-[#006C49]/10 hover:text-[#006C49]"
                }`}
            >
              <span>{item.name}</span>
              <Icon size={20} strokeWidth={1.8} />
            </Link>
          );
        })}
      </nav>

      {/* Progress card */}
      <div className="rounded-2xl bg-gray-50 p-4 mt-auto">
        <p className="mb-3 text-sm font-semibold text-gray-800">تقدمك الحالي</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[67%] rounded-full bg-[#006C49]" />
        </div>
        <p className="mt-3 text-xs leading-5 text-gray-500">لقد أكملت 67% من مسار "تطوير الويب"</p>
      </div>
    </div>
  );
}