"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
// 1. استيراد الأيقونات من مكتبة Lucide React
import { GraduationCap, MailCheck } from "lucide-react"; 

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 pt-2">
        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white shadow-level-1">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-lg font-bold text-primary">تعلَّم</h1>
        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          منصة تعلَّم | مستقبل التعليم الرقمي
        </p>
      </div>

      {!submitted ? (
        <>
          <div className="text-right">
            <h2 className="text-xl font-bold text-primary">
              استعادة كلمة المرور
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              أدخل عنوان بريدك الإلكتروني لاستعادة كلمة المرور
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="email"
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit">إرسال رابط الاستعادة</Button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-slate-600 transition"
            >
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-6">
            <div className="flex justify-center">
              {/* 3. استبدال الـ SVG بأيقونة MailCheck لتأكيد الإرسال للبريد */}
              <div className="w-16 h-16 bg-brand-success/10 rounded-full flex items-center justify-center text-brand-success">
                <MailCheck className="w-8 h-8" />
              </div>
            </div>

            <div className="text-right space-y-2">
              <h2 className="text-xl font-bold text-primary">
                تحقق من بريدك الإلكتروني
              </h2>
              <p className="text-sm text-slate-400">
                لقد أرسلنا رابط استعادة كلمة المرور إلى{" "}
                <span className="font-semibold text-slate-600">{email}</span>
              </p>
              <p className="text-xs text-slate-400 pt-2">
                يرجى التحقق من صندوق البريد الوارد والنقر على الرابط لتعيين كلمة
                مرور جديدة.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button disabled className="w-full bg-slate-100 text-slate-400">
                تم إرسال الرابط
              </Button>

              <Link href="/login" className="block">
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium text-sm"
                >
                  العودة إلى تسجيل الدخول
                </button>
              </Link>
            </div>

            <div className="text-center text-xs text-slate-400">
              لم تتلقَ البريد؟{" "}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-brand-success font-semibold hover:underline transition"
              >
                أعد المحاولة
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}