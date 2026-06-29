import { useState, useEffect } from 'react';
import { browseCourseService } from './service';
import { Course } from './types';

export function useBrowseCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("جاري إرسال الطلب للباك إند..."); // سطر للتأكد في الكونسول
        const responseData = await browseCourseService.getAllCourses();
        console.log("الداتا وصلت بنجاح:", responseData);

        // التحقق من الداتا وتخزينها
        if (responseData && responseData.success && Array.isArray(responseData.courses)) {
          setCourses(responseData.courses);
        } else if (Array.isArray(responseData)) {
          setCourses(responseData);
        } else if (responseData && Array.isArray(responseData.data)) {
          setCourses(responseData.data);
        } else {
          setCourses([]);
        }

      } catch (err: any) {
        console.error("خطأ أثناء جلب الكورسات:", err);
        setError(err?.response?.data?.message || 'عذراً، فشل في الاتصال بالخادم وتحميل الكورسات.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []); // تأكد إن القوسين دول موجودين وفاضيين هنا

  return { courses, isLoading, error };
}