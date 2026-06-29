// components/sections/FeaturesSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center" dir="rtl">
      <div className="mb-14 space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">لماذا يختار الجميع منصة "تعلم"؟</h2>
        <p className="text-slate-400 text-xs md:text-sm">نجمع بين التكنولوجيا والابتكار لنقدم تجربة تعليمية لا تُنسى</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Row 1 / Left: Reports with Custom Bar Chart Visual */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col justify-between text-right shadow-sm relative overflow-hidden group min-h-[260px]">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">تقارير شاملة</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px]">
              لوحة تحكم ذكية توفر بيانات فورية ودقيقة عن مستوى التقدم للأهالي والمعلمين.
            </p>
          </div>
          {/* Custom chart graphic matching photo */}
          <div className="flex items-end gap-3 pt-6 justify-center w-full">
            <div className="bg-[#007f5f] w-12 h-10 rounded-sm"></div>
            <div className="bg-[#007f5f] w-12 h-20 rounded-sm"></div>
            <div className="bg-[#007f5f] w-12 h-14 rounded-sm"></div>
            <div className="bg-[#007f5f] w-12 h-6 rounded-sm"></div>
          </div>
        </div>

        {/* Row 1 / Right: AI Integration (Double Width Card) */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm min-h-[260px]">
          <div className="relative w-full md:w-[45%] h-44 rounded-2xl overflow-hidden bg-slate-50">
            <Image src="/images/loginimage.png" alt="AI Neural Net Display" fill className="object-cover" />
          </div>
          <div className="space-y-3 flex-1 text-right">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2 self-end">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">تخصيص مدعوم بالذكاء الاصطناعي</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              تقوم خوارزمياتنا بتحليل نمط تعلم الطالب واقتراح المحتوى الأنسب لسرعة استيعابه وقدراته الفريدة.
            </p>
          </div>
        </div>

        {/* Row 2 / Left: 21st Century Skills */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col justify-between text-right shadow-sm min-h-[220px]">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">مهارات القرن الحادي والعشرين</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              لا نكتفي بالمنهج الدراسي، بل نعد الطلاب لمهارات سوق العمل المستقبلية عبر دورات احترافية متكاملة.
            </p>
          </div>
          <Link href="/BrowserCourses" className="text-[#007f5f] text-xs font-bold hover:underline inline-flex items-center gap-1 mt-4">
            <span>اكتشف المزيد</span>
            <span className="text-sm">←</span>
          </Link>
        </div>

        {/* Row 2 / Right: Interactive Live Classes */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm min-h-[220px]">
          <div className="relative w-full md:w-[45%] h-36 rounded-2xl overflow-hidden bg-slate-50">
            <Image src="/images/loginimage.png" alt="Interactive modern classroom layout" fill className="object-cover" />
          </div>
          <div className="space-y-3 flex-1 text-right">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">حصص مباشرة تفاعلية</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              تواصل مباشر مع أفضل المعلمين العرب في بيئة افتراضية تفاعلية وآمنة.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}