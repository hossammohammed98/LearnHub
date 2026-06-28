'use client'
import React from 'react';
import PromoBanner from '@/features/BrowseCourses/component/PromoBanner';
import { CourseCard } from './../../features/BrowseCourses/component/CourseCard';
import { Pagination } from '@/features/BrowseCourses/component/Pagination';
import SidebarFilter from '@/features/BrowseCourses/component/SideBarFilter';
import Navbar from '@/features/landingpage/component/Navbar';
import SortTabs from '@/features/BrowseCourses/component/SortTabs';

export default function BrowseCoursesPage() {
  const totalCourses = Array.from({ length: 6 }, (_, i) => i); 

  return (
    <div className="bg-[#FAFCFF] min-h-screen font-sans">
      {/* Full-width Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Right Sidebar (Filter) - Order 1 ensures correct RTL placement */}
          <div className="lg:col-span-1 order-1">
            <SidebarFilter />
          </div>

          {/* Left Main Content Area */}
          <div className="lg:col-span-3 order-2 flex flex-col gap-6">
            
            {/* Header Row: Flex layout matching the alignment in Screenshot 2026-06-27 003146.jpg */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block mb-0.5">استكشف الدورات</span>
                <h1 className="text-sm text-gray-600 font-medium">
                  تم العثور على <span className="font-bold text-gray-900">128</span> دورة في تطوير البرمجيات
                </h1>
              </div>
              
              {/* SortTabs component using its internal defaults */}
              <div className="flex justify-start sm:justify-end">
                <SortTabs />
              </div>
            </div>

            {/* Single Unified Grid for All Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
              {totalCourses.map((_, index) => (
                <CourseCard key={`course-${index}`} />
              ))}
            </div>

            <div className="w-full mt-2">
              <PromoBanner />
            </div>

            {/* Pagination at the bottom center */}
            <div className="mt-4 flex justify-center">
              <Pagination />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}