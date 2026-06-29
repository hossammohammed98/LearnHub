export interface Course {
  // Backend API Fields
  _id: string;
  TeacherId: string;
  Title: string;
  Description: string;
  Price: number;       // تعديل: كابيتال وإجباري
  Image: string;       // تعديل: كابيتال وإجباري
  Duration?: string;   // ضيف دول عشان لو حبيت تستخدمهم
  LessonsCount?: number;
  createdAt?: string;
  updatedAt?: string;

  // Frontend UI Optional Fields
  category?: string;
  rating?: number;
  instructor?: {
    name: string;
    avatar: string;
  };
}