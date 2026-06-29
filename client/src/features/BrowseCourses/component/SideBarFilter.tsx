"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Category {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterState {
  categories: Category[];
  educationLevel: string | null;
  priceRange: number;
}

export default function SidebarFilter() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [
      { id: "software-dev", label: "تطوير البرمجيات", checked: true },
      { id: "graphic-design", label: "التصميم الجرافيكي", checked: false },
      { id: "business", label: "الأعمال والتجارة", checked: false },
      { id: "languages", label: "اللغات والترجمة", checked: false },
    ],
    educationLevel: null,
    priceRange: 5000,
  });

  // Handle category checkbox change
  const handleCategoryChange = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat,
      ),
    }));
  };

  // Handle education level change
  const handleEducationLevelChange = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      educationLevel: prev.educationLevel === level ? null : level,
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  // Handle clear all filters
  const handleClearAll = () => {
    setFilters({
      categories: filters.categories.map((cat) => ({ ...cat, checked: false })),
      educationLevel: null,
      priceRange: 5000,
    });
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    // TODO: Send filters to API
  };

  return (
    <aside
      className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 dir-rtl"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800">الفلاتر</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
        >
          مسح الكل
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">التصنيفات</h3>
        <div className="space-y-3">
          {filters.categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={category.checked}
                onChange={() => handleCategoryChange(category.id)}
                className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Education Level Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          المستوى التعليمي
        </h3>
        <div className="space-y-3">
          {["مبتدئ", "متوسط", "متقدم"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="education-level"
                checked={filters.educationLevel === level}
                onChange={() => handleEducationLevelChange(level)}
                className="w-5 h-5 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          السعر (جنية مصري)
        </h3>
        <div className="space-y-4">
          {/* Slider */}
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.priceRange}
            onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />

          {/* Price Display */}
          <div className="flex items-center justify-between text-gray-700 text-sm">
            <span>ج.م 0</span>
            <span>+ج.م {filters.priceRange.toLocaleString("ar-EG")}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-3 px-4 rounded-full transition duration-200 shadow-md hover:shadow-lg"
      >
        تطبيق الفلاتر
      </button>

      {/* Debug Info (remove in production) */}
      <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600 hidden">
        <p>
          Selected Categories:{" "}
          {filters.categories
            .filter((c) => c.checked)
            .map((c) => c.label)
            .join(", ") || "None"}
        </p>
        <p>Education Level: {filters.educationLevel || "None"}</p>
        <p>Price Range: {filters.priceRange}</p>
      </div>
    </aside>
  );
}
