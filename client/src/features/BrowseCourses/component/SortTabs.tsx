'use client'
import React, { useState } from 'react';

type SortOption = 'popular' | 'latest' | 'lowest-price';

interface SortTabsProps {
  // Optional props with built-in fallbacks
  onChange?: (selected: SortOption) => void;
  defaultValue?: SortOption;
}

export const SortTabs: React.FC<SortTabsProps> = ({ 
  onChange = () => {}, // Defaults to an empty function if not provided
  defaultValue = 'popular' // Defaults to 'الأكثر رواجاً'
}) => {
  const [activeTab, setActiveTab] = useState<SortOption>(defaultValue);

  const tabs = [
    { id: 'popular', label: 'الأكثر رواجاً' },
    { id: 'latest', label: 'الأحدث' },
    { id: 'lowest-price', label: 'الأقل سعراً' },
  ] as const;

  const handleTabClick = (id: SortOption) => {
    setActiveTab(id);
    onChange(id);
  };

  return (
    <div 
      dir="rtl" 
      className="inline-flex items-center gap-1.5 p-1 bg-[#f0f4f8] rounded-xl border border-[#e2e8f0]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out outline-none select-none ${
              isActive 
                ? 'bg-white text-[#00524e] shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-semibold' 
                : 'text-[#64748b] hover:text-[#334155] bg-transparent'
            }`}
          >
            <span className="whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SortTabs;