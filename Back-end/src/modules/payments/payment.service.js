// const axios = require('axios');
// const crypto = require('crypto');
// const paymentRepo = require('./payment.repository');

// // ── 1. Create Paymob intention ──────────────────────────────────────────────
// const createIntention = async ({ course, student }) => {
//   const specialRef = `course_${course._id}_student_${student._id}`;

//   // Save a pending payment record first
//   await paymentRepo.createPayment({
//     student: student._id,
//     course:  course._id,
//     amount:  course.price,
//     status:  'pending',
//     specialRef,
//   });

//   const { data } = await axios.post(
//     'https://accept.paymob.com/v1/intention/',
//     {
//       amount: course.price * 100,   // cents
//       currency: 'EGP',
//       payment_methods: [parseInt(process.env.PAYMOB_INTEGRATION_ID)],
//       items: [{
//         name:        course.title,
//         amount:      course.price * 100,
//         description: `Access to ${course.title}`,
//         quantity:    1,
//       }],
//       billing_data: {
//         first_name:   student.name.split(' ')[0],
//         last_name:    student.name.split(' ')[1] || 'N/A',
//         email:        student.email,
//         phone_number: student.phone || '01000000000',
//       },
//       customer: {
//         first_name: student.name.split(' ')[0],
//         last_name:  student.name.split(' ')[1] || 'N/A',
//         email:      student.email,
//       },
//       special_reference:  specialRef,
//       notification_url:   `${process.env.BASE_URL}/api/payments/webhook`,
//       redirection_url:    `${process.env.BASE_URL}/payment/result`,
//     },
//     {
//       headers: {
//         Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${data.client_secret}`;
//   return { checkoutUrl };
// };

// // ── 2. Verify HMAC & handle webhook ────────────────────────────────────────
// const handleWebhook = async (body, receivedHmac) => {
//   const obj = body.obj;

//   // Build HMAC string in Paymob's required field order
//   const hmacString = [
//     obj.amount_cents, obj.created_at, obj.currency,
//     obj.error_occured, obj.has_parent_transaction, obj.id,
//     obj.integration_id, obj.is_3d_secure, obj.is_auth,
//     obj.is_capture, obj.is_refunded, obj.is_standalone_payment,
//     obj.is_voided, obj.order?.id, obj.owner, obj.pending,
//     obj.source_data?.pan, obj.source_data?.sub_type,
//     obj.source_data?.type, obj.success,
//   ].join('');

//   const calculated = crypto
//     .createHmac('sha512', process.env.PAYMOB_HMAC_SECRET)
//     .update(hmacString)
//     .digest('hex');

//   if (calculated !== receivedHmac) throw new Error('HMAC_MISMATCH');

//   if (body.type !== 'TRANSACTION' || !obj.success) return { granted: false };

//   // Parse the specialRef you stored earlier
//   const specialRef = obj.order?.merchant_order_id;
//   const match = specialRef?.match(/course_(.+)_student_(.+)/);
//   if (!match) return { granted: false };

//   const [, courseId, studentId] = match;

//   // Update payment record
//   await paymentRepo.findBySpecialRef(specialRef).then(p => {
//     if (p) { p.status = 'success'; p.transactionId = String(obj.id); return p.save(); }
//   });

//   // Grant access — add course to student's enrolledCourses
//   const User = require('../users/user.model');
//   await User.findByIdAndUpdate(studentId, {
//     $addToSet: { enrolledCourses: courseId }
//   });

//   return { granted: true, courseId, studentId };
// };
// module.exports = { createIntention, handleWebhook };

const axios = require('axios');
const crypto = require('crypto');
const paymentRepo = require('./payment.repository');

// ── 1. Create Paymob intention ──────────────────────────────────────────────
const createIntention = async ({ course, student }) => {
  const specialRef = `course_${course._id}_student_${student._id}`;

  // Save a pending payment record first
  await paymentRepo.createPayment({
    student: student._id,
    course:  course._id,
    amount:  course.price,
    status:  'pending',
    specialRef,
  });

  const { data } = await axios.post(
    'https://accept.paymob.com/v1/intention/',
    {
      amount: course.price * 100,   // cents
      currency: 'EGP',
      payment_methods: [parseInt(process.env.PAYMOB_INTEGRATION_ID)],
      items: [{
        name:        course.title,
        amount:      course.price * 100,
        description: `Access to ${course.title}`,
        quantity:    1,
      }],
      billing_data: {
        first_name:   student.name.split(' ')[0],
        last_name:    student.name.split(' ')[1] || 'N/A',
        email:        student.email,
        phone_number: student.phone || '01000000000',
      },
      customer: {
        first_name: student.name.split(' ')[0],
        last_name:  student.name.split(' ')[1] || 'N/A',
        email:      student.email,
      },
      special_reference:  specialRef,
      notification_url:   `${process.env.BASE_URL}/api/payments/webhook`,
      redirection_url:    `${process.env.BASE_URL}/payment/result`,
    },
    {
      headers: {
        Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${data.client_secret}`;
  return { checkoutUrl };
};

// ── 2. Verify HMAC & handle webhook ────────────────────────────────────────
const handleWebhook = async (body, receivedHmac) => {
  const obj = body.obj;

  if (!obj || !receivedHmac) throw new Error('HMAC_MISMATCH');

  // FIXED: Explicit concatenation ensures strings/booleans match Paymob's precise rules
  const hmacString = 
    obj.amount_cents +
    obj.created_at +
    obj.currency +
    obj.error_occured +
    obj.has_parent_transaction +
    obj.id +
    obj.integration_id +
    obj.is_3d_secure +
    obj.is_auth +
    obj.is_capture +
    obj.is_refunded +
    obj.is_standalone_payment +
    obj.is_voided +
    obj.order.id +
    obj.owner +
    obj.pending +
    obj.source_data.pan +
    obj.source_data.sub_type +
    obj.source_data.type +
    obj.success;

  const calculated = crypto
    .createHmac('sha512', process.env.PAYMOB_HMAC_SECRET)
    .update(hmacString)
    .digest('hex');

  if (calculated !== receivedHmac) throw new Error('HMAC_MISMATCH');

  if (body.type !== 'TRANSACTION' || !obj.success) return { granted: false };

  // FIXED: Intentions API maps special_reference straight to obj.special_reference
  const specialRef = obj.special_reference;
  const match = specialRef?.match(/course_(.+)_student_(.+)/);
  if (!match) return { granted: false };

  const [, courseId, studentId] = match;

  // Update payment record
  await paymentRepo.findBySpecialRef(specialRef).then(p => {
    if (p) { p.status = 'success'; p.transactionId = String(obj.id); return p.save(); }
  });

  // Grant access — add course to student's enrolledCourses
  const User = require('../users/user.model');
  await User.findByIdAndUpdate(studentId, {
    $addToSet: { enrolledCourses: courseId }
  });

  return { granted: true, courseId, studentId };
};

module.exports = { createIntention, handleWebhook };