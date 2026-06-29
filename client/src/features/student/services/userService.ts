import { apiClient } from "@/services/apiClient"; // Check this import relative directory location path matches your structure

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
}

export interface UpcomingSession {
  id: number;
  title: string;
  day: string;
  hour: string;
}

export interface DashboardSummaryData {
  stats: DashboardStats;
  currentCourse: CurrentCourseDetails | null;
  upcomingSessions: UpcomingSession[];
}

interface BackendApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

class UserService {
  async getStudentDashboardSummary(): Promise<DashboardSummaryData> {
    // Appends to baseURL resulting in a call to /api/v1/courses/dashboard-summary
    const response = await apiClient.get<BackendApiResponse<DashboardSummaryData>>(
      "/courses/dashboard-summary"
    );
    return response.data.data;
  }
}

export const userService = new UserService();