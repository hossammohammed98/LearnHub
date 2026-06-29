import FormField from "./FormField";

export default function ProfileForm() {
  return (
    <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField label="الاسم الكامل">
        <input
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary"
          defaultValue="أحمد علي"
        />
      </FormField>

      <FormField label="البريد الإلكتروني">
        <input
          type="email"
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary"
          defaultValue="ahmed.ali@example.com"
        />
      </FormField>

      <FormField label="رقم الهاتف">
        <input
          dir="ltr"
          className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary"
          defaultValue="+20 123 456 7890"
        />
      </FormField>

      <FormField label="المستوى الدراسي">
        <select className="w-full rounded-xl border bg-muted px-4 py-3 outline-none focus:border-primary">
          <option>الصف الأول الثانوي</option>
          <option >
            الصف الثاني الثانوي
          </option>
          <option>الصف الثالث الثانوي</option>
        </select>
      </FormField>
    </form>
  );
}