"use client";
import React from 'react';
import { FamilyPerformance } from '@/features/parent/components/FamilyPerformance';
import { useAuthStore } from '@/store/useAuthStore';

export default function ParentDashboardPage() {
  const user=useAuthStore((state)=>state.user);
  return (
    <div className="w-full min-h-screen bg-gray-50/40 p-4 md:p-8" dir="rtl">
      <FamilyPerformance />
    </div>
  );
}