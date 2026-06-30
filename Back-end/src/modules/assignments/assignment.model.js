const mongoose=require('mongoose');
const assignmentSchema=new mongoose.Schema({
   LessonId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The LessonId is required"],ref:'Lesson'},
   Title:{type:String,required:[true,"The Assignment title is required"]},
   Content:{type:String,required:[true,"The Assignment Content is required"]}, 
   Attachment:{
      url:String,
      public_id:String,
      fileName:String,
      resourceType:String
   },

},{timestamps:true});
module.exports=mongoose.model('Assignment',assignmentSchema);
