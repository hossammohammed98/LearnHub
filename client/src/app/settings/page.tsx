
import Navbar from "@/components/common/Navbar";
import NotificationSettings from "@/features/settings/NotificationSettings";
import ProfileSection from "@/features/settings/ProfileSection";
import SecuritySettings from "@/features/settings/SecuritySettings";
import SettingsSidebar from "@/features/settings/SettingsSidebar";

export default function SettingsPage() {
  return (
    <main className="">
        <Navbar></Navbar>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 mt-4">
        
        <aside className="space-y-6 xl:col-span-3 self-start mr-6">
          <SettingsSidebar activeSection="profile" />
        </aside>

        <section className="space-y-6 xl:col-span-9 mx-6">
          <ProfileSection />

          <NotificationSettings />

          <SecuritySettings />
        </section>
      </div>
    </main>
  );
}