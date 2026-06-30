'use client'

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/ui/SearchBar';
import MetricCard from '@/components/ui/MetricCard';
import { BookAIcon, CircleCheck, FileQuestion, PlayCircleIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import ButtonInit from '@/components/ui/ButtonInit';
import StudentSideBar from '@/features/student/components/StudentSideBar';
import StudentNavbar from '@/features/student/components/StudentNavbar';
import HeroSection from '@/features/student/components/HeroSection';
import CurrentCourse from '@/features/student/components/CurrentCourse';
import CourseDescription from '@/features/student/components/CourseDescription';
import Calender from '@/features/student/components/Calender';
import CalenderItem from '@/features/student/components/CalenderItem';
import { useAuthStore } from '@/store/useAuthStore';
import { userService, DashboardSummaryData } from '@/features/student/services/userService';

function StudentDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [dashboardData, setDashboardData] = useState<DashboardSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getStudentDashboardSummary();
        setDashboardData(data);

        if (data.profile?.avatar) {
          const currentUser = useAuthStore.getState().user;
          if (currentUser) {
            setUser({ ...currentUser, Avatar: data.profile.avatar });
          }
        }
      } catch (err: unknown) {
        console.error('Student dashboard load error:', err);
        setDashboardData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [setUser]);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/BrowescorsesPage?search=${encodeURIComponent(query)}`);
  };

  if (isLoading) {
    return (
      <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-base font-medium text-slate-500 animate-pulse">جاري تحميل بيانات لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalCourses: 0,
    newCoursesCount: 0,
    completedLessons: 0,
    overallProgress: 0,
    pendingQuizzes: 0,
    isQuizzesUrgent: false,
  };
  const currentCourse = dashboardData?.currentCourse;
  const sessions = dashboardData?.upcomingSessions || [];
  const profile = dashboardData?.profile;
  const displayName = profile?.firstName || user?.FName || 'طالب';

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <StudentNavbar
        centerContent={
          <form onSubmit={handleSearchSubmit} className="w-full">
            <SearchBar
              placeholder="ابحث عن دورة..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <StudentSideBar />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 max-w-screen-xl mx-auto w-full">
          <HeroSection userName={displayName} />

          <section aria-label="ملخص الإحصائيات" className="mt-8 flex flex-wrap gap-4">
            <Link href="/MyCourses" className="block">
              <MetricCard
                icon={<BookAIcon className="w-5 h-5" />}
                tag={stats.newCoursesCount > 0 ? `+${stats.newCoursesCount} جديد` : undefined}
                title="اجمالى الدورات"
                value={stats.totalCourses}
                iconType="info"
                tagType="success"
              />
            </Link>
            <Link href="/MyCourses" className="block">
              <MetricCard
                icon={<CircleCheck className="w-5 h-5" />}
                tag={<Progress value={stats.overallProgress} size="sm" showLabel />}
                title="الدروس المكتملة"
                value={stats.completedLessons}
                iconType="success"
              />
            </Link>
            <Link href="/MyCourses" className="block">
              <MetricCard
                icon={<FileQuestion className="w-5 h-5" />}
                tag={stats.isQuizzesUrgent ? <Badge variant="danger">عاجل</Badge> : undefined}
                title="الاختبارات المعلقه"
                value={stats.pendingQuizzes}
                iconType="danger"
              />
            </Link>
          </section>

          <section aria-label="الدورة الحالية والجلسات" className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            <div className="md:col-span-2 flex flex-col sm:flex-row w-full gap-0 overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
              {currentCourse ? (
                <>
                  <CurrentCourse
                    imgUrl={currentCourse.coverImage}
                    badge={<Badge variant="success">{currentCourse.status || 'قيد التقدم'}</Badge>}
                    courseLevel={<Badge variant="neutral">{currentCourse.level || 'المستوى العام'}</Badge>}
                  />
                  <CourseDescription
                    courseDescription={currentCourse.description}
                    courseName={currentCourse.name}
                    title={currentCourse.title}
                  >
                    <Progress value={currentCourse.progress} showLabel={true} />
                    <Link href={`/courses?courseId=${currentCourse.id}`}>
                      <ButtonInit className="w-full sm:w-auto">
                        متابعة التعلم
                        <PlayCircleIcon className="inline-block ms-1 w-4 h-4" />
                      </ButtonInit>
                    </Link>
                  </CourseDescription>
                </>
              ) : (
                <div className="p-12 text-center w-full text-slate-400 text-sm flex flex-col items-center justify-center gap-4 bg-white">
                  <p>لا توجد دورات تدريبية نشطة حالياً. ابدأ بتصفح المنصة للتسجيل في الدورات!</p>
                  <Link
                    href="/BrowescorsesPage"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
                  >
                    تصفح الدورات
                  </Link>
                </div>
              )}
            </div>

            <div className="w-full">
              <Calender>
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <CalenderItem
                      key={session.id}
                      title={session.title}
                      day={session.day}
                      hour={session.hour}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-lg border border-gray-100">
                    لا توجد محاضرات أو حلقات نقاش مجدولة قريباً.
                  </div>
                )}
              </Calender>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
