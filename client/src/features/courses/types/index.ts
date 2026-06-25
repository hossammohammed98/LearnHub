// features/courses/types/index.ts

// شكل الحصه
export interface Lesson {
  id: string;
  title: string;
}

//  شكل الوحدة اللي بتشيل جواها كذا حصة
export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

// شكل بيانات الصفحة كلها مجتمعة
export interface CourseFormData {
  title: string;
  category: string;
  level: string;
  description: string;
  coverImage: File | null;
  promoVideoUrl: string;
  isPaid: boolean;
  price: number;
  commission: number; // الـ 10% اللي في الصورة
  netProfit: number; // الصافي المتوقع
  units: Unit[]; // الوحدات التعليمية
}
