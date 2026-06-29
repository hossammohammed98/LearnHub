interface QuickTaskItem {
  id: string | number;
  text: string;
  completed: boolean;
}

interface QuickTasksProps {
  tasks?: QuickTaskItem[];
}

export default function QuickTasks({ tasks = [] }: QuickTasksProps) {
  return (
    <section className="rounded-2xl border-[#E6E8EA] border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">
        مهام سريعة
      </h3>

      <ul className="space-y-4">
        {tasks.length ? tasks.map((task) => (
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
        )) : (
          <li className="rounded-lg border border-dashed border-[#E6E8EA] px-4 py-5 text-sm text-[#6B7280]">
            لا توجد مهام حالياً.
          </li>
        )}
      </ul>
    </section>
  );
}