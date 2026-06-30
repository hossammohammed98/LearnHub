const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/protect");
const { validate } = require("../../middlewares/validate");
const userController = require("./user.controller");
const {
  updateUserSchema,
  changePasswordSchema,
} = require("../auth/auth.validator");

router.use(protect);

router.get("/me", userController.getMe);
router.patch("/me", validate(updateUserSchema), userController.updateMe);
router.patch(
  "/change-password",
  validate(changePasswordSchema),
  userController.changePassword
);

module.exports = router;
