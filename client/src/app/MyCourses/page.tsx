"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/features/BrowseCourses/component/CourseCard";
import StudentNavbar from "@/features/student/components/StudentNavbar";
import {
  ApiCourse,
  getCoursePrice,
  getCourseTitle,
  getMyCourses,
  getTeacherName,
} from "@/features/courses/services/courseService";
import { Course } from "@/features/BrowseCourses/component/types";
import RoleGuard from "@/components/common/RoleGuard";

const toCardCourse = (course: ApiCourse): Course => ({
  id: course._id,
  title: getCourseTitle(course),
  category: "Enrolled course",
  rating: 0,
  image: course.CoverImage || "/images/student.jpg",
  price: getCoursePrice(course),
  instructor: {
    name: getTeacherName(course),
    avatar: "/images/user.png",
  },
});

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMyCourses = async () => {
      try {
        const data = await getMyCourses();
        if (isMounted) setCourses(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Could not load your courses.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMyCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardCourses = useMemo(() => courses.map(toCardCourse), [courses]);

  return (
    <RoleGuard allowedRoles={["Student"]}>
      <div className="min-h-screen bg-[#FAFCFF] font-sans">
      <StudentNavbar />

      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-right">
            <p className="text-xs font-semibold text-teal-600">My learning</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="mt-1 text-sm text-gray-500">Open any course you bought and continue its lessons.</p>
          </div>
          <Link
            href="/BrowescorsesPage"
            className="rounded-lg border border-teal-100 bg-white px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50"
          >
            Browse more courses
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center text-gray-500">
            Loading your courses...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-red-600">
            {error}
          </div>
        )}

        {!isLoading && !error && cardCourses.length === 0 && (
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <h2 className="text-lg font-bold text-gray-900">No courses yet</h2>
            <p className="mt-2 text-sm text-gray-500">Courses you buy will appear here.</p>
          </div>
        )}

        {!isLoading && !error && cardCourses.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cardCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                actionLabel="Start learning"
                actionHref={`/courses?courseId=${course.id}`}
              />
            ))}
          </div>
        )}
      </main>
      </div>
    </RoleGuard>
  );
}
