"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { useAuthStore } from "@/store/useAuthStore";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // The client session should still end even if the server cookie is already expired.
    } finally {
      logout();
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
    >
      <LogOut className="h-4 w-4" />
      تسجيل الخروج
    </button>
  );
}
