const mongoose=require('mongoose');
const lessonSchema=new mongoose.Schema({
   ChapterId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The ChapterId is required"],ref:'Chapter'},
   Title:{type:String,required:[true,"The Lesson title is required"]},
   Content:{type:String},
   Video: {
       url: String,
       public_id: String,
       resourceType: { type: String, default: 'video' },
       fileName: String
   },
   Assessment: {
       questions: [{ questionText: String, options: [String], correctAnswer: String }]
   },
   Attachments: [{
       fileName: String,
       url: String,
       public_id: String,
       resourceType: String
   }]
},{timestamps:true});
module.exports=mongoose.model('Lesson',lessonSchema);
