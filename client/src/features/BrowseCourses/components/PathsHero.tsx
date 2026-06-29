export default function PathsHero() {
  return (
    <section className="px-8 pt-8 text-right">
      <h1 className="text-2xl font-bold text-gray-900">اكتشف رحلتك التعليمية</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
        اختر من بين مساراتنا المنسقة بعناية للوصول إلى هدفك بأقصر الطرق وأكثرها متعة.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800">
          ابدأ الآن
        </button>

        <button className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50">
          دليل المبتدئين
        </button>
      </div>
    </section>
  );
}