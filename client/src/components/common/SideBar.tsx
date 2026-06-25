"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface sideBarItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

interface SidebarProps  {
  sideBarItems:sideBarItem[];
}

function SideBar({sideBarItems}:SidebarProps ) {
  const pathName:string = usePathname()
  return (
    <aside>
      
      <div className="bg-white w-15 sm:w-64 h-screen  pr-[1vw] flex flex-col justify-start items-start gap-2">
        <div className="flex items-center gap-2 mt-[3vh] sm:mb-3 pr-2 sm:pr-4">
          <div className="rounded-full w-9 h-9 sm:w-11 sm:h-11 bg-[#D8E3FB]">
            <Image loading="eager"
              className="rounded-full w-9 h-9 sm:w-11 sm:h-11"
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
          {sideBarItems.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.name} href={a.href}>
                <li
                  className={cn("flex flex-row items-center gap-2 px-4 sm:w-64 h-11"
                  ,pathName===a.href?"text-emerald-500 rounded-xl sm:border-2 sm:bg-[#6CF8BB] sm:text-[#00714D]":"hover:w-32 sm:hover:w-61 hover:bg-[#f5f5f5] hover:*:block"
                  )}>
                  <div>
                  <Icon />
                  </div>
                  <p className="text-[14px] hidden sm:flex">{a.name}</p>
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
