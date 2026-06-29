export default function FeaturedPathCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.5 1.6-6.8L2.2 9l6.9-.7L12 2Z" />
          </svg>
          المسار الأكثر طلباً
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-teal-950 via-teal-800 to-teal-600">
          <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 400 300" fill="none">
            <circle cx="200" cy="150" r="3" fill="#fff" />
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const x = 200 + Math.cos(angle) * 90;
              const y = 150 + Math.sin(angle) * 90;
              return (
                <g key={i}>
                  <line x1="200" y1="150" x2={x} y2={y} stroke="#ffffff33" strokeWidth="1" />
                  <circle cx={x} cy={y} r="2" fill="#ffffff88" />
                </g>
              );
            })}
            <circle cx="200" cy="150" r="40" stroke="#ffffff44" strokeWidth="1" fill="none" />
          </svg>

          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-900 backdrop-blur-sm">
            <span>1.2k</span>
            <div className="flex -space-x-2 space-x-reverse">
              <span className="h-5 w-5 rounded-full border-2 border-white bg-amber-300" />
              <span className="h-5 w-5 rounded-full border-2 border-white bg-rose-300" />
              <span className="h-5 w-5 rounded-full border-2 border-white bg-sky-300" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center text-right">
          <h3 className="text-xl font-bold leading-8 text-gray-900">مسار تعلم البرمجة من الصفر إلى الاحتراف</h3>
          <p className="mt-3 text-sm leading-7 text-gray-500">
            رحلة شاملة تبدأ معك من المفاهيم الأساسية للبرمجة وصولاً إلى بناء تطبيقات متكاملة باستخدام أحدث التقنيات.
          </p>

          <div className="mt-5 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-teal-700">
                <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <div className="text-xs leading-4">
                <p className="font-semibold text-gray-800">شهادة</p>
                <p className="text-gray-400">معتمدة</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-teal-700">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-xs leading-4">
                <p className="font-semibold text-gray-800">6</p>
                <p className="text-gray-400">أشهر</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-teal-700">
                <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div className="text-xs leading-4">
                <p className="font-semibold text-gray-800">12</p>
                <p className="text-gray-400">دورة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}