"use client";

type Step = {
  number: number;
  label: string;
  status: "current" | "upcoming" | "complete";
};

const steps: Step[] = [
  { number: 1, label: "المعلومات الأساسية", status: "current" },
  { number: 2, label: "المحتوى التعليمي", status: "upcoming" },
  { number: 3, label: "الإعدادات والأسعار", status: "upcoming" },
];

export default function StepIndicator() {
  return (
    <div
      dir="rtl"
      className="flex items-center gap-2 overflow-x-auto rounded-xl border border-gray-200 bg-white px-3 py-3 sm:justify-center sm:gap-4 sm:px-6 sm:py-4"
    >
      {steps.map((step, index) => (
        <div key={step.number} className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium sm:h-7 sm:w-7 ${
                step.status === "current"
                  ? "bg-emerald-700 text-white"
                  : step.status === "complete"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.number}
            </span>
            <span
              className={`text-xs whitespace-nowrap sm:text-sm ${
                step.status === "current"
                  ? "font-medium text-emerald-700"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <span
              className="h-px w-6 shrink-0 bg-gray-200 sm:w-12"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}