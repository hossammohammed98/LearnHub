"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserRegister } from "../types";
import { authService } from "../services/authService";
import { normalizeAuthUser } from "../utils/normalizeAuthUser";

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: UserRegister) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.registerUser(userData);
      setUser(normalizeAuthUser(response.data));

      if (response.data.Role === "Student") router.push("/student");
      else if (response.data.Role === "Teacher") router.push("/teacher");
      else if (response.data.Role === "Parent") router.push("/parent");
      else router.push("/");

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ ما أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};