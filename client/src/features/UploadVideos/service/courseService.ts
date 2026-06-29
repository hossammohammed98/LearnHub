import { apiClient } from '@/services/apiClient';
import axios from 'axios';

interface UploadParams {
  file: File;
  courseId: string;
  chapterId: string;
  lessonId: string;
}

export const uploadLessonAssetToCloudinary = async ({ file, courseId, chapterId, lessonId }: UploadParams) => {
  const extension = file.name.split('.').pop() || '';
  
  // 1. Fetch dynamic signed credentials for this exact structural location
  const tokenRes = await apiClient.post('/course/getCourseUploadToken', {
    courseId,
    chapterId,
    lessonId,
    fileType: extension
  });
  
  const { signature, timestamp, folder, api_key, cloud_name } = tokenRes.data.data;
  
  // 2. Automate asset type detection
  const isVideo = file.type.startsWith('video/');
  const resourceType = isVideo ? 'video' : 'raw';
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('api_key', api_key);

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`;

  const uploadRes = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return {
    url: uploadRes.data.secure_url,
    public_id: uploadRes.data.public_id
  };
};