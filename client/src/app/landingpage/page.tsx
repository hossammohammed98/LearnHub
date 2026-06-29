import Navbar from "@/features/landingpage/component/LandingNavbar";
import Hero from "@/features/landingpage/component/Hero";
import FeaturesSection from "@/features/landingpage/component/FeaturesSection";
import StepsSection from "@/features/landingpage/component/StepsSection";
import PricingSection from "@/features/landingpage/component/PricingSection";
import CtaBanner from "@/features/landingpage/component/CtaBanner";
import Footer from "@/features/landingpage/component/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 antialiased font-sans flex flex-col">
      
      <Navbar />

      <main className="flex-grow">
        
        <Hero />

        <div id="features">
          <FeaturesSection />
        </div>

        <StepsSection />

        <div id="pricing">
          <PricingSection />
        </div>

        <CtaBanner />
        
      </main>

      <Footer />

      <button 
        aria-label="Support Chat"
        className="fixed bottom-6 left-6 w-12 h-12 bg-[#0b1324] hover:bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 z-50 cursor-pointer"
      >
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

    </div>
  );
}
