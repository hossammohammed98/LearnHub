// lesson.service.js
const LessonRepository = require("./lesson.repository");
const BaseService = require("../../shared/core/BaseService");
const { cloudinary } = require("../../config/cloudinary");
const ApiError = require("../../shared/core/ApiError");

class LessonService extends BaseService {
  constructor() {
    super(LessonRepository);
  }

  async deleteLessonAsset(lessonId, assetType) {
    const lesson = await LessonRepository.findById(lessonId);
    // 🎯 FIXED: Throwing error safely triggers global express handlers
    if (!lesson) throw new ApiError(404, "Lesson item context not found");

    let publicId = "";
    
    // 🎯 FIXED: Assigned value directly to the parent-scoped tracking string context safely
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