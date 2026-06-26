import React from "react";
import { CheckCircle2, Lock, PlayCircle, BookOpen } from "lucide-react";
import { CourseData, Lesson } from "../types";
import { FinalExamCard } from "./FinalExamCard"; //

interface SidebarProps {
  course: CourseData;
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export const CourseSidebar: React.FC<SidebarProps> = ({
  course,
  currentLessonId,
  onSelectLesson,
}) => {
  if (!course)
    return <div className="w-80 bg-white p-6 text-right">جاري التحميل...</div>;

  // شرط فتح الاختبار النهائي: إذا كان شريط التقدم وصّل لـ 100%
  const isCourseCompleted = course.progress === 100;

  return (
    <div className="w-80 bg-white border-l border-gray-100 flex flex-col h-full text-right font-sans p-4 space-y-4">
      <div className="border-b border-gray-50 pb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">محتوى الدورة</h2>
        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold text-xs">
            {course.progress}% مكتمل
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      {/* 2. قائمة الوحدات والدروس (flex-1 لملء المساحة ودفع الكارت لأسفل) */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        {course.units.map((unit) => (
          <div
            key={unit.id}
            className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50"
          >
            {/* عنوان الوحدة */}
            <div className="p-4 bg-emerald-50/40 text-emerald-900 font-semibold flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                {unit.title}
              </span>
            </div>

            {/* دروس الوحدة */}
            <div className="bg-white divide-y divide-gray-50">
              {unit.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                return (
                  <button
                    key={lesson.id}
                    disabled={lesson.isLocked}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full p-4 flex items-center justify-between text-right text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-50/50 text-emerald-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } ${lesson.isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isActive ? (
                        <PlayCircle className="w-5 h-5 text-emerald-600 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                      <span>{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{lesson.duration}</span>
                      {lesson.isLocked && <Lock className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. كارت الاختبار النهائي المستقل (ملتصق بالأسفل دائماً) */}
      <FinalExamCard
        isCourseCompleted={isCourseCompleted}
        onStartExam={() => console.log("بدء الاختبار النهائي")}
      />
    </div>
  );
};
