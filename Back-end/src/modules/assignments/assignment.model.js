const mongoose=require('mongoose');
const assignmentSchema=new mongoose.Schema({
   LessonId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The LessonId is required"],ref:'Lesson'},
   Title:{type:String,required:[true,"The Assignment title is requird"]},
   Content:{type:String,required:[true,"The Assignment Content is requird"]}, 

})
module.exports=mongoose.model('Assignment',assignmentSchema);