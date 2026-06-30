"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck, Wallet } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import {
  ApiCourse,
  getCoursePrice,
  getCourses,
  getCourseTitle,
  getTeacherName,
  initiateCoursePayment,
} from "@/features/courses/services/courseService";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [agreed, setAgreed] = useState(false);
  const [course, setCourse] = useState<ApiCourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      if (!courseId) {
        setError("No course was selected.");
        setIsLoading(false);
        return;
      }

      try {
        const courses = await getCourses();
        const selectedCourse = courses.find((item) => item._id === courseId);
        if (!selectedCourse) throw new Error("Course not found.");
        if (isMounted) setCourse(selectedCourse);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Could not load course.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const price = useMemo(() => (course ? getCoursePrice(course) : 0), [course]);
  const tax = Math.round(price * 0.14);
  const total = price + tax;

  const handleSubmit = async () => {
    if (!courseId || !agreed) return;

    setIsSubmitting(true);
    setError("");
    try {
      const result = await initiateCoursePayment(courseId);
      if (result.checkoutUrl.startsWith("http")) {
        window.location.href = result.checkoutUrl;
        return;
      }
      router.push(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not be started.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa]" dir="rtl">
      <Navbar />

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-teal-600">Secure checkout</p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">Complete payment</h1>
            </div>
            <Link href="/BrowescorsesPage" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-teal-700">
              Back
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 rounded-lg border p-4 text-sm font-semibold ${
                paymentMethod === "card" ? "border-teal-600 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-600"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("wallet")}
              className={`flex items-center justify-center gap-2 rounded-lg border p-4 text-sm font-semibold ${
                paymentMethod === "wallet" ? "border-teal-600 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-600"
              }`}
            >
              <Wallet className="h-5 w-5" />
              Wallet
            </button>
          </div>

          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
            Payment details are completed on the secure payment provider page after you confirm.
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-teal-600"
            />
            <span>I agree to continue with this purchase and unlock the course after successful payment.</span>
          </label>

          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!agreed || isSubmitting || isLoading || !course}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 disabled:bg-teal-300"
          >
            <ShieldCheck className="h-5 w-5" />
            {isSubmitting ? "Starting payment..." : "Confirm and pay"}
          </button>
        </section>

        <aside className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-900">Order summary</h2>

          {isLoading && <p className="text-sm text-gray-500">Loading course...</p>}

          {!isLoading && course && (
            <>
              <div className="mb-5 flex gap-3 border-b border-gray-100 pb-5">
                <div
                  role="img"
                  aria-label={getCourseTitle(course)}
                  className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 bg-cover bg-center"
                  style={{ backgroundImage: `url("${course.CoverImage || "/images/student.jpg"}")` }}
                />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{getCourseTitle(course)}</h3>
                  <p className="mt-1 text-xs text-gray-500">{getTeacherName(course)}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Course price</span>
                  <span className="font-semibold text-gray-900">{price.toLocaleString()} EGP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">VAT 14%</span>
                  <span className="font-semibold text-gray-900">{tax.toLocaleString()} EGP</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-extrabold text-teal-700">{total.toLocaleString()} EGP</span>
                </div>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}
