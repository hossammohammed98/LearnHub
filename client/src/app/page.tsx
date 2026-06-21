import Navbar from "@/components/common/Navbar";
import StudentNavBar from "@/features/student/components/StudentNavBar";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import { redirect } from "next/navigation";

export default function HomePage() {
  // تحويل المستخدم مباشرة إلى صفحة تسجيل الدخول
  // redirect("/login");
  return(
    // <StudentNavBar></StudentNavBar>
    <TeacherNavBar></TeacherNavBar>
  )
  
}