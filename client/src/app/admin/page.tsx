'use client';

import { useEffect, useState, type ReactNode } from "react";
import { BookAIcon, GraduationCap, Loader2, TrendingUp, UsersRound } from "lucide-react";
import apiClient from "@/services/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import MetricCard from "@/components/ui/MetricCard";
import { DashboardHeader } from "@/features/admin/components/DashboardHeader";
import NavbarAdmin from "@/features/admin/components/NavbarAdmin";
import { PlatformPerformance } from "@/features/admin/components/PlatformPerformance";
import { QuickActions } from "@/features/admin/components/QuickActions";
import { RecentActivities } from "@/features/admin/components/RecentActivities";
import Sidebar from "@/features/admin/components/SideBar";

interface DashboardMetric {
  key: string;
  title: string;
  value: string | number;
  tag?: string;
  tagType?: "success" | "danger" | "info";
}

interface AdminDashboardData {
  teacherName: string;
  metrics: DashboardMetric[];
  recentCourses: Array<{
    id: string;
    name: string;
    studentNum: number;
    rating: number;
    ratingCount: number;
    state: string;
  }>;
  growthData: Array<{ month: string; value: number }>;
  liveSessions: unknown[];
  quickTasks: unknown[];
}

interface DashboardResponse {
  data: AdminDashboardData;
}

const metricIcons: Record<string, ReactNode> = {
  students: <UsersRound className="h-5 w-5" />,
  courses: <GraduationCap className="h-5 w-5" />,
  enrollments: <TrendingUp className="h-5 w-5" />,
  monthEnrollments: <BookAIcon className="h-5 w-5" />,
};

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<DashboardResponse>("/teacher/dashboard");

        if (isMounted) {
          setDashboard(response.data.data);
        }
      } catch (requestError: unknown) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "تعذر تحميل لوحة التحكم.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = dashboard?.metrics ?? [];
  const displayName = dashboard?.teacherName || [user?.FName, user?.LName].filter(Boolean).join(" ") || "مسؤول النظام";

  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <NavbarAdmin userName={displayName} userRole={user?.Role === "Admin" ? "مسؤول النظام" : "مدير المنصة"} />

        <main className="space-y-6 overflow-y-auto p-6">
          <DashboardHeader />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && !dashboard ? (
            <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جارٍ تحميل بيانات لوحة التحكم...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard
                    key={metric.key}
                    title={metric.title}
                    value={metric.value}
                    tag={metric.tag}
                    tagType={metric.tagType}
                    icon={metricIcons[metric.key] ?? <BookAIcon className="h-5 w-5" />}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <RecentActivities />
                </div>

                <div className="space-y-6">
                  <QuickActions />
                  <PlatformPerformance />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
