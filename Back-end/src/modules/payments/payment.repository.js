const Payment = require('./payment.model');

const createPayment = (data) => Payment.create(data);

const findBySpecialRef = (specialRef) => Payment.findOne({ specialRef });

const updateStatusByTransactionId = (transactionId, status) =>
  Payment.findOneAndUpdate({ transactionId }, { status }, { new: true });

const findByStudent = (studentId) =>
  Payment.find({ student: studentId }).populate('course');

module.exports = { createPayment, findBySpecialRef, updateStatusByTransactionId, findByStudent };