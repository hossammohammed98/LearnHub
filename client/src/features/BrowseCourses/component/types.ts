export interface Instructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: Instructor;
  rating: number;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "جديد" | "رائج";
}

//promo
export interface Promo {
  id: string;
  tag: string; //  عرض خاص لفترة محدودة
  title: string; // دبلومة التسويق الرقمي المتكاملة
  description: string; // الوصف الصغير اللي تحت العنوان
  duration: string; //  40 ساعة تدريبية
  hasCertificate: boolean; // عشان لو فيه شهادة نكتب شهادة معتمدة
  price: number; // السعر الحالي (2,400)
  oldPrice: number; // السعر القديم (3,500)
}
