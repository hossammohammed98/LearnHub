const LessonRepository = require("./lesson.repository");
const BaseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");

class LessonService extends BaseService {
  constructor() {
    super(LessonRepository);
  }

  async getLessonVideoUploadToken(courseId,unitSlug){
    const folderPath=`tallem/courses/${courseId}/Units/${unitSlug}`;
    const signatureOptions={
      folder:folderPath,
      resource_Type:'video',
      eager:'sp_hd/m3u8',
      eager_async:true,
    };
    return generateSignature(signatureOptions);
  }
  async saveUploadedLessonVideo(LessonId,cloudinaryData){

  }
}
module.exports =new LessonService();
