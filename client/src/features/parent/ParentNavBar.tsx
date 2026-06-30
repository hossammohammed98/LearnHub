'use client';

import Navbar from '@/components/common/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const navItems = [
  { label: 'الرئيسية', href: '/parent' },
  { label: 'الأبناء', href: '/parent' },
  { label: 'إضافة ابن', href: '/parent/add-child' },
];

export default function ParentNavBar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const displayName = user?.FName || 'ولي الأمر';

  const rightActions = (
    <div className="hidden md:flex items-center gap-3">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-semibold transition ${
              isActive ? 'text-[#006644]' : 'text-slate-600 hover:text-[#005236]'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <Navbar
      logoText="تعلّم"
      logoHref="/parent"
      centerContent={
        <div className="text-right text-sm font-bold text-slate-900">
          أهلاً بك، {displayName}
        </div>
      }
      rightActions={rightActions}
    />
  );
}
