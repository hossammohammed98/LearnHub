"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SideBarItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

interface SidebarProps {
  sideBarItems?: SideBarItem[];
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

function SideBar({
  sideBarItems = [],
  userName = "مرحباً بك",
  userRole = "طالب العلم",
  avatarUrl = "/images/user.png",
}: SidebarProps) {
  const pathName = usePathname();

  return (
    <aside>
      <div className="flex h-screen w-20 flex-col gap-2 border-l border-gray-100 bg-white px-2 py-4 sm:w-72 sm:px-3">
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#F6F7F9] p-2 sm:mb-3 sm:px-3 sm:py-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#D8E3FB] sm:h-11 sm:w-11">
            {avatarUrl.startsWith("http") ? (
              <img
                src={avatarUrl}
                alt="صورة المستخدم"
                className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
              />
            ) : (
              <Image
                className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
                width={48}
                height={48}
                src={avatarUrl}
                alt="صورة المستخدم"
              />
            )}
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-[13px] font-semibold text-slate-900">{userName}</p>
            <p className="text-[10px] text-slate-600">{userRole}</p>
          </div>
        </div>

        <ul className="flex flex-col gap-1 text-slate-600">
          {sideBarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathName === item.href || pathName.startsWith(`${item.href}/`);

            return (
              <Link key={item.name} href={item.href} className="block">
                <li
                  className={`flex h-12 items-center gap-3 rounded-2xl px-3 transition-all sm:px-4 ${
                    isActive
                      ? "bg-[#E6F7EF] text-[#00714D] shadow-sm"
                      : "text-slate-600 hover:bg-[#F6F7F9] hover:text-[#006644]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? "bg-[#006644] text-white" : "bg-[#F6F7F9] text-slate-600"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  <p className="hidden text-[14px] font-semibold sm:flex">{item.name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
