"use client";

import { Eye, Info, Lock } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/ButtonInit";

export default function SecuritySettings() {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <section
      id="security"
      className="rounded-3xl border-t-4 border-red-500 bg-white p-8 shadow-sm"
    >
      <header className="mb-6 flex items-center gap-3">
        <Lock className="text-red-500" />

        <h2 className="text-2xl font-bold">
          الأمان
        </h2>
      </header>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-gray-600">
            كلمة المرور الحالية
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-600">
            كلمة المرور الجديدة
          </label>

          <input
            type="password"
            className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
          <Info className="text-red-500" />

          <p className="text-sm text-red-600">
            تأكد من استخدام 8 أحرف على الأقل،
            تشمل أرقاماً ورموزاً لضمان أمان حسابك.
          </p>
        </div>

        <Button className="w-full" variant="danger">
          تحديث كلمة المرور
        </Button>
      </div>
    </section>
  );
}