// course.service.js
const CourseRepository = require("./course.repository");
const BaseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");

class CourseService extends BaseService {
  constructor() {
    super(CourseRepository);
  }

  async getCourseUploadToken(courseId, chapterId, lessonId, fileType) {
    const folderPath = `tallem/courses/course_${courseId}/chapters/chapter_${chapterId}/lessons/lesson_${lessonId}`;
    
    let resourceType = 'video';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType?.toLowerCase())) {
      resourceType = 'image';
    } else if (['pdf', 'docx', 'xlsx', 'txt', 'zip'].includes(fileType?.toLowerCase())) {
      resourceType = 'raw';
    }

    // 🎯 FIXED: resource_type MUST be locked inside signatureOptions for Cloudinary validation matching
    const signatureOptions = {
      folder: folderPath,
      resource_type: resourceType
    };

    const signatureData = generateSignature(signatureOptions);

    return {
      ...signatureData,
      folder: folderPath,
      resourceType
    };
  }
}
module.exports = new CourseService();