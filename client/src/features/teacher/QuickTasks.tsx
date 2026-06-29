const quickTasks = [
  {
    id: 1,
    text: "تصحيح اختبارات الأسبوع 8",
    completed: false,
  },
  {
    id: 2,
    text: "رفع المادة العلمية للدورة القادمة",
    completed: false,
  },
  {
    id: 3,
    text: "الرد على استفسارات الطلاب",
    completed: true,
  },
];

export default function QuickTasks() {
  return (
    <section className="rounded-2xl border-[#E6E8EA] border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">
        مهام سريعة
      </h3>

      <ul className="space-y-4">
        {quickTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3"
          >
            <input
              type="checkbox"
              defaultChecked={task.completed}
              className="h-4 w-4 rounded"
            />

            <span
              className={
                task.completed
                  ? "line-through opacity-60"
                  : ""
              }
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}