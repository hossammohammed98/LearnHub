"use client";
import { useState } from "react";

export function RoleSelector() {
  const [selected, setSelected] = useState("student");

  const roles = [
    { id: "student", label: "طالب", icon: "" },
    { id: "teacher", label: "معلم", icon: "" },
    { id: "parent", label: "ولي أمر", icon: "" },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 text-right">اختر نوع حسابك للبدء في المنصة</p>
      <div className="grid grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelected(role.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm gap-1 transition-all cursor-pointer ${
              selected === role.id
                ? "border-teal-600 bg-teal-50/30 text-teal-800 font-bold ring-1 ring-teal-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{role.icon}</span>
            <span className="text-xs">{role.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}