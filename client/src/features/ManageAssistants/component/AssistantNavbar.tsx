"use client";
import LogoutButton from "@/components/common/LogoutButton";
import Link from "next/link";
import NotificationBell from "@/components/ui/NotificationBell";
import Avatar from "@/components/common/Avatar";
import { Search, RefreshCw } from "lucide-react";

export default function AssistantsNavbar() {
  return (
    <header
      dir="rtl"
      className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-6"
    >
      <div className="relative hidden w-44 sm:block md:w-72">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="البحث عن مساعد..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-9 pl-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <button
        type="button"
        aria-label="بحث"
        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:hidden"
      >
        <Search className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* <button
          type="button"
          aria-label="الإشعارات"
          className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button> */}
          <NotificationBell />
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
        <Link
          href="/teacher"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:text-sm"
        >
          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          تبديل الدور
        </Link>

        <LogoutButton />
      </div>
    </header>
  );
}