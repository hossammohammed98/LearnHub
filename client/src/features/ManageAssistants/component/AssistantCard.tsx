"use client";

import { MoreVertical, Pencil, RotateCcw } from "lucide-react";

export type Assistant = {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  status: "active" | "inactive";
  tags: string[];
};

type AssistantCardProps = {
  assistant: Assistant;
  onEditPermissions?: (id: string) => void;
  onReactivate?: (id: string) => void;
};

export default function AssistantCard({
  assistant,
  onEditPermissions,
  onReactivate,
}: AssistantCardProps) {
  const { id, name, email, avatarInitial, status, tags } = assistant;
  const isActive = status === "active";

  return (
    <div
      dir="rtl"
      className="relative rounded-xl border border-gray-200 bg-white p-4"
    >
      <button
        type="button"
        aria-label="خيارات إضافية"
        className="absolute right-3 top-3 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3 h-16 w-16">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold text-white ${
              isActive ? "bg-emerald-700" : "bg-gray-400"
            }`}
          >
            {avatarInitial}
          </div>
          <span
            className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ring-2 ring-white ${
              isActive ? "bg-emerald-500" : "bg-red-500"
            }`}
            aria-hidden="true"
          />
        </div>

        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="mt-0.5 text-xs text-gray-400" dir="ltr">
          {email}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {!isActive && (
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
              غير نشط
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {isActive ? (
          <button
            type="button"
            onClick={() => onEditPermissions?.(id)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            تعديل الصلاحيات
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onReactivate?.(id)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            تنشيط الحساب
          </button>
        )}
      </div>
    </div>
  );
}