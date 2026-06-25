"use client";
import React from 'react';
 //call the components 
import { FamilyPerformance } from '@/features/parent/components/FamilyPerformance';

export default function ParentDashboardPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50/40 p-4 md:p-8" dir="rtl">
      <FamilyPerformance />
    </div>
  );
}