"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "@/services/apiClient";

export const useRegister = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // إرسال طلب إنشاء الحساب للـ API
      const response = await apiClient.post("/auth/register", userData);
      const { user, token } = response.data;

      // حفظ الـ Auth Token والـ User في الـ Zustand Store
      setAuth(user, token);

      // التوجيه التلقائي للـ Dashboard المناسبة بناءً على الـ Role
      if (user.role === "student") router.push("/student");
      else if (user.role === "teacher") router.push("/teacher");
      else if (user.role === "parent") router.push("/parent");
      else router.push("/");

    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ ما أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};