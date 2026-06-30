"use client";

import {
  CATEGORY_OPTIONS,
  EDUCATION_LEVELS,
  CategoryId,
  EducationLevel,
  FilterValues,
} from "./browseCourseUtils";

interface SidebarFilterProps {
  filters: FilterValues;
  maxPrice: number;
  onChange: (filters: FilterValues) => void;
  onApply: () => void;
}

export default function SidebarFilter({
  filters,
  maxPrice,
  onChange,
  onApply,
}: SidebarFilterProps) {
  const handleCategoryChange = (id: CategoryId) => {
    const isSelected = filters.categoryIds.includes(id);
    onChange({
      ...filters,
      categoryIds: isSelected
        ? filters.categoryIds.filter((categoryId) => categoryId !== id)
        : [...filters.categoryIds, id],
    });
  };

  const handleEducationLevelChange = (level: EducationLevel) => {
    onChange({
      ...filters,
      educationLevel: filters.educationLevel === level ? null : level,
    });
  };

  const handlePriceRangeChange = (value: number) => {
    onChange({
      ...filters,
      priceRange: value,
    });
  };

  const handleClearAll = () => {
    onChange({
      categoryIds: [],
      educationLevel: null,
      priceRange: maxPrice,
    });
  };

  return (
    <aside
      className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 dir-rtl"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800">الفلاتر</h2>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
        >
          مسح الكل
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">التصنيفات</h3>
        <div className="space-y-3">
          {CATEGORY_OPTIONS.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categoryIds.includes(category.id)}
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

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          المستوى التعليمي
        </h3>
        <div className="space-y-3">
          {EDUCATION_LEVELS.map((level) => (
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

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          السعر (جنيه مصري)
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="100"
            value={Math.min(filters.priceRange, maxPrice)}
            onChange={(event) =>
              handlePriceRangeChange(Number(event.target.value))
            }
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />

          <div className="flex items-center justify-between text-gray-700 text-sm">
            <span>ج.م 0</span>
            <span>
              حتى ج.م {Math.min(filters.priceRange, maxPrice).toLocaleString("ar-EG")}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-3 px-4 rounded-full transition duration-200 shadow-md hover:shadow-lg"
      >
        تطبيق الفلاتر
      </button>
    </aside>
  );
}
