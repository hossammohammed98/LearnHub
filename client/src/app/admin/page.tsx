'use client'
import { DashboardHeader } from "@/features/admin/components/DashboardHeader";
import NavbarAdmin from "@/features/admin/components/NavbarAdmin";
import { PlatformPerformance } from "@/features/admin/components/PlatformPerformance";
import { QuickActions } from "@/features/admin/components/QuickActions";
import { RecentActivities } from "@/features/admin/components/RecentActivities";
import Sidebar from "@/features/admin/components/SideBar";
import { StatCard } from "@/features/admin/components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      {/* Right Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <NavbarAdmin/>

        {/* Dashboard Core Content */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Dashboard Header (Title, Subtitle, and Date/Download Buttons) */}
          <DashboardHeader />

          {/* Stats Grid (4 Cards Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="إجمالي الطلاب"
              value="12,450"
              change="+12%"
              type="students"
            />
            <StatCard title="الدورات النشطة" value="432" type="courses" />
            <StatCard title="صافي الأرباح" value="85,200 EGP" type="earnings" />
            <StatCard title="طلبات معلقة" value="18" type="pending" />
          </div>

          {/* Two Column Layout: Recent Activities & Side Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Right Side Column (Larger) - Recent Activities */}
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>

            {/* Left Side Column (Smaller) - Quick Actions & Performance */}
            <div className="space-y-6">
              <QuickActions />
              <PlatformPerformance />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
