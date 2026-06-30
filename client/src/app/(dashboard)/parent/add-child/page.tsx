'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ParentNavBar from '@/features/parent/ParentNavBar';
import ParentSideBar from '@/features/parent/ParentSideBar';
import { parentService } from '@/features/parent/services/parentService';
import { AddChildPayload } from '@/features/parent/types';

const initialState: AddChildPayload = {
  FName: '',
  LName: '',
  Email: '',
  Phone: '',
  SSN: '',
  Password: '',
  ConfirmPassword: '',
};

export default function AddChildPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<AddChildPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof AddChildPayload, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await parentService.addChild(formValues);
      router.push('/parent');
    } catch (submissionError: any) {
      setError(submissionError?.message || 'حدث خطأ أثناء إضافة الابن.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900" dir="rtl">
      <ParentNavBar />
      <div className="flex">
        <ParentSideBar />
        <main className="w-full px-10 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900">إضافة ابن جديد</h1>
              <p className="mt-2 text-sm text-gray-500">
                أضف حساب الابن الجديد هنا، وسيتم ربطه بحسابك كولي أمر.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">الاسم الأول</span>
                  <input
                    value={formValues.FName}
                    onChange={(event) => handleChange('FName', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="مثلاً: يوسف"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">الاسم الأخير</span>
                  <input
                    value={formValues.LName}
                    onChange={(event) => handleChange('LName', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="مثلاً: أحمد"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">البريد الإلكتروني</span>
                  <input
                    value={formValues.Email}
                    onChange={(event) => handleChange('Email', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="example@mail.com"
                    type="email"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">رقم الهاتف</span>
                  <input
                    value={formValues.Phone}
                    onChange={(event) => handleChange('Phone', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="+201XXXXXXXXX"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">الرقم القومي</span>
                <input
                  value={formValues.SSN}
                  onChange={(event) => handleChange('SSN', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  placeholder="مثلاً: 12345678901234"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">كلمة المرور</span>
                  <input
                    type="password"
                    value={formValues.Password}
                    onChange={(event) => handleChange('Password', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="أدخل كلمة مرور للابن"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">تأكيد كلمة المرور</span>
                  <input
                    type="password"
                    value={formValues.ConfirmPassword}
                    onChange={(event) => handleChange('ConfirmPassword', event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    placeholder="أعد كتابة كلمة المرور"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/parent')}
                  className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-gray-50"
                >
                  العودة إلى لوحة الأب
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-[#006644] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#005236] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'حفظ الابن'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
