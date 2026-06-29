"use client";
import SideBar from '@/components/common/SideBar';
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
    href: "/courses",
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
  return (
    <SideBar sideBarItems = {sideBarItem}></SideBar>
  )
}

export default TeacherSideBar