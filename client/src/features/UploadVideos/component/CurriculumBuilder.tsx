"use client";

import { useState } from "react";
import { LayoutTemplate, Plus } from "lucide-react";
import UnitCard, { type Unit } from "./UnitCard";

const initialUnits: Unit[] = [
  {
    id: "unit-1",
    title: "الوحدة الأولى: مقدمة وتعريف",
    lessons: [{ id: "lesson-1-1", title: "" }],
  },
];

export default function CurriculumBuilder() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);

  const handleAddUnit = () => {
    const newUnit: Unit = {
      id: `unit-${units.length + 1}-${Date.now()}`,
      title: `الوحدة ${units.length + 1}`,
      lessons: [],
    };
    setUnits((prev) => [...prev, newUnit]);
  };

  const handleDeleteUnit = (unitId: string) => {
    setUnits((prev) => prev.filter((unit) => unit.id !== unitId));
  };

  const handleAddLesson = (unitId: string) => {
    setUnits((prev) =>
      prev.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              lessons: [
                ...unit.lessons,
                { id: `lesson-${unitId}-${Date.now()}`, title: "" },
              ],
            }
          : unit,
      ),
    );
  };

  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <LayoutTemplate className="h-4 w-4 text-gray-400" />
          المحتوى التعليمي
        </h3>

        <button
          type="button"
          onClick={handleAddUnit}
          className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          <Plus className="h-4 w-4" />
          إضافة وحدة جديدة
        </button>
      </div>

      <div className="space-y-4">
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            onDelete={handleDeleteUnit}
            onAddLesson={handleAddLesson}
          />
        ))}

        {units.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-400">
            لا توجد وحدات بعد. ابدأ بإضافة وحدة جديدة.
          </p>
        )}
      </div>
    </div>
  );
}