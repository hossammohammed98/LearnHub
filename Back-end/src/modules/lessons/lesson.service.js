const LessonRepository = require("./lesson.repository");
const BaseService = require("../../shared/core/BaseService");
const { cloudinary } = require("../../config/cloudinary");
const ApiError = require("../../shared/core/ApiError");
const Lesson = require("./lesson.model");
const Chapter = require("../chapters/chapter.model");
const Enrollment = require("../enrollments/enrollment.model");
const Student = require("../students/student.model");

class LessonService extends BaseService {
  constructor() {
    super(LessonRepository);
  }

  stripStudentVideoUrl(lesson) {
    if (!lesson) return lesson;
    const plain = typeof lesson.toObject === 'function' ? lesson.toObject() : lesson;
    if (plain.Video?.url) {
      plain.Video = {
        public_id: plain.Video.public_id,
        resourceType: plain.Video.resourceType,
        fileName: plain.Video.fileName,
        playbackRequired: true,
      };
    }
    return plain;
  }

  async getStudentSafeById(id, user) {
    const lesson = await Lesson.findById(id);
    if (user?.role === 'Student') return this.stripStudentVideoUrl(lesson);
    return lesson;
  }

  async getPlaybackAccess(lessonId, user) {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new ApiError(404, "Lesson not found");
    if (!lesson.Video?.public_id) throw new ApiError(404, "Lesson video not found");

    if (user.role === 'Student') {
      const chapter = await Chapter.findById(lesson.ChapterId);
      if (!chapter) throw new ApiError(404, "Lesson chapter not found");

      const student = await Student.findOne({ UserId: user.id });
      if (!student) throw new ApiError(403, "Student profile not found");

      const enrollment = await Enrollment.findOne({
        StudentId: student._id,
        CourseId: chapter.CourseId,
      });
      if (!enrollment) throw new ApiError(403, "You are not enrolled in this course");
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60;
    const playbackUrl = cloudinary.url(lesson.Video.public_id, {
      resource_type: 'video',
      type: 'upload',
      sign_url: true,
      expires_at: expiresAt,
      secure: true,
    });

    return {
      url: playbackUrl,
      expiresAt,
    };
  }

  async deleteLessonAsset(lessonId, assetType) {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new ApiError(404, "Lesson item context not found");

    let publicId = "";

    if (assetType === 'video' && lesson.Video?.public_id) {
      publicId = await LessonRepository.updateAssetPublicAsset(lessonId);
    }

    if (publicId) {
      const resourceType = assetType === 'video' ? 'video' : 'raw';
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }

    return { publicId, status: "removed" };
  }
}

module.exports = new LessonService();
