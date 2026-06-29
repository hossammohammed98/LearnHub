import NotificationItem from "./NotificationItem";
import { Bell, Mail, Megaphone, Smartphone } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  color: string;
  icon: LucideIcon;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: "email",
    title: "إشعارات البريد الإلكتروني",
    description: "الحصول على تحديثات الدروس والمهام عبر البريد",
    enabled: true,
    color: "secondary",
    icon: Mail,
  },
  {
    id: "app",
    title: "تنبيهات التطبيق",
    description: "تنبيهات فورية عند بدء الدروس المباشرة",
    enabled: true,
    color: "primary",
    icon: Smartphone,
  },
  {
    id: "offers",
    title: "العروض الترويجية",
    description: "الحصول على آخر الخصومات والعروض التعليمية",
    enabled: false,
    color: "emerald",
    icon: Megaphone,
  },
];
export default function NotificationSettings() {
  return (
    <section
      id="notifications"
      className="overflow-hidden rounded-3xl border-t-4 border-secondary bg-white shadow-sm"
    >
      <div className="p-8">
        <header className="mb-6 flex items-center gap-3">
          <Bell className="text-secondary" />

          <h2 className="text-2xl font-bold">
            إعدادات الإشعارات
          </h2>
        </header>

        <div className="space-y-4">
          {notificationSettings.map((setting) => (
            <NotificationItem
              key={setting.id}
              {...setting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}