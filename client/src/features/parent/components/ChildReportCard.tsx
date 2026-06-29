import React from 'react';

interface MonthlyProgress {
  month: string;
  value: number; 
  isCurrent?: boolean; 
}

interface ChildReportCardProps {
  name: string;
  grade: string;
  rank: string;
  points: string;
  tags: string[];
  avatarUrl: string;
  progressData: MonthlyProgress[];
  onDetailClick?: () => void;
}

export function ChildReportCard({
  name,
  grade,
  rank,
  points,
  tags,
  avatarUrl,
  progressData,
  onDetailClick
}: ChildReportCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 w-full" dir="rtl">
      
      {/* ─── الشق الأيمن: الرسم البياني للتقدم والدرجات ─── */}
      <div className="flex-1 flex flex-col justify-between">
        {/* صندوق الترتيب والنقاط */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl text-center">
            <span className="text-gray-400 text-xs font-semibold block mb-1">الترتيب في الفصل</span>
            <span className="text-[#006644] text-xl font-black">{rank}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl text-center">
            <span className="text-gray-400 text-xs font-semibold block mb-1">نقاط التميز</span>
            <span className="text-gray-900 text-xl font-black">{points}</span>
          </div>
        </div>

        {/* أعمدة الرسم البياني (Bar Chart) */}
        <div className="mt-8">
          <div className="flex items-end justify-between h-32 px-2 border-b border-gray-100 pb-2">
            {progressData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 gap-2 group">
                {/* العمود الملون */}
                <div 
                  className={`w-8 rounded-t-lg transition-all duration-500 relative`}
                  style={{ 
                    height: `${data.value}%`,
                    backgroundColor: data.isCurrent ? '#006644' : '#56f0b1' 
                  }}
                >
                  {/* Tooltip يظهر عند الوقوف على العمود */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* أسماء الأشهر أسفل الأعمدة */}
          <div className="flex justify-between text-center mt-2 text-xs font-semibold text-gray-400">
            {progressData.map((data, index) => (
              <span key={index} className="flex-1">{data.month}</span>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs font-bold mt-4">
          التقدم الأكاديمي خلال الفصل الدراسي الثاني
        </p>
      </div>

      {/* خط فاصل عمودي في الشاشات الكبيرة */}
      <div className="hidden md:block w-px bg-gray-100 self-stretch" />

      {/* ─── الشق الأيسر: الملف الشخصي والبيانات ─── */}
      <div className="w-full md:w-64 flex flex-col items-center justify-center text-center gap-4">
        {/* الصورة الشخصية مع الإطار المتقطع الأخضر */}
        <div className="relative p-1 rounded-full border-2 border-dashed border-emerald-500">
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover"
          />
          {/* شارة التوثيق الصغيرة أسفل الصورة */}
          <div className="absolute bottom-0 right-1 bg-[#006644] text-white p-1 rounded-full border-2 border-white">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* الاسم والصف */}
        <div>
          <h4 className="text-xl font-black text-gray-900">{name}</h4>
          <p className="text-gray-400 text-xs font-semibold mt-1">{grade}</p>
        </div>

        {/* الشارات (Tags) */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* زر عرض التقارير التفصيلية */}
        <button 
          onClick={onDetailClick}
          className="w-full mt-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold py-3 px-4 rounded-xl transition-colors"
        >
          عرض التقارير التفصيلية
        </button>
      </div>

    </div>
  );
}