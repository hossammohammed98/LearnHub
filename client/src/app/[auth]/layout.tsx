import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2" dir="rtl">

      {/* الفورم */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* الصورة + النص */}
      <div className="hidden lg:flex relative items-center justify-center text-white p-12 text-center overflow-hidden">

        {/* الخلفية (الصورة) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
style={{ backgroundImage: "url('/images/login.jpg')" }}
        />

        {/* طبقة الشفافية */}
        <div className="absolute inset-0 bg-teal-900/70" />

        {/* المحتوى */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">تعلَّم بلا حدود</h2>
          <p className="max-w-sm text-teal-100">
            انضم إلى أكبر منصة تعليمية تفاعلية في مصر وابدأ رحلة نجاحك اليوم.
          </p>
        </div>

      </div>

    </div>
  );
}