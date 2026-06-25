interface ChartPoint {
  month: string;
  value: number;
}

interface StudentsGrowthChartProps {
  data: ChartPoint[];
}

export default function StudentsGrowthChart({
  data,
}: StudentsGrowthChartProps) {
  return (
    <section className="w-full relative h-72 rounded-2xl bg-primary p-6 text-white shadow-sm">
      <header className="mb-8">
        <h3 className="text-xl font-bold">
          نمو أعداد الطلاب
        </h3>

        <p className="text-sm opacity-80">
          تحليل شهري للفصل الدراسي الحالي
        </p>
      </header>

      <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3">
        {data.map((item) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className="w-full rounded-t-md bg-brand-success/30 transition-all hover:bg-white/50"
              style={{ height: `${item.value * 1.5}px` }}
            />

            <span className="text-xs">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}