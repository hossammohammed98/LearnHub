"use client";

import { useState } from "react";
import AssistantCard, { type Assistant } from "./AssistantCard";
import AddAssistantTile from "./AddAssistantTile";

const initialAssistants: Assistant[] = [
  {
    id: "asst-1",
    name: "محمود يسري",
    email: "mahmoud.y@educore.eg",
    avatarInitial: "م",
    status: "active",
    tags: ["الاختبارات", "المواد العلمية"],
  },
  {
    id: "asst-2",
    name: "سارة أحمد",
    email: "sara.a@educore.eg",
    avatarInitial: "س",
    status: "active",
    tags: ["الفيديوهات", "الطلاب"],
  },
  {
    id: "asst-3",
    name: "ليلى كامل",
    email: "layla.k@educore.eg",
    avatarInitial: "ل",
    status: "inactive",
    tags: ["الطلاب"],
  },
];

type AssistantsGridProps = {
  onAddNew?: () => void;
  onEditPermissions?: (id: string) => void;
};

export default function AssistantsGrid({
  onAddNew,
  onEditPermissions,
}: AssistantsGridProps) {
  const [assistants, setAssistants] = useState<Assistant[]>(initialAssistants);

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
    </div>
  );
}