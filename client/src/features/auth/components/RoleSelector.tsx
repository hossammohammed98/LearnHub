"use client";

import { useFormContext } from "react-hook-form";

interface SelectedProps {
  error?: string;
  name: string; // The form field name
  setValue: any; // React Hook Form's setValue function
  watch: any;    // React Hook Form's watch function
}

export function RoleSelector({ error, name, setValue, watch }: SelectedProps) {
  // Watch the real live form state managed by react-hook-form
  const selectedRole = watch(name) || "Student"; 

  const roles = [
    { id: "Student", label: "طالب", icon: "🎓" },
    { id: "Teacher", label: "معلم", icon: "👨‍🏫" },
    { id: "Parent", label: "ولي أمر", icon: "👨‍👩‍👦" },
  ];

  return (
    <div className="space-y-2 text-right">
      <p className="text-xs text-gray-500">اختر نوع حسابك للبدء في المنصة</p>
      
      <div className="grid grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            // Set values through React Hook Form dynamically
            onClick={() => setValue(name, role.id, { shouldValidate: true })}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm gap-1 transition-all cursor-pointer ${
              selectedRole === role.id
                ? "border-teal-600 bg-teal-50/30 text-teal-800 font-bold ring-1 ring-teal-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{role.icon}</span>
            <span className="text-xs">{role.label}</span>
          </button>
        ))}
      </div>

      {/* Moved error display safely outside of the button grid container */}
      {error && (
        <p className="text-[11px] font-medium text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}