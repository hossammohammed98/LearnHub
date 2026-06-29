
import { CalendarDays } from "lucide-react";
import SessionCard from "./SessionCard";

interface LiveSessionItem {
  id: string | number;
  day: string;
  month: string;
  title: string;
  time: string;
  color: string;
}

interface LiveSessionsProps {
  sessions?: LiveSessionItem[];
}

export default function LiveSessions({ sessions = [] }: LiveSessionsProps) {
  return (
    <section className="rounded-2xl border border-[#E6E8EA] bg-white p-6 shadow-sm">
      <header className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">
          الجلسات المباشرة
        </h3>

        <CalendarDays className="text-primary" />
      </header>

      <div className="space-y-4">
        {sessions.length ? sessions.map((session) => (
          <SessionCard
            key={session.id}
            {...session}
          />
        )) : (
          <p className="rounded-lg border border-dashed border-[#E6E8EA] px-4 py-6 text-sm text-[#6B7280]">
            لا توجد جلسات مباشرة مجدولة حالياً.
          </p>
        )}
      </div>

      <button className="mt-6 w-full rounded-lg border-2 border-dashed py-3 transition-colors hover:border-primary hover:text-primary">
        + إضافة جلسة جديدة
      </button>
    </section>
  );
}