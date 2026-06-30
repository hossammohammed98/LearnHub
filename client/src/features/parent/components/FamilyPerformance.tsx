"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityCard } from './ActivityCard';
import { StatCard } from './StateCad';
import { ChildReportCard } from './ChildReportCard';
import { ImportantAlerts } from './ImportantAlerts';
import { UpcomingSchedule } from './UpcomingSchedule';
import { ParentChild } from '../types';

interface FamilyPerformanceProps {
  parentName: string;
  children: ParentChild[];
  activeChildId: string;
  childrenCount: number;
  onSelectChild: (childId: string) => void;
  onAddChild: () => void;
  isLoading?: boolean;
}

export function FamilyPerformance({
  parentName,
  children,
  activeChildId,
  childrenCount,
  onSelectChild,
  onAddChild,
  isLoading = false,
}: FamilyPerformanceProps) {
  const router = useRouter();

  const activeChild = useMemo(
    () => children.find((child) => child.id === activeChildId) ?? children[0],
    [activeChildId, children]
  );

  const formatDate = (value?: string) => {
    if (!value) return 'غير متوفر';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'غير متوفر';

    return new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const progressData = useMemo(() => {
    if (children.length === 0) {
      return [{ month: 'لا توجد بيانات', value: 0 }];
    }

    return children.slice(0, 5).map((child, index) => ({
      month: child.user.FName || `ابن ${index + 1}`,
      value: Math.min(100, 70 + index * 8),
      isCurrent: index === 0,
    }));
  }, [children]);

  const statsData = useMemo(() => {
    const activeChildName = activeChild ? `${activeChild.user.FName} ${activeChild.user.LName}`.trim() : 'لا يوجد ابن محدد';

    return [
      {
        id: 'children-count',
        title: 'عدد الأبناء المسجلين',
        value: `${childrenCount} أبناء`,
        badgeText: childrenCount > 0 ? 'محدث من قاعدة البيانات' : 'لم تتم الإضافة بعد',
        badgeType: 'status' as const,
        progressValue: childrenCount > 0 ? 100 : 0,
        iconBgColor: 'bg-indigo-50 text-indigo-600',
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
        id: 'active-child',
        title: 'الابن الحالي',
        value: activeChildName,
        badgeText: activeChild ? 'موجود في قاعدة البيانات' : 'في انتظار الإضافة',
        badgeType: 'trend' as const,
        progressValue: activeChild ? 100 : 0,
        iconBgColor: 'bg-[#56f0b1] text-[#006644]',
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
  }, [activeChild, childrenCount]);

  const childName = activeChild ? `${activeChild.user.FName} ${activeChild.user.LName}` : 'لا يوجد أبناؤك بعد';
  const childGrade = activeChild ? `تمت الإضافة في ${formatDate(activeChild.createdAt)}` : 'أضف ابنك الآن';
  const childRank = activeChild ? `ابن ${children.findIndex((child) => child.id === activeChild.id) + 1}` : '-';
  const childPoints = activeChild ? `${childrenCount} حساب مرتبط` : '0';
  const childTags = activeChild
    ? [activeChild.user.Email, activeChild.user.Phone || 'رقم الهاتف غير متوفر']
    : ['لا توجد بيانات حتى الآن'];

  const alertsData = useMemo(() => {
    if (!children.length) {
      return [
        {
          id: 'empty-children-alert',
          type: 'info' as const,
          title: 'لا توجد أبناء بعد',
          description: 'أضف حساباً جديداً لعرض بياناتهم مباشرة من قاعدة البيانات.',
        },
      ];
    }

    return [
      {
        id: `children-summary-${activeChild?.id ?? 'default'}`,
        type: 'info' as const,
        title: 'أبناء مسجلون',
        description: `تم ربط ${childrenCount} أبناء من قاعدة البيانات بنجاح.`,
      },
      {
        id: `active-child-contact-${activeChild?.id ?? 'default'}`,
        type: 'danger' as const,
        title: activeChild ? `مراجعة ${activeChild.user.FName}` : 'مراجعة الابن الحالي',
        description: activeChild ? `البريد: ${activeChild.user.Email}` : 'اختر ابنًا لعرض بياناته.',
      },
    ];
  }, [activeChild, children.length, childrenCount]);

  const lessonsData = useMemo(() => {
    if (!children.length) {
      return [];
    }

    return children.slice(0, 4).map((child, index) => ({
      id: `lesson-${child.id ?? index}`,
      periodNumber: index + 1,
      subject: child.user.FName ? `متابعة ${child.user.FName}` : `ابن ${index + 1}`,
      timeRange: child.createdAt ? `تمت الإضافة في ${formatDate(child.createdAt)}` : 'تمت الإضافة من قاعدة البيانات',
    }));
  }, [children]);

  return (
    <section className="w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-sm" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">ملخص الأداء العائلي</h2>
          <p className="text-gray-400 mt-2 text-sm font-medium">
            مرحباً {parentName}، هذا عرض لتقدم أبنائك على منصة تعلّم.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onAddChild}
            className="flex items-center gap-2 bg-[#006644] hover:bg-[#005236] text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            إضافة ابن جديد
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        {isLoading ? 'جارٍ تحميل بيانات الأبناء...' : `عدد الأبناء: ${childrenCount}`}
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {children.length > 0 ? (
          children.map((child, index) => {
            const isSelected = child.id === activeChild?.id;
            return (
              <button
                key={child.id || `child-${index}`}
                type="button"
                onClick={() => onSelectChild(child.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isSelected
                    ? 'border-[#006644] bg-[#E6F7EF] text-[#006644]'
                    : 'border-gray-200 bg-white text-slate-700 hover:border-[#006644] hover:text-[#006644]'
                }`}
              >
                {child.user.FName}
              </button>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            لم تتم إضافة أبناء بعد. يمكنك إنشاء حساب ابن جديد الآن.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <ActivityCard
          title="نشاط هذا الأسبوع"
          description="أبناؤك أكملوا مجموعة من المهام والواجبات الجديدة"
          linkText="تصفح الإنجازات"
          onLinkClick={() => router.push('/parent/achievements')}
        />

        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
        <div className="text-gray-900 text-2xl font-black tracking-tight">الأبناء ({childrenCount})</div>
      </div>

      <ChildReportCard
        name={childName}
        grade={childGrade}
        rank={childRank}
        points={childPoints}
        tags={childTags}
        avatarUrl={activeChild?.user.Avatar || '/images/student.jpg'}
        progressData={progressData}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ImportantAlerts alerts={alertsData} />
        <UpcomingSchedule lessons={lessonsData} />
      </div>
    </section>
  );
}
