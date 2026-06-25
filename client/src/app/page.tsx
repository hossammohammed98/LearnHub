import Badge from "@/components/ui/Badge";
import ButtonInit from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import Progress from "@/components/ui/Progress";
import CurrentCourse from "@/features/student/components/CurrentCourse";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import CourseDescription from "../features/student/components/CourseDescription";
import StudentNavBar from "@/features/student/components/StudentNavBar";
import Calender from "@/features/student/components/Calender";
import ParentPortal from "@/components/ui/ParentPortal";
import statCard from "../features/parent/components/StateCad";
import StatCard from "../features/parent/components/StateCard";
import { ActivityCard } from "@/features/parent/components/ActivityCard";
import { FamilyPerformance } from "@/features/parent/components/FamilyPerformance";
export default function HomePage() {
  // تحويل المستخدم مباشرة إلى صفحة تسجيل الدخول

  // redirect("/login");
  return (
    <>
      {/* <StudentNavBar></StudentNavBar> */}

      {/* <TeacherNavBar></TeacherNavBar> */}
      {/* <MetricCard ></MetricCard> */}
      {/* <Badge variant="success">قيد التقدم</Badge> */}
      {/* <ButtonInit ButtonVariant="success">انشاء دوره جديده</ButtonInit> */}
      {/* <Progress value={40} showLabel={true}></Progress> */}
      {/* <CurrentCourse badge={ <Badge variant="success">قيد التقدم</Badge>} 
      courseLevel={ <Badge variant="neutral">مستوى متقدم</Badge>}>
      </CurrentCourse> */}

      {/* <CourseDescription
        courseDescription="تعلّم كيفية بناء استراتيجيات قوية تعزز من
                    كفاءة الأداء المؤسسي في البيئات التعليمية
                    الحديثة والتقنيات الصاعدة."

        courseName="الاستراتيجيات المتقدمة في
                    إدارة المؤسسات الأكاديمية"

        title="دورة القيادة التنفيذية"
      >
        <>
          <Progress value={40} showLabel={true}></Progress>
          <ButtonInit >متابعة التعلم</ButtonInit>
        </>
      </CourseDescription> */}
      {/* <Calender></Calender> */}


      {/* last update */}

      {/* <StatCard/> */}
      {/* <ActivityCard /> */}
      {/* <ActivityCard/> */}
      {/* Important Alerts */}
      {/* Child */}
      {/* ChildReportCard */}
      
      {/* component الشامل */}
      <FamilyPerformance />
    </>
  );
}
