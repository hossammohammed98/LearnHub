const express = require('express');
const router = express.Router();
const { initiatePayment, webhook } = require('./payment.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');

// Student initiates payment for a course
router.post(
  '/initiate/:courseId',
  authMiddleware,
  roleMiddleware('student'),
  initiatePayment
);

// Paymob calls this after payment — NO auth, raw body
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhook
);

module.exports = router;