"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PromoBanner from "@/features/BrowseCourses/component/PromoBanner";
import { CourseCard } from "@/features/BrowseCourses/component/CourseCard";
import SidebarFilter from "@/features/BrowseCourses/component/SideBarFilter";
import StudentNavbar from "@/features/student/components/StudentNavbar";
import { useAuthStore } from "@/store/useAuthStore";
import SortTabs from "@/features/BrowseCourses/component/SortTabs";
import {
  ApiCourse,
  getCoursePrice,
  getCourses,
} from "@/features/courses/services/courseService";
import {
  FilterValues,
  SortOption,
  filterBrowseCourses,
  getCourseActionHref,
  getCourseActionLabel,
  getDefaultFilters,
  sortBrowseCourses,
  toBrowseCourse,
} from "@/features/BrowseCourses/component/browseCourseUtils";

const MIN_PRICE_SLIDER_MAX = 5000;

export default function BrowseCoursesPage() {
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const maxPrice = useMemo(() => {
    const highestCoursePrice = courses.reduce(
      (max, course) => Math.max(max, getCoursePrice(course)),
      0,
    );
    return Math.max(MIN_PRICE_SLIDER_MAX, highestCoursePrice);
  }, [courses]);

  const [draftFilters, setDraftFilters] = useState<FilterValues>(() =>
    getDefaultFilters(MIN_PRICE_SLIDER_MAX),
  );
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(() =>
    getDefaultFilters(MIN_PRICE_SLIDER_MAX),
  );

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        const data = await getCourses();
        if (isMounted) {
          const nextCourses = data.filter((course) => course.Status !== "draft");
          const nextMaxPrice = Math.max(
            MIN_PRICE_SLIDER_MAX,
            nextCourses.reduce((max, course) => Math.max(max, getCoursePrice(course)), 0),
          );
          const nextDefaults = getDefaultFilters(nextMaxPrice);

          setCourses(nextCourses);
          setDraftFilters(nextDefaults);
          setAppliedFilters(nextDefaults);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "تعذر تحميل الدورات. حاول مرة أخرى.",
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const browseCourses = useMemo(() => courses.map(toBrowseCourse), [courses]);

  const visibleCourses = useMemo(() => {
    let filtered = filterBrowseCourses(browseCourses, appliedFilters);

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery) ||
          course.instructor.name.toLowerCase().includes(searchQuery) ||
          course.category.toLowerCase().includes(searchQuery),
      );
    }

    return sortBrowseCourses(filtered, sortBy);
  }, [browseCourses, appliedFilters, sortBy, searchQuery]);

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen font-sans">
      <StudentNavbar />

      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 order-1">
            <SidebarFilter
              filters={draftFilters}
              maxPrice={maxPrice}
              onChange={setDraftFilters}
              onApply={handleApplyFilters}
            />
          </div>

          <div className="lg:col-span-3 order-2 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block mb-0.5">
                  تصفح الدورات
                </span>
                <h1 className="text-sm text-gray-600 font-medium">
                  {searchQuery ? (
                    <>
                      نتائج البحث عن &quot;{searchParams.get("search")}&quot;:{" "}
                      <span className="font-bold text-gray-900">
                        {visibleCourses.length}
                      </span>{" "}
                      {visibleCourses.length === 1 ? "دورة" : "دورات"}
                    </>
                  ) : (
                    <>
                      تم العثور على{" "}
                      <span className="font-bold text-gray-900">
                        {visibleCourses.length}
                      </span>{" "}
                      {visibleCourses.length === 1 ? "دورة متاحة" : "دورات متاحة"}
                    </>
                  )}
                </h1>
              </div>

              <div className="flex justify-start sm:justify-end">
                <SortTabs onChange={setSortBy} defaultValue={sortBy} />
              </div>
            </div>

            {isLoading && (
              <div className="rounded-lg border border-gray-100 bg-white p-8 text-center text-gray-500">
                جاري تحميل الدورات...
              </div>
            )}

            {!isLoading && error && (
              <div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-red-600">
                {error}
              </div>
            )}

            {!isLoading && !error && visibleCourses.length === 0 && (
              <div className="rounded-lg border border-gray-100 bg-white p-8 text-center text-gray-500">
                لا توجد دورات مطابقة للفلاتر المحددة.
              </div>
            )}

            {!isLoading && !error && visibleCourses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
                {visibleCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    actionLabel={user?.Role === "Student" ? getCourseActionLabel(course) : "متاح للطلاب فقط"}
                    actionHref={user?.Role === "Student" ? getCourseActionHref(course) : undefined}
                    detailsHref={user?.Role === "Student" ? `/courses?courseId=${course.id}` : undefined}
                    isDisabled={user?.Role !== "Student"}
                  />
                ))}
              </div>
            )}

            <div className="w-full mt-2">
              <PromoBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
