"use client";

import { UserPlus } from "lucide-react";

type AddAssistantTileProps = {
  onClick?: () => void;
};

export default function AddAssistantTile({ onClick }: AddAssistantTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-gray-400 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <UserPlus className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium">إضافة عضو جديد</span>
    </button>
  );
}