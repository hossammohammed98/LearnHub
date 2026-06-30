const express = require('express');
const router = express.Router();
const { initiatePayment, webhook } = require('./payment.controller');
const { protect } = require('../../middlewares/protect');
const { restrictTo } = require('../../middlewares/restrictTo');

// Student initiates payment for a course
router.post(
  '/initiate/:courseId',
  protect,
  restrictTo('Student'),
  initiatePayment
);

// Paymob calls this after payment — NO auth, raw body
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhook
);

module.exports = router;
