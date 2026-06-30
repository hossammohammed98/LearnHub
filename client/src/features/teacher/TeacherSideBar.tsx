"use client";
import SideBar from '@/components/common/SideBar';
import { useAuthStore } from '@/store/useAuthStore';
import
 {
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  MessageSquareWarning,
  Settings,
  SquarePlus,
} from "lucide-react";

interface SideBarProps {
  icon: LucideIcon;
  name: string;
  href: string;
}
const sideBarItem: SideBarProps[] = [
  {
    icon: LayoutDashboard,
    name: "لوحة القيادة",
    href: "/teacher",
  },
  {
    icon: GraduationCap,
    name: "الدورات",
    href: "/teacher",
  },
  {
    icon: MessageSquare,
    name: "الرسائل",
    href: "/chat",
  },
  {
    icon: Settings,
    name: "الإعدادات",
    href: "/settings",
  },
  {
    icon: SquarePlus,
    name: "إدارة المساعدين",
    href: "/AssistantsPage",
  },
  {
    icon: MessageSquareWarning,
    name: "الدعم",
    href: "/chat",
  },
];
function TeacherSideBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <SideBar
      sideBarItems={sideBarItem}
      userName={user ? `${user.FName} ${user.LName}`.trim() : "معلم"}
      userRole="معلم"
      avatarUrl={user?.Avatar || "/images/user.png"}
    />
  )
}

export default TeacherSideBar
