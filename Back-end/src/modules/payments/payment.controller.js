const paymentService = require('./payment.service');
const ApiResponse = require('../../shared/core/ApiResponse');

const initiatePayment = async (req, res, next) => {
  try {
    const result = await paymentService.createIntention({
      courseId: req.params.courseId,
      studentId: req.user.id,
    });
    return ApiResponse.success(res, 'Payment intention created successfully', result);
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
