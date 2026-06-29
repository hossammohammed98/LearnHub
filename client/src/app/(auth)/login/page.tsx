"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "@/features/auth/validation/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const setUser=useAuthStore((state)=>state.setUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const response = await authService.loginUser({
        Email: data.email,
        Password: data.password,
      });
      if (response.success) {
        
        setUser(response.data);
        router.push('/landingpage');
      }
    } catch (err: any) {
      setServerError(err.message || "حدث خطأ ما");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 pt-2">
        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-level-1"></div>
        <h1 className="text-lg font-bold text-primary">تعلَّم</h1>
        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          منصة تعلَّم | مستقبل التعليم الرقمي
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 text-xs font-medium justify-center gap-6">
        <button
          type="button"
          className="pb-2 px-1 text-brand-success border-b-2 border-brand-success font-bold"
        >
          تسجيل الدخول
        </button>

        <Link 
          href="/register"
          className="pb-2 px-1 text-slate-400 hover:text-slate-600 transition"
        >
          إنشاء حساب
        </Link>
      </div>

      {/* Title (Only One) */}
      <div className="text-right">
        <h2 className="text-xl font-bold text-primary">دخول إلى حسابك</h2>
        <p className="text-sm text-slate-400 mt-1">
          أدخل بيانات حسابك للوصول إلى المنصة
        </p>
      </div>

      {/* Form Handling Submission */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <p className="text-red-500 text-sm text-right">{serverError}</p>}
        
        <Input
          label="البريد الإلكتروني"
          type="email"
          {...register("email")} 
          error={errors.email?.message}
          placeholder="example@mail.com"
        />

        <Input
          label="كلمة المرور"
          type="password"
          {...register("password")} 
          error={errors.password?.message}
          placeholder="********"
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-400">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-success focus:ring-brand-success"
            />
            <span className="select-none">تذكرني</span>
          </label>

          <Link
            href="/forgotPassword"
            className="text-brand-success font-semibold hover:underline transition"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Explicitly added type="submit" and hooked up isSubmitting loader */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري تسجيل الدخول..." : "دخول"}
        </Button>
      </form>

      <div className="text-center text-sm text-slate-400">
        ليس لديك حساب؟{" "}
        <Link
          href="/register"
          className="text-brand-success font-semibold hover:underline transition"
        >
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
}