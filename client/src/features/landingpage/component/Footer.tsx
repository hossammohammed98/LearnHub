// components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50/50 border-t border-slate-100 px-6 md:px-16 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Right Side: Copyright Stack Info */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 order-2 sm:order-1">
          <span className="text-slate-800 font-bold text-xs">تعلّم</span>
          <span>© {currentYear} منصة تعلّم. جميع الحقوق محفوظة.</span>
        </div>

        {/* Left Side: System Navigation Links and Compliance Privacy Policies */}
        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-500 order-1 sm:order-2">
          <Link href="/about" className="hover:text-slate-900 transition-all">عن المنصة</Link>
          <Link href="/privacy" className="hover:text-slate-900 transition-all">سياسة الخصوصية</Link>
          <Link href="/terms" className="hover:text-slate-900 transition-all">الشروط والأحكام</Link>
        </div>

      </div>
    </footer>
  );
}