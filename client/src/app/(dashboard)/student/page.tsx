'use client'

import { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import NotificationBell from '@/components/ui/NotificationBell';
import SearchBar from '@/components/ui/SearchBar';
import SideBar from '@/components/common/SideBar';
import MetricCard from '@/components/ui/MetricCard';
import { BookAIcon, CircleCheck, FileQuestion, PlayCircleIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import ButtonInit from '@/components/ui/ButtonInit';
import StudentNavLinks from '@/features/student/components/StudentNavLinks';
import HeroSection from '@/features/student/components/HeroSection';
import CurrentCourse from '@/features/student/components/CurrentCourse';
import CourseDescription from '@/features/student/components/CourseDescription';
import Calender from '@/features/student/components/Calender';
import CalenderItem from '@/features/student/components/CalenderItem';
import { useAuthStore } from '@/store/useAuthStore';
import { userService, DashboardSummaryData } from '@/features/student/services/userService';

function StudentDashboard() {
  const user = useAuthStore((state) => state.user);

  const [dashboardData, setDashboardData] = useState<DashboardSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getStudentDashboardSummary();
        setDashboardData(data);
      } catch (err: any) {
        console.error("❌ Debug Logs:", {
          msg: err.message,
          status: err.status,
          code: err.code
        });
        setDashboardData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  const stats = dashboardData?.stats || { totalCourses: 0, newCoursesCount: 0, completedLessons: 0, overallProgress: 0, pendingQuizzes: 0, isQuizzesUrgent: false };
  const currentCourse = dashboardData?.currentCourse;
  const sessions = dashboardData?.upcomingSessions || [];

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar
        centerContent={<SearchBar placeholder='ابحث عن دوره....' />}
        leftActions={<NotificationBell />}
        rightActions={<StudentNavLinks />}
      />

      <div className='flex flex-1 overflow-hidden'>
        <SideBar />

        <main className='flex-1 overflow-y-auto px-4 md:px-8 py-8 max-w-screen-xl mx-auto w-full'>
          <HeroSection userName={user?.FName || "طالب"} />

          <section aria-label="ملخص الإحصائيات" className="mt-8 flex flex-wrap gap-4">
            <MetricCard
              icon={<BookAIcon className="w-5 h-5" />}
              tag={`+${stats.newCoursesCount} جديد`}
              title='اجمالى الدورات'
              value={stats.totalCourses}
              iconType='info'
              tagType='success'
            />
            <MetricCard
              icon={<CircleCheck className="w-5 h-5" />}
              tag={<Progress value={stats.overallProgress} size='sm' showLabel />}
              title='الدروس المكتملة'
              value={stats.completedLessons}
              iconType='success'
            />
            <MetricCard
              icon={<FileQuestion className="w-5 h-5" />}
              tag={stats.isQuizzesUrgent ? <Badge variant='danger'>عاجل</Badge> : undefined}
              title='الاختبارات المعلقه'
              value={stats.pendingQuizzes}
              iconType='danger'
            />
          </section>

          <section aria-label="الدورة الحالية والجلسات" className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            <div className="md:col-span-2 flex flex-col sm:flex-row w-full gap-0 overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
              {currentCourse ? (
                <>
                  <CurrentCourse
                    badge={<Badge variant='success'>{currentCourse.status || 'قيد التقدم'}</Badge>}
                    courseLevel={<Badge variant='neutral'>{currentCourse.level || 'المستوى العام'}</Badge>}
                  />
                  <CourseDescription
                    courseDescription={currentCourse.description}
                    courseName={currentCourse.name}
                    title={currentCourse.title}
                  >
                    <Progress value={currentCourse.progress} showLabel={true} />
                    <ButtonInit>
                      متابعة التعلم
                      <PlayCircleIcon className="inline-block ms-1 w-4 h-4" />
                    </ButtonInit>
                  </CourseDescription>
                </>
              ) : (
                <div className="p-12 text-center w-full text-slate-400 text-sm flex items-center justify-center bg-white">
                  لا توجد دورات تدريبية نشطة حالياً. ابدأ بتصفح المنصة للتسجيل في الدورات!
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