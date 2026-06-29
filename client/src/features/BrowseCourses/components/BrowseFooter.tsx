import Link from "next/link";

export default function BrowseFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-200 px-8 py-6 text-sm text-gray-500">
      <p>© 2024 تعلم. جميع الحقوق محفوظة.</p>
      <div className="flex gap-6">
        <Link href="/register" className="hover:text-gray-900">الشروط والأحكام</Link>
        <Link href="/register" className="hover:text-gray-900">سياسة الخصوصية</Link>
        <Link href="/landingpage" className="hover:text-gray-900">عن المنصة</Link>
      </div>
    </footer>
  );
}