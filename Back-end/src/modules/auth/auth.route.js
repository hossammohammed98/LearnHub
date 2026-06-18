const express=require('express');
const router=express.Router();
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');
const { validate } = require('../../middlewares/validate');
const authController=require('./auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/refresh-token', protect, authController.refreshToken);
router.post('/logout', protect, authController.logout);
router.get('/verify-email',authController.verifyEmail);
router.post('/forgot-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
module.exports=router;