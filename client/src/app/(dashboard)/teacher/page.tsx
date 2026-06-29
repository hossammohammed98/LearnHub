'use client'
import Button from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import ActivityChart from "@/features/teacher/ActivityChart";
import LiveSessions from "@/features/teacher/LiveSessions";
import QuickTasks from "@/features/teacher/QuickTasks";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import TeacherSideBar from "@/features/teacher/TeacherSideBar";
import { BookAIcon, Plus } from "lucide-react";
import RecentCourseCard from '../../../features/teacher/RecentCourseCard';
import { useAuthStore } from "@/store/useAuthStore";

interface MetricCardProps {
  title: string;
  value: string | number;
  tag?: string;
  tagType?: "success" | "danger" | "info";
  icon: React.ReactNode;
}

const teacherMetricCards: MetricCardProps[] = [
  {
    title: "اجمالى الطلاب",
    value: 1248,
    tag: "+12%",
    tagType: "info",
    icon: <BookAIcon></BookAIcon>,
  },
  {
    title: "اجمالى الطلاب",
    value: 1248,
    tag: "+12%",
    tagType: "info",
    icon: <BookAIcon></BookAIcon>,
  },
  {
    title: "الدورات النشطة",
    value: 1248,
    tag: "+12%",
    tagType: "info",
    icon: <BookAIcon></BookAIcon>,
  },
  {
    title: "إجمالي الإيرادات",
    value: 1248,
    tag: "+12%",
    tagType: "info",
    icon: <BookAIcon></BookAIcon>,
  },
];

 const studentsGrowthData = [
  { month: "يناير", value: 40 },
  { month: "فبراير", value: 60 },
  { month: "مارس", value: 50 },
  { month: "أبريل", value: 80 },
  { month: "مايو", value: 70 },
  { month: "يونيو", value: 95 },
];
function TeacherDashboard() {
    const user=useAuthStore((state)=>state.user);
  return (
    <>
      <div> 
        <TeacherNavBar></TeacherNavBar>
        <div className="flex">
          <TeacherSideBar></TeacherSideBar>
          <div className="w-full px-10 flex flex-col items-start gap-12 mt-10">
            <div className="w-full flex justify-between items-end">
              <div>
                <p className="font-bold text-2xl font-sans mb-2">
                  أهلاً بك د. {user?.FName}
                </p>
                <p className="text-xl font-sans text-[#45474C]">
                  هذا هو ملخص أدائك الأكاديمي والنشاط الحالي لطلابك.
                </p>
              </div>
              <Button size="md" >
                <Plus />
                إنشاء دورة جديدة
              </Button>
            </div>

            <div className=" flex gap-6 justify-center items-center flex-wrap">
              {teacherMetricCards.map((a, i) => {
                return (
                  <div key={i} className="w-55">
                    <MetricCard
                      title={a.title}
                      value={a.value}
                      tag={a.tag}
                      tagType={a.tagType}
                      icon={a.icon}></MetricCard>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-start items-start flex-wrap gap-6">
              <div className="flex flex-col justify-start items-start gap-6">
              <div className="flex flex-wrap max-w-155 bg-[#FFFFFF] rounded-2xl border-2 border-[#E6E8EA]">
                <div className="h-19.75 flex w-full justify-between items-center px-6 font-sans">
                  <p className="text-xl">الدورات الأخيرة</p>
                  <p className="text-sm text-[#006C49]">عرض الكل</p>
                </div>
                <RecentCourseCard></RecentCourseCard>
              </div>
                <ActivityChart data={studentsGrowthData}></ActivityChart>
              </div>

              <aside className="space-y-6">
                <LiveSessions />
                <QuickTasks />
              </aside>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
