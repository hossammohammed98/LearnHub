"use client"; 

import { useState } from "react";
import BrowseHeader from "@/features/BrowseCourses/components/BrowseHeader";
import BrowseSidebar from "@/features/BrowseCourses/components/BrowesSidebar";
import PathsHero from "@/features/BrowseCourses/components/PathsHero";
import CategoryTabs from "@/features/BrowseCourses/components/CategoryTabs";
import UXPathCard from "@/features/BrowseCourses/components/UXPathCard";
import FeaturedPathCard from "@/features/BrowseCourses/components/FeaturedPathCard";
import CreatePathCard from "@/features/BrowseCourses/components/CreatePathCard";
import MarketingPathCard from "@/features/BrowseCourses/components/MarketingPathCard";
import DataSciencePathCard from "@/features/BrowseCourses/components/DataSciencePathCard";
import HowItWorks from "@/features/BrowseCourses/components/HowItWorks";
import BrowseFooter from "@/features/BrowseCourses/components/BrowseFooter";
import Link from "next/link";

export default function PathsPage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Dark blur backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        {/* The Left Side Tab Panel */}
        <div className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl p-6 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <span className="font-bold text-gray-800">التنقل السريع</span>
              {/* Close button inside the tab */}
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-800">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links with brand colors */}
            <nav className="flex flex-col gap-4 text-right mb-6 font-medium text-gray-600">
              <Link href="/register" className="hover:text-[#006C49] py-2 border-b border-gray-50">الرئيسية</Link>
              <Link href="/BrowserCourses" className="hover:text-brand-success py-2 border-b border-gray-50 text-brand-success font-bold">تصفح المسارات</Link>
              <Link href="/teacher" className="hover:text-brand-success py-2 border-b border-gray-50">المدربين</Link>
              <Link href="/register" className="hover:text-brand-success py-2">تعلم</Link>
            </nav>

            <hr className="my-2" />
            
            <div className="flex-1 overflow-y-auto mt-4">
              <BrowseSidebar />
            </div>
          </div>
        </div>
      </div>

      <div>
        <BrowseHeader onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

        {/* Main Content Layout */}
        <div className="flex items-stretch">
          
          {/* Desktop Sidebar: Stretched to full height and sticky */}
          <aside className="hidden md:block w-64 border-l border-gray-100 bg-white shrink-0">
            <div className="sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
              <BrowseSidebar />
            </div>
          </aside>

          {/* Main Area */}
          <main className="flex-1 w-full max-w-7xl mx-auto">
            <PathsHero />
            <CategoryTabs />

            <section className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:px-8 md:py-10 md:grid-cols-3">
              <div className="md:col-span-2">
                <FeaturedPathCard />
              </div>
              <div className="md:col-span-1">
                <UXPathCard />
              </div>

              <CreatePathCard />
              <MarketingPathCard />
              <DataSciencePathCard />
            </section>

            <HowItWorks />
          </main>
        </div>
      </div>

      <BrowseFooter />
    </div>
  );
}