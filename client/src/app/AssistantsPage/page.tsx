"use client";

import { useState } from "react";
import RoleGuard from "@/components/common/RoleGuard";
import apiClient from "@/services/apiClient";
import AssistantsNavbar from "@/features/ManageAssistants/component/AssistantNavbar";
import AssistantsSidebar from "@/features/ManageAssistants/component/AssistantSidebar";
import AssistantsFooter from "@/features/ManageAssistants/component/AssistantFooter";
import Breadcrumb from "@/features/ManageAssistants/component/Breadcrumb";
import AssistantsGrid from "@/features/ManageAssistants/component/AssistansGrid";
import type { Assistant } from "@/features/ManageAssistants/component/AssistantCard";
import TeamActivitySummary from "@/features/ManageAssistants/component/TeamActivitySummary";
import NewAssistantForm from "@/features/ManageAssistants/component/NewassistantForm";
import PermissionsPanel from "@/features/ManageAssistants/component/PermissionsPanel";

export default function AssistantsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);

  const refreshAssistants = () => setRefreshKey((current) => current + 1);
  const focusNewAssistantForm = () => {
    document.getElementById("new-assistant-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("assistant-email")?.focus();
  };
  const handleEditPermissions = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    document.getElementById("permissions-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const handleSavePermissions = async (permissions: Array<{ id: string; enabled: boolean }>) => {
    if (!selectedAssistant) return;

    setIsSavingPermissions(true);
    try {
      await apiClient.patch(`/assistant/${selectedAssistant.id}`, {
        PermissionIds: permissions.filter((permission) => permission.enabled).map((permission) => permission.id),
      });
      refreshAssistants();
    } finally {
      setIsSavingPermissions(false);
    }
  };

  const activeAssistantCount = assistants.filter((assistant) => assistant.status === "active").length;
  const enabledPermissionCount = assistants.reduce(
    (total, assistant) => total + assistant.permissionIds.length,
    0,
  );

  return (
    <RoleGuard allowedRoles={["Teacher"]}>
      <div dir="rtl" className="flex min-h-screen flex-col bg-gray-50">
      <AssistantsNavbar />
 
      <div className="flex flex-1 flex-col lg:flex-row">
        <AssistantsSidebar />
 
        <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
          <Breadcrumb />
 
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <div className="space-y-4 sm:space-y-6 lg:col-span-1">
              <NewAssistantForm onCreated={refreshAssistants} />
              <div id="permissions-panel">
                <PermissionsPanel
                  key={selectedAssistant?.id || "no-assistant-selected"}
                  selectedAssistant={selectedAssistant}
                  isSaving={isSavingPermissions}
                  onSubmit={handleSavePermissions}
                />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 lg:col-span-2">
              <AssistantsGrid
                refreshKey={refreshKey}
                onAddNew={focusNewAssistantForm}
                onAssistantsLoaded={setAssistants}
                onEditPermissions={handleEditPermissions}
              />
              <TeamActivitySummary
                assistantCount={assistants.length}
                activeCount={activeAssistantCount}
                permissionCount={enabledPermissionCount}
              />
            </div>
          </div>
        </main>
      </div>
 
      <AssistantsFooter />
      </div>
    </RoleGuard>
  );
}
