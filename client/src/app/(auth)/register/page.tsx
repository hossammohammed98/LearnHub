"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { RegisterFormValues, registerSchema } from "@/features/auth/validation/registerValidation";
import { authService } from "@/features/auth/services/authService";
import { redirect,useRouter } from "next/navigation";
import { RoleSelector } from "@/features/auth/components/RoleSelector";
import Link from "next/link";

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router=useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "Student" }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    console.log(serverError);
    setServerError(null);
    try {
      // Clean mapping logic isolated here
      const response = await authService.registerUser({
        FName: data.firstName,
        LName: data.lastName,
        Email: data.email,
        SSN: data.ssn,
        Phone: Number(data.phone),
        Role: data.role,
        Password: data.password,
        ConfirmPassword:data.confirmPassword,
      });

      if (response.success) {
        console.log(response.data);
        router.push('/login')
        // redirect('/login')
      }
    } catch (err: any) {
      console.log(err);
      setServerError(err.message || "حدث خطأ ما");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex flex-col items-center gap-1 pt-2">

        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-level-1"></div>

        <h1 className="text-lg font-bold text-primary">تعلَّم</h1>

        <p className="text-[11px] text-slate-400 font-medium tracking-wide">

          منصة تعلَّم | مستقبل التعليم الرقمي

        </p>

      </div>



      {/* Tabs */}

      <div className="flex border-b border-slate-100 text-xs font-medium justify-center gap-6">

        <Link

          href="/login"

          className="pb-2 px-1 text-slate-400 hover:text-slate-600 transition"

        >

          تسجيل الدخول

        </Link>



        <button

          type="button"

          className="pb-2 px-1 text-brand-success border-b-2 border-brand-success font-bold"

        >

          إنشاء حساب

        </button>

      </div>



      {/* Title */}

      <div className="text-right">

        <h2 className="text-xl font-bold text-primary">أنشئ حساباً جديداً</h2>

        {/* <p className="text-sm text-slate-400 mt-1">

          اختر نوع حسابك للبدء في المنصة

        </p> */}

      </div>



      {/* Role Selector */}

      <RoleSelector />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

        {serverError && <p className="text-red-500 text-sm text-right">{serverError}</p>}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="الاسم الأخير"
            placeholder="أدخل الاسم الأخير"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Input
            label="الاسم الأول"
            placeholder="أدخل اسمك الأول"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </div>

        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="الرقم القومى"
          placeholder="الرقم القومى مكون من 14 رقم"
          error={errors.ssn?.message}
          {...register("ssn")}
        />

        <Input
          label="رقم الهاتف"
          placeholder="01xxxxxxxxx"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="كلمة المرور"
          type="password"
          placeholder="********"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="تأكيد كلمة المرور" 
          type="password"
          placeholder="********"
          error={errors.password?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </Button>
      </form>
    </div>
  );
}