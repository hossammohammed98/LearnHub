import React from "react";

interface ScheduleItem {
  id: string;
  periodNumber: number;
  subject: string;
  timeRange: string;
}

interface UpcomingScheduleProps {
  lessons: ScheduleItem[];
}

export function UpcomingSchedule({ lessons }: UpcomingScheduleProps) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col flex-1"
      dir="rtl"
    >
      {/* الهيدر العلوي */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-black text-gray-900">
          الجدول القادم (غداً)
        </h3>
      </div>

      {/* قائمة الحصص */}
      <div className="flex flex-col gap-5">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 text-indigo-700 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm">
                {lesson.periodNumber}
              </div>

              {/* تفاصيل المادة */}
              <div>
                <h4 className="font-black text-gray-950 text-sm">
                  {lesson.subject}
                </h4>
                <p
                  className="text-gray-400 text-[11px] font-bold mt-0.5"
                  dir="ltr"
                >
                  {lesson.timeRange}
                </p>
              </div>
            </div>

            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
