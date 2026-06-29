import axios from "axios";

// دالة مساعدة لقراءة الكوكيز من الـ Client-side بسهولة
const getCookie = (name: string): string => {
  if (typeof window === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
};

export const browseCourseService = {
  getAllCourses: async (): Promise<any> => {
    // 💡 تعريف المتغير هنا أولاً عشان ميعملش ReferenceError
    let token = "";

    // التأكد من العمل داخل المتصفح لقراءة وسائل التخزين
    if (typeof window !== "undefined") {
      // 1. محاولة جلب التوكن من الـ LocalStorage أولاً
      token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        "";

      if (!token) {
        token = getCookie("accessToken") || getCookie("token") || "";
      }
    }

    const headers: Record<string, string> = {};
    if (token) {
      // تمرير التوكن بالصيغة القياسية المعتمدة للباك إند
      headers["Authorization"] = `Bearer ${token.trim()}`;
    }

    const response = await axios.get("http://localhost:5000/api/v1/course", {
      headers,
    });
    return response.data;
  },
};
