import Image from 'next/image';
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden pt-16 pb-24 px-6 md:px-16 bg-emerald-50"
      dir="rtl"
    >

      <div className="absolute inset-0 bg-gradient-to-l from-emerald-50 via-emerald-100 to-emerald-200 -z-10 pointer-events-none" />


      <div className="absolute left-0 top-0 w-[700px] h-[700px] bg-emerald-400/50 rounded-full blur-[150px] -z-10 pointer-events-none -translate-x-1/3 -translate-y-1/4" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        <div className="md:col-span-7 space-y-6 text-right">
          <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-md">
            مستقبل التعليم الذكي
          </div>

          <h1 className="text-3xl md:text-[42px] font-extrabold text-slate-900 leading-[1.3]">
            المنصة التعليمية الأذكى للطلاب <br />
            والمعلمين وأولياء الأمور
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
            رحلة تعليمية ممتعة ومحفزة مصممة خصيصًا للمستقبل، تعتمد على الذكاء
            الاصطناعي لتخصيص تجربة كل طالب.
          </p>

          <div className="flex flex-row gap-4 pt-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-sm">
             <Link
                href="/login"
              >
              ابدأ رحلتك الآن
              </Link>
                
            </button>

            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-sm">
              <svg
                className="w-4 h-4 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
              <span>شاهد العرض</span>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-5 relative w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[460px] aspect-[1.4/1] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-4 border-white bg-slate-50">
            <Image
              src="/images/loginimage.png"
              alt="Student studying with laptop"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}