export default function StepsSection() {
  const steps = [
    { num: '1', title: 'أنشئ حسابك', desc: 'عملية تسجيل سريعة وآمنة للطلاب أو المعلمين.' },
    { num: '2', title: 'حدد اهتماماتك', desc: 'اختر المسارات التعليمية التي تناسب طموحاتك ومستواك الدراسي.' },
    { num: '3', title: 'انطلق في التعلم', desc: 'استمتع بمحتوى عالي الجودة وحصص مباشرة وتفاعلية.' },
  ];

  return (
    <section className="py-20 bg-slate-50/60 w-full px-6 text-center" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-16">كيف تبدأ رحلة النجاح؟</h2>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Connecting Dotted Line matching the picture */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] border-t-2 border-dotted border-slate-200 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className={`w-14 h-14 rounded-full font-bold text-lg flex items-center justify-center border transition-all ${
                step.num === '3' 
                  ? 'bg-[#007f5f] text-white border-[#007f5f] shadow-md shadow-emerald-700/20' 
                  : 'bg-white text-slate-800 border-slate-200'
              }`}>
                {step.num}
              </div>
              <h3 className="text-base font-bold text-slate-900 pt-2">{step.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}