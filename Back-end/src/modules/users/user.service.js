const userRepository = require("./user.repository");
const BaseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }
  async getAvatarUploadToken(userId){
    const folderPath=`tallem/users/${userId}/avatar`;
    const signatureOptions={
      folder:folderPath,
      resource_type:'image',
      transformation:'c_fill,g_face,w_300,h_300,q_auto,f_auto'
    }
    return generateSignature(signatureOptions);
  }
  async saveUploadedUserAvatar(userId,cloudinaryData){
    
  }
}
module.exports =new UserService();
