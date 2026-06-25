import type { Metadata } from "next";
import {IBM_Plex_Sans_Arabic} from 'next/font/google'
import "./globals.css";
import StoreProvider from "@/store/StoreProvider"; 

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: [ "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
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
      className={`${ibmPlexArabic.variable} h-full antialiased`}
    >
<<<<<<< HEAD
      {}
      <body className={`${ibmPlexArabic.className} min-h-full flex flex-col`}>
        {children}
=======
      <body className={`${cairo.className} min-h-full flex flex-col`}>
        {/* تغليف الـ children هنا بيضمن إن الريدكس يشتغل في المشروع كله */}
        <StoreProvider>
          {children}
        </StoreProvider>
>>>>>>> feature/auth
      </body>
    </html>
  );
}