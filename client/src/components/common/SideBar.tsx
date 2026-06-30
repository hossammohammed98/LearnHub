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
      <div className="bg-white w-15 sm:w-64 h-screen pr-[1vw] flex flex-col gap-2">
        <div className="flex items-center gap-2 mt-[3vh] sm:mb-3 pr-2 sm:pr-4">
          <div className="rounded-full w-9 h-9 sm:w-11 sm:h-11 bg-[#D8E3FB] overflow-hidden shrink-0">
            {avatarUrl.startsWith("http") ? (
              <img
                src={avatarUrl}
                alt="صورة المستخدم"
                className="rounded-full w-9 h-9 sm:w-11 sm:h-11 object-cover"
              />
            ) : (
              <Image
                className="rounded-full w-9 h-9 sm:w-11 sm:h-11 object-cover"
                width={48}
                height={48}
                src={avatarUrl}
                alt="صورة المستخدم"
              />
            )}
          </div>

          <div className="hidden sm:block min-w-0">
            <p className="text-[13px] text-primary truncate">{userName}</p>
            <p className="text-[9px] text-[#45474C]">{userRole}</p>
          </div>
        </div>

        <ul className="flex flex-col pl-4 text-[#45474C]">
          {sideBarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathName === item.href || pathName.startsWith(`${item.href}/`);

            return (
              <Link key={item.name} href={item.href}>
                <li
                  className={`flex flex-row items-center gap-2 px-4 sm:w-64 h-11 ${
                    isActive
                      ? "text-emerald-500 rounded-xl sm:border-2 sm:bg-[#6CF8BB] sm:text-[#00714D]"
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  <Icon className="shrink-0" />
                  <p className="hidden sm:flex text-[14px]">{item.name}</p>
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
