const AssignmentRepository = require("./assignment.repository");
const BaseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");

class AssignmentService extends BaseService {
  constructor() {
    super(AssignmentRepository);
  }
  async getAssignmentUploadToken(lessonId) {
    const folderPath=`tallem/lessonAttachment/${lessonId}`;
    const signatureOptions={
      folder:folderPath,
      resource_type:'raw',
    }
    return generateSignature(signatureOptions);
  }
  async saveUploadedLessonAttachment(lessonId,cloudinaryData){
    
  }
}
module.exports = new AssignmentService();
