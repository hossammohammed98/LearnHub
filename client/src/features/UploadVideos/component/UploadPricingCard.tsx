"use client";

import { useMemo, useState } from "react";
import { Eye, ShieldCheck } from "lucide-react";

const COMMISSION_RATE = 0.1;

export default function UploadPricingCard() {
  const [isPaid, setIsPaid] = useState(true);
  const [price, setPrice] = useState("299");

  const { commission, net } = useMemo(() => {
    const numericPrice = parseFloat(price) || 0;
    const commissionValue = numericPrice * COMMISSION_RATE;
    return {
      commission: commissionValue,
      net: numericPrice - commissionValue,
    };
  }, [price]);

  return (
    <div dir="rtl" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        الإعدادات والأسعار
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">الدورة مدفوعة</span>
        <button
          type="button"
          role="switch"
          aria-checked={isPaid}
          onClick={() => setIsPaid((prev) => !prev)}
          className={`relative h-6 w-11 rounded-full transition ${
            isPaid ? "bg-emerald-700" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
              isPaid ? "right-0.5" : "right-5"
            }`}
          />
        </button>
      </div>

      {isPaid && (
        <>
          <div className="mt-4">
            <label
              htmlFor="course-price"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              سعر الدورة (ريال سعودي)
            </label>
            <input
              id="course-price"
              type="number"
              min="0"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">العمولة (10%)</span>
              <span className="text-red-600">- {commission.toFixed(1)} ريال</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-gray-700">صافي الربح المتوقع</span>
              <span className="text-emerald-700">{net.toFixed(1)} ريال</span>
            </div>
          </div>
        </>
      )}

      <div className="mt-4 space-y-2 text-xs text-gray-500">
        <p className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" />
          ستكون الدورة متاحة للجميع فور النشر
        </p>
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          تخضع الدورة لمراجعة الجودة خلال 24 ساعة
        </p>
      </div>
    </div>
  );
}