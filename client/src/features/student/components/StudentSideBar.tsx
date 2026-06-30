"use client";

import SideBar from "@/components/common/SideBar";
import {
  BookOpen,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  Search,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

interface StudentSideBarItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

const sideBarItems: StudentSideBarItem[] = [
  { icon: LayoutDashboard, name: "لوحة التحكم", href: "/student" },
  { icon: BookOpen, name: "دوراتي", href: "/MyCourses" },
  { icon: Search, name: "تصفح المسارات", href: "/BrowescorsesPage" },
  { icon: MessageSquare, name: "الرسائل", href: "/chat" },
  { icon: Settings, name: "الإعدادات", href: "/settings" },
];

export default function StudentSideBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <SideBar
      sideBarItems={sideBarItems}
      userName={user ? `${user.FName} ${user.LName}`.trim() : "طالب"}
      userRole="طالب العلم"
      avatarUrl={user?.Avatar || "/images/user.png"}
    />
  );
}
