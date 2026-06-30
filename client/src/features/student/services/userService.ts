import { apiClient } from "@/services/apiClient";

export interface DashboardStats {
  totalCourses: number;
  newCoursesCount: number;
  completedLessons: number;
  overallProgress: number;
  pendingQuizzes: number;
  isQuizzesUrgent: boolean;
}

export interface CurrentCourseDetails {
  id: string;
  name: string;
  title: string;
  description: string;
  progress: number;
  level: string;
  status: string;
  coverImage?: string;
}

export interface UpcomingSession {
  id: number;
  title: string;
  day: string;
  hour: string;
}

export interface StudentProfile {
  avatar: string | null;
  firstName: string;
  lastName: string;
  roleLabel: string;
}

export interface DashboardSummaryData {
  profile: StudentProfile;
  stats: DashboardStats;
  currentCourse: CurrentCourseDetails | null;
  upcomingSessions: UpcomingSession[];
}

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class UserService {
  async getStudentDashboardSummary(): Promise<DashboardSummaryData> {
    const response = await apiClient.get<BackendApiResponse<DashboardSummaryData>>(
      "/courses/dashboard-summary"
    );
    return response.data.data;
  }
}

export const userService = new UserService();
