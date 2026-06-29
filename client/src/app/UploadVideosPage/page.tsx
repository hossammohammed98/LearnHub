import UploadNavbar from "@/features/UploadVideos/component/UploadNavbar";
import UploadSidebar from "@/features/UploadVideos/component/UploadSidebar";
import UploadHeader from "@/features/UploadVideos/component/UploadHeader";
import StepIndicator from "@/features/UploadVideos/component/StepIndicator";
import CoverUploadCard from "@/features/UploadVideos/component/CoverUploadCard";
import UploadPricingCard from "@/features/UploadVideos/component/UploadPricingCard";
import BasicInfoForm from "@/features/UploadVideos/component/BasicInfoForm";
import CurriculumBuilder from "@/features/UploadVideos/component/CurriculumBuilder";
import UploadFooter from "@/features/UploadVideos/component/UploadFooter";


export default function UploadPage() {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-gray-50">
      <UploadNavbar />
 
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar renders first in source order so, under dir="rtl", it
            lands on the right (matching the original design). On small/
            medium screens it collapses into a horizontal top bar instead
            of eating vertical space. */}
        <UploadSidebar />
 
        <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
          <UploadHeader />
          <StepIndicator />
 
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <div className="space-y-4 sm:space-y-6 lg:col-span-1">
              <CoverUploadCard />
              <UploadPricingCard />
            </div>
            <div className="space-y-4 sm:space-y-6 lg:col-span-2">
              <BasicInfoForm />
              <CurriculumBuilder />
            </div>
          </div>
        </main>
      </div>
 
      <UploadFooter />
    </div>
  );
}
