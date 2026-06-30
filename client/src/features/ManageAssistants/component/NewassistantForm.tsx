"use client";

import { FormEvent, useState } from "react";
import { Loader2, UserPlus2 } from "lucide-react";
import apiClient from "@/services/apiClient";

type NewAssistantFormProps = {
  onCreated?: () => void;
};

export default function NewAssistantForm({ onCreated }: NewAssistantFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!email.trim() || password.length < 6) {
      setError("أدخل بريد إلكتروني صحيح وكلمة مرور لا تقل عن 6 أحرف.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/assistant", {
        Email: email.trim(),
        Password: password,
      });
      setEmail("");
      setPassword("");
      setMessage("تم إضافة المساعد بنجاح.");
      onCreated?.();
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "تعذر إضافة المساعد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="new-assistant-form" dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5" onSubmit={handleSubmit}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            إضافة مساعد جديد
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            امنح فريقك الصلاحيات اللازمة للنجاح
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">
          <UserPlus2 className="h-5 w-5" />
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="assistant-email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            البريد الإلكتروني
          </label>
          <input
            id="assistant-email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="assistant@educore.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="assistant-password"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            كلمة المرور
          </label>
          <input
            id="assistant-password"
            type="password"
            dir="ltr"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-emerald-700">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus2 className="h-4 w-4" />}
          إضافة المساعد
        </button>
      </div>
    </form>
  );
}
