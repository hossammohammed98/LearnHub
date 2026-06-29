const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
   TeacherId: { type: mongoose.Schema.Types.ObjectId, required: [true, "The TeacherId is required"], ref: 'Teacher' },
   Title: { type: String, required: [true, "The course title is required"] },
   Description: { type: String, required: [true, "The course Description is required"] },
   CoverImage: { type: String }, // Cloudinary Image URL
})
module.exports = mongoose.model('Course', courseSchema);