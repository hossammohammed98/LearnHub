const mongoose=require('mongoose');
const lessonSchema=new mongoose.Schema({
   ChapterId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The ChapterId is required"],ref:'Chapter'},
   Title:{type:String,required:[true,"The Lesson title is required"]},
   Video: {
       url: String,       // Cloudinary stream URL
       public_id: String  // Required for deletions!
   },
   Assessment: {
       questions: [{ questionText: String, options: [String], correctAnswer: String }]
   },
   Attachments: [{
       fileName: String,
       url: String,
       public_id: String
   }]
},{timestamps:true});
module.exports=mongoose.model('Lesson',lessonSchema);