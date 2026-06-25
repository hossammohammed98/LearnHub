import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";
import ButtonInit from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import Progress from "@/components/ui/Progress";

// مكونات المعلم والطالب
import CurrentCourse from "@/features/student/components/CurrentCourse";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import CourseDescription from "../features/student/components/CourseDescription";
import StudentNavBar from "@/features/student/components/StudentNavBar";
import StudentDashboard from "@/features/student/components/StudentDashboard";
import Calender from "@/features/student/components/Calender";
import CalenderItem from "@/features/student/components/CalenderItem";
import HeroSection from "@/features/student/components/HeroSection";

import SectionHeader from "@/features/landingpage/component/SectionHeader";
import Hero from "@/features/landingpage/component/Hero";
import FeaturesSection from "@/features/landingpage/component/FeaturesSection";
import StepsSection from "@/features/landingpage/component/StepsSection";
import PricingSection from "@/features/landingpage/component/PricingSection";
import CtaBanner from "@/features/landingpage/component/CtaBanner";
import Navbar from "@/features/landingpage/component/Navbar";
import Footer from "@/features/landingpage/component/Footer";
import LandingPage from "./landingpage/LandingPage";
import SideBar from "@/components/common/SideBar";

// مكونات الشات
import ConversationItem from "@/features/chat/components/ConversationItem";
import ChatLayout from "@/features/chat/components/ChatLayout";

// مكونات أولياء الأمور (Parent Portal)

import { ActivityCard } from "@/features/parent/components/ActivityCard";
import { FamilyPerformance } from "@/features/parent/components/FamilyPerformance";
import StatCard from "@/features/parent/components/StateCad";

export default function HomePage() {
  // إذا كنت تريد تحويل المستخدم مباشرة لصفحة تسجيل الدخول، فك التعليق عن السطر التالي:
  // redirect("/login");

  return (
    <>   
      {/* <StudentDashboard></StudentDashboard> */}
      {/* <StudentNavBar></StudentNavBar> */}
      {/* <TeacherNavBar></TeacherNavBar> */}
      {/* <MetricCard ></MetricCard> */}
      {/* <Badge variant="success">قيد التقدم</Badge> */}
      {/* <ButtonInit ButtonVariant="success">انشاء دوره جديده</ButtonInit> */}
      {/* <Progress value={40} showLabel={true}></Progress> */}
      
      {/* <CurrentCourse badge={<Badge variant="success">قيد التقدم</Badge>} courseLevel={<Badge variant="neutral">مستوى متقدم</Badge>}></CurrentCourse> */}

      {/* <CourseDescription
        courseDescription="تعلّم كيفية بناء استراتيجيات قوية تعزز من كفاءة الأداء المؤسسي في البيئات التعليمية الحديثة والتقنيات الصاعدة."
        courseName="الاستراتيجيات المتقدمة في إدارة المؤسسات الأكاديمية"
        title="دورة القيادة التنفيذية"
      >
        <>
          <Progress value={40} showLabel={true}></Progress>
          <ButtonInit>متابعة التعلم</ButtonInit>
        </>
      </CourseDescription> */}
      
      {/* <Calender></Calender> */}
      {/* <SectionHeader title={"رحلة تعليمية ممتعة و احترافية مصممة خصيصا للمستقبل وتعتمد على الذكاء الاصطناعى لتخصيص تجربة كل طالب"}></SectionHeader> */}
      {/* <Navbar></Navbar> */}
      {/* <Hero></Hero> */}
      {/* <FeaturesSection></FeaturesSection> */}
      {/* <StepsSection></StepsSection> */}
      {/* <PricingSection></PricingSection> */}
      {/* <CtaBanner></CtaBanner> */}
      {/* <Footer></Footer> */}
      {/* <LandingPage></LandingPage> */}
      
      <SideBar></SideBar>

      {/* <Calender> 
        <>
          <CalenderItem title={'حلقة بحث: الذكاء الاصطناعي'} day="اليوم" hour={'، 04:00 م'}></CalenderItem>
          <CalenderItem title={'إدارة الموارد البشرية'} day="غداً" hour={'، 10:00 م'}></CalenderItem>
        </>
      </Calender> */}
      
      {/* <HeroSection userName="أحمد"></HeroSection> */}
      
      <ChatLayout></ChatLayout>

      {/* ميزات أولياء الأمور (آخر تحديث) */}
      {/* <StatCard/> */}
      {/* <ActivityCard /> */}
      {/* <ActivityCard/> */}
      
      {/* المكون الشامل لأولياء الأمور */}
      <FamilyPerformance />
    </>
  );
}