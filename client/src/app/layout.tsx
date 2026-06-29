import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "منصة تعلّم التعليمية",
  description: "منظومة تعليمية متكاملة للطلاب والمعلمين وأولياء الأمور",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}