"use client";

import React from "react";
import PromoBanner from "@/features/BrowseCourses/component/PromoBanner";
import { CourseCard } from "@/features/BrowseCourses/component/CourseCard";
import { Pagination } from "@/features/BrowseCourses/component/Pagination";
import SidebarFilter from "@/features/BrowseCourses/component/SideBarFilter";
import SortTabs from "@/features/BrowseCourses/component/SortTabs";
import BrowseHeader from "@/features/BrowseCourses/components/BrowseHeader";

// Import your custom API hook
import { useBrowseCourses } from "@/features/BrowseCourses/useBrowseCourses";

export default function BrowseCoursesPage() {
  // Get the real data, loading state, and errors from your backend
  const { courses, isLoading, error } = useBrowseCourses();

  return (
    <div className="bg-[#FAFCFF] min-h-screen font-sans">
      {/* Full-width Navbar */}
      <BrowseHeader />

      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Right Sidebar (Filter) */}
          <div className="lg:col-span-1 order-1">
            <SidebarFilter />
          </div>

          {/* Left Main Content Area */}
          <div className="lg:col-span-3 order-2 flex flex-col gap-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block mb-0.5">
                  استكشف الدورات
                </span>
                <h1 className="text-sm text-gray-600 font-medium">
                  تم العثور على{" "}
                  {/* Show "..." while loading, otherwise show the real count */}
                  <span className="font-bold text-gray-900">
                    {isLoading ? "..." : courses.length}
                  </span>{" "}
                  دورة متاحة
                </h1>
              </div>

              <div className="flex justify-start sm:justify-end">
                <SortTabs />
              </div>
            </div>

            {/* --- API STATES START HERE --- */}

            {/* A. Loading State (Fixed: Replaced <Spinner /> with pure Tailwind CSS loader) */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-[24px]">
                <div className="w-8 h-8 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-500 text-sm font-medium">
                  جاري تحميل الدورات الدراسية...
                </p>
              </div>
            )}

            {/* B. Error State */}
            {error && (
              <div className="p-5 bg-red-50 border border-red-100 text-red-600 rounded-[24px] text-right font-medium text-sm">
                {error}
              </div>
            )}

            {/* C. Empty Data State */}
            {!isLoading && !error && courses.length === 0 && (
              <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-[24px]">
                <p className="text-gray-400 text-sm font-medium">
                  لا توجد كورسات متاحة لعرضها حالياً.
                </p>
              </div>
            )}

            {/* D. Success State (The Grid) */}
            {!isLoading && !error && courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
                {/* Loop over the REAL data instead of the fake array */}
                {courses.map((item) => (
                  <CourseCard key={item._id} course={item} />
                ))}
              </div>
            )}

            {/* --- API STATES END HERE --- */}

            <div className="w-full mt-2">
              <PromoBanner />
            </div>

            <div className="mt-4 flex justify-center">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
