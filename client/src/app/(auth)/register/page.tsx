"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RoleSelector } from "@/features/auth/components/RoleSelector";
import { GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex flex-col items-center gap-1 pt-2">
        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white shadow-level-1">
          <GraduationCap className="w-6 h-6" />
        </div>

        <h1 className="text-lg font-bold text-primary">تعلَّم</h1>

        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          منصة تعلَّم | مستقبل التعليم الرقمي
        </p>
      </div>

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

      <div className="text-right">
        <h2 className="text-xl font-bold text-primary">أنشئ حساباً جديداً</h2>

        <p className="text-sm text-slate-400 mt-1">
          اختر نوع حسابك للبدء في المنصة
        </p>
      </div>

      <RoleSelector />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="lastName"
            label="الاسم الأخير"
            placeholder="أدخل الاسم الأخير"
          />

          <Input
            name="firstName"
            label="الاسم الأول"
            placeholder="أدخل اسمك الأول"
          />
        </div>

        <Input
          name="email"
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@mail.com"
        />

        <Input
          name="password"
          label="كلمة المرور"
          type="password"
          placeholder="********"
        />

        <div className="flex flex-row items-center gap-2 text-xs text-slate-400 pt-1 leading-relaxed">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-brand-success focus:ring-brand-success"
          />

          <label className="cursor-pointer select-none">
            أوافق على{" "}
            <span className="text-brand-success font-semibold underline">
              شروط الاستخدام
            </span>{" "}
            و{" "}
            <span className="text-brand-success font-semibold underline">
              سياسة الخصوصية
            </span>
          </label>
        </div>

        <Button>إنشاء الحساب</Button>
      </form>
    </div>
  );
}
