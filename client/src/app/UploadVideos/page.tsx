"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FileText,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  UploadCloud,
  Video,
} from "lucide-react";
import UploadNavbar from "@/features/UploadVideos/component/UploadNavbar";
import UploadSidebar from "@/features/UploadVideos/component/UploadSidebar";
import UploadFooter from "@/features/UploadVideos/component/UploadFooter";
import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "@/services/apiClient";
import {
  CloudinaryAsset,
  CourseDraftPayload,
  publishCourse,
  saveCourseDraft,
  uploadCourseAssetToCloudinary,
} from "@/features/UploadVideos/service/courseService";

type AssignmentDraft = {
  id?: string;
  clientId: string;
  title: string;
  content: string;
  attachmentFile?: File;
  attachment?: CloudinaryAsset;
};

type LessonDraft = {
  id?: string;
  clientId: string;
  title: string;
  content: string;
  videoFile?: File;
  video?: CloudinaryAsset;
  assignments: AssignmentDraft[];
};

type UnitDraft = {
  id?: string;
  clientId: string;
  title: string;
  lessons: LessonDraft[];
};

type CourseBuilderState = {
  courseId?: string;
  title: string;
  description: string;
  promoUrl: string;
  coverFile?: File;
  cover?: CloudinaryAsset;
  units: UnitDraft[];
};

type CourseDetailsResponse = {
  course: {
    _id: string;
    Title: string;
    Description: string;
    CoverImage?: string;
    CoverImagePublicId?: string;
    PromoUrl?: string;
  };
  units: Array<{
    _id: string;
    Title: string;
    lessons?: Array<{
      _id: string;
      Title: string;
      Content?: string;
      Video?: CloudinaryAsset;
      assignments?: Array<{
        _id: string;
        Title: string;
        Content: string;
        Attachment?: CloudinaryAsset;
      }>;
    }>;
  }>;
};

const createClientId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const createAssignment = (): AssignmentDraft => ({
  clientId: createClientId("assignment"),
  title: "تكليف جديد",
  content: "تعليمات التكليف",
});

const createLesson = (): LessonDraft => ({
  clientId: createClientId("lesson"),
  title: "درس جديد",
  content: "وصف الدرس",
  assignments: [createAssignment()],
});

const initialDraft: CourseBuilderState = {
  title: "",
  description: "",
  promoUrl: "",
  units: [
    {
      clientId: createClientId("unit"),
      title: "الوحدة 1",
      lessons: [createLesson()],
    },
  ],
};

const buildDraftFromCourseDetails = (details: CourseDetailsResponse): CourseBuilderState => ({
  courseId: details.course._id,
  title: details.course.Title || "",
  description: details.course.Description || "",
  promoUrl: details.course.PromoUrl || "",
  cover: details.course.CoverImage
    ? {
        url: details.course.CoverImage,
        public_id: details.course.CoverImagePublicId || "",
        fileName: "صورة الغلاف الحالية",
        resourceType: "image",
      }
    : undefined,
  units: details.units.length
    ? details.units.map((unit) => ({
        id: unit._id,
        clientId: unit._id,
        title: unit.Title,
        lessons: unit.lessons?.length
          ? unit.lessons.map((lesson) => ({
              id: lesson._id,
              clientId: lesson._id,
              title: lesson.Title,
              content: lesson.Content || "",
              video: lesson.Video?.url ? lesson.Video : undefined,
              assignments: lesson.assignments?.length
                ? lesson.assignments.map((assignment) => ({
                    id: assignment._id,
                    clientId: assignment._id,
                    title: assignment.Title,
                    content: assignment.Content,
                    attachment: assignment.Attachment?.url ? assignment.Attachment : undefined,
                  }))
                : [],
            }))
          : [],
      }))
    : initialDraft.units,
});

const buildPayload = (draft: CourseBuilderState): CourseDraftPayload => ({
  courseId: draft.courseId,
  Title: draft.title.trim(),
  Description: draft.description.trim(),
  CoverImage: draft.cover?.url,
  CoverImagePublicId: draft.cover?.public_id,
  PromoUrl: draft.promoUrl.trim(),
  units: draft.units.map((unit) => ({
    id: unit.id,
    clientId: unit.clientId,
    Title: unit.title.trim(),
    lessons: unit.lessons.map((lesson) => ({
      id: lesson.id,
      clientId: lesson.clientId,
      Title: lesson.title.trim(),
      Content: lesson.content.trim(),
      Video: lesson.video,
      assignments: lesson.assignments.map((assignment) => ({
        id: assignment.id,
        clientId: assignment.clientId,
        Title: assignment.title.trim(),
        Content: assignment.content.trim(),
        Attachment: assignment.attachment,
      })),
    })),
  })),
});

