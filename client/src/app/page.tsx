import Navbar from "@/features/landingpage/component/Navbar";
import Hero from "@/features/landingpage/component/Hero";
import FeaturesSection from "@/features/landingpage/component/FeaturesSection";
import StepsSection from "@/features/landingpage/component/StepsSection";
import PricingSection from "@/features/landingpage/component/PricingSection";
import CtaBanner from "@/features/landingpage/component/CtaBanner";
import Footer from "@/features/landingpage/component/Footer";
import LandingPage from "./landingpage/page";

// مكونات الشات
import ConversationItem from "@/features/chat/components/ConversationItem";

// مكونات أولياء الأمور (Parent Portal)

import { ActivityCard } from "@/features/parent/components/ActivityCard";
import { FamilyPerformance } from "@/features/parent/components/FamilyPerformance";
import StatCard from "@/features/parent/components/StateCad";
import { redirect } from "next/navigation";


export default function HomePage() {
  // إذا كنت تريد تحويل المستخدم مباشرة لصفحة تسجيل الدخول، فك التعليق عن السطر التالي:
  redirect("/register");

}
