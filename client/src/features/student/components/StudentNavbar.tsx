"use client";

import Navbar from "@/components/common/Navbar";
import NotificationBell from "@/components/ui/NotificationBell";
import StudentNavLinks from "@/features/student/components/StudentNavLinks";

interface StudentNavbarProps {
  centerContent?: React.ReactNode;
}

export default function StudentNavbar({ centerContent }: StudentNavbarProps) {
  return (
    <Navbar
      logoHref="/student"
      centerContent={centerContent}
      leftActions={<NotificationBell />}
      rightActions={<StudentNavLinks />}
    />
  );
}
