"use client";

import { GripVertical, Trash2, Paperclip, Upload, Play, Plus } from "lucide-react";

export type Lesson = {
  id: string;
  title: string;
};

export type Unit = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type UnitCardProps = {
  unit: Unit;
  onDelete?: (unitId: string) => void;
  onAddLesson?: (unitId: string) => void;
};

export default function UnitCard({ unit, onDelete, onAddLesson }: UnitCardProps) {
  return (
    <div dir="rtl" className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <button
          type="button"
          aria-label="حذف الوحدة"
          onClick={() => onDelete?.(unit.id)}
          className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <h4 className="text-sm font-medium text-gray-900">{unit.title}</h4>

        <button
          type="button"
          aria-label="ترتيب الوحدة"
          className="cursor-grab rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 p-3 sm:p-4">
        {unit.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5"
          >
            <button
              type="button"
              aria-label="معاينة الدرس"
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            >
              <Play className="h-4 w-4" />
            </button>

            <input
              type="text"
              defaultValue={lesson.title}
              placeholder="عنوان الدرس..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />

            <button
              type="button"
              aria-label="رفع ملف"
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            >
              <Upload className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="إرفاق مرفق"
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => onAddLesson?.(unit.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-200 py-2.5 text-sm text-gray-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <Plus className="h-4 w-4" />
          إضافة درس للوحدة
        </button>
      </div>
    </div>
  );
}