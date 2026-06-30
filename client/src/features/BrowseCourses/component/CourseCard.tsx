import React from "react";
import Link from "next/link";
import { BookOpen, ShoppingCart } from "lucide-react";
import { Course } from "./types";

const defaultCourseData: Course = {
  id: "default-id",
  title: "دورة بدون عنوان",
  category: "غير مصنف",
  rating: 0,
  image: "/images/student.jpg",
  price: 0,
  instructor: {
    name: "مدرس تعلّم",
    avatar: "/images/student.jpg",
  },
};

type CourseCardProps = {
  course?: Course;
  actionLabel?: string;
  actionHref?: string;
  detailsHref?: string;
  onAction?: () => void;
  isLoading?: boolean;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course = defaultCourseData,
  actionLabel = "شراء الدورة",
  actionHref,
  detailsHref,
  onAction,
  isLoading = false,
}) => {
  const actionClasses =
    "h-10 min-w-10 px-3 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white rounded-lg transition-colors duration-200 text-xs font-bold";

  const isPurchaseAction = Boolean(actionHref?.includes("/Payment"));

  const actionContent = (
    <>
      {isPurchaseAction ? (
        <ShoppingCart className="w-4 h-4" />
      ) : (
        <BookOpen className="w-4 h-4" />
      )}
      <span>{isLoading ? "جاري التحميل..." : actionLabel}</span>
    </>
  );

  const priceLabel = course.price
    ? `${course.price.toLocaleString("ar-EG")} ج.م`
    : "مجاني";

  const titleContent = detailsHref ? (
    <Link
      href={detailsHref}
      className="text-gray-900 font-bold text-sm leading-snug mb-3 line-clamp-2 min-h-10 hover:text-teal-700 transition-colors block"
    >
      {course.title}
    </Link>
  ) : (
    <h3 className="text-gray-900 font-bold text-sm leading-snug mb-3 line-clamp-2 min-h-10">
      {course.title}
    </h3>
  );

  return (
    <div
      className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full"
      dir="rtl"
    >
      {detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={course.title}
          className="w-full aspect-[4/3] rounded-lg mb-4 overflow-hidden bg-gray-100 bg-cover bg-center block"
          style={{ backgroundImage: `url("${course.image}")` }}
        />
      ) : (
        <div
          role="img"
          aria-label={course.title}
          className="w-full aspect-[4/3] rounded-lg mb-4 overflow-hidden bg-gray-100 bg-cover bg-center"
          style={{ backgroundImage: `url("${course.image}")` }}
        />
      )}

      <div className="flex-1 flex flex-col text-right">
        <p className="text-xs font-semibold text-teal-600 mb-2">{course.category}</p>
        {titleContent}

        <div className="flex items-center gap-2 mb-4">
          <div
            role="img"
            aria-label={course.instructor.name}
            className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: `url("${course.instructor.avatar}")` }}
          />

          <p className="text-gray-500 text-xs font-medium">
            {course.instructor.name}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-50 pt-3 flex items-center justify-between gap-3 w-full">
        {actionHref ? (
          <Link href={actionHref} className={actionClasses}>
            {actionContent}
          </Link>
        ) : (
          <button type="button" onClick={onAction} disabled={isLoading} className={actionClasses}>
            {actionContent}
          </button>
        )}

        <span className="text-teal-600 font-extrabold text-base whitespace-nowrap">
          {priceLabel}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
