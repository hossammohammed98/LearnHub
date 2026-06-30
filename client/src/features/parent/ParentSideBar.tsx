'use client';

import { useAuthStore } from '@/store/useAuthStore';
import SideBar from '@/components/common/SideBar';
import { BookOpen, UserPlus, Users } from 'lucide-react';

const sideBarItems = [
  { icon: Users, name: 'الرئيسية', href: '/parent' },
  { icon: BookOpen, name: 'الأبناء', href: '/parent' },
  { icon: UserPlus, name: 'إضافة ابن', href: '/parent/add-child' },
];

export default function ParentSideBar() {
  const user = useAuthStore((state) => state.user);
  const userName = user ? `${user.FName} ${user.LName}` : 'ولي الأمر';
  const userRole = user?.Role === 'Parent' ? 'ولي أمر' : 'عضو';

  return (
    <SideBar
      sideBarItems={sideBarItems}
      userName={userName}
      userRole={userRole}
      avatarUrl={user?.Avatar || '/images/user.png'}
    />
  );
}
