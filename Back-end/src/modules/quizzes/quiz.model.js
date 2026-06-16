const mongoose=require('mongoose');
const quizSchema=new mongoose.Schema({
   CourseId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The CourseId is required"],ref:'Course'},
   Title:{type:String,required:[true,"The quiz title is required"]},
   Content:{type:String,required:[true,"The quiz content is required"]},
})
module.exports=mongoose.model('Quiz',quizSchema);