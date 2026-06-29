import React from "react";
import Image from "next/image";
import { Course } from "@/features/BrowseCourses/types"; 

const defaultCourseData = {
  image: "/images/student.jpg",
  category: "تطوير البرمجيات",
  price: 0,
  instructor: {
    name: "مدرس المادة",
    avatar: "/images/student.jpg",
  },
};

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  // Gracefully fallback to UI layout defaults if API fields are missing
 // القراءة من الحقول  القادمة من الباك إند مباشرة
const courseImage = course.Image || defaultCourseData.image;
const priceValue = course.Price !== undefined ? course.Price : defaultCourseData.price;
  const instructorName = course.instructor?.name || defaultCourseData.instructor.name;
  const instructorAvatar = course.instructor?.avatar || defaultCourseData.instructor.avatar;

  return (
    <div
      className="bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full max-w-[320px] mx-auto w-full"
      dir="rtl"
    >
      {/* Image */}
      <div className="w-full rounded-[20px] mb-4 overflow-hidden aspect-[4/3] relative">
        <Image
          src={courseImage}
          alt={course.Title || "صورة الكورس"}
          fill
          className="object-cover"
          sizes="(max-w-7xl) 33vw, 100vw"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col text-right">
        {/* Category Badge if available */}
        <span className="text-[10px] text-teal-600 font-semibold bg-teal-50/50 px-2.5 py-1 rounded-full w-max mb-2">
          {course.category || defaultCourseData.category}
        </span>

        {/* Dynamic Title mapping from backend PascalCase field */}
        <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 line-clamp-2 h-10">
          {course.Title}
        </h3>

        {/* Short description preview snippet */}
        <p className="text-gray-500 text-[11px] leading-relaxed mb-3 line-clamp-2 h-8">
          {course.Description}
        </p>

        {/* Instructor with Avatar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-100">
            <Image
              src={instructorAvatar}
              alt={instructorName}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>

          <p className="text-gray-600 text-xs font-medium">
            {instructorName}
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
          {priceValue} ج.م
        </span>
      </div>
    </div>
  );
};

export default CourseCard;