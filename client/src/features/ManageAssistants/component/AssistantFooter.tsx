"use client";

const footerLinks = [
  { label: "اتصل بنا", href: "#" },
  { label: "من نحن", href: "#" },
  { label: "سياسة الخصوصية", href: "#" },
  { label: "شروط الاستخدام", href: "#" },
];

export default function AssistantsFooter() {
  return (
    <footer dir="rtl" className="border-t border-gray-200 bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900">تعلّم</h2>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 transition hover:text-gray-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-gray-400">
          © 2024 إديوكور - منصة التعليم الذكي الرائدة
        </p>
      </div>
    </footer>
  );
}