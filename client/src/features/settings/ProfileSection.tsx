import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import Button from "@/components/ui/ButtonInit";

export default function ProfileSection() {
  return (
    <section
      id="profile"
      className="overflow-hidden rounded-3xl border-t-4 border-brand-success bg-white shadow-sm"
    >
      <div className="p-8">
        <header className="mb-8 flex items-center gap-3">
          <span className="h-8 w-2 rounded-full bg-primary" />

          <h2 className="text-2xl font-bold">
            الملف الشخصي
          </h2>
        </header>

        <div className="flex flex-col gap-8 md:flex-row">
          <ProfileAvatar />

          <div className="flex-1">
            <ProfileForm />
          </div>
        </div>

        <footer className="mt-8 flex justify-end gap-3">
          <Button variant="ghost">
            إلغاء
          </Button>

          <Button>
            حفظ التغييرات
          </Button>
        </footer>
      </div>
    </section>
  );
}