const paymentService = require('./payment.service');
const { ApiResponse } = require('../../core/ApiResponse');
const { ApiError } = require('../../core/ApiError');

const initiatePayment = async (req, res, next) => {
  try {
    const { course } = req;        // attach via middleware or fetch in service
    const student = req.user;      // from auth.middleware
    const result = await paymentService.createIntention({ course, student });
    return ApiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
};

const webhook = async (req, res, next) => {
  try {
    const hmac = req.query.hmac;
    const body = JSON.parse(req.body);   // raw body parsed here
    await paymentService.handleWebhook(body, hmac);
    res.status(200).json({ received: true });
  } catch (err) {
    if (err.message === 'HMAC_MISMATCH') return res.status(401).json({ error: 'Unauthorized' });
    next(err);
  }
};

module.exports = { initiatePayment, webhook };