const applySavedIds = (
  draft: CourseBuilderState,
  courseId: string,
  idMap: {
    units: Record<string, string>;
    lessons: Record<string, string>;
    assignments: Record<string, string>;
  },
): CourseBuilderState => ({
  ...draft,
  courseId,
  units: draft.units.map((unit) => ({
    ...unit,
    id: unit.id || idMap.units[unit.clientId],
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      id: lesson.id || idMap.lessons[lesson.clientId],
      assignments: lesson.assignments.map((assignment) => ({
        ...assignment,
        id: assignment.id || idMap.assignments[assignment.clientId],
      })),
    })),
  })),
});

const hasStagedFiles = (draft: CourseBuilderState) =>
  Boolean(draft.coverFile) ||
  draft.units.some((unit) =>
    unit.lessons.some(
      (lesson) =>
        lesson.videoFile ||
        lesson.assignments.some((assignment) => assignment.attachmentFile),
    ),
  );

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingCourseId = searchParams.get("courseId");
  const user = useAuthStore((state) => state.user);
  const [draft, setDraft] = useState<CourseBuilderState>(initialDraft);
  const [isLoadingDraft, setIsLoadingDraft] = useState(Boolean(editingCourseId));
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const canManageUploads = user?.Role === "Teacher" || user?.Role === "Assistant";

  useEffect(() => {
    if (user && !canManageUploads) {
      router.replace("/dashboard");
    }
  }, [canManageUploads, router, user]);

  useEffect(() => {
    let isMounted = true;

    async function loadExistingCourse() {
      if (!editingCourseId || !canManageUploads) {
        setIsLoadingDraft(false);
        return;
      }

      setIsLoadingDraft(true);
      setStatusMessage("جاري تحميل بيانات الدورة...");

      try {
        const response = await apiClient.get<{ data: CourseDetailsResponse }>(`/course/${editingCourseId}`);
        if (!isMounted) return;

        setDraft(buildDraftFromCourseDetails(response.data.data));
        setStatusMessage("تم تحميل الدورة. يمكنك تحديث المحتوى أو رفع ملفات جديدة.");
      } catch (error) {
        if (isMounted) {
          setStatusMessage(error instanceof Error ? error.message : "تعذر تحميل بيانات الدورة.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingDraft(false);
        }
      }
    }

    loadExistingCourse();

    return () => {
      isMounted = false;
    };
  }, [canManageUploads, editingCourseId]);

  const isFormValid = useMemo(
    () =>
      draft.title.trim().length >= 2 &&
      draft.description.trim().length >= 2 &&
      draft.units.every(
        (unit) =>
          unit.title.trim() &&
          unit.lessons.every(
            (lesson) =>
              lesson.title.trim() &&
              lesson.assignments.every(
                (assignment) => assignment.title.trim() && assignment.content.trim(),
              ),
          ),
      ),
    [draft],
  );

  const updateUnit = (unitClientId: string, updates: Partial<UnitDraft>) => {
    setDraft((current) => ({
      ...current,
      units: current.units.map((unit) =>
        unit.clientId === unitClientId ? { ...unit, ...updates } : unit,
      ),
    }));
  };

  const updateLesson = (unitClientId: string, lessonClientId: string, updates: Partial<LessonDraft>) => {
    setDraft((current) => ({
      ...current,
      units: current.units.map((unit) =>
        unit.clientId === unitClientId
          ? {
              ...unit,
              lessons: unit.lessons.map((lesson) =>
                lesson.clientId === lessonClientId ? { ...lesson, ...updates } : lesson,
              ),
            }
          : unit,
      ),
    }));
  };

  const updateAssignment = (
    unitClientId: string,
    lessonClientId: string,
    assignmentClientId: string,
    updates: Partial<AssignmentDraft>,
  ) => {
    setDraft((current) => ({
      ...current,
      units: current.units.map((unit) =>
        unit.clientId === unitClientId
          ? {
              ...unit,
              lessons: unit.lessons.map((lesson) =>
                lesson.clientId === lessonClientId
                  ? {
                      ...lesson,
                      assignments: lesson.assignments.map((assignment) =>
                        assignment.clientId === assignmentClientId
                          ? { ...assignment, ...updates }
                          : assignment,
                      ),
                    }
                  : lesson,
              ),
            }
          : unit,
      ),
    }));
  };

  const uploadStagedFiles = async (draftWithIds: CourseBuilderState) => {
    let nextDraft = { ...draftWithIds };

    if (nextDraft.coverFile && nextDraft.courseId) {
      setStatusMessage("جاري رفع صورة الغلاف...");
      const cover = await uploadCourseAssetToCloudinary({
        file: nextDraft.coverFile,
        courseId: nextDraft.courseId,
        chapterId: "cover",
        assetType: "cover",
      });
      nextDraft = { ...nextDraft, cover, coverFile: undefined };
    }

    const units = [];
    for (const unit of nextDraft.units) {
      const lessons = [];
      for (const lesson of unit.lessons) {
        let nextLesson = { ...lesson };

        if (nextLesson.videoFile && nextDraft.courseId && unit.id && nextLesson.id) {
          setStatusMessage(`جاري رفع فيديو: ${nextLesson.title}`);
          const video = await uploadCourseAssetToCloudinary({
            file: nextLesson.videoFile,
            courseId: nextDraft.courseId,
            chapterId: unit.id,
            lessonId: nextLesson.id,
            assetType: "video",
          });
          nextLesson = { ...nextLesson, video, videoFile: undefined };
        }

        const assignments = [];
        for (const assignment of nextLesson.assignments) {
          let nextAssignment = { ...assignment };
          if (nextAssignment.attachmentFile && nextDraft.courseId && unit.id && nextLesson.id) {
            setStatusMessage(`جاري رفع ملف التكليف: ${nextAssignment.title}`);
            const attachment = await uploadCourseAssetToCloudinary({
              file: nextAssignment.attachmentFile,
              courseId: nextDraft.courseId,
              chapterId: unit.id,
              lessonId: nextLesson.id,
              assetType: "assignment",
            });
            nextAssignment = { ...nextAssignment, attachment, attachmentFile: undefined };
          }
          assignments.push(nextAssignment);
        }

        lessons.push({ ...nextLesson, assignments });
      }
      units.push({ ...unit, lessons });
    }

    return { ...nextDraft, units };
  };

  const handlePersist = async (mode: "draft" | "published") => {
    if (!isFormValid || isSaving) return;

    setIsSaving(true);
    setStatusMessage("جاري حفظ هيكل الدورة...");
    try {
      const prepareResponse = await saveCourseDraft(buildPayload(draft));
      let nextDraft = applySavedIds(draft, prepareResponse.course._id, prepareResponse.idMap);

      if (hasStagedFiles(nextDraft)) {
        nextDraft = await uploadStagedFiles(nextDraft);
      }

      setStatusMessage(mode === "published" ? "جاري نشر الدورة..." : "جاري حفظ المسودة...");
      const finalResponse =
        mode === "published"
          ? await publishCourse(buildPayload(nextDraft))
          : await saveCourseDraft(buildPayload(nextDraft));

      nextDraft = applySavedIds(nextDraft, finalResponse.course._id, finalResponse.idMap);
      setDraft(nextDraft);
      setStatusMessage(mode === "published" ? "تم نشر الدورة بنجاح." : "تم حفظ المسودة بنجاح.");
    } catch (error) {
      console.error(error);
      setStatusMessage(error instanceof Error ? error.message : "حدث خطأ أثناء الحفظ. يرجى مراجعة البيانات والمحاولة مرة أخرى.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || !canManageUploads || isLoadingDraft) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        {isLoadingDraft ? "جاري تحميل بيانات الدورة..." : "جاري التحقق من الصلاحيات..."}
      </div>
    );
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-gray-50">
      <UploadNavbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <UploadSidebar />
        <main className="flex-1 space-y-5 p-4 sm:p-6">
          <header className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">إنشاء محتوى الدورة</h1>
              <p className="mt-1 text-sm text-gray-500">
                تبقى الملفات على جهازك حتى تحفظ المسودة أو تنشر الدورة.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={!isFormValid || isSaving}
                onClick={() => handlePersist("draft")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                حفظ كمسودة
              </button>
              <button
                type="button"
                disabled={!isFormValid || isSaving}
                onClick={() => handlePersist("published")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                نشر الدورة
              </button>
            </div>
          </header>

          {statusMessage && (
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {statusMessage}
            </div>
          )}

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="mb-4 text-sm font-semibold text-gray-900">وسائط الدورة</h2>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:bg-gray-100">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {draft.coverFile?.name || draft.cover?.fileName || "اختر صورة الغلاف"}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        coverFile: event.target.files?.[0],
                      }))
                    }
                  />
                </label>
                <label className="mt-4 block text-sm font-medium text-gray-700">
                  رابط الفيديو التعريفي
                  <input
                    type="url"
                    value={draft.promoUrl}
                    onChange={(event) => setDraft((current) => ({ ...current, promoUrl: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:bg-white"
                    placeholder="https://..."
                  />
                </label>
              </div>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="mb-4 text-sm font-semibold text-gray-900">المعلومات الأساسية</h2>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    عنوان الدورة
                    <input
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:bg-white"
                      placeholder="اكتب عنوان الدورة"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    وصف الدورة
                    <textarea
                      value={draft.description}
                      onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                      rows={4}
                      className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:bg-white"
                      placeholder="اكتب ما سيتعلمه الطلاب في هذه الدورة"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                {draft.units.map((unit, unitIndex) => (
                  <section key={unit.clientId} className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <input
                        value={unit.title}
                        onChange={(event) => updateUnit(unit.clientId, { title: event.target.value })}
                        className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-emerald-500 focus:bg-white"
                        placeholder={`الوحدة ${unitIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((current) => ({
                            ...current,
                            units: current.units.filter((item) => item.clientId !== unit.clientId),
                          }))
                        }
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
                        aria-label="حذف الوحدة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {unit.lessons.map((lesson) => (
                        <div key={lesson.clientId} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <input
                              value={lesson.title}
                              onChange={(event) =>
                                updateLesson(unit.clientId, lesson.clientId, { title: event.target.value })
                              }
                              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-500"
                              placeholder="عنوان الدرس"
                            />
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                              <Video className="h-4 w-4" />
                              <span className="truncate">{lesson.videoFile?.name || lesson.video?.fileName || "اختر فيديو"}</span>
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(event) =>
                                  updateLesson(unit.clientId, lesson.clientId, {
                                    videoFile: event.target.files?.[0],
                                  })
                                }
                              />
                            </label>
                          </div>
                          <textarea
                            value={lesson.content}
                            onChange={(event) =>
                              updateLesson(unit.clientId, lesson.clientId, { content: event.target.value })
                            }
                            rows={2}
                            className="mt-3 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500"
                            placeholder="وصف الدرس"
                          />

                          <div className="mt-4 space-y-3">
                            {lesson.assignments.map((assignment) => (
                              <div key={assignment.clientId} className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3 sm:grid-cols-3">
                                <input
                                  value={assignment.title}
                                  onChange={(event) =>
                                    updateAssignment(unit.clientId, lesson.clientId, assignment.clientId, {
                                      title: event.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                  placeholder="عنوان التكليف"
                                />
                                <input
                                  value={assignment.content}
                                  onChange={(event) =>
                                    updateAssignment(unit.clientId, lesson.clientId, assignment.clientId, {
                                      content: event.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                  placeholder="تعليمات التكليف"
                                />
                                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                  <FileText className="h-4 w-4" />
                                  <span className="truncate">
                                    {assignment.attachmentFile?.name || assignment.attachment?.fileName || "مرفق"}
                                  </span>
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                                    className="hidden"
                                    onChange={(event) =>
                                      updateAssignment(unit.clientId, lesson.clientId, assignment.clientId, {
                                        attachmentFile: event.target.files?.[0],
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                updateLesson(unit.clientId, lesson.clientId, {
                                  assignments: [...lesson.assignments, createAssignment()],
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                              إضافة تكليف
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => updateUnit(unit.clientId, { lessons: [...unit.lessons, createLesson()] })}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      إضافة درس
                    </button>
                  </section>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    units: [
                      ...current.units,
                      {
                        clientId: createClientId("unit"),
                        title: `الوحدة ${current.units.length + 1}`,
                        lessons: [createLesson()],
                      },
                    ],
                  }))
                }
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                إضافة وحدة
              </button>
            </div>
          </section>
        </main>
      </div>
      <UploadFooter />
    </div>
  );
}
