const User = require("./user.model");
const ApiError = require("../../shared/core/ApiError");
const { comparePassword } = require("../../shared/utils/hashHelper");
const userRepository = require("./user.repository");
const BaseService = require("../../shared/core/BaseService");
const { generateSignature } = require("../../config/cloudinary");

const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.Password;
  delete userObj.RefreshToken;
  return userObj;
};

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }

  async getMe(userId) {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError(404, "المستخدم غير موجود");
    }
    return sanitizeUser(user);
  }

  async updateMe(userId, payload) {
    const updateData = { ...payload };
    delete updateData.Password;
    delete updateData.Role;
    delete updateData.RefreshToken;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new ApiError(404, "المستخدم غير موجود");
    }

    return sanitizeUser(user);
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select("+Password");
    if (!user) {
      throw new ApiError(404, "المستخدم غير موجود");
    }

    const isMatch = await comparePassword(currentPassword, user.Password);
    if (!isMatch) {
      throw new ApiError(400, "كلمة المرور الحالية غير صحيحة");
    }

    user.Password = newPassword;
    await user.save();

    return null;
  }

  async getAvatarUploadToken(userId) {
    const folderPath = `tallem/users/${userId}/avatar`;
    const signatureOptions = {
      folder: folderPath,
      resource_type: "image",
      transformation: "c_fill,g_face,w_300,h_300,q_auto,f_auto",
    };
    return generateSignature(signatureOptions);
  }

  async saveUploadedUserAvatar(userId, cloudinaryData) {}
}
module.exports = new UserService();
