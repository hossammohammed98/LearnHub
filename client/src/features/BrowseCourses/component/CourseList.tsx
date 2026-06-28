import React from "react";
import { Course, Promo } from "./types";
import CourseCard from "./CourseCard";

interface CourseListProps {
  courses?: Course[];
  promo?: Promo;
}

export const CourseList: React.FC<CourseListProps> = ({
  courses = [],
  promo = {
    tag: "عرض خاص",
    title: "ابدأ رحلتك الآن",
    description: "تعلم مهارات جديدة وابدأ مستقبلك",
    duration: "10 ساعات",
    hasCertificate: true,
    price: 0,
    oldPrice: 0,
  },
}) => {
  return (
    <div className="flex flex-col gap-4 text-right">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-gray-900">استكشف الدورات</h2>

        <p className="text-xs text-gray-500">
          تم العثور على {courses.length + 1} دورة متميزة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
