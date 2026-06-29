
import { CalendarDays } from "lucide-react";
import SessionCard from "./SessionCard";
const liveSessions =  [
  {
    id: 1,
    day: "12",
    month: "مايو",
    title: "ندوة التصميم",
    time: "10:00 ص - 11:30 ص",
    color: "border-secondary",
  },
  {
    id: 2,
    day: "15",
    month: "مايو",
    title: "ورشة عمل AI",
    time: "01:00 م - 03:00 م",
    color: "border-emerald-500",
  },
  {
    id: 3,
    day: "18",
    month: "مايو",
    title: "اختبار منتصف الفصل",
    time: "09:00 ص - 11:00 ص",
    color: "border-primary",
  },
];

export default function LiveSessions() {
  return (
    <section className="rounded-2xl border border-[#E6E8EA] bg-white p-6 shadow-sm">
      <header className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">
          الجلسات المباشرة
        </h3>

        <CalendarDays className="text-primary" />
      </header>

      <div className="space-y-4">
        {liveSessions.map((session) => (
          <SessionCard
            key={session.id}
            {...session}
          />
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border-2 border-dashed py-3 transition-colors hover:border-primary hover:text-primary">
        + إضافة جلسة جديدة
      </button>
    </section>
  );
}