import { apiClient } from "@/services/apiClient";
import { CourseData } from "../types";

export type ApiCourse = {
  _id: string;
  Title: string;
  Description?: string;
  Price?: number;
  CoverImage?: string;
  Status?: "draft" | "published";
  PublishedAt?: string;
  createdAt?: string;
  TeacherId?: {
    _id?: string;
    Name?: string;
    FName?: string;
    LName?: string;
  };
};

type ApiLesson = {
  _id: string;
  Title: string;
  Content?: string;
  Video?: {
    url?: string;
  };
  Attachments?: Array<{
    fileName?: string;
    url?: string;
  }>;
};

type ApiUnit = {
  _id: string;
  Title: string;
  lessons?: ApiLesson[];
};

type CourseDetailsResponse = {
  course: ApiCourse;
  units: ApiUnit[];
};

type InitiatePaymentResponse = {
  checkoutUrl: string;
  localCheckout?: boolean;
  alreadyEnrolled?: boolean;
};

export const getCourses = async () => {
  const response = await apiClient.get<{ data: ApiCourse[] }>("/course");
  return response.data.data;
};

export const getMyCourses = async () => {
  const response = await apiClient.get<{ data: ApiCourse[] }>("/course/my-courses");
  return response.data.data;
};

export const getCourseDetails = async (courseId: string) => {
  const response = await apiClient.get<{ data: CourseDetailsResponse }>(`/course/${courseId}`);
  return response.data.data;
};

export const initiateCoursePayment = async (courseId: string) => {
  const response = await apiClient.post<{ data: InitiatePaymentResponse }>(`/payments/initiate/${courseId}`);
  return response.data.data;
};

export const getCourseTitle = (course: ApiCourse) => course.Title || "دورة بدون عنوان";

export const getCoursePrice = (course: ApiCourse) => Number(course.Price || 0);

export const getTeacherName = (course: ApiCourse) => {
  const teacher = course.TeacherId;
  if (!teacher) return "مدرس تعلّم";
  return teacher.Name || [teacher.FName, teacher.LName].filter(Boolean).join(" ") || "مدرس تعلّم";
};

export const toCourseContent = (details: CourseDetailsResponse): CourseData => ({
  id: details.course._id,
  title: getCourseTitle(details.course),
  progress: 0,
  units: (details.units || []).map((unit) => ({
    id: unit._id,
    title: unit.Title,
    lessons: (unit.lessons || []).map((lesson) => ({
      id: lesson._id,
      title: lesson.Title,
      duration: "0",
      isCompleted: false,
      isLocked: false,
      videoUrl: lesson.Video?.url,
      description: lesson.Content,
      attachments: (lesson.Attachments || [])
        .filter((attachment) => attachment.url)
        .map((attachment) => ({
          fileName: attachment.fileName || "ملف مرفق",
          url: attachment.url || "",
        })),
    })),
  })),
});
