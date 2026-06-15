const mongoose=require('mongoose');
const quizzeSchema=new mongoose.Schema({
   CourseId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The CourseId is required"],ref:'Course'},
   Title:{type:String,required:[true,"The quize title is requird"]},
   Content:{type:String,required:[true,"The quize content is requird"]},
})
module.exports=mongoose.model('Quizze',quizzeSchema);