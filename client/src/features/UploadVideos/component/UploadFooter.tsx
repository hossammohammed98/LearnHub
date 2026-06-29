"use client";

const footerLinks = [
  { label: "عن المنصة", href: "#" },
  { label: "الشروط والأحكام", href: "#" },
  { label: "سياسة الخصوصية", href: "#" },
  { label: "اتصل بنا", href: "#" },
];

export default function UploadFooter() {
  return (
    <footer
      dir="rtl"
      className="flex flex-col items-center gap-3 border-t border-gray-200 bg-gray-900 px-4 py-4 sm:flex-row sm:justify-between sm:px-6"
    >
      <p className="text-xs text-gray-400">
        © ٢٠٢٤ تعلّم - كافة الحقوق محفوظة
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs text-gray-400 transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}