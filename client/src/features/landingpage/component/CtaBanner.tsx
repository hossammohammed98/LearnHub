// components/sections/CtaBanner.tsx
export default function CtaBanner() {
  return (
    <section className="px-6 py-8 max-w-7xl mx-auto w-full" dir="rtl">
      <div className="bg-[#5bf1b7] rounded-[24px] py-14 px-8 text-center text-slate-900 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            هل أنت مستعد لتغيير مستقبلك؟
          </h2>
          <p className="text-slate-800 text-xs md:text-sm font-medium">
            انضم إلى آلاف الطلاب الذين غيروا حياتهم التعليمية مع منصة تعلّم الذكية
          </p>
          <div className="flex flex-row justify-center gap-3 pt-4">
            <button className="bg-black hover:bg-slate-900 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all">
              ابدأ الآن مجاناً
            </button>
            <button className="bg-white/70 hover:bg-white/90 text-slate-900 font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all">
              استشارة تعليمية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}