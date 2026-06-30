"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRoleHome } from "@/features/auth/utils/roleRoutes";
import { useAuthStore } from "@/store/useAuthStore";

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.Role)) {
      router.replace(getRoleHome(user.Role));
    }
  }, [allowedRoles, hasHydrated, router, user]);

  if (!hasHydrated || !user || !allowedRoles.includes(user.Role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-slate-500" dir="rtl">
        جاري التحقق من صلاحيات الحساب...
      </div>
    );
  }

  return children;
}
