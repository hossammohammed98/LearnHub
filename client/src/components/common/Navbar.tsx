'use client';

import React from 'react';

interface NavBarProps {
  leftActions?: React.ReactNode;   
  centerContent?: React.ReactNode;
  rightActions?: React.ReactNode; 
  logoText?: string;
}

function Navbar({ leftActions, centerContent, rightActions, logoText = 'تعلّم' }: NavBarProps) {
  return (
    // Base layout wrapper setup
    <div className="w-full h-[90px] bg-white border-b border-gray-100 px-6 z-50 relative">

      <div className="flex flex-row justify-between items-center h-full max-w-7xl mx-auto">
        
        <div className="flex flex-row items-center gap-12 flex-1">
          <div className="flex items-center">
            <h2 className="font-bold text-2xl text-gray-900 tracking-tight">{logoText}</h2>
          </div>

       
          <nav className="hidden md:flex flex-row items-center gap-8 justify-start">
            {rightActions}
          </nav>
        </div>

        <div className="flex-1 max-w-md lg:max-w-xl mx-6 flex justify-center">
          <div className="w-full">
            {centerContent}
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 justify-end">
          {leftActions}
        </div>

      </div>
    </div>
  );
}

export default Navbar;