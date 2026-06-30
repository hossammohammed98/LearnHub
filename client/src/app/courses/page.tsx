"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CourseSidebar } from "../../features/courses/components/CourseSidebar";
import { LessonDetails } from "../../features/courses/components/LessonDetails";
import { CourseData, Lesson, mockCourse } from "../../features/courses/types";
import { getCourseDetails, toCourseContent } from "@/features/courses/services/courseService";
import RoleGuard from "@/components/common/RoleGuard";

const getFirstOpenLesson = (course: CourseData) =>
  course.units.flatMap((unit) => unit.lessons).find((lesson) => !lesson.isLocked);

export default function CoursePage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState<CourseData>(mockCourse);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(() => getFirstOpenLesson(mockCourse) || mockCourse.units[0].lessons[0]);
  const [isLoading, setIsLoading] = useState(Boolean(courseId));
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      if (!courseId) return;

      setIsLoading(true);
      try {
        const details = await getCourseDetails(courseId);
        const nextCourse = toCourseContent(details);
        const firstLesson = getFirstOpenLesson(nextCourse);

        if (isMounted) {
          setCourse(nextCourse);
          if (firstLesson) setCurrentLesson(firstLesson);
          setError(firstLesson ? "" : "This course does not have lessons yet.");
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Could not load course content.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const allLessons = useMemo(() => course.units.flatMap((unit) => unit.lessons), [course]);

  const handleNavigation = (direction: "next" | "prev") => {
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson.id,
    );

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];

      if (!nextLesson.isLocked) {
        setCurrentLesson(nextLesson);
      }
    } else if (direction === "prev" && currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setCurrentLesson(prevLesson);
    }
  };

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLesson.id,
  );
  const hasPrev = currentIndex > 0;
  const hasNext =
    currentIndex < allLessons.length - 1 &&
    !allLessons[currentIndex + 1]?.isLocked;

  if (isLoading) {
    return (
      <RoleGuard allowedRoles={["Student"]}>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500" dir="rtl">
          Loading course content...
        </div>
      </RoleGuard>
    );
  }

  if (error || !currentLesson) {
    return (
      <RoleGuard allowedRoles={["Student"]}>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center" dir="rtl">
        <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Course content is not available</h1>
          <p className="mt-2 text-sm text-gray-500">{error || "No lessons were found."}</p>
          <Link href="/MyCourses" className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white">
            Back to My Courses
          </Link>
        </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={["Student"]}>
      <div
        className="flex h-screen bg-gray-50 overflow-hidden"
        style={{ direction: "rtl" }}
      >
      <CourseSidebar
        course={course}
        currentLessonId={currentLesson.id}
        onSelectLesson={(lesson) => setCurrentLesson(lesson)}
      />

      <div className="flex-1 flex flex-col h-full">
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-bold text-emerald-600 text-xl tracking-wide">
              Taallam
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">
              {course.title}
            </span>
          </div>
          <Link href="/MyCourses" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            My Courses
          </Link>
        </header>

        <LessonDetails
          lesson={currentLesson}
          onNavigate={handleNavigation}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
      </div>
    </RoleGuard>
  );
}
