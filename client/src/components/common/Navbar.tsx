'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import LogoutButton from './LogoutButton';

interface NavBarProps {
  leftActions?: React.ReactNode;   
  centerContent?: React.ReactNode;
  rightActions?: React.ReactNode; 
  logoText?: string;
  logoHref?: string;
}

function Navbar({
  leftActions,
  centerContent,
  rightActions,
  logoText = 'تعلّم',
  logoHref = '/landingpage',
}: NavBarProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full min-h-[90px] bg-white border-b border-gray-100 px-4 sm:px-6 z-50 relative">
      <div className="flex flex-row justify-between items-center gap-3 h-[90px] max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-4 sm:gap-8 flex-1 min-w-0">
          <Link href={logoHref} className="flex items-center shrink-0">
            <h2 className="font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
              {logoText}
            </h2>
          </Link>

          {rightActions && (
            <nav className="flex flex-row items-center min-w-0 overflow-x-auto">
              {rightActions}
            </nav>
          )}
        </div>

        {centerContent && (
          <div className="flex flex-1 max-w-[120px] xs:max-w-[160px] sm:max-w-md lg:max-w-xl mx-1 sm:mx-6 justify-center min-w-0">
            <div className="w-full">{centerContent}</div>
          </div>
        )}

        <div className="flex flex-row items-center gap-2 sm:gap-4 justify-end shrink-0">
          {leftActions}
          {user && <LogoutButton />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
