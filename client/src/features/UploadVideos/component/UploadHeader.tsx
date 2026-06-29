"use client";

export default function UploadHeader() {
  return (
    <div
      dir="rtl"
      className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          رفع دورة تدريبية جديدة
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          أكمل الخطوات التالية لنشر محتواك التعليمي للمتعلمين
        </p>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <button
          type="button"
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none"
        >
          حفظ كمسودة
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 sm:flex-none"
        >
          نشر الدورة
        </button>
      </div>
    </div>
  );
}