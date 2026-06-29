export default function BrowseFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-200 px-8 py-6 text-sm text-gray-500">
      <p>© 2024 تعلم. جميع الحقوق محفوظة.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-gray-900">الشروط والأحكام</a>
        <a href="#" className="hover:text-gray-900">سياسة الخصوصية</a>
        <a href="#" className="hover:text-gray-900">عن المنصة</a>
      </div>
    </footer>
  );
}