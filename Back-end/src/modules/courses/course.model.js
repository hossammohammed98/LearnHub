const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
   TeacherId: { type: mongoose.Schema.Types.ObjectId, required: [true, "The TeacherId is required"], ref: 'Teacher' },
   Title: { type: String, required: [true, "The course title is required"] },
   Description: { type: String, required: [true, "The course Description is required"] },
   Price: { type: Number, default: 0, min: 0 },
   CoverImage: { type: String },
   CoverImagePublicId: { type: String },
   PromoUrl: { type: String },
   Status: { type: String, enum: ['draft', 'published'], default: 'draft' },
   PublishedAt: { type: Date },
}, { timestamps: true })
module.exports = mongoose.model('Course', courseSchema);
