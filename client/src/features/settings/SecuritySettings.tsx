"use client";

import { Eye, Info, Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/ButtonInit";
import { settingsService } from "./services/settingsService";

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      await settingsService.changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setSuccess("تم تحديث كلمة المرور بنجاح");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحديث كلمة المرور");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      id="security"
      className="rounded-3xl border-t-4 border-red-500 bg-white p-8 shadow-sm"
    >
      <header className="mb-6 flex items-center gap-3">
        <Lock className="text-red-500" />

        <h2 className="text-2xl font-bold">الأمان</h2>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm text-gray-600">
            كلمة المرور الحالية
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
              required
              disabled={isSaving}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-600">
            كلمة المرور الجديدة
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
            required
            minLength={6}
            disabled={isSaving}
          />
        </div>

        <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
          <Info className="text-red-500 shrink-0" />

          <p className="text-sm text-red-600">
            تأكد من استخدام 8 أحرف على الأقل، تشمل أرقاماً ورموزاً لضمان أمان
            حسابك.
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}

        <Button
          type="submit"
          className="w-full"
          variant="danger"
          disabled={isSaving}
        >
          {isSaving ? "جاري التحديث..." : "تحديث كلمة المرور"}
        </Button>
      </form>
    </section>
  );
}
