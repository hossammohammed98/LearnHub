"use client";
import SideBar from '@/components/common/SideBar';
import
 {
  CalendarDays,
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
    href: "/dashboard",
  },
  {
    icon: GraduationCap,
    name: "الدورات",
    href: "/Courses",
  },
  {
    icon: MessageSquare,
    name: "الرسائل",
    href: "/Messages",
  },
  {
    icon: CalendarDays,
    name: "الجدول",
    href: "/Calendar",
  },
  {
    icon: Settings,
    name: "الإعدادات",
    href: "/Settings",
  },
  {
    icon: SquarePlus,
    name:"اضافة مساعد",
    href:"/addAssistant"
  },
  {
    icon: MessageSquareWarning,
    name: "الدعم",
    href: "/support",
  },
];
function TeacherSideBar() {
  return (
    <SideBar sideBarItems = {sideBarItem}></SideBar>
  )
}

export default TeacherSideBar