"use client";
import React, { useEffect } from "react";
// الاستيراد من مسار المتجر الفعلي الذي تم إنشاؤه
import { ActivityCard } from "@/features/parent/components/ActivityCard";
import { ChildReportCard } from "@/features/parent/components/ChildReportCard";
import { ImportantAlerts } from "@/features/parent/components/ImportantAlerts";
import StateCard from "@/features/parent/components/StateCard";
import { UpcomingSchedule } from "@/features/parent/components/UpcomingSchedule";
import { ParentNavbar } from "@/features/parent/components/ParentNavbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useParentsStore } from "@/features/parent/parentsStore";

export default function ParentDashboard() {
  // 1. جلب البيانات وحالة التحميل والخطأ من مذكر الـ Zustand الخاص بالـ Parents
  const { currentParent, isLoading, error, fetchCurrentParent } = useParentsStore();
  const { user } = useAuthStore();

  // 2. استدعاء الدالة المربوطة بالـ API عند تحميل الصفحة باستخدام معرف ولي الأمر الفرعي
  useEffect(() => {
    const parentId = user?.parentProfileId;

    if (parentId) {
      fetchCurrentParent(parentId);
    }
  }, [user?.parentProfileId, fetchCurrentParent]);

  // 3. كروت الإحصائيات الافتراضية
  const defaultStats = [
    {
      id: 1,
      title: "متوسط درجات الأبناء",
      value: "88.5%",
      change: "+2.4%",
      isPositive: true,
    },
    {
      id: 2,
      title: "نسبة الحضور الإجمالية",
      value: "96.2%",
      badge: "ممتاز",
    },
  ];

  // 4. كارت النشاط الأسبوعي الافتراضي
  const defaultActivity = {
    title: "نشاط هذا الأسبوع",
    description: `أبناؤك أكملوا 12 درساً جديداً اليوم`,
    actionText: "تصفح الإنجازات",
  };

  // 5. مصفوفة بيانات الرسم البياني
  const defaultProgressData = [
    { month: "أكتوبر", value: 40 },
    { month: "نوفمبر", value: 60 },
    { month: "ديسمبر", value: 70 },
    { month: "يناير", value: 90, isCurrent: true },
    { month: "فبراير", value: 80 },
  ];

  // 6. كروت التنبيهات الافتراضية
  const defaultAlerts = [
    {
      id: "alert-1",
      type: "danger" as const,
      title: "تنبيه غياب متكرر",
      description: "تغيب يوسف عن حصة اللغة الإنجليزية المباشرة لليوم الثاني هذا الأسبوع.",
    },
    {
      id: "alert-2",
      type: "info" as const,
      title: "موعد اختبار جديد",
      description: "تمت إضافة اختبار قصير لمادة الرياضيات يوم الأربعاء القادم الساعة 10 صباحاً.",
    },
  ];

  // 7. الجدول الزمني القادم
  const defaultSchedule = [
    { id: 1, time: "09:00 ص", subject: "رياضيات - بث مباشر", date: "غداً" },
    { id: 2, time: "11:30 ص", subject: "لغة عربية - اختبار قصير", date: "غداً" },
  ];

  const handleDetailClick = () => {
    console.log("تم الضغط على عرض التقارير التفصيلية للطفل");
  };

  // قراءة حقل الـ ChildrenNumber القادم من الـ Schema والـ API الأصلي لولي الأمر بشكل آمن
  const childrenCount = currentParent?.ChildrenNumber || 0;

  // ─── عرض واجهة الخطأ (Error State) ───
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl max-w-md text-center shadow-sm w-full mx-4">
          <h3 className="text-lg font-bold mb-2">عذرًا، حدث خطأ أثناء جلب البيانات</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => user?.parentProfileId && fetchCurrentParent(user.parentProfileId)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // ─── عرض واجهة التحميل (Loading State) ───
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center space-y-4 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007A5A] rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">جاري تحميل بيانات لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* ─── 1. الشريط الجانبي (Sidebar) ─── */}
      <aside className="w-64 bg-white border-l border-gray-200 p-6 hidden md:block">
        <div className="text-center mb-8">
          <p className="text-xs text-gray-400">مرحباً بك</p>
          <h3 className="text-lg font-bold text-gray-800">
            {user?.name || "حسام محمد"}
          </h3>
        </div>
        <nav className="space-y-3">
          <div className="bg-[#50E3C2] bg-opacity-20 text-[#007A5A] p-3 rounded-xl font-medium cursor-pointer">
            لوحة القيادة
          </div>
          <div className="text-gray-600 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
            الدورات
          </div>
          <div className="text-gray-600 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
            الرسائل
          </div>
          <div className="text-gray-600 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
            الجدول
          </div>
          <div className="text-gray-600 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
            الإعدادات
          </div>
          <div className="text-gray-600 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
            الدعم
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* ─── 2. الـ Navbar العلوي ─── */}
        <header className="sticky top-0 z-50 w-full">
          <ParentNavbar
            activeTab="dashboard"
            onTabChange={(tab) => console.log(`الانتقال إلى تبويب: ${tab}`)}
            onNotificationClick={() => console.log("فتح الإشعارات")}
            onProfileClick={() => console.log("فتح حساب ولي الأمر")}
          />
        </header>

        {/* ─── 3. منطقة المحتوى الرئيسي ─── */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ملخص الأداء العائلي
              </h1>
              <p className="text-gray-500 mt-1">
                متابعة شاملة لتقدم أبنائك في منصة تعلّم
              </p>
            </div>
            <button className="bg-[#007A5A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition">
              <span className="text-xl">+</span> إضافة ابن جديد
            </button>
          </div>

          {/* قسم الإحصائيات والأنشطة الإضافية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <StateCard stats={defaultStats} />
            </div>
            <div className="md:col-span-1">
              <ActivityCard activity={defaultActivity} />
            </div>
          </div>

          {/* عنوان قسم الأبناء الديناميكي المعتمد على الـ API */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              الأبناء ({childrenCount})
            </h2>
            <button className="text-[#007A5A] text-sm font-semibold hover:underline">
              عرض كافة التقارير
            </button>
          </div>

          {/* التحقق من وجود أبناء مسجلين لعرض الكارت الخاص بهم أو إظهار حالة فارغة */}
          {childrenCount > 0 ? (
            <div className="mb-8">
              <ChildReportCard
                name="يوسف أحمد"
                grade="الصف الخامس - شعبة ب"
                rank="الثالث"
                points="1,450"
                tags={["متفوق رياضياً", "متميز في العلوم"]}
                avatarUrl="/youssef-avatar.jpg"
                progressData={defaultProgressData}
                onDetailClick={handleDetailClick}
              />
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 p-8 rounded-xl text-center text-gray-500 mb-8">
              لم تقم بإضافة أي أبناء بعد. اضغط على "إضافة ابن جديد" للبدء في متابعتهم.
            </div>
          )}

          {/* قسم التنبيهات والجدول الزمني */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <ImportantAlerts alerts={defaultAlerts} />
            <UpcomingSchedule lessons={defaultSchedule} />
          </div>
        </main>
      </div>
    </div>
  );
}