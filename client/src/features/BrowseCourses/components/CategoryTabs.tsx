"use client";

import { useState } from "react";

export default function CategoryTabs() {
  const [active, setActive] = useState("الكل");
  const categories = ["الكل", "البرمجة", "التصميم", "الأعمال", "اللغات", "العلوم", "الدراسات", "الرياضيات"];

  return (
    <div className="mt-8 flex justify-center gap-3 px-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={
            cat === active
              ? "rounded-full bg-teal-700 px-5 py-2 text-sm font-medium text-white"
              : "rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}