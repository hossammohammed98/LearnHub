'use client'
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import ActivityChart from "@/features/teacher/ActivityChart";
import LiveSessions from "@/features/teacher/LiveSessions";
import QuickTasks from "@/features/teacher/QuickTasks";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import TeacherSideBar from "@/features/teacher/TeacherSideBar";
import RecentCourseCard from '../../../features/teacher/RecentCourseCard';
import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "@/services/apiClient";
import { BookAIcon, GraduationCap, Loader2, Plus, TrendingUp, UsersRound } from "lucide-react";

interface DashboardMetric {
  key: string;
  title: string;
  value: string | number;
  tag?: string;
  tagType?: "success" | "danger" | "info";
}

interface CourseCardData {
  id: string;
  name: string;
  studentNum: number;
  rating: number;
  ratingCount: number;
  state: string;
}

interface ChartPoint {
  month: string;
  value: number;
}

interface LiveSessionData {
  id: string | number;
  day: string;
  month: string;
  title: string;
  time: string;
  color: string;
}

interface QuickTaskData {
  id: string | number;
  text: string;
  completed: boolean;
}

interface TeacherDashboardData {
  teacherName: string;
  metrics: DashboardMetric[];
  recentCourses: CourseCardData[];
  growthData: ChartPoint[];
  liveSessions: LiveSessionData[];
  quickTasks: QuickTaskData[];
}

interface DashboardResponse {
  data: TeacherDashboardData;
}

const defaultGrowthData: ChartPoint[] = [
  { month: "يناير", value: 0 },
  { month: "فبراير", value: 0 },
  { month: "مارس", value: 0 },
  { month: "أبريل", value: 0 },
  { month: "مايو", value: 0 },
  { month: "يونيو", value: 0 },
];

const metricIcons: Record<string, ReactNode> = {
  students: <UsersRound className="h-5 w-5" />,
  courses: <GraduationCap className="h-5 w-5" />,
  enrollments: <TrendingUp className="h-5 w-5" />,
  monthEnrollments: <BookAIcon className="h-5 w-5" />,
};

function getMetricIcon(metricKey: string) {
  return metricIcons[metricKey] || <BookAIcon className="h-5 w-5" />;
}

function TeacherDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [dashboard, setDashboard] = useState<TeacherDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<DashboardResponse>('/teacher/dashboard');
        if (isMounted) {
          setDashboard(response.data.data);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (requestError: any) {
        if (isMounted) {
          setError(requestError?.message || 'تعذر تحميل لوحة المعلم.');
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

  const metricCards = dashboard?.metrics ?? [];
  const recentCourses = dashboard?.recentCourses ?? [];
  const growthData = dashboard?.growthData?.length ? dashboard.growthData : defaultGrowthData;
  const liveSessions = dashboard?.liveSessions ?? [];
  const quickTasks = dashboard?.quickTasks ?? [];
  const displayName = dashboard?.teacherName || user?.FName || 'المعلم';

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] text-slate-900">
      <TeacherNavBar />

      <div className="flex">
        <TeacherSideBar />

        <main className="w-full px-10 flex flex-col items-start gap-12 mt-10">
          <div className="w-full flex justify-between items-end gap-6">
            <div>
              <p className="font-bold text-2xl font-sans mb-2">
                أهلاً بك د. {displayName}
              </p>
              <p className="text-xl font-sans text-brand-gray">
                هذا هو ملخص أدائك الأكاديمي والنشاط الحالي لطلابك.
              </p>
            </div>

            <Button size="md" disabled={isLoading} onClick={() => router.push("/UploadVideos")}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              إنشاء دورة جديدة
            </Button>
          </div>

          {error && (
            <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && !dashboard ? (
            <div className="w-full rounded-2xl border border-dashed border-[#E6E8EA] bg-white px-6 py-10 text-center text-sm text-slate-500">
              جارٍ تحميل لوحة المعلم من الخادم...
            </div>
          ) : (
            <>
              <div className="flex gap-6 justify-center items-center flex-wrap">
                {metricCards.map((metric, index) => (
                  <div key={metric.key || index} className="w-55">
                    <MetricCard
                      title={metric.title}
                      value={metric.value}
                      tag={metric.tag}
                      tagType={metric.tagType}
                      icon={getMetricIcon(metric.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-start items-start flex-wrap gap-6">
                <div className="flex flex-col justify-start items-start gap-6">
                  <div className="flex flex-wrap max-w-155 bg-[#FFFFFF] rounded-2xl border-2 border-[#E6E8EA] overflow-hidden">
                    <div className="h-19.75 flex w-full justify-between items-center px-6 font-sans">
                      <p className="text-xl">الدورات الأخيرة</p>
                      <p className="text-sm text-brand-success">عرض الكل</p>
                    </div>

                    {recentCourses.length ? recentCourses.map((course) => (
                      <RecentCourseCard
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        studentNum={course.studentNum}
                        rating={course.rating}
                        ratingCount={course.ratingCount}
                        state={course.state}
                      />
                    )) : (
                      <div className="w-full border-t-2 border-[#E6E8EA] px-6 py-8 text-sm text-slate-500">
                        لا توجد دورات حديثة لعرضها.
                      </div>
                    )}
                  </div>

                  <ActivityChart data={growthData} />
                </div>

                <aside className="space-y-6">
                  <LiveSessions sessions={liveSessions} />
                  <QuickTasks tasks={quickTasks} />
                </aside>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
