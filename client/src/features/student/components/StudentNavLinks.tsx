"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/student", name: "لوحة التحكم" },
  { href: "/BrowescorsesPage", name: "تصفح المسارات" },
  { href: "/MyCourses", name: "دوراتي" },
  { href: "/settings", name: "الإعدادات" },
];

export default function StudentNavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-row items-center gap-4 sm:gap-6 list-none shrink-0">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`relative pb-2 font-medium text-sm sm:text-base transition-colors duration-300 whitespace-nowrap
                after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-emerald-500
                after:right-0 after:transition-all after:duration-300 after:ease-in-out
                ${
                  isActive
                    ? "text-emerald-500 after:w-full"
                    : "text-gray-500 hover:text-emerald-600 after:w-0 hover:after:w-full"
                }
              `}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
