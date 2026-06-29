"use client";

import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import type { ApiResponse } from "@/utils/ApiResponse";
import AssistantCard, { type Assistant } from "./AssistantCard";
import AddAssistantTile from "./AddAssistantTile";

interface BackendAssistant {
  _id: string;
  TeacherId: string;
  Email: string;
}

function createDisplayName(email: string) {
  const [localPart] = email.split("@");
  const normalized = localPart?.replace(/[._-]+/g, " ").trim();
  return normalized || email;
}

function mapAssistant(assistant: BackendAssistant): Assistant {
  const displayName = createDisplayName(assistant.Email);
  return {
    id: assistant._id,
    name: displayName,
    email: assistant.Email,
    avatarInitial: (displayName[0] || assistant.Email[0] || "A").toUpperCase(),
    status: "active",
    tags: [assistant.TeacherId ? "مرتبط بمعلم" : "بدون معلم"],
  };
}

type AssistantsGridProps = {
  onAddNew?: () => void;
  onEditPermissions?: (id: string) => void;
};

export default function AssistantsGrid({
  onAddNew,
  onEditPermissions,
}: AssistantsGridProps) {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAssistants() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<ApiResponse<BackendAssistant[]>>("/assistant");
        if (isMounted) {
          setAssistants((response.data.data || []).map(mapAssistant));
        }
      } catch (requestError: unknown) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "تعذر تحميل المساعدين من الخادم.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAssistants();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReactivate = (id: string) => {
    setAssistants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "active" as const } : a)),
    );
  };

  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
          <span className="h-5 w-1 rounded-full bg-emerald-700" aria-hidden="true" />
          المساعدون الحاليون
        </h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {assistants.length} أعضاء فريق
        </span>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
          جارٍ تحميل المساعدين من الخادم...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : assistants.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {assistants.map((assistant) => (
            <AssistantCard
              key={assistant.id}
              assistant={assistant}
              onEditPermissions={onEditPermissions}
              onReactivate={handleReactivate}
            />
          ))}
          <AddAssistantTile onClick={onAddNew} />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
          لا يوجد مساعدون مسجلون حالياً.
        </div>
      )}
    </div>
  );
}