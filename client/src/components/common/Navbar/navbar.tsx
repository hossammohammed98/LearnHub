export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      {/* شريط البحث */}
      <div className="w-full max-w-md relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search courses, students, content..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* الإشعارات والبروفايل */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 relative cursor-pointer">
          <span>🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* بيانات المستخدم الديمو */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
            H
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-slate-800 leading-none">
              Hossam Mohamed
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Student</div>
          </div>
        </div>
      </div>
    </header>
  );
}
