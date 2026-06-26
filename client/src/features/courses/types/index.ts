// src/features/courses/types/index.ts

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl?: string;
  description?: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseData {
  id: string;
  title: string;
  progress: number;
  units: Unit[];
}

export const mockCourse: CourseData = {
  id: "Tailwind",
  title:"learn tailwind in one hour",
  progress: 77,
  units: [
    {
      id: "unit-1",
      title: "الوحدة الأولى: الأساسيات",
      lessons: [
        { id: "1.1", title: "1.1 مقدمة الدورة", duration: "05:20", isCompleted: true, isLocked: false },
        { id: "1.2", title: "1.2 بيئة التطوير", duration: "12:45", isCompleted: true, isLocked: false },
      ],
    },
    {
      id: "unit-2",
      title: "الوحدة الثانية: الكائنات (Objects)",
      lessons: [
        { id: "2.1", title: "2.1 ماهي الكائنات؟", duration: "08:15", isCompleted: true, isLocked: false },
        { 
          id: "2.2", 
          title: "2.2 مفاهيم الأغراض المتقدمة", 
          duration: "18:30", 
          isCompleted: false, 
          isLocked: false,
          videoUrl: "https://www.youtube.com/watch?v=Pk3hhCJG2Dk&t=963s", 
          description:"learn tailwind in one hour"
        },
        { id: "2.3", title: "2.3 النماذج (Prototypes)", duration: "14:00", isCompleted: false, isLocked: true },
      ],
    },
    {
      id: "unit-3",
      title: "الوحدة الثالثة: غير متزامن (Async)",
      lessons: [
        { id: "3.1", title: "3.1 مقدمة في Async/Await", duration: "20:00", isCompleted: false, isLocked: true },
      ],
    },
  ],
};