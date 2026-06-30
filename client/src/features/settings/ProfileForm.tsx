"use client";

import FormField from "./FormField";

export interface ProfileFormValues {
  FName: string;
  LName: string;
  Email: string;
  Phone: string;
}

interface ProfileFormProps {
  values: ProfileFormValues;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  disabled?: boolean;
}

export default function ProfileForm({
  values,
  onChange,
  disabled = false,
}: ProfileFormProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField label="الاسم الأول">
        <input
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
          value={values.FName}
          onChange={(event) => onChange("FName", event.target.value)}
          disabled={disabled}
        />
      </FormField>

      <FormField label="الاسم الأخير">
        <input
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
          value={values.LName}
          onChange={(event) => onChange("LName", event.target.value)}
          disabled={disabled}
        />
      </FormField>

      <FormField label="البريد الإلكتروني">
        <input
          type="email"
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
          value={values.Email}
          onChange={(event) => onChange("Email", event.target.value)}
          disabled={disabled}
        />
      </FormField>

      <FormField label="رقم الهاتف">
        <input
          dir="ltr"
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
          value={values.Phone}
          onChange={(event) => onChange("Phone", event.target.value)}
          disabled={disabled}
        />
      </FormField>
    </div>
  );
}
