import {
  ApiCourse,
  getCoursePrice,
  getCourseTitle,
  getTeacherName,
} from "@/features/courses/services/courseService";
import { Course } from "./types";

export type SortOption = "popular" | "latest" | "lowest-price";

export type CategoryId =
  | "software-dev"
  | "graphic-design"
  | "business"
  | "languages";

export const CATEGORY_OPTIONS: { id: CategoryId; label: string }[] = [
  { id: "software-dev", label: "تطوير البرمجيات" },
  { id: "graphic-design", label: "التصميم الجرافيكي" },
  { id: "business", label: "الأعمال والتجارة" },
  { id: "languages", label: "اللغات والترجمة" },
];

export const EDUCATION_LEVELS = ["مبتدئ", "متوسط", "متقدم"] as const;

export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export type FilterValues = {
  categoryIds: CategoryId[];
  educationLevel: EducationLevel | null;
  priceRange: number;
};

export type BrowseCourse = Course & {
  categoryId: CategoryId;
  level: EducationLevel;
  createdAt?: string;
};

const CATEGORY_KEYWORDS: Record<CategoryId, string[]> = {
  "software-dev": [
    "برمج",
    "software",
    "dev",
    "code",
    "programming",
    "تطوير",
    "web",
    "api",
    "react",
    "node",
  ],
  "graphic-design": [
    "تصميم",
    "design",
    "graphic",
    "جرافيك",
    "ui",
    "ux",
    "figma",
    "فوتوشوب",
  ],
  business: [
    "أعمال",
    "business",
    "تجارة",
    "marketing",
    "تسويق",
    "إدارة",
    "رقمي",
    "مبيعات",
  ],
  languages: [
    "لغ",
    "language",
    "translation",
    "ترجمة",
    "english",
    "عرب",
    "فرنس",
  ],
};

const inferCategoryId = (course: ApiCourse): CategoryId => {
  const text = `${course.Title} ${course.Description || ""}`.toLowerCase();

  for (const [id, keywords] of Object.entries(CATEGORY_KEYWORDS) as [
    CategoryId,
    string[],
  ][]) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      return id;
    }
  }

  return "software-dev";
};

const inferLevel = (course: ApiCourse): EducationLevel => {
  const price = getCoursePrice(course);
  if (price === 0) return "مبتدئ";
  if (price <= 1000) return "متوسط";
  return "متقدم";
};

const getCategoryLabel = (categoryId: CategoryId) =>
  CATEGORY_OPTIONS.find((option) => option.id === categoryId)?.label ??
  "دورة تعليمية";

export const toBrowseCourse = (course: ApiCourse): BrowseCourse => {
  const categoryId = inferCategoryId(course);

  return {
    id: course._id,
    title: getCourseTitle(course),
    category: getCategoryLabel(categoryId),
    categoryId,
    level: inferLevel(course),
    rating: 0,
    image: course.CoverImage || "/images/student.jpg",
    price: getCoursePrice(course),
    createdAt: course.createdAt,
    instructor: {
      name: getTeacherName(course),
      avatar: "/images/user.png",
    },
  };
};

export const getDefaultFilters = (maxPrice: number): FilterValues => ({
  categoryIds: [],
  educationLevel: null,
  priceRange: maxPrice,
});

export const filterBrowseCourses = (
  courses: BrowseCourse[],
  filters: FilterValues,
): BrowseCourse[] =>
  courses.filter((course) => {
    const matchesCategory =
      filters.categoryIds.length === 0 ||
      filters.categoryIds.includes(course.categoryId);

    const matchesLevel =
      !filters.educationLevel || course.level === filters.educationLevel;

    const matchesPrice = course.price <= filters.priceRange;

    return matchesCategory && matchesLevel && matchesPrice;
  });

export const sortBrowseCourses = (
  courses: BrowseCourse[],
  sortBy: SortOption,
): BrowseCourse[] => {
  const sorted = [...courses];

  switch (sortBy) {
    case "lowest-price":
      return sorted.sort((a, b) => a.price - b.price);
    case "latest":
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    case "popular":
    default:
      return sorted.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title, "ar"));
  }
};

export const getCourseActionHref = (course: BrowseCourse) =>
  course.price > 0
    ? `/Payment?courseId=${course.id}`
    : `/courses?courseId=${course.id}`;

export const getCourseActionLabel = (course: BrowseCourse) =>
  course.price > 0 ? "شراء الدورة" : "التسجيل مجاناً";
