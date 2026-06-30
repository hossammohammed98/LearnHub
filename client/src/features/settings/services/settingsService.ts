import { apiClient } from "@/services/apiClient";

export interface UserSettingsProfile {
  _id: string;
  FName: string;
  LName: string;
  Email: string;
  Phone: string;
  Avatar?: string;
  Role: string;
}

export interface UpdateProfilePayload {
  FName?: string;
  LName?: string;
  Email?: string;
  Phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class SettingsService {
  async getProfile(): Promise<UserSettingsProfile> {
    const response = await apiClient.get<BackendApiResponse<UserSettingsProfile>>(
      "/users/me"
    );
    return response.data.data;
  }

  async updateProfile(payload: UpdateProfilePayload): Promise<UserSettingsProfile> {
    const response = await apiClient.patch<BackendApiResponse<UserSettingsProfile>>(
      "/users/me",
      payload
    );
    return response.data.data;
  }

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await apiClient.patch("/users/change-password", payload);
  }
}

export const settingsService = new SettingsService();
