import React from "react";
import Image from "next/image";
import { Course } from "./types";

const defaultCourseData: Course = {
  id: "default-id",
  title: "أساسيات تطوير الويب وتصميم الواجهات",
  category: "Uncategorized",
  rating: 0,
  image: "/images/student.jpg",
  price: 0,
  instructor: {
    name: "name instructor",
    avatar: "/images/student.jpg",
  },
};

export const CourseCard: React.FC<{ course?: Course }> = ({
  course = defaultCourseData,
}) => {
  return (
    <div
      className="bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full max-w-[320px]"
      dir="rtl"
    >
      {/* Image */}
      <div className="w-full rounded-[20px] mb-4 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col text-right">
        <h3 className="text-gray-900 font-bold text-sm leading-snug mb-3 line-clamp-2 h-10">
          {course.title}
        </h3>

        {/* Instructor with Avatar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              fill
              sizes="28px" // 👈 حل التحذير: لأن مساحة الأفاتار في الـ Tailwind هي w-7 وتساوي 28 بكسل
              className="object-cover"
            />
          </div>

          <p className="text-gray-500 text-xs font-medium">
            {course.instructor.name}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-50 pt-3 flex items-center justify-between w-full">
        <button className="w-9 h-9 flex items-center justify-center bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-xl transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-3-11.25h.008v.008h-.008V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>

        <span className="text-teal-600 font-extrabold text-base">
          {course.price} ج.م
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
