export default function HowItWorks() {
  return (
    // Changed bg-white to bg-[#ade8f4]
    <section className="mx-8 mb-12 rounded-2xl border border-gray-200 bg-[#ade8f4] p-8">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold text-gray-900">
        كيف تعمل مساراتنا؟
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 17l5-5 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </h2>

      <div className="relative flex flex-col gap-8">
        <div className="absolute right-[15px] top-2 bottom-2 w-px bg-gray-200" />

        <div className="relative flex items-start gap-4 pr-10">
          <span className="absolute right-0 grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-sm font-bold text-white">1</span>
          <div className="text-right">
            <h3 className="font-bold text-gray-900">تقييم المستوى</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">نبدأ باختبار قصير لتحديد المهارات التي تمتلكها بالفعل لتبدأ من حيث انتهيت.</p>
          </div>
        </div>

        <div className="relative flex items-start gap-4 pr-10">
          <span className="absolute right-0 grid h-8 w-8 place-items-center rounded-full bg-amber-500 text-sm font-bold text-white">2</span>
          <div className="text-right">
            <h3 className="font-bold text-gray-900">التعلم الموجه</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">دروس مرتبة تصاعدياً، تضمن لك بناء أساس قوي قبل الانتقال للمواضيع المتقدمة.</p>
          </div>
        </div>

        <div className="relative flex items-start gap-4 pr-10">
          <span className="absolute right-0 grid h-8 w-8 place-items-center rounded-full bg-teal-900 text-sm font-bold text-white">3</span>
          <div className="text-right">
            <h3 className="font-bold text-gray-900">المشاريع التطبيقية</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">في نهاية كل مرحلة، ستقوم ببناء مشروع حقيقي يثبت كفاءتك ويضاف لمعرض أعمالك.</p>
          </div>
        </div>
      </div>
    </section>
  );
}