"use client";
import NotificationBell from "@/components/ui/NotificationBell";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";

import { Search, Settings, Bell } from "lucide-react";

export default function UploadNavbar() {
  return (
    <header
      dir="rtl"
      className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-6"
    >
      <div className="flex items-center gap-3 sm:gap-6">
        <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
          تعلّم
        </h1>

        {/* Search: hidden on the smallest screens to save space, visible from sm up */}
        <div className="relative hidden w-44 sm:block md:w-64">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-9 pl-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-4">
        {/* Search icon button: only on the smallest screens, opens the same
            search affordance without taking permanent header space */}
        <button
          type="button"
          aria-label="بحث"
          className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:hidden"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* <button
          type="button"
          aria-label="الإشعارات"
          className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <Bell className="h-5 w-5" />
        </button> */}

        <NotificationBell></NotificationBell>
        
        <Link
          href="/settings"
          aria-label="الإعدادات"
          className="hidden rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:inline-flex"
        >
          <Settings className="h-5 w-5" />
        </Link>

        {/* <button
          type="button"
          aria-label="الملف الشخصي"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-medium text-white ring-1 ring-emerald-800"
        >
          م
        </button> */}
        <Link href="/settings" aria-label="الملف الشخصي">
          <Avatar />
        </Link>
      </div>
    </header>
  );
}