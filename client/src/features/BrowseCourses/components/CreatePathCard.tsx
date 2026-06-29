export default function CreatePathCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-orange-400 to-orange-500 p-6 text-center text-white">
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/20">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.4" fill="white" />
        </svg>
      </span>

      <h3 className="text-lg font-bold">اصنع مسارك الخاص</h3>
      <p className="mt-2 text-sm leading-6 text-white/90">
        هل لديك هدف محدد؟ دع ذكاءنا الاصطناعي يصمم لك مساراً تعليمياً مخصصاً بناءً على مهاراتك وأهدافك.
      </p>

      <button className="mt-5 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-orange-500 hover:bg-white/90">
        ابدأ التخصيص
      </button>
    </div>
  );
}