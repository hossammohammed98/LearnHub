"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Video,
  FileText,
  ClipboardList,
  Users,
  Plus,
} from "lucide-react";

type Permission = {
  id: string;
  label: string;
  icon: typeof Video;
  enabled: boolean;
};

const initialPermissions: Permission[] = [
  { id: "videos", label: "رفع وإدارة الفيديوهات", icon: Video, enabled: true },
  { id: "materials", label: "رفع المواد العلمية", icon: FileText, enabled: false },
  { id: "tests", label: "إدارة الاختبارات والنتائج", icon: ClipboardList, enabled: true },
  { id: "students", label: "عرض بيانات الطلاب", icon: Users, enabled: true },
];

type PermissionsPanelProps = {
  onSubmit?: (permissions: Permission[]) => void;
};

export default function PermissionsPanel({ onSubmit }: PermissionsPanelProps) {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );
  };

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <ShieldCheck className="h-4 w-4 text-gray-400" />
          الصلاحيات والوصول
        </h4>

        <div className="space-y-4">
          {permissions.map(({ id, label, icon: Icon, enabled }) => (
            <div key={id} className="flex items-center justify-between gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={label}
                onClick={() => togglePermission(id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  enabled ? "bg-emerald-700" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                    enabled ? "right-0.5" : "right-5"
                  }`}
                />
              </button>

              <span className="flex flex-1 items-center justify-end gap-2 text-sm text-gray-700">
                {label}
                <Icon className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSubmit?.(permissions)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
      >
        <Plus className="h-4 w-4" />
        إضافة المساعد للمنصة
      </button>
    </div>
  );
}