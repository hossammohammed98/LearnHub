import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  activeSection: string;
}

import {
  Bell,
  Lock,
  Palette,
  User,
} from "lucide-react";

const settingsNavigation = [
  {
    id: "profile",
    title: "الملف الشخصي",
    href: "#profile",
    icon: User,
  },
  {
    id: "notifications",
    title: "الإشعارات",
    href: "#notifications",
    icon: Bell,
  },
  {
    id: "security",
    title: "الأمان والخصوصية",
    href: "#security",
    icon: Lock,
  },
  {
    id: "appearance",
    title: "المظهر واللغة",
    href: "#appearance",
    icon: Palette,
  },
];
export default function SettingsSidebar({
  activeSection,
}: Props) {
  return (
    <aside className="space-y-4">
      <nav className="rounded-3xl bg-white p-4 shadow-sm">
        <ul className="space-y-1">
          {settingsNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors
                    ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} />
                    {item.title}
                  </span>

                  <ChevronLeft size={18} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}