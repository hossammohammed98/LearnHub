import { redirect } from "next/navigation";

export default function HomePage() {
  // تحويل المستخدم مباشرة إلى صفحة تسجيل الدخول
  redirect("/login");
}