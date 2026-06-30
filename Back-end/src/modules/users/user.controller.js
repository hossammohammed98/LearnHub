const catchAsyncHandler = require("../../shared/utils/catchAsyncHandler");
const ApiResponse = require("../../shared/core/ApiResponse");
const userService = require("./user.service");

exports.getMe = catchAsyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user.id);
  return ApiResponse.success(res, "تم جلب بيانات المستخدم بنجاح", user, 200);
});

exports.updateMe = catchAsyncHandler(async (req, res) => {
  const user = await userService.updateMe(req.user.id, req.body);
  return ApiResponse.success(res, "تم تحديث الملف الشخصي بنجاح", user, 200);
});

exports.changePassword = catchAsyncHandler(async (req, res) => {
  await userService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword
  );
  return ApiResponse.success(res, "تم تغيير كلمة المرور بنجاح", null, 200);
});
