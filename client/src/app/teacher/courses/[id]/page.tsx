"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, ExternalLink, Loader2, Save, Trash2 } from "lucide-react";
import Button from "@/components/ui/ButtonInit";
import TeacherNavBar from "@/features/teacher/TeacherNavBar";
import TeacherSideBar from "@/features/teacher/TeacherSideBar";
import apiClient from "@/services/apiClient";
import { useAuthStore } from "@/store/useAuthStore";

type CourseStatus = "draft" | "published";

interface CourseDetails {
  _id: string;
  Title: string;
  Description: string;
  CoverImage?: string;
  PromoUrl?: string;
  Status?: CourseStatus;
  PublishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CloudinaryAsset {
  url?: string;
  public_id?: string;
  fileName?: string;
  resourceType?: string;
}

interface AssignmentDetails {
  _id: string;
  Title: string;
  Content: string;
  Attachment?: CloudinaryAsset;
}

interface LessonDetails {
  _id: string;
  Title: string;
  Content?: string;
  Video?: CloudinaryAsset;
  Attachments?: CloudinaryAsset[];
  assignments?: AssignmentDetails[];
}

interface UnitDetails {
  _id: string;
  Title: string;
  lessons?: LessonDetails[];
}

interface CourseWorkflowDetails {
  course: CourseDetails;
  units: UnitDetails[];
}

interface ApiDataResponse<T> {
  data: T;
  message?: string;
}

interface CourseFormState {
  Title: string;
  Description: string;
  PromoUrl: string;
  Status: CourseStatus;
}

const emptyForm: CourseFormState = {
  Title: "",
  Description: "",
  PromoUrl: "",
  Status: "draft",
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function formatDate(value?: string) {
  if (!value) return "غير متاح";
  return new Intl.DateTimeFormat("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function TeacherCourseManagePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const courseId = params.id;
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [units, setUnits] = useState<UnitDetails[]>([]);
  const [form, setForm] = useState<CourseFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const canManageCourses = user?.Role === "Teacher" || user?.Role === "Assistant";
  const isFormValid = useMemo(
    () => form.Title.trim().length >= 2 && form.Description.trim().length >= 2,
    [form.Description, form.Title],
  );

  useEffect(() => {
    if (user && !canManageCourses) {
      router.replace("/dashboard");
    }
  }, [canManageCourses, router, user]);

  useEffect(() => {
    let isMounted = true;

    async function loadCourse() {
      setIsLoading(true);
      setError("");
      setMessage("");

      try {
        const response = await apiClient.get<ApiDataResponse<CourseWorkflowDetails>>(`/course/${courseId}`);
        const nextCourse = response.data.data.course;

        if (!isMounted) return;

        setCourse(nextCourse);
        setUnits(response.data.data.units || []);
        setForm({
          Title: nextCourse.Title || "",
          Description: nextCourse.Description || "",
          PromoUrl: nextCourse.PromoUrl || "",
          Status: nextCourse.Status || "draft",
        });
      } catch (requestError) {
        if (isMounted) {
          setError(getErrorMessage(requestError, "تعذر تحميل بيانات الدورة."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (courseId) {
      loadCourse();
    }

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid || isSaving) return;

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        Title: form.Title.trim(),
        Description: form.Description.trim(),
        PromoUrl: form.PromoUrl.trim(),
        Status: form.Status,
      };

      const response = await apiClient.patch<ApiDataResponse<CourseDetails>>(`/course/${courseId}`, payload);
      const updatedCourse = response.data.data;

      setCourse(updatedCourse);
      setForm({
        Title: updatedCourse.Title || payload.Title,
        Description: updatedCourse.Description || payload.Description,
        PromoUrl: updatedCourse.PromoUrl || payload.PromoUrl,
        Status: updatedCourse.Status || payload.Status,
      });
      setMessage("تم تحديث بيانات الدورة بنجاح.");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "تعذر تحديث الدورة."));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm("هل تريد حذف هذه الدورة نهائيا؟");
    if (!confirmed || isDeleting) return;

    setIsDeleting(true);
    setError("");
    setMessage("");

    try {
      await apiClient.delete(`/course/${courseId}`);
      router.push("/teacher");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "تعذر حذف الدورة."));
      setIsDeleting(false);
    }
  }

  if (!user || !canManageCourses) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F7F9] text-sm text-slate-500">
        جاري التحقق من الصلاحيات...
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] text-slate-900">
      <TeacherNavBar />

      <div className="flex">
        <TeacherSideBar />

        <main className="w-full px-6 py-8 lg:px-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/teacher" className="inline-flex items-center gap-2 text-sm font-medium text-[#006C49]">
                <ArrowRight className="h-4 w-4" />
                العودة للوحة المعلم
              </Link>
              <h1 className="mt-3 text-2xl font-bold">إدارة الدورة</h1>
              <p className="mt-1 text-sm text-slate-500">راجع تفاصيل الدورة وعدل بياناتها الأساسية أو احذفها.</p>
            </div>

            <Button variant="outline" size="md" onClick={() => router.push("/UploadVideos")}>
              إنشاء دورة جديدة
            </Button>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {message}
            </div>
          )}

          {isLoading ? (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-[#E6E8EA] bg-white text-sm text-slate-500">
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري تحميل بيانات الدورة...
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
              <form onSubmit={handleSave} className="space-y-5 rounded-lg border border-[#E6E8EA] bg-white p-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">عنوان الدورة</label>
                  <input
                    value={form.Title}
                    onChange={(event) => setForm((current) => ({ ...current, Title: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#006C49] focus:bg-white"
                    placeholder="اكتب عنوان الدورة"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">وصف الدورة</label>
                  <textarea
                    value={form.Description}
                    onChange={(event) => setForm((current) => ({ ...current, Description: event.target.value }))}
                    rows={6}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#006C49] focus:bg-white"
                    placeholder="اكتب وصف الدورة"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">رابط الفيديو التعريفي</label>
                    <input
                      type="url"
                      value={form.PromoUrl}
                      onChange={(event) => setForm((current) => ({ ...current, PromoUrl: event.target.value }))}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#006C49] focus:bg-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">حالة الدورة</label>
                    <select
                      value={form.Status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, Status: event.target.value as CourseStatus }))
                      }
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#006C49] focus:bg-white"
                    >
                      <option value="draft">مسودة</option>
                      <option value="published">منشورة</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                  <Button type="submit" size="md" disabled={!isFormValid || isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    حفظ التعديلات
                  </Button>
                  <Button type="button" variant="danger" size="md" disabled={isDeleting} onClick={handleDelete}>
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    حذف الدورة
                  </Button>
                </div>
              </form>

              <section className="rounded-lg border border-[#E6E8EA] bg-white p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-bold">محتوى الدورة والملفات</h2>
                    <p className="mt-1 text-sm text-slate-500">الفيديوهات والمرفقات المحفوظة من Cloudinary تظهر هنا.</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => router.push(`/UploadVideos?courseId=${courseId}`)}>
                    تعديل المحتوى والملفات
                  </Button>
                </div>

                {units.length ? (
                  <div className="space-y-4">
                    {units.map((unit, unitIndex) => (
                      <article key={unit._id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-900">
                          الوحدة {unitIndex + 1}: {unit.Title}
                        </h3>

                        <div className="mt-4 space-y-3">
                          {unit.lessons?.length ? unit.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson._id} className="rounded-lg border border-slate-200 bg-white p-4">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <p className="font-medium text-slate-900">
                                    الدرس {lessonIndex + 1}: {lesson.Title}
                                  </p>
                                  {lesson.Content && <p className="mt-1 text-sm text-slate-500">{lesson.Content}</p>}
                                </div>

                                {lesson.Video?.url ? (
                                  <a
                                    href={lesson.Video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#006C49]"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    {lesson.Video.fileName || "فتح الفيديو"}
                                  </a>
                                ) : (
                                  <span className="text-sm text-slate-400">لا يوجد فيديو محفوظ</span>
                                )}
                              </div>

                              {lesson.Attachments?.length ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {lesson.Attachments.map((attachment) => (
                                    <a
                                      key={attachment.public_id || attachment.url}
                                      href={attachment.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#006C49]"
                                    >
                                      {attachment.fileName || "مرفق الدرس"}
                                    </a>
                                  ))}
                                </div>
                              ) : null}

                              {lesson.assignments?.length ? (
                                <div className="mt-4 space-y-2">
                                  <p className="text-xs font-semibold text-slate-500">التكليفات</p>
                                  {lesson.assignments.map((assignment) => (
                                    <div key={assignment._id} className="rounded-lg bg-slate-50 p-3 text-sm">
                                      <p className="font-medium text-slate-800">{assignment.Title}</p>
                                      <p className="mt-1 text-slate-500">{assignment.Content}</p>
                                      {assignment.Attachment?.url && (
                                        <a
                                          href={assignment.Attachment.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-[#006C49]"
                                        >
                                          <ExternalLink className="h-3.5 w-3.5" />
                                          {assignment.Attachment.fileName || "فتح مرفق التكليف"}
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )) : (
                            <p className="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
                              لا توجد دروس محفوظة في هذه الوحدة.
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                    لا يوجد محتوى محفوظ لهذه الدورة حتى الآن.
                  </div>
                )}
              </section>
              </div>

              <aside className="space-y-5">
                <section className="rounded-lg border border-[#E6E8EA] bg-white p-5">
                  <h2 className="mb-4 text-base font-bold">تفاصيل الدورة</h2>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">رقم الدورة</dt>
                      <dd className="max-w-40 truncate font-medium">{course?._id}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">الحالة</dt>
                      <dd className="font-medium">{form.Status === "published" ? "منشورة" : "مسودة"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">تاريخ الإنشاء</dt>
                      <dd className="font-medium">{formatDate(course?.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">آخر تحديث</dt>
                      <dd className="font-medium">{formatDate(course?.updatedAt)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">تاريخ النشر</dt>
                      <dd className="font-medium">{formatDate(course?.PublishedAt)}</dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-lg border border-[#E6E8EA] bg-white p-5">
                  <h2 className="mb-4 text-base font-bold">الوسائط</h2>
                  <div className="space-y-3 text-sm">
                    {course?.CoverImage ? (
                      <a
                        href={course.CoverImage}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#006C49]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        فتح صورة الغلاف
                      </a>
                    ) : (
                      <p className="text-slate-500">لا توجد صورة غلاف محفوظة.</p>
                    )}

                    {form.PromoUrl ? (
                      <a
                        href={form.PromoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#006C49]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        فتح الفيديو التعريفي
                      </a>
                    ) : (
                      <p className="text-slate-500">لا يوجد فيديو تعريفي.</p>
                    )}
                  </div>
                </section>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
