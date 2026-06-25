import React from "react";

interface AlertItem {
  id: string;
  type: "danger" | "info";
  title: string;
  description: string;
}

interface ImportantAlertsProps {
  alerts: AlertItem[];
}

export function ImportantAlerts({ alerts }: ImportantAlertsProps) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col flex-1"
      dir="rtl"
    >
      {/* الهيدر العلوي */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-6 h-6 text-[#006644]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <h3 className="text-xl font-black text-gray-900">تنبيهات هامة</h3>
      </div>

      {/* قائمة التنبيهات */}
      <div className="flex flex-col gap-4">
        {alerts.map((alert) => {
          const isDanger = alert.type === "danger";
          return (
            <div
              key={alert.id}
              className="bg-gray-50 rounded-2xl p-4 flex items-start justify-between gap-4 relative overflow-hidden border-r-4"
              style={{ borderRightColor: isDanger ? "#EF4444" : "#006644" }}
            >
              {/* النصوص */}
              <div className="flex-1">
                <h4 className="font-black text-gray-900 text-sm">
                  {alert.title}
                </h4>
                <p className="text-gray-500 text-xs font-semibold mt-1 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              {/* الأيقونة اليسرى الديناميكية */}
              <div
                className={
                  isDanger
                    ? "text-shrink-0 text-red-500"
                    : "text-shrink-0 text-[#006644]"
                }
              >
                {isDanger ? (
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
