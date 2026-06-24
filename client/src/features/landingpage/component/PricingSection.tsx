// components/sections/PricingSection.tsx
export default function PricingSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center" dir="rtl">
      <div className="mb-16 space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">خطط تناسب الجميع</h2>
        <p className="text-slate-400 text-xs md:text-sm">استثمر في مستقبلك اليوم عبر باقاتنا المرنة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* Plan 1: Basic Free */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col justify-between text-right shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">الأساسية</h3>
            <p className="text-2xl font-black text-slate-900 mb-6">مجاناً</p>
            <ul className="space-y-4 pt-4 border-t border-slate-50">
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>الوصول للمحتوى العام</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>3 حصص تجريبية</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-300 line-through">
                <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                <span>تقارير ذكاء اصطناعي للتحليل</span>
              </li>
            </ul>
          </div>
          <button className="w-full mt-10 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all">
            ابدأ الآن
          </button>
        </div>

        {/* Plan 2: Pro Premium (Highlighted exactly like photo) */}
        <div className="bg-[#0b1324] border border-slate-900 rounded-[24px] p-8 flex flex-col justify-between text-right shadow-xl relative transform md:-translate-y-2">
          <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-[#007f5f] text-white text-[10px] font-black px-4 py-1 rounded-full tracking-wider">
            الأكثر طلباً
          </span>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">الاحترافية</h3>
            <div className="flex items-baseline gap-1 mb-6 text-white">
              <span className="text-3xl font-black">29</span>
              <span className="text-xs text-slate-400">د.إ / الشهر</span>
            </div>
            <ul className="space-y-4 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-3 text-xs text-slate-200">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>وصول كامل لجميع الدورات</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-200">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>حصص مباشرة غير محدودة</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-200">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>تقارير أداء ذكية للأهالي</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-200">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>دعم فني 24/7</span>
              </li>
            </ul>
          </div>
          <button className="w-full mt-10 bg-[#007f5f] hover:bg-[#02664a] text-white font-bold text-xs py-3 rounded-xl transition-all">
            اشترك الآن
          </button>
        </div>

        {/* Plan 3: Enterprise / Custom */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col justify-between text-right shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">المؤسسات</h3>
            <p className="text-xl font-bold text-slate-900 mb-6">تواصل معنا</p>
            <ul className="space-y-4 pt-4 border-t border-slate-50">
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>خصم للمجموعات الكبيرة</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>لوحة تحكم إدارية خاصة</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span>تكامل مع أنظمة المدارس</span>
              </li>
            </ul>
          </div>
          <button className="w-full mt-10 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all">
            تواصل معنا
          </button>
        </div>

      </div>
    </section>
  );
}