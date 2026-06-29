import AssistantsNavbar from "@/features/ManageAssistants/component/AssistantNavbar";
import AssistantsSidebar from "@/features/ManageAssistants/component/AssistantSidebar";
import AssistantsFooter from "@/features/ManageAssistants/component/AssistantFooter";
import Breadcrumb from "@/features/ManageAssistants/component/Breadcrumb";
import AssistantsGrid from "@/features/ManageAssistants/component/AssistansGrid";
import TeamActivitySummary from "@/features/ManageAssistants/component/TeamActivitySummary";
import NewAssistantForm from "@/features/ManageAssistants/component/NewassistantForm";
import PermissionsPanel from "@/features/ManageAssistants/component/PermissionsPanel";

export default function AssistantsPage() {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-gray-50">
      <AssistantsNavbar />
 
      <div className="flex flex-1 flex-col lg:flex-row">
        <AssistantsSidebar />
 
        <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
          <Breadcrumb />
 
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <div className="space-y-4 sm:space-y-6 lg:col-span-1">
              <NewAssistantForm />
              <PermissionsPanel />
            </div>
            <div className="space-y-4 sm:space-y-6 lg:col-span-2">
              <AssistantsGrid />
              <TeamActivitySummary />
            </div>
          </div>
        </main>
      </div>
 
      <AssistantsFooter />
    </div>
  );
}
