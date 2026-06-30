"use client";

import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm, { ProfileFormValues } from "./ProfileForm";
import Button from "@/components/ui/ButtonInit";
import { settingsService } from "./services/settingsService";
import { useAuthStore } from "@/store/useAuthStore";
import { normalizeAuthUser } from "@/features/auth/utils/normalizeAuthUser";

const emptyForm: ProfileFormValues = {
  FName: "",
  LName: "",
  Email: "",
  Phone: "",
};

export default function ProfileSection() {
  const setUser = useAuthStore((state) => state.setUser);
  const [formValues, setFormValues] = useState<ProfileFormValues>(emptyForm);
  const [initialValues, setInitialValues] = useState<ProfileFormValues>(emptyForm);
  const [avatarUrl, setAvatarUrl] = useState("/images/user.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");
        const profile = await settingsService.getProfile();
        if (!isMounted) return;

        const nextValues: ProfileFormValues = {
          FName: profile.FName || "",
          LName: profile.LName || "",
          Email: profile.Email || "",
          Phone: profile.Phone || "",
        };

        setFormValues(nextValues);
        setInitialValues(nextValues);
        setAvatarUrl(profile.Avatar || "/images/user.png");
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "تعذر تحميل الملف الشخصي");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFieldChange = (field: keyof ProfileFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setSuccess("");
  };

  const handleCancel = () => {
    setFormValues(initialValues);
    setSuccess("");
    setError("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await settingsService.updateProfile(formValues);
      const nextValues: ProfileFormValues = {
        FName: updatedProfile.FName || "",
        LName: updatedProfile.LName || "",
        Email: updatedProfile.Email || "",
        Phone: updatedProfile.Phone || "",
      };

      setFormValues(nextValues);
      setInitialValues(nextValues);
      setAvatarUrl(updatedProfile.Avatar || "/images/user.png");
      setUser(normalizeAuthUser(updatedProfile));
      setSuccess("تم حفظ التغييرات بنجاح");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ التغييرات");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      id="profile"
      className="overflow-hidden rounded-3xl border-t-4 border-brand-success bg-white shadow-sm"
    >
      <div className="p-8">
        <header className="mb-8 flex items-center gap-3">
          <span className="h-8 w-2 rounded-full bg-primary" />

          <h2 className="text-2xl font-bold">الملف الشخصي</h2>
        </header>

        {isLoading && (
          <p className="text-sm text-gray-500">جاري تحميل بيانات الملف الشخصي...</p>
        )}

        {!isLoading && (
          <>
            <div className="flex flex-col gap-8 md:flex-row">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                userName={`${formValues.FName} ${formValues.LName}`.trim()}
              />

              <div className="flex-1">
                <ProfileForm
                  values={formValues}
                  onChange={handleFieldChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}

            <footer className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={handleCancel} disabled={isSaving}>
                إلغاء
              </Button>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </footer>
          </>
        )}
      </div>
    </section>
  );
}
