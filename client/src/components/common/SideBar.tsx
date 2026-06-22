import {
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  MessageSquareWarning,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
interface ss {
  icon: LucideIcon;
  name: string;
  href: string;
}
const sideBarItems: ss[] = [
  {
    icon: LayoutDashboard,
    name: "لوحة القيادة",
    href: "/",
  },
  {
    icon: GraduationCap,
    name: "الدورات",
    href: "/",
  },
  {
    icon: MessageSquare,
    name: "الرسائل",
    href: "/",
  },
  {
    icon: CalendarDays,
    name: "الجدول",
    href: "/",
  },
  {
    icon: Settings,
    name: "الإعدادات",
    href: "/",
  },
  {
    icon: MessageSquareWarning,
    name: "الدعم",
    href: "/",
  },
];
function SideBar() {
  return (
    <aside>
      <div className="bg-white w-15 sm:w-[20vw] h-screen  pr-[1vw] flex flex-col justify-start items-start gap-2">
        <div className="flex items-center gap-2 mt-[3vh] sm:mb-3 pr-2 sm:pr-4">
          <div className="rounded-full w-9 h-9 sm:w-[5vw] sm:h-[5vw] bg-[#D8E3FB]">
            <Image
              className="rounded-full w-9 h-9 sm:w-[5vw] sm:h-[5vw]"
              width={48}
              height={48}
              src="/images/user.png"
              alt="user photo"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] text-primary">مرحباً بك</p>
            <p className="text-[9px] text-[#45474C]">طالب العلم</p>
          </div>
        </div>
        <ul className="flex flex-col pl-4 text-[#45474C]">
          {sideBarItems.map((a, i) => {
            const Icon = a.icon;
            return (
              <li
                key={i}
                className="flex flex-row items-center gap-2 pr-4 ma w-14 sm:w-[19vw] h-11 hover:bg-[#f5f5f5]">
                <Icon />
                <p className="text-[14px] hidden sm:flex">{a.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
