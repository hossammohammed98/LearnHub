const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course:        { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount:        { type: Number, required: true },           // in EGP
  currency:      { type: String, default: 'EGP' },
  status:        { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  paymobOrderId: { type: String },                           // from Paymob
  transactionId: { type: String },                           // from webhook
  specialRef:    { type: String },                           // "course_X_student_Y"
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);