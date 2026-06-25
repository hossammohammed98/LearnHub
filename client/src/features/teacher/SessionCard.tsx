import { ArrowLeft, Clock3 } from "lucide-react";

interface SessionCardProps {
  day: string;
  month: string;
  title: string;
  time: string;
  color: string;
}

export default function SessionCard({
  day,
  month,
  title,
  time,
  color,
}: SessionCardProps) {
  return (
    <article
      className={`flex gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 border-r-4 ${color}`}
    >
      <div className="min-w-[56px] rounded-lg bg-gray-100 px-3 py-2 text-center">
        <p className="font-bold">{day}</p>
        <p className="text-xs text-muted-foreground">{month}</p>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>

        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />
          {time}
        </p>
      </div>

      <button
        className="rounded-md p-2 text-primary hover:bg-gray-100"
        aria-label="عرض الجلسة"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
    </article>
  );
}