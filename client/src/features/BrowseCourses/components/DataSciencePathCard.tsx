export default function DataSciencePathCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-36 w-full overflow-hidden rounded-xl bg-slate-900">
        <img
          src="/images/data-science-path.png"
          alt="مسار علوم البيانات والذكاء الاصطناعي"
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="text-base font-bold text-gray-900">مسار علوم البيانات والذكاء الاصطناعي</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        اكتشف قوة البيانات وكيفية بناء نماذج ذكاء اصطناعي قادرة على حل مشكلات حقيقية وتوقع المستقبل.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <button className="rounded-full bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
          عرض المسار
        </button>

        <div className="text-right">
          <p className="text-xs text-gray-400">المدة المقدرة</p>
          <p className="text-sm font-semibold text-gray-800">5 أشهر</p>
        </div>
      </div>
    </div>
  );
}