import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider"; 

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "تعلّم",
  description: "منصة تعلّم التعليمية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className={`${cairo.className} min-h-full flex flex-col`}>
        {/* تغليف الـ children هنا بيضمن إن الريدكس يشتغل في المشروع كله */}
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}