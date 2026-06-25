<<<<<<< HEAD
import { redirect } from "next/navigation";

export default function HomePage() {
  // تحويل المستخدم مباشرة إلى صفحة تسجيل الدخول
  redirect("/login");
=======
import Badge from "@/components/ui/Badge";
import ButtonInit from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import Progress from "@/components/ui/Progress";
import CurrentCourse from "@/features/student/components/CurrentCourse";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import CourseDescription from '../features/student/components/CourseDescription';
import StudentNavBar from "@/features/student/components/StudentNavBar";
import Calender from "@/features/student/components/Calender";

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
      <Calender></Calender>

    </>

  )

}