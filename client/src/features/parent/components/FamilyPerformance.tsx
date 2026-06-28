"use client";
import React from "react";
import { useRouter } from "next/navigation"; 
import { ActivityCard } from "./ActivityCard";
import { StatCard } from "./StateCad";
import { ChildReportCard } from "./ChildReportCard";
import student from "@/assets/student.jpg";
import { ImportantAlerts } from "./ImportantAlerts";
import { UpcomingSchedule } from "./UpcomingSchedule";
export function FamilyPerformance() {
  const router = useRouter();
  const progressData = [
    { month: "يناير", value: 70 },
    { month: "فبراير", value: 75 },
    { month: "مارس", value: 82 },
    { month: "أبريل", value: 88 },
    { month: "مايو", value: 92, isCurrent: true },
  ];
  // 2 components props
  // بيانات التنبيهات الهامة لـ يوسف
  const mockAlerts = [
    {
      id: 'alert-1',
      type: 'danger' as const,
      title: 'موعد نهائي غداً',
      description: 'يوسف: تسليم مشروع العلوم "المجموعة الشمسية" قبل الساعة 11 مساءً.',
    },
    {
      id: 'alert-2',
      type: 'info' as const,
      title: 'اجتماع أولياء الأمور',
      description: 'الخميس القادم، الساعة 4:30 عصراً عبر منصة الاجتماعات الافتراضية.',
    },
  ];

  // بيانات جدول حصص الغد
  const mockSchedule = [
    { id: 'l-1', periodNumber: 1, subject: 'اللغة العربية', timeRange: '08:00 ص - 08:45 ص' },
    { id: 'l-2', periodNumber: 2, subject: 'الرياضيات', timeRange: '08:50 ص - 09:35 ص' },
    { id: 'l-3', periodNumber: 3, subject: 'اللغة الإنجليزية', timeRange: '09:55 ص - 10:40 ص' },
  ];
  
  const statsData = [
    {
      id: "grades",
      title: "متوسط درجات الأبناء",
      value: "88.5%",
      badgeText: "+2.4%",
      badgeType: "trend" as const,
      progressValue: 88.5,
      iconBgColor: "bg-indigo-50 text-indigo-600",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "attendance",
      title: "نسبة الحضور الإجمالية",
      value: "96.2%",
      badgeText: "ممتاز",
      badgeType: "status" as const,
      progressValue: 96.2,
      iconBgColor: "bg-[#56f0b1] text-[#006644]", 
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 3V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* العناوين */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            ملخص الأداء العائلي
          </h2>
          <p className="text-gray-400 mt-2 text-sm font-medium">
            متابعة شاملة لتقدم أبنائك في منصة تعلّم
          </p>
        </div>

        <button
          onClick={() => router.push("/parent/add-child")}  
          className="flex items-center gap-2 bg-[#006644] hover:bg-[#005236] text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span>إضافة ابن جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <ActivityCard
          title="نشاط هذا الأسبوع"
          description="أبنائك أكملوا 12 درساً جديداً اليوم"
          linkText="تصفح الإنجازات"
          onLinkClick={() => router.push("/parent/achievements")}
        />

        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100">
        <button
          onClick={() => router.push("/parent/reports")}
          className="text-[#005236] hover:text-[#006644] text-sm font-bold transition-colors hover:underline"
        >
          عرض كافة التقارير
        </button>

        {/* عدد الأبناء عريض وكبير */}
        <div className="text-gray-900 font-black text-2xl tracking-tight">
          الأبناء (1)
        </div>
      </div>
      <ChildReportCard
        name=""
        grade="الصف الخامس - شعبة ب"
        rank="الثالث"
        points="1,450"
        tags={["متفوق رياضياً", "متميز في العلوم"]}
        avatarUrl="/images/student.jpg" //   مسار الصورة المحلية لاحقاً
        progressData={progressData}
        onDetailClick={() => router.push("/parent/reports/youssef")}
      />
      {/* the last 2 components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImportantAlerts alerts={mockAlerts} />
        <UpcomingSchedule lessons={mockSchedule} />
      </div>
    </section>
  );
}
