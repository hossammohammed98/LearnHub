import SideBar from "@/components/common/SideBar";
import ChatLayout from "@/features/chat/components/ChatLayout";

import { redirect } from "next/navigation";
import Badge from "@/components/ui/Badge";
import ButtonInit from "@/components/ui/ButtonInit";
import MetricCard from "@/components/ui/MetricCard";
import Progress from "@/components/ui/Progress";

// مكونات المعلم والطالب
import CurrentCourse from "@/features/student/components/CurrentCourse";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import CourseDescription from "../features/student/components/CourseDescription";
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

// مكونات الشات
import ConversationItem from "@/features/chat/components/ConversationItem";

// مكونات أولياء الأمور (Parent Portal)

import { ActivityCard } from "@/features/parent/components/ActivityCard";
import { FamilyPerformance } from "@/features/parent/components/FamilyPerformance";
import StatCard from "@/features/parent/components/StateCad";


export default function HomePage() {
  // إذا كنت تريد تحويل المستخدم مباشرة لصفحة تسجيل الدخول، فك التعليق عن السطر التالي:
  redirect("/register");

  return (
    
    <>   
        
    </>
  );
}