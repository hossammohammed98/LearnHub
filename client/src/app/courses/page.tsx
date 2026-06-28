"use client";
import React, { useState } from "react";
import { CourseSidebar } from "../../features/courses/components/CourseSidebar";
import { LessonDetails } from "../../features/courses/components/LessonDetails";
import { Lesson, mockCourse } from "../../features/courses/types";

export default function CoursePage() {
  const defaultLesson = mockCourse.units[1].lessons[1];
  const [currentLesson, setCurrentLesson] = useState<Lesson>(defaultLesson);


  const allLessons = mockCourse.units.flatMap((unit) => unit.lessons);

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
    !allLessons[currentIndex + 1].isLocked;

  return (
    <div
      className="flex h-screen bg-gray-50 overflow-hidden"
      style={{ direction: "rtl" }}
    >
      <CourseSidebar
        course={mockCourse}
        currentLessonId={currentLesson.id}
        onSelectLesson={(lesson) => setCurrentLesson(lesson)}
      />

      <div className="flex-1 flex flex-col h-full">
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-bold text-emerald-600 text-xl tracking-wide">
              تعلّم
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">
              {mockCourse.title}
            </span>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-xl font-medium transition-colors">
            لوحة التحكم
          </button>
        </header>

        <LessonDetails
          lesson={currentLesson}
          onNavigate={handleNavigation}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
}
