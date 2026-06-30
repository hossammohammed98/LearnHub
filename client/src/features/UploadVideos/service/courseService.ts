import axios from 'axios';
import { apiClient } from '@/services/apiClient';

export type CloudinaryAsset = {
  url: string;
  public_id: string;
  fileName?: string;
  resourceType?: string;
};

export type AssignmentDraftPayload = {
  id?: string;
  clientId: string;
  Title: string;
  Content: string;
  Attachment?: CloudinaryAsset;
};

export type LessonDraftPayload = {
  id?: string;
  clientId: string;
  Title: string;
  Content?: string;
  Video?: CloudinaryAsset;
  Attachments?: CloudinaryAsset[];
  assignments?: AssignmentDraftPayload[];
};

export type UnitDraftPayload = {
  id?: string;
  clientId: string;
  Title: string;
  lessons: LessonDraftPayload[];
};

export type CourseDraftPayload = {
  courseId?: string;
  TeacherId?: string;
  Title: string;
  Description: string;
  CoverImage?: string;
  CoverImagePublicId?: string;
  PromoUrl?: string;
  units: UnitDraftPayload[];
};

export type SaveCourseResponse = {
  course: {
    _id: string;
    Title: string;
    Description: string;
    CoverImage?: string;
    CoverImagePublicId?: string;
    PromoUrl?: string;
    Status: 'draft' | 'published';
  };
  units: Array<{
    _id: string;
    Title: string;
    lessons: Array<{
      _id: string;
      Title: string;
      assignments?: Array<{ _id: string; Title: string }>;
    }>;
  }>;
  idMap: {
    units: Record<string, string>;
    lessons: Record<string, string>;
    assignments: Record<string, string>;
  };
};

type UploadParams = {
  file: File;
  courseId: string;
  chapterId: string;
  lessonId?: string;
  assetType: 'cover' | 'video' | 'attachment' | 'assignment';
};

const getExtension = (file: File) => file.name.split('.').pop() || 'bin';

export const saveCourseDraft = async (payload: CourseDraftPayload) => {
  const response = await apiClient.post<{ data: SaveCourseResponse }>('/course/save-draft', payload);
  return response.data.data;
};

export const publishCourse = async (payload: CourseDraftPayload) => {
  const response = await apiClient.post<{ data: SaveCourseResponse }>('/course/publish', payload);
  return response.data.data;
};

export const uploadCourseAssetToCloudinary = async ({
  file,
  courseId,
  chapterId,
  lessonId,
  assetType,
}: UploadParams): Promise<CloudinaryAsset> => {
  const tokenResponse = await apiClient.post('/course/getCourseUploadToken', {
    courseId,
    chapterId,
    lessonId,
    fileType: getExtension(file),
    assetType,
  });

  const { signature, timestamp, folder, api_key, cloud_name, resourceType } = tokenResponse.data.data;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signature);
  formData.append('timestamp', String(timestamp));
  formData.append('folder', folder);
  formData.append('api_key', api_key);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`;
  const uploadResponse = await axios.post(uploadUrl, formData);

  return {
    url: uploadResponse.data.secure_url,
    public_id: uploadResponse.data.public_id,
    fileName: file.name,
    resourceType,
  };
};
