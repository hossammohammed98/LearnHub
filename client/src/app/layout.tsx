import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD

=======
import SideBar from "@/components/common/SideBar";
import TeacherSideBar from "@/features/teacher/TeacherSideBar";
>>>>>>> 26a6fa8c5a025f8b56635bfd43e72078c1aabb47
import StoreProvider from "@/store/StoreProvider";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
      <body className={`${ibmPlexArabic.className} min-h-full flex flex-col`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
